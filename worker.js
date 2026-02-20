export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. API Login
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

    // 2. TITAN AI PROXY - Løser CORS og beskytter API-nøkkelen
    if (url.pathname === '/api/titan' && request.method === 'POST') {
      const { ngrokUrl, message } = await request.json();
      const TITAN_API_KEY = "Titan_Safe_9823_Alpha_XT";

      try {
        const response = await fetch(`${ngrokUrl}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TITAN_API_KEY}`
          },
          body: JSON.stringify({
            model: "Titan-1.0gp",
            messages: [{ role: "user", content: message }],
            temperature: 0.7
          })
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Kunne ikke koble til Titan-tjenesten via ngrok.' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // 3. API Analytics
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
        return new Response(JSON.stringify({ error: 'Failed' }), { status: 500 });
      }
    }

    return env.ASSETS.fetch(request);
  },
};
