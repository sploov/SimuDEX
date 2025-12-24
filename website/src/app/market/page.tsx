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
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { getTokens } from "@/app/actions";

export default function MarketPage() {
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    getTokens().then(setTokens);
  }, []);

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
                    <TableHead>Price (USDT)</TableHead>
                    <TableHead>Supply</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {tokens.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No tokens found. Be the first to launch one!
                        </TableCell>
                    </TableRow>
                ) : (
                    tokens.map((token) => (
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
                        <TableCell>${token.price.toFixed(6)}</TableCell>
                        <TableCell>
                            {(token.supply / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell>
                            {token.isRugPull ? (
                                <Badge variant="destructive" className="animate-pulse">RUG RISK</Badge>
                            ) : (
                                <Badge variant="secondary">Verified</Badge>
                            )}
                        </TableCell>
                        <TableCell className="text-right">
                            <Button size="sm" variant="outline">Trade</Button>
                        </TableCell>
                        </TableRow>
                    ))
                )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
      
      <div id="treemap" className="pt-8">
           <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5" /> Market Map (Treemap)
           </h2>
           <div className="grid grid-cols-4 grid-rows-2 h-64 gap-1">
                {/* Simplified Treemap Placeholder */}
                <div className="col-span-2 row-span-2 bg-green-500/20 border border-green-500/50 rounded p-4 flex flex-col justify-between hover:bg-green-500/30 transition-colors cursor-pointer">
                    <span className="font-bold">BTC (Sim)</span>
                    <span className="text-green-500">+2.5%</span>
                </div>
                 <div className="bg-red-500/20 border border-red-500/50 rounded p-4 flex flex-col justify-between hover:bg-red-500/30 transition-colors cursor-pointer">
                    <span className="font-bold">ETH (Sim)</span>
                    <span className="text-red-500">-1.2%</span>
                </div>
           </div>
      </div>
    </div>
  );
}
