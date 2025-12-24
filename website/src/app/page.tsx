"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Skull, Zap, Dices } from "lucide-react";
import Link from "next/link";
import { mockPortfolio, mockTrades } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Trader. Here is your daily briefing.</p>
        </div>
        <div className="flex gap-2">
            <Button asChild variant="outline">
                <Link href="/market">View Market</Link>
            </Button>
             <Button asChild>
                <Link href="/create-coin">Launch Coin</Link>
            </Button>
        </div>
      </div>

      {/* Portfolio & Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/20 to-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockPortfolio.balance.toLocaleString()}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              +{mockPortfolio.change}% <span className="text-muted-foreground ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        
         <Link href="/rugplay">
            <Card className="hover:border-red-500/50 transition-colors cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-red-400 transition-colors">SimuDEX Active</CardTitle>
                <Skull className="h-4 w-4 text-muted-foreground group-hover:text-red-500 transition-colors" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">3 Live</div>
                <p className="text-xs text-muted-foreground mt-1">
                Risk it all? <span className="text-red-400 font-bold">Play now &rarr;</span>
                </p>
            </CardContent>
            </Card>
        </Link>
        
        <Link href="/hopium">
            <Card className="hover:border-yellow-500/50 transition-colors cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-yellow-400 transition-colors">Hopium Level</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground group-hover:text-yellow-500 transition-colors" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Extreme Greed</div>
                <p className="text-xs text-muted-foreground mt-1">
                Market is 85/100 bullish.
                </p>
            </CardContent>
            </Card>
        </Link>

        <Link href="/gambling">
             <Card className="hover:border-purple-500/50 transition-colors cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-purple-400 transition-colors">Recent Win</CardTitle>
                <Dices className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 transition-colors" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+$500</div>
                <p className="text-xs text-muted-foreground mt-1">
                Won on "Coin Flip"
                </p>
            </CardContent>
            </Card>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Estimated value over time (Simulated)</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <div className="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-md bg-muted/20">
                Chart Placeholder (Recharts)
             </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Live Trades</CardTitle>
            <CardDescription>Real-time simulated activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {mockTrades.map((trade, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${trade.type === 'BUY' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                {trade.type === 'BUY' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                            </div>
                            <div>
                                <div className="font-semibold">{trade.symbol}</div>
                                <div className="text-xs text-muted-foreground">{trade.time}</div>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className="font-mono">{trade.amount}</div>
                             <div className="text-xs text-muted-foreground">@ ${trade.price}</div>
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}