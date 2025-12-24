export default function TradingDocs() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black">Trading Mechanics</h1>
      <p className="text-xl text-muted-foreground">
        Deep dive into how SimuDEX calculates prices and handles swaps.
      </p>

      <h2 className="text-2xl font-bold">The AMM Formula</h2>
      <p>
        SimuDEX uses the <strong>Constant Product Formula</strong> popularized by Uniswap:
      </p>
      <div className="bg-muted p-6 rounded-xl text-center font-mono text-2xl font-bold italic">
        x * y = k
      </div>
      <p>
        Where <code>x</code> is the amount of USDT in the pool, <code>y</code> is the amount of the token, and <code>k</code> is a constant.
      </p>

      <h2 className="text-2xl font-bold">Price Impact</h2>
      <p>
        When you buy a token, you add <code>USDT</code> to the pool and remove <code>Token</code>. This increases the price of the token relative to USDT. The larger your trade relative to the pool size, the higher the "Price Impact" (slippage).
      </p>

      <h2 className="text-2xl font-bold">Fees</h2>
      <p>
        Currently, a flat <strong>1% fee</strong> is applied to every trade. These fees stay in the liquidity pool, slightly increasing the <code>k</code> value and benefitting token value over time.
      </p>
    </div>
  );
}
