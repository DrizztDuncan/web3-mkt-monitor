# Web3 MKT Monitor

Static product mockup and PRD for an onchain market intelligence product with trader-oriented analytics.

## Files

- `index.html` - clickable product mockup
- `styles.css` - mockup styling
- `app.js` - live API integrations, mock data, page navigation, language switcher
- `config.js` - optional deployed Worker API URL; empty keeps direct public API fallback
- `BACKEND.md` - Cloudflare Worker, KV, D1, and scheduled sync setup
- `PRD.md` - product requirements document
- `ROADMAP.md` - backend roadmap, API ownership, and phased budget estimates

## Current Data Sources

The mockup now separates live API data from mock/product-spec data:

- CoinGecko powers token market cards.
- DeFiLlama powers chain TVL and chain share.
- GeckoTerminal powers token pair / pool detail.
- Platform attribution, wallet counts, and alerts remain mock data until the product has its own backend and label database.

For the recommended backend path and budget assumptions, see `ROADMAP.md`.

## Documentation Guide

- Start with `README.md` for the product summary, current data sources, and demo deployment.
- Read `BACKEND.md` to run or deploy the Cloudflare backend MVP.
- Read `ROADMAP.md` for backend phases, API ownership, and budget estimates.
- Read `PRD.md` for the full product requirements, user stories, data model, and detailed planning.

## GitHub Pages

This project can be hosted directly with GitHub Pages because it is a static site.

Recommended setup:

1. Push this repo to GitHub.
2. Open the GitHub repository.
3. Go to `Settings` -> `Pages`.
4. Set source to `Deploy from a branch`.
5. Select branch `main` and folder `/root`.
6. Save.

The mockup will be available at:

```text
https://<github-username>.github.io/<repo-name>/
```
