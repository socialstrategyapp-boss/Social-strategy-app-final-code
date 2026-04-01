export function layout(title: string, content: string, activePage: string = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} – Social Strategy</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%230a0f1e'/><circle cx='50' cy='48' r='34' fill='%230d1b2a'/><text y='62' x='18' font-size='42' font-weight='900' fill='white' font-family='Arial'>SS</text><ellipse cx='72' cy='68' rx='14' ry='10' fill='%23FF2D78'/></svg>">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
    body { background: #030818; }
    /* ── Brand gradients ── */
    .gradient-primary { background: linear-gradient(135deg, #00E5FF 0%, #0070F3 50%, #7C3AED 100%); }
    .gradient-text { background: linear-gradient(135deg, #00E5FF, #FF2D78); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .gradient-card { background: linear-gradient(135deg, rgba(0,229,255,0.08), rgba(255,45,120,0.06)); border: 1px solid rgba(0,229,255,0.15); }
    /* ── Glass ── */
    .glass { background: rgba(255,255,255,0.04); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
    .glass-card { background: rgba(10,20,50,0.7); backdrop-filter: blur(16px); border: 1px solid rgba(0,229,255,0.12); border-top-color: rgba(0,229,255,0.25); }
    /* ── Sidebar ── */
    .sidebar-item { transition: all 0.2s; border-left: 3px solid transparent; }
    .sidebar-item:hover { background: rgba(0,229,255,0.08); color: white; }
    .sidebar-item.active { background: linear-gradient(135deg, rgba(0,229,255,0.15), rgba(124,58,237,0.1)); border-left: 3px solid #00E5FF; color: #00E5FF; }
    /* ── Buttons ── */
    .btn-primary { background: linear-gradient(135deg, #00E5FF, #0070F3); transition: all 0.3s; color: #001a22; font-weight: 800; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,229,255,0.5); }
    .btn-pink { background: linear-gradient(135deg, #FF5fa0, #FF2D78); color: white; font-weight: 800; }
    .btn-pink:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,45,120,0.5); }
    /* ── Neon glows ── */
    .glow-cyan { box-shadow: 0 0 20px rgba(0,229,255,0.35); }
    .glow-pink { box-shadow: 0 0 20px rgba(255,45,120,0.35); }
    /* ── Animations ── */
    .card-hover { transition: all 0.3s; }
    .card-hover:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
    .pulse-dot { animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{ opacity:1; } 50%{ opacity:0.4; } }
    /* ── Layout fix: prevent overflow ── */
    .main-content { margin-left: 256px; min-height: 100vh; max-width: 100%; overflow-x: hidden; }
    @media (max-width: 768px) { .main-content { margin-left: 0; } .sidebar { transform: translateX(-100%); } .sidebar.open { transform: translateX(0); } }
    /* ── Grid fix ── */
    .platform-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
    .score-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; }
    /* ── Cards fix: no overflow ── */
    .overflow-safe { overflow: hidden; word-break: break-word; }
    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #0a0f1e; } ::-webkit-scrollbar-thumb { background: #00E5FF44; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #00E5FF88; }
    /* ── Progress ── */
    .progress-bar { transition: width 1s ease-in-out; }
    /* ── SS Logo ── */
    .ss-logo { position: relative; display: inline-flex; align-items: center; justify-content: center; }
    .ss-logo-circle { background: radial-gradient(circle, #0d1b2a 60%, #04091a 100%); border-radius: 50%; border: 2px solid rgba(0,229,255,0.5); box-shadow: 0 0 16px rgba(0,229,255,0.4), inset 0 0 8px rgba(0,229,255,0.1); position: relative; display: flex; align-items: center; justify-content: center; }
    .ss-logo-letters { font-size: 42%; font-weight: 900; color: white; letter-spacing: -1px; text-shadow: 0 2px 8px rgba(0,229,255,0.6); }
    .ss-logo-bubble { position: absolute; bottom: -8%; right: -12%; width: 40%; height: 30%; background: linear-gradient(135deg, #FF2D78, #FF5fa0); border-radius: 50% 50% 50% 0; transform: rotate(-15deg); box-shadow: 0 0 10px rgba(255,45,120,0.6); }
  </style>
</head>
<body class="bg-gray-950 text-white min-h-screen" style="background:#030818;">

  <!-- Sidebar -->
  <div class="sidebar fixed left-0 top-0 h-full w-64 z-40 flex flex-col transition-transform duration-300" style="background:#060d1f;border-right:1px solid rgba(0,229,255,0.1);">
    <!-- Logo -->
    <div class="p-5 border-b" style="border-color:rgba(0,229,255,0.1);">
      <a href="/" class="flex items-center gap-3">
        <!-- SS Logo -->
        <div class="ss-logo" style="width:42px;height:42px;">
          <div class="ss-logo-circle" style="width:42px;height:42px;">
            <span style="font-size:16px;font-weight:900;color:white;letter-spacing:-1px;text-shadow:0 0 8px rgba(0,229,255,0.6);">SS</span>
          </div>
          <div class="ss-logo-bubble"></div>
        </div>
        <div>
          <div style="font-weight:900;color:white;font-size:15px;line-height:1.1;letter-spacing:0.5px;">SOCIAL</div>
          <div style="font-weight:900;font-size:15px;line-height:1.1;letter-spacing:1px;background:linear-gradient(135deg,#00E5FF,#FF2D78);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">STRATEGY</div>
        </div>
      </a>
    </div>
    <!-- Nav -->
    <nav class="flex-1 p-4 overflow-y-auto" style="space-y:2px;">
      <p style="color:#4a5568;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:0 12px;margin-bottom:8px;">MAIN</p>
      <a href="/dashboard" class="sidebar-item ${activePage==='dashboard'?'active':''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 ${activePage==='dashboard'?'text-cyan-400':'text-gray-400'}">
        <i class="fas fa-chart-line w-4 text-center"></i><span>Dashboard</span>
      </a>
      <a href="/analysis" class="sidebar-item ${activePage==='analysis'?'active':''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 ${activePage==='analysis'?'text-cyan-400':'text-gray-400'}">
        <i class="fas fa-search w-4 text-center"></i><span>Website Analysis</span>
      </a>
      <a href="/content-studio" class="sidebar-item ${activePage==='content-studio'?'active':''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 ${activePage==='content-studio'?'text-cyan-400':'text-gray-400'}">
        <i class="fas fa-wand-magic-sparkles w-4 text-center"></i><span>AI Content Studio</span>
      </a>
      <a href="/scheduler" class="sidebar-item ${activePage==='scheduler'?'active':''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 ${activePage==='scheduler'?'text-cyan-400':'text-gray-400'}">
        <i class="fas fa-calendar-alt w-4 text-center"></i><span>Scheduler</span>
      </a>
      <a href="/analytics" class="sidebar-item ${activePage==='analytics'?'active':''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 ${activePage==='analytics'?'text-cyan-400':'text-gray-400'}">
        <i class="fas fa-chart-bar w-4 text-center"></i><span>Analytics</span>
      </a>
      <p style="color:#4a5568;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:0 12px;margin-top:20px;margin-bottom:8px;">ACCOUNT</p>
      <a href="/pricing" class="sidebar-item ${activePage==='pricing'?'active':''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 ${activePage==='pricing'?'text-cyan-400':'text-gray-400'}">
        <i class="fas fa-gem w-4 text-center"></i><span>Pricing</span>
      </a>
      <a href="#" class="sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400">
        <i class="fas fa-cog w-4 text-center"></i><span>Settings</span>
      </a>
    </nav>
    <!-- User profile -->
    <div class="p-4" style="border-top:1px solid rgba(0,229,255,0.1);">
      <div class="flex items-center gap-3 px-3 py-2.5 rounded-xl" style="background:rgba(0,229,255,0.06);border:1px solid rgba(0,229,255,0.12);">
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style="background:linear-gradient(135deg,#00E5FF,#FF2D78);">SS</div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-white truncate">Social Strategy</div>
          <div class="text-xs font-semibold" style="color:#00E5FF;">PRO Plan · ⚡ Credits</div>
        </div>
        <i class="fas fa-chevron-up text-gray-500 text-xs flex-shrink-0"></i>
      </div>
    </div>
  </div>

  <!-- Main content wrapper — properly offset, no overflow -->
  <div class="main-content" style="margin-left:256px;min-height:100vh;overflow-x:hidden;">
    ${content}
  </div>

  <!-- Mobile menu toggle (hidden on desktop) -->
  <button id="menuToggle" class="fixed top-4 left-4 z-50 md:hidden rounded-xl p-2.5 text-white" style="background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.2);">
    <i class="fas fa-bars"></i>
  </button>

  <script>
    // Mobile sidebar toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle?.addEventListener('click', () => {
      sidebar?.classList.toggle('open');
    });
    // Click outside to close on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth < 768 && sidebar?.classList.contains('open')) {
        if (!sidebar.contains(e.target) && e.target !== menuToggle) {
          sidebar.classList.remove('open');
        }
      }
    });
    // Animate count-up numbers
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.getAttribute('data-count') || '0');
      let current = 0;
      const increment = target / 40;
      const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = Math.floor(current).toLocaleString();
        if (current >= target) clearInterval(timer);
      }, 30);
    });
  </script>
</body>
</html>`
}
