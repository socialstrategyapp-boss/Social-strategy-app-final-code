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

const app = new Hono()

app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './' }))

// Pages
app.get('/', (c) => c.html(landingPage()))
app.get('/dashboard', (c) => c.html(dashboardPage()))
app.get('/analysis', (c) => c.html(analysisPage()))
app.get('/content-studio', (c) => c.html(contentStudioPage()))
app.get('/scheduler', (c) => c.html(schedulerPage()))
app.get('/analytics', (c) => c.html(analyticsPage()))
app.get('/pricing', (c) => c.html(pricingPage()))

// Mock API endpoints
app.post('/api/analyze', async (c) => {
  const body = await c.req.json()
  await new Promise(r => setTimeout(r, 500))
  return c.json({
    success: true,
    url: body.url,
    seoScore: Math.floor(Math.random() * 30) + 60,
    brandScore: Math.floor(Math.random() * 25) + 65,
    usabilityScore: Math.floor(Math.random() * 20) + 70,
    overallScore: Math.floor(Math.random() * 20) + 72,
    recommendations: [
      'Add meta descriptions to all pages for better SEO visibility',
      'Improve page load speed — currently above 3s threshold',
      'Strengthen CTA buttons with action-oriented language',
      'Add structured data markup for rich search results',
      'Update social media Open Graph tags for better sharing',
      'Implement HTTPS on all subdomains'
    ],
    strategy: {
      pricing: 'Premium positioning ($97–$297/month) based on your niche',
      revenue: 'Projected 30% MoM growth with consistent content',
      actions: ['Launch email nurture sequence', 'Run retargeting ads', 'Partner with micro-influencers']
    }
  })
})

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
