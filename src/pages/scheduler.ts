import { layout, topBar } from './layout'

export function schedulerPage(): string {
  const platformColors = {
    ig: 'linear-gradient(135deg,#E1306C,#F77737)',
    tk: 'linear-gradient(135deg,#010101,#69C9D0)',
    fb: 'linear-gradient(135deg,#1877F2,#0d5fcc)',
    li: 'linear-gradient(135deg,#0A66C2,#084c8f)',
    tw: 'linear-gradient(135deg,#1DA1F2,#0d7abc)',
    yt: 'linear-gradient(135deg,#FF0000,#cc0000)',
  }
  const platformIconsMap = {
    ig: 'fab fa-instagram',
    tk: 'fab fa-tiktok',
    fb: 'fab fa-facebook',
    li: 'fab fa-linkedin',
    tw: 'fab fa-twitter',
    yt: 'fab fa-youtube',
  }

  const calPosts = {
    1: [{ p: 'ig', text: 'Product launch post' }],
    2: [{ p: 'li', text: 'Thought leadership' }],
    3: [{ p: 'tk', text: 'Behind the scenes' }],
    5: [{ p: 'fb', text: 'Weekly tips roundup' }],
    7: [{ p: 'ig', text: 'User testimonial' }],
    8: [{ p: 'tw', text: 'Industry news thread' }],
    10: [{ p: 'tk', text: 'Tutorial reel' }],
    12: [{ p: 'fb', text: 'Weekend promo' }, { p: 'ig', text: 'Product showcase' }],
    14: [{ p: 'ig', text: 'Quote card' }],
    15: [{ p: 'li', text: 'Industry insights' }, { p: 'tk', text: 'Quick tip 15s' }],
    17: [{ p: 'tw', text: 'Trending topic' }],
    19: [{ p: 'fb', text: 'Customer spotlight' }],
    21: [{ p: 'ig', text: 'Motivational Monday' }],
    22: [{ p: 'li', text: 'Team spotlight' }],
    24: [{ p: 'tk', text: 'Product demo video' }],
    25: [{ p: 'ig', text: 'Giveaway post' }],
    26: [{ p: 'fb', text: 'Weekend content' }, { p: 'tw', text: 'Poll' }],
    28: [{ p: 'ig', text: 'Story highlights' }],
    29: [{ p: 'li', text: 'Monthly recap' }],
    30: [{ p: 'tk', text: 'Trending audio reel' }],
  }

  const queueItems = [
    { date: 'Today 2:00 PM', platform: 'Instagram', p: 'ig', caption: '🚀 5 Morning Routines That Changed My Life [Thread]', status: 'scheduled', type: 'Image + Caption' },
    { date: 'Today 5:30 PM', platform: 'LinkedIn', p: 'li', caption: 'Why 68% of projects fail (and how AI fixes it)', status: 'scheduled', type: 'Article' },
    { date: 'Apr 2, 9:00 AM', platform: 'TikTok', p: 'tk', caption: 'POV: Your entire team runs on AI now 🤖', status: 'scheduled', type: 'Video (45s)' },
    { date: 'Apr 3, 11:00 AM', platform: 'Facebook', p: 'fb', caption: 'Summer Sale — 40% off everything this weekend! 🎉', status: 'draft', type: 'Image Ad' },
    { date: 'Apr 4, 8:00 AM', platform: 'X (Twitter)', p: 'tw', caption: 'Thread: 10 AI tools that will replace your entire marketing stack...', status: 'scheduled', type: 'Thread' },
    { date: 'Apr 5, 12:00 PM', platform: 'Instagram', p: 'ig', caption: 'Behind the scenes: How we build our AI model 🔧', status: 'scheduled', type: 'Reel' },
  ]
  const optimalTimes = [
    { platform: 'Instagram', p: 'ig', times: 'Tue/Thu 8-9AM, Fri 12PM' },
    { platform: 'TikTok', p: 'tk', times: 'Daily 7-9PM, Wed 12PM' },
    { platform: 'LinkedIn', p: 'li', times: 'Tue-Thu 7-8AM' },
    { platform: 'Facebook', p: 'fb', times: 'Wed/Fri 1-4PM' },
    { platform: 'X (Twitter)', p: 'tw', times: 'Weekdays 12-1PM' },
    { platform: 'YouTube', p: 'yt', times: 'Fri-Sun 2-4PM' },
  ]

  const content = `
  ${topBar('Post Scheduler', 'Manage your content queue across all platforms', '<a href="/content-studio" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#fff;font-size:12px;font-weight:700;padding:7px 14px;border-radius:999px;text-decoration:none;display:flex;align-items:center;gap:5px;"><i class="fas fa-plus"></i> New Post</a>')}

  <div style="padding:28px;">

    <!-- Stats Row -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px;" class="grid-4">
      ${[
        { label: 'Scheduled', value: 24, icon: 'fas fa-clock', color: '#00E5FF', bg: 'rgba(0,229,255,0.1)', sub: 'Next 30 days' },
        { label: 'Published Today', value: 3, icon: 'fas fa-check-circle', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', sub: 'On time' },
        { label: 'Platforms', value: 6, icon: 'fas fa-share-alt', color: '#A78BFA', bg: 'rgba(167,139,250,0.1)', sub: 'Connected' },
        { label: 'Avg. Engagement', value: '4.7%', icon: 'fas fa-chart-line', color: '#FF2D78', bg: 'rgba(255,45,120,0.1)', sub: 'Per post' },
      ].map(s => `
      <div class="gradient-card" style="border-radius:16px;padding:16px 18px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <div style="width:34px;height:34px;border-radius:10px;background:${s.bg};display:flex;align-items:center;justify-content:center;">
            <i class="${s.icon}" style="color:${s.color};font-size:14px;"></i>
          </div>
          <span style="font-size:11px;color:#6b7280;">${s.sub}</span>
        </div>
        <div style="font-size:24px;font-weight:900;color:#fff;margin-bottom:2px;">${s.value}</div>
        <div style="font-size:13px;color:#9ca3af;">${s.label}</div>
      </div>`).join('')}
    </div>

    <!-- Calendar View -->
    <div id="calendarView">
      <div class="glass-dark" style="border-radius:18px;overflow:hidden;margin-bottom:20px;">
        <!-- Cal Header -->
        <div style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:14px;">
            <button onclick="calNav(-1)" style="background:transparent;border:none;color:#9ca3af;cursor:pointer;padding:6px 8px;border-radius:8px;font-size:14px;transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#9ca3af'">
              <i class="fas fa-chevron-left"></i>
            </button>
            <h3 id="calMonthTitle" style="font-size:16px;font-weight:800;color:#fff;margin:0;min-width:130px;text-align:center;">April 2026</h3>
            <button onclick="calNav(1)" style="background:transparent;border:none;color:#9ca3af;cursor:pointer;padding:6px 8px;border-radius:8px;font-size:14px;transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#9ca3af'">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <button onclick="goToday()" style="font-size:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:5px 12px;color:#d1d5db;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='rgba(0,229,255,0.1)';this.style.color='#00E5FF'" onmouseout="this.style.background='rgba(255,255,255,0.06)';this.style.color='#d1d5db'">Today</button>
            <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#9ca3af;">
              <span style="width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,#E1306C,#F77737);display:inline-block;"></span>Instagram
              <span style="width:10px;height:10px;border-radius:50%;background:#1877F2;display:inline-block;"></span>Facebook
              <span style="width:10px;height:10px;border-radius:50%;background:#1DA1F2;display:inline-block;"></span>X
              <span style="width:10px;height:10px;border-radius:50%;background:#0A66C2;display:inline-block;"></span>LinkedIn
            </div>
          </div>
        </div>
        <!-- Day headers -->
        <div style="display:grid;grid-template-columns:repeat(7,1fr);border-bottom:1px solid rgba(255,255,255,0.06);">
          ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => `
          <div style="padding:10px;text-align:center;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;">${d}</div>`).join('')}
        </div>
        <!-- Calendar grid (dynamically rendered by JS) -->
        <div id="calGrid" style="display:grid;grid-template-columns:repeat(7,1fr);">
        </div>
      </div>
    </div>

    <!-- Queue View (hidden initially) -->
    <div id="listView" style="display:none;">
      <div class="glass-dark" style="border-radius:18px;overflow:hidden;">
        <div style="padding:16px 22px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;">
          <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0;">Upcoming Queue</h3>
          <div style="display:flex;gap:8px;">
            <select style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:6px 12px;font-size:13px;color:#d1d5db;outline:none;">
              <option style="background:#0a0f1e;">All Platforms</option>
              <option style="background:#0a0f1e;">Instagram</option>
              <option style="background:#0a0f1e;">TikTok</option>
              <option style="background:#0a0f1e;">Facebook</option>
            </select>
            <select style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:6px 12px;font-size:13px;color:#d1d5db;outline:none;">
              <option style="background:#0a0f1e;">All Status</option>
              <option style="background:#0a0f1e;">Scheduled</option>
              <option style="background:#0a0f1e;">Draft</option>
            </select>
          </div>
        </div>
        <div id="queueList">
          ${queueItems.map(p => `
          <div style="padding:14px 22px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(255,255,255,0.04);transition:background 0.2s;cursor:pointer;" onmouseover="this.style.background='rgba(255,255,255,0.03)';this.querySelector('.row-actions').style.opacity='1'" onmouseout="this.style.background='transparent';this.querySelector('.row-actions').style.opacity='0'">
            <div style="font-size:12px;color:#6b7280;font-weight:600;width:116px;flex-shrink:0;">${p.date}</div>
            <div style="width:36px;height:36px;border-radius:10px;background:${platformColors[p.p]};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="${platformIconsMap[p.p]}" style="color:#fff;font-size:14px;"></i>
            </div>
            <div style="flex:1;min-width:0;">
              <p style="font-size:13px;font-weight:600;color:#fff;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.caption}</p>
              <span style="font-size:12px;color:#6b7280;">${p.platform} · ${p.type}</span>
            </div>
            <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;flex-shrink:0;${p.status === 'scheduled' ? 'background:rgba(0,229,255,0.12);color:#00E5FF;' : 'background:rgba(251,191,36,0.12);color:#fbbf24;'}">${p.status}</span>
            <div style="display:flex;gap:4px;opacity:0;transition:opacity 0.2s;" class="row-actions">
              <button style="padding:5px 8px;border-radius:8px;background:transparent;border:none;color:#9ca3af;cursor:pointer;font-size:12px;" onmouseover="this.style.background='rgba(255,255,255,0.06)'" onmouseout="this.style.background='transparent'"><i class="fas fa-pen"></i></button>
              <button onclick="deleteQueueItem(this)" style="padding:5px 8px;border-radius:8px;background:transparent;border:none;color:#9ca3af;cursor:pointer;font-size:12px;" onmouseover="this.style.background='rgba(239,68,68,0.12)';this.style.color='#f87171'" onmouseout="this.style.background='transparent';this.style.color='#9ca3af'"><i class="fas fa-trash"></i></button>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Optimal Times Banner -->
    <div style="margin-top:20px;background:rgba(0,229,255,0.04);border:1px solid rgba(0,229,255,0.18);border-radius:18px;padding:20px 24px;">
      <div style="display:flex;align-items:flex-start;gap:16px;">
        <div style="width:42px;height:42px;border-radius:12px;background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-brain" style="color:#00E5FF;font-size:16px;"></i>
        </div>
        <div style="flex:1;">
          <h3 style="font-size:15px;font-weight:800;color:#fff;margin:0 0 4px;">AI Optimal Posting Times</h3>
          <p style="font-size:13px;color:#9ca3af;margin:0 0 14px;">Based on your audience's activity patterns, here are the best times to post for maximum reach:</p>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;" class="grid-3">
            ${optimalTimes.map(t => `
            <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:10px 12px;display:flex;align-items:flex-start;gap:8px;">
              <div style="width:26px;height:26px;border-radius:8px;background:${platformColors[t.p]};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="${platformIconsMap[t.p]}" style="color:#fff;font-size:11px;"></i>
              </div>
              <div>
                <div style="font-size:12px;font-weight:700;color:#fff;">${t.platform}</div>
                <div style="font-size:11px;color:#9ca3af;margin-top:2px;">${t.times}</div>
              </div>
            </div>`).join('')}
          </div>
        </div>
        <button id="applyBtn" onclick="applyOptimalTimes()" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:13px;font-weight:800;padding:10px 18px;border-radius:10px;border:none;cursor:pointer;white-space:nowrap;flex-shrink:0;">
          <i class="fas fa-magic" style="margin-right:4px;"></i> Auto-Apply
        </button>
      </div>
    </div>

  </div>

  <!-- ── NEW POST MODAL ── -->
  <div id="newPostModal" style="display:none;position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);align-items:center;justify-content:center;padding:20px;">
    <div style="background:#060e24;border:1px solid rgba(0,229,255,0.2);border-radius:24px;padding:32px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;position:relative;">
      <button onclick="closeNewPostModal()" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.08);border:none;color:#9ca3af;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;">✕</button>
      <h2 style="font-size:20px;font-weight:900;color:#fff;margin:0 0 6px;">New Scheduled Post</h2>
      <p style="font-size:13px;color:#9ca3af;margin:0 0 24px;">Add a post to your content queue</p>

      <div style="display:flex;flex-direction:column;gap:16px;">
        <!-- Platform -->
        <div>
          <label style="font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:8px;">Platform</label>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            ${[
              { id: 'ig', name: 'Instagram', icon: 'fab fa-instagram', bg: 'linear-gradient(135deg,#E1306C,#F77737)' },
              { id: 'tk', name: 'TikTok', icon: 'fab fa-tiktok', bg: 'linear-gradient(135deg,#010101,#69C9D0)' },
              { id: 'fb', name: 'Facebook', icon: 'fab fa-facebook', bg: 'linear-gradient(135deg,#1877F2,#0d5fcc)' },
              { id: 'li', name: 'LinkedIn', icon: 'fab fa-linkedin', bg: 'linear-gradient(135deg,#0A66C2,#084c8f)' },
              { id: 'tw', name: 'X (Twitter)', icon: 'fab fa-twitter', bg: 'linear-gradient(135deg,#1DA1F2,#0d7abc)' },
              { id: 'yt', name: 'YouTube', icon: 'fab fa-youtube', bg: 'linear-gradient(135deg,#FF0000,#cc0000)' },
            ].map(p => `
            <button onclick="selectModalPlatform(this,'${p.id}')" data-pid="${p.id}" class="modal-plat-btn" style="display:flex;align-items:center;gap:7px;padding:7px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.04);color:#9ca3af;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;">
              <div style="width:22px;height:22px;border-radius:6px;background:${p.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="${p.icon}" style="color:#fff;font-size:10px;"></i>
              </div>${p.name}
            </button>`).join('')}
          </div>
        </div>

        <!-- Caption -->
        <div>
          <label style="font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:8px;">Caption / Content</label>
          <textarea id="modalCaption" rows="4" placeholder="Write your post caption here..." style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:12px;color:#fff;font-size:13px;outline:none;resize:none;box-sizing:border-box;" onfocus="this.style.borderColor='#00E5FF'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'"></textarea>
        </div>

        <!-- Date & Time -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:8px;">Date</label>
            <input id="modalDate" type="date" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:10px 14px;color:#fff;font-size:13px;outline:none;box-sizing:border-box;color-scheme:dark;" onfocus="this.style.borderColor='#00E5FF'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'">
          </div>
          <div>
            <label style="font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:8px;">Time</label>
            <input id="modalTime" type="time" value="09:00" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:10px 14px;color:#fff;font-size:13px;outline:none;box-sizing:border-box;color-scheme:dark;" onfocus="this.style.borderColor='#00E5FF'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'">
          </div>
        </div>

        <!-- Status -->
        <div>
          <label style="font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:8px;">Status</label>
          <div style="display:flex;gap:8px;">
            <button onclick="selectStatus(this,'scheduled')" class="status-btn" style="flex:1;padding:9px;border-radius:10px;border:1px solid rgba(0,229,255,0.4);background:rgba(0,229,255,0.1);color:#00E5FF;font-size:12px;font-weight:700;cursor:pointer;">📅 Scheduled</button>
            <button onclick="selectStatus(this,'draft')" class="status-btn" style="flex:1;padding:9px;border-radius:10px;border:1px solid rgba(255,255,255,0.12);background:transparent;color:#9ca3af;font-size:12px;font-weight:700;cursor:pointer;">📝 Draft</button>
          </div>
        </div>

        <!-- Buttons -->
        <div style="display:flex;gap:10px;margin-top:8px;">
          <button onclick="closeNewPostModal()" style="flex:1;padding:13px;border-radius:12px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#9ca3af;font-size:14px;font-weight:700;cursor:pointer;">Cancel</button>
          <button onclick="saveNewPost()" style="flex:2;padding:13px;border-radius:12px;border:none;background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:14px;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
            <i class="fas fa-calendar-plus"></i> Add to Queue
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    // ── CALENDAR DATA ──────────────────────────────────────────
    const calPostsData = ${JSON.stringify(calPosts)};
    const platColors = ${JSON.stringify(platformColors)};
    const platIcons = ${JSON.stringify(platformIconsMap)};

    // Current calendar state
    let calYear = 2026, calMonth = 3; // April 2026 (0-indexed)
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    function renderCalendar() {
      const today = new Date();
      const isCurrentMonth = (today.getFullYear() === calYear && today.getMonth() === calMonth);
      const todayDay = today.getDate();

      const firstDay = new Date(calYear, calMonth, 1).getDay(); // 0=Sun
      const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

      document.getElementById('calMonthTitle').textContent = monthNames[calMonth] + ' ' + calYear;

      let html = '';
      // Empty cells before 1st
      for (let i = 0; i < firstDay; i++) {
        html += \`<div style="min-height:80px;padding:8px;border-right:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05);background:rgba(255,255,255,0.01);"></div>\`;
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const isToday = isCurrentMonth && d === todayDay;
        const isApril2026 = (calYear === 2026 && calMonth === 3);
        const ps = isApril2026 ? (calPostsData[d] || []) : [];
        const todayBg = isToday ? 'rgba(0,229,255,0.06)' : 'transparent';
        const todayBorder = isToday ? 'rgba(0,229,255,0.25)' : 'rgba(255,255,255,0.05)';
        html += \`
        <div style="min-height:80px;padding:8px;border-right:1px solid \${todayBorder};border-bottom:1px solid rgba(255,255,255,0.05);cursor:pointer;transition:background 0.2s;background:\${todayBg};" onmouseover="this.style.background='rgba(255,255,255,0.03)'" onmouseout="this.style.background='\${todayBg}'">
          <div style="font-size:13px;font-weight:\${isToday ? '900' : '600'};color:\${isToday ? '#00E5FF' : '#9ca3af'};margin-bottom:4px;\${isToday ? 'width:22px;height:22px;border-radius:50%;background:rgba(0,229,255,0.15);display:flex;align-items:center;justify-content:center;' : ''}">\${d}</div>
          <div style="display:flex;flex-direction:column;gap:3px;">
            \${ps.map(p => \`<div style="display:flex;align-items:center;gap:4px;background:\${platColors[p.p]};border-radius:5px;padding:2px 6px;font-size:10px;color:#fff;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:100%;"><i class="\${platIcons[p.p]}" style="flex-shrink:0;font-size:9px;"></i><span style="overflow:hidden;text-overflow:ellipsis;">\${p.text}</span></div>\`).join('')}
          </div>
        </div>\`;
      }

      // Trailing cells
      const remaining = (firstDay + daysInMonth) % 7 === 0 ? 0 : 7 - ((firstDay + daysInMonth) % 7);
      for (let i = 0; i < remaining; i++) {
        html += \`<div style="min-height:80px;padding:8px;border-right:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05);background:rgba(255,255,255,0.01);"></div>\`;
      }

      document.getElementById('calGrid').innerHTML = html;
    }

    function calNav(dir) {
      calMonth += dir;
      if (calMonth > 11) { calMonth = 0; calYear++; }
      if (calMonth < 0) { calMonth = 11; calYear--; }
      renderCalendar();
    }

    function goToday() {
      const today = new Date();
      calYear = today.getFullYear();
      calMonth = today.getMonth();
      renderCalendar();
    }

    // Initialize calendar on page load
    renderCalendar();

    // ── VIEW TOGGLE ──────────────────────────────────────────
    function setView(v) {
      const calView = document.getElementById('calendarView');
      const listView = document.getElementById('listView');
      const calBtn = document.getElementById('calBtn');
      const listBtn = document.getElementById('listBtn');
      if (v === 'calendar') {
        calView.style.display = 'block'; listView.style.display = 'none';
        calBtn.style.background = 'rgba(0,229,255,0.15)'; calBtn.style.color = '#00E5FF';
        listBtn.style.background = 'transparent'; listBtn.style.color = '#9ca3af';
      } else {
        calView.style.display = 'none'; listView.style.display = 'block';
        listBtn.style.background = 'rgba(0,229,255,0.15)'; listBtn.style.color = '#00E5FF';
        calBtn.style.background = 'transparent'; calBtn.style.color = '#9ca3af';
      }
    }

    // ── QUEUE ACTIONS ────────────────────────────────────────
    function deleteQueueItem(btn) {
      if (confirm('Delete this post from the queue?')) {
        btn.closest('[style*="border-bottom"]').remove();
      }
    }

    // ── NEW POST MODAL ───────────────────────────────────────
    let selectedPlatformId = 'ig';
    let selectedStatus = 'scheduled';

    function openNewPostModal() {
      const modal = document.getElementById('newPostModal');
      modal.style.display = 'flex';
      // Set default date to today
      const today = new Date();
      document.getElementById('modalDate').value = today.toISOString().slice(0,10);
    }

    function closeNewPostModal() {
      document.getElementById('newPostModal').style.display = 'none';
    }

    function selectModalPlatform(btn, pid) {
      selectedPlatformId = pid;
      document.querySelectorAll('.modal-plat-btn').forEach(b => {
        b.style.borderColor = 'rgba(255,255,255,0.12)';
        b.style.background = 'rgba(255,255,255,0.04)';
        b.style.color = '#9ca3af';
      });
      btn.style.borderColor = 'rgba(0,229,255,0.5)';
      btn.style.background = 'rgba(0,229,255,0.1)';
      btn.style.color = '#00E5FF';
    }

    function selectStatus(btn, status) {
      selectedStatus = status;
      document.querySelectorAll('.status-btn').forEach(b => {
        b.style.borderColor = 'rgba(255,255,255,0.12)';
        b.style.background = 'transparent';
        b.style.color = '#9ca3af';
      });
      if (status === 'scheduled') {
        btn.style.borderColor = 'rgba(0,229,255,0.4)';
        btn.style.background = 'rgba(0,229,255,0.1)';
        btn.style.color = '#00E5FF';
      } else {
        btn.style.borderColor = 'rgba(251,191,36,0.4)';
        btn.style.background = 'rgba(251,191,36,0.1)';
        btn.style.color = '#fbbf24';
      }
    }

    function saveNewPost() {
      const caption = document.getElementById('modalCaption').value.trim();
      const date = document.getElementById('modalDate').value;
      const time = document.getElementById('modalTime').value;

      if (!caption) {
        document.getElementById('modalCaption').style.borderColor = '#f87171';
        document.getElementById('modalCaption').placeholder = 'Caption is required';
        setTimeout(() => { document.getElementById('modalCaption').style.borderColor = 'rgba(255,255,255,0.1)'; }, 2000);
        return;
      }
      if (!date) {
        alert('Please select a date.');
        return;
      }

      const platformNames = { ig:'Instagram', tk:'TikTok', fb:'Facebook', li:'LinkedIn', tw:'X (Twitter)', yt:'YouTube' };
      const platformBgsMap = {
        ig: 'linear-gradient(135deg,#E1306C,#F77737)',
        tk: 'linear-gradient(135deg,#010101,#69C9D0)',
        fb: 'linear-gradient(135deg,#1877F2,#0d5fcc)',
        li: 'linear-gradient(135deg,#0A66C2,#084c8f)',
        tw: 'linear-gradient(135deg,#1DA1F2,#0d7abc)',
        yt: 'linear-gradient(135deg,#FF0000,#cc0000)',
      };
      const platformIconsList = {
        ig: 'fab fa-instagram', tk: 'fab fa-tiktok', fb: 'fab fa-facebook',
        li: 'fab fa-linkedin', tw: 'fab fa-twitter', yt: 'fab fa-youtube',
      };

      const dateObj = new Date(date + 'T' + time);
      const dateStr = dateObj.toLocaleDateString('en-US', { month:'short', day:'numeric' }) + ', ' + time;
      const statusColor = selectedStatus === 'scheduled' ? 'background:rgba(0,229,255,0.12);color:#00E5FF;' : 'background:rgba(251,191,36,0.12);color:#fbbf24;';

      const newRow = document.createElement('div');
      newRow.style.cssText = 'padding:14px 22px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(255,255,255,0.04);transition:background 0.2s;cursor:pointer;';
      newRow.onmouseover = function() {
        this.style.background = 'rgba(255,255,255,0.03)';
        this.querySelector('.row-actions').style.opacity = '1';
      };
      newRow.onmouseout = function() {
        this.style.background = 'transparent';
        this.querySelector('.row-actions').style.opacity = '0';
      };
      newRow.innerHTML = \`
        <div style="font-size:12px;color:#6b7280;font-weight:600;width:116px;flex-shrink:0;">\${dateStr}</div>
        <div style="width:36px;height:36px;border-radius:10px;background:\${platformBgsMap[selectedPlatformId]};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="\${platformIconsList[selectedPlatformId]}" style="color:#fff;font-size:14px;"></i>
        </div>
        <div style="flex:1;min-width:0;">
          <p style="font-size:13px;font-weight:600;color:#fff;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">\${caption}</p>
          <span style="font-size:12px;color:#6b7280;">\${platformNames[selectedPlatformId]} · Post</span>
        </div>
        <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;flex-shrink:0;\${statusColor}">\${selectedStatus}</span>
        <div style="display:flex;gap:4px;opacity:0;transition:opacity 0.2s;" class="row-actions">
          <button style="padding:5px 8px;border-radius:8px;background:transparent;border:none;color:#9ca3af;cursor:pointer;font-size:12px;" onmouseover="this.style.background='rgba(255,255,255,0.06)'" onmouseout="this.style.background='transparent'"><i class="fas fa-pen"></i></button>
          <button onclick="deleteQueueItem(this)" style="padding:5px 8px;border-radius:8px;background:transparent;border:none;color:#9ca3af;cursor:pointer;font-size:12px;" onmouseover="this.style.background='rgba(239,68,68,0.12)';this.style.color='#f87171'" onmouseout="this.style.background='transparent';this.style.color='#9ca3af'"><i class="fas fa-trash"></i></button>
        </div>\`;

      document.getElementById('queueList').prepend(newRow);

      // Reset + close
      document.getElementById('modalCaption').value = '';
      selectedPlatformId = 'ig';
      selectedStatus = 'scheduled';
      closeNewPostModal();

      // Auto-switch to queue view
      setView('list');
    }

    // Close modal on backdrop click
    document.getElementById('newPostModal').addEventListener('click', function(e) {
      if (e.target === this) closeNewPostModal();
    });

    // ── APPLY OPTIMAL TIMES ──────────────────────────────────
    function applyOptimalTimes() {
      const btn = document.getElementById('applyBtn');
      btn.innerHTML = '<i class="fas fa-check" style="margin-right:4px;"></i> Applied!';
      btn.style.background = 'rgba(74,222,128,0.15)';
      btn.style.color = '#4ade80';
      btn.style.border = '1px solid rgba(74,222,128,0.3)';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-magic" style="margin-right:4px;"></i> Auto-Apply';
        btn.style.background = 'linear-gradient(135deg,#00E5FF,#0070F3)';
        btn.style.color = '#001a22';
        btn.style.border = 'none';
      }, 3000);
    }
  </script>
  `
  return layout('Scheduler', content, 'scheduler')
}
