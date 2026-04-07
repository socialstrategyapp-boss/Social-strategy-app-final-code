# ⚠️ MASTER DESIGN REFERENCE — READ THIS EVERY TIME BEFORE WRITING ANY CODE

> **THIS FILE IS NON-NEGOTIABLE.**
> Every developer, every AI, every build session MUST read and apply these rules before touching a single line of UI code.
> These rules are derived from the owner's uploaded reference images and explicit instructions.
> No exceptions. No shortcuts.

---

## 🖼️ REFERENCE IMAGES (Always Refer Back To These)

| Ref | URL | Description | Key Rule To Extract |
|-----|-----|-------------|-------------------|
| REF-1 | https://www.genspark.ai/api/files/s/BHRVxUAX | 3×3 grid of 3D clay-style social icons on pure black | Icon style, black background, glow from color not light |
| REF-2 | https://www.genspark.ai/api/files/s/zmXeXL50 | Phone with rainbow burst of app icons exploding upward | Hero energy, neon gradient rays, deep midnight blue bg |
| REF-3 | https://www.genspark.ai/api/files/s/JjOCcjKk | Neon pill-shaped toggle buttons (SIGN UP, LOGIN etc) | Button style: pill shape, neon gradient border, dark fill |
| REF-4 | https://www.genspark.ai/api/files/s/0mHpvTiL | Toggle switches day/night, color-coded ON/OFF states | Toggle UI: large thumb, gradient fill, clean states |
| REF-5 | https://www.genspark.ai/api/files/s/Xzi5ftS5 | AI hologram face on phone, robot, neon circuitry | AI branding mood: cyan/violet/magenta, futuristic depth |
| REF-6 | https://www.genspark.ai/api/files/s/fhzI7eRJ | 3D social icons (WA, FB, Twitter, IG) on white bg | Icon rendering: glossy, embossed, soft shadow, thick padding |
| REF-7 | https://www.genspark.ai/api/files/s/48XisGiS | Icon style collage — 3D glossy + watercolor variants | Icon variety: rounded corners, brand colors, modular grid |

### CONFIRMED SPECS FROM IMAGE ANALYSIS (2026-04-07)

**REF-4 Toggles — Exact Spec:**
- Day/ON: pill track gradient red/pink → orange → yellow. White thumb right. Sun icon left.
- Night/ON: deep royal blue → cyan/teal. Crescent moon inside. White thumb left. Inner glow.
- OFF state: matte light gray, white thumb, embossed inner shadow — NO color.
- Mini toggles: magenta, cyan, green — same pill, white thumb, saturated fill, soft drop shadow.

**REF-3 Buttons — Exact Spec:**
- Background: deep charcoal/navy #08111a
- Shape: elongated pill, very large corner radius (999px)
- Border: thin glowing neon gradient outline (NOT solid color)
- Interior: near-black dark fill — glassmorphism feel
- Right end: circular gradient orb/knob (unique color per button)
- Text: uppercase bold white, left-aligned
- Gradient pairs: SIGN UP=yellow-green, LOGIN=cyan→pink, SEARCH=purple→magenta,
  LOG OUT=magenta→orange, UPLOAD=cyan→blue, NEXT=purple→pink,
  ACCEPT=purple→teal, E-MAIL=purple→cyan
- Glow: soft bloom outer glow around entire pill border

**REF-1 Icons — Exact Spec:**
- Background: pure black #000000
- Shape: rounded square — very thick corner radius, cushion/pillow edges
- Finish: claymorphism + 3D — matte-to-semi-gloss, extruded depth
- Shadow: soft ambient occlusion, subtle edge lighting
- Each icon: own brand color tile, white symbol centered, ~55% tile width

**REF-2 Hero — Exact Spec:**
- LANDING PAGE ONLY — never use on internal app screens
- Deep electric blue → black bg with cyan/magenta circuit lines
- Radial burst: white/yellow core → blue, cyan, magenta, orange streaks

**REF-5 AI Pages — Exact Spec:**
- Colors: cyan + violet + magenta on dark purple-blue bg
- Style: high saturation 3D, intense bloom, edge glow, layered glass panels
- Use for: Characters page, Image Maker, AI features

---

## 🎨 COLOR PALETTE (Absolute — Never Deviate)

### Backgrounds
```
Page background:     #050816  (near-black, very dark navy)
Card background:     #0B1226  (dark blue-black)
Card elevated:       #0F1A35  (slightly lighter card)
Input background:    #081026
Sidebar:             #050816
```

### Accent Colors (Neon — Use For Glows, Borders, Highlights)
```
Cyan (primary):      #20D9FF
Blue:                #2F80FF
Violet:              #8B5CF6
Magenta/Pink:        #FF2DA6
Pink light:          #FF4FD8
Green:               #00F59B
Orange:              #FFB020
Yellow:              #FFD600
```

### Text
```
Primary text:        #F4F7FB
Muted text:          #A8B3C7
Dim text:            #6B7A99
```

### Semantic
```
Success:             #4ade80
Warning:             #fbbf24
Danger:              #f87171
Info:                #60a5fa
```

---

## 🔲 ICON STYLE (From REF-1, REF-6, REF-7)

**Every platform icon and UI icon MUST follow this style:**

- Shape: Rounded square, NOT circle, NOT hard square
- Corner radius: 22–28% of icon size (very rounded, pillow-soft)
- Depth: Subtle 3D elevation — soft bottom shadow, top highlight
- Surface: Glossy/polished plastic feel
- Symbol: White or very light, centered, with emboss depth
- Background: Each icon has its own brand color tile
- Shadows: Soft drop shadow below, NOT harsh
- Glow: Subtle color bloom matching the icon's brand color
- Padding: Icon symbol takes ~55% of tile width, rest is padding
- Background behind icons: Pure black (#000000) or very dark navy

**NEVER:**
- Flat 2D icons with no depth
- Outline-only icons for platform badges
- Icons crammed edge-to-edge with no padding
- Mismatched corner radii across the same screen

---

## 💊 BUTTON STYLE (From REF-3)

**Three levels only:**

### Level 1 — Primary CTA
```css
background: linear-gradient(135deg, #20D9FF, #2F80FF, #8B5CF6);
border: none;
border-radius: 999px;  /* full pill */
padding: 12px 28px;
font-weight: 700;
font-size: 15px;
color: #ffffff;
box-shadow: 0 0 18px rgba(32,217,255,0.35);
```

### Level 2 — Secondary
```css
background: transparent;
border: 1.5px solid rgba(32,217,255,0.4);
border-radius: 999px;
padding: 11px 24px;
font-weight: 600;
color: #F4F7FB;
/* thin neon gradient border using the pill-with-border from REF-3 */
```

### Level 3 — Tertiary / Ghost
```css
background: rgba(255,255,255,0.05);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 12px;
padding: 8px 16px;
font-weight: 500;
color: #A8B3C7;
```

**The pill toggle button style (REF-3 — SIGN UP / LOGIN style):**
- Elongated capsule, dark fill
- Thin neon gradient stroke around edge
- Small circular gradient dot/node on right end
- White bold uppercase label
- Each button uses a DIFFERENT neon color for its border dot

**NEVER:**
- More than ONE primary button per section
- Glowing everything equally — glow is earned by importance
- Buttons that look decorative — every button must do ONE clear thing
- Square buttons (no border-radius) anywhere in the product UI

---

## 🔘 TOGGLE SWITCHES (From REF-4)

```css
/* Track */
width: 52px; height: 28px;
border-radius: 999px;
background: (OFF) #1a1f35 | (ON) linear-gradient(135deg, #20D9FF, #2F80FF);

/* Thumb */
width: 22px; height: 22px;
border-radius: 50%;
background: #ffffff;
box-shadow: 0 2px 6px rgba(0,0,0,0.3);
```

- Day/light mode toggle: warm orange→pink gradient (REF-4 sun icon)
- Night/dark mode toggle: deep blue→cyan gradient (REF-4 moon icon)
- Feature toggles: mint green when ON, dark gray when OFF
- Settings toggles: hot pink or azure depending on feature category

---

## 🃏 CARD STYLE

```css
background: #0B1226;
border: 1px solid rgba(32,217,255,0.12);
border-radius: 24px;
padding: 20px 24px;
box-shadow: 0 0 0 1px rgba(32,217,255,0.06), 0 4px 24px rgba(0,0,0,0.4);
```

**Card rules:**
- Glow reduced by 40% from current — cards should NOT scream
- Internal padding minimum 20px
- Consistent 24px radius everywhere
- Text inside cards: larger, simpler, fewer words
- No floating decorative shapes inside cards
- Max 1 accent color per card (don't rainbow every card)

---

## 🌐 BACKGROUND TREATMENT (From REF-1, REF-2, REF-5)

- Base: #050816 — not pure black, not grey, this specific dark navy
- Hero sections: radial glow from center, very subtle, not blinding
- Circuit/grid texture: extremely subtle, 3–5% opacity only
- Gradient rays (REF-2 style): only for hero/landing, not internal tools
- Internal app screens: flat dark background, NO rays, NO bursts
- Depth layers: use z-index and card elevation, NOT background gradients

---

## 🧭 NAVIGATION RULES

### Bottom Navigation (Mobile)
```
Tabs: Home | Strategy | Create | Schedule | Profile
Height: 60px max
Background: rgba(5,8,22,0.95) with 1px top border rgba(32,217,255,0.15)
Active icon: cyan #20D9FF with soft glow
Inactive icon: #6B7A99
Label: 10px, no uppercase
```

**DO NOT put Analytics in bottom nav** — it goes inside Strategy or Profile tab.
**DO NOT put AI Team in bottom nav** — it goes inside Create.

### Sidebar (Desktop)
- Width: 220px collapsed content, never wider
- Logo: top left, 44px, never altered
- Nav items: 40px height, 12px left padding
- Active state: cyan left border 3px + subtle bg highlight
- Section dividers: thin 1px line, 20% opacity

---

## 📐 SPACING SCALE (Never Deviate)

```
xs:   4px
sm:   8px
md:  12px
lg:  16px
xl:  24px
xxl: 32px
3xl: 48px
4xl: 64px
```

**Between major sections:** 24px minimum
**Inside cards:** 20px minimum padding
**Between card elements:** 12–16px

---

## ✍️ TYPOGRAPHY HIERARCHY

```
Hero headline:    clamp(36px, 6vw, 72px), weight 900, gradient text
H1:               32px, weight 800
H2:               24px, weight 800
H3:               18px, weight 700
Body:             15px, weight 400
Small/label:      13px, weight 600
Micro:            11px, weight 700, uppercase, letter-spacing 0.08em
```

---

## ❌ WHAT IS BANNED (Non-Negotiable)

1. **Excessive glow** — reduce ALL existing glow by 40%. Glow is accent, not atmosphere.
2. **Too many gradients on one screen** — max 2 gradient elements per screen
3. **Decorative buttons** — every button must have ONE clear function
4. **Giant empty zones** — no large padding blocks that serve no purpose
5. **Inconsistent border radius** — pick 24px for cards, 999px for pills. Stick to it.
6. **Floating decorative pills** — remove all purely decorative floating badge elements
7. **Multiple primary CTAs** — one primary per section, full stop
8. **AI Team / Analytics in bottom nav** — see nav rules above
9. **Pure black (#000000) backgrounds for cards** — use #0B1226
10. **Centered text for everything** — use left-align for body content, center only for hero/CTA
11. **Stock-style placeholder images** — use generated or uploaded assets only
12. **Square corners** — nothing in this product has sharp 0px radius

---

## 🔗 THREE-PAGE FLOW (MANDATORY CONNECTIONS)

```
Report Page
  ↓ "Use This Report" button
Character Create Page (optional)
  ↓ "Use In Create Studio" button
Create Studio Page
  ↓ "Approve Schedule" button
Auto-Post / Scheduler
```

Every page must have an explicit next-step action linking to the next page.

---

## 📱 RESPONSIVE RULES

- Mobile first. Every component starts at 320px wide.
- Bottom nav: only on mobile (< 768px)
- Sidebar: only on desktop (≥ 1024px)
- Cards: single column mobile, 2-col tablet, 2–3 col desktop
- Hero text: clamp sizing, never overflow
- Buttons: full width on mobile if primary

---

## ✅ PRE-CODING CHECKLIST

Before writing ANY UI code, ask:
- [ ] Is the background #050816?
- [ ] Are all cards using #0B1226 with 24px radius?
- [ ] Is there only ONE primary button per section?
- [ ] Are platform icons 3D rounded-square style?
- [ ] Is glow reduced (not every element glowing)?
- [ ] Are buttons pill-shaped with neon border treatment?
- [ ] Does this screen connect clearly to the next step?
- [ ] Is spacing using the defined scale (not arbitrary px)?
- [ ] Is the SS logo unchanged (no stretching, no recoloring)?
- [ ] Are toggles using the gradient pill style from REF-4?

**If ANY box is unchecked — fix it before moving on.**

---

*Last updated: 2026-04-07*
*These rules are set by the product owner and are not open for interpretation.*
