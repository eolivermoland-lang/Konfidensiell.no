export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. API Login
    if (url.pathname === '/api/login' && request.method === 'POST') {
      try {
        const { email, password } = await request.json();
        
        const isAdmin1 = email === env.ADMIN_EMAIL && password === env.ADMIN_PASSWORD;
        const isAdmin2 = email === env.ADMIN_EMAIL_2 && password === env.ADMIN_PASSWORD_2;

        if (isAdmin1 || isAdmin2) {
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
      let cleanUrl = "Ukjent URL";
      try {
        const body = await request.json();
        const { ngrokUrl, message, apiKey } = body;
        
        // Use the key from the request, or fallback to the hardcoded one
        const TITAN_API_KEY = apiKey || "Titan_Safe_9823_Alpha_XT";

        if (!ngrokUrl) throw new Error("Mangler ngrok-URL i forespørselen");

        // Valider og rens URL
        let processedUrl = ngrokUrl.trim().replace(/\/$/, "");
        if (!processedUrl.startsWith('http')) {
          processedUrl = `https://${processedUrl}`;
        }
        cleanUrl = processedUrl;

        console.log(`Forsøker å koble til Titan på: ${cleanUrl}/v1/chat/completions`);
        console.log(`Bruker Auth: X-Titan-Key: ${TITAN_API_KEY.substring(0, 5)}...`);

        const titanResponse = await fetch(`${cleanUrl}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Titan-Key': TITAN_API_KEY,
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
          let errorMessage = `Titan API feil (${titanResponse.status})`;
          
          if (titanResponse.status === 502 || titanResponse.status === 504) {
            errorMessage = `Titan-serveren er utilgjengelig (502/504). Sjekk at ngrok kjører og at lokal server er på.`;
          }

          return new Response(JSON.stringify({ 
            error: `${errorMessage}: ${errorDetail.slice(0, 150)}`,
            debug: { url: cleanUrl, status: titanResponse.status }
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
          error: `Proxy feil: ${err.message}`,
          hint: "Sjekk at ngrok-URLen er korrekt og at tunnelen er aktiv.",
          url: cleanUrl
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
