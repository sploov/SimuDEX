"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Timer, Skull, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function RugplayPage() {
  const [multiplier, setMultiplier] = useState(1.0);
  const [crashed, setCrashed] = useState(false);
  const [running, setRunning] = useState(false);
  
  // Game Logic (Simulation)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running && !crashed) {
      interval = setInterval(() => {
        setMultiplier((prev) => {
            const crashChance = Math.random();
            // 2% chance to crash every tick, increases as multiplier goes up
            if (crashChance < 0.02 + (prev * 0.005)) {
                setCrashed(true);
                setRunning(false);
                toast.error("RUGGED! The liquidity was pulled.", { description: `Crashed at ${prev.toFixed(2)}x` });
                return prev;
            }
            return prev + 0.05;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [running, crashed]);

  const handleStart = () => {
    setMultiplier(1.0);
    setCrashed(false);
    setRunning(true);
    toast("Liquidity Locked", { description: "The pump has started! Good luck." });
  };

  const handleCashout = () => {
    setRunning(false);
    toast.success("Sold Top!", { description: `You secured a ${multiplier.toFixed(2)}x profit!` });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
         <h1 className="text-4xl font-extrabold tracking-tight text-red-500 flex justify-center items-center gap-2">
            <Skull className="w-10 h-10" /> SimuDEX
         </h1>
         <p className="text-muted-foreground text-lg">
            Buy in. Ride the pump. Sell before the developer pulls the liquidity.
         </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* The Game Area */}
        <Card className={`border-2 transition-all duration-300 ${crashed ? 'border-red-600 bg-red-950/20' : running ? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'border-muted'}`}>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Current Multiplier</span>
                    {running && <Badge variant="outline" className="animate-pulse bg-green-500/20 text-green-500 border-green-500">PUMPING</Badge>}
                    {crashed && <Badge variant="destructive">RUGGED</Badge>}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10">
                <div className={`text-7xl font-mono font-black transition-all ${crashed ? 'text-red-600' : running ? 'text-green-400 scale-110' : 'text-muted-foreground'}`}>
                    {multiplier.toFixed(2)}x
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                    {crashed ? "Liquidity Removed. You lost everything." : running ? "Price is soaring..." : "Waiting for next round"}
                </p>
            </CardContent>
            <CardFooter className="flex gap-4">
                {!running || crashed ? (
                    <Button onClick={handleStart} className="w-full text-lg h-12" size="lg" disabled={running && !crashed}>
                        {crashed ? "Try Again" : "Buy In (100 USDT)"}
                    </Button>
                ) : (
                    <Button onClick={handleCashout} variant="secondary" className="w-full text-lg h-12 bg-green-500 hover:bg-green-600 text-white" size="lg">
                        SELL NOW (+${(100 * multiplier).toFixed(0)})
                    </Button>
                )}
            </CardFooter>
        </Card>

        {/* Live Feed / Stats */}
        <Card>
            <CardHeader>
                <CardTitle>Live Activity</CardTitle>
                <CardDescription>Other traders risking it all</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[1,2,3].map((_, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-primary/20" />
                                <span className="text-muted-foreground">User...{Math.floor(Math.random()*900)+100}</span>
                            </div>
                            <span className="text-green-500 font-bold">+{Math.floor(Math.random()*200)+20}%</span>
                        </div>
                    ))}
                     <div className="flex justify-between items-center text-sm opacity-50">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-red-500/20" />
                            <span className="text-red-500">User...332</span>
                        </div>
                        <span className="text-red-500 font-bold">RUGGED</span>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="bg-red-950/10 border border-red-500/20 p-4 rounded-lg flex gap-4 items-start">
        <AlertTriangle className="text-red-500 shrink-0" />
        <div>
            <h3 className="font-bold text-red-500">Warning: High Risk Mode</h3>
            <p className="text-sm text-red-400/80">
                In SimuDEX, the token developer (AI) can pull liquidity at any second. If you don't sell before the rug pull, you lose your entire bet. There are no refunds.
            </p>
        </div>
      </div>
    </div>
  );
}
