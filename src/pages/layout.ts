export function layout(title: string, content: string, activePage: string = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} – SOCIAL SYNC</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%2300E5FF'/><text y='.9em' font-size='80' x='10'>⚡</text></svg>">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    * { font-family: 'Inter', sans-serif; }
    .gradient-primary { background: linear-gradient(135deg, #00E5FF 0%, #0070F3 50%, #7C3AED 100%); }
    .gradient-text { background: linear-gradient(135deg, #00E5FF, #0070F3, #7C3AED); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .gradient-card { background: linear-gradient(135deg, rgba(0,229,255,0.1), rgba(0,112,243,0.1)); border: 1px solid rgba(0,229,255,0.2); }
    .glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); }
    .sidebar-item { transition: all 0.2s; }
    .sidebar-item:hover { background: rgba(0,229,255,0.1); }
    .sidebar-item.active { background: linear-gradient(135deg, rgba(0,229,255,0.2), rgba(0,112,243,0.2)); border-left: 3px solid #00E5FF; }
    .btn-primary { background: linear-gradient(135deg, #00E5FF, #0070F3); transition: all 0.3s; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,229,255,0.4); }
    .card-hover { transition: all 0.3s; }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
    .pulse-dot { animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{ opacity:1; } 50%{ opacity:0.4; } }
    .platform-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #1a1a2e; } ::-webkit-scrollbar-thumb { background: #0070F3; border-radius: 3px; }
    .skeleton { background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
    .score-ring { position: relative; display: inline-flex; align-items: center; justify-content: center; }
    .progress-bar { transition: width 1s ease-in-out; }
    .tooltip { position: relative; }
    .tooltip:hover::after { content: attr(data-tip); position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: #1e293b; color: #fff; padding: 4px 8px; border-radius: 6px; font-size: 11px; white-space: nowrap; z-index: 50; margin-bottom: 6px; }
  </style>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  <!-- Sidebar -->
  <div class="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-40 flex flex-col">
    <!-- Logo -->
    <div class="p-6 border-b border-gray-800">
      <a href="/" class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
          <i class="fas fa-bolt text-white text-sm"></i>
        </div>
        <div>
          <div class="font-black text-white text-lg leading-none">SOCIAL</div>
          <div class="gradient-text font-black text-lg leading-none">SYNC</div>
        </div>
      </a>
    </div>
    <!-- Nav -->
    <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
      <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3 px-3">Main</p>
      <a href="/dashboard" class="sidebar-item ${activePage==='dashboard'?'active':''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${activePage==='dashboard'?'text-cyan-400':'text-gray-400 hover:text-white'}">
        <i class="fas fa-chart-line w-4"></i> Dashboard
      </a>
      <a href="/analysis" class="sidebar-item ${activePage==='analysis'?'active':''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${activePage==='analysis'?'text-cyan-400':'text-gray-400 hover:text-white'}">
        <i class="fas fa-search w-4"></i> Website Analysis
      </a>
      <a href="/content-studio" class="sidebar-item ${activePage==='content-studio'?'active':''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${activePage==='content-studio'?'text-cyan-400':'text-gray-400 hover:text-white'}">
        <i class="fas fa-wand-magic-sparkles w-4"></i> AI Content Studio
      </a>
      <a href="/scheduler" class="sidebar-item ${activePage==='scheduler'?'active':''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${activePage==='scheduler'?'text-cyan-400':'text-gray-400 hover:text-white'}">
        <i class="fas fa-calendar-alt w-4"></i> Scheduler
      </a>
      <a href="/analytics" class="sidebar-item ${activePage==='analytics'?'active':''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${activePage==='analytics'?'text-cyan-400':'text-gray-400 hover:text-white'}">
        <i class="fas fa-chart-bar w-4"></i> Analytics
      </a>
      <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3 mt-5 px-3">Account</p>
      <a href="/pricing" class="sidebar-item ${activePage==='pricing'?'active':''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${activePage==='pricing'?'text-cyan-400':'text-gray-400 hover:text-white'}">
        <i class="fas fa-gem w-4"></i> Pricing
      </a>
      <a href="#" class="sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white">
        <i class="fas fa-cog w-4"></i> Settings
      </a>
    </nav>
    <!-- User -->
    <div class="p-4 border-t border-gray-800">
      <div class="flex items-center gap-3 px-3 py-2 rounded-lg glass">
        <div class="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold">JD</div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-white truncate">Jane Doe</div>
          <div class="text-xs text-cyan-400 font-medium">PRO Plan</div>
        </div>
        <i class="fas fa-chevron-up text-gray-400 text-xs"></i>
      </div>
    </div>
  </div>

  <!-- Main content -->
  <div class="ml-64 min-h-screen">
    ${content}
  </div>

  <!-- Mobile menu toggle -->
  <button id="menuToggle" class="fixed top-4 left-4 z-50 md:hidden glass rounded-lg p-2 text-white">
    <i class="fas fa-bars"></i>
  </button>

  <script>
    // Mobile sidebar toggle
    document.getElementById('menuToggle')?.addEventListener('click', () => {
      const sidebar = document.querySelector('.fixed.left-0');
      sidebar?.classList.toggle('-translate-x-full');
    });
    // Animate numbers on load
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
