export const TOKEN_MARKETS = [
  { id: "binancecoin", paprikaId: "bnb-binance-coin", symbol: "BNB", displayName: "BNB Chain", platform: "Binance Alpha" },
  { id: "ethereum", paprikaId: "eth-ethereum", symbol: "ETH", displayName: "Ethereum", platform: "OKX Wallet" },
  { id: "solana", paprikaId: "sol-solana", symbol: "SOL", displayName: "Solana", platform: "Unknown" },
  { id: "pepe", paprikaId: "pepe-pepe", symbol: "PEPE", displayName: "Meme", platform: "OKX Wallet" },
  { id: "dogwifcoin", paprikaId: "wif-dogwifhat", symbol: "WIF", displayName: "Meme", platform: "Bitget Onchain" },
  { id: "tether", paprikaId: "usdt-tether", symbol: "USDT", displayName: "Stablecoin", platform: "BN Wallet" },
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

export const ALLOWED_POOLS = [
  DEFAULT_POOL,
];

export const RADAR_MARKETS = [
  { symbol: "SOL", query: "SOL", tokenAddress: "So11111111111111111111111111111111111111112", chain: "solana", risk: "Medium", signal: "Volume acceleration", action: "Open pair detail" },
  { symbol: "PEPE", query: "PEPE", tokenAddress: "0x6982508145454ce325ddbe47a25d4ec3d2311933", chain: "ethereum", risk: "High", signal: "DEX volume spike", action: "Check contract risk" },
  { symbol: "BNB", query: "WBNB", tokenAddress: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", chain: "bsc", risk: "Low", signal: "Platform share expansion", action: "Inspect entry mix" },
  { symbol: "WIF", query: "WIF", tokenAddress: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLJw4NLEVGq9W", chain: "solana", risk: "Medium", signal: "Meme rotation watch", action: "Add tighter alerts" },
];

export const RISK_CHECKS = [
  { symbol: "PEPE", chainId: 1, address: "0x6982508145454ce325ddbe47a25d4ec3d2311933", chain: "Ethereum" },
  { symbol: "BNB", chainId: 56, address: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", chain: "BNB Chain" },
  { symbol: "USDT", chainId: 1, address: "0xdac17f958d2ee523a2206206994597c13d831ec7", chain: "Ethereum" },
];

export const OPTIONAL_KEYED_SOURCES = [
  { name: "OKX DEX", purpose: "Official supported chains, liquidity sources, quotes, and swap route metadata", envVar: "OKX_DEX_API_KEY" },
  { name: "Etherscan V2", purpose: "EVM holders, transfers, and address-level on-demand checks", envVar: "ETHERSCAN_API_KEY" },
  { name: "Alchemy", purpose: "Wallet activity, transfers, logs, and websocket modules", envVar: "ALCHEMY_API_KEY" },
  { name: "RugCheck", purpose: "Solana mint, freeze authority, holder distribution, and LP risk", envVar: "RUGCHECK_API_KEY" },
];

export const CACHE_KEYS = {
  tokens: "markets:tokens",
  chains: "markets:chains",
  pools: (network, tokenAddress) => `markets:pools:${network}:${tokenAddress.toLowerCase()}`,
  radar: "markets:radar",
  risks: "markets:risks",
  okxLiquidity: (chainIndex) => `platform:okx:liquidity:${chainIndex}`,
  okxChains: "platform:okx:chains",
  sources: "markets:sources",
};
