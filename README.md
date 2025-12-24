# ⚡ SimuDEX

![SimuDEX Banner](website/public/banner.png)

> **A realistic cryptocurrency trading simulator that lets you experience the risks and mechanics of decentralized exchanges without real financial consequences.**

SimuDEX is an open-source educational platform designed to gamify the DeFi experience. Create coins, trade with liquidity pools, bet on prediction questions, gamble it all, and climb the leaderboards!

## 🚀 Features

*   **🛡️ Risk-Free Trading:** Experience the thrill of the market with simulated assets.
*   **🦄 Real-Time Market:** Create your own tokens and watch them appear instantly on the global market.
*   **🔐 GitHub Auth:** Secure and easy login to manage your portfolio and created assets.
*   **💀 SimuDEX Mode (Formerly Rugplay):** A "Game of Chicken" where you try to ride a pump and sell before the inevitable liquidity pull.
*   **📉 Hopium Feed:** A simulated social sentiment engine that drives simulated price action.
*   **🎰 Gambling Zone:** "Double or Nothing" coin flips and prediction markets.
*   **📊 Advanced Analytics:** Real-time charts, Treemaps (heatmaps), and portfolio tracking.
*   **🏆 Leaderboards:** Compete globally for the highest portfolio value.

## 🛠️ Tech Stack

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/) (via [Supabase](https://supabase.com/))
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **Auth:** [NextAuth.js](https://next-auth.js.org/) (GitHub Provider)
*   **State:** Zustand

## 📦 Getting Started

### Prerequisites

*   Node.js 18+
*   A [Supabase](https://supabase.com/) project (PostgreSQL)
*   A [GitHub OAuth](https://github.com/settings/developers) App

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sploov/SimuDEX.git
    cd SimuDEX/website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the `website` directory:
    ```env
    # Database (Supabase)
    DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
    DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

    # Auth (GitHub)
    GITHUB_ID="your_github_client_id"
    GITHUB_SECRET="your_github_client_secret"
    AUTH_SECRET="generate_a_random_secret_here"
    ```

4.  **Sync Database:**
    ```bash
    npx prisma db push
    ```

5.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📂 Project Structure

```bash
/
├── website/              # The Next.js Application
│   ├── public/           # Static assets (Logos, Banners)
│   ├── prisma/           # Database Schema (PostgreSQL)
│   ├── src/
│   │   ├── app/          # Next.js App Router Pages
│   │   │   ├── api/      # API Routes (Auth)
│   │   │   └── actions.ts # Server Actions (Backend Logic)
│   │   ├── components/   # React Components (Shadcn/UI)
│   │   └── lib/          # Utilities
├── LICENSE               # MIT License
└── README.md             # Documentation
```

## 🤝 Contributing

This project is open-source under the MIT License. Contributions are welcome!

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

---

**Hosted on Vercel | Made by Sploov**
