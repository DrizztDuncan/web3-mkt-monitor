# Web3 MKT Monitor Roadmap

This roadmap explains how the static mockup can grow into a real Web3 market intelligence product while keeping infrastructure and API costs controlled.

The product should start with cached market intelligence, then add trader features only where freshness matters. Broad pages should stay cheap and cached. Expensive live data should be reserved for watchlists, token/pair detail, alerts, and explicit drilldowns.

## Current Prototype

The current app is a static frontend with a few public API integrations:

| Area | Current Data Source | Status |
|---|---|---|
| Token ranking | CoinGecko market data | Live API |
| Chain ranking | DeFiLlama chain TVL | Live API |
| Token pair detail | GeckoTerminal pool data | Live API |
| Platform ranking | Mock data / future labels | Mock |
| Platform attribution | Mock rules | Mock |
| Alerts | Mock data | Mock |

The prototype does not need a database because it does not store users, watchlists, historical snapshots, labels, or alert history.

## API Ownership

Each data provider should have a clear responsibility so the UI does not mix conflicting definitions.

| Product Need | Recommended Source | Why |
|---|---|---|
| Chain TVL and broad DeFi rollups | DeFiLlama | Best fit for aggregate DeFi intelligence |
| Token price, market cap, and token volume | CoinGecko | Best fit for normalized token market data |
| Pool liquidity, DEX pairs, and pool-level movement | GeckoTerminal | Best fit for onchain pair and pool detail |
| Platform/wallet attribution | Internal label database | Requires proprietary router, referral, wallet, and campaign mapping |
| User watchlists and alerts | Internal database | Requires user state and historical trigger records |

## Phase 0: Static Demo

Goal: validate product direction and UI.

Scope:

- Static frontend hosted on GitHub Pages, Cloudflare Pages, or Netlify.
- Direct browser calls to public APIs.
- Clear UI labels for live, mock, delayed, and feature-spec data.
- No accounts, backend, database, alert persistence, or export storage.

Estimated monthly budget:

| Item | Estimate |
|---|---:|
| Static hosting | $0 |
| DeFiLlama | $0 |
| GeckoTerminal public API | $0 |
| CoinGecko demo/free usage | $0 |
| Domain name | $0-$20/year |
| Total | $0/month, plus optional domain |

Main limitation: browser-side API calls are not reliable enough for a real product. Rate limits, CORS behavior, and provider changes can break the app.

## Phase 1: Free Backend MVP

Goal: make the app more reliable without committing to paid infrastructure.

Recommended stack:

- Cloudflare Pages for frontend.
- Cloudflare Worker as backend API.
- Cloudflare KV for latest cached snapshots.
- Cloudflare D1 for lightweight historical snapshots.
- Cloudflare Cron Triggers for scheduled API sync.

Scope:

- Backend fetches DeFiLlama, CoinGecko, and GeckoTerminal.
- Frontend calls only the backend.
- Latest data is cached in KV.
- D1 stores daily or hourly snapshots for 24h, 7d, 30d, and 90d views.
- Basic source health and freshness.
- No heavy user accounts yet.

Estimated monthly budget:

| Item | Estimate |
|---|---:|
| Cloudflare Pages | $0 |
| Cloudflare Workers Free | $0 |
| Cloudflare KV Free | $0, within limits |
| Cloudflare D1 Free | $0, within limits |
| DeFiLlama | $0 |
| GeckoTerminal public API | $0 |
| CoinGecko demo/free usage | $0, but limited |
| Total | $0-$10/month |

Budget notes:

- Cloudflare Workers Free is suitable for prototypes, but production traffic may need the paid Workers plan.
- Cloudflare KV Free includes limited daily reads and writes.
- Cloudflare D1 Free is enough for prototype-scale snapshots, but exceeding daily read/write limits will cause errors until reset.
- CoinGecko free/demo usage is useful for testing, but token-heavy production use may require a paid plan.

Recommended trigger to leave this phase:

- More than a few hundred active users.
- Token list grows beyond a small curated set.
- Period switching and historical charts become core user workflows.
- Free API limits start affecting reliability.

## Phase 2: Product MVP

Goal: support real user workflows while keeping cost predictable.

Add:

- User accounts.
- Saved watchlists.
- Alert rules and alert history.
- CSV export queue.
- Admin label review for platform attribution.
- Historical token, chain, and pool charts.
- Backend-only API keys.

Recommended stack:

- Cloudflare Workers Paid or equivalent serverless backend.
- D1 for lightweight relational data, or hosted Postgres if query complexity grows.
- KV for short-lived cache.
- Scheduled jobs for data sync.
- Object storage for generated exports if files become large.

Estimated monthly budget:

| Item | Estimate |
|---|---:|
| Cloudflare Workers Paid / serverless backend | $5-$50 |
| D1, KV, storage overages | $0-$50 |
| CoinGecko paid tier if needed | $35-$150+ |
| Monitoring/logging | $0-$50 |
| Domain/email/ops tools | $10-$50 |
| Total | $50-$300/month |

Recommended limits:

- Refresh broad pages every 15-60 minutes.
- Refresh token watchlists every 30-60 seconds only for saved assets.
- Keep pair data intent-gated.
- Store only useful historical intervals, not every raw API response forever.

## Phase 3: Serious Data Product

Goal: become a reliable analytics product with richer history, attribution, and alerts.

Add:

- Postgres for core product data.
- TimescaleDB or another time-series layer for market snapshots.
- Redis or managed cache for rate limiting and hot reads.
- Background worker queue for sync, exports, and alert scans.
- Admin workflow for platform/wallet labels.
- Better alert delivery through email, Telegram, Discord, or webhooks.
- More chains, tokens, pools, and protocols.

Estimated monthly budget:

| Item | Estimate |
|---|---:|
| Managed Postgres / Timescale | $50-$500 |
| Redis / managed cache | $20-$200 |
| Background workers | $20-$300 |
| Object storage and exports | $5-$100 |
| Paid market data APIs | $100-$1,000+ |
| Monitoring/logging/error tracking | $25-$200 |
| Total | $300-$2,000/month |

Recommended trigger:

- Customers need reliable historical analysis.
- Alert latency matters.
- Watchlists and user accounts are active.
- Platform attribution requires manual review and audit history.

## Phase 4: Advanced Trader Intelligence

Goal: add higher-value, higher-cost trading intelligence.

Add:

- Smart money and whale signals.
- Contract risk scoring.
- Holder concentration analysis.
- Slippage and route previews.
- Multi-chain pair monitoring.
- Near-real-time alerting for paid workspaces.
- Team accounts, permissions, and API access.

Estimated monthly budget:

| Item | Estimate |
|---|---:|
| Indexers / RPC / archive access | $500-$5,000+ |
| Market data APIs | $500-$5,000+ |
| Compute and worker queues | $200-$2,000+ |
| Database and time-series storage | $500-$5,000+ |
| Monitoring and incident tooling | $100-$1,000+ |
| Total | $2,000-$15,000+/month |

Recommended trigger:

- Paying customers require fresher signals.
- The product needs proprietary data, not just third-party aggregation.
- Platform attribution accuracy becomes a competitive advantage.

## Recommended Build Order

1. Keep the static UI polished and clear about live vs mock data.
2. Add a Cloudflare Worker backend proxy.
3. Move third-party API calls from browser to backend.
4. Add KV cache for latest snapshots.
5. Add D1 tables for historical snapshots.
6. Add period-aware token, chain, and pool views.
7. Add admin-managed platform attribution labels.
8. Add user watchlists.
9. Add alert rules and alert history.
10. Add CSV exports from cached tables.
11. Move to Postgres/Timescale when D1 becomes limiting.
12. Add advanced trader intelligence only after core retention is proven.

## Data Model Direction

Minimum backend tables:

- `source_snapshots`
- `chain_snapshots`
- `token_snapshots`
- `pool_snapshots`
- `platforms`
- `platform_labels`
- `attribution_rules`
- `watchlists`
- `alert_rules`
- `alert_events`
- `export_jobs`

Every snapshot should store:

- source provider
- source endpoint
- fetched timestamp
- normalized metric name
- raw value
- normalized value
- freshness
- confidence

## Budget Assumptions

These estimates are planning ranges, not quotes. Pricing changes often, and final cost depends on traffic, refresh frequency, number of tracked assets, data retention, and whether the product is commercial.

Current pricing references checked while preparing this roadmap:

- Cloudflare Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare D1 pricing: https://developers.cloudflare.com/d1/platform/pricing/
- Cloudflare KV pricing: https://developers.cloudflare.com/kv/platform/pricing/
- CoinGecko API pricing: https://www.coingecko.com/en/api/pricing
- DeFiLlama API docs: https://defillama.com/docs/api

Before launch, re-check provider terms for commercial use, redistribution rights, rate limits, and required attribution.
