import { layout } from './layout'

export function dashboardPage(): string {
  const content = `
  <!-- Top Bar -->
  <div class="sticky top-0 z-30 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-8 py-4 flex items-center justify-between">
    <div>
      <h1 class="text-xl font-bold text-white">Dashboard</h1>
      <p class="text-gray-400 text-sm">Welcome back, Jane! Here's your growth overview.</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="glass px-4 py-2 rounded-xl text-sm text-gray-300 hover:text-white flex items-center gap-2">
        <i class="fas fa-calendar text-cyan-400"></i> Last 30 days <i class="fas fa-chevron-down text-xs"></i>
      </button>
      <a href="/analysis" class="gradient-primary text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2">
        <i class="fas fa-plus"></i> New Analysis
      </a>
    </div>
  </div>

  <div class="p-8">
    <!-- KPI Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      ${[
        {label:'Total Reach',value:'89,420',change:'+12.3%',up:true,icon:'fas fa-users',color:'cyan'},
        {label:'Engagement Rate',value:'4.7%',change:'+0.8%',up:true,icon:'fas fa-heart',color:'pink'},
        {label:'Posts Published',value:'312',change:'+24',up:true,icon:'fas fa-paper-plane',color:'blue'},
        {label:'Scheduled Queue',value:'24',change:'4 today',up:true,icon:'fas fa-calendar-check',color:'purple'},
      ].map(k => `
      <div class="gradient-card rounded-2xl p-5 card-hover">
        <div class="flex items-start justify-between mb-3">
          <div class="w-10 h-10 rounded-xl bg-${k.color}-500/20 flex items-center justify-center border border-${k.color}-500/30">
            <i class="${k.icon} text-${k.color}-400"></i>
          </div>
          <span class="text-xs font-semibold ${k.up ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'} px-2 py-1 rounded-full">
            ${k.up ? '↑' : '↓'} ${k.change}
          </span>
        </div>
        <div class="text-2xl font-black text-white mb-1" data-count="${k.value.replace(/[^0-9]/g,'')}">${k.value}</div>
        <div class="text-gray-400 text-sm">${k.label}</div>
      </div>`).join('')}
    </div>

    <div class="grid lg:grid-cols-3 gap-6 mb-8">
      <!-- Main Chart -->
      <div class="lg:col-span-2 glass rounded-2xl p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-white font-bold text-lg">Engagement Overview</h3>
            <p class="text-gray-400 text-sm">Across all connected platforms</p>
          </div>
          <div class="flex gap-2">
            <button class="bg-cyan-500/20 text-cyan-400 text-xs px-3 py-1 rounded-full border border-cyan-500/30 font-semibold">7D</button>
            <button class="text-gray-400 text-xs px-3 py-1 rounded-full hover:text-white">30D</button>
            <button class="text-gray-400 text-xs px-3 py-1 rounded-full hover:text-white">90D</button>
          </div>
        </div>
        <canvas id="engagementChart" height="220"></canvas>
      </div>

      <!-- Platform Breakdown -->
      <div class="glass rounded-2xl p-6">
        <h3 class="text-white font-bold text-lg mb-4">Platform Reach</h3>
        <canvas id="platformChart" height="220"></canvas>
        <div class="mt-4 space-y-2">
          ${[
            {platform:'Instagram',value:35,color:'#E1306C'},
            {platform:'TikTok',value:28,color:'#69C9D0'},
            {platform:'Facebook',value:18,color:'#4267B2'},
            {platform:'YouTube',value:12,color:'#FF0000'},
            {platform:'Other',value:7,color:'#6366F1'},
          ].map(p => `
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 rounded-full" style="background:${p.color}"></div>
            <div class="flex-1 text-xs text-gray-400">${p.platform}</div>
            <div class="text-xs text-white font-semibold">${p.value}%</div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Platform Stats Row -->
    <div class="glass rounded-2xl p-6 mb-8">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-white font-bold text-lg">Connected Accounts</h3>
        <button class="text-cyan-400 text-sm hover:text-cyan-300 flex items-center gap-1"><i class="fas fa-plus-circle"></i> Connect More</button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        ${[
          {name:'Instagram', icon:'fab fa-instagram', color:'from-pink-500 to-orange-500', followers:'12.4K', posts:45, growth:'+8%'},
          {name:'TikTok', icon:'fab fa-tiktok', color:'from-gray-800 to-black', followers:'34.5K', posts:32, growth:'+22%'},
          {name:'Facebook', icon:'fab fa-facebook', color:'from-blue-600 to-blue-700', followers:'8.2K', posts:28, growth:'+3%'},
          {name:'YouTube', icon:'fab fa-youtube', color:'from-red-600 to-red-700', followers:'5.6K', posts:12, growth:'+15%'},
          {name:'X (Twitter)', icon:'fab fa-twitter', color:'from-sky-500 to-sky-600', followers:'9.8K', posts:67, growth:'+5%'},
          {name:'LinkedIn', icon:'fab fa-linkedin', color:'from-blue-700 to-blue-800', followers:'4.2K', posts:18, growth:'+11%'},
        ].map(p => `
        <div class="text-center group cursor-pointer">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform shadow-lg">
            <i class="${p.icon} text-white text-2xl"></i>
          </div>
          <div class="text-white font-bold text-sm">${p.followers}</div>
          <div class="text-gray-400 text-xs">${p.name}</div>
          <div class="text-green-400 text-xs font-semibold mt-1">${p.growth}</div>
        </div>`).join('')}
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Recent Posts -->
      <div class="glass rounded-2xl p-6">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-white font-bold text-lg">Recent Posts</h3>
          <a href="/scheduler" class="text-cyan-400 text-sm hover:text-cyan-300">View all →</a>
        </div>
        <div class="space-y-4">
          ${[
            {caption:'🔥 5 Morning Routines That Changed My Life...', platform:'Instagram', icon:'fab fa-instagram', color:'from-pink-500 to-orange-500', likes:1240, time:'2h ago', status:'published'},
            {caption:'How to 10x Your Productivity Without Burnout', platform:'LinkedIn', icon:'fab fa-linkedin', color:'from-blue-700 to-blue-800', likes:847, time:'5h ago', status:'published'},
            {caption:'POV: Your business is growing on autopilot 🚀', platform:'TikTok', icon:'fab fa-tiktok', color:'from-gray-800 to-black', likes:3200, time:'1d ago', status:'published'},
            {caption:'Summer Sale — 40% off everything this weekend!', platform:'Facebook', icon:'fab fa-facebook', color:'from-blue-600 to-blue-700', likes:0, time:'Tomorrow 9AM', status:'scheduled'},
          ].map(p => `
          <div class="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center flex-shrink-0">
              <i class="${p.icon} text-white text-sm"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-white text-sm font-medium truncate">${p.caption}</p>
              <div class="flex items-center gap-3 mt-1">
                <span class="text-gray-400 text-xs">${p.time}</span>
                ${p.status === 'published' ? `<span class="text-xs text-gray-400"><i class="fas fa-heart text-pink-400 mr-1"></i>${p.likes.toLocaleString()}</span>` : ''}
              </div>
            </div>
            <span class="text-xs px-2 py-1 rounded-full ${p.status==='published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}">
              ${p.status}
            </span>
          </div>`).join('')}
        </div>
      </div>

      <!-- Quick Actions + AI Insights -->
      <div class="space-y-6">
        <div class="glass rounded-2xl p-6">
          <h3 class="text-white font-bold text-lg mb-4">AI Insights</h3>
          <div class="space-y-3">
            ${[
              {icon:'fas fa-fire', color:'orange', text:'Your Tuesday posts perform 34% better. Schedule more content Tuesday mornings.'},
              {icon:'fas fa-hashtag', color:'cyan', text:'#productivity and #morningroutine are trending — use them in your next 3 posts.'},
              {icon:'fas fa-video', color:'purple', text:'Video content gets 3x more engagement than images on your TikTok. Create more videos.'},
              {icon:'fas fa-chart-line', color:'green', text:'Your Instagram reach dropped 8% — try posting Stories daily to boost visibility.'},
            ].map(i => `
            <div class="flex gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all">
              <div class="w-8 h-8 rounded-lg bg-${i.color}-500/20 flex items-center justify-center flex-shrink-0">
                <i class="${i.icon} text-${i.color}-400 text-sm"></i>
              </div>
              <p class="text-gray-300 text-sm leading-relaxed">${i.text}</p>
            </div>`).join('')}
          </div>
        </div>

        <div class="glass rounded-2xl p-6">
          <h3 class="text-white font-bold text-lg mb-4">Quick Actions</h3>
          <div class="grid grid-cols-2 gap-3">
            ${[
              {href:'/analysis', icon:'fas fa-search', label:'New Analysis', color:'cyan'},
              {href:'/content-studio', icon:'fas fa-wand-magic-sparkles', label:'Create Content', color:'purple'},
              {href:'/scheduler', icon:'fas fa-calendar-plus', label:'Schedule Post', color:'blue'},
              {href:'/analytics', icon:'fas fa-chart-bar', label:'View Reports', color:'green'},
            ].map(a => `
            <a href="${a.href}" class="flex items-center gap-3 p-3 rounded-xl bg-${a.color}-500/10 border border-${a.color}-500/20 hover:bg-${a.color}-500/20 transition-all group">
              <i class="${a.icon} text-${a.color}-400 group-hover:scale-110 transition-transform"></i>
              <span class="text-sm text-gray-300 font-medium">${a.label}</span>
            </a>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Engagement Chart
    const engCtx = document.getElementById('engagementChart').getContext('2d');
    new Chart(engCtx, {
      type: 'line',
      data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [
          {
            label: 'Likes',
            data: [1200,1800,1500,2200,1900,2800,2400],
            borderColor: '#00E5FF',
            backgroundColor: 'rgba(0,229,255,0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#00E5FF',
            pointRadius: 4,
          },
          {
            label: 'Comments',
            data: [340,520,410,680,590,820,710],
            borderColor: '#7C3AED',
            backgroundColor: 'rgba(124,58,237,0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#7C3AED',
            pointRadius: 4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#9ca3af', font: { size: 12 } } } },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } }
        }
      }
    });

    // Platform Doughnut
    const platCtx = document.getElementById('platformChart').getContext('2d');
    new Chart(platCtx, {
      type: 'doughnut',
      data: {
        labels: ['Instagram','TikTok','Facebook','YouTube','Other'],
        datasets: [{
          data: [35,28,18,12,7],
          backgroundColor: ['#E1306C','#69C9D0','#4267B2','#FF0000','#6366F1'],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: { legend: { display: false } }
      }
    });
  </script>
  `
  return layout('Dashboard', content, 'dashboard')
}
