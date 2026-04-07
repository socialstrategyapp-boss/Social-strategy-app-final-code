# Admin Operations Manual

## Admin Authentication Flow

### Step 1 — Email Entry
Admin enters email address. System checks `admin_users` table.

### Step 2 — Security Question Challenge
System randomly selects 3 questions from the admin's saved security_question_challenges.
Admin must answer all 3 correctly (case-insensitive, trimmed).
On failure: lock after 5 attempts, alert sent to owner email.

### Step 3 — Step-Up (TOTP or Magic Link)
If security questions pass:
- Option A: TOTP code from authenticator app
- Option B: Magic link sent to verified admin email (expires 10 min)

On success: create `admin_step_up_session` (TTL 4 hours).
All admin actions within session logged to `audit_logs`.

---

## Admin Dashboard Sections

| Section | Description |
|---|---|
| Overview | MRR, active accounts, credit liability, margin, churn |
| Customers | Search, view, edit all accounts |
| Credits | Manual adjustments, bulk top-ups, ledger view |
| Content | Review generated content, flagged items |
| Schedules | View / override all scheduled posts |
| Support | Inbox for support tickets, escalations |
| Billing | Stripe dashboard integration, invoice history |
| Settings | System config, feature flags, provider keys |
| Audit Log | Immutable record of all admin actions |

---

## Customer Detail Page

### Header
- Account name, email, plan badge, status badge
- Account created date, last active date
- Credit balance (current / monthly allocation)

### Tabs
1. **Profile** — Business details, brand voice, social connections
2. **Credits** — Ledger, transactions, top-up history
3. **Content** — Generated content library, scheduled posts
4. **Reports** — Analysis report history
5. **Billing** — Subscription, invoices, payment method
6. **Audit** — Account-level action log

### Quick Actions

| Button | Colour | Icon | Action |
|---|---|---|---|
| Suspend Account | Red | 🚫 | Set status = suspended |
| Restore Account | Green | ✅ | Set status = active |
| Add Credits | Green | ➕ | Manual credit adjustment |
| Remove Credits | Amber | ➖ | Deduct credits with reason |
| Issue Refund | Amber | 💰 | Stripe refund + credit restore |
| Upgrade Plan | Purple | ⬆ | Override subscription plan |
| Downgrade Plan | Slate | ⬇ | Override subscription plan |
| View Audit | Slate | 📋 | Open audit log filtered to account |
| Provider Override | Blue | ⚙ | Force specific AI provider for account |
| Close Account | Red | ❌ | Hard close — purge tokens, archive data |

---

## Admin Actions Pseudocode

### Suspend Account
```
function suspendAccount(admin_id, account_id, reason):
  update accounts set status = 'suspended', suspended_at = now(), suspension_reason = reason
  cancel all active scheduled posts
  log audit_log: action='suspend', admin_id, account_id, reason
  send email to account owner: "Your account has been suspended."
```

### Restore Account
```
function restoreAccount(admin_id, account_id):
  update accounts set status = 'active', suspended_at = null
  log audit_log: action='restore', admin_id, account_id
  send email: "Your account has been restored."
```

### Manual Credit Adjustment
```
function adjustCredits(admin_id, account_id, delta, reason):
  if delta > 0:
    insert token_ledger: type='admin_credit', amount=delta, reason
  else:
    check wallet >= abs(delta), else error
    insert token_ledger: type='admin_debit', amount=delta, reason
  update token_wallets set balance += delta
  log audit_log: action='credit_adjustment', admin_id, account_id, delta, reason
```

### Issue Refund
```
function issueRefund(admin_id, account_id, stripe_payment_id, percent, reason):
  refund_amount = original_charge * (percent / 100)
  call stripe.refunds.create(payment_intent_id, amount=refund_amount)
  credit_restore = calculate_credits_for_amount(refund_amount)
  adjustCredits(admin_id, account_id, credit_restore, 'refund: ' + reason)
  log audit_log: action='refund', admin_id, account_id, refund_amount, reason
```

### Change Plan
```
function changePlan(admin_id, account_id, new_plan):
  update subscriptions set plan = new_plan, updated_at = now()
  update entitlements based on new_plan entitlement_matrix
  if downgrade: check usage vs new limits, notify if over
  log audit_log: action='plan_change', admin_id, account_id, new_plan
```

### Close Account
```
function closeAccount(admin_id, account_id, reason):
  cancel Stripe subscription
  revoke all social platform tokens
  archive GitHub customer-data/{account_id}/ to cold storage
  purge all auth tokens and secrets
  anonymize PII in database
  set accounts.status = 'closed'
  log audit_log: action='close', admin_id, account_id, reason
```

---

## Trial Abuse Prevention

- One trial per unique combination of: email domain + IP address + browser fingerprint
- Trial lock checked at subscription creation
- If duplicate detected: offer paid plan, deny trial
- Trial lock data stored in `trial_locks` table (email_hash, ip_hash, fingerprint_hash, created_at)

---

## System Settings (Admin)

| Setting | Description |
|---|---|
| Feature flags | Toggle features per plan globally |
| Provider config | API keys for OpenAI, video providers, Stripe |
| Rate limits | Override default rate limits per tier |
| Credit liability cap | Alert when outstanding credits exceed threshold |
| Maintenance mode | Put system into read-only mode |
| Moderation thresholds | Adjust content safety score thresholds |
