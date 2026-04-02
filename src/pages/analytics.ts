import { layout } from './layout'

export function analyticsPage(): string {
  const kpis = [
    { label: 'Total Impressions', value: '245,320', change: '+18.4%', up: true, icon: 'fas fa-eye', color: '#00E5FF', bg: 'rgba(0,229,255,0.1)', border: 'rgba(0,229,255,0.2)' },
    { label: 'Total Reach', value: '89,420', change: '+12.3%', up: true, icon: 'fas fa-users', color: '#60A5FA', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)' },
    { label: 'Engagements', value: '15,847', change: '+23.1%', up: true, icon: 'fas fa-heart', color: '#FF2D78', bg: 'rgba(255,45,120,0.1)', border: 'rgba(255,45,120,0.2)' },
    { label: 'Link Clicks', value: '3,204', change: '-2.1%', up: false, icon: 'fas fa-mouse-pointer', color: '#A78BFA', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.2)' },
  ]
  const platformRows = [
    { platform: 'Instagram', icon: 'fab fa-instagram', bg: 'linear-gradient(135deg,#E1306C,#F77737)', followers: '12,400', reach: '35,200', impressions: '89,000', eng: '5.2%', posts: 45, growth: '+8%', up: true },
    { platform: 'TikTok', icon: 'fab fa-tiktok', bg: 'linear-gradient(135deg,#010101,#69C9D0)', followers: '34,500', reach: '28,400', impressions: '102,000', eng: '6.8%', posts: 32, growth: '+22%', up: true },
    { platform: 'Facebook', icon: 'fab fa-facebook', bg: 'linear-gradient(135deg,#1877F2,#0d5fcc)', followers: '8,200', reach: '12,100', impressions: '24,000', eng: '2.1%', posts: 28, growth: '+3%', up: true },
    { platform: 'YouTube', icon: 'fab fa-youtube', bg: 'linear-gradient(135deg,#FF0000,#cc0000)', followers: '5,600', reach: '8,900', impressions: '18,000', eng: '3.4%', posts: 12, growth: '+15%', up: true },
    { platform: 'X (Twitter)', icon: 'fab fa-twitter', bg: 'linear-gradient(135deg,#1DA1F2,#0d7abc)', followers: '9,800', reach: '14,200', impressions: '28,000', eng: '1.8%', posts: 67, growth: '+5%', up: true },
    { platform: 'LinkedIn', icon: 'fab fa-linkedin', bg: 'linear-gradient(135deg,#0A66C2,#084c8f)', followers: '4,200', reach: '6,800', impressions: '12,000', eng: '4.1%', posts: 18, growth: '+11%', up: true },
  ]
  const topPosts = [
    { text: 'POV: Your entire marketing team runs on AI now 🤖', platform: 'TikTok', icon: 'fab fa-tiktok', bg: 'linear-gradient(135deg,#010101,#69C9D0)', likes: 3200, comments: 284, shares: 890 },
    { text: '5 Morning Routines That Changed My Life [Thread]', platform: 'Instagram', icon: 'fab fa-instagram', bg: 'linear-gradient(135deg,#E1306C,#F77737)', likes: 1840, comments: 127, shares: 320 },
    { text: 'Why 68% of Projects Fail (not what you think)', platform: 'LinkedIn', icon: 'fab fa-linkedin', bg: 'linear-gradient(135deg,#0A66C2,#084c8f)', likes: 892, comments: 234, shares: 445 },
    { text: 'Summer Sale — 40% off! Limited time offer 🎉', platform: 'Facebook', icon: 'fab fa-facebook', bg: 'linear-gradient(135deg,#1877F2,#0d5fcc)', likes: 642, comments: 89, shares: 201 },
  ]

  const content = `
  <!-- Top Bar -->
  <div style="position:sticky;top:0;z-index:30;background:rgba(3,8,24,0.85);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.07);padding:14px 28px;display:flex;align-items:center;justify-content:space-between;">
    <div>
      <h1 style="font-size:20px;font-weight:800;color:#fff;margin:0;">Analytics</h1>
      <p style="color:#9ca3af;font-size:13px;margin:2px 0 0;">Track your growth and optimize your strategy</p>
    </div>
    <div style="display:flex;align-items:center;gap:10px;">
      <div style="display:flex;gap:4px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:4px;">
        ${['7D', '30D', '90D', '1Y'].map((p, i) => `
        <button onclick="setPeriod(this,'${p}')" class="period-btn" style="padding:6px 12px;border-radius:8px;font-size:12px;font-weight:700;border:none;cursor:pointer;${i === 1 ? 'background:rgba(0,229,255,0.15);color:#00E5FF;' : 'background:transparent;color:#9ca3af;'}">${p}</button>`).join('')}
      </div>
      <button style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:8px 14px;color:#d1d5db;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:6px;">
        <i class="fas fa-download" style="color:#00E5FF;"></i> Export
      </button>
    </div>
  </div>

  <div style="padding:28px;">

    <!-- KPI Cards -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-bottom:28px;">
      ${kpis.map(k => `
      <div class="gradient-card card-hover" style="border-radius:18px;padding:20px;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;">
          <div style="width:40px;height:40px;border-radius:12px;background:${k.bg};border:1px solid ${k.border};display:flex;align-items:center;justify-content:center;">
            <i class="${k.icon}" style="color:${k.color};font-size:16px;"></i>
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
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-bottom:28px;">
      <!-- Growth Chart -->
      <div class="glass-dark" style="border-radius:18px;padding:22px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0;">Growth Trends</h3>
            <p style="font-size:13px;color:#9ca3af;margin:4px 0 0;">Followers, Reach &amp; Engagement over time</p>
          </div>
          <div style="display:flex;gap:14px;font-size:12px;">
            <span style="display:flex;align-items:center;gap:6px;color:#9ca3af;"><span style="width:14px;height:2px;background:#00E5FF;display:inline-block;border-radius:2px;"></span>Followers</span>
            <span style="display:flex;align-items:center;gap:6px;color:#9ca3af;"><span style="width:14px;height:2px;background:#8B5CF6;display:inline-block;border-radius:2px;"></span>Reach</span>
            <span style="display:flex;align-items:center;gap:6px;color:#9ca3af;"><span style="width:14px;height:2px;background:#EC4899;display:inline-block;border-radius:2px;"></span>Engagement</span>
          </div>
        </div>
        <canvas id="growthChart" height="220"></canvas>
      </div>

      <!-- Engagement Breakdown -->
      <div class="glass-dark" style="border-radius:18px;padding:22px;">
        <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0 0 4px;">Engagement Types</h3>
        <p style="font-size:13px;color:#9ca3af;margin:0 0 16px;">What your audience does</p>
        <canvas id="engagementBreakdown" height="180"></canvas>
        <div style="margin-top:14px;display:flex;flex-direction:column;gap:8px;">
          ${[
            { type: 'Likes', val: 52, color: '#EC4899' },
            { type: 'Comments', val: 18, color: '#8B5CF6' },
            { type: 'Shares', val: 15, color: '#06B6D4' },
            { type: 'Saves', val: 10, color: '#10B981' },
            { type: 'Profile Visits', val: 5, color: '#F59E0B' },
          ].map(e => `
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:8px;height:8px;border-radius:50%;background:${e.color};flex-shrink:0;"></div>
            <span style="flex:1;font-size:12px;color:#9ca3af;">${e.type}</span>
            <span style="font-size:12px;color:#fff;font-weight:700;">${e.val}%</span>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Platform Performance Table -->
    <div class="glass-dark" style="border-radius:18px;overflow:hidden;margin-bottom:28px;">
      <div style="padding:16px 22px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;">
        <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0;">Platform Performance</h3>
        <button style="color:#00E5FF;font-size:13px;background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:5px;">
          <i class="fas fa-table"></i> Detailed Report
        </button>
      </div>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
              ${['Platform', 'Followers', 'Reach', 'Impressions', 'Eng. Rate', 'Posts', 'Growth'].map(h => `
              <th style="padding:12px 18px;text-align:left;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;">${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${platformRows.map((p, i) => `
            <tr style="border-bottom:1px solid rgba(255,255,255,0.04);transition:background 0.2s;cursor:pointer;" onmouseover="this.style.background='rgba(255,255,255,0.03)'" onmouseout="this.style.background='transparent'">
              <td style="padding:14px 18px;">
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:36px;height:36px;border-radius:10px;background:${p.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <i class="${p.icon}" style="color:#fff;font-size:15px;"></i>
                  </div>
                  <span style="font-size:13px;font-weight:700;color:#fff;">${p.platform}</span>
                </div>
              </td>
              <td style="padding:14px 18px;font-size:13px;color:#fff;font-weight:600;">${p.followers}</td>
              <td style="padding:14px 18px;font-size:13px;color:#d1d5db;">${p.reach}</td>
              <td style="padding:14px 18px;font-size:13px;color:#d1d5db;">${p.impressions}</td>
              <td style="padding:14px 18px;">
                <span style="font-size:13px;font-weight:700;color:#00E5FF;">${p.eng}</span>
              </td>
              <td style="padding:14px 18px;font-size:13px;color:#9ca3af;">${p.posts}</td>
              <td style="padding:14px 18px;">
                <span style="font-size:12px;font-weight:700;padding:4px 10px;border-radius:20px;${p.up ? 'background:rgba(74,222,128,0.12);color:#4ade80;' : 'background:rgba(248,113,113,0.12);color:#f87171;'}">${p.growth}</span>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Bottom Row -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
      <!-- Top Performing Posts -->
      <div class="glass-dark" style="border-radius:18px;padding:22px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;">
          <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0;">Top Performing Posts</h3>
          <span style="font-size:12px;color:#9ca3af;">Last 30 days</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${topPosts.map((p, i) => `
          <div style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:12px;transition:background 0.2s;cursor:pointer;" onmouseover="this.style.background='rgba(255,255,255,0.04)'" onmouseout="this.style.background='transparent'">
            <div style="font-size:18px;font-weight:900;color:rgba(255,255,255,0.15);width:22px;flex-shrink:0;line-height:1.4;">${i + 1}</div>
            <div style="width:32px;height:32px;border-radius:10px;background:${p.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="${p.icon}" style="color:#fff;font-size:13px;"></i>
            </div>
            <div style="flex:1;min-width:0;">
              <p style="font-size:13px;font-weight:600;color:#fff;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.text}</p>
              <div style="display:flex;align-items:center;gap:14px;margin-top:5px;font-size:12px;color:#9ca3af;">
                <span><i class="fas fa-heart" style="color:#FF2D78;margin-right:4px;"></i>${p.likes.toLocaleString()}</span>
                <span><i class="fas fa-comment" style="color:#60A5FA;margin-right:4px;"></i>${p.comments}</span>
                <span><i class="fas fa-share" style="color:#4ade80;margin-right:4px;"></i>${p.shares}</span>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Best Times Heatmap -->
      <div class="glass-dark" style="border-radius:18px;padding:22px;">
        <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0 0 4px;">Best Times to Post</h3>
        <p style="font-size:13px;color:#9ca3af;margin:0 0 16px;">Engagement heatmap by day and hour</p>
        <div style="overflow-x:auto;">
          <div style="display:flex;gap:4px;margin-bottom:6px;margin-left:40px;">
            ${['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'].map(h => `<div style="flex:1;text-align:center;font-size:11px;color:#6b7280;">${h}</div>`).join('')}
          </div>
          ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, di) => {
    const vals = [[1, 3, 4, 5, 3, 2], [2, 4, 5, 4, 4, 3], [2, 5, 4, 3, 3, 2], [1, 4, 5, 5, 4, 2], [2, 3, 4, 4, 5, 3], [3, 3, 2, 3, 4, 5], [2, 2, 1, 2, 3, 4]]
    const row = vals[di]
    const opacities = [0.08, 0.18, 0.32, 0.52, 0.78]
    return `
            <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px;">
              <div style="width:36px;font-size:11px;color:#6b7280;text-align:right;flex-shrink:0;">${day}</div>
              ${row.map(v => `<div style="flex:1;height:26px;border-radius:5px;background:rgba(0,229,255,${opacities[v - 1]});border:1px solid rgba(0,229,255,${opacities[v - 1] * 0.6});cursor:pointer;transition:opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'"></div>`).join('')}
            </div>`
  }).join('')}
          <div style="display:flex;align-items:center;gap:6px;margin-top:12px;justify-content:flex-end;">
            <span style="font-size:11px;color:#6b7280;">Low</span>
            ${[0.08, 0.18, 0.32, 0.52, 0.78].map(o => `<div style="width:18px;height:18px;border-radius:4px;background:rgba(0,229,255,${o});"></div>`).join('')}
            <span style="font-size:11px;color:#6b7280;">High</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const gCtx = document.getElementById('growthChart').getContext('2d');
    new Chart(gCtx, {
      type:'line',
      data:{
        labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'],
        datasets:[
          {label:'Followers', data:[38000,41000,44500,48000,52000,57000,61000,65000,70000,74400], borderColor:'#00E5FF', backgroundColor:'rgba(0,229,255,0.07)', fill:true, tension:0.4, pointRadius:4, pointBackgroundColor:'#00E5FF'},
          {label:'Reach', data:[52000,58000,63000,70000,75000,82000,78000,85000,88000,89420], borderColor:'#8B5CF6', backgroundColor:'rgba(139,92,246,0.04)', fill:true, tension:0.4, pointRadius:4, pointBackgroundColor:'#8B5CF6'},
          {label:'Engagements', data:[3200,3800,4500,5200,6100,7200,8100,9400,11200,15847], borderColor:'#EC4899', backgroundColor:'rgba(236,72,153,0.04)', fill:true, tension:0.4, pointRadius:4, pointBackgroundColor:'#EC4899'},
        ]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{ display:false } },
        scales:{
          x:{ grid:{color:'rgba(255,255,255,0.03)'}, ticks:{color:'#6b7280'} },
          y:{ grid:{color:'rgba(255,255,255,0.03)'}, ticks:{color:'#6b7280', callback: v => v>=1000?(v/1000).toFixed(0)+'K':v} }
        }
      }
    });
    const eCtx = document.getElementById('engagementBreakdown').getContext('2d');
    new Chart(eCtx, {
      type:'doughnut',
      data:{ labels:['Likes','Comments','Shares','Saves','Profile Visits'], datasets:[{ data:[52,18,15,10,5], backgroundColor:['#EC4899','#8B5CF6','#06B6D4','#10B981','#F59E0B'], borderWidth:0, hoverOffset:6 }] },
      options:{ responsive:true, maintainAspectRatio:false, cutout:'72%', plugins:{legend:{display:false}} }
    });
    function setPeriod(btn, period) {
      document.querySelectorAll('.period-btn').forEach(b => { b.style.background='transparent'; b.style.color='#9ca3af'; });
      btn.style.background='rgba(0,229,255,0.15)'; btn.style.color='#00E5FF';
    }
  </script>
  `
  return layout('Analytics', content, 'analytics')
}
