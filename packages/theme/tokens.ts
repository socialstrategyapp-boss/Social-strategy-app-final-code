// ─────────────────────────────────────────────────────────────────────────────
//  SOCIAL STRATEGY — DESIGN SYSTEM TOKENS
//  packages/theme/tokens.ts
//  Single source of truth for ALL colours, gradients, spacing, radius, glow,
//  and typography values. Import everywhere — never hardcode brand values.
//  Used by both Web (Hono/Cloudflare) and Mobile (Expo React Native).
// ─────────────────────────────────────────────────────────────────────────────

// ─── COLOUR PALETTE ──────────────────────────────────────────────────────────
export const colors = {
  // ── Backgrounds ──
  bg0:        '#050816',
  bg1:        '#081026',
  bg2:        '#0B1226',
  bgCard:     'rgba(3,10,26,0.98)',
  bgCardAlt:  'rgba(4,11,24,0.99)',
  bgOverlay:  'rgba(5,8,22,0.96)',

  // ── Text ──
  textPrimary: '#F4F7FB',
  textMuted:   '#A8B3C7',
  textDim:     '#6B7A99',

  // ── Brand Accents ──
  cyan:    '#20D9FF',
  blue:    '#2F80FF',
  violet:  '#8B5CF6',
  magenta: '#FF2DA6',
  pink:    '#FF4FD8',
  green:   '#00F59B',
  orange:  '#FFB020',
  yellow:  '#FFD600',

  // ── Semantic ──
  success: '#4ade80',
  warning: '#fbbf24',
  danger:  '#f87171',
  info:    '#60a5fa',

  // ── Borders ──
  borderCyan:   'rgba(32,217,255,0.22)',
  borderViolet: 'rgba(139,92,246,0.28)',
  borderPink:   'rgba(255,45,166,0.22)',
  borderWhite:  'rgba(255,255,255,0.08)',
  borderGreen:  'rgba(0,245,155,0.22)',
} as const

// ─── GRADIENTS ───────────────────────────────────────────────────────────────
export const gradients = {
  // Primary CTA — use on main action buttons
  primaryCta:  'linear-gradient(135deg, #20D9FF 0%, #2F80FF 50%, #8B5CF6 100%)',
  // Accent — highlights, badges, special CTAs
  accent:      'linear-gradient(135deg, #FF2DA6 0%, #C026D3 50%, #8B5CF6 100%)',
  // Success — confirmations, green actions
  success:     'linear-gradient(135deg, #00F59B 0%, #00cc6a 100%)',
  // Gold — premium features
  gold:        'linear-gradient(135deg, #FFB020 0%, #FFD600 100%)',
  // Body background
  body:        'linear-gradient(145deg, #050816 0%, #081026 35%, #060d20 65%, #050816 100%)',
  // Card inner
  card:        'linear-gradient(135deg, rgba(3,10,26,0.98), rgba(4,11,24,0.99))',
  // Hero banner
  hero:        'linear-gradient(160deg, rgba(2,5,18,0.99) 0%, rgba(3,8,24,0.98) 40%, rgba(4,6,22,0.99) 100%)',
  // Sidebar
  sidebar:     'linear-gradient(180deg, rgba(2,7,20,0.99) 0%, rgba(3,8,22,0.99) 100%)',
  // Neon shimmer text
  shimmerText: 'linear-gradient(135deg, #20D9FF, #8B5CF6, #FF2DA6)',
  // Platform-specific
  instagram:   'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
  tiktok:      'linear-gradient(135deg, #010101, #fe2c55)',
  facebook:    'linear-gradient(135deg, #1877F2, #0a5cc7)',
  linkedin:    'linear-gradient(135deg, #0077B5, #005885)',
  twitter:     'linear-gradient(135deg, #1DA1F2, #0d7fcb)',
  youtube:     'linear-gradient(135deg, #FF0000, #cc0000)',
  threads:     'linear-gradient(135deg, #101010, #333)',
  pinterest:   'linear-gradient(135deg, #E60023, #b0001a)',
} as const

// ─── BORDER RADIUS ───────────────────────────────────────────────────────────
export const radius = {
  xs:   '8px',
  sm:   '12px',
  md:   '18px',
  lg:   '24px',
  xl:   '32px',
  pill: '999px',
} as const

// ─── SPACING ─────────────────────────────────────────────────────────────────
export const spacing = {
  xs:   '4px',
  sm:   '8px',
  md:   '12px',
  lg:   '16px',
  xl:   '24px',
  xxl:  '32px',
  '3xl': '48px',
  '4xl': '64px',
} as const

// ─── GLOW / BOX-SHADOW EFFECTS ───────────────────────────────────────────────
export const glow = {
  // Ambient soft glows — reduced to prevent visual fatigue
  softCyan:   '0 0 18px rgba(32,217,255,0.14)',
  softPink:   '0 0 18px rgba(255,45,166,0.12)',
  softBlue:   '0 0 18px rgba(47,128,255,0.12)',
  softViolet: '0 0 18px rgba(139,92,246,0.12)',
  softGreen:  '0 0 18px rgba(0,245,155,0.12)',
  // Active icon glows
  iconCyan:   '0 0 10px rgba(32,217,255,0.45)',
  iconPink:   '0 0 10px rgba(255,45,166,0.45)',
  iconViolet: '0 0 10px rgba(139,92,246,0.45)',
  // Button glows
  btnPrimary: '0 0 28px rgba(32,217,255,0.35), 0 0 55px rgba(139,92,246,0.2)',
  btnAccent:  '0 0 28px rgba(255,45,166,0.35), 0 0 55px rgba(192,38,211,0.2)',
  btnGreen:   '0 0 28px rgba(0,245,155,0.35)',
  // Card border glows
  cardCyan:   '0 0 14px rgba(32,217,255,0.06)',
  cardPink:   '0 0 14px rgba(255,45,166,0.06)',
  // Text glows
  textCyan:   '0 0 20px rgba(32,217,255,0.6)',
  textPink:   '0 0 20px rgba(255,45,166,0.6)',
  textViolet: '0 0 20px rgba(139,92,246,0.6)',
} as const

// ─── TYPOGRAPHY SCALE ────────────────────────────────────────────────────────
export const typography = {
  // Hero — landing page headline
  hero:   { fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: '900', lineHeight: '1.08' },
  // Page H1
  h1:     { fontSize: '32px', fontWeight: '800', lineHeight: '1.2' },
  // Section H2
  h2:     { fontSize: '24px', fontWeight: '800', lineHeight: '1.3' },
  // Card H3
  h3:     { fontSize: '18px', fontWeight: '700', lineHeight: '1.4' },
  // Sub-heading H4
  h4:     { fontSize: '15px', fontWeight: '700', lineHeight: '1.5' },
  // Body text
  body:   { fontSize: '15px', fontWeight: '400', lineHeight: '1.8' },
  // Small / labels
  small:  { fontSize: '13px', fontWeight: '600', lineHeight: '1.5' },
  // Micro / badges / caps
  micro:  { fontSize: '11px', fontWeight: '700', lineHeight: '1.4', letterSpacing: '0.8px' },
  // Font family
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
} as const

// ─── PLAN DEFINITIONS ────────────────────────────────────────────────────────
export const plans = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    priceAnnual: 0,
    credits: 8,
    period: 'mo' as const,
    currency: 'AUD',
    description: 'Explore the platform',
    tagline: 'No credit card required',
    color: colors.textMuted,
    gradient: 'linear-gradient(135deg, #6B7A99, #4B5568)',
    platforms: 2,
    postsPerWeek: 2,
    postsPerDay: 0,
    reportsPerMonth: 1,
    imageGen: false,
    imageGenMonthly: 0,
    videoGen: false,
    videoGenMonthly: 0,
    aiCharacters: 0,
    brands: 1,
    apiAccess: false,
    customTemplates: false,
    support: 'Community',
    trial: false,
    popular: false,
  },
  business: {
    id: 'business',
    name: 'Business',
    price: 79,
    priceAnnual: 57,  // per month billed annually (28% off)
    credits: 150,
    period: 'mo' as const,
    currency: 'AUD',
    description: 'For growing brands',
    tagline: 'Most popular for SMBs',
    color: colors.cyan,
    gradient: 'linear-gradient(135deg, #20D9FF, #2F80FF)',
    platforms: 8,
    postsPerWeek: 7,
    postsPerDay: 1,
    reportsPerMonth: 2,
    imageGen: true,
    imageGenMonthly: 100,
    videoGen: false,
    videoGenMonthly: 0,
    aiCharacters: 1,
    brands: 1,
    apiAccess: false,
    customTemplates: false,
    support: 'Email',
    trial: true,
    trialDays: 14,
    trialCredits: 60,
    popular: false,
    stripePriceId: 'price_business_monthly',
    stripePriceIdAnnual: 'price_business_annual',
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 199,
    priceAnnual: 143,  // per month billed annually (28% off)
    credits: 500,
    period: 'mo' as const,
    currency: 'AUD',
    description: 'For serious marketers',
    tagline: 'Best value for agencies',
    color: colors.violet,
    gradient: 'linear-gradient(135deg, #8B5CF6, #C026D3)',
    platforms: 8,
    postsPerWeek: 35,
    postsPerDay: 5,
    reportsPerMonth: 10,
    imageGen: true,
    imageGenMonthly: 500,
    videoGen: true,
    videoGenMonthly: 50,
    aiCharacters: 3,
    brands: 3,
    apiAccess: true,
    customTemplates: true,
    support: 'Priority 24/7',
    trial: true,
    trialDays: 14,
    trialCredits: 120,
    popular: true,
    stripePriceId: 'price_pro_monthly',
    stripePriceIdAnnual: 'price_pro_annual',
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 699,
    priceAnnual: 503,  // per month billed annually (28% off)
    credits: 2500,
    period: 'mo' as const,
    currency: 'AUD',
    description: 'Custom for agencies & teams',
    tagline: 'Pooled credits, team roles, custom SLA',
    color: colors.magenta,
    gradient: 'linear-gradient(135deg, #FF2DA6, #C026D3)',
    platforms: 8,
    postsPerWeek: 999,
    postsPerDay: 99,
    reportsPerMonth: -1,  // unlimited
    imageGen: true,
    imageGenMonthly: 9999,
    videoGen: true,
    videoGenMonthly: 500,
    aiCharacters: -1,    // unlimited
    brands: -1,          // unlimited
    apiAccess: true,
    customTemplates: true,
    support: 'Dedicated Account Manager',
    trial: false,
    popular: false,
    contact: 'sales@socialstrategyapp.com.au',
  },
} as const

// ─── CREDIT COSTS PER ACTION ─────────────────────────────────────────────────
export const creditCosts = {
  // ── Website Audit ──
  analyze:              10,  // Full SEO + brand + usability audit
  // ── Text Content ──
  generateContent:       2,  // Caption + CTA + hashtags (per platform set)
  seoMeta:               3,  // SEO title + meta description + keywords
  reportSummary:         4,  // Lightweight report summary
  videoScript:           4,  // Video script (text only)
  blogDraft:             6,  // Long-form blog article
  schedule7day:          4,  // 7-day content schedule
  schedule30day:         10, // 30-day content schedule
  publishPost:           1,  // Per publish event after plan cap
  platformVariant:       1,  // Per extra platform adaptation
  characterConsistency:  3,  // Character continuity injection per post
  // ── Image Generation ──
  image1:                4,  // 1 × DALL-E 3 image
  image2:                8,  // 2 × images
  image3:                12, // 3 × images
  image4:                14, // 4 × images
  image5:                18, // 5 × images
  imageEdit:             2,  // Edit / upscale / variation
  // ── Reports ──
  generateReport:        15, // Full analytics report (updated from 20 → 15)
  // ── Combos ──
  fullContentPackage:    8,  // Caption + image + hashtags + scheduling
} as const

// ─── CREDIT PACK TOP-UPS ─────────────────────────────────────────────────────
export const creditPacks = [
  { id: 'starter_pack', credits: 50,   priceAUD: 59,   label: 'Starter Pack',  badge: '' },
  { id: 'growth_pack',  credits: 150,  priceAUD: 159,  label: 'Growth Pack',   badge: 'Popular' },
  { id: 'pro_pack',     credits: 500,  priceAUD: 449,  label: 'Pro Pack',      badge: 'Best Value' },
  { id: 'agency_pack',  credits: 2000, priceAUD: 1499, label: 'Agency Pack',   badge: '' },
] as const

// ─── PLATFORM DEFINITIONS ────────────────────────────────────────────────────
export const platformDefs = {
  instagram: { id: 'instagram', name: 'Instagram',  icon: 'fab fa-instagram', color: '#E1306C',  gradient: gradients.instagram },
  tiktok:    { id: 'tiktok',    name: 'TikTok',     icon: 'fab fa-tiktok',    color: '#FE2C55',  gradient: gradients.tiktok    },
  facebook:  { id: 'facebook',  name: 'Facebook',   icon: 'fab fa-facebook',  color: '#1877F2',  gradient: gradients.facebook  },
  linkedin:  { id: 'linkedin',  name: 'LinkedIn',   icon: 'fab fa-linkedin',  color: '#0077B5',  gradient: gradients.linkedin  },
  twitter:   { id: 'twitter',   name: 'X (Twitter)', icon: 'fab fa-x-twitter', color: '#1DA1F2', gradient: gradients.twitter   },
  youtube:   { id: 'youtube',   name: 'YouTube',    icon: 'fab fa-youtube',   color: '#FF0000',  gradient: gradients.youtube   },
  threads:   { id: 'threads',   name: 'Threads',    icon: 'fab fa-threads',   color: '#FFFFFF',  gradient: gradients.threads   },
  pinterest: { id: 'pinterest', name: 'Pinterest',  icon: 'fab fa-pinterest', color: '#E60023',  gradient: gradients.pinterest },
} as const

// ─── CSS VARIABLES STRING (inject into <style> on every page) ────────────────
export const cssVars = `
  :root {
    --bg0: ${colors.bg0};
    --bg1: ${colors.bg1};
    --bg2: ${colors.bg2};
    --bg-card: ${colors.bgCard};
    --bg-overlay: ${colors.bgOverlay};
    --cyan: ${colors.cyan};
    --blue: ${colors.blue};
    --violet: ${colors.violet};
    --magenta: ${colors.magenta};
    --pink: ${colors.pink};
    --green: ${colors.green};
    --orange: ${colors.orange};
    --yellow: ${colors.yellow};
    --text-primary: ${colors.textPrimary};
    --text-muted: ${colors.textMuted};
    --text-dim: ${colors.textDim};
    --border-cyan: ${colors.borderCyan};
    --border-violet: ${colors.borderViolet};
    --border-pink: ${colors.borderPink};
    --border-white: ${colors.borderWhite};
    --radius-xs: ${radius.xs};
    --radius-sm: ${radius.sm};
    --radius-md: ${radius.md};
    --radius-lg: ${radius.lg};
    --radius-xl: ${radius.xl};
    --radius-pill: ${radius.pill};
    --grad-cta: ${gradients.primaryCta};
    --grad-accent: ${gradients.accent};
    --grad-success: ${gradients.success};
    --grad-gold: ${gradients.gold};
    --grad-body: ${gradients.body};
    --grad-card: ${gradients.card};
    --grad-hero: ${gradients.hero};
    --grad-sidebar: ${gradients.sidebar};
    --glow-cyan: ${glow.softCyan};
    --glow-pink: ${glow.softPink};
    --glow-violet: ${glow.softViolet};
    --glow-btn-primary: ${glow.btnPrimary};
    --glow-btn-accent: ${glow.btnAccent};
  }
`
