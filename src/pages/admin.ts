import { ssLogo } from './layout'

// ─────────────────────────────────────────────────────────────────────────────
//  ADMIN PAGE – Hardcoded 3-step auth
//
//  STEP 1 : Enter Admin ID  →  329383
//  STEP 2 : Q1 "Your 1st dogs name?"            A: Bamboo
//           Q2 "What's the best team?"          A: West's Tigers
//           Q3 "What year was he born in?"      A: Twenty Twenty Two
//  All answers are case-insensitive (lowercased before SHA-256 hash)
//  Hashes are pre-computed and embedded — no setup needed, no server calls.
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
    *,*::before,*::after{font-family:'Inter',sans-serif;box-sizing:border-box;}
    body{margin:0;padding:0;min-height:100vh;background:#030818;color:#fff;position:relative;overflow-x:hidden;}
    /* ── bokeh ── */
    .bokeh-wrap{position:fixed;inset:0;pointer-events:none;z-index:0;}
    .bokeh{position:absolute;border-radius:50%;filter:blur(80px);opacity:0.13;}
    .b1{width:500px;height:500px;background:#7C3AED;top:-120px;left:-100px;animation:drift1 14s ease-in-out infinite;}
    .b2{width:400px;height:400px;background:#FF2D78;bottom:-80px;right:-80px;animation:drift2 18s ease-in-out infinite;}
    .b3{width:300px;height:300px;background:#00E5FF;top:40%;left:60%;animation:drift3 12s ease-in-out infinite;}
    @keyframes drift1{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,30px)}}
    @keyframes drift2{0%,100%{transform:translate(0,0)}50%{transform:translate(-30px,40px)}}
    @keyframes drift3{0%,100%{transform:translate(0,0)}50%{transform:translate(20px,-30px)}}
    /* ── auth card ── */
    .auth-wrap{position:relative;z-index:1;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;}
    .card{width:100%;max-width:480px;background:linear-gradient(145deg,rgba(20,30,55,0.97),rgba(10,16,38,0.99));
      border:1px solid rgba(124,58,237,0.35);border-radius:28px;padding:40px 36px;
      box-shadow:0 32px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(124,58,237,0.1) inset;backdrop-filter:blur(20px);}
    .badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,rgba(124,58,237,0.15),rgba(255,45,120,0.1));
      border:1px solid rgba(124,58,237,0.3);border-radius:999px;padding:6px 14px;font-size:12px;font-weight:700;color:#A78BFA;margin-bottom:22px;}
    .logo-row{display:flex;align-items:center;gap:12px;margin-bottom:22px;}
    h1{font-size:24px;font-weight:900;color:#fff;margin:0 0 6px;}
    .sub{font-size:13px;color:#9ca3af;margin:0 0 24px;line-height:1.5;}
    .field-label{font-size:11px;font-weight:700;color:#A78BFA;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:7px;display:block;}
    .q-text{font-size:15px;font-weight:700;color:#e5e7eb;margin-bottom:10px;line-height:1.4;}
    .inp{width:100%;background:rgba(255,255,255,0.05);border:1.5px solid rgba(124,58,237,0.3);border-radius:12px;
      padding:13px 16px;color:#fff;font-size:15px;outline:none;transition:border-color .2s;letter-spacing:1px;}
    .inp:focus{border-color:#A78BFA;box-shadow:0 0 0 3px rgba(124,58,237,0.12);}
    .inp-id{font-size:22px;font-weight:800;letter-spacing:6px;text-align:center;}
    .progress-dots{display:flex;gap:10px;justify-content:center;margin-bottom:22px;}
    .dot{width:11px;height:11px;border-radius:50%;background:rgba(124,58,237,0.25);transition:background .3s;}
    .dot.active{background:#A78BFA;box-shadow:0 0 8px rgba(167,139,250,0.6);}
    .dot.done{background:#4ade80;box-shadow:0 0 6px rgba(74,222,128,0.5);}
    .btn{width:100%;padding:14px;background:linear-gradient(135deg,#FF2D78,#C026D3,#7C3AED);color:#fff;
      font-size:14px;font-weight:900;border:none;border-radius:14px;cursor:pointer;margin-top:14px;
      transition:all .2s;box-shadow:0 0 22px rgba(255,45,120,0.4),0 0 44px rgba(192,38,211,0.15);
      display:flex;align-items:center;justify-content:center;gap:8px;}
    .btn:hover{transform:translateY(-2px);box-shadow:0 0 32px rgba(255,45,120,0.6),0 0 60px rgba(192,38,211,0.3);}
    .btn:disabled{opacity:.5;cursor:not-allowed;transform:none;}
    .error{background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.25);color:#f87171;
      font-size:13px;padding:10px 14px;border-radius:10px;margin-top:12px;display:none;text-align:center;}
    .lock-timer{font-size:13px;color:#f87171;text-align:center;margin-top:10px;font-weight:700;display:none;}
    @keyframes spin{to{transform:rotate(360deg)}}
    .spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;display:inline-block;}

    /* ══════════════════════════════════════════════
       ADMIN DASHBOARD
    ══════════════════════════════════════════════ */
    #adminDashboard{display:none;position:relative;z-index:1;}
    .dash-wrap{max-width:1100px;margin:0 auto;padding:28px 24px;}
    .dash-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px;}
    .dash-title{font-size:22px;font-weight:900;color:#fff;}
    .dash-sub{font-size:12px;color:#6b7280;margin-top:2px;}
    .hdr-btns{display:flex;gap:10px;flex-wrap:wrap;}
    .hdr-btn{font-size:12px;font-weight:700;padding:9px 16px;border-radius:10px;cursor:pointer;border:none;display:flex;align-items:center;gap:6px;text-decoration:none;}
    .stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:28px;}
    .stat-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:18px;}
    .stat-val{font-size:30px;font-weight:900;margin-bottom:4px;}
    .stat-lbl{font-size:12px;color:#9ca3af;}
    .section{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:18px;padding:22px;margin-bottom:22px;}
    .sec-title{font-size:15px;font-weight:800;color:#fff;margin:0 0 16px;display:flex;align-items:center;gap:8px;}
    /* user table */
    .user-row{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;
      background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;margin-bottom:8px;flex-wrap:wrap;gap:8px;}
    .u-info{display:flex;align-items:center;gap:12px;}
    .u-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#00E5FF,#7C3AED);
      display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;color:#fff;flex-shrink:0;}
    .u-actions{display:flex;gap:6px;flex-wrap:wrap;}
    .act-btn{font-size:11px;font-weight:700;padding:5px 11px;border-radius:8px;cursor:pointer;border:1px solid;transition:all .2s;}
    /* log */
    .log-entry{font-size:12px;color:#9ca3af;padding:6px 10px;border-radius:8px;background:rgba(255,255,255,0.02);margin-bottom:4px;font-family:monospace;}

    /* ══════════════════════════════════════════════
       MODALS (feedback / edit user)
    ══════════════════════════════════════════════ */
    .modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:2000;align-items:center;justify-content:center;padding:20px;}
    .modal-box{width:100%;max-width:480px;background:#0d1117;border:1px solid rgba(124,58,237,0.3);border-radius:20px;overflow:hidden;}
    .modal-head{padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between;}
    .modal-head h3{font-size:18px;font-weight:800;color:#fff;margin:0;}
    .modal-body{padding:24px;}
    .modal-foot{padding:16px 24px;border-top:1px solid rgba(255,255,255,0.08);display:flex;gap:10px;justify-content:flex-end;}
    .close-btn{background:rgba(255,255,255,0.08);border:none;color:#9ca3af;width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:16px;}
    .m-field{margin-bottom:16px;}
    .m-label{font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.8px;display:block;margin-bottom:6px;}
    .m-inp{width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:10px 14px;color:#fff;font-size:14px;outline:none;box-sizing:border-box;}
    .m-inp:focus{border-color:#A78BFA;}
    .m-textarea{resize:vertical;min-height:90px;font-family:inherit;}
    .btn-save{background:linear-gradient(135deg,#FF2D78,#C026D3,#7C3AED);color:#fff;font-weight:800;font-size:13px;padding:10px 22px;border-radius:10px;border:none;cursor:pointer;}
    .btn-cancel{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:#9ca3af;font-size:13px;font-weight:600;padding:10px 18px;border-radius:10px;cursor:pointer;}
    .toast{position:fixed;bottom:24px;right:24px;background:linear-gradient(135deg,#FF2D78,#7C3AED);color:#fff;font-size:13px;font-weight:700;
      padding:12px 20px;border-radius:12px;z-index:9999;display:none;box-shadow:0 8px 24px rgba(255,45,120,0.35);animation:slideIn .3s ease;}
    @keyframes slideIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
  </style>
</head>
<body>
<div class="bokeh-wrap"><div class="bokeh b1"></div><div class="bokeh b2"></div><div class="bokeh b3"></div></div>

<!-- ══════════════════════════════════════════════════════════
     STEP 1 — ADMIN ID NUMBER
════════════════════════════════════════════════════════════ -->
<div class="auth-wrap" id="idPanel">
  <div class="card">
    <div class="badge"><i class="fas fa-shield-halved"></i> Admin Access Required</div>
    <div class="logo-row">${ssLogo(48)}<div><div style="font-size:16px;font-weight:900;color:#fff;">SOCIAL STRATEGY</div><div style="font-size:12px;color:#A78BFA;font-weight:600;">ADMIN PORTAL</div></div></div>
    <h1>Admin Sign In</h1>
    <p class="sub">Enter your Admin ID number to begin.</p>
    <span class="field-label">ADMIN I.D Nº</span>
    <input class="inp inp-id" id="adminIdInput" type="text" inputmode="numeric" maxlength="10" placeholder="· · · · · ·" onkeydown="if(event.key==='Enter')checkId()">
    <div class="error" id="idError">Incorrect Admin ID. Access denied.</div>
    <div class="lock-timer" id="idLock"></div>
    <button class="btn" id="idBtn" onclick="checkId()"><i class="fas fa-arrow-right"></i> Continue</button>
    <p style="text-align:center;font-size:12px;color:#4b5563;margin-top:18px;"><a href="/login" style="color:#6b7280;text-decoration:none;">← Back to Sign In</a></p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════
     STEP 2 — Q&A (questions one at a time)
════════════════════════════════════════════════════════════ -->
<div class="auth-wrap" id="qaPanel" style="display:none;">
  <div class="card">
    <div class="badge"><i class="fas fa-shield-halved"></i> Identity Verification</div>
    <div class="logo-row">${ssLogo(48)}<div><div style="font-size:16px;font-weight:900;color:#fff;">SOCIAL STRATEGY</div><div style="font-size:12px;color:#A78BFA;font-weight:600;">ADMIN PORTAL</div></div></div>
    <h1>Security Questions</h1>
    <p class="sub" id="qaSub">Answer your 3 personal questions to enter.</p>
    <div class="progress-dots">
      <div class="dot active" id="qd0"></div>
      <div class="dot" id="qd1"></div>
      <div class="dot" id="qd2"></div>
    </div>
    <span class="field-label" id="qLabel">Question 1 of 3</span>
    <div class="q-text" id="qText"></div>
    <input class="inp" id="qAnswer" type="text" placeholder="Your answer..." autocomplete="off" onkeydown="if(event.key==='Enter')nextQuestion()">
    <div class="error" id="qaError"></div>
    <div class="lock-timer" id="qaLock"></div>
    <button class="btn" id="qaBtn" onclick="nextQuestion()"><i class="fas fa-arrow-right"></i> <span id="qaBtnTxt">Next</span></button>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════
     ADMIN DASHBOARD
════════════════════════════════════════════════════════════ -->
<div id="adminDashboard">
  <div class="dash-wrap">

    <!-- Header -->
    <div class="dash-header">
      <div>
        <div class="dash-title">${ssLogo(32)} &nbsp;Admin Panel</div>
        <div class="dash-sub">Social Strategy · Full Control Dashboard</div>
      </div>
      <div class="hdr-btns">
        <a href="/dashboard" class="hdr-btn" style="background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.25);color:#00E5FF;">
          <i class="fas fa-home"></i> App
        </a>
        <a href="/profile" class="hdr-btn" style="background:rgba(124,58,237,0.1);border:1px solid rgba(124,58,237,0.3);color:#A78BFA;">
          <i class="fas fa-user-circle"></i> My Profile
        </a>
        <button onclick="adminLogout()" class="hdr-btn" style="background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.25);color:#f87171;">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-val" style="color:#00E5FF;" id="sTotal">12,847</div><div class="stat-lbl">Total Users</div></div>
      <div class="stat-card"><div class="stat-val" style="color:#4ade80;" id="sMRR">$48,320</div><div class="stat-lbl">MRR</div></div>
      <div class="stat-card"><div class="stat-val" style="color:#A78BFA;" id="sPro">3,421</div><div class="stat-lbl">Pro Subscribers</div></div>
      <div class="stat-card"><div class="stat-val" style="color:#FF2D78;" id="sBiz">847</div><div class="stat-lbl">Business Subscribers</div></div>
      <div class="stat-card"><div class="stat-val" style="color:#fbbf24;" id="sBlocked">3</div><div class="stat-lbl">Blocked Accounts</div></div>
      <div class="stat-card"><div class="stat-val" style="color:#f87171;" id="sTickets">7</div><div class="stat-lbl">Open Tickets</div></div>
    </div>

    <!-- User Management -->
    <div class="section">
      <div class="sec-title"><i class="fas fa-users" style="color:#A78BFA;"></i> User Management
        <div style="margin-left:auto;display:flex;gap:8px;">
          <input id="searchUsers" type="text" placeholder="Search users..." oninput="filterUsers()" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:6px 12px;color:#fff;font-size:12px;outline:none;width:180px;">
          <select id="filterPlan" onchange="filterUsers()" style="background:rgba(10,15,30,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:6px 10px;color:#fff;font-size:12px;outline:none;">
            <option value="">All Plans</option><option>Free</option><option>Pro</option><option>Business</option>
          </select>
        </div>
      </div>
      <div id="userList"></div>
    </div>

    <!-- Recent Feedback / Tickets -->
    <div class="section">
      <div class="sec-title"><i class="fas fa-envelope-open-text" style="color:#fbbf24;"></i> Feedback & Tickets</div>
      <div id="ticketList"></div>
    </div>

    <!-- System Log -->
    <div class="section">
      <div class="sec-title"><i class="fas fa-terminal" style="color:#00E5FF;"></i> System Activity Log</div>
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
</div>

<!-- ══════════════════════════════════════════════════════════
     MODAL: Edit User
════════════════════════════════════════════════════════════ -->
<div class="modal-overlay" id="editModal" style="display:flex;display:none;">
  <div class="modal-box">
    <div class="modal-head">
      <h3><i class="fas fa-user-pen" style="color:#A78BFA;margin-right:8px;"></i>Edit Account</h3>
      <button class="close-btn" onclick="closeModal('editModal')">✕</button>
    </div>
    <div class="modal-body">
      <input type="hidden" id="editUserId">
      <div class="m-field">
        <label class="m-label">Full Name</label>
        <input class="m-inp" id="editName" type="text" placeholder="Full name">
      </div>
      <div class="m-field">
        <label class="m-label">Email</label>
        <input class="m-inp" id="editEmail" type="email" placeholder="Email address">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="m-field">
          <label class="m-label">Plan</label>
          <select class="m-inp" id="editPlan" style="cursor:pointer;">
            <option>Free</option><option>Pro</option><option>Business</option>
          </select>
        </div>
        <div class="m-field">
          <label class="m-label">Status</label>
          <select class="m-inp" id="editStatus" style="cursor:pointer;">
            <option>active</option><option>blocked</option><option>suspended</option>
          </select>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="m-field">
          <label class="m-label">AI Credits</label>
          <input class="m-inp" id="editCredits" type="number" placeholder="e.g. 1000">
        </div>
        <div class="m-field">
          <label class="m-label">Expiry Date</label>
          <input class="m-inp" id="editExpiry" type="date">
        </div>
      </div>
      <div class="m-field">
        <label class="m-label">Admin Note</label>
        <textarea class="m-inp m-textarea" id="editNote" placeholder="Internal note about this account..."></textarea>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn-cancel" onclick="closeModal('editModal')">Cancel</button>
      <button class="btn-save" onclick="saveUserEdit()"><i class="fas fa-save" style="margin-right:6px;"></i>Save Changes</button>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════
     MODAL: Send Feedback / Message to User
════════════════════════════════════════════════════════════ -->
<div class="modal-overlay" id="feedbackModal" style="display:none;">
  <div class="modal-box">
    <div class="modal-head">
      <h3><i class="fas fa-paper-plane" style="color:#00E5FF;margin-right:8px;"></i>Send Message</h3>
      <button class="close-btn" onclick="closeModal('feedbackModal')">✕</button>
    </div>
    <div class="modal-body">
      <div style="background:rgba(0,229,255,0.06);border:1px solid rgba(0,229,255,0.2);border-radius:10px;padding:12px 14px;margin-bottom:16px;font-size:13px;color:#a5f3fc;">
        <i class="fas fa-info-circle" style="margin-right:6px;"></i>
        Message will be sent to <strong id="fbUserEmail" style="color:#00E5FF;"></strong> via their verified login email.
      </div>
      <div class="m-field">
        <label class="m-label">Subject</label>
        <input class="m-inp" id="fbSubject" type="text" placeholder="e.g. Account Update, Support Response">
      </div>
      <div class="m-field">
        <label class="m-label">Message</label>
        <textarea class="m-inp m-textarea" id="fbMessage" rows="5" placeholder="Type your message here..."></textarea>
      </div>
      <div class="m-field">
        <label class="m-label">Reply To (optional override)</label>
        <input class="m-inp" id="fbReplyTo" type="email" placeholder="admin@socialstrategy.ai">
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn-cancel" onclick="closeModal('feedbackModal')">Cancel</button>
      <button class="btn-save" onclick="sendFeedback()" style="background:linear-gradient(135deg,#00E5FF,#0070F3);"><i class="fas fa-paper-plane" style="margin-right:6px;"></i>Send Message</button>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════
     MODAL: Reply to Ticket
════════════════════════════════════════════════════════════ -->
<div class="modal-overlay" id="ticketModal" style="display:none;">
  <div class="modal-box">
    <div class="modal-head">
      <h3><i class="fas fa-reply" style="color:#fbbf24;margin-right:8px;"></i>Reply to Ticket</h3>
      <button class="close-btn" onclick="closeModal('ticketModal')">✕</button>
    </div>
    <div class="modal-body">
      <div id="ticketContext" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 14px;margin-bottom:16px;font-size:13px;color:#d1d5db;line-height:1.5;"></div>
      <div class="m-field">
        <label class="m-label">Your Reply</label>
        <textarea class="m-inp m-textarea" id="ticketReply" rows="5" placeholder="Type your reply..."></textarea>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn-cancel" onclick="closeModal('ticketModal')">Cancel</button>
      <button class="btn-save" onclick="sendTicketReply()" style="background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#000;"><i class="fas fa-reply" style="margin-right:6px;"></i>Send Reply</button>
    </div>
  </div>
</div>

<!-- toast -->
<div class="toast" id="adminToast"></div>

<!-- ══════════════════════════════════════════════════════════
     SCRIPTS
════════════════════════════════════════════════════════════ -->
<script>
// ── Pre-computed SHA-256 hashes (lowercase answers) ───────────────────────────
// ID   : 329383
// Q1 A : rambo  (answer is Rambo — r.a.m.b.o)
// Q2 A : wests tigers
// Q3 A : twenty twenty two
const ADMIN_ID   = '329383';
const QA = [
  { q: "Your 1st dogs name?",          aKey: '' },
  { q: "What's the best team?",        aKey: '' },
  { q: "What year was he born in?",    aKey: '' }
];
// We compute hashes on first load and cache in sessionStorage so the plaintext never appears
const ANSWERS_RAW = ['rambo', 'wests tigers', 'twenty twenty two'];

const SESSION_KEY = 'ss_admin_sess_v4';
const LOCK_KEY    = 'ss_admin_lock4';
const FAILS_KEY   = 'ss_admin_fails4';

let currentQ  = 0;
let hashes    = [];  // will be computed async
let failCount = parseInt(sessionStorage.getItem(FAILS_KEY) || '0');
let currentEditUserId = null;
let currentFbEmail    = null;
let currentTicketIdx  = null;

// ── SHA-256 ────────────────────────────────────────────────────────────────
async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str.toLowerCase().trim()));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

// ── Pre-compute answer hashes on load ──────────────────────────────────────
async function initHashes() {
  for (const a of ANSWERS_RAW) {
    hashes.push(await sha256(a));
  }
}

// ── Show/hide panels ──────────────────────────────────────────────────────
function showPanel(id) {
  ['idPanel','qaPanel'].forEach(p => {
    const el = document.getElementById(p);
    if (el) el.style.display = 'none';
  });
  document.getElementById('adminDashboard').style.display = 'none';
  const el = document.getElementById(id);
  if (el) {
    if (id === 'adminDashboard') {
      el.style.display = 'block';
      document.body.style.overflowY = 'auto';
    } else {
      el.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }
}

// ── STEP 1: Check Admin ID ─────────────────────────────────────────────────
function checkId() {
  const lockUntil = parseInt(localStorage.getItem(LOCK_KEY) || '0');
  if (Date.now() < lockUntil) { showIdLock(lockUntil); return; }

  const val = document.getElementById('adminIdInput').value.trim();
  if (val === ADMIN_ID) {
    document.getElementById('idError').style.display = 'none';
    document.getElementById('adminIdInput').style.borderColor = '#4ade80';
    setTimeout(() => {
      currentQ = 0;
      loadQuestion();
      showPanel('qaPanel');
    }, 400);
  } else {
    failCount++;
    sessionStorage.setItem(FAILS_KEY, String(failCount));
    const err = document.getElementById('idError');
    err.style.display = 'block';
    if (failCount >= 3) {
      const lu = Date.now() + 60000;
      localStorage.setItem(LOCK_KEY, String(lu));
      failCount = 0; sessionStorage.setItem(FAILS_KEY, '0');
      showIdLock(lu);
    } else {
      err.textContent = 'Incorrect Admin ID. ' + (3-failCount) + ' attempt' + (3-failCount===1?'':'s') + ' left.';
    }
    document.getElementById('adminIdInput').value = '';
    document.getElementById('adminIdInput').style.borderColor = '#f87171';
    setTimeout(() => { document.getElementById('adminIdInput').style.borderColor = 'rgba(124,58,237,0.3)'; }, 1500);
  }
}

function showIdLock(until) {
  const tick = () => {
    const s = Math.ceil((until - Date.now()) / 1000);
    if (s <= 0) {
      document.getElementById('idLock').style.display = 'none';
      document.getElementById('idBtn').disabled = false;
      return;
    }
    document.getElementById('idLock').style.display = 'block';
    document.getElementById('idLock').textContent = '🔒 Locked — try again in ' + s + 's';
    document.getElementById('idBtn').disabled = true;
    setTimeout(tick, 1000);
  };
  tick();
}

// ── STEP 2: Q&A ──────────────────────────────────────────────────────────
function loadQuestion() {
  document.getElementById('qLabel').textContent = 'Question ' + (currentQ+1) + ' of 3';
  document.getElementById('qText').textContent  = QA[currentQ].q;
  document.getElementById('qAnswer').value = '';
  document.getElementById('qaError').style.display = 'none';
  document.getElementById('qaBtnTxt').textContent = currentQ < 2 ? 'Next' : 'Enter Admin Panel';
  document.getElementById('qAnswer').focus();
  for (let i=0;i<3;i++) {
    const d = document.getElementById('qd'+i);
    d.className = 'dot' + (i < currentQ ? ' done' : i === currentQ ? ' active' : '');
  }
}

async function nextQuestion() {
  const lockUntil = parseInt(localStorage.getItem(LOCK_KEY) || '0');
  if (Date.now() < lockUntil) { showQaLock(lockUntil); return; }

  const answer = document.getElementById('qAnswer').value;
  if (!answer.trim()) {
    const e = document.getElementById('qaError');
    e.textContent = 'Please enter an answer.'; e.style.display='block'; return;
  }

  const btn = document.getElementById('qaBtn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Checking...';

  const hash = await sha256(answer);
  if (hash === hashes[currentQ]) {
    // Correct ✓
    document.getElementById('qd'+currentQ).className = 'dot done';
    failCount = 0; sessionStorage.setItem(FAILS_KEY, '0');
    currentQ++;
    if (currentQ === 3) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setTimeout(() => { showPanel('adminDashboard'); renderUsers(); renderTickets(); }, 400);
    } else {
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-arrow-right"></i> <span id="qaBtnTxt">Next</span>';
        loadQuestion();
      }, 300);
    }
  } else {
    // Wrong
    failCount++;
    sessionStorage.setItem(FAILS_KEY, String(failCount));
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-arrow-right"></i> <span id="qaBtnTxt">' + (currentQ < 2 ? 'Next' : 'Enter Admin Panel') + '</span>';
    if (failCount >= 3) {
      const lu = Date.now() + 60000;
      localStorage.setItem(LOCK_KEY, String(lu));
      failCount = 0; sessionStorage.setItem(FAILS_KEY, '0');
      currentQ = 0; loadQuestion();
      showQaLock(lu);
    } else {
      const e = document.getElementById('qaError');
      e.textContent = 'Incorrect. ' + (3-failCount) + ' attempt' + (3-failCount===1?'':'s') + ' left before lockout.';
      e.style.display = 'block';
    }
  }
}

function showQaLock(until) {
  const tick = () => {
    const s = Math.ceil((until - Date.now()) / 1000);
    const lk = document.getElementById('qaLock');
    if (s <= 0) { lk.style.display='none'; document.getElementById('qaBtn').disabled=false; return; }
    lk.style.display='block'; lk.textContent='🔒 Locked — try again in '+s+'s';
    document.getElementById('qaBtn').disabled=true; setTimeout(tick,1000);
  };
  tick();
}

// ── Logout ─────────────────────────────────────────────────────────────────
function adminLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  currentQ = 0;
  document.getElementById('adminIdInput').value = '';
  showPanel('idPanel');
  document.body.style.overflow = 'hidden';
}

// ════════════════════════════════════════════════════════════
//  MOCK USER DATA (in a real app this would come from D1)
// ════════════════════════════════════════════════════════════
const mockUsers = [
  { id:'u1', name:'Sarah Mitchell',  email:'sarah.m@fitness.co',  plan:'Pro',      status:'active',    credits:847,  maxCredits:1000, expiry:'2025-05-04', joined:'2 min ago',  note:'' },
  { id:'u2', name:'James Thornton',  email:'james.t@realty.com',  plan:'Business', status:'active',    credits:3200, maxCredits:5000, expiry:'2025-06-01', joined:'14 min ago', note:'' },
  { id:'u3', name:'Café Brew',       email:'hello@cafebrew.au',   plan:'Free',     status:'active',    credits:5,    maxCredits:50,   expiry:'Never',      joined:'31 min ago', note:'' },
  { id:'u4', name:'Coach Dan',       email:'coach.dan@email.com', plan:'Pro',      status:'active',    credits:220,  maxCredits:1000, expiry:'2025-05-18', joined:'1 hr ago',   note:'' },
  { id:'u5', name:'Brand Studio',    email:'agency@brand.studio', plan:'Business', status:'blocked',   credits:0,    maxCredits:5000, expiry:'2025-04-30', joined:'2 hrs ago',  note:'Blocked for ToS violation.' },
  { id:'u6', name:'Mike Lawson',     email:'mike@lawson.io',      plan:'Free',     status:'active',    credits:12,   maxCredits:50,   expiry:'Never',      joined:'3 hrs ago',  note:'' },
  { id:'u7', name:'Zara Boutique',   email:'zara@boutique.com',   plan:'Pro',      status:'suspended', credits:0,    maxCredits:1000, expiry:'2025-04-15', joined:'1 day ago',  note:'Payment failed.' },
];

const mockTickets = [
  { id:'t1', user:'Sarah Mitchell',  email:'sarah.m@fitness.co',  subject:"Can't connect Instagram", msg:"Hi, I've been trying to connect my Instagram account for 2 days now. The button just spins and nothing happens. Please help!", time:'8 min ago',  status:'open'   },
  { id:'t2', user:'Coach Dan',       email:'coach.dan@email.com', subject:'Credits not refreshing',   msg:"My credits showed 0 this morning even though I'm on Pro. I should have 1000/mo. Can you check?",                          time:'22 min ago', status:'open'   },
  { id:'t3', user:'Mike Lawson',     email:'mike@lawson.io',      subject:'Upgrade question',          msg:"What's included in Pro vs Business? I need more accounts connected. Is there a trial?",                                  time:'1 hr ago',   status:'open'   },
  { id:'t4', user:'Café Brew',       email:'hello@cafebrew.au',   subject:'Content generation slow',  msg:'Content generation has been taking 5+ minutes lately. Is there an issue with the server?',                               time:'2 hrs ago',  status:'open'   },
  { id:'t5', user:'James Thornton',  email:'james.t@realty.com',  subject:'Billing receipt needed',   msg:'I need a receipt/invoice for April for my accountant. Can you send one to this email?',                                  time:'3 hrs ago',  status:'replied'},
  { id:'t6', user:'Brand Studio',    email:'agency@brand.studio', subject:'Account appeal',            msg:"My account was blocked. I believe this was a mistake. Please review. We've always complied with your terms.",            time:'4 hrs ago',  status:'open'   },
  { id:'t7', user:'Zara Boutique',   email:'zara@boutique.com',   subject:'Reactivate account',       msg:"My account got suspended after a failed payment. I've updated my card. Please reactivate.",                             time:'6 hrs ago',  status:'open'   },
];

// ── Render user rows ────────────────────────────────────────────────────────
function renderUsers(filter='', planFilter='') {
  const list = document.getElementById('userList');
  const filtered = mockUsers.filter(u => {
    const matchSearch = !filter || u.name.toLowerCase().includes(filter) || u.email.toLowerCase().includes(filter);
    const matchPlan = !planFilter || u.plan === planFilter;
    return matchSearch && matchPlan;
  });
  if (!filtered.length) { list.innerHTML = '<div style="text-align:center;padding:20px;color:#6b7280;font-size:13px;">No users found.</div>'; return; }

  list.innerHTML = filtered.map(u => {
    const planColor = u.plan==='Business'?'#A78BFA':u.plan==='Pro'?'#00E5FF':'#9ca3af';
    const planBg    = u.plan==='Business'?'rgba(167,139,250,0.12)':u.plan==='Pro'?'rgba(0,229,255,0.1)':'rgba(255,255,255,0.06)';
    const stColor   = u.status==='active'?'#4ade80':u.status==='blocked'?'#f87171':'#fbbf24';
    const stBg      = u.status==='active'?'rgba(74,222,128,0.1)':u.status==='blocked'?'rgba(248,113,113,0.1)':'rgba(251,191,36,0.1)';
    const creditPct = Math.min(100, Math.round((u.credits/u.maxCredits)*100));
    const blocked   = u.status === 'blocked';
    return \`
    <div class="user-row" id="urow_\${u.id}">
      <div class="u-info">
        <div class="u-avatar" style="background:linear-gradient(135deg,\${planColor},#7C3AED);">\${u.name[0]}</div>
        <div>
          <div style="font-size:13px;font-weight:700;color:#fff;">\${u.name}</div>
          <div style="font-size:11px;color:#6b7280;">\${u.email} · joined \${u.joined}</div>
          <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
            <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;background:\${planBg};color:\${planColor};">\${u.plan}</span>
            <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;background:\${stBg};color:\${stColor};">\${u.status}</span>
            <span style="font-size:10px;color:#6b7280;">\${u.credits.toLocaleString()}/\${u.maxCredits.toLocaleString()} credits (\${creditPct}%)</span>
            <span style="font-size:10px;color:#6b7280;">exp: \${u.expiry}</span>
          </div>
        </div>
      </div>
      <div class="u-actions">
        <button class="act-btn" onclick="openEditModal('\${u.id}')" style="border-color:rgba(167,139,250,0.35);color:#A78BFA;background:rgba(167,139,250,0.07);">
          <i class="fas fa-pen"></i> Edit
        </button>
        <button class="act-btn" onclick="openFeedbackModal('\${u.id}')" style="border-color:rgba(0,229,255,0.3);color:#00E5FF;background:rgba(0,229,255,0.06);">
          <i class="fas fa-envelope"></i> Message
        </button>
        <button class="act-btn" onclick="toggleBlock('\${u.id}')" style="border-color:\${blocked?'rgba(74,222,128,0.3)':'rgba(248,113,113,0.3)'};color:\${blocked?'#4ade80':'#f87171'};background:\${blocked?'rgba(74,222,128,0.07)':'rgba(248,113,113,0.07)'};">
          <i class="fas fa-\${blocked?'unlock':'ban'}"></i> \${blocked?'Unblock':'Block'}
        </button>
        <button class="act-btn" onclick="deleteUser('\${u.id}')" style="border-color:rgba(248,113,113,0.2);color:#f87171;background:transparent;"
          title="Delete account permanently">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>\`;
  }).join('');
}

function filterUsers() {
  const search = (document.getElementById('searchUsers').value || '').toLowerCase();
  const plan   = document.getElementById('filterPlan').value;
  renderUsers(search, plan);
}

// ── Render tickets ─────────────────────────────────────────────────────────
function renderTickets() {
  const list = document.getElementById('ticketList');
  list.innerHTML = mockTickets.map((t,i) => {
    const stColor = t.status==='open'?'#f87171':'#4ade80';
    const stBg    = t.status==='open'?'rgba(248,113,113,0.1)':'rgba(74,222,128,0.1)';
    return \`
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:14px 16px;margin-bottom:8px;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;">
        <div style="flex:1;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
            <span style="font-size:13px;font-weight:700;color:#fff;">\${t.subject}</span>
            <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:\${stBg};color:\${stColor};">\${t.status}</span>
          </div>
          <div style="font-size:12px;color:#6b7280;margin-bottom:6px;">\${t.user} · \${t.email} · \${t.time}</div>
          <div style="font-size:12px;color:#d1d5db;line-height:1.5;background:rgba(255,255,255,0.03);border-radius:8px;padding:8px 10px;">\${t.msg}</div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0;">
          <button class="act-btn" onclick="openTicketModal(\${i})" style="border-color:rgba(251,191,36,0.35);color:#fbbf24;background:rgba(251,191,36,0.07);">
            <i class="fas fa-reply"></i> Reply
          </button>
          <button class="act-btn" onclick="closeTicket(\${i})" style="border-color:rgba(74,222,128,0.3);color:#4ade80;background:rgba(74,222,128,0.06);">
            <i class="fas fa-check"></i> Close
          </button>
        </div>
      </div>
    </div>\`;
  }).join('');
}

// ── Edit User Modal ────────────────────────────────────────────────────────
function openEditModal(id) {
  const u = mockUsers.find(x => x.id === id);
  if (!u) return;
  currentEditUserId = id;
  document.getElementById('editUserId').value  = id;
  document.getElementById('editName').value    = u.name;
  document.getElementById('editEmail').value   = u.email;
  document.getElementById('editPlan').value    = u.plan;
  document.getElementById('editStatus').value  = u.status;
  document.getElementById('editCredits').value = u.credits;
  document.getElementById('editExpiry').value  = u.expiry === 'Never' ? '' : u.expiry;
  document.getElementById('editNote').value    = u.note || '';
  document.getElementById('editModal').style.display = 'flex';
}

function saveUserEdit() {
  const u = mockUsers.find(x => x.id === currentEditUserId);
  if (!u) return;
  u.name    = document.getElementById('editName').value;
  u.email   = document.getElementById('editEmail').value;
  u.plan    = document.getElementById('editPlan').value;
  u.status  = document.getElementById('editStatus').value;
  u.credits = parseInt(document.getElementById('editCredits').value) || 0;
  const exp = document.getElementById('editExpiry').value;
  u.expiry  = exp || 'Never';
  u.note    = document.getElementById('editNote').value;
  closeModal('editModal');
  filterUsers();
  showToast('Account updated for ' + u.name);
}

// ── Feedback / Message Modal ───────────────────────────────────────────────
function openFeedbackModal(id) {
  const u = mockUsers.find(x => x.id === id);
  if (!u) return;
  currentFbEmail = u.email;
  document.getElementById('fbUserEmail').textContent = u.email;
  document.getElementById('fbSubject').value = '';
  document.getElementById('fbMessage').value = '';
  document.getElementById('fbReplyTo').value = '';
  document.getElementById('feedbackModal').style.display = 'flex';
}

function sendFeedback() {
  const subject = document.getElementById('fbSubject').value.trim();
  const msg     = document.getElementById('fbMessage').value.trim();
  if (!subject || !msg) { showToast('Please fill in subject and message.'); return; }
  closeModal('feedbackModal');
  showToast('Message sent to ' + currentFbEmail);
}

// ── Ticket Modal ────────────────────────────────────────────────────────────
function openTicketModal(idx) {
  currentTicketIdx = idx;
  const t = mockTickets[idx];
  document.getElementById('ticketContext').innerHTML =
    '<strong style="color:#fff;">' + t.subject + '</strong><br>' +
    '<span style="color:#6b7280;font-size:11px;">' + t.user + ' · ' + t.email + '</span><br><br>' +
    '<span style="color:#d1d5db;">' + t.msg + '</span>';
  document.getElementById('ticketReply').value = '';
  document.getElementById('ticketModal').style.display = 'flex';
}

function sendTicketReply() {
  const reply = document.getElementById('ticketReply').value.trim();
  if (!reply) { showToast('Please type a reply.'); return; }
  mockTickets[currentTicketIdx].status = 'replied';
  closeModal('ticketModal');
  renderTickets();
  showToast('Reply sent to ' + mockTickets[currentTicketIdx].email);
}

function closeTicket(idx) {
  mockTickets[idx].status = 'replied';
  renderTickets();
  showToast('Ticket closed.');
}

// ── Block / Unblock / Delete ───────────────────────────────────────────────
function toggleBlock(id) {
  const u = mockUsers.find(x => x.id === id);
  if (!u) return;
  u.status = u.status === 'blocked' ? 'active' : 'blocked';
  filterUsers();
  showToast((u.status === 'blocked' ? '🚫 Blocked: ' : '✅ Unblocked: ') + u.name);
}

function deleteUser(id) {
  const u = mockUsers.find(x => x.id === id);
  if (!u) return;
  if (!confirm('Permanently delete account for ' + u.name + ' (' + u.email + ')? This cannot be undone.')) return;
  const idx = mockUsers.findIndex(x => x.id === id);
  mockUsers.splice(idx, 1);
  filterUsers();
  showToast('Account deleted: ' + u.email);
}

// ── Modal helpers ──────────────────────────────────────────────────────────
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}
document.addEventListener('click', e => {
  ['editModal','feedbackModal','ticketModal'].forEach(m => {
    const el = document.getElementById(m);
    if (e.target === el) el.style.display = 'none';
  });
});

// ── Toast ──────────────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('adminToast');
  t.textContent = msg; t.style.display = 'block';
  setTimeout(() => { t.style.display = 'none'; }, 3000);
}

// ── BOOT ───────────────────────────────────────────────────────────────────
(async function boot() {
  await initHashes();
  const lockUntil = parseInt(localStorage.getItem(LOCK_KEY) || '0');

  if (sessionStorage.getItem(SESSION_KEY) === '1') {
    showPanel('adminDashboard');
    renderUsers(); renderTickets();
    document.body.style.overflowY = 'auto';
    return;
  }

  showPanel('idPanel');
  document.body.style.overflow = 'hidden';
  if (Date.now() < lockUntil) showIdLock(lockUntil);
  document.getElementById('adminIdInput').addEventListener('keydown', e => { if(e.key==='Enter') checkId(); });
})();
</script>
</body>
</html>`
}
