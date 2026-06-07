import { ALLOWED_POOLS, CACHE_KEYS, DEFAULT_POOL } from "./config.js";
import { pruneSnapshots, syncAll, syncChains, syncOkxLiquidity, syncOkxSupportedChains, syncPools, syncRadar, syncRisks, syncTokens } from "./providers.js";

function corsHeaders(env) {
  return {
    "access-control-allow-origin": env.ALLOWED_ORIGIN || "*",
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "content-type, x-admin-token",
  };
}

function json(env, data, status = 200, cacheControl = "public, max-age=60") {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      ...corsHeaders(env),
      "content-type": "application/json; charset=utf-8",
      "cache-control": cacheControl,
    },
  });
}

async function cachedOrSync(env, key, sync) {
  const cached = await env.MARKET_CACHE.get(key, "json");
  if (cached) return { ...cached, cache: "hit" };
  const fresh = await sync();
  return { ...fresh, cache: "miss" };
}

async function listSources(env) {
  const { results } = await env.DB.prepare(
    "SELECT provider, endpoint, status, fetched_at AS fetchedAt, error_message AS errorMessage FROM source_runs ORDER BY id DESC LIMIT 20",
  ).all();
  const latest = new Map();
  for (const row of results) {
    if (!latest.has(row.provider)) latest.set(row.provider, row);
  }
  return [...latest.values()];
}

function rangeDays(url) {
  const requested = Number(url.searchParams.get("days") || 30);
  return [1, 7, 30, 90, 365].includes(requested) ? requested : 30;
}

function historyLimit(days) {
  if (days <= 1) return 200;
  if (days <= 7) return 400;
  if (days <= 30) return 800;
  return 1200;
}

function isAllowedPool(network, tokenAddress) {
  return ALLOWED_POOLS.some((pool) => (
    pool.network === network
    && pool.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()
  ));
}

async function listTokenHistory(env, tokenId, days) {
  const { results } = await env.DB.prepare(
    "SELECT token_id AS tokenId, symbol, price_usd AS priceUsd, market_cap_usd AS marketCapUsd, volume_24h_usd AS volume24hUsd, change_24h_pct AS change24hPct, source, fetched_at AS fetchedAt FROM token_snapshots WHERE token_id = ? AND fetched_at >= datetime('now', ?) ORDER BY fetched_at DESC LIMIT ?",
  ).bind(tokenId, `-${days} days`, historyLimit(days)).all();
  return results;
}

async function listChainHistory(env, chainName, days) {
  const { results } = await env.DB.prepare(
    "SELECT chain_name AS chainName, tvl_usd AS tvlUsd, change_1d_pct AS change1dPct, source, fetched_at AS fetchedAt FROM chain_snapshots WHERE chain_name = ? AND fetched_at >= datetime('now', ?) ORDER BY fetched_at DESC LIMIT ?",
  ).bind(chainName, `-${days} days`, historyLimit(days)).all();
  return results;
}

async function route(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";

  if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders(env) });

  if (path === "/api/admin/sync") {
    if (request.method !== "POST") return json(env, { error: "Method not allowed" }, 405, "no-store");
    if (!env.ADMIN_SYNC_TOKEN || request.headers.get("x-admin-token") !== env.ADMIN_SYNC_TOKEN) {
      return json(env, { error: "Unauthorized" }, 401, "no-store");
    }
    const results = await syncAll(env);
    await pruneSnapshots(env);
    return json(env, { data: results, syncedAt: new Date().toISOString() }, 200, "no-store");
  }

  if (request.method !== "GET") return json(env, { error: "Method not allowed" }, 405);

  if (path === "/" || path === "/api") {
    return json(env, {
      name: "Web3 MKT Monitor API",
      routes: ["/api/overview", "/api/tokens", "/api/chains", "/api/pools/:network/:tokenAddress", "/api/radar", "/api/risks", "/api/platforms/okx/chains", "/api/platforms/okx/liquidity?chainIndex=1", "/api/sources", "/api/history/tokens/:tokenId?days=30", "/api/history/chains/:chainName?days=30", "POST /api/admin/sync"],
    });
  }

  if (path === "/api/tokens") {
    return json(env, await cachedOrSync(env, CACHE_KEYS.tokens, () => syncTokens(env)));
  }

  if (path === "/api/chains") {
    return json(env, await cachedOrSync(env, CACHE_KEYS.chains, () => syncChains(env)));
  }

  if (path === "/api/overview") {
    const [tokens, chains, radar, risks] = await Promise.all([
      cachedOrSync(env, CACHE_KEYS.tokens, () => syncTokens(env)),
      cachedOrSync(env, CACHE_KEYS.chains, () => syncChains(env)),
      cachedOrSync(env, CACHE_KEYS.radar, () => syncRadar(env)),
      cachedOrSync(env, CACHE_KEYS.risks, () => syncRisks(env)),
    ]);
    return json(env, { tokens, chains, radar, risks, generatedAt: new Date().toISOString() });
  }

  if (path.startsWith("/api/pools/")) {
    const [, , , network, tokenAddress] = path.split("/");
    if (!network || !tokenAddress) return json(env, { error: "Expected /api/pools/:network/:tokenAddress" }, 400);
    if (!isAllowedPool(network, tokenAddress)) return json(env, { error: "Pool token is not enabled" }, 404);
    return json(env, await cachedOrSync(env, CACHE_KEYS.pools(network, tokenAddress), () => syncPools(env, network, tokenAddress)));
  }

  if (path === "/api/pools") {
    const { network, tokenAddress } = DEFAULT_POOL;
    return json(env, await cachedOrSync(env, CACHE_KEYS.pools(network, tokenAddress), () => syncPools(env, network, tokenAddress)));
  }

  if (path === "/api/radar") {
    return json(env, await cachedOrSync(env, CACHE_KEYS.radar, () => syncRadar(env)));
  }

  if (path === "/api/risks") {
    return json(env, await cachedOrSync(env, CACHE_KEYS.risks, () => syncRisks(env)));
  }

  if (path === "/api/platforms/okx/chains") {
    if (!env.OKX_DEX_API_KEY || !env.OKX_DEX_SECRET_KEY || !env.OKX_DEX_PASSPHRASE) {
      return json(env, { data: [], provider: "OKX DEX", status: "not_configured", requiredSecrets: ["OKX_DEX_API_KEY", "OKX_DEX_SECRET_KEY", "OKX_DEX_PASSPHRASE"] }, 200, "no-store");
    }
    try {
      return json(env, await cachedOrSync(env, CACHE_KEYS.okxChains, () => syncOkxSupportedChains(env)));
    } catch (error) {
      return json(env, { data: [], provider: "OKX DEX", status: "auth_error", error: error.message, hasProjectId: Boolean(env.OKX_DEX_PROJECT_ID || env.OKX_ACCESS_PROJECT_ID) }, 200, "no-store");
    }
  }

  if (path === "/api/platforms/okx/liquidity") {
    if (!env.OKX_DEX_API_KEY || !env.OKX_DEX_SECRET_KEY || !env.OKX_DEX_PASSPHRASE) {
      return json(env, { data: [], provider: "OKX DEX", status: "not_configured", requiredSecrets: ["OKX_DEX_API_KEY", "OKX_DEX_SECRET_KEY", "OKX_DEX_PASSPHRASE"] }, 200, "no-store");
    }
    const chainIndex = url.searchParams.get("chainIndex") || "1";
    try {
      return json(env, await cachedOrSync(env, CACHE_KEYS.okxLiquidity(chainIndex), () => syncOkxLiquidity(env, chainIndex)));
    } catch (error) {
      return json(env, { data: [], provider: "OKX DEX", status: "auth_error", error: error.message, chainIndex, hasProjectId: Boolean(env.OKX_DEX_PROJECT_ID || env.OKX_ACCESS_PROJECT_ID) }, 200, "no-store");
    }
  }

  if (path === "/api/sources") {
    return json(env, { data: await listSources(env) });
  }

  if (path.startsWith("/api/history/tokens/")) {
    const tokenId = decodeURIComponent(path.split("/").pop());
    const days = rangeDays(url);
    return json(env, { data: await listTokenHistory(env, tokenId, days), rangeDays: days });
  }

  if (path.startsWith("/api/history/chains/")) {
    const chainName = decodeURIComponent(path.split("/").pop());
    const days = rangeDays(url);
    return json(env, { data: await listChainHistory(env, chainName, days), rangeDays: days });
  }

  return json(env, { error: "Not found" }, 404);
}

export default {
  async fetch(request, env) {
    try {
      return await route(request, env);
    } catch (error) {
      return json(env, { error: error.message }, 500);
    }
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(Promise.all([syncAll(env), pruneSnapshots(env)]));
  },
};
