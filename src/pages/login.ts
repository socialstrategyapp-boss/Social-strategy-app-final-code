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
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
      position: relative;
    }

    /* Bokeh background orbs */
    .bokeh-wrap {
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
    }
    .bokeh {
      position: absolute; border-radius: 50%;
      filter: blur(80px); opacity: 0.18;
    }
    .b1 { width: 500px; height: 500px; background: #00E5FF; top: -120px; left: -100px; animation: drift1 14s ease-in-out infinite; }
    .b2 { width: 400px; height: 400px; background: #7C3AED; bottom: -80px; right: -80px; animation: drift2 18s ease-in-out infinite; }
    .b3 { width: 300px; height: 300px; background: #FF2D78; top: 40%; left: 60%; animation: drift3 12s ease-in-out infinite; }
    .b4 { width: 200px; height: 200px; background: #0070F3; top: 20%; right: 20%; animation: drift1 16s ease-in-out infinite 3s; }
    @keyframes drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
    @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px)} }
    @keyframes drift3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }

    /* Card */
    .login-card {
      position: relative; z-index: 1;
      width: 100%; max-width: 440px;
      margin: 24px;
      background: linear-gradient(145deg, rgba(20,30,55,0.95) 0%, rgba(10,16,38,0.98) 100%);
      border: 1px solid rgba(0,229,255,0.2);
      border-radius: 28px;
      padding: 40px 36px;
      box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05) inset;
      backdrop-filter: blur(20px);
    }

    /* Premium pill */
    .premium-pill {
      display: inline-flex; align-items: center; gap: 8px;
      background: linear-gradient(135deg,rgba(0,229,255,0.12),rgba(124,58,237,0.12));
      border: 1px solid rgba(0,229,255,0.25);
      border-radius: 999px; padding: 6px 14px;
      font-size: 12px; font-weight: 700; color: #00E5FF;
      margin-bottom: 22px;
      letter-spacing: 0.5px;
    }
    .premium-pill .dot { width: 7px; height: 7px; background: #00E5FF; border-radius: 50%; animation: blink 2s infinite; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

    /* Logo row */
    .logo-row {
      display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
    }
    .brand-text { display: flex; flex-direction: column; line-height: 1.15; }
    .brand-top { font-size: 16px; font-weight: 900; color: #fff; letter-spacing: 1px; }
    .brand-bot { font-size: 16px; font-weight: 900; letter-spacing: 1px;
      background: linear-gradient(135deg,#00E5FF,#FF2D78);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

    h1.card-title {
      font-size: 26px; font-weight: 900; color: #fff; margin: 0 0 6px;
    }
    .card-sub { font-size: 14px; color: #9ca3af; margin: 0 0 28px; }

    /* Input */
    .input-group { margin-bottom: 16px; }
    .input-group label { display: block; font-size: 12px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 7px; }
    .input-wrap {
      display: flex; align-items: center; gap: 10px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px; padding: 12px 14px;
      transition: border-color 0.2s;
    }
    .input-wrap:focus-within { border-color: #00E5FF; box-shadow: 0 0 0 3px rgba(0,229,255,0.08); }
    .input-wrap i { color: #6b7280; font-size: 14px; flex-shrink: 0; }
    .input-wrap input {
      flex: 1; background: transparent; border: none; outline: none;
      color: #fff; font-size: 14px;
    }
    .input-wrap input::placeholder { color: #4b5563; }

    .forgot { text-align: right; margin-top: -10px; margin-bottom: 20px; }
    .forgot a { font-size: 12px; color: #00E5FF; text-decoration: none; font-weight: 600; }
    .forgot a:hover { text-decoration: underline; }

    /* Buttons */
    .btn-start {
      width: 100%; padding: 14px;
      background: linear-gradient(135deg,#00E5FF,#0070F3);
      color: #001a22; font-size: 15px; font-weight: 900;
      border: none; border-radius: 14px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      margin-bottom: 12px;
      transition: all 0.2s;
      box-shadow: 0 6px 24px rgba(0,229,255,0.3);
    }
    .btn-start:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,229,255,0.45); }

    .btn-google {
      width: 100%; padding: 13px;
      background: transparent;
      color: #e5e7eb; font-size: 14px; font-weight: 700;
      border: 1.5px solid rgba(255,45,120,0.4);
      border-radius: 14px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      transition: all 0.2s;
      margin-bottom: 20px;
    }
    .btn-google:hover { border-color: rgba(255,45,120,0.8); background: rgba(255,45,120,0.06); color: #fff; }
    .google-icon { width: 20px; height: 20px; }

    .divider { display: flex; align-items: center; gap: 12px; margin: 0 0 16px; }
    .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
    .divider span { font-size: 12px; color: #4b5563; font-weight: 600; }

    .signup-link { text-align: center; font-size: 13px; color: #9ca3af; margin-top: 6px; }
    .signup-link a { color: #00E5FF; font-weight: 700; text-decoration: none; }
    .signup-link a:hover { text-decoration: underline; }

    /* Error / loading */
    .error-msg { background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.25); color: #f87171; font-size: 13px; padding: 10px 14px; border-radius: 10px; margin-bottom: 14px; display: none; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner { width: 16px; height: 16px; border: 2px solid rgba(0,26,34,0.3); border-top-color: #001a22; border-radius: 50%; animation: spin 0.7s linear infinite; display: none; }
  </style>
</head>
<body>
  <!-- Bokeh -->
  <div class="bokeh-wrap">
    <div class="bokeh b1"></div>
    <div class="bokeh b2"></div>
    <div class="bokeh b3"></div>
    <div class="bokeh b4"></div>
  </div>

  <!-- Login Card -->
  <div class="login-card">
    <div class="premium-pill">
      <div class="dot"></div>
      Premium AI Growth Platform
    </div>

    <div class="logo-row">
      ${ssLogo(48)}
      <div class="brand-text">
        <span class="brand-top">SOCIAL</span>
        <span class="brand-bot">STRATEGY</span>
      </div>
    </div>

    <h1 class="card-title">Unlock Full Power</h1>
    <p class="card-sub">Sign in to your AI growth command center</p>

    <div id="errorMsg" class="error-msg"></div>

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
        <input id="passInput" type="password" placeholder="••••••••" autocomplete="current-password">
        <i class="fas fa-eye" id="eyeToggle" onclick="togglePass()" style="cursor:pointer;color:#6b7280;transition:color 0.2s;" title="Show/hide password"></i>
      </div>
    </div>

    <div class="forgot">
      <a href="#">Forgot password?</a>
    </div>

    <button class="btn-start" id="signInBtn" onclick="handleSignIn()">
      <span id="btnText">Start Free</span>
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
        <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.1 6.4 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.1 6.4 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.5 26.8 36.5 24 36.5c-5.3 0-9.7-3.5-11.3-8.4l-6.5 5C9.6 39.7 16.3 44 24 44z"/>
        <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.4l6.2 5.2C41.9 35.5 44 30 44 24c0-1.3-.1-2.6-.4-3.9z"/>
      </svg>
      Continue with Google
    </button>

    <p class="signup-link">Don't have an account? <a href="/login">Start for free →</a></p>
  </div>

  <script>
    function togglePass() {
      const inp = document.getElementById('passInput');
      const eye = document.getElementById('eyeToggle');
      if (inp.type === 'password') {
        inp.type = 'text';
        eye.className = 'fas fa-eye-slash';
        eye.style.color = '#00E5FF';
      } else {
        inp.type = 'password';
        eye.className = 'fas fa-eye';
        eye.style.color = '#6b7280';
      }
    }

    function showError(msg) {
      const el = document.getElementById('errorMsg');
      el.textContent = msg;
      el.style.display = 'block';
    }

    function handleSignIn() {
      const email = document.getElementById('emailInput').value.trim();
      const pass = document.getElementById('passInput').value;
      document.getElementById('errorMsg').style.display = 'none';

      if (!email) { showError('Please enter your email address.'); return; }
      if (!email.includes('@')) { showError('Please enter a valid email address.'); return; }
      if (!pass) { showError('Please enter your password.'); return; }

      // Show loading state
      const btn = document.getElementById('signInBtn');
      document.getElementById('btnText').textContent = 'Signing in...';
      document.getElementById('btnArrow').style.display = 'none';
      document.getElementById('btnSpinner').style.display = 'block';
      btn.disabled = true;

      // Simulate auth → redirect to dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1200);
    }

    function handleGoogle() {
      // Show loading
      const btn = document.querySelector('.btn-google');
      btn.textContent = '⏳ Redirecting to Google...';
      btn.disabled = true;
      // Simulate Google OAuth redirect → dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    }

    // Allow Enter key to submit
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSignIn();
    });
  </script>
</body>
</html>`
}
