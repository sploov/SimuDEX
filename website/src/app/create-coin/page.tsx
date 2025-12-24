"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Rocket, Info } from "lucide-react";
import { toast } from "sonner";
import { createToken } from "@/app/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCoinPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    const formData = new FormData(event.currentTarget);
    const result = await createToken(formData);
    
    setLoading(false);

    if (result.error) {
        toast.error("Launch Failed", { description: result.error });
    } else {
        toast.success("Token Created!", { description: "Your token is now live on the market." });
        router.push("/market");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Launch a Token</h1>
        <p className="text-muted-foreground">Create your own simulated cryptocurrency and provide initial liquidity.</p>
      </div>

      <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
            <CardTitle>Token Details</CardTitle>
            <CardDescription>Define the identity of your asset.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Token Name</Label>
                <Input id="name" name="name" placeholder="e.g. Super Doge Coin" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="ticker">Ticker Symbol</Label>
                <Input id="ticker" name="ticker" placeholder="e.g. SDC" maxLength={5} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="supply">Initial Supply</Label>
                <Input id="supply" name="supply" type="number" defaultValue={1000000} required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="liquidity">Initial Liquidity (USDT)</Label>
                <Input id="liquidity" name="liquidity" type="number" placeholder="Amount of fake USDT to pair" required />
                <p className="text-xs text-muted-foreground">You must fund the pool with your simulated USDT balance.</p>
            </div>
            
            <div className="flex items-center justify-between border p-4 rounded-lg bg-muted/20">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="isRugPlay">Enable "Rugplay" Mode</Label>
                    <p className="text-sm text-muted-foreground">
                        Allow the AI to randomly remove liquidity (High Risk/High Reward).
                    </p>
                </div>
                <Switch id="isRugPlay" name="isRugPlay" />
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" size="lg" type="submit" disabled={loading}>
                {loading ? <span className="animate-spin mr-2">⏳</span> : <Rocket className="mr-2 h-4 w-4" />} 
                {loading ? "Deploying..." : "Launch Token"}
            </Button>
        </CardFooter>
      </Card>
      </form>

      <div className="flex gap-2 p-4 bg-primary/10 text-primary rounded-lg text-sm items-center">
        <Info className="w-4 h-4 shrink-0" />
        <p>Creating a coin costs 100 USDT (Simulated). The price will be determined by your initial liquidity ratio.</p>
      </div>
    </div>
  );
}
