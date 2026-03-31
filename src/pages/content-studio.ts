import { layout } from './layout'

export function contentStudioPage(): string {
  const content = `
  <!-- Top Bar -->
  <div class="sticky top-0 z-30 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-8 py-4 flex items-center justify-between">
    <div>
      <h1 class="text-xl font-bold text-white">AI Content Studio</h1>
      <p class="text-gray-400 text-sm">Create branded content for all platforms in seconds</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="glass px-4 py-2 rounded-xl text-sm text-gray-300 hover:text-white flex items-center gap-2">
        <i class="fas fa-history text-cyan-400"></i> History
      </button>
      <button onclick="generateContent()" class="gradient-primary text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2">
        <i class="fas fa-wand-magic-sparkles"></i> Generate All
      </button>
    </div>
  </div>

  <div class="p-8">
    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Left: Controls -->
      <div class="space-y-5">
        <!-- Business Context -->
        <div class="glass rounded-2xl p-5">
          <h3 class="text-white font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-building text-cyan-400"></i> Business Context
          </h3>
          <div class="space-y-4">
            <div>
              <label class="text-xs text-gray-400 font-semibold uppercase mb-2 block">Brand Name</label>
              <input id="brandName" type="text" value="TechFlow Studio" class="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none">
            </div>
            <div>
              <label class="text-xs text-gray-400 font-semibold uppercase mb-2 block">Industry / Niche</label>
              <select id="industry" class="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none">
                <option>SaaS / Technology</option>
                <option>E-commerce</option>
                <option>Fitness & Wellness</option>
                <option>Food & Restaurant</option>
                <option>Fashion & Beauty</option>
                <option>Real Estate</option>
                <option>Education</option>
                <option>Finance</option>
                <option>Travel</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-gray-400 font-semibold uppercase mb-2 block">Tone of Voice</label>
              <div class="grid grid-cols-3 gap-2">
                ${['Professional','Friendly','Playful','Bold','Inspiring','Informative'].map((t,i) => `
                <button onclick="selectTone(this,'${t}')" class="tone-btn text-xs py-2 rounded-lg border ${i===1?'bg-cyan-500/20 border-cyan-500 text-cyan-400':'border-gray-700 text-gray-400 hover:border-gray-500'} transition-all">${t}</button>`).join('')}
              </div>
            </div>
            <div>
              <label class="text-xs text-gray-400 font-semibold uppercase mb-2 block">Content Topic</label>
              <textarea id="contentTopic" rows="3" class="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none resize-none" placeholder="e.g. Product launch, tips & tricks, behind the scenes...">New product launch — AI-powered project management tool</textarea>
            </div>
          </div>
        </div>

        <!-- Target Platforms -->
        <div class="glass rounded-2xl p-5">
          <h3 class="text-white font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-share-alt text-purple-400"></i> Target Platforms
          </h3>
          <div class="space-y-2">
            ${[
              {id:'ig', name:'Instagram', icon:'fab fa-instagram', color:'from-pink-500 to-orange-500', checked:true},
              {id:'tk', name:'TikTok', icon:'fab fa-tiktok', color:'from-gray-800 to-black', checked:true},
              {id:'fb', name:'Facebook', icon:'fab fa-facebook', color:'from-blue-600 to-blue-700', checked:true},
              {id:'li', name:'LinkedIn', icon:'fab fa-linkedin', color:'from-blue-700 to-blue-800', checked:true},
              {id:'tw', name:'X (Twitter)', icon:'fab fa-twitter', color:'from-sky-500 to-sky-600', checked:false},
              {id:'yt', name:'YouTube', icon:'fab fa-youtube', color:'from-red-600 to-red-700', checked:false},
            ].map(p => `
            <label class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-800 cursor-pointer group">
              <input type="checkbox" id="plat_${p.id}" ${p.checked?'checked':''} class="w-4 h-4 accent-cyan-500 cursor-pointer">
              <div class="w-7 h-7 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center">
                <i class="${p.icon} text-white text-xs"></i>
              </div>
              <span class="text-sm text-gray-300 group-hover:text-white">${p.name}</span>
            </label>`).join('')}
          </div>
        </div>

        <!-- Content Type -->
        <div class="glass rounded-2xl p-5">
          <h3 class="text-white font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-layer-group text-blue-400"></i> Content Type
          </h3>
          <div class="space-y-2">
            ${[
              {id:'caption', label:'Caption + Hashtags', icon:'fas fa-align-left', active:true},
              {id:'image', label:'AI Image Generation', icon:'fas fa-image', active:true},
              {id:'video', label:'AI Video (Sora-2)', icon:'fas fa-video', active:false},
              {id:'story', label:'Story / Reel Ideas', icon:'fas fa-film', active:true},
              {id:'thread', label:'Thread / Carousel', icon:'fas fa-list', active:false},
            ].map(t => `
            <label class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-800 cursor-pointer">
              <input type="checkbox" ${t.active?'checked':''} class="w-4 h-4 accent-cyan-500">
              <i class="${t.icon} text-gray-400 w-4"></i>
              <span class="text-sm text-gray-300">${t.label}</span>
            </label>`).join('')}
          </div>
        </div>

        <button onclick="generateContent()" class="btn-primary w-full gradient-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 text-lg">
          <i class="fas fa-wand-magic-sparkles"></i>
          Generate Content
        </button>
      </div>

      <!-- Right: Generated Content Preview -->
      <div class="lg:col-span-2 space-y-5">
        <!-- Status Bar -->
        <div id="generateStatus" class="glass rounded-2xl p-4 flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <i class="fas fa-check text-green-400 text-sm"></i>
          </div>
          <div>
            <div class="text-white text-sm font-semibold">4 content pieces ready</div>
            <div class="text-gray-400 text-xs">Generated for Instagram, TikTok, Facebook, LinkedIn</div>
          </div>
          <div class="ml-auto flex gap-2">
            <button class="glass px-3 py-1.5 rounded-lg text-xs text-gray-300 hover:text-white flex items-center gap-1"><i class="fas fa-copy"></i> Copy All</button>
            <button onclick="scheduleAll()" class="gradient-primary text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 font-semibold"><i class="fas fa-calendar"></i> Schedule All</button>
          </div>
        </div>

        <!-- Content Cards -->
        <div id="contentCards" class="space-y-4">
          ${[
            {
              platform:'Instagram', icon:'fab fa-instagram', color:'from-pink-500 to-orange-500', textColor:'pink',
              type:'Caption + Image',
              content:`🚀 Introducing TechFlow Studio — The AI-powered project management tool that thinks like you do.

No more missed deadlines. No more chaotic workflows. Just pure, automated efficiency.

✅ Smart task prioritization
✅ AI deadline predictions  
✅ Auto-team assignments
✅ Real-time progress tracking

Try it FREE for 30 days 👇

#ProductivityTools #AITech #ProjectManagement #SaaS #WorkSmarter #TechFlow #Startup #Innovation #AIpowered #FutureOfWork`,
              reach: '12.4K followers'
            },
            {
              platform:'LinkedIn', icon:'fab fa-linkedin', color:'from-blue-700 to-blue-800', textColor:'blue',
              type:'Professional Post',
              content:`After 2 years of building, we're finally launching TechFlow Studio.

Here's what we learned the hard way about project management:

→ 68% of projects fail due to poor communication, not technical issues
→ Teams spend 3.7 hours/day on status updates alone
→ Deadline misses cost companies an avg. of $97K per project

TechFlow's AI solves all three. It automatically:
• Identifies communication gaps before they become problems
• Generates status reports in seconds
• Predicts deadline risks 2 weeks in advance

We're offering 50 founding member slots at 60% off.

Comment "FLOW" to get early access. 🔥`,
              reach: '4.2K connections'
            },
            {
              platform:'TikTok', icon:'fab fa-tiktok', color:'from-gray-800 to-black', textColor:'gray',
              type:'Video Script (60s)',
              content:`🎬 HOOK (0-3s): "What if your AI could manage your entire team for you?"

📽️ SCENE 1 (3-15s): Show chaotic project board → transformation to organized AI dashboard

📽️ SCENE 2 (15-35s): "Meet TechFlow. It predicts problems BEFORE they happen..."
• Show AI flagging a deadline risk
• Show auto-reassignment feature
• Show team getting notified instantly

📽️ SCENE 3 (35-50s): Split screen — stressed manager vs calm TechFlow user

🎯 CTA (50-60s): "Link in bio for your 30-day free trial"

🎵 Audio: Trending upbeat tech track
#TechTok #AItools #ProductivityHack #WorkFromHome`,
              reach: '34.5K followers'
            },
            {
              platform:'Facebook', icon:'fab fa-facebook', color:'from-blue-600 to-blue-700', textColor:'blue',
              type:'Engagement Post',
              content:`📊 Quick poll for business owners & managers:

What's your BIGGEST project management challenge?

A) Keeping track of deadlines 📅
B) Team communication 💬  
C) Resource allocation 🎯
D) Reporting & updates 📈

Drop your answer in the comments! We're building something that solves ALL of these... and we want your input.

P.S. Everyone who comments gets early access to our beta + a special founding member discount 🎁`,
              reach: '8.2K followers'
            },
          ].map(c => `
          <div class="glass rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all">
            <div class="bg-gradient-to-r from-gray-800 to-gray-800/50 px-5 py-3 flex items-center justify-between border-b border-gray-700">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center">
                  <i class="${c.icon} text-white text-sm"></i>
                </div>
                <div>
                  <span class="text-white font-semibold text-sm">${c.platform}</span>
                  <span class="text-gray-400 text-xs ml-2">· ${c.type}</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">${c.reach}</span>
                <button class="text-gray-400 hover:text-cyan-400 transition-colors p-1.5 rounded-lg hover:bg-gray-700" title="Copy" onclick="copyContent(this)"><i class="fas fa-copy text-xs"></i></button>
                <button class="text-gray-400 hover:text-green-400 transition-colors p-1.5 rounded-lg hover:bg-gray-700" title="Edit"><i class="fas fa-pen text-xs"></i></button>
                <button onclick="schedulePost(this)" class="gradient-primary text-white text-xs px-3 py-1 rounded-lg font-semibold">Schedule</button>
              </div>
            </div>
            <div class="p-5">
              <pre class="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">${c.content}</pre>
            </div>
          </div>`).join('')}
        </div>

        <!-- Image Generation Card -->
        <div class="glass rounded-2xl p-6 border border-purple-500/20">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <i class="fas fa-image text-purple-400"></i>
            </div>
            <div>
              <h3 class="text-white font-bold">AI Image Generation</h3>
              <p class="text-gray-400 text-xs">Custom branded visuals for your posts</p>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3 mb-4">
            ${[
              'Product hero shot, modern tech aesthetic, gradient blue background, professional',
              'Team collaboration scene, bright office, diverse people, innovative startup',
              'Abstract data visualization, cyan and blue neon glow, futuristic dark background'
            ].map((prompt, i) => `
            <div class="relative group cursor-pointer">
              <div class="aspect-square rounded-xl overflow-hidden bg-gradient-to-br ${['from-cyan-900 to-blue-900','from-purple-900 to-indigo-900','from-gray-800 to-gray-900'][i]} flex items-center justify-center border border-gray-700 group-hover:border-purple-500 transition-all">
                <div class="text-center p-2">
                  <i class="fas fa-image text-gray-600 text-2xl mb-2 block"></i>
                  <p class="text-gray-500 text-xs leading-tight">${['Product Hero', 'Team Photo', 'Abstract Art'][i]}</p>
                </div>
                <div class="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                  <button class="bg-purple-500 text-white text-xs px-3 py-1.5 rounded-lg font-semibold">Generate</button>
                </div>
              </div>
              <p class="text-gray-500 text-xs mt-1.5 truncate">${prompt.substring(0,35)}...</p>
            </div>`).join('')}
          </div>
          <button class="w-full border border-purple-500/40 text-purple-400 rounded-xl py-3 text-sm font-semibold hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2">
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
        b.className = b.className.replace('bg-cyan-500/20 border-cyan-500 text-cyan-400','border-gray-700 text-gray-400 hover:border-gray-500');
      });
      btn.className = btn.className.replace('border-gray-700 text-gray-400 hover:border-gray-500','bg-cyan-500/20 border-cyan-500 text-cyan-400');
    }

    function copyContent(btn) {
      const content = btn.closest('.glass').querySelector('pre').textContent;
      navigator.clipboard.writeText(content).then(() => {
        btn.innerHTML = '<i class="fas fa-check text-xs text-green-400"></i>';
        setTimeout(() => btn.innerHTML = '<i class="fas fa-copy text-xs"></i>', 2000);
      });
    }

    function schedulePost(btn) {
      btn.textContent = 'Scheduled ✓';
      btn.className = btn.className.replace('gradient-primary text-white','bg-green-500/20 text-green-400 border border-green-500/30');
    }

    function scheduleAll() {
      document.querySelectorAll('#contentCards button:last-of-type').forEach(btn => schedulePost(btn));
      const statusEl = document.getElementById('generateStatus');
      statusEl.innerHTML = \`
        <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
          <i class="fas fa-calendar-check text-green-400 text-sm"></i>
        </div>
        <div>
          <div class="text-white text-sm font-semibold">All posts scheduled!</div>
          <div class="text-gray-400 text-xs">4 posts added to your queue</div>
        </div>
        <a href="/scheduler" class="ml-auto gradient-primary text-white text-xs px-4 py-2 rounded-lg font-semibold">View Schedule →</a>
      \`;
    }

    function generateContent() {
      const status = document.getElementById('generateStatus');
      status.innerHTML = \`
        <div class="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
          <i class="fas fa-spinner fa-spin text-cyan-400 text-sm"></i>
        </div>
        <div>
          <div class="text-white text-sm font-semibold">AI is generating your content...</div>
          <div class="text-gray-400 text-xs">Creating custom posts for your brand</div>
        </div>
      \`;
      document.getElementById('contentCards').style.opacity = '0.4';
      setTimeout(() => {
        document.getElementById('contentCards').style.opacity = '1';
        status.innerHTML = \`
          <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <i class="fas fa-check text-green-400 text-sm"></i>
          </div>
          <div>
            <div class="text-white text-sm font-semibold">4 new content pieces generated!</div>
            <div class="text-gray-400 text-xs">Customized for Instagram, TikTok, Facebook, LinkedIn</div>
          </div>
          <div class="ml-auto flex gap-2">
            <button class="glass px-3 py-1.5 rounded-lg text-xs text-gray-300 hover:text-white flex items-center gap-1"><i class="fas fa-copy"></i> Copy All</button>
            <button onclick="scheduleAll()" class="gradient-primary text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 font-semibold"><i class="fas fa-calendar"></i> Schedule All</button>
          </div>
        \`;
      }, 2500);
    }
  </script>
  `
  return layout('AI Content Studio', content, 'content-studio')
}
