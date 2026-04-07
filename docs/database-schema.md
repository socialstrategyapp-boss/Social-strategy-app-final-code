# Database Schema — Full PostgreSQL/D1

## Core Tables

---

### accounts
```sql
CREATE TABLE accounts (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free', -- free | business | pro | enterprise
  status TEXT NOT NULL DEFAULT 'active', -- active | suspended | trial | closed
  trial_ends_at DATETIME,
  suspended_at DATETIME,
  suspension_reason TEXT,
  closes_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### users
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer', -- owner | admin | editor | viewer
  avatar_url TEXT,
  last_active_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### business_profiles
```sql
CREATE TABLE business_profiles (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  business_name TEXT NOT NULL,
  industry TEXT,
  tagline TEXT,
  description TEXT,
  website TEXT,
  phone TEXT,
  country_code TEXT,
  city TEXT,
  timezone TEXT,
  currency TEXT DEFAULT 'AUD',
  language TEXT DEFAULT 'en',
  spelling_variant TEXT, -- AU | US | UK
  accent_style TEXT,
  seasonal_context TEXT,
  target_audience TEXT,
  brand_voice TEXT, -- professional | casual | playful | authoritative
  primary_color TEXT,
  secondary_color TEXT,
  logo_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### brand_voice
```sql
CREATE TABLE brand_voice (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  voice_tone TEXT,
  personality_traits TEXT, -- JSON array
  content_pillars TEXT,    -- JSON array
  banned_words TEXT,       -- JSON array
  approved_hashtags TEXT,  -- JSON array
  example_posts TEXT,      -- JSON array of examples
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

### plans
```sql
CREATE TABLE plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL, -- free | business | pro | enterprise
  monthly_credits INTEGER NOT NULL,
  max_platforms INTEGER NOT NULL,
  max_posts_per_day INTEGER,
  max_team_seats INTEGER DEFAULT 1,
  features TEXT NOT NULL, -- JSON feature flags
  price_aud REAL,
  stripe_price_id TEXT,
  trial_days INTEGER DEFAULT 0,
  trial_credits INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### subscriptions
```sql
CREATE TABLE subscriptions (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  plan_id TEXT NOT NULL REFERENCES plans(id),
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  status TEXT NOT NULL DEFAULT 'active', -- active | cancelled | past_due | trialing
  current_period_start DATETIME,
  current_period_end DATETIME,
  cancel_at_period_end INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### entitlements
```sql
CREATE TABLE entitlements (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  feature TEXT NOT NULL,
  enabled INTEGER DEFAULT 1,
  limit_value INTEGER,
  override_reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

### token_wallets
```sql
CREATE TABLE token_wallets (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL UNIQUE REFERENCES accounts(id),
  balance INTEGER NOT NULL DEFAULT 0,
  reserved INTEGER NOT NULL DEFAULT 0, -- tokens reserved for in-flight jobs
  lifetime_earned INTEGER DEFAULT 0,
  lifetime_spent INTEGER DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### token_ledger
```sql
CREATE TABLE token_ledger (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  type TEXT NOT NULL, -- credit | debit | reserve | settle | refund | admin_credit | admin_debit | subscription_reset
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  job_id TEXT,
  description TEXT,
  admin_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

### reports
```sql
CREATE TABLE reports (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  business_name TEXT,
  report_type TEXT, -- original | strategic | psychology | system_builder | seo | plateau | rebrand
  status TEXT DEFAULT 'pending', -- pending | processing | complete | failed
  input_data TEXT,  -- JSON
  output_md TEXT,   -- Full report markdown
  output_json TEXT, -- Structured JSON output
  github_path TEXT, -- Path in GitHub archive
  credits_used INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### prompts
```sql
CREATE TABLE prompts (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  type TEXT NOT NULL, -- text | image | video | hashtag | seo | schedule
  input_text TEXT,
  output_text TEXT,
  fingerprint TEXT, -- hash for deduplication
  embedding TEXT,   -- vector for similarity check (JSON float array)
  platform TEXT,
  pillar TEXT,
  credits_used INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

### generated_assets
```sql
CREATE TABLE generated_assets (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  type TEXT NOT NULL, -- image | video | audio | text
  prompt_id TEXT REFERENCES prompts(id),
  storage_url TEXT,   -- R2 / Supabase Storage URL
  thumbnail_url TEXT,
  metadata TEXT,      -- JSON (dimensions, duration, model used)
  status TEXT DEFAULT 'active', -- active | archived | deleted
  credits_used INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### asset_feedback
```sql
CREATE TABLE asset_feedback (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL REFERENCES generated_assets(id),
  account_id TEXT NOT NULL REFERENCES accounts(id),
  rating INTEGER, -- 1-5
  feedback_type TEXT, -- poor_quality | wrong_style | incorrect_content | other
  notes TEXT,
  refund_requested INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

### characters
```sql
CREATE TABLE characters (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  name TEXT NOT NULL,
  role TEXT,
  age_range TEXT,
  appearance_description TEXT,
  personality TEXT,
  tone TEXT,
  content_purpose TEXT,
  approved_variations TEXT, -- JSON array
  banned_variations TEXT,   -- JSON array
  avatar_url TEXT,
  reference_images TEXT,    -- JSON array of R2 URLs
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

### hashtag_sets
```sql
CREATE TABLE hashtag_sets (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  name TEXT,
  platform TEXT,
  pillar TEXT,
  tags TEXT NOT NULL, -- JSON array
  performance_score REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### campaigns
```sql
CREATE TABLE campaigns (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  name TEXT NOT NULL,
  pillar TEXT,
  focus_mode TEXT, -- mixed | single_pillar | campaign | easy | authority | sales
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'draft', -- draft | active | completed | paused
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### campaign_assets
```sql
CREATE TABLE campaign_assets (
  id TEXT PRIMARY KEY,
  campaign_id TEXT NOT NULL REFERENCES campaigns(id),
  asset_id TEXT REFERENCES generated_assets(id),
  post_id TEXT,
  sort_order INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

### connected_accounts
```sql
CREATE TABLE connected_accounts (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  platform TEXT NOT NULL, -- instagram | tiktok | facebook | youtube | linkedin | pinterest | x | threads
  platform_user_id TEXT,
  platform_username TEXT,
  access_token TEXT,       -- Encrypted
  refresh_token TEXT,      -- Encrypted
  token_expires_at DATETIME,
  follower_count INTEGER,
  status TEXT DEFAULT 'active', -- active | expired | revoked
  connected_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### content_schedule
```sql
CREATE TABLE content_schedule (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  campaign_id TEXT REFERENCES campaigns(id),
  asset_id TEXT REFERENCES generated_assets(id),
  platform TEXT NOT NULL,
  scheduled_at DATETIME NOT NULL,
  status TEXT DEFAULT 'pending', -- pending | published | failed | cancelled
  publish_attempt_count INTEGER DEFAULT 0,
  published_at DATETIME,
  error_message TEXT,
  credits_used INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

### admin_actions
```sql
CREATE TABLE admin_actions (
  id TEXT PRIMARY KEY,
  admin_id TEXT NOT NULL,
  target_account_id TEXT REFERENCES accounts(id),
  action TEXT NOT NULL,
  details TEXT, -- JSON
  ip_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### security_question_challenges
```sql
CREATE TABLE security_question_challenges (
  id TEXT PRIMARY KEY,
  admin_id TEXT NOT NULL,
  question TEXT NOT NULL,
  answer_hash TEXT NOT NULL, -- bcrypt hash
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### admin_step_up_sessions
```sql
CREATE TABLE admin_step_up_sessions (
  id TEXT PRIMARY KEY,
  admin_id TEXT NOT NULL,
  method TEXT NOT NULL, -- totp | magic_link
  ip_address TEXT,
  expires_at DATETIME NOT NULL,
  revoked INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### audit_logs
```sql
CREATE TABLE audit_logs (
  id TEXT PRIMARY KEY,
  account_id TEXT REFERENCES accounts(id),
  admin_id TEXT,
  user_id TEXT REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT, -- account | subscription | asset | schedule | character
  entity_id TEXT,
  before_state TEXT, -- JSON snapshot
  after_state TEXT,  -- JSON snapshot
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### support_tickets
```sql
CREATE TABLE support_tickets (
  id TEXT PRIMARY KEY,
  account_id TEXT REFERENCES accounts(id),
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open', -- open | in_progress | resolved | closed
  priority TEXT DEFAULT 'normal', -- low | normal | high | urgent
  assigned_admin_id TEXT,
  resolved_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## Indexes

```sql
CREATE INDEX idx_token_ledger_account ON token_ledger(account_id);
CREATE INDEX idx_content_schedule_account ON content_schedule(account_id);
CREATE INDEX idx_content_schedule_status ON content_schedule(status, scheduled_at);
CREATE INDEX idx_prompts_fingerprint ON prompts(fingerprint);
CREATE INDEX idx_generated_assets_account ON generated_assets(account_id);
CREATE INDEX idx_reports_account ON reports(account_id);
CREATE INDEX idx_audit_logs_account ON audit_logs(account_id);
CREATE INDEX idx_audit_logs_admin ON audit_logs(admin_id);
CREATE INDEX idx_connected_accounts_platform ON connected_accounts(account_id, platform);
```
