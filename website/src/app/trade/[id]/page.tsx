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
import { getTokenById, executeTrade } from "@/app/actions";

export default function TradePage() {
    const params = useParams();
    const router = useRouter();
    const [token, setToken] = useState<any>(null);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(true);
    const [trading, setTrading] = useState(false);
    const [mode, setMode] = useState<"BUY" | "SELL">("BUY");

    useEffect(() => {
        if (params.id) {
            getTokenById(params.id as string).then((t) => {
                setToken(t);
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
            // Refresh token data
            getTokenById(token.id).then(setToken);
            router.refresh();
        }
    };

    if (loading) return <div className="p-10 flex justify-center"><Skeleton className="h-[400px] w-[400px]" /></div>;
    if (!token) return <div className="p-10 text-center">Token not found</div>;

    const estimatedOutput = amount ? (mode === "BUY" ? parseFloat(amount) / token.price : parseFloat(amount) * token.price) : 0;

    return (
        <div className="max-w-xl mx-auto space-y-6 pt-10">
            <div className="flex items-center gap-4 mb-6">
                 <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold">
                    {token.symbol[0]}
                </div>
                <div>
                    <h1 className="text-3xl font-bold">{token.name}</h1>
                    <p className="text-muted-foreground text-lg">${token.price.toFixed(6)} <span className="text-xs bg-muted px-2 py-1 rounded ml-2">MCap: ${(token.marketCap / 1000).toFixed(1)}k</span></p>
                </div>
            </div>

            <Card className="border-2 shadow-xl">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Swap
                        <Button variant="ghost" size="icon" onClick={() => getTokenById(token.id).then(setToken)}>
                            <RefreshCcw className="w-4 h-4" />
                        </Button>
                    </CardTitle>
                    <CardDescription>Trade {token.symbol} instantly.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="buy" onValueChange={(v) => setMode(v === "buy" ? "BUY" : "SELL")} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="buy" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Buy</TabsTrigger>
                            <TabsTrigger value="sell" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Sell</TabsTrigger>
                        </TabsList>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    You Pay ({mode === "BUY" ? "USDT" : token.symbol})
                                </label>
                                <Input 
                                    type="number" 
                                    placeholder="0.00" 
                                    className="text-2xl h-14" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-center text-muted-foreground">
                                <ArrowDownUp className="w-6 h-6" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    You Receive ({mode === "BUY" ? token.symbol : "USDT"}) <span className="text-xs text-muted-foreground">(Estimated)</span>
                                </label>
                                <Input 
                                    readOnly 
                                    className="text-2xl h-14 bg-muted/50" 
                                    value={estimatedOutput.toFixed(4)}
                                />
                            </div>
                        </div>
                    </Tabs>
                </CardContent>
                <CardFooter>
                    <Button 
                        size="lg" 
                        className={`w-full text-lg h-12 ${mode === "BUY" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                        onClick={handleTrade}
                        disabled={trading || !amount}
                    >
                        {trading ? "Swapping..." : `${mode} ${token.symbol}`}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
