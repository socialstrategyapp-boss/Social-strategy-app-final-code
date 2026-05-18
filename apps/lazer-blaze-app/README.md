# Lazer Blaze Australia — React App

Standalone React app for the Lazer Blaze Australia graffiti removal business.

## Pages
- **Home** — Hero, stats, services preview, why-laser teaser
- **Services** — All 6 services with how-it-works steps
- **Why Laser** — Technology deep-dive + head-to-head comparison table
- **Tenders** — Government bodies, capability statement highlights, council advantages
- **Pricing** — Full pricing table
- **Contact** — Quote request form + contact details

## Updating Content
All prices and contact details are in the `CONFIG` object at the top of `App.jsx`. Update there — everything else flows from it.

## Deploy in 15 Minutes (CodeSandbox)
1. Go to codesandbox.io → New → React
2. Replace `src/App.js` with the contents of `App.jsx`
3. Share the live URL

## Deploy to Vercel
```bash
npx create-react-app lazer-blaze
cd lazer-blaze
# Replace src/App.js with App.jsx contents
npm run build
npx vercel --prod
```

## Brand Colors
- Primary: `#FFD700` (gold)
- Dark background: `#1A1A2E`
- Accent: `#FF6B35`
