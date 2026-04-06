import { ssLogo } from './layout'

function pageShell(title: string, content: string): string {
  const navLogo = ssLogo(46)
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} – Social Strategy</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *{font-family:'Inter',sans-serif;box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{background:linear-gradient(145deg,#080420 0%,#0d0530 25%,#06122a 50%,#100525 75%,#080420 100%);color:#fff;overflow-x:hidden;min-height:100vh;}
    body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
      background-image:linear-gradient(rgba(0,229,255,0.04) 1px,transparent 1px),
        linear-gradient(90deg,rgba(0,229,255,0.04) 1px,transparent 1px);
      background-size:50px 50px;}
    ::-webkit-scrollbar{width:6px;}
    ::-webkit-scrollbar-track{background:#080420;}
    ::-webkit-scrollbar-thumb{background:linear-gradient(#FF2D78,#7C3AED);border-radius:3px;}

    /* Navbar */
    .navbar{position:fixed;top:0;left:0;right:0;z-index:100;
      background:rgba(8,4,32,0.95);backdrop-filter:blur(20px);
      border-bottom:1px solid rgba(0,229,255,0.18);}
    .navbar-inner{max-width:1200px;margin:0 auto;padding:0 24px;height:64px;
      display:flex;align-items:center;gap:16px;}
    .navbar-logo{flex-shrink:0;display:flex;align-items:center;gap:10px;text-decoration:none;}
    .nav-back{margin-left:auto;display:inline-flex;align-items:center;gap:8px;
      font-size:13px;font-weight:700;padding:9px 20px;border-radius:999px;
      text-decoration:none;color:#00E5FF;border:2px solid #00E5FF;
      background:linear-gradient(135deg,rgba(0,229,255,0.12),rgba(0,112,243,0.08));
      box-shadow:0 0 14px rgba(0,229,255,0.3);transition:all .2s;}
    .nav-back:hover{background:rgba(0,229,255,0.22);box-shadow:0 0 28px rgba(0,229,255,0.6);transform:translateY(-2px);}

    /* Content */
    .page-wrap{max-width:860px;margin:0 auto;padding:100px 28px 80px;position:relative;z-index:1;}
    .page-hero{text-align:center;margin-bottom:56px;}
    .page-badge{display:inline-block;background:rgba(0,229,255,0.1);border:2px solid rgba(0,229,255,0.4);
      border-radius:999px;padding:10px 26px;font-size:13px;color:#00E5FF;font-weight:800;
      margin-bottom:20px;box-shadow:0 0 20px rgba(0,229,255,0.2);}
    .page-title{font-size:clamp(32px,5vw,56px);font-weight:900;line-height:1.1;margin-bottom:16px;}
    .page-subtitle{color:rgba(255,255,255,0.6);font-size:17px;line-height:1.7;}
    .page-updated{margin-top:12px;font-size:13px;color:rgba(255,255,255,0.35);}

    /* Sections */
    .section{background:rgba(255,255,255,0.03);border:1.5px solid rgba(0,229,255,0.12);
      border-radius:20px;padding:36px 40px;margin-bottom:28px;
      box-shadow:0 4px 40px rgba(0,0,0,0.3);}
    .section h2{font-size:20px;font-weight:800;color:#00E5FF;margin-bottom:16px;
      text-shadow:0 0 16px rgba(0,229,255,0.5);}
    .section h3{font-size:16px;font-weight:700;color:#A78BFA;margin:20px 0 10px;}
    .section p{color:rgba(255,255,255,0.72);font-size:15px;line-height:1.9;margin-bottom:14px;}
    .section p:last-child{margin-bottom:0;}
    .section ul{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:14px;}
    .section ul li{display:flex;align-items:flex-start;gap:12px;color:rgba(255,255,255,0.72);font-size:15px;line-height:1.7;}
    .section ul li::before{content:'';width:8px;height:8px;border-radius:50%;
      background:linear-gradient(135deg,#00E5FF,#7C3AED);flex-shrink:0;margin-top:7px;
      box-shadow:0 0 8px rgba(0,229,255,0.6);}
    .section a{color:#00E5FF;text-decoration:none;}
    .section a:hover{text-decoration:underline;}
    .highlight-box{background:rgba(0,229,255,0.07);border:1.5px solid rgba(0,229,255,0.25);
      border-radius:14px;padding:20px 24px;margin:18px 0;}
    .highlight-box p{color:rgba(200,230,255,0.85);}

    /* FAQ specific */
    .faq-item{background:rgba(255,255,255,0.03);border:1.5px solid rgba(124,58,237,0.2);
      border-radius:16px;padding:28px 32px;margin-bottom:16px;
      transition:border-color .2s;}
    .faq-item:hover{border-color:rgba(124,58,237,0.5);}
    .faq-q{font-size:17px;font-weight:800;color:#fff;margin-bottom:12px;}
    .faq-a{color:rgba(255,255,255,0.7);font-size:15px;line-height:1.8;}

    /* Footer CTA */
    .page-cta{text-align:center;margin-top:56px;padding:48px 32px;
      background:linear-gradient(135deg,rgba(0,229,255,0.08),rgba(124,58,237,0.08),rgba(255,45,120,0.08));
      border:1.5px solid rgba(0,229,255,0.2);border-radius:24px;}
    .page-cta h3{font-size:26px;font-weight:900;margin-bottom:12px;}
    .page-cta p{color:rgba(255,255,255,0.6);margin-bottom:28px;}
    .btn-cta{display:inline-flex;align-items:center;gap:10px;
      background:linear-gradient(135deg,#FF2D78,#C026D3,#7C3AED);
      color:#fff;font-size:16px;font-weight:800;padding:16px 36px;border-radius:999px;
      text-decoration:none;box-shadow:0 0 28px rgba(255,45,120,0.5);transition:all .25s;}
    .btn-cta:hover{transform:translateY(-3px);box-shadow:0 0 48px rgba(255,45,120,0.8);}

    @media(max-width:600px){
      .section{padding:24px 20px;}
      .page-wrap{padding:88px 16px 60px;}
      .navbar-inner{padding:0 16px;}
    }
  </style>
</head>
<body>
<nav class="navbar">
  <div class="navbar-inner">
    <a href="/" class="navbar-logo">
      <div style="position:relative;display:inline-block;">
        <div style="position:absolute;inset:-4px;border-radius:18px;
          background:linear-gradient(135deg,#3dd4e8,#1ab8cc,#ff4fa0,#e8006a,#3dd4e8);
          filter:blur(4px) brightness(1.2);z-index:0;
          box-shadow:0 0 14px rgba(61,212,232,0.6),0 0 24px rgba(255,79,160,0.4);"></div>
        <div style="position:relative;z-index:1;">${navLogo}</div>
      </div>
      <div style="line-height:1.2;">
        <div style="font-size:14px;font-weight:900;color:#fff;letter-spacing:2px;">SOCIAL</div>
        <div style="font-size:14px;font-weight:900;letter-spacing:2px;background:linear-gradient(135deg,#00E5FF,#FF2D78,#FFD600);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">STRATEGY</div>
      </div>
    </a>
    <a href="/" class="nav-back">← Back to Home</a>
  </div>
</nav>

<div class="page-wrap">
  ${content}

  <div class="page-cta">
    <h3>Ready to Grow Your Business?</h3>
    <p>Join 12,400+ businesses using Social Strategy to automate their marketing.</p>
    <a href="/login" class="btn-cta">🚀 Start Free Today</a>
  </div>
</div>
</body>
</html>`
}

// ─── PRIVACY POLICY ───────────────────────────────────────────────────────────
export function privacyPage(): string {
  return pageShell('Privacy Policy', `
    <div class="page-hero">
      <div class="page-badge">🔒 Privacy Policy</div>
      <h1 class="page-title">Your Privacy <span style="background:linear-gradient(135deg,#00E5FF,#A78BFA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Matters</span></h1>
      <p class="page-subtitle">We are committed to protecting your personal information and being transparent about what we collect and how we use it.</p>
      <p class="page-updated">Last updated: 1 April 2026</p>
    </div>

    <div class="section">
      <h2>1. Information We Collect</h2>
      <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
      <h3>Account Information</h3>
      <ul>
        <li>Name and email address when you register</li>
        <li>Payment information (processed securely via Stripe — we never store card numbers)</li>
        <li>Profile details and preferences you choose to provide</li>
      </ul>
      <h3>Usage Data</h3>
      <ul>
        <li>Pages and features you access within the platform</li>
        <li>Content you create, schedule, or publish</li>
        <li>Analytics reports and scan results generated for your accounts</li>
        <li>Log data including IP address, browser type, and device information</li>
      </ul>
      <h3>Social Media Data</h3>
      <ul>
        <li>OAuth tokens for platforms you connect (Instagram, TikTok, etc.)</li>
        <li>Public profile metrics fetched via official platform APIs</li>
        <li>Post performance data to power your analytics dashboard</li>
      </ul>
    </div>

    <div class="section">
      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To provide, maintain and improve the Social Strategy platform</li>
        <li>To generate AI-powered analysis reports and content recommendations</li>
        <li>To schedule and publish posts on your connected social accounts</li>
        <li>To send you service updates, security alerts, and support messages</li>
        <li>To process payments and manage your subscription</li>
        <li>To comply with legal obligations</li>
      </ul>
      <div class="highlight-box">
        <p><strong style="color:#00E5FF;">We never sell your data.</strong> Your personal information is never sold, rented, or traded to third parties for their marketing purposes.</p>
      </div>
    </div>

    <div class="section">
      <h2>3. Data Sharing</h2>
      <p>We share your information only in the following limited circumstances:</p>
      <ul>
        <li><strong>Service Providers:</strong> Trusted partners who help operate our platform (e.g. cloud hosting, payment processing, email delivery)</li>
        <li><strong>Social Platforms:</strong> Data shared with Instagram, TikTok, Facebook, etc. only as needed to post on your behalf via their official APIs</li>
        <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect the rights and safety of our users</li>
        <li><strong>Business Transfers:</strong> In the event of a merger or acquisition, with appropriate notice to users</li>
      </ul>
    </div>

    <div class="section">
      <h2>4. Data Security</h2>
      <p>We use industry-standard security measures to protect your data:</p>
      <ul>
        <li>AES-256 encryption for data at rest</li>
        <li>TLS 1.3 encryption for all data in transit</li>
        <li>Secure OAuth 2.0 flows for all social media connections</li>
        <li>Regular security audits and penetration testing</li>
        <li>Two-factor authentication available for all accounts</li>
      </ul>
    </div>

    <div class="section">
      <h2>5. Your Rights</h2>
      <p>Depending on your location, you may have the following rights:</p>
      <ul>
        <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
        <li><strong>Correction:</strong> Ask us to correct inaccurate or incomplete data</li>
        <li><strong>Deletion:</strong> Request deletion of your personal data ("right to be forgotten")</li>
        <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
        <li><strong>Objection:</strong> Object to certain processing of your data</li>
      </ul>
      <p>To exercise any of these rights, contact us at <a href="mailto:privacy@socialstrategyapp.com.au">privacy@socialstrategyapp.com.au</a></p>
    </div>

    <div class="section">
      <h2>6. Cookies</h2>
      <p>We use essential cookies to keep you logged in and remember your preferences. We do not use third-party advertising cookies. You can clear cookies at any time through your browser settings.</p>
    </div>

    <div class="section">
      <h2>7. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us:</p>
      <ul>
        <li>Email: <a href="mailto:privacy@socialstrategyapp.com.au">privacy@socialstrategyapp.com.au</a></li>
        <li>Website: <a href="https://socialstrategyapp.com.au" target="_blank">socialstrategyapp.com.au</a></li>
      </ul>
    </div>
  `)
}

// ─── TERMS OF SERVICE ─────────────────────────────────────────────────────────
export function termsPage(): string {
  return pageShell('Terms of Service', `
    <div class="page-hero">
      <div class="page-badge">📋 Terms of Service</div>
      <h1 class="page-title">Terms of <span style="background:linear-gradient(135deg,#FF2D78,#C026D3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Service</span></h1>
      <p class="page-subtitle">Please read these terms carefully before using Social Strategy. By accessing our platform, you agree to be bound by these terms.</p>
      <p class="page-updated">Last updated: 1 April 2026</p>
    </div>

    <div class="section">
      <h2>1. Acceptance of Terms</h2>
      <p>By creating an account or using Social Strategy ("the Service"), you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use the Service.</p>
      <p>We may update these terms from time to time. Continued use of the Service after changes constitutes your acceptance of the updated terms.</p>
    </div>

    <div class="section">
      <h2>2. Description of Service</h2>
      <p>Social Strategy is an AI-powered social media marketing platform that provides:</p>
      <ul>
        <li>Website and brand analysis using AI</li>
        <li>Social media content creation and scheduling</li>
        <li>Multi-platform post automation (Instagram, TikTok, Facebook, YouTube, X, Threads, LinkedIn, Pinterest)</li>
        <li>Analytics and performance tracking</li>
        <li>AI-generated growth strategies and recommendations</li>
      </ul>
    </div>

    <div class="section">
      <h2>3. Account Responsibilities</h2>
      <ul>
        <li>You must be at least 18 years old to use this Service</li>
        <li>You are responsible for maintaining the security of your account and password</li>
        <li>You are responsible for all activity that occurs under your account</li>
        <li>You must provide accurate and complete information when creating your account</li>
        <li>You may not share your account with others or create multiple free accounts</li>
      </ul>
    </div>

    <div class="section">
      <h2>4. Acceptable Use</h2>
      <p>You agree NOT to use Social Strategy to:</p>
      <ul>
        <li>Post spam, misleading content, or engage in inauthentic behaviour on social platforms</li>
        <li>Violate the terms of service of any connected social media platform</li>
        <li>Infringe the intellectual property rights of others</li>
        <li>Harass, threaten, or harm other individuals</li>
        <li>Attempt to reverse-engineer, hack, or disrupt our systems</li>
        <li>Use the Service for any unlawful purpose</li>
      </ul>
      <div class="highlight-box">
        <p>Violation of these terms may result in immediate account suspension or termination without refund.</p>
      </div>
    </div>

    <div class="section">
      <h2>5. Subscriptions & Payments</h2>
      <ul>
        <li>Subscriptions are billed monthly or annually in advance</li>
        <li>All prices are in Australian Dollars (AUD) unless stated otherwise</li>
        <li>You may cancel your subscription at any time; cancellation takes effect at the end of the current billing period</li>
        <li>Refunds are available within 7 days of initial purchase if you have not used more than 10% of your credit allowance</li>
        <li>We reserve the right to change pricing with 30 days notice</li>
      </ul>
    </div>

    <div class="section">
      <h2>6. AI-Generated Content</h2>
      <p>Content generated by our AI tools is provided as a starting point. You are responsible for reviewing and approving all content before publishing. We do not guarantee the accuracy, completeness, or suitability of AI-generated content for your specific use case.</p>
    </div>

    <div class="section">
      <h2>7. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law, Social Strategy shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability shall not exceed the amount you paid in the 3 months preceding the claim.</p>
    </div>

    <div class="section">
      <h2>8. Governing Law</h2>
      <p>These terms are governed by the laws of Queensland, Australia. Any disputes shall be subject to the exclusive jurisdiction of the courts of Queensland.</p>
    </div>

    <div class="section">
      <h2>9. Contact</h2>
      <p>For questions about these terms: <a href="mailto:legal@socialstrategyapp.com.au">legal@socialstrategyapp.com.au</a></p>
    </div>
  `)
}

// ─── GDPR ─────────────────────────────────────────────────────────────────────
export function gdprPage(): string {
  return pageShell('GDPR Compliance', `
    <div class="page-hero">
      <div class="page-badge">🇪🇺 GDPR Compliance</div>
      <h1 class="page-title">GDPR <span style="background:linear-gradient(135deg,#7C3AED,#A78BFA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Compliance</span></h1>
      <p class="page-subtitle">Social Strategy is committed to full compliance with the General Data Protection Regulation (GDPR) for users in the European Union and European Economic Area.</p>
      <p class="page-updated">Last updated: 1 April 2026</p>
    </div>

    <div class="section">
      <h2>Our Commitment to GDPR</h2>
      <p>The General Data Protection Regulation (EU) 2016/679 gives EU/EEA residents strong rights over their personal data. We take these obligations seriously and have built our platform with privacy by design.</p>
      <div class="highlight-box">
        <p><strong style="color:#A78BFA;">Data Controller:</strong> Social Strategy Pty Ltd, Queensland, Australia</p>
      </div>
    </div>

    <div class="section">
      <h2>Legal Basis for Processing</h2>
      <p>We process your personal data under the following legal bases:</p>
      <ul>
        <li><strong>Contract Performance:</strong> Processing necessary to provide the services you've subscribed to</li>
        <li><strong>Legitimate Interest:</strong> Improving our platform, preventing fraud, and ensuring security</li>
        <li><strong>Consent:</strong> Where you've explicitly agreed (e.g. marketing emails) — always freely withdrawable</li>
        <li><strong>Legal Obligation:</strong> Where required by applicable law</li>
      </ul>
    </div>

    <div class="section">
      <h2>Your GDPR Rights</h2>
      <ul>
        <li><strong>Right of Access (Art. 15):</strong> Request a full copy of your personal data within 30 days</li>
        <li><strong>Right to Rectification (Art. 16):</strong> Correct inaccurate or incomplete data</li>
        <li><strong>Right to Erasure (Art. 17):</strong> Request deletion of your data ("right to be forgotten")</li>
        <li><strong>Right to Restriction (Art. 18):</strong> Request we limit how we process your data</li>
        <li><strong>Right to Portability (Art. 20):</strong> Receive your data in a structured, machine-readable format</li>
        <li><strong>Right to Object (Art. 21):</strong> Object to processing based on legitimate interest</li>
        <li><strong>Rights re: Automated Decisions (Art. 22):</strong> Not be subject to solely automated decisions with significant effects</li>
      </ul>
      <p>To exercise any right, email <a href="mailto:gdpr@socialstrategyapp.com.au">gdpr@socialstrategyapp.com.au</a>. We respond within 30 days.</p>
    </div>

    <div class="section">
      <h2>Data Retention</h2>
      <ul>
        <li>Account data: retained while your account is active, deleted within 30 days of account closure</li>
        <li>Billing records: retained for 7 years as required by financial regulations</li>
        <li>Analytics data: aggregated after 12 months, personal identifiers removed</li>
        <li>Backup copies: purged within 90 days of deletion request</li>
      </ul>
    </div>

    <div class="section">
      <h2>International Data Transfers</h2>
      <p>Our platform is hosted on Cloudflare's global edge network. Data may be processed in data centres outside the EU. All transfers are safeguarded by:</p>
      <ul>
        <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
        <li>Cloudflare's GDPR Data Processing Addendum</li>
        <li>End-to-end encryption for all data in transit</li>
      </ul>
    </div>

    <div class="section">
      <h2>Data Protection Officer</h2>
      <p>For GDPR-related enquiries, contact our Data Protection Officer:</p>
      <ul>
        <li>Email: <a href="mailto:gdpr@socialstrategyapp.com.au">gdpr@socialstrategyapp.com.au</a></li>
        <li>Response time: within 30 days as required by GDPR Art. 12</li>
      </ul>
      <p>You also have the right to lodge a complaint with your national supervisory authority (e.g. the ICO in the UK, or your country's DPA in the EU).</p>
    </div>

    <div class="section">
      <h2>Cookies & Tracking</h2>
      <p>We use only essential cookies required to operate the platform (session management, authentication). We do not use advertising trackers or third-party analytics that profile you across websites. You can clear cookies at any time in your browser settings.</p>
    </div>
  `)
}

// ─── ABOUT US ─────────────────────────────────────────────────────────────────
export function aboutPage(): string {
  const heroLogo = ssLogo(120)
  return pageShell('About Us', `
    <div class="page-hero">
      <div class="page-badge">🚀 About Us</div>
      <h1 class="page-title">Built for <span style="background:linear-gradient(135deg,#00E5FF,#FF2D78,#FFD600);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Businesses</span><br>That Want to Win</h1>
      <p class="page-subtitle">Social Strategy is an AI-powered marketing platform designed to give every business access to enterprise-level social media expertise — without the agency price tag.</p>
    </div>

    <div style="display:flex;justify-content:center;margin-bottom:48px;">
      <div style="position:relative;display:inline-block;">
        <div style="position:absolute;inset:-6px;border-radius:30px;
          background:linear-gradient(135deg,#3dd4e8,#1ab8cc,#ff4fa0,#e8006a,#3dd4e8);
          filter:blur(8px) brightness(1.2);
          box-shadow:0 0 40px rgba(61,212,232,0.6),0 0 70px rgba(255,79,160,0.4);"></div>
        <div style="position:relative;z-index:1;">${heroLogo}</div>
      </div>
    </div>

    <div class="section">
      <h2>Our Mission</h2>
      <p>We believe every business — no matter its size — deserves a powerful social media presence. The problem? Building one used to require expensive agencies, multiple tools, and full-time marketing staff.</p>
      <p>Social Strategy changes that. <strong style="color:#00E5FF;">One scan. One platform. Complete growth.</strong> Our AI does in minutes what would take a marketing team weeks to produce.</p>
    </div>

    <div class="section">
      <h2>What We Do</h2>
      <ul>
        <li><strong>Analyse</strong> — Scan any website or brand and get a full business intelligence report in under 2 minutes</li>
        <li><strong>Strategize</strong> — Receive a custom growth plan with revenue projections, competitor analysis, and 90-day roadmaps</li>
        <li><strong>Create</strong> — Generate platform-optimised images, videos, captions, and hashtags powered by GPT-4o and Sora-2</li>
        <li><strong>Automate</strong> — Schedule and publish to 8 social platforms simultaneously at the optimal time</li>
        <li><strong>Grow</strong> — Track real-time performance across all platforms from one dashboard</li>
      </ul>
    </div>

    <div class="section">
      <h2>Our Numbers</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:8px;">
        ${[['12,400+','Active Businesses','#00E5FF'],['245M+','Posts Published','#FF2D78'],['8','Platforms Supported','#A78BFA']].map(([v,l,c])=>`
          <div style="text-align:center;padding:24px 16px;border-radius:16px;
            background:rgba(255,255,255,0.03);border:1.5px solid ${c}33;">
            <div style="font-size:clamp(28px,4vw,44px);font-weight:900;
              background:linear-gradient(135deg,${c},#fff);-webkit-background-clip:text;
              -webkit-text-fill-color:transparent;background-clip:text;">${v}</div>
            <div style="color:rgba(255,255,255,0.6);font-size:13px;margin-top:6px;">${l}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="section">
      <h2>Our Technology</h2>
      <p>Social Strategy is built on cutting-edge AI and deployed globally on Cloudflare's edge network for ultra-fast performance anywhere in the world.</p>
      <ul>
        <li><strong>AI Engine:</strong> OpenAI GPT-4o for analysis, strategy, and copywriting</li>
        <li><strong>Video AI:</strong> Sora-2 for short-form video script generation</li>
        <li><strong>Infrastructure:</strong> Cloudflare Workers &amp; Pages — zero cold starts, global CDN</li>
        <li><strong>Security:</strong> AES-256 encryption, OAuth 2.0, GDPR compliant</li>
        <li><strong>Uptime:</strong> 99.9% SLA backed by Cloudflare's network</li>
      </ul>
    </div>

    <div class="section">
      <h2>Based in Australia</h2>
      <p>Social Strategy is proudly Australian-made, headquartered in Queensland. We serve businesses globally while maintaining Australian data sovereignty standards.</p>
      <ul>
        <li>🌏 Serving customers across Australia, New Zealand, USA, UK, and beyond</li>
        <li>🦘 Proudly Australian-owned and operated</li>
        <li>📧 <a href="mailto:hello@socialstrategyapp.com.au">hello@socialstrategyapp.com.au</a></li>
        <li>🌐 <a href="https://socialstrategyapp.com.au" target="_blank">socialstrategyapp.com.au</a></li>
      </ul>
    </div>
  `)
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export function faqPage(): string {
  const faqs = [
    {
      q: 'What is Social Strategy?',
      a: 'Social Strategy is an all-in-one AI-powered social media marketing platform. You enter your website URL, our AI scans your brand, then generates a custom growth strategy, creates weeks of content, and automatically schedules posts across 8 platforms simultaneously.'
    },
    {
      q: 'How does the website scan work?',
      a: 'Enter any website URL and our AI (powered by GPT-4o) analyses your SEO, branding, content quality, usability, and competitive landscape. Within 2 minutes you receive a full business intelligence report including revenue projections, growth opportunities, and a tailored content strategy.'
    },
    {
      q: 'Which social media platforms do you support?',
      a: 'We currently support Instagram, TikTok, Facebook, YouTube, X (Twitter), Threads, LinkedIn, and Pinterest — 8 platforms in total. You can post to all of them simultaneously from one dashboard.'
    },
    {
      q: 'Do I need any technical skills to use Social Strategy?',
      a: 'Not at all. Social Strategy is designed for business owners, not marketers or developers. Simply enter your website URL, answer a few questions about your business, and the AI handles everything else. No marketing experience needed.'
    },
    {
      q: 'Is my data safe?',
      a: 'Absolutely. We use bank-level AES-256 encryption for data at rest and TLS 1.3 for data in transit. We never sell your data to third parties. All social media connections use secure OAuth 2.0 and can be revoked at any time. We are fully GDPR compliant.'
    },
    {
      q: 'Can I cancel my subscription anytime?',
      a: 'Yes, you can cancel at any time from your Account Settings page. Your subscription will remain active until the end of the current billing period, and you will not be charged again after that. No lock-in contracts.'
    },
    {
      q: 'What AI technology powers Social Strategy?',
      a: 'Our analysis and content creation engine is powered by OpenAI GPT-4o, the most advanced commercially available AI model. Video scripts use Sora-2. Our entire platform runs on Cloudflare\'s global edge network for ultra-fast performance worldwide.'
    },
    {
      q: 'How many posts can I schedule?',
      a: 'Post limits depend on your plan. The Starter plan includes 30 scheduled posts per month, Professional includes 200, and Business (our most popular plan) includes unlimited scheduling across all 8 platforms. See our Pricing page for full details.'
    },
    {
      q: 'Can I try Social Strategy for free?',
      a: 'Yes! Click "Start Free" to create your account and run your first website scan at no cost. No credit card required to get started. Our free tier lets you experience the full power of the AI analysis before choosing a paid plan.'
    },
    {
      q: 'What happens to my content if I cancel?',
      a: 'Your content, reports, and analytics data remain accessible for 30 days after cancellation so you can download or export anything you need. After 30 days, your data is permanently deleted from our servers in accordance with our Privacy Policy.'
    },
    {
      q: 'Do you offer refunds?',
      a: 'We offer a 7-day money-back guarantee on all new subscriptions, provided you have not used more than 10% of your monthly credit allowance. Contact support@socialstrategyapp.com.au within 7 days of your first payment.'
    },
    {
      q: 'How do I connect my social media accounts?',
      a: 'After signing in, go to your Dashboard and click "Connect Accounts." You will be redirected through each platform\'s official OAuth flow — we never ask for your passwords. Once connected, you can start scheduling immediately.'
    },
  ]

  return pageShell('FAQ', `
    <div class="page-hero">
      <div class="page-badge">❓ FAQ</div>
      <h1 class="page-title">Frequently Asked <span style="background:linear-gradient(135deg,#00ff88,#00E5FF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Questions</span></h1>
      <p class="page-subtitle">Everything you need to know about Social Strategy. Can't find your answer? Email us at <a href="mailto:support@socialstrategyapp.com.au" style="color:#00E5FF;">support@socialstrategyapp.com.au</a></p>
    </div>

    ${faqs.map((f, i) => `
      <div class="faq-item">
        <div class="faq-q"><span style="color:#A78BFA;margin-right:12px;">Q${i + 1}.</span>${f.q}</div>
        <div class="faq-a">${f.a}</div>
      </div>
    `).join('')}

    <div class="section" style="margin-top:40px;">
      <h2>Still Have Questions?</h2>
      <p>Our support team is here to help. Reach out through any of these channels:</p>
      <ul>
        <li>Email: <a href="mailto:support@socialstrategyapp.com.au">support@socialstrategyapp.com.au</a></li>
        <li>Website: <a href="https://socialstrategyapp.com.au" target="_blank">socialstrategyapp.com.au</a></li>
        <li>Response time: within 24 hours on business days</li>
      </ul>
    </div>
  `)
}

// ─────────────────────────────────────────────────────────────────────────────
// COOKIE POLICY
// ─────────────────────────────────────────────────────────────────────────────
export function cookiePage(): string {
  return pageShell('Cookie Policy', `
    <div class="page-hero">
      <div class="page-badge">🍪 Cookies</div>
      <h1 class="page-title">Cookie <span style="background:linear-gradient(135deg,#FFB020,#FF2DA6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Policy</span></h1>
      <p class="page-subtitle">How Social Strategy uses cookies and similar tracking technologies on our platform.</p>
      <p class="page-updated">Last updated: April 2026</p>
    </div>

    <div class="section">
      <h2>1. What Are Cookies?</h2>
      <p>Cookies are small text files placed on your device when you visit our website or use our platform. They help us remember your preferences, keep you logged in, and understand how you use Social Strategy so we can improve the experience.</p>
      <p>We also use similar technologies such as web beacons, pixel tags, and local storage (collectively referred to as "cookies" in this policy).</p>
    </div>

    <div class="section">
      <h2>2. Categories of Cookies We Use</h2>

      <h3>2.1 Strictly Necessary Cookies</h3>
      <p>These cookies are essential to operate the platform. Without them, services such as authentication, session management, and security cannot function. You cannot opt out of strictly necessary cookies.</p>
      <ul>
        <li><strong>Session token</strong> — keeps you logged in during your session.</li>
        <li><strong>CSRF token</strong> — protects against cross-site request forgery attacks.</li>
        <li><strong>Account preferences</strong> — remembers your selected plan and region.</li>
      </ul>

      <h3>2.2 Performance &amp; Analytics Cookies</h3>
      <p>These cookies collect anonymised information about how visitors use our site — which pages are visited, how long users stay, and where they come from. We use this to improve platform performance.</p>
      <ul>
        <li><strong>Cloudflare Analytics</strong> — edge-level performance metrics, fully privacy-safe and cookie-less.</li>
        <li><strong>Internal event tracking</strong> — page views and feature interactions stored in our own database, never sold to third parties.</li>
      </ul>

      <h3>2.3 Functional Cookies</h3>
      <p>These cookies enable enhanced functionality and personalisation, such as remembering your chosen tone, industry, or content preferences in the Studio.</p>
      <ul>
        <li><strong>Studio preferences</strong> — last-used industry, tone, platforms, and brand name.</li>
        <li><strong>Dark-mode / UI state</strong> — persists your interface layout choices.</li>
      </ul>

      <h3>2.4 Marketing &amp; Targeting Cookies</h3>
      <p>We may use cookies from third-party services to show you relevant advertising on other platforms (e.g., Google, Meta). These are only placed with your explicit consent.</p>
      <ul>
        <li><strong>Google Ads conversion</strong> — measures campaign effectiveness.</li>
        <li><strong>Meta Pixel</strong> — retargeting audiences on Facebook/Instagram.</li>
      </ul>
      <div class="highlight-box">
        <p>You can withdraw your consent for marketing cookies at any time via the Cookie Preferences panel (click "Cookie Settings" in the footer) or through your browser settings.</p>
      </div>
    </div>

    <div class="section">
      <h2>3. Third-Party Cookies</h2>
      <p>Some features of Social Strategy embed or interact with third-party services that may set their own cookies:</p>
      <ul>
        <li><strong>Stripe</strong> — payment processing; sets cookies for fraud detection and session continuity.</li>
        <li><strong>Intercom / Support chat</strong> — customer support widget; sets cookies to identify returning users.</li>
        <li><strong>YouTube / Vimeo</strong> — if we embed tutorial videos; those providers may set tracking cookies.</li>
      </ul>
      <p>We have no control over third-party cookies. Please review the relevant providers' privacy policies for details.</p>
    </div>

    <div class="section">
      <h2>4. How Long Do Cookies Last?</h2>
      <ul>
        <li><strong>Session cookies</strong> — deleted when you close your browser.</li>
        <li><strong>Persistent cookies</strong> — remain for the duration listed below:</li>
      </ul>
      <div class="highlight-box">
        <p>Authentication token: 30 days &nbsp;·&nbsp; Studio preferences: 90 days &nbsp;·&nbsp; Analytics identifiers: up to 12 months &nbsp;·&nbsp; Marketing pixels: up to 180 days.</p>
      </div>
    </div>

    <div class="section">
      <h2>5. Your Cookie Choices</h2>
      <p>You have several ways to manage cookies:</p>
      <ul>
        <li><strong>Cookie Preferences panel</strong> — available via "Cookie Settings" in the footer. Accepts or rejects non-essential cookies in one click.</li>
        <li><strong>Browser settings</strong> — most browsers allow you to block or delete cookies. Note: disabling strictly necessary cookies will break the platform.</li>
        <li><strong>Opt-out links</strong> — Google Analytics opt-out: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank">tools.google.com/dlpage/gaoptout</a></li>
      </ul>
    </div>

    <div class="section">
      <h2>6. Do Not Track (DNT)</h2>
      <p>Our platform currently does not respond to browser-level DNT signals. You can use the Cookie Preferences panel instead to control tracking at a granular level.</p>
    </div>

    <div class="section">
      <h2>7. Changes to This Policy</h2>
      <p>We may update this Cookie Policy as we introduce new features or in response to changes in legislation. Material changes will be announced via in-app notification and a revised "Last updated" date above.</p>
    </div>

    <div class="section">
      <h2>8. Contact Us</h2>
      <p>For questions about our cookie practices, contact our Privacy team:</p>
      <ul>
        <li>Email: <a href="mailto:privacy@socialstrategyapp.com.au">privacy@socialstrategyapp.com.au</a></li>
        <li>Website: <a href="https://socialstrategyapp.com.au" target="_blank">socialstrategyapp.com.au</a></li>
      </ul>
    </div>
  `)
}

// ─────────────────────────────────────────────────────────────────────────────
// BILLING POLICY (Trials, Credits & Refunds)
// ─────────────────────────────────────────────────────────────────────────────
export function billingPolicyPage(): string {
  return pageShell('Billing, Trials & Refunds', `
    <div class="page-hero">
      <div class="page-badge">💳 Billing</div>
      <h1 class="page-title">Billing, Trials <span style="background:linear-gradient(135deg,#20D9FF,#8B5CF6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">&amp; Refunds</span></h1>
      <p class="page-subtitle">Everything you need to know about how we charge, trial periods, credits, and our refund policy.</p>
      <p class="page-updated">Last updated: April 2026 &nbsp;·&nbsp; Prices in AUD (Australian Dollars).</p>
    </div>

    <div class="section">
      <h2>1. Subscription Plans</h2>
      <p>Social Strategy offers four subscription tiers billed monthly or annually:</p>
      <ul>
        <li><strong>Free</strong> — $0/month. 8 credits/month, 2 platforms, 2 text posts/week. No credit card required.</li>
        <li><strong>Business</strong> — $79/month. 150 credits/month, 8 platforms, text + image, 1 AI character, 1 brand, 14-day full-access trial (60 credits).</li>
        <li><strong>Pro</strong> — $199/month. 500 credits/month, text + image + video, 3 brands, 3 AI characters, unlimited reports, 14-day full-access trial (120 credits).</li>
        <li><strong>Enterprise</strong> — From $699/month. 2,500+ pooled credits, unlimited brands, team roles, API access, custom SLA. <a href="mailto:sales@socialstrategyapp.com.au">Contact sales</a> for pricing.</li>
      </ul>
      <p>Annual plans are available at up to 40% discount. Annual subscriptions are billed upfront and are non-refundable after the 14-day window unless required by law.</p>
    </div>

    <div class="section">
      <h2>2. Free Trial Policy</h2>
      <div class="highlight-box">
        <p><strong>One trial per business.</strong> Free trials are limited to one per business, defined by business website domain. Creating multiple accounts to circumvent this limit is a Terms of Service violation and may result in permanent suspension.</p>
      </div>
      <ul>
        <li><strong>Trial length:</strong> 14 days from activation date.</li>
        <li><strong>Trial credits:</strong> Business trial = 60 credits; Pro trial = 120 credits.</li>
        <li><strong>No charge during trial:</strong> Your payment method is saved but not charged until the trial ends.</li>
        <li><strong>Auto-renewal:</strong> At trial end, your subscription converts to a paid plan at the standard monthly rate unless you cancel before expiry.</li>
        <li><strong>Credit carryover:</strong> Unused trial credits do not carry over to a paid subscription.</li>
      </ul>
    </div>

    <div class="section">
      <h2>3. Credit System</h2>
      <p>Credits are consumed each time you generate AI content. Costs per action:</p>
      <ul>
        <li>Website Analysis / Audit — 10 credits</li>
        <li>Caption + CTA + Hashtags (per platform set) — 2 credits</li>
        <li>AI Image Generation (1 image) — 4 credits</li>
        <li>AI Image Generation (2 images) — 8 credits</li>
        <li>AI Image Generation (3 images) — 12 credits</li>
        <li>Image Edit / Variation — 2 credits</li>
        <li>Video Script (text only) — 4 credits</li>
        <li>Full Analytics Report — 20 credits</li>
        <li>Report Summary — 4 credits</li>
        <li>SEO Meta (title + description + keywords) — 3 credits</li>
        <li>Blog Draft — 6 credits</li>
        <li>7-Day Content Schedule — 4 credits</li>
        <li>30-Day Content Schedule — 10 credits</li>
        <li>Publish Post (after plan cap) — 1 credit each</li>
        <li>Multi-Platform Variant (extra platforms) — +1 credit per platform</li>
        <li>Character Continuity Injection — 3 credits</li>
      </ul>
      <p>Credits reset at the start of each billing cycle. Unused subscription credits do not roll over.</p>

      <h3>3.1 Credit Top-Up Packs</h3>
      <ul>
        <li>50 credits — $59 AUD (one-off)</li>
        <li>150 credits — $159 AUD (one-off)</li>
        <li>500 credits — $449 AUD (one-off)</li>
        <li>2,000 credits — $1,499 AUD (one-off)</li>
      </ul>
      <p>Top-up credits are non-expiring while your account remains active and are drawn after subscription credits are exhausted.</p>
    </div>

    <div class="section">
      <h2>4. Payments</h2>
      <ul>
        <li>All payments processed securely by <strong>Stripe</strong>. We do not store card numbers.</li>
        <li>Accepted: Visa, Mastercard, American Express, Apple Pay, Google Pay.</li>
        <li>Subscriptions renew automatically each month (or year for annual plans).</li>
        <li>Failed payments: retried up to 3 times over 7 days. If unresolved, account downgrades to Free tier.</li>
        <li>A receipt is emailed after every successful charge.</li>
      </ul>
    </div>

    <div class="section">
      <h2>5. Refund Policy</h2>
      <div class="highlight-box">
        <p><strong>7-day money-back guarantee:</strong> Contact us within 7 days of your first payment for a full refund — provided you have used less than 10% of your monthly credit allowance.</p>
      </div>
      <ul>
        <li>Refunds unavailable after 7 days or once &gt;10% of monthly credits are consumed.</li>
        <li>Top-up credit packs are non-refundable once any credits from the pack are used.</li>
        <li>Accounts suspended for ToS violations are not eligible for refunds.</li>
        <li>To request a refund: <a href="mailto:billing@socialstrategyapp.com.au">billing@socialstrategyapp.com.au</a></li>
      </ul>
    </div>

    <div class="section">
      <h2>6. Cancellation</h2>
      <ul>
        <li>Cancel at any time from <strong>Settings → Billing</strong> in the app.</li>
        <li>Cancellation takes effect at the end of the current billing period. Full access retained until then.</li>
        <li>After cancellation, account reverts to Free. Data retained for 30 days, then permanently deleted.</li>
        <li>To cancel an annual plan: <a href="mailto:billing@socialstrategyapp.com.au">billing@socialstrategyapp.com.au</a></li>
      </ul>
    </div>

    <div class="section">
      <h2>7. Price Changes</h2>
      <p>We reserve the right to modify pricing. If we increase your plan's price, we will give at least 30 days' notice by email. You may cancel before the new price takes effect. Continued use constitutes acceptance.</p>
    </div>

    <div class="section">
      <h2>8. Anti-Abuse &amp; Trial Integrity</h2>
      <p>Social Strategy actively monitors for trial abuse, including: multiple accounts for the same business domain, VPN/proxy use to mask identity, and false business domain information. Violating accounts may be immediately suspended, credits revoked, and permanently banned without refund.</p>
    </div>

    <div class="section">
      <h2>9. Contact Billing Support</h2>
      <ul>
        <li>Billing: <a href="mailto:billing@socialstrategyapp.com.au">billing@socialstrategyapp.com.au</a></li>
        <li>General support: <a href="mailto:support@socialstrategyapp.com.au">support@socialstrategyapp.com.au</a></li>
        <li>Response time: within 1 business day for billing issues.</li>
      </ul>
    </div>
  `)
}
