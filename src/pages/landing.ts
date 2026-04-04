import { layout, ssLogo } from './layout'

export function landingPage(): string {
  // Reuse the exact same SS logo SVG for navbar + footer
  const navLogo = ssLogo(40)
  const footerLogo = ssLogo(34)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SOCIAL STRATEGY – One Scan. Complete Growth.</title>
  <link rel="icon" href="data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%231a8090'/><circle cx='46' cy='44' r='32' fill='%23050d18'/><text y='58' x='46' font-size='36' font-weight='900' fill='white' font-family='Arial Black' text-anchor='middle'>SS</text><ellipse cx='68' cy='68' rx='16' ry='12' fill='%23ff2d78'/><polygon points='56,72 64,84 72,74' fill='%23ff2d78'/></svg>`)}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *{font-family:'Inter',sans-serif;box-sizing:border-box;}
    body{margin:0;padding:0;}
    .gradient-primary{background:linear-gradient(135deg,#00E5FF 0%,#0070F3 50%,#7C3AED 100%);}
    .gradient-text{background:linear-gradient(135deg,#00E5FF,#0070F3,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .hero-bg{background:radial-gradient(ellipse at 20% 50%, rgba(0,229,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(0,112,243,0.1) 0%, transparent 40%), #030712;}
    .glass{background:rgba(255,255,255,0.05);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1);}
    .card-glow{box-shadow:0 0 40px rgba(0,229,255,0.1);}
    .float-anim{animation:float 6s ease-in-out infinite;}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    .float-anim2{animation:float 8s ease-in-out infinite 2s;}
    .float-anim3{animation:float 7s ease-in-out infinite 1s;}
    .btn-glow:hover{box-shadow:0 0 30px rgba(0,229,255,0.5);}
    .platform-icon{transition:all 0.3s;}
    .platform-icon:hover{transform:scale(1.15);}
    .particle{position:absolute;border-radius:50%;animation:sparkle 3s infinite;}
    @keyframes sparkle{0%,100%{opacity:0;transform:scale(0)}50%{opacity:1;transform:scale(1)}}
    nav a{transition:color 0.2s;}nav a:hover{color:#00E5FF;}
    .fade-in{animation:fadeIn 0.8s ease-out forwards;opacity:0;}
    @keyframes fadeIn{to{opacity:1}}
    .slide-up{animation:slideUp 0.8s ease-out forwards;opacity:0;transform:translateY(30px);}
    @keyframes slideUp{to{opacity:1;transform:translateY(0)}}
    ::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-track{background:#030712;}::-webkit-scrollbar-thumb{background:#0070F3;border-radius:3px;}
    .pulse-dot{animation:pulse 2s infinite;}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
    .card-hover{transition:all .3s;}.card-hover:hover{transform:translateY(-4px);}
  </style>
</head>
<body class="bg-gray-950 text-white">

  <!-- Navbar -->
  <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
    <div class="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
      <a href="/" style="display:flex;align-items:center;gap:12px;text-decoration:none;">
        ${navLogo}
        <div style="display:flex;flex-direction:column;line-height:1.2;">
          <span style="font-weight:900;color:#fff;font-size:15px;letter-spacing:1px;">SOCIAL</span>
          <span style="font-weight:900;font-size:15px;letter-spacing:1px;background:linear-gradient(135deg,#00E5FF,#FF2D78);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">STRATEGY</span>
        </div>
      </a>
      <div class="hidden md:flex items-center gap-8">
        <a href="#features" class="text-gray-400 text-sm">Features</a>
        <a href="#how-it-works" class="text-gray-400 text-sm">How It Works</a>
        <a href="#platforms" class="text-gray-400 text-sm">Platforms</a>
        <a href="/pricing" class="text-gray-400 text-sm">Pricing</a>
      </div>
      <div class="flex items-center gap-3">
        <a href="/login" class="text-sm text-gray-400 hover:text-white px-4 py-2">Sign In</a>
        <a href="/login" class="btn-glow gradient-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all" style="color:#fff;">
          Start Free <i class="fas fa-arrow-right ml-1"></i>
        </a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="hero-bg min-h-screen flex items-center pt-20 overflow-hidden relative">
    <div class="particle w-2 h-2 bg-cyan-400 top-1/4 left-1/4" style="animation-delay:0s"></div>
    <div class="particle w-1 h-1 bg-blue-400 top-1/3 right-1/3" style="animation-delay:1s"></div>
    <div class="particle w-1.5 h-1.5 bg-purple-400 bottom-1/3 left-1/3" style="animation-delay:2s"></div>

    <div class="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
      <div class="fade-in">
        <div class="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
          <div class="w-2 h-2 rounded-full bg-green-400 pulse-dot"></div>
          <span class="text-sm text-gray-300">🚀 AI-Powered Marketing Automation</span>
        </div>
        <h1 class="text-5xl lg:text-7xl font-black leading-tight mb-6">
          One Scan.<br>
          <span class="gradient-text">Complete</span><br>
          Growth.
        </h1>
        <p class="text-gray-400 text-xl leading-relaxed mb-10 max-w-lg">
          The only all-in-one platform that <strong class="text-white">analyzes</strong>, <strong class="text-white">strategizes</strong>, <strong class="text-white">creates</strong>, and <strong class="text-white">automates</strong> your entire social media marketing.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 mb-12">
          <a href="/login" class="btn-glow gradient-primary font-bold px-8 py-4 rounded-2xl text-lg flex items-center gap-3 justify-center transition-all" style="color:#fff;">
            <i class="fas fa-search"></i>
            Scan My Website Free
          </a>
          <a href="/login" class="glass text-white font-semibold px-8 py-4 rounded-2xl text-lg flex items-center gap-3 justify-center hover:bg-white/10 transition-all">
            <i class="fas fa-play-circle"></i>
            View Demo
          </a>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex -space-x-2">
            <div class="w-9 h-9 rounded-full gradient-primary border-2 border-gray-950 flex items-center justify-center text-xs font-bold text-white">A</div>
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-gray-950 flex items-center justify-center text-xs font-bold">B</div>
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-teal-500 border-2 border-gray-950 flex items-center justify-center text-xs font-bold">C</div>
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-500 border-2 border-gray-950 flex items-center justify-center text-xs font-bold">+</div>
          </div>
          <div>
            <div class="flex items-center gap-1 text-yellow-400 text-sm">★★★★★</div>
            <div class="text-gray-400 text-sm">Loved by <strong class="text-white">12,400+</strong> businesses</div>
          </div>
        </div>
      </div>

      <!-- Hero visual -->
      <div class="relative hidden lg:block slide-up">
        <div class="float-anim glass rounded-3xl p-6 card-glow border border-cyan-500/20">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <div class="ml-2 text-xs text-gray-500 glass rounded-full px-3 py-1">socialstrategy.app/dashboard</div>
          </div>
          <div class="grid grid-cols-3 gap-3 mb-4">
            <div class="bg-gray-800 rounded-xl p-3 text-center">
              <div class="gradient-text font-black text-xl">89K</div>
              <div class="text-gray-500 text-xs">Reach</div>
            </div>
            <div class="bg-gray-800 rounded-xl p-3 text-center">
              <div class="gradient-text font-black text-xl">4.7%</div>
              <div class="text-gray-500 text-xs">Engagement</div>
            </div>
            <div class="bg-gray-800 rounded-xl p-3 text-center">
              <div class="gradient-text font-black text-xl">+38%</div>
              <div class="text-gray-500 text-xs">Growth</div>
            </div>
          </div>
          <div class="bg-gray-800 rounded-xl p-4 mb-4">
            <div class="text-xs text-gray-400 mb-3 font-semibold">Weekly Performance</div>
            <div class="flex items-end gap-2 h-16">
              <div class="flex-1 bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-sm" style="height:40%"></div>
              <div class="flex-1 bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-sm" style="height:60%"></div>
              <div class="flex-1 bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-sm" style="height:45%"></div>
              <div class="flex-1 bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-sm" style="height:80%"></div>
              <div class="flex-1 bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-sm" style="height:65%"></div>
              <div class="flex-1 bg-gradient-to-t from-purple-500 to-pink-600 rounded-t-sm opacity-80" style="height:95%"></div>
              <div class="flex-1 bg-gradient-to-t from-purple-500 to-pink-600 rounded-t-sm opacity-50" style="height:70%"></div>
            </div>
          </div>
          <div class="flex gap-2 flex-wrap">
            <span class="bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"><i class="fab fa-instagram"></i> IG</span>
            <span class="bg-blue-700 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"><i class="fab fa-facebook"></i> FB</span>
            <span class="bg-black text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"><i class="fab fa-tiktok"></i> TK</span>
            <span class="bg-red-700 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"><i class="fab fa-youtube"></i> YT</span>
            <span class="bg-sky-700 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"><i class="fab fa-twitter"></i> X</span>
            <span class="bg-blue-800 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"><i class="fab fa-linkedin"></i> LI</span>
          </div>
        </div>
        <div class="float-anim2 absolute -top-6 -right-6 glass rounded-2xl p-4 border border-green-500/30 shadow-lg">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <i class="fas fa-arrow-trend-up text-green-400 text-xs"></i>
            </div>
            <div>
              <div class="text-white text-sm font-bold">+127%</div>
              <div class="text-gray-400 text-xs">Engagement</div>
            </div>
          </div>
        </div>
        <div class="float-anim3 absolute -bottom-4 -left-4 glass rounded-2xl p-4 border border-purple-500/30 shadow-lg">
          <div class="flex items-center gap-2">
            <i class="fas fa-wand-magic-sparkles text-purple-400"></i>
            <div class="text-sm">
              <div class="text-white font-semibold">AI Content</div>
              <div class="text-purple-400 text-xs">4 weeks generated ✓</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats Bar -->
  <section class="border-y border-gray-800 bg-gray-900">
    <div class="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div><div class="gradient-text font-black text-3xl">12,400+</div><div class="text-gray-400 text-sm mt-1">Active Businesses</div></div>
      <div><div class="gradient-text font-black text-3xl">245M+</div><div class="text-gray-400 text-sm mt-1">Posts Published</div></div>
      <div><div class="gradient-text font-black text-3xl">8</div><div class="text-gray-400 text-sm mt-1">Platforms Supported</div></div>
      <div><div class="gradient-text font-black text-3xl">4.9★</div><div class="text-gray-400 text-sm mt-1">Average Rating</div></div>
    </div>
  </section>

  <!-- How It Works -->
  <section id="how-it-works" class="py-24 bg-gray-950">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <div class="inline-block glass rounded-full px-4 py-2 text-sm text-cyan-400 font-semibold mb-4">🎯 How It Works</div>
        <h2 class="text-4xl lg:text-5xl font-black mb-4">From <span class="gradient-text">URL</span> to Viral in <span class="gradient-text">Minutes</span></h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">No expertise needed. Our AI handles everything — analysis, strategy, content, scheduling.</p>
      </div>
      <div class="grid md:grid-cols-5 gap-6">
        ${['Analyze','Strategize','Create','Automate','Grow'].map((step, i) => {
          const icons = ['fas fa-search','fas fa-lightbulb','fas fa-paint-brush','fas fa-robot','fas fa-rocket']
          const descs = ['Enter your URL. AI scans SEO, branding & usability in 2 min.','Get custom growth strategies, pricing models & revenue plans.','AI generates 4 weeks of custom images, videos & captions.','Connect accounts. AI schedules & auto-posts at optimal times.','Track performance. Scale with data-driven insights.']
          const colors = ['from-cyan-500 to-blue-600','from-blue-500 to-indigo-600','from-indigo-500 to-purple-600','from-purple-500 to-pink-600','from-pink-500 to-rose-600']
          return `<div class="relative">
            <div class="glass rounded-2xl p-6 h-full hover:border-cyan-500/30 transition-all card-hover border border-gray-700/50">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br ${colors[i]} flex items-center justify-center mb-4">
                <i class="${icons[i]} text-white"></i>
              </div>
              <div class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Step ${i+1}</div>
              <h3 class="text-white font-bold text-lg mb-2">${step}</h3>
              <p class="text-gray-400 text-sm leading-relaxed">${descs[i]}</p>
            </div>
            ${i < 4 ? `<div class="hidden md:flex absolute top-1/2 -right-3 z-10 w-6 h-6 rounded-full gradient-primary items-center justify-center" style="transform:translateY(-50%)"><i class="fas fa-chevron-right text-white text-xs"></i></div>` : ''}
          </div>`
        }).join('')}
      </div>
    </div>
  </section>

  <!-- Features -->
  <section id="features" style="padding:96px 0;background:#111827;">
    <div style="max-width:1200px;margin:0 auto;padding:0 24px;">
      <div style="text-align:center;margin-bottom:60px;">
        <div style="display:inline-block;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:999px;padding:8px 18px;font-size:14px;color:#00E5FF;font-weight:600;margin-bottom:16px;">✨ Features</div>
        <h2 style="font-size:44px;font-weight:900;color:#fff;margin:0 0 16px;">Everything You Need to <span style="background:linear-gradient(135deg,#00E5FF,#7C3AED,#FF2D78);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Dominate</span></h2>
        <p style="color:#9ca3af;font-size:18px;max-width:600px;margin:0 auto;">One platform replaces 5+ expensive tools. No technical knowledge required.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;">
        ${[
          { icon: 'fas fa-search-plus', title: 'Business Intelligence', iconColor: '#00E5FF', iconBg: 'rgba(0,229,255,0.1)', iconBorder: 'rgba(0,229,255,0.2)', checkColor: '#00E5FF', items: ['SEO Analysis & Audit', 'Branding Review', 'Usability Report', 'Competitive Insights'] },
          { icon: 'fas fa-chart-line', title: 'Growth Strategy', iconColor: '#60A5FA', iconBg: 'rgba(96,165,250,0.1)', iconBorder: 'rgba(96,165,250,0.2)', checkColor: '#60A5FA', items: ['Custom Pricing Models', 'Revenue Projections', '30/60/90 Day Plans', 'Expansion Ideas'] },
          { icon: 'fas fa-images', title: 'AI Content Studio', iconColor: '#A78BFA', iconBg: 'rgba(167,139,250,0.1)', iconBorder: 'rgba(167,139,250,0.2)', checkColor: '#A78BFA', items: ['Image Generation', 'Video Creation (Sora-2)', 'Caption Writing', 'Hashtag Research'] },
          { icon: 'fas fa-clock', title: 'Automation Engine', iconColor: '#FF2D78', iconBg: 'rgba(255,45,120,0.1)', iconBorder: 'rgba(255,45,120,0.2)', checkColor: '#FF2D78', items: ['Smart Scheduling', 'Multi-Platform Publish', 'Queue Management', 'Auto-Retry Failed Posts'] },
          { icon: 'fas fa-chart-bar', title: 'Analytics Dashboard', iconColor: '#4ade80', iconBg: 'rgba(74,222,128,0.1)', iconBorder: 'rgba(74,222,128,0.2)', checkColor: '#4ade80', items: ['Engagement Tracking', 'Platform Comparison', 'Growth Monitoring', 'Best Time Analysis'] },
          { icon: 'fas fa-lock', title: 'Security & Privacy', iconColor: '#FB923C', iconBg: 'rgba(251,146,60,0.1)', iconBorder: 'rgba(251,146,60,0.2)', checkColor: '#FB923C', items: ['Bank-Level Encryption', 'GDPR Compliant', 'No Data Selling', 'Secure OAuth'] },
        ].map(f => `
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:24px;transition:all 0.25s;cursor:pointer;" onmouseover="this.style.transform='translateY(-4px)';this.style.borderColor='${f.iconBorder}'" onmouseout="this.style.transform='translateY(0)';this.style.borderColor='rgba(255,255,255,0.08)'">
            <div style="width:48px;height:48px;border-radius:14px;background:${f.iconBg};border:1px solid ${f.iconBorder};display:flex;align-items:center;justify-content:center;margin-bottom:18px;">
              <i class="${f.icon}" style="color:${f.iconColor};font-size:20px;"></i>
            </div>
            <h3 style="font-size:18px;font-weight:800;color:#fff;margin:0 0 14px;">${f.title}</h3>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
              ${f.items.map(item => `<li style="display:flex;align-items:center;gap:8px;font-size:13px;color:#9ca3af;"><i class="fas fa-check" style="color:${f.checkColor};font-size:11px;flex-shrink:0;"></i>${item}</li>`).join('')}
            </ul>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Platforms -->
  <section id="platforms" class="py-24 bg-gray-950">
    <div class="max-w-7xl mx-auto px-6 text-center">
      <div class="inline-block glass rounded-full px-4 py-2 text-sm text-cyan-400 font-semibold mb-4">📱 Supported Platforms</div>
      <h2 class="text-4xl lg:text-5xl font-black mb-4">Post to <span class="gradient-text">8 Platforms</span> Simultaneously</h2>
      <p class="text-gray-400 text-lg mb-14">One click. All platforms. Maximum reach.</p>
      <div class="grid grid-cols-4 md:grid-cols-8 gap-6 max-w-3xl mx-auto">
        ${[
          {icon:'fab fa-instagram', name:'Instagram', gradient:'from-pink-500 via-rose-500 to-orange-500'},
          {icon:'fab fa-facebook', name:'Facebook', gradient:'from-blue-600 to-blue-700'},
          {icon:'fab fa-tiktok', name:'TikTok', gradient:'from-gray-900 to-black'},
          {icon:'fab fa-youtube', name:'YouTube', gradient:'from-red-600 to-red-700'},
          {icon:'fab fa-twitter', name:'X (Twitter)', gradient:'from-sky-500 to-sky-600'},
          {icon:'fas fa-at', name:'Threads', gradient:'from-gray-700 to-gray-800'},
          {icon:'fab fa-linkedin', name:'LinkedIn', gradient:'from-blue-700 to-blue-800'},
          {icon:'fab fa-pinterest', name:'Pinterest', gradient:'from-red-700 to-red-800'}
        ].map(p => `
          <div class="platform-icon flex flex-col items-center gap-2 cursor-pointer group">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <i class="${p.icon} text-white text-2xl"></i>
            </div>
            <span class="text-gray-400 text-xs font-medium group-hover:text-white transition-colors">${p.name}</span>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="py-24 bg-gray-900">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-black mb-4">Loved by <span class="gradient-text">Thousands</span></h2>
        <p class="text-gray-400">Real results from real businesses.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        ${[
          {name:'Sarah M.', role:'E-commerce Owner', text:"SOCIAL STRATEGY tripled my engagement in 6 weeks. The AI content is so on-brand, my followers can't tell it's automated. Worth every penny.", rating:5, avatar:'SM'},
          {name:'Jake R.', role:'Digital Agency CEO', text:'We manage 15 clients from one dashboard now. What used to take our team 40 hours/week is done automatically. ROI is insane.', rating:5, avatar:'JR'},
          {name:'Priya K.', role:'Fitness Influencer', text:'The website analysis gave me insights I never had before. My strategy is completely transformed. 127% engagement increase!', rating:5, avatar:'PK'}
        ].map(t => `
          <div class="glass rounded-2xl p-6 card-hover border border-gray-700/50">
            <div class="flex text-yellow-400 mb-4">${'★'.repeat(t.rating)}</div>
            <p class="text-gray-300 text-sm leading-relaxed mb-6">"${t.text}"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-white">${t.avatar}</div>
              <div>
                <div class="text-white font-semibold text-sm">${t.name}</div>
                <div class="text-gray-400 text-xs">${t.role}</div>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-24 bg-gray-950 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10"></div>
    <div class="relative max-w-4xl mx-auto px-6 text-center">
      <h2 class="text-5xl lg:text-6xl font-black mb-6">Ready to <span class="gradient-text">Automate</span> Your Growth?</h2>
      <p class="text-gray-400 text-xl mb-10">Join 12,400+ businesses growing on autopilot. Free to start, no credit card required.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/login" class="gradient-primary font-bold px-10 py-5 rounded-2xl text-xl hover:opacity-90 transition-all shadow-lg" style="color:#fff;">
          <i class="fas fa-search mr-2"></i>Start Free Analysis
        </a>
        <a href="/pricing" class="glass text-white font-semibold px-10 py-5 rounded-2xl text-xl hover:bg-white/10 transition-all">
          <i class="fas fa-gem mr-2"></i>See Pricing
        </a>
      </div>
      <p class="text-gray-500 text-sm mt-6">✓ No credit card &nbsp;✓ Free tier forever &nbsp;✓ Cancel anytime</p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-gray-800 bg-gray-900 py-12">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
            ${footerLogo}
            <span style="font-weight:900;font-size:15px;color:#fff;">SOCIAL <span style="background:linear-gradient(135deg,#00E5FF,#FF2D78);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">STRATEGY</span></span>
          </div>
          <p class="text-gray-400 text-sm">Analyze. Strategize. Automate. Grow.</p>
          <p class="text-gray-500 text-xs mt-2">© 2026 Social Strategy</p>
        </div>
        <div>
          <h4 class="font-semibold text-white mb-3">Product</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a href="/analysis" class="hover:text-cyan-400">Website Analysis</a></li>
            <li><a href="/content-studio" class="hover:text-cyan-400">AI Content Studio</a></li>
            <li><a href="/scheduler" class="hover:text-cyan-400">Scheduler</a></li>
            <li><a href="/analytics" class="hover:text-cyan-400">Analytics</a></li>
            <li><a href="/pricing" class="hover:text-cyan-400">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-white mb-3">Company</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a href="#" class="hover:text-cyan-400">About Us</a></li>
            <li><a href="#" class="hover:text-cyan-400">Blog</a></li>
            <li><a href="#" class="hover:text-cyan-400">Careers</a></li>
            <li><a href="#" class="hover:text-cyan-400">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-white mb-3">Support</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a href="#" class="hover:text-cyan-400">Help Center</a></li>
            <li><a href="#" class="hover:text-cyan-400">Community</a></li>
            <li><a href="#" class="hover:text-cyan-400">Status</a></li>
            <li><a href="/login" class="hover:text-cyan-400">Sign In</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© 2026 SOCIAL STRATEGY — Your All-in-One Marketing Platform</p>
        <div class="flex gap-4 mt-4 md:mt-0">
          <a href="#" class="hover:text-cyan-400">Privacy Policy</a>
          <a href="#" class="hover:text-cyan-400">Terms of Service</a>
          <a href="#" class="hover:text-cyan-400">GDPR</a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>`
}
