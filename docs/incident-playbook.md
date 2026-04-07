# Incident Playbook

## P0 — Complete Service Outage

**Definition**: All API endpoints returning 500 or unreachable.

**Steps**:
1. Check Cloudflare Workers status: https://www.cloudflarestatus.com
2. Check D1 database health: `wrangler d1 execute webapp-production --command="SELECT 1"`
3. Rollback last deployment: `wrangler pages deployments rollback --project-name webapp`
4. Check error logs in Cloudflare Dashboard → Workers & Pages → Logs
5. Alert on-call admin via PagerDuty / Slack #incidents
6. Update status page

**Escalation**: If not resolved in 15 mins → engage Cloudflare support.

---

## P1 — AI Generation Failing

**Definition**: AI endpoints returning errors or empty results.

**Steps**:
1. Check OpenAI API status: https://status.openai.com
2. Check API key validity: Test `/api/health` endpoint
3. Check credit deduction logs — credits should NOT be deducted on failure
4. If OpenAI down: activate demo-mode fallback (env `DEMO_MODE=true`)
5. Notify affected users via in-app banner
6. Refund any credits incorrectly charged during outage

---

## P2 — Billing / Stripe Issues

**Definition**: Payments failing, webhooks not processing, credits not being allocated.

**Steps**:
1. Check Stripe Dashboard → Webhooks → recent events
2. Verify `STRIPE_WEBHOOK_SECRET` is correct
3. Replay failed webhook events from Stripe Dashboard
4. Manually reconcile: check `subscriptions` table vs Stripe subscription status
5. Issue manual credit corrections for affected accounts via admin panel

---

## P3 — Publishing Failures (Social APIs)

**Definition**: Scheduled posts failing to publish to social platforms.

**Steps**:
1. Check `content_schedule` table for `status = 'failed'`
2. Review `error_message` field for auth vs API errors
3. If auth error: notify user to reconnect social account
4. If API rate limit: reschedule with backoff (next available slot)
5. If platform outage: hold posts, notify users, auto-retry after 30 min
6. Refund publishing credits for posts that permanently failed

---

## Credit Liability Alert

**Trigger**: Outstanding reserved credits exceed 10% of monthly revenue equivalent.

**Steps**:
1. Review `token_wallets` for accounts with large `reserved` balances
2. Check for stuck in-flight jobs (`token_ledger` entries with `type = 'reserve'` older than 1 hour)
3. Force-settle stuck jobs via admin panel
4. Adjust minimum balance alerts in system settings

---

## Data Breach Response

**Steps**:
1. Immediately rotate all API keys (OpenAI, Stripe, social platforms)
2. Invalidate all active sessions and admin step-up sessions
3. Revoke all social platform OAuth tokens
4. Notify affected users within 72 hours (GDPR requirement)
5. Engage legal team
6. Preserve audit logs (do not delete)
7. File breach report with relevant data protection authority

---

## Rollback Procedures

### Code Rollback
```bash
# List recent deployments
npx wrangler pages deployments list --project-name webapp

# Rollback to specific deployment
npx wrangler pages deployments rollback <deployment-id> --project-name webapp
```

### Database Rollback
```bash
# Apply reverse migration (must be prepared in advance)
npx wrangler d1 execute webapp-production --file=migrations/rollback_{version}.sql
```

### Emergency Read-Only Mode
Set env variable `READONLY_MODE=true` — all write operations return 503 with message "System maintenance in progress."
