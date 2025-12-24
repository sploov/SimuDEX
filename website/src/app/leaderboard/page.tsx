"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy, Medal } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
       <div>
            <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
            <p className="text-muted-foreground">The richest simulated traders in the world.</p>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead className="text-right">Win Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rank) => (
                <TableRow key={rank}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {rank === 1 && <Medal className="w-4 h-4 text-yellow-500" />}
                    {rank === 2 && <Medal className="w-4 h-4 text-gray-400" />}
                    {rank === 3 && <Medal className="w-4 h-4 text-amber-600" />}
                    #{rank}
                  </TableCell>
                  <TableCell>Trader_{Math.floor(Math.random() * 10000)}</TableCell>
                  <TableCell>${(1000000 / rank).toLocaleString()}</TableCell>
                  <TableCell className="text-right">{(Math.random() * 100).toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
    </div>
  );
}
