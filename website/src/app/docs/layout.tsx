import Link from "next/link";
import { ChevronRight, Home, Book, Settings, Activity, Cpu } from "lucide-react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarItems = [
    { name: "Introduction", href: "/docs", icon: Home },
    { name: "Setup Guide", href: "/docs/setup", icon: Settings },
    { name: "Trading Mechanics", href: "/docs/trading", icon: Activity },
    { name: "Technical Specs", href: "/docs/technical", icon: Cpu },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto py-10 px-4">
      <aside className="w-full lg:w-64 shrink-0">
        <div className="sticky top-24">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Book className="w-5 h-5 text-primary" /> Documentation
          </h2>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 max-w-3xl prose prose-invert prose-purple">
        {children}
      </main>
    </div>
  );
}
