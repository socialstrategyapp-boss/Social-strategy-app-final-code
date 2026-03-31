import { layout } from './layout'

export function schedulerPage(): string {
  const content = `
  <!-- Top Bar -->
  <div class="sticky top-0 z-30 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-8 py-4 flex items-center justify-between">
    <div>
      <h1 class="text-xl font-bold text-white">Post Scheduler</h1>
      <p class="text-gray-400 text-sm">Manage your content queue across all platforms</p>
    </div>
    <div class="flex items-center gap-3">
      <div class="flex gap-1 glass rounded-xl p-1">
        <button onclick="setView('calendar')" id="calBtn" class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-cyan-500/20 text-cyan-400">
          <i class="fas fa-calendar mr-1"></i>Calendar
        </button>
        <button onclick="setView('list')" id="listBtn" class="px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white">
          <i class="fas fa-list mr-1"></i>Queue
        </button>
      </div>
      <a href="/content-studio" class="gradient-primary text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2">
        <i class="fas fa-plus"></i> New Post
      </a>
    </div>
  </div>

  <div class="p-8">
    <!-- Stats Row -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      ${[
        {label:'Scheduled', value:24, icon:'fas fa-clock', color:'cyan', sub:'Next 30 days'},
        {label:'Published Today', value:3, icon:'fas fa-check-circle', color:'green', sub:'On time'},
        {label:'Platforms', value:6, icon:'fas fa-share-alt', color:'purple', sub:'Connected'},
        {label:'Avg. Engagement', value:'4.7%', icon:'fas fa-chart-line', color:'pink', sub:'Per post'},
      ].map(s => `
      <div class="gradient-card rounded-2xl p-4">
        <div class="flex items-center justify-between mb-2">
          <i class="${s.icon} text-${s.color}-400"></i>
          <span class="text-xs text-gray-500">${s.sub}</span>
        </div>
        <div class="text-2xl font-black text-white">${s.value}</div>
        <div class="text-gray-400 text-sm">${s.label}</div>
      </div>`).join('')}
    </div>

    <!-- Calendar View -->
    <div id="calendarView">
      <div class="glass rounded-2xl overflow-hidden mb-6">
        <!-- Calendar Header -->
        <div class="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button class="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800"><i class="fas fa-chevron-left"></i></button>
            <h3 class="text-white font-bold text-lg">April 2025</h3>
            <button class="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800"><i class="fas fa-chevron-right"></i></button>
          </div>
          <div class="flex items-center gap-3">
            <button class="text-xs glass px-3 py-1.5 rounded-lg text-gray-300 hover:text-white">Today</button>
            <div class="flex items-center gap-2 text-xs">
              <span class="w-3 h-3 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 inline-block"></span><span class="text-gray-400">Instagram</span>
              <span class="w-3 h-3 rounded-full bg-blue-600 inline-block"></span><span class="text-gray-400">Facebook</span>
              <span class="w-3 h-3 rounded-full bg-sky-500 inline-block"></span><span class="text-gray-400">X</span>
              <span class="w-3 h-3 rounded-full bg-blue-700 inline-block"></span><span class="text-gray-400">LinkedIn</span>
            </div>
          </div>
        </div>

        <!-- Days Header -->
        <div class="grid grid-cols-7 border-b border-gray-800">
          ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => `
          <div class="px-4 py-2 text-center text-xs font-semibold text-gray-500 uppercase">${d}</div>`).join('')}
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7">
          ${(() => {
            const today = 31; // today is March 31
            const posts = {
              1:[{p:'ig',color:'from-pink-500 to-orange-500',icon:'fab fa-instagram',text:'Product launch post'}],
              2:[{p:'li',color:'from-blue-700 to-blue-800',icon:'fab fa-linkedin',text:'Thought leadership article'}],
              3:[{p:'tk',color:'from-gray-700 to-black',icon:'fab fa-tiktok',text:'Behind the scenes video'}],
              5:[{p:'fb',color:'from-blue-600 to-blue-700',icon:'fab fa-facebook',text:'Weekly tips roundup'}],
              7:[{p:'ig',color:'from-pink-500 to-orange-500',icon:'fab fa-instagram',text:'User testimonial'}],
              8:[{p:'tw',color:'from-sky-500 to-sky-600',icon:'fab fa-twitter',text:'Industry news thread'}],
              9:[{p:'li',color:'from-blue-700 to-blue-800',icon:'fab fa-linkedin',text:'Case study highlight'}],
              10:[{p:'tk',color:'from-gray-700 to-black',icon:'fab fa-tiktok',text:'Tutorial reel'}],
              12:[{p:'fb',color:'from-blue-600 to-blue-700',icon:'fab fa-facebook',text:'Weekend promo'},
                  {p:'ig',color:'from-pink-500 to-orange-500',icon:'fab fa-instagram',text:'Product showcase'}],
              14:[{p:'ig',color:'from-pink-500 to-orange-500',icon:'fab fa-instagram',text:'Quote card'}],
              15:[{p:'li',color:'from-blue-700 to-blue-800',icon:'fab fa-linkedin',text:'Industry insights'},
                  {p:'tk',color:'from-gray-700 to-black',icon:'fab fa-tiktok',text:'15s quick tip'}],
              17:[{p:'tw',color:'from-sky-500 to-sky-600',icon:'fab fa-twitter',text:'Trending topic reaction'}],
              19:[{p:'fb',color:'from-blue-600 to-blue-700',icon:'fab fa-facebook',text:'Customer spotlight'}],
              21:[{p:'ig',color:'from-pink-500 to-orange-500',icon:'fab fa-instagram',text:'Motivational Monday'}],
              22:[{p:'li',color:'from-blue-700 to-blue-800',icon:'fab fa-linkedin',text:'Team spotlight'}],
              24:[{p:'tk',color:'from-gray-700 to-black',icon:'fab fa-tiktok',text:'Product demo video'}],
              25:[{p:'ig',color:'from-pink-500 to-orange-500',icon:'fab fa-instagram',text:'Giveaway post'}],
              26:[{p:'fb',color:'from-blue-600 to-blue-700',icon:'fab fa-facebook',text:'Weekend content'},
                  {p:'tw',color:'from-sky-500 to-sky-600',icon:'fab fa-twitter',text:'Poll'}],
              28:[{p:'ig',color:'from-pink-500 to-orange-500',icon:'fab fa-instagram',text:'Story highlights'}],
              29:[{p:'li',color:'from-blue-700 to-blue-800',icon:'fab fa-linkedin',text:'Monthly recap'}],
              30:[{p:'tk',color:'from-gray-700 to-black',icon:'fab fa-tiktok',text:'Trending audio reel'}],
            } as Record<number, {p:string,color:string,icon:string,text:string}[]>
            const offset = 2; // April starts on Tuesday
            let cells = ''
            for(let i=0; i<offset; i++) cells += `<div class="min-h-[80px] p-2 border-r border-b border-gray-800/50 bg-gray-900/30"></div>`
            for(let d=1; d<=30; d++) {
              const isToday = false
              const ps = posts[d] || []
              cells += `
              <div class="min-h-[80px] p-2 border-r border-b border-gray-800/50 hover:bg-gray-800/30 cursor-pointer group ${isToday?'bg-cyan-500/5':''} transition-colors">
                <div class="text-sm font-semibold mb-1 ${isToday?'text-cyan-400 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center':'text-gray-400 group-hover:text-white'}">${d}</div>
                <div class="space-y-1">
                  ${ps.map(p => `<div class="flex items-center gap-1 bg-gradient-to-r ${p.color} rounded-md px-1.5 py-0.5 text-xs text-white truncate cursor-pointer hover:opacity-90"><i class="${p.icon} text-xs mr-1"></i>${p.text}</div>`).join('')}
                </div>
              </div>`
            }
            // Fill remaining cells
            const totalCells = offset + 30;
            const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7)
            for(let i=0; i<remaining; i++) cells += `<div class="min-h-[80px] p-2 border-r border-b border-gray-800/50 bg-gray-900/30"></div>`
            return cells
          })()}
        </div>
      </div>
    </div>

    <!-- Queue View -->
    <div id="listView" class="hidden">
      <div class="glass rounded-2xl overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <h3 class="text-white font-bold">Upcoming Queue</h3>
          <div class="flex gap-2">
            <select class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:border-cyan-500 outline-none">
              <option>All Platforms</option>
              <option>Instagram</option>
              <option>TikTok</option>
              <option>Facebook</option>
              <option>LinkedIn</option>
            </select>
            <select class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:border-cyan-500 outline-none">
              <option>All Status</option>
              <option>Scheduled</option>
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>
        </div>
        <div class="divide-y divide-gray-800">
          ${[
            {date:'Today 2:00 PM', platform:'Instagram', icon:'fab fa-instagram', color:'from-pink-500 to-orange-500', caption:'🚀 5 Morning Routines That Changed My Life [Thread]', status:'scheduled', type:'Image + Caption'},
            {date:'Today 5:30 PM', platform:'LinkedIn', icon:'fab fa-linkedin', color:'from-blue-700 to-blue-800', caption:'Why 68% of projects fail (and how AI fixes it)', status:'scheduled', type:'Article'},
            {date:'Apr 2, 9:00 AM', platform:'TikTok', icon:'fab fa-tiktok', color:'from-gray-700 to-black', caption:'POV: Your entire team runs on AI now 🤖', status:'scheduled', type:'Video (45s)'},
            {date:'Apr 3, 11:00 AM', platform:'Facebook', icon:'fab fa-facebook', color:'from-blue-600 to-blue-700', caption:'Summer Sale — 40% off everything this weekend! 🎉', status:'draft', type:'Image Ad'},
            {date:'Apr 4, 8:00 AM', platform:'X (Twitter)', icon:'fab fa-twitter', color:'from-sky-500 to-sky-600', caption:'Thread: 10 AI tools that will replace your entire marketing stack...', status:'scheduled', type:'Thread'},
            {date:'Apr 5, 12:00 PM', platform:'Instagram', icon:'fab fa-instagram', color:'from-pink-500 to-orange-500', caption:'Behind the scenes: How we build our AI model 🔧', status:'scheduled', type:'Reel'},
          ].map(p => `
          <div class="px-6 py-4 flex items-center gap-4 hover:bg-gray-800/30 transition-all group cursor-pointer">
            <div class="text-xs text-gray-500 font-medium w-28 flex-shrink-0">${p.date}</div>
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center flex-shrink-0">
              <i class="${p.icon} text-white text-sm"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-white text-sm font-medium truncate">${p.caption}</p>
              <span class="text-gray-500 text-xs">${p.platform} · ${p.type}</span>
            </div>
            <span class="text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ${p.status==='scheduled'?'bg-cyan-500/20 text-cyan-400':'bg-yellow-500/20 text-yellow-400'}">${p.status}</span>
            <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button class="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white"><i class="fas fa-pen text-xs"></i></button>
              <button class="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400"><i class="fas fa-trash text-xs"></i></button>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Optimal Time Banner -->
    <div class="mt-6 glass rounded-2xl p-5 border border-cyan-500/20">
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
          <i class="fas fa-brain text-cyan-400"></i>
        </div>
        <div class="flex-1">
          <h3 class="text-white font-semibold mb-1">AI Optimal Posting Times</h3>
          <p class="text-gray-400 text-sm mb-3">Based on your audience's activity patterns, here are the best times to post for maximum reach:</p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            ${[
              {platform:'Instagram', icon:'fab fa-instagram', times:'Tue/Thu 8-9AM, Fri 12PM'},
              {platform:'TikTok', icon:'fab fa-tiktok', times:'Daily 7-9PM, Wed 12PM'},
              {platform:'LinkedIn', icon:'fab fa-linkedin', times:'Tue-Thu 7-8AM'},
              {platform:'Facebook', icon:'fab fa-facebook', times:'Wed/Fri 1-4PM'},
              {platform:'X (Twitter)', icon:'fab fa-twitter', times:'Weekdays 12-1PM'},
              {platform:'YouTube', icon:'fab fa-youtube', times:'Fri-Sun 2-4PM'},
            ].map(t => `
            <div class="bg-gray-800/50 rounded-xl p-3 flex items-start gap-2">
              <i class="${t.icon} text-gray-400 text-sm mt-0.5"></i>
              <div>
                <div class="text-white text-xs font-semibold">${t.platform}</div>
                <div class="text-gray-400 text-xs">${t.times}</div>
              </div>
            </div>`).join('')}
          </div>
        </div>
        <button onclick="applyOptimalTimes()" class="flex-shrink-0 gradient-primary text-white text-sm font-semibold px-4 py-2 rounded-xl">
          <i class="fas fa-magic mr-1"></i> Auto-Apply
        </button>
      </div>
    </div>
  </div>

  <script>
    function setView(v) {
      document.getElementById('calendarView').classList.toggle('hidden', v !== 'calendar');
      document.getElementById('listView').classList.toggle('hidden', v !== 'list');
      document.getElementById('calBtn').className = v==='calendar'
        ? 'px-3 py-1.5 rounded-lg text-sm font-semibold bg-cyan-500/20 text-cyan-400'
        : 'px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white';
      document.getElementById('listBtn').className = v==='list'
        ? 'px-3 py-1.5 rounded-lg text-sm font-semibold bg-cyan-500/20 text-cyan-400'
        : 'px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white';
    }

    function applyOptimalTimes() {
      const btn = event.currentTarget;
      btn.innerHTML = '<i class="fas fa-check mr-1"></i> Applied!';
      btn.className = btn.className.replace('gradient-primary text-white','bg-green-500/20 text-green-400 border border-green-500/30');
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-magic mr-1"></i> Auto-Apply';
        btn.className = btn.className.replace('bg-green-500/20 text-green-400 border border-green-500/30','gradient-primary text-white');
      }, 3000);
    }
  </script>
  `
  return layout('Scheduler', content, 'scheduler')
}
