export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. API Login
    if (url.pathname === '/api/login' && request.method === 'POST') {
      try {
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
      } catch (e) {
        return new Response(JSON.stringify({ error: 'Bad Request' }), { status: 400 });
      }
    }

    // 2. TITAN AI PROXY - Forbedret feilsøking
    if (url.pathname === '/api/titan' && request.method === 'POST') {
      try {
        const { ngrokUrl, message } = await request.json();
        const TITAN_API_KEY = "Titan_Safe_9823_Alpha_XT";

        if (!ngrokUrl) throw new Error("Mangler ngrok-URL");

        const cleanUrl = ngrokUrl.replace(/\/$/, ""); 

        console.log(`Forsøker å koble til Titan på: ${cleanUrl}`);

        const titanResponse = await fetch(`${cleanUrl}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TITAN_API_KEY}`,
            'ngrok-skip-browser-warning': 'true',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            model: "Titan-1.0gp",
            messages: [{ role: "user", content: message }],
            temperature: 0.7,
            max_tokens: 1000
          })
        });

        if (!titanResponse.ok) {
          const errorDetail = await titanResponse.text();
          return new Response(JSON.stringify({ 
            error: `Titan API feil (${titanResponse.status}): ${errorDetail.slice(0, 100)}` 
          }), {
            status: titanResponse.status,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const data = await titanResponse.json();
        return new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' },
        });

      } catch (err) {
        return new Response(JSON.stringify({ 
          error: `Proxy krasjet: ${err.message}. Sjekk at ngrok er aktiv og URL-en stemmer.` 
        }), {
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
