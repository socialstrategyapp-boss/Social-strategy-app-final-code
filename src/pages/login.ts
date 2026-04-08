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

    /* ───────────────────────────────────────────────────────────────
       BODY — dark blue base with neon fluoro splashes (REF-2 + REF-5)
       Per user: NOT flat dark blue, add splashes of cyan/purple/pink/gold
       ─────────────────────────────────────────────────────────────── */
    body {
      min-height: 100vh;
      background: #0a1428;
      background-image:
        radial-gradient(ellipse 140% 90% at 50% -15%, rgba(32,217,255,0.42) 0%, transparent 60%),
        radial-gradient(ellipse 100% 85% at 100% 105%, rgba(255,45,166,0.48) 0%, transparent 55%),
        radial-gradient(ellipse 90% 70% at -10% 65%, rgba(139,92,246,0.42) 0%, transparent 55%),
        radial-gradient(ellipse 70% 60% at 10% 100%, rgba(0,245,155,0.26) 0%, transparent 50%),
        radial-gradient(ellipse 60% 50% at 100% 10%, rgba(255,214,0,0.22) 0%, transparent 50%);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-x: hidden;
      position: relative;
    }

    /* circuit grid — lit neon cyan */
    body::before {
      content: '';
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background-image:
        linear-gradient(rgba(32,217,255,0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(32,217,255,0.08) 1px, transparent 1px);
      background-size: 48px 48px;
    }

    /* diagonal light streaks — REF-2 energy */
    body::after {
      content: '';
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background:
        linear-gradient(125deg, rgba(32,217,255,0.12) 0%, transparent 40%),
        linear-gradient(245deg, rgba(255,45,166,0.12) 0%, transparent 40%),
        linear-gradient(180deg, transparent 30%, rgba(139,92,246,0.10) 100%);
    }

    /* ───────────────────────────────────────────────────────────────
       LAYOUT
       ─────────────────────────────────────────────────────────────── */
    .page-wrap {
      position: relative; z-index: 1;
      width: 100%; min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px 16px;
    }

    /* ───────────────────────────────────────────────────────────────
       CARD — glassmorphism, MASTER-DESIGN-REFERENCE rules
       ─────────────────────────────────────────────────────────────── */
    .login-card {
      width: 100%; max-width: 490px;
      background: rgba(11,18,38,0.80);
      border: 2px solid rgba(32,217,255,0.40);
      border-radius: 32px;
      overflow: hidden;
      backdrop-filter: blur(38px) saturate(1.6);
      -webkit-backdrop-filter: blur(38px) saturate(1.6);
      box-shadow:
        0 0 0 1px rgba(32,217,255,0.12) inset,
        0 50px 120px rgba(0,0,0,0.70),
        0 0 90px rgba(32,217,255,0.22),
        0 0 150px rgba(139,92,246,0.18),
        0 0 220px rgba(255,45,166,0.12);
    }

    /* ───────────────────────────────────────────────────────────────
       HEADER — neon burst top, pink bloom bottom-right
       ─────────────────────────────────────────────────────────────── */
    .login-header {
      background: linear-gradient(175deg,
        rgba(10,30,75,0.90) 0%,
        rgba(8,20,55,0.85) 55%,
        rgba(10,15,40,0.80) 100%);
      border-bottom: 2px solid rgba(32,217,255,0.28);
      padding: 52px 40px 38px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    /* cyan explosion from top — REF-2 phone burst */
    .login-header::before {
      content: '';
      position: absolute;
      top: -90px; left: 50%; transform: translateX(-50%);
      width: 560px; height: 340px;
      border-radius: 50%;
      background: radial-gradient(ellipse, rgba(32,217,255,0.40) 0%, rgba(139,92,246,0.20) 50%, transparent 70%);
      pointer-events: none;
      filter: blur(14px);
    }
    /* hot pink bloom — bottom right */
    .login-header::after {
      content: '';
      position: absolute;
      bottom: -70px; right: -50px;
      width: 300px; height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,45,166,0.35) 0%, transparent 68%);
      pointer-events: none;
      filter: blur(12px);
    }

    /* ───────────────────────────────────────────────────────────────
       LOGO — 3D neon lit SS logo
       User: "same theme and 3D if you want"
       ─────────────────────────────────────────────────────────────── */
    .logo-wrap {
      width: clamp(120px, 28vw, 160px);
      height: clamp(120px, 28vw, 160px);
      margin: 0 auto 22px;
      position: relative; z-index: 1;
      filter:
        drop-shadow(0 0 32px rgba(32,217,255,0.80))
        drop-shadow(0 0 60px rgba(255,45,166,0.55))
        drop-shadow(0 0 85px rgba(139,92,246,0.45));
      animation: breathe 5s ease-in-out infinite;
    }
    .logo-wrap svg { width: 100% !important; height: 100% !important; }
    @keyframes breathe {
      0%,100% {
        filter:
          drop-shadow(0 0 32px rgba(32,217,255,0.80))
          drop-shadow(0 0 60px rgba(255,45,166,0.55))
          drop-shadow(0 0 85px rgba(139,92,246,0.45));
        transform: scale(1);
      }
      50% {
        filter:
          drop-shadow(0 0 48px rgba(32,217,255,1))
          drop-shadow(0 0 80px rgba(255,45,166,0.75))
          drop-shadow(0 0 110px rgba(139,92,246,0.65));
        transform: scale(1.05);
      }
    }

    /* brand name */
    .brand-name {
      font-size: 23px; font-weight: 900;
      letter-spacing: 3.2px; line-height: 1.1;
      position: relative; z-index: 1;
      margin-bottom: 7px;
      text-shadow: 0 0 24px rgba(32,217,255,0.70);
    }
    .brand-social   { color: #F4F7FB; }
    .brand-strategy { color: #FF2DA6; }

    /* tagline */
    .brand-tagline {
      font-size: 11px; font-weight: 600;
      color: #A8B3C7; letter-spacing: 1.1px;
      text-transform: uppercase;
      position: relative; z-index: 1;
      margin-bottom: 20px;
    }

    /* live pill */
    .live-pill {
      display: inline-flex; align-items: center; gap: 9px;
      background: rgba(0,245,155,0.10);
      border: 1.5px solid rgba(0,245,155,0.40);
      border-radius: 999px; padding: 7px 18px;
      font-size: 11px; font-weight: 700; color: #00F59B;
      letter-spacing: 0.5px; position: relative; z-index: 1;
      box-shadow: 0 0 18px rgba(0,245,155,0.30);
    }
    .live-dot {
      width: 9px; height: 9px; border-radius: 50%;
      background: #00F59B;
      box-shadow: 0 0 12px #00F59B, 0 0 24px #00F59B;
      animation: blink 2.2s infinite;
    }
    @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.85)} }

    /* ───────────────────────────────────────────────────────────────
       FORM BODY
       ─────────────────────────────────────────────────────────────── */
    .login-body {
      padding: 34px 40px 38px;
      background: rgba(5,14,38,0.55);
    }

    /* ───────────────────────────────────────────────────────────────
       MODE TOGGLE — REF-3 neon pill style
       ─────────────────────────────────────────────────────────────── */
    .mode-toggle {
      display: flex;
      background: rgba(6,12,35,0.85);
      border: 2px solid rgba(32,217,255,0.32);
      border-radius: 18px; padding: 7px; gap: 7px;
      margin-bottom: 30px;
      box-shadow: 0 0 24px rgba(32,217,255,0.15);
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
      box-shadow: 0 5px 24px rgba(32,217,255,0.50), 0 0 36px rgba(139,92,246,0.35);
    }
    /* neon orb on right — REF-3 style */
    .mode-btn.active::after {
      content: '';
      position: absolute;
      right: 15px; top: 50%; transform: translateY(-50%);
      width: 11px; height: 11px; border-radius: 50%;
      background: rgba(255,255,255,0.60);
      box-shadow: 0 0 12px rgba(255,255,255,0.80);
    }
    .mode-btn:not(.active):hover { color: #A8B3C7; background: rgba(32,217,255,0.10); }

    /* ───────────────────────────────────────────────────────────────
       FORM HEADINGS
       ─────────────────────────────────────────────────────────────── */
    .form-title {
      font-size: 29px; font-weight: 900;
      color: #F4F7FB; margin-bottom: 7px;
      line-height: 1.15;
      text-shadow: 0 0 20px rgba(32,217,255,0.45);
    }
    .form-sub {
      font-size: 14px; color: #A8B3C7; font-weight: 400;
      margin-bottom: 26px; line-height: 1.5;
    }

    /* ───────────────────────────────────────────────────────────────
       ERROR
       ─────────────────────────────────────────────────────────────── */
    .error-msg {
      background: rgba(248,113,113,0.12);
      border: 1.5px solid rgba(248,113,113,0.45);
      color: #f87171; font-size: 13px;
      padding: 13px 17px; border-radius: 15px;
      margin-bottom: 20px; display: none;
      align-items: center; gap: 10px;
      box-shadow: 0 0 18px rgba(248,113,113,0.20);
    }

    /* ───────────────────────────────────────────────────────────────
       FIELD LABELS
       ─────────────────────────────────────────────────────────────── */
    .field-label {
      display: block; font-size: 11px; font-weight: 700;
      color: #A8B3C7; text-transform: uppercase;
      letter-spacing: 1.3px; margin-bottom: 10px;
    }

    /* ───────────────────────────────────────────────────────────────
       INPUT FIELDS — neon fluoro borders
       ─────────────────────────────────────────────────────────────── */
    .input-group { margin-bottom: 22px; }
    .input-wrap {
      display: flex; align-items: center; gap: 14px;
      background: rgba(12,28,65,0.75);
      border: 2px solid rgba(32,217,255,0.40);
      border-radius: 17px;
      padding: 16px 19px;
      transition: all 0.28s;
    }
    .input-wrap:focus-within {
      border-color: #20D9FF;
      background: rgba(18,38,85,0.85);
      box-shadow:
        0 0 0 4px rgba(32,217,255,0.22),
        0 0 36px rgba(32,217,255,0.30),
        0 0 60px rgba(139,92,246,0.18);
    }
    .input-icon {
      color: #20D9FF; font-size: 18px; flex-shrink: 0;
      filter: drop-shadow(0 0 8px rgba(32,217,255,0.80));
    }
    .input-wrap input {
      flex: 1; background: transparent; border: none; outline: none;
      color: #F4F7FB; font-size: 15px; font-weight: 400; line-height: 1;
    }
    .input-wrap input::placeholder { color: #5a6b8f; font-weight: 400; }
    .eye-btn {
      background: none; border: none; cursor: pointer; padding: 4px;
      color: #5a6b8f; font-size: 17px;
      transition: color 0.24s; flex-shrink: 0;
    }
    .eye-btn:hover { color: #20D9FF; filter: drop-shadow(0 0 8px rgba(32,217,255,0.80)); }

    /* ───────────────────────────────────────────────────────────────
       PASSWORD STRENGTH
       ─────────────────────────────────────────────────────────────── */
    .strength-wrap { margin-top: 11px; display: none; }
    .strength-bar {
      height: 7px; border-radius: 999px;
      background: rgba(255,255,255,0.09); overflow: hidden;
    }
    .strength-fill {
      height: 100%; border-radius: 999px; width: 0%;
      transition: width .38s, background .38s;
      box-shadow: 0 0 10px currentColor;
    }
    .strength-label {
      font-size: 11px; font-weight: 600; margin-top: 7px;
      color: #6B7A99; display: none;
    }

    /* ───────────────────────────────────────────────────────────────
       REMEMBER + FORGOT ROW
       ─────────────────────────────────────────────────────────────── */
    .form-meta {
      display: flex; align-items: center;
      justify-content: space-between;
      margin-bottom: 26px;
    }
    .remember-row { display: flex; align-items: center; gap: 12px; }

    /* TOGGLE SWITCH — REF-4 pill track, white thumb, gradient ON */
    .toggle-switch { position: relative; width: 52px; height: 29px; flex-shrink: 0; }
    .toggle-switch input { opacity: 0; width: 0; height: 0; position: absolute; }
    .toggle-track {
      position: absolute; inset: 0;
      background: rgba(20,35,70,0.85);
      border: 2px solid rgba(32,217,255,0.30);
      border-radius: 999px; cursor: pointer;
      transition: all 0.32s;
    }
    .toggle-thumb {
      position: absolute;
      width: 23px; height: 23px; border-radius: 50%;
      background: #fff;
      box-shadow: 0 4px 10px rgba(0,0,0,0.55);
      top: 2px; left: 2px;
      transition: transform 0.32s cubic-bezier(.4,0,.2,1);
      pointer-events: none;
    }
    .toggle-switch input:checked ~ .toggle-track {
      background: linear-gradient(135deg, #20D9FF, #2F80FF);
      border-color: #20D9FF;
      box-shadow: 0 0 18px rgba(32,217,255,0.55), 0 0 30px rgba(47,128,255,0.35);
    }
    .toggle-switch input:checked ~ .toggle-track .toggle-thumb {
      transform: translateX(23px);
    }
    .remember-label {
      font-size: 13px; color: #A8B3C7;
      cursor: pointer; font-weight: 500;
    }
    .forgot-link {
      font-size: 13px; color: #20D9FF;
      text-decoration: none; font-weight: 600;
      transition: all 0.24s;
    }
    .forgot-link:hover {
      color: #fff;
      text-shadow: 0 0 18px rgba(32,217,255,0.90);
    }

    /* ───────────────────────────────────────────────────────────────
       PRIMARY BUTTON — REF-3 neon pill with gradient orb
       ─────────────────────────────────────────────────────────────── */
    .btn-primary {
      width: 100%; padding: 19px;
      background: linear-gradient(135deg, #20D9FF 0%, #2F80FF 50%, #8B5CF6 100%);
      color: #fff; font-size: 17px; font-weight: 800;
      border: none; border-radius: 999px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 13px;
      margin-bottom: 20px; letter-spacing: 0.5px;
      transition: all 0.28s; position: relative; overflow: hidden;
      box-shadow:
        0 0 40px rgba(32,217,255,0.55),
        0 0 70px rgba(139,92,246,0.40),
        0 10px 35px rgba(0,0,0,0.55);
    }
    /* inner shine */
    .btn-primary::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(160deg, rgba(255,255,255,0.24) 0%, transparent 58%);
      border-radius: 999px; pointer-events: none;
    }
    /* neon gradient orb on right — REF-3 style */
    .btn-primary::after {
      content: '';
      position: absolute; right: 20px; top: 50%; transform: translateY(-50%);
      width: 15px; height: 15px; border-radius: 50%;
      background: linear-gradient(135deg, #FF2DA6, #FFD600);
      box-shadow: 0 0 14px rgba(255,255,255,0.75);
    }
    .btn-primary:hover {
      transform: translateY(-4px);
      box-shadow:
        0 0 60px rgba(32,217,255,0.80),
        0 0 95px rgba(139,92,246,0.60),
        0 14px 45px rgba(0,0,0,0.65);
    }
    .btn-primary:active { transform: translateY(-1px); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    /* ───────────────────────────────────────────────────────────────
       DIVIDER
       ─────────────────────────────────────────────────────────────── */
    .divider {
      display: flex; align-items: center; gap: 15px;
      margin: 8px 0 18px;
    }
    .divider-line { flex: 1; height: 1px; background: rgba(32,217,255,0.18); }
    .divider span { font-size: 12px; color: #6B7A99; font-weight: 600; white-space: nowrap; }

    /* ───────────────────────────────────────────────────────────────
       GOOGLE BUTTON — REF-3 secondary neon pill
       User: "Google button won't have api cloud key thats ok ill sort it after"
       ─────────────────────────────────────────────────────────────── */
    .btn-google {
      width: 100%; padding: 17px;
      background: rgba(255,255,255,0.05);
      border: 2px solid rgba(32,217,255,0.32);
      color: #F4F7FB; font-size: 15px; font-weight: 700;
      border-radius: 999px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 13px;
      transition: all 0.28s; margin-bottom: 26px;
      letter-spacing: 0.4px; position: relative;
    }
    /* Google gradient orb right side — REF-3 style */
    .btn-google::after {
      content: '';
      position: absolute; right: 20px; top: 50%; transform: translateY(-50%);
      width: 14px; height: 14px; border-radius: 50%;
      background: linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335);
      box-shadow: 0 0 12px rgba(66,133,244,0.70);
    }
    .btn-google:hover {
      border-color: rgba(32,217,255,0.60);
      color: #fff;
      background: rgba(32,217,255,0.10);
      transform: translateY(-3px);
      box-shadow:
        0 0 30px rgba(32,217,255,0.30),
        0 8px 24px rgba(0,0,0,0.35);
    }
    .btn-google:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .google-svg { width: 23px; height: 23px; flex-shrink: 0; }

    /* ───────────────────────────────────────────────────────────────
       SOCIAL PLATFORM TILES — REF-1 3D clay style with neon glow
       User: "use the 3D icons and buttons and light them up in fluro neon style"
       ─────────────────────────────────────────────────────────────── */
    .social-section { margin-bottom: 26px; }
    .social-label {
      text-align: center; font-size: 10px; font-weight: 700;
      color: #A8B3C7; letter-spacing: 1.2px;
      text-transform: uppercase; margin-bottom: 15px;
    }
    .social-row {
      display: flex; align-items: center;
      justify-content: center; gap: 11px;
      flex-wrap: wrap;
    }
    /* 3D tile — REF-1 claymorphism with fluoro glow */
    .st {
      width: 48px; height: 48px;
      border-radius: 15px;
      display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden; flex-shrink: 0;
      /* 3D depth: top highlight, bottom shadow, neon glow — REF-1 exact */
      box-shadow:
        0 1px 0 rgba(255,255,255,0.24) inset,
        0 6px 18px rgba(0,0,0,0.65),
        0 2px 6px rgba(0,0,0,0.45),
        0 0 24px currentColor;
      transition: all 0.28s;
      cursor: default;
    }
    /* inner top gloss — REF-1 style */
    .st::before {
      content: '';
      position: absolute; top: 0; left: 0;
      width: 100%; height: 50%;
      background: linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%);
      border-radius: 15px 15px 0 0;
      pointer-events: none;
    }
    .st:hover {
      transform: translateY(-5px) scale(1.14);
      box-shadow:
        0 1px 0 rgba(255,255,255,0.24) inset,
        0 12px 30px rgba(0,0,0,0.75),
        0 0 40px currentColor;
    }
    .st svg { width: 25px; height: 25px; position: relative; z-index: 1; }

    /* Platform colors with matching neon glow (REF-1 brand tiles) */
    .st-ig  { background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: rgba(188,24,136,0.65); }
    .st-tk  { background: #000; border: 1px solid rgba(255,255,255,0.12); color: rgba(32,217,255,0.55); }
    .st-fb  { background: #1877F2; color: rgba(24,119,242,0.65); }
    .st-yt  { background: #FF0000; color: rgba(255,0,0,0.65); }
    .st-tw  { background: #000; color: rgba(96,165,250,0.55); }
    .st-li  { background: #0A66C2; color: rgba(10,102,194,0.65); }
    .st-pi  { background: #E60023; color: rgba(230,0,35,0.65); }
    .st-th  { background: linear-gradient(135deg, #000 60%, #333 100%); border: 1px solid rgba(255,255,255,0.12); color: rgba(139,92,246,0.55); }

    /* ───────────────────────────────────────────────────────────────
       SWITCH LINK
       ─────────────────────────────────────────────────────────────── */
    .switch-link {
      text-align: center; font-size: 14px;
      color: #6B7A99; font-weight: 500; line-height: 1.6;
    }
    .switch-link a {
      color: #20D9FF; font-weight: 700;
      text-decoration: none; cursor: pointer;
      transition: all 0.24s;
    }
    .switch-link a:hover {
      color: #fff;
      text-shadow: 0 0 18px rgba(32,217,255,0.90);
    }

    /* ───────────────────────────────────────────────────────────────
       ADMIN HIDDEN
       ─────────────────────────────────────────────────────────────── */
    .admin-link { text-align: right; margin-top: 15px; }
    .admin-link a {
      font-size: 10px; color: rgba(32,217,255,0.05);
      text-decoration: none; letter-spacing: 1px;
      transition: color 0.38s;
    }
    .admin-link a:hover { color: rgba(32,217,255,0.28); }

    /* ───────────────────────────────────────────────────────────────
       SPINNER
       ─────────────────────────────────────────────────────────────── */
    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner {
      width: 19px; height: 19px;
      border: 3px solid rgba(255,255,255,0.32);
      border-top-color: #fff; border-radius: 50%;
      animation: spin .75s linear infinite;
      display: none; flex-shrink: 0;
    }

    /* ───────────────────────────────────────────────────────────────
       HIDDEN SIGNUP FIELDS
       ─────────────────────────────────────────────────────────────── */
    #nameGroup { display: none; }
    #errorMsg  { display: none; }

    /* ───────────────────────────────────────────────────────────────
       RESPONSIVE
       ─────────────────────────────────────────────────────────────── */
    @media (max-width: 540px) {
      .login-header { padding: 38px 26px 30px; }
      .login-body   { padding: 28px 26px 32px; }
      .login-card   { border-radius: 28px; }
      .logo-wrap    { width: 110px !important; height: 110px !important; }
      .brand-name   { font-size: 20px; }
      .form-title   { font-size: 25px; }
      .st           { width: 44px; height: 44px; border-radius: 14px; }
      .st svg       { width: 22px; height: 22px; }
    }
    @media (max-height: 740px) {
      .login-header { padding: 30px 34px 24px; }
      .logo-wrap    { width: 95px !important; height: 95px !important; }
    }
  </style>
</head>
<body>

  <div class="page-wrap">
    <div class="login-card">

      <!-- ══════════════════════════════════════════════════════════
           HEADER
           ══════════════════════════════════════════════════════════ -->
      <div class="login-header">

        <!-- SS LOGO — exact, 3D neon lit (user: "same theme and 3D if you want") -->
        <div class="logo-wrap">
          ${ssLogo(320).replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"')}
        </div>

        <div class="brand-name">
          <span class="brand-social">SOCIAL</span>&nbsp;<span class="brand-strategy">STRATEGY</span>
        </div>
        <div class="brand-tagline">Strategy · Create · Schedule · Auto-Post</div>

        <div class="live-pill">
          <div class="live-dot"></div>
          AI Platform Live &nbsp;·&nbsp; 12,400+ Businesses
        </div>
      </div>

      <!-- ══════════════════════════════════════════════════════════
           FORM
           ══════════════════════════════════════════════════════════ -->
      <div class="login-body">

        <!-- MODE TOGGLE — REF-3 neon pill -->
        <div class="mode-toggle">
          <button class="mode-btn active" id="signinBtn" onclick="setMode('signin')">
            <i class="fas fa-sign-in-alt" style="margin-right:8px;font-size:13px;"></i>Sign In
          </button>
          <button class="mode-btn" id="signupBtn" onclick="setMode('signup')">
            <i class="fas fa-user-plus" style="margin-right:8px;font-size:13px;"></i>Create Account
          </button>
        </div>

        <div id="formTitle" class="form-title">Welcome Back</div>
        <div id="formSub"   class="form-sub">Sign in to your AI growth command centre</div>

        <!-- ERROR -->
        <div id="errorMsg" class="error-msg">
          <i class="fas fa-exclamation-circle"></i>
          <span id="errorText"></span>
        </div>

        <!-- NAME (signup only) -->
        <div class="input-group" id="nameGroup">
          <label class="field-label" for="nameInput">
            <i class="fas fa-user" style="margin-right:7px;"></i>Full Name
          </label>
          <div class="input-wrap">
            <i class="fas fa-user input-icon"></i>
            <input id="nameInput" type="text" placeholder="Your full name" autocomplete="name">
          </div>
        </div>

        <!-- EMAIL -->
        <div class="input-group">
          <label class="field-label" for="emailInput">
            <i class="fas fa-envelope" style="margin-right:7px;"></i>Email Address
          </label>
          <div class="input-wrap">
            <i class="fas fa-envelope input-icon"></i>
            <input id="emailInput" type="email" placeholder="you@yourbusiness.com" autocomplete="email">
          </div>
        </div>

        <!-- PASSWORD -->
        <div class="input-group">
          <label class="field-label" for="passInput">
            <i class="fas fa-lock" style="margin-right:7px;"></i>Password
          </label>
          <div class="input-wrap">
            <i class="fas fa-lock input-icon"></i>
            <input id="passInput" type="password" placeholder="••••••••" autocomplete="current-password" oninput="checkStrength(this.value)">
            <button class="eye-btn" id="eyeBtn" onclick="togglePass()" type="button" aria-label="Show/hide password">
              <i class="fas fa-eye" id="eyeIcon"></i>
            </button>
          </div>
          <div class="strength-wrap" id="strengthWrap">
            <div class="strength-bar"><div class="strength-fill" id="strengthFill"></div></div>
            <div class="strength-label" id="strengthLabel"></div>
          </div>
        </div>

        <!-- REMEMBER + FORGOT -->
        <div class="form-meta" id="formMeta">
          <div class="remember-row">
            <!-- TOGGLE SWITCH — REF-4 pill style -->
            <label class="toggle-switch" for="rememberMe" aria-label="Remember me">
              <input type="checkbox" id="rememberMe">
              <div class="toggle-track"><div class="toggle-thumb"></div></div>
            </label>
            <label class="remember-label" for="rememberMe">Remember me</label>
          </div>
          <a class="forgot-link" id="forgotLink" href="#" onclick="handleForgot(event)">
            <i class="fas fa-key" style="margin-right:6px;font-size:11px;"></i>Forgot password?
          </a>
        </div>

        <!-- PRIMARY CTA — REF-3 neon pill with gradient orb -->
        <button class="btn-primary" id="mainBtn" onclick="handleAuth()">
          <span id="btnText">Sign In</span>
          <div class="spinner" id="btnSpinner"></div>
          <i class="fas fa-arrow-right" id="btnArrow"></i>
        </button>

        <!-- DIVIDER -->
        <div class="divider">
          <div class="divider-line"></div>
          <span>or continue with</span>
          <div class="divider-line"></div>
        </div>

        <!-- GOOGLE BUTTON — REF-3 secondary neon pill, ready for OAuth hookup -->
        <button class="btn-google" onclick="handleGoogle()" id="googleBtn">
          <svg class="google-svg" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.6 2.5 30.1 0 24 0 14.7 0 6.8 5.4 3 13.3l7.8 6c1.9-5.6 7.1-9.8 13.2-9.8z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 6.9-10 6.9-17z"/>
            <path fill="#FBBC05" d="M10.8 28.7A14.5 14.5 0 0 1 9.5 24c0-1.7.3-3.3.8-4.7l-7.8-6A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.5 10.7l8.3-6z"/>
            <path fill="#34A853" d="M24 48c6.1 0 11.2-2 14.9-5.4l-7.5-5.8c-2 1.4-4.7 2.2-7.4 2.2-6.1 0-11.3-4.1-13.2-9.7l-8.3 6C6.8 42.6 14.7 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <!-- SOCIAL PLATFORMS — REF-1 3D clay tiles with neon fluoro glow -->
        <div class="social-section">
          <div class="social-label">
            <i class="fas fa-globe" style="margin-right:7px;color:#20D9FF;filter:drop-shadow(0 0 8px rgba(32,217,255,0.80));"></i>
            Manage all your platforms
          </div>
          <div class="social-row">

            <!-- Instagram -->
            <div class="st st-ig" title="Instagram">
              <svg viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </div>

            <!-- TikTok -->
            <div class="st st-tk" title="TikTok">
              <svg viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.54V6.78a4.85 4.85 0 0 1-1.02-.09z"/></svg>
            </div>

            <!-- Facebook -->
            <div class="st st-fb" title="Facebook">
              <svg viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </div>

            <!-- YouTube -->
            <div class="st st-yt" title="YouTube">
              <svg viewBox="0 0 24 24" fill="white"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
            </div>

            <!-- X / Twitter -->
            <div class="st st-tw" title="X / Twitter">
              <svg viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </div>

            <!-- LinkedIn -->
            <div class="st st-li" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </div>

            <!-- Pinterest -->
            <div class="st st-pi" title="Pinterest">
              <svg viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
            </div>

            <!-- Threads -->
            <div class="st st-th" title="Threads">
              <svg viewBox="0 0 24 24" fill="white"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.3-.883-2.342-.889H12c-.876.006-1.592.086-2.117.75a2.35 2.35 0 0 0-.35.59l-1.98-.498c.45-1.511 1.55-2.37 3.447-2.44H12c1.517.007 2.74.455 3.635 1.327 1.014.987 1.517 2.418 1.494 4.26l.044.068a7.2 7.2 0 0 1 1.436 1.31c.723.888 1.18 2.09 1.29 3.385.148 1.72-.218 3.817-1.777 5.337-1.824 1.78-4.098 2.448-7.226 2.473zM10.47 15.72c.646 0 1.217-.14 1.694-.414.644-.368 1.047-.955 1.197-1.743a11.864 11.864 0 0 0-2.548-.017c-.834.049-1.498.287-1.925.688-.34.318-.506.73-.477 1.175.055.98.962 1.566 2.059 1.566z"/></svg>
            </div>

          </div>
        </div>

        <!-- SWITCH MODE LINK -->
        <p class="switch-link" id="switchText">
          Don&#39;t have an account? <a onclick="setMode('signup')">Create one free &rarr;</a>
        </p>

        <div class="admin-link">
          <a href="/admin" title="">· · ·</a>
        </div>

      </div><!-- /.login-body -->
    </div><!-- /.login-card -->
  </div><!-- /.page-wrap -->

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
      document.getElementById('btnText').textContent = isSignup ? 'Create Account' : 'Sign In';
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
      document.getElementById('btnText').textContent = currentMode === 'signup' ? 'Creating account…' : 'Signing in…';
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
      // Hook up OAuth later — for now just show a message
      alert('Google OAuth will be connected later via Cloudflare.');
    }

    // Pre-fill remembered email
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
