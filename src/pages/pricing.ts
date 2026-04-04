import { layout } from './layout'

export function pricingPage(): string {
  const features = [
    { feature: 'Website Analyses', s: '1/mo', p: 'Unlimited', b: 'Unlimited' },
    { feature: 'Social Accounts', s: '2', p: '8 (all platforms)', b: 'Unlimited' },
    { feature: 'Scheduled Posts', s: '10/mo', p: 'Unlimited', b: 'Unlimited' },
    { feature: 'AI Caption Generation', s: '5/mo', p: 'Unlimited', b: 'Unlimited' },
    { feature: 'AI Image Generation', s: '❌', p: '100/mo', b: '500/mo' },
    { feature: 'AI Video Generation', s: '❌', p: '10/mo', b: '50/mo' },
    { feature: 'Analytics Dashboard', s: 'Basic', p: 'Advanced', b: 'Advanced + White-label' },
    { feature: 'Brand Workspaces', s: '1', p: '1', b: '10' },
    { feature: 'Team Members', s: '1', p: '1', b: '5' },
    { feature: 'Custom Templates', s: '❌', p: '✅', b: '✅' },
    { feature: 'API Access', s: '❌', p: '❌', b: '✅' },
    { feature: 'Support', s: 'Community', p: 'Email', b: 'Priority 24/7' },
  ]
  const faqs = [
    { q: 'Can I cancel anytime?', a: 'Yes, absolutely. Cancel your subscription at any time with no questions asked. You\'ll retain access until the end of your billing period.' },
    { q: 'Is there a free trial?', a: 'The Pro plan comes with a 14-day free trial, no credit card required. Starter plan is free forever.' },
    { q: 'How does AI content generation work?', a: 'Our AI analyzes your website, industry, and past performance to create customized captions, hashtags, and content ideas tailored to your brand.' },
    { q: 'Can I connect all 8 platforms?', a: 'Yes! Pro and Business plans support all 8 platforms: Instagram, Facebook, TikTok, YouTube, X (Twitter), Threads, LinkedIn, and Pinterest.' },
    { q: 'How accurate is the website analysis?', a: 'Our AI scans 200+ SEO and marketing signals. Most users see actionable insights within 2 minutes of scanning their URL.' },
    { q: 'Do you offer refunds?', a: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied, contact support for a full refund.' },
  ]

  const content = `
  <!-- Top Bar -->
  <div style="position:sticky;top:0;z-index:30;background:rgba(3,8,24,0.85);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.07);padding:14px 28px;display:flex;align-items:center;justify-content:space-between;">
    <div>
      <h1 style="font-size:20px;font-weight:800;color:#fff;margin:0;">Pricing</h1>
      <p style="color:#9ca3af;font-size:13px;margin:2px 0 0;">Simple, transparent pricing. Cancel anytime.</p>
    </div>
  </div>

  <div style="padding:28px;max-width:1100px;">

    <!-- 💰 SAVINGS BANNER -->
    <div style="background:linear-gradient(135deg,rgba(0,229,255,0.1),rgba(124,58,237,0.08));border:1.5px solid rgba(0,229,255,0.3);border-radius:18px;padding:22px 28px;margin-bottom:32px;display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
      <div style="font-size:36px;">💰</div>
      <div style="flex:1;min-width:220px;">
        <div style="font-size:18px;font-weight:900;color:#fff;margin-bottom:6px;">
          Stop Paying <span style="text-decoration:line-through;color:#9ca3af;">$244/month</span> for Separate Tools
        </div>
        <div style="font-size:14px;color:#d1d5db;">Hootsuite + Buffer + Canva + Brand24 + SproutSocial + Later = $244/mo split across tools</div>
      </div>
      <div style="text-align:center;background:linear-gradient(135deg,rgba(0,229,255,0.15),rgba(124,58,237,0.12));border:1px solid rgba(0,229,255,0.3);border-radius:14px;padding:16px 24px;">
        <div style="font-size:13px;color:#00E5FF;font-weight:700;margin-bottom:4px;">Social Strategy Pro</div>
        <div style="font-size:32px;font-weight:900;color:#fff;line-height:1;">$79<span style="font-size:16px;color:#9ca3af;">/mo</span></div>
        <div style="font-size:13px;font-weight:800;color:#4ade80;margin-top:6px;">You save $165/mo · 68% cheaper</div>
        <div style="font-size:11px;color:#9ca3af;margin-top:2px;">Everything in one platform</div>
      </div>
    </div>

    <!-- Billing Toggle -->
    <div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:32px;">
      <span id="monthlyLabel" style="font-size:14px;font-weight:700;color:#fff;">Monthly</span>
      <button onclick="toggleBilling()" id="billingToggle" style="position:relative;width:52px;height:28px;background:#374151;border-radius:999px;border:none;cursor:pointer;transition:background 0.3s;">
        <div id="toggleDot" style="position:absolute;top:4px;left:4px;width:20px;height:20px;background:#00E5FF;border-radius:50%;transition:transform 0.3s;box-shadow:0 0 8px rgba(0,229,255,0.5);"></div>
      </button>
      <span id="annualLabel" style="font-size:14px;font-weight:700;color:#6b7280;">
        Annual <span style="background:rgba(74,222,128,0.15);color:#4ade80;font-size:11px;font-weight:700;padding:3px 8px;border-radius:20px;">Save 40%</span>
      </span>
    </div>

    <!-- Pricing Cards -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-bottom:40px;align-items:start;">

      <!-- Starter / Free -->
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:28px;transition:all 0.3s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
        <div style="margin-bottom:20px;">
          <div style="font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">Starter</div>
          <div style="font-size:40px;font-weight:900;color:#fff;margin-bottom:4px;">$0</div>
          <div style="font-size:13px;color:#9ca3af;">Forever free</div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:12px;margin-bottom:20px;font-size:13px;color:#d1d5db;line-height:1.5;">
          Perfect for trying out Social Strategy and small personal brands.
        </div>
        <ul style="list-style:none;padding:0;margin:0 0 24px;display:flex;flex-direction:column;gap:10px;">
          ${[
            { text: '1 website analysis per month', ok: true },
            { text: '2 connected social accounts', ok: true },
            { text: '10 scheduled posts/month', ok: true },
            { text: 'Basic analytics dashboard', ok: true },
            { text: 'AI caption generation (5/mo)', ok: true },
            { text: 'AI image generation', ok: false },
            { text: 'AI video generation', ok: false },
            { text: 'Unlimited posts', ok: false },
          ].map(f => `<li style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:${f.ok ? '#d1d5db' : '#4b5563'};${f.ok ? '' : 'text-decoration:line-through;'}">
            <i class="${f.ok ? 'fas fa-check' : 'fas fa-xmark'}" style="color:${f.ok ? '#4ade80' : '#374151'};margin-top:2px;flex-shrink:0;font-size:12px;"></i>${f.text}
          </li>`).join('')}
        </ul>
        <a href="/login" style="display:block;text-align:center;border:1px solid rgba(255,255,255,0.15);color:#d1d5db;font-weight:700;padding:12px;border-radius:12px;text-decoration:none;font-size:14px;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.06)'" onmouseout="this.style.background='transparent'">
          Get Started Free
        </a>
      </div>

      <!-- Pro (Popular) -->
      <div style="position:relative;background:linear-gradient(135deg,rgba(0,229,255,0.07),rgba(0,112,243,0.07),rgba(124,58,237,0.07));border:2px solid rgba(0,229,255,0.45);border-radius:24px;padding:28px;transition:all 0.3s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
        <div style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#00E5FF,#0070F3,#7C3AED);color:#fff;font-size:11px;font-weight:900;padding:6px 18px;border-radius:999px;white-space:nowrap;box-shadow:0 4px 14px rgba(0,229,255,0.3);">
          ⭐ MOST POPULAR
        </div>
        <div style="margin-bottom:20px;">
          <div style="font-size:12px;font-weight:700;background:linear-gradient(135deg,#00E5FF,#FF2D78);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">Pro</div>
          <div style="display:flex;align-items:flex-end;gap:6px;margin-bottom:4px;">
            <div style="font-size:40px;font-weight:900;color:#fff;" id="proPrice">$79</div>
            <div style="font-size:14px;color:#9ca3af;padding-bottom:6px;">/month</div>
          </div>
          <div style="font-size:13px;color:#9ca3af;" id="proBilled">Billed monthly</div>
        </div>
        <!-- Savings pill -->
        <div style="background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.2);border-radius:10px;padding:10px 14px;margin-bottom:18px;display:flex;align-items:center;gap:10px;">
          <span style="font-size:16px;">💰</span>
          <div>
            <div style="font-size:12px;font-weight:800;color:#4ade80;">Save $165/month vs. buying tools separately</div>
            <div style="font-size:11px;color:#6b7280;margin-top:1px;"><span style="text-decoration:line-through;">$244/mo</span> → $79/mo · 68% cheaper</div>
          </div>
        </div>
        <ul style="list-style:none;padding:0;margin:0 0 24px;display:flex;flex-direction:column;gap:10px;">
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
          ].map(f => `<li style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#e5e7eb;">
            <i class="fas fa-check" style="color:#00E5FF;margin-top:2px;flex-shrink:0;font-size:12px;"></i>${f}
          </li>`).join('')}
        </ul>
        <a href="/login" style="display:block;text-align:center;background:linear-gradient(135deg,#00E5FF,#0070F3,#7C3AED);color:#fff;font-weight:800;padding:14px;border-radius:12px;text-decoration:none;font-size:14px;box-shadow:0 6px 20px rgba(0,229,255,0.25);transition:opacity 0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
          Start Pro — 14 Day Free Trial
        </a>
        <p style="text-align:center;font-size:12px;color:#6b7280;margin:10px 0 0;">No credit card required</p>
      </div>

      <!-- Business -->
      <div style="background:rgba(124,58,237,0.06);border:1px solid rgba(124,58,237,0.3);border-radius:24px;padding:28px;transition:all 0.3s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
        <div style="margin-bottom:20px;">
          <div style="font-size:12px;font-weight:700;color:#A78BFA;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">Business</div>
          <div style="display:flex;align-items:flex-end;gap:6px;margin-bottom:4px;">
            <div style="font-size:40px;font-weight:900;color:#fff;" id="bizPrice">$149</div>
            <div style="font-size:14px;color:#9ca3af;padding-bottom:6px;">/month</div>
          </div>
          <div style="font-size:13px;color:#9ca3af;" id="bizBilled">Billed monthly</div>
        </div>
        <div style="background:rgba(124,58,237,0.1);border:1px solid rgba(124,58,237,0.2);border-radius:12px;padding:12px;margin-bottom:20px;font-size:13px;color:#d1d5db;line-height:1.5;">
          For agencies and teams managing multiple brands at scale.
        </div>
        <ul style="list-style:none;padding:0;margin:0 0 24px;display:flex;flex-direction:column;gap:10px;">
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
          ].map(f => `<li style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#e5e7eb;">
            <i class="fas fa-check" style="color:#A78BFA;margin-top:2px;flex-shrink:0;font-size:12px;"></i>${f}
          </li>`).join('')}
        </ul>
        <a href="/login" style="display:block;text-align:center;border:1px solid rgba(124,58,237,0.4);color:#A78BFA;font-weight:700;padding:12px;border-radius:12px;text-decoration:none;font-size:14px;transition:background 0.2s;" onmouseover="this.style.background='rgba(124,58,237,0.1)'" onmouseout="this.style.background='transparent'">
          Contact Sales
        </a>
      </div>
    </div>

    <!-- Trust badges -->
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:20px;margin-bottom:40px;">
      ${[
        { icon: 'fas fa-shield-halved', label: '30-Day Money-Back Guarantee', color: '#4ade80' },
        { icon: 'fas fa-lock', label: 'Bank-Level Encryption', color: '#00E5FF' },
        { icon: 'fas fa-rotate-left', label: 'Cancel Anytime', color: '#A78BFA' },
        { icon: 'fas fa-bolt', label: 'Instant Access', color: '#fbbf24' },
      ].map(b => `
      <div style="display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 16px;">
        <i class="${b.icon}" style="color:${b.color};font-size:14px;"></i>
        <span style="font-size:13px;color:#d1d5db;font-weight:600;">${b.label}</span>
      </div>`).join('')}
    </div>

    <!-- Feature Comparison Table -->
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:18px;overflow:hidden;margin-bottom:40px;">
      <div style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.07);">
        <h3 style="font-size:18px;font-weight:800;color:#fff;margin:0;">Full Feature Comparison</h3>
      </div>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.07);">
              <th style="padding:14px 24px;text-align:left;font-size:13px;color:#9ca3af;font-weight:600;width:45%;">Feature</th>
              <th style="padding:14px 20px;text-align:center;font-size:13px;color:#9ca3af;font-weight:600;">Starter</th>
              <th style="padding:14px 20px;text-align:center;font-size:13px;font-weight:800;background:linear-gradient(135deg,#00E5FF,#FF2D78);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Pro</th>
              <th style="padding:14px 20px;text-align:center;font-size:13px;color:#A78BFA;font-weight:600;">Business</th>
            </tr>
          </thead>
          <tbody>
            ${features.map((r, i) => `
            <tr style="border-bottom:1px solid rgba(255,255,255,0.04);${i % 2 === 0 ? '' : 'background:rgba(255,255,255,0.015);'}">
              <td style="padding:12px 24px;font-size:13px;color:#d1d5db;font-weight:500;">${r.feature}</td>
              <td style="padding:12px 20px;text-align:center;font-size:13px;color:#9ca3af;">${r.s}</td>
              <td style="padding:12px 20px;text-align:center;font-size:13px;color:#00E5FF;font-weight:700;">${r.p}</td>
              <td style="padding:12px 20px;text-align:center;font-size:13px;color:#A78BFA;font-weight:600;">${r.b}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- FAQ -->
    <div style="margin-bottom:40px;">
      <h3 style="font-size:22px;font-weight:800;color:#fff;text-align:center;margin-bottom:24px;">Frequently Asked Questions</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:900px;margin:0 auto;">
        ${faqs.map(f => `
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:18px;transition:border-color 0.2s;" onmouseover="this.style.borderColor='rgba(0,229,255,0.2)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)'">
          <h4 style="font-size:14px;font-weight:700;color:#fff;margin:0 0 8px;">${f.q}</h4>
          <p style="font-size:13px;color:#9ca3af;line-height:1.6;margin:0;">${f.a}</p>
        </div>`).join('')}
      </div>
    </div>

    <!-- CTA -->
    <div style="background:linear-gradient(135deg,#00E5FF 0%,#0070F3 50%,#7C3AED 100%);border-radius:24px;padding:40px;text-align:center;">
      <h2 style="font-size:28px;font-weight:900;color:#fff;margin:0 0 10px;">Start Growing Today</h2>
      <p style="color:rgba(255,255,255,0.8);font-size:15px;margin:0 0 28px;">Join 12,400+ businesses on autopilot. No credit card for Pro trial.</p>
      <div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;">
        <a href="/analysis" style="background:#fff;color:#0a0f1e;font-weight:800;padding:14px 28px;border-radius:14px;text-decoration:none;font-size:15px;display:flex;align-items:center;gap:8px;transition:opacity 0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
          <i class="fas fa-search"></i>Start Free Analysis
        </a>
        <a href="/dashboard" style="background:rgba(255,255,255,0.15);color:#fff;font-weight:700;padding:14px 28px;border-radius:14px;text-decoration:none;font-size:15px;border:1px solid rgba(255,255,255,0.3);transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.22)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">
          View Demo →
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
      const mLabel = document.getElementById('monthlyLabel');
      const aLabel = document.getElementById('annualLabel');
      if (isAnnual) {
        dot.style.transform = 'translateX(24px)';
        toggle.style.background = '#00E5FF';
        mLabel.style.color = '#6b7280';
        aLabel.style.color = '#fff';
        document.getElementById('proPrice').textContent = '$47';
        document.getElementById('proBilled').textContent = 'Billed annually ($564/yr)';
        document.getElementById('bizPrice').textContent = '$89';
        document.getElementById('bizBilled').textContent = 'Billed annually ($1,068/yr)';
      } else {
        dot.style.transform = 'translateX(0)';
        toggle.style.background = '#374151';
        mLabel.style.color = '#fff';
        aLabel.style.color = '#6b7280';
        document.getElementById('proPrice').textContent = '$79';
        document.getElementById('proBilled').textContent = 'Billed monthly';
        document.getElementById('bizPrice').textContent = '$149';
        document.getElementById('bizBilled').textContent = 'Billed monthly';
      }
    }
  </script>
  `
  return layout('Pricing', content, 'pricing')
}
