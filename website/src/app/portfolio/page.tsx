"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPortfolio } from "@/lib/mock-data";
import { PieChart, Wallet } from "lucide-react";

export default function PortfolioPage() {
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
                        <span className="text-muted-foreground">Total Balance</span>
                        <span className="font-bold text-xl">${mockPortfolio.balance.toLocaleString()}</span>
                    </div>
                     <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-muted-foreground">Unrealized PNL</span>
                        <span className="font-bold text-green-500">+$1,240.50</span>
                    </div>
                     <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Wallet Address</span>
                        <span className="font-mono text-xs bg-muted px-2 py-1 rounded">0xSim...8f4A</span>
                    </div>
                </CardContent>
            </Card>
        </div>

        <h2 className="text-xl font-bold mt-8">Assets</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockPortfolio.assets.map((asset, i) => (
                <Card key={i}>
                    <CardContent className="p-6 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                                {asset.symbol[0]}
                             </div>
                             <div>
                                <div className="font-bold">{asset.symbol}</div>
                                <div className="text-sm text-muted-foreground">{asset.balance} Tokens</div>
                             </div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold">${asset.value.toLocaleString()}</div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
