# ⚡ SimuDEX

![SimuDEX Banner](website/public/banner.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://vercel.com)
[![Status](https://img.shields.io/badge/Status-Live-green)](https://simudex.vercel.app)

> **A realistic cryptocurrency trading simulator that lets you experience the risks and mechanics of decentralized exchanges without real financial consequences.**

SimuDEX is an open-source educational platform designed to gamify the DeFi experience. Create coins, trade with liquidity pools, bet on prediction questions, gamble it all, and climb the leaderboards!

---

## 🚀 Features

*   **🛡️ Risk-Free Trading:** Experience the thrill of the market with simulated assets (Start with **10,000 USDT**).
*   **🦄 Real-Time Market:** Create your own tokens and watch them appear instantly on the global market.
*   **💹 AMM Trading Engine:** Fully functional swap interface using `x * y = k` constant product formula.
*   **🔐 GitHub Auth:** Secure and easy login to manage your portfolio and created assets.
*   **💀 SimuDEX Mode:** A "Game of Chicken" where you try to ride a pump and sell before the inevitable liquidity pull.
*   **📉 Hopium Feed:** A simulated social sentiment engine that drives simulated price action.
*   **📊 Advanced Analytics:** Real-time charts, Treemaps, and detailed portfolio tracking.

## 🛠️ Tech Stack

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/) (via [Supabase](https://supabase.com/))
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **Auth:** [NextAuth.js](https://next-auth.js.org/) (GitHub Provider)

## 📦 Getting Started

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
    Create a `.env` file in the `website` directory with your Supabase & GitHub credentials.

4.  **Sync Database:**
    ```bash
    npx prisma db push
    ```

5.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## 📜 Documentation

*   [Changelog](CHANGELOG.md) - See what's new.
*   [Credits](website/src/app/credits/page.tsx) - The team behind SimuDEX.

## 🤝 Contributing

This project is open-source under the MIT License. Contributions are welcome!

1.  Fork the repository
2.  Create your feature branch
3.  Commit your changes
4.  Push to the branch
5.  Open a Pull Request

---

**Hosted on Vercel | Made by Sploov & Ramkrishna**