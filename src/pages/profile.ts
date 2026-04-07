import { layout, ssLogo, topBar } from './layout'

export function profilePage(): string {

  const industries = [
    'Retail & E-Commerce','Food & Beverage','Health & Wellness','Fitness & Sports',
    'Beauty & Cosmetics','Fashion & Apparel','Real Estate','Finance & Insurance',
    'Legal Services','Education & Training','Technology & SaaS','Marketing & Advertising',
    'Photography & Creative','Events & Entertainment','Travel & Tourism','Automotive',
    'Home Services & Trades','Medical & Healthcare','Non-Profit','Restaurant & Hospitality',
    'Professional Services','Construction & Architecture','Pet Services','Other'
  ]

  const content = `
  ${topBar('My Profile', 'Business Intelligence Hub · powers all AI content & reports', '<a href="/content-studio" style="background:linear-gradient(135deg,#FF2D78,#C026D3,#7C3AED);color:#fff;font-size:12px;font-weight:700;padding:7px 14px;border-radius:999px;text-decoration:none;display:flex;align-items:center;gap:5px;"><i class="fas fa-wand-magic-sparkles"></i> Create</a>')}

  <div style="padding:28px;max-width:1100px;margin:0 auto;">

    <!-- save banner -->
    <div id="saveBanner" style="display:none;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.25);
      border-radius:14px;padding:14px 20px;margin-bottom:22px;display:none;align-items:center;gap:12px;">
      <i class="fas fa-check-circle" style="color:#4ade80;font-size:18px;"></i>
      <span style="color:#4ade80;font-weight:700;font-size:14px;">Profile saved! Your AI content engine has been updated.</span>
    </div>

    <div style="display:grid;grid-template-columns:300px 1fr;gap:24px;" class="profile-grid">

      <!-- ── LEFT COLUMN ───────────────────────────────────────────────── -->
      <div style="display:flex;flex-direction:column;gap:20px;">

        <!-- Avatar + account card -->
        <div class="gradient-card" style="border-radius:20px;padding:28px 24px;text-align:center;position:relative;">
          <!-- plan badge -->
          <div id="planBadge" style="position:absolute;top:14px;right:14px;font-size:10px;font-weight:800;
            padding:4px 10px;border-radius:99px;background:linear-gradient(135deg,rgba(0,229,255,0.15),rgba(0,112,243,0.15));
            border:1px solid rgba(0,229,255,0.3);color:#00E5FF;letter-spacing:.5px;">PRO</div>

          <!-- avatar area -->
          <div style="position:relative;display:inline-block;margin-bottom:16px;">
            <div id="avatarCircle" style="width:96px;height:96px;border-radius:50%;
              background:linear-gradient(135deg,#FF2D78,#C026D3,#7C3AED);
              display:flex;align-items:center;justify-content:center;
              font-size:36px;font-weight:900;color:#fff;
              box-shadow:0 0 0 4px rgba(124,58,237,0.25),0 0 28px rgba(255,45,120,0.3);
              overflow:hidden;cursor:pointer;" onclick="document.getElementById('picInput').click()">
              <img id="avatarImg" src="" style="display:none;width:100%;height:100%;object-fit:cover;" alt="avatar">
              <span id="avatarInitial">?</span>
            </div>
            <div onclick="document.getElementById('picInput').click()" style="position:absolute;bottom:2px;right:2px;
              width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#FF2D78,#7C3AED);
              display:flex;align-items:center;justify-content:center;cursor:pointer;
              box-shadow:0 2px 8px rgba(0,0,0,0.4);">
              <i class="fas fa-camera" style="font-size:11px;color:#fff;"></i>
            </div>
            <input id="picInput" type="file" accept="image/*" style="display:none;" onchange="handlePicUpload(event)">
          </div>

          <div id="displayName" style="font-size:18px;font-weight:900;color:#fff;margin-bottom:4px;">Your Name</div>
          <div id="displayBiz" style="font-size:12px;color:#A78BFA;font-weight:600;margin-bottom:14px;">Your Business</div>

          <!-- credits ring meter -->
          <div style="margin-bottom:16px;">
            <svg viewBox="0 0 120 120" width="120" height="120" style="display:block;margin:0 auto;">
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#FF2D78"/>
                  <stop offset="100%" style="stop-color:#7C3AED"/>
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"/>
              <circle id="creditRing" cx="60" cy="60" r="50" fill="none" stroke="url(#ringGrad)" stroke-width="10"
                stroke-linecap="round" stroke-dasharray="314" stroke-dashoffset="110"
                transform="rotate(-90 60 60)" style="transition:stroke-dashoffset .8s ease;"/>
              <text x="60" y="55" text-anchor="middle" fill="#fff" font-size="16" font-weight="900" font-family="Inter,sans-serif">6,535</text>
              <text x="60" y="72" text-anchor="middle" fill="#6b7280" font-size="9" font-family="Inter,sans-serif">of 10,000 credits</text>
            </svg>
          </div>

          <!-- expiry countdown -->
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);
            border-radius:12px;padding:12px;margin-bottom:16px;">
            <div style="font-size:11px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px;">Subscription</div>
            <div style="font-size:22px;font-weight:900;color:#4ade80;">15 <span style="font-size:13px;font-weight:600;">days left</span></div>
            <div style="height:4px;background:rgba(255,255,255,0.07);border-radius:99px;margin-top:8px;overflow:hidden;">
              <div style="height:100%;width:50%;background:linear-gradient(90deg,#4ade80,#22d3ee);border-radius:99px;"></div>
            </div>
            <div style="font-size:10px;color:#6b7280;margin-top:5px;">Renews: May 19, 2025</div>
          </div>

          <!-- quick nav links -->
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${[
              { href:'/dashboard',     icon:'fas fa-home',                  label:'Dashboard',       color:'#00E5FF' },
              { href:'/content-studio',icon:'fas fa-wand-magic-sparkles',   label:'Content Studio',  color:'#A78BFA' },
              { href:'/analysis',      icon:'fas fa-search',                label:'Business Auditor',color:'#60A5FA' },
              { href:'/characters',    icon:'fas fa-user-astronaut',         label:'AI Characters',   color:'#FF2D78' },
              { href:'/scheduler',     icon:'fas fa-calendar-check',        label:'Scheduler',       color:'#fbbf24' },
              { href:'/analytics',     icon:'fas fa-chart-bar',             label:'Analytics',       color:'#4ade80' },
            ].map(l => `
            <a href="${l.href}" style="display:flex;align-items:center;gap:10px;padding:9px 12px;
              background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);
              border-radius:10px;text-decoration:none;transition:all .2s;"
              onmouseover="this.style.background='rgba(255,255,255,0.07)'"
              onmouseout="this.style.background='rgba(255,255,255,0.03)'">
              <i class="${l.icon}" style="color:${l.color};width:16px;text-align:center;font-size:13px;"></i>
              <span style="font-size:13px;font-weight:600;color:#d1d5db;">${l.label}</span>
              <i class="fas fa-chevron-right" style="margin-left:auto;font-size:10px;color:#4b5563;"></i>
            </a>`).join('')}
          </div>
        </div>

        <!-- saved reports card -->
        <div class="gradient-card" style="border-radius:20px;padding:22px;">
          <div style="font-size:14px;font-weight:800;color:#fff;margin-bottom:14px;display:flex;align-items:center;gap:8px;">
            <i class="fas fa-file-chart-column" style="color:#60A5FA;"></i> Saved Reports
            <span id="reportCount" style="margin-left:auto;font-size:11px;font-weight:700;
              background:rgba(96,165,250,0.12);border:1px solid rgba(96,165,250,0.25);
              color:#60A5FA;padding:2px 8px;border-radius:99px;">0</span>
          </div>
          <div id="reportsList" style="display:flex;flex-direction:column;gap:8px;">
            <div style="text-align:center;padding:18px 10px;color:#4b5563;font-size:12px;">
              <i class="fas fa-folder-open" style="font-size:24px;color:#374151;display:block;margin-bottom:8px;"></i>
              No reports yet. Run an analysis to save one here.
            </div>
          </div>
          <a href="/analysis" style="display:flex;align-items:center;justify-content:center;gap:7px;
            margin-top:14px;padding:10px;background:rgba(96,165,250,0.08);border:1px solid rgba(96,165,250,0.2);
            border-radius:10px;color:#60A5FA;font-size:13px;font-weight:700;text-decoration:none;">
            <i class="fas fa-plus"></i> Run New Analysis
          </a>
        </div>

      </div>

      <!-- ── RIGHT COLUMN ──────────────────────────────────────────────── -->
      <div style="display:flex;flex-direction:column;gap:20px;">

        <!-- ── SECTION 1: Personal & Contact ──────────────────────────── -->
        <div class="gradient-card" style="border-radius:20px;padding:26px;">
          <div style="font-size:15px;font-weight:800;color:#fff;margin-bottom:20px;display:flex;align-items:center;gap:8px;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:14px;">
            <i class="fas fa-id-card" style="color:#FF2D78;"></i> Personal &amp; Contact
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;" class="grid-2-col">
            <div>
              <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">First Name *</label>
              <input id="pFirstName" type="text" placeholder="e.g. Sarah" class="pf-input" oninput="updateDisplay()">
            </div>
            <div>
              <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">Surname *</label>
              <input id="pSurname" type="text" placeholder="e.g. Mitchell" class="pf-input" oninput="updateDisplay()">
            </div>
            <div>
              <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">Username</label>
              <input id="pUsername" type="text" placeholder="e.g. @sarahmitchell" class="pf-input">
            </div>
            <div>
              <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">Contact Email *</label>
              <input id="pEmail" type="email" placeholder="hello@yourbusiness.com" class="pf-input">
            </div>
            <div>
              <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">
                Phone <span style="color:#6b7280;font-weight:400;text-transform:none;">(optional — helps us support you)</span>
              </label>
              <input id="pPhone" type="tel" placeholder="+61 4xx xxx xxx" class="pf-input">
            </div>
          </div>
        </div>

        <!-- ── SECTION 2: Business Info ────────────────────────────────── -->
        <div class="gradient-card" style="border-radius:20px;padding:26px;">
          <div style="font-size:15px;font-weight:800;color:#fff;margin-bottom:20px;display:flex;align-items:center;gap:8px;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:14px;">
            <i class="fas fa-building" style="color:#A78BFA;"></i> Business Information
            <span style="font-size:11px;font-weight:600;color:#6b7280;margin-left:4px;">· Feeds your AI content &amp; reports</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;" class="grid-2-col">
            <div>
              <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">Business Name *</label>
              <input id="pBizName" type="text" placeholder="e.g. Sarah's Fitness Studio" class="pf-input" oninput="updateDisplay()">
            </div>
            <div>
              <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">Industry *</label>
              <select id="pIndustry" class="pf-input" style="cursor:pointer;">
                <option value="">Select your industry...</option>
                ${industries.map(i => `<option value="${i}">${i}</option>`).join('')}
              </select>
            </div>
            <div style="grid-column:span 2;" class="full-col">
              <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">
                Business Address
                <span style="color:#6b7280;font-weight:400;text-transform:none;">(optional — helps AI find the right business for reports)</span>
              </label>
              <input id="pAddress" type="text" placeholder="e.g. 42 Market St, Sydney NSW 2000" class="pf-input">
            </div>
            <div>
              <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">Website URL</label>
              <input id="pUrl" type="url" placeholder="https://yourbusiness.com" class="pf-input">
            </div>
            <div>
              <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">
                Primary Audience
              </label>
              <input id="pAudience" type="text" placeholder="e.g. Women 25–45, health-conscious" class="pf-input">
            </div>
          </div>
        </div>

        <!-- ── SECTION 3: Business Insights ──────────────────────────── -->
        <div class="gradient-card" style="border-radius:20px;padding:26px;">
          <div style="font-size:15px;font-weight:800;color:#fff;margin-bottom:6px;display:flex;align-items:center;gap:8px;">
            <i class="fas fa-lightbulb" style="color:#fbbf24;"></i> Business Insights
          </div>
          <p style="font-size:12px;color:#6b7280;margin:0 0 18px;line-height:1.6;">
            The more you tell the AI, the smarter your content becomes. This feeds directly into your Content Studio, Video Scripts, and Report Generator.
          </p>
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:18px;">
            <div style="margin-bottom:16px;">
              <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">
                About Your Business &amp; What You Do
              </label>
              <textarea id="pAbout" class="pf-input pf-ta" rows="4"
                placeholder="Tell the AI about your business — what you sell, your story, what makes you unique, your values and mission..."></textarea>
            </div>
            <div style="margin-bottom:16px;">
              <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">
                Business Goals &amp; What You Want to Achieve
              </label>
              <textarea id="pGoals" class="pf-input pf-ta" rows="3"
                placeholder="e.g. Grow Instagram to 10K followers in 3 months, launch new product line, increase local bookings by 30%..."></textarea>
            </div>
            <div>
              <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">
                Content You Want Created
              </label>
              <textarea id="pContentWish" class="pf-input pf-ta" rows="3"
                placeholder="e.g. Weekly transformation posts, behind-the-scenes videos, product launches, testimonials, educational tips..."></textarea>
            </div>
          </div>
        </div>

        <!-- ── SECTION 4: How You Plan to Use Social Strategy ─────────── -->
        <div class="gradient-card" style="border-radius:20px;padding:26px;">
          <div style="font-size:15px;font-weight:800;color:#fff;margin-bottom:6px;display:flex;align-items:center;gap:8px;">
            <i class="fas fa-rocket" style="color:#60A5FA;"></i> How You Plan to Use Social Strategy
          </div>
          <p style="font-size:12px;color:#6b7280;margin:0 0 18px;line-height:1.6;">
            Select all that apply — your answers help the AI prioritise your content calendar and feature suggestions.
          </p>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px;" id="usagePlanGrid">
            ${[
              { id:'up1', icon:'fas fa-chart-line',         label:'Grow my social media following' },
              { id:'up2', icon:'fas fa-store',               label:'Drive more sales / leads' },
              { id:'up3', icon:'fas fa-bullhorn',            label:'Brand awareness & visibility' },
              { id:'up4', icon:'fas fa-calendar-alt',        label:'Stay consistent with posting' },
              { id:'up5', icon:'fas fa-robot',               label:'Automate content creation' },
              { id:'up6', icon:'fas fa-users',               label:'Build a community / audience' },
              { id:'up7', icon:'fas fa-search',              label:'Competitor & market research' },
              { id:'up8', icon:'fas fa-video',               label:'Create video scripts & reels' },
              { id:'up9', icon:'fas fa-image',               label:'Generate AI images & graphics' },
              { id:'up10',icon:'fas fa-star',                label:'Manage reputation & reviews' },
              { id:'up11',icon:'fas fa-envelope',            label:'Email marketing content' },
              { id:'up12',icon:'fas fa-handshake',           label:'Network & build partnerships' },
            ].map(u => `
            <label id="lbl_${u.id}" style="display:flex;align-items:center;gap:10px;padding:12px 14px;
              background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);
              border-radius:12px;cursor:pointer;transition:all .2s;user-select:none;"
              onmouseover="this.style.borderColor='rgba(124,58,237,0.4)'"
              onmouseout="syncCheckStyle('${u.id}')">
              <input type="checkbox" id="${u.id}" onchange="syncCheckStyle('${u.id}')"
                style="width:16px;height:16px;accent-color:#A78BFA;cursor:pointer;flex-shrink:0;">
              <i class="${u.icon}" style="color:#A78BFA;width:16px;text-align:center;font-size:13px;flex-shrink:0;"></i>
              <span style="font-size:13px;color:#d1d5db;font-weight:500;line-height:1.3;">${u.label}</span>
            </label>`).join('')}
          </div>
        </div>

        <!-- ── SECTION 5: Content Wishlist ────────────────────────────── -->
        <div class="gradient-card" style="border-radius:20px;padding:26px;">
          <div style="font-size:15px;font-weight:800;color:#fff;margin-bottom:6px;display:flex;align-items:center;gap:8px;">
            <i class="fas fa-list-check" style="color:#4ade80;"></i> Weekly / Monthly Content Wishlist
            <span style="font-size:11px;font-weight:600;color:#4ade80;margin-left:6px;
              background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.2);
              padding:2px 8px;border-radius:99px;">Update Anytime</span>
          </div>
          <p style="font-size:12px;color:#6b7280;margin:0 0 18px;line-height:1.6;">
            What content do you want made this week and month? Keep this updated — the AI will pull from this list when generating your content calendar.
          </p>
          <div style="margin-bottom:16px;">
            <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">This Week's Content Needs</label>
            <textarea id="pWeeklyWish" class="pf-input pf-ta" rows="3"
              placeholder="e.g. 3 Instagram posts about our new protein shake, 1 TikTok transformation video, 2 Facebook ads for weekend sale..."></textarea>
          </div>
          <div style="margin-bottom:16px;">
            <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">This Month's Bigger Plans</label>
            <textarea id="pMonthlyPlan" class="pf-input pf-ta" rows="3"
              placeholder="e.g. Launch new membership program, run a 7-day challenge campaign, push Christmas gift bundles, film 4 YouTube tutorials..."></textarea>
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:7px;">Anything Else the AI Should Know Right Now</label>
            <textarea id="pExtra" class="pf-input pf-ta" rows="2"
              placeholder="e.g. Avoid mentioning competitors, we have a sale ending Friday, new studio location opening..."></textarea>
          </div>
        </div>

        <!-- ── SECTION 6: Auditor / Report Lock ───────────────────────── -->
        <div class="gradient-card" style="border-radius:20px;padding:26px;border-color:rgba(96,165,250,0.2);">
          <div style="font-size:15px;font-weight:800;color:#fff;margin-bottom:6px;display:flex;align-items:center;gap:8px;">
            <i class="fas fa-shield-check" style="color:#60A5FA;"></i> Business Auditor &amp; Reports
          </div>
          <p style="font-size:12px;color:#6b7280;margin:0 0 18px;line-height:1.6;">
            Your plan controls how many analysis reports you can run. Your primary URL is pre-filled in the auditor but you can still analyse competitor sites — within your credit limit.
          </p>

          <!-- plan limits display -->
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px;" class="grid-3-col">
            <div style="background:rgba(96,165,250,0.06);border:1px solid rgba(96,165,250,0.18);border-radius:12px;padding:14px;text-align:center;">
              <div style="font-size:22px;font-weight:900;color:#60A5FA;" id="reportsUsed">2</div>
              <div style="font-size:11px;color:#9ca3af;margin-top:3px;">Reports Used</div>
            </div>
            <div style="background:rgba(96,165,250,0.06);border:1px solid rgba(96,165,250,0.18);border-radius:12px;padding:14px;text-align:center;">
              <div style="font-size:22px;font-weight:900;color:#fff;" id="reportsLimit">5</div>
              <div style="font-size:11px;color:#9ca3af;margin-top:3px;">Monthly Limit</div>
            </div>
            <div style="background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.18);border-radius:12px;padding:14px;text-align:center;">
              <div style="font-size:22px;font-weight:900;color:#4ade80;" id="reportsLeft">3</div>
              <div style="font-size:11px;color:#9ca3af;margin-top:3px;">Reports Left</div>
            </div>
          </div>

          <!-- locked URL display -->
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px 16px;margin-bottom:14px;">
            <div style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px;">
              <i class="fas fa-lock" style="color:#60A5FA;margin-right:5px;"></i>Your Primary Site (auto-filled in Auditor)
            </div>
            <div id="lockedUrl" style="font-size:14px;font-weight:700;color:#60A5FA;">— not set yet —</div>
          </div>

          <a href="/analysis" style="display:inline-flex;align-items:center;gap:8px;
            background:rgba(96,165,250,0.08);border:1px solid rgba(96,165,250,0.25);
            color:#60A5FA;font-size:13px;font-weight:700;padding:10px 18px;border-radius:10px;text-decoration:none;">
            <i class="fas fa-search"></i> Go to Business Auditor
          </a>
        </div>

        <!-- ── SAVE BUTTON ─────────────────────────────────────────────── -->
        <div style="display:flex;gap:12px;align-items:center;justify-content:flex-end;padding-bottom:12px;">
          <button onclick="resetProfile()" style="padding:12px 22px;background:rgba(255,255,255,0.05);
            border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#9ca3af;
            font-size:14px;font-weight:700;cursor:pointer;">
            <i class="fas fa-rotate-left" style="margin-right:7px;"></i>Reset
          </button>
          <button onclick="saveProfile()" style="padding:12px 28px;
            background:linear-gradient(135deg,#FF2D78,#C026D3,#7C3AED);color:#fff;
            font-size:14px;font-weight:900;border:none;border-radius:12px;cursor:pointer;
            box-shadow:0 0 22px rgba(255,45,120,0.4);display:flex;align-items:center;gap:8px;">
            <i class="fas fa-save"></i> Save Profile &amp; Update AI
          </button>
        </div>

      </div><!-- end right column -->
    </div><!-- end grid -->
  </div><!-- end padding wrap -->

  <style>
    .pf-input{
      width:100%;background:rgba(255,255,255,0.05);border:1.5px solid rgba(255,255,255,0.1);
      border-radius:12px;padding:11px 14px;color:#fff;font-size:14px;outline:none;
      transition:border-color .2s;box-sizing:border-box;font-family:inherit;
    }
    .pf-input:focus{border-color:#A78BFA;box-shadow:0 0 0 3px rgba(124,58,237,0.12);}
    .pf-input option{background:#0d1117;color:#fff;}
    .pf-ta{resize:vertical;min-height:80px;}
    @media(max-width:820px){
      .profile-grid{grid-template-columns:1fr!important;}
      .grid-2-col{grid-template-columns:1fr!important;}
      .full-col{grid-column:span 1!important;}
      .grid-3-col{grid-template-columns:1fr 1fr!important;}
    }
  </style>

  <script>
  const PROFILE_KEY = 'ss_profile_v1';
  const REPORTS_KEY = 'ss_reports_v1';

  // ── Load saved profile on boot ─────────────────────────────────────────────
  function loadProfile() {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
    const fields = ['pFirstName','pSurname','pUsername','pEmail','pPhone',
                    'pBizName','pAddress','pIndustry','pUrl','pAudience',
                    'pAbout','pGoals','pContentWish','pWeeklyWish','pMonthlyPlan','pExtra'];
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el && saved[id] !== undefined) el.value = saved[id];
    });
    // checkboxes
    for (let i=1;i<=12;i++) {
      const cb = document.getElementById('up'+i);
      if (cb && saved['up'+i]) { cb.checked = true; syncCheckStyle('up'+i); }
    }
    // avatar
    if (saved.avatarSrc) {
      document.getElementById('avatarImg').src = saved.avatarSrc;
      document.getElementById('avatarImg').style.display = 'block';
      document.getElementById('avatarInitial').style.display = 'none';
    }
    updateDisplay();
    updateLockedUrl();
    loadReports();
  }

  function updateDisplay() {
    const fn = (document.getElementById('pFirstName').value || '').trim();
    const sn = (document.getElementById('pSurname').value || '').trim();
    const bz = (document.getElementById('pBizName').value || '').trim();
    document.getElementById('displayName').textContent = (fn || sn) ? fn + ' ' + sn : 'Your Name';
    document.getElementById('displayBiz').textContent  = bz || 'Your Business';
    const init = fn ? fn[0].toUpperCase() : (sn ? sn[0].toUpperCase() : '?');
    document.getElementById('avatarInitial').textContent = init;
  }

  function updateLockedUrl() {
    const url = (document.getElementById('pUrl') ? document.getElementById('pUrl').value : '') || '— not set yet —';
    const el = document.getElementById('lockedUrl');
    if (el) el.textContent = url;
  }

  // ── Save ────────────────────────────────────────────────────────────────────
  function saveProfile() {
    const data = {};
    const fields = ['pFirstName','pSurname','pUsername','pEmail','pPhone',
                    'pBizName','pAddress','pIndustry','pUrl','pAudience',
                    'pAbout','pGoals','pContentWish','pWeeklyWish','pMonthlyPlan','pExtra'];
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el) data[id] = el.value;
    });
    for (let i=1;i<=12;i++) {
      const cb = document.getElementById('up'+i);
      if (cb) data['up'+i] = cb.checked;
    }
    // avatar
    const img = document.getElementById('avatarImg');
    if (img.style.display !== 'none' && img.src) data.avatarSrc = img.src;

    localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
    updateLockedUrl();

    // show banner
    const banner = document.getElementById('saveBanner');
    banner.style.display = 'flex';
    setTimeout(() => { banner.style.display = 'none'; }, 4000);

    // toast
    showToast('✅ Profile saved — AI is updated!');
  }

  function resetProfile() {
    if (!confirm('Reset all profile fields? This cannot be undone.')) return;
    localStorage.removeItem(PROFILE_KEY);
    location.reload();
  }

  // ── Profile pic upload ─────────────────────────────────────────────────────
  function handlePicUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      document.getElementById('avatarImg').src = ev.target.result;
      document.getElementById('avatarImg').style.display = 'block';
      document.getElementById('avatarInitial').style.display = 'none';
    };
    reader.readAsDataURL(file);
  }

  // ── Checkbox style sync ────────────────────────────────────────────────────
  function syncCheckStyle(id) {
    const cb  = document.getElementById(id);
    const lbl = document.getElementById('lbl_'+id);
    if (!cb || !lbl) return;
    if (cb.checked) {
      lbl.style.background = 'rgba(124,58,237,0.12)';
      lbl.style.borderColor = 'rgba(124,58,237,0.45)';
    } else {
      lbl.style.background = 'rgba(255,255,255,0.03)';
      lbl.style.borderColor = 'rgba(255,255,255,0.08)';
    }
  }

  // ── Reports storage & display ──────────────────────────────────────────────
  function loadReports() {
    const reports = JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]');
    const list  = document.getElementById('reportsList');
    const count = document.getElementById('reportCount');
    const used  = document.getElementById('reportsUsed');
    const left  = document.getElementById('reportsLeft');
    if (count) count.textContent = reports.length;
    if (used)  used.textContent  = reports.length;
    if (left)  left.textContent  = Math.max(0, 5 - reports.length);

    if (!reports.length) {
      list.innerHTML = '<div style="text-align:center;padding:18px 10px;color:#4b5563;font-size:12px;"><i class="fas fa-folder-open" style="font-size:24px;color:#374151;display:block;margin-bottom:8px;"></i>No reports yet. Run an analysis to save one here.</div>';
      return;
    }
    list.innerHTML = reports.map((r, i) => \`
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);
        border-radius:10px;padding:12px 14px;display:flex;align-items:center;gap:10px;">
        <i class="fas fa-file-chart-column" style="color:#60A5FA;font-size:16px;flex-shrink:0;"></i>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">\${r.bizName || 'Unnamed'}</div>
          <div style="font-size:11px;color:#6b7280;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">\${r.url || ''}</div>
          <div style="font-size:10px;color:#4b5563;margin-top:2px;">\${r.date || ''}</div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0;">
          <a href="/analysis?url=\${encodeURIComponent(r.url || '')}" style="font-size:10px;font-weight:700;padding:4px 9px;border-radius:7px;
            background:rgba(96,165,250,0.1);border:1px solid rgba(96,165,250,0.25);color:#60A5FA;text-decoration:none;">View</a>
          <button onclick="deleteReport(\${i})" style="font-size:10px;font-weight:700;padding:4px 9px;border-radius:7px;
            background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.2);color:#f87171;cursor:pointer;border:none;">✕</button>
        </div>
      </div>\`).join('');
  }

  function deleteReport(idx) {
    const reports = JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]');
    reports.splice(idx, 1);
    localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
    loadReports();
    showToast('Report removed.');
  }

  // ── Toast ──────────────────────────────────────────────────────────────────
  function showToast(msg) {
    let t = document.getElementById('pfToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'pfToast';
      t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:linear-gradient(135deg,#FF2D78,#7C3AED);color:#fff;font-size:13px;font-weight:700;padding:12px 20px;border-radius:12px;z-index:9999;box-shadow:0 8px 24px rgba(255,45,120,0.35);';
      document.body.appendChild(t);
    }
    t.textContent = msg; t.style.display = 'block';
    setTimeout(() => { t.style.display = 'none'; }, 3500);
  }

  // ── Load live account data from API ───────────────────────────────────────
  async function loadAccountData() {
    try {
      const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
      const email = saved.pEmail || 'demo@socialstrategy.ai';
      const resp = await fetch('/api/account?email=' + encodeURIComponent(email));
      if (!resp.ok) return;
      const data = await resp.json();
      if (!data.success) return;

      // Update credits ring
      const pct = data.creditsPct || 0;
      const dashOffset = 314 - (314 * pct / 100);
      const ring = document.getElementById('creditRing');
      if (ring) ring.setAttribute('stroke-dashoffset', String(dashOffset));

      // Update ring text
      const ringTexts = document.querySelectorAll('#avatarCircle ~ * text, svg text');
      // Re-query svg inside avatar
      const svgTexts = document.querySelectorAll('svg text');
      svgTexts.forEach(t => {
        if (t.textContent && t.textContent.includes(',')) {
          t.textContent = (data.creditsRemaining || 0).toLocaleString();
        }
        if (t.textContent && t.textContent.includes('of 10,000')) {
          t.textContent = 'of ' + (data.creditsMax || 0).toLocaleString() + ' credits';
        }
      });

      // Update top pills
      const creditDisplay = document.getElementById('creditDisplay');
      if (creditDisplay) {
        creditDisplay.innerHTML = (data.creditsRemaining || 0).toLocaleString() +
          ' <span style="color:#4b5563;font-weight:500;">/ ' + (data.creditsMax || 0).toLocaleString() + '</span>';
      }
      const creditBar = document.getElementById('creditBar');
      if (creditBar) creditBar.style.width = pct + '%';

      // Change bar color based on level
      if (creditBar) {
        if (pct < 20) creditBar.style.background = 'linear-gradient(90deg,#f87171,#ef4444)';
        else if (pct < 50) creditBar.style.background = 'linear-gradient(90deg,#fbbf24,#f59e0b)';
        else creditBar.style.background = 'linear-gradient(90deg,#fbbf24,#f59e0b)';
      }

      const expiryDisplay = document.getElementById('expiryDisplay');
      if (expiryDisplay) {
        if (data.daysLeft === null) expiryDisplay.textContent = 'No expiry';
        else if (data.daysLeft === 0) {
          expiryDisplay.textContent = 'Expired!';
          expiryDisplay.style.color = '#f87171';
        } else {
          expiryDisplay.textContent = data.daysLeft + ' days';
          if (data.daysLeft <= 7) expiryDisplay.style.color = '#fbbf24';
        }
      }

      // Update plan badge
      const planBadge = document.getElementById('planBadge');
      if (planBadge) {
        const planColors = {
          free: 'rgba(156,163,175,0.15)',
          pro: 'rgba(0,229,255,0.15)',
          business: 'rgba(167,139,250,0.15)'
        };
        const planBorders = {
          free: 'rgba(156,163,175,0.3)',
          pro: 'rgba(0,229,255,0.3)',
          business: 'rgba(167,139,250,0.3)'
        };
        const planTextColors = {
          free: '#9ca3af',
          pro: '#00E5FF',
          business: '#A78BFA'
        };
        const p = (data.plan || 'free').toLowerCase();
        planBadge.style.background = planColors[p] || planColors.free;
        planBadge.style.borderColor = planBorders[p] || planBorders.free;
        planBadge.style.color = planTextColors[p] || planTextColors.free;
        planBadge.textContent = (data.plan || 'FREE').toUpperCase();
      }

      // Update reports section
      const reportsUsedEl = document.getElementById('reportsUsed');
      const reportsLimitEl = document.getElementById('reportsLimit');
      const reportsLeftEl = document.getElementById('reportsLeft');
      if (reportsUsedEl) reportsUsedEl.textContent = String(data.reportsUsed || 0);
      if (reportsLimitEl) reportsLimitEl.textContent = data.reportsMax === -1 ? '∞' : String(data.reportsMax || 0);
      if (reportsLeftEl) {
        reportsLeftEl.textContent = data.reportsMax === -1 ? '∞' : String(data.reportsRemaining || 0);
        if ((data.reportsRemaining || 0) === 0) reportsLeftEl.style.color = '#f87171';
      }

      // Blocked / expired banner
      if (data.status === 'blocked' || data.status === 'expired' || data.status === 'suspended') {
        const banner = document.createElement('div');
        banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:999;background:rgba(248,113,113,0.95);padding:14px 24px;text-align:center;font-weight:800;font-size:14px;color:#fff;';
        const msgs = {
          blocked: '🚫 Your account has been blocked. Contact support@socialstrategy.ai',
          expired: '⏰ Your subscription has expired. Please renew to continue using AI features.',
          suspended: '⏸️ Account suspended. Please update your billing details.'
        };
        banner.textContent = msgs[data.status] || 'Account issue detected.';
        document.body.prepend(banner);
      }

    } catch (_) {}
  }

  // ── Boot ──────────────────────────────────────────────────────────────────
  (function boot() {
    loadProfile();
    loadAccountData();
  })();
  </script>
  `

  return layout('My Profile · Social Strategy', content)
}
