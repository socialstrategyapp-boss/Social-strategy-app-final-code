# GitHub Archival Strategy

## Overview

Only **metadata** (`.md`, `.json`, `.csv`) is stored in GitHub. All binary media (images, videos, audio, thumbnails) is stored in **Cloudflare R2** or **Supabase Storage**.

---

## Per-Customer Folder Structure

```
customer-data/
└── {account_id}/
    ├── profile/
    │   ├── brand-profile.json      # Business info, brand voice, audience
    │   ├── voice.md                # Brand voice guide (human-readable)
    │   └── speech-profile.json     # TTS gender, pace, tone, pronunciation
    │
    ├── reports/
    │   ├── {YYYY-MM-DD}-report.md  # Full marketing report (markdown)
    │   └── {YYYY-MM-DD}-report.json # Structured data extract from report
    │
    ├── prompts/
    │   ├── prompt-bank.json        # All generated prompts + fingerprints
    │   └── schedule-prompts.json   # Prompts used for scheduling
    │
    ├── schedules/
    │   ├── weekly-{YYYY-MM-DD}.json   # Weekly posting schedule
    │   └── monthly-{YYYY-MM-DD}.json  # Monthly posting schedule
    │
    ├── characters/
    │   └── character-{id}.json     # Character profile (appearance, tone, role)
    │
    ├── content/
    │   └── content-library.json    # Metadata index of all generated content
    │
    ├── sheets/
    │   └── gsheets-sync.json       # Google Sheets sync state (last sync, conflicts)
    │
    └── audit/
        └── audit-log.csv           # Account-level action log (CSV)
```

---

## brand-profile.json Schema

```json
{
  "account_id": "acc_xxx",
  "business_name": "Example Co",
  "industry": "retail",
  "tagline": "Quality you can feel",
  "website": "https://example.com",
  "country_code": "AU",
  "city": "Melbourne",
  "timezone": "Australia/Melbourne",
  "currency": "AUD",
  "language": "en",
  "spelling_variant": "AU",
  "accent_style": "Australian Neutral",
  "target_audience": "35-50 year old homeowners",
  "brand_voice": "professional yet warm",
  "content_pillars": ["education", "product", "lifestyle", "authority"],
  "banned_words": ["cheap", "deal"],
  "approved_hashtags": ["#melbournebusiness", "#shoplocal"],
  "seasonal_context": "Southern Hemisphere seasons",
  "updated_at": "2026-04-07T00:00:00Z"
}
```

---

## Report JSON Schema

```json
{
  "report_id": "rpt_xxx",
  "account_id": "acc_xxx",
  "generated_at": "2026-04-07T00:00:00Z",
  "report_type": "original_master",
  "business_name": "Example Co",
  "pillars": [
    {
      "name": "Product Sales",
      "revenue_potential": "high",
      "content_potential": "high",
      "conversion_potential": "high",
      "ease_score": 8,
      "subtopics": ["new arrivals", "bestsellers", "gift ideas"],
      "formats": ["short_video", "image_carousel", "story"],
      "post_frequency": 3
    }
  ],
  "audience": {...},
  "emotional_triggers": ["belonging", "aspiration", "scarcity"],
  "unique_advantages": ["local expertise", "personalised service"],
  "seo_keywords": ["melbourne florist", "gift delivery"],
  "competitor_gaps": ["No short-form video presence"],
  "recommended_content_mix": {
    "video": 40,
    "image": 40,
    "text": 20
  }
}
```

---

## Content Library JSON Schema (Metadata Only)

```json
{
  "account_id": "acc_xxx",
  "last_updated": "2026-04-07T00:00:00Z",
  "items": [
    {
      "id": "asset_xxx",
      "type": "image",
      "platform": "instagram",
      "pillar": "product",
      "caption": "Caption text here...",
      "hashtags": ["#tag1", "#tag2"],
      "storage_url": "r2://bucket/path/to/image.jpg",
      "thumbnail_url": "r2://bucket/path/to/thumb.jpg",
      "status": "published",
      "published_at": "2026-04-01T09:00:00Z",
      "performance": {
        "likes": 0,
        "comments": 0,
        "shares": 0,
        "reach": 0
      }
    }
  ]
}
```

---

## What NOT to Store in GitHub

❌ Never commit to GitHub:
- `.env` files or any API keys / secrets
- Images, videos, audio files (binary media)
- Database dumps or exports
- Node modules (`node_modules/`)
- Build artifacts (`dist/`, `.wrangler/`)
- User-uploaded raw files

✅ Always store in GitHub:
- `.md` markdown documents
- `.json` structured data (no secrets)
- `.csv` data exports (anonymised)
- `.sql` migration files
- `.yaml` / `.jsonc` configuration
- Source code (`.ts`, `.tsx`, `.js`)

---

## Google Sheets Sync

App DB is **source of truth**. Sheets is a view/input layer only.

### Sync Flow
```
Push to Sheets:  DB schedule → transform → write to Sheets
Pull from Sheets: Sheets row → validate → upsert to DB schedule
Conflict:         DB wins. Log conflict in sheets-sync.json.
```

### Sheets Sync State (gsheets-sync.json)
```json
{
  "account_id": "acc_xxx",
  "spreadsheet_id": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms",
  "last_push_at": "2026-04-07T08:00:00Z",
  "last_pull_at": "2026-04-07T08:05:00Z",
  "conflicts": [
    {
      "date": "2026-04-08",
      "field": "caption",
      "db_value": "DB version caption",
      "sheets_value": "Sheets edited caption",
      "resolved_by": "db",
      "resolved_at": "2026-04-07T08:05:00Z"
    }
  ]
}
```

---

## Retention Policy

| File Type | Retention |
|---|---|
| Reports (.md/.json) | Indefinite for paid, 90 days for free |
| Schedules | 12 months rolling |
| Prompt banks | Indefinite (used for deduplication) |
| Audit log (CSV) | 7 years (enterprise), 2 years (others) |
| Content library metadata | Indefinite for paid, 90 days for free |
| Characters | Until deleted by user |
