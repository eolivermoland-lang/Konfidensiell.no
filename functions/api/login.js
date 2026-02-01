export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const { email, password } = await request.json();

    // The env variables are managed in Cloudflare Dashboard -> Settings -> Functions -> Variables
    if (email === env.ADMIN_EMAIL && password === env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ 
        success: true, 
        sessionToken: btoa(email + Date.now()) 
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (e) {}

  return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' }
  });
}
