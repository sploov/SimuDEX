"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LineChart,
  Zap,
  Skull,
  Dices,
  Trophy,
  Wallet,
  Grid3X3,
  PlusCircle,
  Bell,
  Info,
  FileText,
  Shield,
  Menu,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "/", icon: LayoutDashboard },
  { name: "Market", href: "/market", icon: LineChart },
  { name: "Hopium", href: "/hopium", icon: Zap },
  { name: "SimuDEX", href: "/rugplay", icon: Skull, className: "text-red-500 animate-pulse" },
  { name: "Gambling", href: "/gambling", icon: Dices },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Portfolio", href: "/portfolio", icon: Wallet },
  { name: "Treemap", href: "/market#treemap", icon: Grid3X3 },
  { name: "Create Coin", href: "/create-coin", icon: PlusCircle },
];

const footerItems = [
  { name: "About", href: "/about", icon: Info },
  { name: "Terms", href: "/terms", icon: FileText },
  { name: "Privacy", href: "/privacy", icon: Shield },
  { name: "Changelog", href: "/changelog", icon: RefreshCw },
  { name: "Credits", href: "/credits", icon: Sparkles },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r border-white/10 bg-background/40 md:block md:w-64 lg:w-72 h-screen sticky top-0 backdrop-blur-2xl">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6 lg:h-[70px]">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="relative w-8 h-8 mr-2">
                <Image src="/logo.png" alt="SimuDEX Logo" fill className="object-contain" />
            </div>
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent text-2xl">
              SimuDEX
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium lg:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === item.href
                    ? "bg-muted text-primary"
                    : "text-muted-foreground",
                  item.className
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-2">Info</h3>
             <nav className="grid items-start text-sm font-medium">
            {footerItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
            </nav>
        </div>
      </div>
    </div>
  );
}

export function MobileNav() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-background/50 backdrop-blur-sm border-0">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0 w-72">
                 <div className="flex h-14 items-center border-b px-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl" onClick={() => setOpen(false)}>
                        <div className="relative w-6 h-6 mr-2">
                            <Image src="/logo.png" alt="SimuDEX Logo" fill className="object-contain" />
                        </div>
                        <span>SimuDEX</span>
                    </Link>
                </div>
                <ScrollArea className="flex-1 py-4">
                     <nav className="grid gap-2 px-4 text-sm font-medium">
                        {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                            pathname === item.href
                                ? "bg-muted text-primary"
                                : "text-muted-foreground",
                             item.className
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                        ))}
                         <div className="my-4 border-t" />
                         {footerItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground"
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}