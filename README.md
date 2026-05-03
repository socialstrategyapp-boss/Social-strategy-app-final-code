# SOCIAL STRATEGY – Web Application

**One Scan. Complete Growth.**

An AI-powered all-in-one social media marketing platform built with Hono + Cloudflare Pages + OpenAI.

---

## 🌐 URLs

- **Local Dev**: http://localhost:3000
- **Production**: Cloudflare Pages (deploy from `main` branch)

---

## 🚀 Pages & Features

| Route | Description |
|-------|-------------|
| `/` | Landing page — Hero, features, platforms, testimonials, CTA |
| `/login` | Login / sign-up page |
| `/dashboard` | Main dashboard with KPI cards, charts, platform stats, AI insights |
| `/analysis` | Website Analysis — Enter URL, get GPT-4o SEO/brand/usability scores + growth strategy |
| `/content-studio` | AI Content Studio — Generate captions, images, video scripts per platform |
| `/characters` | AI Characters — Create persistent brand personas |
| `/character-create` | Step-by-step character creation wizard |
| `/create/character` | AI Character Maker — generate character visual prompts |
| `/image-maker` | AI Image Maker — generate branded images with DALL-E 3 |
| `/scheduler` | Post Scheduler — Calendar & queue view with optimal time suggestions |
| `/analytics` | Analytics — Growth charts, platform performance, engagement breakdown |
| `/uploads` | Media Library — manage uploaded images and assets |
| `/report` | AI Analytics Report — full branded PDF-style report |
| `/pricing` | Pricing — Starter/Pro/Business tiers with feature comparison |
| `/billing` | Billing & subscription management |
| `/profile` | User profile page |
| `/settings` | Account settings — profile, connected accounts, notifications |
| `/admin` | Admin dashboard — user management, credit control, support |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/gdpr` | GDPR Policy |
| `/about` | About page |
| `/faq` | FAQ |
| `/cookies` | Cookie Policy |
| `/billing-policy` | Billing Policy |

### API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/analyze` | GPT-4o website analysis — SEO, brand, usability, growth strategy |
| POST | `/api/generate-content` | AI caption + hashtag + CTA generation per platform |
| POST | `/api/generate-image` | DALL-E 3 image generation |
| POST | `/api/video-script` | AI video script generation |
| POST | `/api/generate-report` | Full AI analytics report |
| POST | `/api/report-summary` | Lightweight AI report summary |
| POST | `/api/seo-meta` | SEO title + meta + keywords |
| POST | `/api/blog-draft` | Long-form AI blog article |
| POST | `/api/schedule` | 7-day or 30-day AI content schedule |
| POST | `/api/characters/create` | Create AI character profile |
| GET | `/api/characters` | List characters for a customer |
| DELETE | `/api/characters/:id` | Delete a character |
| GET | `/api/account` | Account info, credits, plan |
| GET | `/api/account/transactions` | Credit transaction history |
| GET | `/api/admin/users` | Admin: list all users |
| POST | `/api/admin/update-user` | Admin: update user credits/plan/status |

---

## 💎 Credit System

Each action costs credits (1 credit ≈ $1 AUD value):

| Action | Cost |
|--------|------|
| Website Analysis | 10 cr |
| Generate Content | 2 cr |
| Generate Image (1) | 4 cr |
| Video Script | 4 cr |
| Full Report | 15 cr |
| 7-Day Schedule | 4 cr |
| 30-Day Schedule | 10 cr |
| SEO Meta | 3 cr |
| Blog Draft | 6 cr |

## 💎 Pricing Tiers

- **Starter** – Free — 50 credits, 3 reports/mo
- **Pro** – $49/mo — 500 credits, unlimited reports
- **Business** – $149/mo — 2000 credits, multi-brand, team seats

---

## 🛠 Tech Stack

- **Framework**: Hono v4 (Cloudflare Pages)
- **Runtime**: Cloudflare Workers + D1 Database
- **AI**: OpenAI GPT-4o + DALL-E 3
- **Frontend**: Tailwind CSS (CDN), Chart.js (CDN), FontAwesome (CDN)
- **Build**: Vite + @hono/vite-build
- **Language**: TypeScript

---

## 🗂 Project Structure

```
src/
├── index.tsx             # Main Hono app — all routes + API endpoints
└── pages/
    ├── layout.ts         # Shared sidebar layout + platform SVG icons
    ├── landing.ts        # Homepage
    ├── login.ts          # Login page
    ├── dashboard.ts      # Dashboard
    ├── analysis.ts       # Website analysis
    ├── content-studio.ts # AI content generation studio
    ├── characters.ts     # AI characters list
    ├── character-create.ts  # Character creation wizard
    ├── character-maker.ts   # Character visual prompt maker
    ├── image-maker.ts    # DALL-E 3 image maker
    ├── scheduler.ts      # Post scheduler + calendar
    ├── analytics.ts      # Analytics charts
    ├── uploads.ts        # Media library
    ├── report.ts         # AI report
    ├── pricing.ts        # Pricing page
    ├── billing.ts        # Billing management
    ├── profile.ts        # User profile
    ├── settings.ts       # Account settings
    ├── admin.ts          # Admin dashboard
    └── static-pages.ts   # Privacy, Terms, GDPR, About, FAQ, etc.
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Build
npm run build

# Run with Wrangler (recommended)
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

---

## 📊 Implemented Features

✅ Full landing page with hero, features, platforms, testimonials, CTA  
✅ Login / authentication page  
✅ Dashboard with KPI cards, Chart.js engagement/reach charts, AI insights  
✅ Website Analysis with real GPT-4o API integration (SEO + brand + usability scores)  
✅ AI Content Studio — captions, hashtags, CTAs, video scripts, images per platform  
✅ AI Characters — create, manage and use persistent brand personas  
✅ AI Image Maker — DALL-E 3 image generation with brand context  
✅ Post Scheduler with calendar view and queue management  
✅ Analytics with growth charts, platform performance table  
✅ Media Library — upload and manage brand assets  
✅ AI Analytics Report generator  
✅ Pricing page with monthly/annual toggle  
✅ Billing page with plan management  
✅ User profile and account settings  
✅ Admin dashboard with user management and credit control  
✅ Credit/usage system with D1 database  
✅ All static pages (Privacy, Terms, GDPR, About, FAQ, etc.)  
✅ Responsive sidebar navigation with mobile support  

---

## 📞 Support

- Email: contact_team@socialstrategy.com
- Platform: Cloudflare Pages
- Status: ✅ Active