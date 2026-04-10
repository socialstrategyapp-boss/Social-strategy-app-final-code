import { ssLogo } from './layout'

export function landingPage(): string {
  const heroLogo   = ssLogo(300)
  const navLogo    = ssLogo(46)
  const footerLogo = ssLogo(60)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SOCIAL STRATEGY – One Scan. Complete Growth.</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *{font-family:'Inter',sans-serif;box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}

    /* ── LIGHTER, RICHER BACKGROUND with purple/indigo depth ── */
    body{background:url('/assets/bg-neon-burst.jpg') center center / cover fixed, linear-gradient(145deg,#080420 0%,#0d0530 25%,#06122a 50%,#100525 75%,#080420 100%);color:#fff;overflow-x:hidden;min-height:100vh;}

    /* ── NEON GRID OVERLAY ── */
    body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
      background-image:linear-gradient(rgba(0,229,255,0.04) 1px,transparent 1px),
        linear-gradient(90deg,rgba(0,229,255,0.04) 1px,transparent 1px);
      background-size:50px 50px;}

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar{width:6px;}
    ::-webkit-scrollbar-track{background:#080420;}
    ::-webkit-scrollbar-thumb{background:linear-gradient(#FF2D78,#7C3AED);border-radius:3px;}

    /* ── GRADIENT TEXT HELPERS ── */
    .gt-cyan{background:linear-gradient(135deg,#00E5FF,#0070F3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .gt-pink{background:linear-gradient(135deg,#FF2D78,#C026D3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .gt-rainbow{background:linear-gradient(135deg,#00E5FF,#A78BFA,#FF2D78,#FFD600);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .gt-yellow{background:linear-gradient(135deg,#FFD600,#FF6B00);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

    /* ── NAVBAR ── */
    .navbar{position:fixed;top:0;left:0;right:0;z-index:100;
      background:rgba(8,4,32,0.95);backdrop-filter:blur(20px);
      border-bottom:1px solid rgba(0,229,255,0.18);}
    .navbar-inner{max-width:1400px;margin:0 auto;padding:0 20px;height:64px;
      display:flex;align-items:center;gap:12px;}
    .navbar-logo{flex-shrink:0;display:flex;align-items:center;gap:10px;text-decoration:none;}
    .nav-links{display:flex;align-items:center;gap:4px;flex:1 1 auto;min-width:0;}
    .nav-link{font-size:13px;font-weight:700;padding:7px 12px;border-radius:999px;
      text-decoration:none;transition:all .2s;border:1.5px solid transparent;white-space:nowrap;}
    .nl-features{color:#00E5FF;border-color:rgba(0,229,255,0.3);background:rgba(0,229,255,0.08);}
    .nl-features:hover{background:rgba(0,229,255,0.2);box-shadow:0 0 20px rgba(0,229,255,0.5);}
    .nl-how{color:#00ff88;border-color:rgba(0,255,136,0.3);background:rgba(0,255,136,0.08);}
    .nl-how:hover{background:rgba(0,255,136,0.2);box-shadow:0 0 20px rgba(0,255,136,0.5);}
    .nl-platforms{color:#A78BFA;border-color:rgba(167,139,250,0.3);background:rgba(167,139,250,0.08);}
    .nl-platforms:hover{background:rgba(167,139,250,0.2);box-shadow:0 0 20px rgba(167,139,250,0.5);}
    .nl-pricing{color:#FFD600;border-color:rgba(255,214,0,0.3);background:rgba(255,214,0,0.08);}
    .nl-pricing:hover{background:rgba(255,214,0,0.2);box-shadow:0 0 20px rgba(255,214,0,0.5);}
    .nav-auth{display:flex;align-items:center;gap:8px;flex-shrink:0;margin-left:auto;}
    .btn-signin{display:inline-flex;align-items:center;justify-content:center;gap:6px;
      font-size:13px;font-weight:800;padding:9px 20px;border-radius:999px;
      text-decoration:none;white-space:nowrap;transition:all .25s;
      color:#fff;border:2px solid #00E5FF;
      background:linear-gradient(135deg,rgba(0,229,255,0.15),rgba(0,112,243,0.1));
      box-shadow:0 0 14px rgba(0,229,255,0.4),inset 0 1px 0 rgba(255,255,255,0.15);
      text-shadow:0 0 10px rgba(0,229,255,0.8);}
    .btn-signin:hover{background:linear-gradient(135deg,rgba(0,229,255,0.28),rgba(0,112,243,0.2));box-shadow:0 0 28px rgba(0,229,255,0.65);transform:translateY(-2px);}
    .btn-start-free{display:inline-flex;align-items:center;gap:6px;
      background:linear-gradient(135deg,#FF2D78,#C026D3,#7C3AED);
      color:#fff;font-size:13px;font-weight:800;padding:9px 20px;border-radius:999px;
      text-decoration:none;white-space:nowrap;border:1px solid rgba(255,255,255,0.2);
      box-shadow:0 0 18px rgba(255,45,120,0.5),inset 0 1px 0 rgba(255,255,255,0.2);
      transition:all .25s;}
    .btn-start-free:hover{transform:translateY(-2px);box-shadow:0 0 32px rgba(255,45,120,0.8);}

    /* ── MOBILE NAVBAR (≤ 700px): hide logo & nav, show 2 compact buttons only ── */
    @media(max-width:700px){
      .navbar-logo{ display:none!important; }
      .nav-links{ display:none!important; }
      .navbar-inner{ justify-content:center; gap:12px; padding:0 16px; }
      .nav-auth{ margin-left:0; gap:12px; }
      .btn-signin{ font-size:13px!important; padding:9px 18px!important; min-width:0!important; }
      .btn-start-free{ font-size:13px!important; padding:9px 18px!important; min-width:0!important; }
    }

    /* ── CTA BUTTONS ── */
    .btn-scan{display:inline-flex;align-items:center;justify-content:center;gap:10px;
      background:linear-gradient(135deg,#00E5FF,#0070F3,#7C3AED);color:#fff;
      font-weight:800;font-size:18px;padding:20px 40px;border-radius:16px;text-decoration:none;
      box-shadow:0 0 32px rgba(0,229,255,0.6),0 0 60px rgba(0,112,243,0.3);transition:all .25s;}
    .btn-scan:hover{transform:translateY(-3px);box-shadow:0 0 52px rgba(0,229,255,0.85);}
    .btn-demo{display:inline-flex;align-items:center;justify-content:center;gap:10px;
      background:linear-gradient(135deg,rgba(0,255,136,0.18),rgba(0,229,255,0.12));
      color:#00ff88;font-weight:900;font-size:18px;
      padding:20px 44px;border-radius:16px;text-decoration:none;
      border:2.5px solid #00ff88;
      box-shadow:0 0 28px rgba(0,255,136,0.5),0 0 55px rgba(0,255,136,0.2),inset 0 1px 0 rgba(255,255,255,0.15);
      text-shadow:0 0 12px rgba(0,255,136,0.8);
      transition:all .25s;}
    .btn-demo:hover{background:linear-gradient(135deg,#00ff88,#00E5FF);color:#000;border-color:transparent;box-shadow:0 0 55px rgba(0,255,136,0.9),0 0 90px rgba(0,255,136,0.4);transform:translateY(-3px);}
    .btn-cta-main{display:inline-flex;align-items:center;justify-content:center;gap:10px;
      background:linear-gradient(135deg,#00E5FF,#0070F3,#7C3AED);color:#fff;
      font-weight:800;font-size:19px;padding:22px 44px;border-radius:999px;text-decoration:none;
      box-shadow:0 0 32px rgba(0,229,255,0.5);transition:all .25s;}
    .btn-cta-main:hover{transform:translateY(-3px);box-shadow:0 0 52px rgba(0,229,255,0.75);}
    .btn-pricing-cta{display:inline-flex;align-items:center;justify-content:center;gap:10px;
      background:rgba(255,214,0,0.08);color:#FFD600;font-weight:800;font-size:19px;
      padding:22px 44px;border-radius:999px;text-decoration:none;
      border:2px solid #FFD600;box-shadow:0 0 22px rgba(255,214,0,0.35);transition:all .25s;}
    .btn-pricing-cta:hover{background:linear-gradient(135deg,#FFD600,#FF6B00);color:#000;border-color:transparent;box-shadow:0 0 46px rgba(255,214,0,0.75);}

    /* ── NEON BULLET POINT ── */
    .neon-bullet{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}

    /* ── FEATURE TILE ── */
    .feature-tile{background:rgba(255,255,255,0.04);border-radius:22px;padding:32px;
      position:relative;overflow:hidden;transition:all .25s;cursor:default;}
    .feature-tile:hover{transform:translateY(-7px);}

    /* ── HOW IT WORKS STEP CARD ── */
    .step-card{border-radius:22px;padding:36px 28px;position:relative;overflow:hidden;transition:all .3s;cursor:default;}
    .step-card:hover{transform:translateY(-8px);}

    /* ── HERO RESPONSIVE ── */
    .hero-social-text{font-size:clamp(36px,7vw,100px);font-weight:900;letter-spacing:clamp(6px,1.5vw,24px);text-transform:uppercase;line-height:1;
      background:linear-gradient(135deg,#00E5FF 0%,#A78BFA 60%,#ffffff 100%);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
      filter:drop-shadow(0 0 24px rgba(0,229,255,0.8)) drop-shadow(0 0 50px rgba(167,139,250,0.5));
      margin-bottom:20px;overflow:hidden;max-width:100%;}
    .hero-strategy-text{font-size:clamp(36px,7vw,100px);font-weight:900;letter-spacing:clamp(6px,1.5vw,24px);text-transform:uppercase;line-height:1;
      background:linear-gradient(135deg,#FF2D78 0%,#C026D3 50%,#FFD600 100%);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
      filter:drop-shadow(0 0 24px rgba(255,45,120,0.8)) drop-shadow(0 0 50px rgba(255,214,0,0.4));
      margin-bottom:14px;overflow:hidden;max-width:100%;}
    .hero-logo-wrap{width:clamp(200px,30vw,300px);height:clamp(200px,30vw,300px);margin:0 auto;}

    /* ── PLATFORM CARD ── */
    .plat-card{display:flex;flex-direction:column;align-items:center;gap:14px;cursor:pointer;padding:16px 8px;border-radius:18px;transition:all .25s;border:1.5px solid rgba(255,255,255,0.06);}
    .plat-card:hover{transform:translateY(-8px);background:rgba(255,255,255,0.04);}

    /* ── TESTIMONIAL CARD ── */
    .testi-card{background:rgba(255,255,255,0.04);border-radius:22px;padding:32px;
      position:relative;overflow:hidden;transition:all .25s;}
    .testi-card:hover{transform:translateY(-5px);}

    /* ── ANIMATIONS ── */
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
    @keyframes fadeIn{to{opacity:1}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes neonPulse{0%,100%{opacity:0.7}50%{opacity:1}}
    .float-a{animation:float 6s ease-in-out infinite;}
    .float-b{animation:float 8s ease-in-out infinite 2s;}
    .float-c{animation:float 7s ease-in-out infinite 1s;}
    .fade-in{animation:fadeIn .9s ease-out forwards;opacity:0;}
    .pulse-dot{animation:pulse 2s infinite;}
  </style>
</head>
<body>

<!-- ══════════════════════════════════════════
     NAVBAR
══════════════════════════════════════════ -->
<nav class="navbar">
  <div class="navbar-inner">
    <!-- Logo -->
    <a href="/" class="navbar-logo">
      <div style="position:relative;display:inline-block;">
        <!-- neon border ring matching logo colours -->
        <div style="position:absolute;inset:-4px;border-radius:18px;
          background:linear-gradient(135deg,#3dd4e8,#1ab8cc,#ff4fa0,#e8006a,#3dd4e8);
          padding:3px;border-radius:18px;z-index:0;
          box-shadow:0 0 16px rgba(61,212,232,0.7),0 0 28px rgba(255,79,160,0.5);
          animation:neonPulse 2.5s ease-in-out infinite;"></div>
        <div style="position:relative;z-index:1;filter:drop-shadow(0 0 12px rgba(0,229,255,0.6)) drop-shadow(0 0 24px rgba(255,45,120,0.4));">${navLogo}</div>
      </div>
      <div style="line-height:1.2;">
        <div style="font-size:14px;font-weight:900;color:#fff;letter-spacing:2px;">SOCIAL</div>
        <div style="font-size:14px;font-weight:900;letter-spacing:2px;background:linear-gradient(135deg,#00E5FF,#FF2D78,#FFD600);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">STRATEGY</div>
      </div>
    </a>

    <!-- Coloured nav links -->
    <div class="nav-links">
      <a href="#features"     class="nav-link nl-features">✨ Features</a>
      <a href="#how-it-works" class="nav-link nl-how">🎯 How It Works</a>
      <a href="#platforms"    class="nav-link nl-platforms">📱 Platforms</a>
      <a href="/pricing"      class="nav-link nl-pricing">💎 Pricing</a>
    </div>

    <!-- Auth buttons -->
    <div class="nav-auth">
      <a href="/login" class="btn-signin">🔑 Sign In</a>
      <a href="/login" class="btn-start-free">
        🚀 Start Free
      </a>
    </div>
  </div>
</nav>

<!-- ══════════════════════════════════════════
     HERO
══════════════════════════════════════════ -->
<section class="hero-section" style="min-height:100vh;padding-top:72px;display:flex;align-items:center;justify-content:center;text-align:center;position:relative;overflow:clip;
  background:radial-gradient(ellipse at 20% 30%,rgba(255,45,120,0.25) 0%,transparent 50%),
             radial-gradient(ellipse at 80% 20%,rgba(0,229,255,0.22) 0%,transparent 50%),
             radial-gradient(ellipse at 50% 85%,rgba(124,58,237,0.28) 0%,transparent 55%),
             radial-gradient(ellipse at 85% 70%,rgba(192,38,211,0.16) 0%,transparent 40%),
             radial-gradient(ellipse at 15% 75%,rgba(0,255,136,0.12) 0%,transparent 40%);">

  <!-- Floating neon orbs -->
  <div style="position:absolute;top:12%;left:6%;width:350px;height:350px;border-radius:50%;background:radial-gradient(circle,rgba(255,45,120,0.18),transparent 70%);filter:blur(55px);pointer-events:none;"></div>
  <div style="position:absolute;top:8%;right:6%;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(0,229,255,0.18),transparent 70%);filter:blur(55px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:12%;left:38%;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.18),transparent 70%);filter:blur(65px);pointer-events:none;"></div>

  <div style="position:relative;z-index:1;max-width:960px;margin:0 auto;padding:60px 20px 80px;" class="fade-in">

    <!-- ── "SOCIAL" ABOVE LOGO ── -->
    <div class="hero-social-text">SOCIAL</div>

    <!-- ── LOGO with neon border ── -->
    <div style="display:flex;justify-content:center;margin-bottom:16px;">
      <div class="hero-logo-wrap" style="position:relative;">
        <!-- outer neon border ring -->
        <div style="position:absolute;inset:-6px;border-radius:52px;
          background:linear-gradient(135deg,#3dd4e8 0%,#1ab8cc 25%,#ff4fa0 50%,#e8006a 75%,#3dd4e8 100%);
          filter:blur(5px) brightness(1.3);
          box-shadow:0 0 32px rgba(61,212,232,0.7),0 0 64px rgba(255,79,160,0.5);
          animation:neonPulse 2.5s ease-in-out infinite;z-index:0;"></div>
        <div style="position:absolute;inset:-3px;border-radius:50px;border:2px solid rgba(61,212,232,0.5);z-index:1;"></div>
        <!-- Pulsing halos -->
        <div style="position:absolute;inset:-25px;border-radius:50%;background:radial-gradient(circle,rgba(0,229,255,0.18) 0%,rgba(255,45,120,0.1) 50%,transparent 75%);filter:blur(18px);animation:pulse 3s ease-in-out infinite;z-index:0;"></div>
        <div style="position:relative;z-index:2;filter:drop-shadow(0 0 40px rgba(0,229,255,0.6)) drop-shadow(0 0 80px rgba(255,45,120,0.4)) drop-shadow(0 20px 40px rgba(0,0,0,0.7));width:100%;height:100%;">
          <div style="width:100%;height:100%;">${heroLogo.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"')}</div>
        </div>
      </div>
    </div>

    <!-- ── "STRATEGY" BELOW LOGO ── -->
    <div class="hero-strategy-text">STRATEGY</div>

    <!-- tagline -->
    <div style="font-size:clamp(10px,1.3vw,13px);font-weight:700;letter-spacing:2px;color:rgba(0,229,255,0.8);text-transform:uppercase;margin-bottom:36px;line-height:1.8;">
      Strategy Genius &nbsp;•&nbsp; Auto-Create &nbsp;•&nbsp; Auto-Schedule &nbsp;•&nbsp; Auto-Post
    </div>

    <!-- ── HEADLINE ── -->
    <h1 style="font-size:clamp(36px,6vw,82px);font-weight:900;line-height:1.05;margin-bottom:24px;letter-spacing:-1px;">
      One Scan.<br>
      <span style="background:linear-gradient(135deg,#00E5FF,#FF2D78,#FFD600);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Complete</span><br>
      Growth.
    </h1>

    <!-- ── DESCRIPTION ── -->
    <p style="color:rgba(255,255,255,0.7);font-size:clamp(16px,2vw,20px);line-height:1.8;max-width:640px;margin:0 auto 44px;">
      The only all-in-one platform that
      <strong style="color:#00E5FF;text-shadow:0 0 12px rgba(0,229,255,0.6);">analyzes</strong>,
      <strong style="color:#FF2D78;text-shadow:0 0 12px rgba(255,45,120,0.6);">strategizes</strong>,
      <strong style="color:#A78BFA;text-shadow:0 0 12px rgba(167,139,250,0.6);">creates</strong>, and
      <strong style="color:#00ff88;text-shadow:0 0 12px rgba(0,255,136,0.6);">automates</strong>
      your entire social media marketing.
    </p>

    <!-- ── CTA BUTTONS ── -->
    <div style="display:flex;gap:24px;justify-content:center;flex-wrap:wrap;margin-bottom:56px;">
      <a href="/login" class="btn-scan">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="white" stroke-width="2.5"/><path d="M21 21l-4.35-4.35" stroke="white" stroke-width="3" stroke-linecap="round"/></svg>
        Scan My Website Free
      </a>
      <a href="/login" class="btn-demo">
        <svg width="20" height="20" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="#00ff88"/></svg>
        ▶ View Demo
      </a>
    </div>

    <!-- ── SOCIAL PROOF ── -->
    <div style="display:flex;align-items:center;justify-content:center;gap:18px;">
      <div style="display:flex;">
        ${['A','B','C','+'].map((l,i)=>{
          const g=['linear-gradient(135deg,#00E5FF,#0070F3)','linear-gradient(135deg,#A78BFA,#FF2D78)','linear-gradient(135deg,#00ff88,#00E5FF)','linear-gradient(135deg,#FFD600,#FF6B00)']
          return `<div style="width:40px;height:40px;border-radius:50%;background:${g[i]};border:2.5px solid #080420;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#fff;margin-left:${i?'-12px':'0'};box-shadow:0 0 12px rgba(0,229,255,0.4);">${l}</div>`
        }).join('')}
      </div>
      <div style="text-align:left;">
        <div style="color:#FFD600;font-size:16px;letter-spacing:2px;text-shadow:0 0 10px rgba(255,214,0,0.6);">★★★★★</div>
        <div style="color:rgba(255,255,255,0.6);font-size:13px;">Loved by <strong style="color:#fff;text-shadow:0 0 8px rgba(255,255,255,0.4);">12,400+</strong> businesses</div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     STATS BAR  –  12,400 | 245M side-by-side, 8 platforms centred below
══════════════════════════════════════════ -->
<section style="position:relative;z-index:1;
  background:linear-gradient(135deg,rgba(0,229,255,0.07),rgba(124,58,237,0.07),rgba(255,45,120,0.07));
  border-top:2px solid rgba(0,229,255,0.2);border-bottom:2px solid rgba(255,45,120,0.2);padding:64px 0;">
  <div style="max-width:1100px;margin:0 auto;padding:0 28px;">

    <!-- Top row: 12,400 and 245M side by side -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;text-align:center;margin-bottom:48px;">
      ${[['12,400+','Active Businesses Using Social Strategy','#00E5FF'],['245M+','Posts Published Across All Platforms','#FF2D78']].map(([v,l,c])=>`
        <div style="padding:28px 24px;border-radius:20px;background:rgba(255,255,255,0.03);border:1px solid ${c}33;box-shadow:0 0 30px ${c}18;">
          <div style="font-size:clamp(44px,5vw,72px);font-weight:900;background:linear-gradient(135deg,${c},#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:12px;text-shadow:none;line-height:1;">${v}</div>
          <div style="color:rgba(255,255,255,0.7);font-size:16px;font-weight:600;line-height:1.4;">${l}</div>
        </div>`).join('')}
    </div>

    <!-- Bottom centred: 8 platforms -->
    <div style="display:flex;justify-content:center;">
      <div style="padding:28px 48px;border-radius:20px;background:rgba(255,255,255,0.03);border:1px solid rgba(167,139,250,0.3);box-shadow:0 0 30px rgba(167,139,250,0.15);text-align:center;min-width:320px;">
        <div style="font-size:clamp(44px,5vw,72px);font-weight:900;background:linear-gradient(135deg,#A78BFA,#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:12px;line-height:1;">8</div>
        <div style="color:rgba(255,255,255,0.7);font-size:16px;font-weight:600;">Social Media Platforms Supported</div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     HOW IT WORKS  –  100% bigger, stacked steps, neon
══════════════════════════════════════════ -->
<section id="how-it-works" style="padding:130px 0;background:linear-gradient(180deg,rgba(7,2,32,0.82) 0%,rgba(10,3,48,0.82) 50%,rgba(6,2,32,0.82) 100%);position:relative;z-index:1;">
  <div style="max-width:900px;margin:0 auto;padding:0 28px;">

    <!-- Section header -->
    <div style="text-align:center;margin-bottom:80px;">
      <div style="display:inline-block;background:rgba(0,229,255,0.1);border:2px solid rgba(0,229,255,0.4);border-radius:999px;padding:12px 28px;font-size:15px;color:#00E5FF;font-weight:800;margin-bottom:22px;
        box-shadow:0 0 24px rgba(0,229,255,0.25),inset 0 0 20px rgba(0,229,255,0.08);">🎯 How It Works</div>
      <h2 style="font-size:clamp(38px,5vw,64px);font-weight:900;margin-bottom:16px;">From <span class="gt-cyan">URL</span> to Viral in <span class="gt-pink">Minutes</span></h2>
      <p style="color:rgba(255,255,255,0.6);font-size:19px;max-width:560px;margin:0 auto;">No expertise needed. Our AI handles everything.</p>
    </div>

    <!-- 5 Steps stacked vertically -->
    <div style="display:flex;flex-direction:column;gap:28px;">
      ${['Analyze','Strategize','Create','Automate','Grow'].map((step,i)=>{
        const svgs=[
          `<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="white" stroke-width="2.5"/><path d="M21 21l-4 4" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>`,
          `<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="white" stroke-width="2"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`,
          `<svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/></svg>`,
          `<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="white" stroke-width="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`,
          `<svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M12 2L8 8H2l5 4.5L4.5 20 12 16l7.5 4L17 12.5 22 8h-6L12 2z"/></svg>`
        ]
        const cols=[['#00E5FF','#0070F3'],['#0070F3','#7C3AED'],['#A78BFA','#FF2D78'],['#FF2D78','#C026D3'],['#FFD600','#FF6B00']]
        const descs=['Enter your website URL. Our AI scans your SEO, branding, content quality and usability in under 2 minutes — delivering a full business intelligence report.','Get a fully custom growth strategy built for YOUR business: pricing models, revenue projections, 30/60/90-day expansion plans, and competitor gap analysis.','AI generates 4 weeks of ready-to-post content: platform-specific images, short-form videos, scroll-stopping captions, and trending hashtag research.','Connect your social accounts. AI automatically schedules and posts at the optimal time for each platform — while you focus on running your business.','Track real-time performance across all 8 platforms. Get AI-powered insights on what is working, what is not, and how to scale your results further.']
        const [c1,c2]=cols[i]
        return `<div style="display:flex;align-items:flex-start;gap:28px;
          background:linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.03) 100%);
          border:2px solid ${c1}55;border-radius:22px;padding:36px 32px;
          box-shadow:0 8px 40px ${c1}22,0 2px 0 ${c1}33,inset 0 1px 0 rgba(255,255,255,0.1),inset 0 0 40px ${c1}08;
          transition:all .3s;position:relative;overflow:hidden;width:100%;box-sizing:border-box;"
          onmouseover="this.style.borderColor='${c1}99';this.style.boxShadow='0 20px 60px ${c1}44,0 2px 0 ${c1}55,inset 0 1px 0 rgba(255,255,255,0.15),inset 0 0 50px ${c1}14';this.style.transform='translateX(8px)'"
          onmouseout="this.style.borderColor='${c1}55';this.style.boxShadow='0 8px 40px ${c1}22,0 2px 0 ${c1}33,inset 0 1px 0 rgba(255,255,255,0.1),inset 0 0 40px ${c1}08';this.style.transform=''">
          <div style="position:absolute;top:0;left:0;bottom:0;width:5px;background:linear-gradient(180deg,${c1},${c2});border-radius:22px 0 0 22px;box-shadow:0 0 14px ${c1}88;"></div>
          <div style="width:72px;height:72px;border-radius:20px;background:linear-gradient(135deg,${c1},${c2});display:flex;align-items:center;justify-content:center;flex-shrink:0;
            box-shadow:0 6px 24px ${c1}88,0 0 0 2px ${c1}44,inset 0 2px 0 rgba(255,255,255,0.25);
            margin-left:8px;">${svgs[i]}</div>
          <div style="flex:1;min-width:0;">
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px;flex-wrap:wrap;">
              <span style="font-size:12px;color:${c1};font-weight:900;text-transform:uppercase;letter-spacing:1.5px;
                background:${c1}22;border:1.5px solid ${c1}66;padding:5px 14px;border-radius:999px;
                box-shadow:0 0 12px ${c1}44;white-space:nowrap;">Step ${i+1}</span>
              <h3 style="color:#ffffff;font-weight:900;font-size:24px;text-shadow:0 0 20px ${c1}66,0 2px 4px rgba(0,0,0,0.5);margin:0;">${step}</h3>
            </div>
            <p style="color:rgba(255,255,255,0.82);font-size:16px;line-height:1.8;margin:0;">${descs[i]}</p>
          </div>
        </div>`
      }).join('')}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     FEATURES / TILES  –  3-col, neon treatment
══════════════════════════════════════════ -->
<section id="features" style="padding:130px 0;background:linear-gradient(180deg,#0a0330 0%,#080220 100%);position:relative;z-index:1;">
  <div style="position:absolute;top:30%;left:50%;transform:translateX(-50%);width:800px;height:600px;background:radial-gradient(ellipse,rgba(124,58,237,0.12),transparent 70%);filter:blur(70px);pointer-events:none;"></div>
  <div style="max-width:1300px;margin:0 auto;padding:0 28px;position:relative;">
    <div style="text-align:center;margin-bottom:80px;">
      <div style="display:inline-block;background:rgba(255,45,120,0.1);border:2px solid rgba(255,45,120,0.45);border-radius:999px;padding:12px 28px;font-size:15px;color:#FF2D78;font-weight:800;margin-bottom:22px;
        box-shadow:0 0 24px rgba(255,45,120,0.2),inset 0 0 20px rgba(255,45,120,0.06);">✨ Features</div>
      <h2 style="font-size:clamp(36px,5vw,60px);font-weight:900;margin-bottom:16px;">Everything You Need to <span class="gt-rainbow">Dominate</span></h2>
      <p style="color:rgba(255,255,255,0.65);font-size:18px;max-width:560px;margin:0 auto;">One platform replaces 5+ expensive tools.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:28px;">
      ${[
        {c1:'#00E5FF',c2:'#0070F3',title:'Business Intelligence',svg:'<circle cx="11" cy="11" r="7" stroke="white" stroke-width="2.5"/><path d="M21 21l-4.35-4.35" stroke="white" stroke-width="3" stroke-linecap="round"/>',items:['SEO Analysis & Audit','Branding Review','Usability Report','Competitive Insights']},
        {c1:'#00ff88',c2:'#00E5FF',title:'Growth Strategy',svg:'<path d="M3 17l4-8 4 5 3-3 4 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',items:['Custom Pricing Models','Revenue Projections','30/60/90 Day Plans','Expansion Ideas']},
        {c1:'#A78BFA',c2:'#FF2D78',title:'AI Content Studio',svg:'<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" fill="white"/>',items:['Image Generation','Video Creation (Sora-2)','Caption Writing','Hashtag Research']},
        {c1:'#FF2D78',c2:'#C026D3',title:'Automation Engine',svg:'<rect x="3" y="11" width="18" height="11" rx="2" stroke="white" stroke-width="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="white" stroke-width="2" stroke-linecap="round"/>',items:['Smart Scheduling','Multi-Platform Publish','Queue Management','Auto-Retry Failed Posts']},
        {c1:'#FFD600',c2:'#FF6B00',title:'Analytics Dashboard',svg:'<rect x="3" y="12" width="4" height="9" rx="1" fill="white" opacity="0.6"/><rect x="10" y="7" width="4" height="14" rx="1" fill="white" opacity="0.8"/><rect x="17" y="3" width="4" height="18" rx="1" fill="white"/>',items:['Engagement Tracking','Platform Comparison','Growth Monitoring','Best Time Analysis']},
        {c1:'#4ade80',c2:'#059669',title:'Security & Privacy',svg:'<rect x="5" y="11" width="14" height="11" rx="2" stroke="white" stroke-width="2"/><path d="M8 11V7a4 4 0 018 0v4" stroke="white" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="16" r="1.5" fill="white"/>',items:['Bank-Level Encryption','GDPR Compliant','No Data Selling','Secure OAuth']},
      ].map(f=>`
        <div class="feature-tile" style="border:2px solid ${f.c1}28;box-shadow:0 8px 40px ${f.c1}0a,inset 0 0 30px ${f.c1}06;"
          onmouseover="this.style.boxShadow='0 20px 60px ${f.c1}38,inset 0 0 40px ${f.c1}10';this.style.borderColor='${f.c1}55'"
          onmouseout="this.style.boxShadow='0 8px 40px ${f.c1}0a,inset 0 0 30px ${f.c1}06';this.style.borderColor='${f.c1}28'">
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${f.c1},${f.c2});border-radius:22px 22px 0 0;box-shadow:0 0 12px ${f.c1}88;"></div>
          <div style="width:64px;height:64px;border-radius:20px;background:linear-gradient(135deg,${f.c1},${f.c2});display:flex;align-items:center;justify-content:center;margin-bottom:24px;box-shadow:0 8px 28px ${f.c1}66;">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">${f.svg}</svg>
          </div>
          <h3 style="font-size:20px;font-weight:800;color:#fff;margin-bottom:20px;text-shadow:0 0 20px ${f.c1}33;">${f.title}</h3>
          <ul style="list-style:none;display:flex;flex-direction:column;gap:14px;">
            ${f.items.map(it=>`<li style="display:flex;align-items:center;gap:12px;font-size:14.5px;color:rgba(255,255,255,0.75);">
              <span class="neon-bullet" style="background:linear-gradient(135deg,${f.c1},${f.c2});box-shadow:0 0 12px ${f.c1}77;">
                <svg width="11" height="9" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.8 2.8L9 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>${it}</li>`).join('')}
          </ul>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     PLATFORMS  –  2 rows of 4, brand neon colours, no cutoff
══════════════════════════════════════════ -->
<section id="platforms" style="padding:130px 0;background:linear-gradient(180deg,#080220 0%,#070318 100%);position:relative;z-index:1;">
  <div style="max-width:1100px;margin:0 auto;padding:0 40px;text-align:center;">
    <div style="display:inline-block;background:rgba(0,229,255,0.09);border:2px solid rgba(0,229,255,0.35);border-radius:999px;padding:12px 28px;font-size:15px;color:#00E5FF;font-weight:800;margin-bottom:22px;
      box-shadow:0 0 22px rgba(0,229,255,0.2);">📱 Supported Platforms</div>
    <h2 style="font-size:clamp(30px,4vw,52px);font-weight:900;margin-bottom:16px;">Post to <span class="gt-rainbow">8 Platforms</span> Simultaneously</h2>
    <p style="color:rgba(255,255,255,0.65);font-size:18px;margin-bottom:64px;">One click. All platforms. Maximum reach.</p>

    <!-- 2 rows × 4 — ULTRA NEON treatment -->
    <style>
      @keyframes neonRingPulse{0%,100%{opacity:0.55;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}
      @keyframes neonRingPulse2{0%,100%{opacity:0.3;transform:scale(1)}50%{opacity:0.75;transform:scale(1.1)}}
      @keyframes neonRingPulse3{0%,100%{opacity:0.15;transform:scale(1)}50%{opacity:0.5;transform:scale(1.16)}}
      @keyframes iconFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.03)}}
      @keyframes neonFlicker{0%,100%{opacity:1}92%{opacity:1}93%{opacity:0.6}94%{opacity:1}96%{opacity:0.8}97%{opacity:1}}
      @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(400%)}}
      @keyframes neonCardGlow{0%,100%{box-shadow:0 0 28px var(--gc),inset 0 0 22px var(--gci)}50%{box-shadow:0 0 50px var(--gc),0 0 80px var(--gc2),inset 0 0 35px var(--gci)}}
      @keyframes badgePulse{0%,100%{transform:scale(1);opacity:0.85}50%{transform:scale(1.1);opacity:1}}

      .plat-neon-card{
        display:flex;flex-direction:column;align-items:center;gap:16px;
        padding:26px 14px 22px;border-radius:24px;cursor:pointer;position:relative;overflow:hidden;
        transition:all .35s cubic-bezier(.4,0,.2,1);
        background:linear-gradient(160deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015));
        backdrop-filter:blur(4px);
      }
      .plat-neon-card::before{
        content:'';position:absolute;inset:0;border-radius:24px;
        background:linear-gradient(135deg,rgba(255,255,255,0.08) 0%,transparent 50%,rgba(255,255,255,0.02) 100%);
        pointer-events:none;
      }
      /* scanline sweep */
      .plat-neon-card::after{
        content:'';position:absolute;left:0;right:0;height:30%;
        background:linear-gradient(180deg,transparent,rgba(255,255,255,0.04),transparent);
        animation:scanline 4s linear infinite;pointer-events:none;
      }
      .plat-neon-card:hover{transform:translateY(-10px) scale(1.04);}
      .plat-neon-card:hover .plat-icon-wrap{animation:iconFloat 1.6s ease-in-out infinite;}
      .plat-neon-card:hover .plat-icon-tile{animation:neonFlicker 3s ease-in-out infinite;}

      .plat-icon-wrap{position:relative;display:inline-block;transition:all .35s;}

      /* 3 concentric neon rings */
      .plat-ring-1{position:absolute;inset:-6px;border-radius:28px;border:2.5px solid;
        animation:neonRingPulse 2.2s ease-in-out infinite;pointer-events:none;}
      .plat-ring-2{position:absolute;inset:-13px;border-radius:33px;border:1.5px solid;
        animation:neonRingPulse2 2.2s ease-in-out infinite 0.7s;pointer-events:none;}
      .plat-ring-3{position:absolute;inset:-21px;border-radius:40px;border:1px solid;
        animation:neonRingPulse3 2.2s ease-in-out infinite 1.4s;pointer-events:none;}

      /* floor radial bloom */
      .plat-bloom{position:absolute;width:200%;height:200%;top:50%;left:50%;
        transform:translate(-50%,-50%);border-radius:50%;filter:blur(28px);
        animation:neonRingPulse 3s ease-in-out infinite 0.5s;pointer-events:none;z-index:0;opacity:0.6;}

      .plat-icon-tile{
        position:relative;z-index:2;width:92px;height:92px;border-radius:28px;
        display:flex;align-items:center;justify-content:center;overflow:hidden;
        transition:all .3s;
      }
      /* gloss overlay */
      .plat-icon-tile::after{
        content:'';position:absolute;top:0;left:0;right:0;height:50%;border-radius:28px 28px 0 0;
        background:linear-gradient(180deg,rgba(255,255,255,0.22),transparent);pointer-events:none;
      }

      .plat-name{
        font-size:13.5px;font-weight:900;letter-spacing:1px;text-align:center;
        text-transform:uppercase;position:relative;z-index:2;
      }
      /* neon label badge */
      .plat-badge{
        display:inline-block;padding:3px 10px;border-radius:999px;
        font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;
        border:1px solid;position:relative;z-index:2;
        animation:badgePulse 2.5s ease-in-out infinite;
      }
    </style>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;width:100%;max-width:920px;margin:0 auto;box-sizing:border-box;">
      ${[
        {
          name:'Instagram',
          bg:'linear-gradient(135deg,#405DE6,#833ab4 30%,#C13584 55%,#fd1d1d 75%,#fcb045)',
          glow:'#fd1d1d', gc:'rgba(253,29,29,0.45)', gci:'rgba(253,29,29,0.06)',
          gc2:'rgba(252,176,69,0.25)', nameCol:'#ff8c42', badgeCol:'#fcb045', badgeBg:'rgba(252,176,69,0.12)',
          iconFill:'white',
          d:'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
        },
        {
          name:'TikTok',
          bg:'linear-gradient(135deg,#010101,#111,#1a1a2e)',
          glow:'#69C9D0', gc:'rgba(105,201,208,0.45)', gci:'rgba(105,201,208,0.06)',
          gc2:'rgba(254,44,85,0.2)', nameCol:'#69C9D0', badgeCol:'#69C9D0', badgeBg:'rgba(105,201,208,0.1)',
          iconFill:'white',
          d:'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.23 8.23 0 004.84 1.56V6.8a4.85 4.85 0 01-1.07-.11z'
        },
        {
          name:'Facebook',
          bg:'linear-gradient(135deg,#1877F2,#0d5cd7,#0a3d8f)',
          glow:'#4e9eff', gc:'rgba(78,158,255,0.45)', gci:'rgba(78,158,255,0.06)',
          gc2:'rgba(78,158,255,0.2)', nameCol:'#74b9ff', badgeCol:'#4e9eff', badgeBg:'rgba(78,158,255,0.1)',
          iconFill:'white',
          d:'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
        },
        {
          name:'YouTube',
          bg:'linear-gradient(135deg,#FF0000,#cc0000,#7a0000)',
          glow:'#FF4444', gc:'rgba(255,68,68,0.45)', gci:'rgba(255,68,68,0.06)',
          gc2:'rgba(255,68,68,0.2)', nameCol:'#ff7070', badgeCol:'#FF4444', badgeBg:'rgba(255,68,68,0.1)',
          iconFill:'white',
          d:'M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z'
        },
        {
          name:'X / Twitter',
          bg:'linear-gradient(135deg,#14171A,#222,#2c3e50)',
          glow:'#aabbdd', gc:'rgba(170,187,221,0.4)', gci:'rgba(170,187,221,0.05)',
          gc2:'rgba(170,187,221,0.15)', nameCol:'#ccd9ee', badgeCol:'#aabbdd', badgeBg:'rgba(170,187,221,0.08)',
          iconFill:'white',
          d:'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
        },
        {
          name:'Threads',
          bg:'linear-gradient(135deg,#101010,#1a1a1a,#252525)',
          glow:'#b0b0ff', gc:'rgba(176,176,255,0.4)', gci:'rgba(176,176,255,0.05)',
          gc2:'rgba(176,176,255,0.15)', nameCol:'#c8c8ff', badgeCol:'#b0b0ff', badgeBg:'rgba(176,176,255,0.08)',
          iconFill:'white',
          d:'M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.848 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.378-.888l-.036-.001c-.795 0-2.05.212-2.978 1.243l-1.493-1.37c1.269-1.383 3.037-2.034 5.005-1.978l.051.002c1.848.07 3.25.668 4.172 1.78.91 1.098 1.32 2.61 1.24 4.5l.02.033c.963.479 1.755 1.195 2.33 2.1.985 1.583 1.09 3.744.272 5.591-.787 1.75-2.357 3.131-4.535 3.995-1.68.668-3.52 1.002-5.48 1.009z'
        },
        {
          name:'LinkedIn',
          bg:'linear-gradient(135deg,#0A66C2,#0550a0,#043d7a)',
          glow:'#2299ff', gc:'rgba(34,153,255,0.45)', gci:'rgba(34,153,255,0.06)',
          gc2:'rgba(34,153,255,0.2)', nameCol:'#55aaff', badgeCol:'#2299ff', badgeBg:'rgba(34,153,255,0.1)',
          iconFill:'white',
          d:'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
        },
        {
          name:'Pinterest',
          bg:'linear-gradient(135deg,#E60023,#bd001c,#7a0012)',
          glow:'#ff3355', gc:'rgba(255,51,85,0.45)', gci:'rgba(255,51,85,0.06)',
          gc2:'rgba(255,51,85,0.2)', nameCol:'#ff6680', badgeCol:'#ff3355', badgeBg:'rgba(255,51,85,0.1)',
          iconFill:'white',
          d:'M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z'
        },
      ].map((p,i)=>`
        <div class="plat-neon-card"
          style="--gc:${p.gc};--gci:${p.gci};--gc2:${p.gc2};
            border:2px solid ${p.glow}55;
            box-shadow:0 0 28px ${p.gc},0 8px 32px ${p.gc},inset 0 0 22px ${p.gci};
            animation:neonCardGlow 3s ease-in-out infinite ${i*0.3}s;"
          onmouseover="this.style.borderColor='${p.glow}cc';this.style.boxShadow='0 0 55px ${p.gc},0 0 90px ${p.gc2},0 16px 50px ${p.gc},inset 0 0 40px ${p.gci}';this.style.background='linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))'"
          onmouseout="this.style.borderColor='${p.glow}55';this.style.boxShadow='0 0 28px ${p.gc},0 8px 32px ${p.gc},inset 0 0 22px ${p.gci}';this.style.background='linear-gradient(160deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))'">
          <!-- floor bloom glow -->
          <div class="plat-bloom" style="background:radial-gradient(circle,${p.glow}40,transparent 65%);"></div>

          <div class="plat-icon-wrap">
            <!-- 3 concentric neon rings -->
            <div class="plat-ring-3" style="border-color:${p.glow}55;box-shadow:0 0 20px ${p.glow}44;"></div>
            <div class="plat-ring-2" style="border-color:${p.glow}88;box-shadow:0 0 14px ${p.glow}66;"></div>
            <div class="plat-ring-1" style="border-color:${p.glow};box-shadow:0 0 10px ${p.glow},0 0 22px ${p.glow}88,inset 0 0 10px ${p.glow}22;"></div>

            <!-- main icon tile -->
            <div class="plat-icon-tile"
              style="background:${p.bg};
                box-shadow:0 0 0 2px ${p.glow}77,
                  0 0 18px ${p.glow}99,
                  0 0 40px ${p.gc},
                  0 0 70px ${p.gc2},
                  0 10px 30px rgba(0,0,0,0.5),
                  inset 0 3px 0 rgba(255,255,255,0.3),
                  inset 0 -3px 0 rgba(0,0,0,0.4);">
              <svg viewBox="0 0 24 24" width="46" height="46" fill="${p.iconFill}"
                style="filter:
                  drop-shadow(0 0 4px rgba(255,255,255,0.9))
                  drop-shadow(0 0 10px ${p.glow})
                  drop-shadow(0 0 22px ${p.glow}cc)
                  drop-shadow(0 0 40px ${p.glow}88);">
                <path d="${p.d}"/>
              </svg>
            </div>
          </div>

          <!-- platform name with neon glow -->
          <span class="plat-name"
            style="color:${p.nameCol};
              text-shadow:0 0 8px ${p.glow},0 0 18px ${p.glow}bb,0 0 35px ${p.glow}77;">
            ${p.name}
          </span>

          <!-- neon label badge -->
          <span class="plat-badge"
            style="color:${p.badgeCol};background:${p.badgeBg};border-color:${p.badgeCol}66;
              box-shadow:0 0 10px ${p.badgeCol}55,inset 0 0 8px ${p.badgeCol}22;
              text-shadow:0 0 8px ${p.badgeCol};">
            ◉ LIVE
          </span>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     TESTIMONIALS  –  3 cards, no overlap
══════════════════════════════════════════ -->
<section style="padding:130px 0;background:linear-gradient(180deg,rgba(7,3,24,0.82) 0%,rgba(6,2,32,0.82) 100%);position:relative;z-index:1;">
  <div style="max-width:1300px;margin:0 auto;padding:0 28px;">
    <div style="text-align:center;margin-bottom:72px;">
      <h2 style="font-size:clamp(32px,4.5vw,56px);font-weight:900;margin-bottom:14px;">Loved by <span class="gt-rainbow">Thousands</span></h2>
      <p style="color:rgba(255,255,255,0.6);font-size:18px;">Real results from real businesses.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:28px;align-items:start;">
      ${[
        {name:'Sarah M.',role:'E-commerce Owner',text:'SOCIAL STRATEGY tripled my engagement in 6 weeks. The AI content is so on-brand, my followers cannot tell it is automated.',av:'SM',c:'#00E5FF'},
        {name:'Jake R.',role:'Digital Agency CEO',text:'We manage 15 clients from one dashboard. What took 40 hours per week is done automatically. The ROI is absolutely insane.',av:'JR',c:'#FF2D78'},
        {name:'Priya K.',role:'Fitness Influencer',text:'The website analysis gave me insights I never had before. My strategy is completely transformed. 127% engagement increase!',av:'PK',c:'#A78BFA'}
      ].map(t=>`
        <div class="testi-card" style="border:2px solid ${t.c}28;"
          onmouseover="this.style.borderColor='${t.c}55';this.style.boxShadow='0 16px 48px ${t.c}28'"
          onmouseout="this.style.borderColor='${t.c}28';this.style.boxShadow='none'">
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${t.c},transparent);box-shadow:0 0 14px ${t.c}88;"></div>
          <div style="color:#FFD600;font-size:20px;margin-bottom:16px;letter-spacing:3px;text-shadow:0 0 12px rgba(255,214,0,0.6);">★★★★★</div>
          <p style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.8;margin-bottom:26px;">"${t.text}"</p>
          <div style="display:flex;align-items:center;gap:14px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);">
            <div style="position:relative;width:52px;height:52px;flex-shrink:0;">
              <div style="position:absolute;inset:-3px;border-radius:50%;background:linear-gradient(135deg,${t.c},${t.c}44,${t.c});animation:neonPulse 2.5s ease-in-out infinite;"></div>
              <div style="position:relative;width:52px;height:52px;border-radius:50%;
                background:linear-gradient(135deg,${t.c},${t.c}cc);
                display:flex;align-items:center;justify-content:center;
                font-size:16px;font-weight:900;color:#fff;
                box-shadow:0 0 22px ${t.c}99,0 0 44px ${t.c}44;
                border:2px solid ${t.c};
                text-shadow:0 2px 6px rgba(0,0,0,0.5);">${t.av}</div>
            </div>
            <div><div style="color:#fff;font-weight:900;font-size:16px;text-shadow:0 0 10px rgba(255,255,255,0.3);">${t.name}</div><div style="color:rgba(255,255,255,0.65);font-size:13px;margin-top:3px;">${t.role}</div></div>
          </div>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     CTA
══════════════════════════════════════════ -->
<section style="padding:130px 0;background:linear-gradient(180deg,rgba(6,2,32,0.82) 0%,rgba(8,4,32,0.82) 100%);position:relative;overflow:hidden;z-index:1;">
  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:600px;background:radial-gradient(ellipse,rgba(0,229,255,0.10),rgba(124,58,237,0.08),transparent 70%);filter:blur(55px);pointer-events:none;"></div>
  <div style="max-width:860px;margin:0 auto;padding:0 28px;text-align:center;position:relative;">
    <div style="display:inline-block;
      background:linear-gradient(135deg,rgba(255,214,0,0.2),rgba(255,107,0,0.15));
      border:3px solid #FFD600;
      border-radius:999px;padding:16px 40px;
      font-size:17px;color:#FFD600;font-weight:900;margin-bottom:32px;
      box-shadow:0 0 32px rgba(255,214,0,0.6),0 0 65px rgba(255,214,0,0.25),inset 0 0 20px rgba(255,214,0,0.08);
      text-shadow:0 0 14px rgba(255,214,0,1),0 0 28px rgba(255,107,0,0.6);
      letter-spacing:1px;">🚀 Ready to Automate?</div>
    <h2 style="font-size:clamp(38px,5.5vw,70px);font-weight:900;margin-bottom:24px;line-height:1.05;">Ready to <span class="gt-rainbow">Automate</span> Your Growth?</h2>
    <p style="color:rgba(255,255,255,0.7);font-size:20px;margin-bottom:48px;line-height:1.65;">Join 12,400+ businesses growing on autopilot.<br>Free to start, no credit card required.</p>
    <div style="display:flex;gap:24px;justify-content:center;flex-wrap:wrap;margin-bottom:28px;">
      <a href="/login" class="btn-cta-main">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="white" stroke-width="2.5"/><path d="M21 21l-4.35-4.35" stroke="white" stroke-width="3" stroke-linecap="round"/></svg>
        Start Free Analysis
        <span style="width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff 0%,#00E5FF 50%,#0070F3 100%);box-shadow:0 0 12px #00E5FF;flex-shrink:0;"></span>
      </a>
      <a href="/pricing" class="btn-pricing-cta">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFD600"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/></svg>
        See Pricing
        <span style="width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff 0%,#FFD600 50%,#FF6B00 100%);box-shadow:0 0 12px #FFD600;flex-shrink:0;"></span>
      </a>
    </div>
    <!-- No credit card text – BRIGHT WHITE with neon glow -->
    <p style="color:#ffffff;font-size:15px;font-weight:700;
      text-shadow:0 0 18px rgba(0,229,255,0.8),0 0 36px rgba(255,45,120,0.5),0 0 60px rgba(124,58,237,0.4);">
      ✓ No credit card &nbsp;&nbsp;✓ Free tier forever &nbsp;&nbsp;✓ Cancel anytime
    </p>
  </div>
</section>

<!-- ══════════════════════════════════════════
     FOOTER
══════════════════════════════════════════ -->
<footer style="background:linear-gradient(180deg,rgba(8,4,32,0.88) 0%,rgba(6,0,16,0.92) 100%);border-top:2px solid rgba(255,45,120,0.2);padding:80px 0 0;position:relative;z-index:1;">
  <div style="max-width:1300px;margin:0 auto;padding:0 32px;">
    <div style="display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:48px;margin-bottom:64px;">

      <!-- Brand col -->
      <div>
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;">
          <div style="position:relative;display:inline-block;">
            <div style="position:absolute;inset:-5px;border-radius:18px;
              background:linear-gradient(135deg,#3dd4e8,#ff4fa0,#3dd4e8);
              filter:blur(5px) brightness(1.3);
              box-shadow:0 0 16px rgba(61,212,232,0.6),0 0 28px rgba(255,79,160,0.4);
              animation:neonPulse 2.5s ease-in-out infinite;z-index:0;"></div>
            <div style="position:relative;z-index:1;">${footerLogo}</div>
          </div>
          <span style="font-weight:900;font-size:16px;background:linear-gradient(135deg,#FF2D78,#C026D3,#A78BFA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">SOCIAL STRATEGY</span>
        </div>
        <p style="color:rgba(255,255,255,0.55);font-size:14px;line-height:1.8;margin-bottom:24px;">AI-powered social media marketing.<br>Analyze. Strategize. Automate. Grow.</p>
        <div style="display:flex;gap:10px;">
          ${[
            {c:'#E1306C',d:'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'},
            {c:'#69C9D0',d:'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.23 8.23 0 004.84 1.56V6.8a4.85 4.85 0 01-1.07-.11z'},
            {c:'#1877F2',d:'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'},
            {c:'#0A66C2',d:'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'},
          ].map(({c,d})=>`<a href="#" style="width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,0.05);border:1px solid ${c}44;display:flex;align-items:center;justify-content:center;text-decoration:none;transition:all .2s;" onmouseover="this.style.borderColor='${c}';this.style.background='${c}22';this.style.boxShadow='0 0 16px ${c}66'" onmouseout="this.style.borderColor='${c}44';this.style.background='rgba(255,255,255,0.05)';this.style.boxShadow='none'"><svg width="17" height="17" viewBox="0 0 24 24" fill="${c}"><path d="${d}"/></svg></a>`).join('')}
        </div>
      </div>

      <!-- Product -->
      <div>
        <h4 style="font-size:12px;font-weight:800;color:#FF2D78;text-transform:uppercase;letter-spacing:2px;margin-bottom:22px;text-shadow:0 0 14px rgba(255,45,120,0.6);">Product</h4>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:14px;">
          ${[['Website Auditor','/analysis'],['AI Content Studio','/content-studio'],['Post Scheduler','/scheduler'],['Analytics','/analytics'],['AI Characters','/characters'],['Pricing','/pricing']].map(([l,h])=>
            `<li><a href="${h}" style="font-size:14px;color:rgba(255,255,255,0.65);text-decoration:none;display:flex;align-items:center;gap:9px;transition:all .2s;" onmouseover="this.style.color='#FF2D78';this.style.paddingLeft='4px'" onmouseout="this.style.color='rgba(255,255,255,0.65)';this.style.paddingLeft='0'">
              <span style="width:8px;height:8px;border-radius:50%;background:#FF2D78;box-shadow:0 0 8px rgba(255,45,120,0.8);flex-shrink:0;"></span>${l}</a></li>`
          ).join('')}
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h4 style="font-size:12px;font-weight:800;color:#A78BFA;text-transform:uppercase;letter-spacing:2px;margin-bottom:22px;text-shadow:0 0 14px rgba(167,139,250,0.6);">Company</h4>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:14px;">
          ${[['About Us','/about'],['Partners','#'],['FAQ','/faq']].map(([l,h])=>
            `<li><a href="${h}" style="font-size:14px;color:rgba(255,255,255,0.65);text-decoration:none;display:flex;align-items:center;gap:9px;transition:all .2s;" onmouseover="this.style.color='#A78BFA';this.style.paddingLeft='4px'" onmouseout="this.style.color='rgba(255,255,255,0.65)';this.style.paddingLeft='0'">
              <span style="width:8px;height:8px;border-radius:50%;background:#A78BFA;box-shadow:0 0 8px rgba(167,139,250,0.8);flex-shrink:0;"></span>${l}</a></li>`
          ).join('')}
        </ul>
      </div>

      <!-- Support -->
      <div>
        <h4 style="font-size:12px;font-weight:800;color:#00ff88;text-transform:uppercase;letter-spacing:2px;margin-bottom:22px;text-shadow:0 0 14px rgba(0,255,136,0.6);">Support</h4>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:14px;margin-bottom:28px;">
          ${[['Help Center','#'],['Status','#'],['Sign In','/login'],['Sign Up','/login']].map(([l,h])=>
            `<li><a href="${h}" style="font-size:14px;color:rgba(255,255,255,0.65);text-decoration:none;display:flex;align-items:center;gap:9px;transition:all .2s;" onmouseover="this.style.color='#00ff88';this.style.paddingLeft='4px'" onmouseout="this.style.color='rgba(255,255,255,0.65)';this.style.paddingLeft='0'">
              <span style="width:8px;height:8px;border-radius:50%;background:#00ff88;box-shadow:0 0 8px rgba(0,255,136,0.8);flex-shrink:0;"></span>${l}</a></li>`
          ).join('')}
        </ul>
        <a href="/login" style="display:inline-flex;align-items:center;gap:9px;background:linear-gradient(135deg,#FF2D78,#C026D3,#7C3AED);color:#fff;font-size:13px;font-weight:800;padding:13px 22px;border-radius:999px;text-decoration:none;box-shadow:0 0 26px rgba(255,45,120,0.55);transition:all .2s;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 0 40px rgba(255,45,120,0.8)'" onmouseout="this.style.transform='';this.style.boxShadow='0 0 26px rgba(255,45,120,0.55)'">
          🚀 Start Free Today
        </a>
      </div>
    </div>

    <!-- Bottom bar -->
    <div style="border-top:1px solid rgba(255,255,255,0.07);padding:28px 0 0;">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px;margin-bottom:20px;">
        <p style="font-size:14px;color:#ffffff;font-weight:700;margin:0;
          text-shadow:0 0 20px rgba(0,229,255,0.9),0 0 40px rgba(167,139,250,0.6),0 0 60px rgba(255,45,120,0.3);
          letter-spacing:0.3px;">© 2026 Social Strategy · AI-Powered Marketing Platform · All rights reserved</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          ${[
            ['Privacy Policy','/privacy','#A78BFA','rgba(167,139,250,0.25)'],
            ['Terms of Service','/terms','#FF2D78','rgba(255,45,120,0.25)'],
            ['GDPR','/gdpr','#7C3AED','rgba(124,58,237,0.25)'],
            ['About Us','/about','#00E5FF','rgba(0,229,255,0.25)'],
            ['FAQ','/faq','#00ff88','rgba(0,255,136,0.25)'],
          ].map(([label,href,col,bg])=>
            `<a href="${href}" style="font-size:12px;font-weight:700;text-decoration:none;padding:6px 16px;border-radius:999px;border:1.5px solid ${col}55;background:${bg};color:${col};transition:all .2s;display:inline-block;text-shadow:0 0 10px ${col}66;"
              onmouseover="this.style.background='${col}33';this.style.borderColor='${col}';this.style.boxShadow='0 0 16px ${col}55'"
              onmouseout="this.style.background='${bg}';this.style.borderColor='${col}55';this.style.boxShadow='none'">${label}</a>`
          ).join('')}
        </div>
      </div>
      <div style="text-align:center;padding:18px 0 28px;border-top:1px solid rgba(255,255,255,0.05);">
        <a href="https://socialstrategyapp.com.au" target="_blank" style="font-size:15px;color:#00E5FF;text-decoration:none;font-weight:800;letter-spacing:1px;text-shadow:0 0 18px rgba(0,229,255,0.7);transition:text-shadow .2s;" onmouseover="this.style.textShadow='0 0 32px rgba(0,229,255,1)'" onmouseout="this.style.textShadow='0 0 18px rgba(0,229,255,0.7)'">🌐 socialstrategyapp.com.au</a>
      </div>
    </div>
  </div>
</footer>

<style>
  @media(max-width:900px){
    .nav-links{display:none!important;}
  }
  /* Mobile navbar is single-row (no logo) — normal padding */
  @media(max-width:700px){
    .hero-section{padding-top:80px!important;}
  }
  @media(max-width:768px){
    div[style*="grid-template-columns:repeat(3,1fr)"]{grid-template-columns:1fr!important;}
    div[style*="grid-template-columns:1.5fr 1fr 1fr 1fr"]{grid-template-columns:1fr 1fr!important;}
    div[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr!important;}
    div[style*="grid-template-columns:repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important;}
    /* How it works step cards — full width, smaller padding */
    div[style*="display:flex;align-items:flex-start;gap:28px;"]{padding:24px 18px!important;}
    div[style*="width:72px;height:72px"]{width:52px!important;height:52px!important;}
    div[style*="flex:1;min-width:0"] p{font-size:14px!important;}
  }
  @media(max-width:480px){
    div[style*="grid-template-columns:1.5fr 1fr 1fr 1fr"]{grid-template-columns:1fr!important;}
    div[style*="grid-template-columns:repeat(2,1fr)"]{grid-template-columns:1fr!important;}
    /* Step cards even more compact */
    div[style*="display:flex;align-items:flex-start;gap:28px;"]{flex-direction:column!important;gap:16px!important;padding:20px 16px!important;}
    div[style*="width:72px;height:72px"]{width:48px!important;height:48px!important;margin-left:0!important;}
    h3[style*="font-weight:900;font-size:24px"]{font-size:18px!important;}
    /* Hero text clamp on very small phones */
    .hero-social-text{font-size:clamp(28px,11vw,60px)!important;letter-spacing:clamp(3px,2vw,12px)!important;}
    .hero-strategy-text{font-size:clamp(28px,11vw,60px)!important;letter-spacing:clamp(3px,2vw,12px)!important;}
    .hero-logo-wrap{width:clamp(150px,45vw,200px)!important;height:clamp(150px,45vw,200px)!important;}
    div[style*="display:flex;gap:24px"]{flex-direction:column!important;align-items:center!important;}
  }
</style>
</body>
</html>`
}
