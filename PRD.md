# Web3 MKT Monitor PRD

## 1. Summary

Web3 MKT Monitor is a CMC / CoinGecko-style onchain market intelligence product focused on:

- All-chain market status
- Platform and wallet entry market share
- Token, chain, and platform rankings
- Platform attribution confidence
- API-cost-aware data refresh strategy
- Trader-oriented market radar features

The product should support two modes:

| Mode | Primary User | Data Freshness | Cost Strategy |
|---|---|---:|---|
| Market Intelligence Mode | Marketing, growth, BD, research | 15m / hourly / daily | Cached and batched |
| Trader Mode | Active traders, analysts, signal hunters | 30s / 1m / 5m for selected assets | Watchlist-based and intent-gated |

The key product principle is: **do not make the entire product real-time**. Broad market pages should use cached rollups. Expensive live data should only be used for watchlists, token/pair detail pages, alerts, and explicit drilldowns.

## 2. Product Positioning

### 2.1 Core Positioning

An onchain market intelligence platform that shows how volume, users, and activity are distributed across chains, tokens, and platform entries such as:

- Binance Alpha
- BN Wallet
- OKX Wallet
- Bitget Onchain
- DEX aggregators
- Other wallet or exchange onchain entries

### 2.2 Trader Positioning

For traders, the product should become a **market radar**, not a full trading terminal in the first version.

It should help traders answer:

- What is moving now?
- Which tokens are gaining volume quickly?
- Which chain or platform is driving the move?
- Is liquidity deep enough?
- Is the token risky?
- Should I open the token/pair detail page for deeper inspection?

It does not need to execute trades in the MVP.

## 3. Goals

### 3.1 Business Goals

- Build a differentiated Web3 data product around platform entry market share.
- Help users compare onchain activity across Binance Alpha, BN Wallet, OKX Wallet, Bitget Onchain, and other entries.
- Provide a credible product path for both growth teams and traders.
- Keep API cost controlled from day one.

### 3.2 Product Goals

- Show full-market onchain metrics across chains.
- Rank platforms by volume, transactions, active wallets, and market share.
- Rank tokens and chains by activity.
- Show attribution confidence for platform-level data.
- Add trader-focused watchlists, alerts, token/pair detail, risk checks, and live-ish market signals.
- Make data freshness and API cost policy visible in the UI.

### 3.3 Non-Goals For MVP

- No trade execution.
- No portfolio management.
- No full raw transaction replay on every page load.
- No real-time monitoring for every token on every chain.
- No wallet-level tracking unless the user explicitly requests a drilldown.

## 4. User Personas

| Persona | Main Need | Most Important Pages |
|---|---|---|
| Web3 Marketing Team | Understand platform and chain heat for campaign decisions | Overview, Platforms, Tokens |
| Project Growth Team | See where their token activity comes from | Token Detail, Platform Detail |
| BD / Exchange / Wallet Team | Compare platform entry market share | Platforms, Platform Detail |
| Research Analyst | Understand trends, anomalies, and attribution quality | Overview, Attribution, Sources |
| Trader | Find live market opportunities and risk signals | Trader Radar, Watchlist, Token / Pair Detail, Alerts |

## 5. Product Modes

### 5.1 Market Intelligence Mode

This is the default mode and should be low-cost.

Primary capabilities:

- Market overview
- Platform ranking
- Platform detail
- Token ranking
- Token detail
- Chain ranking
- Chain detail
- Attribution rules
- Data source health
- CSV exports

Refresh strategy:

- Overview metrics: every 15 minutes
- Platform ranking: every 15-30 minutes
- Token ranking: every 10-30 minutes
- Chain ranking: hourly or daily depending on metric
- Historical trends: daily materialized tables

### 5.2 Trader Mode

Trader Mode adds fresher, more actionable analytics for selected assets.

Primary capabilities:

- Watchlist
- Live-ish token/pair detail
- Trending pairs
- Volume spike alerts
- Liquidity change alerts
- Contract risk panel
- Holder concentration
- Smart wallet / whale signal preview
- DEX route and slippage preview

Refresh strategy:

- Watchlist prices: 30s-60s
- Watchlist liquidity: 1m-5m
- Trending pairs: 1m-5m
- Alerts: near-real-time for watchlist, 5m-15m for broad market
- Wallet-level analytics: on demand

## 6. Core User Stories

### 6.1 Market Intelligence Stories

- As a user, I want to see total all-chain trading volume, transactions, active wallets, and unattributed activity.
- As a user, I want to compare Binance Alpha, BN Wallet, OKX Wallet, Bitget Onchain, and other entries by market share.
- As a user, I want to open a platform and see its chain distribution, token distribution, and user growth.
- As a user, I want to search a token and see which platform or chain is driving activity.
- As a user, I want to understand whether platform attribution is high-confidence or inferred.

### 6.2 Trader Stories

- As a trader, I want to see which tokens or pairs are moving now.
- As a trader, I want to track a watchlist with fresher price, volume, and liquidity.
- As a trader, I want alerts when volume, price, liquidity, or platform share changes quickly.
- As a trader, I want to know whether a token has contract or holder concentration risk.
- As a trader, I want to see liquidity depth and estimated slippage before deciding whether to trade.
- As a trader, I want to know which platform or wallet entry is driving a token move.

## 7. Feature Scope

### 7.1 MVP Scope

MVP should include both the market intelligence foundation and a lightweight Trader Mode.

| Area | MVP Feature | Included |
|---|---|---|
| Overview | Market metrics, volume trend, platform mix | Yes |
| Platforms | Platform ranking and platform detail | Yes |
| Tokens | Token ranking and token detail | Yes |
| Chains | Chain ranking and chain detail | Yes |
| Attribution | Attribution rules, confidence, unknown traffic | Yes |
| Alerts | Batch anomaly alerts | Yes |
| Exports | CSV export queue from cached tables | Yes |
| Trader Mode | Watchlist, token/pair detail, basic alerts | Yes |
| Trader Risk | Basic contract and liquidity risk indicators | Yes |
| Deep Wallet Analytics | Wallet cohorts and smart money tracking | Partial / on demand |

### 7.2 Post-MVP Scope

- Full smart money wallet clustering
- Cross-chain fund flow tracing
- API subscription product
- Custom dashboards
- Team permissions
- KOL / social signal integration
- Trade execution integrations
- Advanced arbitrage scanner
- Automated research reports

## 8. Page Requirements

### 8.1 Overview

Purpose: answer “what is happening across the whole onchain market?”

Required modules:

- Total volume
- Transactions
- Active wallets
- New wallets
- Unattributed traffic percentage
- All-chain volume trend
- Platform market share
- Chain market share
- Hot tokens
- Market anomaly queue
- Data freshness indicators

Cost policy:

- Use cached rollups.
- No wallet-level calls on page load.

### 8.2 Platforms

Purpose: compare platform and wallet entry market share.

Table fields:

- Platform name
- Type: exchange, wallet, aggregator, unknown
- Volume
- Volume share
- Transactions
- Active wallets
- New wallets
- Main chains
- 24h change
- 7d change
- Attribution confidence
- API policy

Cost policy:

- Use precomputed platform rollups.
- Platform details load only after user click.

### 8.3 Platform Detail

Purpose: inspect one platform entry.

Required modules:

- Platform summary
- Volume trend
- Market share trend
- Chain distribution
- Token distribution
- Top trading pairs
- User growth
- Attribution rules used
- Confidence score

Trader extension:

- Show which tokens on the platform are spiking.
- Show liquidity and risk summary for top moving tokens.

### 8.4 Tokens

Purpose: discover active tokens across chains and platforms.

Table fields:

- Token
- Chain
- Price
- 24h volume
- Volume change
- Liquidity
- Active wallets
- Main platform entry
- Risk level
- Data freshness

Cost policy:

- Use cached token ranking and public market data.
- Only refresh selected watchlist assets frequently.

### 8.5 Token / Pair Detail

Purpose: support trader and analyst inspection of one asset.

Required modules:

- Price
- Market cap
- Liquidity
- 24h volume
- Volume trend
- Transactions
- Active wallets
- Platform split
- Chain split
- Top pairs
- Holder concentration
- Contract risk summary
- Data freshness

Trader modules:

- Live-ish candle chart
- Liquidity depth
- Estimated slippage
- Buy/sell pressure
- New holder velocity
- Whale transaction feed
- Smart wallet activity preview
- DEX route comparison
- Alerts for this token

Cost policy:

- Basic detail uses cache.
- Live pair data refreshes only if user opens the page or adds token to watchlist.
- Wallet feed and smart money modules are click-to-load.

### 8.6 Chains

Purpose: compare market activity by chain.

Required modules:

- Chain ranking
- Volume
- Transactions
- Active wallets
- Top platforms on chain
- Top tokens on chain
- Unattributed share
- Refresh cost policy

### 8.7 Chain Detail

Purpose: inspect one chain’s platform and token activity.

Required modules:

- Chain summary metrics
- Platform share on this chain
- Token heatmap
- DEX / aggregator distribution
- Attribution coverage
- Data source health

### 8.8 Attribution

Purpose: make platform share credible and auditable.

Required modules:

- Attribution rules table
- Rule type: router, referral, calldata, tagged wallet, platform API, inferred route
- Platform mapped
- Chain
- Confidence
- Data source
- Status
- Last verified

Cost policy:

- Rules are stored internally.
- Testing a rule uses sampled cached transactions first.
- Full historical backfill is manual or scheduled.

### 8.9 Alerts

Purpose: surface market changes without making every page real-time.

Alert types:

- Volume spike
- Price move
- Liquidity add/remove
- Platform share shift
- Unattributed traffic spike
- New pair listing
- New holder spike
- Whale buy/sell
- Contract risk change

Trader alert requirements:

- Watchlist alerts refresh faster.
- Broad market alerts can be batch scanned.
- Every alert must show source, freshness, and confidence.

### 8.10 Trader Radar

Purpose: provide one trader-first page for opportunity discovery.

Required modules:

- Trending pairs
- New listings
- Fastest volume growth
- Liquidity growth
- Buy/sell pressure
- Platform driving the move
- Risk flags
- Watchlist quick add

Cost policy:

- Rank from recent cached windows.
- Live refresh only for visible top results and watchlist assets.

### 8.11 Watchlist

Purpose: make Trader Mode cost-efficient.

Required modules:

- User-selected tokens / pairs
- Price
- Volume
- Liquidity
- Slippage
- Risk level
- Alert status
- Data freshness

Cost policy:

- Watchlist assets receive higher refresh frequency.
- Non-watchlist assets stay cached.

### 8.12 Sources

Purpose: show data reliability.

Required modules:

- Source name
- Source type
- Freshness
- Status
- Confidence
- Last successful update
- Cost tier

### 8.13 Exports

Purpose: export data without triggering new expensive queries.

Required modules:

- Export queue
- Report name
- Scope
- Rows
- Source table
- Status

Cost policy:

- Exports use stored rollup tables.
- Large exports run as background jobs.

### 8.14 API Cost Settings

Purpose: let operators control cost and freshness.

Required modules:

- Cost mode: low, balanced, deep research
- Refresh intervals
- Watchlist refresh budget
- Expensive modules enabled / disabled
- API usage estimate
- Cost by feature

## 9. Trader Analytics Requirements

### 9.1 Live-ish Market Metrics

Required trader metrics:

- Price
- Price change: 5m, 1h, 24h
- Volume: 5m, 1h, 24h
- Liquidity
- Liquidity change
- Transactions
- Buy count / sell count
- Active traders
- New holders
- Platform share change
- Chain share change

### 9.2 Liquidity And Execution Analytics

Required metrics:

- Pool liquidity
- Liquidity depth by trade size
- Estimated slippage
- Spread where applicable
- Best DEX route
- Route confidence
- Largest pool
- Liquidity added / removed

MVP note:

- Show estimated slippage for common sizes, such as $1k, $5k, $10k.
- Deep route simulation can be on demand.

### 9.3 Risk Analytics

Required indicators:

- Honeypot risk
- Buy tax / sell tax
- Contract owner privileges
- Mint permission
- Pause / blacklist permission
- Liquidity lock status
- Top holder concentration
- Dev wallet concentration
- Contract verification status
- Token age

Risk levels:

- Low
- Medium
- High
- Unknown

### 9.4 Smart Money / Whale Analytics

MVP:

- Large transactions
- Whale buys / sells
- Known wallet labels if available
- Net whale flow

Post-MVP:

- Smart wallet scoring
- Wallet clustering
- Copy-trade style watchlists
- Profitability ranking

Cost policy:

- Do not compute smart money globally in real time.
- Compute for watchlist and trending assets first.

### 9.5 Trader Alerts

Required alert triggers:

- Price change above threshold
- Volume spike
- Liquidity remove
- Liquidity add
- Whale buy / sell
- Contract risk change
- New pair created
- Platform share spike
- Watchlist asset trending

Required alert fields:

- Alert type
- Asset
- Chain
- Platform entry
- Severity
- Trigger value
- Data freshness
- Confidence
- Recommended next view

## 10. API Cost Strategy

### 10.1 Current Market Intelligence Cost Model

The current product is relatively low cost because most pages use:

- Cached rollups
- Batch jobs
- Public market data
- Stored attribution labels
- CSV exports from existing tables

Estimated relative cost:

| Capability | Refresh | Relative Cost |
|---|---:|---:|
| Overview metrics | 15m | Low |
| Platform rankings | 15-30m | Low |
| Chain rankings | Hourly / daily | Low |
| Token rankings | 10-30m | Low-Medium |
| Attribution rules | Manual / daily | Low after setup |
| Batch alerts | 15m | Low-Medium |
| Exports | On demand from cache | Low |

### 10.2 Added Trader Feature Cost Model

Trader features increase cost because they need fresher data and deeper asset-level analytics.

| Trader Feature | Refresh | Relative Cost | Cost Control |
|---|---:|---:|---|
| Watchlist price | 30s-60s | Medium | Limit watchlist size |
| Watchlist liquidity | 1m-5m | Medium | Only tracked pairs |
| Trending pairs | 1m-5m | Medium | Top N only |
| Token / pair detail | On open | Medium | Session cache |
| Slippage simulation | On click / 1m | Medium-High | Common trade sizes |
| Contract risk | On open / daily | Medium | Cache by contract |
| Whale feed | Watchlist / on open | High | Limit wallet depth |
| Smart money scoring | On demand | High | Async job |
| Raw transaction replay | Manual / scheduled | Very High | Never default |

### 10.3 Cost Comparison

Indicative cost ratio:

| Product Version | Relative API / Infra Cost |
|---|---:|
| Market Intelligence MVP | 1x |
| MVP + Watchlist + Basic Trader Alerts | 2x-4x |
| Trader Mode With Live Pair Analytics | 5x-10x |
| Full Smart Money + Multi-chain Live Monitoring | 10x-30x |

Recommendation:

- Build Market Intelligence MVP first.
- Add Trader Mode as watchlist-based.
- Make live data visible only on Trader Radar, Watchlist, Token / Pair Detail, and Alerts.
- Keep all broad market pages cached.

## 11. Data Model

### 11.1 Core Tables

#### platforms

- id
- name
- type
- website
- logo_url
- supported_chains
- created_at
- updated_at

#### chains

- id
- name
- chain_id
- native_token
- explorer_url
- created_at
- updated_at

#### tokens

- id
- chain_id
- symbol
- name
- contract_address
- decimals
- logo_url
- coingecko_id
- cmc_id
- created_at
- updated_at

#### market_metrics

- id
- timestamp
- chain_id
- platform_id
- token_id
- pair_id
- volume_usd
- tx_count
- active_wallet_count
- new_wallet_count
- liquidity_usd
- source
- confidence_level

#### platform_attribution_rules

- id
- platform_id
- chain_id
- rule_type
- rule_value
- confidence_level
- status
- last_verified_at
- created_at
- updated_at

### 11.2 Trader Tables

#### pairs

- id
- chain_id
- dex_id
- base_token_id
- quote_token_id
- pair_address
- created_at
- updated_at

#### pair_market_snapshots

- id
- pair_id
- timestamp
- price_usd
- volume_5m_usd
- volume_1h_usd
- volume_24h_usd
- liquidity_usd
- buy_count
- sell_count
- active_trader_count
- source

#### token_risk_snapshots

- id
- token_id
- timestamp
- honeypot_risk
- buy_tax
- sell_tax
- owner_privileges
- liquidity_lock_status
- top_holder_percentage
- risk_level
- source

#### watchlists

- id
- user_id
- name
- created_at
- updated_at

#### watchlist_items

- id
- watchlist_id
- token_id
- pair_id
- refresh_tier
- alert_enabled
- created_at

#### alerts

- id
- user_id
- alert_type
- chain_id
- token_id
- pair_id
- platform_id
- severity
- trigger_value
- status
- created_at
- resolved_at

## 12. Data Sources

Potential sources:

- Public chain RPC / archive nodes
- Block explorer APIs
- DEX subgraphs
- DEX screener-style APIs
- CoinGecko / CoinMarketCap market data
- DefiLlama
- Dune / Flipside / Goldsky
- Platform official APIs
- Wallet / router / referral label database
- Contract risk vendors
- Internal wallet label database

Source priority:

1. Platform official verifiable data
2. Raw onchain data
3. Trusted third-party indexers
4. Public market data APIs
5. Community labels
6. Inferred attribution

All inferred data must show a confidence level.

## 13. Non-Functional Requirements

### 13.1 Performance

- Overview first load under 3 seconds.
- Cached ranking pages under 2 seconds.
- Table search and filters under 500ms.
- Token / pair detail initial cached view under 2 seconds.
- Live modules can load progressively.

### 13.2 Reliability

- Every page must show data freshness.
- Every major metric must show source.
- Failed expensive modules should not block cached page content.
- Unknown or unattributed traffic must be visible, not hidden.

### 13.3 Cost Control

- Support low, balanced, and deep research modes.
- Use cache by default.
- Use watchlist-based refresh for Trader Mode.
- Gate wallet-level and raw transaction features behind explicit clicks.
- Maintain feature-level API usage estimates.

### 13.4 Usability

- Desktop-first.
- Mobile-readable for core pages.
- English and Simplified Chinese language switch.
- Tooltips for metrics and confidence levels.
- Clear labels for cached, live, delayed, and inferred data.

## 14. MVP Acceptance Criteria

MVP is acceptable when users can:

- View all-chain market overview.
- Compare platform market share.
- Open platform detail.
- View token ranking.
- Open token / pair detail.
- View chain ranking and chain detail.
- See attribution confidence and unknown traffic.
- See source freshness.
- Export CSV from cached report tables.
- Switch between English and Simplified Chinese.
- Use a basic Trader Mode watchlist.
- See basic trader alerts.
- See liquidity, slippage estimate, and risk indicators for a selected token/pair.
- Understand whether data is cached, live-ish, delayed, or on demand.

## 15. Risks And Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Platform attribution is inaccurate | Users lose trust | Show confidence, source, and unknown share |
| API cost grows too fast | Product becomes expensive to operate | Cache broad pages, gate deep data, watchlist refresh |
| Trader data is not fresh enough | Traders stop using it | Make Trader Mode separate with clear freshness labels |
| Too many features dilute MVP | Build slows down | Ship market intelligence + lightweight Trader Mode first |
| Multi-chain indexing is expensive | High infra cost | Start with high-value chains and top tokens |
| Risk scores produce false confidence | Trading losses and trust issues | Show risk as indicator, not financial advice |

## 16. Recommended Build Order

1. Static clickable mockup
2. Market Intelligence MVP with mock data
3. Data schema and rollup pipeline design
4. Cached Overview / Platforms / Tokens / Chains
5. Attribution rules and confidence display
6. Sources and freshness display
7. CSV exports
8. Trader Mode watchlist
9. Token / pair detail with liquidity and risk panel
10. Trader alerts
11. Optional smart money and whale analytics

## 17. Open Questions

- Which chains should be included first?
- Do we have reliable attribution data for Binance Alpha, BN Wallet, OKX Wallet, and Bitget Onchain?
- Should DEX aggregators such as 1inch, Jupiter, CowSwap, and 0x be treated as platforms?
- Should volume include only swaps, or also bridge, perp, launchpad, and staking activity?
- Is the first version an internal tool or public website?
- What is the acceptable API budget per day or per month?
- How many assets should Trader Mode watchlist support per user?
- What refresh frequency is acceptable for trader alerts?
- Which contract risk provider should be used?
- Should smart money analytics be a paid feature?

