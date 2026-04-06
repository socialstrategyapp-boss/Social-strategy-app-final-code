import { layout, ssLogo } from './layout'

export function contentStudioPage(): string {
  const platforms = [
    { id: 'ig', name: 'Instagram', icon: 'fab fa-instagram', bg: 'linear-gradient(135deg,#E1306C,#F77737)', checked: true },
    { id: 'tk', name: 'TikTok', icon: 'fab fa-tiktok', bg: 'linear-gradient(135deg,#010101,#69C9D0)', checked: true },
    { id: 'fb', name: 'Facebook', icon: 'fab fa-facebook', bg: 'linear-gradient(135deg,#1877F2,#0d5fcc)', checked: true },
    { id: 'li', name: 'LinkedIn', icon: 'fab fa-linkedin', bg: 'linear-gradient(135deg,#0A66C2,#084c8f)', checked: true },
    { id: 'tw', name: 'X (Twitter)', icon: 'fab fa-twitter', bg: 'linear-gradient(135deg,#1DA1F2,#0d7abc)', checked: false },
    { id: 'yt', name: 'YouTube', icon: 'fab fa-youtube', bg: 'linear-gradient(135deg,#FF0000,#cc0000)', checked: false },
    { id: 'th', name: 'Threads', icon: 'fas fa-at', bg: 'linear-gradient(135deg,#333,#555)', checked: false },
    { id: 'pi', name: 'Pinterest', icon: 'fab fa-pinterest', bg: 'linear-gradient(135deg,#E60023,#ad081b)', checked: false },
  ]
  const platformIcons = { ig:'fab fa-instagram',tk:'fab fa-tiktok',fb:'fab fa-facebook',li:'fab fa-linkedin',tw:'fab fa-twitter',yt:'fab fa-youtube',th:'fas fa-at',pi:'fab fa-pinterest' }
  const platformBgs = { ig:'linear-gradient(135deg,#E1306C,#F77737)',tk:'linear-gradient(135deg,#010101,#69C9D0)',fb:'linear-gradient(135deg,#1877F2,#0d5fcc)',li:'linear-gradient(135deg,#0A66C2,#084c8f)',tw:'linear-gradient(135deg,#1DA1F2,#0d7abc)',yt:'linear-gradient(135deg,#FF0000,#cc0000)',th:'linear-gradient(135deg,#333,#555)',pi:'linear-gradient(135deg,#E60023,#ad081b)' }

  const content = `
<style>
  /* ── Content Studio overrides ── */
  .cs-page { padding: 0; }

  /* ── HERO BANNER (like landing page) ── */
  .cs-hero {
    position: relative; overflow: hidden;
    background: linear-gradient(160deg,
      rgba(2,5,18,0.99) 0%,
      rgba(3,8,24,0.98) 40%,
      rgba(4,6,22,0.99) 100%);
    border-bottom: 2px solid rgba(0,229,255,0.22);
    padding: 28px 28px 24px;
    box-shadow: 0 4px 40px rgba(0,0,0,0.6);
  }
  /* Neon bokeh orbs */
  .cs-hero::before {
    content:''; position:absolute; top:-80px; right:10%; width:380px; height:380px;
    background: radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 65%);
    pointer-events:none; animation: csOrbA 8s ease-in-out infinite;
  }
  .cs-hero::after {
    content:''; position:absolute; bottom:-60px; right:30%; width:280px; height:280px;
    background: radial-gradient(circle, rgba(255,45,120,0.06) 0%, transparent 65%);
    pointer-events:none; animation: csOrbB 10s ease-in-out infinite;
  }
  @keyframes csOrbA { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(20px) scale(1.08)} }
  @keyframes csOrbB { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-15px) scale(1.05)} }

  .cs-hero-inner { position:relative;z-index:1; display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; }
  .cs-hero-left { display:flex; align-items:center; gap:18px; }
  .cs-hero-logo-wrap {
    width:64px; height:64px; border-radius:18px; flex-shrink:0;
    animation: neonLogoGlow 3s ease-in-out infinite;
    position:relative;
  }
  .cs-hero-text h1 {
    font-size: 22px; font-weight: 900; color: #fff; margin: 0 0 3px;
    text-shadow: 0 0 24px rgba(0,229,255,0.6);
    letter-spacing: 0.5px;
  }
  .cs-hero-motto {
    font-size: 13px; font-weight: 600;
    background: linear-gradient(135deg, #00E5FF, #A78BFA, #FF2D78);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    margin: 0 0 4px; letter-spacing: 0.3px;
  }
  .cs-hero-sub { color: #7ab3d4; font-size: 12px; margin: 0; }

  .cs-hero-right { display:flex; align-items:center; gap:10px; flex-shrink:0; flex-wrap:wrap; justify-content:flex-end; }

  /* Old topbar kept as fallback but replaced by hero */
  .cs-topbar {
    position: sticky; top: 0; z-index: 30;
    background: rgba(2,6,20,0.97); backdrop-filter: blur(20px);
    border-bottom: 1.5px solid rgba(0,229,255,0.22);
    padding: 14px 24px; display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 4px 30px rgba(0,0,0,0.5);
  }
  .cs-topbar h1 { font-size: 20px; font-weight: 900; color: #fff; margin: 0;
    text-shadow: 0 0 20px rgba(0,229,255,0.5); }
  .cs-topbar p { color: #7ab3d4; font-size: 13px; margin: 2px 0 0; }

  /* ── MAIN LAYOUT ── */
  .cs-layout { display: grid; grid-template-columns: 310px 1fr; gap: 0; min-height: calc(100vh - 148px); width:100%; overflow:hidden; }
  @media(max-width:1100px){ .cs-layout{ grid-template-columns: 1fr; } }

  /* ── LEFT SIDEBAR ── */
  .cs-sidebar {
    background: linear-gradient(180deg, rgba(2,7,20,0.99) 0%, rgba(3,8,22,0.99) 100%);
    border-right: 1.5px solid rgba(0,229,255,0.15);
    overflow-y: auto; padding: 20px 16px 120px;
    display: flex; flex-direction: column; gap: 14px;
  }

  /* ── SECTION CARD ── */
  .cs-card {
    background: linear-gradient(135deg, rgba(3,10,26,0.98), rgba(4,11,24,0.99));
    border: 1.5px solid rgba(0,229,255,0.22);
    border-radius: 14px; padding: 16px;
    box-shadow: 0 0 20px rgba(0,229,255,0.04), 0 4px 16px rgba(0,0,0,0.4);
  }
  .cs-card-title {
    font-size: 12px; font-weight: 800; color: #00E5FF; text-transform: uppercase;
    letter-spacing: 1.2px; margin: 0 0 12px; display: flex; align-items: center; gap: 7px;
    text-shadow: 0 0 10px rgba(0,229,255,0.5);
  }
  .cs-card-title i { font-size: 13px; }

  /* ── FIELD LABEL ── */
  .cs-label { font-size: 11px; font-weight: 700; color: rgba(150,210,255,0.8);
    text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 6px; }

  /* ── INPUT / SELECT ── */
  .cs-input, .cs-select, .cs-textarea {
    width: 100%; background: rgba(3,8,24,0.95);
    border: 1.5px solid rgba(0,229,255,0.18); border-radius: 10px;
    padding: 9px 12px; color: #c8e6ff; font-size: 13px; outline: none;
    box-sizing: border-box; transition: border-color 0.2s, box-shadow 0.2s;
    font-family: inherit;
  }
  .cs-input:focus, .cs-select:focus, .cs-textarea:focus {
    border-color: rgba(0,229,255,0.65);
    box-shadow: 0 0 0 3px rgba(0,229,255,0.1), 0 0 18px rgba(0,229,255,0.12);
  }
  .cs-select option { background: #04091c; }
  .cs-textarea { resize: none; }

  /* ── MULTI-CHOICE CHIPS ── */
  .cs-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .cs-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 6px 12px; border-radius: 999px; font-size: 11px; font-weight: 700;
    cursor: pointer; border: 1.5px solid rgba(0,229,255,0.2);
    background: rgba(0,229,255,0.05); color: #7ab3d4;
    transition: all 0.18s; user-select: none;
  }
  .cs-chip:hover { border-color: rgba(0,229,255,0.5); color: #fff; }
  .cs-chip.active { background: rgba(0,229,255,0.15); border-color: rgba(0,229,255,0.6); color: #00E5FF;
    box-shadow: 0 0 10px rgba(0,229,255,0.2); text-shadow: 0 0 8px rgba(0,229,255,0.5); }
  .cs-chip.active-pink { background: rgba(255,45,120,0.14); border-color: rgba(255,45,120,0.55); color: #FF2D78;
    box-shadow: 0 0 10px rgba(255,45,120,0.2); }
  .cs-chip.active-purple { background: rgba(167,139,250,0.14); border-color: rgba(167,139,250,0.55); color: #A78BFA; }
  .cs-chip.active-yellow { background: rgba(255,214,0,0.1); border-color: rgba(255,214,0,0.45); color: #FFD600; }
  .cs-chip.active-green { background: rgba(0,255,136,0.1); border-color: rgba(0,255,136,0.45); color: #00ff88; }

  /* ── PLATFORM CHECKBOX ── */
  .plat-row { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 10px;
    cursor: pointer; transition: background 0.15s; }
  .plat-row:hover { background: rgba(0,229,255,0.05); }
  .plat-row input[type=checkbox] { width: 15px; height: 15px; accent-color: #00E5FF; flex-shrink: 0; }
  .plat-icon { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center;
    justify-content: center; flex-shrink: 0; box-shadow: 0 0 8px rgba(0,0,0,0.3); }
  .plat-icon i { color: #fff; font-size: 13px; }

  /* ── GENERATE BUTTON ── */
  .cs-gen-btn {
    width: 100%; padding: 15px; border-radius: 14px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #20D9FF 0%, #2F80FF 50%, #8B5CF6 100%);
    color: #050816; font-size: 15px; font-weight: 900; letter-spacing: 0.4px;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    box-shadow: 0 0 22px rgba(32,217,255,0.32), 0 4px 16px rgba(0,0,0,0.4);
    transition: all 0.25s; position: relative; overflow: hidden;
    margin-top: 6px;
  }
  .cs-gen-btn::before { content:''; position:absolute; inset:0;
    background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 50%); }
  .cs-gen-btn:hover { transform: translateY(-2px);
    box-shadow: 0 0 36px rgba(32,217,255,0.5), 0 6px 24px rgba(0,0,0,0.5); }

  /* ── VIDEO SCRIPT BTN ── */
  .cs-script-btn {
    width: 100%; padding: 11px; border-radius: 12px; cursor: pointer;
    background: rgba(255,45,166,0.06); border: 1.5px solid rgba(255,45,166,0.3);
    color: #FF2DA6; font-size: 13px; font-weight: 800;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.2s; box-shadow: 0 0 8px rgba(255,45,166,0.08);
  }
  .cs-script-btn:hover { background: rgba(255,45,166,0.12); box-shadow: 0 0 16px rgba(255,45,166,0.22); }

  /* ── RIGHT CONTENT AREA ── */
  .cs-right {
    display: flex; flex-direction: column;
    background: linear-gradient(160deg, rgba(2,6,18,0.99), rgba(3,8,20,0.99));
    overflow: hidden; min-width: 0; width: 100%;
  }

  /* ── TV VIEWER BOX ── */
  .cs-viewer {
    margin: 20px 20px 0;
    background: linear-gradient(160deg, rgba(2,5,18,0.99), rgba(3,8,22,0.99));
    border: 2px solid rgba(0,229,255,0.4);
    border-radius: 22px; overflow: hidden;
    box-shadow: 0 0 60px rgba(0,229,255,0.14), 0 0 100px rgba(124,58,237,0.07),
      0 8px 50px rgba(0,0,0,0.7), inset 0 0 80px rgba(0,229,255,0.03);
    flex-shrink: 0;
  }
  .cs-viewer-header {
    padding: 12px 18px; border-bottom: 1.5px solid rgba(0,229,255,0.18);
    background: linear-gradient(90deg, rgba(0,229,255,0.06), rgba(124,58,237,0.04));
    display: flex; align-items: center; justify-content: space-between;
  }
  .cs-viewer-title { font-size: 13px; font-weight: 800; color: #00E5FF;
    display: flex; align-items: center; gap: 8px; text-shadow: 0 0 12px rgba(0,229,255,0.6); }
  .cs-viewer-dots { display: flex; gap: 6px; }
  .cs-viewer-dots span { width: 11px; height: 11px; border-radius: 50%; }

  /* TV Screen */
  .cs-screen {
    min-height: 260px; position: relative; overflow: hidden;
    background: radial-gradient(ellipse at 20% 30%, rgba(0,229,255,0.07) 0%, transparent 55%),
                radial-gradient(ellipse at 80% 70%, rgba(255,45,120,0.06) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 60%),
                linear-gradient(180deg, rgba(2,5,18,0.99), rgba(3,8,22,0.99));
    display: flex; align-items: center; justify-content: center;
  }
  /* Scanline overlay effect */
  .cs-screen::before {
    content:''; position:absolute; inset:0; pointer-events:none; z-index:1;
    background: repeating-linear-gradient(
      0deg,
      transparent, transparent 2px,
      rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px
    );
  }
  .cs-screen-empty {
    text-align: center; padding: 50px 20px; display: flex; flex-direction: column;
    align-items: center; gap: 18px; position:relative; z-index:2;
  }
  .cs-tv-icon {
    width: 90px; height: 90px; border-radius: 24px;
    background: linear-gradient(135deg, rgba(0,229,255,0.12), rgba(124,58,237,0.08));
    border: 2px solid rgba(0,229,255,0.35);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 40px rgba(0,229,255,0.18), 0 0 70px rgba(124,58,237,0.08),
      inset 0 0 24px rgba(0,229,255,0.06);
    animation: tvPulse 3s ease-in-out infinite;
  }
  @keyframes tvPulse {
    0%,100%{ box-shadow: 0 0 20px rgba(0,229,255,0.15), inset 0 0 20px rgba(0,229,255,0.03); }
    50%{ box-shadow: 0 0 50px rgba(0,229,255,0.35), 0 0 80px rgba(124,58,237,0.12), inset 0 0 35px rgba(0,229,255,0.08); }
  }
  /* Content cards inside viewer */
  .cs-post-cards { display: flex; flex-direction: column; gap: 14px; padding: 18px; width: 100%; box-sizing:border-box; position:relative; z-index:2; max-height: 480px; overflow-y:auto; }
  .cs-post-card {
    background: rgba(3,9,24,0.97); border: 1.5px solid rgba(0,229,255,0.2);
    border-radius: 16px; overflow: hidden;
    box-shadow: 0 0 18px rgba(0,229,255,0.06), 0 4px 16px rgba(0,0,0,0.4);
    transition: border-color 0.2s, box-shadow 0.25s, transform 0.2s;
  }
  .cs-post-card:hover { border-color: rgba(0,229,255,0.45); box-shadow: 0 0 35px rgba(0,229,255,0.14); transform: translateY(-1px); }
  .cs-post-card.approved { border-color: rgba(74,222,128,0.5); box-shadow: 0 0 22px rgba(74,222,128,0.1); }
  .cs-post-card.rejected { border-color: rgba(248,113,113,0.38); opacity: 0.65; }

  /* Loop carousel animation */
  @keyframes csCardSlideIn {
    from { opacity:0; transform: translateY(18px) scale(0.97); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }
  .cs-post-card-anim { animation: csCardSlideIn 0.35s ease forwards; }
  .cs-post-card-anim:nth-child(1){ animation-delay:0.05s; }
  .cs-post-card-anim:nth-child(2){ animation-delay:0.12s; }
  .cs-post-card-anim:nth-child(3){ animation-delay:0.19s; }
  .cs-post-card-anim:nth-child(4){ animation-delay:0.26s; }
  .cs-post-card-anim:nth-child(5){ animation-delay:0.33s; }
  .cs-post-card-anim:nth-child(6){ animation-delay:0.40s; }
  .cs-post-card-anim:nth-child(7){ animation-delay:0.47s; }
  .cs-post-card-anim:nth-child(8){ animation-delay:0.54s; }

  /* Grid view */
  .cs-post-cards-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(260px,1fr)); gap:14px; padding:18px; box-sizing:border-box; max-height:480px; overflow-y:auto; }

  /* ── STATUS BAR ── */
  .cs-status {
    margin: 12px 20px 0;
    background: rgba(3,9,24,0.95); border: 1.5px solid rgba(0,229,255,0.2);
    border-radius: 12px; padding: 12px 16px;
    display: flex; align-items: center; gap: 12px;
    box-shadow: 0 0 16px rgba(0,229,255,0.05);
  }

  /* ── LOOP PREVIEW BAR ── */
  .cs-loop-bar {
    margin: 12px 20px 0;
    background: linear-gradient(135deg, rgba(255,45,120,0.08), rgba(124,58,237,0.06));
    border: 1.5px solid rgba(255,45,120,0.3);
    border-radius: 12px; padding: 10px 16px;
    display: none; align-items: center; gap: 12px;
  }

  /* ── BOTTOM ACTION BAR ── */
  .cs-action-bar {
    margin: 12px 16px 16px;
    background: rgba(5,8,22,0.96);
    border: 1.5px solid rgba(32,217,255,0.14);
    border-radius: 14px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    box-shadow: 0 2px 12px rgba(0,0,0,0.22);
  }
  /* All action bar buttons get uniform, consistent sizing */
  .cs-action-bar .cs-btn-ghost,
  .cs-action-bar .cs-btn-cyan,
  .cs-action-bar .cs-btn-pink,
  .cs-action-bar .cs-btn-green {
    flex: 0 0 auto;
    white-space: nowrap;
    padding: 10px 16px !important;
    font-size: 13px !important;
    justify-content: center;
  }
  /* Icon-only on very small screens */
  @media(max-width:480px){ .cs-btn-label{ display:none; } .cs-action-bar .cs-btn-ghost, .cs-action-bar .cs-btn-cyan, .cs-action-bar .cs-btn-pink, .cs-action-bar .cs-btn-green { padding: 9px 12px !important; } }

  /* Neon action buttons */
  .cs-btn-cyan {
    display: inline-flex; align-items: center; gap: 7px; padding: 10px 16px;
    border-radius: 12px; font-size: 13px; font-weight: 800; cursor: pointer; border: none;
    background: linear-gradient(135deg, #20D9FF, #2F80FF);
    color: #050816;
    box-shadow: 0 0 10px rgba(32,217,255,0.20);
    transition: all 0.2s;
  }
  .cs-btn-cyan:hover { transform: translateY(-2px); box-shadow: 0 0 18px rgba(32,217,255,0.38); }
  .cs-btn-pink {
    display: inline-flex; align-items: center; gap: 7px; padding: 10px 16px;
    border-radius: 12px; font-size: 13px; font-weight: 800; cursor: pointer; border: none;
    background: linear-gradient(135deg, #FF2DA6, #8B5CF6);
    color: #fff;
    box-shadow: 0 0 10px rgba(255,45,166,0.20);
    transition: all 0.2s;
  }
  .cs-btn-pink:hover { transform: translateY(-2px); box-shadow: 0 0 18px rgba(255,45,166,0.38); }
  .cs-btn-green {
    display: inline-flex; align-items: center; gap: 7px; padding: 10px 16px;
    border-radius: 12px; font-size: 13px; font-weight: 800; cursor: pointer; border: none;
    background: linear-gradient(135deg, #00F59B, #20D9FF);
    color: #050816;
    box-shadow: 0 0 10px rgba(0,245,155,0.18);
    transition: all 0.2s;
  }
  .cs-btn-green:hover { transform: translateY(-2px); box-shadow: 0 0 18px rgba(0,245,155,0.32); }
  .cs-btn-ghost {
    display: inline-flex; align-items: center; gap: 7px; padding: 10px 16px;
    border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer;
    background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.12);
    color: #A8B3C7; transition: all 0.2s;
  }
  .cs-btn-ghost:hover { background: rgba(255,255,255,0.08); color: #F4F7FB; border-color: rgba(255,255,255,0.25); }

  /* ── REVIEW MODAL ── */
  .cs-modal-wrap { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.88); z-index:2000; overflow-y:auto; padding:16px; display:none; align-items:flex-start; justify-content:center; }
  .cs-modal {
    max-width: 860px; width:100%; margin: 20px auto;
    background: linear-gradient(160deg, rgba(3,8,22,0.99), rgba(4,10,24,0.99));
    border: 1.5px solid rgba(0,229,255,0.28); border-radius: 24px; overflow: visible;
    box-shadow: 0 0 60px rgba(0,229,255,0.08), 0 0 100px rgba(124,58,237,0.05), 0 30px 80px rgba(0,0,0,0.7);
    box-sizing: border-box;
  }
  .cs-modal-head {
    padding: 18px 22px; border-bottom: 1.5px solid rgba(0,229,255,0.12);
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(0,229,255,0.03); border-radius: 24px 24px 0 0;
  }

  /* ── COLLAPSIBLE ── */
  .cs-collapsible { display: none; margin-top: 10px; }

  /* ── SECTION NEON DIVIDER ── */
  .cs-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(0,229,255,0.3), rgba(255,45,120,0.2), transparent); margin: 4px 0 12px; }
</style>

<!-- ═══════════════════════════════════════════════════
     HERO BANNER — neon landing-page style
═══════════════════════════════════════════════════ -->
<div class="cs-hero" style="position:sticky;top:0;z-index:30;">
  <div class="cs-hero-inner">
    <div class="cs-hero-left">
      <div class="cs-hero-logo-wrap">
        ${ssLogo(64)}
      </div>
      <div class="cs-hero-text">
        <h1><i class="fas fa-wand-magic-sparkles" style="color:#00E5FF;margin-right:8px;font-size:18px;text-shadow:0 0 14px rgba(0,229,255,0.7);"></i>AI Content Studio</h1>
        <p class="cs-hero-motto">Life is where you choose your content to be made ✨</p>
        <p class="cs-hero-sub">Design your brief · Generate · Preview · Edit · Publish</p>
      </div>
    </div>
    <div class="cs-hero-right">
      <button onclick="showHistory()" class="cs-btn-ghost" id="historyBtn">
        <i class="fas fa-history" style="color:#00E5FF;"></i> History
      </button>
      <button onclick="generateContent()" class="cs-btn-cyan" style="padding:11px 22px;font-size:14px;font-weight:900;">
        <i class="fas fa-wand-magic-sparkles"></i> Generate All
      </button>
    </div>
  </div>
</div>

<!-- MAIN LAYOUT -->
<div class="cs-layout">

  <!-- ════════════════════════════════════════
       LEFT SIDEBAR — BRIEF BUILDER
  ════════════════════════════════════════ -->
  <div class="cs-sidebar">

    <!-- Auto-fill notice (hidden by default, shown when filled from report) -->
    <div id="autoFillNotice" style="display:none;background:rgba(32,217,255,0.07);border:1px solid rgba(32,217,255,0.25);border-radius:10px;padding:9px 14px;font-size:12px;color:#20D9FF;font-weight:600;transition:opacity .4s;margin-bottom:6px;">
      ✨ Auto-filled from your last report
    </div>

    <!-- 1. Business Context -->
    <div class="cs-card">
      <div class="cs-card-title"><i class="fas fa-building"></i> Business Context</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div>
          <label class="cs-label">Brand Name</label>
          <input id="brandName" class="cs-input" type="text" placeholder="Your brand name...">
        </div>
        <div>
          <label class="cs-label">Website URL <span style="color:#6b7280;font-weight:400;text-transform:none;letter-spacing:0;">(optional — pulls from scan)</span></label>
          <input id="websiteUrl" class="cs-input" type="text" placeholder="https://yourbusiness.com">
        </div>
        <div>
          <label class="cs-label">Business Description <span style="color:#6b7280;font-weight:400;text-transform:none;letter-spacing:0;">(optional)</span></label>
          <textarea id="businessDesc" class="cs-textarea" rows="2" placeholder="Briefly describe what your business does and who you serve..."></textarea>
        </div>
        <div>
          <label class="cs-label">Industry / Niche</label>
          <select id="industry" class="cs-select">
            <option value="">Select industry...</option>
            <optgroup label="── Retail &amp; Commerce ──">
            <option>Retail &amp; E-commerce</option>
            <option>Fashion &amp; Apparel</option>
            <option>Jewellery &amp; Accessories</option>
            <option>Luxury Goods &amp; High-End Retail</option>
            <option>Sporting Goods &amp; Outdoor</option>
            <option>Toys &amp; Children's Products</option>
            <option>Home Goods &amp; Furniture</option>
            <option>Pet Supplies &amp; Services</option>
            <option>Baby &amp; Maternity Products</option>
            <option>Gift &amp; Novelty Store</option>
            <option>Books &amp; Stationery</option>
            <option>Vintage &amp; Secondhand Retail</option>
            </optgroup>
            <optgroup label="── Food &amp; Hospitality ──">
            <option>Food &amp; Beverage / Restaurant</option>
            <option>Café &amp; Coffee Shop</option>
            <option>Bakery &amp; Desserts</option>
            <option>Food Truck &amp; Street Food</option>
            <option>Catering &amp; Events</option>
            <option>Hospitality &amp; Accommodation</option>
            <option>Tourism &amp; Travel Agency</option>
            <option>Bar &amp; Nightlife</option>
            <option>Winery &amp; Brewery</option>
            <option>Fast Food &amp; QSR</option>
            <option>Meal Prep &amp; Delivery</option>
            <option>Vegan &amp; Plant-Based</option>
            </optgroup>
            <optgroup label="── Health &amp; Wellness ──">
            <option>Health, Beauty &amp; Wellness</option>
            <option>Fitness &amp; Personal Training</option>
            <option>Gym &amp; CrossFit Box</option>
            <option>Yoga &amp; Pilates Studio</option>
            <option>Salon &amp; Hair Studio</option>
            <option>Barber Shop</option>
            <option>Spa &amp; Day Spa</option>
            <option>Skincare &amp; Cosmetics</option>
            <option>Healthcare &amp; Medical</option>
            <option>Dental &amp; Orthodontics</option>
            <option>Allied Health &amp; Physiotherapy</option>
            <option>Mental Health &amp; Counselling</option>
            <option>Nutrition &amp; Dietetics</option>
            <option>Chiropractic &amp; Osteopathy</option>
            <option>Naturopathy &amp; Holistic Health</option>
            <option>Supplement &amp; Vitamins Brand</option>
            <option>Weight Loss &amp; Transformation</option>
            </optgroup>
            <optgroup label="── Professional Services ──">
            <option>Professional Services</option>
            <option>Legal &amp; Law Firm</option>
            <option>Accounting &amp; Bookkeeping</option>
            <option>Financial Services</option>
            <option>Financial Planning &amp; Wealth Management</option>
            <option>Insurance</option>
            <option>Mortgage &amp; Finance Broking</option>
            <option>HR &amp; Recruitment</option>
            <option>Business Consulting</option>
            <option>Marketing &amp; Advertising Agency</option>
            <option>PR &amp; Communications</option>
            <option>Translation &amp; Language Services</option>
            <option>Notary &amp; Document Services</option>
            </optgroup>
            <optgroup label="── Finance &amp; Crypto ──">
            <option>Cryptocurrency &amp; Blockchain</option>
            <option>NFT &amp; Web3</option>
            <option>DeFi &amp; Trading</option>
            <option>Stock Market &amp; Investing</option>
            <option>Forex &amp; Currency Trading</option>
            <option>Fintech &amp; Payments</option>
            <option>Banking &amp; Credit Unions</option>
            <option>Tax &amp; Accounting Services</option>
            </optgroup>
            <optgroup label="── Trades &amp; Property ──">
            <option>Trades &amp; Home Services</option>
            <option>Building &amp; Construction</option>
            <option>Electrical &amp; Plumbing</option>
            <option>HVAC &amp; Air Conditioning</option>
            <option>Pest Control</option>
            <option>Landscaping &amp; Gardening</option>
            <option>Pool &amp; Spa Maintenance</option>
            <option>Cleaning Services</option>
            <option>Interior Design &amp; Decorating</option>
            <option>Real Estate</option>
            <option>Real Estate Development</option>
            <option>Property Management</option>
            <option>Architecture</option>
            <option>Solar &amp; Renewable Energy</option>
            </optgroup>
            <optgroup label="── Tech &amp; Digital ──">
            <option>Technology / SaaS</option>
            <option>App Development</option>
            <option>Web Design &amp; Development</option>
            <option>Cybersecurity</option>
            <option>IT Support &amp; Services</option>
            <option>Cloud Services</option>
            <option>AI &amp; Machine Learning</option>
            <option>Data Analytics &amp; BI</option>
            <option>E-learning Platform</option>
            <option>Digital Marketing / SEO</option>
            <option>Social Media Management</option>
            <option>Game Development</option>
            <option>AR / VR &amp; Immersive Tech</option>
            </optgroup>
            <optgroup label="── Education &amp; Coaching ──">
            <option>Education &amp; Coaching</option>
            <option>Life Coaching &amp; Mindset</option>
            <option>Business Coaching</option>
            <option>Executive Coaching</option>
            <option>Kids Education &amp; Tutoring</option>
            <option>Music &amp; Arts Tuition</option>
            <option>Language School</option>
            <option>Sports Coaching</option>
            <option>Online Course Creator</option>
            <option>Motivational Speaking</option>
            <option>Career Development &amp; Resume</option>
            </optgroup>
            <optgroup label="── Creative &amp; Media ──">
            <option>Entertainment &amp; Media</option>
            <option>Photography &amp; Videography</option>
            <option>Content Creator &amp; Influencer</option>
            <option>Podcast &amp; Broadcasting</option>
            <option>Music &amp; Events</option>
            <option>DJ &amp; Entertainment</option>
            <option>Film &amp; Production</option>
            <option>Graphic Design &amp; Branding</option>
            <option>Publishing &amp; Writing</option>
            <option>Animation &amp; Motion Graphics</option>
            <option>Street Art &amp; Visual Arts</option>
            </optgroup>
            <optgroup label="── Sports &amp; Recreation ──">
            <option>Sports &amp; Recreation</option>
            <option>Professional Sports Team</option>
            <option>Martial Arts &amp; Boxing</option>
            <option>Surfing &amp; Water Sports</option>
            <option>Golf &amp; Country Club</option>
            <option>Dance Studio</option>
            <option>Cycling &amp; Triathlon</option>
            <option>Outdoor Adventures &amp; Hiking</option>
            <option>Hunting &amp; Fishing</option>
            <option>eSports &amp; Gaming</option>
            </optgroup>
            <optgroup label="── Events &amp; Entertainment ──">
            <option>Event Planning &amp; Management</option>
            <option>Wedding Planning</option>
            <option>Corporate Events</option>
            <option>Party &amp; Birthday Events</option>
            <option>Concert &amp; Festival Promotion</option>
            <option>Venue &amp; Function Centre</option>
            <option>Escape Room &amp; Family Entertainment</option>
            <option>Kids Party Entertainment</option>
            </optgroup>
            <optgroup label="── Automotive &amp; Industry ──">
            <option>Automotive</option>
            <option>Car Dealership</option>
            <option>Mechanical &amp; Auto Repair</option>
            <option>Detailing &amp; Car Care</option>
            <option>Motorbike &amp; Powersports</option>
            <option>Agriculture &amp; Rural</option>
            <option>Mining &amp; Resources</option>
            <option>Manufacturing &amp; Engineering</option>
            <option>Logistics &amp; Transport</option>
            <option>Freight &amp; Courier Services</option>
            <option>Waste &amp; Environmental Services</option>
            <option>Safety &amp; Compliance</option>
            </optgroup>
            <optgroup label="── Non-profit &amp; Community ──">
            <option>Non-profit &amp; Charity</option>
            <option>Community Organisation</option>
            <option>Religious Organisation</option>
            <option>Government &amp; Public Sector</option>
            <option>Sports Club &amp; Association</option>
            <option>Animal Shelter &amp; Rescue</option>
            <option>Environmental &amp; Conservation</option>
            <option>Social Enterprise</option>
            </optgroup>
            <optgroup label="── Lifestyle &amp; Personal Brand ──">
            <option>Personal Brand</option>
            <option>Lifestyle Blog &amp; Vlog</option>
            <option>Parenting &amp; Family</option>
            <option>Relationships &amp; Dating</option>
            <option>Travel &amp; Adventure</option>
            <option>Food &amp; Cooking (Personal)</option>
            <option>Fashion Blogging</option>
            <option>Home Decor &amp; DIY</option>
            <option>Sustainability &amp; Eco Living</option>
            </optgroup>
          </select>
        </div>
      </div>
    </div>

    <!-- Report hashtag suggestions (auto-populated from last analysis) -->
    <div class="cs-card" id="hashtagSuggestionsCard" style="display:none;">
      <div class="cs-card-title"><i class="fas fa-hashtag"></i> Hashtags from Your Report</div>
      <p style="font-size:11px;color:#A8B3C7;margin:0 0 8px;">Tap any tag to add it to your topic brief.</p>
      <div id="hashtagSuggestions" style="display:none;flex-wrap:wrap;gap:6px;"></div>
    </div>

    <!-- Content pillars from last report -->
    <div class="cs-card" id="reportPillarsCard" style="display:none;">
      <div class="cs-card-title"><i class="fas fa-layer-group"></i> Content Pillars from Report</div>
      <p style="font-size:11px;color:#A8B3C7;margin:0 0 8px;">Tap a pillar to use it as your topic.</p>
      <div id="reportPillars" style="display:none;flex-wrap:wrap;gap:6px;"></div>
    </div>

    <!-- 2. Tone of Voice -->
    <div class="cs-card">
      <div class="cs-card-title"><i class="fas fa-microphone"></i> Tone of Voice</div>
      <div class="cs-chips">
        ${['Professional','Friendly','Playful','Bold','Inspiring','Informative','Conversational','Urgent'].map((t,i) => `<span class="cs-chip${i===1?' active':''}" onclick="selectTone(this,'${t}')">${t}</span>`).join('')}
      </div>
    </div>

    <!-- 3. Content Topic -->
    <div class="cs-card">
      <div class="cs-card-title"><i class="fas fa-lightbulb" style="color:#FFD600;text-shadow:0 0 8px rgba(255,214,0,0.6);"></i> Content Topic</div>
      <textarea id="contentTopic" class="cs-textarea" rows="3" placeholder="e.g. Summer sale launch, behind the scenes, tips & tricks..."></textarea>
      <button onclick="toggleTopicIdeas()" style="margin-top:8px;width:100%;background:rgba(255,214,0,0.06);border:1.5px solid rgba(255,214,0,0.25);border-radius:10px;padding:7px;color:#FFD600;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:space-between;">
        <span><i class="fas fa-list" style="margin-right:6px;"></i>Topic Ideas</span>
        <i class="fas fa-chevron-down" id="topicChevron" style="transition:transform 0.2s;"></i>
      </button>
      <div class="cs-collapsible" id="topicIdeasBox">
        <div style="display:flex;flex-direction:column;gap:5px;margin-top:8px;">
          ${['Behind the scenes look','Top 5 tips for success','Client success story','Product/service launch','How-to tutorial','Trending news reaction','Team culture post','Limited time offer','FAQ: Common questions','Before & after transformation','New feature announcement','Customer testimonial spotlight'].map(idea=>`
          <div onclick="useTopicIdea(this)" style="padding:7px 10px;border-radius:8px;font-size:12px;color:#b8d4f0;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:7px;" onmouseover="this.style.background='rgba(255,214,0,0.07)';this.style.borderColor='rgba(255,214,0,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.03)';this.style.borderColor='rgba(255,255,255,0.06)'">
            <i class="fas fa-plus" style="color:#FFD600;font-size:9px;flex-shrink:0;"></i>${idea}
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- 4. Content Goal -->
    <div class="cs-card">
      <div class="cs-card-title"><i class="fas fa-bullseye" style="color:#FF2D78;text-shadow:0 0 8px rgba(255,45,120,0.6);"></i> Content Goal</div>
      <div class="cs-chips" id="goalChips">
        ${['Drive Sales','Build Awareness','Grow Followers','Educate Audience','Announce Event','Generate Leads','Community Engagement','Share Expertise'].map(g=>`<span class="cs-chip" onclick="toggleChip(this,'pink')">${g}</span>`).join('')}
      </div>
    </div>

    <!-- 5. Content Format -->
    <div class="cs-card">
      <div class="cs-card-title"><i class="fas fa-layer-group" style="color:#A78BFA;text-shadow:0 0 8px rgba(167,139,250,0.6);"></i> Content Format</div>
      <div class="cs-chips">
        ${['Short Reel / Video','Carousel Post','Single Image','Story / Status','Long-Form Post','Poll / Question','Quote Graphic','Product Showcase'].map(f=>`<span class="cs-chip" onclick="toggleChip(this,'purple')">${f}</span>`).join('')}
      </div>
    </div>

    <!-- 6. Target Audience -->
    <div class="cs-card">
      <div class="cs-card-title"><i class="fas fa-users" style="color:#00ff88;text-shadow:0 0 8px rgba(0,255,136,0.6);"></i> Target Audience</div>
      <div class="cs-chips" style="margin-bottom:8px;">
        ${['18–24','25–34','35–44','45–54','55+','All Ages'].map(a=>`<span class="cs-chip" onclick="toggleChip(this,'green')" style="font-size:10px;">${a}</span>`).join('')}
      </div>
      <div class="cs-chips">
        ${['Business Owners','Consumers','Parents','Students','Professionals','Gen Z','Millennials','Retirees'].map(a=>`<span class="cs-chip" onclick="toggleChip(this,'green')">${a}</span>`).join('')}
      </div>
    </div>

    <!-- 7. Post Timing -->
    <div class="cs-card">
      <div class="cs-card-title"><i class="fas fa-clock" style="color:#FFD600;text-shadow:0 0 8px rgba(255,214,0,0.6);"></i> Best Post Time</div>
      <div class="cs-chips">
        ${['Morning (6–9am)','Midday (11am–1pm)','Afternoon (3–5pm)','Evening (6–9pm)','Late Night (9pm+)','Auto Schedule'].map(t=>`<span class="cs-chip" onclick="toggleChip(this,'yellow')">${t}</span>`).join('')}
      </div>
    </div>

    <!-- 8. Hashtag Strategy -->
    <div class="cs-card">
      <div class="cs-card-title"><i class="fas fa-hashtag" style="color:#00E5FF;"></i> Hashtag Strategy</div>
      <div class="cs-chips">
        ${['Trending (broad)','Niche (specific)','Branded only','Mix (3 types)','No hashtags','Max 5','5–10 tags','20–30 tags'].map(h=>`<span class="cs-chip" onclick="toggleChip(this,'')" style="font-size:11px;">${h}</span>`).join('')}
      </div>
    </div>

    <!-- 9. Emoji Style -->
    <div class="cs-card">
      <div class="cs-card-title"><i class="fas fa-face-smile" style="color:#FFD600;"></i> Emoji & Vibe</div>
      <div class="cs-chips">
        ${['Heavy Emojis 🔥','Minimal Emojis','No Emojis','Opening Hook Only','Closing CTA Only','Throughout Post'].map(e=>`<span class="cs-chip" onclick="toggleChip(this,'yellow')">${e}</span>`).join('')}
      </div>
    </div>

    <!-- 10. Call to Action -->
    <div class="cs-card">
      <div class="cs-card-title"><i class="fas fa-arrow-pointer" style="color:#FF2D78;"></i> Call to Action</div>
      <div class="cs-chips">
        ${['Shop Now','Learn More','Book a Free Call','DM Us','Visit Website','Sign Up Free','Comment Below','Tag a Friend','Share This','Save for Later'].map(c=>`<span class="cs-chip" onclick="toggleChip(this,'pink')">${c}</span>`).join('')}
      </div>
    </div>

    <!-- Target Platforms -->
    <div class="cs-card">
      <div class="cs-card-title"><i class="fas fa-share-alt" style="color:#A78BFA;"></i> Target Platforms</div>
      <div style="display:flex;flex-direction:column;gap:2px;">
        ${platforms.map(p=>`
        <label class="plat-row">
          <input type="checkbox" id="plat_${p.id}" ${p.checked?'checked':''}>
          <div class="plat-icon" style="background:${p.bg};"><i class="${p.icon}"></i></div>
          <span style="font-size:13px;color:#c8e6ff;font-weight:600;">${p.name}</span>
        </label>`).join('')}
      </div>
    </div>

    <!-- Video Script -->
    <button onclick="openVideoScriptModal()" class="cs-script-btn">
      <i class="fas fa-video"></i> Generate Video Script
    </button>

    <!-- GENERATE BUTTON -->
    <button onclick="generateContent()" class="cs-gen-btn">
      <i class="fas fa-wand-magic-sparkles" style="font-size:18px;"></i>
      Generate Content
    </button>

  </div><!-- /cs-sidebar -->

  <!-- ════════════════════════════════════════
       RIGHT AREA — VIEWER + CONTENT
  ════════════════════════════════════════ -->
  <div class="cs-right">

    <!-- HISTORY PANEL (hidden) -->
    <div id="historyPanel" style="display:none;margin:16px 20px 0;background:rgba(3,9,24,0.95);border:1.5px solid rgba(0,229,255,0.2);border-radius:14px;padding:16px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <h4 style="font-size:14px;font-weight:800;color:#fff;margin:0;"><i class="fas fa-history" style="color:#00E5FF;margin-right:8px;"></i>Generation History</h4>
        <button onclick="showHistory()" style="background:transparent;border:none;color:#9ca3af;cursor:pointer;font-size:16px;">✕</button>
      </div>
      <div id="historyList" style="display:flex;flex-direction:column;gap:6px;max-height:160px;overflow-y:auto;">
        <div style="text-align:center;padding:16px;color:#6b7280;font-size:13px;">No history yet.</div>
      </div>
    </div>

    <!-- STATUS BAR -->
    <div class="cs-status" id="generateStatus">
      <div style="width:34px;height:34px;border-radius:50%;background:rgba(0,229,255,0.1);border:1.5px solid rgba(0,229,255,0.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 0 12px rgba(0,229,255,0.2);">
        <i class="fas fa-wand-magic-sparkles" style="color:#00E5FF;font-size:14px;"></i>
      </div>
      <div style="flex:1;">
        <div style="font-size:14px;font-weight:700;color:#fff;">Ready to generate</div>
        <div style="font-size:12px;color:#7ab3d4;margin-top:2px;">Fill in your brief on the left and hit Generate Content</div>
      </div>
    </div>

    <!-- LOOP PREVIEW BAR (shows after generation) -->
    <div class="cs-loop-bar" id="loopBar" style="display:none;">
      <div style="width:36px;height:36px;border-radius:50%;background:rgba(255,45,120,0.18);border:2px solid rgba(255,45,120,0.5);display:flex;align-items:center;justify-content:center;flex-shrink:0;animation:tvPulse 1.5s infinite;box-shadow:0 0 16px rgba(255,45,120,0.35);">
        <i class="fas fa-play" style="color:#FF2D78;font-size:13px;margin-left:2px;"></i>
      </div>
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:900;color:#FF2D78;text-shadow:0 0 10px rgba(255,45,120,0.6);">🎬 Content Preview Loop Active</div>
        <div style="font-size:11px;color:#9ca3af;margin-top:2px;" id="loopBarSub">Scroll the viewer below to see your posts</div>
      </div>
      <div id="loopDots" style="display:flex;gap:5px;align-items:center;flex-wrap:wrap;max-width:120px;"></div>
      <button onclick="autoLoopViewer()" style="background:rgba(255,45,120,0.12);border:1.5px solid rgba(255,45,120,0.4);color:#FF2D78;padding:6px 12px;border-radius:999px;font-size:11px;font-weight:800;cursor:pointer;flex-shrink:0;transition:all 0.2s;" title="Play all posts as a looping slideshow">
        <i class="fas fa-repeat" style="margin-right:4px;"></i>Auto Loop
      </button>
    </div>

    <!-- ══════════════════════
         TV VIEWER BOX
    ══════════════════════ -->
    <div class="cs-viewer" id="csViewer">
      <!-- Header with traffic lights -->
      <div class="cs-viewer-header">
        <div class="cs-viewer-title">
          <i class="fas fa-tv" style="font-size:14px;"></i>
          Content Preview Screen
          <span id="viewerPostCount" style="font-size:11px;font-weight:600;color:#6b7280;background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:20px;"></span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <!-- View toggle -->
          <div style="display:flex;gap:6px;">
            <button onclick="setViewerMode('list')" id="viewModeList" title="List view" style="background:rgba(0,229,255,0.15);border:1px solid rgba(0,229,255,0.4);border-radius:7px;padding:5px 9px;color:#00E5FF;cursor:pointer;font-size:11px;font-weight:700;transition:all 0.2s;"><i class="fas fa-list"></i></button>
            <button onclick="setViewerMode('grid')" id="viewModeGrid" title="Grid view" style="background:transparent;border:1px solid rgba(255,255,255,0.1);border-radius:7px;padding:5px 9px;color:#6b7280;cursor:pointer;font-size:11px;font-weight:700;transition:all 0.2s;"><i class="fas fa-grip"></i></button>
          </div>
          <div class="cs-viewer-dots">
            <span style="background:#ff5f57;box-shadow:0 0 6px rgba(255,95,87,0.7);"></span>
            <span style="background:#ffbd2e;box-shadow:0 0 6px rgba(255,189,46,0.7);"></span>
            <span style="background:#28c840;box-shadow:0 0 6px rgba(40,200,64,0.7);"></span>
          </div>
        </div>
      </div>

      <!-- THE SCREEN -->
      <div class="cs-screen" id="csScreen">
        <div class="cs-screen-empty" id="screenEmpty">
          <div class="cs-tv-icon">
            <i class="fas fa-tv" style="color:#00E5FF;font-size:32px;text-shadow:0 0 16px rgba(0,229,255,0.8);"></i>
          </div>
          <div>
            <div style="font-size:18px;font-weight:900;color:#fff;margin-bottom:8px;text-shadow:0 0 20px rgba(0,229,255,0.3);">Your Content Will Play Here</div>
            <div style="font-size:13px;color:#7ab3d4;max-width:340px;line-height:1.6;">Fill in your brief, choose your platforms, and hit <strong style="color:#00E5FF;">Generate Content</strong> — your posts will appear in this viewer for review and editing.</div>
          </div>
          <button onclick="generateContent()" class="cs-btn-cyan" style="margin-top:8px;">
            <i class="fas fa-wand-magic-sparkles"></i> Generate Now
          </button>
        </div>

        <!-- Post cards rendered here -->
        <div class="cs-post-cards" id="postCardsArea" style="display:none;"></div>
      </div>

      <!-- Viewer footer toolbar -->
      <div id="viewerToolbar" style="display:none;padding:10px 16px;border-top:1.5px solid rgba(0,229,255,0.12);background:rgba(0,229,255,0.03);align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
        <div style="font-size:12px;color:#7ab3d4;" id="approveProgress">0 of 0 approved</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button onclick="rejectAll()" style="background:rgba(248,113,113,0.08);border:1.5px solid rgba(248,113,113,0.3);color:#f87171;padding:7px 14px;border-radius:999px;font-size:12px;font-weight:800;cursor:pointer;transition:all 0.2s;"><i class="fas fa-times" style="margin-right:4px;"></i>Reject All</button>
          <button onclick="approveAll()" style="background:rgba(74,222,128,0.08);border:1.5px solid rgba(74,222,128,0.3);color:#4ade80;padding:7px 14px;border-radius:999px;font-size:12px;font-weight:800;cursor:pointer;transition:all 0.2s;"><i class="fas fa-check-double" style="margin-right:4px;"></i>Approve All</button>
          <button onclick="publishApproved()" class="cs-btn-cyan" style="padding:7px 16px;font-size:12px;">
            <i class="fas fa-paper-plane"></i> Publish Approved
          </button>
        </div>
      </div>
    </div>

    <!-- DEMO BANNER (shown without API key) -->
    <div id="demoBanner" style="display:none;margin:10px 20px 0;background:rgba(255,214,0,0.07);border:1.5px solid rgba(255,214,0,0.3);border-radius:12px;padding:10px 16px;font-size:13px;color:#FFD600;display:none;align-items:center;gap:10px;">
      <i class="fas fa-star" style="font-size:14px;text-shadow:0 0 8px rgba(255,214,0,0.6);"></i>
      <span><strong>Demo Mode</strong> — Sample content. Add your <a href="/settings" style="color:#FFD600;text-decoration:underline;">OpenAI API key</a> in Settings for real AI posts.</span>
    </div>

    <!-- BOTTOM ACTION BAR — centered, 5 equal buttons in two groups -->
    <div class="cs-action-bar" id="actionBar">
      <!-- Group 1: Utility actions -->
      <button onclick="regenerateContent()" class="cs-btn-ghost" id="regenBtn" title="Regenerate with same settings">
        <i class="fas fa-rotate-right"></i><span class="cs-btn-label"> Regenerate</span>
      </button>
      <button onclick="copyAll()" class="cs-btn-ghost" id="copyAllBtn" title="Copy all posts to clipboard">
        <i class="fas fa-copy"></i><span class="cs-btn-label"> Copy All</span>
      </button>
      <!-- Divider -->
      <div style="width:1px;height:28px;background:rgba(255,255,255,0.1);flex-shrink:0;"></div>
      <!-- Group 2: Review & publish actions -->
      <button onclick="openReviewModal(null)" class="cs-btn-cyan" id="reviewOpenBtn" title="Review and edit each post">
        <i class="fas fa-eye"></i><span class="cs-btn-label"> Review &amp; Edit</span>
      </button>
      <button onclick="scheduleAll()" class="cs-btn-pink" title="Schedule all approved posts">
        <i class="fas fa-calendar-plus"></i><span class="cs-btn-label"> Schedule All</span>
      </button>
      <button onclick="publishApproved()" class="cs-btn-green" id="publishBtn" title="Publish approved posts now">
        <i class="fas fa-paper-plane"></i><span class="cs-btn-label"> Publish</span>
      </button>
    </div>

    <!-- IMAGE GENERATION -->
    <div style="margin:0 20px 20px;background:linear-gradient(135deg,rgba(124,58,237,0.06),rgba(167,139,250,0.04));border:1.5px solid rgba(167,139,250,0.25);border-radius:16px;padding:18px;box-shadow:0 0 24px rgba(124,58,237,0.05);">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
        <div style="width:36px;height:36px;border-radius:10px;background:rgba(167,139,250,0.15);border:1.5px solid rgba(167,139,250,0.4);display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px rgba(167,139,250,0.25);">
          <i class="fas fa-image" style="color:#A78BFA;font-size:15px;text-shadow:0 0 8px rgba(167,139,250,0.6);"></i>
        </div>
        <div>
          <div style="font-size:14px;font-weight:800;color:#fff;">AI Image Generation</div>
          <div style="font-size:11px;color:#9ca3af;margin-top:1px;">Custom branded visuals for your posts</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px;">
        ${['Product Hero','Team Photo','Abstract Art'].map((img,idx)=>`
        <div onclick="generateImagePreset('${img}',${idx})" id="imgPreset${idx}" style="aspect-ratio:1;border-radius:10px;background:rgba(124,58,237,0.08);border:1.5px solid rgba(124,58,237,0.22);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;gap:6px;" onmouseover="this.style.background='rgba(124,58,237,0.2)';this.style.borderColor='rgba(167,139,250,0.5)'" onmouseout="this.style.background='rgba(124,58,237,0.08)';this.style.borderColor='rgba(124,58,237,0.22)'">
          <i class="fas fa-image" style="color:rgba(167,139,250,0.6);font-size:20px;"></i>
          <span style="font-size:11px;color:#A78BFA;font-weight:700;">${img}</span>
        </div>`).join('')}
      </div>
      <div style="display:flex;gap:8px;">
        <input id="customImagePrompt" type="text" class="cs-input" placeholder="Custom image prompt..." style="flex:1;">
        <button onclick="generateCustomImage()" class="cs-btn-ghost" id="genImgBtn" style="white-space:nowrap;flex-shrink:0;">
          <i class="fas fa-sparkles" style="color:#A78BFA;"></i> Generate
        </button>
      </div>
      <div id="generatedImageResult" style="display:none;margin-top:10px;"></div>
    </div>

  </div><!-- /cs-right -->
</div><!-- /cs-layout -->

<!-- ════════════════════════════════════════
     VIDEO SCRIPT MODAL
════════════════════════════════════════ -->
<div id="videoScriptModal" class="cs-modal-wrap">
  <div class="cs-modal" style="max-width:560px;">
    <div class="cs-modal-head">
      <div>
        <h3 style="font-size:18px;font-weight:900;color:#fff;margin:0;"><i class="fas fa-video" style="color:#FF2D78;margin-right:10px;text-shadow:0 0 8px rgba(255,45,120,0.6);"></i>Video Script Generator</h3>
        <p style="font-size:13px;color:#7ab3d4;margin:4px 0 0;">Create hooks, scenes &amp; captions with AI</p>
      </div>
      <button onclick="closeVideoScriptModal()" style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:#9ca3af;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:16px;transition:all 0.2s;">✕</button>
    </div>
    <div style="padding:20px;display:flex;flex-direction:column;gap:14px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div><label class="cs-label">Brand Name</label><input id="vsModalBrand" type="text" class="cs-input" placeholder="Your brand"></div>
        <div><label class="cs-label">Industry</label><input id="vsModalIndustry" type="text" class="cs-input" placeholder="Your industry"></div>
      </div>
      <div><label class="cs-label">Video Topic</label><input id="vsModalTopic" type="text" class="cs-input" placeholder="What is the video about?"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div><label class="cs-label">Platform</label>
          <select id="vsModalPlatform" class="cs-select"><option>TikTok</option><option>Instagram</option><option>YouTube</option><option>Facebook</option><option>LinkedIn</option></select>
        </div>
        <div><label class="cs-label">Duration</label>
          <select id="vsModalDuration" class="cs-select"><option value="15">15 seconds</option><option value="30" selected>30 seconds</option><option value="60">60 seconds</option><option value="90">90 seconds</option></select>
        </div>
      </div>
      <button id="vsGenerateBtn" onclick="generateVideoScriptFromModal()" class="cs-btn-pink" style="width:100%;padding:12px;font-size:14px;border-radius:12px;">
        <i class="fas fa-video"></i> Generate Script
      </button>
      <div id="vsScriptResult" style="display:none;max-height:340px;overflow-y:auto;padding:0 4px;"></div>
    </div>
  </div>
</div>

<!-- ════════════════════════════════════════
     FULL REVIEW MODAL
════════════════════════════════════════ -->
<div id="reviewModal" class="cs-modal-wrap">
  <div class="cs-modal">
    <div class="cs-modal-head">
      <div>
        <h2 style="font-size:20px;font-weight:900;color:#fff;margin:0;display:flex;align-items:center;gap:10px;">
          <i class="fas fa-eye" style="color:#00E5FF;text-shadow:0 0 10px rgba(0,229,255,0.6);"></i> Content Review
        </h2>
        <p style="font-size:13px;color:#7ab3d4;margin:4px 0 0;" id="reviewSubtitle">Review, edit and approve your posts</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span id="reviewCounter" style="font-size:12px;color:#9ca3af;background:rgba(255,255,255,0.06);padding:4px 12px;border-radius:20px;"></span>
        <button onclick="closeReviewModal()" style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:#9ca3af;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:16px;">✕</button>
      </div>
    </div>

    <!-- Mutation Panel -->
    <div style="padding:18px 28px;border-bottom:1.5px solid rgba(255,255,255,0.06);background:rgba(255,214,0,0.02);">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <div style="font-size:12px;font-weight:800;color:#FFD600;display:flex;align-items:center;gap:7px;text-shadow:0 0 8px rgba(255,214,0,0.4);">
          <i class="fas fa-sliders"></i> Adjust Before Approving
          <span style="font-size:11px;font-weight:500;color:#6b7280;">(optional)</span>
        </div>
        <button onclick="toggleMutationPanel()" id="mutationToggleBtn" style="font-size:11px;color:#9ca3af;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 10px;border-radius:6px;cursor:pointer;">Hide</button>
      </div>
      <div id="mutationFields" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div><label class="cs-label">Override Tone</label>
          <select id="mutTone" class="cs-select"><option value="">— Keep current —</option><option>Professional</option><option>Friendly</option><option>Playful</option><option>Bold</option><option>Inspiring</option><option>Urgent / FOMO</option></select>
        </div>
        <div><label class="cs-label">Post Length</label>
          <select id="mutLength" class="cs-select"><option value="">— Keep current —</option><option value="shorter">Shorter (punchy)</option><option value="longer">Longer (storytelling)</option><option value="bullet">Bullet-point format</option><option value="emoji">Emoji-heavy</option></select>
        </div>
        <div style="grid-column:1/-1;"><label class="cs-label">Custom Instruction</label>
          <input id="mutInstruction" type="text" class="cs-input" placeholder='e.g. "Add a clear CTA", "Mention our sale ends Friday"...'>
        </div>
      </div>
    </div>

    <!-- Review Cards -->
    <div id="reviewCardsList" style="padding:20px 28px;display:flex;flex-direction:column;gap:12px;max-height:50vh;overflow-y:auto;"></div>

    <!-- Footer -->
    <div style="padding:16px 28px;border-top:1.5px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;background:rgba(255,255,255,0.01);">
      <div style="font-size:13px;color:#9ca3af;" id="reviewApproveProgress">0 of 0 approved</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button onclick="rejectAll()" style="background:rgba(248,113,113,0.08);border:1.5px solid rgba(248,113,113,0.3);color:#f87171;padding:8px 16px;border-radius:999px;font-size:13px;font-weight:700;cursor:pointer;"><i class="fas fa-times" style="margin-right:4px;"></i>Reject All</button>
        <button onclick="approveAll()" style="background:rgba(74,222,128,0.08);border:1.5px solid rgba(74,222,128,0.3);color:#4ade80;padding:8px 16px;border-radius:999px;font-size:13px;font-weight:700;cursor:pointer;"><i class="fas fa-check-double" style="margin-right:4px;"></i>Approve All</button>
        <button onclick="publishApproved()" class="cs-btn-cyan" style="padding:8px 20px;font-size:13px;">
          <i class="fas fa-paper-plane"></i> Publish Approved
        </button>
      </div>
    </div>
  </div>
</div>

<script>
  const platformIcons = ${JSON.stringify(platformIcons)};
  const platformBgs = ${JSON.stringify(platformBgs)};
  let historyVisible = false;
  const generationHistory = [];
  let reviewPosts = [];
  let reviewStatus = {};
  let reviewParams = {};
  let activeCharacter = null;
  let viewerMode = 'list';

  // ── Tone selection ──
  function selectTone(el, tone) {
    document.querySelectorAll('.cs-chip[onclick*="selectTone"]').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
  }
  function getSelectedTone() {
    const a = document.querySelector('.cs-chip[onclick*="selectTone"].active');
    return a ? a.textContent.trim() : 'Friendly';
  }

  // ── Multi-choice chips ──
  function toggleChip(el, color) {
    const cls = color ? 'active-' + color : 'active';
    if (el.classList.contains('active') || el.classList.contains('active-' + color)) {
      el.classList.remove('active','active-pink','active-purple','active-green','active-yellow');
    } else {
      el.classList.remove('active','active-pink','active-purple','active-green','active-yellow');
      el.classList.add(cls);
    }
  }

  // ── Get selected chips for a container ──
  function getChips(containerSelector) {
    const active = document.querySelectorAll(containerSelector + ' .cs-chip.active, ' + containerSelector + ' [class*="active-"]');
    return Array.from(active).map(c => c.textContent.trim()).filter(Boolean);
  }

  // ── History panel ──
  function showHistory() {
    historyVisible = !historyVisible;
    document.getElementById('historyPanel').style.display = historyVisible ? 'block' : 'none';
  }

  // ── Topic ideas ──
  function toggleTopicIdeas() {
    const box = document.getElementById('topicIdeasBox');
    const ch = document.getElementById('topicChevron');
    const open = box.style.display !== 'none';
    box.style.display = open ? 'none' : 'block';
    ch.style.transform = open ? '' : 'rotate(180deg)';
  }
  function useTopicIdea(el) {
    const t = document.getElementById('contentTopic');
    t.value = el.textContent.trim();
    t.style.borderColor = 'rgba(0,229,255,0.65)';
    setTimeout(() => { t.style.borderColor = 'rgba(0,229,255,0.18)'; }, 1500);
    document.getElementById('topicIdeasBox').style.display = 'none';
    document.getElementById('topicChevron').style.transform = '';
  }

  // ── Viewer mode ──
  function setViewerMode(mode) {
    viewerMode = mode;
    document.getElementById('viewModeList').style.background = mode === 'list' ? 'rgba(0,229,255,0.15)' : 'transparent';
    document.getElementById('viewModeList').style.color = mode === 'list' ? '#00E5FF' : '#6b7280';
    document.getElementById('viewModeGrid').style.background = mode === 'grid' ? 'rgba(0,229,255,0.15)' : 'transparent';
    document.getElementById('viewModeGrid').style.color = mode === 'grid' ? '#00E5FF' : '#6b7280';
    const area = document.getElementById('postCardsArea');
    if (mode === 'grid') {
      area.style.display = 'grid';
      area.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
      area.style.padding = '16px';
    } else {
      area.style.display = 'flex';
      area.style.flexDirection = 'column';
      area.style.gridTemplateColumns = '';
    }
  }

  // ── Video script modal ──
  function openVideoScriptModal() {
    document.getElementById('vsModalBrand').value = document.getElementById('brandName').value || '';
    document.getElementById('vsModalIndustry').value = document.getElementById('industry').value || '';
    document.getElementById('vsModalTopic').value = document.getElementById('contentTopic').value || '';
    document.getElementById('videoScriptModal').style.display = 'flex';
  }
  function closeVideoScriptModal() { document.getElementById('videoScriptModal').style.display = 'none'; }

  async function generateVideoScriptFromModal() {
    const brandName = document.getElementById('vsModalBrand').value.trim();
    const industry = document.getElementById('vsModalIndustry').value;
    const topic = document.getElementById('vsModalTopic').value.trim();
    const platform = document.getElementById('vsModalPlatform').value;
    const duration = document.getElementById('vsModalDuration').value;
    const tone = getSelectedTone();
    if (!brandName || !topic) { alert('Please fill in Brand Name and Topic.'); return; }
    const btn = document.getElementById('vsGenerateBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    btn.disabled = true;
    const resultEl = document.getElementById('vsScriptResult');
    resultEl.style.display = 'none';
    try {
      const resp = await fetch('/api/generate-video-script', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ brandName, industry, tone, topic, platform, duration }) });
      const data = await resp.json();
      if (data.success) {
        resultEl.style.display = 'block';
        resultEl.innerHTML = \`<div style="background:rgba(255,45,120,0.07);border:1.5px solid rgba(255,45,120,0.25);border-radius:12px;padding:16px;margin-top:8px;">
          <div style="font-size:15px;font-weight:800;color:#fff;margin-bottom:8px;">\${data.title}</div>
          <div style="font-size:12px;color:#FF2D78;font-weight:700;margin-bottom:10px;text-shadow:0 0 8px rgba(255,45,120,0.4);">🎣 Hook: \${data.hook}</div>
          <div style="font-size:13px;color:#c8e6ff;line-height:1.7;white-space:pre-wrap;max-height:200px;overflow-y:auto;">\${data.script}</div>
          <div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap;">\${(data.hashtags||[]).slice(0,6).map(h=>\`<span style="font-size:11px;background:rgba(255,45,120,0.12);color:#FF2D78;padding:3px 8px;border-radius:20px;">\${h}</span>\`).join('')}</div>
        </div>\`;
      } else { alert(data.error || 'Video script generation failed.'); }
    } catch(e) { alert('Error generating video script.'); }
    btn.innerHTML = '<i class="fas fa-video"></i> Generate Script';
    btn.disabled = false;
  }

  // ── Image generation ──
  async function generateImagePreset(preset, idx) {
    const brandName = document.getElementById('brandName').value.trim() || 'My Brand';
    const industry = document.getElementById('industry').value || 'Business';
    const prompts = {
      'Product Hero': \`Professional product hero shot for \${brandName}, \${industry}, clean white background, studio lighting, premium quality\`,
      'Team Photo': \`Professional team photo for \${brandName}, modern office, diverse team, natural lighting, editorial style\`,
      'Abstract Art': \`Abstract brand art for \${brandName}, vibrant neon gradient colors, modern geometric shapes, digital art, \${industry} themed\`
    };
    document.getElementById('customImagePrompt').value = prompts[preset] || preset;
    await generateCustomImage();
  }

  async function generateCustomImage() {
    const prompt = document.getElementById('customImagePrompt').value.trim();
    if (!prompt) { alert('Please enter an image prompt or select a preset.'); return; }
    const btn = document.getElementById('genImgBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="color:#A78BFA;"></i> Generating...';
    btn.disabled = true;
    const resultEl = document.getElementById('generatedImageResult');
    try {
      const resp = await fetch('/api/generate-image', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ prompt, style:'vivid', size:'1024x1024' }) });
      const data = await resp.json();
      if (data.success && data.url) {
        resultEl.style.display = 'block';
        resultEl.innerHTML = \`<div style="border-radius:12px;overflow:hidden;border:1.5px solid rgba(167,139,250,0.3);">
          <img src="\${data.url}" alt="Generated" style="width:100%;display:block;border-radius:10px;">
          <div style="display:flex;gap:8px;margin-top:8px;">
            <a href="\${data.url}" target="_blank" style="flex:1;text-align:center;background:rgba(167,139,250,0.1);border:1.5px solid rgba(167,139,250,0.3);color:#A78BFA;font-size:12px;font-weight:700;padding:7px;border-radius:8px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:5px;"><i class="fas fa-external-link-alt"></i>Open Full Size</a>
          </div></div>\`;
      } else {
        resultEl.style.display = 'block';
        resultEl.innerHTML = \`<div style="color:#f87171;font-size:13px;padding:10px;">\${data.error || 'Image generation failed.'}</div>\`;
      }
    } catch(e) { alert('Error generating image.'); }
    btn.innerHTML = '<i class="fas fa-sparkles" style="color:#A78BFA;"></i> Generate';
    btn.disabled = false;
  }

  // ══════════════════════════════════════════════════
  //  MAIN GENERATE
  // ══════════════════════════════════════════════════
  function regenerateContent() {
    if (!document.getElementById('brandName').value.trim()) {
      alert('Please fill in your Brand Name first, then click Regenerate.');
      return;
    }
    generateContent();
  }

  async function generateContent() {
    const brandName = document.getElementById('brandName').value.trim();
    const industry = document.getElementById('industry').value;
    const tone = getSelectedTone();
    const topic = document.getElementById('contentTopic').value.trim();
    const websiteUrl = document.getElementById('websiteUrl').value.trim();
    const businessDesc = document.getElementById('businessDesc').value.trim();

    if (!brandName) {
      document.getElementById('brandName').style.borderColor = '#f87171';
      document.getElementById('brandName').placeholder = 'Brand name is required!';
      setTimeout(() => { document.getElementById('brandName').style.borderColor = 'rgba(0,229,255,0.18)'; document.getElementById('brandName').placeholder = 'Your brand name...'; }, 2200);
      return;
    }
    if (!topic) {
      document.getElementById('contentTopic').style.borderColor = '#f87171';
      document.getElementById('contentTopic').placeholder = 'Topic is required!';
      setTimeout(() => { document.getElementById('contentTopic').style.borderColor = 'rgba(0,229,255,0.18)'; document.getElementById('contentTopic').placeholder = 'e.g. Summer sale launch...'; }, 2200);
      return;
    }

    const selectedPlatforms = ['ig','tk','fb','li','tw','yt','th','pi']
      .filter(id => { const el = document.getElementById('plat_' + id); return el && el.checked; })
      .map(id => ({'ig':'Instagram','tk':'TikTok','fb':'Facebook','li':'LinkedIn','tw':'X (Twitter)','yt':'YouTube','th':'Threads','pi':'Pinterest'})[id]);

    if (selectedPlatforms.length === 0) { alert('Please select at least one platform.'); return; }

    reviewParams = { brandName, industry, tone, topic, websiteUrl, businessDesc, platforms: selectedPlatforms };

    // Show loading in status bar
    const status = document.getElementById('generateStatus');
    status.innerHTML = \`
      <div style="width:34px;height:34px;border-radius:50%;background:rgba(0,229,255,0.1);border:1.5px solid rgba(0,229,255,0.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <i class="fas fa-spinner fa-spin" style="color:#00E5FF;font-size:14px;"></i>
      </div>
      <div style="flex:1;">
        <div style="font-size:14px;font-weight:700;color:#fff;">AI is crafting your content...</div>
        <div style="font-size:12px;color:#7ab3d4;margin-top:2px;">Writing custom posts for \${selectedPlatforms.length} platform\${selectedPlatforms.length>1?'s':''}...</div>
      </div>
    \`;

    // Animate TV screen
    document.getElementById('screenEmpty').style.display = 'none';
    document.getElementById('postCardsArea').style.display = 'flex';
    document.getElementById('postCardsArea').style.flexDirection = 'column';
    document.getElementById('postCardsArea').innerHTML = \`
      <div style="text-align:center;padding:50px 20px;">
        <div style="width:60px;height:60px;border-radius:18px;background:rgba(0,229,255,0.1);border:2px solid rgba(0,229,255,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;animation:tvPulse 1s infinite;">
          <i class="fas fa-spinner fa-spin" style="color:#00E5FF;font-size:24px;"></i>
        </div>
        <div style="font-size:15px;font-weight:700;color:#fff;">Generating for \${selectedPlatforms.join(', ')}...</div>
        <div style="font-size:12px;color:#7ab3d4;margin-top:6px;">Your AI content is being crafted ✨</div>
      </div>
    \`;

    try {
      const resp = await fetch('/api/generate-content', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(reviewParams) });
      const data = await resp.json();

      if (!data.success || !data.posts) {
        status.innerHTML = \`<div style="width:34px;height:34px;border-radius:50%;background:rgba(248,113,113,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-exclamation-circle" style="color:#f87171;"></i></div><div style="font-size:14px;font-weight:700;color:#f87171;">\${data.error || 'Generation failed. Try again.'}</div>\`;
        document.getElementById('postCardsArea').innerHTML = '';
        document.getElementById('screenEmpty').style.display = 'flex';
        return;
      }

      // Demo banner
      if (data.demo) {
        document.getElementById('demoBanner').style.display = 'flex';
      }

      // Update history
      const ts = new Date().toLocaleTimeString();
      generationHistory.unshift({ brandName, topic, count: data.posts.length, ts });
      const hl = document.getElementById('historyList');
      if (hl) {
        hl.innerHTML = generationHistory.slice(0,10).map(h => \`
          <div style="padding:8px 12px;background:rgba(0,229,255,0.04);border:1px solid rgba(0,229,255,0.1);border-radius:8px;font-size:12px;color:#c8e6ff;display:flex;justify-content:space-between;align-items:center;">
            <span><strong style="color:#00E5FF;">\${h.brandName}</strong> — \${h.topic.substring(0,30)}...</span>
            <span style="color:#6b7280;">\${h.count} posts · \${h.ts}</span>
          </div>
        \`).join('');
      }

      // Store posts & init review status
      reviewPosts = data.posts;
      reviewStatus = {};
      data.posts.forEach((_, i) => { reviewStatus[i] = 'pending'; });

      // Render posts into viewer
      renderViewerCards();

      // Show loop bar
      const loopBar = document.getElementById('loopBar');
      loopBar.style.display = 'flex';
      document.getElementById('loopBarSub').textContent = data.posts.length + ' posts ready — review and approve below';
      const dots = document.getElementById('loopDots');
      dots.innerHTML = data.posts.map((p,i) => {
        const pidMap = {'Instagram':'ig','TikTok':'tk','Facebook':'fb','LinkedIn':'li','X (Twitter)':'tw','YouTube':'yt','Threads':'th','Pinterest':'pi'};
        const pid = pidMap[p.platform] || 'ig';
        const bg = platformBgs[pid] || '#333';
        return \`<div style="width:8px;height:8px;border-radius:50%;background:\${bg};box-shadow:0 0 6px rgba(255,255,255,0.3);" title="\${p.platform}"></div>\`;
      }).join('');

      // Show toolbar + review button
      document.getElementById('viewerToolbar').style.display = 'flex';
      // reviewOpenBtn is always visible now

      // Update status bar
      status.innerHTML = \`
        <div style="width:34px;height:34px;border-radius:50%;background:rgba(0,229,255,0.1);border:1.5px solid rgba(0,229,255,0.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 0 14px rgba(0,229,255,0.25);">
          <i class="fas fa-check" style="color:#00E5FF;font-size:13px;"></i>
        </div>
        <div style="flex:1;">
          <div style="font-size:14px;font-weight:700;color:#fff;">\${data.posts.length} posts generated! Review them in the viewer below</div>
          <div style="font-size:12px;color:#7ab3d4;margin-top:2px;">Edit directly in the boxes · Approve · then Publish</div>
        </div>
        <button onclick="openReviewModal(null)" class="cs-btn-cyan" style="padding:7px 14px;font-size:12px;flex-shrink:0;">
          <i class="fas fa-eye"></i> Review &amp; Edit
        </button>
      \`;
      updateApproveProgress();

    } catch(e) {
      status.innerHTML = \`<div style="width:34px;height:34px;border-radius:50%;background:rgba(248,113,113,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-exclamation-circle" style="color:#f87171;"></i></div><div style="font-size:14px;font-weight:700;color:#f87171;">Connection error. Please try again.</div>\`;
    }
  }

  // ── Render viewer post cards ──
  function renderViewerCards() {
    const area = document.getElementById('postCardsArea');
    area.style.display = viewerMode === 'grid' ? 'grid' : 'flex';
    if (viewerMode === 'grid') { area.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))'; area.style.padding = '16px'; }
    else { area.style.flexDirection = 'column'; area.style.gridTemplateColumns = ''; }

    area.innerHTML = reviewPosts.map((post, i) => {
      const pidMap = {'Instagram':'ig','TikTok':'tk','Facebook':'fb','LinkedIn':'li','X (Twitter)':'tw','YouTube':'yt','Threads':'th','Pinterest':'pi'};
      const pid = pidMap[post.platform] || 'ig';
      const bg = platformBgs[pid] || 'linear-gradient(135deg,#333,#555)';
      const icon = platformIcons[pid] || 'fas fa-share';
      const st = reviewStatus[i];
      const borderCol = st === 'approved' ? 'rgba(74,222,128,0.5)' : st === 'rejected' ? 'rgba(248,113,113,0.4)' : 'rgba(0,229,255,0.2)';
      const bgCol = st === 'approved' ? 'rgba(74,222,128,0.03)' : st === 'rejected' ? 'rgba(248,113,113,0.03)' : 'rgba(3,9,24,0.97)';
      const statusBadge = st === 'approved'
        ? \`<span style="font-size:11px;font-weight:800;color:#4ade80;background:rgba(74,222,128,0.12);padding:2px 8px;border-radius:20px;display:flex;align-items:center;gap:4px;"><i class="fas fa-check"></i>Approved</span>\`
        : st === 'rejected'
        ? \`<span style="font-size:11px;font-weight:800;color:#f87171;background:rgba(248,113,113,0.1);padding:2px 8px;border-radius:20px;display:flex;align-items:center;gap:4px;"><i class="fas fa-times"></i>Rejected</span>\`
        : \`<span style="font-size:11px;font-weight:600;color:#9ca3af;background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:20px;">Pending</span>\`;

      return \`
      <div id="vcard_\${i}" class="cs-post-card \${st} cs-post-card-anim" style="background:\${bgCol};border-color:\${borderCol};">
        <div style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.02);">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:28px;height:28px;border-radius:7px;background:\${bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 0 8px rgba(0,0,0,0.3);">
              <i class="\${icon}" style="color:#fff;font-size:12px;"></i>
            </div>
            <span style="font-size:13px;font-weight:700;color:#fff;">\${post.platform}</span>
            <span style="font-size:11px;color:#6b7280;">· \${post.type||'Post'}</span>
            \${statusBadge}
          </div>
          <div style="display:flex;gap:5px;">
            <button onclick="copyViewerCard(\${i})" id="vcopyBtn_\${i}" title="Copy" style="background:transparent;border:1px solid rgba(255,255,255,0.1);color:#9ca3af;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:11px;transition:all 0.2s;"><i class="fas fa-copy"></i></button>
            <button onclick="regenViewerCard(\${i})" id="vregenBtn_\${i}" title="Regenerate" style="background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.25);color:#fbbf24;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:11px;"><i class="fas fa-redo"></i></button>
          </div>
        </div>
        <div style="padding:12px 14px;">
          <textarea id="vtarea_\${i}" rows="4" style="width:100%;background:rgba(0,229,255,0.02);border:1.5px solid rgba(0,229,255,0.1);border-radius:9px;padding:9px 11px;color:#c8e6ff;font-size:13px;line-height:1.7;font-family:inherit;outline:none;resize:vertical;box-sizing:border-box;transition:border-color 0.2s;" onfocus="this.style.borderColor='rgba(0,229,255,0.4)'" onblur="this.style.borderColor='rgba(0,229,255,0.1)'">\${post.content}</textarea>
          \${post.hashtags && post.hashtags.length ? \`<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:5px;">\${post.hashtags.slice(0,8).map(h=>\`<span style="font-size:10px;background:rgba(0,229,255,0.08);border:1px solid rgba(0,229,255,0.2);color:#00E5FF;padding:2px 8px;border-radius:20px;">\${h.startsWith('#')?h:'#'+h}</span>\`).join('')}</div>\` : ''}
          \${post.tip ? \`<div style="margin-top:8px;padding:7px 10px;background:rgba(255,214,0,0.06);border-left:3px solid rgba(255,214,0,0.5);border-radius:0 8px 8px 0;font-size:11px;color:#FFD600;"><i class="fas fa-lightbulb" style="margin-right:5px;"></i>\${post.tip}</div>\` : ''}
        </div>
        <div style="padding:8px 14px 12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;">
          <div style="display:flex;gap:6px;">
            <button onclick="setViewerStatus(\${i},'approved')" style="background:\${st==='approved'?'rgba(74,222,128,0.2)':'rgba(74,222,128,0.07)'};border:1.5px solid rgba(74,222,128,\${st==='approved'?'0.55':'0.25'});color:#4ade80;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:5px;transition:all 0.2s;">
              <i class="fas fa-check"></i> Approve
            </button>
            <button onclick="setViewerStatus(\${i},'rejected')" style="background:\${st==='rejected'?'rgba(248,113,113,0.18)':'rgba(248,113,113,0.06)'};border:1.5px solid rgba(248,113,113,\${st==='rejected'?'0.5':'0.18'});color:#f87171;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:5px;transition:all 0.2s;">
              <i class="fas fa-times"></i> Reject
            </button>
          </div>
          <button onclick="scheduleViewerCard(\${i})" style="background:transparent;border:1.5px solid rgba(0,229,255,0.2);color:#00E5FF;padding:5px 12px;border-radius:999px;font-size:11px;cursor:pointer;font-weight:700;display:flex;align-items:center;gap:4px;transition:all 0.2s;"><i class="fas fa-calendar"></i>Schedule</button>
        </div>
      </div>\`;
    }).join('');

    document.getElementById('viewerPostCount').textContent = reviewPosts.length + ' posts';
  }

  function setViewerStatus(i, status) {
    const ta = document.getElementById('vtarea_' + i);
    if (ta) reviewPosts[i].content = ta.value;
    reviewStatus[i] = status;
    renderViewerCards();
    updateApproveProgress();
  }

  function approveAll() {
    reviewPosts.forEach((_, i) => { const ta = document.getElementById('vtarea_' + i) || document.getElementById('rtarea_' + i); if (ta) reviewPosts[i].content = ta.value; reviewStatus[i] = 'approved'; });
    renderViewerCards(); renderReviewCards(); updateApproveProgress();
  }
  function rejectAll() {
    reviewPosts.forEach((_, i) => { reviewStatus[i] = 'rejected'; });
    renderViewerCards(); renderReviewCards(); updateApproveProgress();
  }
  function updateApproveProgress() {
    const approved = Object.values(reviewStatus).filter(s => s === 'approved').length;
    const txt = approved + ' of ' + reviewPosts.length + ' approved';
    const el1 = document.getElementById('approveProgress'); if(el1) el1.textContent = txt;
    const el2 = document.getElementById('reviewApproveProgress'); if(el2) el2.textContent = txt;
  }

  function copyViewerCard(i) {
    const ta = document.getElementById('vtarea_' + i);
    const btn = document.getElementById('vcopyBtn_' + i);
    if (ta && btn) { navigator.clipboard.writeText(ta.value).then(() => { btn.innerHTML = '<i class="fas fa-check" style="color:#4ade80;"></i>'; setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i>'; }, 2000); }); }
  }

  function scheduleViewerCard(i) {
    setViewerStatus(i, 'approved');
    const ta = document.getElementById('vtarea_' + i);
    if (ta) alert('Post ' + (i+1) + ' scheduled to queue!');
  }

  async function regenViewerCard(i) {
    const btn = document.getElementById('vregenBtn_' + i);
    if(btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; btn.disabled = true; }
    const platform = reviewPosts[i].platform;
    try {
      const resp = await fetch('/api/generate-content', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...reviewParams, platforms: [platform], singlePlatform: true }) });
      const data = await resp.json();
      if (data.success && data.posts && data.posts[0]) { reviewPosts[i].content = data.posts[0].content; reviewStatus[i] = 'pending'; renderViewerCards(); updateApproveProgress(); }
      else { alert(data.error || 'Regeneration failed.'); }
    } catch(e) { alert('Error regenerating.'); }
  }

  // ── Copy all ──
  function copyAll() {
    const texts = reviewPosts.map((p, i) => { const ta = document.getElementById('vtarea_' + i); return (ta ? ta.value : p.content); });
    navigator.clipboard.writeText(texts.join('\\n\\n---\\n\\n')).then(() => {
      const btn = document.getElementById('copyAllBtn');
      if(btn) { btn.innerHTML = '<i class="fas fa-check" style="color:#4ade80;"></i> Copied!'; setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i> Copy All'; }, 2000); }
    });
  }

  // ── Schedule all ──
  function scheduleAll() {
    approveAll();
    const status = document.getElementById('generateStatus');
    status.innerHTML = \`<div style="width:34px;height:34px;border-radius:50%;background:rgba(74,222,128,0.12);border:1.5px solid rgba(74,222,128,0.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-calendar-check" style="color:#4ade80;"></i></div><div style="flex:1;"><div style="font-size:14px;font-weight:700;color:#fff;">All posts approved and scheduled!</div><div style="font-size:12px;color:#7ab3d4;margin-top:2px;">Added to your queue</div></div><a href="/scheduler" class="cs-btn-green" style="padding:7px 14px;font-size:12px;flex-shrink:0;text-decoration:none;display:inline-flex;align-items:center;gap:6px;border-radius:999px;"><i class="fas fa-calendar"></i> View Queue</a>\`;
  }

  // ── Publish approved → final published view ──
  function publishApproved() {
    const approved = reviewPosts.filter((_, i) => reviewStatus[i] === 'approved');
    if (!approved.length) { alert('Approve at least one post first.'); return; }
    closeReviewModal();

    const area = document.getElementById('postCardsArea');
    area.innerHTML = approved.map((post, idx) => {
      const pidMap = {'Instagram':'ig','TikTok':'tk','Facebook':'fb','LinkedIn':'li','X (Twitter)':'tw','YouTube':'yt','Threads':'th','Pinterest':'pi'};
      const pid = pidMap[post.platform] || 'ig';
      const bg = platformBgs[pid] || '#333';
      const icon = platformIcons[pid] || 'fas fa-share';
      return \`
      <div class="cs-post-card approved" style="border-color:rgba(74,222,128,0.45);background:rgba(74,222,128,0.02);">
        <div style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:space-between;background:rgba(74,222,128,0.03);">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:28px;height:28px;border-radius:7px;background:\${bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="\${icon}" style="color:#fff;font-size:12px;"></i></div>
            <span style="font-size:13px;font-weight:700;color:#fff;">\${post.platform}</span>
            <span style="font-size:11px;font-weight:800;color:#4ade80;background:rgba(74,222,128,0.12);padding:2px 8px;border-radius:20px;display:flex;align-items:center;gap:4px;"><i class="fas fa-check"></i>Published</span>
          </div>
          <div style="display:flex;gap:5px;">
            <button onclick="navigator.clipboard.writeText(this.closest('.cs-post-card').querySelector('textarea').value)" style="background:transparent;border:1px solid rgba(255,255,255,0.1);color:#9ca3af;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:11px;"><i class="fas fa-copy"></i></button>
          </div>
        </div>
        <div style="padding:12px 14px;">
          <textarea rows="4" style="width:100%;background:transparent;border:1.5px solid rgba(74,222,128,0.15);border-radius:9px;padding:9px 11px;color:#c8e6ff;font-size:13px;line-height:1.7;font-family:inherit;outline:none;resize:vertical;box-sizing:border-box;">\${post.content}</textarea>
        </div>
      </div>\`;
    }).join('');

    const status = document.getElementById('generateStatus');
    status.innerHTML = \`<div style="width:34px;height:34px;border-radius:50%;background:rgba(74,222,128,0.12);border:1.5px solid rgba(74,222,128,0.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 0 14px rgba(74,222,128,0.3);"><i class="fas fa-check" style="color:#4ade80;font-size:14px;"></i></div><div style="flex:1;"><div style="font-size:14px;font-weight:700;color:#fff;">\${approved.length} posts published successfully!</div><div style="font-size:12px;color:#7ab3d4;margin-top:2px;">Ready to schedule or copy</div></div><div style="display:flex;gap:8px;flex-shrink:0;"><button onclick="copyAll()" class="cs-btn-ghost" style="padding:6px 12px;font-size:12px;"><i class="fas fa-copy"></i> Copy All</button><button onclick="scheduleAll()" class="cs-btn-green" style="padding:6px 12px;font-size:12px;"><i class="fas fa-calendar"></i> Schedule All</button></div>\`;
  }

  // ══════════════════════════════════════════════════
  //  FULL REVIEW MODAL
  // ══════════════════════════════════════════════════
  function openReviewModal(posts) {
    if (posts) { reviewPosts = posts; reviewStatus = {}; posts.forEach((_,i) => { reviewStatus[i] = 'pending'; }); }
    if (!reviewPosts.length) return;
    renderReviewCards();
    document.getElementById('reviewSubtitle').textContent = 'Edit content directly · approve or regenerate each post';
    document.getElementById('reviewCounter').textContent = reviewPosts.length + ' posts';
    document.getElementById('reviewModal').style.display = 'flex';
    updateApproveProgress();
  }
  function closeReviewModal() { document.getElementById('reviewModal').style.display = 'none'; }

  function renderReviewCards() {
    const container = document.getElementById('reviewCardsList');
    if (!container) return;
    container.innerHTML = reviewPosts.map((post, i) => {
      const pidMap = {'Instagram':'ig','TikTok':'tk','Facebook':'fb','LinkedIn':'li','X (Twitter)':'tw','YouTube':'yt','Threads':'th','Pinterest':'pi'};
      const pid = pidMap[post.platform] || 'ig';
      const bg = platformBgs[pid] || '#333';
      const icon = platformIcons[pid] || 'fas fa-share';
      const st = reviewStatus[i];
      const borderCol = st === 'approved' ? 'rgba(74,222,128,0.45)' : st === 'rejected' ? 'rgba(248,113,113,0.35)' : 'rgba(0,229,255,0.15)';
      const bgCol = st === 'approved' ? 'rgba(74,222,128,0.03)' : st === 'rejected' ? 'rgba(248,113,113,0.03)' : 'rgba(3,9,24,0.97)';
      const statusBadge = st === 'approved' ? \`<span style="font-size:11px;font-weight:800;color:#4ade80;background:rgba(74,222,128,0.12);padding:2px 8px;border-radius:20px;"><i class="fas fa-check" style="margin-right:3px;"></i>Approved</span>\`
        : st === 'rejected' ? \`<span style="font-size:11px;font-weight:800;color:#f87171;background:rgba(248,113,113,0.1);padding:2px 8px;border-radius:20px;"><i class="fas fa-times" style="margin-right:3px;"></i>Rejected</span>\`
        : \`<span style="font-size:11px;font-weight:600;color:#9ca3af;background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:20px;">Pending</span>\`;
      return \`
      <div id="rcard_\${i}" style="background:\${bgCol};border:1.5px solid \${borderCol};border-radius:14px;overflow:hidden;transition:all 0.2s;">
        <div style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.02);">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:28px;height:28px;border-radius:7px;background:\${bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="\${icon}" style="color:#fff;font-size:12px;"></i></div>
            <span style="font-size:13px;font-weight:700;color:#fff;">\${post.platform}</span>
            <span style="font-size:11px;color:#6b7280;">· \${post.type||'Post'}</span>
            \${statusBadge}
          </div>
          <div style="display:flex;gap:5px;">
            <button onclick="copyReviewCard(\${i})" id="rcopyBtn_\${i}" style="background:transparent;border:1px solid rgba(255,255,255,0.1);color:#9ca3af;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:11px;"><i class="fas fa-copy"></i></button>
            <button onclick="regenReviewCard(\${i})" id="rregenBtn_\${i}" style="background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.25);color:#fbbf24;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:11px;"><i class="fas fa-redo"></i></button>
          </div>
        </div>
        <div style="padding:12px 14px;">
          <textarea id="rtarea_\${i}" rows="4" style="width:100%;background:rgba(0,229,255,0.02);border:1.5px solid rgba(0,229,255,0.1);border-radius:9px;padding:9px 11px;color:#c8e6ff;font-size:13px;line-height:1.7;font-family:inherit;outline:none;resize:vertical;box-sizing:border-box;">\${post.content}</textarea>
        </div>
        <div style="padding:8px 14px 12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;">
          <div style="display:flex;gap:6px;">
            <button onclick="setReviewStatus(\${i},'approved')" style="background:\${st==='approved'?'rgba(74,222,128,0.2)':'rgba(74,222,128,0.07)'};border:1.5px solid rgba(74,222,128,\${st==='approved'?'0.55':'0.25'});color:#4ade80;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:800;cursor:pointer;"><i class="fas fa-check" style="margin-right:4px;"></i>Approve</button>
            <button onclick="setReviewStatus(\${i},'rejected')" style="background:\${st==='rejected'?'rgba(248,113,113,0.18)':'rgba(248,113,113,0.06)'};border:1.5px solid rgba(248,113,113,\${st==='rejected'?'0.5':'0.18'});color:#f87171;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;"><i class="fas fa-times" style="margin-right:4px;"></i>Reject</button>
          </div>
        </div>
      </div>\`;
    }).join('');
  }

  function setReviewStatus(i, status) {
    const ta = document.getElementById('rtarea_' + i);
    if (ta) reviewPosts[i].content = ta.value;
    reviewStatus[i] = status;
    renderReviewCards(); renderViewerCards(); updateApproveProgress();
  }
  function copyReviewCard(i) {
    const ta = document.getElementById('rtarea_' + i);
    const btn = document.getElementById('rcopyBtn_' + i);
    if (ta && btn) { navigator.clipboard.writeText(ta.value).then(() => { btn.innerHTML = '<i class="fas fa-check" style="color:#4ade80;"></i>'; setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i>'; }, 2000); }); }
  }
  async function regenReviewCard(i) {
    const btn = document.getElementById('rregenBtn_' + i);
    if(btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; btn.disabled = true; }
    const mutTone = document.getElementById('mutTone').value;
    const mutLength = document.getElementById('mutLength').value;
    const mutInstruction = document.getElementById('mutInstruction').value.trim();
    try {
      const resp = await fetch('/api/generate-content', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...reviewParams, platforms:[reviewPosts[i].platform], overrideTone:mutTone||undefined, lengthHint:mutLength||undefined, customInstruction:mutInstruction||undefined, singlePlatform:true }) });
      const data = await resp.json();
      if (data.success && data.posts && data.posts[0]) { reviewPosts[i].content = data.posts[0].content; reviewStatus[i] = 'pending'; renderReviewCards(); renderViewerCards(); updateApproveProgress(); }
      else { alert(data.error || 'Regeneration failed.'); }
    } catch(e) { alert('Error regenerating.'); }
  }
  function toggleMutationPanel() {
    const f = document.getElementById('mutationFields');
    const b = document.getElementById('mutationToggleBtn');
    const h = f.style.display === 'none';
    f.style.display = h ? 'grid' : 'none';
    b.textContent = h ? 'Hide' : 'Show';
  }

  // ══════════════════════════════════════════════════
  //  AUTO LOOP — cycles through posts like a shorts reel
  // ══════════════════════════════════════════════════
  let loopTimer = null;
  let loopIndex = 0;
  let loopRunning = false;

  function autoLoopViewer() {
    if (!reviewPosts.length) { alert('Generate some content first!'); return; }
    if (loopRunning) {
      // Stop loop
      clearInterval(loopTimer);
      loopRunning = false;
      const btn = document.querySelector('button[onclick="autoLoopViewer()"]');
      if (btn) btn.innerHTML = '<i class="fas fa-repeat" style="margin-right:4px;"></i>Auto Loop';
      // Remove highlight
      document.querySelectorAll('.vcard-loop-active').forEach(el => el.classList.remove('vcard-loop-active'));
      return;
    }
    loopRunning = true;
    loopIndex = 0;
    const btn = document.querySelector('button[onclick="autoLoopViewer()"]');
    if (btn) btn.innerHTML = '<i class="fas fa-stop" style="margin-right:4px;"></i>Stop Loop';

    // Add loop highlight style if not present
    if (!document.getElementById('loopStyle')) {
      const st = document.createElement('style');
      st.id = 'loopStyle';
      st.textContent = \`
        @keyframes loopHighlight {
          0%   { box-shadow: 0 0 0 2px rgba(255,45,120,0.0), 0 0 20px rgba(255,45,120,0.0); }
          20%  { box-shadow: 0 0 0 3px rgba(255,45,120,0.9), 0 0 40px rgba(255,45,120,0.5); }
          80%  { box-shadow: 0 0 0 3px rgba(255,45,120,0.9), 0 0 40px rgba(255,45,120,0.5); }
          100% { box-shadow: 0 0 0 2px rgba(255,45,120,0.0), 0 0 20px rgba(255,45,120,0.0); }
        }
        .vcard-loop-active {
          animation: loopHighlight 1.8s ease forwards !important;
          border-color: rgba(255,45,120,0.8) !important;
          transform: scale(1.01) !important;
          z-index: 2; position: relative;
        }
      \`;
      document.head.appendChild(st);
    }

    function highlightCard(idx) {
      // Remove previous highlights
      document.querySelectorAll('.vcard-loop-active').forEach(el => el.classList.remove('vcard-loop-active'));
      const card = document.getElementById('vcard_' + idx);
      if (card) {
        card.classList.add('vcard-loop-active');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      // Update dot indicators
      const dots = document.getElementById('loopDots');
      if (dots) {
        const allDots = dots.querySelectorAll('div');
        allDots.forEach((d, di) => {
          d.style.opacity = di === idx ? '1' : '0.35';
          d.style.transform = di === idx ? 'scale(1.5)' : 'scale(1)';
          d.style.transition = 'all 0.3s';
        });
      }
    }

    highlightCard(loopIndex);
    loopTimer = setInterval(() => {
      loopIndex = (loopIndex + 1) % reviewPosts.length;
      highlightCard(loopIndex);
    }, 2200);
  }

  // ── Auto-fill from profile & last analysis report ──
  (function autoFill() {
    try {
      const saved = JSON.parse(localStorage.getItem('ss_profile_v1') || '{}');
      let filledFields = [];

      // Brand name
      if (saved.pBizName) {
        const el = document.getElementById('brandName');
        if (el && !el.value) { el.value = saved.pBizName; filledFields.push('Brand Name'); }
      }

      // Website URL
      if (saved.pUrl) {
        const el = document.getElementById('websiteUrl');
        if (el && !el.value) { el.value = saved.pUrl; }
      }

      // Industry — try to match the select option
      if (saved.pIndustry) {
        const el = document.getElementById('industry');
        if (el) {
          const needle = saved.pIndustry.toLowerCase();
          for (let i = 0; i < el.options.length; i++) {
            const optText = el.options[i].text.toLowerCase();
            if (optText.includes(needle.split(' ')[0]) || needle.includes(optText.split(' ')[0])) {
              el.selectedIndex = i; filledFields.push('Industry'); break;
            }
          }
        }
      }

      // Hashtag suggestions from last analysis
      if (saved.pBestHashtags && saved.pBestHashtags.trim()) {
        const hashContainer = document.getElementById('hashtagSuggestions');
        const hashCard = document.getElementById('hashtagSuggestionsCard');
        if (hashContainer) {
          const tags = saved.pBestHashtags.trim().split(/\s+/).filter(Boolean);
          hashContainer.innerHTML = tags.slice(0, 12).map(tag => {
            const t = tag.startsWith('#') ? tag : '#' + tag;
            return '<span onclick="insertHashtag(this)" style="display:inline-block;background:rgba(32,217,255,0.07);border:1px solid rgba(32,217,255,0.22);border-radius:999px;padding:4px 10px;font-size:11px;color:#20D9FF;cursor:pointer;transition:all .15s;font-weight:700;" onmouseover="this.style.background=\'rgba(32,217,255,0.15)\'" onmouseout="this.style.background=\'rgba(32,217,255,0.07)\'">' + t + '</span>';
          }).join('');
          hashContainer.style.display = 'flex';
          hashContainer.style.flexWrap = 'wrap';
          hashContainer.style.gap = '6px';
          if (hashCard) hashCard.style.display = 'block';
          filledFields.push('Hashtag suggestions');
        }
      }

      // Content pillars as topic suggestions
      if (saved.pContentPillars && saved.pContentPillars.length > 0) {
        const pillarsEl = document.getElementById('reportPillars');
        const pillarsCard = document.getElementById('reportPillarsCard');
        if (pillarsEl) {
          pillarsEl.innerHTML = saved.pContentPillars.slice(0, 5).map(p =>
            '<span onclick="usePillar(\'' + p.replace(/'/g, "\\'") + '\')" style="display:inline-block;background:rgba(139,92,246,0.07);border:1px solid rgba(139,92,246,0.22);border-radius:999px;padding:4px 10px;font-size:11px;color:#8B5CF6;cursor:pointer;transition:all .15s;font-weight:700;" onmouseover="this.style.background=\'rgba(139,92,246,0.15)\'" onmouseout="this.style.background=\'rgba(139,92,246,0.07)\'">' + p + '</span>'
          ).join('');
          pillarsEl.style.display = 'flex';
          pillarsEl.style.flexWrap = 'wrap';
          pillarsEl.style.gap = '6px';
          if (pillarsCard) pillarsCard.style.display = 'block';
        }
      }

      // Show auto-fill notice if we filled anything
      if (filledFields.length > 0) {
        const notice = document.getElementById('autoFillNotice');
        if (notice) {
          notice.textContent = '✨ Auto-filled from your last report: ' + filledFields.join(', ');
          notice.style.display = 'block';
          setTimeout(() => { notice.style.opacity = '0'; setTimeout(() => { notice.style.display = 'none'; }, 400); }, 4000);
        }
      }
    } catch(_) {}
  })();

  function insertHashtag(el) {
    const tag = el.textContent.trim();
    const topicEl = document.getElementById('topicInput');
    if (topicEl) {
      if (topicEl.value && !topicEl.value.endsWith(' ')) topicEl.value += ' ';
      topicEl.value += tag;
    }
    el.style.background = 'rgba(32,217,255,0.25)';
    el.style.borderColor = 'rgba(32,217,255,0.5)';
  }

  function usePillar(text) {
    const topicEl = document.getElementById('topicInput');
    if (topicEl) { topicEl.value = text; topicEl.focus(); }
  }
</script>
  `
  return layout('AI Content Studio', content, 'content-studio')
}
