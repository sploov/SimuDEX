import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar, MobileNav } from "@/components/layout/AppSidebar";
import { Toaster } from "@/components/ui/sonner";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SimuDEX | The Realistic Crypto Simulator",
  description: "Experience decentralized trading without the financial risk. Trade, bet, and rugplay.",
};

import { UserAuth } from "@/components/layout/UserAuth";

"use client";

import { useEffect, useState } from "react";
import { getTokens } from "@/app/actions";

function PriceTicker() {
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    getTokens().then(setTokens);
    const interval = setInterval(() => getTokens().then(setTokens), 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:flex overflow-hidden whitespace-nowrap bg-primary/5 border-y border-white/5 py-1">
      <div className="animate-marquee inline-block">
        {tokens.map((t) => (
          <span key={t.id} className="mx-6 text-xs font-mono">
            <span className="text-muted-foreground">{t.symbol}:</span>{" "}
            <span className={t.price > 1 ? "text-green-400" : "text-blue-400"}>
              ${t.price.toFixed(t.price < 0.01 ? 6 : 2)}
            </span>
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {tokens.map((t) => (
          <span key={`dup-${t.id}`} className="mx-6 text-xs font-mono">
            <span className="text-muted-foreground">{t.symbol}:</span>{" "}
            <span className={t.price > 1 ? "text-green-400" : "text-blue-400"}>
              ${t.price.toFixed(t.price < 0.01 ? 6 : 2)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground flex h-screen overflow-hidden`}
      >
        <AppSidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <header className="flex flex-col border-b bg-card/50 backdrop-blur-xl z-10">
                <div className="h-14 lg:h-[60px] flex items-center gap-4 px-6 justify-between md:justify-end">
                    <MobileNav />
                    
                    {/* Header Actions */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Bell className="w-4 h-4" />
                        </Button>
                        <UserAuth />
                    </div>
                </div>
                <PriceTicker />
            </header>
            
            <main className="flex-1 overflow-auto p-4 lg:p-6 relative">
                 {/* Background Glow Effects */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                     <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[128px]" />
                     <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[128px]" />
                </div>
                
                {children}
            </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}