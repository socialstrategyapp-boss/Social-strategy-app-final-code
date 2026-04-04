-- ============================================================
-- Social Strategy DB – Initial Schema
-- ============================================================

-- Clients / Brands
CREATE TABLE IF NOT EXISTS clients (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  industry    TEXT    DEFAULT '',
  website     TEXT    DEFAULT '',
  tone        TEXT    DEFAULT 'Professional',
  logo_url    TEXT    DEFAULT '',
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- AI Characters / Brand Personas (the "AI employee")
CREATE TABLE IF NOT EXISTS characters (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id       INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  name            TEXT    NOT NULL,
  role            TEXT    DEFAULT 'Brand Ambassador',   -- e.g. Content Creator, Sales Rep, Host
  personality     TEXT    DEFAULT '',                   -- friendly, bold, witty, etc.
  voice_style     TEXT    DEFAULT '',                   -- casual, formal, energetic
  appearance      TEXT    DEFAULT '',                   -- physical description for image prompts
  backstory       TEXT    DEFAULT '',                   -- brand origin / character story
  avatar_url      TEXT    DEFAULT '',                   -- DALL-E generated avatar image URL
  platforms       TEXT    DEFAULT '[]',                 -- JSON array of platforms
  content_pillars TEXT    DEFAULT '[]',                 -- JSON array of topics this char covers
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Generated Content (posts, scripts, images all go here)
CREATE TABLE IF NOT EXISTS generated_content (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id       INTEGER REFERENCES clients(id) ON DELETE SET NULL,
  character_id    INTEGER REFERENCES characters(id) ON DELETE SET NULL,
  content_type    TEXT    NOT NULL,   -- 'post' | 'video_script' | 'image' | 'report'
  platform        TEXT    DEFAULT '',
  title           TEXT    DEFAULT '',
  content         TEXT    NOT NULL,   -- full JSON blob of the generated output
  image_url       TEXT    DEFAULT '',
  brand_name      TEXT    DEFAULT '',
  industry        TEXT    DEFAULT '',
  topic           TEXT    DEFAULT '',
  tone            TEXT    DEFAULT '',
  status          TEXT    DEFAULT 'draft',  -- draft | scheduled | published | archived
  scheduled_at    DATETIME,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Analysis Reports (website analysis results)
CREATE TABLE IF NOT EXISTS analysis_reports (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id       INTEGER REFERENCES clients(id) ON DELETE SET NULL,
  url             TEXT    NOT NULL,
  seo_score       INTEGER DEFAULT 0,
  brand_score     INTEGER DEFAULT 0,
  usability_score INTEGER DEFAULT 0,
  overall_score   INTEGER DEFAULT 0,
  full_result     TEXT    NOT NULL,   -- full JSON from /api/analyze
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Analytics Performance Snapshots (future: real platform data)
CREATE TABLE IF NOT EXISTS analytics_snapshots (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id       INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  period          TEXT    DEFAULT '30D',
  platform        TEXT    DEFAULT 'all',
  impressions     INTEGER DEFAULT 0,
  reach           INTEGER DEFAULT 0,
  engagements     INTEGER DEFAULT 0,
  link_clicks     INTEGER DEFAULT 0,
  followers       INTEGER DEFAULT 0,
  posts_count     INTEGER DEFAULT 0,
  snapshot_data   TEXT    DEFAULT '{}',  -- full JSON snapshot
  recorded_at     DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Scheduled Posts Queue
CREATE TABLE IF NOT EXISTS scheduled_posts (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id       INTEGER REFERENCES clients(id) ON DELETE SET NULL,
  character_id    INTEGER REFERENCES characters(id) ON DELETE SET NULL,
  content_id      INTEGER REFERENCES generated_content(id) ON DELETE SET NULL,
  platform        TEXT    NOT NULL,
  caption         TEXT    DEFAULT '',
  image_url       TEXT    DEFAULT '',
  scheduled_at    DATETIME NOT NULL,
  status          TEXT    DEFAULT 'scheduled',  -- scheduled | published | failed | cancelled
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_characters_client    ON characters(client_id);
CREATE INDEX IF NOT EXISTS idx_content_client       ON generated_content(client_id);
CREATE INDEX IF NOT EXISTS idx_content_character    ON generated_content(character_id);
CREATE INDEX IF NOT EXISTS idx_content_type         ON generated_content(content_type);
CREATE INDEX IF NOT EXISTS idx_analysis_client      ON analysis_reports(client_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_client     ON scheduled_posts(client_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_at         ON scheduled_posts(scheduled_at);
