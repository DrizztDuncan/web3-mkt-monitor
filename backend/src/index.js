import { CACHE_KEYS, DEFAULT_POOL } from "./config.js";
import { pruneSnapshots, syncAll, syncChains, syncPools, syncTokens } from "./providers.js";

function corsHeaders(env) {
  return {
    "access-control-allow-origin": env.ALLOWED_ORIGIN || "*",
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-allow-headers": "content-type",
  };
}

function json(env, data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      ...corsHeaders(env),
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=60",
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

async function route(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";

  if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders(env) });
  if (request.method !== "GET") return json(env, { error: "Method not allowed" }, 405);

  if (path === "/" || path === "/api") {
    return json(env, {
      name: "Web3 MKT Monitor API",
      routes: ["/api/overview", "/api/tokens", "/api/chains", "/api/pools/:network/:tokenAddress", "/api/sources"],
    });
  }

  if (path === "/api/tokens") {
    return json(env, await cachedOrSync(env, CACHE_KEYS.tokens, () => syncTokens(env)));
  }

  if (path === "/api/chains") {
    return json(env, await cachedOrSync(env, CACHE_KEYS.chains, () => syncChains(env)));
  }

  if (path === "/api/overview") {
    const [tokens, chains] = await Promise.all([
      cachedOrSync(env, CACHE_KEYS.tokens, () => syncTokens(env)),
      cachedOrSync(env, CACHE_KEYS.chains, () => syncChains(env)),
    ]);
    return json(env, { tokens, chains, generatedAt: new Date().toISOString() });
  }

  if (path.startsWith("/api/pools/")) {
    const [, , network, tokenAddress] = path.split("/");
    if (!network || !tokenAddress) return json(env, { error: "Expected /api/pools/:network/:tokenAddress" }, 400);
    return json(env, await cachedOrSync(env, CACHE_KEYS.pools(network, tokenAddress), () => syncPools(env, network, tokenAddress)));
  }

  if (path === "/api/pools") {
    const { network, tokenAddress } = DEFAULT_POOL;
    return json(env, await cachedOrSync(env, CACHE_KEYS.pools(network, tokenAddress), () => syncPools(env, network, tokenAddress)));
  }

  if (path === "/api/sources") {
    return json(env, { data: await listSources(env) });
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
