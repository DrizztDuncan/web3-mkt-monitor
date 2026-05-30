CREATE TABLE IF NOT EXISTS source_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  status TEXT NOT NULL,
  fetched_at TEXT NOT NULL,
  error_message TEXT
);

CREATE TABLE IF NOT EXISTS token_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token_id TEXT NOT NULL,
  symbol TEXT NOT NULL,
  price_usd REAL,
  market_cap_usd REAL,
  volume_24h_usd REAL,
  change_24h_pct REAL,
  source TEXT NOT NULL,
  fetched_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS chain_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chain_name TEXT NOT NULL,
  tvl_usd REAL NOT NULL,
  change_1d_pct REAL,
  source TEXT NOT NULL,
  fetched_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pool_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  network TEXT NOT NULL,
  token_address TEXT NOT NULL,
  pool_address TEXT,
  pool_name TEXT NOT NULL,
  liquidity_usd REAL,
  volume_24h_usd REAL,
  change_24h_pct REAL,
  source TEXT NOT NULL,
  fetched_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS platform_labels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  platform_name TEXT NOT NULL,
  chain_name TEXT NOT NULL,
  label_type TEXT NOT NULL,
  label_value TEXT NOT NULL,
  confidence TEXT NOT NULL,
  evidence_url TEXT,
  status TEXT NOT NULL DEFAULT 'review',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attribution_rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  platform_name TEXT NOT NULL,
  chain_name TEXT NOT NULL,
  rule_type TEXT NOT NULL,
  rule_value TEXT NOT NULL,
  confidence TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'review',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_token_snapshots_lookup
  ON token_snapshots(token_id, fetched_at DESC);

CREATE INDEX IF NOT EXISTS idx_chain_snapshots_lookup
  ON chain_snapshots(chain_name, fetched_at DESC);

CREATE INDEX IF NOT EXISTS idx_pool_snapshots_lookup
  ON pool_snapshots(network, token_address, fetched_at DESC);
