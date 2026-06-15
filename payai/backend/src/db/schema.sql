-- PAY·AI Database Schema
-- PostgreSQL

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── USERS ──────────────────────────────────────────────────────────────────

CREATE TABLE users (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email             TEXT UNIQUE NOT NULL,
  phone             TEXT UNIQUE NOT NULL,
  full_name         TEXT NOT NULL,
  password_hash     TEXT NOT NULL,

  -- KYC
  kyc_status        TEXT NOT NULL DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'failed', 'manual_review')),
  kyc_verified_at   TIMESTAMPTZ,
  frankie_entity_id TEXT,

  -- Card
  card_number_last4 TEXT,
  card_status       TEXT NOT NULL DEFAULT 'inactive' CHECK (card_status IN ('inactive', 'active', 'frozen', 'cancelled')),

  -- Profile
  avatar_url        TEXT,
  date_of_birth     DATE,
  address           JSONB,
  member_since      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Welcome offer tracking
  welcome_offer_active    BOOLEAN NOT NULL DEFAULT true,
  welcome_months_used     INTEGER NOT NULL DEFAULT 0,
  welcome_offer_expires   TIMESTAMPTZ,
  current_month_free_used BOOLEAN NOT NULL DEFAULT false,
  current_month_reset_at  TIMESTAMPTZ,

  -- Payday detection
  detected_payday         TEXT, -- e.g. 'friday', '15th', '1st'
  last_income_at          TIMESTAMPTZ,
  avg_income_amount       NUMERIC(10,2),

  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── CREDIT SCORES ───────────────────────────────────────────────────────────

CREATE TABLE credit_scores (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score       INTEGER NOT NULL DEFAULT 500 CHECK (score BETWEEN 0 AND 1000),
  tier        TEXT NOT NULL DEFAULT 'Good' CHECK (tier IN ('Building', 'Fair', 'Good', 'Great', 'Excellent')),

  -- Streak tracking
  perfect_days_streak     INTEGER NOT NULL DEFAULT 0,
  perfect_months_streak   INTEGER NOT NULL DEFAULT 0,
  last_streak_update      TIMESTAMPTZ,

  -- XRPL
  xrpl_address    TEXT,
  xrpl_sequence   INTEGER NOT NULL DEFAULT 0,
  last_xrpl_hash  TEXT,

  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (user_id)
);

CREATE TABLE score_events (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score_before    INTEGER NOT NULL,
  score_after     INTEGER NOT NULL,
  delta           INTEGER NOT NULL,
  event_type      TEXT NOT NULL, -- 'float_repaid', 'float_late', 'rent_paid', 'streak_bonus', etc.
  event_label     TEXT NOT NULL, -- Human readable: "Float repaid on time"
  related_id      UUID,          -- float_id or rent_payment_id
  xrpl_hash       TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── FLOATS ──────────────────────────────────────────────────────────────────

CREATE TABLE floats (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  amount          NUMERIC(10,2) NOT NULL,
  is_free         BOOLEAN NOT NULL DEFAULT false, -- welcome offer float

  -- Merchant info
  merchant_name   TEXT NOT NULL,
  merchant_id     TEXT,
  transaction_ref TEXT,

  -- State machine
  status          TEXT NOT NULL DEFAULT 'pending_approval'
                  CHECK (status IN ('pending_approval', 'approved', 'declined', 'active', 'repaid', 'overdue', 'defaulted')),

  -- Approval
  approved_at     TIMESTAMPTZ,
  approval_method TEXT, -- 'sms', 'biometric', 'auto'
  sms_code        TEXT,
  sms_sent_at     TIMESTAMPTZ,

  -- Repayment
  due_at          TIMESTAMPTZ,
  repaid_at       TIMESTAMPTZ,
  repaid_amount   NUMERIC(10,2),

  -- Interest (only if not free)
  daily_rate      NUMERIC(6,4) NOT NULL DEFAULT 0.0010, -- 0.10% per day
  interest_accrued NUMERIC(10,2) NOT NULL DEFAULT 0,

  -- 7-point AI assessment snapshot
  assessment      JSONB,

  -- XRPL
  xrpl_hash       TEXT,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── REPAYMENT SCHEDULE ──────────────────────────────────────────────────────

CREATE TABLE repayment_schedule (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  float_id        UUID NOT NULL REFERENCES floats(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  due_amount      NUMERIC(10,2) NOT NULL,
  due_at          TIMESTAMPTZ NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid', 'failed', 'retrying')),
  paid_at         TIMESTAMPTZ,
  retry_count     INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── RENT PAYMENTS ───────────────────────────────────────────────────────────

CREATE TABLE rent_setups (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  landlord_name       TEXT NOT NULL,
  landlord_bank_bsb   TEXT NOT NULL,
  landlord_bank_acct  TEXT NOT NULL,
  monthly_amount      NUMERIC(10,2) NOT NULL,
  due_day             INTEGER NOT NULL CHECK (due_day BETWEEN 1 AND 31),
  active              BOOLEAN NOT NULL DEFAULT true,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id)
);

CREATE TABLE rent_payments (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  setup_id        UUID NOT NULL REFERENCES rent_setups(id),
  amount          NUMERIC(10,2) NOT NULL,
  covered_by_float BOOLEAN NOT NULL DEFAULT false,
  float_id        UUID REFERENCES floats(id),
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'covered')),
  due_at          TIMESTAMPTZ NOT NULL,
  paid_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── FLOAT POOL ──────────────────────────────────────────────────────────────

CREATE TABLE float_pool (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  total_deposited     NUMERIC(12,2) NOT NULL DEFAULT 0,
  active_bucket       NUMERIC(12,2) NOT NULL DEFAULT 0,
  reserve             NUMERIC(12,2) NOT NULL DEFAULT 0,
  deployed            NUMERIC(12,2) NOT NULL DEFAULT 0, -- currently lent out
  reload_trigger      NUMERIC(12,2) NOT NULL DEFAULT 5000,
  reload_amount       NUMERIC(12,2) NOT NULL DEFAULT 15000,
  total_interest_earned NUMERIC(12,2) NOT NULL DEFAULT 0,
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Single row table
  CONSTRAINT single_row CHECK (id = id)
);

CREATE TABLE pool_events (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type      TEXT NOT NULL, -- 'deposit', 'reload', 'revenue_top_up', 'pai_burn'
  amount          NUMERIC(12,2) NOT NULL,
  before_active   NUMERIC(12,2) NOT NULL,
  after_active    NUMERIC(12,2) NOT NULL,
  before_reserve  NUMERIC(12,2) NOT NULL,
  after_reserve   NUMERIC(12,2) NOT NULL,
  pai_burned      NUMERIC(18,6), -- PAI tokens burned (1%)
  xrpl_hash       TEXT,
  note            TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── INVESTOR DEPOSITS ───────────────────────────────────────────────────────

CREATE TABLE investor_deposits (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_name       TEXT NOT NULL,
  investor_email      TEXT NOT NULL,
  amount_aud          NUMERIC(12,2) NOT NULL,
  token_type          TEXT NOT NULL DEFAULT 'AUD', -- 'AUD', 'XRP', 'PAI', 'USDC'
  token_amount        NUMERIC(18,6),
  swap_rate           NUMERIC(10,6), -- rate used at time of swap
  xrpl_hash           TEXT,
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'loaded')),
  loaded_to_pool_at   TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── LOYALTY ─────────────────────────────────────────────────────────────────

CREATE TABLE loyalty_tiers (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tier            TEXT NOT NULL DEFAULT 'Starter' CHECK (tier IN ('Starter', 'Solid', 'Trusted', 'Elite')),
  tier_achieved_at TIMESTAMPTZ,
  float_limit_aud  NUMERIC(10,2) NOT NULL DEFAULT 200,
  rate_reduction   NUMERIC(5,4) NOT NULL DEFAULT 0,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id)
);

-- ─── NOTIFICATIONS ───────────────────────────────────────────────────────────

CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type        TEXT NOT NULL, -- 'float_approved', 'repayment_due', 'score_up', 'welcome_reset', etc.
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  read        BOOLEAN NOT NULL DEFAULT false,
  sent_via    TEXT, -- 'sms', 'push', 'both'
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── INDEXES ─────────────────────────────────────────────────────────────────

CREATE INDEX idx_floats_user_id ON floats(user_id);
CREATE INDEX idx_floats_status ON floats(status);
CREATE INDEX idx_floats_due_at ON floats(due_at);
CREATE INDEX idx_score_events_user_id ON score_events(user_id);
CREATE INDEX idx_repayment_schedule_due ON repayment_schedule(due_at) WHERE status = 'pending';
CREATE INDEX idx_notifications_user_unread ON notifications(user_id) WHERE read = false;

-- ─── SEED FLOAT POOL ─────────────────────────────────────────────────────────

INSERT INTO float_pool (total_deposited, active_bucket, reserve, deployed, reload_trigger, reload_amount)
VALUES (0, 0, 0, 0, 5000, 15000);
