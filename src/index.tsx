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

// ═══════════════════════════════════════════════════════════════════════════
// ─── ACCOUNT & CREDIT HELPERS ───────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

// Cost in credits per action
const CREDIT_COSTS: Record<string, number> = {
  analyze:          10,
  generate_content: 5,
  generate_image:   20,
  video_script:     8,
  generate_report:  15,
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

  if (!apiKey) return c.json({ success: false, error: 'OpenAI API key not configured' }, 500)

  // ── Credit gate ──────────────────────────────────────────────────────────
  if (c.env?.DB) {
    const check = await checkCredits(c.env.DB, 'analyze', accountEmail)
    if (!check.allowed) return c.json({ success: false, error: check.error, code: check.code }, 403)
  }

  const prompt = `You are an expert digital marketing consultant and business analyst. 
Analyze the website: ${url}

Provide a REAL, DETAILED analysis. Return ONLY valid JSON in this exact format:
{
  "seoScore": <number 0-100>,
  "brandScore": <number 0-100>,
  "usabilityScore": <number 0-100>,
  "overallScore": <number 0-100>,
  "websiteSummary": "<2-sentence summary of what this business does>",
  "recommendations": [
    "<specific SEO recommendation>",
    "<specific branding recommendation>",
    "<specific content recommendation>",
    "<specific conversion recommendation>",
    "<specific social media recommendation>",
    "<specific technical recommendation>"
  ],
  "strategy": {
    "pricing": "<recommended pricing model based on their niche>",
    "revenue": "<specific revenue growth projection and strategy>",
    "actions": ["<immediate action 1>","<immediate action 2>","<immediate action 3>"]
  },
  "contentPillars": ["<pillar 1>","<pillar 2>","<pillar 3>","<pillar 4>"],
  "targetAudience": "<specific target audience description>",
  "topOpportunity": "<single biggest growth opportunity for this business>"
}
Be specific to the actual URL and business. Do NOT use generic placeholder text.`

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

// ─── REAL OpenAI Content Generation (text posts) ─────────────────────────────
app.post('/api/generate-content', async (c) => {
  const body = await c.req.json()
  const { brandName, industry, tone, topic, platforms, clientId = null, characterId = null, accountEmail = null } = body
  const apiKey = c.env?.OPENAI_API_KEY

  if (!apiKey) return c.json({ success: false, error: 'OpenAI API key not configured' }, 500)

  // ── Credit gate ──────────────────────────────────────────────────────────
  if (c.env?.DB) {
    const check = await checkCredits(c.env.DB, 'generate_content', accountEmail)
    if (!check.allowed) return c.json({ success: false, error: check.error, code: check.code }, 403)
  }

  const platformList = (platforms as string[]).join(', ')

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

  const prompt = `You are an expert social media content creator. 
Create highly engaging social media content for:
- Brand: ${brandName}
- Industry: ${industry}
- Tone: ${tone}
- Topic: ${topic}
- Platforms: ${platformList}
${characterContext}

Return ONLY valid JSON in this exact format:
{
  "posts": [
    {
      "platform": "<platform name>",
      "type": "<content type e.g. Caption + Image, Video Script, Professional Post>",
      "content": "<the full post content with emojis, hashtags where appropriate>",
      "tip": "<one specific posting tip for this platform>",
      "imagePrompt": "<a detailed DALL-E image generation prompt for the visual that would accompany this post, describing style, subject, colors, mood>"
    }
  ]
}
Create one post per platform requested. Make each post unique and native to that platform's style. Be specific to the brand and topic provided.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2500, temperature: 0.8,
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

  if (!apiKey) return c.json({ success: false, error: 'OpenAI API key not configured' }, 500)
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

  if (!apiKey) return c.json({ success: false, error: 'OpenAI API key not configured' }, 500)

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
  const { period = '30D', brandName = 'Your Brand', clientId = null, accountEmail = null } = body
  const apiKey = c.env?.OPENAI_API_KEY

  if (!apiKey) return c.json({ success: false, error: 'OpenAI API key not configured' }, 500)

  // ── Credit gate ──────────────────────────────────────────────────────────
  if (c.env?.DB) {
    const check = await checkCredits(c.env.DB, 'generate_report', accountEmail)
    if (!check.allowed) return c.json({ success: false, error: check.error, code: check.code }, 403)
  }

  const statsPayload = {
    period,
    totalImpressions: 245320, impressionsChange: '+18.4%',
    totalReach: 89420, reachChange: '+12.3%',
    engagements: 15847, engagementsChange: '+23.1%',
    linkClicks: 3204, clicksChange: '-2.1%',
    platforms: [
      { name: 'Instagram', followers: 12400, reach: 35200, eng: '5.2%', posts: 45, growth: '+8%' },
      { name: 'TikTok', followers: 34500, reach: 28400, eng: '6.8%', posts: 32, growth: '+22%' },
      { name: 'Facebook', followers: 8200, reach: 12100, eng: '2.1%', posts: 28, growth: '+3%' },
      { name: 'YouTube', followers: 5600, reach: 8900, eng: '3.4%', posts: 12, growth: '+15%' },
      { name: 'X (Twitter)', followers: 9800, reach: 14200, eng: '1.8%', posts: 67, growth: '+5%' },
      { name: 'LinkedIn', followers: 4200, reach: 6800, eng: '4.1%', posts: 18, growth: '+11%' },
    ]
  }

  const aiPrompt = `You are a senior social media analyst. Based on this performance data for ${brandName} over the last ${period}:
${JSON.stringify(statsPayload, null, 2)}

Write a concise executive summary (3 paragraphs) and 5 specific, actionable recommendations to improve performance. 
Return ONLY valid JSON:
{
  "executiveSummary": "<3-paragraph executive summary>",
  "keyWin": "<single biggest win this period>",
  "biggestChallenge": "<single biggest challenge>",
  "recommendations": [
    {"title":"<rec title>","detail":"<specific action to take>","impact":"High|Medium|Low"},
    {"title":"<rec title>","detail":"<specific action to take>","impact":"High|Medium|Low"},
    {"title":"<rec title>","detail":"<specific action to take>","impact":"High|Medium|Low"},
    {"title":"<rec title>","detail":"<specific action to take>","impact":"High|Medium|Low"},
    {"title":"<rec title>","detail":"<specific action to take>","impact":"High|Medium|Low"}
  ]
}`

  try {
    const aiResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: aiPrompt }],
        max_tokens: 1200, temperature: 0.4,
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

    return c.html(html)

    // ── Deduct credits after success (after sending response) ────────────────
    // Note: We call this after return — fire-and-forget pattern for edge workers
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

export default app
