-- Migration: Full Multi-Tenant SaaS Schema
-- Run: npx wrangler d1 migrations apply webapp-production [--local]

-- Plans
CREATE TABLE IF NOT EXISTS plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  monthly_credits INTEGER NOT NULL,
  max_platforms INTEGER NOT NULL DEFAULT 2,
  max_posts_per_day INTEGER DEFAULT 1,
  max_team_seats INTEGER DEFAULT 1,
  features TEXT NOT NULL DEFAULT '{}',
  price_aud REAL DEFAULT 0,
  stripe_price_id TEXT,
  trial_days INTEGER DEFAULT 0,
  trial_credits INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO plans (id, name, monthly_credits, max_platforms, max_posts_per_day, max_team_seats, features, price_aud, trial_days, trial_credits)
VALUES
  ('plan_free',       'free',       80,    2,  1,  1, '{"text":true,"image":false,"video":false,"api":false}', 0,    0,  0),
  ('plan_business',   'business',   900,   8,  1,  3, '{"text":true,"image":true,"video":false,"api":false}',  79,  14, 300),
  ('plan_pro',        'pro',        3500,  8,  5,  10,'{"text":true,"image":true,"video":true,"api":true}',    199, 14, 500),
  ('plan_enterprise', 'enterprise', 99999, 99, 99, 99,'{"text":true,"image":true,"video":true,"api":true,"white_label":true,"audit_logs":true}', 699, 0, 0);

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  plan_id TEXT NOT NULL REFERENCES plans(id),
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  current_period_start DATETIME,
  current_period_end DATETIME,
  cancel_at_period_end INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_subscriptions_account ON subscriptions(account_id);

-- Entitlements (per-account feature overrides)
CREATE TABLE IF NOT EXISTS entitlements (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  feature TEXT NOT NULL,
  enabled INTEGER DEFAULT 1,
  limit_value INTEGER,
  override_reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_entitlements_account ON entitlements(account_id, feature);

-- Token Wallets
CREATE TABLE IF NOT EXISTS token_wallets (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL UNIQUE REFERENCES accounts(id),
  balance INTEGER NOT NULL DEFAULT 0,
  reserved INTEGER NOT NULL DEFAULT 0,
  lifetime_earned INTEGER DEFAULT 0,
  lifetime_spent INTEGER DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Token Ledger
CREATE TABLE IF NOT EXISTS token_ledger (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  type TEXT NOT NULL,
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  job_id TEXT,
  description TEXT,
  admin_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_token_ledger_account ON token_ledger(account_id);
CREATE INDEX IF NOT EXISTS idx_token_ledger_job ON token_ledger(job_id);

-- Business Profiles
CREATE TABLE IF NOT EXISTS business_profiles (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  business_name TEXT NOT NULL,
  industry TEXT,
  tagline TEXT,
  description TEXT,
  website TEXT,
  phone TEXT,
  country_code TEXT DEFAULT 'AU',
  city TEXT,
  timezone TEXT DEFAULT 'Australia/Sydney',
  currency TEXT DEFAULT 'AUD',
  language TEXT DEFAULT 'en',
  spelling_variant TEXT DEFAULT 'AU',
  accent_style TEXT,
  seasonal_context TEXT,
  target_audience TEXT,
  brand_voice TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  logo_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_business_profiles_account ON business_profiles(account_id);

-- Brand Voice
CREATE TABLE IF NOT EXISTS brand_voice (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  voice_tone TEXT,
  personality_traits TEXT DEFAULT '[]',
  content_pillars TEXT DEFAULT '[]',
  banned_words TEXT DEFAULT '[]',
  approved_hashtags TEXT DEFAULT '[]',
  example_posts TEXT DEFAULT '[]',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Users/Seats
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer',
  avatar_url TEXT,
  last_active_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_users_account ON users(account_id);

-- Asset Feedback
CREATE TABLE IF NOT EXISTS asset_feedback (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  rating INTEGER,
  feedback_type TEXT,
  notes TEXT,
  refund_requested INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Campaigns
CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  name TEXT NOT NULL,
  pillar TEXT,
  focus_mode TEXT DEFAULT 'mixed',
  start_date TEXT,
  end_date TEXT,
  status TEXT DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_campaigns_account ON campaigns(account_id);

-- Campaign Assets
CREATE TABLE IF NOT EXISTS campaign_assets (
  id TEXT PRIMARY KEY,
  campaign_id TEXT NOT NULL REFERENCES campaigns(id),
  asset_id TEXT,
  post_id TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Hashtag Sets
CREATE TABLE IF NOT EXISTS hashtag_sets (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  name TEXT,
  platform TEXT,
  pillar TEXT,
  tags TEXT NOT NULL DEFAULT '[]',
  performance_score REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Support Tickets
CREATE TABLE IF NOT EXISTS support_tickets (
  id TEXT PRIMARY KEY,
  account_id TEXT REFERENCES accounts(id),
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'normal',
  assigned_admin_id TEXT,
  resolved_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Admin Step-Up Sessions
CREATE TABLE IF NOT EXISTS admin_step_up_sessions (
  id TEXT PRIMARY KEY,
  admin_id TEXT NOT NULL,
  method TEXT NOT NULL,
  ip_address TEXT,
  expires_at DATETIME NOT NULL,
  revoked INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Security Question Challenges
CREATE TABLE IF NOT EXISTS security_question_challenges (
  id TEXT PRIMARY KEY,
  admin_id TEXT NOT NULL,
  question TEXT NOT NULL,
  answer_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  account_id TEXT REFERENCES accounts(id),
  admin_id TEXT,
  user_id TEXT,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  before_state TEXT,
  after_state TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_audit_logs_account ON audit_logs(account_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_admin ON audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
