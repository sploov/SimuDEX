"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dices, Coins, Trophy } from "lucide-react";
import { toast } from "sonner";

export default function GamblingPage() {
  const [betAmount, setBetAmount] = useState("");
  const [flipping, setFlipping] = useState(false);

  const handleFlip = () => {
    if (!betAmount) return;
    setFlipping(true);
    
    setTimeout(() => {
        setFlipping(false);
        const win = Math.random() > 0.5;
        if (win) {
            toast.success("YOU WON!", { description: `Received $${Number(betAmount) * 2} USDT` });
        } else {
            toast.error("YOU LOST", { description: `Better luck next time.` });
        }
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">The Casino</h1>
            <p className="text-muted-foreground">High risk, high reward. Provably fair (simulated).</p>
        </div>

        <Tabs defaultValue="flip" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="flip">Coin Flip</TabsTrigger>
                <TabsTrigger value="predict">Price Prediction</TabsTrigger>
            </TabsList>
            <TabsContent value="flip">
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Coins className="w-5 h-5 text-yellow-500" /> Double or Nothing
                        </CardTitle>
                        <CardDescription>50/50 chance to double your money.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 text-center">
                        <div className={`w-32 h-32 rounded-full border-4 border-yellow-500 mx-auto flex items-center justify-center text-5xl bg-yellow-500/10 transition-transform duration-500 ${flipping ? 'animate-spin' : ''}`}>
                            $
                        </div>
                        
                        <div className="max-w-xs mx-auto space-y-2">
                             <Input 
                                type="number" 
                                placeholder="Bet Amount (USDT)" 
                                value={betAmount}
                                onChange={(e) => setBetAmount(e.target.value)}
                             />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="lg" onClick={handleFlip} disabled={flipping || !betAmount}>
                            {flipping ? "Flipping..." : "FLIP COIN"}
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
             <TabsContent value="predict">
                <Card className="mt-4">
                     <CardHeader>
                        <CardTitle>Bitcoin Price Prediction</CardTitle>
                        <CardDescription>Will BTC go UP or DOWN in the next 1 minute?</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center py-10 text-muted-foreground">
                        Prediction markets coming soon...
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
