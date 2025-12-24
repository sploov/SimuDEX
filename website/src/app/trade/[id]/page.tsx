"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDownUp, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { getTokenById, executeTrade, getTokenTrades } from "@/app/actions";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TradePage() {
    const params = useParams();
    const router = useRouter();
    const [token, setToken] = useState<any>(null);
    const [trades, setTrades] = useState<any[]>([]);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(true);
    const [trading, setTrading] = useState(false);
    const [mode, setMode] = useState<"BUY" | "SELL">("BUY");

    useEffect(() => {
        if (params.id) {
            Promise.all([
                getTokenById(params.id as string),
                getTokenTrades(params.id as string)
            ]).then(([t, tr]) => {
                setToken(t);
                setTrades(tr);
                setLoading(false);
            });
        }
    }, [params.id]);

    const handleTrade = async () => {
        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            toast.error("Invalid amount");
            return;
        }
        
        setTrading(true);
        const res = await executeTrade(token.id, parseFloat(amount), mode);
        setTrading(false);

        if (res.error) {
            toast.error("Trade Failed", { description: res.error });
        } else {
            toast.success("Trade Successful", { 
                description: `Successfully ${mode === "BUY" ? "bought" : "sold"} ${token.symbol}` 
            });
            setAmount("");
            // Refresh data
            Promise.all([
                getTokenById(token.id),
                getTokenTrades(token.id)
            ]).then(([t, tr]) => {
                setToken(t);
                setTrades(tr);
            });
            router.refresh();
        }
    };

    if (loading) return <div className="p-10 flex justify-center"><Skeleton className="h-[400px] w-[400px]" /></div>;
    if (!token) return <div className="p-10 text-center">Token not found</div>;

    const chartData = trades.length > 0 ? trades.map(t => ({
        time: new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: t.price
    })) : [
        { time: 'Start', price: token.price * 0.9 },
        { time: 'Now', price: token.price }
    ];

    const estimatedOutput = amount ? (mode === "BUY" ? parseFloat(amount) / token.price : parseFloat(amount) * token.price) : 0;

    return (
        <div className="max-w-6xl mx-auto space-y-6 pt-10 px-4">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 bg-card/30 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
                 <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                    {token.symbol[0]}
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-black tracking-tight">{token.name} ({token.symbol})</h1>
                    <div className="flex items-center gap-3 mt-1">
                        <p className="text-2xl font-mono text-primary">${token.price.toFixed(6)}</p>
                        <Badge variant="outline" className="bg-muted/50 border-white/10">MCap: ${(token.marketCap / 1000).toFixed(1)}k</Badge>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Chart Section */}
                <Card className="lg:col-span-2 border-white/5 bg-background/50 backdrop-blur-sm overflow-hidden">
                    <CardHeader>
                        <CardTitle>Price Chart</CardTitle>
                        <CardDescription>Live history for {token.symbol}</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px] p-0 pb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" hide />
                                <YAxis domain={['auto', 'auto']} hide />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#a855f7' }}
                                />
                                <Area type="monotone" dataKey="price" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Swap Form */}
                <Card className="border-2 border-primary/20 shadow-2xl bg-card/80 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center text-2xl">
                            Swap
                            <Button variant="ghost" size="icon" onClick={() => getTokenById(token.id).then(setToken)}>
                                <RefreshCcw className="w-4 h-4" />
                            </Button>
                        </CardTitle>
                        <CardDescription>Trade tokens with 1% simulated slippage.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="buy" onValueChange={(v) => setMode(v === "buy" ? "BUY" : "SELL")} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
                                <TabsTrigger value="buy" className="text-lg data-[state=active]:bg-green-600 data-[state=active]:text-white">Buy</TabsTrigger>
                                <TabsTrigger value="sell" className="text-lg data-[state=active]:bg-red-600 data-[state=active]:text-white">Sell</TabsTrigger>
                            </TabsList>
                            
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        <span>Sell Amount</span>
                                        <span>Balance: {mode === "BUY" ? "USDT" : token.symbol}</span>
                                    </div>
                                    <Input 
                                        type="number" 
                                        placeholder="0.00" 
                                        className="text-3xl h-16 bg-muted/20 border-white/5 font-mono" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>

                                <div className="flex justify-center -my-2 relative z-10">
                                    <div className="bg-primary p-2 rounded-full border-4 border-card shadow-lg">
                                        <ArrowDownUp className="w-5 h-5 text-white" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        <span>Receive Amount</span>
                                        <span>Estimated</span>
                                    </div>
                                    <Input 
                                        readOnly 
                                        className="text-3xl h-16 bg-muted/40 border-white/5 font-mono text-primary/80" 
                                        value={estimatedOutput.toFixed(4)}
                                    />
                                </div>
                            </div>
                        </Tabs>
                    </CardContent>
                    <CardFooter className="pt-4">
                        <Button 
                            size="lg" 
                            className={`w-full text-xl h-14 font-bold shadow-lg shadow-black/20 ${mode === "BUY" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                            onClick={handleTrade}
                            disabled={trading || !amount}
                        >
                            {trading ? "Processing..." : `${mode} ${token.symbol}`}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

