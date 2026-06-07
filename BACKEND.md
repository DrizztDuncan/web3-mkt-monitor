# Backend MVP Setup

The backend MVP is a Cloudflare Worker that normalizes and caches market data from:

- CoinGecko for token markets
- CoinPaprika as a no-key token market fallback
- DeFiLlama for chain TVL
- GeckoTerminal for token pools
- DEX Screener for Market Radar pair signals
- Honeypot.is for EVM token risk checks
- OKX DEX for official Platform Detail supported chains and liquidity sources when credentials are configured

It uses:

- Cloudflare KV for latest cached responses
- Cloudflare D1 for historical snapshots, source runs, platform labels, and attribution rules
- Cloudflare Cron Triggers for scheduled refresh every 15 minutes

## API Routes

| Route | Purpose |
|---|---|
| `GET /api` | API index |
| `GET /api/overview` | Cached token and chain rollups |
| `GET /api/tokens` | CoinGecko token market snapshots |
| `GET /api/chains` | DeFiLlama chain TVL snapshots |
| `GET /api/pools/:network/:tokenAddress` | GeckoTerminal pool snapshots |
| `GET /api/radar` | DEX Screener pair signals for Market Radar |
| `GET /api/risks` | Honeypot.is EVM token risk checks |
| `GET /api/platforms/okx/chains` | OKX DEX supported chains, requires OKX credentials |
| `GET /api/platforms/okx/liquidity?chainIndex=1` | OKX DEX liquidity sources, requires OKX credentials |
| `GET /api/sources` | Latest provider sync results |
| `GET /api/history/tokens/:tokenId?days=30` | Stored token history from D1 |
| `GET /api/history/chains/:chainName?days=30` | Stored chain TVL history from D1 |
| `POST /api/admin/sync` | Protected upstream sync for operators |

## Local Prerequisites

- Node.js 20+
- npm
- Cloudflare account
- Wrangler authenticated with `npx wrangler login`

## Create Cloudflare Resources

From the `backend` directory:

```bash
npm install
npx wrangler kv namespace create MARKET_CACHE
npx wrangler d1 create web3-mkt-monitor
```

Copy the generated KV namespace ID and D1 database ID into `backend/wrangler.toml`.

Apply the initial migration:

```bash
npm run db:migrate:local
npm run db:migrate:remote
```

## Run Locally

Start the Worker:

```bash
cd backend
npm run dev
```

Wrangler will print a local API URL, usually:

```text
http://localhost:8787
```

Set the local Worker URL in browser local storage from the browser console:

```javascript
localStorage.setItem("WEB3_API_BASE", "http://127.0.0.1:8787");
```

Then serve and reload the static frontend. The frontend will use the Worker API. If `WEB3_API_BASE` is empty, the frontend falls back to direct public API calls for demo use.

## Force A Local Sync

Copy `backend/.dev.vars.example` to `backend/.dev.vars` and set a local admin token. The real `.dev.vars` file is ignored by git.

With the local Worker running:

```bash
npm run sync:local
```

This calls the protected `POST /api/admin/sync` endpoint, fetches all providers, writes new KV cache values, appends D1 snapshots, and prunes expired records. In production, store `ADMIN_SYNC_TOKEN` as a Wrangler secret instead of committing it.

## Deploy

From the `backend` directory:

```bash
npm run deploy
```

Production Worker:

```text
https://web3-mkt-monitor-api.duncantheinvictus.workers.dev
```

Hosted frontend builds use this API automatically. Local development uses `http://127.0.0.1:8787` unless `WEB3_API_BASE` is overridden in browser local storage.

Deploy the static frontend to Cloudflare Pages, GitHub Pages, or another static host.

## Data Retention

The scheduled Worker stores one snapshot per provider sync. Start with a 15-minute cadence and add periodic cleanup once real usage begins.

Recommended initial retention:

| Snapshot | Retention |
|---|---:|
| Token snapshots | 90 days |
| Chain snapshots | 365 days |
| Pool snapshots | 30 days |
| Source runs | 30 days |

## Attribution Foundation

The migration includes:

- `platform_labels`
- `attribution_rules`

These tables are intentionally empty. Populate them only with verifiable router contracts, referral parameters, tagged wallets, and reviewed evidence. Keep an `Unknown / Unattributed` bucket in the product.

## Optional Keyed Sources

The no-key MVP sources cover price, TVL, pools, radar signals, and EVM risk checks. Wallet activity, holder concentration, and deeper attribution should be configured later with operator-owned keys:

| Source | Optional secret | Purpose |
|---|---|---|
| OKX DEX | `OKX_DEX_API_KEY`, `OKX_DEX_SECRET_KEY`, `OKX_DEX_PASSPHRASE`, optional `OKX_DEX_PROJECT_ID` | Official supported chains, liquidity sources, quotes, and route metadata |
| Etherscan V2 | `ETHERSCAN_API_KEY` | EVM holder, transfer, and address checks |
| Alchemy | `ALCHEMY_API_KEY` | Logs, transfers, wallet activity, and websocket modules |
| RugCheck | `RUGCHECK_API_KEY` | Solana token authority, holder, LP, and risk checks |

Current OKX DEX docs:

- API reference: https://web3.okx.com/build/dev-docs-v5/dex-api/dex-api-reference
- Get liquidity sources: https://web3.okx.com/build/dev-docs/dex-api/dex-get-liquidity
- API access and signing: https://web3.okx.com/build/dev-docs/dex-api/dex-api-access-and-usage
