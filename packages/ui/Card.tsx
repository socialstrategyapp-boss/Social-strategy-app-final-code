// ─────────────────────────────────────────────────────────────────────────────
//  packages/ui/Card.tsx
//  Shared Card component — server-side HTML injection for Hono pages
//  Follows Social Strategy design system tokens.
// ─────────────────────────────────────────────────────────────────────────────

export type CardAccent = 'cyan' | 'violet' | 'pink' | 'green' | 'gold' | 'none'

export interface CardProps {
  title?:       string
  subtitle?:    string
  badge?:       string
  badgeColor?:  string
  icon?:        string     // FontAwesome class
  accent?:      CardAccent
  children:     string     // inner HTML
  id?:          string
  className?:   string
  onClick?:     string
  padding?:     string     // CSS padding override
}

const accentBorderMap: Record<CardAccent, string> = {
  cyan:   'rgba(32,217,255,0.22)',
  violet: 'rgba(139,92,246,0.28)',
  pink:   'rgba(255,45,166,0.22)',
  green:  'rgba(0,245,155,0.22)',
  gold:   'rgba(255,176,32,0.22)',
  none:   'rgba(255,255,255,0.08)',
}

const accentColorMap: Record<CardAccent, string> = {
  cyan:   '#20D9FF',
  violet: '#8B5CF6',
  pink:   '#FF2DA6',
  green:  '#00F59B',
  gold:   '#FFB020',
  none:   '#A8B3C7',
}

/**
 * Render a Card as an HTML string for server-side injection.
 */
export function Card({
  title,
  subtitle,
  badge,
  badgeColor,
  icon,
  accent   = 'none',
  children,
  id,
  className = '',
  onClick,
  padding = '20px 24px',
}: CardProps): string {
  const border     = accentBorderMap[accent]
  const accentCol  = accentColorMap[accent]
  const idAttr     = id        ? ` id="${id}"` : ''
  const clickAttr  = onClick   ? ` onclick="${onClick}" style="cursor:pointer;"` : ''
  const classAttr  = `ss-card ${className}`.trim()

  const badgeEl = badge
    ? `<span style="display:inline-flex;align-items:center;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:800;background:rgba(32,217,255,0.08);border:1px solid rgba(32,217,255,0.25);color:${badgeColor || accentCol};letter-spacing:0.5px;">${badge}</span>`
    : ''

  const iconEl = icon
    ? `<i class="${icon}" style="color:${accentCol};font-size:20px;text-shadow:0 0 10px ${accentCol}66;"></i>`
    : ''

  const headerEl = (title || icon || badge)
    ? `<div style="display:flex;align-items:center;gap:10px;margin-bottom:${subtitle || children ? '14px' : '0'};">
        ${iconEl}
        <div style="flex:1;">
          ${title ? `<h3 style="font-size:14px;font-weight:800;color:#F4F7FB;margin:0 0 2px;">${title}</h3>` : ''}
          ${subtitle ? `<p style="font-size:12px;color:#A8B3C7;margin:0;">${subtitle}</p>` : ''}
        </div>
        ${badgeEl}
       </div>`
    : ''

  return `
  <div${idAttr} class="${classAttr}"${clickAttr}
    style="background:linear-gradient(135deg,rgba(3,10,26,0.98),rgba(4,11,24,0.99));
           border:1.5px solid ${border};border-radius:18px;padding:${padding};">
    ${headerEl}
    ${children}
  </div>`
}

/**
 * CSS helper — returns shared card styles for stylesheet injection.
 */
export function cardStyles(): string {
  return `
  .ss-card {
    background: linear-gradient(135deg, rgba(3,10,26,0.98), rgba(4,11,24,0.99));
    border: 1.5px solid rgba(255,255,255,0.08);
    border-radius: 18px;
    padding: 20px 24px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .ss-card:hover {
    border-color: rgba(32,217,255,0.22);
    box-shadow: 0 0 14px rgba(32,217,255,0.06);
  }
  .ss-card--cyan   { border-color: rgba(32,217,255,0.22); }
  .ss-card--violet { border-color: rgba(139,92,246,0.28); }
  .ss-card--pink   { border-color: rgba(255,45,166,0.22); }
  .ss-card--green  { border-color: rgba(0,245,155,0.22);  }
  .ss-card--gold   { border-color: rgba(255,176,32,0.22); }

  .ss-card-title {
    font-size: 11px; font-weight: 800; text-transform: uppercase;
    letter-spacing: 1.2px; margin-bottom: 12px;
    display: flex; align-items: center; gap: 7px;
  }
  .ss-card-title--cyan   { color: #20D9FF; text-shadow: 0 0 10px rgba(32,217,255,0.4); }
  .ss-card-title--violet { color: #8B5CF6; text-shadow: 0 0 10px rgba(139,92,246,0.4); }
  .ss-card-title--pink   { color: #FF2DA6; text-shadow: 0 0 10px rgba(255,45,166,0.4); }
  .ss-card-title--green  { color: #00F59B; text-shadow: 0 0 10px rgba(0,245,155,0.4);  }
  `
}
