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
                <option>Retail &amp; E-commerce</option>
                <option>Food &amp; Beverage / Restaurant</option>
                <option>Health, Beauty &amp; Wellness</option>
                <option>Professional Services</option>
                <option>Real Estate</option>
                <option>Trades &amp; Home Services</option>
                <option>Education &amp; Coaching</option>
                <option>Hospitality &amp; Accommodation</option>
                <option>Technology / SaaS</option>
                <option>Fashion &amp; Apparel</option>
                <option>Automotive</option>
                <option>Healthcare &amp; Medical</option>
                <option>Agriculture &amp; Rural</option>
                <option>Financial Services</option>
                <option>Entertainment &amp; Media</option>
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

        <!-- Topic Ideas Collapsible -->
        <div class="glass-dark" style="border-radius:16px;padding:16px;">
          <button onclick="toggleTopicIdeas()" style="width:100%;background:transparent;border:none;color:#fff;font-size:14px;font-weight:800;text-align:left;cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:0;">
            <span><i class="fas fa-lightbulb" style="color:#fbbf24;margin-right:8px;"></i>Topic Ideas</span>
            <i class="fas fa-chevron-down" id="topicIdeasChevron" style="color:#9ca3af;font-size:12px;transition:transform 0.2s;"></i>
          </button>
          <div id="topicIdeasBox" style="display:none;margin-top:12px;">
            <div style="display:flex;flex-direction:column;gap:6px;" id="topicIdeasList">
              ${['Behind the scenes look at how we work', 'Top 5 tips for success in [industry]', 'Client success story spotlight', 'Product/service launch announcement', 'How-to tutorial or quick win tip', 'Trending industry news reaction', 'Team introduction & culture post', 'Limited time offer or promotion', 'FAQ: Most common questions answered', 'Before &amp; after transformation'].map(idea => `
              <div onclick="useTopicIdea(this)" style="padding:8px 10px;border-radius:8px;font-size:12px;color:#d1d5db;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='rgba(0,229,255,0.07)';this.style.borderColor='rgba(0,229,255,0.2)';this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,0.03)';this.style.borderColor='rgba(255,255,255,0.06)';this.style.color='#d1d5db'">
                <i class="fas fa-plus" style="color:#00E5FF;font-size:10px;margin-right:6px;"></i>${idea}
              </div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Video Script Button -->
        <button onclick="openVideoScriptModal()" style="background:rgba(255,45,120,0.08);border:1px solid rgba(255,45,120,0.3);color:#FF2D78;font-size:13px;font-weight:700;padding:11px;border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;width:100%;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,45,120,0.15)'" onmouseout="this.style.background='rgba(255,45,120,0.08)'">
          <i class="fas fa-video"></i> Generate Video Script
        </button>

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
            ${['Product Hero', 'Team Photo', 'Abstract Art'].map((img, idx) => `
            <div onclick="generateImagePreset('${img}',${idx})" style="aspect-ratio:1;border-radius:12px;background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.2);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;" id="imgPreset${idx}" onmouseover="this.style.background='rgba(124,58,237,0.18)'" onmouseout="this.style.background='rgba(124,58,237,0.08)'">\n              <i class="fas fa-image" style="color:rgba(167,139,250,0.5);font-size:22px;margin-bottom:6px;"></i>\n              <span style="font-size:11px;color:#A78BFA;font-weight:600;">${img}</span>
            </div>`).join('')}
          </div>
          <div style="margin-bottom:10px;">
            <input id="customImagePrompt" type="text" placeholder="Or enter a custom image prompt..." style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(124,58,237,0.2);border-radius:10px;padding:9px 12px;color:#fff;font-size:13px;outline:none;box-sizing:border-box;" onfocus="this.style.borderColor='#A78BFA'" onblur="this.style.borderColor='rgba(124,58,237,0.2)'">
          </div>
          <button onclick="generateCustomImage()" style="width:100%;border:1px solid rgba(124,58,237,0.35);color:#A78BFA;background:transparent;border-radius:12px;padding:11px;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background 0.2s;" id="genImgBtn" onmouseover="this.style.background='rgba(124,58,237,0.1)'" onmouseout="this.style.background='transparent'">
            <i class="fas fa-sparkles"></i>
            Generate Custom Image (1 credit)
          </button>
          <div id="generatedImageResult" style="display:none;margin-top:12px;"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Video Script Modal -->
  <div id="videoScriptModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:1000;align-items:center;justify-content:center;padding:20px;">
    <div style="max-width:560px;width:100%;background:#0d1117;border:1px solid rgba(255,45,120,0.25);border-radius:20px;overflow:hidden;">
      <div style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:space-between;">
        <div>
          <h3 style="font-size:18px;font-weight:800;color:#fff;margin:0;"><i class="fas fa-video" style="color:#FF2D78;margin-right:10px;"></i>Video Script Generator</h3>
          <p style="font-size:13px;color:#6b7280;margin:4px 0 0;">Create a full script with hooks, scenes, and captions</p>
        </div>
        <button onclick="closeVideoScriptModal()" style="background:rgba(255,255,255,0.08);border:none;color:#9ca3af;width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:16px;">✕</button>
      </div>
      <div style="padding:24px;display:flex;flex-direction:column;gap:14px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">Brand Name</label>
            <input id="vsModalBrand" type="text" placeholder="Your brand" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:9px 12px;color:#fff;font-size:13px;outline:none;box-sizing:border-box;">
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">Industry</label>
            <input id="vsModalIndustry" type="text" placeholder="Your industry" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:9px 12px;color:#fff;font-size:13px;outline:none;box-sizing:border-box;">
          </div>
        </div>
        <div>
          <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">Video Topic</label>
          <input id="vsModalTopic" type="text" placeholder="What is the video about?" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:9px 12px;color:#fff;font-size:13px;outline:none;box-sizing:border-box;">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">Platform</label>
            <select id="vsModalPlatform" style="width:100%;background:rgba(10,15,30,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:9px 12px;color:#fff;font-size:13px;outline:none;">
              <option>TikTok</option><option>Instagram</option><option>YouTube</option><option>Facebook</option><option>LinkedIn</option>
            </select>
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">Duration</label>
            <select id="vsModalDuration" style="width:100%;background:rgba(10,15,30,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:9px 12px;color:#fff;font-size:13px;outline:none;">
              <option value="15">15 seconds</option><option value="30" selected>30 seconds</option><option value="60">60 seconds</option><option value="90">90 seconds</option>
            </select>
          </div>
        </div>
        <button id="vsGenerateBtn" onclick="generateVideoScriptFromModal()" style="background:linear-gradient(135deg,#FF2D78,#FF5fa0);color:#fff;font-size:14px;font-weight:800;padding:12px;border-radius:12px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
          <i class="fas fa-video"></i> Generate Script
        </button>
        <div id="vsScriptResult" style="display:none;max-height:280px;overflow-y:auto;"></div>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════
       CONTENT REVIEW MODAL — post-generation mutation & approval
  ════════════════════════════════════════════════════════════════ -->
  <div id="reviewModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:2000;overflow-y:auto;padding:20px;">
    <div style="max-width:820px;margin:30px auto;background:#0d1117;border:1px solid rgba(0,229,255,0.2);border-radius:24px;overflow:hidden;">

      <!-- Header -->
      <div style="padding:22px 28px;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:space-between;background:rgba(0,229,255,0.04);">
        <div>
          <h2 style="font-size:20px;font-weight:900;color:#fff;margin:0;display:flex;align-items:center;gap:10px;">
            <i class="fas fa-eye" style="color:#00E5FF;"></i> Content Review
          </h2>
          <p style="font-size:13px;color:#6b7280;margin:4px 0 0;" id="reviewSubtitle">Review, edit, and approve your generated content</p>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <span id="reviewCounter" style="font-size:13px;color:#9ca3af;background:rgba(255,255,255,0.06);padding:5px 12px;border-radius:20px;"></span>
          <button onclick="closeReviewModal()" style="background:rgba(255,255,255,0.08);border:none;color:#9ca3af;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:18px;">✕</button>
        </div>
      </div>

      <!-- Character Bulk Approve Banner (shown when character is selected) -->
      <div id="charApproveBar" style="display:none;padding:14px 28px;background:rgba(124,58,237,0.08);border-bottom:1px solid rgba(124,58,237,0.2);">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <div id="charApproveBadge" style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#7C3AED,#00E5FF);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#fff;">A</div>
            <div>
              <div style="font-size:13px;font-weight:700;color:#fff;" id="charApproveName">Character Mode Active</div>
              <div style="font-size:12px;color:#A78BFA;">Content generated with this character's voice</div>
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button onclick="approveAllByCharacter()" style="background:linear-gradient(135deg,#7C3AED,#A78BFA);border:none;color:#fff;padding:8px 18px;border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:6px;">
              <i class="fas fa-check-double"></i> Character Looks Perfect — Approve All
            </button>
          </div>
        </div>
      </div>

      <!-- PRE-REVIEW: Mutation / Adjustment Panel -->
      <div id="mutationPanel" style="padding:20px 28px;border-bottom:1px solid rgba(255,255,255,0.07);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <div style="font-size:13px;font-weight:800;color:#fff;display:flex;align-items:center;gap:8px;">
            <i class="fas fa-sliders" style="color:#fbbf24;"></i> Adjust Before Approving
            <span style="font-size:11px;font-weight:500;color:#6b7280;">(optional — tweak and regenerate any card)</span>
          </div>
          <button onclick="toggleMutationPanel()" id="mutationToggleBtn" style="font-size:11px;color:#9ca3af;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 10px;border-radius:6px;cursor:pointer;">Hide</button>
        </div>
        <div id="mutationFields" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">Override Tone</label>
            <select id="mutTone" style="width:100%;background:rgba(10,15,30,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:9px 12px;color:#fff;font-size:13px;outline:none;">
              <option value="">— Keep current —</option>
              <option>Professional</option><option>Friendly</option><option>Playful</option><option>Bold</option><option>Inspiring</option><option>Informative</option><option>Conversational</option><option>Urgent / FOMO</option>
            </select>
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">Post Length</label>
            <select id="mutLength" style="width:100%;background:rgba(10,15,30,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:9px 12px;color:#fff;font-size:13px;outline:none;">
              <option value="">— Keep current —</option>
              <option value="shorter">Shorter (punchy, under 100 words)</option>
              <option value="longer">Longer (detailed, storytelling)</option>
              <option value="bullet">Bullet-point format</option>
              <option value="emoji">Emoji-heavy, casual</option>
            </select>
          </div>
          <div style="grid-column:1/-1;">
            <label style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px;">Custom Instruction (applied to all regenerations)</label>
            <input id="mutInstruction" type="text" placeholder='e.g. "Add a clear CTA", "Mention our sale ends Friday", "Start with a question"...'
              style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:9px 12px;color:#fff;font-size:13px;outline:none;box-sizing:border-box;">
          </div>
        </div>
      </div>

      <!-- Review Cards -->
      <div id="reviewCardsList" style="padding:20px 28px;display:flex;flex-direction:column;gap:14px;max-height:55vh;overflow-y:auto;"></div>

      <!-- Footer Actions -->
      <div style="padding:18px 28px;border-top:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;background:rgba(255,255,255,0.02);">
        <div style="font-size:13px;color:#9ca3af;" id="approveProgress">0 of 0 approved</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button onclick="rejectAll()" style="background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.25);color:#f87171;padding:9px 16px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;">
            <i class="fas fa-times"></i> Reject All
          </button>
          <button onclick="approveAll()" style="background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.25);color:#4ade80;padding:9px 16px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;">
            <i class="fas fa-check-double"></i> Approve All
          </button>
          <button onclick="publishApproved()" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;padding:9px 20px;border-radius:10px;font-size:13px;font-weight:900;cursor:pointer;border:none;display:flex;align-items:center;gap:7px;">
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

    // ── Review System State ──────────────────────────────────────────────────
    let reviewPosts = [];      // all generated posts
    let reviewStatus = {};     // { index: 'pending'|'approved'|'rejected' }
    let reviewParams = {};     // snapshot of generation params for regeneration
    let activeCharacter = null; // { name, id } if character mode

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
      const area = card.querySelector('textarea');
      if (area) {
        navigator.clipboard.writeText(area.value || '').then(() => {
          btn.innerHTML = '<i class="fas fa-check" style="color:#4ade80;"></i>';
          setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i>'; }, 2000);
        });
      }
    }

    function shareContent(btn) {
      const card = btn.closest('.content-card');
      const area = card.querySelector('textarea');
      const text = area ? area.value : '';
      if (navigator.share) {
        navigator.share({ title: 'Social Strategy Post', text });
      } else {
        navigator.clipboard.writeText(text).then(() => { alert('Post content copied to clipboard!'); });
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
      const posts = document.querySelectorAll('.content-card textarea');
      const allText = Array.from(posts).map(p => (p as HTMLTextAreaElement).value).join('\\n\\n---\\n\\n');
      navigator.clipboard.writeText(allText).then(() => {
        const btn = document.getElementById('copyAllBtn');
        if (btn) { btn.textContent = '✓ Copied!'; setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i> Copy All'; }, 2000); }
      });
    }

    function toggleTopicIdeas() {
      const box = document.getElementById('topicIdeasBox');
      const chevron = document.getElementById('topicIdeasChevron');
      const isOpen = box.style.display !== 'none';
      box.style.display = isOpen ? 'none' : 'block';
      chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
    }

    function useTopicIdea(el: HTMLElement) {
      const topicArea = document.getElementById('contentTopic') as HTMLTextAreaElement;
      topicArea.value = el.textContent.trim();
      topicArea.style.borderColor = '#00E5FF';
      setTimeout(() => { topicArea.style.borderColor = 'rgba(255,255,255,0.1)'; }, 1500);
      document.getElementById('topicIdeasBox').style.display = 'none';
      document.getElementById('topicIdeasChevron').style.transform = '';
    }

    function openVideoScriptModal() {
      const brandName = (document.getElementById('brandName') as HTMLInputElement).value.trim();
      const industry = (document.getElementById('industry') as HTMLSelectElement).value;
      const topic = (document.getElementById('contentTopic') as HTMLTextAreaElement).value.trim();
      (document.getElementById('vsModalBrand') as HTMLInputElement).value = brandName;
      (document.getElementById('vsModalIndustry') as HTMLInputElement).value = industry;
      (document.getElementById('vsModalTopic') as HTMLInputElement).value = topic;
      document.getElementById('videoScriptModal').style.display = 'flex';
    }

    function closeVideoScriptModal() {
      document.getElementById('videoScriptModal').style.display = 'none';
    }

    async function generateVideoScriptFromModal() {
      const brandName = (document.getElementById('vsModalBrand') as HTMLInputElement).value.trim();
      const industry = (document.getElementById('vsModalIndustry') as HTMLInputElement).value;
      const topic = (document.getElementById('vsModalTopic') as HTMLInputElement).value.trim();
      const platform = (document.getElementById('vsModalPlatform') as HTMLSelectElement).value;
      const duration = (document.getElementById('vsModalDuration') as HTMLSelectElement).value;
      const tone = getSelectedTone();
      if (!brandName || !topic) { alert('Please fill in Brand Name and Topic.'); return; }
      const btn = document.getElementById('vsGenerateBtn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
      (btn as HTMLButtonElement).disabled = true;
      const resultEl = document.getElementById('vsScriptResult');
      resultEl.style.display = 'none';
      try {
        const resp = await fetch('/api/generate-video-script', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brandName, industry, tone, topic, platform, duration })
        });
        const data = await resp.json() as { success: boolean; title?: string; hook?: string; script?: string; hashtags?: string[]; error?: string };
        if (data.success) {
          resultEl.style.display = 'block';
          resultEl.innerHTML = \`<div style="background:rgba(255,45,120,0.07);border:1px solid rgba(255,45,120,0.2);border-radius:12px;padding:16px;margin-top:16px;">
            <div style="font-size:15px;font-weight:800;color:#fff;margin-bottom:8px;">\${data.title}</div>
            <div style="font-size:12px;color:#FF2D78;font-weight:700;margin-bottom:10px;">Hook: \${data.hook}</div>
            <div style="font-size:13px;color:#d1d5db;line-height:1.7;white-space:pre-wrap;max-height:200px;overflow-y:auto;">\${data.script}</div>
            <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">\${(data.hashtags||[]).slice(0,6).map(h => \`<span style="font-size:11px;background:rgba(255,45,120,0.12);color:#FF2D78;padding:3px 8px;border-radius:20px;">\${h}</span>\`).join('')}</div>
          </div>\`;
        } else {
          alert(data.error || 'Video script generation failed.');
        }
      } catch(e) { alert('Error generating video script.'); }
      btn.innerHTML = '<i class="fas fa-video"></i> Generate Script';
      (btn as HTMLButtonElement).disabled = false;
    }

    async function generateImagePreset(preset: string, idx: number) {
      const brandName = (document.getElementById('brandName') as HTMLInputElement).value.trim() || 'My Brand';
      const industry = (document.getElementById('industry') as HTMLSelectElement).value || 'Business';
      const prompts: Record<string, string> = {
        'Product Hero': \`Professional product hero shot for \${brandName}, \${industry} industry, clean white background, studio lighting, premium\`,
        'Team Photo': \`Professional team photo for \${brandName}, modern office, diverse team, natural lighting, editorial style\`,
        'Abstract Art': \`Abstract brand art for \${brandName}, vibrant gradient colors, modern geometric shapes, digital art, \${industry} themed\`
      };
      (document.getElementById('customImagePrompt') as HTMLInputElement).value = prompts[preset] || preset;
      await generateCustomImage();
    }

    async function generateCustomImage() {
      const prompt = (document.getElementById('customImagePrompt') as HTMLInputElement).value.trim();
      if (!prompt) { alert('Please enter an image prompt or select a preset.'); return; }
      const btn = document.getElementById('genImgBtn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating... (20-30s)';
      (btn as HTMLButtonElement).disabled = true;
      const resultEl = document.getElementById('generatedImageResult');
      try {
        const resp = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, style: 'vivid', size: '1024x1024' })
        });
        const data = await resp.json() as { success: boolean; url?: string; error?: string };
        if (data.success && data.url) {
          resultEl.style.display = 'block';
          const imgUrl = data.url;
          resultEl.innerHTML = \`<div style="border-radius:12px;overflow:hidden;"><img src="\${imgUrl}" alt="Generated" style="width:100%;border-radius:12px;">
            <div style="display:flex;gap:8px;margin-top:8px;">
              <a href="\${imgUrl}" target="_blank" style="flex:1;text-align:center;background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.25);color:#00E5FF;font-size:12px;font-weight:700;padding:7px;border-radius:8px;text-decoration:none;"><i class="fas fa-external-link-alt" style="margin-right:5px;"></i>Open</a>
            </div></div>\`;
        } else {
          resultEl.style.display = 'block';
          resultEl.innerHTML = \`<div style="color:#f87171;font-size:13px;padding:10px;">\${(data as {error?:string}).error || 'Image generation failed.'}</div>\`;
        }
      } catch(e) { alert('Error generating image.'); }
      btn.innerHTML = '<i class="fas fa-sparkles"></i> Generate Custom Image (1 credit)';
      (btn as HTMLButtonElement).disabled = false;
    }

    // ═══════════════════════════════════════════════════════════════
    //  MAIN GENERATE — opens Review Modal instead of direct render
    // ═══════════════════════════════════════════════════════════════
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
        .filter(id => (document.getElementById('plat_' + id) as HTMLInputElement)?.checked)
        .map(id => ({'ig':'Instagram','tk':'TikTok','fb':'Facebook','li':'LinkedIn','tw':'X (Twitter)','yt':'YouTube','th':'Threads','pi':'Pinterest'} as Record<string,string>)[id]);

      if (selectedPlatforms.length === 0) {
        alert('Please select at least one platform.');
        return;
      }

      // Store params for potential regeneration
      reviewParams = { brandName, industry, tone, topic, platforms: selectedPlatforms };

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
          body: JSON.stringify(reviewParams)
        });
        const data = await resp.json() as { success: boolean; posts?: any[]; error?: string };

        if (!data.success || !data.posts) {
          status.innerHTML = \`
            <div style="width:34px;height:34px;border-radius:50%;background:rgba(248,113,113,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="fas fa-exclamation-circle" style="color:#f87171;font-size:14px;"></i>
            </div>
            <div style="font-size:14px;font-weight:700;color:#f87171;">\${data.error || 'Generation failed. Try again.'}</div>
          \`;
          return;
        }

        // Update history
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

        // Open Review Modal
        openReviewModal(data.posts);

        // Update status bar
        status.innerHTML = \`
          <div style="width:34px;height:34px;border-radius:50%;background:rgba(251,191,36,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <i class="fas fa-eye" style="color:#fbbf24;font-size:14px;"></i>
          </div>
          <div style="flex:1;">
            <div style="font-size:14px;font-weight:700;color:#fff;">\${data.posts.length} posts ready for review</div>
            <div style="font-size:12px;color:#9ca3af;margin-top:2px;">Review, edit and approve before publishing</div>
          </div>
          <button onclick="openReviewModal(null)" style="background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#000;font-size:12px;font-weight:900;padding:7px 14px;border-radius:8px;border:none;cursor:pointer;flex-shrink:0;">
            <i class="fas fa-eye" style="margin-right:5px;"></i>Review Content
          </button>
        \`;

      } catch(e) {
        status.innerHTML = \`
          <div style="width:34px;height:34px;border-radius:50%;background:rgba(248,113,113,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <i class="fas fa-exclamation-circle" style="color:#f87171;font-size:14px;"></i>
          </div>
          <div style="font-size:14px;font-weight:700;color:#f87171;">Connection error. Please try again.</div>
        \`;
      }
    }

    // ═══════════════════════════════════════════════════════════════
    //  REVIEW MODAL — open / render
    // ═══════════════════════════════════════════════════════════════
    function openReviewModal(posts: any[] | null) {
      if (posts) {
        reviewPosts = posts;
        reviewStatus = {};
        posts.forEach((_: any, i: number) => { reviewStatus[i] = 'pending'; });
      }
      if (!reviewPosts.length) return;
      renderReviewCards();
      document.getElementById('reviewSubtitle').textContent =
        'Review each post — edit content directly, approve or regenerate individually';
      document.getElementById('reviewCounter').textContent = reviewPosts.length + ' posts';

      // Character bar
      if (activeCharacter) {
        const bar = document.getElementById('charApproveBar');
        bar.style.display = 'block';
        document.getElementById('charApproveName').textContent = activeCharacter.name + ' (Character)';
        document.getElementById('charApproveBadge').textContent = activeCharacter.name[0];
      }

      document.getElementById('reviewModal').style.display = 'block';
      updateApproveProgress();
    }

    function closeReviewModal() {
      document.getElementById('reviewModal').style.display = 'none';
    }

    function renderReviewCards() {
      const container = document.getElementById('reviewCardsList');
      container.innerHTML = reviewPosts.map((post: any, i: number) => {
        const pidMap: Record<string,string> = {'Instagram':'ig','TikTok':'tk','Facebook':'fb','LinkedIn':'li','X (Twitter)':'tw','YouTube':'yt','Threads':'th','Pinterest':'pi'};
        const pid = pidMap[post.platform] || 'ig';
        const bg = (platformBgs as Record<string,string>)[pid] || 'linear-gradient(135deg,#333,#555)';
        const icon = (platformIcons as Record<string,string>)[pid] || 'fas fa-share';
        const st = reviewStatus[i];
        const borderColor = st === 'approved' ? 'rgba(74,222,128,0.4)' : st === 'rejected' ? 'rgba(248,113,113,0.3)' : 'rgba(255,255,255,0.09)';
        const bgColor = st === 'approved' ? 'rgba(74,222,128,0.04)' : st === 'rejected' ? 'rgba(248,113,113,0.04)' : 'rgba(255,255,255,0.02)';
        const statusBadge = st === 'approved'
          ? '<span style="font-size:11px;font-weight:800;color:#4ade80;background:rgba(74,222,128,0.12);padding:3px 8px;border-radius:20px;"><i class="fas fa-check" style="margin-right:4px;"></i>Approved</span>'
          : st === 'rejected'
          ? '<span style="font-size:11px;font-weight:800;color:#f87171;background:rgba(248,113,113,0.1);padding:3px 8px;border-radius:20px;"><i class="fas fa-times" style="margin-right:4px;"></i>Rejected</span>'
          : '<span style="font-size:11px;font-weight:700;color:#9ca3af;background:rgba(255,255,255,0.06);padding:3px 8px;border-radius:20px;">Pending</span>';

        return \`
        <div id="rcard_\${i}" style="background:\${bgColor};border:1.5px solid \${borderColor};border-radius:16px;overflow:hidden;transition:all 0.2s;">
          <!-- Card Header -->
          <div style="padding:12px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);background:rgba(255,255,255,0.03);">
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:30px;height:30px;border-radius:8px;background:\${bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="\${icon}" style="color:#fff;font-size:13px;"></i>
              </div>
              <div>
                <span style="font-size:13px;font-weight:700;color:#fff;">\${post.platform}</span>
                <span style="font-size:11px;color:#6b7280;margin-left:6px;">· \${post.type || 'Post'}</span>
              </div>
              \${statusBadge}
            </div>
            <div style="display:flex;gap:6px;align-items:center;">
              \${post.tip ? \`<span title="\${post.tip}" style="font-size:12px;color:#A78BFA;cursor:help;"><i class="fas fa-lightbulb"></i></span>\` : ''}
              <button onclick="copyReviewCard(\${i})" title="Copy" style="background:transparent;border:1px solid rgba(255,255,255,0.1);color:#9ca3af;padding:5px 9px;border-radius:7px;cursor:pointer;font-size:12px;transition:all 0.2s;" id="copyRBtn_\${i}"><i class="fas fa-copy"></i></button>
              <button onclick="regenerateCard(\${i})" title="Regenerate this post" style="background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.25);color:#fbbf24;padding:5px 9px;border-radius:7px;cursor:pointer;font-size:12px;" id="regenBtn_\${i}"><i class="fas fa-redo"></i></button>
            </div>
          </div>

          <!-- Editable Content -->
          <div style="padding:14px 16px;">
            <textarea id="rtarea_\${i}" rows="4" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 12px;color:#e5e7eb;font-size:13px;line-height:1.7;font-family:inherit;outline:none;resize:vertical;box-sizing:border-box;transition:border-color 0.2s;" onfocus="this.style.borderColor='rgba(0,229,255,0.4)'" onblur="this.style.borderColor='rgba(255,255,255,0.08)'">\${post.content}</textarea>
          </div>

          <!-- Approve / Reject -->
          <div style="padding:10px 16px 14px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
            <div style="display:flex;gap:8px;">
              <button onclick="setReviewStatus(\${i},'approved')" id="approveBtn_\${i}" style="background:\${st==='approved'?'rgba(74,222,128,0.2)':'rgba(74,222,128,0.08)'};border:1px solid rgba(74,222,128,\${st==='approved'?'0.5':'0.25'});color:#4ade80;padding:7px 16px;border-radius:9px;font-size:13px;font-weight:800;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:6px;">
                <i class="fas fa-check"></i> Approve
              </button>
              <button onclick="setReviewStatus(\${i},'rejected')" id="rejectBtn_\${i}" style="background:\${st==='rejected'?'rgba(248,113,113,0.18)':'rgba(248,113,113,0.06)'};border:1px solid rgba(248,113,113,\${st==='rejected'?'0.5':'0.2'});color:#f87171;padding:7px 16px;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:6px;">
                <i class="fas fa-times"></i> Reject
              </button>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <span style="font-size:11px;color:#6b7280;">Edit above ↑ then approve</span>
              <button onclick="scheduleApprovedCard(\${i})" style="background:transparent;border:1px solid rgba(0,229,255,0.2);color:#00E5FF;padding:5px 12px;border-radius:7px;font-size:12px;cursor:pointer;"><i class="fas fa-calendar" style="margin-right:4px;"></i>Schedule</button>
            </div>
          </div>
        </div>\`;
      }).join('');
    }

    // ── Review card helpers ────────────────────────────────────────────────────
    function setReviewStatus(i: number, status: 'approved'|'rejected'|'pending') {
      // Save any edits from the textarea back into reviewPosts
      const ta = document.getElementById('rtarea_' + i) as HTMLTextAreaElement;
      if (ta) reviewPosts[i].content = ta.value;
      reviewStatus[i] = status;
      // Re-render just that card for performance
      const card = document.getElementById('rcard_' + i);
      const temp = document.createElement('div');
      // Re-render by regenerating the full list (simple approach)
      renderReviewCards();
      // Scroll position maintained
      updateApproveProgress();
    }

    function approveAll() {
      reviewPosts.forEach((_, i) => {
        const ta = document.getElementById('rtarea_' + i) as HTMLTextAreaElement;
        if (ta) reviewPosts[i].content = ta.value;
        reviewStatus[i] = 'approved';
      });
      renderReviewCards();
      updateApproveProgress();
    }

    function rejectAll() {
      reviewPosts.forEach((_, i) => { reviewStatus[i] = 'rejected'; });
      renderReviewCards();
      updateApproveProgress();
    }

    function approveAllByCharacter() {
      approveAll();
      // Show confirmation
      const bar = document.getElementById('charApproveBar');
      bar.innerHTML = \`<div style="text-align:center;padding:6px;font-size:13px;color:#4ade80;font-weight:700;"><i class="fas fa-check-circle" style="margin-right:8px;"></i>All character content approved! Character voice confirmed.</div>\`;
    }

    function updateApproveProgress() {
      const approved = Object.values(reviewStatus).filter(s => s === 'approved').length;
      document.getElementById('approveProgress').textContent = approved + ' of ' + reviewPosts.length + ' approved';
    }

    function copyReviewCard(i: number) {
      const ta = document.getElementById('rtarea_' + i) as HTMLTextAreaElement;
      const btn = document.getElementById('copyRBtn_' + i);
      if (ta && btn) {
        navigator.clipboard.writeText(ta.value).then(() => {
          btn.innerHTML = '<i class="fas fa-check" style="color:#4ade80;"></i>';
          setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i>'; }, 2000);
        });
      }
    }

    function scheduleApprovedCard(i: number) {
      setReviewStatus(i, 'approved');
      alert('Post ' + (i+1) + ' scheduled to queue!');
    }

    // ── Per-card Regenerate with mutation params ───────────────────────────────
    async function regenerateCard(i: number) {
      const btn = document.getElementById('regenBtn_' + i) as HTMLButtonElement;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      btn.disabled = true;

      const mutTone = (document.getElementById('mutTone') as HTMLSelectElement).value;
      const mutLength = (document.getElementById('mutLength') as HTMLSelectElement).value;
      const mutInstruction = (document.getElementById('mutInstruction') as HTMLInputElement).value.trim();

      const platform = reviewPosts[i].platform;
      const params = {
        ...reviewParams,
        platforms: [platform],
        overrideTone: mutTone || undefined,
        lengthHint: mutLength || undefined,
        customInstruction: mutInstruction || undefined,
        singlePlatform: true
      };

      try {
        const resp = await fetch('/api/generate-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params)
        });
        const data = await resp.json() as { success: boolean; posts?: any[]; error?: string };
        if (data.success && data.posts && data.posts[0]) {
          reviewPosts[i].content = data.posts[0].content;
          reviewStatus[i] = 'pending';
          renderReviewCards();
          updateApproveProgress();
        } else {
          alert(data.error || 'Regeneration failed.');
        }
      } catch(e) { alert('Error regenerating.'); }
      // btn re-rendered by renderReviewCards
    }

    function toggleMutationPanel() {
      const fields = document.getElementById('mutationFields');
      const btn = document.getElementById('mutationToggleBtn');
      const hidden = fields.style.display === 'none';
      fields.style.display = hidden ? 'grid' : 'none';
      btn.textContent = hidden ? 'Hide' : 'Show';
    }

    // ── Publish Approved → render to main content cards ───────────────────────
    function publishApproved() {
      const approved = reviewPosts.filter((_, i) => reviewStatus[i] === 'approved');
      if (!approved.length) {
        alert('No posts approved yet. Approve at least one post to publish.');
        return;
      }

      closeReviewModal();

      const cardsContainer = document.getElementById('contentCards');
      cardsContainer.innerHTML = approved.map((post: any) => {
        const pidMap: Record<string,string> = {'Instagram':'ig','TikTok':'tk','Facebook':'fb','LinkedIn':'li','X (Twitter)':'tw','YouTube':'yt','Threads':'th','Pinterest':'pi'};
        const pid = pidMap[post.platform] || 'ig';
        const bg = (platformBgs as Record<string,string>)[pid] || 'linear-gradient(135deg,#333,#555)';
        const icon = (platformIcons as Record<string,string>)[pid] || 'fas fa-share';
        return \`
        <div class="content-card" style="background:rgba(74,222,128,0.03);border:1.5px solid rgba(74,222,128,0.2);border-radius:16px;overflow:hidden;">
          <div style="background:rgba(255,255,255,0.04);padding:12px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.06);">
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:32px;height:32px;border-radius:10px;background:\${bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="\${icon}" style="color:#fff;font-size:14px;"></i>
              </div>
              <div>
                <span style="font-size:13px;font-weight:700;color:#fff;">\${post.platform}</span>
                <span style="font-size:12px;color:#6b7280;margin-left:6px;">· \${post.type || 'Post'}</span>
              </div>
              <span style="font-size:11px;color:#4ade80;background:rgba(74,222,128,0.1);padding:2px 8px;border-radius:20px;"><i class="fas fa-check" style="margin-right:3px;"></i>Approved</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <button class="copy-btn" onclick="copyContent(this)" style="background:transparent;border:none;cursor:pointer;padding:6px 8px;border-radius:8px;color:#9ca3af;font-size:12px;" title="Copy">
                <i class="fas fa-copy"></i>
              </button>
              <button onclick="shareContent(this)" style="background:transparent;border:none;cursor:pointer;padding:6px 8px;border-radius:8px;color:#FF2D78;font-size:12px;" title="Share">
                <i class="fas fa-share-nodes"></i>
              </button>
              <button class="schedule-btn" onclick="schedulePost(this)" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:12px;font-weight:800;padding:5px 12px;border-radius:8px;border:none;cursor:pointer;">
                Schedule
              </button>
            </div>
          </div>
          <div style="padding:16px;">
            <textarea class="post-content-area" style="color:#d1d5db;font-size:13px;line-height:1.7;font-family:inherit;margin:0;width:100%;background:transparent;border:none;outline:none;resize:vertical;min-height:80px;" onfocus="this.style.background='rgba(255,255,255,0.03)';this.style.borderRadius='8px';this.style.padding='8px'" onblur="this.style.background='transparent';this.style.padding='0'">\${post.content}</textarea>
          </div>
        </div>\`;
      }).join('');

      const status = document.getElementById('generateStatus');
      status.innerHTML = \`
        <div style="width:34px;height:34px;border-radius:50%;background:rgba(74,222,128,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-check" style="color:#4ade80;font-size:14px;"></i>
        </div>
        <div style="flex:1;">
          <div style="font-size:14px;font-weight:700;color:#fff;">\${approved.length} approved posts published!</div>
          <div style="font-size:12px;color:#9ca3af;margin-top:2px;">Ready to schedule or copy</div>
        </div>
        <div style="display:flex;gap:8px;flex-shrink:0;">
          <button id="copyAllBtn" onclick="copyAll()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:6px 12px;color:#d1d5db;font-size:12px;cursor:pointer;display:flex;align-items:center;gap:5px;">
            <i class="fas fa-copy"></i> Copy All
          </button>
          <button onclick="scheduleAll()" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:12px;font-weight:900;padding:6px 12px;border-radius:8px;border:none;cursor:pointer;">
            <i class="fas fa-calendar"></i> Schedule All
          </button>
        </div>
      \`;
    }

    // ── Auto-fill from Profile (runs on page load) ───────────────────────────
    (function autoFillFromProfile() {
      try {
        const saved = JSON.parse(localStorage.getItem('ss_profile_v1') || '{}');
        if (saved.pBizName) {
          const bn = document.getElementById('brandName');
          if (bn && !(bn as HTMLInputElement).value) (bn as HTMLInputElement).value = saved.pBizName;
        }
        if (saved.pIndustry) {
          const ind = document.getElementById('industry') as HTMLSelectElement;
          if (ind) {
            // Find matching option
            for (let i = 0; i < ind.options.length; i++) {
              if (ind.options[i].text.toLowerCase().includes(saved.pIndustry.toLowerCase().split(' ')[0])) {
                ind.selectedIndex = i; break;
              }
            }
          }
        }
        // Pre-fill weekly wishlist as topic hint
        if (saved.pWeeklyWish || saved.pContentWish) {
          const topic = document.getElementById('contentTopic') as HTMLTextAreaElement;
          if (topic && !topic.value) {
            topic.placeholder = (saved.pWeeklyWish || saved.pContentWish || '').substring(0, 120) + '...';
          }
        }
      } catch (_) {}
    })();
  </script>
  `
  return layout('AI Content Studio', content, 'content-studio')
}
