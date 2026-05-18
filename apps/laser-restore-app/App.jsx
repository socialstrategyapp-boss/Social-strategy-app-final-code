// ============================================================
// LASER RESTORE AUSTRALIA PTY LTD — STANDALONE REACT APP
// Automotive & Industrial Laser Cleaning
// ============================================================
// PRICING & CONTACT: Update the CONFIG object below.
// ============================================================

import React, { useState, useEffect } from 'react';

// ─── CONFIG — edit prices, contact details, services here ───
const CONFIG = {
  company: 'Laser Restore Australia Pty Ltd',
  abn: 'XX XXX XXX XXX',
  phone: '0XXX XXX XXX',
  email: 'info@laserrestoreaustralia.com.au',
  web: 'laserrestoreaustralia.com.au',
  address: 'Sydney Metro & Greater NSW — Mobile Service Available',
  colors: {
    primary: '#00B4D8',
    dark: '#023E8A',
    mid: '#012A4A',
    accent: '#90E0EF',
    bg: '#f0f8ff',
    text: '#ffffff',
    muted: '#a0c8d8',
  },
  pricing: [
    { service: 'Full Vehicle Laser Strip (all panels)', unit: 'Per vehicle', price: '$800 – $2,500' },
    { service: 'Individual Panel — Laser Clean', unit: 'Per panel', price: '$80 – $250' },
    { service: 'Chassis / Subframe Strip', unit: 'Per job', price: '$400 – $1,200' },
    { service: 'Engine Bay Laser Clean', unit: 'Per job', price: '$300 – $700' },
    { service: 'Wheel / Rim Set (4 wheels)', unit: 'Per set', price: '$200 – $400' },
    { service: 'Aqua Bead Panel Prep', unit: 'Per panel', price: '$60 – $180' },
    { service: 'Full Body Aqua Bead + Laser Package', unit: 'Per vehicle', price: '$1,500 – $4,000' },
    { service: 'Industrial Parts / Agricultural Equipment', unit: 'Per hour', price: '$250 – $450' },
    { service: 'Motorcycle Frame & Components', unit: 'Per job', price: '$300 – $800' },
    { service: 'Mobile Call-Out Fee', unit: 'Per job', price: '$150' },
  ],
  services: [
    {
      icon: '🚗',
      title: 'Panel Laser Cleaning',
      desc: 'Precision fiber laser removes rust and paint from body panels without warping or pitting. Safe on steel down to 0.6mm gauge. Primer-ready finish guaranteed.',
      price: 'From $80/panel',
    },
    {
      icon: '💧',
      title: 'Aqua Bead (Vapor Blast) Prep',
      desc: 'Glass bead and water slurry — peens the metal surface to a satin finish with zero heat buildup. Ideal for final prep before primer, painting or powder coating.',
      price: 'From $60/panel',
    },
    {
      icon: '🏁',
      title: 'Full Vehicle Strip',
      desc: 'Complete laser + Aqua Bead restoration package. Every panel, chassis rail, door jamb and floor. Handed back 100% bare metal, primer-ready.',
      price: 'From $1,500',
    },
    {
      icon: '⚙️',
      title: 'Chassis & Frame Cleaning',
      desc: 'Heavy rust removal on chassis rails, crossmembers, subframes and structural steel. 1000W CW laser cuts through decades of scale and corrosion.',
      price: 'From $400',
    },
    {
      icon: '🏍️',
      title: 'Motorcycle Restoration',
      desc: 'Frames, tanks, guards, engine cases. Precision laser cleaning for tight areas and intricate shapes. Safe on chrome and alloy components.',
      price: 'From $300',
    },
    {
      icon: '🚜',
      title: 'Agricultural & Industrial',
      desc: 'Farm implements, heavy machinery, industrial components. Laser and Aqua Bead for rapid rust removal and surface prep on large or complex parts.',
      price: 'From $250/hr',
    },
  ],
  comparison: [
    { method: '⚡ Laser (Us)', warp: 'ZERO', chem: 'None', quality: '★★★★★', speed: '★★★★★', highlight: true },
    { method: '💧 Aqua Bead (Us)', warp: 'None', chem: 'None', quality: '★★★★★', speed: '★★★★', highlight: true },
    { method: 'Dry Sandblasting', warp: 'HIGH', chem: 'Silica dust', quality: '★★★', speed: '★★★', highlight: false },
    { method: 'Chemical Stripping', warp: 'None', chem: 'TOXIC', quality: '★★★', speed: '★★', highlight: false },
    { method: 'Soda Blasting', warp: 'MEDIUM', chem: 'Media waste', quality: '★★★★', speed: '★★★', highlight: false },
    { method: 'Manual Grinding', warp: 'MEDIUM', chem: 'Metal dust', quality: '★★', speed: '★', highlight: false },
  ],
  partners: [
    { type: 'Panel Beaters', desc: 'We are your outsourced surface prep solution — no sandblasting mess, no panel warping complaints.' },
    { type: 'Classic Car Restorers', desc: 'Trust us with irreplaceable originals. Laser is the only method that guarantees no damage to thin original steel.' },
    { type: 'Hot Rod & Custom Builders', desc: 'Strip to bare metal cleanly without distorting your custom fabrication or affecting your welds.' },
    { type: 'Powder Coaters', desc: 'Parts arrive pre-cleaned to your specification — zero contamination, perfect adhesion surface every time.' },
    { type: 'Motorcycle Shops', desc: 'Frame and component cleaning without disassembly damage. Safe on chrome, alloy, and composite parts.' },
    { type: 'Agricultural Machinery Dealers', desc: 'Implement and equipment refurb without chemical runoff or media contamination risk.' },
  ],
};

// ─── Utilities ────────────────────────────────────────────────
const c = CONFIG.colors;

const css = {
  btn: {
    primary: {
      background: `linear-gradient(135deg, ${c.primary}, #0096b7)`,
      color: '#fff',
      border: 'none',
      borderRadius: 30,
      padding: '14px 32px',
      fontWeight: 800,
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: `0 4px 20px ${c.primary}55`,
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

const Badge = ({ text }) => (
  <span style={{
    background: `${c.primary}22`,
    border: `1px solid ${c.primary}55`,
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
      <p style={{ color: light ? c.muted : '#555', fontSize: '1.05rem', maxWidth: 640, margin: '0 auto' }}>
        {subtitle}
      </p>
    )}
  </div>
);

// ─── NAV ─────────────────────────────────────────────────────

const Nav = ({ active, setActive, menuOpen, setMenuOpen }) => {
  const links = ['home', 'services', 'technology', 'partners', 'pricing', 'contact'];
  const labels = { home: 'Home', services: 'Services', technology: 'Technology', partners: 'Partners', pricing: 'Pricing', contact: 'Contact' };

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
        <div onClick={() => setActive('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.6rem' }}>🔩</span>
          <div>
            <div style={{ color: c.primary, fontWeight: 900, fontSize: '1rem', letterSpacing: 1 }}>LASER RESTORE</div>
            <div style={{ color: c.muted, fontSize: '0.65rem', letterSpacing: 2, textTransform: 'uppercase' }}>Australia</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
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
          <button onClick={() => setActive('contact')} style={{ ...css.btn.primary, padding: '9px 22px', fontSize: '0.85rem', marginLeft: 8 }}>
            Free Quote
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: c.primary, fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}
          className="hamburger"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: c.dark, borderTop: `1px solid ${c.primary}33`, padding: '16px 24px' }}>
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
      background: `linear-gradient(135deg, ${c.dark} 0%, ${c.mid} 60%, #014f7a 100%)`,
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
      <div style={{
        position: 'absolute', width: 700, height: 700,
        background: `radial-gradient(circle, ${c.primary}18 0%, transparent 70%)`,
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', maxWidth: 820 }}>
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
          🔩 Automotive & Industrial Laser Cleaning — NSW
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 7vw, 5rem)',
          fontWeight: 900,
          color: '#fff',
          lineHeight: 1.1,
          marginBottom: 24,
        }}>
          Strip It Back.{' '}
          <span style={{
            background: `linear-gradient(135deg, ${c.primary}, ${c.accent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            No Warping. Ever.
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          color: c.muted,
          maxWidth: 660,
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Fiber laser cleaning and Aqua Bead vapor blasting for automotive restoration, panel prep,
          chassis cleaning and industrial surface work. The only method that guarantees zero panel warping —
          on any gauge steel.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
          <button onClick={() => setActive('contact')} style={css.btn.primary}>
            Book a Job →
          </button>
          <button onClick={() => setActive('technology')} style={css.btn.ghost}>
            Why Laser + Aqua Bead
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {['Zero Warping', 'No Chemicals', 'Primer-Ready Finish', 'Mobile Service', 'Weld-Safe', 'Workshop Partnerships'].map(b => (
            <Badge key={b} text={b} />
          ))}
        </div>
      </div>
    </div>

    {/* Stats bar */}
    <div style={{ background: c.primary, padding: '40px 24px' }}>
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 24,
        textAlign: 'center',
      }}>
        {[
          { value: '0°', label: 'Heat at Panel Surface' },
          { value: '0×', label: 'Chemical Use' },
          { value: '100%', label: 'Primer-Ready Finish' },
          { value: '$0', label: 'Panel Warp Risk' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff' }}>{s.value}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffffaa' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Services preview */}
    <div style={{ background: c.bg, padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader
          title="Our Services"
          subtitle="Laser and Aqua Bead surface prep for every automotive and industrial application."
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
                background: `${c.primary}18`,
                borderRadius: 8,
                padding: '8px 14px',
                color: c.dark,
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

    {/* Tech comparison teaser */}
    <div style={{ background: c.dark, padding: '80px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <SectionHeader
          title="We Beat Every Alternative — Here's the Proof"
          subtitle="Compare laser and Aqua Bead against every traditional method."
          light
        />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: c.primary }}>
                {['Method', 'Warp Risk', 'Chemicals', 'Surface Quality', 'Speed'].map(h => (
                  <th key={h} style={{ padding: '13px 16px', textAlign: 'center', color: '#fff', fontWeight: 800, fontSize: '0.82rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CONFIG.comparison.map((row, i) => (
                <tr key={i} style={{
                  background: row.highlight ? '#e3f8fd' : i % 2 === 0 ? '#fff' : '#f9f9f9',
                  borderBottom: '1px solid #eee',
                }}>
                  <td style={{ padding: '12px 16px', fontWeight: row.highlight ? 900 : 500, color: row.highlight ? c.dark : '#444', fontSize: '0.9rem' }}>{row.method}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: '0.85rem', color: row.highlight ? '#1a7a1a' : '#c0392b', fontWeight: 700 }}>{row.warp}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: '0.85rem', color: row.highlight ? '#1a7a1a' : '#c0392b', fontWeight: 600 }}>{row.chem}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: '0.85rem' }}>{row.quality}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: '0.85rem' }}>{row.speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button onClick={() => setActive('technology')} style={css.btn.ghost}>
            Full Technology Breakdown →
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── SERVICES PAGE ────────────────────────────────────────────

const ServicesPage = ({ setActive }) => (
  <div style={{ background: c.bg, padding: '60px 24px' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionHeader
        title="Services & Pricing"
        subtitle="Laser cleaning and Aqua Bead for every automotive and industrial surface prep requirement."
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
            <div style={{ background: `linear-gradient(135deg, ${c.dark}, ${c.mid})`, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: '2.8rem' }}>{s.icon}</div>
            </div>
            <div style={{ padding: 28 }}>
              <h3 style={{ color: c.dark, fontWeight: 800, fontSize: '1.1rem', marginBottom: 12 }}>{s.title}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 20 }}>{s.desc}</p>
              <div style={{
                background: `${c.primary}18`,
                borderRadius: 10,
                padding: '10px 16px',
                fontWeight: 800,
                color: c.dark,
                fontSize: '1rem',
                textAlign: 'center',
              }}>
                {s.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dual-method explainer */}
      <div style={{
        background: c.dark,
        borderRadius: 20,
        padding: '48px 40px',
        color: '#fff',
        marginBottom: 40,
      }}>
        <h2 style={{ color: c.primary, fontSize: '1.6rem', fontWeight: 900, marginBottom: 12, textAlign: 'center' }}>
          The Dual-Method Advantage
        </h2>
        <p style={{ color: c.muted, textAlign: 'center', marginBottom: 36, fontSize: '1rem', lineHeight: 1.7 }}>
          Most operators offer one method. We offer two — and use them together for the best possible result.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
          {[
            {
              icon: '⚡',
              title: 'Stage 1 — Laser',
              body: 'Fiber laser vaporises heavy rust, thick paint and underseal in seconds. No abrasion, no heat transfer to the metal. Used first to handle the bulk of contamination.',
              color: '#FFD700',
            },
            {
              icon: '💧',
              title: 'Stage 2 — Aqua Bead',
              body: 'Glass bead and water slurry finishes the surface to a perfect satin texture. Peens, doesn\'t scratch. Leaves a surgically clean profile ideal for primer adhesion.',
              color: c.primary,
            },
          ].map((m, i) => (
            <div key={i} style={{
              background: '#ffffff0a',
              border: `2px solid ${m.color}44`,
              borderRadius: 14,
              padding: 28,
            }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>{m.icon}</div>
              <h4 style={{ color: m.color, fontWeight: 800, marginBottom: 10 }}>{m.title}</h4>
              <p style={{ color: c.muted, fontSize: '0.9rem', lineHeight: 1.65 }}>{m.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => setActive('contact')} style={css.btn.primary}>
          Get a Quote →
        </button>
      </div>
    </div>
  </div>
);

// ─── TECHNOLOGY PAGE ──────────────────────────────────────────

const TechnologyPage = () => (
  <div>
    <div style={{ background: c.dark, padding: '60px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <SectionHeader
          title="The Technology — Why It Works"
          subtitle="Laser cleaning and Aqua Bead are not just 'better' than sandblasting — they are fundamentally different at a physics level."
          light
        />

        {/* Physics of laser */}
        <div style={{
          background: '#ffffff0a',
          border: `1px solid ${c.primary}33`,
          borderRadius: 16,
          padding: 36,
          marginBottom: 32,
        }}>
          <h3 style={{ color: c.primary, fontWeight: 900, marginBottom: 16, fontSize: '1.2rem' }}>
            ⚡ How Fiber Laser Cleaning Works
          </h3>
          <p style={{ color: c.muted, lineHeight: 1.8, fontSize: '0.95rem', marginBottom: 16 }}>
            Our 200W pulsed fiber laser emits extremely short pulses of light at 1064nm wavelength.
            Paint, rust and organic contamination absorb this wavelength and are vaporised
            almost instantly. The underlying steel reflects the majority of the energy and experiences
            essentially zero heat transfer — which is why we can safely clean panels as thin as 0.6mm
            without warping.
          </p>
          <p style={{ color: c.muted, lineHeight: 1.8, fontSize: '0.95rem' }}>
            Compare this to sandblasting, which uses mechanical friction. Friction = heat. On thin
            gauge panels, that heat causes oil-canning and permanent distortion. Once a panel warps
            from sandblasting, it cannot be fully corrected.
          </p>
        </div>

        {/* Physics of Aqua Bead */}
        <div style={{
          background: '#ffffff0a',
          border: `1px solid ${c.primary}33`,
          borderRadius: 16,
          padding: 36,
          marginBottom: 40,
        }}>
          <h3 style={{ color: c.primary, fontWeight: 900, marginBottom: 16, fontSize: '1.2rem' }}>
            💧 How Aqua Bead (Vapor Blasting) Works
          </h3>
          <p style={{ color: c.muted, lineHeight: 1.8, fontSize: '0.95rem', marginBottom: 16 }}>
            Aqua Bead uses fine glass bead media suspended in a water-based slurry. The water acts
            as a lubricant AND a heat sink — the bead peens the metal surface rather than cutting or
            tearing it. The result is a satin texture that is actually denser and more corrosion-resistant
            than bare blasted metal, because the surface is closed (compressed) rather than torn open.
          </p>
          <p style={{ color: c.muted, lineHeight: 1.8, fontSize: '0.95rem' }}>
            Dry sandblasting opens the metal surface, increasing the surface area exposed to air — which
            accelerates flash rusting within hours. Aqua Bead leaves a closed surface that resists flash
            rust significantly longer, giving you a better priming window.
          </p>
        </div>

        {/* Full comparison table */}
        <h2 style={{ color: c.primary, fontWeight: 900, marginBottom: 24, textAlign: 'center', fontSize: '1.5rem' }}>
          Full Method Comparison
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: c.primary }}>
                {['Method', 'Warp Risk', 'Chemical Use', 'Surface Quality', 'Speed', 'Flash Rust Risk'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'center', color: '#fff', fontWeight: 800, fontSize: '0.82rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { method: '⚡ Laser (Us)', warp: 'ZERO', chem: 'None', quality: '★★★★★', speed: '★★★★★', flash: 'Very Low', hl: true },
                { method: '💧 Aqua Bead (Us)', warp: 'None', chem: 'None', quality: '★★★★★', speed: '★★★★', flash: 'Low', hl: true },
                { method: 'Dry Sandblasting', warp: 'HIGH', chem: 'Silica dust', quality: '★★★', speed: '★★★', flash: 'HIGH', hl: false },
                { method: 'Chemical Stripping', warp: 'None', chem: 'TOXIC', quality: '★★★', speed: '★★', flash: 'Medium', hl: false },
                { method: 'Soda Blasting', warp: 'MEDIUM', chem: 'Media waste', quality: '★★★★', speed: '★★★', flash: 'Medium', hl: false },
                { method: 'Manual Grinding', warp: 'MEDIUM', chem: 'Metal dust', quality: '★★', speed: '★', flash: 'HIGH', hl: false },
              ].map((row, i) => (
                <tr key={i} style={{
                  background: row.hl ? '#e3f8fd' : i % 2 === 0 ? '#fff' : '#f9f9f9',
                  borderBottom: '1px solid #eee',
                }}>
                  <td style={{ padding: '13px 16px', fontWeight: row.hl ? 900 : 500, fontSize: '0.9rem', color: c.dark }}>{row.method}</td>
                  <td style={{ padding: '13px 16px', textAlign: 'center', fontSize: '0.85rem', color: row.hl ? '#1a7a1a' : '#c0392b', fontWeight: 700 }}>{row.warp}</td>
                  <td style={{ padding: '13px 16px', textAlign: 'center', fontSize: '0.85rem', color: row.hl ? '#1a7a1a' : '#c0392b' }}>{row.chem}</td>
                  <td style={{ padding: '13px 16px', textAlign: 'center', fontSize: '0.85rem' }}>{row.quality}</td>
                  <td style={{ padding: '13px 16px', textAlign: 'center', fontSize: '0.85rem' }}>{row.speed}</td>
                  <td style={{ padding: '13px 16px', textAlign: 'center', fontSize: '0.85rem', color: row.hl ? '#1a7a1a' : '#c0392b' }}>{row.flash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

// ─── PARTNERS PAGE ────────────────────────────────────────────

const PartnersPage = ({ setActive }) => (
  <div style={{ background: c.bg, padding: '60px 24px' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <SectionHeader
        title="Workshop Partnerships"
        subtitle="We are the outsourced surface prep solution for automotive workshops across NSW. Here's how it works."
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
        marginBottom: 56,
      }}>
        {CONFIG.partners.map((p, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: 14,
            padding: 28,
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            borderLeft: `4px solid ${c.primary}`,
          }}>
            <h4 style={{ color: c.dark, fontWeight: 800, marginBottom: 10, fontSize: '1rem' }}>{p.type}</h4>
            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6 }}>{p.desc}</p>
          </div>
        ))}
      </div>

      {/* How partnership works */}
      <div style={{ background: c.dark, borderRadius: 18, padding: '44px 40px', color: '#fff', marginBottom: 40 }}>
        <h3 style={{ color: c.primary, fontWeight: 900, marginBottom: 32, textAlign: 'center', fontSize: '1.4rem' }}>
          How a Workshop Partnership Works
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {[
            { step: '1', title: 'You Book Us', body: 'Call or email when you have a job requiring surface prep. Give us 24 hours notice where possible.' },
            { step: '2', title: 'We Come to You', body: 'We attend your workshop with our mobile equipment. No transport costs for your customer.' },
            { step: '3', title: 'Parts Cleaned On-Site', body: 'Laser and/or Aqua Bead as required. Parts returned to your team primer-ready on the same day.' },
            { step: '4', title: 'You Invoice Your Customer', body: 'Build our service into your quote. Most workshops mark up 20–30%. Everyone wins.' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '0 12px' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: c.primary, color: '#fff',
                fontWeight: 900, fontSize: '1.3rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                {s.step}
              </div>
              <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: 8, fontSize: '0.95rem' }}>{s.title}</h4>
              <p style={{ color: c.muted, fontSize: '0.82rem', lineHeight: 1.6 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => setActive('contact')} style={css.btn.primary}>
          Enquire About a Workshop Partnership →
        </button>
      </div>
    </div>
  </div>
);

// ─── PRICING PAGE ─────────────────────────────────────────────

const PricingPage = ({ setActive }) => (
  <div style={{ background: c.bg, padding: '60px 24px' }}>
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <SectionHeader
        title="Pricing Guide"
        subtitle="All prices exclude GST. Volume and workshop partner rates available on request."
      />

      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', marginBottom: 36 }}>
        <div style={{ background: c.dark, padding: '20px 28px' }}>
          <h2 style={{ color: c.primary, margin: 0, fontSize: '1.2rem', fontWeight: 900 }}>
            🔩 Automotive & Industrial Laser Cleaning
          </h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f4f8ff' }}>
                {['Service', 'Unit', 'Price (Ex GST)'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: h === 'Price (Ex GST)' ? 'right' : 'left', color: '#444', fontSize: '0.85rem', fontWeight: 800 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CONFIG.pricing.map(({ service, unit, price }, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#f8fbff' }}>
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
        <h4 style={{ color: c.dark, fontWeight: 900, marginBottom: 12 }}>💡 About Our Pricing</h4>
        <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.7 }}>
          Automotive pricing is based on the number and size of panels, the level of rust/paint contamination,
          and whether the mobile call-out or drop-off to our workshop is used. Workshop partner rates are
          negotiated separately. Most full vehicle strip jobs are quoted on-site or from photos.
          All jobs carry a minimum charge equal to the call-out fee.
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
  const [form, setForm] = useState({ name: '', phone: '', email: '', vehicle: '', desc: '', jobType: 'automotive' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: c.bg, padding: '60px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <SectionHeader
          title="Book a Job or Get a Quote"
          subtitle="Tell us about your vehicle or parts and we'll quote within 2 hours."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 36 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 36, boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                <h3 style={{ color: c.dark, fontWeight: 900, marginBottom: 12 }}>Quote Request Received!</h3>
                <p style={{ color: '#555' }}>We'll be in touch within 2 hours. Send through photos to {CONFIG.email} to speed things up.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ color: c.dark, fontWeight: 900, marginBottom: 24, fontSize: '1.1rem' }}>
                  Request a Quote
                </h3>
                {[
                  { key: 'name', label: 'Full Name / Workshop', type: 'text', placeholder: 'John Smith / Smith Auto' },
                  { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '04XX XXX XXX' },
                  { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                  { key: 'vehicle', label: 'Vehicle / Parts (Year, Make, Model)', type: 'text', placeholder: 'e.g. 1970 Ford Falcon XW, all panels' },
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
                  <label style={{ display: 'block', color: '#444', fontWeight: 700, fontSize: '0.85rem', marginBottom: 6 }}>Job Type</label>
                  <select
                    value={form.jobType}
                    onChange={e => setForm({ ...form, jobType: e.target.value })}
                    style={{
                      width: '100%', padding: '11px 14px', borderRadius: 10,
                      border: '1.5px solid #e0e0e0', fontSize: '0.9rem',
                      fontFamily: 'inherit', background: '#fff', boxSizing: 'border-box',
                    }}
                  >
                    <option value="automotive">Automotive — Full Vehicle Strip</option>
                    <option value="panels">Individual Panels</option>
                    <option value="chassis">Chassis / Frame</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="agricultural">Agricultural / Industrial</option>
                    <option value="workshop">Workshop Partnership Enquiry</option>
                  </select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', color: '#444', fontWeight: 700, fontSize: '0.85rem', marginBottom: 6 }}>
                    Description / Condition
                  </label>
                  <textarea
                    placeholder="Describe the rust level, paint condition, any areas of concern..."
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

          <div>
            <div style={{ background: c.dark, borderRadius: 16, padding: 32, color: '#fff', marginBottom: 24 }}>
              <h3 style={{ color: c.primary, fontWeight: 900, marginBottom: 20 }}>📞 Contact Details</h3>
              {[
                { label: 'Phone', value: CONFIG.phone, icon: '📞' },
                { label: 'Email', value: CONFIG.email, icon: '📧' },
                { label: 'Website', value: CONFIG.web, icon: '🌐' },
                { label: 'Service Area', value: CONFIG.address, icon: '📍' },
                { label: 'ABN', value: CONFIG.abn, icon: '🏢' },
              ].map(({ label, value, icon }) => (
                <div key={label} style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ color: c.muted, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
                    <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: `${c.primary}18`, border: `1px solid ${c.primary}44`, borderRadius: 14, padding: 24 }}>
              <h4 style={{ color: c.dark, fontWeight: 900, marginBottom: 10 }}>📸 Pro Tip</h4>
              <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Send through photos of the vehicle or panels to {CONFIG.email} — we can often quote
                within the hour without needing a site visit.
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
      case 'technology': return <TechnologyPage />;
      case 'partners': return <PartnersPage setActive={setActive} />;
      case 'pricing': return <PricingPage setActive={setActive} />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setActive={setActive} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", minHeight: '100vh', background: '#fff' }}>
      <Nav active={active} setActive={setActive} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {renderPage()}

      <footer style={{ background: c.dark, borderTop: `2px solid ${c.primary}33`, padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: 10 }}>🔩</div>
        <div style={{ color: c.primary, fontWeight: 900, fontSize: '1.2rem', marginBottom: 6 }}>
          LASER RESTORE AUSTRALIA PTY LTD
        </div>
        <div style={{ color: c.muted, fontSize: '0.85rem', marginBottom: 6 }}>ABN: {CONFIG.abn}</div>
        <div style={{ color: c.muted, fontSize: '0.85rem', marginBottom: 16 }}>{CONFIG.address}</div>
        <div style={{ color: '#ffffff33', fontSize: '0.75rem' }}>
          © 2025 Laser Restore Australia Pty Ltd · All rights reserved · {CONFIG.web}
        </div>
      </footer>
    </div>
  );
};

export default App;
