// Real SS logo – rounded-square chrome border, black glossy circle, white bold SS, pink speech bubble
export function ssLogo(size: number = 44): string {
  const s = size
  const r = Math.round(s * 0.22)
  return `<svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="chrome${s}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#d0eef2;stop-opacity:1"/>
      <stop offset="25%" style="stop-color:#7dd8e0;stop-opacity:1"/>
      <stop offset="55%" style="stop-color:#2aa4b4;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#0a6878;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="border${s}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#c0f0f8;stop-opacity:1"/>
      <stop offset="45%" style="stop-color:#60d8e8;stop-opacity:1"/>
      <stop offset="75%" style="stop-color:#e050a0;stop-opacity:0.9"/>
      <stop offset="100%" style="stop-color:#ff2d78;stop-opacity:1"/>
    </linearGradient>
    <radialGradient id="circle${s}" cx="42%" cy="36%" r="62%">
      <stop offset="0%" style="stop-color:#1e2e40;stop-opacity:1"/>
      <stop offset="35%" style="stop-color:#08111e;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#000408;stop-opacity:1"/>
    </radialGradient>
    <radialGradient id="gloss${s}" cx="38%" cy="28%" r="48%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.22"/>
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0"/>
    </radialGradient>
    <linearGradient id="bubble${s}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff5fa0;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#d8005a;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="sstext${s}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1"/>
      <stop offset="50%" style="stop-color:#e8f4f6;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#a8ccd2;stop-opacity:1"/>
    </linearGradient>
    <filter id="shadow${s}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" flood-color="#000" flood-opacity="0.55"/>
    </filter>
    <filter id="glow${s}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="1.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <!-- Outer chrome rounded-square -->
  <rect x="2" y="2" width="96" height="96" rx="${r}" ry="${r}" fill="url(#chrome${s})" filter="url(#shadow${s})"/>
  <!-- Gradient border ring -->
  <rect x="4" y="4" width="92" height="92" rx="${r-1}" ry="${r-1}" fill="none" stroke="url(#border${s})" stroke-width="3"/>
  <!-- Teal glass fill inside -->
  <rect x="7" y="7" width="86" height="86" rx="${r-3}" ry="${r-3}" fill="#1a8090" opacity="0.55"/>
  <!-- Pink speech bubble (bottom-right, BEHIND circle) -->
  <ellipse cx="68" cy="71" rx="19" ry="15" fill="url(#bubble${s})"/>
  <polygon points="56,77 63,91 71,79" fill="url(#bubble${s})"/>
  <!-- Small white chat dots on bubble -->
  <circle cx="61" cy="71" r="2.2" fill="rgba(255,255,255,0.85)"/>
  <circle cx="68" cy="71" r="2.2" fill="rgba(255,255,255,0.85)"/>
  <circle cx="75" cy="71" r="2.2" fill="rgba(255,255,255,0.85)"/>
  <!-- Black glossy main circle -->
  <circle cx="46" cy="46" r="35" fill="url(#circle${s})"/>
  <!-- Gloss highlight -->
  <circle cx="46" cy="46" r="35" fill="url(#gloss${s})"/>
  <!-- Cyan glow rim on circle -->
  <circle cx="46" cy="46" r="35" fill="none" stroke="#00d8ee" stroke-width="1.8" opacity="0.55"/>
  <!-- Bold white SS letters -->
  <text x="46" y="61"
    font-family="Arial Black, Arial, sans-serif"
    font-size="40"
    font-weight="900"
    text-anchor="middle"
    fill="url(#sstext${s})"
    filter="url(#shadow${s})"
    letter-spacing="-2">SS</text>
</svg>`
}

export function layout(title: string, content: string, activePage: string = ''): string {
  const nav = [
    { href: '/dashboard', label: 'Dashboard', icon: 'fas fa-chart-line', key: 'dashboard' },
    { href: '/analysis', label: 'Website Analysis', icon: 'fas fa-search', key: 'analysis' },
    { href: '/content-studio', label: 'AI Content Studio', icon: 'fas fa-wand-magic-sparkles', key: 'content-studio' },
    { href: '/scheduler', label: 'Scheduler', icon: 'fas fa-calendar-alt', key: 'scheduler' },
    { href: '/analytics', label: 'Analytics', icon: 'fas fa-chart-bar', key: 'analytics' },
  ]
  const acct = [
    { href: '/pricing', label: 'Pricing & Plans', icon: 'fas fa-gem', key: 'pricing' },
    { href: '/settings', label: 'Settings', icon: 'fas fa-cog', key: 'settings' },
  ]
  const navItem = (href: string, label: string, icon: string, key: string) => {
    const active = activePage === key
    return `<a href="${href}" class="nav-item${active ? ' nav-active' : ''}">
      <i class="${icon}"></i><span>${label}</span>
    </a>`
  }

  // Bottom toolbar active states
  const tb = (key: string) => activePage === key ? 'tb-active' : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} – Social Strategy</title>
  <link rel="icon" href="data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%231a8090'/><circle cx='46' cy='44' r='32' fill='%23050d18'/><text y='58' x='46' font-size='36' font-weight='900' fill='white' font-family='Arial Black' text-anchor='middle'>SS</text><ellipse cx='68' cy='68' rx='16' ry='12' fill='%23ff2d78'/><polygon points='56,72 64,84 72,74' fill='%23ff2d78'/></svg>`)}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *, *::before, *::after { font-family: 'Inter', sans-serif; box-sizing: border-box; }
    body { background: #030818; margin: 0; padding: 0; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #0a0f1e; }
    ::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.3); border-radius: 3px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse-anim { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
    .pulse-dot { animation: pulse-anim 2s infinite; }
    .progress-bar { transition: width 1s ease-in-out; }

    /* ── SIDEBAR ── */
    .sidebar {
      position: fixed; left: 0; top: 0; height: 100vh; width: 260px; z-index: 40;
      background: linear-gradient(180deg, #040e22 0%, #060d1f 100%);
      border-right: 1px solid rgba(0,229,255,0.12);
      display: flex; flex-direction: column;
      transition: transform 0.3s ease;
    }
    .sidebar-logo {
      padding: 14px 16px;
      border-bottom: 1px solid rgba(0,229,255,0.1);
      display: flex; align-items: center; gap: 12px;
      text-decoration: none;
      flex-shrink: 0;
    }
    .sidebar-brand { display: flex; flex-direction: column; line-height: 1.2; }
    .sidebar-brand .b1 { font-size: 14px; font-weight: 900; color: #fff; letter-spacing: 1px; }
    .sidebar-brand .b2 { font-size: 14px; font-weight: 900; letter-spacing: 1px;
      background: linear-gradient(135deg,#00E5FF,#FF2D78);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

    /* ── NAV ITEMS ── */
    .nav-section-label {
      font-size: 10px; font-weight: 700; color: #374151;
      letter-spacing: 1.5px; text-transform: uppercase;
      padding: 0 16px; margin: 14px 0 5px;
    }
    .nav-item {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 16px; margin: 1px 8px;
      border-radius: 10px; text-decoration: none;
      font-size: 13.5px; font-weight: 500; color: #9ca3af;
      border-left: 3px solid transparent;
      transition: all 0.2s;
    }
    .nav-item:hover { background: rgba(0,229,255,0.07); color: #e2e8f0; }
    .nav-item.nav-active {
      background: linear-gradient(135deg, rgba(0,229,255,0.15), rgba(124,58,237,0.1));
      color: #00E5FF; border-left-color: #00E5FF;
    }
    .nav-item i { width: 18px; text-align: center; font-size: 14px; flex-shrink: 0; }

    /* ── MAIN CONTENT ── */
    .main-content {
      margin-left: 260px;
      min-height: 100vh;
      overflow-x: hidden;
      overflow-y: auto;
      padding-bottom: 80px; /* space for bottom toolbar */
    }

    /* ── CARDS ── */
    .glass { background: rgba(255,255,255,0.04); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
    .glass-dark { background: rgba(6,14,36,0.8); backdrop-filter: blur(16px); border: 1px solid rgba(0,229,255,0.1); }
    .gradient-card { background: linear-gradient(135deg,rgba(0,229,255,0.06),rgba(255,45,120,0.04)); border: 1px solid rgba(0,229,255,0.12); }
    .card-hover { transition: all 0.25s; cursor: pointer; }
    .card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); }

    /* ── BUTTONS ── */
    .btn-primary { background: linear-gradient(135deg,#00E5FF,#0070F3); color: #001a22; font-weight: 800; border: none; cursor: pointer; transition: all 0.2s; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,229,255,0.45); }
    .btn-pink { background: linear-gradient(135deg,#FF5fa0,#FF2D78); color: #fff; font-weight: 800; border: none; cursor: pointer; transition: all 0.2s; }
    .btn-pink:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,45,120,0.45); }
    .btn-ghost { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); color: #d1d5db; cursor: pointer; transition: all 0.2s; }
    .btn-ghost:hover { background: rgba(255,255,255,0.09); color: #fff; }

    /* ── TOGGLE SWITCH ── */
    .toggle-wrap { display: flex; align-items: center; gap: 10px; cursor: pointer; }
    .toggle-switch {
      position: relative; width: 44px; height: 24px; flex-shrink: 0;
      background: rgba(255,255,255,0.1); border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.15);
      transition: background 0.3s;
    }
    .toggle-switch.on { background: linear-gradient(135deg,#00E5FF,#0070F3); border-color: rgba(0,229,255,0.5); }
    .toggle-knob {
      position: absolute; top: 3px; left: 3px;
      width: 18px; height: 18px; border-radius: 50%;
      background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.4);
      transition: transform 0.3s;
    }
    .toggle-switch.on .toggle-knob { transform: translateX(20px); }

    /* ── CHIP / PILL BUTTONS ── */
    .chip {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 7px 14px; border-radius: 999px;
      font-size: 12px; font-weight: 600; cursor: pointer;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.05); color: #9ca3af;
      transition: all 0.2s;
    }
    .chip:hover { border-color: rgba(0,229,255,0.4); color: #e2e8f0; }
    .chip.active { background: rgba(0,229,255,0.15); border-color: rgba(0,229,255,0.5); color: #00E5FF; }
    .chip.active-pink { background: rgba(255,45,120,0.15); border-color: rgba(255,45,120,0.5); color: #FF2D78; }

    /* ── GRADIENT TEXT ── */
    .gradient-text { background: linear-gradient(135deg,#00E5FF,#7C3AED,#FF2D78); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .gradient-primary { background: linear-gradient(135deg,#00E5FF 0%,#0070F3 50%,#7C3AED 100%); }

    /* ── BOTTOM TOOLBAR ── */
    .bottom-toolbar {
      position: fixed;
      bottom: 0; left: 260px; right: 0;
      height: 68px;
      background: rgba(4,10,30,0.96);
      backdrop-filter: blur(20px);
      border-top: 1px solid rgba(0,229,255,0.15);
      display: flex;
      align-items: center;
      justify-content: space-around;
      z-index: 35;
      padding: 0 8px;
    }
    .tb-item {
      display: flex; flex-direction: column; align-items: center; gap: 4px;
      padding: 8px 16px; border-radius: 14px;
      text-decoration: none;
      font-size: 11px; font-weight: 600; color: #6b7280;
      transition: all 0.2s;
      min-width: 60px;
      cursor: pointer;
    }
    .tb-item:hover { color: #d1d5db; background: rgba(255,255,255,0.05); }
    .tb-item i { font-size: 20px; transition: all 0.2s; }
    .tb-item.tb-active { color: #00E5FF; }
    .tb-item.tb-active i { 
      filter: drop-shadow(0 0 6px rgba(0,229,255,0.7));
    }
    .tb-item.tb-active-pink { color: #FF2D78; }
    .tb-item.tb-active-pink i {
      filter: drop-shadow(0 0 6px rgba(255,45,120,0.7));
    }
    .tb-center-btn {
      display: flex; flex-direction: column; align-items: center; gap: 4px;
      text-decoration: none; font-size: 11px; font-weight: 600; color: #6b7280;
      transition: all 0.2s;
    }
    .tb-center-btn .tb-center-icon {
      width: 48px; height: 48px; border-radius: 50%;
      background: linear-gradient(135deg,#00E5FF,#0070F3,#7C3AED);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(0,229,255,0.4);
      margin-top: -20px;
      border: 3px solid rgba(4,10,30,0.96);
      transition: all 0.2s;
    }
    .tb-center-btn:hover .tb-center-icon { transform: scale(1.08); box-shadow: 0 6px 28px rgba(0,229,255,0.6); }
    .tb-center-btn i { font-size: 18px; color: #fff; }

    /* ── RESPONSIVE ── */
    @media (max-width: 900px) {
      .sidebar { transform: translateX(-100%); }
      .sidebar.open { transform: translateX(0); }
      .main-content { margin-left: 0; }
      .bottom-toolbar { left: 0; }
      #menuToggle { display: flex !important; }
      .grid-4 { grid-template-columns: 1fr 1fr !important; }
      .grid-3 { grid-template-columns: 1fr 1fr !important; }
      .grid-2-1 { grid-template-columns: 1fr !important; }
      .grid-sidebar-content { grid-template-columns: 1fr !important; }
    }
    @media (max-width: 600px) {
      .grid-4 { grid-template-columns: 1fr 1fr !important; }
      .grid-3 { grid-template-columns: 1fr !important; }
      .grid-2 { grid-template-columns: 1fr !important; }
      .grid-2-1 { grid-template-columns: 1fr !important; }
      .tb-item { padding: 8px 10px; min-width: 50px; font-size: 10px; }
    }
    #menuToggle { display: none; }

    /* ── TOP BAR ── */
    .top-bar {
      position: sticky; top: 0; z-index: 30;
      background: rgba(3,8,24,0.9); backdrop-filter: blur(14px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 14px 28px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .top-bar h1 { font-size: 20px; font-weight: 800; color: #fff; margin: 0; }
    .top-bar p { color: #9ca3af; font-size: 13px; margin: 2px 0 0; }

    /* ── PAGE CONTENT WRAPPER ── */
    .page-content { padding: 24px 28px; }

    /* ── USER CARD ── */
    .user-card {
      margin: 0 10px 12px; padding: 10px 12px; border-radius: 12px;
      background: rgba(0,229,255,0.05); border: 1px solid rgba(0,229,255,0.1);
      display: flex; align-items: center; gap: 10px;
    }
    .user-avatar {
      width: 34px; height: 34px; border-radius: 50%;
      background: linear-gradient(135deg,#00E5FF,#FF2D78);
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 900; color: #fff; flex-shrink: 0;
    }

    /* ── GRID HELPERS ── */
    .grid-4 { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 18px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 18px; }
    .grid-2 { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 18px; }
    .grid-6 { display: grid; grid-template-columns: repeat(6,minmax(0,1fr)); gap: 16px; }
    .grid-2-1 { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
    @media (max-width: 1100px) {
      .grid-6 { grid-template-columns: repeat(3,1fr) !important; }
    }
    @media (max-width: 700px) {
      .grid-6 { grid-template-columns: repeat(2,1fr) !important; }
    }
  </style>
</head>
<body style="background:#030818;color:#fff;min-height:100vh;">

  <!-- SIDEBAR -->
  <div class="sidebar" id="mainSidebar">
    <a href="/" class="sidebar-logo">
      ${ssLogo(42)}
      <div class="sidebar-brand">
        <span class="b1">SOCIAL</span>
        <span class="b2">STRATEGY</span>
      </div>
    </a>

    <nav style="flex:1;overflow-y:auto;padding:8px 0;">
      <div class="nav-section-label">MAIN</div>
      ${nav.map(n => navItem(n.href, n.label, n.icon, n.key)).join('')}
      <div class="nav-section-label" style="margin-top:16px;">ACCOUNT</div>
      ${acct.map(n => navItem(n.href, n.label, n.icon, n.key)).join('')}
    </nav>

    <div class="user-card">
      <div class="user-avatar">SS</div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:13px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Social Strategy</div>
        <div style="font-size:11px;color:#00E5FF;font-weight:600;">PRO Plan · ⚡ Credits</div>
      </div>
    </div>
  </div>

  <!-- MAIN CONTENT -->
  <div class="main-content" id="mainContent">
    ${content}
  </div>

  <!-- BOTTOM TOOLBAR -->
  <nav class="bottom-toolbar" id="bottomToolbar">
    <a href="/dashboard" class="tb-item ${tb('dashboard')}">
      <i class="fas fa-house"></i>
      <span>Home</span>
    </a>
    <a href="/analysis" class="tb-item ${tb('analysis')}">
      <i class="fas fa-search"></i>
      <span>Strategy</span>
    </a>
    <a href="/content-studio" class="tb-center-btn">
      <div class="tb-center-icon">
        <i class="fas fa-wand-magic-sparkles"></i>
      </div>
      <span style="font-size:11px;font-weight:600;color:#9ca3af;margin-top:2px;">Create</span>
    </a>
    <a href="/analytics" class="tb-item ${tb('analytics')}">
      <i class="fas fa-chart-bar"></i>
      <span>Analytics</span>
    </a>
    <a href="/settings" class="tb-item ${tb('settings')}">
      <i class="fas fa-user-circle"></i>
      <span>Profile</span>
    </a>
  </nav>

  <!-- Mobile hamburger -->
  <button id="menuToggle" onclick="toggleSidebar()" style="position:fixed;top:14px;left:14px;z-index:50;background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.2);border-radius:10px;padding:10px 12px;color:#fff;cursor:pointer;">
    <i class="fas fa-bars"></i>
  </button>

  <script>
    function toggleSidebar() {
      document.getElementById('mainSidebar').classList.toggle('open');
    }
    document.addEventListener('click', function(e) {
      if (window.innerWidth < 900) {
        const sb = document.getElementById('mainSidebar');
        const btn = document.getElementById('menuToggle');
        if (sb && sb.classList.contains('open') && !sb.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
          sb.classList.remove('open');
        }
      }
    });
    // Count-up animation
    document.querySelectorAll('[data-count]').forEach(el => {
      const raw = el.getAttribute('data-count') || '0';
      const target = parseInt(raw.replace(/[^0-9]/g, '')) || 0;
      const suffix = raw.replace(/[0-9,]/g, '');
      let current = 0; const inc = target / 50;
      const timer = setInterval(() => {
        current = Math.min(current + inc, target);
        el.textContent = Math.floor(current).toLocaleString() + suffix;
        if (current >= target) clearInterval(timer);
      }, 25);
    });
    function toggleSwitch(el) {
      el.classList.toggle('on');
    }
  </script>
</body>
</html>`
}
