-- ============================================================
-- Social Strategy DB – Accounts & Credits System
-- Migration 0002
-- ============================================================

-- User accounts (one per login / subscriber)
CREATE TABLE IF NOT EXISTS accounts (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  email           TEXT    UNIQUE NOT NULL,
  plan            TEXT    DEFAULT 'free',       -- 'free' | 'pro' | 'business'
  status          TEXT    DEFAULT 'active',     -- 'active' | 'blocked' | 'suspended' | 'expired'
  credits_used    INTEGER DEFAULT 0,
  credits_max     INTEGER DEFAULT 50,           -- free=50, pro=1000, business=5000
  reports_used    INTEGER DEFAULT 0,
  reports_max     INTEGER DEFAULT 1,            -- free=1, pro=5, business=unlimited(-1)
  expires_at      DATETIME,                     -- NULL = never expires (admin accounts)
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Credit transaction log (every AI call logged here)
CREATE TABLE IF NOT EXISTS credit_transactions (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id      INTEGER REFERENCES accounts(id) ON DELETE CASCADE,
  action          TEXT    NOT NULL,   -- 'generate_content' | 'generate_image' | 'video_script' | 'analyze' | 'generate_report'
  credits_used    INTEGER DEFAULT 1,
  description     TEXT    DEFAULT '',
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed: default demo account (email=demo@socialstrategy.ai, pro plan)
INSERT OR IGNORE INTO accounts (email, plan, status, credits_used, credits_max, reports_used, reports_max, expires_at)
VALUES ('demo@socialstrategy.ai', 'pro', 'active', 3465, 10000, 2, 5, datetime('now', '+30 days'));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_accounts_email     ON accounts(email);
CREATE INDEX IF NOT EXISTS idx_transactions_acct  ON credit_transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date  ON credit_transactions(created_at);
