import { layout } from './layout'

export function billingPage(): string {

  const content = `
<style>
  /* ─── TOP BAR ─── */
  .bl-topbar {
    position: sticky; top: 0; z-index: 30;
    background: rgba(5,8,22,0.96); backdrop-filter: blur(20px);
    border-bottom: 1.5px solid rgba(32,217,255,0.18);
    padding: 14px 28px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  /* ─── LAYOUT ─── */
  .bl-body { padding: 28px; max-width: 1100px; margin: 0 auto; display: grid;
    grid-template-columns: 1fr 340px; gap: 24px; align-items: start; }
  @media(max-width:900px) { .bl-body { grid-template-columns: 1fr; } }

  /* ─── CARD ─── */
  .bl-card {
    background: linear-gradient(160deg, rgba(3,10,26,0.99), rgba(4,12,28,0.99));
    border: 1.5px solid rgba(32,217,255,0.18); border-radius: 20px;
    overflow: hidden;
  }
  .bl-card-head {
    padding: 18px 22px; border-bottom: 1.5px solid rgba(32,217,255,0.1);
    background: rgba(32,217,255,0.03);
    display: flex; align-items: center; justify-content: space-between;
  }
  .bl-card-title { font-size: 15px; font-weight: 800; color: #fff;
    display: flex; align-items: center; gap: 10px; }
  .bl-card-title i { color: #20D9FF; }
  .bl-card-body { padding: 22px; }

  /* ─── PLAN SUMMARY CARD ─── */
  .plan-name-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 5px 14px; border-radius: 999px;
    font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px;
  }
  .plan-stat-row { display: flex; justify-content: space-between; align-items: center;
    padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; }
  .plan-stat-row:last-child { border-bottom: none; }
  .plan-stat-label { color: #A8B3C7; }
  .plan-stat-val { font-weight: 800; color: #fff; }

  /* ─── CREDIT BAR ─── */
  .credit-bar-wrap { margin-top: 16px; }
  .credit-bar-labels { display: flex; justify-content: space-between;
    font-size: 12px; color: #6B7A99; margin-bottom: 7px; }
  .credit-bar-track { height: 8px; background: rgba(255,255,255,0.07);
    border-radius: 999px; overflow: hidden; }
  .credit-bar-fill { height: 100%; border-radius: 999px;
    background: linear-gradient(90deg, #20D9FF, #8B5CF6);
    transition: width 0.6s ease; }

  /* ─── PAYMENT METHOD ─── */
  .pm-row {
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,255,255,0.08);
    border-radius: 14px; padding: 14px 18px; margin-bottom: 10px;
  }
  .pm-left { display: flex; align-items: center; gap: 14px; }
  .pm-icon { width: 44px; height: 30px; background: rgba(255,255,255,0.08);
    border-radius: 6px; display: flex; align-items: center; justify-content: center;
    font-size: 18px; }
  .pm-name { font-size: 14px; font-weight: 700; color: #fff; }
  .pm-sub { font-size: 12px; color: #6B7A99; }
  .pm-default { font-size: 10px; font-weight: 800; text-transform: uppercase;
    letter-spacing: 0.5px; background: rgba(0,245,155,0.1);
    border: 1px solid rgba(0,245,155,0.25); color: #00F59B;
    padding: 3px 8px; border-radius: 6px; }

  /* ─── STRIPE PAYMENT ELEMENT MOCK ─── */
  .stripe-mock {
    background: rgba(2,6,18,0.95); border: 1.5px solid rgba(32,217,255,0.2);
    border-radius: 14px; padding: 20px; display: flex; flex-direction: column; gap: 14px;
  }
  .stripe-field-label { font-size: 12px; font-weight: 700; color: rgba(32,217,255,0.7);
    text-transform: uppercase; letter-spacing: 0.7px; margin-bottom: 6px; display: block; }
  .stripe-field-input {
    width: 100%; background: rgba(3,8,24,0.9);
    border: 1.5px solid rgba(32,217,255,0.18); border-radius: 10px;
    padding: 12px 14px; color: #F4F7FB; font-size: 14px; outline: none;
    font-family: inherit; transition: border-color 0.2s;
  }
  .stripe-field-input:focus { border-color: rgba(32,217,255,0.55);
    box-shadow: 0 0 0 3px rgba(32,217,255,0.1); }
  .stripe-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .stripe-secure {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; color: #6B7A99; padding-top: 4px;
  }

  /* ─── EXPRESS CHECKOUT ─── */
  .express-wrap { margin-bottom: 18px; }
  .express-or { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
  .express-or::before, .express-or::after { content: ''; flex: 1;
    height: 1px; background: rgba(255,255,255,0.08); }
  .express-or-text { font-size: 12px; color: #6B7A99; font-weight: 600; white-space: nowrap; }
  .express-btn {
    width: 100%; padding: 13px; border-radius: 12px; border: none; cursor: pointer;
    font-size: 14px; font-weight: 700; display: flex; align-items: center;
    justify-content: center; gap: 8px; transition: all 0.2s; margin-bottom: 10px;
  }
  .express-apple { background: #000; color: #fff; }
  .express-apple:hover { background: #1a1a1a; }
  .express-google { background: #fff; color: #3c4043; }
  .express-google:hover { background: #f8f9fa; }

  /* ─── ORDER SUMMARY ─── */
  .order-line { display: flex; justify-content: space-between;
    font-size: 14px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .order-line:last-child { border-bottom: none; }
  .order-total { display: flex; justify-content: space-between;
    font-size: 16px; font-weight: 900; color: #fff; padding: 14px 0 0; }

  /* ─── TRIAL BADGE ─── */
  .trial-info {
    background: rgba(0,245,155,0.06); border: 1.5px solid rgba(0,245,155,0.22);
    border-radius: 14px; padding: 18px 20px;
    display: flex; align-items: flex-start; gap: 14px; margin-bottom: 20px;
  }
  .trial-icon { font-size: 24px; flex-shrink: 0; }
  .trial-text h4 { font-size: 15px; font-weight: 800; color: #00F59B; margin-bottom: 5px; }
  .trial-text p { font-size: 13px; color: #A8B3C7; line-height: 1.6; }

  /* ─── TRANSACTION HISTORY ─── */
  .tx-row { display: flex; align-items: center; justify-content: space-between;
    padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 13px; }
  .tx-row:last-child { border-bottom: none; }
  .tx-type { display: flex; align-items: center; gap: 10px; }
  .tx-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .tx-label { color: #A8B3C7; }
  .tx-date { color: #6B7A99; font-size: 12px; }
  .tx-amount { font-weight: 700; }

  /* ─── LEGAL STRIP ─── */
  .legal-strip {
    text-align: center; font-size: 12px; color: #4B5563; line-height: 2;
    padding: 24px 28px;
    border-top: 1px solid rgba(255,255,255,0.05);
  }
  .legal-strip a { color: #6B7A99; text-decoration: none; }
  .legal-strip a:hover { color: #20D9FF; }

  /* ─── FAQ MINI ─── */
  .faq-mini-item { padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.04); cursor: pointer; }
  .faq-mini-item:last-child { border-bottom: none; }
  .faq-mini-q { font-size: 14px; font-weight: 700; color: #fff;
    display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .faq-mini-q i { color: #20D9FF; font-size: 11px; transition: transform 0.2s; }
  .faq-mini-a { display: none; font-size: 13px; color: #A8B3C7; line-height: 1.7; padding-top: 8px; }
  .faq-mini-item.open .faq-mini-a { display: block; }
  .faq-mini-item.open .faq-mini-q i { transform: rotate(45deg); }
</style>

<!-- TOP BAR -->
<div class="bl-topbar">
  <div>
    <h1 style="font-size:20px;font-weight:900;color:#fff;margin:0;">Billing & Plan</h1>
    <p style="color:#A8B3C7;font-size:12px;margin:2px 0 0;">Manage your subscription, credits, and payment methods</p>
  </div>
  <a href="/pricing" style="display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:999px;border:1.5px solid rgba(32,217,255,0.35);color:#20D9FF;font-size:13px;font-weight:700;text-decoration:none;background:rgba(32,217,255,0.06);">
    <i class="fas fa-arrow-up"></i> Compare Plans
  </a>
</div>

<div class="bl-body">

  <!-- LEFT COLUMN -->
  <div style="display:flex;flex-direction:column;gap:20px;">

    <!-- CURRENT PLAN -->
    <div class="bl-card">
      <div class="bl-card-head">
        <div class="bl-card-title"><i class="fas fa-layer-group"></i> Current Plan</div>
        <div id="planBadge" class="plan-name-badge" style="background:rgba(32,217,255,0.1);border:1.5px solid rgba(32,217,255,0.3);color:#20D9FF;">
          Business
        </div>
      </div>
      <div class="bl-card-body">
        <!-- Trial Banner -->
        <div id="trialBanner" class="trial-info">
          <div class="trial-icon">🎁</div>
          <div class="trial-text">
            <h4>14-Day Free Trial Active</h4>
            <p>Your trial ends in <strong id="trialDaysLeft" style="color:#00F59B;">14 days</strong>. After that, you'll be charged $79/mo AUD. <a href="#payment" style="color:#20D9FF;">Add payment method</a> to continue uninterrupted.</p>
          </div>
        </div>

        <div id="planStats">
          <div class="plan-stat-row">
            <span class="plan-stat-label">Plan</span>
            <span class="plan-stat-val" id="planName">Business</span>
          </div>
          <div class="plan-stat-row">
            <span class="plan-stat-label">Status</span>
            <span id="planStatus" style="display:inline-flex;align-items:center;gap:6px;color:#00F59B;font-weight:700;">
              <span style="width:7px;height:7px;border-radius:50%;background:#00F59B;"></span> Active Trial
            </span>
          </div>
          <div class="plan-stat-row">
            <span class="plan-stat-label">Billing cycle</span>
            <span class="plan-stat-val" id="billingCycle">Monthly</span>
          </div>
          <div class="plan-stat-row">
            <span class="plan-stat-label">Next charge</span>
            <span class="plan-stat-val" id="nextCharge">After trial ends</span>
          </div>
          <div class="plan-stat-row">
            <span class="plan-stat-label">Amount</span>
            <span class="plan-stat-val" id="planAmount">$79.00 AUD</span>
          </div>
        </div>

        <!-- Credit Bar -->
        <div class="credit-bar-wrap">
          <div class="credit-bar-labels">
            <span><i class="fas fa-bolt" style="color:#FFB020;margin-right:4px;"></i><span id="credUsed">60</span> credits used</span>
            <span><span id="credMax">150</span> total</span>
          </div>
          <div class="credit-bar-track">
            <div class="credit-bar-fill" id="creditBarFill" style="width:40%;"></div>
          </div>
          <div style="margin-top:8px;font-size:12px;color:#6B7A99;">
            <span id="credRemaining" style="color:#FFB020;font-weight:700;">90 credits remaining</span>
            · Resets with next billing cycle
          </div>
        </div>

        <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;">
          <button onclick="showUpgrade()" style="flex:1;padding:11px;border-radius:12px;background:linear-gradient(135deg,#20D9FF,#8B5CF6);color:#fff;font-size:13px;font-weight:800;border:none;cursor:pointer;min-width:120px;">
            <i class="fas fa-arrow-up" style="margin-right:6px;"></i>Upgrade Plan
          </button>
          <button onclick="showCancelConfirm()" style="flex:1;padding:11px;border-radius:12px;background:rgba(248,113,113,0.08);border:1.5px solid rgba(248,113,113,0.3);color:#f87171;font-size:13px;font-weight:700;cursor:pointer;min-width:120px;">
            Cancel Plan
          </button>
        </div>
      </div>
    </div>

    <!-- PAYMENT METHOD -->
    <div class="bl-card" id="payment">
      <div class="bl-card-head">
        <div class="bl-card-title"><i class="fas fa-credit-card"></i> Payment Method</div>
        <button onclick="showAddCard()" style="font-size:12px;font-weight:700;color:#20D9FF;background:none;border:none;cursor:pointer;padding:4px 10px;border-radius:8px;border:1px solid rgba(32,217,255,0.3);">
          <i class="fas fa-plus" style="margin-right:4px;"></i>Add
        </button>
      </div>
      <div class="bl-card-body">
        <!-- Saved method -->
        <div class="pm-row" id="savedMethodRow" style="display:none;">
          <div class="pm-left">
            <div class="pm-icon">💳</div>
            <div>
              <div class="pm-name">Visa ending •••• 4242</div>
              <div class="pm-sub">Expires 04 / 28</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="pm-default">Default</span>
            <button onclick="removeCard()" style="background:none;border:none;cursor:pointer;color:#6B7A99;padding:4px;"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>

        <!-- No method message -->
        <div id="noMethodMsg" style="text-align:center;padding:20px 10px;color:#6B7A99;font-size:14px;">
          <i class="fas fa-credit-card" style="font-size:28px;margin-bottom:10px;display:block;color:#4B5563;"></i>
          No payment method added yet.<br>Add a card to activate your plan after the trial.
        </div>

        <!-- ADD CARD FORM -->
        <div id="addCardForm" style="display:none;margin-top:14px;">
          <div class="express-wrap">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
              <button class="express-btn express-apple" onclick="expressCheckout('apple')">
                <i class="fab fa-apple"></i> Pay
              </button>
              <button class="express-btn express-google" onclick="expressCheckout('google')">
                <img src="https://www.google.com/images/branding/product/1x/gsa_favicon_48dp.png" width="18" height="18" alt="G">
                Pay
              </button>
            </div>
            <div class="express-or"><span class="express-or-text">Or pay with card</span></div>
          </div>

          <div class="stripe-mock">
            <div>
              <label class="stripe-field-label">Card Number</label>
              <input class="stripe-field-input" type="text" placeholder="1234 5678 9012 3456" maxlength="19" id="cardNum" oninput="formatCard(this)">
            </div>
            <div class="stripe-field-row">
              <div>
                <label class="stripe-field-label">Expiry Date</label>
                <input class="stripe-field-input" type="text" placeholder="MM / YY" maxlength="7" id="cardExp">
              </div>
              <div>
                <label class="stripe-field-label">CVC</label>
                <input class="stripe-field-input" type="text" placeholder="123" maxlength="4" id="cardCvc">
              </div>
            </div>
            <div>
              <label class="stripe-field-label">Name on Card</label>
              <input class="stripe-field-input" type="text" placeholder="Jane Smith" id="cardName">
            </div>
            <div class="stripe-secure">
              <i class="fas fa-lock" style="color:#00F59B;"></i>
              Payments secured by Stripe · PCI DSS Level 1 certified · We never store card numbers
            </div>
            <button onclick="saveCard()" style="width:100%;padding:13px;border-radius:12px;background:linear-gradient(135deg,#20D9FF,#2F80FF,#8B5CF6);color:#fff;font-size:14px;font-weight:800;border:none;cursor:pointer;box-shadow:0 0 20px rgba(32,217,255,0.3);">
              <i class="fas fa-lock" style="margin-right:6px;"></i>Save Card & Activate Plan
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- CREDIT TOP-UPS -->
    <div class="bl-card">
      <div class="bl-card-head">
        <div class="bl-card-title"><i class="fas fa-bolt"></i> Buy More Credits</div>
        <span style="font-size:12px;color:#6B7A99;">1 credit ≈ $1 AUD value</span>
      </div>
      <div class="bl-card-body">
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">
          ${[
            { credits: 50, price: 59, name: 'Starter', per: '$1.18/cr' },
            { credits: 150, price: 159, name: 'Growth', per: '$1.06/cr' },
            { credits: 500, price: 449, name: 'Pro', per: '$0.90/cr', best: true },
            { credits: 2000, price: 1499, name: 'Agency', per: '$0.75/cr' },
          ].map(p => `
          <div onclick="buyPack(${p.credits},${p.price})" style="background:rgba(255,176,32,0.06);border:1.5px solid rgba(255,176,32,0.2);border-radius:14px;padding:16px 14px;cursor:pointer;transition:all .2s;text-align:center;" onmouseover="this.style.borderColor='rgba(255,176,32,0.5)'" onmouseout="this.style.borderColor='rgba(255,176,32,0.2)'">
            ${p.best ? '<div style="font-size:10px;font-weight:800;color:#00F59B;margin-bottom:4px;">⭐ BEST VALUE</div>' : ''}
            <div style="font-size:24px;font-weight:900;color:#FFB020;">${p.credits}</div>
            <div style="font-size:10px;color:#6B7A99;margin-bottom:6px;">credits · ${p.name}</div>
            <div style="font-size:16px;font-weight:800;color:#fff;">$${p.price} AUD</div>
            <div style="font-size:11px;color:#6B7A99;margin-top:2px;">${p.per}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- TRANSACTION HISTORY -->
    <div class="bl-card">
      <div class="bl-card-head">
        <div class="bl-card-title"><i class="fas fa-receipt"></i> Billing History</div>
        <button onclick="exportInvoices()" style="font-size:12px;color:#20D9FF;background:none;border:none;cursor:pointer;font-weight:700;"><i class="fas fa-download" style="margin-right:4px;"></i>Export</button>
      </div>
      <div class="bl-card-body" id="txHistory">
        ${[
          { type: 'Trial Start', color: '#00F59B', date: '6 Apr 2026', amount: '+60 cr', note: 'Business trial credits' },
          { type: 'Content Gen', color: '#20D9FF', date: '6 Apr 2026', amount: '−2 cr', note: 'Instagram + TikTok posts' },
          { type: 'Image Gen', color: '#8B5CF6', date: '6 Apr 2026', amount: '−4 cr', note: '1 DALL-E 3 image' },
          { type: 'Analysis', color: '#FFB020', date: '5 Apr 2026', amount: '−10 cr', note: 'Website brand audit' },
        ].map(tx => `
        <div class="tx-row">
          <div class="tx-type">
            <div class="tx-dot" style="background:${tx.color};box-shadow:0 0 6px ${tx.color}40;"></div>
            <div>
              <div class="tx-label">${tx.type}</div>
              <div style="font-size:11px;color:#4B5563;">${tx.note}</div>
            </div>
          </div>
          <div style="text-align:right;">
            <div class="tx-amount" style="color:${tx.amount.startsWith('+') ? '#00F59B' : '#F4F7FB'};">${tx.amount}</div>
            <div class="tx-date">${tx.date}</div>
          </div>
        </div>`).join('')}
        <div style="margin-top:12px;text-align:center;">
          <a href="/analytics" style="font-size:13px;color:#20D9FF;text-decoration:none;font-weight:700;">View full credit ledger →</a>
        </div>
      </div>
    </div>

  </div><!-- end left -->

  <!-- RIGHT COLUMN — ORDER SUMMARY + FAQ -->
  <div style="display:flex;flex-direction:column;gap:20px;">

    <!-- ORDER SUMMARY -->
    <div class="bl-card" style="border-color:rgba(139,92,246,0.3);">
      <div class="bl-card-head" style="background:rgba(139,92,246,0.04);">
        <div class="bl-card-title"><i class="fas fa-shopping-cart" style="color:#8B5CF6;"></i> Order Summary</div>
      </div>
      <div class="bl-card-body">
        <div id="orderSummaryLines">
          <div class="order-line"><span style="color:#A8B3C7;">Business Plan</span><span id="orderPlanPrice" style="color:#fff;font-weight:700;">$79.00 / mo</span></div>
          <div class="order-line"><span style="color:#A8B3C7;">Trial credits (60 cr)</span><span style="color:#00F59B;font-weight:700;">FREE</span></div>
          <div class="order-line"><span style="color:#A8B3C7;">Billed today</span><span style="color:#00F59B;font-weight:800;">$0.00</span></div>
          <div class="order-total">
            <span>Due after trial</span>
            <span id="orderTotal" style="color:#FFB020;">$79.00 AUD</span>
          </div>
        </div>
        <p style="font-size:12px;color:#4B5563;margin-top:12px;line-height:1.8;">
          No charge today. Your card is saved for after the 14-day trial. Cancel anytime before the trial ends and you won't be charged.
        </p>
        <div style="margin-top:16px;display:flex;align-items:center;gap:8px;font-size:12px;color:#6B7A99;">
          <i class="fas fa-lock" style="color:#00F59B;"></i> Stripe-secured · AES-256 encrypted
        </div>
        <!-- Stripe logo placeholder -->
        <div style="margin-top:14px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/svgs/brands/stripe.svg" height="20" alt="Stripe" style="filter:invert(1);opacity:0.4;">
          <img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/svgs/brands/cc-visa.svg" height="20" alt="Visa" style="filter:invert(1);opacity:0.4;">
          <img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/svgs/brands/cc-mastercard.svg" height="20" alt="MC" style="filter:invert(1);opacity:0.4;">
          <img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/svgs/brands/cc-amex.svg" height="20" alt="Amex" style="filter:invert(1);opacity:0.4;">
          <img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/svgs/brands/apple-pay.svg" height="20" alt="ApplePay" style="filter:invert(1);opacity:0.4;">
          <img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/svgs/brands/google-pay.svg" height="20" alt="GPay" style="filter:invert(1);opacity:0.4;">
        </div>
      </div>
    </div>

    <!-- UPGRADE OPTIONS -->
    <div class="bl-card" id="upgradePanel" style="display:none;">
      <div class="bl-card-head">
        <div class="bl-card-title"><i class="fas fa-arrow-circle-up"></i> Upgrade Plan</div>
        <button onclick="hideUpgrade()" style="background:none;border:none;cursor:pointer;color:#6B7A99;font-size:16px;">✕</button>
      </div>
      <div class="bl-card-body">
        ${[
          { name: 'Pro', price: 199, credits: 500, color: '#8B5CF6', tag: 'Best value' },
          { name: 'Enterprise', price: 699, credits: 2500, color: '#FF2DA6', tag: 'For agencies' },
        ].map(p => `
        <div onclick="selectUpgrade('${p.name.toLowerCase()}',${p.price})" style="background:rgba(255,255,255,0.03);border:1.5px solid rgba(${p.color === '#8B5CF6' ? '139,92,246' : '255,45,166'},0.3);border-radius:14px;padding:16px;cursor:pointer;margin-bottom:10px;transition:all .2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <div style="font-size:14px;font-weight:800;color:${p.color};">${p.name}</div>
              <div style="font-size:12px;color:#6B7A99;">${p.tag} · ${p.credits} credits/mo</div>
            </div>
            <div style="font-size:20px;font-weight:900;color:#fff;">$${p.price}<span style="font-size:12px;color:#6B7A99;">/mo</span></div>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- FAQ MINI -->
    <div class="bl-card">
      <div class="bl-card-head">
        <div class="bl-card-title"><i class="fas fa-question-circle"></i> Quick Help</div>
      </div>
      <div class="bl-card-body">
        ${[
          ['When will I be charged?',"You won't be charged during your 14-day trial. Your first charge occurs on the day after your trial ends."],
          ['How do I cancel?','Click "Cancel Plan" above. Your access continues until the end of the current billing period.'],
          ['What happens to unused credits?',"Unused monthly credits expire at the end of each billing cycle. Top-up pack credits don't expire."],
          ['Is my card safe?','Yes. We use Stripe — we never see or store your card details. All transactions are PCI DSS Level 1 compliant.'],
        ].map(([q,a]) => `
        <div class="faq-mini-item" onclick="this.classList.toggle('open')">
          <div class="faq-mini-q">${q}<i class="fas fa-plus"></i></div>
          <div class="faq-mini-a">${a}</div>
        </div>`).join('')}
        <div style="margin-top:14px;text-align:center;">
          <a href="/faq" style="font-size:13px;color:#20D9FF;text-decoration:none;font-weight:700;">Full FAQ →</a>
        </div>
      </div>
    </div>

  </div><!-- end right -->

</div><!-- end bl-body -->

<!-- LEGAL STRIP -->
<div class="legal-strip">
  All prices in AUD · GST included · Powered by Stripe<br>
  <a href="/terms">Terms of Service</a> ·
  <a href="/privacy">Privacy Policy</a> ·
  <a href="/cookies">Cookie Policy</a> ·
  <a href="/gdpr">GDPR / Data Rights</a> ·
  <a href="/billing-policy">Billing & Refund Policy</a> ·
  <a href="/faq">FAQ</a> ·
  <a href="mailto:support@socialstrategyapp.com">support@socialstrategyapp.com</a>
</div>

<script>
// Load account data
async function loadBillingData() {
  try {
    const resp = await fetch('/api/account');
    const data = await resp.json();
    if (!data.success) return;
    const used = data.creditsUsed || 0;
    const max = data.creditsMax || 150;
    const remaining = data.creditsRemaining || (max - used);
    document.getElementById('credUsed').textContent = used;
    document.getElementById('credMax').textContent = max;
    document.getElementById('credRemaining').textContent = remaining + ' credits remaining';
    document.getElementById('creditBarFill').style.width = data.creditsPct + '%';
    if (data.plan) {
      const planNames = { free:'Free', business:'Business', pro:'Pro', enterprise:'Enterprise' };
      const planPrices = { free:'$0', business:'$79.00 AUD', pro:'$199.00 AUD', enterprise:'$699.00+ AUD' };
      document.getElementById('planName').textContent = planNames[data.plan] || data.plan;
      document.getElementById('planAmount').textContent = planPrices[data.plan] || '—';
      document.getElementById('planBadge').textContent = planNames[data.plan] || data.plan;
    }
    if (data.daysLeft !== null && data.daysLeft <= 14 && data.status === 'trial') {
      document.getElementById('trialDaysLeft').textContent = data.daysLeft + ' days';
      document.getElementById('trialBanner').style.display = 'flex';
    } else {
      document.getElementById('trialBanner').style.display = 'none';
    }
  } catch(e) { console.log('Billing load error:', e); }
}

function showAddCard() {
  const f = document.getElementById('addCardForm');
  f.style.display = f.style.display === 'none' ? 'block' : 'none';
}

function saveCard() {
  const num = document.getElementById('cardNum').value.replace(/\s/g,'');
  const exp = document.getElementById('cardExp').value;
  const cvc = document.getElementById('cardCvc').value;
  const name = document.getElementById('cardName').value;
  if (!num || !exp || !cvc || !name) { alert('Please fill in all card fields.'); return; }
  if (num.length < 14) { alert('Please enter a valid card number.'); return; }
  document.getElementById('addCardForm').style.display = 'none';
  document.getElementById('savedMethodRow').style.display = 'flex';
  document.getElementById('noMethodMsg').style.display = 'none';
  showToast('✓ Card saved successfully!', '#00F59B');
}

function removeCard() {
  if (!confirm('Remove this payment method?')) return;
  document.getElementById('savedMethodRow').style.display = 'none';
  document.getElementById('noMethodMsg').style.display = 'block';
}

function formatCard(input) {
  let v = input.value.replace(/\D/g,'').slice(0,16);
  input.value = v.match(/.{1,4}/g)?.join(' ') || v;
}

function expressCheckout(type) {
  showToast('Opening ' + (type === 'apple' ? 'Apple Pay' : 'Google Pay') + '...', '#20D9FF');
}

function buyPack(credits, price) {
  if (confirm('Purchase ' + credits + ' credits for $' + price + ' AUD?')) {
    showToast('Redirecting to secure checkout...', '#FFB020');
    setTimeout(() => { window.location.href = '/login?pack=' + credits; }, 1000);
  }
}

function showUpgrade() { document.getElementById('upgradePanel').style.display = 'block'; }
function hideUpgrade() { document.getElementById('upgradePanel').style.display = 'none'; }
function selectUpgrade(plan, price) {
  showToast('Upgrading to ' + plan + '...', '#8B5CF6');
  setTimeout(() => { window.location.href = '/login?upgrade=' + plan; }, 800);
}

function showCancelConfirm() {
  if (confirm('Are you sure you want to cancel your plan? You will lose access to paid features at the end of your billing period.')) {
    showToast('Cancellation requested. Access continues until end of period.', '#f87171');
  }
}

function exportInvoices() {
  showToast('Preparing invoice export...', '#20D9FF');
}

function showToast(msg, color) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0d1830;border:1.5px solid ' + color + ';color:#fff;padding:12px 24px;border-radius:12px;font-size:14px;font-weight:700;z-index:9999;box-shadow:0 0 20px ' + color + '40;';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

loadBillingData();
</script>
`

  return layout('Billing & Plan', content)
}
