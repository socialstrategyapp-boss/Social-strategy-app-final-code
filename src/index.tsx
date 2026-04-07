import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { landingPage } from './pages/landing'
import { dashboardPage } from './pages/dashboard'
import { analysisPage } from './pages/analysis'
import { contentStudioPage } from './pages/content-studio'
import { schedulerPage } from './pages/scheduler'
import { analyticsPage } from './pages/analytics'
import { pricingPage } from './pages/pricing'
import { loginPage } from './pages/login'
import { settingsPage } from './pages/settings'
import { charactersPage } from './pages/characters'
import { adminPage } from './pages/admin'
import { profilePage } from './pages/profile'
import { privacyPage, termsPage, gdprPage, aboutPage, faqPage, cookiePage, billingPolicyPage } from './pages/static-pages'
import { billingPage } from './pages/billing'
import { characterMakerPage } from './pages/character-maker'
import { imageMakerPage } from './pages/image-maker'
import { uploadsPage } from './pages/uploads'
import { characterCreatePage } from './pages/character-create'
import { reportPage } from './pages/report'

type Env = {
  OPENAI_API_KEY: string
  DB: D1Database
}

const app = new Hono<{ Bindings: Env }>()

app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './' }))

// ─── Pages ───────────────────────────────────────────────────────────────────
app.get('/', (c) => c.html(landingPage()))
app.get('/login', (c) => c.html(loginPage()))
app.get('/dashboard', (c) => c.html(dashboardPage()))
app.get('/analysis', (c) => c.html(analysisPage()))
app.get('/content-studio', (c) => c.html(contentStudioPage()))
app.get('/scheduler', (c) => c.html(schedulerPage()))
app.get('/analytics', (c) => c.html(analyticsPage()))
app.get('/pricing', (c) => c.html(pricingPage()))
app.get('/settings', (c) => c.html(settingsPage()))
app.get('/characters', (c) => c.html(charactersPage()))
app.get('/admin', (c) => c.html(adminPage()))
app.get('/profile', (c) => c.html(profilePage()))
app.get('/privacy', (c) => c.html(privacyPage()))
app.get('/terms', (c) => c.html(termsPage()))
app.get('/gdpr', (c) => c.html(gdprPage()))
app.get('/about', (c) => c.html(aboutPage()))
app.get('/faq', (c) => c.html(faqPage()))
app.get('/cookies', (c) => c.html(cookiePage()))
app.get('/billing-policy', (c) => c.html(billingPolicyPage()))
app.get('/billing', (c) => c.html(billingPage()))
app.get('/character-create', (c) => c.html(characterCreatePage()))
app.get('/report', (c) => c.html(reportPage()))

// ═══════════════════════════════════════════════════════════════════════════
// ─── ACCOUNT & CREDIT HELPERS ───────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

// Cost in credits per action (per spec: 1 credit ≈ $1 AUD value, 3x markup on cost)
const CREDIT_COSTS: Record<string, number> = {
  analyze:               10,  // SEO + brand + usability audit → 10cr
  generate_content:       2,  // caption + CTA + hashtags per platform set → 2cr
  generate_image:         4,  // 1 × DALL-E 3 image → 4cr
  generate_image_2:       8,  // 2 × images → 8cr
  generate_image_3:      12,  // 3 × images → 12cr
  generate_image_edit:    2,  // edit / upscale / variation → +2cr
  video_script:           4,  // video script (text only) → 4cr
  generate_report:       15,  // full analytics report → 15cr (updated from 20)
  report_summary:         4,  // lightweight report summary → 4cr
  seo_meta:               3,  // SEO title + meta + keywords → 3cr
  blog_draft:             6,  // long-form blog article → 6cr
  schedule_7day:          4,  // 7-day content schedule → 4cr
  schedule_30day:        10,  // 30-day content schedule → 10cr
  publish_post:           1,  // per publish event after plan cap → 1cr
  platform_variant:       1,  // multi-platform adaptation per extra platform → +1cr
  character_consistency:  3,  // character continuity injection → +3cr
}

// Returns the account row or null. Uses email from body if provided; falls back to demo account.
async function getAccount(db: D1Database, email?: string | null): Promise<Record<string, unknown> | null> {
  const lookup = email || 'demo@socialstrategy.ai'
  return await db.prepare('SELECT * FROM accounts WHERE email=?').bind(lookup).first<Record<string, unknown>>()
}

// Returns { allowed: true } or { allowed: false, error: string, code: string }
async function checkCredits(db: D1Database, action: string, email?: string | null): Promise<{ allowed: boolean; error?: string; code?: string; account?: Record<string, unknown> }> {
  const account = await getAccount(db, email)
  if (!account) return { allowed: false, error: 'Account not found. Please log in.', code: 'NO_ACCOUNT' }

  // Blocked / suspended
  if (account.status === 'blocked') return { allowed: false, error: '🚫 Your account has been blocked. Contact support.', code: 'BLOCKED' }
  if (account.status === 'suspended') return { allowed: false, error: '⏸️ Your account is suspended. Check your billing.', code: 'SUSPENDED' }

  // Expiry check
  if (account.expires_at) {
    const expiry = new Date(account.expires_at as string)
    if (expiry < new Date()) {
      // Mark as expired
      await db.prepare("UPDATE accounts SET status='expired', updated_at=CURRENT_TIMESTAMP WHERE email=?").bind(email || 'demo@socialstrategy.ai').run()
      return { allowed: false, error: '⏰ Your subscription has expired. Please renew to continue.', code: 'EXPIRED' }
    }
  }

  // Report limit check (analyze & generate_report)
  if ((action === 'analyze' || action === 'generate_report') && (account.reports_max as number) > 0) {
    if ((account.reports_used as number) >= (account.reports_max as number)) {
      return { allowed: false, error: `📊 You've used all ${account.reports_max} reports on your ${account.plan} plan. Upgrade to get more.`, code: 'REPORT_LIMIT' }
    }
  }

  // Credit check
  const cost = CREDIT_COSTS[action] || 1
  const remaining = (account.credits_max as number) - (account.credits_used as number)
  if (remaining < cost) {
    return { allowed: false, error: `⚡ Not enough credits. You need ${cost} credits but only have ${remaining} remaining. Upgrade your plan.`, code: 'NO_CREDITS' }
  }

  return { allowed: true, account }
}

// Deduct credits after successful generation
async function deductCredits(db: D1Database, action: string, email: string | null, description: string): Promise<void> {
  const cost = CREDIT_COSTS[action] || 1
  const lookup = email || 'demo@socialstrategy.ai'
  const account = await db.prepare('SELECT * FROM accounts WHERE email=?').bind(lookup).first<Record<string, unknown>>()
  if (!account) return

  // Deduct credits
  await db.prepare(
    'UPDATE accounts SET credits_used=credits_used+?, updated_at=CURRENT_TIMESTAMP WHERE email=?'
  ).bind(cost, lookup).run()

  // Increment report count for analysis/reports
  if (action === 'analyze' || action === 'generate_report') {
    await db.prepare(
      'UPDATE accounts SET reports_used=reports_used+1, updated_at=CURRENT_TIMESTAMP WHERE email=?'
    ).bind(lookup).run()
  }

  // Log the transaction
  await db.prepare(
    'INSERT INTO credit_transactions (account_id, action, credits_used, description) VALUES (?,?,?,?)'
  ).bind(account.id, action, cost, description).run()
}

// ─── Account info endpoint ────────────────────────────────────────────────────
app.get('/api/account', async (c) => {
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)
  const email = c.req.query('email') || 'demo@socialstrategy.ai'
  const account = await getAccount(c.env.DB, email)
  if (!account) return c.json({ success: false, error: 'Account not found' }, 404)

  const creditsRemaining = (account.credits_max as number) - (account.credits_used as number)
  const reportsRemaining = (account.reports_max as number) === -1
    ? 999
    : Math.max(0, (account.reports_max as number) - (account.reports_used as number))

  let daysLeft: number | null = null
  if (account.expires_at) {
    const diff = new Date(account.expires_at as string).getTime() - Date.now()
    daysLeft = Math.max(0, Math.ceil(diff / 86400000))
  }

  return c.json({
    success: true,
    plan: account.plan,
    status: account.status,
    creditsUsed: account.credits_used,
    creditsMax: account.credits_max,
    creditsRemaining,
    creditsPct: Math.min(100, Math.round(((account.credits_used as number) / (account.credits_max as number)) * 100)),
    reportsUsed: account.reports_used,
    reportsMax: account.reports_max,
    reportsRemaining,
    daysLeft,
    expiresAt: account.expires_at,
  })
})

// ─── Recent credit transactions ───────────────────────────────────────────────
app.get('/api/account/transactions', async (c) => {
  if (!c.env?.DB) return c.json({ transactions: [] })
  const email = c.req.query('email') || 'demo@socialstrategy.ai'
  const account = await getAccount(c.env.DB, email)
  if (!account) return c.json({ transactions: [] })
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM credit_transactions WHERE account_id=? ORDER BY created_at DESC LIMIT 20'
  ).bind(account.id).all()
  return c.json({ transactions: results })
})

// ═══════════════════════════════════════════════════════════════════════════
// ─── AI GENERATION ENDPOINTS ────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

// ─── REAL OpenAI Website Analysis ────────────────────────────────────────────
app.post('/api/analyze', async (c) => {
  const body = await c.req.json()
  const url = body.url || ''
  const clientId = body.clientId || null
  const accountEmail = body.accountEmail || null
  const apiKey = c.env?.OPENAI_API_KEY

  if (!apiKey) return c.json({ success: false, error: 'OpenAI API key not configured. Add your key in Settings → Integrations to enable real analysis.' }, 500)

  // ── Credit gate ──────────────────────────────────────────────────────────
  if (c.env?.DB) {
    const check = await checkCredits(c.env.DB, 'analyze', accountEmail)
    if (!check.allowed) return c.json({ success: false, error: check.error, code: check.code }, 403)
  }

  const prompt = `You are a senior digital marketing consultant, business strategist, and brand analyst with 20+ years experience. You are conducting a COMPREHENSIVE, PAID-LEVEL audit of this business.

Website to analyse: ${url}

Conduct a THOROUGH, SPECIFIC analysis of this real business. Research the URL deeply and provide a detailed, actionable report. Do NOT use placeholder text or generic advice — every point must be specific to THIS business.

Return ONLY valid JSON in this exact format:
{
  "businessName": "<the actual business name extracted from the website>",
  "industry": "<specific industry/niche>",
  "seoScore": <number 0-100>,
  "brandScore": <number 0-100>,
  "usabilityScore": <number 0-100>,
  "contentScore": <number 0-100>,
  "overallScore": <number 0-100>,
  "websiteSummary": "<3-4 sentence summary: what this business does, who they serve, what makes them unique, and their apparent market position>",
  "businessStrengths": [
    "<specific strength 1 observed from their website>",
    "<specific strength 2>",
    "<specific strength 3>"
  ],
  "recommendations": [
    "<SPECIFIC SEO recommendation with exact action — e.g. 'Add schema markup for local business on homepage to improve Google rich snippets'>",
    "<SPECIFIC branding recommendation>",
    "<SPECIFIC content recommendation>",
    "<SPECIFIC conversion optimisation recommendation>",
    "<SPECIFIC social media recommendation>",
    "<SPECIFIC technical/UX recommendation>"
  ],
  "strategy": {
    "pricing": "<recommended pricing model with specific price points based on their niche and apparent market position>",
    "revenue": "<specific 12-month revenue growth projection with strategy — e.g. '40% revenue increase achievable by implementing X, Y, Z'>",
    "actions": [
      "<immediate action 1 — do this week>",
      "<immediate action 2 — do this month>",
      "<immediate action 3 — do this quarter>"
    ],
    "competitorGap": "<specific gap vs competitors that this business can exploit>"
  },
  "contentPillars": [
    "<content pillar 1 — specific to this business and industry>",
    "<content pillar 2>",
    "<content pillar 3>",
    "<content pillar 4>",
    "<content pillar 5>"
  ],
  "targetAudience": {
    "primary": "<primary target audience — age, demographics, psychographics, pain points>",
    "secondary": "<secondary audience>",
    "painPoints": ["<pain point 1>", "<pain point 2>", "<pain point 3>"]
  },
  "socialMediaStrategy": {
    "bestPlatforms": ["<platform 1>", "<platform 2>", "<platform 3>"],
    "postingFrequency": "<recommended posting frequency per platform>",
    "contentTypes": ["<content type 1>", "<content type 2>", "<content type 3>"],
    "bestHashtags": ["<hashtag1>", "<hashtag2>", "<hashtag3>", "<hashtag4>", "<hashtag5>", "<hashtag6>", "<hashtag7>", "<hashtag8>", "<hashtag9>", "<hashtag10>"]
  },
  "topOpportunity": "<the single BIGGEST growth opportunity for this specific business — be specific and bold>",
  "quickWins": [
    "<quick win 1 — something they can implement in 24 hours>",
    "<quick win 2>",
    "<quick win 3>"
  ]
}

CRITICAL RULES:
1. Be SPECIFIC to this actual URL and business — no generic advice
2. The businessName field must be the REAL name of the business from the website
3. The bestHashtags must be SPECIFIC to this business's industry and content — not generic tags
4. Revenue projections must be realistic and specific to their apparent business size
5. All recommendations must be actionable — tell them exactly WHAT to do, not just WHAT the problem is`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1200, temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    })
    if (!response.ok) return c.json({ success: false, error: 'AI analysis failed' }, 500)
    const data = await response.json() as { choices: { message: { content: string } }[] }
    const parsed = JSON.parse(data.choices[0].message.content)
    const result = { success: true, url, ...parsed }

    // ── Save to D1 if DB is available ──────────────────────────────────────
    if (c.env?.DB) {
      try {
        await c.env.DB.prepare(`
          INSERT INTO analysis_reports (client_id, url, seo_score, brand_score, usability_score, overall_score, full_result)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(
          clientId,
          url,
          parsed.seoScore || 0,
          parsed.brandScore || 0,
          parsed.usabilityScore || 0,
          parsed.overallScore || 0,
          JSON.stringify(result)
        ).run()
      } catch (_) { /* non-fatal */ }
    }

    // ── Deduct credits after success ─────────────────────────────────────────
    if (c.env?.DB) {
      try { await deductCredits(c.env.DB, 'analyze', accountEmail, `Analysis: ${url}`) } catch (_) {}
    }

    return c.json(result)
  } catch (e) {
    return c.json({ success: false, error: 'Analysis failed. Please try again.' }, 500)
  }
})

// ─── Demo content generator (no API key needed) ──────────────────────────────
function generateDemoPosts(brandName: string, industry: string, tone: string, topic: string, platforms: string[]): any[] {
  const te = tone === 'Bold' ? '🔥' : tone === 'Professional' ? '💼' : tone === 'Playful' ? '🎉' : tone === 'Inspiring' ? '✨' : '🚀'
  const brand = brandName || 'Your Brand'
  const ind = industry || 'Business'
  const tp = topic || 'our latest update'
  // Auto-generate branded hashtags from business name
  const bSlug = brand.toLowerCase().replace(/[^a-z0-9]/g, '')
  const iSlug = ind.toLowerCase().replace(/[^a-z0-9]/g, '')
  const tSlug = (tp.split(' ')[0] || 'content').toLowerCase().replace(/[^a-z0-9]/g, '')
  const brandTag = `#${bSlug}`
  const brandOfficialTag = `#${bSlug}official`
  const brandCommunityTag = `#${bSlug}community`
  const indTag = `#${iSlug}life`
  const indTipsTag = `#${iSlug}tips`
  const topicTag = `#${tSlug}tips`

  const platformData: Record<string, { type: string; tip: string; content: string; hashtags: string[] }> = {
    'Instagram': {
      type: 'Caption + Image',
      tip: 'Post between 6–9 AM or 6–9 PM for peak engagement. Use all 30 hashtags across caption and first comment.',
      content: `${te} ${brand} just changed the game when it comes to ${tp}.\n\nHere's the truth no one in ${ind} is telling you:\n\nMost businesses are leaving serious money on the table because they're not showing up the right way online. We fixed that.\n\n✅ Real results, not vanity metrics\n✅ Strategies built for YOUR business, not a template\n✅ The ${tp} approach that actually converts\n\nDrop a 🔥 in the comments if you're ready to level up.\n\nLink in bio to get started for free 👆`,
      hashtags: [brandTag, brandOfficialTag, brandCommunityTag, indTag, indTipsTag, topicTag, `#${tSlug}`, '#businessgrowth', '#socialmediatips', '#digitalmarketing', '#entrepreneur', '#smallbusiness', '#contentcreator', '#onlinebusiness', '#marketingstrategy']
    },
    'TikTok': {
      type: 'Short Reel Caption',
      tip: 'Hook viewers in the FIRST 2 SECONDS. Use trending audio. The first line of your caption is your scroll-stopper.',
      content: `POV: You just discovered how ${brand} does ${tp} differently 🤯\n\n• Most people don't know this works\n• We tried it and the results were unreal\n• Here's exactly what we did\n\nFollow for more ${ind} secrets 👇`,
      hashtags: ['#fyp', '#foryoupage', '#viral', brandTag, topicTag, indTipsTag]
    },
    'Facebook': {
      type: 'Engagement Post',
      tip: 'Ask a direct question at the end — Facebook rewards posts that generate comments. Tag a friend posts get 3x the reach.',
      content: `Something exciting is happening at ${brand} and we couldn't wait to share it with you.\n\nWe've been working hard on ${tp} and the response from our ${ind} community has been incredible. What started as a simple idea has turned into something we're genuinely proud of.\n\nHere's what we want you to know: We built this for YOU. Every decision, every feature, every update — it's all designed to make your life easier.\n\nDrop a ❤️ if you've been waiting for something like this! And tag someone who needs to see this.\n\n👇 Tell us — what's YOUR biggest challenge with ${tp} right now?`,
      hashtags: [brandTag, indTag, indTipsTag, topicTag, '#community']
    },
    'LinkedIn': {
      type: 'Professional Insight',
      tip: 'Post Tuesday–Thursday between 8–10 AM. The first 3 lines determine if people click "see more" — make them count.',
      content: `I've spent years in ${ind} and here's what I've learned about ${tp}:\n\nThe businesses that win aren't the ones with the biggest budget. They're the ones with the clearest strategy.\n\nAt ${brand}, we've seen this firsthand:\n\n→ Companies that invest in ${tp} see 40%+ higher ROI\n→ The difference between good and great is execution, not intention\n→ Most teams overcomplicate what should be simple\n\nHere's the framework that actually works:\n\n1. Define your specific outcome (not just "grow")\n2. Build systems, not one-off campaigns  \n3. Measure what matters, cut what doesn't\n4. Iterate based on data, not gut feelings\n\nWhat's your take on ${tp} in ${ind} right now? I'd love to hear your experience.`,
      hashtags: [brandTag, indTag, '#leadership', '#strategy', '#businessgrowth']
    },
    'X (Twitter)': {
      type: 'Tweet',
      tip: 'Under 280 characters. Controversial or bold opinions get 10x the retweets. Ask yourself: would someone quote-tweet this to disagree?',
      content: `Hot take: Most ${ind} businesses are doing ${tp} completely wrong.\n\n${brand} figured out the fix. The results? Speak for themselves. ${topicTag} ${brandTag}`,
      hashtags: [topicTag, brandTag]
    },
    'YouTube': {
      type: 'Video Description',
      tip: 'The first 2-3 lines show before "Show more" — pack keywords here. Include a timestamp list and end screen CTA.',
      content: `${te} ${tp.toUpperCase()} — Everything ${brand} Knows About ${ind} | Full Guide\n\nIn this video, we're breaking down everything you need to know about ${tp} in the ${ind} space. No fluff, no filler — just the strategies that actually move the needle.\n\n🎯 WHAT YOU'LL LEARN:\n00:00 — Introduction\n02:30 — Why most approaches to ${tp} fail\n07:15 — The ${brand} method\n14:00 — Real results and case studies\n18:45 — Your action plan\n\n📌 SUBSCRIBE for weekly ${ind} insights: [Subscribe Button]\n🔔 Hit the notification bell so you never miss a video!\n\n🔗 FREE resources mentioned:\n→ Get started with ${brand}: [Link]\n→ Download our guide: [Link]\n\n📧 Business enquiries: hello@${bSlug}.com`,
      hashtags: [brandTag, indTipsTag, topicTag, '#youtube', '#tutorial', '#howto', '#business']
    },
    'Threads': {
      type: 'Thread',
      tip: "Threads rewards raw, conversational posts. Don't over-polish. Write like you're texting a smart friend.",
      content: `real talk about ${tp} in ${ind}:\n\n${brand} tested 3 different approaches over 6 months. the results were so clear it was almost embarrassing.\n\nspoiler: the "professional" strategy lost every time\n\nwhat actually worked was just being real with people and showing up consistently\n\nanyone else find this in their business?`,
      hashtags: [brandTag, topicTag]
    },
    'Pinterest': {
      type: 'Pin Description',
      tip: 'Pinterest is a visual search engine. Front-load your keywords in the first 2 lines. Pins have a 2-year lifespan — optimise for long-term search.',
      content: `${tp} for ${ind} businesses: The complete guide from ${brand}.\n\nDiscover the proven strategies that help ${ind} professionals get real results with ${tp}. Whether you're just starting out or looking to scale, these actionable tips will transform your approach.\n\nSave this pin for later and share with someone in ${ind} who needs to see this! ✨\n\n→ More tips and resources at ${brand}`,
      hashtags: [brandTag, indTipsTag, topicTag, `#${tSlug}guide`, '#inspiration', '#howto']
    }
  }

  const posts = []
  for (const platform of platforms) {
    const pd = platformData[platform] || {
      type: 'Post',
      tip: 'Engage with your audience consistently and respond to every comment.',
      content: `${te} ${brand} shares: ${tp}\n\nExciting things are happening in ${ind}. Stay tuned for more updates from ${brand}!`,
      hashtags: [brandTag, indTag, topicTag]
    }
    posts.push({
      platform,
      type: pd.type,
      content: pd.content,
      hashtags: pd.hashtags,
      tip: pd.tip,
      imagePrompt: `${tone} marketing visual for ${brand}, ${ind} industry, ${tp} themed, professional photography, vibrant colors, studio quality, brand identity`
    })
  }
  return posts
}

// ─── REAL OpenAI Content Generation (text posts) ─────────────────────────────
app.post('/api/generate-content', async (c) => {
  const body = await c.req.json()
  const { brandName, industry, tone, topic, platforms, clientId = null, characterId = null, accountEmail = null, websiteUrl = '', businessDesc = '' } = body
  const apiKey = c.env?.OPENAI_API_KEY

  // ── DEMO MODE: No API key — generate rich sample posts ───────────────────
  if (!apiKey) {
    const demoPosts = generateDemoPosts(
      brandName || 'Your Brand',
      industry || 'Business',
      tone || 'Friendly',
      topic || 'our latest update',
      Array.isArray(platforms) ? platforms : ['Instagram']
    )
    return c.json({ success: true, posts: demoPosts, demo: true })
  }

  // ── Credit gate ──────────────────────────────────────────────────────────
  if (c.env?.DB) {
    const check = await checkCredits(c.env.DB, 'generate_content', accountEmail)
    if (!check.allowed) return c.json({ success: false, error: check.error, code: check.code }, 403)
  }

  const platformList = (platforms as string[]).join(', ')

  // ── Build branded hashtag bank from business name ────────────────────────
  const bSlug = (brandName || 'brand').toLowerCase().replace(/[^a-z0-9]/g, '')
  const iSlug = (industry || 'business').toLowerCase().replace(/[^a-z0-9]/g, '')
  const tSlug = ((topic || '').split(' ')[0] || 'content').toLowerCase().replace(/[^a-z0-9]/g, '')
  const autoHashtags = `#${bSlug}, #${bSlug}official, #${bSlug}community, #${iSlug}life, #${iSlug}tips, #${tSlug}tips`

  // If a character is specified, load their persona to inject into prompt
  let characterContext = ''
  if (characterId && c.env?.DB) {
    try {
      const char = await c.env.DB.prepare(
        'SELECT * FROM characters WHERE id = ?'
      ).bind(characterId).first() as Record<string, string> | null
      if (char) {
        characterContext = `\n\nIMPORTANT: Write all content as this AI Brand Character:
- Name: ${char.name}
- Role: ${char.role}
- Personality: ${char.personality}
- Voice Style: ${char.voice_style}
- Backstory: ${char.backstory}
All posts must sound authentically like this character, in their unique voice.`
      }
    } catch (_) { /* non-fatal */ }
  }

  const prompt = `You are a world-class social media strategist, copywriter, and brand expert. Your job is to create EXCEPTIONAL, platform-native social media posts that feel 100% authentic to the brand and drive real engagement, followers, and sales.

BRAND BRIEF:
- Brand Name: ${brandName}
- Industry / Niche: ${industry || 'Business'}
- Website: ${websiteUrl || 'Not provided'}
- Business Description: ${businessDesc || 'Not provided'}
- Tone of Voice: ${tone}
- Content Topic / Theme: ${topic}
- Target Platforms: ${platformList}
${characterContext}

BRANDED HASHTAG BANK (MANDATORY — use these in every post):
${autoHashtags}
These are the brand's owned hashtags. Include them in EVERY post alongside niche tags.

YOUR MISSION:
Create ONE highly tailored, ready-to-publish post for EACH platform listed. Every single post must:

1. OPEN with the brand name "${brandName}" woven naturally into a powerful hook — make it feel like the brand is speaking directly to the audience, not a generic post
2. Be 100% native to that platform's format, culture, algorithm, and audience behaviour
3. Open with a scroll-stopping HOOK — the first line must make someone stop and read on
4. Build a STORY, VALUE or EMOTION in the body — educate, entertain, inspire, or create FOMO
5. End with ONE crystal-clear, specific CALL TO ACTION relevant to the topic and brand
6. Include HASHTAGS that are laser-targeted to "${topic}" and "${industry || 'this business'}" — a strategic mix of:
   • The branded tags above (ALWAYS include)
   • 3-5 HIGH VOLUME broad tags (100k+ posts)
   • 5-10 MEDIUM NICHE tags specific to the industry and topic (10k-100k posts)
   • 3-5 MICRO NICHE tags (under 10k posts) for discoverability
   NEVER use generic tags like #socialmedia #marketing #business — make them SPECIFIC to this topic and industry
7. Match the exact tone specified: ${tone}
8. Extract any key data points, achievements, or unique selling points from the business description and weave them into the content naturally

PLATFORM-SPECIFIC RULES — follow these EXACTLY:
• Instagram: 150-300 words. Strong hook first line. 3-4 punchy paragraphs. Line breaks between each. 20-25 strategic hashtags in a block at the end. Minimum 5 emojis, maximum 10. End with a question or CTA in the last line.
• TikTok: 80-120 words MAX. Ultra-punchy hook (1 bold line). 3 short punchy bullet points. 1 strong CTA. 5-7 trending niche hashtags ONLY. Must feel raw, authentic and "for you page" worthy.
• Facebook: 120-200 words. Conversational story format — feels like a trusted friend sharing important news. 2-3 short paragraphs. 3-5 hashtags. 2-4 emojis. End with a direct question to drive comments.
• LinkedIn: 150-250 words. Open with a bold professional statement or surprising statistic. Share a genuine expert insight related to "${topic}". Use numbered points or short paragraphs. End with a thought-provoking question. 3-5 professional hashtags. MAX 3 emojis — keep it credible.
• X (Twitter): STRICTLY under 280 characters including hashtags. Punchy, opinionated, quotable. 2 hashtags MAX. Use a strong opinion or bold fact format.
• YouTube: Full SEO-optimised video description 150-250 words. Include: keyword-rich first sentence, what the video covers (3-4 bullet points), timestamps placeholder, subscribe CTA, links placeholder. 10-15 SEO hashtags at bottom.
• Threads: 80-150 words. Raw, conversational, opinion-led. Feels like a hot take or genuine personal thought. 1-2 hashtags ONLY. No corporate speak. Be real and authentic.
• Pinterest: 100-150 words. Keyword-rich, actionable, benefit-focused description. Uses "how to", "best", "top" language naturally. Evergreen content style. 5-8 descriptive hashtags. Include a clear CTA.

HASHTAG EXTRACTION RULE: Analyse "${topic}" and "${industry || 'the business'}" deeply. Generate hashtags that someone searching for this exact topic would use. Think: What problem does this solve? What transformation does it offer? What community would engage with this? Always include branded tags: ${autoHashtags}

IMPORTANT: Make the content feel REAL, SPECIFIC, and AUTHENTIC to ${brandName}. Every word must serve a purpose. Avoid filler phrases like "In today's fast-paced world", "Are you ready to", "Game changer". Be direct, bold and genuine.

Return ONLY valid JSON — no commentary before or after:
{
  "posts": [
    {
      "platform": "<exact platform name>",
      "type": "<e.g. Caption + Image Reel, Carousel Caption, Professional Post, Tweet, Video Description>",
      "content": "<the COMPLETE post text, 100% ready to copy and publish — include all emojis, line breaks formatted with \\n, and hashtags>",
      "hashtags": ["<tag1>", "<tag2>", "<tag3>", "<tag4>", "<tag5>"],
      "tip": "<one specific, actionable power tip for maximising reach on THIS platform for THIS type of post — be specific, not generic>",
      "imagePrompt": "<highly detailed DALL-E 3 prompt — specify: art style, main subject, background, lighting, colour palette, mood, composition. Make it specific to ${brandName} and ${topic} and ${industry || 'this brand'}>"
    }
  ]
}

CRITICAL QUALITY CHECK before returning: Re-read every post. If any post sounds generic, replace it. If any hashtag is too broad or generic, replace it. Every post must sound like it was written by a human expert who knows this brand deeply.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4000, temperature: 0.82,
        response_format: { type: 'json_object' }
      })
    })
    if (!response.ok) return c.json({ success: false, error: 'Content generation failed' }, 500)
    const data = await response.json() as { choices: { message: { content: string } }[] }
    const parsed = JSON.parse(data.choices[0].message.content)

    // ── Save every generated post to D1 ────────────────────────────────────
    if (c.env?.DB && parsed.posts) {
      try {
        const stmt = c.env.DB.prepare(`
          INSERT INTO generated_content (client_id, character_id, content_type, platform, title, content, brand_name, industry, topic, tone)
          VALUES (?, ?, 'post', ?, ?, ?, ?, ?, ?, ?)
        `)
        await Promise.all((parsed.posts as { platform: string; content: string }[]).map((post) =>
          stmt.bind(
            clientId, characterId,
            post.platform,
            `${brandName} – ${post.platform} post`,
            JSON.stringify(post),
            brandName, industry, topic, tone
          ).run()
        ))
      } catch (_) { /* non-fatal */ }
    }

    // ── Deduct credits after success ─────────────────────────────────────────
    if (c.env?.DB) {
      try { await deductCredits(c.env.DB, 'generate_content', accountEmail, `Content: ${brandName} – ${topic}`) } catch (_) {}
    }

    return c.json({ success: true, ...parsed })
  } catch (e) {
    return c.json({ success: false, error: 'Generation failed. Please try again.' }, 500)
  }
})

// ─── REAL DALL-E 3 Image Generation ──────────────────────────────────────────
app.post('/api/generate-image', async (c) => {
  const body = await c.req.json()
  const { prompt, style = 'vivid', size = '1024x1024', clientId = null, characterId = null, saveToLibrary = true, accountEmail = null } = body
  const apiKey = c.env?.OPENAI_API_KEY

  if (!apiKey) {
    // Demo mode: return a placeholder image
    const colors = ['FF2D78', '00E5FF', 'A78BFA', 'FFD600', '00ff88']
    const color = colors[Math.floor(Math.random() * colors.length)]
    const demoUrl = `https://placehold.co/1024x1024/${color}/030818?text=${encodeURIComponent((prompt || 'AI Image').slice(0, 20))}&font=playfair-display`
    return c.json({ success: true, url: demoUrl, revisedPrompt: prompt, demo: true })
  }
  if (!prompt) return c.json({ success: false, error: 'Image prompt is required' }, 400)

  // ── Credit gate ──────────────────────────────────────────────────────────
  if (c.env?.DB) {
    const check = await checkCredits(c.env.DB, 'generate_image', accountEmail)
    if (!check.allowed) return c.json({ success: false, error: check.error, code: check.code }, 403)
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: size,
        style: style,
        quality: 'standard'
      })
    })

    if (!response.ok) {
      const err = await response.json() as { error?: { message?: string } }
      return c.json({ success: false, error: err?.error?.message || 'Image generation failed' }, 500)
    }

    const data = await response.json() as { data: { url: string; revised_prompt: string }[] }
    const imageUrl = data.data[0].url
    const revisedPrompt = data.data[0].revised_prompt

    // ── Save image record to D1 ─────────────────────────────────────────────
    if (c.env?.DB && saveToLibrary) {
      try {
        await c.env.DB.prepare(`
          INSERT INTO generated_content (client_id, character_id, content_type, platform, title, content, image_url, topic)
          VALUES (?, ?, 'image', 'all', ?, ?, ?, ?)
        `).bind(
          clientId, characterId,
          'AI Generated Image',
          JSON.stringify({ prompt, revisedPrompt, style, size }),
          imageUrl,
          prompt.substring(0, 100)
        ).run()
      } catch (_) { /* non-fatal */ }
    }

    // ── Deduct credits after success ─────────────────────────────────────────
    if (c.env?.DB) {
      try { await deductCredits(c.env.DB, 'generate_image', accountEmail, `Image: ${prompt.substring(0, 60)}`) } catch (_) {}
    }

    return c.json({ success: true, url: imageUrl, revisedPrompt })
  } catch (e) {
    return c.json({ success: false, error: 'Image generation failed. Please try again.' }, 500)
  }
})

// ─── REAL OpenAI Video Script Generation ─────────────────────────────────────
app.post('/api/generate-video-script', async (c) => {
  const body = await c.req.json()
  const { brandName, industry, tone, topic, platform = 'TikTok', duration = '30', clientId = null, characterId = null, accountEmail = null } = body
  const apiKey = c.env?.OPENAI_API_KEY

  if (!apiKey) {
    // Demo video script
    return c.json({
      success: true, platform, demo: true,
      title: `${brandName}: ${topic} – Your Complete Guide`,
      hook: `Stop scrolling! This ${topic} tip will change everything for your ${industry || 'business'} 🔥`,
      script: `[HOOK - 0-3s]\n"Stop! This is the ${topic} secret that ${industry || 'businesses'} don't want you to know."\n\n[SETUP - 3-8s]\n"Hi, I'm from ${brandName}, and today we're diving deep into ${topic}."\n[SHOW: Energetic presenter, bold text overlay]\n\n[MAIN CONTENT - 8-22s]\n"Here's what you need to know:\nFirst – [Key point 1 about ${topic}]\nSecond – [Proven strategy]\nThird – [The secret weapon]\n[CUT TO: Product/service demonstration]"\n\n[CTA - 22-${duration}s]\n"Ready to transform your results? Link in bio. Follow for more tips!"\n[SHOW: Call-to-action screen with ${brandName} branding]`,
      hashtags: [`#${(brandName||'brand').replace(/\s/g,'')}`, `#${(topic.split(' ')[0]||'tips').toLowerCase()}`, `#fyp`, `#viral`, `#${(industry||'business').replace(/\s/g,'').toLowerCase()}`, '#socialmedia'],
    })
  }

  // ── Credit gate ──────────────────────────────────────────────────────────
  if (c.env?.DB) {
    const check = await checkCredits(c.env.DB, 'video_script', accountEmail)
    if (!check.allowed) return c.json({ success: false, error: check.error, code: check.code }, 403)
  }

  // Load character persona if provided
  let characterContext = ''
  if (characterId && c.env?.DB) {
    try {
      const char = await c.env.DB.prepare(
        'SELECT * FROM characters WHERE id = ?'
      ).bind(characterId).first() as Record<string, string> | null
      if (char) {
        characterContext = `\n\nSPEAKER / HOST CHARACTER:
- Name: ${char.name}  
- Role: ${char.role}
- Personality: ${char.personality}
- Voice Style: ${char.voice_style}
- Appearance: ${char.appearance}
Write the script so ${char.name} is the on-screen presenter. Include stage directions for their expressions and movements.`
      }
    } catch (_) { /* non-fatal */ }
  }

  const prompt = `You are a professional video scriptwriter specializing in viral ${platform} content.
Write a complete video script for:
- Brand: ${brandName}
- Industry: ${industry}
- Tone: ${tone}
- Topic: ${topic}
- Platform: ${platform}
- Target duration: ${duration} seconds
${characterContext}

Return ONLY valid JSON:
{
  "title": "<catchy video title>",
  "hook": "<first 3-second hook line that grabs attention immediately>",
  "script": "<full spoken script with [PAUSE], [CUT TO:], [SHOW: visual description], [CHARACTER: expression/action] stage directions>",
  "scenes": [
    {"time": "0-3s", "action": "<what happens on screen>", "dialogue": "<spoken words>"},
    {"time": "3-8s", "action": "<what happens>", "dialogue": "<spoken words>"},
    {"time": "8-20s", "action": "<what happens>", "dialogue": "<spoken words>"},
    {"time": "20-${duration}s", "action": "<closing>", "dialogue": "<CTA words>"}
  ],
  "captions": ["<on-screen text 1>","<on-screen text 2>","<on-screen text 3>","<on-screen text 4>"],
  "hashtags": ["#tag1","#tag2","#tag3","#tag4","#tag5","#tag6"],
  "thumbnailPrompt": "<detailed DALL-E 3 prompt for the video thumbnail – include style, lighting, composition>",
  "bRollSuggestions": ["<b-roll clip 1>","<b-roll clip 2>","<b-roll clip 3>"],
  "musicMood": "<suggested background music style/mood>",
  "callToAction": "<specific CTA for end of video>",
  "estimatedDuration": "<estimated seconds>"
}`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000, temperature: 0.8,
        response_format: { type: 'json_object' }
      })
    })
    if (!response.ok) return c.json({ success: false, error: 'Script generation failed' }, 500)
    const data = await response.json() as { choices: { message: { content: string } }[] }
    const parsed = JSON.parse(data.choices[0].message.content)

    // ── Save video script to D1 ─────────────────────────────────────────────
    if (c.env?.DB) {
      try {
        await c.env.DB.prepare(`
          INSERT INTO generated_content (client_id, character_id, content_type, platform, title, content, brand_name, industry, topic, tone)
          VALUES (?, ?, 'video_script', ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          clientId, characterId,
          platform,
          parsed.title || `${brandName} – ${platform} Video`,
          JSON.stringify(parsed),
          brandName, industry, topic, tone
        ).run()
      } catch (_) { /* non-fatal */ }
    }

    // ── Deduct credits after success ─────────────────────────────────────────
    if (c.env?.DB) {
      try { await deductCredits(c.env.DB, 'video_script', accountEmail, `Video Script: ${brandName} – ${platform}`) } catch (_) {}
    }

    return c.json({ success: true, platform, ...parsed })
  } catch (e) {
    return c.json({ success: false, error: 'Script generation failed. Please try again.' }, 500)
  }
})

// ─── Full Analytics Report (HTML download) ───────────────────────────────────
app.post('/api/generate-report', async (c) => {
  const body = await c.req.json()
  const {
    period = '30D',
    brandName = 'Your Brand',
    industry = 'Business',
    websiteUrl = '',
    businessDesc = '',
    clientId = null,
    accountEmail = null,
    // Real stats injected from the client when available
    realStats = null,
    reportMonth = '',
    location = '',
  } = body
  const apiKey = c.env?.OPENAI_API_KEY

  if (!apiKey) return c.json({ success: false, error: 'OpenAI API key not configured' }, 500)

  // ── Credit gate ──────────────────────────────────────────────────────────
  if (c.env?.DB) {
    const check = await checkCredits(c.env.DB, 'generate_report', accountEmail)
    if (!check.allowed) return c.json({ success: false, error: check.error, code: check.code }, 403)
  }

  // ── Auto-generate branded hashtags from business name + industry ─────────
  const brandSlug = brandName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const industrySlug = industry.toLowerCase().replace(/[^a-z0-9]/g, '')
  const brandedHashtags = [
    `#${brandSlug}`,
    `#${brandSlug}official`,
    `#${brandSlug}community`,
    `#${industrySlug}tips`,
    `#${industrySlug}life`,
  ]

  // Build stats based on real data (if provided) or generate realistic estimates
  const periodDays = period === '7D' ? 7 : period === '90D' ? 90 : period === '12M' ? 365 : 30
  const multiplier = periodDays / 30

  const statsPayload = realStats
    ? {
        // Use real stats provided by client — override everything
        brand: brandName,
        industry: industry,
        website: websiteUrl || 'Not provided',
        businessContext: businessDesc || 'Not provided',
        location: location || 'Not specified',
        reportMonth: reportMonth || period,
        period,
        periodDays,
        dataSource: 'real_client_data',
        ...realStats,
        hashtagPerformance: realStats.hashtagPerformance || {
          topHashtags: brandedHashtags,
          brandedTags: brandedHashtags,
          avgReachPerHashtag: realStats.totalReach ? Math.round(realStats.totalReach / 20) : 4200,
          bestHashtagCategory: `Branded + niche ${industry} tags`
        }
      }
    : {
        // Demo / estimated stats
        brand: brandName,
        industry: industry,
        website: websiteUrl || 'Not provided',
        businessContext: businessDesc || 'Not provided',
        location: location || 'Australia',
        reportMonth: reportMonth || period,
        period,
        periodDays,
        dataSource: 'estimated_benchmark_data',
        totalImpressions: Math.round(245320 * multiplier), impressionsChange: '+18.4%',
        totalReach: Math.round(89420 * multiplier), reachChange: '+12.3%',
        engagements: Math.round(15847 * multiplier), engagementsChange: '+23.1%',
        linkClicks: Math.round(3204 * multiplier), clicksChange: '-2.1%',
        newFollowers: Math.round(1240 * multiplier), followerGrowth: '+9.2%',
        storySaves: Math.round(4320 * multiplier),
        profileVisits: Math.round(18600 * multiplier),
        averageEngagementRate: '5.8%',
        bestPostTime: 'Tuesday–Thursday, 7–9 AM and 6–8 PM',
        topContentType: 'Short-form video / Reels',
        platforms: [
          { name: 'Instagram', followers: 12400, newFollowers: 380, reach: Math.round(35200*multiplier), eng: '5.2%', posts: Math.round(45*multiplier), topPost: 'Behind-the-scenes reel', growth: '+8%', saves: 892, profileVisits: 4200 },
          { name: 'TikTok', followers: 34500, newFollowers: 1820, reach: Math.round(28400*multiplier), eng: '6.8%', posts: Math.round(32*multiplier), topPost: 'Tutorial video', growth: '+22%', saves: 1240, profileVisits: 6800 },
          { name: 'Facebook', followers: 8200, newFollowers: 120, reach: Math.round(12100*multiplier), eng: '2.1%', posts: Math.round(28*multiplier), topPost: 'Customer success story', growth: '+3%', saves: 210, profileVisits: 1800 },
          { name: 'YouTube', followers: 5600, newFollowers: 340, reach: Math.round(8900*multiplier), eng: '3.4%', posts: Math.round(12*multiplier), topPost: 'How-to guide', growth: '+15%', saves: 680, profileVisits: 2400 },
          { name: 'X (Twitter)', followers: 9800, newFollowers: 210, reach: Math.round(14200*multiplier), eng: '1.8%', posts: Math.round(67*multiplier), topPost: 'Industry opinion thread', growth: '+5%', saves: 90, profileVisits: 1200 },
          { name: 'LinkedIn', followers: 4200, newFollowers: 290, reach: Math.round(6800*multiplier), eng: '4.1%', posts: Math.round(18*multiplier), topPost: 'Expert insight article', growth: '+11%', saves: 420, profileVisits: 3100 },
        ],
        contentBreakdown: {
          reels: '42%', carousels: '28%', staticImages: '18%', stories: '8%', longFormVideo: '4%'
        },
        audienceDemographics: {
          ageGroups: { '18-24': '22%', '25-34': '38%', '35-44': '24%', '45-54': '11%', '55+': '5%' },
          topLocations: ['Australia', 'United States', 'United Kingdom', 'Canada', 'New Zealand'],
          genderSplit: { female: '54%', male: '44%', other: '2%' }
        },
        hashtagPerformance: {
          topHashtags: brandedHashtags,
          brandedTags: brandedHashtags,
          avgReachPerHashtag: 4200,
          bestHashtagCategory: `Branded ${brandName} + niche ${industry} tags`
        }
      }

  const aiPrompt = `You are a world-class social media analytics expert and business growth strategist. You are generating a COMPREHENSIVE, PAID-LEVEL analytics report for ${brandName}.

BUSINESS CONTEXT:
- Brand: ${brandName}
- Industry: ${industry}
- Website: ${websiteUrl || 'Not provided'}
- Business Description: ${businessDesc || 'Not provided'}
- Location: ${location || 'Australia'}
- Report Period: ${reportMonth || period} (${periodDays} days)
- Data Source: ${realStats ? 'REAL CLIENT DATA — use these exact figures' : 'Benchmark estimates — use for analysis only'}

BRANDED HASHTAG BANK FOR ${brandName.toUpperCase()}:
Branded tags to reference in recommendations: ${brandedHashtags.join(', ')}
The brand should own these hashtags across all platforms.

PERFORMANCE DATA:
${JSON.stringify(statsPayload, null, 2)}

Generate a THOROUGH, INSIGHTFUL analytics report. Every insight must be SPECIFIC to ${brandName} in the ${industry} industry.
${realStats ? `IMPORTANT: This is REAL DATA for ${brandName}. Reference their actual numbers throughout. Do NOT use generic benchmarks.` : `NOTE: These are benchmark estimates. Provide analysis as if they were real but note they can connect real accounts for precise data.`}
Do NOT use generic filler. Be direct, data-driven, and business-focused.
Always refer to the business as "${brandName}" throughout — never use placeholder names.

Return ONLY valid JSON:
{
  "executiveSummary": "<Write 3 detailed paragraphs: (1) Overall performance narrative specific to ${brandName} — cite actual numbers from the data; (2) Platform-by-platform highlights — what's working and what's not; (3) Forward-looking strategic outlook for this brand in ${industry}>",
  "keyWin": "<The single most impressive achievement this period with specific data — e.g. 'TikTok grew 22% gaining 1,820 new followers driven by tutorial content'>",
  "biggestChallenge": "<The most urgent problem to fix — be specific, e.g. 'Link clicks dropped 2.1% suggesting a disconnect between content and conversion — CTA strategy needs an overhaul'>",
  "contentInsights": {
    "bestPerformingType": "<which content type drove the most results and why>",
    "bestPostingTime": "<optimal days and times based on the data>",
    "audienceInsight": "<key demographic insight specific to this brand's audience>",
    "hashtagStrategy": "<specific hashtag recommendation for ${brandName} in ${industry} — include branded tags like ${brandedHashtags[0]} and ${brandedHashtags[1]}, plus 5 industry-specific niche tags>"
  },
  "platformPriority": [
    {"platform": "<name>", "priority": "Primary|Secondary|Maintain|Grow", "reason": "<why this priority — specific to the data>", "nextAction": "<1 specific action for this platform>"},
    {"platform": "<name>", "priority": "Primary|Secondary|Maintain|Grow", "reason": "<why>", "nextAction": "<1 specific action>"},
    {"platform": "<name>", "priority": "Primary|Secondary|Maintain|Grow", "reason": "<why>", "nextAction": "<1 specific action>"}
  ],
  "hashtagBank": {
    "branded": ["${brandedHashtags[0]}", "${brandedHashtags[1]}", "${brandedHashtags[2]}"],
    "industryHigh": ["<5 high-volume industry tags 100k+ posts for ${industry}>"],
    "industryNiche": ["<5 medium-niche tags 10k-100k for ${industry}>"],
    "micro": ["<3 micro-niche tags under 10k for ${industry} and ${brandName}>"]
  },
  "recommendations": [
    {"title":"<specific rec title>","detail":"<DETAILED, actionable recommendation with exact steps — minimum 2 sentences. Must be specific to ${brandName} and ${industry}>","impact":"High|Medium|Low","timeframe":"This Week|This Month|This Quarter"},
    {"title":"<specific rec title>","detail":"<detailed specific action>","impact":"High|Medium|Low","timeframe":"This Week|This Month|This Quarter"},
    {"title":"<specific rec title>","detail":"<detailed specific action>","impact":"High|Medium|Low","timeframe":"This Week|This Month|This Quarter"},
    {"title":"<specific rec title>","detail":"<detailed specific action>","impact":"High|Medium|Low","timeframe":"This Week|This Month|This Quarter"},
    {"title":"<specific rec title>","detail":"<detailed specific action>","impact":"High|Medium|Low","timeframe":"This Week|This Month|This Quarter"},
    {"title":"<specific rec title>","detail":"<detailed specific action>","impact":"High|Medium|Low","timeframe":"This Week|This Month|This Quarter"},
    {"title":"<specific rec title>","detail":"<detailed specific action>","impact":"High|Medium|Low","timeframe":"This Week|This Month|This Quarter"}
  ],
  "nextPeriodGoals": [
    "<Specific measurable goal 1 for next period — cite a target number>",
    "<Specific measurable goal 2>",
    "<Specific measurable goal 3>",
    "<Specific measurable goal 4>"
  ],
  "competitorBenchmark": "<How ${brandName} compares to typical ${industry} businesses on social media — specific benchmarks and what to aim for>"
}`

  try {
    const aiResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: aiPrompt }],
        max_tokens: 2800, temperature: 0.35,
        response_format: { type: 'json_object' }
      })
    })
    if (!aiResp.ok) return c.json({ success: false, error: 'Report generation failed' }, 500)
    const aiData = await aiResp.json() as { choices: { message: { content: string } }[] }
    const insights = JSON.parse(aiData.choices[0].message.content)

    // ── Save report snapshot to D1 ──────────────────────────────────────────
    if (c.env?.DB) {
      try {
        await c.env.DB.prepare(`
          INSERT INTO generated_content (client_id, content_type, platform, title, content, brand_name, topic)
          VALUES (?, 'report', 'all', ?, ?, ?, ?)
        `).bind(
          clientId,
          `${brandName} – Analytics Report ${period}`,
          JSON.stringify({ stats: statsPayload, insights }),
          brandName,
          `Analytics Report ${period}`
        ).run()
      } catch (_) { /* non-fatal */ }
    }

    const now = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const impactColor: Record<string, string> = { High: '#4ade80', Medium: '#fbbf24', Low: '#60a5fa' }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${brandName} – Analytics Report ${period}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif}
  body{background:#030818;color:#fff;padding:40px 32px;max-width:900px;margin:0 auto;}
  .header{display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;padding-bottom:20px;border-bottom:2px solid rgba(0,229,255,0.3);}
  .logo{font-size:22px;font-weight:900;letter-spacing:1px;}
  .logo span{background:linear-gradient(135deg,#00E5FF,#FF2D78);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .meta{text-align:right;font-size:13px;color:#9ca3af;}
  h1{font-size:28px;font-weight:900;margin-bottom:6px;}
  h2{font-size:18px;font-weight:800;color:#00E5FF;margin:28px 0 14px;display:flex;align-items:center;gap:8px;}
  h2::before{content:'';display:inline-block;width:4px;height:18px;background:linear-gradient(135deg,#00E5FF,#7C3AED);border-radius:2px;}
  .kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px;}
  .kpi{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:16px;}
  .kpi-val{font-size:26px;font-weight:900;color:#fff;}
  .kpi-label{font-size:12px;color:#9ca3af;margin-top:4px;}
  .kpi-change{font-size:12px;font-weight:700;margin-top:6px;}
  .up{color:#4ade80;} .down{color:#f87171;}
  table{width:100%;border-collapse:collapse;font-size:13px;}
  th{text-align:left;padding:10px 14px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.8px;border-bottom:1px solid rgba(255,255,255,0.08);}
  td{padding:12px 14px;border-bottom:1px solid rgba(255,255,255,0.04);color:#d1d5db;}
  tr:hover td{background:rgba(255,255,255,0.03);}
  .section{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:22px;margin-bottom:20px;}
  .summary-text{font-size:14px;color:#d1d5db;line-height:1.8;white-space:pre-line;}
  .highlight{background:rgba(0,229,255,0.07);border:1px solid rgba(0,229,255,0.2);border-radius:12px;padding:14px;margin-bottom:12px;}
  .highlight-label{font-size:11px;font-weight:700;color:#00E5FF;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;}
  .rec{display:flex;gap:14px;padding:14px;background:rgba(255,255,255,0.03);border-radius:12px;margin-bottom:10px;align-items:flex-start;}
  .rec-num{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#00E5FF,#0070F3);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:#001a22;flex-shrink:0;}
  .rec-title{font-size:14px;font-weight:700;color:#fff;margin-bottom:4px;}
  .rec-detail{font-size:13px;color:#9ca3af;line-height:1.5;}
  .impact{display:inline-block;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;margin-top:6px;}
  .footer{margin-top:40px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;font-size:12px;color:#6b7280;}
  @media print{body{background:#fff;color:#000;} .kpi,.section,.rec{border-color:#e5e7eb;} .kpi-val,.rec-title,h1{color:#111;} .kpi-label,.rec-detail,.summary-text{color:#555;} h2{color:#0070F3;} }
</style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">SOCIAL <span>STRATEGY</span></div>
      <div style="font-size:12px;color:#6b7280;margin-top:4px;">AI-Powered Marketing Platform</div>
    </div>
    <div class="meta">
      <div style="font-size:16px;font-weight:700;color:#fff;">${brandName}</div>
      <div>Analytics Report · ${period}</div>
      <div>Generated ${now}</div>
    </div>
  </div>

  <h1>Performance Report</h1>
  <p style="color:#9ca3af;font-size:14px;margin-bottom:28px;">Comprehensive overview of your social media performance across all platforms.</p>

  <h2>Key Metrics</h2>
  <div class="kpi-grid">
    <div class="kpi"><div class="kpi-val">${statsPayload.totalImpressions.toLocaleString()}</div><div class="kpi-label">Total Impressions</div><div class="kpi-change up">${statsPayload.impressionsChange}</div></div>
    <div class="kpi"><div class="kpi-val">${statsPayload.totalReach.toLocaleString()}</div><div class="kpi-label">Total Reach</div><div class="kpi-change up">${statsPayload.reachChange}</div></div>
    <div class="kpi"><div class="kpi-val">${statsPayload.engagements.toLocaleString()}</div><div class="kpi-label">Engagements</div><div class="kpi-change up">${statsPayload.engagementsChange}</div></div>
    <div class="kpi"><div class="kpi-val">${statsPayload.linkClicks.toLocaleString()}</div><div class="kpi-label">Link Clicks</div><div class="kpi-change down">${statsPayload.clicksChange}</div></div>
  </div>

  <h2>Platform Breakdown</h2>
  <div class="section">
    <table>
      <thead><tr>${['Platform','Followers','Reach','Eng. Rate','Posts','Growth'].map(h => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>
        ${statsPayload.platforms.map(p => `<tr>
          <td style="font-weight:700;color:#fff;">${p.name}</td>
          <td>${p.followers.toLocaleString()}</td>
          <td>${p.reach.toLocaleString()}</td>
          <td style="color:#00E5FF;font-weight:700;">${p.eng}</td>
          <td>${p.posts}</td>
          <td style="color:#4ade80;font-weight:700;">${p.growth}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <h2>AI Executive Summary</h2>
  <div class="section">
    <div class="highlight"><div class="highlight-label">🏆 Key Win</div><div style="font-size:14px;color:#fff;">${insights.keyWin}</div></div>
    <div class="highlight" style="background:rgba(248,113,113,0.07);border-color:rgba(248,113,113,0.2);"><div class="highlight-label" style="color:#f87171;">⚠️ Biggest Challenge</div><div style="font-size:14px;color:#fff;">${insights.biggestChallenge}</div></div>
    <div class="summary-text">${insights.executiveSummary}</div>
  </div>

  <h2>AI Recommendations</h2>
  ${(insights.recommendations || []).map((r: {title:string;detail:string;impact:string}, i: number) => `
  <div class="rec">
    <div class="rec-num">${i + 1}</div>
    <div>
      <div class="rec-title">${r.title}</div>
      <div class="rec-detail">${r.detail}</div>
      <span class="impact" style="background:${impactColor[r.impact] || '#6b7280'}22;color:${impactColor[r.impact] || '#6b7280'};border:1px solid ${impactColor[r.impact] || '#6b7280'}44;">${r.impact} Impact</span>
    </div>
  </div>`).join('')}

  <div class="footer">
    <span>© ${new Date().getFullYear()} Social Strategy · AI-Powered Analytics</span>
    <span>Confidential · ${brandName}</span>
  </div>
</body>
</html>`

    // ── Deduct credits BEFORE returning response ─────────────────────────────
    if (c.env?.DB) {
      try { await deductCredits(c.env.DB, 'generate_report', accountEmail, `Report: ${brandName} – ${period}`) } catch (_) {}
    }

    return c.html(html)
  } catch (e) {
    return c.json({ success: false, error: 'Report generation failed. Please try again.' }, 500)
  }
})

// ═══════════════════════════════════════════════════════════════════════════
// ─── D1-BACKED DATA STORAGE ENDPOINTS ───────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

// ─── CLIENTS ─────────────────────────────────────────────────────────────────
app.get('/api/clients', async (c) => {
  if (!c.env?.DB) return c.json({ clients: [] })
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM clients ORDER BY created_at DESC'
  ).all()
  return c.json({ clients: results })
})

app.post('/api/clients', async (c) => {
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)
  const { name, industry = '', website = '', tone = 'Professional' } = await c.req.json()
  if (!name) return c.json({ success: false, error: 'Client name is required' }, 400)
  const result = await c.env.DB.prepare(
    'INSERT INTO clients (name, industry, website, tone) VALUES (?, ?, ?, ?)'
  ).bind(name, industry, website, tone).run()
  return c.json({ success: true, id: result.meta.last_row_id })
})

app.put('/api/clients/:id', async (c) => {
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)
  const id = c.req.param('id')
  const { name, industry, website, tone } = await c.req.json()
  await c.env.DB.prepare(
    'UPDATE clients SET name=?, industry=?, website=?, tone=?, updated_at=CURRENT_TIMESTAMP WHERE id=?'
  ).bind(name, industry, website, tone, id).run()
  return c.json({ success: true })
})

app.delete('/api/clients/:id', async (c) => {
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)
  await c.env.DB.prepare('DELETE FROM clients WHERE id=?').bind(c.req.param('id')).run()
  return c.json({ success: true })
})

// ─── CHARACTERS / AI EMPLOYEES ───────────────────────────────────────────────
app.get('/api/characters', async (c) => {
  if (!c.env?.DB) return c.json({ characters: [] })
  const clientId = c.req.query('clientId')
  const query = clientId
    ? 'SELECT * FROM characters WHERE client_id=? ORDER BY created_at DESC'
    : 'SELECT * FROM characters ORDER BY created_at DESC'
  const { results } = clientId
    ? await c.env.DB.prepare(query).bind(clientId).all()
    : await c.env.DB.prepare(query).all()
  return c.json({ characters: results })
})

app.get('/api/characters/:id', async (c) => {
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)
  const char = await c.env.DB.prepare(
    'SELECT * FROM characters WHERE id=?'
  ).bind(c.req.param('id')).first()
  if (!char) return c.json({ success: false, error: 'Character not found' }, 404)
  return c.json({ success: true, character: char })
})

app.post('/api/characters', async (c) => {
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)
  const body = await c.req.json()
  const {
    clientId = null, name, role = 'Brand Ambassador',
    personality = '', voiceStyle = '', appearance = '',
    backstory = '', avatarUrl = '',
    platforms = '[]', contentPillars = '[]'
  } = body
  if (!name) return c.json({ success: false, error: 'Character name is required' }, 400)

  const result = await c.env.DB.prepare(`
    INSERT INTO characters (client_id, name, role, personality, voice_style, appearance, backstory, avatar_url, platforms, content_pillars)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    clientId, name, role, personality, voiceStyle,
    appearance, backstory, avatarUrl,
    typeof platforms === 'string' ? platforms : JSON.stringify(platforms),
    typeof contentPillars === 'string' ? contentPillars : JSON.stringify(contentPillars)
  ).run()
  return c.json({ success: true, id: result.meta.last_row_id })
})

app.put('/api/characters/:id', async (c) => {
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)
  const id = c.req.param('id')
  const body = await c.req.json()
  const {
    name, role, personality, voiceStyle, appearance,
    backstory, avatarUrl, platforms, contentPillars
  } = body
  await c.env.DB.prepare(`
    UPDATE characters SET name=?, role=?, personality=?, voice_style=?, appearance=?,
    backstory=?, avatar_url=?, platforms=?, content_pillars=?, updated_at=CURRENT_TIMESTAMP
    WHERE id=?
  `).bind(
    name, role, personality, voiceStyle, appearance, backstory, avatarUrl,
    typeof platforms === 'string' ? platforms : JSON.stringify(platforms),
    typeof contentPillars === 'string' ? contentPillars : JSON.stringify(contentPillars),
    id
  ).run()
  return c.json({ success: true })
})

app.delete('/api/characters/:id', async (c) => {
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)
  await c.env.DB.prepare('DELETE FROM characters WHERE id=?').bind(c.req.param('id')).run()
  return c.json({ success: true })
})

// Generate avatar for a character using DALL-E 3
app.post('/api/characters/:id/generate-avatar', async (c) => {
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)
  const apiKey = c.env?.OPENAI_API_KEY
  if (!apiKey) return c.json({ success: false, error: 'OpenAI API key not configured' }, 500)

  const char = await c.env.DB.prepare(
    'SELECT * FROM characters WHERE id=?'
  ).bind(c.req.param('id')).first() as Record<string, string> | null
  if (!char) return c.json({ success: false, error: 'Character not found' }, 404)

  const avatarPrompt = `Professional brand ambassador portrait for a ${char.role}.
${char.appearance ? `Appearance: ${char.appearance}.` : ''}
${char.personality ? `Personality vibe: ${char.personality}.` : ''}
Style: polished, modern, digital illustration, vibrant colors, gradient background matching a premium social media brand.
Clean headshot composition, confident pose, high-end marketing aesthetic. No text in image.`

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'dall-e-3', prompt: avatarPrompt, n: 1, size: '1024x1024', style: 'vivid', quality: 'standard' })
    })
    if (!response.ok) return c.json({ success: false, error: 'Avatar generation failed' }, 500)
    const data = await response.json() as { data: { url: string }[] }
    const avatarUrl = data.data[0].url

    await c.env.DB.prepare(
      'UPDATE characters SET avatar_url=?, updated_at=CURRENT_TIMESTAMP WHERE id=?'
    ).bind(avatarUrl, c.req.param('id')).run()

    return c.json({ success: true, avatarUrl })
  } catch (e) {
    return c.json({ success: false, error: 'Avatar generation failed' }, 500)
  }
})

// ─── CONTENT LIBRARY ─────────────────────────────────────────────────────────
app.get('/api/content-library', async (c) => {
  if (!c.env?.DB) return c.json({ items: [] })
  const clientId = c.req.query('clientId')
  const contentType = c.req.query('type')  // post | video_script | image | report
  const limit = parseInt(c.req.query('limit') || '50')

  let query = 'SELECT * FROM generated_content WHERE 1=1'
  const binds: (string | number | null)[] = []

  if (clientId) { query += ' AND client_id=?'; binds.push(clientId) }
  if (contentType) { query += ' AND content_type=?'; binds.push(contentType) }
  query += ' ORDER BY created_at DESC LIMIT ?'
  binds.push(limit)

  const { results } = await c.env.DB.prepare(query).bind(...binds).all()
  return c.json({ items: results })
})

app.delete('/api/content-library/:id', async (c) => {
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)
  await c.env.DB.prepare('DELETE FROM generated_content WHERE id=?').bind(c.req.param('id')).run()
  return c.json({ success: true })
})

app.put('/api/content-library/:id/status', async (c) => {
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)
  const { status } = await c.req.json()
  await c.env.DB.prepare(
    'UPDATE generated_content SET status=? WHERE id=?'
  ).bind(status, c.req.param('id')).run()
  return c.json({ success: true })
})

// ─── ANALYSIS HISTORY ────────────────────────────────────────────────────────
app.get('/api/analysis-history', async (c) => {
  if (!c.env?.DB) return c.json({ reports: [] })
  const { results } = await c.env.DB.prepare(
    'SELECT id, url, seo_score, brand_score, usability_score, overall_score, created_at FROM analysis_reports ORDER BY created_at DESC LIMIT 20'
  ).all()
  return c.json({ reports: results })
})

// ─── Stats endpoint ───────────────────────────────────────────────────────────
app.get('/api/stats', (c) => {
  return c.json({
    followers: { instagram: 12400, facebook: 8200, tiktok: 34500, youtube: 5600, twitter: 9800, linkedin: 4200 },
    engagement: { rate: 4.7, posts: 128, reach: 89000, impressions: 245000 },
    growth: { weekly: 3.2, monthly: 12.8, quarterly: 38.5 },
    scheduled: 24,
    published: 312
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// ─── STRIPE BILLING API ─────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

/**
 * POST /api/billing/create-subscription
 * Creates or retrieves a Stripe customer, applies a 14-day trial subscription,
 * and returns the PaymentIntent clientSecret.
 * Anti-abuse: one trial per business domain (checks businesses table).
 */
app.post('/api/billing/create-subscription', async (c) => {
  const stripeKey = (c.env as Record<string, string | undefined>)?.STRIPE_SECRET_KEY
  const { plan, email, businessDomain } = await c.req.json<{ plan: string; email: string; businessDomain: string }>()

  if (!email || !plan || !businessDomain) {
    return c.json({ error: 'Missing required fields: plan, email, businessDomain.' }, 400)
  }

  // Normalize domain
  const normDomain = businessDomain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].trim()

  // Check trial abuse (if DB available)
  if (c.env?.DB) {
    const existing = await c.env.DB.prepare(
      'SELECT trial_used FROM businesses WHERE domain=?'
    ).bind(normDomain).first<{ trial_used: number }>()

    if (existing?.trial_used) {
      return c.json({
        error: 'This business has already used its free trial. You can continue with a paid plan — no trial period will apply.',
        code: 'TRIAL_USED'
      }, 400)
    }
  }

  // Demo / no Stripe key — return mock response
  if (!stripeKey) {
    return c.json({
      clientSecret: 'pi_demo_secret_placeholder',
      customerId:   'cus_demo_placeholder',
      trialEndsAt:  new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      demo: true
    })
  }

  // --- Stripe API calls ---
  const PRICE_IDS: Record<string, string> = {
    business: (c.env as Record<string, string | undefined>)?.STRIPE_PRICE_BUSINESS || 'price_business_placeholder',
    pro:      (c.env as Record<string, string | undefined>)?.STRIPE_PRICE_PRO      || 'price_pro_placeholder',
  }
  const priceId = PRICE_IDS[plan]
  if (!priceId) return c.json({ error: 'Invalid plan selected.' }, 400)

  try {
    // 1. Create / retrieve customer
    const searchRes = await fetch(
      `https://api.stripe.com/v1/customers/search?query=email:'${encodeURIComponent(email)}'`,
      { headers: { Authorization: `Bearer ${stripeKey}` } }
    )
    const searchData = await searchRes.json() as { data: { id: string }[] }
    let customerId: string

    if (searchData.data.length > 0) {
      customerId = searchData.data[0].id
    } else {
      const createParams = new URLSearchParams({ email, 'metadata[business_domain]': normDomain })
      const createRes = await fetch('https://api.stripe.com/v1/customers', {
        method: 'POST',
        headers: { Authorization: `Bearer ${stripeKey}`, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: createParams.toString()
      })
      const createData = await createRes.json() as { id: string }
      customerId = createData.id
    }

    // 2. Create subscription with 14-day trial
    const subParams = new URLSearchParams({
      customer:                        customerId,
      'items[0][price]':               priceId,
      trial_period_days:               '14',
      'payment_settings[save_default_payment_method]': 'on_subscription',
      'expand[0]':                     'latest_invoice.payment_intent',
    })
    const subRes  = await fetch('https://api.stripe.com/v1/subscriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${stripeKey}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: subParams.toString()
    })
    const subData = await subRes.json() as {
      id: string
      trial_end: number
      latest_invoice: { payment_intent: { client_secret: string } }
    }

    const clientSecret = subData.latest_invoice?.payment_intent?.client_secret

    // 3. Mark business trial as used
    if (c.env?.DB) {
      await c.env.DB.prepare(`
        INSERT INTO businesses (domain, trial_used, trial_used_at)
        VALUES (?, 1, CURRENT_TIMESTAMP)
        ON CONFLICT(domain) DO UPDATE SET trial_used=1, trial_used_at=CURRENT_TIMESTAMP
      `).bind(normDomain).run()
    }

    return c.json({
      clientSecret,
      customerId,
      subscriptionId: subData.id,
      trialEndsAt: new Date(subData.trial_end * 1000).toISOString()
    })
  } catch (err) {
    console.error('Stripe subscription error:', err)
    return c.json({ error: 'Payment setup failed. Please try again.' }, 500)
  }
})

/**
 * POST /api/billing/create-credit-pack-session
 * Creates a Stripe Checkout Session for a one-off credit top-up pack.
 */
app.post('/api/billing/create-credit-pack-session', async (c) => {
  const stripeKey = (c.env as Record<string, string | undefined>)?.STRIPE_SECRET_KEY
  const { packId, email } = await c.req.json<{ packId: string; email: string }>()

  const PACK_PRICE_IDS: Record<string, string> = {
    pack50:   (c.env as Record<string, string | undefined>)?.STRIPE_PRICE_PACK50   || 'price_pack50_placeholder',
    pack150:  (c.env as Record<string, string | undefined>)?.STRIPE_PRICE_PACK150  || 'price_pack150_placeholder',
    pack500:  (c.env as Record<string, string | undefined>)?.STRIPE_PRICE_PACK500  || 'price_pack500_placeholder',
    pack2000: (c.env as Record<string, string | undefined>)?.STRIPE_PRICE_PACK2000 || 'price_pack2000_placeholder',
  }

  const priceId = PACK_PRICE_IDS[packId]
  if (!priceId) return c.json({ error: 'Invalid pack ID.' }, 400)

  // Demo mode
  if (!stripeKey) {
    return c.json({ url: '/billing?demo=topup', demo: true })
  }

  try {
    const origin = new URL(c.req.url).origin
    const params = new URLSearchParams({
      'line_items[0][price]':    priceId,
      'line_items[0][quantity]': '1',
      mode:                      'payment',
      customer_email:            email,
      success_url:               `${origin}/dashboard?topup=success`,
      cancel_url:                `${origin}/billing?topup=cancelled`,
      'metadata[pack_id]':       packId,
    })
    const res  = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${stripeKey}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
    const data = await res.json() as { url: string; error?: { message: string } }
    if (!res.ok) return c.json({ error: data.error?.message || 'Checkout failed.' }, 500)
    return c.json({ url: data.url })
  } catch (err) {
    return c.json({ error: 'Checkout session failed. Please try again.' }, 500)
  }
})

/**
 * POST /api/stripe/webhook
 * Handles Stripe webhook events to keep account credits in sync.
 */
app.post('/api/stripe/webhook', async (c) => {
  const sig     = c.req.header('stripe-signature') || ''
  const secret  = (c.env as Record<string, string | undefined>)?.STRIPE_WEBHOOK_SECRET || ''
  const rawBody = await c.req.text()

  // Basic event parsing (full signature verification requires crypto.subtle in edge)
  let event: Record<string, unknown>
  try { event = JSON.parse(rawBody) } catch { return c.text('Bad payload', 400) }

  const type = event.type as string
  const obj  = (event.data as Record<string, unknown>)?.object as Record<string, unknown>

  if (!c.env?.DB) return c.text('ok')

  try {
    if (type === 'customer.subscription.created' || type === 'customer.subscription.updated') {
      const custId  = obj.customer as string
      const status  = obj.status   as string
      const planMap: Record<string, string> = {
        'price_business_placeholder': 'business',
        'price_pro_placeholder':      'pro',
      }
      const items = (obj.items as Record<string, unknown>)?.data as { price: { id: string } }[]
      const plan  = items ? planMap[items[0]?.price?.id] || 'business' : 'business'
      // Update account plan by Stripe customer metadata if available
      // In production, cross-reference customer email from Stripe customer object
      console.log(`Subscription ${type}: customer=${custId}, plan=${plan}, status=${status}`)
    }

    if (type === 'invoice.paid') {
      const custId = obj.customer as string
      console.log(`Invoice paid: customer=${custId}`)
      // In production: reset credits_used for the billing period
    }

    if (type === 'invoice.payment_failed') {
      const custId = obj.customer as string
      console.log(`Payment failed: customer=${custId}`)
      // In production: mark account as payment_failed, send notification
    }
  } catch (err) {
    console.error('Webhook processing error:', err)
  }

  return c.text('ok')
})

// ═══════════════════════════════════════════════════════════════════════════
// ─── ADMIN API ROUTES ────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════
// All /api/admin/* routes require the X-Admin-Token header.
// In production: set ADMIN_TOKEN as a Cloudflare secret.
// Fallback dev token: 'dev-admin-329383' (change before deploying)

function requireAdmin(c: Parameters<typeof app.get>[1] extends infer F ? F extends (c: infer C) => unknown ? C : never : never): boolean {
  const token = (c.req as unknown as { header: (k: string) => string | undefined }).header('x-admin-token')
  const expected = ((c as Record<string, unknown>).env as Record<string, string | undefined>)?.ADMIN_TOKEN || 'dev-admin-329383'
  return token === expected
}

// ─── List all accounts ────────────────────────────────────────────────────────
app.get('/api/admin/accounts', async (c) => {
  if (!requireAdmin(c as never)) return c.json({ success: false, error: 'Unauthorized' }, 401)
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)
  const { results } = await c.env.DB.prepare(
    'SELECT id, email, plan, status, credits_used, credits_max, reports_used, reports_max, expires_at, created_at FROM accounts ORDER BY created_at DESC LIMIT 500'
  ).all()
  return c.json({ success: true, accounts: results, total: results.length })
})

// ─── Manual credit adjustment ─────────────────────────────────────────────────
app.post('/api/admin/accounts/:email/credits', async (c) => {
  if (!requireAdmin(c as never)) return c.json({ success: false, error: 'Unauthorized' }, 401)
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)

  const email  = c.req.param('email')
  const body   = await c.req.json() as { amount: number; reason: string }
  const amount = Number(body.amount)
  const reason = body.reason || 'Admin adjustment'

  if (!amount || isNaN(amount)) return c.json({ success: false, error: 'Invalid amount' }, 400)

  const account = await getAccount(c.env.DB, email)
  if (!account) return c.json({ success: false, error: 'Account not found' }, 404)

  // Apply adjustment — positive adds credits, negative deducts
  if (amount > 0) {
    // Refund: increase credits_max (not reduce credits_used, so history is preserved)
    await c.env.DB.prepare(
      'UPDATE accounts SET credits_max=credits_max+?, updated_at=CURRENT_TIMESTAMP WHERE email=?'
    ).bind(amount, email).run()
  } else {
    // Deduction: increase credits_used
    const deduct = Math.abs(amount)
    await c.env.DB.prepare(
      'UPDATE accounts SET credits_used=MIN(credits_used+?,credits_max), updated_at=CURRENT_TIMESTAMP WHERE email=?'
    ).bind(deduct, email).run()
  }

  // Log to credit_transactions
  await c.env.DB.prepare(
    'INSERT INTO credit_transactions (account_id, action, credits_used, description) VALUES (?,?,?,?)'
  ).bind(account.id, 'admin_adjustment', amount, `[Admin] ${reason}`).run()

  return c.json({ success: true, message: `Credits adjusted by ${amount} for ${email}`, reason })
})

// ─── Update account status ────────────────────────────────────────────────────
app.put('/api/admin/accounts/:email/status', async (c) => {
  if (!requireAdmin(c as never)) return c.json({ success: false, error: 'Unauthorized' }, 401)
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)

  const email  = c.req.param('email')
  const body   = await c.req.json() as { status: string; reason?: string }
  const status = body.status
  const allowed = ['active', 'suspended', 'blocked', 'trial', 'expired']
  if (!allowed.includes(status)) return c.json({ success: false, error: `Invalid status. Must be one of: ${allowed.join(', ')}` }, 400)

  const account = await getAccount(c.env.DB, email)
  if (!account) return c.json({ success: false, error: 'Account not found' }, 404)

  await c.env.DB.prepare(
    'UPDATE accounts SET status=?, updated_at=CURRENT_TIMESTAMP WHERE email=?'
  ).bind(status, email).run()

  // Log it
  await c.env.DB.prepare(
    'INSERT INTO credit_transactions (account_id, action, credits_used, description) VALUES (?,?,?,?)'
  ).bind(account.id, 'admin_status_change', 0, `[Admin] Status → ${status}${body.reason ? ': ' + body.reason : ''}`).run()

  return c.json({ success: true, message: `Account ${email} status updated to ${status}` })
})

// ─── Override plan & limits ───────────────────────────────────────────────────
app.put('/api/admin/accounts/:email/plan', async (c) => {
  if (!requireAdmin(c as never)) return c.json({ success: false, error: 'Unauthorized' }, 401)
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)

  const email = c.req.param('email')
  const body  = await c.req.json() as {
    plan?: string; credits_max?: number; credits_used?: number;
    reports_max?: number; expires_at?: string;
  }

  const account = await getAccount(c.env.DB, email)
  if (!account) return c.json({ success: false, error: 'Account not found' }, 404)

  // Build UPDATE SET clauses dynamically
  const sets: string[] = ['updated_at=CURRENT_TIMESTAMP']
  const vals: unknown[] = []

  if (body.plan)          { sets.push('plan=?');          vals.push(body.plan)          }
  if (body.credits_max  !== undefined) { sets.push('credits_max=?');  vals.push(body.credits_max)  }
  if (body.credits_used !== undefined) { sets.push('credits_used=?'); vals.push(body.credits_used) }
  if (body.reports_max  !== undefined) { sets.push('reports_max=?');  vals.push(body.reports_max)  }
  if (body.expires_at)    { sets.push('expires_at=?');    vals.push(body.expires_at)    }

  if (sets.length === 1) return c.json({ success: false, error: 'No fields to update' }, 400)

  vals.push(email)
  await c.env.DB.prepare(`UPDATE accounts SET ${sets.join(', ')} WHERE email=?`).bind(...vals).run()

  // Log
  await c.env.DB.prepare(
    'INSERT INTO credit_transactions (account_id, action, credits_used, description) VALUES (?,?,?,?)'
  ).bind(account.id, 'admin_plan_change', 0, `[Admin] Plan override: ${JSON.stringify(body)}`).run()

  return c.json({ success: true, message: `Account ${email} updated`, changes: body })
})

// ─── Trial anti-abuse lock ────────────────────────────────────────────────────
// One 14-day trial per business: checked via email + optional fingerprint/IP
app.post('/api/admin/trial-lock', async (c) => {
  if (!c.env?.DB) return c.json({ allowed: true }) // DB not available = permissive fallback

  const body        = await c.req.json() as { email: string; fingerprint?: string; ip?: string }
  const email       = (body.email || '').toLowerCase().trim()
  const fingerprint = body.fingerprint || null
  const ip          = body.ip || c.req.header('cf-connecting-ip') || null

  if (!email) return c.json({ allowed: false, reason: 'Email required' }, 400)

  // Check if this email has ever had a trial
  const existing = await c.env.DB.prepare(
    "SELECT id, status, plan, trial_used FROM accounts WHERE email=?"
  ).bind(email).first<Record<string, unknown>>()

  if (existing && (existing.trial_used as number) === 1) {
    return c.json({ allowed: false, reason: 'A free trial has already been used for this account. Only one trial per business.' })
  }

  // Check fingerprint abuse (same device/browser used for multiple trials)
  if (fingerprint) {
    const fpCheck = await c.env.DB.prepare(
      "SELECT COUNT(*) as cnt FROM accounts WHERE trial_fingerprint=? AND trial_used=1"
    ).bind(fingerprint).first<{ cnt: number }>()
    if (fpCheck && fpCheck.cnt > 0) {
      return c.json({ allowed: false, reason: 'Trial already used on this device.' })
    }
  }

  // Check IP abuse (max 3 trials per IP — allows households but stops bots)
  if (ip) {
    const ipCheck = await c.env.DB.prepare(
      "SELECT COUNT(*) as cnt FROM accounts WHERE trial_ip=? AND trial_used=1"
    ).bind(ip).first<{ cnt: number }>()
    if (ipCheck && ipCheck.cnt >= 3) {
      return c.json({ allowed: false, reason: 'Too many trial accounts registered from this network. Please contact support.' })
    }
  }

  return c.json({ allowed: true })
})

// ─── Mark trial as started (call after successful trial activation) ───────────
app.post('/api/admin/trial-lock/mark', async (c) => {
  if (!c.env?.DB) return c.json({ success: true })

  const body        = await c.req.json() as { email: string; fingerprint?: string; ip?: string }
  const email       = (body.email || '').toLowerCase().trim()
  const fingerprint = body.fingerprint || null
  const ip          = body.ip || c.req.header('cf-connecting-ip') || null

  if (!email) return c.json({ success: false, error: 'Email required' }, 400)

  await c.env.DB.prepare(
    'UPDATE accounts SET trial_used=1, trial_fingerprint=?, trial_ip=?, updated_at=CURRENT_TIMESTAMP WHERE email=?'
  ).bind(fingerprint, ip, email).run()

  return c.json({ success: true, message: `Trial marked as used for ${email}` })
})

// ─── Admin stats dashboard ────────────────────────────────────────────────────
app.get('/api/admin/stats', async (c) => {
  if (!requireAdmin(c as never)) return c.json({ success: false, error: 'Unauthorized' }, 401)
  if (!c.env?.DB) return c.json({ success: false, error: 'DB not available' }, 500)

  const [totalAccounts, planCounts, activeCounts, recentTransactions] = await Promise.all([
    c.env.DB.prepare('SELECT COUNT(*) as cnt FROM accounts').first<{ cnt: number }>(),
    c.env.DB.prepare('SELECT plan, COUNT(*) as cnt FROM accounts GROUP BY plan').all(),
    c.env.DB.prepare("SELECT status, COUNT(*) as cnt FROM accounts GROUP BY status").all(),
    c.env.DB.prepare('SELECT * FROM credit_transactions ORDER BY created_at DESC LIMIT 50').all(),
  ])

  // Total credits consumed across all accounts
  const creditStats = await c.env.DB.prepare(
    'SELECT SUM(credits_used) as total_used, SUM(credits_max) as total_max FROM accounts'
  ).first<{ total_used: number; total_max: number }>()

  return c.json({
    success: true,
    totalAccounts:      totalAccounts?.cnt ?? 0,
    planBreakdown:      planCounts.results,
    statusBreakdown:    activeCounts.results,
    creditStats,
    recentTransactions: recentTransactions.results,
  })
})

// ─── Plans & credit costs (public endpoint for pricing page) ─────────────────
app.get('/api/billing/plans', (c) => {
  return c.json({
    success: true,
    plans: {
      free:       { name: 'Free',       price: 0,   currency: 'AUD', credits: 8,    trialDays: 0,  trialCredits: 0   },
      business:   { name: 'Business',   price: 79,  currency: 'AUD', credits: 150,  trialDays: 14, trialCredits: 60  },
      pro:        { name: 'Pro',        price: 199, currency: 'AUD', credits: 500,  trialDays: 14, trialCredits: 120 },
      enterprise: { name: 'Enterprise', price: 699, currency: 'AUD', credits: 2500, trialDays: 0,  trialCredits: 0   },
    },
    creditCosts: CREDIT_COSTS,
    creditPacks: [
      { credits: 50,   priceAUD: 59,   label: 'Starter Pack' },
      { credits: 150,  priceAUD: 159,  label: 'Growth Pack'  },
      { credits: 500,  priceAUD: 449,  label: 'Pro Pack'     },
      { credits: 2000, priceAUD: 1499, label: 'Agency Pack'  },
    ],
  })
})

// ─── Route to character maker page ───────────────────────────────────────────
app.get('/create/character', (c) => c.html(characterMakerPage()))

// ─── Route to image maker page ────────────────────────────────────────────────
app.get('/image-maker', (c) => c.html(imageMakerPage()))

// ─── Route to uploads page ────────────────────────────────────────────────────
app.get('/uploads', (c) => c.html(uploadsPage()))

// ═══════════════════════════════════════════════════════════════════════════
// ─── CHARACTER CREATE API ─────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

// POST /api/characters/create — create a new character profile
app.post('/api/characters/create', async (c) => {
  try {
    const body = await c.req.json()
    const { name, role, personality, style, bio, tone, platforms, keywords, avoidWords, locked, customer_id } = body
    if (!name) return c.json({ success: false, error: 'Character name is required.' }, 400)

    const id = crypto.randomUUID()
    const customerId = customer_id || 'demo-customer'

    if (c.env.DB) {
      await c.env.DB.prepare(`
        INSERT INTO character_profiles (id, customer_id, name, role, personality, style, tone, preview_text, locked_for_brand_consistency, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `).bind(id, customerId, name, role || '', personality || '', style || '', JSON.stringify(tone || []), bio || '', locked ? 1 : 0).run()
    }

    return c.json({
      success: true,
      character: { id, name, role, personality, style, bio, tone, platforms, keywords, avoidWords, locked, customer_id: customerId }
    })
  } catch (err: any) {
    return c.json({ success: false, error: err.message || 'Failed to create character.' }, 500)
  }
})

// POST /api/characters/:characterId/guided-edit — apply a guided edit to a character
app.post('/api/characters/:characterId/guided-edit', async (c) => {
  try {
    const characterId = c.req.param('characterId')
    const body = await c.req.json()
    const { instruction, field } = body
    if (!instruction) return c.json({ success: false, error: 'Instruction is required.' }, 400)

    // Demo: return a guided suggestion without actual AI (OpenAI key required for real implementation)
    const suggestions: Record<string, string> = {
      bio: `Based on your instruction "${instruction}", here is an updated bio that incorporates the feedback while maintaining brand voice consistency.`,
      tone: `Tone adjusted to be more ${instruction} while preserving authenticity.`,
      style: `Content style updated: ${instruction}`,
      default: `Applied guided edit: "${instruction}". The character profile has been updated to reflect this change.`
    }

    const result = suggestions[field || 'default'] || suggestions.default

    if (c.env.DB && characterId !== 'demo') {
      await c.env.DB.prepare(`UPDATE character_profiles SET updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(characterId).run()
    }

    return c.json({ success: true, characterId, field: field || 'general', result, guided: true })
  } catch (err: any) {
    return c.json({ success: false, error: err.message || 'Guided edit failed.' }, 500)
  }
})

// ═══════════════════════════════════════════════════════════════════════════
// ─── REPORTS API ─────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

// GET /api/reports/latest — return the latest report for the current user
app.get('/api/reports/latest', async (c) => {
  try {
    // Try to load from DB first
    if (c.env.DB) {
      const row = await c.env.DB.prepare(
        `SELECT * FROM analysis_reports ORDER BY created_at DESC LIMIT 1`
      ).first<Record<string, unknown>>()

      if (row) {
        const data = typeof row.report_data === 'string' ? JSON.parse(row.report_data) : {}
        return c.json({
          success: true,
          reportId: row.id,
          businessName: data.businessName || row.url || 'Your Business',
          website: data.website || String(row.url || ''),
          industry: data.industry || 'General',
          score: data.score || data.overallScore || 70,
          grade: data.grade || 'B',
          summary: data.summary || data.executiveSummary || 'Report loaded from database.',
          generatedAt: row.created_at,
          source: 'database'
        })
      }
    }

    // Fallback demo report
    return c.json({
      success: true,
      reportId: 'demo-report-001',
      businessName: 'Bloom Beauty Co.',
      website: 'bloombeauty.com.au',
      industry: 'Beauty & Cosmetics',
      score: 74,
      grade: 'B+',
      summary: 'Bloom Beauty Co. has strong brand identity and loyal customer base, but is significantly under-leveraging social media reach. SEO technical gaps and inconsistent posting are limiting organic growth by an estimated 40%.',
      generatedAt: new Date().toISOString(),
      source: 'demo'
    })
  } catch (err: any) {
    return c.json({ success: false, error: err.message || 'Failed to load report.' }, 500)
  }
})

export default app
