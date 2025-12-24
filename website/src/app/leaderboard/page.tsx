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
import { useEffect, useState } from "react";
import { getLeaderboard } from "@/app/actions";

export default function LeaderboardPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getLeaderboard().then(setUsers);
  }, []);

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
                <TableHead>Liquid USDT</TableHead>
                <TableHead className="text-right">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {index === 0 && <Medal className="w-4 h-4 text-yellow-500" />}
                    {index === 1 && <Medal className="w-4 h-4 text-gray-400" />}
                    {index === 2 && <Medal className="w-4 h-4 text-amber-600" />}
                    #{index + 1}
                  </TableCell>
                  <TableCell>{user.username || user.email?.split('@')[0] || "Anonymous"}</TableCell>
                  <TableCell>${user.balanceUSDT.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                  <TableCell className="text-right">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
    </div>
  );
}
