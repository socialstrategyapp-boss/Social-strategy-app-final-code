import { layout } from './layout'

export function pricingPage(): string {

  const content = `
<style>
  .pricing-page { padding: 0; }

  /* ─── TOP BAR ─── */
  .pr-topbar {
    position: sticky; top: 0; z-index: 30;
    background: rgba(5,8,22,0.96); backdrop-filter: blur(20px);
    border-bottom: 1.5px solid rgba(32,217,255,0.18);
    padding: 14px 28px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  /* ─── HERO ─── */
  .pr-hero {
    text-align: center;
    padding: 52px 24px 44px;
    background: radial-gradient(ellipse at 50% 0%, rgba(32,217,255,0.07) 0%, transparent 65%),
                radial-gradient(ellipse at 80% 60%, rgba(139,92,246,0.05) 0%, transparent 55%);
  }
  .pr-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(32,217,255,0.08); border: 1.5px solid rgba(32,217,255,0.3);
    border-radius: 999px; padding: 7px 18px;
    font-size: 12px; font-weight: 800; color: #20D9FF;
    letter-spacing: 0.5px; margin-bottom: 20px;
  }
  .pr-headline {
    font-size: clamp(30px, 5vw, 48px); font-weight: 900; color: #fff;
    line-height: 1.1; margin-bottom: 14px;
  }
  .pr-headline span {
    background: linear-gradient(135deg, #20D9FF, #8B5CF6, #FF2DA6);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .pr-sub { font-size: 16px; color: #A8B3C7; max-width: 560px; margin: 0 auto 28px; line-height: 1.7; }

  /* Toggle */
  .pr-toggle {
    display: inline-flex; align-items: center; gap: 14px;
    background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 999px; padding: 6px 8px;
    font-size: 13px; font-weight: 700;
  }
  .pr-toggle-btn {
    padding: 7px 20px; border-radius: 999px; cursor: pointer;
    font-size: 13px; font-weight: 700; border: none; transition: all 0.2s;
    background: transparent; color: #6B7A99;
  }
  .pr-toggle-btn.active {
    background: linear-gradient(135deg, #20D9FF, #2F80FF);
    color: #fff; box-shadow: 0 0 16px rgba(32,217,255,0.35);
  }
  .pr-save-badge {
    background: rgba(0,245,155,0.12); border: 1px solid rgba(0,245,155,0.3);
    border-radius: 999px; padding: 2px 10px; font-size: 11px;
    font-weight: 800; color: #00F59B;
  }

  /* ─── PLAN GRID ─── */
  .pr-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 0 24px 40px;
    max-width: 1200px; margin: 0 auto;
  }
  @media(max-width: 1024px) { .pr-grid { grid-template-columns: repeat(2,1fr); } }
  @media(max-width: 640px)  { .pr-grid { grid-template-columns: 1fr; } }

  .pr-card {
    background: linear-gradient(160deg, rgba(3,10,26,0.99), rgba(4,12,28,0.99));
    border: 1.5px solid rgba(32,217,255,0.18);
    border-radius: 24px; padding: 28px 24px;
    display: flex; flex-direction: column; gap: 20px;
    position: relative; overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .pr-card:hover { transform: translateY(-4px); box-shadow: 0 0 40px rgba(32,217,255,0.1); }
  .pr-card.popular {
    border-color: rgba(139,92,246,0.55);
    box-shadow: 0 0 40px rgba(139,92,246,0.12), 0 0 80px rgba(32,217,255,0.06);
  }
  .pr-card.popular::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(160deg, rgba(139,92,246,0.06), transparent 60%);
    pointer-events: none;
  }
  .pr-popular-badge {
    position: absolute; top: -1px; left: 50%; transform: translateX(-50%);
    background: linear-gradient(135deg, #8B5CF6, #FF2DA6);
    color: #fff; font-size: 11px; font-weight: 800;
    padding: 5px 18px; border-radius: 0 0 14px 14px;
    letter-spacing: 0.5px; white-space: nowrap;
  }

  .pr-plan-name {
    font-size: 13px; font-weight: 800; text-transform: uppercase;
    letter-spacing: 1.2px; margin-bottom: 2px;
  }
  .pr-plan-desc { font-size: 12px; color: #6B7A99; }
  .pr-price-row { display: flex; align-items: flex-end; gap: 4px; }
  .pr-price { font-size: 42px; font-weight: 900; color: #fff; line-height: 1; }
  .pr-price-period { font-size: 14px; color: #6B7A99; margin-bottom: 6px; }
  .pr-credits-line {
    font-size: 12px; font-weight: 700;
    background: rgba(255,176,32,0.1); border: 1px solid rgba(255,176,32,0.25);
    border-radius: 8px; padding: 5px 10px;
    color: #FFB020; display: inline-flex; align-items: center; gap: 6px;
  }
  .pr-save-line { font-size: 12px; color: #00F59B; font-weight: 700; margin-top: 4px; }
  .pr-trial-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 800;
    background: rgba(0,245,155,0.08); border: 1px solid rgba(0,245,155,0.25);
    color: #00F59B; border-radius: 8px; padding: 5px 10px;
  }
  .pr-features { display: flex; flex-direction: column; gap: 9px; flex: 1; }
  .pr-feature {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 13px; color: #A8B3C7; line-height: 1.5;
  }
  .pr-feature i { font-size: 11px; margin-top: 2px; flex-shrink: 0; }
  .pr-feature.locked { opacity: 0.4; }
  .pr-cta {
    width: 100%; padding: 13px; border-radius: 14px; border: none; cursor: pointer;
    font-size: 14px; font-weight: 800; transition: all 0.22s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    text-decoration: none;
  }
  .pr-cta-primary {
    background: linear-gradient(135deg, #20D9FF, #2F80FF, #8B5CF6);
    color: #fff; box-shadow: 0 0 24px rgba(32,217,255,0.3);
  }
  .pr-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(32,217,255,0.5); }
  .pr-cta-secondary {
    background: rgba(32,217,255,0.06); border: 1.5px solid rgba(32,217,255,0.3);
    color: #20D9FF;
  }
  .pr-cta-secondary:hover { background: rgba(32,217,255,0.12); }
  .pr-cta-ghost {
    background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.1);
    color: #A8B3C7;
  }
  .pr-cta-ghost:hover { background: rgba(255,255,255,0.08); color: #fff; }
  .pr-cta-enterprise {
    background: linear-gradient(135deg, #FF2DA6, #C026D3, #8B5CF6);
    color: #fff; box-shadow: 0 0 24px rgba(255,45,166,0.25);
  }
  .pr-compare-link {
    text-align: center; font-size: 12px; color: #6B7A99;
    text-decoration: none; margin-top: -8px;
  }
  .pr-compare-link:hover { color: #20D9FF; }

  /* ─── CREDIT SECTION ─── */
  .pr-section { padding: 0 24px 52px; max-width: 1200px; margin: 0 auto; }
  .pr-section-title {
    font-size: 26px; font-weight: 900; color: #fff;
    text-align: center; margin-bottom: 8px;
  }
  .pr-section-sub {
    text-align: center; color: #6B7A99; font-size: 14px; margin-bottom: 36px;
  }

  .credit-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }
  .credit-card {
    background: rgba(3,10,26,0.97); border: 1.5px solid rgba(32,217,255,0.15);
    border-radius: 16px; padding: 20px 18px;
  }
  .credit-type { font-size: 11px; font-weight: 800; text-transform: uppercase;
    letter-spacing: 1px; color: #6B7A99; margin-bottom: 12px; }
  .credit-row { display: flex; justify-content: space-between; align-items: center;
    padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 13px; }
  .credit-row:last-child { border-bottom: none; }
  .credit-row-label { color: #A8B3C7; }
  .credit-row-val { font-weight: 800; color: #FFB020; }

  /* ─── TOP-UP PACKS ─── */
  .pack-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
  }
  @media(max-width: 900px) { .pack-grid { grid-template-columns: repeat(2,1fr); } }
  @media(max-width: 500px) { .pack-grid { grid-template-columns: 1fr; } }

  .pack-card {
    background: linear-gradient(160deg, rgba(3,10,26,0.98), rgba(5,12,28,0.98));
    border: 1.5px solid rgba(255,176,32,0.22);
    border-radius: 18px; padding: 22px 18px;
    text-align: center; cursor: pointer; transition: all 0.2s;
  }
  .pack-card:hover { border-color: rgba(255,176,32,0.5); transform: translateY(-3px);
    box-shadow: 0 0 24px rgba(255,176,32,0.15); }
  .pack-credits { font-size: 32px; font-weight: 900; color: #FFB020; line-height: 1; }
  .pack-credits-label { font-size: 11px; color: #6B7A99; font-weight: 600; margin-bottom: 8px; }
  .pack-name { font-size: 12px; font-weight: 800; color: #F4F7FB; margin-bottom: 4px; }
  .pack-price { font-size: 22px; font-weight: 900; color: #fff; margin: 10px 0 4px; }
  .pack-per { font-size: 12px; color: #6B7A99; }
  .pack-btn {
    width: 100%; padding: 10px; border-radius: 12px; border: none; cursor: pointer;
    background: rgba(255,176,32,0.1); border: 1.5px solid rgba(255,176,32,0.35);
    color: #FFB020; font-size: 13px; font-weight: 800; margin-top: 14px;
    transition: all 0.2s;
  }
  .pack-btn:hover { background: rgba(255,176,32,0.2); }

  /* ─── COMPARE TABLE ─── */
  .compare-wrap { overflow-x: auto; padding: 0 24px; max-width: 1200px; margin: 0 auto 52px; }
  .compare-table { width: 100%; border-collapse: collapse; }
  .compare-table th {
    padding: 14px 18px; font-size: 13px; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.8px;
    border-bottom: 1.5px solid rgba(32,217,255,0.2);
  }
  .compare-table th:first-child { text-align: left; color: #6B7A99; }
  .compare-table th:not(:first-child) { text-align: center; min-width: 120px; }
  .compare-table td {
    padding: 12px 18px; font-size: 13px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .compare-table td:first-child { color: #A8B3C7; }
  .compare-table td:not(:first-child) { text-align: center; color: #fff; font-weight: 600; }
  .compare-table tr:hover td { background: rgba(32,217,255,0.02); }
  .compare-table .section-row td {
    font-size: 11px; font-weight: 800; text-transform: uppercase;
    letter-spacing: 1px; color: #20D9FF; padding: 16px 18px 8px;
    background: rgba(32,217,255,0.03);
  }
  .tick { color: #00F59B; }
  .cross { color: #f87171; opacity: 0.6; }

  /* ─── ANTI-ABUSE BLOCK ─── */
  .trial-policy {
    max-width: 700px; margin: 0 auto 52px;
    background: rgba(32,217,255,0.04); border: 1.5px solid rgba(32,217,255,0.18);
    border-radius: 18px; padding: 28px 32px; text-align: center;
  }
  .trial-policy h3 { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 10px; }
  .trial-policy p { font-size: 14px; color: #A8B3C7; line-height: 1.8; }
  .trial-policy strong { color: #20D9FF; }

  /* ─── FAQs ─── */
  .faq-grid { display: flex; flex-direction: column; gap: 10px; max-width: 800px; margin: 0 auto; padding: 0 24px; }
  .faq-item {
    background: rgba(3,10,26,0.97); border: 1.5px solid rgba(255,255,255,0.07);
    border-radius: 16px; overflow: hidden; cursor: pointer;
    transition: border-color 0.2s;
  }
  .faq-item:hover { border-color: rgba(32,217,255,0.3); }
  .faq-q {
    padding: 18px 22px; font-size: 15px; font-weight: 700; color: #fff;
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
  }
  .faq-q i { color: #20D9FF; flex-shrink: 0; transition: transform 0.2s; }
  .faq-a {
    display: none; padding: 0 22px 18px;
    font-size: 14px; color: #A8B3C7; line-height: 1.8;
  }
  .faq-item.open .faq-a { display: block; }
  .faq-item.open .faq-q i { transform: rotate(45deg); }

  /* ─── BOTTOM CTA ─── */
  .pr-bottom-cta {
    text-align: center;
    padding: 60px 24px;
    background: radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 65%);
    border-top: 1.5px solid rgba(32,217,255,0.1);
  }
  .pr-bottom-cta h2 { font-size: 32px; font-weight: 900; color: #fff; margin-bottom: 12px; }
  .pr-bottom-cta p { font-size: 15px; color: #A8B3C7; margin-bottom: 32px; }
</style>

<!-- TOP BAR -->
<div class="pr-topbar">
  <div>
    <h1 style="font-size:20px;font-weight:900;color:#fff;margin:0;">Pricing</h1>
    <p style="color:#A8B3C7;font-size:12px;margin:2px 0 0;">Simple, transparent pricing in AUD · No hidden fees · Cancel anytime</p>
  </div>
  <a href="/billing" style="display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:999px;background:linear-gradient(135deg,#20D9FF,#2F80FF);color:#fff;font-size:13px;font-weight:800;text-decoration:none;box-shadow:0 0 18px rgba(32,217,255,0.35);">
    <i class="fas fa-credit-card"></i> Upgrade Now
  </a>
</div>

<!-- HERO -->
<div class="pr-hero">
  <div class="pr-badge"><i class="fas fa-bolt"></i> 14-Day Free Trial on Business & Pro</div>
  <h1 class="pr-headline">Scan. Strategy. Content.<br><span>Scheduling. Posting.</span></h1>
  <p class="pr-sub">Replace 5 separate tools with one AI platform — at a fraction of the cost.</p>

  <!-- Monthly/Yearly toggle -->
  <div class="pr-toggle" id="billingToggle">
    <button class="pr-toggle-btn active" id="btnMonthly" onclick="setBilling('monthly')">Monthly</button>
    <button class="pr-toggle-btn" id="btnYearly" onclick="setBilling('yearly')">
      Yearly <span class="pr-save-badge">Save 20%</span>
    </button>
  </div>
</div>

<!-- PLAN CARDS -->
<div class="pr-grid" id="planGrid">

  <!-- FREE -->
  <div class="pr-card">
    <div>
      <div class="pr-plan-name" style="color:#A8B3C7;">Free</div>
      <div class="pr-plan-desc">Explore the platform</div>
    </div>
    <div>
      <div class="pr-price-row">
        <div class="pr-price">$0</div>
        <div class="pr-price-period">/mo</div>
      </div>
      <div class="pr-credits-line" style="margin-top:8px;"><i class="fas fa-bolt"></i> 8 credits / month</div>
    </div>
    <div class="pr-features">
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#00F59B;"></i>2 text-only posts per week</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#00F59B;"></i>2 social platforms max</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#00F59B;"></i>1 brand analysis per month</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#00F59B;"></i>Basic analytics dashboard</div>
      <div class="pr-feature locked"><i class="fas fa-lock" style="color:#6B7A99;"></i>No image generation</div>
      <div class="pr-feature locked"><i class="fas fa-lock" style="color:#6B7A99;"></i>No video scripts</div>
    </div>
    <a href="/login" class="pr-cta pr-cta-ghost">Get Started Free</a>
    <a href="#compare" class="pr-compare-link">See full comparison</a>
  </div>

  <!-- BUSINESS -->
  <div class="pr-card">
    <div>
      <div class="pr-plan-name" style="color:#20D9FF;">Business</div>
      <div class="pr-plan-desc">For growing brands</div>
    </div>
    <div>
      <div class="pr-price-row">
        <div class="pr-price" data-monthly="79" data-yearly="63" id="biz-price">$79</div>
        <div class="pr-price-period" id="biz-period">/mo</div>
      </div>
      <div id="biz-save" class="pr-save-line" style="display:none;">💰 Save $192/year with annual</div>
      <div style="margin-top:8px;display:flex;flex-direction:column;gap:6px;">
        <div class="pr-credits-line"><i class="fas fa-bolt"></i> 150 credits / month</div>
        <div class="pr-trial-badge"><i class="fas fa-gift"></i> 14-day trial · 60 free credits</div>
      </div>
    </div>
    <div class="pr-features">
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#20D9FF;"></i>1 post per day per platform</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#20D9FF;"></i>All 8 platforms</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#20D9FF;"></i>AI image generation</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#20D9FF;"></i>2 brand analyses / month</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#20D9FF;"></i>Monthly analytics report</div>
      <div class="pr-feature locked"><i class="fas fa-lock" style="color:#6B7A99;"></i>Limited video credits</div>
    </div>
    <button onclick="startTrial('business')" class="pr-cta pr-cta-secondary">
      <i class="fas fa-rocket"></i> Start Free Trial
    </button>
    <a href="#compare" class="pr-compare-link">See full comparison</a>
  </div>

  <!-- PRO -->
  <div class="pr-card popular">
    <div class="pr-popular-badge">⭐ Most Popular</div>
    <div style="margin-top:14px;">
      <div class="pr-plan-name" style="color:#8B5CF6;">Pro</div>
      <div class="pr-plan-desc">For serious marketers</div>
    </div>
    <div>
      <div class="pr-price-row">
        <div class="pr-price" data-monthly="199" data-yearly="159" id="pro-price">$199</div>
        <div class="pr-price-period" id="pro-period">/mo</div>
      </div>
      <div id="pro-save" class="pr-save-line" style="display:none;">💰 Save $480/year with annual</div>
      <div style="margin-top:8px;display:flex;flex-direction:column;gap:6px;">
        <div class="pr-credits-line"><i class="fas fa-bolt"></i> 500 credits / month</div>
        <div class="pr-trial-badge"><i class="fas fa-gift"></i> 14-day trial · 120 free credits</div>
      </div>
    </div>
    <div class="pr-features">
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#8B5CF6;"></i>5 posts per day per platform</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#8B5CF6;"></i>All 8 platforms</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#8B5CF6;"></i>AI image + video generation</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#8B5CF6;"></i>Advanced scheduling & approval</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#8B5CF6;"></i>Brand character continuity</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#8B5CF6;"></i>10 reports + full analytics</div>
    </div>
    <button onclick="startTrial('pro')" class="pr-cta pr-cta-primary">
      <i class="fas fa-bolt"></i> Start Free Trial
    </button>
    <a href="#compare" class="pr-compare-link">See full comparison</a>
  </div>

  <!-- ENTERPRISE -->
  <div class="pr-card" style="border-color:rgba(255,45,166,0.3);">
    <div>
      <div class="pr-plan-name" style="color:#FF2DA6;">Enterprise</div>
      <div class="pr-plan-desc">Custom for agencies</div>
    </div>
    <div>
      <div class="pr-price-row">
        <div class="pr-price">$699</div>
        <div class="pr-price-period">/mo+</div>
      </div>
      <div style="margin-top:8px;">
        <div class="pr-credits-line" style="background:rgba(255,45,166,0.08);border-color:rgba(255,45,166,0.25);color:#FF2DA6;"><i class="fas fa-bolt"></i> 2,500+ credits · pooled</div>
      </div>
    </div>
    <div class="pr-features">
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#FF2DA6;"></i>Unlimited posts & platforms</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#FF2DA6;"></i>Custom team seats & roles</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#FF2DA6;"></i>API access + webhooks</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#FF2DA6;"></i>Audit logs & compliance</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#FF2DA6;"></i>SLA + dedicated support</div>
      <div class="pr-feature"><i class="fas fa-check-circle" style="color:#FF2DA6;"></i>Regional data residency</div>
    </div>
    <a href="mailto:enterprise@socialstrategyapp.com" class="pr-cta pr-cta-enterprise">
      <i class="fas fa-envelope"></i> Contact Sales
    </a>
    <a href="#compare" class="pr-compare-link">See full comparison</a>
  </div>

</div>

<!-- CREDIT COST REFERENCE -->
<div class="pr-section">
  <div class="neon-divider" style="margin-bottom:40px;"></div>
  <h2 class="pr-section-title">What Do Credits Cost?</h2>
  <p class="pr-section-sub">Every AI action uses credits from your monthly balance. <strong style="color:#FFB020;">1 credit ≈ $1 AUD value</strong> · Top-up packs always available.</p>

  <div class="credit-grid">
    <div class="credit-card">
      <div class="credit-type"><i class="fas fa-file-alt" style="margin-right:6px;color:#20D9FF;"></i>Text Content</div>
      <div class="credit-row"><span class="credit-row-label">Caption only</span><span class="credit-row-val">1 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">Caption + CTA + Hashtags</span><span class="credit-row-val">2 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">SEO title + meta</span><span class="credit-row-val">3 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">Report summary</span><span class="credit-row-val">4 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">Blog article</span><span class="credit-row-val">6 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">Full audit report</span><span class="credit-row-val">20 cr</span></div>
    </div>
    <div class="credit-card">
      <div class="credit-type"><i class="fas fa-image" style="margin-right:6px;color:#8B5CF6;"></i>AI Images</div>
      <div class="credit-row"><span class="credit-row-label">1 image</span><span class="credit-row-val">4 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">2 images</span><span class="credit-row-val">8 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">3 images</span><span class="credit-row-val">12 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">4 images</span><span class="credit-row-val">14 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">5 images</span><span class="credit-row-val">18 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">Edit / Upscale</span><span class="credit-row-val">+2 cr</span></div>
    </div>
    <div class="credit-card">
      <div class="credit-type"><i class="fas fa-video" style="margin-right:6px;color:#FF2DA6;"></i>Video (Pro+)</div>
      <div class="credit-row"><span class="credit-row-label">5 second clip</span><span class="credit-row-val">15 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">10 second clip</span><span class="credit-row-val">28 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">20 second clip</span><span class="credit-row-val">48 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">30 second clip</span><span class="credit-row-val">70 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">60 second clip</span><span class="credit-row-val">130 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">2 minute clip</span><span class="credit-row-val">250 cr</span></div>
    </div>
    <div class="credit-card">
      <div class="credit-type"><i class="fas fa-calendar" style="margin-right:6px;color:#00F59B;"></i>Scheduling</div>
      <div class="credit-row"><span class="credit-row-label">7-day schedule</span><span class="credit-row-val">4 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">30-day schedule</span><span class="credit-row-val">10 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">Publish per post</span><span class="credit-row-val">1 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">Extra platform +</span><span class="credit-row-val">1 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">Website audit scan</span><span class="credit-row-val">10 cr</span></div>
      <div class="credit-row"><span class="credit-row-label">Character continuity</span><span class="credit-row-val">+3 cr</span></div>
    </div>
  </div>
</div>

<!-- TOP-UP PACKS -->
<div class="pr-section">
  <h2 class="pr-section-title">Credit Top-Up Packs</h2>
  <p class="pr-section-sub">Need more credits? Top up anytime — no subscription change required.</p>
  <div class="pack-grid">
    <div class="pack-card" onclick="buyPack(50,59)">
      <div class="pack-name">Starter Pack</div>
      <div class="pack-credits">50</div>
      <div class="pack-credits-label">Credits</div>
      <div class="pack-price">$59 <span style="font-size:12px;color:#6B7A99;">AUD</span></div>
      <div class="pack-per">$1.18 per credit</div>
      <button class="pack-btn"><i class="fas fa-plus" style="margin-right:6px;"></i>Add Credits</button>
    </div>
    <div class="pack-card" onclick="buyPack(150,159)">
      <div class="pack-name">Growth Pack</div>
      <div class="pack-credits">150</div>
      <div class="pack-credits-label">Credits</div>
      <div class="pack-price">$159 <span style="font-size:12px;color:#6B7A99;">AUD</span></div>
      <div class="pack-per">$1.06 per credit</div>
      <div style="margin-top:4px;font-size:11px;font-weight:800;color:#00F59B;">10% off vs starter</div>
      <button class="pack-btn"><i class="fas fa-plus" style="margin-right:6px;"></i>Add Credits</button>
    </div>
    <div class="pack-card" style="border-color:rgba(139,92,246,0.4);" onclick="buyPack(500,449)">
      <div class="pack-name">Pro Pack</div>
      <div class="pack-credits" style="color:#8B5CF6;">500</div>
      <div class="pack-credits-label">Credits</div>
      <div class="pack-price">$449 <span style="font-size:12px;color:#6B7A99;">AUD</span></div>
      <div class="pack-per">$0.90 per credit</div>
      <div style="margin-top:4px;font-size:11px;font-weight:800;color:#00F59B;">Best value ⭐</div>
      <button class="pack-btn" style="border-color:rgba(139,92,246,0.35);color:#8B5CF6;"><i class="fas fa-plus" style="margin-right:6px;"></i>Add Credits</button>
    </div>
    <div class="pack-card" style="border-color:rgba(255,45,166,0.3);" onclick="buyPack(2000,1499)">
      <div class="pack-name">Agency Pack</div>
      <div class="pack-credits" style="color:#FF2DA6;">2,000</div>
      <div class="pack-credits-label">Credits</div>
      <div class="pack-price">$1,499 <span style="font-size:12px;color:#6B7A99;">AUD</span></div>
      <div class="pack-per">$0.75 per credit</div>
      <div style="margin-top:4px;font-size:11px;font-weight:800;color:#00F59B;">36% off vs starter</div>
      <button class="pack-btn" style="border-color:rgba(255,45,166,0.3);color:#FF2DA6;"><i class="fas fa-plus" style="margin-right:6px;"></i>Add Credits</button>
    </div>
  </div>
</div>

<!-- COMPARISON TABLE -->
<div id="compare" style="padding:0 24px 52px;max-width:1200px;margin:0 auto;">
  <h2 class="pr-section-title" style="text-align:center;margin-bottom:8px;">Full Feature Comparison</h2>
  <p style="text-align:center;color:#6B7A99;font-size:14px;margin-bottom:36px;">Everything included in each plan</p>
  <div class="compare-wrap">
    <table class="compare-table">
      <thead>
        <tr>
          <th></th>
          <th style="color:#A8B3C7;">Free</th>
          <th style="color:#20D9FF;">Business</th>
          <th style="color:#8B5CF6;">Pro</th>
          <th style="color:#FF2DA6;">Enterprise</th>
        </tr>
      </thead>
      <tbody>
        <tr class="section-row"><td colspan="5">Credits & Limits</td></tr>
        <tr><td>Monthly credits</td><td>8</td><td>150</td><td>500</td><td>2,500+</td></tr>
        <tr><td>Price (AUD/mo)</td><td>$0</td><td>$79</td><td>$199</td><td>$699+</td></tr>
        <tr><td>14-day free trial</td><td class="cross">✕</td><td class="tick">✓ (60cr)</td><td class="tick">✓ (120cr)</td><td class="cross">✕</td></tr>
        <tr><td>Credit top-ups available</td><td class="tick">✓</td><td class="tick">✓</td><td class="tick">✓</td><td class="tick">✓</td></tr>

        <tr class="section-row"><td colspan="5">Content Generation</td></tr>
        <tr><td>AI captions & posts</td><td>Text only</td><td class="tick">✓</td><td class="tick">✓</td><td class="tick">✓</td></tr>
        <tr><td>AI image generation</td><td class="cross">✕</td><td class="tick">✓</td><td class="tick">✓</td><td class="tick">✓</td></tr>
        <tr><td>AI video scripts</td><td class="cross">✕</td><td>Limited</td><td class="tick">✓</td><td class="tick">✓</td></tr>
        <tr><td>Brand character engine</td><td class="cross">✕</td><td class="cross">✕</td><td class="tick">✓</td><td class="tick">✓</td></tr>
        <tr><td>Video generation (AI)</td><td class="cross">✕</td><td class="cross">✕</td><td class="tick">✓</td><td class="tick">✓</td></tr>

        <tr class="section-row"><td colspan="5">Platforms & Scheduling</td></tr>
        <tr><td>Social platforms</td><td>2</td><td>8</td><td>8</td><td>8+</td></tr>
        <tr><td>Posts per day</td><td>2/week</td><td>1/day</td><td>5/day</td><td>Unlimited</td></tr>
        <tr><td>Approval workflows</td><td class="cross">✕</td><td class="cross">✕</td><td class="tick">✓</td><td class="tick">✓</td></tr>
        <tr><td>Auto-post scheduling</td><td class="cross">✕</td><td class="tick">✓</td><td class="tick">✓</td><td class="tick">✓</td></tr>

        <tr class="section-row"><td colspan="5">Analytics & Reports</td></tr>
        <tr><td>Analytics dashboard</td><td>Basic</td><td>Standard</td><td>Advanced</td><td>White-label</td></tr>
        <tr><td>Monthly reports</td><td>1</td><td>2</td><td>10</td><td>Unlimited</td></tr>
        <tr><td>Website audit scans</td><td>1/mo</td><td>2/mo</td><td>Unlimited</td><td>Unlimited</td></tr>
        <tr><td>Export to PDF</td><td class="cross">✕</td><td class="tick">✓</td><td class="tick">✓</td><td class="tick">✓</td></tr>

        <tr class="section-row"><td colspan="5">Enterprise</td></tr>
        <tr><td>Team members</td><td>1</td><td>1</td><td>3</td><td>Custom</td></tr>
        <tr><td>API access</td><td class="cross">✕</td><td class="cross">✕</td><td class="cross">✕</td><td class="tick">✓</td></tr>
        <tr><td>Audit logs</td><td class="cross">✕</td><td class="cross">✕</td><td class="cross">✕</td><td class="tick">✓</td></tr>
        <tr><td>SLA guarantee</td><td class="cross">✕</td><td class="cross">✕</td><td class="cross">✕</td><td class="tick">✓</td></tr>
        <tr><td>Priority support</td><td>Community</td><td>Email</td><td>Email + Chat</td><td>Dedicated</td></tr>
      </tbody>
    </table>
  </div>
</div>

<!-- TRIAL POLICY -->
<div style="padding:0 24px;">
  <div class="trial-policy">
    <h3>🔒 One Free Trial Per Business</h3>
    <p>Free trials are granted <strong>once per business domain</strong> — regardless of the number of users, email addresses, or devices used. This ensures every business gets a genuine first-look experience. Verified at sign-up via your website domain.</p>
    <p style="margin-top:10px;font-size:12px;color:#6B7A99;">See our <a href="/billing-policy" style="color:#20D9FF;">Billing Policy</a> for full details.</p>
  </div>
</div>

<!-- FAQs -->
<div style="padding:0 24px 52px;max-width:1200px;margin:0 auto;">
  <h2 class="pr-section-title" style="margin-bottom:8px;">Frequently Asked Questions</h2>
  <p style="text-align:center;color:#6B7A99;font-size:14px;margin-bottom:32px;">Have more questions? <a href="/faq" style="color:#20D9FF;">Visit our full FAQ →</a></p>
  <div class="faq-grid">
    ${[
      ['Can I cancel my subscription anytime?','Yes. Cancel at any time — no lock-ins, no questions asked. You keep access until the end of your billing period. No partial refunds for unused days unless within the 30-day money-back window.'],
      ['What happens when I run out of credits?','Content generation pauses until your next billing cycle refreshes your credits. You can top up anytime with a credit pack without changing your plan.'],
      ['Do unused credits roll over?','Pro and Enterprise plans include credit rollover (up to 1× monthly balance). Business plan credits reset monthly. Free plan credits reset weekly.'],
      ['How does the 14-day trial work?','Business trials start with 60 free credits, Pro trials with 120. No credit card required to start. You can upgrade or let it lapse — no charge if you do nothing.'],
      ['Is there a money-back guarantee?','Yes — 30-day money-back guarantee on all paid plans. Contact support@socialstrategyapp.com within 30 days of your first charge for a full refund.'],
      ['Can I switch plans mid-cycle?','Yes. Upgrading is immediate and prorated. Downgrading takes effect at the next billing cycle.'],
      ['Do you offer agency or reseller pricing?','Yes. Enterprise plans can be customised for agencies managing multiple client accounts. Contact enterprise@socialstrategyapp.com.'],
      ['What social platforms are supported?','Instagram, TikTok, Facebook, LinkedIn, X (Twitter), YouTube, Threads, and Pinterest. Google Business and additional platforms coming soon.'],
    ].map(([q,a]) => `
    <div class="faq-item" onclick="this.classList.toggle('open')">
      <div class="faq-q">${q}<i class="fas fa-plus"></i></div>
      <div class="faq-a">${a}</div>
    </div>`).join('')}
  </div>
</div>

<!-- BOTTOM CTA -->
<div class="pr-bottom-cta">
  <h2>Ready to Grow Smarter?</h2>
  <p>Join 12,400+ businesses automating their marketing with Social Strategy.</p>
  <div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;">
    <button onclick="startTrial('pro')" style="display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:999px;background:linear-gradient(135deg,#20D9FF,#2F80FF,#8B5CF6);color:#fff;font-size:15px;font-weight:800;border:none;cursor:pointer;box-shadow:0 0 28px rgba(32,217,255,0.35);">
      <i class="fas fa-bolt"></i> Start 14-Day Free Trial
    </button>
    <a href="/login" style="display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:999px;background:transparent;border:1.5px solid rgba(32,217,255,0.35);color:#20D9FF;font-size:14px;font-weight:700;text-decoration:none;">
      Sign In to Existing Account
    </a>
  </div>
  <div style="margin-top:20px;display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap;">
    <span style="font-size:13px;color:#6B7A99;"><i class="fas fa-shield-alt" style="color:#00F59B;margin-right:6px;"></i>30-day money-back guarantee</span>
    <span style="font-size:13px;color:#6B7A99;"><i class="fas fa-lock" style="color:#00F59B;margin-right:6px;"></i>No credit card for trial</span>
    <span style="font-size:13px;color:#6B7A99;"><i class="fas fa-times" style="color:#00F59B;margin-right:6px;"></i>Cancel anytime</span>
  </div>
  <div style="margin-top:28px;font-size:12px;color:#4B5563;line-height:1.8;">
    All prices in AUD inc. GST · Stripe-secured payments ·
    <a href="/terms" style="color:#6B7A99;">Terms</a> ·
    <a href="/privacy" style="color:#6B7A99;">Privacy</a> ·
    <a href="/billing-policy" style="color:#6B7A99;">Billing Policy</a>
  </div>
</div>

<script>
let billing = 'monthly';
function setBilling(type) {
  billing = type;
  document.getElementById('btnMonthly').classList.toggle('active', type === 'monthly');
  document.getElementById('btnYearly').classList.toggle('active', type === 'yearly');
  const plans = [
    { priceEl: 'biz-price', periodEl: 'biz-period', saveEl: 'biz-save', monthly: 79, yearly: 63, saveAmt: 192 },
    { priceEl: 'pro-price', periodEl: 'pro-period', saveEl: 'pro-save', monthly: 199, yearly: 159, saveAmt: 480 },
  ];
  plans.forEach(p => {
    const isYearly = type === 'yearly';
    document.getElementById(p.priceEl).textContent = '$' + (isYearly ? p.yearly : p.monthly);
    document.getElementById(p.periodEl).textContent = isYearly ? '/mo (billed annually)' : '/mo';
    document.getElementById(p.saveEl).style.display = isYearly ? 'block' : 'none';
    if(isYearly) document.getElementById(p.saveEl).textContent = '💰 Save $' + p.saveAmt + '/year with annual';
  });
}
function startTrial(plan) {
  window.location.href = '/login?plan=' + plan + '&trial=1';
}
function buyPack(credits, price) {
  window.location.href = '/billing?pack=' + credits + '&price=' + price;
}
</script>
`

  return layout('Pricing', content)
}
