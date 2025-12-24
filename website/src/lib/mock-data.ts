export const mockTokens = [
  { id: "1", name: "Bitcoin", symbol: "BTC", price: 65000, change: 2.5, isRug: false },
  { id: "2", name: "Ethereum", symbol: "ETH", price: 3500, change: -1.2, isRug: false },
  { id: "3", name: "Solana", symbol: "SOL", price: 145, change: 5.8, isRug: false },
  { id: "4", name: "Pepe", symbol: "PEPE", price: 0.000004, change: 12.5, isRug: false },
  { id: "5", name: "RugCoin", symbol: "RUG", price: 0.05, change: 500.0, isRug: true },
];

export const mockTrades = [
    { id: "1", type: "BUY", symbol: "PEPE", amount: "1M", price: 0.000004, time: "Just now" },
    { id: "2", type: "SELL", symbol: "ETH", amount: "2.5", price: 3498, time: "2s ago" },
    { id: "3", type: "BUY", symbol: "RUG", amount: "5000", price: 0.05, time: "5s ago" },
    { id: "4", type: "BUY", symbol: "SOL", amount: "100", price: 145, time: "8s ago" },
];

export const mockPortfolio = {
    balance: 12450.00,
    change: 15.4,
    assets: [
        { symbol: "USDT", balance: 5000, value: 5000 },
        { symbol: "ETH", balance: 1.5, value: 5250 },
        { symbol: "SOL", balance: 15.1, value: 2200 },
    ]
}
