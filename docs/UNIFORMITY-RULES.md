# Social Strategy — Uniformity Rules & Code Standards

> Version 1.0.0 — Last updated: April 2026
> Apply these rules consistently across ALL files in `/src/`, `/packages/`, and `/apps/`.

---

## 1. Naming Conventions

### Files
| Type | Convention | Example |
|------|-----------|---------|
| Page components | `kebab-case.ts` | `content-studio.ts` |
| Shared components | `PascalCase.tsx` | `Button.tsx`, `Card.tsx` |
| Utility files | `camelCase.ts` | `creditHelpers.ts` |
| Style files | `kebab-case.css` | `base-styles.css` |
| Config files | `kebab-case.json(c)` | `wrangler.jsonc` |
| Migration files | `NNNN_snake_case.sql` | `0001_initial_schema.sql` |

### Variables & Functions
- **Functions**: `camelCase` — `getAccount()`, `deductCredits()`, `checkCredits()`
- **Types/Interfaces**: `PascalCase` — `AccountData`, `GeneratedPost`, `NavItem`
- **Constants**: `UPPER_SNAKE_CASE` for global constants — `CREDIT_COSTS`, `API_BASE`
- **CSS classes**: `kebab-case` with component prefix — `.cs-card`, `.cm-topbar`, `.im-sidebar`
- **CSS IDs**: `camelCase` — `#charactersGrid`, `#creditBar`

### CSS Class Prefix Map
| Page/Component | Prefix | Example |
|---------------|--------|---------|
| Content Studio | `.cs-` | `.cs-layout`, `.cs-card` |
| Character Maker | `.cm-` | `.cm-topbar`, `.cm-build-btn` |
| Image Maker | `.im-` | `.im-layout`, `.im-card` |
| Pricing Page | `.pr-` | `.pr-hero`, `.pr-card` |
| Analysis Page | `.an-` | `.an-score-ring` |
| Profile Page | `.pf-` | `.pf-header` |
| Admin Page | `.adm-` | `.adm-table` |
| Billing Page | `.bl-` | `.bl-section` |
| Scheduler | `.sch-` | `.sch-calendar` |
| Analytics | `.at-` | `.at-chart` |
| Shared / Global | `.ss-` | `.ss-card`, `.ss-bottom-nav` |

---

## 2. Indentation & Formatting

- **TypeScript**: 2 spaces (no tabs)
- **SQL**: 2 spaces, UPPER CASE keywords
- **HTML strings** (in `.ts` files): 2 spaces relative to surrounding code
- **CSS** (inline in HTML strings): single-line declarations where ≤3 properties; block format otherwise
- **Line length**: max 120 characters
- **Trailing whitespace**: none
- **EOF newline**: always

### TypeScript Example
```typescript
// ✅ CORRECT
async function getAccount(
  db: D1Database,
  email?: string | null,
): Promise<Record<string, unknown> | null> {
  const lookup = email || 'demo@socialstrategy.ai'
  return await db.prepare('SELECT * FROM accounts WHERE email=?')
    .bind(lookup)
    .first<Record<string, unknown>>()
}

// ❌ WRONG — tabs, inconsistent quotes, no return type
async function getAccount(db, email) {
	const lookup = email || "demo@socialstrategy.ai"
	return await db.prepare("SELECT * FROM accounts WHERE email=?").bind(lookup).first()
}
```

---

## 3. Component Structure (`.ts` page files)

Every page component MUST follow this structure:

```typescript
// 1. Imports (always at top)
import { layout, ssLogo } from './layout'

// 2. Types / interfaces (if any)
interface PageData { ... }

// 3. Constants (if any)
const PAGE_ITEMS = [...]

// 4. Export function (PascalCase name + Page suffix)
export function contentStudioPage(): string {
  // 5. Local variables
  const content = `
<style>
  /* ─── COMPONENT STYLES ─── */
</style>

<!-- HTML markup -->
`
  // 6. Return via layout wrapper
  return layout('Content Studio', content, { active: 'studio' })
}
```

---

## 4. Design Token Usage

**NEVER hardcode brand values. ALWAYS reference tokens from `/src/theme.ts` or `/packages/theme/tokens.ts`.**

```typescript
// ✅ CORRECT — reference tokens in CSS vars
.cs-card { border: 1.5px solid var(--border-cyan); }
.cm-build-btn { background: var(--grad-accent); box-shadow: var(--glow-btn-accent); }

// ❌ WRONG — hardcoded values
.cs-card { border: 1.5px solid rgba(32,217,255,0.22); }
.cm-build-btn { background: linear-gradient(135deg, #FF2DA6, #C026D3); }
```

### Required CSS Variables (inject on every page via `cssVars` from theme.ts)
```css
:root {
  /* Backgrounds */
  --bg0, --bg1, --bg2, --bg-card, --bg-overlay

  /* Brand colours */
  --cyan, --blue, --violet, --magenta, --pink, --green, --orange, --yellow

  /* Text */
  --text-primary, --text-muted, --text-dim

  /* Borders */
  --border-cyan, --border-violet, --border-pink, --border-white

  /* Radius */
  --radius-xs, --radius-sm, --radius-md, --radius-lg, --radius-xl, --radius-pill

  /* Gradients */
  --grad-cta, --grad-accent, --grad-success, --grad-gold, --grad-body, --grad-hero

  /* Glow */
  --glow-cyan, --glow-pink, --glow-violet, --glow-btn-primary, --glow-btn-accent
}
```

---

## 5. Credit Cost Constants

**Single source of truth in `src/index.tsx` → `CREDIT_COSTS` record.**

| Action | Cost | Notes |
|--------|------|-------|
| `analyze` | 10 | Full website/brand audit |
| `generate_content` | 2 | Caption + CTA + hashtags per platform set |
| `generate_image` | 4 | 1 × DALL-E 3 image |
| `generate_image_2` | 8 | 2 × images |
| `generate_image_3` | 12 | 3 × images |
| `generate_image_edit` | 2 | Edit / upscale / variation |
| `video_script` | 4 | Text-only video script |
| `generate_report` | 15 | Full analytics report |
| `report_summary` | 4 | Lightweight summary |
| `seo_meta` | 3 | SEO title + meta + keywords |
| `blog_draft` | 6 | Long-form blog article |
| `schedule_7day` | 4 | 7-day content schedule |
| `schedule_30day` | 10 | 30-day content schedule |
| `publish_post` | 1 | Per publish after plan cap |
| `platform_variant` | 1 | Per extra platform adaptation |
| `character_consistency` | 3 | Character continuity injection |

---

## 6. Plan Definitions (AUD)

| Plan | Price | Credits/mo | Trial | Characters | Brands |
|------|-------|-----------|-------|-----------|--------|
| Free | $0 | 8 | None | 0 | 1 |
| Business | $79 | 150 | 14d / 60cr | 1 | 1 |
| Pro | $199 | 500 | 14d / 120cr | 3 | 3 |
| Enterprise | $699+ | 2,500+ | None | Unlimited | Unlimited |

Annual billing: ~28% discount (billed upfront, non-refundable after 14 days).

---

## 7. API Route Naming

- **GET** `/api/resource` — list/overview
- **GET** `/api/resource/:id` — single item
- **POST** `/api/resource` — create
- **PUT** `/api/resource/:id` — update (full)
- **PATCH** `/api/resource/:id` — partial update
- **DELETE** `/api/resource/:id` — delete
- **POST** `/api/resource/:id/action` — special actions (e.g., `/api/characters/1/generate`)

---

## 8. Error Response Format

All API errors MUST return this shape:
```json
{
  "success": false,
  "error": "Human-readable error message with emoji prefix",
  "code": "MACHINE_READABLE_CODE"
}
```

### Error Codes
| Code | HTTP | Meaning |
|------|------|---------|
| `NO_ACCOUNT` | 403 | Account not found |
| `BLOCKED` | 403 | Account blocked by admin |
| `SUSPENDED` | 403 | Account suspended (billing issue) |
| `EXPIRED` | 403 | Subscription expired |
| `REPORT_LIMIT` | 403 | Report usage limit reached for plan |
| `NO_CREDITS` | 403 | Insufficient credits |
| `TRIAL_ABUSE` | 403 | Multiple trial attempt detected |
| `INVALID_INPUT` | 400 | Missing or invalid request fields |
| `NOT_FOUND` | 404 | Resource not found |
| `PLAN_LIMIT` | 403 | Feature not available on current plan |

---

## 9. Database Schema Standards

### Column naming: `snake_case`
### Timestamps: always include `created_at` and `updated_at`
### IDs: `INTEGER PRIMARY KEY AUTOINCREMENT`
### Booleans: `INTEGER` (0/1) in SQLite
### JSON data: `TEXT` column with `JSON.stringify()` / `JSON.parse()`

```sql
-- ✅ CORRECT table format
CREATE TABLE IF NOT EXISTS characters (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id   INTEGER NOT NULL,
  name         TEXT    NOT NULL,
  role         TEXT    NOT NULL,
  personality  TEXT    NOT NULL,
  tone         TEXT    NOT NULL DEFAULT 'Professional',
  is_active    INTEGER NOT NULL DEFAULT 1,
  posts_created INTEGER NOT NULL DEFAULT 0,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES accounts(id)
);
```

---

## 10. Git Commit Convention

Format: `type(scope): description`

Types: `feat`, `fix`, `style`, `refactor`, `docs`, `test`, `chore`

Examples:
```
feat(pricing): add annual billing toggle with 28% discount
fix(credits): correct generate_report cost to 15cr (was 20cr)
style(theme): apply uniformity rules to all CSS class prefixes
docs(swagger): add characters and billing endpoint definitions
chore(deps): update wrangler to 3.78.0
```

---

## 11. Security Rules

1. **Never** expose API keys, passwords, or secrets in source code
2. **Never** commit `.dev.vars` or `.env` files (both in `.gitignore`)
3. **Always** validate and sanitise user inputs before DB operations
4. **Always** use parameterised queries for D1 (`.bind()` — never string interpolation)
5. **Always** rate-limit AI generation endpoints to prevent credit abuse
6. Admin endpoints **must** require step-authentication (ID + security questions)
7. Trial anti-abuse: check email + IP + device fingerprint before granting trial

---

## 12. Performance Guidelines

- Max response time: < 150ms for page renders, < 2s for AI endpoints
- Use `response_format: { type: 'json_object' }` for all OpenAI calls
- Set `max_tokens` appropriately — don't over-provision
- Cache analysis results in D1; don't re-run for same URL within 24h
- Use `async/await` consistently; avoid callbacks
- Use `Promise.all()` for parallel D1 queries where possible
