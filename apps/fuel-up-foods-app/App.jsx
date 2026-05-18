// ============================================================
// FUEL UP FOODS AUSTRALIA PTY LTD — STANDALONE REACT APP
// 3 Brands: Iron Plate Meals | Tradie Fuel | Home Harvest Meals
// ============================================================
// PRICING & MENU: Update the MENU_DATA object below.
// CONTACT: Update the CONFIG object below.
// ============================================================

import React, { useState, useEffect } from 'react';

// ─── CONFIG ──────────────────────────────────────────────────
const CONFIG = {
  company: 'Fuel Up Foods Australia Pty Ltd',
  abn: 'XX XXX XXX XXX',
  phone: '0XXX XXX XXX',
  email: 'orders@fuelupfoods.com.au',
  web: 'fuelupfoods.com.au',
  address: 'Young, NSW 2594',
  ndisLineItem: '01_022_0120_1_1',
  delivery: {
    zone1: { label: 'Young Town Centre', fee: 'Free over $60', km: '0–5km' },
    zone2: { label: 'Young Surrounds', fee: '$5.00', km: '5–15km' },
    zone3: { label: 'Cowra / Grenfell / Cootamundra', fee: '$10 – $15', km: '15–45km' },
  },
  cutoffs: [
    { day: 'Monday 12pm', delivery: 'Wednesday' },
    { day: 'Wednesday 12pm', delivery: 'Friday' },
  ],
};

// ─── BRAND CONFIG ────────────────────────────────────────────
const BRANDS = {
  ironplate: {
    id: 'ironplate',
    name: 'Iron Plate Meals',
    tagline: 'High Protein. Real Results.',
    desc: 'Macro-tracked, high-protein meals for gym-goers, athletes and anyone chasing a body composition goal. Every meal is built around quality protein and clean carbs.',
    color: '#C0392B',
    bg: '#2C3E50',
    accent: '#F39C12',
    icon: '🏋️',
    features: ['High Protein (40g+)', 'Macro Tracked', 'Gym-Optimised', 'Never Frozen'],
  },
  tradie: {
    id: 'tradie',
    name: 'Tradie Fuel Meals',
    tagline: 'Big Portions. Real Food. For Real Workers.',
    desc: 'Generous, hearty meals built for tradies, labourers and anyone who works hard for a living. Full of carbs and protein to power you through a long shift.',
    color: '#E67E22',
    bg: '#2C3E50',
    accent: '#F1C40F',
    icon: '🔨',
    features: ['Generous Portions', 'High Carb Energy', 'No Fuss Flavours', 'Delivered Fresh'],
  },
  harvest: {
    id: 'harvest',
    name: 'Home Harvest Meals',
    tagline: 'Family Meals + NDIS. Fresh, Local, Delivered.',
    desc: 'Family-sized meals and individual portions for busy households and NDIS participants. Cooked fresh in Young NSW. NDIS-registered — eligible participants pay as little as 30%.',
    color: '#27AE60',
    bg: '#1B4332',
    accent: '#A8DADC',
    icon: '🏠',
    features: ['Serves 1–6', 'NDIS Registered', 'Locally Made', 'Freezer Friendly'],
  },
};

// ─── MENU DATA — update prices and items here ───────────────
const MENU_DATA = {
  ironplate: [
    { name: 'Iron Bull Beef Bowl', desc: '200g grass-fed beef mince, brown rice, steamed broccoli, lean sauce', protein: '52g', carbs: '65g', cal: '620', price: 14.50, tag: 'Best Seller' },
    { name: 'Shredder Chicken', desc: 'Grilled chicken breast, sweet potato, spinach, lemon dressing', protein: '48g', carbs: '55g', cal: '540', price: 13.50, tag: '' },
    { name: 'Salmon Strength', desc: 'Atlantic salmon fillet, sweet potato mash, broccolini, dill butter', protein: '42g', carbs: '50g', cal: '610', price: 17.00, tag: 'Premium' },
    { name: 'Steak & Sweet Potato', desc: 'Eye fillet steak, sweet potato mash, green beans, rosemary jus', protein: '50g', carbs: '48g', cal: '580', price: 18.00, tag: 'Premium' },
    { name: 'Muscle Meatballs', desc: 'Beef meatballs in napoli sauce, wholegrain pasta, parmesan', protein: '44g', carbs: '75g', cal: '640', price: 14.00, tag: '' },
    { name: 'Turkey Taco Bowl', desc: 'Seasoned turkey mince, brown rice, pico de gallo, avocado crema', protein: '46g', carbs: '60g', cal: '590', price: 15.00, tag: '' },
    { name: 'Lean Lamb Kofta', desc: 'Grilled lamb kofta, bulgur wheat, tzatziki, cucumber salad', protein: '40g', carbs: '52g', cal: '560', price: 16.00, tag: '' },
    { name: '🌿 Tofu Teriyaki Bowl', desc: 'Marinated firm tofu, edamame, brown rice, sesame, ginger glaze', protein: '32g', carbs: '70g', cal: '530', price: 12.50, tag: 'Vegan' },
  ],
  tradie: [
    { name: 'The Smoko Spag Bol', desc: 'Classic beef bolognese, spaghetti, generous sauce, parmesan — a full serve', carbs: '95g', protein: '38g', cal: '780', price: 13.00, tag: 'Best Seller' },
    { name: "Tradie's Roast", desc: 'Slow-roasted beef, roast potatoes, pumpkin, gravy, steamed greens', carbs: '85g', protein: '42g', cal: '760', price: 16.00, tag: '' },
    { name: 'BBQ Pulled Pork & Mash', desc: 'Smoky slow-cooked pulled pork, creamy mash, house coleslaw', carbs: '90g', protein: '38g', cal: '800', price: 15.50, tag: '' },
    { name: 'Chicken Schnitty Bowl', desc: 'Crumbed chicken schnitzel, mash, peas, mushroom gravy', carbs: '80g', protein: '44g', cal: '750', price: 14.50, tag: '' },
    { name: 'Steak & Chips Bowl', desc: 'Sirloin steak, thick-cut roasted chips, grilled tomato, onion rings', carbs: '75g', protein: '46g', cal: '780', price: 17.00, tag: 'Fan Fave' },
    { name: 'Lamb Shank Stew', desc: 'Braised lamb shank, root vegetable stew, crusty bread on side', carbs: '70g', protein: '48g', cal: '720', price: 18.00, tag: '' },
    { name: 'Beef Pie & Mash', desc: 'House-made beef and mushroom pie, mash, peas, gravy pour-over', carbs: '85g', protein: '36g', cal: '760', price: 15.00, tag: 'Fan Fave' },
    { name: '🌿 Veggie Lasagne', desc: 'Rich ricotta and vegetable lasagne, side salad — hearty and filling', carbs: '85g', protein: '28g', cal: '640', price: 12.00, tag: 'Vego' },
  ],
  harvest: [
    { name: 'Family Spag Bol', desc: 'Classic beef bolognese sauce with spaghetti — serves 4', serves: '4', price: 38.00, tag: 'Best Seller', ndis: false },
    { name: 'Family Beef Lasagne', desc: 'Layers of rich beef and béchamel — serves 4', serves: '4', price: 38.00, tag: '', ndis: false },
    { name: 'Slow Cook Lamb Shanks', desc: '4 braised lamb shanks, mash, steamed greens, jus', serves: '4', price: 55.00, tag: 'Premium', ndis: false },
    { name: 'Family Butter Chicken', desc: 'Mild butter chicken curry, steamed rice, naan — serves 4', serves: '4', price: 38.00, tag: '', ndis: false },
    { name: 'Family Butter Chicken', desc: 'Coconut vegetable curry, jasmine rice — serves 4', serves: '4', price: 32.00, tag: 'Vegan', ndis: false },
    { name: 'Family Beef Stew', desc: 'Slow-cooked beef and vegetable casserole — serves 4', serves: '4', price: 40.00, tag: '', ndis: false },
    { name: '🏠 NDIS Individual Meal', desc: 'Any individual meal — NDIS participants pay 30% upfront. 70% funded via plan.', serves: '1', price: 17.00, tag: 'NDIS', ndis: true },
    { name: '🏠 NDIS Meal — Weekly Pack (5)', desc: '5 individual meals — Monday–Friday delivery plan', serves: '5', price: 85.00, tag: 'NDIS Pack', ndis: true },
  ],
};

// ─── STYLES HELPER ────────────────────────────────────────────
const activeBrandColors = (brand) => ({
  primary: brand.color,
  bg: brand.bg,
  accent: brand.accent,
});

// ─── CART UTILITIES ───────────────────────────────────────────
const cartUtils = {
  add: (cart, item, qty = 1) => {
    const key = `${item.name}`;
    const existing = cart.find(c => c.name === key);
    if (existing) return cart.map(c => c.name === key ? { ...c, qty: c.qty + qty } : c);
    return [...cart, { ...item, qty }];
  },
  remove: (cart, name) => cart.filter(c => c.name !== name),
  update: (cart, name, qty) => {
    if (qty <= 0) return cartUtils.remove(cart, name);
    return cart.map(c => c.name === name ? { ...c, qty } : c);
  },
  total: (cart) => cart.reduce((sum, c) => sum + c.price * c.qty, 0),
  count: (cart) => cart.reduce((sum, c) => sum + c.qty, 0),
};

// ─── BADGE COMPONENT ─────────────────────────────────────────
const TagBadge = ({ tag, color }) => {
  if (!tag) return null;
  const colors = {
    'Best Seller': { bg: '#fff3cd', color: '#856404' },
    'Premium': { bg: '#e8d5ff', color: '#6a1b9a' },
    'Fan Fave': { bg: '#ffe0cc', color: '#c0392b' },
    'Vegan': { bg: '#d4edda', color: '#155724' },
    'Vego': { bg: '#d4edda', color: '#155724' },
    'NDIS': { bg: '#cce5ff', color: '#004085' },
    'NDIS Pack': { bg: '#cce5ff', color: '#004085' },
  };
  const style = colors[tag] || { bg: `${color}22`, color };
  return (
    <span style={{
      background: style.bg, color: style.color,
      borderRadius: 12, padding: '2px 9px', fontSize: '0.72rem',
      fontWeight: 800, marginLeft: 8, display: 'inline-block',
    }}>
      {tag}
    </span>
  );
};

// ─── CART SIDEBAR ─────────────────────────────────────────────
const CartSidebar = ({ cart, setCart, onClose }) => {
  const total = cartUtils.total(cart);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [zone, setZone] = useState('zone1');

  const deliveryFees = { zone1: 0, zone2: 5, zone3: 12.50 };
  const deliveryFee = total >= 60 && zone === 'zone1' ? 0 : deliveryFees[zone];

  if (submitted) return (
    <div style={{
      position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: 420,
      height: '100vh', background: '#fff', zIndex: 2000,
      boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 40, textAlign: 'center',
    }}>
      <div style={{ fontSize: '3.5rem', marginBottom: 20 }}>✅</div>
      <h2 style={{ color: '#1a1a2e', fontWeight: 900, marginBottom: 12 }}>Order Placed!</h2>
      <p style={{ color: '#555', lineHeight: 1.7, marginBottom: 24 }}>
        Thanks {name}! Your order has been received. We'll confirm via email and deliver on your next scheduled day.
      </p>
      <p style={{ color: '#888', fontSize: '0.85rem' }}>NDIS participants: we'll contact your plan manager separately for the funded portion.</p>
      <button
        onClick={onClose}
        style={{
          marginTop: 24, background: '#27AE60', color: '#fff',
          border: 'none', borderRadius: 30, padding: '12px 28px',
          fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem',
        }}
      >
        Close
      </button>
    </div>
  );

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: '#00000055', zIndex: 1999 }} />
      <div style={{
        position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: 420,
        height: '100vh', background: '#fff', zIndex: 2000,
        boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          background: '#1B4332', color: '#fff',
          padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>🛒 Your Order</div>
            <div style={{ color: '#A8DADC', fontSize: '0.8rem' }}>{cartUtils.count(cart)} item{cartUtils.count(cart) !== 1 ? 's' : ''}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.4rem', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🛒</div>
              <p>Your cart is empty. Browse our menus and add some meals!</p>
            </div>
          ) : (
            <>
              {cart.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 0', borderBottom: '1px solid #f0f0f0',
                }}>
                  <div style={{ flex: 1, paddingRight: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#333' }}>{item.name}</div>
                    <div style={{ color: '#888', fontSize: '0.8rem' }}>${item.price.toFixed(2)} each</div>
                    {item.ndis && (
                      <div style={{ color: '#004085', fontSize: '0.78rem', fontWeight: 700 }}>
                        NDIS: You pay ${(item.price * 0.3).toFixed(2)} · Plan pays ${(item.price * 0.7).toFixed(2)}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      onClick={() => setCart(cartUtils.update(cart, item.name, item.qty - 1))}
                      style={{
                        width: 30, height: 30, borderRadius: '50%',
                        border: '1.5px solid #ddd', background: '#fff',
                        cursor: 'pointer', fontSize: '1rem', fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >−</button>
                    <span style={{ fontWeight: 800, minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                    <button
                      onClick={() => setCart(cartUtils.update(cart, item.name, item.qty + 1))}
                      style={{
                        width: 30, height: 30, borderRadius: '50%',
                        border: 'none', background: '#27AE60', color: '#fff',
                        cursor: 'pointer', fontSize: '1rem', fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >+</button>
                  </div>
                  <div style={{ fontWeight: 800, color: '#1B4332', fontSize: '0.95rem', minWidth: 60, textAlign: 'right' }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}

              {/* Delivery zone */}
              <div style={{ marginTop: 20, marginBottom: 16 }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#444', marginBottom: 8 }}>
                  Delivery Zone
                </label>
                <select
                  value={zone}
                  onChange={e => setZone(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: 10,
                    border: '1.5px solid #e0e0e0', fontSize: '0.9rem', fontFamily: 'inherit',
                  }}
                >
                  <option value="zone1">Zone 1 — Young Town (Free over $60)</option>
                  <option value="zone2">Zone 2 — Young Surrounds 5–15km ($5)</option>
                  <option value="zone3">Zone 3 — Cowra/Grenfell/Coota ($12.50)</option>
                </select>
              </div>

              {/* Totals */}
              <div style={{ padding: '16px 0', borderTop: '2px solid #f0f0f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: '#666', fontSize: '0.9rem' }}>
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: '#666', fontSize: '0.9rem' }}>
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1.1rem', color: '#1B4332', paddingTop: 8, borderTop: '1px solid #eee' }}>
                  <span>Total</span>
                  <span>${(total + deliveryFee).toFixed(2)}</span>
                </div>
              </div>

              {/* Customer details */}
              <div style={{ marginTop: 16 }}>
                {[
                  { placeholder: 'Full Name', value: name, onChange: setName },
                  { placeholder: 'Phone Number', value: phone, onChange: setPhone },
                  { placeholder: 'Email Address', value: email, onChange: setEmail },
                ].map((f, i) => (
                  <input
                    key={i}
                    placeholder={f.placeholder}
                    value={f.value}
                    onChange={e => f.onChange(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 13px', borderRadius: 10,
                      border: '1.5px solid #e0e0e0', fontSize: '0.9rem',
                      fontFamily: 'inherit', marginBottom: 10, boxSizing: 'border-box',
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Checkout button */}
        {cart.length > 0 && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f0f0', background: '#f8f8f8' }}>
            <button
              onClick={() => {
                if (!name || !email || !phone) {
                  alert('Please fill in your name, email and phone number.');
                  return;
                }
                setSubmitted(true);
              }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #27AE60, #1e8449)',
                color: '#fff', border: 'none', borderRadius: 30,
                padding: '15px', fontWeight: 900, fontSize: '1.05rem',
                cursor: 'pointer', boxShadow: '0 4px 20px #27ae6055',
              }}
            >
              Place Order — ${(total + deliveryFee).toFixed(2)}
            </button>
            <p style={{ textAlign: 'center', color: '#aaa', fontSize: '0.75rem', marginTop: 10 }}>
              Payment collected on delivery or via invoice link
            </p>
          </div>
        )}
      </div>
    </>
  );
};

// ─── NAV ─────────────────────────────────────────────────────

const Nav = ({ active, setActive, cart, setCartOpen, menuOpen, setMenuOpen }) => {
  const links = ['home', 'menu', 'ndis', 'delivery', 'contact'];
  const labels = { home: 'Home', menu: 'Our Menu', ndis: 'NDIS', delivery: 'Delivery', contact: 'Contact' };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: '#1B4332f5',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #27AE6033',
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
      }}>
        <div onClick={() => setActive('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.6rem' }}>🍽️</span>
          <div>
            <div style={{ color: '#52B788', fontWeight: 900, fontSize: '1rem', letterSpacing: 1 }}>FUEL UP FOODS</div>
            <div style={{ color: '#A8DADC', fontSize: '0.65rem', letterSpacing: 2, textTransform: 'uppercase' }}>Australia — Young NSW</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
          {links.slice(1).map(l => (
            <button
              key={l}
              onClick={() => setActive(l)}
              style={{
                background: active === l ? '#27AE6033' : 'transparent',
                color: active === l ? '#52B788' : '#A8DADC',
                border: `1px solid ${active === l ? '#27AE6055' : 'transparent'}`,
                borderRadius: 20,
                padding: '7px 16px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {labels[l]}
            </button>
          ))}
          <button
            onClick={() => setCartOpen(true)}
            style={{
              position: 'relative',
              background: '#27AE60',
              color: '#fff',
              border: 'none',
              borderRadius: 30,
              padding: '9px 20px',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              marginLeft: 8,
            }}
          >
            🛒 Cart
            {cartUtils.count(cart) > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -6,
                background: '#C0392B', color: '#fff',
                borderRadius: '50%', width: 20, height: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.72rem', fontWeight: 900,
              }}>
                {cartUtils.count(cart)}
              </span>
            )}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="mobile-controls">
          <button
            onClick={() => setCartOpen(true)}
            style={{
              position: 'relative',
              background: '#27AE60',
              color: '#fff',
              border: 'none',
              borderRadius: 30,
              padding: '8px 16px',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'none',
            }}
            className="mobile-cart"
          >
            🛒 {cartUtils.count(cart) > 0 ? cartUtils.count(cart) : ''}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: '#52B788', fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}
            className="hamburger"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ background: '#1B4332', borderTop: '1px solid #27AE6033', padding: '16px 24px' }}>
          {links.map(l => (
            <div
              key={l}
              onClick={() => { setActive(l); setMenuOpen(false); }}
              style={{
                color: active === l ? '#52B788' : '#A8DADC',
                padding: '12px 0', borderBottom: '1px solid #ffffff11',
                fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
              }}
            >
              {labels[l]}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
          .mobile-cart { display: block !important; }
          .mobile-controls { display: flex !important; }
        }
        .mobile-controls { display: none; }
      `}</style>
    </nav>
  );
};

// ─── FLOATING CART BAR ───────────────────────────────────────
const FloatingCartBar = ({ cart, setCartOpen }) => {
  if (cartUtils.count(cart) === 0) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#27AE60', color: '#fff',
      padding: '14px 24px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      zIndex: 900,
      boxShadow: '0 -4px 24px rgba(0,0,0,0.2)',
    }}>
      <div>
        <span style={{ fontWeight: 800 }}>{cartUtils.count(cart)} item{cartUtils.count(cart) > 1 ? 's' : ''} in cart</span>
      </div>
      <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>${cartUtils.total(cart).toFixed(2)}</div>
      <button
        onClick={() => setCartOpen(true)}
        style={{
          background: '#fff', color: '#27AE60',
          border: 'none', borderRadius: 30,
          padding: '10px 24px', fontWeight: 900,
          fontSize: '0.95rem', cursor: 'pointer',
        }}
      >
        View Order →
      </button>
    </div>
  );
};

// ─── HOME PAGE ────────────────────────────────────────────────

const HomePage = ({ setActive }) => (
  <div>
    {/* Hero */}
    <div style={{
      background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 60%, #1B4332 100%)',
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 24px 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', width: 700, height: 700,
        background: 'radial-gradient(circle, #52B78818 0%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', maxWidth: 800 }}>
        <div style={{
          display: 'inline-block',
          background: '#52B78822',
          border: '1px solid #52B78844',
          color: '#52B788',
          borderRadius: 30,
          padding: '6px 18px',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginBottom: 24,
        }}>
          🍽️ Fresh Meal Prep — Made in Young, NSW
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 7vw, 4.8rem)',
          fontWeight: 900,
          color: '#fff',
          lineHeight: 1.1,
          marginBottom: 24,
        }}>
          Real Food.{' '}
          <span style={{
            background: 'linear-gradient(135deg, #52B788, #A8DADC)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Your Way.
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          color: '#B7E4C7',
          maxWidth: 660,
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Three brands built for three different lives — high-protein gym meals, big hearty tradie portions,
          and fresh family meals with NDIS support. All made fresh in Young NSW. Delivered twice a week.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
          <button
            onClick={() => setActive('menu')}
            style={{
              background: 'linear-gradient(135deg, #27AE60, #1e8449)',
              color: '#fff', border: 'none', borderRadius: 30,
              padding: '14px 32px', fontWeight: 900, fontSize: '1rem',
              cursor: 'pointer', boxShadow: '0 4px 20px #27ae6055',
            }}
          >
            Browse Our Menus →
          </button>
          <button
            onClick={() => setActive('ndis')}
            style={{
              background: 'transparent',
              color: '#52B788', border: '2px solid #52B788',
              borderRadius: 30, padding: '12px 28px',
              fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
            }}
          >
            NDIS Info →
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {['Fresh Never Frozen', 'Made in Young NSW', 'NDIS Registered', 'Delivered Twice Weekly', 'Vegan Options', 'Family Sizes'].map(b => (
            <span key={b} style={{
              background: '#52B78822',
              border: '1px solid #52B78844',
              color: '#52B788',
              borderRadius: 20, padding: '4px 14px',
              fontSize: '0.8rem', fontWeight: 700, margin: 4,
            }}>
              ✓ {b}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* 3 Brand Cards */}
    <div style={{ background: '#f8f9fa', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, color: '#1B4332', marginBottom: 12 }}>
            Three Brands. One Kitchen. Real Food.
          </h2>
          <p style={{ color: '#555', fontSize: '1.05rem', maxWidth: 600, margin: '0 auto' }}>
            We don't make one-size-fits-all meals. Pick the brand that fits your life.
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 28,
        }}>
          {Object.values(BRANDS).map((brand, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 4px 28px rgba(0,0,0,0.08)',
              border: `2px solid ${brand.color}33`,
              transition: 'transform 0.2s',
            }}>
              <div style={{
                background: `linear-gradient(135deg, ${brand.bg}, ${brand.color}55)`,
                padding: '36px 28px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '3.5rem', marginBottom: 12 }}>{brand.icon}</div>
                <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '1.2rem', marginBottom: 6 }}>{brand.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>{brand.tagline}</p>
              </div>
              <div style={{ padding: 28 }}>
                <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 18 }}>{brand.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  {brand.features.map(f => (
                    <span key={f} style={{
                      background: `${brand.color}18`,
                      color: brand.color,
                      borderRadius: 12, padding: '3px 10px',
                      fontSize: '0.78rem', fontWeight: 700,
                    }}>
                      {f}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setActive('menu')}
                  style={{
                    width: '100%',
                    background: brand.color,
                    color: '#fff', border: 'none', borderRadius: 30,
                    padding: '12px', fontWeight: 800, fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  See {brand.name} Menu →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Order cutoffs */}
    <div style={{ background: '#1B4332', padding: '60px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ color: '#52B788', fontSize: '1.8rem', fontWeight: 900, marginBottom: 24 }}>
          📅 Order Cutoffs & Delivery Days
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 32 }}>
          {CONFIG.cutoffs.map((c, i) => (
            <div key={i} style={{
              background: '#ffffff0a',
              border: '1px solid #52B78833',
              borderRadius: 14, padding: 24,
            }}>
              <div style={{ color: '#52B788', fontWeight: 900, fontSize: '1.1rem', marginBottom: 8 }}>
                Order by: {c.day}
              </div>
              <div style={{ color: '#B7E4C7', fontSize: '0.9rem' }}>
                Delivered: {c.delivery}
              </div>
            </div>
          ))}
        </div>
        <p style={{ color: '#A8DADC', fontSize: '0.9rem', lineHeight: 1.7 }}>
          Orders placed after the cutoff time move to the following delivery run.
          Store meals in the fridge (up to 5 days) or freezer (up to 3 months).
        </p>
      </div>
    </div>
  </div>
);

// ─── MENU PAGE ────────────────────────────────────────────────

const MenuPage = ({ cart, setCart }) => {
  const [activeBrand, setActiveBrand] = useState('ironplate');
  const brand = BRANDS[activeBrand];
  const meals = MENU_DATA[activeBrand];
  const [added, setAdded] = useState({});

  const handleAdd = (meal) => {
    setCart(cartUtils.add(cart, meal));
    setAdded(prev => ({ ...prev, [meal.name]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [meal.name]: false })), 1200);
  };

  return (
    <div style={{ background: '#f8f9fa', padding: '60px 24px', paddingBottom: cartUtils.count(cart) > 0 ? 100 : 60 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, color: '#1B4332', marginBottom: 12 }}>
            This Week's Menu
          </h1>
          <p style={{ color: '#555', fontSize: '1rem' }}>
            Fresh each week. Cooked in Young NSW. Delivered to your door.
          </p>
        </div>

        {/* Brand tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
          {Object.values(BRANDS).map(b => (
            <button
              key={b.id}
              onClick={() => setActiveBrand(b.id)}
              style={{
                padding: '12px 24px', borderRadius: 30, border: 'none', cursor: 'pointer',
                background: activeBrand === b.id ? b.color : '#fff',
                color: activeBrand === b.id ? '#fff' : '#555',
                fontWeight: 800, fontSize: '0.95rem',
                boxShadow: activeBrand === b.id ? `0 4px 20px ${b.color}55` : '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.2s',
              }}
            >
              {b.icon} {b.name}
            </button>
          ))}
        </div>

        {/* Active brand header */}
        <div style={{
          background: `linear-gradient(135deg, ${brand.bg}, ${brand.color}55)`,
          borderRadius: 16, padding: '28px 32px',
          marginBottom: 32, color: '#fff',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16,
        }}>
          <div>
            <h2 style={{ fontWeight: 900, fontSize: '1.4rem', marginBottom: 4 }}>{brand.icon} {brand.name}</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>{brand.tagline}</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {brand.features.map(f => (
              <span key={f} style={{
                background: 'rgba(255,255,255,0.15)', color: '#fff',
                borderRadius: 20, padding: '4px 12px', fontSize: '0.78rem', fontWeight: 700,
              }}>
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Meal cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 22,
        }}>
          {meals.map((meal, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 3px 18px rgba(0,0,0,0.07)',
              borderTop: `4px solid ${brand.color}`,
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ padding: '22px 22px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h4 style={{ color: '#1a1a2e', fontWeight: 800, fontSize: '0.95rem', flex: 1, lineHeight: 1.3 }}>
                    {meal.name}
                    <TagBadge tag={meal.tag} color={brand.color} />
                  </h4>
                </div>
                <p style={{ color: '#888', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: 14 }}>{meal.desc}</p>

                {/* Macros */}
                {(meal.protein || meal.carbs || meal.cal || meal.serves) && (
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
                    {meal.protein && (
                      <div style={{
                        background: `${brand.color}18`, borderRadius: 8, padding: '4px 10px',
                        fontSize: '0.75rem', fontWeight: 800, color: brand.color,
                      }}>
                        💪 {meal.protein} protein
                      </div>
                    )}
                    {meal.carbs && (
                      <div style={{
                        background: `${brand.color}18`, borderRadius: 8, padding: '4px 10px',
                        fontSize: '0.75rem', fontWeight: 800, color: brand.color,
                      }}>
                        ⚡ {meal.carbs} carbs
                      </div>
                    )}
                    {meal.cal && (
                      <div style={{
                        background: '#f0f0f0', borderRadius: 8, padding: '4px 10px',
                        fontSize: '0.75rem', fontWeight: 700, color: '#666',
                      }}>
                        🔥 {meal.cal} cal
                      </div>
                    )}
                    {meal.serves && !meal.ndis && (
                      <div style={{
                        background: `${brand.color}18`, borderRadius: 8, padding: '4px 10px',
                        fontSize: '0.75rem', fontWeight: 800, color: brand.color,
                      }}>
                        👨‍👩‍👧 Serves {meal.serves}
                      </div>
                    )}
                  </div>
                )}

                {/* NDIS note */}
                {meal.ndis && (
                  <div style={{
                    background: '#e3f2fd', borderRadius: 10, padding: '10px 12px', marginBottom: 14,
                  }}>
                    <div style={{ color: '#004085', fontSize: '0.78rem', fontWeight: 800, marginBottom: 4 }}>
                      ♿ NDIS Eligible
                    </div>
                    <div style={{ color: '#004085', fontSize: '0.75rem' }}>
                      You pay: <strong>${(meal.price * 0.3).toFixed(2)}</strong> (30%)
                      · Plan manager pays: <strong>${(meal.price * 0.7).toFixed(2)}</strong> (70%)
                    </div>
                  </div>
                )}
              </div>

              {/* Price + Add */}
              <div style={{
                marginTop: 'auto',
                padding: '0 22px 20px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontWeight: 900, color: '#1a1a2e', fontSize: '1.15rem' }}>
                    ${meal.price.toFixed(2)}
                  </div>
                  {meal.ndis && (
                    <div style={{ color: '#004085', fontSize: '0.75rem', fontWeight: 700 }}>
                      NDIS: you pay ${(meal.price * 0.3).toFixed(2)}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleAdd(meal)}
                  style={{
                    background: added[meal.name] ? '#27AE60' : brand.color,
                    color: '#fff', border: 'none', borderRadius: 30,
                    padding: '9px 20px', fontWeight: 800, fontSize: '0.85rem',
                    cursor: 'pointer', transition: 'all 0.2s',
                    transform: added[meal.name] ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {added[meal.name] ? '✓ Added!' : '+ Add'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── NDIS PAGE ────────────────────────────────────────────────

const NdisPage = ({ setActive }) => (
  <div style={{ background: '#f0fff8', padding: '60px 24px' }}>
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, color: '#1B4332', marginBottom: 12 }}>
          ♿ NDIS Meal Delivery
        </h1>
        <p style={{ color: '#555', fontSize: '1.05rem', maxWidth: 620, margin: '0 auto' }}>
          Home Harvest Meals is a registered NDIS provider. Eligible participants pay as little as 30% upfront.
        </p>
      </div>

      {/* The split */}
      <div style={{ background: '#1B4332', borderRadius: 20, padding: '44px 40px', color: '#fff', marginBottom: 36 }}>
        <h2 style={{ color: '#52B788', fontWeight: 900, marginBottom: 24, fontSize: '1.4rem', textAlign: 'center' }}>
          How the NDIS Funding Split Works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          {[
            { pct: '30%', label: 'You Pay', desc: 'The ingredient cost — paid at time of ordering. This is your responsibility as an everyday living expense.', color: '#F39C12' },
            { pct: '70%', label: 'NDIS Pays', desc: 'The meal preparation and delivery cost — invoiced directly to your plan manager. You never see this charge.', color: '#52B788' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#ffffff0a',
              border: `2px solid ${s.color}44`,
              borderRadius: 14, padding: 28,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: s.color, marginBottom: 8 }}>{s.pct}</div>
              <div style={{ color: '#fff', fontWeight: 900, fontSize: '1rem', marginBottom: 10 }}>{s.label}</div>
              <p style={{ color: '#B7E4C7', fontSize: '0.85rem', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 28, color: '#A8DADC', fontSize: '0.85rem' }}>
          Example: $17.00 meal → You pay <strong style={{ color: '#F39C12' }}>$5.10</strong> · NDIS pays <strong style={{ color: '#52B788' }}>$11.90</strong>
          <br />NDIS Line Item: <strong style={{ color: '#fff' }}>{CONFIG.ndisLineItem}</strong> (Preparation and Delivery of Meals)
        </div>
      </div>

      {/* Eligibility */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 36, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: 28 }}>
        <h3 style={{ color: '#1B4332', fontWeight: 900, marginBottom: 20, fontSize: '1.2rem' }}>
          Am I Eligible?
        </h3>
        <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 16 }}>
          To access NDIS-funded meal delivery through Home Harvest, you generally need:
        </p>
        {[
          'An active NDIS plan with funding in the Core Supports category.',
          'A letter or report from a GP, occupational therapist, or allied health professional confirming why you cannot prepare meals independently.',
          'The NDIS line item 01_022_0120_1_1 (Preparation and Delivery of Meals) included in your plan.',
          'To be a plan-managed or self-managed participant. (Self-managed participants pay the full invoice then claim the 70% back from NDIS.)',
        ].map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 3 ? '1px solid #f0f0f0' : 'none' }}>
            <span style={{ color: '#27AE60', flexShrink: 0, marginTop: 2 }}>✓</span>
            <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{p}</p>
          </div>
        ))}
      </div>

      {/* Unregistered note */}
      <div style={{
        background: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: 14, padding: 24, marginBottom: 28,
      }}>
        <h4 style={{ color: '#856404', fontWeight: 900, marginBottom: 10 }}>
          📌 Can't wait for full NDIS registration?
        </h4>
        <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.65 }}>
          While awaiting full registration, we can serve <strong>self-managed and plan-managed</strong> NDIS
          participants immediately. You can still claim the 70% preparation and delivery cost — you just
          can't use agency-managed funds until our registration is complete. Contact us to set up a
          service agreement today.
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => setActive('contact')}
          style={{
            background: 'linear-gradient(135deg, #27AE60, #1e8449)',
            color: '#fff', border: 'none', borderRadius: 30,
            padding: '14px 32px', fontWeight: 900, fontSize: '1rem',
            cursor: 'pointer', boxShadow: '0 4px 20px #27ae6055',
          }}
        >
          Set Up NDIS Service Agreement →
        </button>
      </div>
    </div>
  </div>
);

// ─── DELIVERY PAGE ───────────────────────────────────────────

const DeliveryPage = () => (
  <div style={{ background: '#f8f9fa', padding: '60px 24px' }}>
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#1B4332', marginBottom: 12 }}>
          🚗 Delivery & Ordering Info
        </h1>
        <p style={{ color: '#555', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto' }}>
          We deliver twice a week around Young NSW and surrounds. Here's everything you need to know.
        </p>
      </div>

      {/* Cutoffs */}
      <div style={{ background: '#1B4332', borderRadius: 16, padding: '36px 32px', color: '#fff', marginBottom: 28 }}>
        <h3 style={{ color: '#52B788', fontWeight: 900, marginBottom: 24, fontSize: '1.2rem' }}>
          📅 Order Cutoffs
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {CONFIG.cutoffs.map((c, i) => (
            <div key={i} style={{
              background: '#ffffff0a',
              border: '1px solid #52B78833',
              borderRadius: 12, padding: 22,
            }}>
              <div style={{ color: '#FFD700', fontWeight: 900, marginBottom: 8, fontSize: '0.95rem' }}>
                Order by: {c.day}
              </div>
              <div style={{ color: '#B7E4C7', fontWeight: 700 }}>
                Delivered: {c.delivery}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zones */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 36, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: 28 }}>
        <h3 style={{ color: '#1B4332', fontWeight: 900, marginBottom: 24, fontSize: '1.2rem' }}>
          📍 Delivery Zones
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f0fff8' }}>
                {['Zone', 'Area', 'Distance', 'Delivery Fee'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#1B4332', fontWeight: 800, fontSize: '0.85rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(CONFIG.delivery).map(([key, zone], i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '13px 16px', fontWeight: 800, color: '#1B4332', fontSize: '0.9rem' }}>
                    Zone {i + 1}
                  </td>
                  <td style={{ padding: '13px 16px', color: '#555', fontSize: '0.9rem' }}>{zone.label}</td>
                  <td style={{ padding: '13px 16px', color: '#888', fontSize: '0.85rem' }}>{zone.km}</td>
                  <td style={{ padding: '13px 16px', fontWeight: 800, color: '#27AE60', fontSize: '0.95rem' }}>{zone.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Storage guide */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 36, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: 28 }}>
        <h3 style={{ color: '#1B4332', fontWeight: 900, marginBottom: 20, fontSize: '1.2rem' }}>
          🌡️ Storage & Heating Guide
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {[
            { icon: '❄️', title: 'Refrigerator', body: 'Store at 0–4°C. Eat within 5 days of delivery.' },
            { icon: '🧊', title: 'Freezer', body: 'Suitable for freezing. Eat within 3 months. Thaw in fridge overnight.' },
            { icon: '🔥', title: 'Microwave', body: '2–3 minutes on high, remove lid before heating.' },
            { icon: '🍽️', title: 'Oven', body: '15 minutes at 180°C, remove lid, loosely cover with foil.' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#f0fff8',
              borderRadius: 12, padding: 20,
              borderLeft: '4px solid #27AE60',
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{s.icon}</div>
              <h4 style={{ color: '#1B4332', fontWeight: 800, marginBottom: 6, fontSize: '0.9rem' }}>{s.title}</h4>
              <p style={{ color: '#555', fontSize: '0.82rem', lineHeight: 1.5 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── CONTACT PAGE ─────────────────────────────────────────────

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: 'general', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: '#f8f9fa', padding: '60px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#1B4332', marginBottom: 12 }}>
            📞 Get in Touch
          </h1>
          <p style={{ color: '#555', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto' }}>
            Questions about ordering, NDIS, or anything else — we're here.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 36 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 36, boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                <h3 style={{ color: '#1B4332', fontWeight: 900, marginBottom: 12 }}>Message Received!</h3>
                <p style={{ color: '#555' }}>We'll get back to you within a few hours. Check your inbox!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ color: '#1B4332', fontWeight: 900, marginBottom: 24, fontSize: '1.1rem' }}>
                  Send a Message
                </h3>
                {[
                  { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Smith' },
                  { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '04XX XXX XXX' },
                  { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key} style={{ marginBottom: 18 }}>
                    <label style={{ display: 'block', color: '#444', fontWeight: 700, fontSize: '0.85rem', marginBottom: 6 }}>{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      required
                      style={{
                        width: '100%', padding: '11px 14px', borderRadius: 10,
                        border: '1.5px solid #e0e0e0', fontSize: '0.9rem',
                        fontFamily: 'inherit', boxSizing: 'border-box',
                      }}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', color: '#444', fontWeight: 700, fontSize: '0.85rem', marginBottom: 6 }}>Enquiry Type</label>
                  <select
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                    style={{
                      width: '100%', padding: '11px 14px', borderRadius: 10,
                      border: '1.5px solid #e0e0e0', fontSize: '0.9rem',
                      fontFamily: 'inherit', background: '#fff', boxSizing: 'border-box',
                    }}
                  >
                    <option value="general">General Enquiry</option>
                    <option value="order">Order / Delivery Question</option>
                    <option value="ndis">NDIS Service Agreement</option>
                    <option value="gym">Gym / Business Partnership</option>
                    <option value="support-coordinator">Support Coordinator Enquiry</option>
                  </select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', color: '#444', fontWeight: 700, fontSize: '0.85rem', marginBottom: 6 }}>Message</label>
                  <textarea
                    placeholder="How can we help?"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    style={{
                      width: '100%', padding: '11px 14px', borderRadius: 10,
                      border: '1.5px solid #e0e0e0', fontSize: '0.9rem',
                      fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #27AE60, #1e8449)',
                    color: '#fff', border: 'none', borderRadius: 30,
                    padding: '13px', fontWeight: 900, fontSize: '1rem', cursor: 'pointer',
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div>
            <div style={{ background: '#1B4332', borderRadius: 16, padding: 32, color: '#fff', marginBottom: 24 }}>
              <h3 style={{ color: '#52B788', fontWeight: 900, marginBottom: 20 }}>📞 Contact Details</h3>
              {[
                { label: 'Phone', value: CONFIG.phone, icon: '📞' },
                { label: 'Email', value: CONFIG.email, icon: '📧' },
                { label: 'Website', value: CONFIG.web, icon: '🌐' },
                { label: 'Kitchen Location', value: CONFIG.address, icon: '📍' },
                { label: 'ABN', value: CONFIG.abn, icon: '🏢' },
              ].map(({ label, value, icon }) => (
                <div key={label} style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ color: '#A8DADC', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
                    <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: '#e8f5e9', border: '1px solid #27AE6044', borderRadius: 14, padding: 24 }}>
              <h4 style={{ color: '#1B4332', fontWeight: 900, marginBottom: 10 }}>♿ NDIS Enquiries</h4>
              <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>
                If you're a support coordinator or NDIS participant, mention that in your message
                and we'll prioritise getting you set up with a Service Agreement quickly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────

const App = () => {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [active]);

  const renderPage = () => {
    switch (active) {
      case 'home': return <HomePage setActive={setActive} />;
      case 'menu': return <MenuPage cart={cart} setCart={setCart} />;
      case 'ndis': return <NdisPage setActive={setActive} />;
      case 'delivery': return <DeliveryPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setActive={setActive} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", minHeight: '100vh', background: '#fff' }}>
      <Nav active={active} setActive={setActive} cart={cart} setCartOpen={setCartOpen} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {renderPage()}
      <FloatingCartBar cart={cart} setCartOpen={setCartOpen} />
      {cartOpen && <CartSidebar cart={cart} setCart={setCart} onClose={() => setCartOpen(false)} />}

      <footer style={{ background: '#1B4332', borderTop: '2px solid #27AE6033', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: 10 }}>🍽️</div>
        <div style={{ color: '#52B788', fontWeight: 900, fontSize: '1.2rem', marginBottom: 6 }}>
          FUEL UP FOODS AUSTRALIA PTY LTD
        </div>
        <div style={{ color: '#A8DADC', fontSize: '0.85rem', marginBottom: 4 }}>
          Iron Plate Meals · Tradie Fuel · Home Harvest Meals
        </div>
        <div style={{ color: '#A8DADC', fontSize: '0.85rem', marginBottom: 6 }}>ABN: {CONFIG.abn}</div>
        <div style={{ color: '#A8DADC', fontSize: '0.85rem', marginBottom: 16 }}>{CONFIG.address}</div>
        <div style={{ color: '#27AE6055', fontSize: '0.75rem' }}>
          © 2025 Fuel Up Foods Australia Pty Ltd · All rights reserved · {CONFIG.web}
        </div>
      </footer>
    </div>
  );
};

export default App;
