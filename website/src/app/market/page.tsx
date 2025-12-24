"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockTokens } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, Info } from "lucide-react";

export default function MarketPage() {
  return (
    <div className="space-y-6">
       <div>
            <h1 className="text-3xl font-bold tracking-tight">Market Overview</h1>
            <p className="text-muted-foreground">Discover new tokens, track prices, and find the next moonshot.</p>
        </div>

      <Card>
        <CardHeader>
            <CardTitle>Top Tokens</CardTitle>
            <CardDescription>Ranked by volume and community interest.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Asset</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>24h Change</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {mockTokens.map((token) => (
                    <TableRow key={token.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                            {token.symbol[0]}
                        </div>
                        <div>
                            <div>{token.name}</div>
                            <div className="text-xs text-muted-foreground">{token.symbol}</div>
                        </div>
                    </TableCell>
                    <TableCell>${token.price < 0.01 ? token.price.toFixed(8) : token.price.toLocaleString()}</TableCell>
                    <TableCell>
                        <div className={`flex items-center gap-1 ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {token.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {token.change}%
                        </div>
                    </TableCell>
                    <TableCell>
                        {token.isRug ? (
                            <Badge variant="destructive" className="animate-pulse">RUG RISK</Badge>
                        ) : (
                            <Badge variant="secondary">Verified</Badge>
                        )}
                    </TableCell>
                    <TableCell className="text-right">
                        <Button size="sm" variant="outline">Trade</Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
      
      <div id="treemap" className="pt-8">
           <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5" /> Market Map (Treemap)
           </h2>
           <div className="grid grid-cols-4 grid-rows-2 h-64 gap-1">
                <div className="col-span-2 row-span-2 bg-green-500/20 border border-green-500/50 rounded p-4 flex flex-col justify-between hover:bg-green-500/30 transition-colors cursor-pointer">
                    <span className="font-bold">BTC</span>
                    <span className="text-green-500">+2.5%</span>
                </div>
                 <div className="bg-red-500/20 border border-red-500/50 rounded p-4 flex flex-col justify-between hover:bg-red-500/30 transition-colors cursor-pointer">
                    <span className="font-bold">ETH</span>
                    <span className="text-red-500">-1.2%</span>
                </div>
                 <div className="bg-green-500/20 border border-green-500/50 rounded p-4 flex flex-col justify-between hover:bg-green-500/30 transition-colors cursor-pointer">
                    <span className="font-bold">SOL</span>
                    <span className="text-green-500">+5.8%</span>
                </div>
                <div className="col-span-2 bg-green-500/40 border border-green-500/60 rounded p-4 flex flex-col justify-between hover:bg-green-500/50 transition-colors cursor-pointer">
                    <span className="font-bold">PEPE</span>
                    <span className="text-green-500 font-bold">+12.5%</span>
                </div>
           </div>
      </div>
    </div>
  );
}
