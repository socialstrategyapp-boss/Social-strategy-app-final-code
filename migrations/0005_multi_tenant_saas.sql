-- ============================================================
-- Social Strategy – Migration 0005
-- Full Multi-Tenant SaaS Architecture
-- Plans: Free | Business | Pro | Enterprise
-- Entities: plans, user_profiles, business_profiles, brand_voice,
--            content_memory, team_members, social_connectors
-- ============================================================

-- ── PLANS TABLE ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS plans (
  id                    TEXT    PRIMARY KEY,         -- 'free' | 'business' | 'pro' | 'enterprise'
  display_name          TEXT    NOT NULL,
  price_aud_monthly     REAL    NOT NULL DEFAULT 0,
  price_aud_yearly      REAL    NOT NULL DEFAULT 0,
  credits_monthly       INTEGER NOT NULL DEFAULT 50,
  credits_rollover      INTEGER NOT NULL DEFAULT 0,  -- max rollover credits
  reports_max           INTEGER NOT NULL DEFAULT 1,  -- -1 = unlimited
  posts_per_day         INTEGER NOT NULL DEFAULT 2,  -- -1 = unlimited
  platforms_max         INTEGER NOT NULL DEFAULT 2,
  image_gen_allowed     INTEGER NOT NULL DEFAULT 0,  -- 0=no 1=yes
  video_gen_allowed     INTEGER NOT NULL DEFAULT 0,
  custom_characters     INTEGER NOT NULL DEFAULT 0,
  team_seats            INTEGER NOT NULL DEFAULT 1,
  api_rate_limit        INTEGER NOT NULL DEFAULT 10, -- requests/min
  watermark_required    INTEGER NOT NULL DEFAULT 1,
  approval_workflows    INTEGER NOT NULL DEFAULT 0,
  audit_logs            INTEGER NOT NULL DEFAULT 0,
  sla_support           INTEGER NOT NULL DEFAULT 0,
  data_residency        INTEGER NOT NULL DEFAULT 0,
  stripe_price_id_monthly TEXT  DEFAULT NULL,
  stripe_price_id_yearly  TEXT  DEFAULT NULL,
  is_active             INTEGER NOT NULL DEFAULT 1,
  created_at            DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed plan definitions
INSERT OR IGNORE INTO plans
  (id, display_name, price_aud_monthly, price_aud_yearly,
   credits_monthly, credits_rollover, reports_max, posts_per_day,
   platforms_max, image_gen_allowed, video_gen_allowed,
   custom_characters, team_seats, api_rate_limit,
   watermark_required, approval_workflows, audit_logs, sla_support, data_residency)
VALUES
  ('free',       'Free Starter',      0,     0,      50,    0,    1,  2,  2,  0, 0, 0,  1,  10, 1, 0, 0, 0, 0),
  ('business',   'Business',        49,   490,    1000,  200,   12, 30,  8,  1, 0, 3,  3,  60, 0, 0, 0, 0, 0),
  ('pro',        'Pro',            149,  1490,    5000,  500,   -1, -1,  8,  1, 1, 10, 10, 200, 0, 1, 1, 0, 0),
  ('enterprise', 'Enterprise',       0,     0,   20000, 2000,   -1, -1,  8,  1, 1, -1, -1, 999, 0, 1, 1, 1, 1);

-- ── USER PROFILES ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_profiles (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  account_id      INTEGER  NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  full_name       TEXT     NOT NULL DEFAULT '',
  phone           TEXT     DEFAULT NULL,
  avatar_url      TEXT     DEFAULT NULL,
  role            TEXT     NOT NULL DEFAULT 'owner',  -- owner|admin|editor|viewer
  timezone        TEXT     NOT NULL DEFAULT 'Australia/Sydney',
  locale          TEXT     NOT NULL DEFAULT 'en-AU',
  two_fa_enabled  INTEGER  NOT NULL DEFAULT 0,
  last_login_at   DATETIME DEFAULT NULL,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_account ON user_profiles(account_id);

-- ── BUSINESS PROFILES ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS business_profiles (
  id                  INTEGER  PRIMARY KEY AUTOINCREMENT,
  account_id          INTEGER  NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  business_name       TEXT     NOT NULL DEFAULT '',
  website_url         TEXT     DEFAULT NULL,
  category            TEXT     DEFAULT NULL,   -- e.g. 'retail', 'food', 'health', 'finance'
  short_bio           TEXT     DEFAULT NULL,
  address_line_1      TEXT     DEFAULT NULL,
  address_line_2      TEXT     DEFAULT NULL,
  city                TEXT     DEFAULT NULL,
  state               TEXT     DEFAULT NULL,
  postcode            TEXT     DEFAULT NULL,
  country             TEXT     NOT NULL DEFAULT 'AU',
  latitude            REAL     DEFAULT NULL,
  longitude           REAL     DEFAULT NULL,
  local_currency      TEXT     NOT NULL DEFAULT 'AUD',
  local_language      TEXT     NOT NULL DEFAULT 'en-AU',
  accent_profile      TEXT     NOT NULL DEFAULT 'Australian',  -- Sydney|Melbourne|Brisbane|Perth|etc
  target_regions      TEXT     DEFAULT '[]',   -- JSON array
  target_audiences    TEXT     DEFAULT '[]',   -- JSON array
  brand_colors        TEXT     DEFAULT '[]',   -- JSON array of hex codes
  brand_keywords      TEXT     DEFAULT '[]',   -- JSON array
  banned_topics       TEXT     DEFAULT '[]',   -- JSON array
  compliance_notes    TEXT     DEFAULT NULL,
  review_links        TEXT     DEFAULT '[]',   -- JSON array of URLs
  logo_url            TEXT     DEFAULT NULL,
  is_primary          INTEGER  NOT NULL DEFAULT 1,
  created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_business_profiles_account ON business_profiles(account_id);

-- ── BRAND VOICE PROFILES ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS brand_voice_profiles (
  id                  INTEGER  PRIMARY KEY AUTOINCREMENT,
  account_id          INTEGER  NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  business_id         INTEGER  REFERENCES business_profiles(id) ON DELETE SET NULL,
  profile_name        TEXT     NOT NULL DEFAULT 'Default Voice',
  tone                TEXT     NOT NULL DEFAULT 'professional',  -- playful|premium|direct|educational|local|professional
  spelling_mode       TEXT     NOT NULL DEFAULT 'en-AU',         -- en-AU|en-US|en-GB
  accent_style        TEXT     NOT NULL DEFAULT 'Australian',    -- Sydney|Melbourne|New York|Texas|London|etc
  reading_level       TEXT     NOT NULL DEFAULT 'general',       -- simple|general|advanced
  cta_style           TEXT     NOT NULL DEFAULT 'action',        -- action|soft|question|urgency
  hashtag_policy      TEXT     NOT NULL DEFAULT 'moderate',      -- minimal|moderate|heavy
  competitor_set      TEXT     DEFAULT '[]',   -- JSON array of competitor names
  seo_targets         TEXT     DEFAULT '[]',   -- JSON array of target keywords
  seasonal_awareness  INTEGER  NOT NULL DEFAULT 1,
  local_events_mode   INTEGER  NOT NULL DEFAULT 1,
  emoji_frequency     TEXT     NOT NULL DEFAULT 'moderate',      -- none|minimal|moderate|heavy
  is_active           INTEGER  NOT NULL DEFAULT 1,
  created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_brand_voice_account ON brand_voice_profiles(account_id);

-- ── CONTENT MEMORY ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS content_memory (
  id                  INTEGER  PRIMARY KEY AUTOINCREMENT,
  account_id          INTEGER  NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  business_id         INTEGER  REFERENCES business_profiles(id) ON DELETE SET NULL,
  memory_type         TEXT     NOT NULL,  -- 'winning_post'|'prior_prompt'|'campaign'|'do_not_repeat'|'insight'
  platform            TEXT     DEFAULT NULL,
  content_summary     TEXT     NOT NULL DEFAULT '',
  content_hash        TEXT     DEFAULT NULL,  -- for dedup / do-not-repeat
  performance_score   REAL     DEFAULT NULL,  -- 0-100 engagement score
  tags                TEXT     DEFAULT '[]',  -- JSON array
  metadata            TEXT     DEFAULT '{}',  -- JSON blob
  is_active           INTEGER  NOT NULL DEFAULT 1,
  created_at          DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_content_memory_account  ON content_memory(account_id);
CREATE INDEX IF NOT EXISTS idx_content_memory_type     ON content_memory(memory_type);
CREATE INDEX IF NOT EXISTS idx_content_memory_hash     ON content_memory(content_hash);

-- ── TEAM MEMBERS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS team_members (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  account_id      INTEGER  NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  invited_email   TEXT     NOT NULL,
  role            TEXT     NOT NULL DEFAULT 'editor',  -- admin|editor|viewer
  status          TEXT     NOT NULL DEFAULT 'pending', -- pending|active|revoked
  invited_by      INTEGER  REFERENCES accounts(id),
  accepted_at     DATETIME DEFAULT NULL,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_team_members_account ON team_members(account_id);
CREATE INDEX IF NOT EXISTS idx_team_members_email   ON team_members(invited_email);

-- ── SOCIAL CONNECTORS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS social_connectors (
  id                  INTEGER  PRIMARY KEY AUTOINCREMENT,
  account_id          INTEGER  NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  platform            TEXT     NOT NULL,  -- instagram|tiktok|facebook|linkedin|youtube|twitter|threads|pinterest
  platform_user_id    TEXT     DEFAULT NULL,
  platform_username   TEXT     DEFAULT NULL,
  access_token        TEXT     DEFAULT NULL,   -- encrypted in production
  refresh_token       TEXT     DEFAULT NULL,   -- encrypted in production
  token_expires_at    DATETIME DEFAULT NULL,
  scopes              TEXT     DEFAULT '[]',   -- JSON array of granted scopes
  follower_count      INTEGER  DEFAULT 0,
  is_active           INTEGER  NOT NULL DEFAULT 1,
  last_sync_at        DATETIME DEFAULT NULL,
  connection_error    TEXT     DEFAULT NULL,
  created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_social_connectors_account  ON social_connectors(account_id);
CREATE INDEX IF NOT EXISTS idx_social_connectors_platform ON social_connectors(platform);

-- ── APPROVAL WORKFLOWS (Pro/Enterprise) ───────────────────────
CREATE TABLE IF NOT EXISTS approval_queue (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  account_id      INTEGER  NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  content_id      INTEGER  REFERENCES generated_content(id) ON DELETE CASCADE,
  submitted_by    INTEGER  REFERENCES accounts(id),
  reviewed_by     INTEGER  REFERENCES accounts(id),
  status          TEXT     NOT NULL DEFAULT 'pending',  -- pending|approved|rejected|revision_requested
  reviewer_notes  TEXT     DEFAULT NULL,
  submitted_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  reviewed_at     DATETIME DEFAULT NULL
);

CREATE INDEX IF NOT EXISTS idx_approval_queue_account ON approval_queue(account_id);
CREATE INDEX IF NOT EXISTS idx_approval_queue_status  ON approval_queue(status);
