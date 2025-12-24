"use client";

import { useEffect, useState } from "react";
import { getTokens } from "@/app/actions";

export function PriceTicker() {
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    getTokens().then(setTokens);
    const interval = setInterval(() => getTokens().then(setTokens), 10000);
    return () => clearInterval(interval);
  }, []);

  if (tokens.length === 0) return null;

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
