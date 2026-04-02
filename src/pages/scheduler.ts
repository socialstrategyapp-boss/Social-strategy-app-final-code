import { layout } from './layout'

export function schedulerPage(): string {
  const platformColors: Record<string, string> = {
    ig: 'linear-gradient(135deg,#E1306C,#F77737)',
    tk: 'linear-gradient(135deg,#010101,#69C9D0)',
    fb: 'linear-gradient(135deg,#1877F2,#0d5fcc)',
    li: 'linear-gradient(135deg,#0A66C2,#084c8f)',
    tw: 'linear-gradient(135deg,#1DA1F2,#0d7abc)',
    yt: 'linear-gradient(135deg,#FF0000,#cc0000)',
  }
  const platformIcons: Record<string, string> = {
    ig: 'fab fa-instagram',
    tk: 'fab fa-tiktok',
    fb: 'fab fa-facebook',
    li: 'fab fa-linkedin',
    tw: 'fab fa-twitter',
    yt: 'fab fa-youtube',
  }

  const calPosts: Record<number, { p: string; text: string }[]> = {
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

  // Build calendar cells
  const offset = 2 // April 2026 starts on Wednesday
  let calCells = ''
  for (let i = 0; i < offset; i++) {
    calCells += `<div style="min-height:80px;padding:8px;border-right:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05);background:rgba(255,255,255,0.01);"></div>`
  }
  for (let d = 1; d <= 30; d++) {
    const ps = calPosts[d] || []
    calCells += `
    <div style="min-height:80px;padding:8px;border-right:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05);cursor:pointer;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.03)'" onmouseout="this.style.background='transparent'">
      <div style="font-size:13px;font-weight:600;color:#9ca3af;margin-bottom:4px;">${d}</div>
      <div style="display:flex;flex-direction:column;gap:3px;">
        ${ps.map(p => `<div style="display:flex;align-items:center;gap:4px;background:${platformColors[p.p]};border-radius:5px;padding:2px 6px;font-size:10px;color:#fff;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:100%;"><i class="${platformIcons[p.p]}" style="flex-shrink:0;font-size:9px;"></i><span style="overflow:hidden;text-overflow:ellipsis;">${p.text}</span></div>`).join('')}
      </div>
    </div>`
  }
  const remaining = (offset + 30) % 7 === 0 ? 0 : 7 - ((offset + 30) % 7)
  for (let i = 0; i < remaining; i++) {
    calCells += `<div style="min-height:80px;padding:8px;border-right:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05);background:rgba(255,255,255,0.01);"></div>`
  }

  const content = `
  <!-- Top Bar -->
  <div style="position:sticky;top:0;z-index:30;background:rgba(3,8,24,0.85);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.07);padding:14px 28px;display:flex;align-items:center;justify-content:space-between;">
    <div>
      <h1 style="font-size:20px;font-weight:800;color:#fff;margin:0;">Post Scheduler</h1>
      <p style="color:#9ca3af;font-size:13px;margin:2px 0 0;">Manage your content queue across all platforms</p>
    </div>
    <div style="display:flex;align-items:center;gap:10px;">
      <div style="display:flex;gap:4px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:4px;">
        <button id="calBtn" onclick="setView('calendar')" style="padding:6px 14px;border-radius:8px;font-size:13px;font-weight:700;border:none;cursor:pointer;background:rgba(0,229,255,0.15);color:#00E5FF;display:flex;align-items:center;gap:6px;">
          <i class="fas fa-calendar"></i>Calendar
        </button>
        <button id="listBtn" onclick="setView('list')" style="padding:6px 14px;border-radius:8px;font-size:13px;font-weight:700;border:none;cursor:pointer;background:transparent;color:#9ca3af;display:flex;align-items:center;gap:6px;">
          <i class="fas fa-list"></i>Queue
        </button>
      </div>
      <a href="/content-studio" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#001a22;font-size:13px;font-weight:800;padding:8px 16px;border-radius:10px;text-decoration:none;display:flex;align-items:center;gap:6px;">
        <i class="fas fa-plus"></i> New Post
      </a>
    </div>
  </div>

  <div style="padding:28px;">

    <!-- Stats Row -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px;">
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
            <button style="background:transparent;border:none;color:#9ca3af;cursor:pointer;padding:6px 8px;border-radius:8px;font-size:14px;transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#9ca3af'">
              <i class="fas fa-chevron-left"></i>
            </button>
            <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0;">April 2026</h3>
            <button style="background:transparent;border:none;color:#9ca3af;cursor:pointer;padding:6px 8px;border-radius:8px;font-size:14px;transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#9ca3af'">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <button style="font-size:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:5px 12px;color:#d1d5db;cursor:pointer;">Today</button>
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
        <!-- Calendar grid -->
        <div style="display:grid;grid-template-columns:repeat(7,1fr);">
          ${calCells}
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
        <div>
          ${queueItems.map(p => `
          <div style="padding:14px 22px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(255,255,255,0.04);transition:background 0.2s;cursor:pointer;" onmouseover="this.style.background='rgba(255,255,255,0.03)'" onmouseout="this.style.background='transparent'">
            <div style="font-size:12px;color:#6b7280;font-weight:600;width:116px;flex-shrink:0;">${p.date}</div>
            <div style="width:36px;height:36px;border-radius:10px;background:${platformColors[p.p]};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="${platformIcons[p.p]}" style="color:#fff;font-size:14px;"></i>
            </div>
            <div style="flex:1;min-width:0;">
              <p style="font-size:13px;font-weight:600;color:#fff;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.caption}</p>
              <span style="font-size:12px;color:#6b7280;">${p.platform} · ${p.type}</span>
            </div>
            <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;flex-shrink:0;${p.status === 'scheduled' ? 'background:rgba(0,229,255,0.12);color:#00E5FF;' : 'background:rgba(251,191,36,0.12);color:#fbbf24;'}">${p.status}</span>
            <div style="display:flex;gap:4px;opacity:0;" class="row-actions">
              <button style="padding:5px 8px;border-radius:8px;background:transparent;border:none;color:#9ca3af;cursor:pointer;font-size:12px;" onmouseover="this.style.background='rgba(255,255,255,0.06)'" onmouseout="this.style.background='transparent'"><i class="fas fa-pen"></i></button>
              <button style="padding:5px 8px;border-radius:8px;background:transparent;border:none;color:#9ca3af;cursor:pointer;font-size:12px;" onmouseover="this.style.background='rgba(239,68,68,0.12)';this.style.color='#f87171'" onmouseout="this.style.background='transparent';this.style.color='#9ca3af'"><i class="fas fa-trash"></i></button>
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
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
            ${optimalTimes.map(t => `
            <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:10px 12px;display:flex;align-items:flex-start;gap:8px;">
              <div style="width:26px;height:26px;border-radius:8px;background:${platformColors[t.p]};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="${platformIcons[t.p]}" style="color:#fff;font-size:11px;"></i>
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

  <script>
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
    // Show row actions on hover
    document.querySelectorAll('[onmouseover*="transparent"]').forEach(row => {
      const actions = row.querySelector('.row-actions');
      if (actions) {
        row.addEventListener('mouseenter', () => actions.style.opacity = '1');
        row.addEventListener('mouseleave', () => actions.style.opacity = '0');
      }
    });
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
