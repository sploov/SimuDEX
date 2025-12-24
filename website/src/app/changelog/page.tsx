"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Rocket, Bug, RefreshCw } from "lucide-react";

export default function ChangelogPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pt-10">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Changelog</h1>
        <p className="text-muted-foreground">The history of SimuDEX updates.</p>
      </div>

      <div className="relative border-l border-muted ml-4 md:ml-0 pl-8 md:pl-0 space-y-10">
        
        {/* Version 1.0.0 */}
        <div className="relative md:grid md:grid-cols-5 gap-8">
            <div className="md:col-span-1 md:text-right">
                <div className="font-bold text-xl">v1.0.0</div>
                <div className="text-sm text-muted-foreground">Dec 24, 2025</div>
                <Badge variant="default" className="mt-2 bg-green-500 hover:bg-green-600">Launch</Badge>
            </div>
            
            {/* Timeline Dot */}
            <div className="absolute -left-[37px] md:left-[19.5%] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />

            <div className="md:col-span-4 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Rocket className="w-5 h-5 text-primary" /> Initial Release
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-primary mb-2">🚀 New Features</h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                                <li><strong>Real Trading Engine:</strong> AMM swap logic (x * y = k) connected to DB.</li>
                                <li><strong>SimuDEX Mode:</strong> High-stakes gambling game (formerly Rugplay).</li>
                                <li><strong>Portfolio:</strong> Real-time asset tracking with Supabase.</li>
                                <li><strong>GitHub Auth:</strong> Secure login via NextAuth.js.</li>
                                <li><strong>Token Creator:</strong> Users can launch their own custom tokens.</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-blue-400 mb-2">🔄 Changes</h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                                <li>Rebranded from "Rugplay" to "SimuDEX".</li>
                                <li>Migrated from SQLite to PostgreSQL (Supabase).</li>
                                <li>Polished UI with "Lovable" Dark Mode theme.</li>
                            </ul>
                        </div>

                         <div>
                            <h4 className="font-semibold text-red-400 mb-2">🐛 Fixes</h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                                <li>Fixed Prisma 7 build issues on Vercel.</li>
                                <li>Resolved DB connection pooler timeouts.</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

      </div>
    </div>
  );
}
