import { layout } from './layout'

export function contentStudioPage(): string {
  const platforms = [
    { id: 'ig', name: 'Instagram', icon: 'fab fa-instagram', bg: 'linear-gradient(135deg,#E1306C,#F77737)', checked: true },
    { id: 'tk', name: 'TikTok', icon: 'fab fa-tiktok', bg: 'linear-gradient(135deg,#010101,#69C9D0)', checked: true },
    { id: 'fb', name: 'Facebook', icon: 'fab fa-facebook', bg: 'linear-gradient(135deg,#1877F2,#0d5fcc)', checked: true },
    { id: 'li', name: 'LinkedIn', icon: 'fab fa-linkedin', bg: 'linear-gradient(135deg,#0A66C2,#084c8f)', checked: true },
    { id: 'tw', name: 'X (Twitter)', icon: 'fab fa-twitter', bg: 'linear-gradient(135deg,#1DA1F2,#0d7abc)', checked: false },
    { id: 'yt', name: 'YouTube', icon: 'fab fa-youtube', bg: 'linear-gradient(135deg,#FF0000,#cc0000)', checked: false },
  ]
  const contentCards = [
    {
      platform: 'Instagram', icon: 'fab fa-instagram', bg: 'linear-gradient(135deg,#E1306C,#F77737)',
      type: 'Caption + Image', reach: '12.4K followers',
      content: `🚀 Introducing TechFlow Studio — The AI-powered project management tool that thinks like you do.\n\nNo more missed deadlines. No more chaotic workflows. Just pure, automated efficiency.\n\n✅ Smart task prioritization\n✅ AI deadline predictions\n✅ Auto-team assignments\n✅ Real-time progress tracking\n\nTry it FREE for 30 days 👇\n\n#ProductivityTools #AITech #ProjectManagement #SaaS #WorkSmarter #TechFlow #Startup #Innovation`
    },
    {
      platform: 'LinkedIn', icon: 'fab fa-linkedin', bg: 'linear-gradient(135deg,#0A66C2,#084c8f)',
      type: 'Professional Post', reach: '4.2K connections',
      content: `After 2 years of building, we're finally launching TechFlow Studio.\n\nHere's what we learned about project management:\n\n→ 68% of projects fail due to poor communication\n→ Teams spend 3.7 hours/day on status updates alone\n→ Deadline misses cost companies an avg. of $97K per project\n\nTechFlow's AI solves all three automatically.\n\nComment "FLOW" to get early access. 🔥`
    },
    {
      platform: 'TikTok', icon: 'fab fa-tiktok', bg: 'linear-gradient(135deg,#010101,#69C9D0)',
      type: 'Video Script (60s)', reach: '34.5K followers',
      content: `🎬 HOOK (0-3s): "What if your AI could manage your entire team?"\n\n📽 SCENE 1 (3-15s): Chaotic project board → organized AI dashboard\n\n📽 SCENE 2 (15-35s): "Meet TechFlow — it predicts problems BEFORE they happen"\n\n📽 SCENE 3 (35-50s): Stressed manager vs calm TechFlow user\n\n🎯 CTA (50-60s): "Link in bio for 30-day free trial"\n\n#TechTok #AItools #ProductivityHack`
    },
    {
      platform: 'Facebook', icon: 'fab fa-facebook', bg: 'linear-gradient(135deg,#1877F2,#0d5fcc)',
      type: 'Engagement Post', reach: '8.2K followers',
      content: `📊 Quick poll for business owners:\n\nWhat's your BIGGEST project management challenge?\n\nA) Keeping track of deadlines 📅\nB) Team communication 💬\nC) Resource allocation 🎯\nD) Reporting & updates 📈\n\nDrop your answer! Everyone who comments gets early access to our beta + founding member discount 🎁`
    },
  ]

  const content = `
  <!-- Top Bar -->
  <div style="position:sticky;top:0;z-index:30;background:rgba(3,8,24,0.85);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.07);padding:14px 28px;display:flex;align-items:center;justify-content:space-between;">
    <div>
      <h1 style="font-size:20px;font-weight:800;color:#fff;margin:0;">AI Content Studio</h1>
      <p style="color:#9ca3af;font-size:13px;margin:2px 0 0;">Create branded content for all platforms in seconds</p>
    </div>
    <div style="display:flex;align-items:center;gap:10px;">
      <button style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:8px 14px;color:#d1d5db;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:6px;">
        <i class="fas fa-history" style="color:#00E5FF;"></i> History
      </button>
      <button onclick="generateContent()" style="background:linear-gradient(135deg,#00E5FF,#0070F3,#7C3AED);color:#fff;font-size:13px;font-weight:800;padding:8px 16px;border-radius:10px;border:none;cursor:pointer;display:flex;align-items:center;gap:6px;">
        <i class="fas fa-wand-magic-sparkles"></i> Generate All
      </button>
    </div>
  </div>

  <div style="padding:28px;">
    <div style="display:grid;grid-template-columns:280px 1fr;gap:20px;">

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
              <input id="brandName" type="text" value="TechFlow Studio" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:8px 12px;color:#fff;font-size:13px;outline:none;box-sizing:border-box;" onfocus="this.style.borderColor='#00E5FF'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'">
            </div>
            <div>
              <label style="font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">Industry / Niche</label>
              <select id="industry" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:8px 12px;color:#fff;font-size:13px;outline:none;box-sizing:border-box;appearance:none;">
                <option style="background:#0a0f1e;">SaaS / Technology</option>
                <option style="background:#0a0f1e;">E-commerce</option>
                <option style="background:#0a0f1e;">Fitness &amp; Wellness</option>
                <option style="background:#0a0f1e;">Food &amp; Restaurant</option>
                <option style="background:#0a0f1e;">Fashion &amp; Beauty</option>
                <option style="background:#0a0f1e;">Real Estate</option>
                <option style="background:#0a0f1e;">Finance</option>
                <option style="background:#0a0f1e;">Travel</option>
              </select>
            </div>
            <div>
              <label style="font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">Tone of Voice</label>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">
                ${['Professional', 'Friendly', 'Playful', 'Bold', 'Inspiring', 'Informative'].map((t, i) => `
                <button onclick="selectTone(this,'${t}')" class="tone-btn" style="font-size:11px;padding:7px 4px;border-radius:8px;border:1px solid ${i === 1 ? 'rgba(0,229,255,0.6)' : 'rgba(255,255,255,0.12)'};background:${i === 1 ? 'rgba(0,229,255,0.12)' : 'transparent'};color:${i === 1 ? '#00E5FF' : '#9ca3af'};cursor:pointer;transition:all 0.2s;">${t}</button>`).join('')}
              </div>
            </div>
            <div>
              <label style="font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">Content Topic</label>
              <textarea id="contentTopic" rows="3" placeholder="e.g. Product launch, tips &amp; tricks, behind the scenes..." style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:8px 12px;color:#fff;font-size:13px;outline:none;resize:none;box-sizing:border-box;" onfocus="this.style.borderColor='#00E5FF'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'">New product launch — AI-powered project management tool</textarea>
            </div>
          </div>
        </div>

        <!-- Target Platforms -->
        <div class="glass-dark" style="border-radius:16px;padding:18px;">
          <h3 style="font-size:14px;font-weight:800;color:#fff;margin:0 0 12px;display:flex;align-items:center;gap:8px;">
            <i class="fas fa-share-alt" style="color:#A78BFA;"></i> Target Platforms
          </h3>
          <div style="display:flex;flex-direction:column;gap:6px;">
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
          <div style="width:34px;height:34px;border-radius:50%;background:rgba(74,222,128,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <i class="fas fa-check" style="color:#4ade80;font-size:14px;"></i>
          </div>
          <div style="flex:1;">
            <div style="font-size:14px;font-weight:700;color:#fff;">4 content pieces ready</div>
            <div style="font-size:12px;color:#9ca3af;margin-top:2px;">Generated for Instagram, TikTok, Facebook, LinkedIn</div>
          </div>
          <div style="display:flex;gap:8px;flex-shrink:0;">
            <button style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:6px 12px;color:#d1d5db;font-size:12px;cursor:pointer;display:flex;align-items:center;gap:5px;">
              <i class="fas fa-copy"></i> Copy All
            </button>
            <button onclick="scheduleAll()" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:12px;font-weight:800;padding:6px 12px;border-radius:8px;border:none;cursor:pointer;display:flex;align-items:center;gap:5px;">
              <i class="fas fa-calendar"></i> Schedule All
            </button>
          </div>
        </div>

        <!-- Content Cards -->
        <div id="contentCards" style="display:flex;flex-direction:column;gap:14px;">
          ${contentCards.map(c => `
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;transition:border-color 0.2s;" onmouseover="this.style.borderColor='rgba(255,255,255,0.16)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)'">
            <div style="background:rgba(255,255,255,0.04);padding:12px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.06);">
              <div style="display:flex;align-items:center;gap:10px;">
                <div style="width:32px;height:32px;border-radius:10px;background:${c.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                  <i class="${c.icon}" style="color:#fff;font-size:14px;"></i>
                </div>
                <div>
                  <span style="font-size:13px;font-weight:700;color:#fff;">${c.platform}</span>
                  <span style="font-size:12px;color:#6b7280;margin-left:6px;">· ${c.type}</span>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:12px;color:#6b7280;">${c.reach}</span>
                <button class="copy-btn" onclick="copyContent(this)" style="background:transparent;border:none;cursor:pointer;padding:6px 8px;border-radius:8px;color:#9ca3af;font-size:12px;transition:color 0.2s;" title="Copy" onmouseover="this.style.background='rgba(255,255,255,0.06)'" onmouseout="this.style.background='transparent'">
                  <i class="fas fa-copy"></i>
                </button>
                <button class="schedule-btn" onclick="schedulePost(this)" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:12px;font-weight:800;padding:5px 12px;border-radius:8px;border:none;cursor:pointer;">
                  Schedule
                </button>
              </div>
            </div>
            <div style="padding:16px;">
              <pre style="color:#d1d5db;font-size:13px;line-height:1.7;white-space:pre-wrap;font-family:inherit;margin:0;">${c.content}</pre>
            </div>
          </div>`).join('')}
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
            ${[
              { label: 'Product Hero', gradient: 'linear-gradient(135deg,#0a2040,#0d4080)' },
              { label: 'Team Photo', gradient: 'linear-gradient(135deg,#1a0a40,#2d1080)' },
              { label: 'Abstract Art', gradient: 'linear-gradient(135deg,#0a1830,#0a2848)' },
            ].map(img => `
            <div style="position:relative;cursor:pointer;" onmouseover="this.querySelector('.img-overlay').style.opacity='1'" onmouseout="this.querySelector('.img-overlay').style.opacity='0'">
              <div style="aspect-ratio:1;border-radius:12px;background:${img.gradient};display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.08);">
                <i class="fas fa-image" style="color:rgba(255,255,255,0.2);font-size:24px;margin-bottom:6px;"></i>
                <span style="font-size:11px;color:rgba(255,255,255,0.3);">${img.label}</span>
              </div>
              <div class="img-overlay" style="position:absolute;inset:0;background:rgba(124,58,237,0.4);opacity:0;border-radius:12px;transition:opacity 0.2s;display:flex;align-items:center;justify-content:center;">
                <button style="background:#7C3AED;color:#fff;font-size:12px;font-weight:700;padding:6px 14px;border-radius:8px;border:none;cursor:pointer;">Generate</button>
              </div>
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
    function copyContent(btn) {
      const pre = btn.closest('div[style*="border-radius:16px"]').querySelector('pre');
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
    }
    function scheduleAll() {
      document.querySelectorAll('.schedule-btn').forEach(btn => schedulePost(btn));
      document.getElementById('generateStatus').innerHTML = \`
        <div style="width:34px;height:34px;border-radius:50%;background:rgba(74,222,128,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-calendar-check" style="color:#4ade80;font-size:14px;"></i>
        </div>
        <div style="flex:1;">
          <div style="font-size:14px;font-weight:700;color:#fff;">All posts scheduled!</div>
          <div style="font-size:12px;color:#9ca3af;margin-top:2px;">4 posts added to your queue</div>
        </div>
        <a href="/scheduler" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:12px;font-weight:800;padding:7px 14px;border-radius:8px;text-decoration:none;flex-shrink:0;">View Schedule →</a>
      \`;
    }
    function generateContent() {
      const status = document.getElementById('generateStatus');
      status.innerHTML = \`
        <div style="width:34px;height:34px;border-radius:50%;background:rgba(0,229,255,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-spinner fa-spin" style="color:#00E5FF;font-size:14px;"></i>
        </div>
        <div>
          <div style="font-size:14px;font-weight:700;color:#fff;">AI is generating your content...</div>
          <div style="font-size:12px;color:#9ca3af;margin-top:2px;">Creating custom posts for your brand</div>
        </div>
      \`;
      document.getElementById('contentCards').style.opacity = '0.4';
      setTimeout(() => {
        document.getElementById('contentCards').style.opacity = '1';
        status.innerHTML = \`
          <div style="width:34px;height:34px;border-radius:50%;background:rgba(74,222,128,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <i class="fas fa-check" style="color:#4ade80;font-size:14px;"></i>
          </div>
          <div style="flex:1;">
            <div style="font-size:14px;font-weight:700;color:#fff;">4 new content pieces generated!</div>
            <div style="font-size:12px;color:#9ca3af;margin-top:2px;">Customized for Instagram, TikTok, Facebook, LinkedIn</div>
          </div>
          <div style="display:flex;gap:8px;flex-shrink:0;">
            <button style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:6px 12px;color:#d1d5db;font-size:12px;cursor:pointer;">
              <i class="fas fa-copy"></i> Copy All
            </button>
            <button onclick="scheduleAll()" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:12px;font-weight:800;padding:6px 12px;border-radius:8px;border:none;cursor:pointer;">
              <i class="fas fa-calendar"></i> Schedule All
            </button>
          </div>
        \`;
      }, 2500);
    }
  </script>
  `
  return layout('AI Content Studio', content, 'content-studio')
}
