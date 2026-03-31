import { layout } from './layout'

export function analyticsPage(): string {
  const content = `
  <!-- Top Bar -->
  <div class="sticky top-0 z-30 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-8 py-4 flex items-center justify-between">
    <div>
      <h1 class="text-xl font-bold text-white">Analytics</h1>
      <p class="text-gray-400 text-sm">Track your growth and optimize your strategy</p>
    </div>
    <div class="flex items-center gap-3">
      <div class="flex gap-1 glass rounded-xl p-1">
        ${['7D','30D','90D','1Y'].map((p,i) => `
        <button onclick="setPeriod(this,'${p}')" class="period-btn px-3 py-1.5 rounded-lg text-xs font-semibold ${i===1?'bg-cyan-500/20 text-cyan-400':'text-gray-400 hover:text-white'}">${p}</button>`).join('')}
      </div>
      <button class="glass px-4 py-2 rounded-xl text-sm text-gray-300 hover:text-white flex items-center gap-2">
        <i class="fas fa-download text-cyan-400"></i> Export
      </button>
    </div>
  </div>

  <div class="p-8">
    <!-- Top KPIs -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      ${[
        {label:'Total Impressions',value:'245,320',change:'+18.4%',up:true,icon:'fas fa-eye',color:'cyan'},
        {label:'Total Reach',value:'89,420',change:'+12.3%',up:true,icon:'fas fa-users',color:'blue'},
        {label:'Engagements',value:'15,847',change:'+23.1%',up:true,icon:'fas fa-heart',color:'pink'},
        {label:'Link Clicks',value:'3,204',change:'-2.1%',up:false,icon:'fas fa-mouse-pointer',color:'purple'},
      ].map(k => `
      <div class="gradient-card rounded-2xl p-5 card-hover">
        <div class="flex items-start justify-between mb-3">
          <div class="w-10 h-10 rounded-xl bg-${k.color}-500/20 flex items-center justify-center border border-${k.color}-500/30">
            <i class="${k.icon} text-${k.color}-400"></i>
          </div>
          <span class="text-xs font-semibold ${k.up?'text-green-400 bg-green-400/10':'text-red-400 bg-red-400/10'} px-2 py-1 rounded-full">${k.up?'↑':'↓'} ${k.change}</span>
        </div>
        <div class="text-2xl font-black text-white mb-1">${k.value}</div>
        <div class="text-gray-400 text-sm">${k.label}</div>
      </div>`).join('')}
    </div>

    <!-- Main Charts Row -->
    <div class="grid lg:grid-cols-3 gap-6 mb-8">
      <!-- Growth Chart -->
      <div class="lg:col-span-2 glass rounded-2xl p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-white font-bold text-lg">Growth Trends</h3>
            <p class="text-gray-400 text-sm">Followers, Reach & Engagement over time</p>
          </div>
          <div class="flex gap-3 text-xs">
            <span class="flex items-center gap-1.5 text-gray-400"><span class="w-3 h-0.5 bg-cyan-400 inline-block rounded"></span>Followers</span>
            <span class="flex items-center gap-1.5 text-gray-400"><span class="w-3 h-0.5 bg-purple-400 inline-block rounded"></span>Reach</span>
            <span class="flex items-center gap-1.5 text-gray-400"><span class="w-3 h-0.5 bg-pink-400 inline-block rounded"></span>Engagement</span>
          </div>
        </div>
        <canvas id="growthChart" height="250"></canvas>
      </div>

      <!-- Engagement Breakdown -->
      <div class="glass rounded-2xl p-6">
        <h3 class="text-white font-bold text-lg mb-2">Engagement Types</h3>
        <p class="text-gray-400 text-sm mb-5">What your audience does</p>
        <canvas id="engagementBreakdown" height="200"></canvas>
        <div class="mt-4 space-y-2">
          ${[
            {type:'Likes', val:52, color:'#EC4899'},
            {type:'Comments', val:18, color:'#8B5CF6'},
            {type:'Shares', val:15, color:'#06B6D4'},
            {type:'Saves', val:10, color:'#10B981'},
            {type:'Profile Visits', val:5, color:'#F59E0B'},
          ].map(e => `
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 rounded-full flex-shrink-0" style="background:${e.color}"></div>
            <div class="flex-1 text-xs text-gray-400">${e.type}</div>
            <div class="text-xs text-white font-semibold">${e.val}%</div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Platform Performance Table -->
    <div class="glass rounded-2xl overflow-hidden mb-8">
      <div class="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
        <h3 class="text-white font-bold text-lg">Platform Performance</h3>
        <button class="text-cyan-400 text-sm hover:text-cyan-300 flex items-center gap-1"><i class="fas fa-table"></i> Detailed Report</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-800">
              ${['Platform','Followers','Reach','Impressions','Eng. Rate','Posts','Growth'].map(h => `
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            ${[
              {platform:'Instagram', icon:'fab fa-instagram', color:'from-pink-500 to-orange-500', followers:'12,400', reach:'35,200', impressions:'89,000', eng:'5.2%', posts:45, growth:'+8%', growthUp:true},
              {platform:'TikTok', icon:'fab fa-tiktok', color:'from-gray-700 to-black', followers:'34,500', reach:'28,400', impressions:'102,000', eng:'6.8%', posts:32, growth:'+22%', growthUp:true},
              {platform:'Facebook', icon:'fab fa-facebook', color:'from-blue-600 to-blue-700', followers:'8,200', reach:'12,100', impressions:'24,000', eng:'2.1%', posts:28, growth:'+3%', growthUp:true},
              {platform:'YouTube', icon:'fab fa-youtube', color:'from-red-600 to-red-700', followers:'5,600', reach:'8,900', impressions:'18,000', eng:'3.4%', posts:12, growth:'+15%', growthUp:true},
              {platform:'X (Twitter)', icon:'fab fa-twitter', color:'from-sky-500 to-sky-600', followers:'9,800', reach:'14,200', impressions:'28,000', eng:'1.8%', posts:67, growth:'+5%', growthUp:true},
              {platform:'LinkedIn', icon:'fab fa-linkedin', color:'from-blue-700 to-blue-800', followers:'4,200', reach:'6,800', impressions:'12,000', eng:'4.1%', posts:18, growth:'+11%', growthUp:true},
            ].map(p => `
            <tr class="hover:bg-gray-800/30 transition-all cursor-pointer">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center">
                    <i class="${p.icon} text-white text-sm"></i>
                  </div>
                  <span class="text-white font-semibold text-sm">${p.platform}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-white text-sm font-medium">${p.followers}</td>
              <td class="px-6 py-4 text-white text-sm">${p.reach}</td>
              <td class="px-6 py-4 text-white text-sm">${p.impressions}</td>
              <td class="px-6 py-4">
                <span class="text-sm font-semibold text-cyan-400">${p.eng}</span>
              </td>
              <td class="px-6 py-4 text-gray-400 text-sm">${p.posts}</td>
              <td class="px-6 py-4">
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full ${p.growthUp?'bg-green-500/20 text-green-400':'bg-red-500/20 text-red-400'}">${p.growth}</span>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Bottom Row: Best Posts + Best Times -->
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Top Performing Posts -->
      <div class="glass rounded-2xl p-6">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-white font-bold text-lg">Top Performing Posts</h3>
          <span class="text-xs text-gray-400">Last 30 days</span>
        </div>
        <div class="space-y-4">
          ${[
            {text:'POV: Your entire marketing team runs on AI now 🤖', platform:'TikTok', icon:'fab fa-tiktok', likes:3200, comments:284, shares:890, color:'from-gray-700 to-black'},
            {text:'5 Morning Routines That Changed My Life [Thread]', platform:'Instagram', icon:'fab fa-instagram', likes:1840, comments:127, shares:320, color:'from-pink-500 to-orange-500'},
            {text:'Why 68% of Projects Fail (not what you think)', platform:'LinkedIn', icon:'fab fa-linkedin', likes:892, comments:234, shares:445, color:'from-blue-700 to-blue-800'},
            {text:'Summer Sale — 40% off! Limited time offer 🎉', platform:'Facebook', icon:'fab fa-facebook', likes:642, comments:89, shares:201, color:'from-blue-600 to-blue-700'},
          ].map((p,i) => `
          <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-800/50 transition-all cursor-pointer group">
            <div class="text-lg font-black text-gray-700 w-6 flex-shrink-0 group-hover:gradient-text">${i+1}</div>
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center flex-shrink-0">
              <i class="${p.icon} text-white text-xs"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-white text-sm font-medium truncate">${p.text}</p>
              <div class="flex items-center gap-4 mt-1 text-xs text-gray-400">
                <span><i class="fas fa-heart text-pink-400 mr-1"></i>${p.likes.toLocaleString()}</span>
                <span><i class="fas fa-comment text-blue-400 mr-1"></i>${p.comments}</span>
                <span><i class="fas fa-share text-green-400 mr-1"></i>${p.shares}</span>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Best Times Heatmap -->
      <div class="glass rounded-2xl p-6">
        <h3 class="text-white font-bold text-lg mb-2">Best Times to Post</h3>
        <p class="text-gray-400 text-sm mb-5">Engagement heatmap by day and hour</p>
        <div class="overflow-x-auto">
          <div class="flex gap-1 mb-2 ml-10">
            ${['6AM','9AM','12PM','3PM','6PM','9PM'].map(h => `<div class="flex-1 text-center text-xs text-gray-500">${h}</div>`).join('')}
          </div>
          ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day,di) => {
            const vals = [[1,3,4,5,3,2],[2,4,5,4,4,3],[2,5,4,3,3,2],[1,4,5,5,4,2],[2,3,4,4,5,3],[3,3,2,3,4,5],[2,2,1,2,3,4]]
            const row = vals[di]
            const opacities = ['bg-cyan-500/10','bg-cyan-500/20','bg-cyan-500/35','bg-cyan-500/55','bg-cyan-500/80']
            return `
            <div class="flex items-center gap-1 mb-1">
              <div class="w-9 text-xs text-gray-500 text-right flex-shrink-0">${day}</div>
              ${row.map(v => `<div class="flex-1 h-7 rounded-sm ${opacities[v-1]} border border-cyan-500/${v*10} cursor-pointer hover:opacity-80 transition-opacity"></div>`).join('')}
            </div>`
          }).join('')}
          <div class="flex items-center gap-2 mt-4 justify-end">
            <span class="text-xs text-gray-500">Low</span>
            ${['10','20','35','55','80'].map(o => `<div class="w-5 h-5 rounded-sm bg-cyan-500/${o}"></div>`).join('')}
            <span class="text-xs text-gray-500">High</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Growth Chart
    const gCtx = document.getElementById('growthChart').getContext('2d');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const current = months.slice(0,10);
    new Chart(gCtx, {
      type: 'line',
      data: {
        labels: current,
        datasets: [
          {label:'Followers', data:[38000,41000,44500,48000,52000,57000,61000,65000,70000,74400], borderColor:'#00E5FF', backgroundColor:'rgba(0,229,255,0.08)', fill:true, tension:0.4, pointRadius:4, pointBackgroundColor:'#00E5FF'},
          {label:'Reach', data:[52000,58000,63000,70000,75000,82000,78000,85000,88000,89420], borderColor:'#8B5CF6', backgroundColor:'rgba(139,92,246,0.05)', fill:true, tension:0.4, pointRadius:4, pointBackgroundColor:'#8B5CF6'},
          {label:'Engagements', data:[3200,3800,4500,5200,6100,7200,8100,9400,11200,15847], borderColor:'#EC4899', backgroundColor:'rgba(236,72,153,0.05)', fill:true, tension:0.4, pointRadius:4, pointBackgroundColor:'#EC4899'},
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color:'#9ca3af', font:{size:12}, boxWidth:30 } } },
        scales: {
          x: { grid:{color:'rgba(255,255,255,0.04)'}, ticks:{color:'#6b7280'} },
          y: { grid:{color:'rgba(255,255,255,0.04)'}, ticks:{color:'#6b7280', callback: v => v >= 1000 ? (v/1000).toFixed(0)+'K' : v} }
        }
      }
    });

    // Engagement Breakdown Donut
    const eCtx = document.getElementById('engagementBreakdown').getContext('2d');
    new Chart(eCtx, {
      type: 'doughnut',
      data: {
        labels:['Likes','Comments','Shares','Saves','Profile Visits'],
        datasets:[{ data:[52,18,15,10,5], backgroundColor:['#EC4899','#8B5CF6','#06B6D4','#10B981','#F59E0B'], borderWidth:0, hoverOffset:6 }]
      },
      options: { responsive:true, maintainAspectRatio:false, cutout:'72%', plugins:{legend:{display:false}} }
    });

    function setPeriod(btn, period) {
      document.querySelectorAll('.period-btn').forEach(b => b.className = b.className.replace('bg-cyan-500/20 text-cyan-400','text-gray-400 hover:text-white'));
      btn.className = btn.className.replace('text-gray-400 hover:text-white','bg-cyan-500/20 text-cyan-400');
    }
  </script>
  `
  return layout('Analytics', content, 'analytics')
}
