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
    body { margin: 0; padding: 0; min-height: 100vh; background: #030818; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
    .bokeh-wrap { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
    .bokeh { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.18; }
    .b1 { width: 500px; height: 500px; background: #00E5FF; top: -120px; left: -100px; animation: drift1 14s ease-in-out infinite; }
    .b2 { width: 400px; height: 400px; background: #7C3AED; bottom: -80px; right: -80px; animation: drift2 18s ease-in-out infinite; }
    .b3 { width: 300px; height: 300px; background: #FF2D78; top: 40%; left: 60%; animation: drift3 12s ease-in-out infinite; }
    .b4 { width: 200px; height: 200px; background: #0070F3; top: 20%; right: 20%; animation: drift1 16s ease-in-out infinite 3s; }
    @keyframes drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
    @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px)} }
    @keyframes drift3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }

    .login-card {
      position: relative; z-index: 1;
      width: 100%; max-width: 480px;
      margin: 24px;
      background: linear-gradient(145deg, rgba(20,30,55,0.95) 0%, rgba(10,16,38,0.98) 100%);
      border: 1px solid rgba(255,45,120,0.25);
      border-radius: 28px;
      overflow: hidden;
      box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset,
                  0 0 60px rgba(255,45,120,0.08);
      backdrop-filter: blur(20px);
    }
    /* ── HERO TOP SECTION ── */
    .login-hero {
      background: linear-gradient(160deg, rgba(124,58,237,0.35) 0%, rgba(192,38,211,0.2) 40%, rgba(255,45,120,0.25) 100%);
      border-bottom: 1px solid rgba(255,45,120,0.2);
      padding: 40px 36px 36px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .login-hero::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(255,45,120,0.18) 0%, transparent 65%),
                  radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.15) 0%, transparent 65%);
      pointer-events: none;
    }
    .login-hero-logo {
      width: 110px; height: 110px;
      margin: 0 auto 20px;
      filter: drop-shadow(0 0 28px rgba(255,45,120,0.55)) drop-shadow(0 0 56px rgba(124,58,237,0.35));
      animation: logoGlow 3s ease-in-out infinite;
    }
    @keyframes logoGlow {
      0%,100% { filter: drop-shadow(0 0 28px rgba(255,45,120,0.55)) drop-shadow(0 0 56px rgba(124,58,237,0.35)); }
      50%      { filter: drop-shadow(0 0 40px rgba(255,45,120,0.8))  drop-shadow(0 0 80px rgba(124,58,237,0.55)); }
    }
    .login-hero-name {
      font-size: 36px; font-weight: 900; letter-spacing: 3px;
      background: linear-gradient(135deg, #FF2D78, #C026D3, #A78BFA);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      margin: 0 0 8px; line-height: 1.1;
      text-shadow: none;
    }
    .login-hero-motto {
      font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.6);
      letter-spacing: 0.5px; margin: 0;
      line-height: 1.5;
    }
    .login-hero-pill {
      display: inline-flex; align-items: center; gap: 7px;
      background: rgba(255,45,120,0.12);
      border: 1px solid rgba(255,45,120,0.3);
      border-radius: 999px; padding: 5px 14px;
      font-size: 11px; font-weight: 700; color: #FF2D78;
      margin-top: 16px; letter-spacing: 0.5px;
    }
    .login-hero-pill .dot { width: 6px; height: 6px; background: #FF2D78; border-radius: 50%; animation: blink 2s infinite; }
    /* ── FORM SECTION ── */
    .login-form { padding: 28px 36px 36px; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

    /* MODE TOGGLE */
    .mode-toggle { display: flex; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 4px; margin-bottom: 24px; }
    .mode-btn { flex: 1; padding: 9px; border: none; border-radius: 9px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; background: transparent; color: #6b7280; }
    .mode-btn.active { background: linear-gradient(135deg,#FF2D78,#C026D3,#7C3AED); color: #fff; box-shadow: 0 3px 12px rgba(255,45,120,0.35); }

    .input-group { margin-bottom: 16px; }
    .input-group label { display: block; font-size: 12px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 7px; }
    .input-wrap {
      display: flex; align-items: center; gap: 10px;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px; padding: 12px 14px; transition: border-color 0.2s;
    }
    .input-wrap:focus-within { border-color: #00E5FF; box-shadow: 0 0 0 3px rgba(0,229,255,0.08); }
    .input-wrap i { color: #6b7280; font-size: 14px; flex-shrink: 0; }
    .input-wrap input { flex: 1; background: transparent; border: none; outline: none; color: #fff; font-size: 14px; }
    .input-wrap input::placeholder { color: #4b5563; }

    /* PASSWORD STRENGTH */
    .strength-bar { height: 3px; border-radius: 999px; margin-top: 6px; background: rgba(255,255,255,0.07); overflow: hidden; }
    .strength-fill { height: 100%; border-radius: 999px; width: 0%; transition: width 0.3s, background 0.3s; }
    .strength-label { font-size: 11px; font-weight: 600; margin-top: 4px; display: none; }

    .forgot { text-align: right; margin-top: -10px; margin-bottom: 20px; }
    .forgot a { font-size: 12px; color: #00E5FF; text-decoration: none; font-weight: 600; }

    /* REMEMBER ME */
    .remember-row { display: flex; align-items: center; gap: 8px; margin-bottom: 18px; }
    .remember-row input[type="checkbox"] { width: 15px; height: 15px; accent-color: #00E5FF; cursor: pointer; }
    .remember-row label { font-size: 13px; color: #9ca3af; cursor: pointer; }

    .btn-start {
      width: 100%; padding: 14px;
      background: linear-gradient(135deg,#00E5FF,#0070F3);
      color: #001a22; font-size: 15px; font-weight: 900;
      border: none; border-radius: 14px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      margin-bottom: 12px; transition: all 0.2s;
      box-shadow: 0 6px 24px rgba(0,229,255,0.3);
    }
    .btn-start:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,229,255,0.45); }

    .btn-google {
      width: 100%; padding: 14px;
      background: linear-gradient(135deg,#FF2D78,#C026D3,#7C3AED);
      color: #fff; font-size: 14px; font-weight: 800;
      border: none; border-radius: 14px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      transition: all 0.2s; margin-bottom: 20px;
      box-shadow: 0 0 24px rgba(255,45,120,0.4), 0 0 48px rgba(192,38,211,0.18);
      letter-spacing: 0.3px;
    }
    .btn-google:hover {
      box-shadow: 0 0 36px rgba(255,45,120,0.65), 0 0 72px rgba(192,38,211,0.35);
      transform: translateY(-2px);
    }
    .google-icon { width: 20px; height: 20px; }

    .divider { display: flex; align-items: center; gap: 12px; margin: 0 0 16px; }
    .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
    .divider span { font-size: 12px; color: #4b5563; font-weight: 600; }

    .switch-link { text-align: center; font-size: 13px; color: #9ca3af; margin-top: 6px; }
    .switch-link a { color: #00E5FF; font-weight: 700; text-decoration: none; cursor: pointer; }
    .switch-link a:hover { text-decoration: underline; }

    /* Admin link – subtle, bottom right */
    .admin-link { text-align: right; margin-top: 10px; }
    .admin-link a { font-size: 10px; color: rgba(255,255,255,0.15); text-decoration: none; cursor: pointer; letter-spacing: 0.5px; transition: color 0.3s; }
    .admin-link a:hover { color: rgba(167,139,250,0.5); }

    .error-msg { background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.25); color: #f87171; font-size: 13px; padding: 10px 14px; border-radius: 10px; margin-bottom: 14px; display: none; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner { width: 16px; height: 16px; border: 2px solid rgba(0,26,34,0.3); border-top-color: #001a22; border-radius: 50%; animation: spin 0.7s linear infinite; display: none; }

    /* Name field (only in create account mode) */
    #nameGroup { display: none; }
    #passwordStrength { display: none; }
    #forgotLink { display: block; }
  </style>
</head>
<body>
  <div class="bokeh-wrap">
    <div class="bokeh b1"></div><div class="bokeh b2"></div><div class="bokeh b3"></div><div class="bokeh b4"></div>
  </div>

  <div class="login-card">

    <!-- ── BIG LOGO HERO SECTION ── -->
    <div class="login-hero">
      <!-- Massive Logo -->
      <div class="login-hero-logo">
        ${ssLogo(110)}
      </div>
      <!-- App Name -->
      <div class="login-hero-name">SOCIAL STRATEGY</div>
      <!-- Motto -->
      <p class="login-hero-motto">One Scan. Complete Growth.<br>Your AI-powered marketing command center.</p>
      <!-- Live pill -->
      <div class="login-hero-pill">
        <div class="dot"></div>
        Premium AI Growth Platform · 12,400+ Businesses
      </div>
    </div>

    <!-- ── FORM SECTION ── -->
    <div class="login-form">

    <!-- Mode Toggle -->
    <div class="mode-toggle">
      <button class="mode-btn active" id="signinBtn" onclick="setMode('signin')">Sign In</button>
      <button class="mode-btn" id="signupBtn" onclick="setMode('signup')">Create Account</button>
    </div>

    <h1 id="cardTitle" style="font-size:26px;font-weight:900;color:#fff;margin:0 0 6px;">Welcome Back</h1>
    <p id="cardSub" style="font-size:14px;color:#9ca3af;margin:0 0 24px;">Sign in to your AI growth command center</p>

    <div id="errorMsg" class="error-msg"></div>

    <!-- Name (signup only) -->
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
        <i class="fas fa-eye" id="eyeToggle" onclick="togglePass()" style="cursor:pointer;color:#6b7280;transition:color 0.2s;" title="Show/hide password"></i>
      </div>
      <!-- Password strength bar (signup mode) -->
      <div id="passwordStrength">
        <div class="strength-bar"><div class="strength-fill" id="strengthFill"></div></div>
        <div class="strength-label" id="strengthLabel"></div>
      </div>
    </div>

    <div class="forgot" id="forgotLink">
      <a href="#">Forgot password?</a>
    </div>

    <!-- Remember Me -->
    <div class="remember-row" id="rememberRow">
      <input type="checkbox" id="rememberMe">
      <label for="rememberMe">Remember me for 30 days</label>
    </div>

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

    <button class="btn-google" onclick="handleGoogle()">
      <svg class="google-icon" viewBox="0 0 48 48">
        <path fill="rgba(255,255,255,0.9)" d="M43.6 20.1H42V20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.1 6.4 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
        <path fill="rgba(255,255,255,0.7)" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.1 6.4 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
        <path fill="rgba(255,255,255,0.9)" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.5 26.8 36.5 24 36.5c-5.3 0-9.7-3.5-11.3-8.4l-6.5 5C9.6 39.7 16.3 44 24 44z"/>
        <path fill="rgba(255,255,255,0.8)" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.4l6.2 5.2C41.9 35.5 44 30 44 24c0-1.3-.1-2.6-.4-3.9z"/>
      </svg>
      Continue with Google
    </button>

    <p class="switch-link" id="switchText">
      Don't have an account? <a onclick="setMode('signup')">Create one free →</a>
    </p>

    <!-- Hidden admin access link -->
    <div class="admin-link">
      <a href="/admin" title="">· · ·</a>
    </div>
    </div><!-- /.login-form -->
  </div><!-- /.login-card -->

  <script>
    let currentMode = 'signin';

    function setMode(mode) {
      currentMode = mode;
      const isSignup = mode === 'signup';
      document.getElementById('signinBtn').className = 'mode-btn' + (!isSignup ? ' active' : '');
      document.getElementById('signupBtn').className = 'mode-btn' + (isSignup ? ' active' : '');
      document.getElementById('nameGroup').style.display = isSignup ? 'block' : 'none';
      document.getElementById('passwordStrength').style.display = isSignup ? 'block' : 'none';
      document.getElementById('forgotLink').style.display = isSignup ? 'none' : 'block';
      document.getElementById('cardTitle').textContent = isSignup ? 'Create Your Account' : 'Welcome Back';
      document.getElementById('cardSub').textContent = isSignup ? 'Start your 14-day free trial. No credit card required.' : 'Sign in to your AI growth command center';
      document.getElementById('btnText').textContent = isSignup ? 'Create Account' : 'Sign In';
      document.getElementById('switchText').innerHTML = isSignup
        ? 'Already have an account? <a onclick="setMode(\'signin\')">Sign in →</a>'
        : 'Don\'t have an account? <a onclick="setMode(\'signup\')">Create one free →</a>';
      document.getElementById('passInput').autocomplete = isSignup ? 'new-password' : 'current-password';
      document.getElementById('errorMsg').style.display = 'none';
    }

    function checkPasswordStrength(val) {
      if (currentMode !== 'signup') return;
      const fill = document.getElementById('strengthFill');
      const label = document.getElementById('strengthLabel');
      label.style.display = 'block';
      let score = 0;
      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;
      const levels = [
        { pct: 20, color: '#f87171', label: 'Too short' },
        { pct: 40, color: '#f87171', label: 'Weak' },
        { pct: 60, color: '#fbbf24', label: 'Fair' },
        { pct: 80, color: '#4ade80', label: 'Good' },
        { pct: 100, color: '#00E5FF', label: 'Strong ✓' },
      ];
      const level = val.length === 0 ? null : levels[Math.min(score, 4)];
      if (level) {
        fill.style.width = level.pct + '%';
        fill.style.background = level.color;
        label.textContent = level.label;
        label.style.color = level.color;
      } else {
        fill.style.width = '0%';
        label.style.display = 'none';
      }
    }

    function togglePass() {
      const inp = document.getElementById('passInput');
      const eye = document.getElementById('eyeToggle');
      if (inp.type === 'password') {
        inp.type = 'text'; eye.className = 'fas fa-eye-slash'; eye.style.color = '#00E5FF';
      } else {
        inp.type = 'password'; eye.className = 'fas fa-eye'; eye.style.color = '#6b7280';
      }
    }

    function showError(msg) {
      const el = document.getElementById('errorMsg');
      el.textContent = msg; el.style.display = 'block';
    }

    function handleAuth() {
      const email = document.getElementById('emailInput').value.trim();
      const pass = document.getElementById('passInput').value;
      document.getElementById('errorMsg').style.display = 'none';
      if (!email) { showError('Please enter your email address.'); return; }
      if (!email.includes('@')) { showError('Please enter a valid email address.'); return; }
      if (!pass) { showError('Please enter your password.'); return; }
      if (currentMode === 'signup' && pass.length < 8) { showError('Password must be at least 8 characters.'); return; }

      const btn = document.getElementById('mainBtn');
      document.getElementById('btnText').textContent = currentMode === 'signup' ? 'Creating account...' : 'Signing in...';
      document.getElementById('btnArrow').style.display = 'none';
      document.getElementById('btnSpinner').style.display = 'block';
      btn.disabled = true;

      if (document.getElementById('rememberMe').checked) {
        localStorage.setItem('ssRememberEmail', email);
      }
      setTimeout(() => { window.location.href = '/dashboard'; }, 1200);
    }

    function handleGoogle() {
      const btn = document.querySelector('.btn-google');
      btn.textContent = '⏳ Redirecting to Google...';
      btn.disabled = true;
      setTimeout(() => { window.location.href = '/dashboard'; }, 1000);
    }

    // Pre-fill remembered email
    const remembered = localStorage.getItem('ssRememberEmail');
    if (remembered) {
      document.getElementById('emailInput').value = remembered;
      document.getElementById('rememberMe').checked = true;
    }

    document.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleAuth(); });
  </script>
</body>
</html>`
}
