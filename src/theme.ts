// ─────────────────────────────────────────────────────────────────────────────
//  SOCIAL STRATEGY — MASTER DESIGN SYSTEM TOKEN FILE
//  Single source of truth for all colours, gradients, spacing, radius, glow
//  Import this file everywhere — never hardcode brand values elsewhere.
// ─────────────────────────────────────────────────────────────────────────────

export const colors = {
  // Backgrounds
  bg0:       '#050816',
  bg1:       '#081026',
  bg2:       '#0B1226',
  bgCard:    'rgba(3,10,26,0.98)',
  bgCardAlt: 'rgba(4,11,24,0.99)',

  // Text
  textPrimary: '#F4F7FB',
  textMuted:   '#A8B3C7',
  textDim:     '#6B7A99',

  // Accents
  cyan:    '#20D9FF',
  blue:    '#2F80FF',
  violet:  '#8B5CF6',
  magenta: '#FF2DA6',
  pink:    '#FF4FD8',
  green:   '#00F59B',
  orange:  '#FFB020',
  yellow:  '#FFD600',

  // Semantic
  success: '#4ade80',
  warning: '#fbbf24',
  danger:  '#f87171',
  info:    '#60a5fa',

  // Borders
  borderCyan:   'rgba(32,217,255,0.22)',
  borderViolet: 'rgba(139,92,246,0.28)',
  borderPink:   'rgba(255,45,166,0.22)',
  borderWhite:  'rgba(255,255,255,0.08)',
}

export const gradients = {
  // Primary CTA — use on main action buttons
  primaryCta:   'linear-gradient(135deg, #20D9FF 0%, #2F80FF 50%, #8B5CF6 100%)',
  // Accent — highlights, badges
  accent:       'linear-gradient(135deg, #FF2DA6 0%, #C026D3 50%, #8B5CF6 100%)',
  // Success — confirmations
  success:      'linear-gradient(135deg, #00F59B 0%, #00cc6a 100%)',
  // Background body
  body:         'linear-gradient(145deg, #050816 0%, #081026 35%, #060d20 65%, #050816 100%)',
  // Card inner
  card:         'linear-gradient(135deg, rgba(3,10,26,0.98), rgba(4,11,24,0.99))',
  // Hero banner
  hero:         'linear-gradient(160deg, rgba(2,5,18,0.99) 0%, rgba(3,8,24,0.98) 40%, rgba(4,6,22,0.99) 100%)',
  // Sidebar
  sidebar:      'linear-gradient(180deg, rgba(2,7,20,0.99) 0%, rgba(3,8,22,0.99) 100%)',
  // Neon shimmer text
  shimmerText:  'linear-gradient(135deg, #20D9FF, #8B5CF6, #FF2DA6)',
  // Gold/yellow accent
  gold:         'linear-gradient(135deg, #FFB020, #FFD600)',
}

export const radius = {
  sm:   '12px',
  md:   '18px',
  lg:   '24px',
  xl:   '32px',
  pill: '999px',
}

export const spacing = {
  xs:  '4px',
  sm:  '8px',
  md:  '12px',
  lg:  '16px',
  xl:  '24px',
  xxl: '32px',
  '3xl': '48px',
  '4xl': '64px',
}

export const glow = {
  // Reduced 25–40% from original — prevents visual fatigue
  softCyan:   '0 0 18px rgba(32,217,255,0.14)',
  softPink:   '0 0 18px rgba(255,45,166,0.12)',
  softBlue:   '0 0 18px rgba(47,128,255,0.12)',
  softViolet: '0 0 18px rgba(139,92,246,0.12)',
  softGreen:  '0 0 18px rgba(0,245,155,0.12)',
  // Active icon glow
  iconCyan:   '0 0 10px rgba(32,217,255,0.45)',
  iconPink:   '0 0 10px rgba(255,45,166,0.45)',
  // Button glow
  btnPrimary: '0 0 28px rgba(32,217,255,0.35), 0 0 55px rgba(139,92,246,0.2)',
  btnAccent:  '0 0 28px rgba(255,45,166,0.35), 0 0 55px rgba(192,38,211,0.2)',
  // Card border glow
  cardCyan:   '0 0 14px rgba(32,217,255,0.06)',
}

export const typography = {
  // Hero — landing page headline
  hero:   { fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: '900', lineHeight: '1.08' },
  // Page H1
  h1:     { fontSize: '32px', fontWeight: '800', lineHeight: '1.2' },
  // Section H2
  h2:     { fontSize: '24px', fontWeight: '800', lineHeight: '1.3' },
  // Card H3
  h3:     { fontSize: '18px', fontWeight: '700', lineHeight: '1.4' },
  // Body
  body:   { fontSize: '15px', fontWeight: '400', lineHeight: '1.8' },
  // Small / labels
  small:  { fontSize: '13px', fontWeight: '600', lineHeight: '1.5' },
  // Micro / badges
  micro:  { fontSize: '11px', fontWeight: '700', lineHeight: '1.4', letterSpacing: '0.8px' },
}

export const plans = {
  free: {
    name: 'Free',
    price: 0,
    credits: 8,
    period: 'mo',
    currency: 'AUD',
    description: 'Explore the platform',
    color: colors.textMuted,
    platforms: 2,
    postsPerWeek: 2,
    reportsPerMonth: 1,
    imageGen: false,
    videoGen: false,
    trial: false,
  },
  business: {
    name: 'Business',
    price: 79,
    credits: 150,
    period: 'mo',
    currency: 'AUD',
    description: 'For growing brands',
    color: colors.cyan,
    platforms: 8,
    postsPerDay: 1,
    reportsPerMonth: 2,
    imageGen: true,
    videoGen: false,
    trial: true,
    trialDays: 14,
    trialCredits: 60,
  },
  pro: {
    name: 'Pro',
    price: 199,
    credits: 500,
    period: 'mo',
    currency: 'AUD',
    description: 'For serious marketers',
    color: colors.violet,
    platforms: 8,
    postsPerDay: 5,
    reportsPerMonth: 10,
    imageGen: true,
    videoGen: true,
    trial: true,
    trialDays: 14,
    trialCredits: 120,
    popular: true,
  },
  enterprise: {
    name: 'Enterprise',
    price: 699,
    credits: 2500,
    period: 'mo',
    currency: 'AUD',
    description: 'Custom for agencies',
    color: colors.magenta,
    platforms: 8,
    postsPerDay: 99,
    reportsPerMonth: -1,
    imageGen: true,
    videoGen: true,
    trial: false,
  },
}

export const creditCosts = {
  // Text
  caption:            1,
  captionCtaHashtags: 2,
  seoMeta:            3,
  reportSummary:      4,
  blogDraft:          6,
  fullReport:         20,
  // Images
  image1:             4,
  image2:             8,
  image3:             12,
  image4:             14,
  image5:             18,
  imageEdit:          2,   // edit / upscale / variation
  characterConsist:   3,   // character continuity injection
  // Video scripts (text-only)
  videoScript:        4,
  // Scheduling
  schedule7day:       4,
  schedule30day:      10,
  publishPost:        1,   // per publish after plan cap
  platformVariant:    1,   // per extra platform
  // Combos
  generateContent:    2,   // caption + CTA + hashtags (per platform set)
  analyzeUrl:         10,  // full website/brand audit
}

export const creditPacks = [
  { credits: 50,   priceAUD: 59,   label: 'Starter Pack' },
  { credits: 150,  priceAUD: 159,  label: 'Growth Pack' },
  { credits: 500,  priceAUD: 449,  label: 'Pro Pack' },
  { credits: 2000, priceAUD: 1499, label: 'Agency Pack' },
]

// ─── CSS VARIABLES STRING (inject into <style> on every page) ────────────────
export const cssVars = `
  :root {
    --bg0: ${colors.bg0};
    --bg1: ${colors.bg1};
    --bg2: ${colors.bg2};
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
    --border-white: ${colors.borderWhite};
    --radius-sm: ${radius.sm};
    --radius-md: ${radius.md};
    --radius-lg: ${radius.lg};
    --radius-pill: ${radius.pill};
    --grad-cta: ${gradients.primaryCta};
    --grad-accent: ${gradients.accent};
    --grad-body: ${gradients.body};
    --glow-cyan: ${glow.softCyan};
    --glow-pink: ${glow.softPink};
  }
`

// ─── SHARED BASE STYLES (inject into every page <style> block) ───────────────
export const baseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  ${cssVars}
  *, *::before, *::after { font-family: 'Inter', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--grad-body);
    color: var(--text-primary);
    overflow-x: hidden;
    min-height: 100vh;
  }
  body::before {
    content: '';
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(32,217,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(32,217,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg0); }
  ::-webkit-scrollbar-thumb { background: linear-gradient(#FF2DA6, #8B5CF6); border-radius: 3px; }

  /* ── SHARED BUTTON VARIANTS ── */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 24px; border-radius: var(--radius-pill); border: none; cursor: pointer;
    background: var(--grad-cta); color: #fff; font-size: 14px; font-weight: 800;
    box-shadow: var(--glow-cyan); transition: all 0.22s;
    text-decoration: none; white-space: nowrap;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 36px rgba(32,217,255,0.5), 0 0 70px rgba(139,92,246,0.25); }

  .btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 22px; border-radius: var(--radius-pill); cursor: pointer;
    background: rgba(32,217,255,0.06); border: 1.5px solid rgba(32,217,255,0.35);
    color: var(--cyan); font-size: 13px; font-weight: 700; transition: all 0.2s;
    text-decoration: none; white-space: nowrap;
  }
  .btn-secondary:hover { background: rgba(32,217,255,0.14); border-color: rgba(32,217,255,0.6); }

  .btn-tertiary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: var(--radius-pill); cursor: pointer;
    background: transparent; border: 1px solid rgba(255,255,255,0.12);
    color: var(--text-muted); font-size: 13px; font-weight: 600; transition: all 0.2s;
    text-decoration: none;
  }
  .btn-tertiary:hover { background: rgba(255,255,255,0.06); color: #fff; border-color: rgba(255,255,255,0.25); }

  .btn-danger {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: var(--radius-pill); border: none; cursor: pointer;
    background: rgba(248,113,113,0.12); border: 1.5px solid rgba(248,113,113,0.35);
    color: #f87171; font-size: 13px; font-weight: 700; transition: all 0.2s;
  }
  .btn-danger:hover { background: rgba(248,113,113,0.2); }

  /* ── SHARED CARD ── */
  .ss-card {
    background: linear-gradient(135deg, rgba(3,10,26,0.98), rgba(4,11,24,0.99));
    border: 1.5px solid var(--border-cyan);
    border-radius: var(--radius-md);
    padding: 20px 22px;
    box-shadow: var(--glow-cyan), 0 4px 20px rgba(0,0,0,0.4);
  }

  /* ── SHARED TOP BAR ── */
  .page-topbar {
    position: sticky; top: 0; z-index: 30;
    background: rgba(5,8,22,0.96); backdrop-filter: blur(20px);
    border-bottom: 1.5px solid var(--border-cyan);
    padding: 13px 24px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }
  .page-topbar-title { font-size: 20px; font-weight: 900; color: #fff; margin: 0; }
  .page-topbar-sub { color: var(--text-muted); font-size: 12px; margin: 2px 0 0; }

  /* ── SHARED LABEL ── */
  .field-label {
    font-size: 11px; font-weight: 700; color: rgba(32,217,255,0.75);
    text-transform: uppercase; letter-spacing: 0.8px;
    display: block; margin-bottom: 6px;
  }

  /* ── SHARED INPUT ── */
  .field-input, .field-select, .field-textarea {
    width: 100%;
    background: rgba(3,8,24,0.95);
    border: 1.5px solid rgba(32,217,255,0.18);
    border-radius: 10px;
    padding: 10px 13px; color: var(--text-primary);
    font-size: 14px; outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: inherit;
  }
  .field-input:focus, .field-select:focus, .field-textarea:focus {
    border-color: rgba(32,217,255,0.55);
    box-shadow: 0 0 0 3px rgba(32,217,255,0.1);
  }
  .field-select option { background: #04091c; }
  .field-textarea { resize: vertical; }

  /* ── CHIP / PILL TAG ── */
  .ss-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 6px 13px; border-radius: var(--radius-pill);
    font-size: 11px; font-weight: 700; cursor: pointer;
    border: 1.5px solid rgba(32,217,255,0.2);
    background: rgba(32,217,255,0.05); color: var(--text-muted);
    transition: all 0.18s; user-select: none;
  }
  .ss-chip:hover { border-color: rgba(32,217,255,0.45); color: #fff; }
  .ss-chip.active { background: rgba(32,217,255,0.13); border-color: rgba(32,217,255,0.55); color: var(--cyan); }

  /* ── STAT CARD ── */
  .stat-card {
    background: rgba(3,10,26,0.96); border-radius: var(--radius-md);
    padding: 18px 20px; border: 1.5px solid var(--border-cyan);
  }
  .stat-value { font-size: 30px; font-weight: 900; line-height: 1; }
  .stat-label { font-size: 12px; color: var(--text-muted); margin-top: 5px; font-weight: 600; }

  /* ── NEON DIVIDER ── */
  .neon-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(32,217,255,0.3), rgba(255,45,166,0.2), transparent);
    margin: 8px 0;
  }

  /* ── BADGE ── */
  .ss-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 12px; border-radius: var(--radius-pill);
    font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px;
  }
  .ss-badge-cyan { background: rgba(32,217,255,0.1); border: 1.5px solid rgba(32,217,255,0.3); color: var(--cyan); }
  .ss-badge-violet { background: rgba(139,92,246,0.1); border: 1.5px solid rgba(139,92,246,0.3); color: var(--violet); }
  .ss-badge-pink { background: rgba(255,45,166,0.1); border: 1.5px solid rgba(255,45,166,0.3); color: var(--magenta); }
  .ss-badge-green { background: rgba(0,245,155,0.1); border: 1.5px solid rgba(0,245,155,0.3); color: var(--green); }
  .ss-badge-gold { background: rgba(255,176,32,0.1); border: 1.5px solid rgba(255,176,32,0.3); color: var(--orange); }

  /* ── MODAL OVERLAY ── */
  .modal-overlay {
    display: none; position: fixed; inset: 0;
    background: rgba(0,0,0,0.85); z-index: 2000;
    overflow-y: auto; padding: 20px;
    align-items: flex-start; justify-content: center;
  }
  .modal-overlay.open { display: flex; }
  .modal-box {
    max-width: 700px; width: 100%; margin: 30px auto;
    background: linear-gradient(160deg, rgba(3,8,22,0.99), rgba(4,10,24,0.99));
    border: 1.5px solid var(--border-cyan);
    border-radius: var(--radius-lg); overflow: hidden;
    box-shadow: 0 0 60px rgba(32,217,255,0.07), 0 30px 80px rgba(0,0,0,0.7);
  }
  .modal-head {
    padding: 18px 22px; border-bottom: 1.5px solid rgba(32,217,255,0.12);
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(32,217,255,0.03);
  }
  .modal-body { padding: 22px; }
`

export default { colors, gradients, radius, spacing, glow, typography, plans, creditCosts, creditPacks, baseStyles, cssVars }
