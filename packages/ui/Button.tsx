// ─────────────────────────────────────────────────────────────────────────────
//  packages/ui/Button.tsx
//  Shared Button component — used on both Web (injected HTML) and Mobile (RN)
//  Follows Social Strategy design system tokens.
// ─────────────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'ghost' | 'danger'
export type ButtonSize    = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  label:      string
  variant?:   ButtonVariant
  size?:      ButtonSize
  icon?:      string       // FontAwesome class e.g. 'fas fa-rocket'
  iconRight?: boolean
  disabled?:  boolean
  fullWidth?: boolean
  href?:      string       // renders as <a> if set
  onClick?:   string       // JS inline handler string for HTML injection
  id?:        string
  className?: string
}

/**
 * Render a Button as an HTML string for server-side injection.
 * Uses design token CSS variables defined in theme/tokens.ts cssVars.
 */
export function Button({
  label,
  variant   = 'primary',
  size      = 'md',
  icon,
  iconRight = false,
  disabled  = false,
  fullWidth = false,
  href,
  onClick,
  id,
  className = '',
}: ButtonProps): string {
  const sizeMap: Record<ButtonSize, string> = {
    sm: 'padding:8px 16px;font-size:12px;',
    md: 'padding:12px 24px;font-size:14px;',
    lg: 'padding:15px 32px;font-size:16px;',
  }
  const variantMap: Record<ButtonVariant, string> = {
    primary:   'background:var(--grad-cta);color:#fff;box-shadow:var(--glow-btn-primary);',
    secondary: 'background:rgba(32,217,255,0.06);border:1.5px solid rgba(32,217,255,0.35);color:var(--cyan);',
    accent:    'background:var(--grad-accent);color:#fff;box-shadow:var(--glow-btn-accent);',
    success:   'background:var(--grad-success);color:#fff;',
    ghost:     'background:transparent;border:1px solid rgba(255,255,255,0.12);color:var(--text-muted);',
    danger:    'background:linear-gradient(135deg,#f87171,#ef4444);color:#fff;',
  }

  const baseStyle = [
    'display:inline-flex;align-items:center;gap:8px;',
    'border-radius:var(--radius-pill);border:none;cursor:pointer;',
    'font-weight:800;font-family:inherit;transition:all 0.22s;',
    'text-decoration:none;white-space:nowrap;',
    sizeMap[size],
    variantMap[variant],
    fullWidth ? 'width:100%;justify-content:center;' : '',
    disabled ? 'opacity:0.5;pointer-events:none;' : '',
  ].join('')

  const iconEl   = icon ? `<i class="${icon}" style="font-size:0.9em;"></i>` : ''
  const labelEl  = `<span>${label}</span>`
  const children = iconRight
    ? `${labelEl}${iconEl}`
    : `${iconEl}${labelEl}`

  const idAttr      = id        ? ` id="${id}"` : ''
  const classAttr   = className ? ` class="${className}"` : ''
  const onClickAttr = onClick   ? ` onclick="${onClick}"` : ''

  if (href) {
    return `<a href="${href}"${idAttr}${classAttr} style="${baseStyle}">${children}</a>`
  }
  return `<button${idAttr}${classAttr} style="${baseStyle}"${onClickAttr}${disabled ? ' disabled' : ''}>${children}</button>`
}

/**
 * CSS helper — returns the shared button CSS rules for stylesheet injection.
 * Include once per page in a <style> block.
 */
export function buttonStyles(): string {
  return `
  .btn-primary {
    display:inline-flex;align-items:center;gap:8px;
    padding:12px 24px;border-radius:var(--radius-pill);border:none;cursor:pointer;
    background:var(--grad-cta);color:#fff;font-size:14px;font-weight:800;
    box-shadow:var(--glow-btn-primary);transition:all 0.22s;
    text-decoration:none;white-space:nowrap;
  }
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 0 36px rgba(32,217,255,0.5),0 0 70px rgba(139,92,246,0.25);}

  .btn-accent {
    display:inline-flex;align-items:center;gap:8px;
    padding:12px 24px;border-radius:var(--radius-pill);border:none;cursor:pointer;
    background:var(--grad-accent);color:#fff;font-size:14px;font-weight:800;
    box-shadow:var(--glow-btn-accent);transition:all 0.22s;
    text-decoration:none;white-space:nowrap;
  }
  .btn-accent:hover{transform:translateY(-2px);box-shadow:0 0 36px rgba(255,45,166,0.55),0 0 70px rgba(192,38,211,0.3);}

  .btn-secondary {
    display:inline-flex;align-items:center;gap:8px;
    padding:11px 22px;border-radius:var(--radius-pill);cursor:pointer;
    background:rgba(32,217,255,0.06);border:1.5px solid rgba(32,217,255,0.35);
    color:var(--cyan);font-size:13px;font-weight:700;transition:all 0.2s;
    text-decoration:none;white-space:nowrap;
  }
  .btn-secondary:hover{background:rgba(32,217,255,0.14);border-color:rgba(32,217,255,0.6);}

  .btn-ghost {
    display:inline-flex;align-items:center;gap:7px;
    padding:9px 18px;border-radius:var(--radius-pill);cursor:pointer;
    background:transparent;border:1px solid rgba(255,255,255,0.12);
    color:var(--text-muted);font-size:13px;font-weight:600;transition:all 0.2s;
    text-decoration:none;
  }
  .btn-ghost:hover{border-color:rgba(255,255,255,0.28);color:var(--text-primary);}

  .btn-success {
    display:inline-flex;align-items:center;gap:8px;
    padding:12px 24px;border-radius:var(--radius-pill);border:none;cursor:pointer;
    background:var(--grad-success);color:#fff;font-size:14px;font-weight:800;
    transition:all 0.22s;text-decoration:none;
  }
  .btn-success:hover{transform:translateY(-2px);box-shadow:0 0 28px rgba(0,245,155,0.4);}

  .btn-sm  { padding:7px 14px !important; font-size:12px !important; }
  .btn-lg  { padding:16px 36px !important; font-size:16px !important; }
  .btn-full{ width:100%; justify-content:center; }
  `
}
