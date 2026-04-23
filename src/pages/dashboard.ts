import { layout, platformIcon, ssLogo, topBar } from './layout'

export function dashboardPage(): string {
  const kpis = [
    { label: 'Total Reach', value: '89,420', change: '+12.3%', up: true, icon: 'fas fa-users', bg: 'rgba(0,229,255,0.12)', border: 'rgba(0,229,255,0.25)', iconColor: '#00E5FF' },
    { label: 'Engagement Rate', value: '4.7%', change: '+0.8%', up: true, icon: 'fas fa-heart', bg: 'rgba(255,45,120,0.12)', border: 'rgba(255,45,120,0.25)', iconColor: '#FF2D78' },
    { label: 'Posts Published', value: '312', change: '+24', up: true, icon: 'fas fa-paper-plane', bg: 'rgba(0,112,243,0.12)', border: 'rgba(0,112,243,0.25)', iconColor: '#0070F3' },
    { label: 'Scheduled Queue', value: '24', change: '4 today', up: true, icon: 'fas fa-calendar-check', bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.25)', iconColor: '#7C3AED' },
  ]
  const platforms = [
    { name: 'Instagram', iconId: 'ig', icon: 'fab fa-instagram', bg: 'linear-gradient(135deg,#E1306C,#F77737)', followers: '12.4K', posts: 45, growth: '+8%' },
    { name: 'TikTok', iconId: 'tk', icon: 'fab fa-tiktok', bg: 'linear-gradient(135deg,#010101,#69C9D0)', followers: '34.5K', posts: 32, growth: '+22%' },
    { name: 'Facebook', iconId: 'fb', icon: 'fab fa-facebook', bg: 'linear-gradient(135deg,#1877F2,#0d5fcc)', followers: '8.2K', posts: 28, growth: '+3%' },
    { name: 'YouTube', iconId: 'yt', icon: 'fab fa-youtube', bg: 'linear-gradient(135deg,#FF0000,#cc0000)', followers: '5.6K', posts: 12, growth: '+15%' },
    { name: 'X / Twitter', iconId: 'tw', icon: 'fab fa-twitter', bg: 'linear-gradient(135deg,#1DA1F2,#0d7abc)', followers: '9.8K', posts: 67, growth: '+5%' },
    { name: 'LinkedIn', iconId: 'li', icon: 'fab fa-linkedin', bg: 'linear-gradient(135deg,#0A66C2,#084c8f)', followers: '4.2K', posts: 18, growth: '+11%' },
  ]
  const posts = [
    { caption: '🔥 5 Morning Routines That Changed My Life...', platform: 'Instagram', iconId: 'ig', bg: 'linear-gradient(145deg,#E1306C,#F77737)', likes: 1240, time: '2h ago', status: 'published' },
    { caption: 'How to 10x Your Productivity Without Burnout', platform: 'LinkedIn', iconId: 'li', bg: 'linear-gradient(145deg,#0A66C2,#084c8f)', likes: 847, time: '5h ago', status: 'published' },
    { caption: 'POV: Your business is growing on autopilot 🚀', platform: 'TikTok', iconId: 'tk', bg: 'linear-gradient(145deg,#010101,#69C9D0)', likes: 3200, time: '1d ago', status: 'published' },
    { caption: 'Summer Sale — 40% off everything this weekend!', platform: 'Facebook', iconId: 'fb', bg: 'linear-gradient(145deg,#1877F2,#0d5fcc)', likes: 0, time: 'Tomorrow 9AM', status: 'scheduled' },
  ]
  const insights = [
    { icon: 'fas fa-fire', color: '#FB923C', bg: 'rgba(251,146,60,0.12)', text: 'Your Tuesday posts perform 34% better. Schedule more content Tuesday mornings.' },
    { icon: 'fas fa-hashtag', color: '#00E5FF', bg: 'rgba(0,229,255,0.10)', text: '#productivity and #morningroutine are trending — use them in your next 3 posts.' },
    { icon: 'fas fa-video', color: '#A78BFA', bg: 'rgba(167,139,250,0.10)', text: 'Video content gets 3x more engagement than images on your TikTok. Create more videos.' },
    { icon: 'fas fa-chart-line', color: '#4ADE80', bg: 'rgba(74,222,128,0.10)', text: 'Your Instagram reach dropped 8% — try posting Stories daily to boost visibility.' },
  ]
  const quickActions = [
    { href: '/analysis', icon: 'fas fa-search', label: 'New Analysis', color: '#00E5FF', bg: 'rgba(0,229,255,0.08)', border: 'rgba(0,229,255,0.2)' },
    { href: '/content-studio', icon: 'fas fa-wand-magic-sparkles', label: 'Create Content', color: '#A78BFA', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)' },
    { href: '/scheduler', icon: 'fas fa-calendar-plus', label: 'Schedule Post', color: '#60A5FA', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)' },
    { href: '/analytics', icon: 'fas fa-chart-bar', label: 'View Reports', color: '#4ADE80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.2)' },
  ]

  const content = `
  ${topBar('Dashboard', 'Your growth command centre', '<a href="/analysis" style="background:linear-gradient(135deg,#00E5FF,#0070F3);color:#fff;font-size:12px;font-weight:700;padding:7px 14px;border-radius:999px;text-decoration:none;display:flex;align-items:center;gap:5px;"><i class="fas fa-plus"></i> Analyse</a>')}

  <div style="padding:28px;">

    <!-- KPI Cards -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-bottom:28px;" class="grid-4">
      ${kpis.map(k => `
      <div class="gradient-card card-hover" style="border-radius:18px;padding:20px;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;">
          <div style="width:40px;height:40px;border-radius:12px;background:${k.bg};border:1px solid ${k.border};display:flex;align-items:center;justify-content:center;">
            <i class="${k.icon}" style="color:${k.iconColor};font-size:16px;"></i>
          </div>
          <span style="font-size:11px;font-weight:700;color:${k.up ? '#4ade80' : '#f87171'};background:${k.up ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)'};padding:4px 8px;border-radius:20px;">
            ${k.up ? '↑' : '↓'} ${k.change}
          </span>
        </div>
        <div style="font-size:26px;font-weight:900;color:#fff;margin-bottom:4px;">${k.value}</div>
        <div style="font-size:13px;color:#9ca3af;">${k.label}</div>
      </div>`).join('')}
    </div>

    <!-- Charts Row -->
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-bottom:28px;" class="grid-2-1">
      <!-- Engagement Chart -->
      <div class="glass-dark" style="border-radius:18px;padding:22px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0;">Engagement Overview</h3>
            <p style="font-size:13px;color:#9ca3af;margin:4px 0 0;">Across all connected platforms</p>
          </div>
          <div style="display:flex;gap:6px;">
            <button onclick="setDashPeriod(this,'7D')" class="dash-period-btn" style="background:rgba(0,229,255,0.15);color:#00E5FF;font-size:11px;font-weight:700;padding:5px 12px;border-radius:20px;border:1px solid rgba(0,229,255,0.3);cursor:pointer;">7D</button>
            <button onclick="setDashPeriod(this,'30D')" class="dash-period-btn" style="color:#9ca3af;font-size:11px;padding:5px 12px;border-radius:20px;border:1px solid transparent;cursor:pointer;background:none;">30D</button>
            <button onclick="setDashPeriod(this,'90D')" class="dash-period-btn" style="color:#9ca3af;font-size:11px;padding:5px 12px;border-radius:20px;border:1px solid transparent;cursor:pointer;background:none;">90D</button>
          </div>
        </div>
        <canvas id="engagementChart" height="200"></canvas>
      </div>

      <!-- Platform Reach -->
      <div class="glass-dark" style="border-radius:18px;padding:22px;">
        <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0 0 16px;">Platform Reach</h3>
        <canvas id="platformChart" height="180"></canvas>
        <div style="margin-top:14px;display:flex;flex-direction:column;gap:8px;">
          ${[
            { platform: 'Instagram', value: 35, color: '#E1306C' },
            { platform: 'TikTok', value: 28, color: '#69C9D0' },
            { platform: 'Facebook', value: 18, color: '#4267B2' },
            { platform: 'YouTube', value: 12, color: '#FF0000' },
            { platform: 'Other', value: 7, color: '#6366F1' },
          ].map(p => `
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:8px;height:8px;border-radius:50%;background:${p.color};flex-shrink:0;"></div>
            <span style="flex:1;font-size:12px;color:#9ca3af;">${p.platform}</span>
            <span style="font-size:12px;color:#fff;font-weight:700;">${p.value}%</span>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Connected Accounts -->
    <div class="glass-dark" style="border-radius:18px;padding:22px;margin-bottom:28px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
        <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0;">Connected Accounts</h3>
        <button onclick="window.location.href='/settings'" style="color:#00E5FF;font-size:13px;background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:4px;">
          <i class="fas fa-plus-circle"></i> Connect More
        </button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:16px;">
        ${platforms.map(p => `
        <div style="text-align:center;cursor:pointer;" onmouseover="this.querySelector('.picon').style.transform='scale(1.08)'" onmouseout="this.querySelector('.picon').style.transform='scale(1)'">
          <div class="picon" style="width:52px;height:52px;border-radius:16px;background:${p.bg};display:flex;align-items:center;justify-content:center;margin:0 auto 10px;transition:transform 0.2s;box-shadow:0 4px 16px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.15);">
            ${platformIcon(p.iconId, 24)}
          </div>
          <div style="font-size:14px;font-weight:800;color:#fff;">${p.followers}</div>
          <div style="font-size:11px;color:#9ca3af;margin:2px 0;">${p.name}</div>
          <div style="font-size:11px;font-weight:700;color:#4ade80;">${p.growth}</div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Recent Posts + AI Insights + Quick Actions -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
      <!-- Recent Posts -->
      <div class="glass-dark" style="border-radius:18px;padding:22px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;">
          <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0;">Recent Posts</h3>
          <a href="/scheduler" style="color:#00E5FF;font-size:13px;text-decoration:none;">View all →</a>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${posts.map(p => `
          <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;transition:background 0.2s;cursor:pointer;" onmouseover="this.style.background='rgba(255,255,255,0.04)'" onmouseout="this.style.background='transparent'">
            <div style="width:40px;height:40px;border-radius:12px;background:${p.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 3px 8px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.15);">
              ${platformIcon(p.iconId, 18)}
            </div>
            <div style="flex:1;min-width:0;">
              <p style="font-size:13px;font-weight:600;color:#fff;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.caption}</p>
              <div style="display:flex;align-items:center;gap:10px;margin-top:4px;">
                <span style="font-size:12px;color:#6b7280;">${p.time}</span>
                ${p.status === 'published' ? `<span style="font-size:12px;color:#9ca3af;"><i class="fas fa-heart" style="color:#FF2D78;margin-right:3px;"></i>${p.likes.toLocaleString()}</span>` : ''}
              </div>
            </div>
            <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;${p.status === 'published' ? 'background:rgba(74,222,128,0.12);color:#4ade80;' : 'background:rgba(251,191,36,0.12);color:#fbbf24;'}">
              ${p.status}
            </span>
          </div>`).join('')}
        </div>
      </div>

      <!-- AI Insights + Quick Actions -->
      <div style="display:flex;flex-direction:column;gap:18px;">
        <div class="glass-dark" style="border-radius:18px;padding:22px;">
          <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0 0 14px;">AI Insights</h3>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${insights.map(i => `
            <div style="display:flex;gap:12px;padding:12px;border-radius:12px;background:rgba(255,255,255,0.03);transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.06)'" onmouseout="this.style.background='rgba(255,255,255,0.03)'">
              <div style="width:32px;height:32px;border-radius:10px;background:${i.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="${i.icon}" style="color:${i.color};font-size:13px;"></i>
              </div>
              <p style="font-size:13px;color:#d1d5db;line-height:1.5;margin:0;">${i.text}</p>
            </div>`).join('')}
          </div>
        </div>

        <div class="glass-dark" style="border-radius:18px;padding:22px;">
          <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0 0 14px;">Quick Actions</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            ${quickActions.map(a => `
            <a href="${a.href}" style="display:flex;align-items:center;gap:10px;padding:12px;border-radius:12px;background:${a.bg};border:1px solid ${a.border};text-decoration:none;transition:all 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
              <i class="${a.icon}" style="color:${a.color};font-size:15px;"></i>
              <span style="font-size:13px;color:#d1d5db;font-weight:600;">${a.label}</span>
            </a>`).join('')}
          </div>
        </div>
      </div>
    </div>

  </div>

  <script>
    function setDashPeriod(btn, period) {
      document.querySelectorAll('.dash-period-btn').forEach(b => {
        b.style.background = 'none';
        b.style.color = '#9ca3af';
        b.style.border = '1px solid transparent';
      });
      btn.style.background = 'rgba(0,229,255,0.15)';
      btn.style.color = '#00E5FF';
      btn.style.border = '1px solid rgba(0,229,255,0.3)';
      // Update chart label (mock - in production would refetch data)
      const periodMap = { '7D': ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '30D': ['W1','W2','W3','W4'], '90D': ['Jan','Feb','Mar'] };
      const dataMap = {
        '7D': { likes: [1200,1800,1500,2200,1900,2800,2400], comments: [340,520,410,680,590,820,710] },
        '30D': { likes: [8200,11400,13800,15200], comments: [2100,3200,3800,4100] },
        '90D': { likes: [28000,42000,58000], comments: [7400,11200,16200] }
      };
      const chart = window._engChart;
      if (chart) {
        chart.data.labels = periodMap[period];
        chart.data.datasets[0].data = dataMap[period].likes;
        chart.data.datasets[1].data = dataMap[period].comments;
        chart.update();
      }
    }

    const engCtx = document.getElementById('engagementChart').getContext('2d');
    window._engChart = new Chart(engCtx, {
      type: 'line',
      data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [
          { label:'Likes', data:[1200,1800,1500,2200,1900,2800,2400], borderColor:'#00E5FF', backgroundColor:'rgba(0,229,255,0.08)', fill:true, tension:0.4, pointBackgroundColor:'#00E5FF', pointRadius:4 },
          { label:'Comments', data:[340,520,410,680,590,820,710], borderColor:'#7C3AED', backgroundColor:'rgba(124,58,237,0.08)', fill:true, tension:0.4, pointBackgroundColor:'#7C3AED', pointRadius:4 }
        ]
      },
      options: {
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{ labels:{ color:'#9ca3af', font:{ size:12 } } } },
        scales:{
          x:{ grid:{ color:'rgba(255,255,255,0.04)' }, ticks:{ color:'#6b7280' } },
          y:{ grid:{ color:'rgba(255,255,255,0.04)' }, ticks:{ color:'#6b7280' } }
        }
      }
    });
    const platCtx = document.getElementById('platformChart').getContext('2d');
    new Chart(platCtx, {
      type:'doughnut',
      data:{ labels:['Instagram','TikTok','Facebook','YouTube','Other'], datasets:[{ data:[35,28,18,12,7], backgroundColor:['#E1306C','#69C9D0','#4267B2','#FF0000','#6366F1'], borderWidth:0, hoverOffset:6 }] },
      options:{ responsive:true, maintainAspectRatio:false, cutout:'70%', plugins:{ legend:{ display:false } } }
    });
  </script>
  `
  return layout('Dashboard', content, 'dashboard')
}
