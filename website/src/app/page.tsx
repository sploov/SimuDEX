"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Skull, Zap, Dices } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserPortfolio } from "@/app/actions";
import Image from "next/image";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUserPortfolio().then(setUser);
  }, []);

  // Generate some fake historical data based on current balance for the chart
  // In a real V2, we would track this daily in the DB.
  const chartData = user ? Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      // Random fluctuation around current balance
      const balance = user.balanceUSDT + (Math.random() * 1000 - 500); 
      return {
          name: date.toLocaleDateString('en-US', { weekday: 'short' }),
          value: balance > 0 ? balance : 0
      };
  }) : [];

  // Update last point to match actual current total
  if (user && chartData.length > 0) {
      const totalValue = user.balanceUSDT + user.positions.reduce((acc: any, p: any) => acc + (p.balance * p.token.price), 0);
      chartData[chartData.length - 1].value = totalValue;
  }

  const totalValue = user ? user.balanceUSDT + user.positions.reduce((acc: any, p: any) => acc + (p.balance * p.token.price), 0) : 0;

  return (
    <div className="space-y-6">
      <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        <Image 
            src="/banner.png" 
            alt="SimuDEX Banner" 
            fill 
            className="object-cover"
            priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-6">
             <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md">Dashboard</h1>
             <p className="text-muted-foreground text-lg drop-shadow-md">Welcome back, Trader. Here is your daily briefing.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-end items-center">
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
            <div className="text-2xl font-bold">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              +12.5% <span className="text-muted-foreground ml-1">simulated APY</span>
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
                <div className="text-2xl font-bold">Live</div>
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
                <CardTitle className="text-sm font-medium group-hover:text-purple-400 transition-colors">Casino</CardTitle>
                <Dices className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 transition-colors" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Coin Flip</div>
                <p className="text-xs text-muted-foreground mt-1">
                Double or Nothing.
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
             <div className="h-[200px] w-full">
                {user ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        Loading chart...
                    </div>
                )}
             </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Trades</CardTitle>
            <CardDescription>Your latest activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {/* We would fetch real trades here, but for now we show a placeholder message if empty */}
                 <div className="text-center py-8 text-muted-foreground text-sm">
                    No recent trades found in this session.
                 </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
