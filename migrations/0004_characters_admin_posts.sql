-- ─────────────────────────────────────────────────────────────────────────────
--  Migration 0004: Anti-abuse trial lock fields + admin log + image_generations
--  Apply with: wrangler d1 migrations apply socialstrategy-db --local
--
--  NOTE: characters table & scheduled_posts table already created in 0001.
--        This migration only adds the new account-linked tables and adds
--        the trial-abuse columns to accounts.
-- ─────────────────────────────────────────────────────────────────────────────

-- Add trial anti-abuse columns to accounts
-- SQLite will silently skip if column already exists via the CREATE TABLE path,
-- but since accounts was created in 0002 we use ALTER TABLE here.
-- If this migration is re-run it will error (safe: migrations run once).
ALTER TABLE accounts ADD COLUMN trial_used        INTEGER  NOT NULL DEFAULT 0;
ALTER TABLE accounts ADD COLUMN trial_fingerprint TEXT     DEFAULT NULL;
ALTER TABLE accounts ADD COLUMN trial_ip          TEXT     DEFAULT NULL;

-- ─── Admin action log ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_logs (
  id          INTEGER  PRIMARY KEY AUTOINCREMENT,
  admin_email TEXT     NOT NULL DEFAULT 'admin',
  action      TEXT     NOT NULL,
  target      TEXT     DEFAULT NULL,    -- email or resource ID
  payload     TEXT     DEFAULT NULL,    -- JSON
  ip          TEXT     DEFAULT NULL,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─── Image generation history ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS image_generations (
  id             INTEGER  PRIMARY KEY AUTOINCREMENT,
  account_email  TEXT     NOT NULL,
  prompt         TEXT     NOT NULL,
  revised_prompt TEXT     DEFAULT NULL,
  image_url      TEXT     NOT NULL,
  size           TEXT     NOT NULL DEFAULT '1024x1024',
  style          TEXT     NOT NULL DEFAULT 'vivid',
  credits_used   INTEGER  NOT NULL DEFAULT 4,
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_images_account_email ON image_generations(account_email);

-- ─── SEO Reports cache: add cache expiry to analysis_reports ─────────────────
ALTER TABLE analysis_reports ADD COLUMN cache_expires_at DATETIME DEFAULT NULL;
