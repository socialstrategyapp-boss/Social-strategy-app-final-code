-- ─────────────────────────────────────────────────────────────────────────────
--  Migration 0004: Anti-abuse trial lock fields + character table + admin log
--  Apply with: wrangler d1 migrations apply webapp-production --local
-- ─────────────────────────────────────────────────────────────────────────────

-- Add trial anti-abuse columns to accounts (if not already present)
ALTER TABLE accounts ADD COLUMN trial_used        INTEGER  NOT NULL DEFAULT 0;
ALTER TABLE accounts ADD COLUMN trial_fingerprint TEXT     DEFAULT NULL;
ALTER TABLE accounts ADD COLUMN trial_ip          TEXT     DEFAULT NULL;

-- ─── Characters table ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS characters (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  account_id      INTEGER  NOT NULL,
  name            TEXT     NOT NULL,
  role            TEXT     NOT NULL DEFAULT 'Content Creator',
  personality     TEXT     NOT NULL DEFAULT '',
  backstory       TEXT     NOT NULL DEFAULT '',
  tone            TEXT     NOT NULL DEFAULT 'Professional',
  industry        TEXT     NOT NULL DEFAULT 'General Business',
  avatar_prompt   TEXT     DEFAULT NULL,
  avatar_url      TEXT     DEFAULT NULL,
  writing_style   TEXT     DEFAULT NULL,
  content_pillars TEXT     DEFAULT NULL,    -- JSON array stored as text
  is_active       INTEGER  NOT NULL DEFAULT 1,
  posts_created   INTEGER  NOT NULL DEFAULT 0,
  videos_created  INTEGER  NOT NULL DEFAULT 0,
  images_created  INTEGER  NOT NULL DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES accounts(id)
);

CREATE INDEX IF NOT EXISTS idx_characters_account ON characters(account_id);

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

-- ─── Scheduled posts table ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS scheduled_posts (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  account_id      INTEGER  NOT NULL,
  character_id    INTEGER  DEFAULT NULL,
  platform        TEXT     NOT NULL,
  content         TEXT     NOT NULL,
  hashtags        TEXT     DEFAULT NULL,   -- JSON array
  image_url       TEXT     DEFAULT NULL,
  scheduled_at    DATETIME NOT NULL,
  status          TEXT     NOT NULL DEFAULT 'pending',  -- pending, published, failed, cancelled
  published_at    DATETIME DEFAULT NULL,
  error_message   TEXT     DEFAULT NULL,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES accounts(id),
  FOREIGN KEY (character_id) REFERENCES characters(id)
);

CREATE INDEX IF NOT EXISTS idx_posts_account  ON scheduled_posts(account_id);
CREATE INDEX IF NOT EXISTS idx_posts_status   ON scheduled_posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_scheduled ON scheduled_posts(scheduled_at);

-- ─── Image generation history ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS image_generations (
  id           INTEGER  PRIMARY KEY AUTOINCREMENT,
  account_id   INTEGER  NOT NULL,
  prompt       TEXT     NOT NULL,
  revised_prompt TEXT   DEFAULT NULL,
  image_url    TEXT     NOT NULL,
  size         TEXT     NOT NULL DEFAULT '1024x1024',
  style        TEXT     NOT NULL DEFAULT 'vivid',
  credits_used INTEGER  NOT NULL DEFAULT 4,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES accounts(id)
);

CREATE INDEX IF NOT EXISTS idx_images_account ON image_generations(account_id);

-- ─── SEO Reports cache ───────────────────────────────────────────────────────
-- Update analysis_reports to add cache expiry (skip re-analysis within 24h)
ALTER TABLE analysis_reports ADD COLUMN cache_expires_at DATETIME DEFAULT NULL;
