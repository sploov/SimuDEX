"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { getNews, seedNews } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function HopiumPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNews().then(setNews);
  }, []);

  const handleSeed = async () => {
    setLoading(true);
    await seedNews();
    const latest = await getNews();
    setNews(latest);
    setLoading(false);
    toast.success("Feed Updated");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
       <div className="text-center space-y-2 relative">
            <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
                <Zap className="text-yellow-500 fill-yellow-500" /> Hopium Feed
            </h1>
            <p className="text-muted-foreground">The simulated news that moves the simulated markets.</p>
            <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0" 
                onClick={handleSeed}
                disabled={loading}
            >
                <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
        </div>

        <div className="grid gap-4">
            {news.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                    No news yet. Click the refresh icon to generate some hopium.
                </div>
            ) : (
                news.map((item) => (
                    <Card key={item.id} className="hover:bg-muted/50 transition-colors">
                        <CardContent className="p-6 flex items-start gap-4">
                            <div className={`p-3 rounded-full shrink-0 ${item.impact === 'BULLISH' ? 'bg-green-500/20 text-green-500' : item.impact === 'BEARISH' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
                                <Zap className="h-6 w-6" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-lg">{item.headline}</h3>
                                    <span className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleTimeString()}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant={item.impact === 'BULLISH' ? "default" : item.impact === 'BEARISH' ? "destructive" : "secondary"}>
                                        {item.impact}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    </div>
  );
}
