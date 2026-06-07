const platformData = [
  { name: "Binance Alpha", chain: "BNB Chain", volume: "$3.92B", share: 30.5, tx: "4.8M", wallets: "890K", confidence: "High", policy: "Cached + referral labels", color: "#167a5b" },
  { name: "BN Wallet", chain: "BNB Chain", volume: "$2.54B", share: 19.8, tx: "3.1M", wallets: "720K", confidence: "High", policy: "Cached aggregates", color: "#346bc2" },
  { name: "OKX Wallet", chain: "Ethereum", volume: "$2.11B", share: 16.4, tx: "2.7M", wallets: "640K", confidence: "Medium", policy: "Intent detail call", color: "#b6df5f", expensive: true },
  { name: "Bitget Onchain", chain: "Base", volume: "$1.38B", share: 10.7, tx: "1.9M", wallets: "390K", confidence: "Medium", policy: "Cached aggregates", color: "#c27a2c" },
  { name: "Unknown / Unattributed", chain: "Solana", volume: "$1.82B", share: 14.2, tx: "3.4M", wallets: "1.2M", confidence: "Low", policy: "No paid lookup", color: "#d2d8d5" },
];

const tokenMarketConfig = [
  { id: "binancecoin", symbol: "BNB", fallbackName: "BNB Chain", platform: "Binance Alpha" },
  { id: "ethereum", symbol: "ETH", fallbackName: "Ethereum", platform: "OKX Wallet" },
  { id: "solana", symbol: "SOL", fallbackName: "Solana", platform: "Unknown" },
  { id: "pepe", symbol: "PEPE", fallbackName: "Meme", platform: "OKX Wallet" },
  { id: "dogwifcoin", symbol: "WIF", fallbackName: "Meme", platform: "Bitget Onchain" },
  { id: "tether", symbol: "USDT", fallbackName: "Stablecoin", platform: "BN Wallet" },
];

const chainMarketConfig = [
  { llamaName: "BSC", displayName: "BNB Chain", policy: "DeFiLlama chain TVL" },
  { llamaName: "Ethereum", displayName: "Ethereum", policy: "DeFiLlama chain TVL" },
  { llamaName: "Solana", displayName: "Solana", policy: "DeFiLlama chain TVL" },
  { llamaName: "Base", displayName: "Base", policy: "DeFiLlama chain TVL" },
  { llamaName: "Arbitrum", displayName: "Arbitrum", policy: "DeFiLlama chain TVL" },
];

const poolMarketConfig = {
  network: "bsc",
  tokenAddress: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
};

const backendApiBase = (window.WEB3_API_BASE || "").replace(/\/$/, "");

let tokenData = [
  { id: "binancecoin", symbol: "BNB", name: "BNB Chain", volume: "$1.42B", change: "+12.4%", liquidity: "$642M", platform: "Binance Alpha" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", volume: "$1.21B", change: "+4.8%", liquidity: "$1.8B", platform: "OKX Wallet" },
  { id: "solana", symbol: "SOL", name: "Solana", volume: "$940M", change: "+18.1%", liquidity: "$768M", platform: "Unknown" },
  { id: "pepe", symbol: "PEPE", name: "Meme", volume: "$386M", change: "+31.5%", liquidity: "$116M", platform: "OKX Wallet" },
  { id: "dogwifcoin", symbol: "WIF", name: "Meme", volume: "$214M", change: "-2.6%", liquidity: "$82M", platform: "Bitget Onchain" },
  { id: "tether", symbol: "USDT", name: "Stablecoin", volume: "$1.08B", change: "+2.2%", liquidity: "$4.4B", platform: "BN Wallet" },
];

let chainData = [
  { name: "BNB Chain", share: 34.8, volume: "$4.46B", tx: "6.9M", policy: "Archive + cached rollup" },
  { name: "Ethereum", share: 22.1, volume: "$2.84B", tx: "3.2M", policy: "Indexer batch" },
  { name: "Solana", share: 18.7, volume: "$2.40B", tx: "5.8M", policy: "Public API + sample" },
  { name: "Base", share: 12.6, volume: "$1.62B", tx: "1.9M", policy: "Subgraph cache" },
  { name: "Arbitrum", share: 8.4, volume: "$1.08B", tx: "910K", policy: "Daily rollup" },
];

let pairData = [
  { name: "BNB/USDT", meta: "Cached pair rollup", value: "$486M" },
  { name: "BNB/ETH", meta: "Cached pair rollup", value: "$214M" },
  { name: "BNB/USDC", meta: "Cached pair rollup", value: "$168M" },
  { name: "BNB/SOL", meta: "Cached pair rollup", value: "$92M" },
];

const ruleData = [
  { type: "Router contract", example: "0x...AlphaRouter", platform: "Binance Alpha", confidence: "High", cost: "Free after label", status: "Active" },
  { type: "Referral code", example: "ref=okx_wallet", platform: "OKX Wallet", confidence: "High", cost: "Low", status: "Active" },
  { type: "Calldata pattern", example: "swapExactTokens*", platform: "BN Wallet", confidence: "Medium", cost: "Batch parse", status: "Review" },
  { type: "Aggregator route", example: "1inch / Jupiter", platform: "Multiple", confidence: "Low", cost: "On demand", status: "Needs proof" },
  { type: "Tagged entry wallet", example: "0x...campaign", platform: "Bitget Onchain", confidence: "Medium", cost: "Low", status: "Active" },
];

const alertData = [
  { title: "Bitget Onchain share up 3.8 pts", meta: "Base · meme assets · 24h", level: "High" },
  { title: "Unknown attribution above threshold", meta: "Solana · 17.8% unattributed", level: "Medium" },
  { title: "PEPE volume spike on OKX Wallet", meta: "Ethereum · +31.5%", level: "High" },
  { title: "BN Wallet new wallets cooling", meta: "BNB Chain · -6.2%", level: "Low" },
];

let radarSignals = [
  { asset: "SOL", chain: "Solana", signal: "Volume acceleration", move: "+18.1% 24h", liquidity: "$768M", risk: "Medium", action: "Open pair detail" },
  { asset: "PEPE", chain: "Ethereum", signal: "DEX volume spike", move: "+31.5% 24h", liquidity: "$116M", risk: "High", action: "Check contract risk" },
  { asset: "BNB", chain: "BNB Chain", signal: "Platform share expansion", move: "+12.4% 24h", liquidity: "$642M", risk: "Low", action: "Inspect entry mix" },
  { asset: "WIF", chain: "Solana", signal: "Meme rotation watch", move: "-2.6% 24h", liquidity: "$82M", risk: "Medium", action: "Add tighter alerts" },
];

const radarMarketConfig = [
  { asset: "SOL", query: "SOL", tokenAddress: "So11111111111111111111111111111111111111112", chain: "solana", signal: "Volume acceleration", risk: "Medium", action: "Open pair detail" },
  { asset: "PEPE", query: "PEPE", tokenAddress: "0x6982508145454ce325ddbe47a25d4ec3d2311933", chain: "ethereum", signal: "DEX volume spike", risk: "High", action: "Check contract risk" },
  { asset: "BNB", query: "WBNB", tokenAddress: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", chain: "bsc", signal: "Platform share expansion", risk: "Low", action: "Inspect entry mix" },
  { asset: "WIF", query: "WIF", tokenAddress: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLJw4NLEVGq9W", chain: "solana", signal: "Meme rotation watch", risk: "Medium", action: "Add tighter alerts" },
];

const riskCheckConfig = [
  { symbol: "PEPE", chain: "Ethereum", chainId: 1, address: "0x6982508145454ce325ddbe47a25d4ec3d2311933" },
  { symbol: "BNB", chain: "BNB Chain", chainId: 56, address: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c" },
  { symbol: "USDT", chain: "Ethereum", chainId: 1, address: "0xdac17f958d2ee523a2206206994597c13d831ec7" },
];

const watchlistAssets = [
  { symbol: "BTC", chain: "Market", tier: "60s price", alert: "ETF flow + dominance" },
  { symbol: "ETH", chain: "Ethereum", tier: "60s price", alert: "Gas, ETF, staking flow" },
  { symbol: "SOL", chain: "Solana", tier: "1m liquidity", alert: "DEX volume spike" },
  { symbol: "BNB", chain: "BNB Chain", tier: "5m pair", alert: "Alpha entry share" },
  { symbol: "PEPE", chain: "Ethereum", tier: "5m risk", alert: "Volume + liquidity change" },
  { symbol: "WIF", chain: "Solana", tier: "5m pair", alert: "Meme rotation" },
];

const sourceData = [
  { name: "DeFiLlama TVL", state: "Delayed", freshness: "mock fallback", confidence: 82 },
  { name: "DEX Screener", state: "Delayed", freshness: "mock fallback", confidence: 78 },
  { name: "Honeypot.is", state: "Delayed", freshness: "mock fallback", confidence: 74 },
  { name: "OKX DEX", state: "Needs key", freshness: "configure secrets", confidence: 88 },
  { name: "CoinPaprika fallback", state: "Ready", freshness: "on market API failure", confidence: 76 },
  { name: "Platform labels", state: "Healthy", freshness: "1 hr", confidence: 91 },
  { name: "Market prices", state: "Delayed", freshness: "22 min", confidence: 84 },
  { name: "GeckoTerminal Pools", state: "Delayed", freshness: "mock fallback", confidence: 80 },
  { name: "Community tags", state: "Review", freshness: "1 day", confidence: 68 },
];

const tokenSplitData = [
  { name: "Binance Alpha", share: 38, color: "#167a5b" },
  { name: "BN Wallet", share: 24, color: "#346bc2" },
  { name: "OKX Wallet", share: 18, color: "#b6df5f" },
  { name: "Bitget Onchain", share: 11, color: "#c27a2c" },
  { name: "Unknown", share: 9, color: "#d2d8d5" },
];

let okxLiquiditySources = [
  { name: "Uniswap V2", meta: "Official OKX DEX liquidity source example", state: "Needs key" },
  { name: "SushiSwap", meta: "Configure OKX credentials to refresh", state: "Needs key" },
  { name: "PancakeSwap", meta: "Supports chain-specific liquidity discovery", state: "Needs key" },
];

const rangeMetrics = {
  "24h": ["$12.84B", "18.7M", "4.26M", "14.2%"],
  "7d": ["$76.31B", "109.5M", "12.9M", "13.6%"],
  "30d": ["$312.4B", "426.8M", "31.7M", "15.1%"],
  "90d": ["$861.9B", "1.18B", "67.4M", "17.8%"],
};

const pageTitles = {
  overview: "All-chain market intelligence",
  marketRadar: "Crypto trader market radar",
  platforms: "Platform entry market share",
  platformDetail: "Platform performance detail",
  tokens: "Token ranking and discovery",
  tokenDetail: "Token platform distribution",
  chains: "Chain market share",
  chainDetail: "Chain performance detail",
  attribution: "Attribution rules and confidence",
  alerts: "Market anomaly monitoring",
  sources: "Data source health",
  exports: "Exports and reporting",
  apiCost: "API cost controls",
};

const i18n = {
  en: {
    syncStatus: "Cached market view · last sync 12 min ago",
    search: "Search",
    searchPlaceholder: "Token, chain, platform",
    refreshCached: "Refresh cached",
    allChains: "All chains",
    lowCostMode: "Low-cost mode",
    balancedMode: "Balanced mode",
    deepMode: "Deep research mode",
    exportCsv: "Export CSV",
    nav: {
      overview: "Overview",
      marketRadar: "Market Radar",
      platforms: "Platforms",
      platformDetail: "Platform Detail",
      tokens: "Tokens",
      tokenDetail: "Token Detail",
      chains: "Chains",
      chainDetail: "Chain Detail",
      attribution: "Attribution",
      alerts: "Alerts",
      sources: "Sources",
      exports: "Exports",
      apiCost: "API Cost",
    },
    pageTitles,
    cachedToast: "Refreshing cached rollups only. No wallet-level API calls triggered.",
    exportToast: "CSV export opens queued report exports.",
    languageToast: "Language switched to English.",
  },
  zh: {
    syncStatus: "缓存市场视图 · 12 分钟前同步",
    search: "搜索",
    searchPlaceholder: "代币、链、平台",
    refreshCached: "刷新缓存",
    allChains: "全部链",
    lowCostMode: "低成本模式",
    balancedMode: "平衡模式",
    deepMode: "深度研究模式",
    exportCsv: "导出 CSV",
    nav: {
      overview: "总览",
      marketRadar: "市场雷达",
      platforms: "平台",
      platformDetail: "平台详情",
      tokens: "代币",
      tokenDetail: "代币详情",
      chains: "链",
      chainDetail: "链详情",
      attribution: "归因",
      alerts: "异动提醒",
      sources: "数据源",
      exports: "导出",
      apiCost: "API 成本",
    },
    pageTitles: {
      overview: "全链市场情报",
      marketRadar: "Crypto 市场雷达",
      platforms: "平台入口市场份额",
      platformDetail: "平台表现详情",
      tokens: "代币排行与发现",
      tokenDetail: "代币平台分布",
      chains: "链市场份额",
      chainDetail: "链表现详情",
      attribution: "归因规则与置信度",
      alerts: "市场异动监控",
      sources: "数据源健康度",
      exports: "导出与报告",
      apiCost: "API 成本控制",
    },
    cachedToast: "只刷新缓存汇总，不触发钱包级 API 调用。",
    exportToast: "CSV 导出会进入报告队列。",
    languageToast: "已切换为简体中文。",
  },
};

let currentLang = "en";
let selectedRange = "24h";
const sourceSyncTimes = new Map();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const toast = $("#toast");

const zhText = {
  "API Budget": "API 预算",
  "Default pages use cached rollups. Expensive wallet and attribution calls are loaded only after user intent.": "默认页面使用缓存汇总。昂贵的钱包和归因调用只在用户明确操作后加载。",
  "Volume": "交易量",
  "Transactions": "交易笔数",
  "Active wallets": "活跃钱包",
  "Unattributed": "未归因",
  "+8.6% vs previous": "较上一周期 +8.6%",
  "+3.2% vs previous": "较上一周期 +3.2%",
  "cached aggregate": "缓存汇总",
  "needs labeling, not live API": "需要标签，不调用实时 API",
  "Market trend": "市场趋势",
  "All-chain volume trend": "全链交易量趋势",
  "Cached hourly": "每小时缓存",
  "Share": "份额",
  "Platform mix": "平台构成",
  "Intent-gated": "按需加载",
  "attributed": "已归因",
  "Signals": "信号",
  "Top market moves": "市场主要变化",
  "15m scan": "15 分钟扫描",
  "Coverage": "覆盖范围",
  "Product feature coverage": "产品功能覆盖",
  "Platform ranking": "平台排行",
  "Exchange and wallet onchain entries": "交易平台与钱包链上入口",
  "Open selected platform": "打开所选平台",
  "Platform": "平台",
  "Share": "份额",
  "Tx": "交易数",
  "Confidence": "置信度",
  "API policy": "API 策略",
  "Platform detail": "平台详情",
  "Binance Alpha": "Binance Alpha",
  "BNB Chain dominant entry · high-confidence attribution": "BNB Chain 主导入口 · 高置信度归因",
  "Load wallet cohorts": "加载钱包分群",
  "Platform volume": "平台交易量",
  "30.5% market share": "30.5% 市场份额",
  "cached rollup": "缓存汇总",
  "sampled cohort": "抽样分群",
  "router + label match": "路由器 + 标签匹配",
  "Chains": "链",
  "Chain distribution": "链分布",
  "Tokens": "代币",
  "Hot tokens on platform": "平台热门代币",
  "Token ranking": "代币排行",
  "Hot assets across platform entries": "跨平台入口热门资产",
  "Open token detail": "打开代币详情",
  "Token detail": "代币详情",
  "Cross-platform token performance and entry mix": "跨平台代币表现与入口分布",
  "Load wallet-level detail": "加载钱包级详情",
  "Token volume": "代币交易量",
  "Liquidity": "流动性",
  "public market API": "公开市场 API",
  "Primary entry": "主要入口",
  "38% token share": "38% 代币份额",
  "Platform split": "平台拆分",
  "BNB entry distribution": "BNB 入口分布",
  "Pairs": "交易对",
  "Popular trading pairs": "热门交易对",
  "Chain market share": "链市场份额",
  "Cost": "成本",
  "Chain API strategy": "链 API 策略",
  "Chain detail": "链详情",
  "Platform share, token heat, and attribution coverage": "平台份额、代币热度与归因覆盖",
  "Compare platforms": "比较平台",
  "Chain volume": "链交易量",
  "34.8% of market": "占市场 34.8%",
  "rollup table": "汇总表",
  "Attribution coverage": "归因覆盖",
  "label-backed": "标签支持",
  "Data cost": "数据成本",
  "Low": "低",
  "daily index + hourly cache": "每日索引 + 每小时缓存",
  "BNB Chain platform distribution": "BNB Chain 平台分布",
  "Attribution": "归因",
  "Rules that map onchain activity to platform entry": "将链上活动映射到平台入口的规则",
  "Test sample rule": "测试样例规则",
  "Rule type": "规则类型",
  "Example": "示例",
  "Status": "状态",
  "Alerts": "异动提醒",
  "Market anomaly queue": "市场异动队列",
  "15m batch scan": "15 分钟批量扫描",
  "Rules": "规则",
  "Alert configuration": "提醒配置",
  "Sources": "数据源",
  "Data source health": "数据源健康度",
  "Freshness": "新鲜度",
  "Refresh schedule": "刷新计划",
  "Exports": "导出",
  "Queued CSV reports": "CSV 报告队列",
  "Queue new export": "新增导出任务",
  "Report": "报告",
  "Scope": "范围",
  "Rows": "行数",
  "Source": "来源",
  "API spending strategy": "API 花费策略",
  "Free by default": "默认免费",
  "Use cached rollups for overview, ranking, and share charts.": "总览、排行和份额图默认使用缓存汇总。",
  "Pay on intent": "按意图付费",
  "Only call wallet-level or attribution APIs after drilldown clicks.": "只有在用户下钻后才调用钱包级或归因 API。",
  "Batch expensive data": "批处理昂贵数据",
  "Refresh historical trends on schedule instead of every page view.": "历史趋势按计划刷新，而不是每次访问页面都刷新。",
  "API plan": "API 计划",
  "Cost matrix": "成本矩阵",
  "Live-ready": "可上线",
  "Intent gated": "按需加载",
  "Cached": "缓存",
  "Rule-backed": "规则支持",
  "Batch scan": "批量扫描",
  "Queued": "队列中",
  "Ready": "就绪",
  "Active": "启用",
  "Review": "审核中",
  "Needs proof": "需验证",
  "High": "高",
  "Medium": "中",
  "Low": "低",
  "Cache": "缓存",
  "Batch": "批处理",
  "On demand": "按需",
  "Manual": "手动",
};

function t(key) {
  return i18n[currentLang][key] || i18n.en[key] || key;
}

function applyLanguage() {
  $$("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  $$("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  $$("#nav button").forEach((button) => {
    button.textContent = i18n[currentLang].nav[button.dataset.page] || button.textContent;
  });
  $("#pageTitle").textContent = i18n[currentLang].pageTitles[$(".page.active")?.id || "overview"];
  translateStaticText();
  renderSyncStatus();
}

function translateStaticText() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const text = node.nodeValue.trim();
    if (!text) return;
    if (!node.__enText) node.__enText = text;
    node.nodeValue = currentLang === "zh" ? (zhText[node.__enText] || node.__enText) : node.__enText;
  });
}

function showPage(pageId) {
  $$(".page").forEach((page) => page.classList.toggle("active", page.id === pageId));
  $$("#nav button").forEach((button) => button.classList.toggle("active", button.dataset.page === pageId));
  $("#pageTitle").textContent = i18n[currentLang].pageTitles[pageId] || i18n[currentLang].pageTitles.overview;
  window.location.hash = pageId;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  toast.textContent = currentLang === "zh" ? (zhText[message] || message) : message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function updateSourceSync(name, fetchedAt = new Date().toISOString()) {
  const timestamp = new Date(fetchedAt).getTime();
  if (!Number.isFinite(timestamp)) return;
  sourceSyncTimes.set(name, timestamp);
  renderSyncStatus();
}

function formatSyncAge(timestamp) {
  const elapsedMinutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));
  return elapsedMinutes < 1 ? "just now" : `${elapsedMinutes} min ago`;
}

function renderSyncStatus() {
  const status = $("[data-i18n='syncStatus']");
  if (!status) return;
  const requiredTimes = ["Market prices", "DeFiLlama TVL", "GeckoTerminal Pools", "DEX Screener", "Honeypot.is", "OKX DEX"]
    .map((name) => sourceSyncTimes.get(name))
    .filter(Number.isFinite);
  if (!requiredTimes.length) {
    status.textContent = currentLang === "zh" ? "缓存市场视图 · 等待同步" : "Cached market view · waiting for sync";
    return;
  }

  const elapsedMinutes = Math.max(0, Math.floor((Date.now() - Math.min(...requiredTimes)) / 60000));
  if (currentLang === "zh") {
    status.textContent = elapsedMinutes < 1 ? "缓存市场视图 · 刚刚同步" : `缓存市场视图 · ${elapsedMinutes} 分钟前同步`;
    return;
  }
  status.textContent = elapsedMinutes < 1 ? "Cached market view · last sync just now" : `Cached market view · last sync ${elapsedMinutes} min ago`;
  sourceSyncTimes.forEach((timestamp, name) => {
    const source = sourceData.find((item) => item.name === name);
    if (source?.state === "Live") source.freshness = formatSyncAge(timestamp);
  });
  renderSources();
}

function formatUsdCompact(value) {
  if (!Number.isFinite(value)) return "$0";
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: value >= 1000000000 ? 2 : 1,
  }).format(value);
}

function formatPercent(value) {
  if (!Number.isFinite(value)) return "N/A";
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(1)}%`;
}

function tokenChangeForRange(token) {
  return formatPercent(token.changeByRange?.[selectedRange]);
}

function updateSource(name, state, freshness, confidence) {
  const source = sourceData.find((item) => item.name === name);
  if (!source) return;
  source.state = state;
  source.freshness = freshness;
  source.confidence = confidence;
  renderSources();
}

async function fetchBackendJson(path) {
  if (!backendApiBase) return null;
  try {
    const response = await fetch(`${backendApiBase}${path}`);
    if (!response.ok) throw new Error(`Backend request failed: ${response.status}`);
    return response.json();
  } catch (error) {
    console.warn(error);
    return null;
  }
}

async function fetchCryptoMarketData({ quiet = false } = {}) {
  const ids = tokenMarketConfig.map((item) => item.id).join(",");
  const endpoint = new URL("https://api.coingecko.com/api/v3/coins/markets");
  endpoint.search = new URLSearchParams({
    vs_currency: "usd",
    ids,
    order: "market_cap_desc",
    per_page: tokenMarketConfig.length.toString(),
    page: "1",
    sparkline: "false",
    price_change_percentage: "24h,7d,30d",
  }).toString();

  try {
    updateSource("Market prices", "Loading", "now", 72);
    const backend = await fetchBackendJson("/api/tokens");
    const marketRows = backend
      ? backend.data.map((row) => ({
        id: row.id,
        total_volume: row.volume24hUsd,
        market_cap: row.marketCapUsd,
        price_change_percentage_24h: row.change24hPct,
        price_change_percentage_7d: row.change7dPct,
        price_change_percentage_30d: row.change30dPct,
      }))
      : await fetch(endpoint).then((response) => {
        if (!response.ok) throw new Error(`CoinGecko request failed: ${response.status}`);
        return response.json();
      });
    const rowsById = new Map(marketRows.map((row) => [row.id, row]));

    tokenData = tokenMarketConfig.map((token) => {
      const row = rowsById.get(token.id);
      const fallback = tokenData.find((item) => item.id === token.id) || {};
      return {
        id: token.id,
        symbol: token.symbol,
        name: token.fallbackName,
        volume: row ? formatUsdCompact(row.total_volume) : fallback.volume,
        changeByRange: row ? {
          "24h": row.price_change_percentage_24h,
          "7d": row.price_change_percentage_7d ?? row.price_change_percentage_7d_in_currency,
          "30d": row.price_change_percentage_30d ?? row.price_change_percentage_30d_in_currency,
          "90d": null,
        } : fallback.changeByRange,
        liquidity: row ? formatUsdCompact(row.market_cap) : fallback.liquidity,
        platform: token.platform,
      };
    });

    renderTokens();
    updateSourceSync("Market prices", backend?.fetchedAt);
    updateSource("Market prices", "Live", formatSyncAge(sourceSyncTimes.get("Market prices")), 94);
    if (!quiet) showToast("Crypto market data refreshed from CoinGecko.");
  } catch (error) {
    console.warn(error);
    updateSource("Market prices", "Delayed", "using mock fallback", 84);
    if (!quiet) showToast("Crypto API unavailable. Showing cached mock data.");
  }
}

async function fetchDefiLlamaChainData({ quiet = false } = {}) {
  try {
    updateSource("DeFiLlama TVL", "Loading", "now", 72);
    const backend = await fetchBackendJson("/api/chains");
    if (backend) {
      chainData = backend.data.map((row) => ({
        name: row.name,
        share: row.sharePct,
        volume: `${formatUsdCompact(row.tvlUsd)} TVL`,
        tx: `${formatPercent(row.change1dPct)} 24h`,
        policy: "DeFiLlama via backend cache",
      }));
    } else {
      const response = await fetch("https://api.llama.fi/v2/chains");
      if (!response.ok) throw new Error(`DeFiLlama request failed: ${response.status}`);

      const chains = await response.json();
      const chainsByName = new Map(chains.map((item) => [item.name, item]));
      const selectedChains = chainMarketConfig
        .map((config) => ({ config, row: chainsByName.get(config.llamaName) }))
        .filter((item) => item.row);
      const selectedTvl = selectedChains.reduce((sum, item) => sum + Number(item.row.tvl || 0), 0);

      chainData = selectedChains.map(({ config, row }) => ({
        name: config.displayName,
        share: selectedTvl ? Number(((Number(row.tvl || 0) / selectedTvl) * 100).toFixed(1)) : 0,
        volume: `${formatUsdCompact(Number(row.tvl || 0))} TVL`,
        tx: `${formatPercent(Number(row.change_1d || 0))} 24h`,
        policy: config.policy,
      }));
    }

    renderChains();
    updateSourceSync("DeFiLlama TVL", backend?.fetchedAt);
    setDataState("#chains .panel", "live", "Live API");
    updateSource("DeFiLlama TVL", "Live", formatSyncAge(sourceSyncTimes.get("DeFiLlama TVL")), 94);
    if (!quiet) showToast("DeFiLlama chain TVL refreshed.");
  } catch (error) {
    console.warn(error);
    updateSource("DeFiLlama TVL", "Delayed", "using mock fallback", 82);
    setDataState("#chains .panel", "mock", "Mock data");
    if (!quiet) showToast("DeFiLlama unavailable. Showing cached mock chain data.");
  }
}

async function fetchGeckoTerminalPoolData({ quiet = false } = {}) {
  try {
    updateSource("GeckoTerminal Pools", "Loading", "now", 70);
    const endpoint = `https://api.geckoterminal.com/api/v2/networks/${poolMarketConfig.network}/tokens/${poolMarketConfig.tokenAddress}/pools`;
    const backend = await fetchBackendJson(`/api/pools/${poolMarketConfig.network}/${poolMarketConfig.tokenAddress}`);
    const pools = backend
      ? backend.data
      : await fetch(endpoint).then(async (response) => {
        if (!response.ok) throw new Error(`GeckoTerminal request failed: ${response.status}`);
        const payload = await response.json();
        return payload.data || [];
      });
    pairData = pools.slice(0, 4).map((pool) => {
      const attrs = pool.attributes || pool;
      const volume = Number(attrs.volume_usd?.h24 ?? attrs.volume24hUsd ?? 0);
      const reserve = Number(attrs.reserve_in_usd ?? attrs.liquidityUsd ?? 0);
      const change = Number(attrs.price_change_percentage?.h24 ?? attrs.change24hPct ?? 0);
      return {
        name: attrs.name || "BNB pool",
        meta: `${formatUsdCompact(volume)} 24h volume 繚 ${formatPercent(change)}`,
        value: `${formatUsdCompact(reserve)} liquidity`,
      };
    });

    renderPairs();
    updateSourceSync("GeckoTerminal Pools", backend?.fetchedAt);
    setDataState("#tokenDetail .layout .panel:last-child", "live", "Live API");
    updateSource("GeckoTerminal Pools", "Live", formatSyncAge(sourceSyncTimes.get("GeckoTerminal Pools")), 92);
    if (!quiet) showToast("GeckoTerminal pool data refreshed.");
  } catch (error) {
    console.warn(error);
    updateSource("GeckoTerminal Pools", "Delayed", "using mock fallback", 80);
    setDataState("#tokenDetail .layout .panel:last-child", "mock", "Mock data");
    if (!quiet) showToast("GeckoTerminal unavailable. Showing cached pair rollups.");
  }
}

function displayChain(chainId) {
  return {
    bsc: "BNB Chain",
    ethereum: "Ethereum",
    solana: "Solana",
    base: "Base",
    arbitrum: "Arbitrum",
  }[chainId] || chainId;
}

function displayRisk(risk) {
  const value = String(risk || "Unknown").toLowerCase();
  if (value.includes("high") || value === "very_high") return "High";
  if (value.includes("medium")) return "Medium";
  if (value.includes("low")) return "Low";
  return "Unknown";
}

function pickDexPair(pairs, config) {
  const exactChain = (pairs || []).filter((pair) => pair.chainId === config.chain);
  const candidates = exactChain.length ? exactChain : pairs || [];
  return candidates.sort((a, b) => Number(b.volume?.h24 || 0) - Number(a.volume?.h24 || 0))[0];
}

async function fetchMarketRadarData({ quiet = false } = {}) {
  try {
    updateSource("DEX Screener", "Loading", "now", 70);
    const backend = await fetchBackendJson("/api/radar");
    const rows = backend
      ? backend.data
      : await Promise.all(radarMarketConfig.map(async (config) => {
        const endpoint = config.tokenAddress
          ? new URL(`https://api.dexscreener.com/latest/dex/tokens/${config.tokenAddress}`)
          : new URL("https://api.dexscreener.com/latest/dex/search");
        if (!config.tokenAddress) endpoint.searchParams.set("q", config.query);
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`DEX Screener request failed: ${response.status}`);
        const payload = await response.json();
        const pair = pickDexPair(payload.pairs, config) || {};
        return {
          asset: config.asset,
          chain: displayChain(pair.chainId || config.chain),
          signal: config.signal,
          movePct24h: Number(pair.priceChange?.h24 || 0),
          volume24hUsd: Number(pair.volume?.h24 || 0),
          liquidityUsd: Number(pair.liquidity?.usd || 0),
          risk: config.risk,
          action: config.action,
        };
      }));

    const previousSignals = radarSignals;
    radarSignals = rows.map((row) => {
      const fallback = previousSignals.find((item) => item.asset === row.asset) || {};
      const liquidityUsd = Number(row.liquidityUsd || 0);
      const movePct24h = Number(row.movePct24h);
      return {
        asset: row.asset,
        chain: displayChain(row.chain || fallback.chain),
        signal: row.signal || fallback.signal,
        move: Number.isFinite(movePct24h) && liquidityUsd > 0 ? `${formatPercent(movePct24h)} 24h` : fallback.move,
        liquidity: liquidityUsd > 0 ? formatUsdCompact(liquidityUsd) : fallback.liquidity,
        risk: displayRisk(row.risk || fallback.risk),
        action: row.action || fallback.action || "Open pair detail",
      };
    });

    renderMarketRadar();
    updateSourceSync("DEX Screener", backend?.fetchedAt);
    updateSource("DEX Screener", "Live", formatSyncAge(sourceSyncTimes.get("DEX Screener")), 90);
    setDataState("#marketRadar .panel.wide", "live", "Live API");
    if (!quiet) showToast("Market Radar refreshed from DEX Screener.");
  } catch (error) {
    console.warn(error);
    updateSource("DEX Screener", "Delayed", "using mock fallback", 78);
    if (!quiet) showToast("DEX Screener unavailable. Showing radar fallback data.");
  }
}

async function fetchRiskData({ quiet = false } = {}) {
  try {
    updateSource("Honeypot.is", "Loading", "now", 66);
    const backend = await fetchBackendJson("/api/risks");
    const rows = backend
      ? backend.data
      : await Promise.all(riskCheckConfig.map(async (config) => {
        const endpoint = new URL("https://api.honeypot.is/v2/IsHoneypot");
        endpoint.searchParams.set("address", config.address);
        endpoint.searchParams.set("chainID", config.chainId.toString());
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Honeypot.is request failed: ${response.status}`);
        const payload = await response.json();
        return {
          symbol: config.symbol,
          chain: config.chain,
          isHoneypot: Boolean(payload.honeypotResult?.isHoneypot),
          risk: String(payload.summary?.risk || payload.risk || "Unknown"),
        };
      }));

    rows.forEach((row) => {
      const signal = radarSignals.find((item) => item.asset === row.symbol);
      if (!signal) return;
      signal.risk = row.isHoneypot ? "High" : displayRisk(row.risk);
      signal.action = row.isHoneypot ? "Avoid honeypot risk" : signal.action;
    });

    renderMarketRadar();
    updateSourceSync("Honeypot.is", backend?.fetchedAt);
    updateSource("Honeypot.is", "Live", formatSyncAge(sourceSyncTimes.get("Honeypot.is")), 86);
    if (!quiet) showToast("EVM risk queue refreshed from Honeypot.is.");
  } catch (error) {
    console.warn(error);
    updateSource("Honeypot.is", "Delayed", "using mock fallback", 74);
    if (!quiet) showToast("Honeypot.is unavailable. Keeping risk fallback labels.");
  }
}

async function fetchOkxLiquidityData({ quiet = false } = {}) {
  try {
    updateSource("OKX DEX", "Loading", "now", 78);
    const backend = await fetchBackendJson("/api/platforms/okx/liquidity?chainIndex=1");
    if (!backend || backend.status === "not_configured" || backend.status === "auth_error") {
      const isAuthError = backend?.status === "auth_error";
      okxLiquiditySources = [
        {
          name: isAuthError ? "OKX DEX authentication failed" : "OKX DEX API keys required",
          meta: isAuthError
            ? "OKX returned 401. Check the API key, secret key, passphrase, Web3/DEX permissions, IP/project restrictions, and optional OKX_DEX_PROJECT_ID."
            : "Set OKX_DEX_API_KEY, OKX_DEX_SECRET_KEY, and OKX_DEX_PASSPHRASE in the Worker environment.",
          state: isAuthError ? "Auth error" : "Needs key",
        },
        { name: "Supported chains", meta: "OKX endpoint: /api/v6/dex/aggregator/supported/chain", state: "Official" },
        { name: "Liquidity sources", meta: "OKX endpoint: /api/v6/dex/aggregator/get-liquidity", state: "Official" },
      ];
      renderOkxLiquidity();
      updateSource("OKX DEX", isAuthError ? "Auth error" : "Needs key", isAuthError ? "check credentials" : "configure secrets", 88);
      if (!quiet) showToast(isAuthError ? "OKX DEX authentication failed. Check API key settings." : "OKX DEX is wired. Add API credentials to refresh official liquidity sources.");
      return;
    }

    okxLiquiditySources = backend.data.slice(0, 8).map((source) => ({
      name: source.name,
      meta: `OKX liquidity source ID ${source.id}`,
      state: "Official",
    }));
    renderOkxLiquidity();
    updateSourceSync("OKX DEX", backend.fetchedAt);
    updateSource("OKX DEX", "Live", formatSyncAge(sourceSyncTimes.get("OKX DEX")), 92);
    setDataState("#platformDetail > .panel:last-child", "live", "Live API");
    if (!quiet) showToast("OKX DEX liquidity sources refreshed.");
  } catch (error) {
    console.warn(error);
    updateSource("OKX DEX", "Delayed", "using setup fallback", 82);
    if (!quiet) showToast("OKX DEX unavailable. Showing setup fallback.");
  }
}

function renderPlatforms() {
  const term = $("#searchInput").value.trim().toLowerCase();
  const chain = $("#chainFilter").value;
  const rows = platformData.filter((item) => {
    const matchesTerm = item.name.toLowerCase().includes(term) || item.chain.toLowerCase().includes(term);
    const matchesChain = chain === "all" || item.chain === chain;
    return matchesTerm && matchesChain;
  });

  $("#platformRows").innerHTML = rows.map((item) => `
    <tr class="mock-row">
      <td><strong>${item.name}</strong><span>${item.chain}</span></td>
      <td>${item.volume}</td>
      <td>${item.share.toFixed(1)}%</td>
      <td>${item.tx}</td>
      <td>${item.wallets}</td>
      <td><span class="confidence ${item.confidence.toLowerCase()}">${item.confidence}</span></td>
      <td><span class="policy ${item.expensive ? "expensive" : ""}">${item.policy}</span></td>
    </tr>
  `).join("");
}

function renderLegend() {
  $("#platformLegend").innerHTML = platformData.map((item) => `
    <li><span><i class="dot" style="background:${item.color}"></i>${item.name}</span><strong>${item.share.toFixed(1)}%</strong></li>
  `).join("");
}

function renderTokens() {
  $("#tokenCards").innerHTML = tokenData.map((item, index) => `
    <button class="data-card data-live" data-data-label="Live API" data-open-page="tokenDetail" type="button">
      <span>#${index + 1} · ${item.name}</span>
      <strong>${item.symbol}</strong>
      <em>${item.volume} · ${tokenChangeForRange(item)} ${selectedRange}</em>
      <small>${item.platform} · ${item.liquidity} market cap</small>
    </button>
  `).join("");

  $("#platformTokenList").innerHTML = tokenData.slice(0, 5).map((item, index) => `
    <div class="rank-item"><span><strong>${index + 1}. ${item.symbol}</strong>${item.name}</span><span>${item.volume} · ${tokenChangeForRange(item)} ${selectedRange}</span></div>
  `).join("");
}

function renderSplit(target, data) {
  $(target).innerHTML = data.map((item) => `
    <div class="bar-row">
      <div><strong>${item.name}</strong><span>${item.share}% of volume</span></div>
      <div class="bar-track"><i style="width:${item.share}%; background:${item.color || "#167a5b"}"></i></div>
    </div>
  `).join("");
}

function renderChains() {
  $("#chainList").innerHTML = chainData.map((item, index) => `
    <div class="rank-item"><span><strong>${index + 1}. ${item.name}</strong>${item.policy}</span><span>${item.volume} · ${item.share}% · ${item.tx}</span></div>
  `).join("");

  $("#chainCostList").innerHTML = chainData.map((item) => `
    <div><span>${item.name}</span><strong>${item.policy}</strong></div>
  `).join("");
}

function renderPairs() {
  $("#pairList").innerHTML = pairData.map((pair, index) => `
    <div class="rank-item"><span><strong>${index + 1}. ${pair.name}</strong>${pair.meta}</span><span>${pair.value}</span></div>
  `).join("");
}

function renderOkxLiquidity() {
  const setupState = okxLiquiditySources.find((item) => item.state === "Auth error" || item.state === "Needs key");
  $("#okxSourceState").textContent = setupState?.state || "Official API";
  $("#okxLiquidityList").innerHTML = okxLiquiditySources.map((item) => `
    <div class="source-item ${item.state === "Official" ? "data-live" : "data-mock"}">
      <div><strong>${item.name}</strong><span>${item.meta}</span></div>
      <span class="policy ${item.state === "Needs key" ? "expensive" : ""}">${item.state}</span>
    </div>
  `).join("");
}

function renderRules() {
  $("#ruleRows").innerHTML = ruleData.map((item) => `
    <tr class="spec-row">
      <td><strong>${item.type}</strong></td>
      <td>${item.example}</td>
      <td>${item.platform}</td>
      <td><span class="confidence ${item.confidence.toLowerCase()}">${item.confidence}</span></td>
      <td>${item.cost}</td>
      <td>${item.status}</td>
    </tr>
  `).join("");
}

function renderAlerts() {
  const html = alertData.map((item) => `
    <div class="signal ${item.level.toLowerCase()}">
      <strong>${item.title}</strong>
      <span>${item.meta}</span>
      <em>${item.level}</em>
    </div>
  `).join("");
  $("#alertList").innerHTML = html;
  $("#overviewAlerts").innerHTML = html;

  $("#alertRules").innerHTML = [
    ["Share change", "> 3 pts in 24h"],
    ["Unattributed traffic", "> 15% by chain"],
    ["Token spike", "> 25% volume increase"],
    ["New wallets", "> 20% growth or > 10% drop"],
  ].map(([name, rule]) => `<div class="source-item"><div><strong>${name}</strong><span>${rule}</span></div><span class="policy">Batch</span></div>`).join("");
}

function renderMarketRadar() {
  $("#watchlistCount").textContent = watchlistAssets.length.toString();
  $("#hotSignalCount").textContent = radarSignals.length.toString();

  $("#radarSignalList").innerHTML = radarSignals.map((item, index) => `
    <div class="radar-item">
      <div class="radar-rank">#${index + 1}</div>
      <div>
        <strong>${item.asset}</strong>
        <span>${item.chain} · ${item.signal}</span>
      </div>
      <div><strong>${item.move}</strong><span>Move</span></div>
      <div><strong>${item.liquidity}</strong><span>Liquidity</span></div>
      <span class="confidence ${item.risk.toLowerCase()}">${item.risk}</span>
      <button class="button" data-open-page="tokenDetail" type="button">${item.action}</button>
    </div>
  `).join("");

  $("#watchlistBudget").innerHTML = [
    ["Broad market", "15m cached"],
    ["Watchlist prices", "60s-5m"],
    ["Pool liquidity", "Visible assets"],
    ["Wallet analytics", "Click to load"],
  ].map(([name, cadence]) => `<div><span>${name}</span><strong>${cadence}</strong></div>`).join("");

  $("#watchlistItems").innerHTML = watchlistAssets.map((item) => `
    <div class="source-item">
      <div><strong>${item.symbol}</strong><span>${item.chain} · ${item.alert}</span></div>
      <span class="policy">${item.tier}</span>
    </div>
  `).join("");

  $("#radarRules").innerHTML = [
    ["Price move", "> 5% in 1h for watchlist"],
    ["Volume spike", "> 25% vs 24h baseline"],
    ["Liquidity change", "> 10% add/remove"],
    ["Risk change", "Contract or holder flag updated"],
  ].map(([name, rule]) => `<div class="source-item"><div><strong>${name}</strong><span>${rule}</span></div><span class="policy">Trader</span></div>`).join("");
}

function renderSources() {
  $("#sourceList").innerHTML = sourceData.map((item) => `
    <div class="source-item ${item.state === "Live" ? "data-live" : "data-mock"}">
      <div><strong>${item.name}</strong><span>${item.state} · ${item.freshness}</span></div>
      <div class="mini-meter"><i style="width:${item.confidence}%"></i></div>
    </div>
  `).join("");

  $("#refreshList").innerHTML = [
    ["Chain TVL", "DeFiLlama"],
    ["Token prices", "CoinGecko"],
    ["Token price fallback", "CoinPaprika"],
    ["Radar signals", "DEX Screener"],
    ["Pool liquidity", "GeckoTerminal"],
    ["EVM risk checks", "Honeypot.is"],
    ["OKX official liquidity", "Keyed API"],
    ["Platform shares", "Mock / labels"],
    ["Attribution labels", "Manual + daily"],
    ["Historical trends", "Daily"],
  ].map(([name, cadence]) => `<div><span>${name}</span><strong>${cadence}</strong></div>`).join("");
}

function renderExports() {
  $("#exportRows").innerHTML = [
    ["Platform ranking", "All chains · 24h", "128", "Rollup table", "Ready"],
    ["Token ranking", "All platforms · 7d", "1,240", "Batch cache", "Ready"],
    ["Attribution review", "BNB Chain", "462", "Label store", "Queued"],
    ["Alert history", "Last 30d", "86", "Signal table", "Ready"],
  ].map((row) => `<tr>${row.map((cell, index) => index === 0 ? `<td><strong>${cell}</strong></td>` : `<td>${cell}</td>`).join("")}</tr>`).join("");
}

function renderCoverageAndCost() {
  $("#coverageGrid").innerHTML = [
    ["Overview", "DeFiLlama-ready"], ["Platform share", "Mock / labels"], ["Platform detail", "Intent gated"],
    ["Token detail", "CoinGecko + GeckoTerminal"], ["Chain detail", "DeFiLlama"], ["Attribution", "Rule-backed"],
    ["Alerts", "Batch scan"], ["Exports", "Queued"],
  ].map(([name, state]) => `<div><strong>${name}</strong><span>${state}</span></div>`).join("");

  $("#costMatrix").innerHTML = [
    ["Chain and protocol rollups", "DeFiLlama"], ["Token market data", "CoinGecko"], ["Pool and pair data", "GeckoTerminal"],
    ["Platform ranking", "Mock / labels"], ["Wallet cohorts", "On demand"], ["Exports", "Queued"],
  ].map(([name, mode]) => `<div><span>${name}</span><strong>${mode}</strong></div>`).join("");
}

function setDataState(selector, state, label) {
  $$(selector).forEach((node) => {
    node.classList.remove("data-live", "data-mock", "data-spec", "data-mixed");
    node.classList.add("data-state", `data-${state}`);
    node.dataset.dataLabel = label;
  });
}

function applyDataStateStyles() {
  const mark = (selector, state, label) => {
    setDataState(selector, state, label);
  };

  mark("#overview .metric, #overview .wide, #overview .layout:first-of-type .panel:not(.wide), #overview .layout:nth-of-type(2) .panel:first-child", "mock", "Mock data");
  mark("#overview .layout:nth-of-type(2) .panel:last-child", "spec", "Feature spec");
  mark("#marketRadar .radar-hero, #marketRadar .metric, #marketRadar .panel", "mock", "Mock data");
  mark("#platforms .panel", "mock", "Mock data");
  mark("#platformDetail .detail-hero, #platformDetail .metric, #platformDetail .panel", "mock", "Mock data");
  mark("#tokens .panel", "live", "Live API");
  mark("#tokenDetail .detail-hero, #tokenDetail .metric, #tokenDetail .panel", "mock", "Mock data");
  mark("#tokenDetail .layout .panel:last-child", "live", "Live API");
  mark("#chains .panel, #chainDetail .detail-hero, #chainDetail .metric, #chainDetail .panel", "mock", "Mock data");
  mark("#attribution .panel, #exports .panel, #apiCost .panel", "spec", "Feature spec");
  mark("#alerts .panel", "mock", "Mock data");
  mark("#sources .panel", "mixed", "Mixed data");
}

function bindEvents() {
  $$("#nav button").forEach((button) => button.addEventListener("click", () => showPage(button.dataset.page)));
  document.body.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-open-page]");
    if (trigger) showPage(trigger.dataset.openPage);
  });

  $$("[data-range]").forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-range]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const metrics = rangeMetrics[button.dataset.range];
      selectedRange = button.dataset.range;
      $("#volumeMetric").textContent = metrics[0];
      $("#txMetric").textContent = metrics[1];
      $("#walletMetric").textContent = metrics[2];
      $("#unknownMetric").textContent = metrics[3];
      renderTokens();
      showToast(`${button.dataset.range} uses precomputed aggregates.`);
    });
  });

  $("#costMode").addEventListener("change", (event) => {
    const score = event.target.value === "low" ? "31%" : event.target.value === "balanced" ? "54%" : "82%";
    $("#budgetScore").textContent = score;
    $("#budgetBar").style.width = score;
    showToast(`Cost mode changed to ${event.target.options[event.target.selectedIndex].text}.`);
  });

  $("#searchInput").addEventListener("input", renderPlatforms);
  $("#chainFilter").addEventListener("change", renderPlatforms);
  $("#refreshButton").addEventListener("click", () => {
    showToast(t("cachedToast"));
    fetchCryptoMarketData();
    fetchDefiLlamaChainData();
    fetchGeckoTerminalPoolData();
    fetchMarketRadarData();
    fetchRiskData();
    fetchOkxLiquidityData();
  });
  $("#exportButton").addEventListener("click", () => showPage("exports"));
  $("#languageSelect").addEventListener("change", (event) => {
    currentLang = event.target.value;
    applyLanguage();
    showToast(t("languageToast"));
  });
  $("#loadPlatformDeep").addEventListener("click", () => showToast("Wallet cohorts are intentionally on-demand because they are expensive."));
  $("#loadTokenDetail").addEventListener("click", () => showToast("Token detail loads platform split first; wallet cohorts remain gated."));
  $("#refreshRadarButton").addEventListener("click", () => {
    showToast("Radar refresh uses cached market scans and visible watchlist assets.");
    fetchCryptoMarketData();
    fetchGeckoTerminalPoolData();
    fetchMarketRadarData();
    fetchRiskData();
  });
  $("#testRuleButton").addEventListener("click", () => showToast("Sample attribution test uses cached labeled transactions, not full chain replay."));
  $("#queueExportButton").addEventListener("click", () => showToast("Export queued from rollup tables. No fresh API call needed."));
}

function init() {
  renderPlatforms();
  renderMarketRadar();
  renderLegend();
  renderTokens();
  renderSplit("#tokenSplit", tokenSplitData);
  renderSplit("#platformChainSplit", [
    { name: "BNB Chain", share: 72, color: "#167a5b" },
    { name: "Ethereum", share: 11, color: "#346bc2" },
    { name: "Base", share: 9, color: "#c27a2c" },
    { name: "Solana", share: 8, color: "#b6df5f" },
  ]);
  renderSplit("#chainPlatformSplit", platformData.slice(0, 4));
  renderPairs();
  renderOkxLiquidity();
  renderChains();
  renderRules();
  renderAlerts();
  renderSources();
  renderExports();
  renderCoverageAndCost();
  applyDataStateStyles();
  bindEvents();
  showPage(window.location.hash.replace("#", "") || "overview");
  applyLanguage();
  fetchCryptoMarketData({ quiet: true });
  fetchDefiLlamaChainData({ quiet: true });
  fetchGeckoTerminalPoolData({ quiet: true });
  fetchMarketRadarData({ quiet: true });
  fetchRiskData({ quiet: true });
  fetchOkxLiquidityData({ quiet: true });
  window.setInterval(renderSyncStatus, 60000);
}

init();
