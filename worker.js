export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. API Login - Uses variables from env defined in wrangler.json
    if (url.pathname === '/api/login' && request.method === 'POST') {
      const { email, password } = await request.json();
      
      if (email === env.ADMIN_EMAIL && password === env.ADMIN_PASSWORD) {
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ success: false, error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. API Analytics - Uses variables from env defined in wrangler.json
    if (url.pathname === '/api/analytics' && request.method === 'GET') {
      const ACCOUNT_ID = env.CLOUDFLARE_ACCOUNT_ID;
      const API_TOKEN = env.CLOUDFLARE_API_TOKEN;

      const query = `query { viewer { accounts(filter: { accountTag: "${ACCOUNT_ID}" }) { pagesDev { analytics(filter: { date_geq: "2026-01-01" }, limit: 1) { sum { requests pageViews bytes } } } } } }`;

      try {
        const response = await fetch('https://api.cloudflare.com/client/v4/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_TOKEN}` },
          body: JSON.stringify({ query })
        });
        const data = await response.json();
        return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Failed to fetch analytics' }), { status: 500 });
      }
    }

    // 3. Serve Assets
    return env.ASSETS.fetch(request);
  },
};