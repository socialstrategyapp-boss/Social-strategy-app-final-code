
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000# SOCIAL STRATEGY – Web Application

**One Scan. Complete Growth.**

An AI-powered all-in-one social media marketing platform built with Hono + Cloudflare Pages.

---

## 🌐 URLs

- **Local Dev**: http://localhost:3000
- **Public Sandbox**: https://3000-i4obrj0c82k3pe7rtz34q-583b4d74.sandbox.novita.ai

---

## 🚀 Pages & Features

| Route | Description |
|-------|-------------|
| `/` | Landing page — Hero, How It Works, Features, Platforms, Testimonials, CTA |
| `/dashboard` | Main dashboard with KPI cards, charts, platform stats, AI insights |
| `/analysis` | Website Analysis — Enter URL, get SEO/brand/usability scores + growth strategy |
| `/content-studio` | AI Content Studio — Generate captions, images, video scripts per platform |
| `/scheduler` | Post Scheduler — Calendar & queue view with optimal time suggestions |
| `/analytics` | Analytics — Growth charts, platform performance table, engagement breakdown |
| `/pricing` | Pricing — Free/Pro/Business tiers, feature comparison, FAQ |

### API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/analyze` | Mock website analysis returning scores & recommendations |
| GET | `/api/stats` | Returns platform follower/engagement stats |

---

## 💎 Pricing Tiers (Implemented)

- **Starter** – $0/mo — 1 analysis, 2 platforms, 10 posts/mo
- **Pro** – $49/mo (or $29 annual) — Unlimited everything, all 8 platforms, AI content
- **Business** – $149/mo (or $89 annual) — Multi-brand, team seats, API access

---

## 🛠 Tech Stack

- **Framework**: Hono v4 (Cloudflare Pages template)
- **Runtime**: Cloudflare Workers / Wrangler Pages Dev
- **Frontend**: Tailwind CSS (CDN), Chart.js (CDN), FontAwesome (CDN)
- **Build**: Vite + @hono/vite-cloudflare-pages
- **Process Manager**: PM2
- **Language**: TypeScript

---

## 🗂 Project Structure

```
webapp/
├── src/
│   ├── index.tsx             # Main Hono app + all routes + API endpoints
│   ├── renderer.tsx          # (unused - overridden by index.tsx)
│   └── pages/
│       ├── layout.ts         # Shared sidebar navigation layout
│       ├── landing.ts        # Homepage
│       ├── dashboard.ts      # Dashboard with charts
│       ├── analysis.ts       # Website analysis tool
│       ├── content-studio.ts # AI content generation
│       ├── scheduler.ts      # Post scheduler + calendar
│       ├── analytics.ts      # Analytics with Chart.js
│       └── pricing.ts        # Pricing page
├── public/
│   └── static/               # Static assets
├── dist/                     # Built output (auto-generated)
├── ecosystem.config.cjs      # PM2 config
├── wrangler.jsonc             # Cloudflare config
├── vite.config.ts             # Vite build config
└── package.json
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Build
npm run build

# Start (PM2)
pm2 start ecosystem.config.cjs

# Or direct
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

---

## 📊 Currently Implemented

✅ Full landing page with hero, features, testimonials  
✅ Dashboard with live Chart.js charts and platform stats  
✅ Website analysis with animated AI scoring system  
✅ AI content studio with multi-platform content generation  
✅ Post scheduler with calendar + queue views  
✅ Analytics page with growth trends and heatmap  
✅ Pricing page with monthly/annual toggle  
✅ Responsive sidebar navigation  
✅ Mock API endpoints for analysis and stats  
✅ All interactive UI (toggles, copy, schedule actions)

## 🔮 Recommended Next Steps

1. **Connect to Supabase** for real user authentication
2. **Integrate OpenAI API** for real AI content generation
3. **Add Cloudflare D1** for post queue persistence
4. **Connect social platform OAuth** (Instagram, LinkedIn, etc.)
5. **Build real analytics pipeline** with Cloudflare Workers Cron
6. **Add Stripe** for payment processing

---

## 📞 Support

- Email: contact_team@socialstrategy.com
- Platform: Cloudflare Pages
- Status: ✅ Active
- Last Updated: March 2026
- dash.cloudflare.com