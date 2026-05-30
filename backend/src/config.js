export const TOKEN_MARKETS = [
  { id: "binancecoin", symbol: "BNB", displayName: "BNB Chain", platform: "Binance Alpha" },
  { id: "ethereum", symbol: "ETH", displayName: "Ethereum", platform: "OKX Wallet" },
  { id: "solana", symbol: "SOL", displayName: "Solana", platform: "Unknown" },
  { id: "pepe", symbol: "PEPE", displayName: "Meme", platform: "OKX Wallet" },
  { id: "dogwifcoin", symbol: "WIF", displayName: "Meme", platform: "Bitget Onchain" },
  { id: "tether", symbol: "USDT", displayName: "Stablecoin", platform: "BN Wallet" },
];

export const CHAIN_MARKETS = [
  { llamaName: "BSC", displayName: "BNB Chain" },
  { llamaName: "Ethereum", displayName: "Ethereum" },
  { llamaName: "Solana", displayName: "Solana" },
  { llamaName: "Base", displayName: "Base" },
  { llamaName: "Arbitrum", displayName: "Arbitrum" },
];

export const DEFAULT_POOL = {
  network: "bsc",
  tokenAddress: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
};

export const CACHE_KEYS = {
  tokens: "markets:tokens",
  chains: "markets:chains",
  pools: (network, tokenAddress) => `markets:pools:${network}:${tokenAddress.toLowerCase()}`,
  sources: "markets:sources",
};
