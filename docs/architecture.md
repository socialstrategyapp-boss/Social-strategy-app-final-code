# Social Strategy App — System Architecture

## Overview

Multi-tenant SaaS social media manager with credit-metered AI generation, social publishing, analytics, and an admin control panel.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend (Web) | Next.js / React (apps/web) |
| Admin UI | Next.js / React (apps/admin) |
| API | Node.js / TypeScript / Hono (apps/api → Cloudflare Workers) |
| Database | Cloudflare D1 (SQLite) + Supabase Postgres |
| Auth | Supabase Auth |
| Object Storage | Cloudflare R2 / Supabase Storage |
| AI – Text | OpenAI GPT-4o / GPT-4o-mini |
| AI – Images | OpenAI DALL-E 3 |
| AI – Video | Replicate / Fal.ai (post-Sora deprecation Sep 2026) |
| AI – Audio/TTS | OpenAI TTS |
| Billing | Stripe (subscriptions + one-off credit packs) |
| Social Connectors | TikTok, Facebook, Instagram, Threads, YouTube, LinkedIn, Pinterest, X |
| Versioned Artifacts | GitHub (metadata only — .md/.json/.csv) |
| CI/CD | GitHub Actions |
| IaC | Terraform |

---

## Monorepo Layout

```
/
├── apps/
│   ├── web/          # Customer-facing Next.js app
│   ├── admin/        # Internal admin dashboard
│   └── api/          # Hono Cloudflare Workers API
├── packages/
│   ├── db/           # D1 schema, migrations, query helpers
│   ├── auth/         # Auth helpers + RBAC
│   ├── billing/      # Stripe integration
│   ├── metering/     # Token reservation/settlement engine
│   ├── providers/
│   │   ├── text/     # OpenAI text adapter
│   │   ├── image/    # DALL-E 3 adapter
│   │   ├── video/    # Video provider router (Sora→Replicate fallback)
│   │   └── router/   # Model selection + failover
│   ├── content-engine/  # Report→Content expansion engine
│   ├── scheduler/    # Weekly/monthly posting schedule builder
│   ├── reporting/    # Marketing report generator
│   ├── moderation/   # Content safety + URL/malware scan
│   └── ui/           # Shared design-system components
├── infra/
│   ├── terraform/    # Cloud resource definitions
│   ├── docker/       # Container configs
│   └── github-actions/ # CI/CD workflows
├── docs/             # All architecture docs (this folder)
├── prompts/          # AI prompt libraries
└── migrations/       # D1 SQL migrations
```

---

## GitHub Archival Policy

**Store only metadata in GitHub. Store media in object storage (R2/Supabase Storage).**

Per-customer path:
```
/customer-data/{account_id}/
  profile/         → brand-profile.json, voice.md
  reports/         → {date}-report.md, {date}-report.json
  prompts/         → prompt-bank.json, schedule-prompts.json
  schedules/       → weekly-{date}.json, monthly-{date}.json
  characters/      → character-{id}.json
  content/         → content-library.json (metadata only)
  speech/          → speech-profile.json
  audit/           → audit-log.csv
```

---

## Data Flow (High Level)

```
User → Web App
         ↓
      Hono API (Cloudflare Workers)
         ↓                ↓
   D1 Database       R2 Object Storage
         ↓
   OpenAI / Video Providers
         ↓
   GitHub (archival metadata)
         ↓
   Social Platform APIs (publish)
```

---

## RBAC Roles

| Role | Permissions |
|---|---|
| owner | Full account control, billing, seats |
| admin | All content + settings, no billing |
| editor | Create/edit/schedule content |
| viewer | Read-only access |

---

## Security Controls

- Moderation gate before every publish
- Malware / URL scan on all uploads
- Rate limiting per account tier
- Idempotency keys on all write operations
- Signed URLs for media access (R2)
- RBAC enforced at API middleware layer
- Audit logs for all admin actions
- Admin step-up authentication (security questions + TOTP/magic-link)

---

## Provider Failover (Video)

OpenAI Sora deprecated 24 Mar 2026, shutdown 24 Sep 2026.

Failover chain:
1. Replicate (primary)
2. Fal.ai (secondary)
3. Runway (tertiary)

All routed through `packages/providers/router`.

---

## Storage Retention

| Asset Type | Free | Paid |
|---|---|---|
| Text artifacts | 90 days | Indefinitely |
| Images | 30 days | Archive to cold tier after 1 year |
| Videos | 14 days | Archive to cold tier after 6 months |
| Audit logs | 30 days | 7 years (enterprise) |
| Tokens/secrets | Purged on closure | Purged on closure |
