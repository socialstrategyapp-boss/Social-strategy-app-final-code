import { ssLogo } from './layout'

// ─────────────────────────────────────────────────────────────────────────────
//  ADMIN PAGE  –  GitHub-as-Memory "3-Question" Auth  (Option A)
//
//  How it works (zero-password, zero stored secret):
//   1. Admin visits /admin
//   2. They are asked 3 personal challenge questions whose answers ONLY they know.
//      These answers are stored once in their browser's localStorage under a
//      hashed key — they never travel to a server and no plaintext password exists.
//   3. On subsequent visits the same 3 questions are re-asked; answers are
//      hashed (SHA-256) client-side and compared to the stored hashes.
//   4. Questions can be customised on first setup. The "GitHub as memory" means
//      you copy your hashed answers to a private GitHub Gist so you can
//      restore them on a new device — the instructions are shown after setup.
//   5. 3 wrong answers → 60-second lockout, increments an attempt counter.
// ─────────────────────────────────────────────────────────────────────────────

export function adminPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin – Social Strategy</title>
  <link rel="icon" href="data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%231a8090'/><circle cx='46' cy='44' r='32' fill='%23050d18'/><text y='58' x='46' font-size='36' font-weight='900' fill='white' font-family='Arial Black' text-anchor='middle'>SS</text><ellipse cx='68' cy='68' rx='16' ry='12' fill='%23ff2d78'/><polygon points='56,72 64,84 72,74' fill='%23ff2d78'/></svg>`)}">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *, *::before, *::after { font-family: 'Inter', sans-serif; box-sizing: border-box; }
    body { margin: 0; padding: 0; min-height: 100vh; background: #030818; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
    .bokeh-wrap { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
    .bokeh { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.15; }
    .b1 { width: 500px; height: 500px; background: #7C3AED; top: -120px; left: -100px; animation: drift1 14s ease-in-out infinite; }
    .b2 { width: 400px; height: 400px; background: #FF2D78; bottom: -80px; right: -80px; animation: drift2 18s ease-in-out infinite; }
    .b3 { width: 300px; height: 300px; background: #00E5FF; top: 40%; left: 60%; animation: drift3 12s ease-in-out infinite; }
    @keyframes drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
    @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px)} }
    @keyframes drift3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }

    .card { position: relative; z-index: 1; width: 100%; max-width: 500px; margin: 24px;
      background: linear-gradient(145deg, rgba(20,30,55,0.97) 0%, rgba(10,16,38,0.99) 100%);
      border: 1px solid rgba(124,58,237,0.3); border-radius: 28px; padding: 40px 36px;
      box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.1) inset;
      backdrop-filter: blur(20px); }
    .badge { display:inline-flex;align-items:center;gap:8px;
      background:linear-gradient(135deg,rgba(124,58,237,0.15),rgba(255,45,120,0.1));
      border:1px solid rgba(124,58,237,0.3);border-radius:999px;padding:6px 14px;
      font-size:12px;font-weight:700;color:#A78BFA;margin-bottom:22px; }
    h1 { font-size:24px;font-weight:900;color:#fff;margin:0 0 6px; }
    .sub { font-size:13px;color:#9ca3af;margin:0 0 24px;line-height:1.5; }

    /* ── Question step ── */
    .q-step { display:flex;flex-direction:column;gap:14px; }
    .q-label { font-size:12px;font-weight:700;color:#A78BFA;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px; }
    .q-text  { font-size:14px;font-weight:600;color:#e5e7eb;margin-bottom:8px; }
    .q-input { width:100%;background:rgba(255,255,255,0.05);border:1.5px solid rgba(124,58,237,0.3);
      border-radius:12px;padding:12px 16px;color:#fff;font-size:14px;outline:none;transition:border-color 0.2s; }
    .q-input:focus { border-color:#A78BFA;box-shadow:0 0 0 3px rgba(124,58,237,0.12); }
    .progress-dots { display:flex;gap:8px;justify-content:center;margin-bottom:20px; }
    .dot { width:10px;height:10px;border-radius:50%;background:rgba(124,58,237,0.25);transition:background 0.3s; }
    .dot.active { background:#A78BFA; }
    .dot.done   { background:#4ade80; }

    /* ── Buttons ── */
    .btn { width:100%;padding:13px;background:linear-gradient(135deg,#7C3AED,#FF2D78);color:#fff;
      font-size:14px;font-weight:900;border:none;border-radius:14px;cursor:pointer;margin-top:10px;
      transition:all 0.2s;box-shadow:0 6px 24px rgba(124,58,237,0.3);display:flex;align-items:center;justify-content:center;gap:8px; }
    .btn:hover { transform:translateY(-2px);box-shadow:0 10px 32px rgba(124,58,237,0.45); }
    .btn:disabled { opacity:0.5;cursor:not-allowed;transform:none; }
    .btn-ghost { background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);color:#9ca3af;font-size:13px;font-weight:600;box-shadow:none; }
    .btn-ghost:hover { background:rgba(255,255,255,0.09);transform:none; }

    /* ── Error / info ── */
    .error { background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.25);color:#f87171;
      font-size:13px;padding:10px 14px;border-radius:10px;margin-top:12px;display:none;text-align:center; }
    .info-box { background:rgba(0,229,255,0.06);border:1px solid rgba(0,229,255,0.2);color:#a5f3fc;
      font-size:12px;padding:12px 14px;border-radius:10px;margin-top:12px;line-height:1.6; }
    .gist-box { background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);
      border-radius:10px;padding:12px;font-size:11px;color:#9ca3af;word-break:break-all;
      font-family:monospace;margin-top:10px;max-height:80px;overflow-y:auto;cursor:pointer; }
    .gist-box:hover { border-color:rgba(124,58,237,0.4); }

    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner { width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;
      border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block; }
    .lock-timer { font-size:13px;color:#f87171;text-align:center;margin-top:10px;font-weight:700; }

    /* ── ADMIN DASHBOARD ── */
    .admin-dashboard { display:none; }
    .admin-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:28px; }
    .stat-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-bottom:24px; }
    .stat-card { background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:18px; }
    .stat-val { font-size:28px;font-weight:900;margin-bottom:4px; }
    .stat-label { font-size:12px;color:#9ca3af; }
    .section-title { font-size:16px;font-weight:800;color:#fff;margin:0 0 16px;display:flex;align-items:center;gap:8px; }
    .user-row { display:flex;align-items:center;justify-content:space-between;padding:12px 16px;
      background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;margin-bottom:8px; }
    .log-entry { font-size:12px;color:#9ca3af;padding:6px 10px;border-radius:8px;
      background:rgba(255,255,255,0.02);margin-bottom:4px;font-family:monospace; }
  </style>
</head>
<body>
  <div class="bokeh-wrap"><div class="bokeh b1"></div><div class="bokeh b2"></div><div class="bokeh b3"></div></div>

  <!-- ══════════════════════════════════════════════════════════
       STEP 0 — FIRST-TIME SETUP  (questions not yet configured)
  ═══════════════════════════════════════════════════════════════ -->
  <div class="card" id="setupPanel" style="display:none;">
    <div class="badge"><i class="fas fa-shield-halved"></i> First-Time Setup</div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
      ${ssLogo(48)}
      <div><div style="font-size:16px;font-weight:900;color:#fff;">SOCIAL STRATEGY</div><div style="font-size:12px;color:#A78BFA;font-weight:600;">ADMIN PORTAL</div></div>
    </div>
    <h1>Set Your 3 Security Questions</h1>
    <p class="sub">Choose 3 personal questions only you know the answers to.<br>No passwords. Answers are hashed locally — nothing is sent to a server.</p>

    <div id="setupForm">
      ${[1,2,3].map(n => `
      <div style="margin-bottom:18px;">
        <div class="q-label">Question ${n}</div>
        <select id="sq${n}" style="width:100%;background:rgba(10,15,30,0.9);border:1.5px solid rgba(124,58,237,0.25);border-radius:12px;padding:10px 14px;color:#fff;font-size:13px;outline:none;margin-bottom:8px;">
          <option value="">— Pick a question —</option>
          <option>What was the name of your first pet?</option>
          <option>What city were you born in?</option>
          <option>What is your mother's maiden name?</option>
          <option>What was the name of your primary school?</option>
          <option>What was the make of your first car?</option>
          <option>What street did you grow up on?</option>
          <option>What is the middle name of your oldest sibling?</option>
          <option>What was the name of your childhood best friend?</option>
          <option>What year did your parents get married?</option>
          <option>What is the name of the town your mother grew up in?</option>
        </select>
        <input id="sa${n}" type="password" class="q-input" placeholder="Your answer (case-insensitive)">
      </div>`).join('')}

      <div class="info-box">
        <i class="fas fa-github" style="margin-right:6px;"></i>
        <strong>GitHub Memory Tip:</strong> After setup, copy the "Backup Code" shown on the next screen into a <strong>private GitHub Gist</strong>. If you change devices, paste it back here to restore access.
      </div>
      <div class="error" id="setupError">Please fill in all questions and answers.</div>
      <button class="btn" onclick="saveSetup()"><i class="fas fa-lock"></i> Lock It In</button>
    </div>
  </div>

  <!-- ══════════════════════════════════════════════════════════
       STEP 1-3 — QUESTION-BY-QUESTION AUTH GATE
  ═══════════════════════════════════════════════════════════════ -->
  <div class="card" id="authPanel" style="display:none;">
    <div class="badge"><i class="fas fa-shield-halved"></i> Admin Access Required</div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
      ${ssLogo(48)}
      <div><div style="font-size:16px;font-weight:900;color:#fff;">SOCIAL STRATEGY</div><div style="font-size:12px;color:#A78BFA;font-weight:600;">ADMIN PORTAL</div></div>
    </div>
    <h1>Identity Verification</h1>
    <p class="sub" id="authSubtitle">Answer your 3 personal questions to enter — no password needed.</p>

    <!-- Progress dots -->
    <div class="progress-dots">
      <div class="dot active" id="pd0"></div>
      <div class="dot" id="pd1"></div>
      <div class="dot" id="pd2"></div>
    </div>

    <div class="q-step">
      <div class="q-label" id="qLabel">Question 1 of 3</div>
      <div class="q-text" id="qText"></div>
      <input class="q-input" id="qAnswer" type="password" placeholder="Your answer..." onkeydown="if(event.key==='Enter')nextQuestion()">
      <div class="error" id="authError">Incorrect answer. Try again.</div>
      <div class="lock-timer" id="lockMsg" style="display:none;"></div>
      <button class="btn" id="nextBtn" onclick="nextQuestion()"><i class="fas fa-arrow-right"></i> Next</button>
    </div>

    <div style="display:flex;justify-content:space-between;margin-top:16px;">
      <a href="/login" style="font-size:12px;color:#4b5563;text-decoration:none;">← Back to Sign In</a>
      <span onclick="showRestorePanel()" style="font-size:12px;color:#6b7280;cursor:pointer;" title="Restore from GitHub Gist backup">Restore from backup</span>
    </div>
  </div>

  <!-- ══════════════════════════════════════════════════════════
       RESTORE PANEL  — paste backup code
  ═══════════════════════════════════════════════════════════════ -->
  <div class="card" id="restorePanel" style="display:none;">
    <div class="badge"><i class="fas fa-github"></i> GitHub Memory Restore</div>
    <h1>Restore Admin Access</h1>
    <p class="sub">Paste the backup code from your private GitHub Gist to restore your security questions on this device.</p>
    <textarea id="restoreCode" rows="4" style="width:100%;background:rgba(255,255,255,0.05);border:1.5px solid rgba(124,58,237,0.3);border-radius:12px;padding:12px 16px;color:#fff;font-size:12px;font-family:monospace;outline:none;resize:vertical;" placeholder='Paste backup JSON here...'></textarea>
    <div class="error" id="restoreError">Invalid backup code. Please check and try again.</div>
    <button class="btn" onclick="restoreFromBackup()" style="margin-top:10px;"><i class="fas fa-redo"></i> Restore & Continue</button>
    <button class="btn btn-ghost" onclick="showAuthPanel()" style="margin-top:8px;"><i class="fas fa-arrow-left"></i> Back</button>
  </div>

  <!-- ══════════════════════════════════════════════════════════
       SETUP SUCCESS — show backup code
  ═══════════════════════════════════════════════════════════════ -->
  <div class="card" id="setupSuccessPanel" style="display:none;">
    <div class="badge" style="background:rgba(74,222,128,0.1);border-color:rgba(74,222,128,0.3);color:#4ade80;"><i class="fas fa-check-circle"></i> Setup Complete</div>
    <h1>You're Protected 🔐</h1>
    <p class="sub">Your 3 security questions are active. Save your backup code to a private GitHub Gist so you can restore access on new devices.</p>
    <div class="info-box">
      <strong>Step 1</strong> — Go to <a href="https://gist.github.com" target="_blank" style="color:#00E5FF;">gist.github.com</a><br>
      <strong>Step 2</strong> — Create a <em>Secret Gist</em> named <code>ss-admin-backup</code><br>
      <strong>Step 3</strong> — Paste the code below into it and save
    </div>
    <div class="q-label" style="margin-top:16px;">Your Backup Code (click to copy)</div>
    <div class="gist-box" id="backupCodeBox" onclick="copyBackup()"></div>
    <div id="copiedMsg" style="display:none;font-size:12px;color:#4ade80;text-align:center;margin-top:6px;"><i class="fas fa-check"></i> Copied!</div>
    <button class="btn" onclick="enterDashboard()" style="margin-top:16px;"><i class="fas fa-shield-halved"></i> Enter Admin Panel</button>
  </div>

  <!-- ══════════════════════════════════════════════════════════
       ADMIN DASHBOARD
  ═══════════════════════════════════════════════════════════════ -->
  <div id="adminDashboard" class="admin-dashboard" style="width:100%;max-width:920px;padding:32px;position:relative;z-index:1;">
    <div class="admin-header">
      <div style="display:flex;align-items:center;gap:14px;">
        ${ssLogo(42)}
        <div>
          <div style="font-size:20px;font-weight:900;color:#fff;">Admin Panel</div>
          <div style="font-size:12px;color:#A78BFA;font-weight:600;margin-top:2px;">Social Strategy · Internal Dashboard</div>
        </div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button onclick="showResetSetup()" style="background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.25);color:#fbbf24;font-size:12px;font-weight:700;padding:9px 14px;border-radius:10px;cursor:pointer;display:flex;align-items:center;gap:6px;"><i class="fas fa-key"></i> Reset Questions</button>
        <a href="/dashboard" style="background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.25);color:#00E5FF;font-size:13px;font-weight:700;padding:9px 16px;border-radius:10px;text-decoration:none;display:flex;align-items:center;gap:6px;"><i class="fas fa-home"></i> App</a>
        <button onclick="adminLogout()" style="background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.25);color:#f87171;font-size:13px;font-weight:700;padding:9px 16px;border-radius:10px;cursor:pointer;display:flex;align-items:center;gap:6px;"><i class="fas fa-sign-out-alt"></i> Logout</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-val" style="color:#00E5FF;">12,847</div><div class="stat-label">Total Users</div></div>
      <div class="stat-card"><div class="stat-val" style="color:#4ade80;">$48,320</div><div class="stat-label">Monthly Revenue (MRR)</div></div>
      <div class="stat-card"><div class="stat-val" style="color:#A78BFA;">3,421</div><div class="stat-label">Pro Subscribers</div></div>
      <div class="stat-card"><div class="stat-val" style="color:#FF2D78;">847</div><div class="stat-label">Business Subscribers</div></div>
    </div>

    <!-- Plan Breakdown -->
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:18px;padding:22px;margin-bottom:22px;">
      <div class="section-title"><i class="fas fa-chart-pie" style="color:#00E5FF;"></i> Plan Distribution</div>
      ${[
        { plan: 'Free / Starter', users: '8,579', pct: 66.8, color: '#6b7280' },
        { plan: 'Pro ($79/mo)', users: '3,421', pct: 26.6, color: '#00E5FF' },
        { plan: 'Business ($149/mo)', users: '847', pct: 6.6, color: '#A78BFA' },
      ].map(p => `
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px;">
        <div style="flex:1;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:13px;color:#fff;font-weight:600;">${p.plan}</span><span style="font-size:13px;color:${p.color};font-weight:700;">${p.users}</span></div>
          <div style="background:rgba(255,255,255,0.07);border-radius:999px;height:6px;overflow:hidden;"><div style="background:${p.color};height:6px;border-radius:999px;width:${p.pct}%;"></div></div>
        </div>
      </div>`).join('')}
    </div>

    <!-- Recent Users -->
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:18px;padding:22px;margin-bottom:22px;">
      <div class="section-title"><i class="fas fa-users" style="color:#A78BFA;"></i> Recent Signups</div>
      ${[
        { email: 'sarah.m@fitness.co', plan: 'Pro', joined: '2 min ago', status: 'active' },
        { email: 'james.t@realty.com', plan: 'Business', joined: '14 min ago', status: 'active' },
        { email: 'hello@cafebrew.au', plan: 'Free', joined: '31 min ago', status: 'active' },
        { email: 'coach.dan@email.com', plan: 'Pro', joined: '1 hr ago', status: 'active' },
        { email: 'agency@brand.studio', plan: 'Business', joined: '2 hrs ago', status: 'suspended' },
      ].map(u => `
      <div class="user-row">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#00E5FF,#7C3AED);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:#fff;">${u.email[0].toUpperCase()}</div>
          <div><div style="font-size:13px;font-weight:600;color:#fff;">${u.email}</div><div style="font-size:11px;color:#6b7280;margin-top:2px;">${u.joined}</div></div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:11px;font-weight:700;padding:3px 8px;border-radius:20px;background:${u.plan === 'Business' ? 'rgba(167,139,250,0.15)' : u.plan === 'Pro' ? 'rgba(0,229,255,0.12)' : 'rgba(255,255,255,0.07)'};color:${u.plan === 'Business' ? '#A78BFA' : u.plan === 'Pro' ? '#00E5FF' : '#9ca3af'};">${u.plan}</span>
          <span style="font-size:11px;font-weight:700;padding:3px 8px;border-radius:20px;background:${u.status === 'active' ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)'};color:${u.status === 'active' ? '#4ade80' : '#f87171'};">${u.status}</span>
        </div>
      </div>`).join('')}
    </div>

    <!-- System Logs -->
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:18px;padding:22px;">
      <div class="section-title"><i class="fas fa-terminal" style="color:#fbbf24;"></i> System Activity Log</div>
      ${[
        '[INFO] 04:13:01 – /api/generate-content – 200 OK – 1.24s',
        '[INFO] 04:12:44 – /api/analyze – 200 OK – 2.31s',
        '[INFO] 04:12:31 – /api/generate-image – 200 OK – 3.89s',
        '[INFO] 04:11:55 – /api/generate-report – 200 OK – 1.67s',
        '[WARN] 04:10:22 – /api/generate-image – 429 Rate Limited – OpenAI quota hit',
        '[INFO] 04:09:11 – /api/generate-video-script – 200 OK – 1.88s',
        '[INFO] 04:08:40 – /api/analyze – 200 OK – 2.14s',
      ].map(l => `<div class="log-entry">${l}</div>`).join('')}
    </div>
  </div>

  <!-- ══════════════════════════════════════════════════════════
       SCRIPTS
  ═══════════════════════════════════════════════════════════════ -->
  <script>
  // ── Storage keys ──────────────────────────────────────────────────────────
  const STORE_KEY   = 'ss_admin_qa';   // holds { questions:[], hashes:[] }
  const SESSION_KEY = 'ss_admin_sess';
  const LOCK_KEY    = 'ss_admin_lock';

  // ── State ─────────────────────────────────────────────────────────────────
  let currentQ    = 0;
  let storedData  = null;
  let failCount   = parseInt(localStorage.getItem('ss_admin_fails') || '0');
  let backupJSON  = '';

  // ── SHA-256 helper ────────────────────────────────────────────────────────
  async function sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str.toLowerCase().trim()));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
  }

  // ── Panel switchers ───────────────────────────────────────────────────────
  function show(id) {
    ['setupPanel','authPanel','restorePanel','setupSuccessPanel','adminDashboard']
      .forEach(p => document.getElementById(p).style.display = 'none');
    const el = document.getElementById(id);
    if (el) el.style.display = id === 'adminDashboard' ? 'block' : 'flex';
  }
  function showAuthPanel()    { currentQ=0; show('authPanel'); loadQuestion(); }
  function showRestorePanel() { show('restorePanel'); }

  // ── Load a question into the auth form ───────────────────────────────────
  function loadQuestion() {
    if (!storedData) return;
    document.getElementById('qLabel').textContent = 'Question ' + (currentQ+1) + ' of 3';
    document.getElementById('qText').textContent  = storedData.questions[currentQ];
    document.getElementById('qAnswer').value = '';
    document.getElementById('authError').style.display = 'none';
    document.getElementById('qAnswer').focus();
    // update dots
    for (let i=0;i<3;i++) {
      const d = document.getElementById('pd'+i);
      d.className = 'dot' + (i < currentQ ? ' done' : i === currentQ ? ' active' : '');
    }
  }

  // ── Next question / submit ────────────────────────────────────────────────
  async function nextQuestion() {
    // Check lockout
    const lockUntil = parseInt(localStorage.getItem(LOCK_KEY) || '0');
    if (Date.now() < lockUntil) { showLock(lockUntil); return; }

    const answer = document.getElementById('qAnswer').value;
    if (!answer.trim()) { showAuthError('Please enter an answer.'); return; }

    const btn = document.getElementById('nextBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Checking...';

    const hash = await sha256(answer);
    if (hash === storedData.hashes[currentQ]) {
      // Correct
      document.getElementById('pd'+currentQ).className = 'dot done';
      currentQ++;
      localStorage.setItem('ss_admin_fails','0');
      if (currentQ === 3) {
        // All 3 correct → enter dashboard
        sessionStorage.setItem(SESSION_KEY,'1');
        setTimeout(() => { show('adminDashboard'); }, 400);
      } else {
        setTimeout(() => { btn.disabled=false; btn.innerHTML='<i class="fas fa-arrow-right"></i> Next'; loadQuestion(); }, 300);
      }
    } else {
      // Wrong
      failCount++;
      localStorage.setItem('ss_admin_fails', String(failCount));
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-arrow-right"></i> Next';
      if (failCount >= 3) {
        const lockUntil = Date.now() + 60000;
        localStorage.setItem(LOCK_KEY, String(lockUntil));
        failCount = 0; localStorage.setItem('ss_admin_fails','0');
        currentQ = 0; loadQuestion();
        showLock(lockUntil);
      } else {
        showAuthError('Incorrect answer (' + (3-failCount) + ' attempt' + (3-failCount===1?'':'s') + ' left before lockout).');
      }
    }
  }

  function showAuthError(msg) {
    const e = document.getElementById('authError');
    e.textContent = msg; e.style.display = 'block';
  }

  function showLock(until) {
    const lockMsg = document.getElementById('lockMsg');
    lockMsg.style.display = 'block';
    document.getElementById('nextBtn').disabled = true;
    const tick = () => {
      const secs = Math.ceil((until - Date.now()) / 1000);
      if (secs <= 0) {
        lockMsg.style.display='none';
        document.getElementById('nextBtn').disabled=false;
        document.getElementById('authError').style.display='none';
        currentQ=0; loadQuestion();
      } else {
        lockMsg.textContent = '🔒 Locked — try again in ' + secs + 's';
        setTimeout(tick, 1000);
      }
    };
    tick();
  }

  // ── SETUP ─────────────────────────────────────────────────────────────────
  async function saveSetup() {
    const errs = [];
    const questions = [], hashes = [];
    for (let i=1;i<=3;i++) {
      const q = document.getElementById('sq'+i).value;
      const a = document.getElementById('sa'+i).value.trim();
      if (!q) errs.push('Pick question ' + i);
      if (!a) errs.push('Enter answer ' + i);
      questions.push(q);
      hashes.push(await sha256(a));
    }
    // Check no duplicate questions
    const uq = new Set(questions.filter(Boolean));
    if (uq.size < 3) errs.push('Choose 3 different questions');

    if (errs.length) {
      const e = document.getElementById('setupError');
      e.textContent = errs[0]; e.style.display='block'; return;
    }

    const data = { questions, hashes, created: Date.now() };
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
    storedData = data;

    backupJSON = JSON.stringify(data, null, 2);
    document.getElementById('backupCodeBox').textContent = backupJSON;
    show('setupSuccessPanel');
  }

  // ── RESTORE ───────────────────────────────────────────────────────────────
  function restoreFromBackup() {
    try {
      const raw = document.getElementById('restoreCode').value.trim();
      const data = JSON.parse(raw);
      if (!data.questions || !data.hashes || data.questions.length!==3) throw new Error('invalid');
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
      storedData = data;
      show('authPanel'); loadQuestion();
    } catch(e) {
      const el = document.getElementById('restoreError');
      el.style.display='block';
    }
  }

  // ── COPY BACKUP ───────────────────────────────────────────────────────────
  function copyBackup() {
    navigator.clipboard.writeText(backupJSON).then(() => {
      document.getElementById('copiedMsg').style.display='block';
      setTimeout(() => document.getElementById('copiedMsg').style.display='none', 2000);
    });
  }

  // ── ENTER DASHBOARD after success screen ─────────────────────────────────
  function enterDashboard() { show('adminDashboard'); }

  // ── LOGOUT ────────────────────────────────────────────────────────────────
  function adminLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    currentQ = 0;
    show('authPanel'); loadQuestion();
  }

  // ── RESET questions (from dashboard) ─────────────────────────────────────
  function showResetSetup() {
    if (!confirm('This will clear your current security questions. You will need to set new ones. Continue?')) return;
    localStorage.removeItem(STORE_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    storedData = null;
    show('setupPanel');
  }

  // ── BOOT ──────────────────────────────────────────────────────────────────
  (function boot() {
    const raw = localStorage.getItem(STORE_KEY);
    storedData = raw ? JSON.parse(raw) : null;

    // Already authenticated this session?
    if (sessionStorage.getItem(SESSION_KEY) === '1' && storedData) {
      show('adminDashboard'); return;
    }

    if (!storedData) {
      // First time — show setup
      show('setupPanel');
    } else {
      // Questions exist — authenticate
      show('authPanel'); loadQuestion();
    }

    // Check for active lockout
    const lockUntil = parseInt(localStorage.getItem(LOCK_KEY) || '0');
    if (storedData && Date.now() < lockUntil) {
      show('authPanel'); loadQuestion(); showLock(lockUntil);
    }
  })();
  </script>
</body>
</html>`
}
