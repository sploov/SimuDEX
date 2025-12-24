"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserPortfolio } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserPortfolio().then((data) => {
        setUser(data);
        setLoading(false);
    });
  }, []);

  if (loading) {
      return (
          <div className="space-y-6">
              <Skeleton className="h-12 w-64" />
              <div className="grid gap-4 md:grid-cols-3">
                  <Skeleton className="h-[300px] col-span-2" />
                  <Skeleton className="h-[300px]" />
              </div>
          </div>
      )
  }

  if (!user) {
      return <div className="p-10 text-center">Please log in to view your portfolio.</div>
  }

  // Calculate total portfolio value
  const totalValue = user.balanceUSDT + user.positions.reduce((acc: number, pos: any) => {
      return acc + (pos.balance * pos.token.price);
  }, 0);

  return (
    <div className="space-y-6">
       <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Portfolio</h1>
            <p className="text-muted-foreground">Manage your assets and track your performance.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/10">
                    <PieChart className="w-10 h-10 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Allocation Chart (Coming Soon)</span>
                </CardContent>
            </Card>
            <Card>
                 <CardHeader>
                    <CardTitle>Wallet Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-muted-foreground">Total Net Worth</span>
                        <span className="font-bold text-xl">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                     <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-muted-foreground">Liquid USDT</span>
                        <span className="font-bold text-green-500">${user.balanceUSDT.toLocaleString()}</span>
                    </div>
                     <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Username</span>
                        <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{user.username || user.email}</span>
                    </div>
                </CardContent>
            </Card>
        </div>

        <h2 className="text-xl font-bold mt-8">Assets</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {user.positions.length === 0 ? (
                <div className="col-span-3 text-center py-10 text-muted-foreground bg-muted/20 rounded-lg">
                    No assets found. Go trade some coins!
                </div>
            ) : (
                user.positions.map((pos: any) => (
                    <Card key={pos.id}>
                        <CardContent className="p-6 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                                    {pos.token.symbol[0]}
                                </div>
                                <div>
                                    <div className="font-bold">{pos.token.symbol}</div>
                                    <div className="text-sm text-muted-foreground">{pos.balance.toLocaleString()} Tokens</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold">${(pos.balance * pos.token.price).toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">@ ${pos.token.price.toFixed(6)}</div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    </div>
  );
}
