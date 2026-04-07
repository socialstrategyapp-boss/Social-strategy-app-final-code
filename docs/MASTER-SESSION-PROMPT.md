# ══════════════════════════════════════════════════════════════
# MASTER SESSION PROMPT — READ THIS FIRST, EVERY SINGLE TIME
# ══════════════════════════════════════════════════════════════
#
# Before writing ONE line of code, before answering ONE question,
# before making ONE decision — read this file completely.
# Then read MASTER-DESIGN-REFERENCE.md.
# Then check GitHub for all files in /docs/ and /prompts/.
#
# ══════════════════════════════════════════════════════════════

## ⚠️ RULE #0 — READ CONVERSATION HISTORY FIRST (MANDATORY)

Before ANYTHING else, read the full conversation history / session summary
provided at the start of the chat. This tells you:
- What has already been built
- What has already been fixed
- What was the last task completed
- What the owner said to stop or not touch
- What is next in the priority list

DO NOT start working, coding, or suggesting changes until you have read
and understood what has already been done. Never repeat completed work.
Never undo fixes that were already made. Never touch things the owner
said not to touch (e.g. admin security questions/answers).

If no conversation history is provided, ask the owner:
"Can you give me a summary of where we left off?"

---

## ⚠️ RULE #1 — ASK FOR IMAGES BEFORE EVERY BUILD SESSION (MANDATORY)

At the START of every new session, before writing any UI code, ask the owner:

  "Before I start — do you have any reference images you want me to look at
   for this task? Please upload them now so there is no confusion and no
   wasted time."

The owner has confirmed they will upload images immediately when asked.
There is NO excuse for guessing at a design when you can just ask.

### Where the reference images and framework docs live:
- Design bible:      /home/user/webapp/docs/MASTER-DESIGN-REFERENCE.md
- This file:         /home/user/webapp/docs/MASTER-SESSION-PROMPT.md
- Page scaffolds:    /home/user/webapp/docs/UI-SCAFFOLDS.md
- Uniformity rules:  /home/user/webapp/docs/UNIFORMITY-RULES.md
- Architecture:      /home/user/webapp/docs/architecture.md
- Pricing/credits:   /home/user/webapp/docs/pricing-meter.md
- Admin ops:         /home/user/webapp/docs/admin-ops.md
- DB schema:         /home/user/webapp/docs/database-schema.md
- Content prompts:   /home/user/webapp/prompts/
- GitHub repo:       https://github.com/socialstrategyapp-boss/Social-strategy-app-final-code

### Saved reference image URLs (re-upload or re-read these any time):
- REF-1 (3D clay icons, black bg):     https://www.genspark.ai/api/files/s/BHRVxUAX
- REF-2 (phone hero burst):            https://www.genspark.ai/api/files/s/zmXeXL50
- REF-3 (neon pill buttons):           https://www.genspark.ai/api/files/s/JjOCcjKk
- REF-4 (toggle switches day/night):   https://www.genspark.ai/api/files/s/0mHpvTiL
- REF-5 (AI hologram phone):           https://www.genspark.ai/api/files/s/Xzi5ftS5
- REF-6 (3D icons on white):           https://www.genspark.ai/api/files/s/fhzI7eRJ
- REF-7 (icon style collage):          https://www.genspark.ai/api/files/s/48XisGiS

---

## ⚠️ RULE #2 — IF UNSURE, STOP AND ASK (MANDATORY)

If you are even the SLIGHTEST bit unsure about:
- What the owner wants
- How something should look
- Which design approach to take
- Whether a component matches the reference images
- What "done" looks like for this task

STOP. Do NOT guess. Do NOT assume. Do NOT build something and hope it's right.

Instead, ask the owner ONE or TWO clear clarifying questions. For example:
  "I want to make sure I get this right — can you clarify X?"
  "Should this match REF-3 button style or something different?"
  "Do you have an image showing what you have in mind for this?"

The owner will answer immediately and upload images on the spot if needed.
This saves everyone time. Guessing wastes time. Always ask first.

# ══════════════════════════════════════════════════════════════

## WHO YOU ARE BUILDING FOR
Product owner of "Social Strategy" — a multi-tenant SaaS social media management platform.
They are frustrated. Time has been wasted. Credits have been burned.
Your job now is: listen first, confirm understanding, then build exactly what is asked.
No assumptions. No extras. No "I also added...".

---

## THE PRODUCT
Name: Social Strategy (SS)
Logo: The SS logo — cyan/teal gradient square, chrome ring, black circle, pink speech bubble, 3D white "SS" text.
NEVER alter, stretch, recolour, or recreate the SS logo. Use it exactly as-is.

Stack: Hono + TypeScript + Cloudflare Workers/Pages + D1 SQLite
Repo: https://github.com/socialstrategyapp-boss/Social-strategy-app-final-code
Live app: PM2 process "social-strategy", port 3000

---

## BEFORE EVERY BUILD SESSION — DO THIS

1. READ: /home/user/webapp/docs/MASTER-DESIGN-REFERENCE.md
2. READ: /home/user/webapp/docs/architecture.md
3. CHECK: /home/user/webapp/docs/UI-SCAFFOLDS.md for current page scaffolds
4. CHECK: /home/user/webapp/prompts/ for all prompt libraries
5. PULL: git pull origin main (check for latest changes)
6. CONFIRM: Ask the owner what they want before starting

---

## DESIGN RULES (ABSOLUTE — NO EXCEPTIONS)

### Background
- Page background: #050816
- Card background: #0B1226
- NEVER pure #000000 for cards
- NEVER white or light backgrounds for internal app screens

### Colors
- Cyan: #20D9FF (primary accent)
- Blue: #2F80FF
- Violet: #8B5CF6
- Magenta: #FF2DA6
- Green: #00F59B
- Text primary: #F4F7FB
- Text muted: #A8B3C7

### Icons (from reference images REF-1, REF-6, REF-7)
- Style: 3D clay/glossy rounded square (NOT flat, NOT circle)
- Platform icons: each has own brand color tile, white symbol, soft 3D depth
- Corner radius: ~24% of size (very rounded, pillow-soft)

### Buttons (from reference image REF-3)
- Primary: cyan→blue→violet gradient, pill shape (border-radius: 999px), ONE per section
- Secondary: dark fill, thin neon border, pill shape
- Tertiary: ghost/text, subtle bg
- Toggle style (REF-4): pill track, white circular thumb, gradient fill when ON

### Cards
- Border: 1px solid rgba(32,217,255,0.12)
- Radius: 24px
- Padding: 20px minimum
- Glow: REDUCED 40% from original — subtle, not screaming

### Glow Rules
- Glow is earned. Only primary CTAs and active states get glow.
- Background elements: NO glow
- Cards: barely-there border glow only
- Text: gradient text on hero headlines only

### Navigation
- Bottom nav: Home | Strategy | Create | Schedule | Profile (5 tabs ONLY)
- NO "AI Team" in bottom nav
- NO "Analytics" in bottom nav
- Sidebar desktop: 220px, logo top-left, never wider

### Spacing
xs:4 sm:8 md:12 lg:16 xl:24 xxl:32 3xl:48 4xl:64

### Typography
- Hero: clamp(36px,6vw,72px) weight 900 gradient
- H1: 32px 800 | H2: 24px 800 | H3: 18px 700
- Body: 15px 400 | Label: 13px 600 | Micro: 11px 700

---

## THREE-PAGE CORE FLOW (ALWAYS CONNECTED)
Report Page → Character Create → Create Studio → Scheduler

Each page MUST have a "next step" action button linking to the next page.

---

## WHAT IS BANNED
1. Excessive glow (reduce ALL glow by 40%)
2. Multiple primary CTAs per section
3. Square buttons (everything has radius)
4. Flat 2D platform icons
5. "AI Team" or "Analytics" in bottom nav
6. Pure black cards (#000000)
7. Decorative floating pills with no function
8. Centered body text
9. Large empty zones with no content purpose
10. Altering the SS logo in any way

---

## WHAT MUST BE PRESERVED (ALREADY WORKING)
- SS logo (exact as-is)
- Neon brand identity (colors, gradients)
- Dark background treatment
- Rounded card system
- All existing page routes (18 pages)
- D1 database migrations (0001–0007)
- Credit metering system
- Stripe billing integration
- Admin panel

---

## WORKING INSTRUCTIONS FOR AI/DEVELOPER

STEP 1: Read this file
STEP 2: Read MASTER-DESIGN-REFERENCE.md
STEP 3: Read the owner's message carefully — what EXACTLY do they want?
STEP 4: Confirm your understanding in plain language before touching code
STEP 5: Only build what was asked — nothing extra
STEP 6: Test it. Does it match the reference images?
STEP 7: Commit with a clear message
STEP 8: Report back: "Here is what I did. Here is what it looks like. Awaiting your review."

---

## CURRENT PRIORITIES (As of 2026-04-07)
Owner has requested STOP on all new building.
Waiting for owner instructions on what to fix first.
DO NOT start new tasks without explicit owner approval.

When approved, the priority order is:
1. Fix existing pages to match MASTER-DESIGN-REFERENCE
2. Character Create page (scaffold in UI-SCAFFOLDS.md)
3. Report page (scaffold in UI-SCAFFOLDS.md)
4. Tighten landing page and pricing page
5. Bottom nav cleanup (5 tabs, less glow)
6. Then and only then: new features

---

## REFERENCE IMAGE SUMMARY

| Image | What It Tells Us |
|-------|-----------------|
| REF-1 (3D social icons on black) | Pure black BG. 3D rounded icons. Glow from color, not light. Thick padding around symbols. |
| REF-2 (phone with rainbow burst) | Hero energy. Neon gradients. Deep navy blue base. Radial explosion only for hero/landing. |
| REF-3 (neon pill buttons) | ALL buttons = pill shape. Neon gradient border. Dark fill. ONE primary per screen. |
| REF-4 (toggle switches) | Toggle = pill track + white thumb + gradient fill ON state. Day/night theme coding. |
| REF-5 (AI hologram phone) | AI branding: cyan + violet + magenta. Futuristic depth. Layered holographic panels. |
| REF-6 (3D icons on white) | Glossy, embossed icons. Soft shadows. Thick padding. White symbol centered. |
| REF-7 (icon style collage) | Modular grid. Brand-consistent. Rounded corners. Negative space. Mixed 3D/watercolor. |

---

## GITHUB REPO STRUCTURE (Quick Reference)
```
/docs/               ← All architecture, design rules, schemas
  MASTER-DESIGN-REFERENCE.md  ← DESIGN BIBLE
  MASTER-SESSION-PROMPT.md    ← THIS FILE
  UI-SCAFFOLDS.md             ← Page scaffolds
  architecture.md
  pricing-meter.md
  admin-ops.md
  database-schema.md
  github-archival.md
  incident-playbook.md
/prompts/            ← AI prompt libraries
  REPORT-TEMPLATES.md
  CONTENT-ENGINE-SYSTEM.md
  INDUSTRY-CONTENT-LIBRARY.md
  INDUSTRY-LIBRARY.md
  VISUAL-PROMPTS.md
  VIDEO-SCRIPT.md
  PURCHASE-TRIGGER.md
/src/                ← TypeScript source
  types.ts
  services/credits.ts
  services/admin-actions.ts
  services/dedupe.ts
  services/localization.ts
  pages/             ← 18 page components
/migrations/         ← D1 SQL (0001–0007)
/apps/mobile/        ← SAVE ONLY, do not build yet
```

---

*This file is owned by the product owner.*
*It is not open for modification by AI without explicit instruction.*
*Last updated: 2026-04-07*
