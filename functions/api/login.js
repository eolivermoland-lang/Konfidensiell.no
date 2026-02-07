export async function onRequestPost(context) {
  const { request, env } = context;
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
