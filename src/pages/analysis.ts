import { layout } from './layout'

export function analysisPage(): string {
  const content = `
  <!-- Top Bar -->
  <div class="sticky top-0 z-30 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-8 py-4 flex items-center justify-between">
    <div>
      <h1 class="text-xl font-bold text-white">Website Analysis</h1>
      <p class="text-gray-400 text-sm">AI-powered business intelligence in 2 minutes</p>
    </div>
    <div class="flex items-center gap-2 text-sm text-gray-400">
      <i class="fas fa-bolt text-cyan-400"></i>
      <span>Powered by AI</span>
    </div>
  </div>

  <div class="p-8 max-w-5xl">
    <!-- URL Input Card -->
    <div class="glass rounded-3xl p-8 mb-8 border border-cyan-500/20 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
            <i class="fas fa-search text-white"></i>
          </div>
          <div>
            <h2 class="text-white font-bold text-xl">Analyze Your Website</h2>
            <p class="text-gray-400 text-sm">Get a complete business & marketing intelligence report</p>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <div class="flex-1 flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus-within:border-cyan-500 transition-colors">
            <i class="fas fa-globe text-gray-400"></i>
            <input id="urlInput" type="url" placeholder="https://yourbusiness.com" 
              class="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
              value="https://example-business.com">
          </div>
          <button id="analyzeBtn" onclick="runAnalysis()" class="btn-primary gradient-primary text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 whitespace-nowrap">
            <i class="fas fa-search"></i>
            Analyze Now
          </button>
        </div>
        <div class="flex flex-wrap gap-3 mt-4">
          <span class="flex items-center gap-1.5 text-xs text-gray-400"><i class="fas fa-check text-green-400"></i>SEO Audit</span>
          <span class="flex items-center gap-1.5 text-xs text-gray-400"><i class="fas fa-check text-green-400"></i>Branding Review</span>
          <span class="flex items-center gap-1.5 text-xs text-gray-400"><i class="fas fa-check text-green-400"></i>Growth Strategy</span>
          <span class="flex items-center gap-1.5 text-xs text-gray-400"><i class="fas fa-check text-green-400"></i>Revenue Projections</span>
          <span class="flex items-center gap-1.5 text-xs text-gray-400"><i class="fas fa-check text-green-400"></i>Content Ideas</span>
        </div>
      </div>
    </div>

    <!-- Loading State (hidden by default) -->
    <div id="loadingState" class="hidden text-center py-16">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary mb-6 animate-spin" style="animation-duration:2s">
        <i class="fas fa-search text-white text-2xl" style="animation:none"></i>
      </div>
      <h3 class="text-white text-xl font-bold mb-2">AI is Analyzing Your Website...</h3>
      <p class="text-gray-400 mb-6">Scanning SEO, branding, usability, and growth opportunities</p>
      <div class="max-w-sm mx-auto space-y-3">
        <div class="flex items-center gap-3 text-sm text-gray-400">
          <div class="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></div>
          <span id="loadStep">Scanning site structure...</span>
        </div>
        <div class="bg-gray-800 rounded-full h-2">
          <div id="loadProgress" class="gradient-primary h-2 rounded-full transition-all duration-500" style="width:0%"></div>
        </div>
      </div>
    </div>

    <!-- Results (hidden by default, shown after analysis) -->
    <div id="resultsSection" class="space-y-6">
      <!-- Score Overview -->
      <div class="glass rounded-2xl p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-white font-bold text-xl">Analysis Results</h3>
            <p id="analyzedUrl" class="text-cyan-400 text-sm font-medium mt-1"></p>
          </div>
          <div class="text-right">
            <div class="text-4xl font-black gradient-text" id="overallScore">--</div>
            <div class="text-gray-400 text-sm">Overall Score</div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          ${[
            {id:'seoScore', label:'SEO Score', icon:'fas fa-search', color:'cyan', tip:'Search engine optimization health'},
            {id:'brandScore', label:'Brand Score', icon:'fas fa-star', color:'purple', tip:'Brand identity strength'},
            {id:'usabilityScore', label:'Usability', icon:'fas fa-mouse-pointer', color:'green', tip:'User experience quality'},
          ].map(s => `
          <div class="bg-gray-800/50 rounded-xl p-4 text-center">
            <div class="w-10 h-10 rounded-xl bg-${s.color}-500/20 flex items-center justify-center mx-auto mb-3">
              <i class="${s.icon} text-${s.color}-400"></i>
            </div>
            <div class="text-2xl font-black text-white mb-1" id="${s.id}">--</div>
            <div class="text-gray-400 text-xs">${s.label}</div>
            <div class="bg-gray-700 rounded-full h-1.5 mt-2">
              <div id="${s.id}Bar" class="bg-${s.color}-500 h-1.5 rounded-full progress-bar" style="width:0%"></div>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Recommendations -->
        <div class="glass rounded-2xl p-6">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-9 h-9 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <i class="fas fa-lightbulb text-orange-400"></i>
            </div>
            <h3 class="text-white font-bold text-lg">AI Recommendations</h3>
          </div>
          <div id="recommendationsList" class="space-y-3"></div>
        </div>

        <!-- Growth Strategy -->
        <div class="glass rounded-2xl p-6">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-9 h-9 rounded-xl bg-green-500/20 flex items-center justify-center">
              <i class="fas fa-rocket text-green-400"></i>
            </div>
            <h3 class="text-white font-bold text-lg">Growth Strategy</h3>
          </div>
          <div class="space-y-4">
            <div class="bg-gray-800/50 rounded-xl p-4">
              <div class="text-xs text-gray-500 uppercase font-semibold mb-1">💰 Pricing Model</div>
              <div id="pricingStrategy" class="text-white text-sm"></div>
            </div>
            <div class="bg-gray-800/50 rounded-xl p-4">
              <div class="text-xs text-gray-500 uppercase font-semibold mb-1">📈 Revenue Outlook</div>
              <div id="revenueOutlook" class="text-white text-sm"></div>
            </div>
            <div class="bg-gray-800/50 rounded-xl p-4">
              <div class="text-xs text-gray-500 uppercase font-semibold mb-2">🎯 Action Plan</div>
              <div id="actionPlan" class="space-y-2"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Next Steps CTA -->
      <div class="gradient-primary rounded-2xl p-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 class="text-white font-bold text-xl">Ready to Act on These Insights?</h3>
            <p class="text-white/80 text-sm mt-1">Let AI create a month of custom content based on your analysis.</p>
          </div>
          <div class="flex gap-3">
            <a href="/content-studio" class="bg-white text-gray-900 font-bold px-6 py-3 rounded-xl text-sm hover:bg-gray-100 transition-all whitespace-nowrap">
              <i class="fas fa-wand-magic-sparkles mr-2"></i>Create Content
            </a>
            <a href="/scheduler" class="glass text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-white/20 transition-all whitespace-nowrap border border-white/30">
              <i class="fas fa-calendar mr-2"></i>Schedule Posts
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    let analysisRunning = false;

    async function runAnalysis() {
      if(analysisRunning) return;
      const url = document.getElementById('urlInput').value.trim();
      if(!url) { alert('Please enter a URL'); return; }

      analysisRunning = true;
      document.getElementById('analyzeBtn').disabled = true;
      document.getElementById('analyzeBtn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';

      // Hide results, show loading
      document.getElementById('resultsSection').classList.add('opacity-30');
      document.getElementById('loadingState').classList.remove('hidden');

      // Animate loading steps
      const steps = ['Scanning site structure...','Analyzing SEO signals...','Evaluating brand identity...','Generating growth strategy...','Compiling recommendations...'];
      let step = 0;
      const stepInterval = setInterval(() => {
        if(step < steps.length) {
          document.getElementById('loadStep').textContent = steps[step];
          document.getElementById('loadProgress').style.width = ((step+1)/steps.length*100) + '%';
          step++;
        } else clearInterval(stepInterval);
      }, 500);

      try {
        const resp = await fetch('/api/analyze', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ url })
        });
        const data = await resp.json();

        setTimeout(() => {
          clearInterval(stepInterval);
          document.getElementById('loadingState').classList.add('hidden');
          document.getElementById('resultsSection').classList.remove('opacity-30');

          // Populate results
          document.getElementById('analyzedUrl').textContent = '📊 ' + url;
          document.getElementById('overallScore').textContent = data.overallScore + '/100';
          
          const scores = {seoScore: data.seoScore, brandScore: data.brandScore, usabilityScore: data.usabilityScore};
          Object.entries(scores).forEach(([id, val]) => {
            document.getElementById(id).textContent = val + '/100';
            setTimeout(() => { document.getElementById(id+'Bar').style.width = val + '%'; }, 100);
          });

          // Recommendations
          const recList = document.getElementById('recommendationsList');
          recList.innerHTML = data.recommendations.map((r, i) => \`
            <div class="flex gap-3 p-3 bg-gray-800/50 rounded-xl">
              <div class="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-400 text-xs font-bold">\${i+1}</div>
              <p class="text-gray-300 text-sm leading-relaxed">\${r}</p>
            </div>
          \`).join('');

          // Strategy
          document.getElementById('pricingStrategy').textContent = data.strategy.pricing;
          document.getElementById('revenueOutlook').textContent = data.strategy.revenue;
          const actionPlan = document.getElementById('actionPlan');
          actionPlan.innerHTML = data.strategy.actions.map(a => \`
            <div class="flex items-center gap-2 text-sm text-gray-300">
              <i class="fas fa-arrow-right text-green-400 text-xs"></i>\${a}
            </div>
          \`).join('');

          analysisRunning = false;
          document.getElementById('analyzeBtn').disabled = false;
          document.getElementById('analyzeBtn').innerHTML = '<i class="fas fa-search"></i> Analyze Now';
        }, 3000);
      } catch(e) {
        document.getElementById('loadingState').classList.add('hidden');
        document.getElementById('resultsSection').classList.remove('opacity-30');
        analysisRunning = false;
        document.getElementById('analyzeBtn').disabled = false;
        document.getElementById('analyzeBtn').innerHTML = '<i class="fas fa-search"></i> Analyze Now';
      }
    }

    // Auto-run on page load to show demo
    window.addEventListener('load', () => { setTimeout(runAnalysis, 500); });
  </script>
  `
  return layout('Website Analysis', content, 'analysis')
}
