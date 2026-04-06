-- Anti-abuse trial tracking: one trial per business domain
CREATE TABLE IF NOT EXISTS businesses (
  id              TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name            TEXT,
  domain          TEXT UNIQUE NOT NULL,
  phone           TEXT,
  trial_used      INTEGER NOT NULL DEFAULT 0,
  trial_used_at   DATETIME,
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_businesses_domain ON businesses(domain);

-- Stripe customer link table
CREATE TABLE IF NOT EXISTS stripe_customers (
  id              TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  account_email   TEXT NOT NULL,
  stripe_customer_id  TEXT UNIQUE NOT NULL,
  stripe_subscription_id TEXT,
  plan            TEXT NOT NULL DEFAULT 'free',
  status          TEXT NOT NULL DEFAULT 'trialing',
  trial_ends_at   DATETIME,
  current_period_end DATETIME,
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_stripe_customers_email ON stripe_customers(account_email);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_stripe_id ON stripe_customers(stripe_customer_id);
