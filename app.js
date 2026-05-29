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

const sourceData = [
  { name: "DeFiLlama TVL", state: "Delayed", freshness: "mock fallback", confidence: 82 },
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

const rangeMetrics = {
  "24h": ["$12.84B", "18.7M", "4.26M", "14.2%"],
  "7d": ["$76.31B", "109.5M", "12.9M", "13.6%"],
  "30d": ["$312.4B", "426.8M", "31.7M", "15.1%"],
  "90d": ["$861.9B", "1.18B", "67.4M", "17.8%"],
};

const pageTitles = {
  overview: "All-chain market intelligence",
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
  if (!Number.isFinite(value)) return "0.0%";
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(1)}%`;
}

function updateSource(name, state, freshness, confidence) {
  const source = sourceData.find((item) => item.name === name);
  if (!source) return;
  source.state = state;
  source.freshness = freshness;
  source.confidence = confidence;
  renderSources();
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
    price_change_percentage: "24h",
  }).toString();

  try {
    updateSource("Market prices", "Loading", "now", 72);
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`CoinGecko request failed: ${response.status}`);
    const marketRows = await response.json();
    const rowsById = new Map(marketRows.map((row) => [row.id, row]));

    tokenData = tokenMarketConfig.map((token) => {
      const row = rowsById.get(token.id);
      const fallback = tokenData.find((item) => item.id === token.id) || {};
      return {
        id: token.id,
        symbol: token.symbol,
        name: token.fallbackName,
        volume: row ? formatUsdCompact(row.total_volume) : fallback.volume,
        change: row ? formatPercent(row.price_change_percentage_24h) : fallback.change,
        liquidity: row ? formatUsdCompact(row.market_cap) : fallback.liquidity,
        platform: token.platform,
      };
    });

    renderTokens();
    updateSource("Market prices", "Live", "just now", 94);
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

    renderChains();
    setDataState("#chains .panel", "live", "Live API");
    updateSource("DeFiLlama TVL", "Live", "just now", 94);
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
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`GeckoTerminal request failed: ${response.status}`);

    const payload = await response.json();
    pairData = (payload.data || []).slice(0, 4).map((pool) => {
      const attrs = pool.attributes || {};
      const volume = Number(attrs.volume_usd?.h24 || 0);
      const reserve = Number(attrs.reserve_in_usd || 0);
      const change = Number(attrs.price_change_percentage?.h24 || 0);
      return {
        name: attrs.name || "BNB pool",
        meta: `${formatUsdCompact(volume)} 24h volume 繚 ${formatPercent(change)}`,
        value: `${formatUsdCompact(reserve)} liquidity`,
      };
    });

    renderPairs();
    setDataState("#tokenDetail .layout .panel:last-child", "live", "Live API");
    updateSource("GeckoTerminal Pools", "Live", "just now", 92);
    if (!quiet) showToast("GeckoTerminal pool data refreshed.");
  } catch (error) {
    console.warn(error);
    updateSource("GeckoTerminal Pools", "Delayed", "using mock fallback", 80);
    setDataState("#tokenDetail .layout .panel:last-child", "mock", "Mock data");
    if (!quiet) showToast("GeckoTerminal unavailable. Showing cached pair rollups.");
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
      <em>${item.volume} · ${item.change}</em>
      <small>${item.platform} · ${item.liquidity} liquidity</small>
    </button>
  `).join("");

  $("#platformTokenList").innerHTML = tokenData.slice(0, 5).map((item, index) => `
    <div class="rank-item"><span><strong>${index + 1}. ${item.symbol}</strong>${item.name}</span><span>${item.volume} · ${item.change}</span></div>
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
    ["Pool liquidity", "GeckoTerminal"],
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
      $("#volumeMetric").textContent = metrics[0];
      $("#txMetric").textContent = metrics[1];
      $("#walletMetric").textContent = metrics[2];
      $("#unknownMetric").textContent = metrics[3];
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
  });
  $("#exportButton").addEventListener("click", () => showPage("exports"));
  $("#languageSelect").addEventListener("change", (event) => {
    currentLang = event.target.value;
    applyLanguage();
    showToast(t("languageToast"));
  });
  $("#loadPlatformDeep").addEventListener("click", () => showToast("Wallet cohorts are intentionally on-demand because they are expensive."));
  $("#loadTokenDetail").addEventListener("click", () => showToast("Token detail loads platform split first; wallet cohorts remain gated."));
  $("#testRuleButton").addEventListener("click", () => showToast("Sample attribution test uses cached labeled transactions, not full chain replay."));
  $("#queueExportButton").addEventListener("click", () => showToast("Export queued from rollup tables. No fresh API call needed."));
}

function init() {
  renderPlatforms();
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
}

init();
