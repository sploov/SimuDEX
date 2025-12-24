"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function createToken(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    return { error: "You must be logged in to launch a coin." };
  }

  const name = formData.get("name") as string;
  const symbol = formData.get("ticker") as string;
  const supply = parseFloat(formData.get("supply") as string);
  const initialLiquidity = parseFloat(formData.get("liquidity") as string);
  const isRugPlay = formData.get("isRugPlay") === "on";

  if (!name || !symbol || !supply || !initialLiquidity) {
    return { error: "Missing required fields" };
  }

  // Calculate initial price based on liquidity
  // Price = USDT Reserve / Token Reserve
  // We assume the user puts in 'initialLiquidity' USDT and matches it with 100% of supply (simplified)
  // or matches it with 50% supply. Let's say 100% of supply is in the pool.
  const price = initialLiquidity / supply;

  try {
    const token = await prisma.token.create({
      data: {
        name,
        symbol: symbol.toUpperCase(),
        supply,
        reserveUSDT: initialLiquidity,
        reserveToken: supply,
        price: price,
        marketCap: price * supply,
        creatorId: session.user.email, // Using email as temp ID since we might not have user ID synced perfectly yet
        isRugPull: isRugPlay,
        // If it's a rug pull, schedule it for a random time in the next 24 hours
        rugTime: isRugPlay ? new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000) : null,
      },
    });

    revalidatePath("/market");
    return { success: true, token };
  } catch (e) {
    console.error("Failed to create token:", e);
    return { error: "Failed to create token. Ticker might be taken." };
  }
}

export async function getTokens() {
  try {
    const tokens = await prisma.token.findMany({
      orderBy: { createdAt: "desc" },
    });
    return tokens;
  } catch (e) {
    console.error("Failed to fetch tokens", e);
    return [];
  }
}

export async function getUserPortfolio() {
    const session = await auth();
    if (!session?.user?.email) return null;

    // Fetch user from DB based on email (since that's what we have from GitHub)
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { positions: { include: { token: true } } }
    });

    return user;
}

export async function getTokenById(id: string) {
    return await prisma.token.findUnique({ where: { id } });
}

export async function executeTrade(tokenId: string, amountIn: number, type: "BUY" | "SELL") {
    const session = await auth();
    if (!session?.user?.email) return { error: "Not logged in" };

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return { error: "User not found" };

    const token = await prisma.token.findUnique({ where: { id: tokenId } });
    if (!token) return { error: "Token not found" };

    // AMM Logic: x * y = k
    // x = reserveUSDT
    // y = reserveToken
    // k = x * y
    
    // Fee = 1% (Simulated)
    const amountInWithFee = amountIn * 0.99; 

    let amountOut = 0;
    let newReserveUSDT = 0;
    let newReserveToken = 0;

    if (type === "BUY") {
        // User pays USDT, gets Token
        if (user.balanceUSDT < amountIn) return { error: "Insufficient USDT balance" };
        
        // dy = y - (k / (x + dx))
        const k = token.reserveUSDT * token.reserveToken;
        const newX = token.reserveUSDT + amountInWithFee;
        const newY = k / newX;
        
        amountOut = token.reserveToken - newY; // Tokens user receives
        newReserveUSDT = newX; // Pool gets richer in USDT
        newReserveToken = newY; // Pool gets poorer in Token

    } else { // SELL
        // User pays Token, gets USDT
        // Check user token balance
        const position = await prisma.position.findUnique({
            where: { userId_tokenId: { userId: user.id, tokenId: token.id } }
        });
        if (!position || position.balance < amountIn) return { error: "Insufficient token balance" };

        // dx = x - (k / (y + dy))
        const k = token.reserveUSDT * token.reserveToken;
        const newY = token.reserveToken + amountInWithFee; // Pool gets Token
        const newX = k / newY;
        
        amountOut = token.reserveUSDT - newX; // USDT user receives
        newReserveUSDT = newX;
        newReserveToken = newY;
    }

    // New Price = USDT Reserve / Token Reserve
    const newPrice = newReserveUSDT / newReserveToken;

    try {
        await prisma.$transaction(async (tx) => {
            // 1. Update Token Reserves & Price
            await tx.token.update({
                where: { id: token.id },
                data: {
                    reserveUSDT: newReserveUSDT,
                    reserveToken: newReserveToken,
                    price: newPrice,
                    marketCap: newPrice * token.supply
                }
            });

            // 2. Update User Balances
            if (type === "BUY") {
                // Deduct USDT
                await tx.user.update({
                    where: { id: user.id },
                    data: { balanceUSDT: { decrement: amountIn } }
                });
                // Add Token Position
                await tx.position.upsert({
                    where: { userId_tokenId: { userId: user.id, tokenId: token.id } },
                    create: { userId: user.id, tokenId: token.id, balance: amountOut },
                    update: { balance: { increment: amountOut } }
                });
            } else {
                // Add USDT
                await tx.user.update({
                    where: { id: user.id },
                    data: { balanceUSDT: { increment: amountOut } }
                });
                // Deduct Token Position
                await tx.position.update({
                    where: { userId_tokenId: { userId: user.id, tokenId: token.id } },
                    data: { balance: { decrement: amountIn } }
                });
            }

            // 3. Create Trade Record
            await tx.trade.create({
                data: {
                    userId: user.id,
                    tokenId: token.id,
                    type,
                    amountUSDT: type === "BUY" ? amountIn : amountOut,
                    amountToken: type === "BUY" ? amountOut : amountIn,
                    price: newPrice
                }
            });
        });

        revalidatePath(`/trade/${tokenId}`);
        revalidatePath(`/market`);
        revalidatePath(`/portfolio`);
        
        return { success: true };

    } catch (e) {
        console.error("Trade failed", e);
        return { error: "Trade transaction failed" };
    }
}
