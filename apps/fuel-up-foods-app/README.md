# Fuel Up Foods Australia — React App

Standalone React app covering all 3 food brands: Iron Plate Meals, Tradie Fuel, and Home Harvest Meals (including NDIS).

## Pages
- **Home** — Hero, 3 brand cards, order cutoff info
- **Menu** — Brand tab switcher (Iron Plate / Tradie Fuel / Home Harvest), meal cards with macros, Add-to-Cart
- **NDIS** — 30/70 funding split explainer, eligibility checklist, unregistered provider note
- **Delivery** — Cutoffs, 3 delivery zones, storage and heating guide
- **Contact** — Contact form with enquiry type selector

## Features
- **Shopping Cart** — Live sidebar with quantity controls, delivery zone picker, order total
- **Floating Cart Bar** — Appears at bottom when items added, shows count and total
- **NDIS Price Display** — Meals tagged NDIS show the participant's 30% price inline
- **Add Confirmation** — Button turns green and shows "Added!" for 1.2s after adding

## Updating Content

### Meal prices / menu items
Edit the `MENU_DATA` object near the top of `App.jsx`. Each entry has: `name`, `desc`, `protein`, `carbs`, `cal`, `serves`, `price`, `tag`, `ndis`.

### Contact details / delivery zones / order cutoffs
Edit the `CONFIG` object at the top of `App.jsx`.

### Brand names, colors, taglines
Edit the `BRANDS` object near the top of `App.jsx`.

## Deploy in 15 Minutes (CodeSandbox)
1. Go to codesandbox.io → New → React
2. Replace `src/App.js` with the contents of `App.jsx`
3. Share the live URL

## Deploy to Vercel
```bash
npx create-react-app fuel-up-foods
cd fuel-up-foods
# Replace src/App.js with App.jsx contents
npm run build
npx vercel --prod
```

## Brand Colors
- Iron Plate: `#C0392B` (red)
- Tradie Fuel: `#E67E22` (orange)
- Home Harvest: `#27AE60` (green)
- App nav/footer: `#1B4332` (dark green)
