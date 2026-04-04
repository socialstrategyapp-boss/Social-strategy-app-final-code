import { layout } from './layout'

export function contentStudioPage(): string {
  const platforms = [
    { id: 'ig', name: 'Instagram', icon: 'fab fa-instagram', bg: 'linear-gradient(135deg,#E1306C,#F77737)', checked: true },
    { id: 'tk', name: 'TikTok', icon: 'fab fa-tiktok', bg: 'linear-gradient(135deg,#010101,#69C9D0)', checked: true },
    { id: 'fb', name: 'Facebook', icon: 'fab fa-facebook', bg: 'linear-gradient(135deg,#1877F2,#0d5fcc)', checked: true },
    { id: 'li', name: 'LinkedIn', icon: 'fab fa-linkedin', bg: 'linear-gradient(135deg,#0A66C2,#084c8f)', checked: true },
    { id: 'tw', name: 'X (Twitter)', icon: 'fab fa-twitter', bg: 'linear-gradient(135deg,#1DA1F2,#0d7abc)', checked: false },
    { id: 'yt', name: 'YouTube', icon: 'fab fa-youtube', bg: 'linear-gradient(135deg,#FF0000,#cc0000)', checked: false },
    { id: 'th', name: 'Threads', icon: 'fas fa-at', bg: 'linear-gradient(135deg,#111,#333)', checked: false },
    { id: 'pi', name: 'Pinterest', icon: 'fab fa-pinterest', bg: 'linear-gradient(135deg,#E60023,#ad081b)', checked: false },
  ]

  const platformIcons: Record<string, string> = {
    ig: 'fab fa-instagram', tk: 'fab fa-tiktok', fb: 'fab fa-facebook',
    li: 'fab fa-linkedin', tw: 'fab fa-twitter', yt: 'fab fa-youtube',
    th: 'fas fa-at', pi: 'fab fa-pinterest'
  }
  const platformBgs: Record<string, string> = {
    ig: 'linear-gradient(135deg,#E1306C,#F77737)',
    tk: 'linear-gradient(135deg,#010101,#69C9D0)',
    fb: 'linear-gradient(135deg,#1877F2,#0d5fcc)',
    li: 'linear-gradient(135deg,#0A66C2,#084c8f)',
    tw: 'linear-gradient(135deg,#1DA1F2,#0d7abc)',
    yt: 'linear-gradient(135deg,#FF0000,#cc0000)',
    th: 'linear-gradient(135deg,#111,#333)',
    pi: 'linear-gradient(135deg,#E60023,#ad081b)',
  }

  const content = `
  <!-- Top Bar -->
  <div class="top-bar">
    <div>
      <h1>AI Content Studio</h1>
      <p>Create branded content for all platforms in seconds</p>
    </div>
    <div style="display:flex;align-items:center;gap:10px;">
      <button onclick="showHistory()" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:8px 14px;color:#d1d5db;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:6px;" id="historyBtn">
        <i class="fas fa-history" style="color:#00E5FF;"></i> History
      </button>
      <button onclick="generateContent()" style="background:linear-gradient(135deg,#00E5FF,#0070F3,#7C3AED);color:#fff;font-size:13px;font-weight:800;padding:8px 16px;border-radius:10px;border:none;cursor:pointer;display:flex;align-items:center;gap:6px;">
        <i class="fas fa-wand-magic-sparkles"></i> Generate All
      </button>
    </div>
  </div>

  <div style="padding:24px 28px;">
    <div style="display:grid;grid-template-columns:290px 1fr;gap:20px;" class="grid-sidebar-content">

      <!-- LEFT: Controls -->
      <div style="display:flex;flex-direction:column;gap:16px;">

        <!-- Business Context -->
        <div class="glass-dark" style="border-radius:16px;padding:18px;">
          <h3 style="font-size:14px;font-weight:800;color:#fff;margin:0 0 14px;display:flex;align-items:center;gap:8px;">
            <i class="fas fa-building" style="color:#00E5FF;"></i> Business Context
          </h3>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div>
              <label style="font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">Brand Name</label>
              <input id="brandName" type="text" placeholder="Your brand name..." style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:9px 12px;color:#fff;font-size:13px;outline:none;box-sizing:border-box;" onfocus="this.style.borderColor='#00E5FF'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'">
            </div>
            <div>
              <label style="font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">Industry / Niche</label>
              <select id="industry" style="width:100%;background:rgba(10,15,30,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:9px 12px;color:#fff;font-size:13px;outline:none;box-sizing:border-box;">
                <option value="">Select your industry...</option>
                <option>SaaS / Technology</option>
                <option>E-commerce</option>
                <option>Fitness &amp; Wellness</option>
                <option>Food &amp; Restaurant</option>
                <option>Fashion &amp; Beauty</option>
                <option>Real Estate</option>
                <option>Finance</option>
                <option>Travel</option>
                <option>Education</option>
                <option>Healthcare</option>
                <option>Entertainment</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label style="font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">Tone of Voice</label>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">
                ${['Professional', 'Friendly', 'Playful', 'Bold', 'Inspiring', 'Informative'].map((t, i) => `
                <button onclick="selectTone(this,'${t}')" class="tone-btn" style="font-size:11px;padding:7px 4px;border-radius:8px;border:1px solid ${i===1?'rgba(0,229,255,0.6)':'rgba(255,255,255,0.12)'};background:${i===1?'rgba(0,229,255,0.12)':'transparent'};color:${i===1?'#00E5FF':'#9ca3af'};cursor:pointer;transition:all 0.2s;">${t}</button>`).join('')}
              </div>
            </div>
            <div>
              <label style="font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">Content Topic</label>
              <textarea id="contentTopic" rows="3" placeholder="e.g. Product launch, tips &amp; tricks, behind the scenes, promotion..." style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:9px 12px;color:#fff;font-size:13px;outline:none;resize:none;box-sizing:border-box;" onfocus="this.style.borderColor='#00E5FF'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'"></textarea>
            </div>
          </div>
        </div>

        <!-- Target Platforms -->
        <div class="glass-dark" style="border-radius:16px;padding:18px;">
          <h3 style="font-size:14px;font-weight:800;color:#fff;margin:0 0 12px;display:flex;align-items:center;gap:8px;">
            <i class="fas fa-share-alt" style="color:#A78BFA;"></i> Target Platforms
          </h3>
          <div style="display:flex;flex-direction:column;gap:4px;">
            ${platforms.map(p => `
            <label style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;cursor:pointer;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.04)'" onmouseout="this.style.background='transparent'">
              <input type="checkbox" id="plat_${p.id}" ${p.checked ? 'checked' : ''} style="width:15px;height:15px;accent-color:#00E5FF;cursor:pointer;flex-shrink:0;">
              <div style="width:26px;height:26px;border-radius:8px;background:${p.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="${p.icon}" style="color:#fff;font-size:12px;"></i>
              </div>
              <span style="font-size:13px;color:#d1d5db;">${p.name}</span>
            </label>`).join('')}
          </div>
        </div>

        <!-- Generate Button -->
        <button onclick="generateContent()" style="background:linear-gradient(135deg,#00E5FF,#0070F3,#7C3AED);color:#fff;font-size:15px;font-weight:800;padding:14px;border-radius:14px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;width:100%;box-shadow:0 6px 20px rgba(0,229,255,0.2);transition:opacity 0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
          <i class="fas fa-wand-magic-sparkles"></i>
          Generate Content
        </button>
      </div>

      <!-- RIGHT: Content Cards -->
      <div style="display:flex;flex-direction:column;gap:16px;">

        <!-- Status Bar -->
        <div id="generateStatus" class="glass-dark" style="border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:12px;">
          <div style="width:34px;height:34px;border-radius:50%;background:rgba(0,229,255,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <i class="fas fa-wand-magic-sparkles" style="color:#00E5FF;font-size:14px;"></i>
          </div>
          <div style="flex:1;">
            <div style="font-size:14px;font-weight:700;color:#fff;">Ready to generate</div>
            <div style="font-size:12px;color:#9ca3af;margin-top:2px;">Fill in your details and click Generate Content</div>
          </div>
        </div>

        <!-- History Panel (hidden) -->
        <div id="historyPanel" class="glass-dark" style="display:none;border-radius:14px;padding:16px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <h4 style="font-size:14px;font-weight:800;color:#fff;margin:0;"><i class="fas fa-history" style="color:#00E5FF;margin-right:8px;"></i>Generation History</h4>
            <button onclick="showHistory()" style="background:transparent;border:none;color:#9ca3af;cursor:pointer;font-size:13px;">✕ Close</button>
          </div>
          <div id="historyList" style="display:flex;flex-direction:column;gap:8px;max-height:200px;overflow-y:auto;">
            <div style="text-align:center;padding:20px;color:#6b7280;font-size:13px;">No history yet. Generate content to see it here.</div>
          </div>
        </div>

        <!-- Content Cards Area -->
        <div id="contentCards" style="display:flex;flex-direction:column;gap:14px;">
          <!-- Empty state -->
          <div id="emptyState" style="background:rgba(255,255,255,0.02);border:1.5px dashed rgba(255,255,255,0.1);border-radius:18px;padding:60px 20px;text-align:center;">
            <div style="width:64px;height:64px;border-radius:20px;background:rgba(0,229,255,0.08);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
              <i class="fas fa-wand-magic-sparkles" style="color:#00E5FF;font-size:26px;"></i>
            </div>
            <h3 style="font-size:18px;font-weight:800;color:#fff;margin:0 0 8px;">Your AI Content Will Appear Here</h3>
            <p style="font-size:14px;color:#6b7280;margin:0 0 20px;max-width:340px;margin-left:auto;margin-right:auto;">Fill in your brand details, select platforms, and hit Generate Content to create custom posts instantly.</p>
            <button onclick="generateContent()" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:14px;font-weight:800;padding:12px 24px;border-radius:12px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:8px;">
              <i class="fas fa-wand-magic-sparkles"></i> Generate Now
            </button>
          </div>
        </div>

        <!-- Image Generation Card -->
        <div style="background:rgba(124,58,237,0.05);border:1px solid rgba(124,58,237,0.2);border-radius:16px;padding:20px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
            <div style="width:38px;height:38px;border-radius:12px;background:rgba(124,58,237,0.15);display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-image" style="color:#A78BFA;font-size:16px;"></i>
            </div>
            <div>
              <h3 style="font-size:15px;font-weight:800;color:#fff;margin:0;">AI Image Generation</h3>
              <p style="font-size:12px;color:#9ca3af;margin:3px 0 0;">Custom branded visuals for your posts</p>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px;">
            ${['Product Hero', 'Team Photo', 'Abstract Art'].map(img => `
            <div style="aspect-ratio:1;border-radius:12px;background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.2);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='rgba(124,58,237,0.18)'" onmouseout="this.style.background='rgba(124,58,237,0.08)'">
              <i class="fas fa-image" style="color:rgba(167,139,250,0.5);font-size:22px;margin-bottom:6px;"></i>
              <span style="font-size:11px;color:#A78BFA;font-weight:600;">${img}</span>
            </div>`).join('')}
          </div>
          <button style="width:100%;border:1px solid rgba(124,58,237,0.35);color:#A78BFA;background:transparent;border-radius:12px;padding:11px;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background 0.2s;" onmouseover="this.style.background='rgba(124,58,237,0.1)'" onmouseout="this.style.background='transparent'">
            <i class="fas fa-sparkles"></i>
            Generate Custom Image (uses 1 credit)
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

    function selectTone(btn, tone) {
      document.querySelectorAll('.tone-btn').forEach(b => {
        b.style.borderColor = 'rgba(255,255,255,0.12)';
        b.style.background = 'transparent';
        b.style.color = '#9ca3af';
      });
      btn.style.borderColor = 'rgba(0,229,255,0.6)';
      btn.style.background = 'rgba(0,229,255,0.12)';
      btn.style.color = '#00E5FF';
    }

    function getSelectedTone() {
      const active = document.querySelector('.tone-btn[style*="00E5FF"]');
      return active ? active.textContent.trim() : 'Friendly';
    }

    function showHistory() {
      historyVisible = !historyVisible;
      document.getElementById('historyPanel').style.display = historyVisible ? 'block' : 'none';
    }

    function copyContent(btn) {
      const card = btn.closest('.content-card');
      const pre = card.querySelector('pre');
      if (pre) {
        navigator.clipboard.writeText(pre.textContent || '').then(() => {
          btn.innerHTML = '<i class="fas fa-check" style="color:#4ade80;"></i>';
          setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i>'; }, 2000);
        });
      }
    }

    function schedulePost(btn) {
      btn.textContent = 'Scheduled ✓';
      btn.style.background = 'rgba(74,222,128,0.12)';
      btn.style.color = '#4ade80';
      btn.style.border = '1px solid rgba(74,222,128,0.3)';
      btn.style.padding = '5px 12px';
    }

    function scheduleAll() {
      document.querySelectorAll('.schedule-btn').forEach(btn => schedulePost(btn));
      document.getElementById('generateStatus').innerHTML = \`
        <div style="width:34px;height:34px;border-radius:50%;background:rgba(74,222,128,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-calendar-check" style="color:#4ade80;font-size:14px;"></i>
        </div>
        <div style="flex:1;">
          <div style="font-size:14px;font-weight:700;color:#fff;">All posts scheduled!</div>
          <div style="font-size:12px;color:#9ca3af;margin-top:2px;">Posts added to your queue</div>
        </div>
        <a href="/scheduler" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:12px;font-weight:800;padding:7px 14px;border-radius:8px;text-decoration:none;flex-shrink:0;">View Schedule →</a>
      \`;
    }

    function copyAll() {
      const posts = document.querySelectorAll('.content-card pre');
      const allText = Array.from(posts).map(p => p.textContent).join('\\n\\n---\\n\\n');
      navigator.clipboard.writeText(allText).then(() => {
        const btn = document.getElementById('copyAllBtn');
        if (btn) { btn.textContent = '✓ Copied!'; setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i> Copy All'; }, 2000); }
      });
    }

    async function generateContent() {
      const brandName = document.getElementById('brandName').value.trim();
      const industry = document.getElementById('industry').value;
      const tone = getSelectedTone();
      const topic = document.getElementById('contentTopic').value.trim();

      if (!brandName) {
        document.getElementById('brandName').style.borderColor = '#f87171';
        document.getElementById('brandName').placeholder = 'Brand name is required';
        setTimeout(() => {
          document.getElementById('brandName').style.borderColor = 'rgba(255,255,255,0.1)';
          document.getElementById('brandName').placeholder = 'Your brand name...';
        }, 2000);
        return;
      }
      if (!topic) {
        document.getElementById('contentTopic').style.borderColor = '#f87171';
        document.getElementById('contentTopic').placeholder = 'Content topic is required';
        setTimeout(() => {
          document.getElementById('contentTopic').style.borderColor = 'rgba(255,255,255,0.1)';
          document.getElementById('contentTopic').placeholder = 'e.g. Product launch, tips & tricks...';
        }, 2000);
        return;
      }

      const selectedPlatforms = ['ig','tk','fb','li','tw','yt','th','pi']
        .filter(id => document.getElementById('plat_' + id)?.checked)
        .map(id => ({ ig:'Instagram',tk:'TikTok',fb:'Facebook',li:'LinkedIn',tw:'X (Twitter)',yt:'YouTube',th:'Threads',pi:'Pinterest' })[id]);

      if (selectedPlatforms.length === 0) {
        alert('Please select at least one platform.');
        return;
      }

      // Show loading
      const status = document.getElementById('generateStatus');
      status.innerHTML = \`
        <div style="width:34px;height:34px;border-radius:50%;background:rgba(0,229,255,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-spinner fa-spin" style="color:#00E5FF;font-size:14px;"></i>
        </div>
        <div>
          <div style="font-size:14px;font-weight:700;color:#fff;">AI is creating your content...</div>
          <div style="font-size:12px;color:#9ca3af;margin-top:2px;">Writing custom posts for \${selectedPlatforms.length} platforms</div>
        </div>
      \`;

      document.getElementById('emptyState')?.remove();

      try {
        const resp = await fetch('/api/generate-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brandName, industry, tone, topic, platforms: selectedPlatforms })
        });
        const data = await resp.json();

        if (!data.success || !data.posts) {
          status.innerHTML = \`
            <div style="width:34px;height:34px;border-radius:50%;background:rgba(248,113,113,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="fas fa-exclamation-circle" style="color:#f87171;font-size:14px;"></i>
            </div>
            <div style="font-size:14px;font-weight:700;color:#f87171;">\${data.error || 'Generation failed. Try again.'}</div>
          \`;
          return;
        }

        // Add to history
        const timestamp = new Date().toLocaleTimeString();
        generationHistory.unshift({ brandName, topic, count: data.posts.length, timestamp });
        const histList = document.getElementById('historyList');
        if (histList) {
          histList.innerHTML = generationHistory.slice(0, 10).map(h => \`
            <div style="padding:10px 12px;background:rgba(255,255,255,0.03);border-radius:8px;font-size:12px;color:#d1d5db;display:flex;justify-content:space-between;align-items:center;">
              <span><strong style="color:#fff;">\${h.brandName}</strong> — \${h.topic.substring(0,30)}...</span>
              <span style="color:#6b7280;">\${h.count} posts · \${h.timestamp}</span>
            </div>
          \`).join('');
        }

        // Render cards
        const cardsContainer = document.getElementById('contentCards');
        cardsContainer.innerHTML = data.posts.map((post, i) => {
          const pidMap = {'Instagram':'ig','TikTok':'tk','Facebook':'fb','LinkedIn':'li','X (Twitter)':'tw','YouTube':'yt','Threads':'th','Pinterest':'pi'};
          const pid = pidMap[post.platform] || 'ig';
          const bg = platformBgs[pid] || 'linear-gradient(135deg,#333,#555)';
          const icon = platformIcons[pid] || 'fas fa-share';
          return \`
          <div class="content-card" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;transition:border-color 0.2s;" onmouseover="this.style.borderColor='rgba(255,255,255,0.16)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)'">
            <div style="background:rgba(255,255,255,0.04);padding:12px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.06);">
              <div style="display:flex;align-items:center;gap:10px;">
                <div style="width:32px;height:32px;border-radius:10px;background:\${bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                  <i class="\${icon}" style="color:#fff;font-size:14px;"></i>
                </div>
                <div>
                  <span style="font-size:13px;font-weight:700;color:#fff;">\${post.platform}</span>
                  <span style="font-size:12px;color:#6b7280;margin-left:6px;">· \${post.type || 'Post'}</span>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                \${post.tip ? \`<span title="\${post.tip}" style="font-size:12px;color:#A78BFA;cursor:help;"><i class="fas fa-lightbulb"></i></span>\` : ''}
                <button class="copy-btn" onclick="copyContent(this)" style="background:transparent;border:none;cursor:pointer;padding:6px 8px;border-radius:8px;color:#9ca3af;font-size:12px;transition:color 0.2s;" title="Copy" onmouseover="this.style.background='rgba(255,255,255,0.06)'" onmouseout="this.style.background='transparent'">
                  <i class="fas fa-copy"></i>
                </button>
                <button class="schedule-btn" onclick="schedulePost(this)" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:12px;font-weight:800;padding:5px 12px;border-radius:8px;border:none;cursor:pointer;">
                  Schedule
                </button>
              </div>
            </div>
            <div style="padding:16px;">
              <pre style="color:#d1d5db;font-size:13px;line-height:1.7;white-space:pre-wrap;font-family:inherit;margin:0;">\${post.content}</pre>
            </div>
          </div>\`;
        }).join('');

        // Update status
        status.innerHTML = \`
          <div style="width:34px;height:34px;border-radius:50%;background:rgba(74,222,128,0.12);display:flex;align-items:center;justify-content:justify-center;flex-shrink:0;">
            <i class="fas fa-check" style="color:#4ade80;font-size:14px;"></i>
          </div>
          <div style="flex:1;">
            <div style="font-size:14px;font-weight:700;color:#fff;">\${data.posts.length} content pieces generated!</div>
            <div style="font-size:12px;color:#9ca3af;margin-top:2px;">Customized for \${selectedPlatforms.join(', ')}</div>
          </div>
          <div style="display:flex;gap:8px;flex-shrink:0;">
            <button id="copyAllBtn" onclick="copyAll()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:6px 12px;color:#d1d5db;font-size:12px;cursor:pointer;display:flex;align-items:center;gap:5px;">
              <i class="fas fa-copy"></i> Copy All
            </button>
            <button onclick="scheduleAll()" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:12px;font-weight:800;padding:6px 12px;border-radius:8px;border:none;cursor:pointer;">
              <i class="fas fa-calendar"></i> Schedule All
            </button>
          </div>
        \`;

      } catch(e) {
        status.innerHTML = \`
          <div style="width:34px;height:34px;border-radius:50%;background:rgba(248,113,113,0.1);display:flex;align-items:center;justify-content:justify-center;flex-shrink:0;">
            <i class="fas fa-exclamation-circle" style="color:#f87171;font-size:14px;"></i>
          </div>
          <div style="font-size:14px;font-weight:700;color:#f87171;">Connection error. Please try again.</div>
        \`;
      }
    }
  </script>
  `
  return layout('AI Content Studio', content, 'content-studio')
}
