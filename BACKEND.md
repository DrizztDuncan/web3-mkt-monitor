# Backend MVP Setup

The backend MVP is a Cloudflare Worker that normalizes and caches market data from:

- CoinGecko for token markets
- DeFiLlama for chain TVL
- GeckoTerminal for token pools

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
| `GET /api/sources` | Latest provider sync results |

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

Update `config.js` in the repo root:

```js
window.WEB3_API_BASE = "http://localhost:8787";
```

Then serve the static frontend from the repo root. The frontend will use the Worker API. If `WEB3_API_BASE` is empty, the frontend falls back to direct public API calls for demo use.

## Deploy

From the `backend` directory:

```bash
npm run deploy
```

Wrangler will print the deployed Worker URL. Set it in the root `config.js`:

```js
window.WEB3_API_BASE = "https://web3-mkt-monitor-api.<account>.workers.dev";
```

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
