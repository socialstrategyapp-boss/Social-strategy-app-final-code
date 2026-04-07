import { layout, ssLogo, topBar } from './layout'

export function reportPage(): string {

  // Demo report data — will be replaced by /api/reports/latest
  const demoReport = {
    businessName: 'Bloom Beauty Co.',
    website: 'bloombeauty.com.au',
    industry: 'Beauty & Cosmetics',
    score: 74,
    grade: 'B+',
    generatedAt: 'Today, 9:32 AM',
    summary: 'Bloom Beauty Co. has strong brand identity and loyal customer base, but is significantly under-leveraging social media reach. SEO technical gaps and inconsistent posting are limiting organic growth by an estimated 40%.',
  }

  const content = `
${topBar('AI Strategy Report', 'Your complete business intelligence analysis', `<a href="/content-studio" style="background:linear-gradient(135deg,#FF2D78,#C026D3);color:#fff;font-size:12px;font-weight:700;padding:7px 14px;border-radius:999px;text-decoration:none;display:flex;align-items:center;gap:5px;"><i class="fas fa-wand-magic-sparkles"></i> Create Content</a>`)}

<style>
  .rp-wrap{padding:20px;max-width:900px;margin:0 auto;}
  .rp-card{background:rgba(4,12,32,0.92);border:1px solid rgba(0,229,255,0.18);border-radius:16px;padding:22px;margin-bottom:18px;}
  .rp-section-title{font-size:14px;font-weight:800;color:#fff;margin:0 0 16px;display:flex;align-items:center;gap:8px;}
  .rp-section-icon{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .rp-label{font-size:11px;font-weight:700;color:#6a8aaa;text-transform:uppercase;letter-spacing:1px;}
  .rp-value{font-size:15px;font-weight:700;color:#fff;}
  .rp-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
  @media(max-width:700px){.rp-grid-3{grid-template-columns:1fr 1fr;}}
  @media(max-width:480px){.rp-grid-3{grid-template-columns:1fr;}}
  .rp-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  @media(max-width:600px){.rp-grid-2{grid-template-columns:1fr;}}

  .rp-score-ring{position:relative;width:100px;height:100px;flex-shrink:0;}
  .rp-score-text{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
  .rp-score-num{font-size:28px;font-weight:900;color:#fff;line-height:1;}
  .rp-score-grade{font-size:14px;font-weight:800;color:#00E5FF;}

  /* Score meter bar */
  .rp-meter{height:8px;border-radius:4px;background:rgba(255,255,255,0.08);overflow:hidden;margin-top:6px;}
  .rp-meter-fill{height:100%;border-radius:4px;transition:width 1s ease;}

  /* Finding card */
  .rp-finding{display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:12px;border:1px solid transparent;}
  .rp-finding-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;}

  /* 30-day plan */
  .rp-week{border-radius:12px;padding:14px;border:1px solid rgba(0,229,255,0.15);margin-bottom:10px;}
  .rp-week-header{font-size:12px;font-weight:800;color:#00E5FF;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;}
  .rp-task{display:flex;align-items:flex-start;gap:8px;padding:6px 0;font-size:13px;color:#a8b8cc;border-bottom:1px solid rgba(255,255,255,0.04);}
  .rp-task:last-child{border-bottom:none;}
  .rp-task-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;margin-top:5px;}

  /* Pillar card */
  .rp-pillar{background:rgba(2,8,22,0.9);border:1px solid rgba(0,229,255,0.15);border-radius:12px;padding:14px;}
  .rp-pillar-title{font-size:12px;font-weight:800;color:#00E5FF;margin-bottom:8px;}

  /* Action bar */
  .rp-action-row{display:flex;gap:10px;flex-wrap:wrap;}
</style>

<div class="rp-wrap" id="reportWrap">

  <!-- Loading state -->
  <div id="reportLoading" style="text-align:center;padding:60px 20px;display:none;">
    <div style="font-size:32px;margin-bottom:16px;animation:spin 1s linear infinite;display:inline-block;">⚙️</div>
    <div style="font-size:18px;font-weight:700;color:#fff;margin-bottom:8px;">Loading your report...</div>
    <div style="font-size:14px;color:#6a8aaa;">Fetching latest analysis</div>
  </div>

  <!-- ① REPORT HERO SUMMARY -->
  <div class="rp-card" style="background:linear-gradient(135deg,rgba(0,229,255,0.06),rgba(124,58,237,0.04));border-color:rgba(0,229,255,0.3);">
    <div style="display:flex;align-items:flex-start;gap:20px;flex-wrap:wrap;">
      <!-- Score ring (SVG) -->
      <div class="rp-score-ring">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,229,255,0.1)" stroke-width="8"/>
          <circle cx="50" cy="50" r="40" fill="none" stroke="url(#scoreGrad)" stroke-width="8"
            stroke-dasharray="251" stroke-dashoffset="${251 - (251 * demoReport.score / 100)}"
            stroke-linecap="round" transform="rotate(-90 50 50)"/>
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#00E5FF"/>
              <stop offset="100%" stop-color="#7C3AED"/>
            </linearGradient>
          </defs>
        </svg>
        <div class="rp-score-text">
          <div class="rp-score-num" id="heroScore">${demoReport.score}</div>
          <div class="rp-score-grade" id="heroGrade">${demoReport.grade}</div>
        </div>
      </div>
      <!-- Hero text -->
      <div style="flex:1;min-width:200px;">
        <div style="font-size:20px;font-weight:900;color:#fff;margin-bottom:4px;" id="heroName">${demoReport.businessName}</div>
        <div style="font-size:13px;color:#00E5FF;font-weight:600;margin-bottom:10px;" id="heroWebsite">🌐 ${demoReport.website} · ${demoReport.industry}</div>
        <div style="font-size:14px;color:#a8b8cc;line-height:1.7;" id="heroSummary">${demoReport.summary}</div>
      </div>
      <div style="flex-shrink:0;text-align:right;">
        <div style="font-size:11px;color:#6a8aaa;margin-bottom:6px;">${demoReport.generatedAt}</div>
        <button onclick="regenerateReport()" style="background:rgba(0,229,255,0.08);border:1px solid rgba(0,229,255,0.2);color:#00E5FF;font-size:11px;font-weight:700;padding:6px 12px;border-radius:999px;cursor:pointer;">
          <i class="fas fa-refresh"></i> Refresh
        </button>
      </div>
    </div>
  </div>

  <!-- ② BUSINESS SNAPSHOT -->
  <div class="rp-card">
    <div class="rp-section-title">
      <div class="rp-section-icon" style="background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.25);">
        <i class="fas fa-building" style="color:#00E5FF;font-size:13px;"></i>
      </div>
      Business Snapshot
    </div>
    <div class="rp-grid-3">
      <div>
        <div class="rp-label">Website Score</div>
        <div class="rp-meter"><div class="rp-meter-fill" style="width:74%;background:linear-gradient(135deg,#00E5FF,#0070F3);"></div></div>
        <div style="font-size:12px;color:#00E5FF;font-weight:700;margin-top:4px;">74/100</div>
      </div>
      <div>
        <div class="rp-label">SEO Health</div>
        <div class="rp-meter"><div class="rp-meter-fill" style="width:61%;background:linear-gradient(135deg,#A78BFA,#7C3AED);"></div></div>
        <div style="font-size:12px;color:#A78BFA;font-weight:700;margin-top:4px;">61/100</div>
      </div>
      <div>
        <div class="rp-label">Social Presence</div>
        <div class="rp-meter"><div class="rp-meter-fill" style="width:48%;background:linear-gradient(135deg,#FF2D78,#C026D3);"></div></div>
        <div style="font-size:12px;color:#FF2D78;font-weight:700;margin-top:4px;">48/100</div>
      </div>
    </div>
    <div style="margin-top:18px;" class="rp-grid-3">
      ${[
        {label:'Monthly Visitors', value:'~4,200', icon:'fas fa-users', color:'#00E5FF'},
        {label:'Avg. Page Speed', value:'3.2s', icon:'fas fa-gauge-high', color:'#fbbf24'},
        {label:'Backlinks', value:'142', icon:'fas fa-link', color:'#A78BFA'},
        {label:'Keywords Ranking', value:'38', icon:'fas fa-search', color:'#00ff88'},
        {label:'Platforms Active', value:'3 / 8', icon:'fas fa-share-nodes', color:'#FF2D78'},
        {label:'Content Frequency', value:'2× / wk', icon:'fas fa-calendar', color:'#00E5FF'},
      ].map(s => `
      <div style="background:rgba(2,8,22,0.8);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <i class="${s.icon}" style="color:${s.color};font-size:12px;"></i>
          <span class="rp-label">${s.label}</span>
        </div>
        <div style="font-size:18px;font-weight:900;color:#fff;">${s.value}</div>
      </div>`).join('')}
    </div>
  </div>

  <!-- ③ KEY FINDINGS -->
  <div class="rp-card">
    <div class="rp-section-title">
      <div class="rp-section-icon" style="background:rgba(255,214,0,0.08);border:1px solid rgba(255,214,0,0.25);">
        <i class="fas fa-magnifying-glass" style="color:#FFD600;font-size:13px;"></i>
      </div>
      Key Findings
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${[
        {type:'critical', icon:'fas fa-exclamation-triangle', color:'#f87171', bg:'rgba(248,113,113,0.05)', border:'rgba(248,113,113,0.2)', title:'Social Media Underperformance', desc:'Only 3 of 8 platforms active. Missing TikTok, YouTube & LinkedIn — estimated 40% reach loss.'},
        {type:'warning', icon:'fas fa-clock', color:'#fbbf24', bg:'rgba(251,191,36,0.05)', border:'rgba(251,191,36,0.2)', title:'Inconsistent Posting Schedule', desc:'Average 2 posts/week vs. recommended 7–14. Algorithm suppression detected on Instagram.'},
        {type:'opportunity', icon:'fas fa-arrow-trend-up', color:'#4ade80', bg:'rgba(74,222,128,0.05)', border:'rgba(74,222,128,0.2)', title:'SEO Quick Wins Available', desc:'38 keywords in positions 11–20. Small content updates could move 12+ to page 1 within 60 days.'},
        {type:'positive', icon:'fas fa-star', color:'#00E5FF', bg:'rgba(0,229,255,0.04)', border:'rgba(0,229,255,0.15)', title:'Strong Brand Identity', desc:'Logo consistency and visual branding rated 8.2/10. Audience trust signals are above industry average.'},
      ].map(f => `
      <div class="rp-finding" style="background:${f.bg};border-color:${f.border};">
        <div class="rp-finding-icon" style="background:${f.bg};border:1px solid ${f.border};">
          <i class="${f.icon}" style="color:${f.color};"></i>
        </div>
        <div>
          <div style="font-size:13px;font-weight:700;color:#fff;margin-bottom:3px;">${f.title}</div>
          <div style="font-size:12px;color:#8aabcc;line-height:1.6;">${f.desc}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- ④ GROWTH OPPORTUNITIES -->
  <div class="rp-card">
    <div class="rp-section-title">
      <div class="rp-section-icon" style="background:rgba(0,255,136,0.08);border:1px solid rgba(0,255,136,0.25);">
        <i class="fas fa-seedling" style="color:#00ff88;font-size:13px;"></i>
      </div>
      Growth Opportunities
    </div>
    <div class="rp-grid-2" style="gap:12px;">
      ${[
        {title:'TikTok Launch', impact:'+35% reach', effort:'Medium', color:'#00ff88', icon:'fas fa-video', desc:'Your beauty content is highly visual. TikTok tutorials could add 10K+ monthly views within 90 days.'},
        {title:'Email Newsletter', impact:'+$2K MRR', effort:'Low', color:'#A78BFA', icon:'fas fa-envelope', desc:'You have 4,200 monthly visitors but no email capture. A 5% conversion = 210 new leads/month.'},
        {title:'UGC Campaign', impact:'+22% trust', effort:'Low', color:'#FFD600', icon:'fas fa-users', desc:'Encourage customer photo reviews. UGC content converts 3× better than brand-produced content.'},
        {title:'LinkedIn Authority', impact:'+B2B leads', effort:'Medium', color:'#00E5FF', icon:'fas fa-briefcase', desc:'B2B beauty suppliers and wholesale buyers actively search LinkedIn. Zero presence = lost leads.'},
      ].map(o => `
      <div style="background:rgba(2,8,22,0.9);border:1px solid rgba(${o.color.replace('#','').match(/.{2}/g)?.map(x=>parseInt(x,16)).join(',')},0.2);border-radius:12px;padding:14px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:28px;height:28px;border-radius:7px;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;">
              <i class="${o.icon}" style="color:${o.color};font-size:12px;"></i>
            </div>
            <span style="font-size:13px;font-weight:800;color:#fff;">${o.title}</span>
          </div>
          <span style="font-size:11px;font-weight:700;color:${o.color};background:rgba(255,255,255,0.05);padding:3px 8px;border-radius:999px;">${o.impact}</span>
        </div>
        <div style="font-size:12px;color:#8aabcc;line-height:1.5;margin-bottom:8px;">${o.desc}</div>
        <div style="font-size:11px;color:#6a8aaa;">Effort: <strong style="color:#fff;">${o.effort}</strong></div>
      </div>`).join('')}
    </div>
  </div>

  <!-- ⑤ SEO / BRANDING / CONTENT PILLARS -->
  <div class="rp-card">
    <div class="rp-section-title">
      <div class="rp-section-icon" style="background:rgba(167,139,250,0.1);border:1px solid rgba(167,139,250,0.25);">
        <i class="fas fa-layer-group" style="color:#A78BFA;font-size:13px;"></i>
      </div>
      SEO · Branding · Content Pillars
    </div>
    <div class="rp-grid-3">
      <!-- SEO -->
      <div class="rp-pillar">
        <div class="rp-pillar-title">🔍 Top SEO Keywords</div>
        ${['organic face serum', 'natural moisturiser AU', 'cruelty free makeup', 'vegan skincare routine', 'bloom beauty review'].map(k =>
          `<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:12px;"><span style="color:#c8e6ff;">${k}</span><span style="color:#A78BFA;font-weight:700;font-size:11px;">#${Math.floor(Math.random()*15)+5}</span></div>`
        ).join('')}
      </div>
      <!-- Branding -->
      <div class="rp-pillar">
        <div class="rp-pillar-title">🎨 Brand Score</div>
        ${[
          {label:'Visual Identity', score:82, color:'#00E5FF'},
          {label:'Tone Consistency', score:68, color:'#A78BFA'},
          {label:'Messaging Clarity', score:74, color:'#00ff88'},
          {label:'Trust Signals', score:79, color:'#FFD600'},
          {label:'Differentiation', score:55, color:'#FF2D78'},
        ].map(b => `
        <div style="margin-bottom:8px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:3px;font-size:12px;"><span style="color:#8aabcc;">${b.label}</span><span style="color:${b.color};font-weight:700;">${b.score}</span></div>
          <div class="rp-meter"><div class="rp-meter-fill" style="width:${b.score}%;background:${b.color};"></div></div>
        </div>`).join('')}
      </div>
      <!-- Content Pillars -->
      <div class="rp-pillar">
        <div class="rp-pillar-title">📌 Content Pillars</div>
        ${[
          {pillar:'Education', desc:'How-to skincare routines', color:'#00E5FF'},
          {pillar:'Inspiration', desc:'Before/after transformations', color:'#A78BFA'},
          {pillar:'Community', desc:'Customer stories & UGC', color:'#00ff88'},
          {pillar:'Behind Brand', desc:'Process & values', color:'#FF2D78'},
          {pillar:'Promotion', desc:'Products & offers (20% max)', color:'#FFD600'},
        ].map(p => `
        <div style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
          <div style="width:8px;height:8px;border-radius:50%;background:${p.color};margin-top:4px;flex-shrink:0;"></div>
          <div><div style="font-size:12px;font-weight:700;color:#fff;">${p.pillar}</div><div style="font-size:11px;color:#6a8aaa;">${p.desc}</div></div>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- ⑥ 30-DAY SUGGESTED PLAN -->
  <div class="rp-card">
    <div class="rp-section-title">
      <div class="rp-section-icon" style="background:rgba(255,45,120,0.1);border:1px solid rgba(255,45,120,0.25);">
        <i class="fas fa-calendar-check" style="color:#FF2D78;font-size:13px;"></i>
      </div>
      30-Day Action Plan
      <button onclick="exportPlan()" style="margin-left:auto;background:rgba(255,45,120,0.08);border:1px solid rgba(255,45,120,0.25);color:#FF2D78;font-size:11px;font-weight:700;padding:5px 12px;border-radius:999px;cursor:pointer;">
        <i class="fas fa-download"></i> Export Plan
      </button>
    </div>
    ${[
      {week:'Week 1 — Foundation', color:'#00E5FF', tasks:[
        {text:'Activate TikTok & LinkedIn accounts', dot:'#00E5FF'},
        {text:'Fix 5 critical SEO meta tags on homepage', dot:'#00ff88'},
        {text:'Set up content calendar (28 posts planned)', dot:'#A78BFA'},
        {text:'Create first AI Character for your brand', dot:'#FF2D78'},
      ]},
      {week:'Week 2 — Content Blitz', color:'#A78BFA', tasks:[
        {text:'Publish 10 posts across all 8 platforms', dot:'#A78BFA'},
        {text:'Launch UGC customer review request campaign', dot:'#FFD600'},
        {text:'Record 3× TikTok tutorials (batch shoot)', dot:'#00E5FF'},
        {text:'Write & publish 2 long-form blog articles', dot:'#00ff88'},
      ]},
      {week:'Week 3 — Engage & Optimise', color:'#FFD600', tasks:[
        {text:'Analyse which posts are performing (top 3)', dot:'#FFD600'},
        {text:'Boost top post with $50 paid promotion', dot:'#FF2D78'},
        {text:'Respond to all comments & DMs within 24hrs', dot:'#00E5FF'},
        {text:'A/B test 2 different caption styles', dot:'#A78BFA'},
      ]},
      {week:'Week 4 — Scale & Report', color:'#00ff88', tasks:[
        {text:'Generate weekly analytics report', dot:'#00ff88'},
        {text:'Update content calendar for next 30 days', dot:'#00E5FF'},
        {text:'Set up email capture popup (target 5% CVR)', dot:'#A78BFA'},
        {text:'Review & adjust character voice based on data', dot:'#FF2D78'},
      ]},
    ].map(w => `
    <div class="rp-week">
      <div class="rp-week-header" style="color:${w.color};">${w.week}</div>
      ${w.tasks.map(t => `
      <div class="rp-task">
        <div class="rp-task-dot" style="background:${t.dot};"></div>
        <span>${t.text}</span>
      </div>`).join('')}
    </div>`).join('')}
  </div>

  <!-- ⑦ REPORT ACTIONS -->
  <div class="rp-card" style="border-color:rgba(0,229,255,0.3);">
    <div class="rp-section-title">
      <div class="rp-section-icon" style="background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.25);">
        <i class="fas fa-download" style="color:#00E5FF;font-size:13px;"></i>
      </div>
      Report Actions
    </div>
    <div class="rp-action-row">
      <button onclick="downloadPDF()" class="btn-primary" style="font-size:13px;padding:10px 20px;">
        <i class="fas fa-file-pdf"></i> Download PDF
      </button>
      <button onclick="shareReport()" class="btn-ghost" style="font-size:13px;padding:10px 20px;">
        <i class="fas fa-share-nodes"></i> Share Link
      </button>
      <button onclick="archiveReport()" class="btn-ghost" style="font-size:13px;padding:10px 20px;">
        <i class="fab fa-github"></i> Archive to GitHub
      </button>
      <button onclick="regenerateReport()" style="background:rgba(255,214,0,0.08);border:1px solid rgba(255,214,0,0.25);color:#FFD600;font-size:13px;font-weight:700;padding:10px 18px;border-radius:999px;cursor:pointer;display:flex;align-items:center;gap:6px;">
        <i class="fas fa-refresh"></i> Regenerate
      </button>
    </div>
  </div>

  <!-- ⑧ USE THIS REPORT IN CREATE STUDIO -->
  <div class="rp-card" style="background:linear-gradient(135deg,rgba(255,45,120,0.06),rgba(124,58,237,0.04));border-color:rgba(255,45,120,0.3);">
    <div class="rp-section-title">
      <div class="rp-section-icon" style="background:rgba(255,45,120,0.1);border:1px solid rgba(255,45,120,0.25);">
        <i class="fas fa-rocket" style="color:#FF2D78;font-size:13px;"></i>
      </div>
      Use This Report
    </div>
    <p style="font-size:13px;color:#a8b8cc;margin:0 0 16px;line-height:1.7;">Turn your insights into action. Use this report to generate content, characters and campaigns that directly address your growth opportunities.</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
      <a href="/content-studio" style="background:linear-gradient(135deg,rgba(255,45,120,0.15),rgba(124,58,237,0.1));border:1px solid rgba(255,45,120,0.3);border-radius:14px;padding:16px;text-decoration:none;text-align:center;transition:all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
        <div style="font-size:20px;margin-bottom:8px;">✨</div>
        <div style="font-size:13px;font-weight:800;color:#fff;margin-bottom:4px;">Create Content</div>
        <div style="font-size:11px;color:#a8b8cc;">AI-generated posts using your report data</div>
      </a>
      <a href="/character-create" style="background:linear-gradient(135deg,rgba(0,229,255,0.08),rgba(0,112,243,0.06));border:1px solid rgba(0,229,255,0.25);border-radius:14px;padding:16px;text-decoration:none;text-align:center;transition:all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
        <div style="font-size:20px;margin-bottom:8px;">🤖</div>
        <div style="font-size:13px;font-weight:800;color:#fff;margin-bottom:4px;">Create Character</div>
        <div style="font-size:11px;color:#a8b8cc;">Build an AI persona for your brand</div>
      </a>
      <a href="/scheduler" style="background:linear-gradient(135deg,rgba(255,214,0,0.08),rgba(255,107,0,0.05));border:1px solid rgba(255,214,0,0.25);border-radius:14px;padding:16px;text-decoration:none;text-align:center;transition:all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
        <div style="font-size:20px;margin-bottom:8px;">📅</div>
        <div style="font-size:13px;font-weight:800;color:#fff;margin-bottom:4px;">Schedule 30-Day Plan</div>
        <div style="font-size:11px;color:#a8b8cc;">Auto-queue all planned content</div>
      </a>
    </div>
  </div>

</div><!-- /.rp-wrap -->

<script>
function regenerateReport() {
  var wrap = document.getElementById('reportWrap');
  wrap.style.opacity = '0.5';
  wrap.style.pointerEvents = 'none';
  setTimeout(function() {
    wrap.style.opacity = '1';
    wrap.style.pointerEvents = '';
  }, 1500);
}

function downloadPDF() {
  alert('PDF export coming soon. This will generate a professional branded PDF report.');
}

function shareReport() {
  var url = window.location.href;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(function() {
      showToast('Report link copied to clipboard!');
    });
  } else {
    showToast('Copy this URL: ' + url);
  }
}

function archiveReport() {
  showToast('Report archived to GitHub (demo mode)');
}

function exportPlan() {
  showToast('30-day plan exported to scheduler queue!');
  setTimeout(function() { window.location.href = '/scheduler'; }, 1500);
}

function showToast(msg) {
  var t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#0070F3;color:#fff;font-size:13px;font-weight:700;padding:10px 20px;border-radius:999px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.5);';
  document.body.appendChild(t);
  setTimeout(function(){ document.body.removeChild(t); }, 2500);
}

// Load latest report on page load
window.addEventListener('load', function() {
  fetch('/api/reports/latest')
    .then(function(r){ return r.json(); })
    .then(function(data) {
      if (data && data.businessName) {
        document.getElementById('heroName').textContent = data.businessName;
        document.getElementById('heroWebsite').textContent = '🌐 ' + (data.website||'') + ' · ' + (data.industry||'');
        document.getElementById('heroSummary').textContent = data.summary || '';
        if (data.score) {
          document.getElementById('heroScore').textContent = data.score;
          document.getElementById('heroGrade').textContent = data.grade || '';
        }
      }
    })
    .catch(function(){ /* use demo data */ });
});
</script>
`

  return layout('Strategy Report', content, 'analytics')
}
