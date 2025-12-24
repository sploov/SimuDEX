"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Twitter, Code, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreditsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pt-10 text-center">
      <div className="space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Hall of Fame
        </h1>
        <p className="text-xl text-muted-foreground">
            The minds and builders behind SimuDEX.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Sploov Card */}
        <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 hover:scale-105 transition-transform duration-300">
            <CardHeader className="flex flex-col items-center pb-2">
                <div className="w-32 h-32 rounded-full border-4 border-primary p-1 mb-4 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                    <Avatar className="w-full h-full">
                        <AvatarImage src="https://github.com/sploov.png" />
                        <AvatarFallback>SP</AvatarFallback>
                    </Avatar>
                </div>
                <CardTitle className="text-2xl font-bold">Sploov</CardTitle>
                <div className="flex items-center gap-2 text-primary font-medium">
                    <Sparkles className="w-4 h-4" /> Creator & Visionary
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                    The mastermind behind the concept. Bringing the thrill of DeFi to a risk-free environment for everyone to learn and enjoy.
                </p>
                <div className="flex justify-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="https://github.com/sploov" target="_blank">
                            <Github className="w-5 h-5" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                        <Link href="https://twitter.com/sploov" target="_blank">
                            <Twitter className="w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>

        {/* Ramkrishna Card */}
        <Card className="border-blue-500/20 bg-gradient-to-br from-card to-blue-500/5 hover:scale-105 transition-transform duration-300">
            <CardHeader className="flex flex-col items-center pb-2">
                <div className="w-32 h-32 rounded-full border-4 border-blue-500 p-1 mb-4 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                    <Avatar className="w-full h-full">
                        <AvatarImage src="https://github.com/ramkrishna-xyz.png" />
                        <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                </div>
                <CardTitle className="text-2xl font-bold">Ramkrishna</CardTitle>
                <div className="flex items-center gap-2 text-blue-500 font-medium">
                    <Code className="w-4 h-4" /> Lead Developer
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                    The engineer who brought the simulation to life. Architect of the trading engine, database, and the seamless user experience.
                </p>
                <div className="flex justify-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="https://github.com/ramkrishna-xyz" target="_blank">
                            <Github className="w-5 h-5" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                        <Link href="https://x.com/ramkrishna_xyz" target="_blank">
                            <Twitter className="w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="pt-10">
        <h3 className="text-xl font-bold mb-6">Special Thanks</h3>
        <div className="flex flex-wrap justify-center gap-4">
            {["Next.js", "Vercel", "Supabase", "Tailwind CSS", "Shadcn UI", "Prisma"].map((tech) => (
                <div key={tech} className="px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-muted/80 transition-colors cursor-default">
                    {tech}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
