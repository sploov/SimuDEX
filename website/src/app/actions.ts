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
