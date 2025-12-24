export default function DocsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black">Introduction</h1>
      <p className="text-xl text-muted-foreground">
        Welcome to the SimuDEX Documentation. SimuDEX is a high-fidelity cryptocurrency trading simulator designed to bridge the gap between curiosity and decentralized finance (DeFi) expertise.
      </p>
      
      <h2 className="text-2xl font-bold">What is SimuDEX?</h2>
      <p>
        SimuDEX is an open-source platform that allows users to experience the mechanics of Automated Market Makers (AMMs) without any financial risk. We use real mathematical formulas (`x * y = k`) to simulate price impact, liquidity, and slippage.
      </p>

      <h2 className="text-2xl font-bold">Key Objectives</h2>
      <ul>
        <li><strong>Education:</strong> Understand how token prices change with trade volume.</li>
        <li><strong>Experimentation:</strong> Launch your own tokens and see how they behave in a simulated market.</li>
        <li><strong>Gamification:</strong> Compete with others on the global leaderboard.</li>
      </ul>

      <div className="bg-primary/10 border border-primary/20 p-6 rounded-2xl mt-10">
        <h3 className="text-primary font-bold mb-2">Did you know?</h3>
        <p className="text-sm m-0">
          Every user starts with <strong>10,000 simulated USDT</strong>. Use it wisely!
        </p>
      </div>
    </div>
  );
}
