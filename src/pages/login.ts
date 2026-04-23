import { ssLogo } from './layout'

export function loginPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign In – Social Strategy</title>
  <link rel="icon" href="data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%231ECAD6'/><circle cx='46' cy='44' r='32' fill='%23050d18'/><text y='58' x='46' font-size='36' font-weight='900' fill='white' font-family='Arial Black' text-anchor='middle'>SS</text><ellipse cx='68' cy='68' rx='16' ry='12' fill='%23FF2DA6'/><polygon points='56,72 64,84 72,74' fill='%23FF2DA6'/></svg>`)}">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *, *::before, *::after { font-family: 'Inter', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }

    /* BODY — transparent so the fixed bg div below handles the background (iOS Safari compatible) */
    body {
      min-height: 100vh;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-x: hidden;
      position: relative;
    }

    /* INTENSE circuit grid */
    body::before {
      content: '';
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background-image:
        linear-gradient(rgba(32,217,255,0.18) 1px, transparent 1px),
        linear-gradient(90deg, rgba(32,217,255,0.18) 1px, transparent 1px);
      background-size: 48px 48px;
    }

    /* INTENSE diagonal light streaks */
    body::after {
      content: '';
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background:
        linear-gradient(125deg, rgba(32,217,255,0.25) 0%, transparent 40%),
        linear-gradient(245deg, rgba(255,45,166,0.25) 0%, transparent 40%),
        linear-gradient(180deg, transparent 30%, rgba(139,92,246,0.20) 100%);
    }

    .page-wrap {
      position: relative; z-index: 1;
      width: 100%; min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px 16px;
    }

    /* CARD — GLOWING */
    .login-card {
      width: 100%; max-width: 490px;
      background: rgba(15,25,50,0.85);
      border: 3px solid rgba(32,217,255,0.70);
      border-radius: 32px;
      overflow: hidden;
      backdrop-filter: blur(38px) saturate(1.8);
      -webkit-backdrop-filter: blur(38px) saturate(1.8);
      box-shadow:
        0 0 0 1px rgba(32,217,255,0.30) inset,
        0 50px 120px rgba(0,0,0,0.70),
        0 0 120px rgba(32,217,255,0.50),
        0 0 200px rgba(139,92,246,0.40),
        0 0 280px rgba(255,45,166,0.30);
    }

    /* HEADER */
    .login-header {
      background: linear-gradient(175deg,
        rgba(15,35,85,0.90) 0%,
        rgba(10,25,65,0.85) 55%,
        rgba(12,20,50,0.80) 100%);
      border-bottom: 3px solid rgba(32,217,255,0.50);
      padding: 52px 40px 38px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .login-header::before {
      content: '';
      position: absolute;
      top: -90px; left: 50%; transform: translateX(-50%);
      width: 560px; height: 340px;
      border-radius: 50%;
      background: radial-gradient(ellipse, rgba(32,217,255,0.60) 0%, rgba(139,92,246,0.35) 50%, transparent 70%);
      pointer-events: none;
      filter: blur(14px);
    }
    .login-header::after {
      content: '';
      position: absolute;
      bottom: -70px; right: -50px;
      width: 300px; height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,45,166,0.55) 0%, transparent 68%);
      pointer-events: none;
      filter: blur(12px);
    }

    /* LOGO — INTENSE 3D neon */
    .logo-wrap {
      width: 200px;
      height: auto;
      margin: 0 auto 18px;
      position: relative; z-index: 1;
      display: flex; flex-direction: column; align-items: center;
      animation: breathe 5s ease-in-out infinite;
    }
    .logo-wrap img {
      width: 100%; border-radius: 22px;
      box-shadow: 0 0 45px rgba(32,217,255,0.9), 0 0 80px rgba(255,45,166,0.7);
    }
    .logo-text-top, .logo-text-bot {
      font-size: 22px;
      font-weight: 900;
      letter-spacing: 6px;
      text-transform: uppercase;
      white-space: nowrap;
      text-align: center;
      width: 100%;
      display: block;
    }
    .logo-text-top { color:#fff; text-shadow: 0 0 10px rgba(0,229,255,1), 0 0 20px rgba(0,229,255,0.6); margin-bottom: 8px; }
    .logo-text-bot { background:linear-gradient(135deg,#00E5FF,#FF2D78); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-top: 8px; }
    .logo-wrap svg { width: 100% !important; height: 100% !important; }
    @keyframes breathe {
      0%,100% {
        filter:
          drop-shadow(0 0 45px rgba(32,217,255,1))
          drop-shadow(0 0 80px rgba(255,45,166,0.80))
          drop-shadow(0 0 110px rgba(139,92,246,0.70));
        transform: scale(1);
      }
      50% {
        filter:
          drop-shadow(0 0 65px rgba(32,217,255,1))
          drop-shadow(0 0 110px rgba(255,45,166,1))
          drop-shadow(0 0 150px rgba(139,92,246,1));
        transform: scale(1.06);
      }
    }

    .brand-name {
      font-size: 23px; font-weight: 900;
      letter-spacing: 3.2px; line-height: 1.1;
      position: relative; z-index: 1;
      margin-bottom: 7px;
      text-shadow: 0 0 35px rgba(32,217,255,1);
    }
    .brand-social   { color: #F4F7FB; }
    .brand-strategy { color: #FF2DA6; text-shadow: 0 0 30px rgba(255,45,166,1); }

    .brand-tagline {
      font-size: 11px; font-weight: 600;
      color: #A8B3C7; letter-spacing: 1.1px;
      text-transform: uppercase;
      position: relative; z-index: 1;
      margin-bottom: 20px;
    }

    .live-pill {
      display: inline-flex; align-items: center; gap: 9px;
      background: rgba(0,245,155,0.18);
      border: 2px solid rgba(0,245,155,0.70);
      border-radius: 999px; padding: 7px 18px;
      font-size: 11px; font-weight: 700; color: #00F59B;
      letter-spacing: 0.5px; position: relative; z-index: 1;
      box-shadow: 0 0 30px rgba(0,245,155,0.60);
    }
    .live-dot {
      width: 9px; height: 9px; border-radius: 50%;
      background: #00F59B;
      box-shadow: 0 0 18px #00F59B, 0 0 35px #00F59B;
      animation: blink 2.2s infinite;
    }
    @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.85)} }

    .login-body {
      padding: 34px 40px 38px;
      background: rgba(8,18,42,0.70);
    }

    /* MODE TOGGLE — INTENSE neon */
    .mode-toggle {
      display: flex;
      background: rgba(8,15,40,0.90);
      border: 3px solid rgba(32,217,255,0.60);
      border-radius: 18px; padding: 7px; gap: 7px;
      margin-bottom: 30px;
      box-shadow: 0 0 40px rgba(32,217,255,0.40);
    }
    .mode-btn {
      flex: 1; padding: 14px 12px;
      border: none; border-radius: 14px;
      font-size: 14px; font-weight: 700;
      cursor: pointer; transition: all 0.28s;
      background: transparent; color: #6B7A99;
      letter-spacing: 0.4px;
      position: relative;
    }
    .mode-btn.active {
      background: linear-gradient(135deg, #20D9FF 0%, #2F80FF 50%, #8B5CF6 100%);
      color: #fff;
      box-shadow: 0 5px 30px rgba(32,217,255,0.80), 0 0 50px rgba(139,92,246,0.60);
    }
    .mode-btn.active::after {
      content: '';
      position: absolute;
      right: 15px; top: 50%; transform: translateY(-50%);
      width: 12px; height: 12px; border-radius: 50%;
      background: rgba(255,255,255,0.80);
      box-shadow: 0 0 18px rgba(255,255,255,1);
    }
    .mode-btn:not(.active):hover { color: #A8B3C7; background: rgba(32,217,255,0.15); }

    .form-title {
      font-size: 29px; font-weight: 900;
      color: #F4F7FB; margin-bottom: 7px;
      line-height: 1.15;
      text-shadow: 0 0 30px rgba(32,217,255,0.70);
    }
    .form-sub {
      font-size: 14px; color: #A8B3C7; font-weight: 400;
      margin-bottom: 26px; line-height: 1.5;
    }

    .error-msg {
      background: rgba(248,113,113,0.15);
      border: 2px solid rgba(248,113,113,0.60);
      color: #f87171; font-size: 13px;
      padding: 13px 17px; border-radius: 15px;
      margin-bottom: 20px; display: none;
      align-items: center; gap: 10px;
      box-shadow: 0 0 25px rgba(248,113,113,0.35);
    }

    .field-label {
      display: block; font-size: 11px; font-weight: 700;
      color: #20D9FF; text-transform: uppercase;
      letter-spacing: 1.3px; margin-bottom: 10px;
      text-shadow: 0 0 12px rgba(32,217,255,0.80);
    }

    /* INPUT FIELDS — INTENSE NEON GLOW */
    .input-group { margin-bottom: 22px; }
    .input-wrap {
      display: flex; align-items: center; gap: 14px;
      background: rgba(15,32,75,0.85);
      border: 3px solid rgba(32,217,255,0.70);
      border-radius: 17px;
      padding: 16px 19px;
      transition: all 0.28s;
      box-shadow: 
        0 0 0 1px rgba(32,217,255,0.30) inset,
        0 0 35px rgba(32,217,255,0.50);
    }
    .input-wrap:focus-within {
      border-color: #20D9FF;
      background: rgba(20,40,95,0.90);
      box-shadow:
        0 0 0 1px rgba(32,217,255,0.50) inset,
        0 0 0 5px rgba(32,217,255,0.30),
        0 0 50px rgba(32,217,255,0.80),
        0 0 80px rgba(139,92,246,0.40);
    }
    .input-icon {
      display: none;
    }
    .input-wrap input {
      flex: 1; background: transparent; border: none; outline: none;
      color: #F4F7FB; font-size: 15px; font-weight: 500; line-height: 1;
      text-shadow: 0 0 8px rgba(255,255,255,0.30);
    }
    .input-wrap input::placeholder { color: #5a6b8f; font-weight: 400; }
    .eye-btn { display: none; }

    .strength-wrap { margin-top: 11px; display: none; }
    .strength-bar {
      height: 7px; border-radius: 999px;
      background: rgba(255,255,255,0.09); overflow: hidden;
    }
    .strength-fill {
      height: 100%; border-radius: 999px; width: 0%;
      transition: width .38s, background .38s;
      box-shadow: 0 0 15px currentColor;
    }
    .strength-label {
      font-size: 11px; font-weight: 600; margin-top: 7px;
      color: #6B7A99; display: none;
    }

    .form-meta {
      display: flex; align-items: center;
      justify-content: space-between;
      margin-bottom: 26px;
    }
    .remember-row { display: flex; align-items: center; gap: 12px; }

    /* TOGGLE SWITCH — INTENSE glow */
    .toggle-switch { position: relative; width: 52px; height: 29px; flex-shrink: 0; }
    .toggle-switch input { opacity: 0; width: 0; height: 0; position: absolute; }
    .toggle-track {
      position: absolute; inset: 0;
      background: rgba(20,35,70,0.90);
      border: 2px solid rgba(32,217,255,0.50);
      border-radius: 999px; cursor: pointer;
      transition: all 0.32s;
      box-shadow: 0 0 20px rgba(32,217,255,0.25);
    }
    .toggle-thumb {
      position: absolute;
      width: 23px; height: 23px; border-radius: 50%;
      background: #fff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.60), 0 0 15px rgba(255,255,255,0.50);
      top: 2px; left: 2px;
      transition: transform 0.32s cubic-bezier(.4,0,.2,1);
      pointer-events: none;
    }
    .toggle-switch input:checked ~ .toggle-track {
      background: linear-gradient(135deg, #20D9FF, #2F80FF);
      border-color: #20D9FF;
      box-shadow: 0 0 30px rgba(32,217,255,0.80), 0 0 45px rgba(47,128,255,0.60);
    }
    .toggle-switch input:checked ~ .toggle-track .toggle-thumb {
      transform: translateX(23px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.60), 0 0 20px rgba(255,255,255,0.80);
    }
    .remember-label {
      font-size: 13px; color: #A8B3C7;
      cursor: pointer; font-weight: 500;
    }
    .forgot-link {
      font-size: 13px; color: #20D9FF;
      text-decoration: none; font-weight: 600;
      transition: all 0.24s;
      text-shadow: 0 0 12px rgba(32,217,255,0.60);
    }
    .forgot-link:hover {
      color: #fff;
      text-shadow: 0 0 25px rgba(32,217,255,1);
    }

    /* PRIMARY BUTTON — INTENSE neon pill */
    .btn-primary {
      width: 100%; padding: 19px 24px;
      background: linear-gradient(135deg, #20D9FF 0%, #2F80FF 50%, #8B5CF6 100%);
      color: #fff; font-size: 17px; font-weight: 800;
      border: none; border-radius: 999px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 13px;
      margin-bottom: 20px; letter-spacing: 0.5px;
      transition: all 0.28s; position: relative; overflow: hidden;
      box-shadow:
        0 0 60px rgba(32,217,255,0.80),
        0 0 100px rgba(139,92,246,0.60),
        0 10px 40px rgba(0,0,0,0.60);
    }
    .btn-primary::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(160deg, rgba(255,255,255,0.28) 0%, transparent 60%);
      border-radius: 999px; pointer-events: none;
    }
    .btn-primary::after {
      content: '';
      position: absolute; right: 20px; top: 50%; transform: translateY(-50%);
      width: 16px; height: 16px; border-radius: 50%;
      background: linear-gradient(135deg, #FF2DA6, #FFD600);
      box-shadow: 0 0 20px rgba(255,255,255,1);
    }
    .btn-primary:hover {
      transform: translateY(-4px);
      box-shadow:
        0 0 80px rgba(32,217,255,1),
        0 0 130px rgba(139,92,246,0.80),
        0 14px 50px rgba(0,0,0,0.70);
    }
    .btn-primary:active { transform: translateY(-1px); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    .divider {
      display: flex; align-items: center; gap: 15px;
      margin: 8px 0 18px;
    }
    .divider-line { flex: 1; height: 1px; background: rgba(32,217,255,0.25); }
    .divider span { font-size: 12px; color: #6B7A99; font-weight: 600; white-space: nowrap; }

    /* GOOGLE BUTTON — INTENSE neon */
    .btn-google {
      width: 100%; padding: 17px 24px;
      background: rgba(255,255,255,0.08);
      border: 3px solid rgba(32,217,255,0.60);
      color: #F4F7FB; font-size: 15px; font-weight: 700;
      border-radius: 999px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 13px;
      transition: all 0.28s; margin-bottom: 26px;
      letter-spacing: 0.4px; position: relative;
      box-shadow: 0 0 35px rgba(32,217,255,0.35);
    }
    .btn-google::after {
      content: '';
      position: absolute; right: 20px; top: 50%; transform: translateY(-50%);
      width: 15px; height: 15px; border-radius: 50%;
      background: linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335);
      box-shadow: 0 0 18px rgba(66,133,244,1);
    }
    .btn-google:hover {
      border-color: rgba(32,217,255,0.90);
      color: #fff;
      background: rgba(32,217,255,0.15);
      transform: translateY(-3px);
      box-shadow:
        0 0 50px rgba(32,217,255,0.60),
        0 8px 28px rgba(0,0,0,0.40);
    }
    .btn-google:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .google-svg { width: 23px; height: 23px; flex-shrink: 0; }

    /* SOCIAL ICONS — INTENSE NEON FLUORO GLOW */
    .social-section { margin-bottom: 26px; }
    .social-label {
      text-align: center; font-size: 10px; font-weight: 700;
      color: #20D9FF; letter-spacing: 1.2px;
      text-transform: uppercase; margin-bottom: 15px;
      text-shadow: 0 0 15px rgba(32,217,255,0.80);
    }
    .social-row {
      display: flex; align-items: center;
      justify-content: center; gap: 11px;
      flex-wrap: wrap;
    }
    /* REAL NEON ICON IMAGES — cropped from user's neon grid */
    .st {
      width: 62px; height: 62px;
      border-radius: 16px;
      display: flex; align-items: center; justify-content: center;
      position: relative; flex-shrink: 0;
      transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
      cursor: default;
      overflow: hidden;
    }
    .st img {
      width: 100%; height: 100%;
      object-fit: cover;
      border-radius: 14px;
      display: block;
    }
    /* Outer neon glow per brand */
    @keyframes iconGlow {
      0%,100% { opacity: 0.85; transform: scale(1); }
      50%      { opacity: 1;    transform: scale(1.15); }
    }
    .st::after {
      content: '';
      position: absolute;
      inset: -10px;
      border-radius: 20px;
      filter: blur(18px);
      opacity: 0.85;
      pointer-events: none;
      z-index: -1;
      animation: iconGlow 3s ease-in-out infinite;
    }
    .st:hover {
      transform: translateY(-9px) scale(1.18);
    }
    .st:hover::after { opacity: 1; transform: scale(1.4); animation: none; }

    /* Brand glow colours */
    .st-fb::after  { background: radial-gradient(circle, #1877F2, #60a5fa80); }
    .st-ig::after  { background: radial-gradient(circle, #dc2743, #bc188880); }
    .st-tk::after  { background: radial-gradient(circle, #20D9FF, #00ffff80); }
    .st-th::after  { background: radial-gradient(circle, #9333ea, #a855f780); }
    .st-yt::after  { background: radial-gradient(circle, #FF0000, #ff303080); }
    .st-tw::after  { background: radial-gradient(circle, #60a5fa, #93c5fd80); }
    .st-pi::after  { background: radial-gradient(circle, #E60023, #ff204080); }
    .st-li::after  { background: radial-gradient(circle, #0A66C2, #3b82f680); }

    .switch-link {
      text-align: center; font-size: 14px;
      color: #6B7A99; font-weight: 500; line-height: 1.6;
    }
    .switch-link a {
      color: #20D9FF; font-weight: 700;
      text-decoration: none; cursor: pointer;
      transition: all 0.24s;
      text-shadow: 0 0 12px rgba(32,217,255,0.60);
    }
    .switch-link a:hover {
      color: #fff;
      text-shadow: 0 0 25px rgba(32,217,255,1);
    }

    .admin-link { text-align: right; margin-top: 15px; }
    .admin-link a {
      font-size: 10px; color: rgba(32,217,255,0.05);
      text-decoration: none; letter-spacing: 1px;
      transition: color 0.38s;
    }
    .admin-link a:hover { color: rgba(32,217,255,0.28); }

    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner {
      width: 19px; height: 19px;
      border: 3px solid rgba(255,255,255,0.32);
      border-top-color: #fff; border-radius: 50%;
      animation: spin .75s linear infinite;
      display: none; flex-shrink: 0;
    }

    #nameGroup { display: none; }
    #errorMsg  { display: none; }

    @media (max-width: 540px) {
      .login-header { padding: 28px 16px 24px; }
      .login-body   { padding: 28px 16px 32px; }
      .login-card   { border-radius: 24px; }
      .logo-wrap    { width: 180px !important; margin-bottom: 16px !important; }
      .logo-text-top, .logo-text-bot { font-size: 20px !important; letter-spacing: 5px !important; }
      .brand-tagline { font-size: 10px; letter-spacing: 1px; }
      .form-title   { font-size: 25px; }
      .st           { width: 44px; height: 44px; border-radius: 14px; }
    }
    @media (max-height: 740px) {
      .login-header { padding: 24px 20px 20px; }
      .logo-wrap    { width: 160px !important; }
      .logo-text-top, .logo-text-bot { font-size: 18px !important; letter-spacing: 4px !important; }
    }
  </style>
</head>
<body>

  <!-- Fixed background layer — works on all browsers including iOS Safari -->
  <div aria-hidden="true" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:-1;pointer-events:none;
    background:url('/assets/bg-neon-burst.jpg') center center/cover no-repeat,
               #0a1428;"></div>

  <div class="page-wrap">
    <div class="login-card">

      <div class="login-header">
        <div class="logo-wrap">
          <span class="logo-text-top">SOCIAL</span>
          <img src="/assets/ss-logo-new.jpg" alt="Social Strategy" style="border-radius:22px;display:block;">
          <span class="logo-text-bot">STRATEGY</span>
        </div>

        <div class="brand-tagline">Strategy · Create · Schedule · Auto-Post</div>

        <div class="live-pill">
          <div class="live-dot"></div>
          AI Platform Live &nbsp;·&nbsp; 12,400+ Businesses
        </div>
      </div>

      <div class="login-body">

        <div class="mode-toggle">
          <button class="mode-btn active" id="signinBtn" onclick="setMode('signin')">
            SIGN IN
          </button>
          <button class="mode-btn" id="signupBtn" onclick="setMode('signup')">
            CREATE ACCOUNT
          </button>
        </div>

        <div id="formTitle" class="form-title">Welcome Back</div>
        <div id="formSub"   class="form-sub">Sign in to your AI growth command centre</div>

        <div id="errorMsg" class="error-msg">
          <i class="fas fa-exclamation-circle"></i>
          <span id="errorText"></span>
        </div>

        <div class="input-group" id="nameGroup">
          <label class="field-label" for="nameInput">
            FULL NAME
          </label>
          <div class="input-wrap">
            <input id="nameInput" type="text" placeholder="Your full name" autocomplete="name">
          </div>
        </div>

        <div class="input-group">
          <label class="field-label" for="emailInput">
            EMAIL ADDRESS
          </label>
          <div class="input-wrap">
            <input id="emailInput" type="email" placeholder="you@yourbusiness.com" autocomplete="email">
          </div>
        </div>

        <div class="input-group">
          <label class="field-label" for="passInput">
            PASSWORD
          </label>
          <div class="input-wrap">
            <input id="passInput" type="password" placeholder="••••••••" autocomplete="current-password" oninput="checkStrength(this.value)">

          </div>
          <div class="strength-wrap" id="strengthWrap">
            <div class="strength-bar"><div class="strength-fill" id="strengthFill"></div></div>
            <div class="strength-label" id="strengthLabel"></div>
          </div>
        </div>

        <div class="form-meta" id="formMeta">
          <div class="remember-row">
            <label class="toggle-switch" for="rememberMe" aria-label="Remember me">
              <input type="checkbox" id="rememberMe">
              <div class="toggle-track"><div class="toggle-thumb"></div></div>
            </label>
            <label class="remember-label" for="rememberMe">Remember me</label>
          </div>
          <a class="forgot-link" id="forgotLink" href="#" onclick="handleForgot(event)">
            Forgot password?
          </a>
        </div>

        <button class="btn-primary" id="mainBtn" onclick="handleAuth()">
          <span id="btnText" style="position:relative;z-index:2;">SIGN IN</span>
          <div class="spinner" id="btnSpinner"></div>
        </button>

        <div class="divider">
          <div class="divider-line"></div>
          <span>or continue with</span>
          <div class="divider-line"></div>
        </div>

        <button class="btn-google" onclick="handleGoogle()" id="googleBtn">
          <svg class="google-svg" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.6 2.5 30.1 0 24 0 14.7 0 6.8 5.4 3 13.3l7.8 6c1.9-5.6 7.1-9.8 13.2-9.8z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 6.9-10 6.9-17z"/>
            <path fill="#FBBC05" d="M10.8 28.7A14.5 14.5 0 0 1 9.5 24c0-1.7.3-3.3.8-4.7l-7.8-6A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.5 10.7l8.3-6z"/>
            <path fill="#34A853" d="M24 48c6.1 0 11.2-2 14.9-5.4l-7.5-5.8c-2 1.4-4.7 2.2-7.4 2.2-6.1 0-11.3-4.1-13.2-9.7l-8.3 6C6.8 42.6 14.7 48 24 48z"/>
          </svg>
          <span style="position:relative;z-index:2;">Continue with Google</span>
        </button>

        <div class="social-section">
          <div class="social-label">
            MANAGE ALL YOUR PLATFORMS
          </div>
          <div class="social-row">

            <div class="st st-ig" title="Instagram"><img src="/assets/icon-instagram.jpg" alt="Instagram"></div>

            <div class="st st-tk" title="TikTok"><img src="/assets/icon-tiktok.jpg" alt="TikTok"></div>

            <div class="st st-fb" title="Facebook"><img src="/assets/icon-facebook.jpg" alt="Facebook"></div>

            <div class="st st-yt" title="YouTube"><img src="/assets/icon-youtube.jpg" alt="YouTube"></div>

            <div class="st st-tw" title="X / Twitter"><img src="/assets/icon-x.jpg" alt="X"></div>

            <div class="st st-li" title="LinkedIn"><img src="/assets/icon-linkedin.jpg" alt="LinkedIn"></div>

            <div class="st st-pi" title="Pinterest"><img src="/assets/icon-pinterest.jpg" alt="Pinterest"></div>

            <div class="st st-th" title="Threads"><img src="/assets/icon-threads.jpg" alt="Threads"></div>

          </div>
        </div>

        <p class="switch-link" id="switchText">
          Don&#39;t have an account? <a onclick="setMode('signup')">Create one free &rarr;</a>
        </p>

        <div class="admin-link">
          <a href="/admin" title="">· · ·</a>
        </div>

      </div>
    </div>
  </div>

  <script>
    var currentMode = 'signin';

    function setMode(mode) {
      currentMode = mode;
      var isSignup = mode === 'signup';
      document.getElementById('signinBtn').className = 'mode-btn' + (!isSignup ? ' active' : '');
      document.getElementById('signupBtn').className = 'mode-btn' + (isSignup  ? ' active' : '');
      document.getElementById('nameGroup').style.display    = isSignup ? 'block' : 'none';
      document.getElementById('strengthWrap').style.display = isSignup ? 'block' : 'none';
      document.getElementById('forgotLink').style.display   = isSignup ? 'none'  : 'block';
      document.getElementById('formTitle').textContent = isSignup ? 'Create Your Account' : 'Welcome Back';
      document.getElementById('formSub').textContent   = isSignup
        ? 'Start your 14-day free trial — no credit card required'
        : 'Sign in to your AI growth command centre';
      document.getElementById('btnText').textContent = isSignup ? 'CREATE ACCOUNT' : 'SIGN IN';
      document.getElementById('errorMsg').style.display = 'none';
      document.getElementById('switchText').innerHTML = isSignup
        ? 'Already have an account? <a onclick="setMode(&quot;signin&quot;)">Sign in &rarr;</a>'
        : 'Don&#39;t have an account? <a onclick="setMode(&quot;signup&quot;)">Create one free &rarr;</a>';
    }

    function checkStrength(val) {
      if (currentMode !== 'signup') return;
      var fill  = document.getElementById('strengthFill');
      var label = document.getElementById('strengthLabel');
      label.style.display = 'block';
      if (!val) { fill.style.width = '0%'; label.style.display = 'none'; return; }
      var score = 0;
      if (val.length >= 8)          score++;
      if (/[A-Z]/.test(val))        score++;
      if (/[0-9]/.test(val))        score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;
      var levels = [
        { pct:'20%', color:'#f87171', lbl:'Too short'  },
        { pct:'40%', color:'#f87171', lbl:'Weak'       },
        { pct:'60%', color:'#fbbf24', lbl:'Fair'       },
        { pct:'80%', color:'#4ade80', lbl:'Good'       },
        { pct:'100%',color:'#00F59B', lbl:'Strong ✓'  }
      ];
      var lv = levels[Math.min(score, 4)];
      fill.style.width      = lv.pct;
      fill.style.background = lv.color;
      label.textContent     = lv.lbl;
      label.style.color     = lv.color;
    }

    function togglePass() {
      var inp  = document.getElementById('passInput');
      var icon = document.getElementById('eyeIcon');
      inp.type = inp.type === 'password' ? 'text' : 'password';
      icon.className = inp.type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    }

    function showError(msg) {
      var el = document.getElementById('errorMsg');
      document.getElementById('errorText').textContent = msg;
      el.style.display = 'flex';
    }

    function handleAuth() {
      var email = document.getElementById('emailInput').value.trim();
      var pass  = document.getElementById('passInput').value;
      document.getElementById('errorMsg').style.display = 'none';

      if (!email)                 { showError('Please enter your email address.'); return; }
      if (!email.includes('@'))   { showError('Please enter a valid email address.'); return; }
      if (!pass)                  { showError('Please enter your password.'); return; }
      if (currentMode === 'signup') {
        if (pass.length < 8)      { showError('Password must be at least 8 characters.'); return; }
        if (!document.getElementById('nameInput').value.trim()) {
          showError('Please enter your full name.'); return;
        }
      }

      var btn = document.getElementById('mainBtn');
      document.getElementById('btnText').textContent = currentMode === 'signup' ? 'CREATING ACCOUNT…' : 'SIGNING IN…';
      document.getElementById('btnArrow').style.display   = 'none';
      document.getElementById('btnSpinner').style.display = 'block';
      btn.disabled = true;

      if (document.getElementById('rememberMe').checked) {
        localStorage.setItem('ssRememberEmail', email);
      }

      setTimeout(function () { window.location.href = '/dashboard'; }, 1400);
    }

    function handleForgot(e) {
      e.preventDefault();
      var email = document.getElementById('emailInput').value.trim();
      if (!email) { showError('Enter your email above then click Forgot password.'); return; }
      alert('Password reset link sent to ' + email + ' (demo mode)');
    }

    function handleGoogle() {
      alert('Google OAuth will be connected later via Cloudflare.');
    }

    var remembered = localStorage.getItem('ssRememberEmail');
    if (remembered) {
      document.getElementById('emailInput').value = remembered;
      document.getElementById('rememberMe').checked = true;
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') handleAuth();
    });
  </script>
</body>
</html>`
}
