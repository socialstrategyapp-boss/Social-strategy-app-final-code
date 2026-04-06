import { ssLogo } from './layout'

export function loginPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign In – Social Strategy</title>
  <link rel="icon" href="data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%231a8090'/><circle cx='46' cy='44' r='32' fill='%23050d18'/><text y='58' x='46' font-size='36' font-weight='900' fill='white' font-family='Arial Black' text-anchor='middle'>SS</text><ellipse cx='68' cy='68' rx='16' ry='12' fill='%23ff2d78'/><polygon points='56,72 64,84 72,74' fill='%23ff2d78'/></svg>`)}">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *, *::before, *::after { font-family: 'Inter', sans-serif; box-sizing: border-box; }

    body {
      margin: 0; padding: 0;
      min-height: 100vh;
      background: #030818;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-x: hidden;
      position: relative;
    }

    /* ── BOKEH ── */
    .bokeh-wrap { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
    .bokeh { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.22; }
    .b1 { width: 600px; height: 600px; background: #7C3AED; top: -150px; left: -150px; animation: drift1 14s ease-in-out infinite; }
    .b2 { width: 500px; height: 500px; background: #FF2D78; bottom: -100px; right: -100px; animation: drift2 18s ease-in-out infinite; }
    .b3 { width: 350px; height: 350px; background: #C026D3; top: 30%; left: 55%; animation: drift3 12s ease-in-out infinite; }
    .b4 { width: 250px; height: 250px; background: #FF2D78; top: 10%; right: 10%; animation: drift1 16s ease-in-out infinite 3s; }
    @keyframes drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
    @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px)} }
    @keyframes drift3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }

    /* ── CARD ── */
    .login-card {
      position: relative; z-index: 1;
      width: 100%; max-width: 500px;
      margin: 20px;
      background: linear-gradient(160deg, rgba(3,8,24,0.99) 0%, rgba(4,10,26,0.99) 100%);
      border: 1.5px solid rgba(0,229,255,0.3);
      border-radius: 32px;
      overflow: hidden;
      box-shadow:
        0 40px 100px rgba(0,0,0,0.8),
        0 0 0 1px rgba(0,229,255,0.05) inset,
        0 0 80px rgba(0,229,255,0.08),
        0 0 120px rgba(255,45,120,0.06);
      backdrop-filter: blur(24px);
    }

    /* ── HERO TOP — takes up large space above form ── */
    .login-hero {
      background:
        linear-gradient(160deg,
          rgba(124,58,237,0.55) 0%,
          rgba(192,38,211,0.4) 35%,
          rgba(255,45,120,0.45) 70%,
          rgba(124,58,237,0.3) 100%);
      border-bottom: 1px solid rgba(255,45,120,0.25);
      padding: 40px 32px 36px;
      text-align: center;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0;
    }
    .login-hero::before {
      content: '';
      position: absolute; inset: 0;
      background:
        radial-gradient(ellipse at 50% -10%, rgba(255,45,120,0.35) 0%, transparent 60%),
        radial-gradient(ellipse at 20% 80%, rgba(124,58,237,0.25) 0%, transparent 55%),
        radial-gradient(ellipse at 80% 90%, rgba(192,38,211,0.2) 0%, transparent 50%);
      pointer-events: none;
    }
    /* animated sparkle orbs inside hero */
    .hero-orb {
      position: absolute; border-radius: 50%;
      pointer-events: none; opacity: 0.15;
      filter: blur(40px);
    }
    .orb1 { width: 180px; height: 180px; background:#FF2D78; top:-40px; right:-20px; animation: orbFloat 8s ease-in-out infinite; }
    .orb2 { width: 140px; height: 140px; background:#7C3AED; bottom:-30px; left:-10px; animation: orbFloat 10s ease-in-out infinite 2s; }
    @keyframes orbFloat { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(15px,-15px) scale(1.1)} }

    /* LOGO — scaled for hero */
    .login-hero-logo {
      width: clamp(100px, 28vw, 180px);
      height: clamp(100px, 28vw, 180px);
      margin: 0 auto 20px;
      position: relative; z-index: 1;
      flex-shrink: 0;
      filter:
        drop-shadow(0 0 30px rgba(0,229,255,0.8))
        drop-shadow(0 0 60px rgba(255,45,120,0.6))
        drop-shadow(0 0 120px rgba(124,58,237,0.4));
      animation: logoGlow 3s ease-in-out infinite;
    }
    .login-hero-logo svg { width: 100% !important; height: 100% !important; }
    @keyframes logoGlow {
      0%,100% {
        filter: drop-shadow(0 0 40px rgba(0,229,255,0.8)) drop-shadow(0 0 80px rgba(255,45,120,0.6)) drop-shadow(0 0 160px rgba(124,58,237,0.4));
      }
      50% {
        filter: drop-shadow(0 0 60px rgba(0,229,255,1)) drop-shadow(0 0 120px rgba(255,45,120,0.9)) drop-shadow(0 0 200px rgba(124,58,237,0.6)) drop-shadow(0 0 280px rgba(192,38,211,0.4));
      }
    }

    /* APP NAME — big bold gradient */
    .login-hero-name {
      font-size: clamp(22px, 5vw, 36px);
      font-weight: 900;
      letter-spacing: clamp(1px, 0.5vw, 4px);
      line-height: 1.1;
      background: linear-gradient(135deg, #fff 0%, #FF2D78 40%, #C026D3 70%, #A78BFA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0 0 10px;
      position: relative; z-index: 1;
    }

    /* MOTTO */
    .login-hero-motto {
      font-size: 13px;
      font-weight: 500;
      color: rgba(255,255,255,0.65);
      letter-spacing: 0.3px;
      margin: 0 0 16px;
      line-height: 1.6;
      position: relative; z-index: 1;
    }

    /* LIVE PILL */
    .login-hero-pill {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(255,45,120,0.15);
      border: 1px solid rgba(255,45,120,0.4);
      border-radius: 999px; padding: 6px 16px;
      font-size: 11px; font-weight: 700; color: #FF2D78;
      letter-spacing: 0.5px;
      position: relative; z-index: 1;
      box-shadow: 0 0 16px rgba(255,45,120,0.2);
    }
    .login-hero-pill .dot {
      width: 7px; height: 7px;
      background: #FF2D78;
      border-radius: 50%;
      animation: blink 1.8s infinite;
      box-shadow: 0 0 6px #FF2D78;
    }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

    /* ── FORM SECTION ── */
    .login-form { padding: 32px 38px 40px; background: rgba(3,8,22,0.5); }

    /* MODE TOGGLE */
    .mode-toggle {
      display: flex;
      background: rgba(3,8,24,0.9);
      border: 1.5px solid rgba(0,229,255,0.2);
      border-radius: 14px; padding: 4px; margin-bottom: 26px;
    }
    .mode-btn {
      flex: 1; padding: 10px; border: none; border-radius: 11px;
      font-size: 13px; font-weight: 700; cursor: pointer;
      transition: all 0.25s; background: transparent; color: #6b7280;
    }
    .mode-btn.active {
      background: linear-gradient(135deg,#00E5FF,#0070F3,#7C3AED,#FF2D78);
      color: #fff;
      box-shadow: 0 3px 16px rgba(0,229,255,0.35), 0 0 30px rgba(124,58,237,0.2);
    }

    .card-title { font-size:26px; font-weight:900; color:#fff; margin:0 0 8px;
      text-shadow:0 0 20px rgba(0,229,255,0.4),0 0 40px rgba(0,229,255,0.15); }
    .card-sub { font-size:14px; color:rgba(150,210,255,0.75); margin:0 0 26px; font-weight:500; }

    /* INPUT */
    .input-group { margin-bottom: 20px; }
    .input-group label {
      display: block; font-size: 11px; font-weight: 800;
      color: rgba(150,210,255,0.85); text-transform: uppercase;
      letter-spacing: 1.2px; margin-bottom: 9px;
      text-shadow: 0 0 10px rgba(0,229,255,0.3);
    }
    .input-wrap {
      display: flex; align-items: center; gap: 12px;
      background: rgba(3,8,24,0.9);
      border: 1.5px solid rgba(0,229,255,0.2);
      border-radius: 14px; padding: 14px 16px;
      transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    }
    .input-wrap:focus-within {
      border-color: rgba(0,229,255,0.7);
      background: rgba(0,229,255,0.04);
      box-shadow: 0 0 0 3px rgba(0,229,255,0.12), 0 0 24px rgba(0,229,255,0.15);
    }
    .input-wrap i { color: #00E5FF; font-size: 15px; flex-shrink: 0; text-shadow: 0 0 8px rgba(0,229,255,0.6); }
    .input-wrap input {
      flex: 1; background: transparent; border: none;
      outline: none; color: #c8e6ff; font-size: 15px; font-weight: 500;
    }
    .input-wrap input::placeholder { color: rgba(140,185,230,0.6); font-weight:400; }

    /* PASSWORD STRENGTH */
    .strength-bar { height: 3px; border-radius:999px; margin-top:6px; background:rgba(255,255,255,0.07); overflow:hidden; }
    .strength-fill { height:100%; border-radius:999px; width:0%; transition:width .3s,background .3s; }
    .strength-label { font-size:11px; font-weight:600; margin-top:4px; display:none; }

    .forgot { text-align:right; margin-top:-8px; margin-bottom:18px; }
    .forgot a { font-size:12px; color:#00E5FF; text-decoration:none; font-weight:600;
      text-shadow:0 0 8px rgba(0,229,255,0.4); }
    .forgot a:hover { color:#fff; }

    .remember-row { display:flex; align-items:center; gap:10px; margin-bottom:22px; }
    .remember-row input[type="checkbox"] { width:16px; height:16px; accent-color:#00E5FF; cursor:pointer; }
    .remember-row label { font-size:14px; color:rgba(150,210,255,0.7); cursor:pointer; font-weight:500; }

    /* SIGN IN BUTTON — blended neon cyan+purple+pink */
    .btn-start {
      width: 100%; padding: 15px;
      background: linear-gradient(135deg,#00E5FF,#0070F3,#7C3AED,#FF2D78);
      color: #fff; font-size: 15px; font-weight: 900;
      border: none; border-radius: 14px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      margin-bottom: 14px; transition: all 0.2s;
      box-shadow:
        0 0 28px rgba(0,229,255,0.4),
        0 0 50px rgba(124,58,237,0.25),
        0 0 70px rgba(255,45,120,0.2),
        0 4px 20px rgba(0,0,0,0.4);
      letter-spacing: 0.3px;
      position: relative; overflow: hidden;
    }
    .btn-start::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
      border-radius: 14px;
    }
    .btn-start:hover {
      transform: translateY(-2px);
      box-shadow:
        0 0 40px rgba(0,229,255,0.6),
        0 0 70px rgba(124,58,237,0.4),
        0 0 90px rgba(255,45,120,0.3),
        0 8px 30px rgba(0,0,0,0.5);
    }
    .btn-start:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

    /* DIVIDER */
    .divider { display:flex; align-items:center; gap:12px; margin: 4px 0 14px; }
    .divider-line { flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(0,229,255,0.25),transparent); }
    .divider span { font-size:12px; color:rgba(0,229,255,0.4); font-weight:600; }

    /* GOOGLE BUTTON — neon cyan+purple border glow */
    .btn-google {
      width: 100%; padding: 14px;
      background: rgba(3,8,24,0.9);
      border: 1.5px solid rgba(0,229,255,0.35);
      color: #c8e6ff; font-size: 14px; font-weight: 800;
      border-radius: 14px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      transition: all 0.2s; margin-bottom: 18px;
      box-shadow: 0 0 20px rgba(0,229,255,0.1), 0 0 40px rgba(124,58,237,0.07);
      letter-spacing: 0.3px;
    }
    .btn-google:hover {
      transform: translateY(-2px);
      border-color: rgba(0,229,255,0.7);
      box-shadow: 0 0 30px rgba(0,229,255,0.25), 0 0 60px rgba(124,58,237,0.15);
      color: #fff;
    }
    .google-icon { width: 20px; height: 20px; flex-shrink: 0; }

    .switch-link { text-align:center; font-size:14px; color:rgba(150,210,255,0.7); margin-top:6px; font-weight:500; }
    .switch-link a { color:#00E5FF; font-weight:700; text-decoration:none; cursor:pointer; text-shadow:0 0 10px rgba(0,229,255,0.5); }
    .switch-link a:hover { color:#fff; }

    .admin-link { text-align:right; margin-top:12px; }
    .admin-link a { font-size:10px; color:rgba(0,229,255,0.08); text-decoration:none; letter-spacing:0.5px; transition:color .3s; }
    .admin-link a:hover { color:rgba(0,229,255,0.3); }

    .error-msg {
      background:rgba(255,45,120,0.08); border:1.5px solid rgba(255,45,120,0.3);
      color:#ff6b9d; font-size:13px; padding:10px 14px; border-radius:10px;
      margin-bottom:14px; display:none;
      box-shadow:0 0 16px rgba(255,45,120,0.1);
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner {
      width:16px; height:16px; border:2px solid rgba(255,255,255,0.25);
      border-top-color:#fff; border-radius:50%;
      animation:spin .7s linear infinite; display:none;
    }
    #nameGroup { display:none; }
    #passwordStrength { display:none; }

    @media (max-height: 700px) {
      .login-hero { padding: 24px 28px 22px; }
      .login-hero-logo { width: 100px !important; height: 100px !important; margin-bottom: 14px; }
      .login-hero-name { font-size: 22px !important; }
      .login-hero-motto { font-size: 12px; }
    }
    @media (max-width: 480px) {
      .login-card { margin: 10px; border-radius: 24px; }
      .login-hero { padding: 28px 20px 24px; }
      .login-form { padding: 24px 20px 28px; }
      .login-hero-logo { width: 110px !important; height: 110px !important; }
      .login-hero-name { font-size: 20px !important; letter-spacing: 2px !important; }
      .input-wrap { padding: 12px 14px; gap: 10px; }
    }
  </style>
</head>
<body>
  <div class="bokeh-wrap">
    <div class="bokeh b1"></div>
    <div class="bokeh b2"></div>
    <div class="bokeh b3"></div>
    <div class="bokeh b4"></div>
  </div>

  <div class="login-card">

    <!-- ═══════════════════════════════════════
         HERO — MASSIVE LOGO + APP NAME + MOTTO
    ═══════════════════════════════════════ -->
    <div class="login-hero">
      <div class="hero-orb orb1"></div>
      <div class="hero-orb orb2"></div>

      <!-- LOGO — responsive size via CSS class -->
      <div class="login-hero-logo">
        ${ssLogo(220).replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"')}
      </div>

      <!-- APP NAME -->
      <div class="login-hero-name">SOCIAL STRATEGY</div>

      <!-- MOTTO -->
      <p class="login-hero-motto">
        One Scan. Complete Growth.<br>
        Your AI-powered marketing command center.
      </p>

      <!-- LIVE PILL -->
      <div class="login-hero-pill">
        <div class="dot"></div>
        Premium AI Platform · 12,400+ Businesses
      </div>
    </div>

    <!-- ═══════════════════════════════════════
         FORM SECTION
    ═══════════════════════════════════════ -->
    <div class="login-form">

      <!-- Mode toggle -->
      <div class="mode-toggle">
        <button class="mode-btn active" id="signinBtn" onclick="setMode('signin')">Sign In</button>
        <button class="mode-btn" id="signupBtn" onclick="setMode('signup')">Create Account</button>
      </div>

      <div id="cardTitle" class="card-title">Welcome Back</div>
      <div id="cardSub" class="card-sub">Sign in to your AI growth command center</div>

      <div id="errorMsg" class="error-msg"></div>

      <!-- Name — signup only -->
      <div class="input-group" id="nameGroup">
        <label>Full Name</label>
        <div class="input-wrap">
          <i class="fas fa-user"></i>
          <input id="nameInput" type="text" placeholder="Your full name" autocomplete="name">
        </div>
      </div>

      <div class="input-group">
        <label>Email Address</label>
        <div class="input-wrap">
          <i class="fas fa-envelope"></i>
          <input id="emailInput" type="email" placeholder="you@business.com" autocomplete="email">
        </div>
      </div>

      <div class="input-group">
        <label>Password</label>
        <div class="input-wrap">
          <i class="fas fa-lock"></i>
          <input id="passInput" type="password" placeholder="••••••••" autocomplete="current-password" oninput="checkPasswordStrength(this.value)">
          <i class="fas fa-eye" id="eyeToggle" onclick="togglePass()" style="cursor:pointer;color:#A78BFA;transition:color 0.2s;" title="Show/hide"></i>
        </div>
        <div id="passwordStrength">
          <div class="strength-bar"><div class="strength-fill" id="strengthFill"></div></div>
          <div class="strength-label" id="strengthLabel"></div>
        </div>
      </div>

      <div class="forgot" id="forgotLink">
        <a href="#">Forgot password?</a>
      </div>

      <div class="remember-row" id="rememberRow">
        <input type="checkbox" id="rememberMe">
        <label for="rememberMe">Remember me for 30 days</label>
      </div>

      <!-- MAIN BUTTON -->
      <button class="btn-start" id="mainBtn" onclick="handleAuth()">
        <span id="btnText">Sign In</span>
        <div class="spinner" id="btnSpinner"></div>
        <i class="fas fa-arrow-right" id="btnArrow"></i>
      </button>

      <div class="divider">
        <div class="divider-line"></div>
        <span>or</span>
        <div class="divider-line"></div>
      </div>

      <!-- GOOGLE / SOCIAL SIGN IN — neon lime + pink + purple -->
      <button class="btn-google" onclick="handleGoogle()">
        <svg class="google-icon" viewBox="0 0 48 48">
          <path fill="rgba(255,255,255,0.95)" d="M43.6 20.1H42V20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.1 6.4 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
        </svg>
        Continue with Google
      </button>

      <p class="switch-link" id="switchText">
        Don't have an account? <a onclick="setMode('signup')">Create one free →</a>
      </p>

      <div class="admin-link">
        <a href="/admin" title="">· · ·</a>
      </div>

    </div><!-- /.login-form -->
  </div><!-- /.login-card -->

  <script>
    var currentMode = 'signin';

    function setMode(mode) {
      currentMode = mode;
      var isSignup = (mode === 'signup');
      document.getElementById('signinBtn').className = 'mode-btn' + (!isSignup ? ' active' : '');
      document.getElementById('signupBtn').className = 'mode-btn' + (isSignup ? ' active' : '');
      document.getElementById('nameGroup').style.display = isSignup ? 'block' : 'none';
      document.getElementById('passwordStrength').style.display = isSignup ? 'block' : 'none';
      document.getElementById('forgotLink').style.display = isSignup ? 'none' : 'block';
      document.getElementById('cardTitle').textContent = isSignup ? 'Create Your Account' : 'Welcome Back';
      document.getElementById('cardSub').textContent = isSignup
        ? 'Start your 14-day free trial. No credit card required.'
        : 'Sign in to your AI growth command center';
      document.getElementById('btnText').textContent = isSignup ? 'Create Account' : 'Sign In';
      document.getElementById('errorMsg').style.display = 'none';
      if (isSignup) {
        document.getElementById('switchText').innerHTML = 'Already have an account? <a onclick="setMode(\\'signin\\')">Sign in \u2192</a>';
      } else {
        document.getElementById('switchText').innerHTML = 'Don\\'t have an account? <a onclick="setMode(\\'signup\\')">Create one free \u2192</a>';
      }
    }

    function checkPasswordStrength(val) {
      if (currentMode !== 'signup') return;
      var fill = document.getElementById('strengthFill');
      var label = document.getElementById('strengthLabel');
      label.style.display = 'block';
      var score = 0;
      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;
      var levels = [
        { pct: 20, color: '#f87171', lbl: 'Too short' },
        { pct: 40, color: '#f87171', lbl: 'Weak' },
        { pct: 60, color: '#fbbf24', lbl: 'Fair' },
        { pct: 80, color: '#4ade80', lbl: 'Good' },
        { pct: 100, color: '#FF2D78', lbl: 'Strong \u2713' },
      ];
      if (val.length === 0) { fill.style.width = '0%'; label.style.display = 'none'; return; }
      var level = levels[Math.min(score, 4)];
      fill.style.width = level.pct + '%';
      fill.style.background = level.color;
      label.textContent = level.lbl;
      label.style.color = level.color;
    }

    function togglePass() {
      var inp = document.getElementById('passInput');
      var eye = document.getElementById('eyeToggle');
      if (inp.type === 'password') {
        inp.type = 'text'; eye.className = 'fas fa-eye-slash'; eye.style.color = '#FF2D78';
      } else {
        inp.type = 'password'; eye.className = 'fas fa-eye'; eye.style.color = '#A78BFA';
      }
    }

    function showError(msg) {
      var el = document.getElementById('errorMsg');
      el.textContent = msg; el.style.display = 'block';
    }

    function handleAuth() {
      var email = document.getElementById('emailInput').value.trim();
      var pass = document.getElementById('passInput').value;
      document.getElementById('errorMsg').style.display = 'none';
      if (!email) { showError('Please enter your email address.'); return; }
      if (email.indexOf('@') === -1) { showError('Please enter a valid email address.'); return; }
      if (!pass) { showError('Please enter your password.'); return; }
      if (currentMode === 'signup' && pass.length < 8) { showError('Password must be at least 8 characters.'); return; }

      var btn = document.getElementById('mainBtn');
      document.getElementById('btnText').textContent = currentMode === 'signup' ? 'Creating account...' : 'Signing in...';
      document.getElementById('btnArrow').style.display = 'none';
      document.getElementById('btnSpinner').style.display = 'block';
      btn.disabled = true;

      if (document.getElementById('rememberMe').checked) {
        localStorage.setItem('ssRememberEmail', email);
      }
      setTimeout(function() { window.location.href = '/dashboard'; }, 1200);
    }

    function handleGoogle() {
      var btn = document.querySelector('.btn-google');
      btn.innerHTML = '\u23F3 Redirecting to Google...';
      btn.disabled = true;
      setTimeout(function() { window.location.href = '/dashboard'; }, 900);
    }

    // Pre-fill remembered email
    var remembered = localStorage.getItem('ssRememberEmail');
    if (remembered) {
      document.getElementById('emailInput').value = remembered;
      document.getElementById('rememberMe').checked = true;
    }

    document.addEventListener('keydown', function(e) { if (e.key === 'Enter') handleAuth(); });
  </script>
</body>
</html>`
}
