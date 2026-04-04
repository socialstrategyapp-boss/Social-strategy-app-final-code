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

type Env = {
  OPENAI_API_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './' }))

// Pages
app.get('/', (c) => c.html(landingPage()))
app.get('/login', (c) => c.html(loginPage()))
app.get('/dashboard', (c) => c.html(dashboardPage()))
app.get('/analysis', (c) => c.html(analysisPage()))
app.get('/content-studio', (c) => c.html(contentStudioPage()))
app.get('/scheduler', (c) => c.html(schedulerPage()))
app.get('/analytics', (c) => c.html(analyticsPage()))
app.get('/pricing', (c) => c.html(pricingPage()))
app.get('/settings', (c) => c.html(settingsPage()))

// ─── REAL OpenAI Website Analysis ───────────────────────────────────────────
app.post('/api/analyze', async (c) => {
  const body = await c.req.json()
  const url = body.url || ''
  const apiKey = c.env?.OPENAI_API_KEY

  if (!apiKey) {
    return c.json({ success: false, error: 'OpenAI API key not configured' }, 500)
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
    "actions": [
      "<immediate action 1>",
      "<immediate action 2>",
      "<immediate action 3>"
    ]
  },
  "contentPillars": ["<pillar 1>", "<pillar 2>", "<pillar 3>", "<pillar 4>"],
  "targetAudience": "<specific target audience description>",
  "topOpportunity": "<single biggest growth opportunity for this business>"
}

Be specific to the actual URL and business. Do NOT use generic placeholder text.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1200,
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('OpenAI error:', err)
      return c.json({ success: false, error: 'AI analysis failed' }, 500)
    }

    const data = await response.json() as { choices: { message: { content: string } }[] }
    const content = data.choices[0].message.content
    const parsed = JSON.parse(content)

    return c.json({ success: true, url, ...parsed })
  } catch (e) {
    console.error('Analysis error:', e)
    return c.json({ success: false, error: 'Analysis failed. Please try again.' }, 500)
  }
})

// ─── REAL OpenAI Content Generation ─────────────────────────────────────────
app.post('/api/generate-content', async (c) => {
  const body = await c.req.json()
  const { brandName, industry, tone, topic, platforms } = body
  const apiKey = c.env?.OPENAI_API_KEY

  if (!apiKey) {
    return c.json({ success: false, error: 'OpenAI API key not configured' }, 500)
  }

  const platformList = (platforms as string[]).join(', ')

  const prompt = `You are an expert social media content creator. 
Create highly engaging social media content for:
- Brand: ${brandName}
- Industry: ${industry}
- Tone: ${tone}
- Topic: ${topic}
- Platforms: ${platformList}

Return ONLY valid JSON in this exact format:
{
  "posts": [
    {
      "platform": "<platform name>",
      "type": "<content type e.g. Caption + Image, Video Script, Professional Post>",
      "content": "<the full post content with emojis, hashtags where appropriate>",
      "tip": "<one posting tip for this platform>"
    }
  ]
}

Create one post per platform requested. Make each post unique, native to the platform style, and highly engaging. Use relevant emojis and hashtags. Be specific to the brand and topic provided.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.8,
        response_format: { type: 'json_object' }
      })
    })

    if (!response.ok) {
      return c.json({ success: false, error: 'Content generation failed' }, 500)
    }

    const data = await response.json() as { choices: { message: { content: string } }[] }
    const content = data.choices[0].message.content
    const parsed = JSON.parse(content)

    return c.json({ success: true, ...parsed })
  } catch (e) {
    console.error('Content generation error:', e)
    return c.json({ success: false, error: 'Generation failed. Please try again.' }, 500)
  }
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
