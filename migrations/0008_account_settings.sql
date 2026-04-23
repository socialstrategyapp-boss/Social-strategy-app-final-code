-- ============================================================
-- Social Strategy DB – Account Settings (API Integrations)
-- Migration 0008
-- ============================================================

-- Per-account settings, including user-supplied API keys
CREATE TABLE IF NOT EXISTS account_settings (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id      INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  openai_api_key  TEXT    DEFAULT NULL,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(account_id)
);

CREATE INDEX IF NOT EXISTS idx_account_settings_account ON account_settings(account_id);
