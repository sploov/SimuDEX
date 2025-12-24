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
import { TrendingUp, TrendingDown, Info, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getTokens } from "@/app/actions";
import { Treemap, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function MarketPage() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTokens().then(setTokens);
  }, []);

  const filteredTokens = tokens.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const treemapData = [
      {
          name: 'Tokens',
          children: filteredTokens.map(t => ({
              name: t.symbol,
              size: t.marketCap > 0 ? t.marketCap : 1000,
              price: t.price
          }))
      }
  ];

  const CustomizedContent = (props: any) => {
    const { x, y, width, height, index, name } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: index % 2 === 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            stroke: '#fff',
            strokeWidth: 1,
            strokeOpacity: 0.1,
          }}
        />
        {width > 30 && height > 30 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#fff"
            fontSize={12}
            fontWeight="bold"
          >
            {name}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Market Overview</h1>
                <p className="text-muted-foreground">Discover new tokens, track prices, and find the next moonshot.</p>
            </div>
            <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                    placeholder="Search tokens..." 
                    className="pl-10 bg-card/50" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
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
                {filteredTokens.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            {tokens.length === 0 ? "No tokens found. Be the first to launch one!" : "No tokens match your search."}
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredTokens.map((token) => (
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
                            <Button size="sm" variant="outline" asChild>
                                <Link href={`/trade/${token.id}`}>Trade</Link>
                            </Button>
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
           <div className="h-96 w-full bg-card/50 rounded-xl border border-white/10 overflow-hidden p-4">
                {tokens.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <Treemap
                            data={treemapData}
                            dataKey="size"
                            aspectRatio={4 / 3}
                            stroke="#fff"
                            content={<CustomizedContent />}
                        >
                             <RechartsTooltip 
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                             />
                        </Treemap>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground italic">
                        No market data available yet.
                    </div>
                )}
           </div>
      </div>
    </div>
  );
}
