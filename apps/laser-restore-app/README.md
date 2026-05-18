# Laser Restore Australia — React App

Standalone React app for the Laser Restore Australia automotive laser cleaning business.

## Pages
- **Home** — Hero, stats bar, services preview, comparison table teaser
- **Services** — All 6 services + dual-method (Laser + Aqua Bead) explainer
- **Technology** — Physics of laser cleaning vs Aqua Bead, full comparison table
- **Partners** — Workshop partnership model, 6 partner types, how it works steps
- **Pricing** — Full pricing table (10 line items)
- **Contact** — Quote form (includes vehicle details field) + contact sidebar

## Updating Content
All prices and contact details are in the `CONFIG` object at the top of `App.jsx`. The `pricing` array controls the pricing table — add, remove or edit rows there.

## Deploy in 15 Minutes (CodeSandbox)
1. Go to codesandbox.io → New → React
2. Replace `src/App.js` with the contents of `App.jsx`
3. Share the live URL

## Deploy to Vercel
```bash
npx create-react-app laser-restore
cd laser-restore
# Replace src/App.js with App.jsx contents
npm run build
npx vercel --prod
```

## Brand Colors
- Primary: `#00B4D8` (cyan blue)
- Dark background: `#023E8A`
- Accent: `#90E0EF`
