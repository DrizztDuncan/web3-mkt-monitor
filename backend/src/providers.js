import { CACHE_KEYS, CHAIN_MARKETS, DEFAULT_POOL, RADAR_MARKETS, RISK_CHECKS, TOKEN_MARKETS } from "./config.js";

const COINGECKO_URL = "https://api.coingecko.com/api/v3/coins/markets";
const COINPAPRIKA_URL = "https://api.coinpaprika.com/v1/tickers";
const DEFILLAMA_URL = "https://api.llama.fi/v2/chains";
const DEXSCREENER_SEARCH_URL = "https://api.dexscreener.com/latest/dex/search";
const DEXSCREENER_TOKENS_URL = "https://api.dexscreener.com/latest/dex/tokens";
const HONEYPOT_URL = "https://api.honeypot.is/v2/IsHoneypot";
const OKX_DEX_BASE_URL = "https://web3.okx.com";

function nowIso() {
  return new Date().toISOString();
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "web3-mkt-monitor/0.1",
    },
  });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.json();
}

function base64Encode(bytes) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

async function hmacSha256Base64(secret, message) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return base64Encode(new Uint8Array(signature));
}

function hasOkxCredentials(env) {
  return Boolean(env.OKX_DEX_API_KEY && env.OKX_DEX_SECRET_KEY && env.OKX_DEX_PASSPHRASE);
}

async function fetchOkxJson(env, requestPath, params = {}) {
  if (!hasOkxCredentials(env)) throw new Error("OKX DEX credentials are not configured");
  const url = new URL(requestPath, OKX_DEX_BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  });
  const timestamp = new Date().toISOString();
  const pathWithQuery = `${url.pathname}${url.search}`;
  const signature = await hmacSha256Base64(env.OKX_DEX_SECRET_KEY, `${timestamp}GET${pathWithQuery}`);
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "OK-ACCESS-KEY": env.OKX_DEX_API_KEY,
      "OK-ACCESS-SIGN": signature,
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": env.OKX_DEX_PASSPHRASE,
      ...((env.OKX_DEX_PROJECT_ID || env.OKX_ACCESS_PROJECT_ID) ? { "OK-ACCESS-PROJECT": env.OKX_DEX_PROJECT_ID || env.OKX_ACCESS_PROJECT_ID } : {}),
    },
  });
  if (!response.ok) throw new Error(`${url.toString()} returned ${response.status}`);
  const payload = await response.json();
  if (payload.code && payload.code !== "0") throw new Error(`OKX DEX returned ${payload.code}: ${payload.msg || "unknown error"}`);
  return payload;
}

async function putJson(env, key, data, expirationTtl = 900) {
  await env.MARKET_CACHE.put(key, JSON.stringify(data), { expirationTtl });
}

async function recordSourceRun(env, provider, endpoint, status, errorMessage = null) {
  await env.DB.prepare(
    "INSERT INTO source_runs (provider, endpoint, status, fetched_at, error_message) VALUES (?, ?, ?, ?, ?)",
  ).bind(provider, endpoint, status, nowIso(), errorMessage).run();
}

function normalizeTokenMarket(token, row, provider) {
  return {
    id: token.id,
    symbol: token.symbol,
    name: token.displayName,
    platform: token.platform,
    priceUsd: row.priceUsd ?? null,
    marketCapUsd: row.marketCapUsd ?? null,
    volume24hUsd: row.volume24hUsd ?? null,
    change1hPct: row.change1hPct ?? null,
    change24hPct: row.change24hPct ?? null,
    change7dPct: row.change7dPct ?? null,
    change30dPct: row.change30dPct ?? null,
    provider,
  };
}

async function syncCoinPaprikaTokens(env) {
  const fetchedAt = nowIso();
  const rows = await Promise.all(TOKEN_MARKETS.map(async (token) => {
    const endpoint = `${COINPAPRIKA_URL}/${token.paprikaId}`;
    const row = await fetchJson(endpoint);
    const quote = row.quotes?.USD || {};
    return normalizeTokenMarket(token, {
      priceUsd: quote.price,
      marketCapUsd: quote.market_cap,
      volume24hUsd: quote.volume_24h,
      change1hPct: quote.percent_change_1h,
      change24hPct: quote.percent_change_24h,
      change7dPct: quote.percent_change_7d,
      change30dPct: quote.percent_change_30d,
    }, "CoinPaprika");
  }));

  await putJson(env, CACHE_KEYS.tokens, { data: rows, fetchedAt, provider: "CoinPaprika", fallback: true });
  const statements = rows.map((token) => env.DB.prepare(
    "INSERT INTO token_snapshots (token_id, symbol, price_usd, market_cap_usd, volume_24h_usd, change_24h_pct, source, fetched_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  ).bind(token.id, token.symbol, token.priceUsd, token.marketCapUsd, token.volume24hUsd, token.change24hPct, "CoinPaprika", fetchedAt));
  await env.DB.batch(statements);
  await recordSourceRun(env, "CoinPaprika", COINPAPRIKA_URL, "success");
  return { data: rows, fetchedAt, provider: "CoinPaprika", fallback: true };
}

export async function syncTokens(env) {
  const url = new URL(COINGECKO_URL);
  url.search = new URLSearchParams({
    vs_currency: "usd",
    ids: TOKEN_MARKETS.map((token) => token.id).join(","),
    order: "market_cap_desc",
    per_page: TOKEN_MARKETS.length.toString(),
    page: "1",
    sparkline: "false",
    price_change_percentage: "1h,24h,7d,30d",
  }).toString();

  try {
    const rows = await fetchJson(url);
    const byId = new Map(rows.map((row) => [row.id, row]));
    const fetchedAt = nowIso();
    const data = TOKEN_MARKETS.map((token) => {
      const row = byId.get(token.id) || {};
      return normalizeTokenMarket(token, {
        priceUsd: row.current_price ?? null,
        marketCapUsd: row.market_cap ?? null,
        volume24hUsd: row.total_volume ?? null,
        change1hPct: row.price_change_percentage_1h_in_currency ?? null,
        change24hPct: row.price_change_percentage_24h_in_currency ?? row.price_change_percentage_24h ?? null,
        change7dPct: row.price_change_percentage_7d_in_currency ?? null,
        change30dPct: row.price_change_percentage_30d_in_currency ?? null,
      }, "CoinGecko");
    });

    await putJson(env, CACHE_KEYS.tokens, { data, fetchedAt, provider: "CoinGecko" });
    const statements = data.map((token) => env.DB.prepare(
      "INSERT INTO token_snapshots (token_id, symbol, price_usd, market_cap_usd, volume_24h_usd, change_24h_pct, source, fetched_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    ).bind(token.id, token.symbol, token.priceUsd, token.marketCapUsd, token.volume24hUsd, token.change24hPct, "CoinGecko", fetchedAt));
    await env.DB.batch(statements);
    await recordSourceRun(env, "CoinGecko", url.toString(), "success");
    return { data, fetchedAt, provider: "CoinGecko" };
  } catch (error) {
    await recordSourceRun(env, "CoinGecko", url.toString(), "error", error.message);
    return syncCoinPaprikaTokens(env);
  }
}

export async function syncChains(env) {
  try {
    const rows = await fetchJson(DEFILLAMA_URL);
    const byName = new Map(rows.map((row) => [row.name, row]));
    const fetchedAt = nowIso();
    const selected = CHAIN_MARKETS.map((chain) => ({ chain, row: byName.get(chain.llamaName) }))
      .filter(({ row }) => row);
    const totalTvlUsd = selected.reduce((sum, { row }) => sum + Number(row.tvl || 0), 0);
    const data = selected.map(({ chain, row }) => ({
      name: chain.displayName,
      tvlUsd: Number(row.tvl || 0),
      sharePct: totalTvlUsd ? Number(((Number(row.tvl || 0) / totalTvlUsd) * 100).toFixed(1)) : 0,
      change1dPct: Number(row.change_1d || 0),
    }));

    await putJson(env, CACHE_KEYS.chains, { data, fetchedAt, provider: "DeFiLlama" });
    const statements = data.map((chain) => env.DB.prepare(
      "INSERT INTO chain_snapshots (chain_name, tvl_usd, change_1d_pct, source, fetched_at) VALUES (?, ?, ?, ?, ?)",
    ).bind(chain.name, chain.tvlUsd, chain.change1dPct, "DeFiLlama", fetchedAt));
    await env.DB.batch(statements);
    await recordSourceRun(env, "DeFiLlama", DEFILLAMA_URL, "success");
    return { data, fetchedAt, provider: "DeFiLlama" };
  } catch (error) {
    await recordSourceRun(env, "DeFiLlama", DEFILLAMA_URL, "error", error.message);
    throw error;
  }
}

export async function syncPools(env, network = DEFAULT_POOL.network, tokenAddress = DEFAULT_POOL.tokenAddress) {
  const url = `https://api.geckoterminal.com/api/v2/networks/${network}/tokens/${tokenAddress}/pools`;

  try {
    const payload = await fetchJson(url);
    const fetchedAt = nowIso();
    const data = (payload.data || []).slice(0, 8).map((pool) => {
      const attrs = pool.attributes || {};
      return {
        address: attrs.address || pool.id || null,
        name: attrs.name || "Pool",
        liquidityUsd: Number(attrs.reserve_in_usd || 0),
        volume24hUsd: Number(attrs.volume_usd?.h24 || 0),
        change24hPct: Number(attrs.price_change_percentage?.h24 || 0),
      };
    });

    await putJson(env, CACHE_KEYS.pools(network, tokenAddress), { data, fetchedAt, provider: "GeckoTerminal" });
    const statements = data.map((pool) => env.DB.prepare(
      "INSERT INTO pool_snapshots (network, token_address, pool_address, pool_name, liquidity_usd, volume_24h_usd, change_24h_pct, source, fetched_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    ).bind(network, tokenAddress, pool.address, pool.name, pool.liquidityUsd, pool.volume24hUsd, pool.change24hPct, "GeckoTerminal", fetchedAt));
    await env.DB.batch(statements);
    await recordSourceRun(env, "GeckoTerminal", url, "success");
    return { data, fetchedAt, provider: "GeckoTerminal" };
  } catch (error) {
    await recordSourceRun(env, "GeckoTerminal", url, "error", error.message);
    throw error;
  }
}

function pickDexScreenerPair(pairs, market) {
  const exactChain = (pairs || []).filter((pair) => pair.chainId === market.chain);
  const candidates = exactChain.length ? exactChain : pairs || [];
  return candidates
    .sort((a, b) => Number(b.volume?.h24 || 0) - Number(a.volume?.h24 || 0))[0];
}

export async function syncRadar(env) {
  const fetchedAt = nowIso();
  try {
    const data = await Promise.all(RADAR_MARKETS.map(async (market) => {
      const url = market.tokenAddress
        ? new URL(`${DEXSCREENER_TOKENS_URL}/${market.tokenAddress}`)
        : new URL(DEXSCREENER_SEARCH_URL);
      if (!market.tokenAddress) url.searchParams.set("q", market.query);
      const payload = await fetchJson(url);
      const pair = pickDexScreenerPair(payload.pairs, market) || {};
      const chain = pair.chainId || market.chain;
      return {
        asset: market.symbol,
        chain,
        signal: market.signal,
        movePct24h: Number(pair.priceChange?.h24 || 0),
        volume24hUsd: Number(pair.volume?.h24 || 0),
        liquidityUsd: Number(pair.liquidity?.usd || 0),
        pairAddress: pair.pairAddress || null,
        dexId: pair.dexId || null,
        url: pair.url || null,
        risk: market.risk,
        action: market.action,
      };
    }));

    await putJson(env, CACHE_KEYS.radar, { data, fetchedAt, provider: "DEX Screener" }, 300);
    await recordSourceRun(env, "DEX Screener", DEXSCREENER_TOKENS_URL, "success");
    return { data, fetchedAt, provider: "DEX Screener" };
  } catch (error) {
    await recordSourceRun(env, "DEX Screener", DEXSCREENER_TOKENS_URL, "error", error.message);
    throw error;
  }
}

export async function syncRisks(env) {
  const fetchedAt = nowIso();
  try {
    const data = await Promise.all(RISK_CHECKS.map(async (check) => {
      const url = new URL(HONEYPOT_URL);
      url.searchParams.set("address", check.address);
      url.searchParams.set("chainID", check.chainId.toString());
      const payload = await fetchJson(url);
      const riskLevel = payload.summary?.risk || payload.risk || "Unknown";
      const simulation = payload.simulationResult || {};
      return {
        symbol: check.symbol,
        chain: check.chain,
        address: check.address,
        chainId: check.chainId,
        isHoneypot: Boolean(payload.honeypotResult?.isHoneypot),
        risk: String(riskLevel),
        buyTax: simulation.buyTax ?? null,
        sellTax: simulation.sellTax ?? null,
        holderCount: payload.token?.totalHolders ?? null,
        pair: payload.pair?.pairAddress || null,
      };
    }));

    await putJson(env, CACHE_KEYS.risks, { data, fetchedAt, provider: "Honeypot.is" }, 900);
    await recordSourceRun(env, "Honeypot.is", HONEYPOT_URL, "success");
    return { data, fetchedAt, provider: "Honeypot.is" };
  } catch (error) {
    await recordSourceRun(env, "Honeypot.is", HONEYPOT_URL, "error", error.message);
    throw error;
  }
}

export async function syncOkxSupportedChains(env) {
  const requestPath = "/api/v6/dex/aggregator/supported/chain";
  try {
    const payload = await fetchOkxJson(env, requestPath);
    const fetchedAt = nowIso();
    const data = (payload.data || []).map((chain) => ({
      chainIndex: chain.chainIndex,
      chainName: chain.chainName,
      dexTokenApproveAddress: chain.dexTokenApproveAddress || null,
    }));
    await putJson(env, CACHE_KEYS.okxChains, { data, fetchedAt, provider: "OKX DEX" }, 3600);
    await recordSourceRun(env, "OKX DEX", `${OKX_DEX_BASE_URL}${requestPath}`, "success");
    return { data, fetchedAt, provider: "OKX DEX" };
  } catch (error) {
    await recordSourceRun(env, "OKX DEX", `${OKX_DEX_BASE_URL}${requestPath}`, "error", error.message);
    throw error;
  }
}

export async function syncOkxLiquidity(env, chainIndex = "1") {
  const requestPath = "/api/v6/dex/aggregator/get-liquidity";
  try {
    const payload = await fetchOkxJson(env, requestPath, { chainIndex });
    const fetchedAt = nowIso();
    const data = (payload.data || []).map((source) => ({
      id: source.id,
      name: source.name,
      logo: source.logo || null,
    }));
    await putJson(env, CACHE_KEYS.okxLiquidity(chainIndex), { data, fetchedAt, provider: "OKX DEX", chainIndex }, 3600);
    await recordSourceRun(env, "OKX DEX", `${OKX_DEX_BASE_URL}${requestPath}`, "success");
    return { data, fetchedAt, provider: "OKX DEX", chainIndex };
  } catch (error) {
    await recordSourceRun(env, "OKX DEX", `${OKX_DEX_BASE_URL}${requestPath}`, "error", error.message);
    throw error;
  }
}

export async function syncAll(env) {
  const results = await Promise.allSettled([
    syncTokens(env),
    syncChains(env),
    syncPools(env),
    syncRadar(env),
    syncRisks(env),
  ]);
  return results.map((result) => result.status === "fulfilled"
    ? { status: "fulfilled", provider: result.value.provider, fetchedAt: result.value.fetchedAt }
    : { status: "rejected", error: result.reason.message });
}

export async function pruneSnapshots(env) {
  await env.DB.batch([
    env.DB.prepare("DELETE FROM token_snapshots WHERE fetched_at < datetime('now', '-90 days')"),
    env.DB.prepare("DELETE FROM chain_snapshots WHERE fetched_at < datetime('now', '-365 days')"),
    env.DB.prepare("DELETE FROM pool_snapshots WHERE fetched_at < datetime('now', '-30 days')"),
    env.DB.prepare("DELETE FROM source_runs WHERE fetched_at < datetime('now', '-30 days')"),
  ]);
}
