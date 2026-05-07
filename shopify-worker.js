// shopify-worker.js
// Deploy this FREE to Cloudflare Workers — https://workers.cloudflare.com
//
// This acts as a secure proxy between the Plant Shop app and Shopify's Admin API.
// Without this, the browser cannot call Shopify directly (CORS restriction).
//
// SETUP (one time, ~5 minutes):
//  1. Go to https://dash.cloudflare.com → Workers & Pages → Create → Create Worker
//  2. Name it anything (e.g. plant-shop-proxy) → click Deploy
//  3. Click "Edit code" → delete everything → paste THIS entire file → Deploy
//  4. Copy the worker URL (e.g. plant-shop-proxy.yourname.workers.dev)
//  5. Paste that URL into the app Settings page → Worker URL field

export default {
  async fetch(request, env, ctx) {
    const cors = {
      'Access-Control-Allow-Origin':  '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Shopify-Token, X-Shopify-Domain',
    }

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors })
    }

    const domain = request.headers.get('X-Shopify-Domain')
    const token  = request.headers.get('X-Shopify-Token')

    if (!domain || !token) {
      return new Response(
        JSON.stringify({ error: 'Missing X-Shopify-Domain or X-Shopify-Token header' }),
        { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } }
      )
    }

    // Strip /proxy prefix, forward the rest to Shopify Admin API
    const url     = new URL(request.url)
    const apiPath = url.pathname.replace(/^\/proxy/, '') + url.search
    const target  = `https://${domain}/admin/api/2024-01${apiPath}`

    const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.text()

    const upstream = await fetch(target, {
      method:  request.method,
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type':           'application/json',
        'Accept':                 'application/json',
      },
      body,
    })

    const responseBody = await upstream.text()
    return new Response(responseBody, {
      status:  upstream.status,
      headers: { ...cors, 'Content-Type': 'application/json' },
    })
  },
}
