export default function TechnicalDocs() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black">Technical Specs</h1>
      <p className="text-xl text-muted-foreground">
        The architecture and stack powering SimuDEX.
      </p>

      <div className="grid grid-cols-2 gap-4 not-prose">
        {[
          { label: "Frontend", value: "Next.js 14 (App Router)" },
          { label: "Styling", value: "Tailwind CSS 4.0" },
          { label: "Components", value: "Shadcn/UI (Radix)" },
          { label: "Language", value: "TypeScript" },
          { label: "Database", value: "PostgreSQL (Supabase)" },
          { label: "ORM", value: "Prisma 5" },
          { label: "Auth", value: "NextAuth.js v5" },
          { label: "Charts", value: "Recharts" },
        ].map((item) => (
          <div key={item.label} className="p-4 rounded-xl border border-white/5 bg-white/5">
            <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{item.label}</div>
            <div className="text-lg font-medium">{item.value}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold">Database Schema</h2>
      <p>
        The system uses a relational schema to manage Users, Tokens, Positions, and Trades. You can find the full definition in <code>prisma/schema.prisma</code>.
      </p>

      <h2 className="text-2xl font-bold">Server Actions</h2>
      <p>
        All business logic (swaps, gambling, token creation) is implemented in <code>src/app/actions.ts</code> using Next.js Server Actions, ensuring type-safe and secure execution.
      </p>
    </div>
  );
}
