import { layout } from './layout'

export function pricingPage(): string {
  const content = `
  <!-- Top Bar -->
  <div class="sticky top-0 z-30 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-8 py-4 flex items-center justify-between">
    <div>
      <h1 class="text-xl font-bold text-white">Pricing</h1>
      <p class="text-gray-400 text-sm">Simple, transparent pricing. Cancel anytime.</p>
    </div>
  </div>

  <div class="p-8 max-w-6xl">
    <!-- Toggle -->
    <div class="flex items-center justify-center gap-4 mb-12">
      <span id="monthlyLabel" class="text-white font-semibold text-sm">Monthly</span>
      <button onclick="toggleBilling()" id="billingToggle" class="relative w-14 h-7 bg-gray-700 rounded-full transition-colors focus:outline-none cursor-pointer">
        <div id="toggleDot" class="absolute top-1 left-1 w-5 h-5 bg-cyan-400 rounded-full transition-transform shadow-lg"></div>
      </button>
      <span id="annualLabel" class="text-gray-400 font-semibold text-sm">
        Annual <span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full ml-1 font-bold">Save 40%</span>
      </span>
    </div>

    <!-- Pricing Cards -->
    <div class="grid md:grid-cols-3 gap-6 mb-12">
      <!-- Free -->
      <div class="glass rounded-3xl p-8 border border-gray-700 card-hover">
        <div class="mb-6">
          <div class="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Starter</div>
          <div class="text-4xl font-black text-white mb-1">$0</div>
          <div class="text-gray-400 text-sm">Forever free</div>
        </div>
        <div class="bg-gray-800 rounded-xl p-3 mb-6 text-sm text-gray-300 leading-relaxed">
          Perfect for trying out SOCIAL STRATEGY and small personal brands.
        </div>
        <ul class="space-y-3 mb-8">
          ${[
            {text:'1 website analysis per month', ok:true},
            {text:'2 connected social accounts', ok:true},
            {text:'10 scheduled posts/month', ok:true},
            {text:'Basic analytics dashboard', ok:true},
            {text:'AI caption generation (5/mo)', ok:true},
            {text:'AI image generation', ok:false},
            {text:'AI video generation', ok:false},
            {text:'Unlimited posts', ok:false},
            {text:'Advanced analytics', ok:false},
            {text:'Multi-brand management', ok:false},
          ].map(f => `
          <li class="flex items-center gap-3 text-sm ${f.ok?'text-gray-300':'text-gray-600 line-through'}">
            <i class="${f.ok?'fas fa-check text-green-400':'fas fa-xmark text-gray-700'}"></i>
            ${f.text}
          </li>`).join('')}
        </ul>
        <a href="/dashboard" class="block w-full text-center border border-gray-600 text-gray-300 font-semibold py-3 rounded-xl hover:bg-gray-800 transition-all">
          Get Started Free
        </a>
      </div>

      <!-- Pro (Popular) -->
      <div class="relative rounded-3xl p-8 card-hover" style="background:linear-gradient(135deg,rgba(0,229,255,0.08) 0%,rgba(0,112,243,0.08) 50%,rgba(124,58,237,0.08) 100%);border:2px solid rgba(0,229,255,0.4)">
        <div class="absolute -top-4 left-1/2 -translate-x-1/2">
          <div class="gradient-primary text-white text-xs font-black px-6 py-2 rounded-full shadow-lg whitespace-nowrap">
            ⭐ MOST POPULAR
          </div>
        </div>
        <div class="mb-6">
          <div class="gradient-text text-sm font-semibold uppercase tracking-wider mb-2">Pro</div>
          <div class="flex items-end gap-2 mb-1">
            <div class="text-4xl font-black text-white" id="proPrice">$49</div>
            <div class="text-gray-400 text-sm pb-1">/month</div>
          </div>
          <div class="text-gray-400 text-sm" id="proBilled">Billed monthly</div>
        </div>
        <div class="gradient-card rounded-xl p-3 mb-6 text-sm text-gray-300 leading-relaxed border border-cyan-500/20">
          Everything you need to grow your business on autopilot.
        </div>
        <ul class="space-y-3 mb-8">
          ${[
            'Unlimited website analyses',
            'All 8 platforms connected',
            'Unlimited scheduled posts',
            'Advanced analytics & reports',
            'Unlimited AI caption generation',
            'AI image generation (100/mo)',
            'AI video generation (10/mo)',
            'Custom content templates',
            'Priority posting queue',
            'Email support',
          ].map(f => `
          <li class="flex items-center gap-3 text-sm text-gray-200">
            <i class="fas fa-check text-cyan-400"></i>${f}
          </li>`).join('')}
        </ul>
        <a href="/dashboard" class="block w-full text-center gradient-primary text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20">
          Start Pro — 14 Day Free Trial
        </a>
        <p class="text-center text-xs text-gray-500 mt-3">No credit card required</p>
      </div>

      <!-- Business -->
      <div class="glass rounded-3xl p-8 border border-purple-500/30 card-hover">
        <div class="mb-6">
          <div class="text-purple-400 text-sm font-semibold uppercase tracking-wider mb-2">Business</div>
          <div class="flex items-end gap-2 mb-1">
            <div class="text-4xl font-black text-white" id="bizPrice">$149</div>
            <div class="text-gray-400 text-sm pb-1">/month</div>
          </div>
          <div class="text-gray-400 text-sm" id="bizBilled">Billed monthly</div>
        </div>
        <div class="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 mb-6 text-sm text-gray-300 leading-relaxed">
          For agencies and teams managing multiple brands at scale.
        </div>
        <ul class="space-y-3 mb-8">
          ${[
            'Everything in Pro',
            'Up to 10 brand workspaces',
            'Team collaboration (5 seats)',
            'White-label PDF reports',
            'AI image generation (500/mo)',
            'AI video generation (50/mo)',
            'Custom domain reports',
            'Dedicated account manager',
            'API access',
            'Priority 24/7 support',
          ].map(f => `
          <li class="flex items-center gap-3 text-sm text-gray-200">
            <i class="fas fa-check text-purple-400"></i>${f}
          </li>`).join('')}
        </ul>
        <a href="/dashboard" class="block w-full text-center border border-purple-500/40 text-purple-400 font-bold py-3 rounded-xl hover:bg-purple-500/10 transition-all">
          Contact Sales
        </a>
      </div>
    </div>

    <!-- Feature Comparison -->
    <div class="glass rounded-2xl overflow-hidden mb-12">
      <div class="px-6 py-5 border-b border-gray-800">
        <h3 class="text-white font-bold text-xl">Full Feature Comparison</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-800">
              <th class="px-6 py-4 text-left text-sm text-gray-400 font-semibold w-1/2">Feature</th>
              <th class="px-6 py-4 text-center text-sm text-gray-400 font-semibold">Starter</th>
              <th class="px-6 py-4 text-center text-sm gradient-text font-bold">Pro</th>
              <th class="px-6 py-4 text-center text-sm text-purple-400 font-semibold">Business</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800/50">
            ${[
              {feature:'Website Analyses', s:'1/mo', p:'Unlimited', b:'Unlimited'},
              {feature:'Social Accounts', s:'2', p:'8 (all platforms)', b:'Unlimited'},
              {feature:'Scheduled Posts', s:'10/mo', p:'Unlimited', b:'Unlimited'},
              {feature:'AI Caption Generation', s:'5/mo', p:'Unlimited', b:'Unlimited'},
              {feature:'AI Image Generation', s:'❌', p:'100/mo', b:'500/mo'},
              {feature:'AI Video Generation', s:'❌', p:'10/mo', b:'50/mo'},
              {feature:'Analytics Dashboard', s:'Basic', p:'Advanced', b:'Advanced + White-label'},
              {feature:'Brand Workspaces', s:'1', p:'1', b:'10'},
              {feature:'Team Members', s:'1', p:'1', b:'5'},
              {feature:'Custom Templates', s:'❌', p:'✅', b:'✅'},
              {feature:'API Access', s:'❌', p:'❌', b:'✅'},
              {feature:'Support', s:'Community', p:'Email', b:'Priority 24/7'},
            ].map(r => `
            <tr class="hover:bg-gray-800/20 transition-all">
              <td class="px-6 py-3.5 text-sm text-gray-300 font-medium">${r.feature}</td>
              <td class="px-6 py-3.5 text-center text-sm text-gray-400">${r.s}</td>
              <td class="px-6 py-3.5 text-center text-sm text-cyan-400 font-semibold">${r.p}</td>
              <td class="px-6 py-3.5 text-center text-sm text-purple-400 font-semibold">${r.b}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- FAQ -->
    <div class="mb-12">
      <h3 class="text-white font-bold text-2xl text-center mb-8">Frequently Asked Questions</h3>
      <div class="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        ${[
          {q:'Can I cancel anytime?', a:'Yes, absolutely. Cancel your subscription at any time with no questions asked. You\'ll retain access until the end of your billing period.'},
          {q:'Is there a free trial?', a:'The Pro plan comes with a 14-day free trial, no credit card required. Starter plan is free forever.'},
          {q:'How does AI content generation work?', a:'Our AI analyzes your website, industry, and past performance to create customized captions, hashtags, and content ideas tailored to your brand.'},
          {q:'Can I connect all 8 platforms?', a:'Yes! Pro and Business plans support all 8 platforms: Instagram, Facebook, TikTok, YouTube, X (Twitter), Threads, LinkedIn, and Pinterest.'},
          {q:'How accurate is the website analysis?', a:'Our AI scans 200+ SEO and marketing signals. Most users see actionable insights within 2 minutes of scanning their URL.'},
          {q:'Do you offer refunds?', a:'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied, contact support for a full refund.'},
        ].map(f => `
        <div class="glass rounded-xl p-5 hover:border-gray-600 border border-gray-700/50 transition-all">
          <h4 class="text-white font-semibold mb-2">${f.q}</h4>
          <p class="text-gray-400 text-sm leading-relaxed">${f.a}</p>
        </div>`).join('')}
      </div>
    </div>

    <!-- CTA -->
    <div class="gradient-primary rounded-3xl p-10 text-center">
      <h2 class="text-3xl font-black text-white mb-3">Start Growing Today</h2>
      <p class="text-white/80 mb-8">Join 12,400+ businesses on autopilot. No credit card for Pro trial.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/analysis" class="bg-white text-gray-900 font-bold px-8 py-4 rounded-2xl text-lg hover:bg-gray-100 transition-all">
          <i class="fas fa-search mr-2"></i>Start Free Analysis
        </a>
        <a href="/dashboard" class="glass text-white font-semibold px-8 py-4 rounded-2xl text-lg hover:bg-white/20 transition-all border border-white/30">
          View Dashboard Demo
        </a>
      </div>
    </div>
  </div>

  <script>
    let isAnnual = false;
    function toggleBilling() {
      isAnnual = !isAnnual;
      const dot = document.getElementById('toggleDot');
      const toggle = document.getElementById('billingToggle');
      const monthLabel = document.getElementById('monthlyLabel');
      const annualLabel = document.getElementById('annualLabel');
      
      if(isAnnual) {
        dot.style.transform = 'translateX(28px)';
        toggle.style.background = '#00E5FF';
        monthLabel.className = 'text-gray-400 font-semibold text-sm';
        annualLabel.className = 'text-white font-semibold text-sm';
        document.getElementById('proPrice').textContent = '$29';
        document.getElementById('proBilled').textContent = 'Billed annually ($348/yr)';
        document.getElementById('bizPrice').textContent = '$89';
        document.getElementById('bizBilled').textContent = 'Billed annually ($1,068/yr)';
      } else {
        dot.style.transform = 'translateX(0)';
        toggle.style.background = '#374151';
        monthLabel.className = 'text-white font-semibold text-sm';
        annualLabel.className = 'text-gray-400 font-semibold text-sm';
        document.getElementById('proPrice').textContent = '$49';
        document.getElementById('proBilled').textContent = 'Billed monthly';
        document.getElementById('bizPrice').textContent = '$149';
        document.getElementById('bizBilled').textContent = 'Billed monthly';
      }
    }
  </script>
  `
  return layout('Pricing', content, 'pricing')
}
