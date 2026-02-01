export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle Login API
    if (url.pathname === '/api/login' && request.method === 'POST') {
      try {
        const { email, password } = await request.json();
        // env.ADMIN_EMAIL and env.ADMIN_PASSWORD will now be available
        if (email === env.ADMIN_EMAIL && password === env.ADMIN_PASSWORD) {
          return new Response(JSON.stringify({ 
            success: true, 
            sessionToken: btoa(email + Date.now()) 
          }), {
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*' 
            }
          });
        }
      } catch (e) {}
      return new Response(JSON.stringify({ success: false }), { 
        status: 401, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Default: Serve static assets
    return env.ASSETS.fetch(request);
  }
};
