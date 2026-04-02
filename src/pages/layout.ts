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
    { href: '#', label: 'Settings', icon: 'fas fa-cog', key: 'settings' },
  ]
  const navItem = (href: string, label: string, icon: string, key: string) => {
    const active = activePage === key
    return `<a href="${href}" style="${active ? 'background:linear-gradient(135deg,rgba(0,229,255,0.18),rgba(124,58,237,0.12));border-left:3px solid #00E5FF;color:#00E5FF;' : 'border-left:3px solid transparent;color:#9ca3af;'} display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:10px;text-decoration:none;font-size:14px;margin-bottom:2px;transition:all 0.2s;" onmouseover="if(this.style.color!='rgb(0, 229, 255)')this.style.background='rgba(0,229,255,0.08)'" onmouseout="if(this.style.color!='rgb(0, 229, 255)')this.style.background='transparent'">
      <i class="${icon}" style="width:16px;text-align:center;flex-shrink:0;"></i><span>${label}</span>
    </a>`
  }
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} – Social Strategy</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%230a0f1e'/><circle cx='50' cy='48' r='34' fill='%230d1b2a' stroke='%2300E5FF' stroke-width='2'/><text y='62' x='17' font-size='42' font-weight='900' fill='white' font-family='Arial'>SS</text><ellipse cx='73' cy='68' rx='14' ry='10' fill='%23FF2D78'/></svg>">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *, *::before, *::after { font-family: 'Inter', sans-serif; box-sizing: border-box; }
    body { background: #030818; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #0a0f1e; }
    ::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.3); border-radius: 3px; }
    .progress-bar { transition: width 1s ease-in-out; }

    /* SS Logo */
    .ss-logo-wrap { position:relative; width:44px; height:44px; flex-shrink:0; }
    .ss-logo-circle {
      width:44px; height:44px; border-radius:50%;
      background:radial-gradient(circle at 40% 35%, #1a3a5c 0%, #0a1a35 60%, #04091a 100%);
      border:2px solid rgba(0,229,255,0.6);
      box-shadow:0 0 18px rgba(0,229,255,0.45), inset 0 0 10px rgba(0,229,255,0.12);
      display:flex; align-items:center; justify-content:center;
    }
    .ss-logo-text {
      font-size:17px; font-weight:900; color:#fff; letter-spacing:-1px;
      text-shadow:0 0 10px rgba(0,229,255,0.8), 0 2px 4px rgba(0,0,0,0.8);
    }
    .ss-logo-bubble {
      position:absolute; bottom:-6px; right:-8px;
      width:18px; height:13px;
      background:linear-gradient(135deg,#FF2D78,#FF5fa0);
      border-radius:50% 50% 50% 0;
      transform:rotate(-15deg);
      box-shadow:0 0 8px rgba(255,45,120,0.7);
    }

    /* Layout */
    .sidebar {
      position:fixed; left:0; top:0; height:100%; width:256px; z-index:40;
      background:#060d1f; border-right:1px solid rgba(0,229,255,0.1);
      display:flex; flex-direction:column; transition:transform 0.3s;
    }
    .main-content {
      margin-left:256px; min-height:100vh; overflow-x:hidden;
    }
    @media(max-width:768px){
      .main-content { margin-left:0; }
      .sidebar { transform:translateX(-100%); }
      .sidebar.open { transform:translateX(0); }
    }

    /* Cards */
    .glass {
      background:rgba(255,255,255,0.04);
      backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,0.08);
    }
    .glass-dark {
      background:rgba(10,20,50,0.75);
      backdrop-filter:blur(16px);
      border:1px solid rgba(0,229,255,0.12);
    }
    .gradient-card {
      background:linear-gradient(135deg,rgba(0,229,255,0.07),rgba(255,45,120,0.05));
      border:1px solid rgba(0,229,255,0.14);
    }
    .card-hover { transition:all 0.25s; cursor:pointer; }
    .card-hover:hover { transform:translateY(-3px); box-shadow:0 16px 40px rgba(0,0,0,0.4); }

    /* Buttons */
    .btn-primary {
      background:linear-gradient(135deg,#00E5FF,#0070F3);
      color:#001a22; font-weight:800; transition:all 0.3s; border:none; cursor:pointer;
    }
    .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 25px rgba(0,229,255,0.5); }
    .btn-pink {
      background:linear-gradient(135deg,#FF5fa0,#FF2D78);
      color:white; font-weight:800; transition:all 0.3s; border:none; cursor:pointer;
    }
    .btn-pink:hover { transform:translateY(-2px); box-shadow:0 8px 25px rgba(255,45,120,0.5); }

    /* Gradient text */
    .gradient-text {
      background:linear-gradient(135deg,#00E5FF,#7C3AED,#FF2D78);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    }
    .gradient-primary { background:linear-gradient(135deg,#00E5FF 0%,#0070F3 50%,#7C3AED 100%); }

    /* Pulse dot */
    .pulse-dot { animation:pulse-anim 2s infinite; }
    @keyframes pulse-anim { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }

    /* Mobile menu btn */
    #menuToggle { display:none; }
    @media(max-width:768px){ #menuToggle { display:flex; } }

    /* Savings banner */
    .savings-banner {
      background:linear-gradient(135deg, rgba(0,229,255,0.12), rgba(124,58,237,0.08));
      border:1px solid rgba(0,229,255,0.25);
      border-radius:12px;
      padding:10px 16px;
    }

    /* Table */
    .data-table tbody tr:hover { background:rgba(255,255,255,0.03); }
  </style>
</head>
<body style="background:#030818;color:#fff;min-height:100vh;">

  <!-- ═══ SIDEBAR ═══ -->
  <div class="sidebar" id="mainSidebar">
    <!-- Logo -->
    <div style="padding:18px 20px;border-bottom:1px solid rgba(0,229,255,0.1);">
      <a href="/" style="display:flex;align-items:center;gap:12px;text-decoration:none;">
        <div class="ss-logo-wrap">
          <div class="ss-logo-circle">
            <span class="ss-logo-text">SS</span>
          </div>
          <div class="ss-logo-bubble"></div>
        </div>
        <div>
          <div style="font-weight:900;color:#fff;font-size:15px;line-height:1.15;letter-spacing:0.5px;">SOCIAL</div>
          <div style="font-weight:900;font-size:15px;line-height:1.15;letter-spacing:1px;background:linear-gradient(135deg,#00E5FF,#FF2D78);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">STRATEGY</div>
        </div>
      </a>
    </div>

    <!-- Nav items -->
    <nav style="flex:1;padding:16px;overflow-y:auto;">
      <p style="color:#4a5568;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:0 12px;margin-bottom:10px;margin-top:4px;">MAIN</p>
      ${nav.map(n => navItem(n.href, n.label, n.icon, n.key)).join('')}
      <p style="color:#4a5568;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:0 12px;margin-top:22px;margin-bottom:10px;">ACCOUNT</p>
      ${acct.map(n => navItem(n.href, n.label, n.icon, n.key)).join('')}
    </nav>

    <!-- User profile -->
    <div style="padding:14px;border-top:1px solid rgba(0,229,255,0.1);">
      <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;background:rgba(0,229,255,0.06);border:1px solid rgba(0,229,255,0.12);">
        <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#00E5FF,#FF2D78);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:#fff;flex-shrink:0;">SS</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Social Strategy</div>
          <div style="font-size:11px;font-weight:600;color:#00E5FF;">PRO Plan · ⚡ Credits</div>
        </div>
        <i class="fas fa-chevron-up" style="color:#6b7280;font-size:11px;flex-shrink:0;"></i>
      </div>
    </div>
  </div>

  <!-- ═══ MAIN CONTENT ═══ -->
  <div class="main-content">
    ${content}
  </div>

  <!-- Mobile menu toggle -->
  <button id="menuToggle" onclick="document.getElementById('mainSidebar').classList.toggle('open')" style="position:fixed;top:14px;left:14px;z-index:50;background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.2);border-radius:10px;padding:10px 12px;color:#fff;cursor:pointer;">
    <i class="fas fa-bars"></i>
  </button>

  <script>
    // Close sidebar on outside click (mobile)
    document.addEventListener('click', function(e) {
      if (window.innerWidth < 768) {
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
      let current = 0;
      const inc = target / 50;
      const timer = setInterval(() => {
        current = Math.min(current + inc, target);
        el.textContent = Math.floor(current).toLocaleString() + suffix;
        if (current >= target) clearInterval(timer);
      }, 25);
    });
  </script>
</body>
</html>`
}
