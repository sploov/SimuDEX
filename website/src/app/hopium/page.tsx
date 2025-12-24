"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowUp, ArrowDown } from "lucide-react";

const newsItems = [
    { id: 1, headline: "Bitcoin CEO announces partnership with Mars Colony", sentiment: "Bullish", impact: "+5%", time: "2m ago" },
    { id: 2, headline: "Rumors: Pepe token actually a frog, market confused", sentiment: "Neutral", impact: "0%", time: "15m ago" },
    { id: 3, headline: "Federal Reserve prints more money, crypto cheers", sentiment: "Bullish", impact: "+2%", time: "1h ago" },
    { id: 4, headline: "Major exchange accidentally deletes database", sentiment: "Bearish", impact: "-10%", time: "3h ago" },
];

export default function HopiumPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
       <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
                <Zap className="text-yellow-500 fill-yellow-500" /> Hopium Feed
            </h1>
            <p className="text-muted-foreground">The simulated news that moves the simulated markets.</p>
        </div>

        <div className="grid gap-4">
            {newsItems.map((item) => (
                <Card key={item.id} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-6 flex items-start gap-4">
                         <div className={`p-3 rounded-full shrink-0 ${item.sentiment === 'Bullish' ? 'bg-green-500/20 text-green-500' : item.sentiment === 'Bearish' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
                            <Zap className="h-6 w-6" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-lg">{item.headline}</h3>
                                <span className="text-xs text-muted-foreground">{item.time}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge variant={item.sentiment === 'Bullish' ? "default" : item.sentiment === 'Bearish' ? "destructive" : "secondary"}>
                                    {item.sentiment}
                                </Badge>
                                <span className={`text-sm font-bold flex items-center ${item.sentiment === 'Bullish' ? 'text-green-500' : item.sentiment === 'Bearish' ? 'text-red-500' : 'text-muted-foreground'}`}>
                                    Market Impact: {item.impact}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
