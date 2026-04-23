import { layout, topBar } from './layout'

export function analysisPage(): string {
  const content = `
  ${topBar('Website Analysis', 'AI-powered business intelligence in 2 minutes', '<a href="/pricing" style="display:flex;align-items:center;gap:5px;font-size:11px;color:#00E5FF;font-weight:700;background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.35);border-radius:20px;padding:6px 13px;cursor:pointer;text-decoration:none;transition:all 0.2s;white-space:nowrap;" onmouseover="this.style.background=\'rgba(0,229,255,0.18)\'" onmouseout="this.style.background=\'rgba(0,229,255,0.1)\'">⚡ GPT-4o — Upgrade</a>')}

  <div style="padding:24px;max-width:920px;">

    <!-- URL Input Card -->
    <div style="background:rgba(0,229,255,0.04);border:1px solid rgba(0,229,255,0.2);border-radius:20px;padding:28px;margin-bottom:28px;position:relative;overflow:hidden;">
      <div style="position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:rgba(0,229,255,0.04);border-radius:50%;pointer-events:none;"></div>
      <div style="position:relative;">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;">
          <div style="width:44px;height:44px;border-radius:14px;background:linear-gradient(135deg,#00E5FF,#0070F3);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <i class="fas fa-search" style="color:#fff;font-size:18px;"></i>
          </div>
          <div>
            <h2 style="font-size:20px;font-weight:800;color:#fff;margin:0;">Scan Any Brand, Website or Creator</h2>
            <p style="font-size:13px;color:#9ca3af;margin:4px 0 0;">Get a complete AI business &amp; marketing intelligence report</p>
          </div>
        </div>

        <!-- Filter chips -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
          ${['Website','Business','Creator','Product','Social Profile'].map((chip, i) => `
          <button onclick="selectChip(this)" class="scan-chip" style="padding:7px 16px;border-radius:999px;font-size:12px;font-weight:700;border:1px solid ${i===0?'rgba(0,229,255,0.5)':'rgba(255,255,255,0.12)'};background:${i===0?'rgba(0,229,255,0.12)':'rgba(255,255,255,0.04)'};color:${i===0?'#00E5FF':'#9ca3af'};cursor:pointer;transition:all 0.2s;">
            ${chip}
          </button>`).join('')}
        </div>

        <div style="display:flex;gap:12px;margin-bottom:14px;flex-wrap:wrap;align-items:stretch;">
          <div id="urlWrap" style="flex:1;min-width:180px;display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:12px 16px;transition:border-color 0.2s;">
            <i class="fas fa-globe" style="color:#6b7280;font-size:14px;flex-shrink:0;"></i>
            <input id="urlInput" type="url" placeholder="https://yourbusiness.com"
              style="flex:1;min-width:0;background:transparent;color:#fff;border:none;outline:none;font-size:14px;"
              onfocus="document.getElementById('urlWrap').style.borderColor='#00E5FF'"
              onblur="document.getElementById('urlWrap').style.borderColor='rgba(255,255,255,0.12)'">
          </div>
          <button id="analyzeBtn" onclick="runAnalysis()" class="btn-primary" style="padding:12px 20px;border-radius:12px;font-size:14px;font-weight:800;display:flex;align-items:center;gap:8px;white-space:nowrap;flex-shrink:0;">
            <i class="fas fa-search"></i> <span>Run Premium Scan</span>
          </button>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:12px;">
          ${['SEO Audit','Branding Review','Growth Strategy','Revenue Projections','Content Pillars','Action Plan'].map(tag => `
          <span style="display:flex;align-items:center;gap:6px;font-size:12px;color:#9ca3af;">
            <i class="fas fa-check" style="color:#4ade80;font-size:10px;"></i>${tag}
          </span>`).join('')}
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div id="loadingState" style="display:none;text-align:center;padding:60px 0;">
      <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#00E5FF,#0070F3,#7C3AED);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;animation:spin 2s linear infinite;">
        <i class="fas fa-search" style="color:#fff;font-size:24px;animation:none;"></i>
      </div>
      <h3 style="font-size:20px;font-weight:800;color:#fff;margin:0 0 10px;">AI is Analyzing Your Website...</h3>
      <p style="font-size:14px;color:#9ca3af;margin-bottom:24px;">GPT-4o is scanning SEO, branding, usability, and growth opportunities</p>
      <div style="max-width:360px;margin:0 auto;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;font-size:13px;color:#9ca3af;">
          <div style="width:16px;height:16px;border-radius:50%;border:2px solid #00E5FF;border-top-color:transparent;animation:spin 0.8s linear infinite;flex-shrink:0;"></div>
          <span id="loadStep">Scanning site structure...</span>
        </div>
        <div style="background:rgba(255,255,255,0.06);border-radius:999px;height:6px;overflow:hidden;">
          <div id="loadProgress" class="progress-bar" style="background:linear-gradient(135deg,#00E5FF,#7C3AED);height:6px;border-radius:999px;width:0%;"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div id="errorState" style="display:none;background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.2);border-radius:16px;padding:20px;margin-bottom:20px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <i class="fas fa-exclamation-circle" style="color:#f87171;font-size:18px;"></i>
        <p id="errorMsg" style="font-size:14px;color:#f87171;margin:0;"></p>
      </div>
    </div>

    <!-- Results Section (hidden until scan runs) -->
    <div id="resultsSection" style="display:none;flex-direction:column;gap:20px;">

      <!-- Business Summary -->
      <div class="glass-dark" style="border-radius:18px;padding:22px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:20px;">
          <div>
            <h3 style="font-size:18px;font-weight:800;color:#fff;margin:0;">Analysis Results</h3>
            <p id="analyzedUrl" style="color:#00E5FF;font-size:13px;font-weight:600;margin:4px 0 0;"></p>
            <p id="websiteSummary" style="color:#9ca3af;font-size:13px;margin:6px 0 0;max-width:560px;line-height:1.5;"></p>
          </div>
          <div style="text-align:right;flex-shrink:0;">
            <div id="overallScore" style="font-size:44px;font-weight:900;background:linear-gradient(135deg,#00E5FF,#7C3AED,#FF2D78);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">--</div>
            <div style="font-size:13px;color:#9ca3af;">Overall Score</div>
          </div>
        </div>

        <!-- Score cards -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;" class="grid-3">
          ${[
            { id: 'seoScore', label: 'SEO Score', icon: 'fas fa-search', color: '#00E5FF', bg: 'rgba(0,229,255,0.1)' },
            { id: 'brandScore', label: 'Brand Score', icon: 'fas fa-star', color: '#A78BFA', bg: 'rgba(167,139,250,0.1)' },
            { id: 'usabilityScore', label: 'Usability', icon: 'fas fa-mouse-pointer', color: '#4ade80', bg: 'rgba(74,222,128,0.1)' },
          ].map(s => `
          <div style="background:rgba(255,255,255,0.04);border-radius:14px;padding:16px;text-align:center;">
            <div style="width:40px;height:40px;border-radius:12px;background:${s.bg};display:flex;align-items:center;justify-content:center;margin:0 auto 12px;">
              <i class="${s.icon}" style="color:${s.color};font-size:15px;"></i>
            </div>
            <div id="${s.id}" style="font-size:24px;font-weight:900;color:#fff;margin-bottom:4px;">--</div>
            <div style="font-size:12px;color:#9ca3af;margin-bottom:8px;">${s.label}</div>
            <div style="background:rgba(255,255,255,0.07);border-radius:999px;height:4px;overflow:hidden;">
              <div id="${s.id}Bar" class="progress-bar" style="background:${s.color};height:4px;border-radius:999px;width:0%;"></div>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Target Audience + Top Opportunity -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;" class="grid-2">
        <div class="glass-dark" style="border-radius:16px;padding:18px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <div style="width:34px;height:34px;border-radius:10px;background:rgba(96,165,250,0.12);display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-users" style="color:#60A5FA;font-size:14px;"></i>
            </div>
            <h4 style="font-size:14px;font-weight:800;color:#fff;margin:0;">Target Audience</h4>
          </div>
          <p id="targetAudience" style="font-size:13px;color:#d1d5db;line-height:1.6;margin:0;"></p>
        </div>
        <div class="glass-dark" style="border-radius:16px;padding:18px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <div style="width:34px;height:34px;border-radius:10px;background:rgba(251,191,36,0.12);display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-trophy" style="color:#fbbf24;font-size:14px;"></i>
            </div>
            <h4 style="font-size:14px;font-weight:800;color:#fff;margin:0;">Top Opportunity</h4>
          </div>
          <p id="topOpportunity" style="font-size:13px;color:#d1d5db;line-height:1.6;margin:0;"></p>
        </div>
      </div>

      <!-- Recommendations + Strategy -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;" class="grid-2">
        <div class="glass-dark" style="border-radius:18px;padding:22px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;">
            <div style="width:38px;height:38px;border-radius:12px;background:rgba(251,146,60,0.12);display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-lightbulb" style="color:#fb923c;font-size:16px;"></i>
            </div>
            <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0;">AI Recommendations</h3>
          </div>
          <div id="recommendationsList" style="display:flex;flex-direction:column;gap:10px;"></div>
        </div>

        <div class="glass-dark" style="border-radius:18px;padding:22px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;">
            <div style="width:38px;height:38px;border-radius:12px;background:rgba(74,222,128,0.12);display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-rocket" style="color:#4ade80;font-size:16px;"></i>
            </div>
            <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0;">Growth Strategy</h3>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:14px;">
              <div style="font-size:11px;color:#6b7280;text-transform:uppercase;font-weight:700;margin-bottom:6px;">💰 Pricing Model</div>
              <div id="pricingStrategy" style="font-size:13px;color:#fff;line-height:1.5;"></div>
            </div>
            <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:14px;">
              <div style="font-size:11px;color:#6b7280;text-transform:uppercase;font-weight:700;margin-bottom:6px;">📈 Revenue Outlook</div>
              <div id="revenueOutlook" style="font-size:13px;color:#fff;line-height:1.5;"></div>
            </div>
            <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:14px;">
              <div style="font-size:11px;color:#6b7280;text-transform:uppercase;font-weight:700;margin-bottom:8px;">🎯 Action Plan</div>
              <div id="actionPlan" style="display:flex;flex-direction:column;gap:6px;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Pillars -->
      <div class="glass-dark" style="border-radius:18px;padding:22px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;">
          <div style="width:38px;height:38px;border-radius:12px;background:rgba(124,58,237,0.12);display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-columns" style="color:#A78BFA;font-size:16px;"></i>
          </div>
          <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0;">Content Pillars</h3>
        </div>
        <div id="contentPillars" style="display:flex;flex-wrap:wrap;gap:10px;"></div>
      </div>

      <!-- Next Steps CTA -->
      <div style="background:linear-gradient(135deg,#00E5FF 0%,#0070F3 50%,#7C3AED 100%);border-radius:18px;padding:22px 28px;">
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;">
          <div>
            <h3 style="font-size:18px;font-weight:800;color:#fff;margin:0;">Ready to Act on These Insights?</h3>
            <p style="font-size:13px;color:rgba(255,255,255,0.8);margin:6px 0 0;">Let AI create a month of custom content based on your analysis.</p>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <a href="/content-studio" style="background:#fff;color:#0a0f1e;font-weight:800;padding:11px 20px;border-radius:12px;text-decoration:none;font-size:14px;display:flex;align-items:center;gap:6px;white-space:nowrap;transition:opacity 0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
              <i class="fas fa-wand-magic-sparkles"></i>Create Content
            </a>
            <a href="/scheduler" style="background:rgba(255,255,255,0.15);color:#fff;font-weight:700;padding:11px 20px;border-radius:12px;text-decoration:none;font-size:14px;border:1px solid rgba(255,255,255,0.3);display:flex;align-items:center;gap:6px;white-space:nowrap;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.22)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">
              <i class="fas fa-calendar"></i>Schedule Posts
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    let analysisRunning = false;

    function selectChip(btn) {
      document.querySelectorAll('.scan-chip').forEach(b => {
        b.style.borderColor = 'rgba(255,255,255,0.12)';
        b.style.background = 'rgba(255,255,255,0.04)';
        b.style.color = '#9ca3af';
      });
      btn.style.borderColor = 'rgba(0,229,255,0.5)';
      btn.style.background = 'rgba(0,229,255,0.12)';
      btn.style.color = '#00E5FF';
    }

    async function runAnalysis() {
      if (analysisRunning) return;
      const url = document.getElementById('urlInput').value.trim();
      if (!url) {
        document.getElementById('urlWrap').style.borderColor = '#f87171';
        document.getElementById('urlInput').placeholder = 'Please enter a URL first';
        setTimeout(() => {
          document.getElementById('urlWrap').style.borderColor = 'rgba(255,255,255,0.12)';
          document.getElementById('urlInput').placeholder = 'https://yourbusiness.com';
        }, 2000);
        return;
      }

      analysisRunning = true;
      document.getElementById('errorState').style.display = 'none';
      document.getElementById('resultsSection').style.display = 'none';

      const btn = document.getElementById('analyzeBtn');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';

      document.getElementById('loadingState').style.display = 'block';

      const steps = [
        'Scanning site structure...',
        'Analyzing SEO signals...',
        'Evaluating brand identity...',
        'Assessing usability...',
        'Generating growth strategy...',
        'Compiling AI recommendations...'
      ];
      let step = 0;
      const si = setInterval(() => {
        if (step < steps.length) {
          document.getElementById('loadStep').textContent = steps[step];
          document.getElementById('loadProgress').style.width = ((step + 1) / steps.length * 100) + '%';
          step++;
        }
      }, 600);

      try {
        const resp = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url })
        });
        const data = await resp.json();

        clearInterval(si);
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('loadProgress').style.width = '100%';

        if (!data.success) {
          document.getElementById('errorMsg').textContent = data.error || 'Analysis failed. Please try again.';
          document.getElementById('errorState').style.display = 'block';
          analysisRunning = false;
          btn.disabled = false;
          btn.innerHTML = '<i class="fas fa-search"></i> Run Premium Scan';
          return;
        }

        // Populate results
        document.getElementById('analyzedUrl').textContent = '📊 ' + url;
        document.getElementById('overallScore').textContent = data.overallScore + '/100';
        if (data.websiteSummary) document.getElementById('websiteSummary').textContent = data.websiteSummary;
        if (data.targetAudience) document.getElementById('targetAudience').textContent = data.targetAudience;
        if (data.topOpportunity) document.getElementById('topOpportunity').textContent = data.topOpportunity;

        [['seoScore', data.seoScore], ['brandScore', data.brandScore], ['usabilityScore', data.usabilityScore]].forEach(([id, val]) => {
          document.getElementById(id).textContent = val + '/100';
          setTimeout(() => { document.getElementById(id + 'Bar').style.width = val + '%'; }, 100);
        });

        const recList = document.getElementById('recommendationsList');
        recList.innerHTML = (data.recommendations || []).map((r, i) => \`
          <div style="display:flex;gap:10px;padding:10px 12px;background:rgba(255,255,255,0.04);border-radius:10px;">
            <div style="width:22px;height:22px;border-radius:50%;background:rgba(251,146,60,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:11px;font-weight:800;color:#fb923c;">\${i+1}</div>
            <p style="font-size:13px;color:#d1d5db;line-height:1.5;margin:0;">\${r}</p>
          </div>
        \`).join('');

        if (data.strategy) {
          document.getElementById('pricingStrategy').textContent = data.strategy.pricing || '';
          document.getElementById('revenueOutlook').textContent = data.strategy.revenue || '';
          document.getElementById('actionPlan').innerHTML = (data.strategy.actions || []).map(a => \`
            <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#d1d5db;">
              <i class="fas fa-arrow-right" style="color:#4ade80;font-size:11px;flex-shrink:0;"></i>\${a}
            </div>
          \`).join('');
        }

        if (data.contentPillars) {
          const colors = ['rgba(0,229,255,0.12)','rgba(167,139,250,0.12)','rgba(255,45,120,0.12)','rgba(74,222,128,0.12)'];
          const textColors = ['#00E5FF','#A78BFA','#FF2D78','#4ade80'];
          document.getElementById('contentPillars').innerHTML = data.contentPillars.map((p, i) => \`
            <div style="padding:10px 16px;border-radius:10px;background:\${colors[i%4]};border:1px solid \${textColors[i%4]}33;font-size:13px;font-weight:700;color:\${textColors[i%4]};">
              <i class="fas fa-hashtag" style="margin-right:6px;font-size:11px;"></i>\${p}
            </div>
          \`).join('');
        }

        document.getElementById('resultsSection').style.display = 'flex';
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });

        // ── Auto-save report data to localStorage for Content Studio auto-fill ──
        try {
          const existingProfile = JSON.parse(localStorage.getItem('ss_profile_v1') || '{}');
          const reportData = {
            ...existingProfile,
            // Business identity
            pBizName:    data.businessName || existingProfile.pBizName || '',
            pIndustry:   data.industry     || existingProfile.pIndustry || '',
            pUrl:        url,
            // Hashtag bank from analysis
            pBestHashtags: (data.socialMediaStrategy?.bestHashtags || []).join(' '),
            pBestPlatforms: data.socialMediaStrategy?.bestPlatforms || [],
            pContentPillars: data.contentPillars || [],
            pTargetAudience: (typeof data.targetAudience === 'object'
              ? data.targetAudience?.primary
              : data.targetAudience) || '',
            pLastAnalysis: new Date().toISOString(),
            pOverallScore: data.overallScore || 0,
          };
          localStorage.setItem('ss_profile_v1', JSON.stringify(reportData));
          localStorage.setItem('ss_last_report_v1', JSON.stringify(data));
        } catch(_) { /* non-fatal */ }

      } catch(e) {
        clearInterval(si);
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('errorMsg').textContent = 'Connection error. Please check your URL and try again.';
        document.getElementById('errorState').style.display = 'block';
      }

      analysisRunning = false;
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-search"></i> Run Premium Scan';
    }

    // Allow Enter key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && document.activeElement === document.getElementById('urlInput')) {
        runAnalysis();
      }
    });

    // ── Auto-fill URL & show credit limit from profile ─────────────────────
    (function initFromProfile() {
      try {
        const saved = JSON.parse(localStorage.getItem('ss_profile_v1') || '{}');
        const urlInput = document.getElementById('urlInput');
        if (urlInput && !urlInput.value) {
          // Pre-fill from URL query param OR profile
          const params = new URLSearchParams(window.location.search);
          const qUrl = params.get('url');
          if (qUrl) urlInput.value = qUrl;
          else if (saved.pUrl) urlInput.value = saved.pUrl;
        }

        // Show credit & report limit warning
        const email = saved.pEmail || 'demo@socialstrategy.ai';
        fetch('/api/account?email=' + encodeURIComponent(email)).then(r => r.json()).then((data) => {
          if (!data.success) return;
          // Inject credit pill into top bar
          const bar = document.querySelector('.top-bar > div:last-child');
          if (bar) {
            const pill = document.createElement('div');
            pill.style.cssText = 'display:flex;align-items:center;gap:7px;background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.2);border-radius:10px;padding:6px 12px;font-size:12px;';
            const reportsLeft = data.reportsMax === -1 ? '∞' : data.reportsRemaining;
            const credLeft = data.creditsRemaining || 0;
            pill.innerHTML = '<i class="fas fa-bolt" style="color:#fbbf24;"></i><span style="color:#fbbf24;font-weight:700;">' + credLeft.toLocaleString() + ' credits</span><span style="color:#4b5563;">·</span><span style="color:#d1d5db;">' + reportsLeft + ' reports left</span>';
            bar.prepend(pill);
          }

          // If no credits or reports left, disable scan button
          if ((data.creditsRemaining || 0) < 10 || (data.reportsRemaining === 0 && data.reportsMax !== -1)) {
            const btn = document.getElementById('analyzeBtn');
            if (btn) {
              btn.disabled = true;
              btn.style.background = 'rgba(255,255,255,0.05)';
              btn.style.color = '#6b7280';
              btn.style.boxShadow = 'none';
              btn.innerHTML = data.reportsRemaining === 0
                ? '<i class="fas fa-lock"></i> Report Limit Reached — Upgrade'
                : '<i class="fas fa-lock"></i> No Credits — Upgrade Plan';
            }
          }
        }).catch(() => {});
      } catch (_) {}
    })();
  </script>
  `
  return layout('Website Analysis', content, 'analysis')
}
