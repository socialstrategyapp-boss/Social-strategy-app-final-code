# Content Engine — Report-to-Content Expansion System

## Overview

The Content Engine converts a full business report into a complete, endless content production system. It extracts monetizable pillars, generates content for each, applies focus modes, integrates uploaded assets, enforces character consistency, and outputs a structured schedule.

---

## Step 1 — Extract Monetizable Pillars

```
INPUT: full_report (json/md)

FOR EACH section in report:
  IF contains offer / service / product / experience / education / personality:
    extract as PILLAR:
      name: string
      type: service | product | education | experience | recurring | brand
      revenue_potential: low | medium | high
      content_potential: low | medium | high
      conversion_potential: low | medium | high
      ease_score: 1–10
      subtopics: string[]
      recommended_formats: short_video | long_video | image | carousel | story | text | reel | live
      posting_frequency: posts_per_week

RANK pillars by: (revenue_potential × 3) + (content_potential × 2) + ease_score
RETURN: ranked_pillars[]
```

---

## Step 2 — Content Angle Expansion (Per Pillar)

For each pillar, generate:
- **10–20 micro-subtopics**
- **Formats**: short video, image, carousel, story, series, live, behind-the-scenes
- **Effort levels**: easy (phone-only), medium (basic edit), high (produced)
- **Emotional angles**: inspiration, education, humour, transformation, social proof, authority, scarcity, curiosity, nostalgia, aspiration

---

## Step 3 — Content Generation Per Pillar

```
FOR EACH pillar:
  generate:
    15 video ideas (hook + format + duration + effort level)
    10 image prompts (subject + style + mood + platform)
    10 captions (opening hook + body + CTA variation)
     5 CTA variations (soft, medium, direct, urgency, community)
    10 hook variations (question, statement, controversy, statistic, story, challenge, myth, how-to, trend, personal)
    
  VARIATION RULE: No two consecutive pieces share the same:
    - hook type
    - emotional angle
    - format
    - CTA style
```

---

## Step 4 — Focus Modes

| Mode | Description | Output Filter |
|---|---|---|
| `mixed` | Balanced across all pillars | Full calendar spread |
| `single_pillar` | Deep focus on one pillar for set period | 100% one pillar |
| `campaign` | Launch, promo, or event | Campaign-specific content only |
| `easy` | Phone-only, <10 min creation, minimal edit | Easy effort only |
| `authority` | Build credibility and expertise | Educational + behind-the-scenes + proof |
| `sales` | Drive direct conversions | Offer + CTA + urgency heavy |
| `awareness` | Top-of-funnel reach and discovery | Hook-heavy, trend-adjacent |
| `community` | Engagement and retention | Interactive, UGC prompts, responses |

### Focus Mode Trigger Syntax

```
FOCUS_MODE: single_pillar
PILLAR: "Plant Hospital"
DURATION: 30 days
OUTPUT: deep_dive_schedule
```

---

## Step 5 — Asset-Aware Content

```
INPUT: uploaded_assets[] (product | staff | store | packaging | lifestyle)

FOR EACH content idea:
  IF asset_type matches content context:
    inject asset into prompt:
      "Use the uploaded [staff portrait of Georgie] in this post"
      "Feature the [plant hospital shelf photo] as background"
      "Show the [gift box packaging] with handwritten note detail"
  
  NEVER invent generic stock-style visuals
  ALWAYS prefer uploaded assets over AI-generated replacements
  IF no matching asset: generate with character consistency rules
```

---

## Step 6 — Character Continuity

### Character Profile Template

```json
{
  "character_id": "char_xxx",
  "name": "Georgie",
  "role": "Plant Specialist & Store Host",
  "age_range": "28–35",
  "appearance": {
    "hair": "brown, shoulder-length",
    "style": "casual professional, apron on in-store",
    "skin_tone": "medium warm",
    "always_includes": ["plant earrings", "friendly smile"]
  },
  "personality": "Warm, knowledgeable, slightly quirky, loves plant puns",
  "tone": "Conversational, educational, encouraging",
  "content_purpose": "Education, product demos, Q&A, tips",
  "approved_variations": ["in-store demos", "outdoor plant care tips", "gift box reveals"],
  "banned_variations": ["formal corporate", "high-fashion editorial", "aggressive sales"],
  "consistency_lock": true
}
```

### Consistency Enforcement

```
BEFORE generating any character-featuring content:
  load character_profile
  append to prompt: 
    "This content features {name}. Maintain exact appearance: {appearance}.
     Personality: {personality}. Tone: {tone}.
     BANNED variations: {banned_variations}.
     Consistency is critical — do not alter appearance, age, or personality."
```

---

## Step 7 — Endless Variation System

### Variation Dimensions

1. **Hook type**: question, bold statement, statistic, story opener, myth buster, how-to, trend hook, personal confession, challenge, curiosity gap
2. **Emotional angle**: inspiration, education, humour, transformation, social proof, authority, scarcity, curiosity, nostalgia, aspiration, empathy
3. **Format**: reel, static image, carousel, story, live, text post, UGC, before/after, tutorial, Q&A
4. **Audience angle**: beginner, intermediate, expert, parent, professional, hobbyist, gift-buyer, local resident
5. **CTA style**: soft (follow for more), medium (save this), direct (link in bio), urgency (limited time), community (comment below)

### Variation Rule
```
NEVER use the same combination of (hook_type + emotional_angle + format) twice in a 14-day window.
Track combinations in prompt memory.
On similarity detection (>0.85): replace hook_type and emotional_angle before generating.
```

---

## Step 8 — Schedule Output Structure

### Weekly Rhythm (Monday–Sunday)

| Day | Theme | Format | Pillar |
|---|---|---|---|
| Monday | Offer / Product | Image or Reel | Top revenue pillar |
| Tuesday | Education | Carousel or Text | Authority pillar |
| Wednesday | Authority / Story | Reel or Behind-scenes | Brand personality |
| Thursday | Product / Feature | Image or Video | Second revenue pillar |
| Friday | Conversion | Reel + Caption | Direct CTA |
| Saturday | Repost / UGC | Story or Image | Community |
| Sunday | Lifestyle / Inspiration | Image or Reel | Lifestyle pillar |

### Monthly Rotation

| Week | Theme |
|---|---|
| Week 1 | Awareness — Discovery content, hooks, high-reach |
| Week 2 | Education — Value, tutorials, authority |
| Week 3 | Conversion — Offers, CTAs, testimonials |
| Week 4 | Community — Engagement, UGC, retention |

### 14-Day Recycle System
```
Every 14 days:
  QUERY: top 3 performing posts from previous 2 weeks
  FOR EACH top post:
    generate new variation with:
      - different hook type
      - different emotional angle
      - same core message
    schedule as "recycled" content
```

---

## Step 9 — Structured Output Format

```json
{
  "account_id": "acc_xxx",
  "generated_at": "2026-04-07T00:00:00Z",
  "focus_mode": "mixed",
  "pillars": [
    {
      "name": "Plant Hospital",
      "rank": 1,
      "subtopics": [...],
      "formats": [...],
      "content_ideas": {
        "videos": [...],
        "images": [...],
        "captions": [...],
        "hooks": [...],
        "ctas": [...]
      },
      "hashtags": {
        "brand": [...],
        "niche": [...],
        "broad": [...]
      }
    }
  ],
  "weekly_schedule": {
    "2026-04-07": [
      {
        "day": "Monday",
        "platform": "instagram",
        "format": "reel",
        "pillar": "Plant Hospital",
        "content_idea": "...",
        "caption": "...",
        "hashtags": [...],
        "asset_instructions": "Use uploaded shelf photo + Georgie character"
      }
    ]
  },
  "monthly_calendar": {...},
  "ready_to_generate_prompts": [...]
}
```

---

## Idea Multiplier Prompt

```
TAKE ONE IDEA: {idea}

EXPAND into 8 variations using these dimensions:

1. Hook type: question version
2. Hook type: bold statement version
3. Emotional angle: transformation
4. Emotional angle: social proof
5. Format: video script
6. Format: carousel 5-slide outline
7. Audience: beginner version
8. Audience: expert version

Each variation must be distinctly different in opening, structure, and CTA.
Output as numbered list.
```

---

## Easy / Low-Budget Mode

```
FILTER: effort_level = 'easy'
RULES:
  - Phone camera only (no professional lighting required)
  - Under 10 minutes to create
  - No complex editing (basic cuts only)
  - Authentic, lo-fi aesthetic is preferred
  - Focus on personality + value over production quality
  
OUTPUT: easy_content_batch (minimum 14 pieces for 2 weeks)
```
