import { CACHE_KEYS, CHAIN_MARKETS, DEFAULT_POOL, TOKEN_MARKETS } from "./config.js";

const COINGECKO_URL = "https://api.coingecko.com/api/v3/coins/markets";
const DEFILLAMA_URL = "https://api.llama.fi/v2/chains";

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

async function putJson(env, key, data, expirationTtl = 900) {
  await env.MARKET_CACHE.put(key, JSON.stringify(data), { expirationTtl });
}

async function recordSourceRun(env, provider, endpoint, status, errorMessage = null) {
  await env.DB.prepare(
    "INSERT INTO source_runs (provider, endpoint, status, fetched_at, error_message) VALUES (?, ?, ?, ?, ?)",
  ).bind(provider, endpoint, status, nowIso(), errorMessage).run();
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
      return {
        id: token.id,
        symbol: token.symbol,
        name: token.displayName,
        platform: token.platform,
        priceUsd: row.current_price ?? null,
        marketCapUsd: row.market_cap ?? null,
        volume24hUsd: row.total_volume ?? null,
        change1hPct: row.price_change_percentage_1h_in_currency ?? null,
        change24hPct: row.price_change_percentage_24h_in_currency ?? row.price_change_percentage_24h ?? null,
        change7dPct: row.price_change_percentage_7d_in_currency ?? null,
        change30dPct: row.price_change_percentage_30d_in_currency ?? null,
      };
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
    throw error;
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

export async function syncAll(env) {
  const results = await Promise.allSettled([
    syncTokens(env),
    syncChains(env),
    syncPools(env),
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
