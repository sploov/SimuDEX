# Changelog

All notable changes to the **SimuDEX** project will be documented in this file.

## [v1.0.0] - 2025-12-24 (Launch Day)

### 🚀 Released
- **SimuDEX Core:** Full-stack Next.js application launch.
- **Real Trading Engine:** Implemented AMM (Automated Market Maker) logic (`x * y = k`) for realistic price simulation.
- **Database Integration:** Switched from local SQLite to **Supabase PostgreSQL** for production-grade data persistence.
- **Authentication:** Integrated **GitHub OAuth** via NextAuth.js.
- **Portfolio:** Real-time tracking of simulated USDT balance and token holdings.
- **Token Launchpad:** Users can create their own tokens with custom supply and initial liquidity.
- **Rugplay Mode:** A high-risk "Game of Chicken" gambling mode.
- **UI/UX:** Complete "Lovable" Dark Mode redesign with Glassmorphism effects using Tailwind & Shadcn/UI.

### 🐛 Fixed
- Fixed Vercel build errors related to Prisma 7 configuration (Downgraded to Stable v5).
- Resolved database connection issues with Supabase Transaction Pooler.
- Fixed mock data display in Market to show real user-generated tokens.

### 🔄 Changed
- Renamed project from **"Rugplay"** to **"SimuDEX"** to reflect broader scope.
- Updated project structure to monorepo-style layout.
