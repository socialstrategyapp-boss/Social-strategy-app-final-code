// ============================================================
// LAZER BLAZE AUSTRALIA PTY LTD — STANDALONE REACT APP
// Laser Graffiti Removal & Surface Cleaning
// ============================================================
// PRICING & CONTACT: Update the CONFIG object below.
// ============================================================

import React, { useState, useEffect } from 'react';

// ─── CONFIG — edit prices, contact details, services here ───
const CONFIG = {
  company: 'Lazer Blaze Australia Pty Ltd',
  abn: 'XX XXX XXX XXX',
  phone: '0XXX XXX XXX',
  email: 'info@lazerblazeaustralia.com.au',
  web: 'lazerblazeaustralia.com.au',
  address: 'Sydney Metro & Greater NSW',
  colors: {
    primary: '#FFD700',
    dark: '#1A1A2E',
    mid: '#16213E',
    accent: '#FF6B35',
    text: '#ffffff',
    muted: '#a0a8c0',
  },
  pricing: [
    { service: 'Graffiti Removal — Standard (brick/concrete)', unit: 'Per m²', price: '$75 – $110' },
    { service: 'Graffiti Removal — Porous / Heritage surface', unit: 'Per m²', price: '$120 – $180' },
    { service: 'Graffiti Removal — Metal / Glass', unit: 'Per m²', price: '$80 – $120' },
    { service: 'Emergency Response (24/7 call-out)', unit: 'Per m²', price: '$150 – $220' },
    { service: 'Council Ongoing Contract Rate', unit: 'Per m²', price: '$55 – $75' },
    { service: 'Anti-Graffiti Protective Coating', unit: 'Per m²', price: '$25 – $45' },
    { service: 'Minimum Call-Out Fee', unit: 'Per job', price: '$250' },
    { service: 'Large-Area Volume Discount (>50m²)', unit: 'Per m²', price: 'POA' },
  ],
  services: [
    {
      icon: '🔦',
      title: 'Graffiti Removal',
      desc: 'Fiber laser vaporises graffiti at the molecular level. No chemicals, no water runoff, no surface damage. First-pass removal on most surfaces.',
      price: 'From $75/m²',
    },
    {
      icon: '🏛️',
      title: 'Heritage Building Cleaning',
      desc: 'Non-contact laser cleaning safe on sandstone, brick, limestone and heritage-listed surfaces. No pressure, no abrasion, no chemical risk.',
      price: 'From $120/m²',
    },
    {
      icon: '⚡',
      title: 'Emergency Response (24/7)',
      desc: 'Priority call-out for offensive, racist or obscene graffiti. Same-day response for councils and strata managers. We attend within hours.',
      price: 'From $150/m²',
    },
    {
      icon: '🛡️',
      title: 'Anti-Graffiti Coating',
      desc: 'Applied after laser cleaning, this invisible barrier lets future graffiti be removed in seconds — protecting your asset long-term.',
      price: 'From $25/m²',
    },
    {
      icon: '🚉',
      title: 'Transport & Infrastructure',
      desc: 'Sydney Trains, bus shelters, road signage, bridge pillars. Backpack unit accesses tight spaces no other method can reach.',
      price: 'Tender pricing',
    },
    {
      icon: '🏢',
      title: 'Strata & Commercial',
      desc: 'Ongoing panel contracts for body corporate and commercial property managers. Regular scheduled cleans or on-call response.',
      price: 'From $65/m²',
    },
  ],
  whyLaser: [
    { icon: '🌿', title: 'Zero Chemicals', body: 'No toxic runoff. EPA compliant by default. Safe near waterways, drains and public spaces.' },
    { icon: '🛡️', title: 'No Surface Damage', body: 'Non-contact process — safe on heritage stone, brick, metal, glass and painted surfaces.' },
    { icon: '✅', title: 'Complete Removal', body: "We don't cover graffiti — we erase it. No ghosting, no paint patches, no residue." },
    { icon: '⚡', title: 'Up to 3× Faster', body: 'Single-pass cleaning on most surfaces. No drying time. No repainting. Job done and gone.' },
    { icon: '💰', title: 'Lower Ongoing Cost', body: 'No chemicals to reorder, no water use, no hazardous waste disposal. Power only = low overheads.' },
    { icon: '🏆', title: 'ESG / Council Compliance', body: 'Councils win ESG points and community approval choosing chemical-free laser. Easy to justify publicly.' },
  ],
  tenderBodies: [
    'Blacktown City Council',
    'North Sydney Council',
    'City of Parramatta',
    'Central Coast Council',
    'Liverpool City Council',
    'Sydney Trains / NSW Trains',
    'Transport for NSW',
    'Department of Housing NSW',
    'AusTender (Federal)',
  ],
  stats: [
    { value: '$0', label: 'Chemicals Used' },
    { value: '3×', label: 'Faster Than Chemical' },
    { value: '$10M', label: 'Public Liability' },
    { value: '24/7', label: 'Emergency Response' },
  ],
};

// ─── Utilities ────────────────────────────────────────────────
const c = CONFIG.colors;

const css = {
  btn: {
    primary: {
      background: `linear-gradient(135deg, ${c.primary}, #e6c000)`,
      color: c.dark,
      border: 'none',
      borderRadius: 30,
      padding: '14px 32px',
      fontWeight: 800,
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: `0 4px 20px ${c.primary}44`,
    },
    ghost: {
      background: 'transparent',
      color: c.primary,
      border: `2px solid ${c.primary}`,
      borderRadius: 30,
      padding: '12px 28px',
      fontWeight: 700,
      fontSize: '0.95rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
  },
};

// ─── Sub-components ───────────────────────────────────────────

const Badge = ({ text }) => (
  <span style={{
    background: `${c.primary}22`,
    border: `1px solid ${c.primary}`,
    color: c.primary,
    borderRadius: 20,
    padding: '4px 14px',
    fontSize: '0.8rem',
    fontWeight: 700,
    margin: 4,
    display: 'inline-block',
  }}>
    ✓ {text}
  </span>
);

const SectionHeader = ({ title, subtitle, light }) => (
  <div style={{ textAlign: 'center', marginBottom: 48 }}>
    <h2 style={{
      fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
      fontWeight: 900,
      color: light ? '#fff' : c.dark,
      marginBottom: 12,
    }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ color: light ? c.muted : '#555', fontSize: '1.05rem', maxWidth: 620, margin: '0 auto' }}>
        {subtitle}
      </p>
    )}
  </div>
);

// ─── NAV ─────────────────────────────────────────────────────

const Nav = ({ active, setActive, menuOpen, setMenuOpen }) => {
  const links = ['home', 'services', 'why-laser', 'tenders', 'pricing', 'contact'];
  const labels = { home: 'Home', services: 'Services', 'why-laser': 'Why Laser', tenders: 'Tenders', pricing: 'Pricing', contact: 'Contact' };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: `${c.dark}f5`,
      backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${c.primary}33`,
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
        <div
          onClick={() => setActive('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <span style={{ fontSize: '1.6rem' }}>⚡</span>
          <div>
            <div style={{ color: c.primary, fontWeight: 900, fontSize: '1rem', letterSpacing: 1 }}>LAZER BLAZE</div>
            <div style={{ color: c.muted, fontSize: '0.65rem', letterSpacing: 2, textTransform: 'uppercase' }}>Australia</div>
          </div>
        </div>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}
          className="desktop-nav">
          {links.slice(1).map(l => (
            <button
              key={l}
              onClick={() => setActive(l)}
              style={{
                background: active === l ? `${c.primary}22` : 'transparent',
                color: active === l ? c.primary : c.muted,
                border: `1px solid ${active === l ? c.primary + '55' : 'transparent'}`,
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
            onClick={() => setActive('contact')}
            style={{ ...css.btn.primary, padding: '9px 22px', fontSize: '0.85rem', marginLeft: 8 }}
          >
            Free Quote
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: c.primary, fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}
          className="hamburger"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          background: c.dark,
          borderTop: `1px solid ${c.primary}33`,
          padding: '16px 24px',
        }}>
          {links.map(l => (
            <div
              key={l}
              onClick={() => { setActive(l); setMenuOpen(false); }}
              style={{
                color: active === l ? c.primary : '#ddd',
                padding: '12px 0',
                borderBottom: '1px solid #ffffff11',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
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
        }
      `}</style>
    </nav>
  );
};

// ─── HOME PAGE ────────────────────────────────────────────────

const HomePage = ({ setActive }) => (
  <div>
    {/* Hero */}
    <div style={{
      background: `linear-gradient(135deg, ${c.dark} 0%, #0D1117 60%, #1a1a2e 100%)`,
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 24px 60px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', width: 600, height: 600,
        background: `radial-gradient(circle, ${c.primary}18 0%, transparent 70%)`,
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', maxWidth: 800 }}>
        <div style={{
          display: 'inline-block',
          background: `${c.primary}22`,
          border: `1px solid ${c.primary}44`,
          color: c.primary,
          borderRadius: 30,
          padding: '6px 18px',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginBottom: 24,
        }}>
          ⚡ NSW's Premier Laser Graffiti Removal
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 7vw, 5rem)',
          fontWeight: 900,
          color: '#fff',
          lineHeight: 1.1,
          marginBottom: 24,
        }}>
          Graffiti Gone.{' '}
          <span style={{
            background: `linear-gradient(135deg, ${c.primary}, ${c.accent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Chemically Free.
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          color: c.muted,
          maxWidth: 640,
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Fiber laser technology removes graffiti at the molecular level — no chemicals,
          no water damage, no surface harm. Council-grade results for strata, heritage buildings
          and government assets across NSW.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
          <button onClick={() => setActive('contact')} style={css.btn.primary}>
            Get a Free Quote →
          </button>
          <button onClick={() => setActive('services')} style={css.btn.ghost}>
            See All Services
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {['No Chemicals', 'No Water Runoff', 'Heritage Safe', 'Council Approved', 'Same-Day Available', 'EPA Compliant'].map(b => (
            <Badge key={b} text={b} />
          ))}
        </div>
      </div>
    </div>

    {/* Stats */}
    <div style={{ background: c.primary, padding: '40px 24px' }}>
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 24,
        textAlign: 'center',
      }}>
        {CONFIG.stats.map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: c.dark }}>{s.value}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: c.dark + 'bb' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Services preview */}
    <div style={{ background: '#f8f9fa', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader
          title="What We Do"
          subtitle="From emergency call-outs to ongoing council contracts — we handle every graffiti situation."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {CONFIG.services.slice(0, 3).map((s, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: 16,
              padding: 28,
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              borderTop: `4px solid ${c.primary}`,
            }}>
              <div style={{ fontSize: '2.2rem', marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ color: c.dark, fontWeight: 800, marginBottom: 10, fontSize: '1.05rem' }}>{s.title}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 16 }}>{s.desc}</p>
              <div style={{
                background: `${c.primary}22`,
                borderRadius: 8,
                padding: '8px 14px',
                color: '#7a6000',
                fontWeight: 800,
                fontSize: '0.95rem',
                display: 'inline-block',
              }}>
                {s.price}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <button onClick={() => setActive('services')} style={css.btn.primary}>
            View All Services →
          </button>
        </div>
      </div>
    </div>

    {/* Why Laser teaser */}
    <div style={{ background: c.dark, padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader
          title="Why Laser Beats Everything"
          subtitle="Chemical cleaning, pressure washing and repainting are the old way. Laser is the new standard."
          light
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
        }}>
          {CONFIG.whyLaser.map((w, i) => (
            <div key={i} style={{
              background: '#ffffff0a',
              border: `1px solid ${c.primary}22`,
              borderRadius: 14,
              padding: 24,
              borderLeft: `4px solid ${c.primary}`,
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{w.icon}</div>
              <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: 8, fontSize: '0.95rem' }}>{w.title}</h4>
              <p style={{ color: c.muted, fontSize: '0.85rem', lineHeight: 1.6 }}>{w.body}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button onClick={() => setActive('why-laser')} style={css.btn.ghost}>
            Full Technology Deep-Dive →
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── SERVICES PAGE ────────────────────────────────────────────

const ServicesPage = ({ setActive }) => (
  <div style={{ background: '#f8f9fa', padding: '60px 24px' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionHeader
        title="Our Services"
        subtitle="Laser graffiti removal and surface cleaning for every application — private, strata, council and government."
      />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 28,
        marginBottom: 60,
      }}>
        {CONFIG.services.map((s, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
            border: `2px solid ${c.primary}33`,
          }}>
            <div style={{ background: c.primary, padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.8rem' }}>{s.icon}</div>
            </div>
            <div style={{ padding: 28 }}>
              <h3 style={{ color: c.dark, fontWeight: 800, fontSize: '1.1rem', marginBottom: 12 }}>{s.title}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 20 }}>{s.desc}</p>
              <div style={{
                background: `${c.primary}22`,
                borderRadius: 10,
                padding: '10px 16px',
                fontWeight: 800,
                color: '#7a6000',
                fontSize: '1rem',
                textAlign: 'center',
              }}>
                {s.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div style={{
        background: c.dark,
        borderRadius: 20,
        padding: '48px 40px',
        color: '#fff',
      }}>
        <h2 style={{ color: c.primary, fontSize: '1.8rem', fontWeight: 900, marginBottom: 32, textAlign: 'center' }}>
          How a Laser Job Works — Start to Finish
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 24,
        }}>
          {[
            { step: '01', title: 'Call or Quote', body: 'Contact us with photos. We provide a same-day quote.' },
            { step: '02', title: 'Site Assessment', body: 'We attend, assess surface type and set up safety barriers.' },
            { step: '03', title: 'Laser Clean', body: 'Fiber laser scans the surface. Graffiti is vaporised in seconds.' },
            { step: '04', title: 'Inspect & Sign Off', body: 'You inspect the result. We photograph for council compliance records.' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: c.primary, color: c.dark,
                fontWeight: 900, fontSize: '1.2rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                {s.step}
              </div>
              <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: 8 }}>{s.title}</h4>
              <p style={{ color: c.muted, fontSize: '0.85rem', lineHeight: 1.6 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <button onClick={() => setActive('contact')} style={css.btn.primary}>
          Book a Job or Get a Quote →
        </button>
      </div>
    </div>
  </div>
);

// ─── WHY LASER PAGE ───────────────────────────────────────────

const WhyLaserPage = () => (
  <div>
    <div style={{ background: c.dark, padding: '60px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <SectionHeader
          title="Why Laser is the Only Logical Choice"
          subtitle="The graffiti removal industry has been using chemicals and pressure washers for 30 years. We ended that era."
          light
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
          marginBottom: 60,
        }}>
          {CONFIG.whyLaser.map((w, i) => (
            <div key={i} style={{
              background: '#ffffff0a',
              border: `1px solid ${c.primary}33`,
              borderRadius: 16,
              padding: 28,
            }}>
              <div style={{ fontSize: '2rem', marginBottom: 14 }}>{w.icon}</div>
              <h4 style={{ color: c.primary, fontWeight: 800, marginBottom: 10 }}>{w.title}</h4>
              <p style={{ color: c.muted, fontSize: '0.9rem', lineHeight: 1.65 }}>{w.body}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <h2 style={{ color: c.primary, textAlign: 'center', fontWeight: 900, fontSize: '1.8rem', marginBottom: 32 }}>
          Head-to-Head Comparison
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 16, overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: c.primary }}>
                {['Method', 'Surface Safe?', 'Chemical Use', 'Water Runoff', 'Speed', 'EPA Risk'].map(h => (
                  <th key={h} style={{ padding: '14px 18px', textAlign: 'center', color: c.dark, fontWeight: 800, fontSize: '0.85rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['⚡ Laser (Us)', '✅ Yes', '❌ None', '❌ None', '⭐⭐⭐⭐⭐', '❌ Zero'],
                ['Chemical Wash', '⚠️ Risk', '⚠️ Toxic', '⚠️ Yes', '⭐⭐', '⚠️ High'],
                ['Pressure Wash', '⚠️ Risk', '✅ None', '⚠️ Yes', '⭐⭐⭐', '⚠️ Medium'],
                ['Paint Over', '✅ Yes', '⚠️ Paint', '⚠️ Some', '⭐⭐', '⚠️ Medium'],
                ['Sandblasting', '❌ Damage', 'Silica dust', '⚠️ Some', '⭐⭐', '⚠️ High'],
              ].map(([method, ...cols], i) => (
                <tr key={i} style={{ background: i === 0 ? '#fffde7' : i % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '13px 18px', fontWeight: i === 0 ? 900 : 600, color: c.dark, fontSize: '0.9rem' }}>{method}</td>
                  {cols.map((col, j) => (
                    <td key={j} style={{ padding: '13px 18px', textAlign: 'center', fontSize: '0.85rem', color: '#444' }}>{col}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Technology explainer */}
    <div style={{ background: '#f8f9fa', padding: '60px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: c.dark, fontSize: '1.8rem', fontWeight: 900, marginBottom: 24 }}>
          The Science Behind Laser Cleaning
        </h2>
        <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1rem', marginBottom: 24 }}>
          Our fiber laser operates at 1064nm wavelength. The laser pulse is tuned to the absorption
          frequency of paint and organic compounds — but NOT the substrate beneath. When the beam
          hits graffiti paint, the energy is absorbed and converts instantly to heat, vaporising
          the paint layer in microseconds. The underlying brick, stone or metal reflects the
          majority of the energy and remains completely intact.
        </p>
        <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1rem' }}>
          Our backpack unit (100W pulsed) handles precision areas and access-restricted locations.
          Our trolley unit (1000W) handles high-volume infrastructure and large flat surfaces at speed.
          Together, they cover every job type in NSW.
        </p>
      </div>
    </div>
  </div>
);

// ─── TENDERS PAGE ─────────────────────────────────────────────

const TendersPage = ({ setActive }) => (
  <div style={{ background: '#f8f9fa', padding: '60px 24px' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <SectionHeader
        title="Government & Council Contracts"
        subtitle="We are registered on NSW eTendering and AusTender. Here's how to work with us — or get on our panel."
      />

      {/* Bodies we target */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 36, marginBottom: 36, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <h3 style={{ color: c.dark, fontWeight: 900, marginBottom: 24, fontSize: '1.2rem' }}>
          🏛️ Government Bodies We Service
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {CONFIG.tenderBodies.map(b => (
            <div key={b} style={{
              background: `${c.primary}18`,
              border: `1px solid ${c.primary}44`,
              borderRadius: 8,
              padding: '10px 18px',
              color: '#7a6000',
              fontWeight: 700,
              fontSize: '0.88rem',
            }}>
              ★ {b}
            </div>
          ))}
        </div>
      </div>

      {/* Capability statement preview */}
      <div style={{
        background: c.dark,
        borderRadius: 16,
        padding: 36,
        marginBottom: 36,
        color: '#fff',
        border: `2px solid ${c.primary}44`,
      }}>
        <h3 style={{ color: c.primary, fontWeight: 900, marginBottom: 20, fontSize: '1.2rem' }}>
          📋 Capability Statement Highlights
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {[
            { label: 'Registered on NSW eTendering', icon: '✅' },
            { label: 'AusTender Supplier ID', icon: '✅' },
            { label: '$10M Public Liability Insurance', icon: '✅' },
            { label: 'Workers Compensation — all staff', icon: '✅' },
            { label: 'White Card holders (all operators)', icon: '✅' },
            { label: 'Laser Safety trained & certified', icon: '✅' },
            { label: 'SWMS & WHS documentation ready', icon: '✅' },
            { label: 'Police Clearances available on request', icon: '✅' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: c.muted, fontSize: '0.9rem' }}>
              <span style={{ color: c.primary, flexShrink: 0 }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Council advantage */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 36, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: 36 }}>
        <h3 style={{ color: c.dark, fontWeight: 900, marginBottom: 20, fontSize: '1.2rem' }}>
          ⚡ Why Councils Choose Laser Over Chemical
        </h3>
        {[
          'No chemical procurement, storage or disposal — eliminates EPA risk entirely.',
          'Zero water runoff — compliant with stormwater and waterway protection rules.',
          'Heritage-safe — councils can approve use on heritage-listed structures without risk.',
          'ESG reporting win — laser cleaning generates far lower carbon than chemical alternatives.',
          'Emergency response SLA — we attend within hours for offensive/racist graffiti.',
          'Before/after photographic evidence included — supports council compliance reporting.',
        ].map((p, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, alignItems: 'flex-start',
            padding: '12px 0', borderBottom: i < 5 ? '1px solid #f0f0f0' : 'none',
          }}>
            <span style={{ color: c.primary, fontSize: '1rem', flexShrink: 0, marginTop: 2 }}>→</span>
            <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{p}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => setActive('contact')} style={css.btn.primary}>
          Request Our Capability Statement →
        </button>
      </div>
    </div>
  </div>
);

// ─── PRICING PAGE ─────────────────────────────────────────────

const PricingPage = ({ setActive }) => (
  <div style={{ background: '#f8f9fa', padding: '60px 24px' }}>
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <SectionHeader
        title="Pricing Guide"
        subtitle="All prices exclude GST. Council and volume rates available on request."
      />

      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', marginBottom: 36 }}>
        <div style={{ background: c.dark, padding: '20px 28px' }}>
          <h2 style={{ color: c.primary, margin: 0, fontSize: '1.2rem', fontWeight: 900 }}>
            ⚡ Graffiti Removal & Surface Cleaning
          </h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f8f8' }}>
                {['Service', 'Unit', 'Price (Ex GST)'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: h === 'Price (Ex GST)' ? 'right' : 'left', color: '#444', fontSize: '0.85rem', fontWeight: 800 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CONFIG.pricing.map(({ service, unit, price }, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '13px 20px', color: '#333', fontSize: '0.9rem' }}>{service}</td>
                  <td style={{ padding: '13px 20px', color: '#888', fontSize: '0.85rem' }}>{unit}</td>
                  <td style={{ padding: '13px 20px', textAlign: 'right', fontWeight: 800, color: c.dark, fontSize: '0.95rem' }}>{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ background: `${c.primary}18`, border: `1px solid ${c.primary}44`, borderRadius: 14, padding: 28, marginBottom: 36 }}>
        <h4 style={{ color: '#7a6000', fontWeight: 900, marginBottom: 12 }}>💡 How Pricing Works</h4>
        <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
          Most jobs are quoted per m² based on photos or a brief site visit. Minimum call-out applies
          to all mobile jobs. Council and ongoing contract clients receive a negotiated rate below
          the standard schedule. Emergency response (offensive/racist graffiti) attracts the premium rate
          with priority attendance. Anti-graffiti coating is optionally applied after cleaning and extends
          the lifecycle of any future removal significantly.
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => setActive('contact')} style={css.btn.primary}>
          Get a Custom Quote →
        </button>
      </div>
    </div>
  </div>
);

// ─── CONTACT PAGE ─────────────────────────────────────────────

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', desc: '', type: 'private' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: '#f8f9fa', padding: '60px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <SectionHeader
          title="Get a Free Quote"
          subtitle="Fill in the form and we'll respond within 2 hours during business hours."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 36 }}>
          {/* Contact form */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 36, boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                <h3 style={{ color: c.dark, fontWeight: 900, marginBottom: 12 }}>Quote Request Sent!</h3>
                <p style={{ color: '#555' }}>We'll be in touch within 2 hours. Check your email for confirmation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ color: c.dark, fontWeight: 900, marginBottom: 24, fontSize: '1.1rem' }}>
                  Request a Quote
                </h3>
                {[
                  { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Smith' },
                  { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '04XX XXX XXX' },
                  { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                  { key: 'address', label: 'Job Location / Address', type: 'text', placeholder: '123 Main St, Sydney NSW' },
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
                        outline: 'none', transition: 'border 0.2s',
                      }}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', color: '#444', fontWeight: 700, fontSize: '0.85rem', marginBottom: 6 }}>
                    Job Type
                  </label>
                  <select
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                    style={{
                      width: '100%', padding: '11px 14px', borderRadius: 10,
                      border: '1.5px solid #e0e0e0', fontSize: '0.9rem',
                      fontFamily: 'inherit', background: '#fff', boxSizing: 'border-box',
                    }}
                  >
                    <option value="private">Private / Residential</option>
                    <option value="strata">Strata / Body Corporate</option>
                    <option value="commercial">Commercial Property</option>
                    <option value="council">Council / Government</option>
                    <option value="heritage">Heritage Building</option>
                    <option value="emergency">Emergency Response</option>
                  </select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', color: '#444', fontWeight: 700, fontSize: '0.85rem', marginBottom: 6 }}>
                    Description / Photos (describe the graffiti)
                  </label>
                  <textarea
                    placeholder="e.g. Tag on red brick wall, approx 2m × 1m, spray paint, 3 years old..."
                    value={form.desc}
                    onChange={e => setForm({ ...form, desc: e.target.value })}
                    rows={4}
                    style={{
                      width: '100%', padding: '11px 14px', borderRadius: 10,
                      border: '1.5px solid #e0e0e0', fontSize: '0.9rem',
                      fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box',
                    }}
                  />
                </div>
                <button type="submit" style={{ ...css.btn.primary, width: '100%' }}>
                  Submit Quote Request
                </button>
              </form>
            )}
          </div>

          {/* Contact details */}
          <div>
            <div style={{ background: c.dark, borderRadius: 16, padding: 32, color: '#fff', marginBottom: 24 }}>
              <h3 style={{ color: c.primary, fontWeight: 900, marginBottom: 20 }}>📞 Contact Details</h3>
              {[
                { label: 'Phone', value: CONFIG.phone, icon: '📞' },
                { label: 'Email', value: CONFIG.email, icon: '📧' },
                { label: 'Website', value: CONFIG.web, icon: '🌐' },
                { label: 'Coverage', value: CONFIG.address, icon: '📍' },
                { label: 'ABN', value: CONFIG.abn, icon: '🏢' },
              ].map(({ label, value, icon }) => (
                <div key={label} style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ color: c.muted, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
                    <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: `${c.primary}18`, border: `1px solid ${c.primary}44`, borderRadius: 14, padding: 24 }}>
              <h4 style={{ color: '#7a6000', fontWeight: 900, marginBottom: 10 }}>⚡ Emergency Graffiti?</h4>
              <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>
                For offensive, racist or obscene graffiti requiring urgent removal, call us directly on{' '}
                <strong>{CONFIG.phone}</strong>. Emergency call-outs are available 24/7.
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [active]);

  const renderPage = () => {
    switch (active) {
      case 'home': return <HomePage setActive={setActive} />;
      case 'services': return <ServicesPage setActive={setActive} />;
      case 'why-laser': return <WhyLaserPage />;
      case 'tenders': return <TendersPage setActive={setActive} />;
      case 'pricing': return <PricingPage setActive={setActive} />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setActive={setActive} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", minHeight: '100vh', background: '#fff' }}>
      <Nav active={active} setActive={setActive} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {renderPage()}

      {/* Footer */}
      <footer style={{ background: c.dark, borderTop: `2px solid ${c.primary}33`, padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: 10 }}>⚡</div>
        <div style={{ color: c.primary, fontWeight: 900, fontSize: '1.2rem', marginBottom: 6 }}>
          LAZER BLAZE AUSTRALIA PTY LTD
        </div>
        <div style={{ color: c.muted, fontSize: '0.85rem', marginBottom: 6 }}>ABN: {CONFIG.abn}</div>
        <div style={{ color: c.muted, fontSize: '0.85rem', marginBottom: 16 }}>{CONFIG.address}</div>
        <div style={{ color: '#ffffff33', fontSize: '0.75rem' }}>
          © 2025 Lazer Blaze Australia Pty Ltd · All rights reserved · {CONFIG.web}
        </div>
      </footer>
    </div>
  );
};

export default App;
