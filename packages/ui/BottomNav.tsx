// ─────────────────────────────────────────────────────────────────────────────
//  packages/ui/BottomNav.tsx
//  Shared Bottom Navigation component for Web (mobile) and Mobile (RN)
//  Follows Social Strategy design system tokens.
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  id:     string
  label:  string
  icon:   string   // FontAwesome class
  href:   string
  active?: boolean
  badge?: number   // notification count
}

export const defaultNavItems: NavItem[] = [
  { id: 'dashboard',  label: 'Home',    icon: 'fas fa-home',       href: '/dashboard' },
  { id: 'analysis',   label: 'Analyse', icon: 'fas fa-chart-line', href: '/analysis' },
  { id: 'studio',     label: 'Create',  icon: 'fas fa-wand-magic-sparkles', href: '/content-studio' },
  { id: 'characters', label: 'AI Team', icon: 'fas fa-user-astronaut',      href: '/characters' },
  { id: 'profile',    label: 'Profile', icon: 'fas fa-circle-user',         href: '/profile' },
]

/**
 * Render the bottom navigation bar as an HTML string.
 * Highlights the active item based on current path.
 */
export function BottomNav(items: NavItem[] = defaultNavItems, activePath = ''): string {
  const navItems = items.map((item) => {
    const isActive = activePath === item.href || item.active
    const color    = isActive ? '#20D9FF' : '#6B7A99'
    const glow     = isActive ? '0 0 10px rgba(32,217,255,0.45)' : 'none'
    const bg       = isActive ? 'rgba(32,217,255,0.08)' : 'transparent'
    const border   = isActive ? '1.5px solid rgba(32,217,255,0.3)' : '1.5px solid transparent'

    const badgeEl = item.badge
      ? `<span style="position:absolute;top:-3px;right:-3px;background:#FF2DA6;color:#fff;font-size:9px;font-weight:900;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;">${item.badge > 9 ? '9+' : item.badge}</span>`
      : ''

    return `
    <a href="${item.href}" class="bn-item${isActive ? ' bn-item--active' : ''}"
       style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 12px;
              border-radius:14px;text-decoration:none;transition:all 0.2s;
              background:${bg};border:${border};min-width:56px;position:relative;">
      <span style="position:relative;">
        <i class="${item.icon}" style="font-size:20px;color:${color};${glow !== 'none' ? `text-shadow:${glow};` : ''}"></i>
        ${badgeEl}
      </span>
      <span style="font-size:10px;font-weight:${isActive ? '800' : '600'};color:${color};letter-spacing:0.3px;">${item.label}</span>
    </a>`
  }).join('')

  return `
  <nav class="ss-bottom-nav" style="
    position:fixed;bottom:0;left:0;right:0;z-index:100;
    background:rgba(5,8,22,0.96);backdrop-filter:blur(20px);
    border-top:1.5px solid rgba(32,217,255,0.12);
    padding:8px 16px 12px;
    display:flex;justify-content:space-around;align-items:center;
    box-shadow:0 -4px 30px rgba(0,0,0,0.5);">
    ${navItems}
  </nav>`
}

/**
 * CSS helper — returns shared bottom nav styles.
 */
export function bottomNavStyles(): string {
  return `
  .ss-bottom-nav {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
    background: rgba(5,8,22,0.96); backdrop-filter: blur(20px);
    border-top: 1.5px solid rgba(32,217,255,0.12);
    padding: 8px 16px 12px;
    display: flex; justify-content: space-around; align-items: center;
    box-shadow: 0 -4px 30px rgba(0,0,0,0.5);
  }
  .bn-item {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    padding: 8px 12px; border-radius: 14px; text-decoration: none;
    transition: all 0.2s; min-width: 56px; position: relative;
    background: transparent; border: 1.5px solid transparent;
    color: #6B7A99;
  }
  .bn-item:hover { background: rgba(32,217,255,0.05); }
  .bn-item--active {
    background: rgba(32,217,255,0.08);
    border-color: rgba(32,217,255,0.3);
    color: #20D9FF;
  }
  .bn-item i { font-size: 20px; }
  .bn-item span:last-child { font-size: 10px; font-weight: 600; letter-spacing: 0.3px; }
  .bn-item--active span:last-child { font-weight: 800; }
  /* Safe area for iOS */
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    .ss-bottom-nav { padding-bottom: calc(12px + env(safe-area-inset-bottom)); }
  }
  `
}
