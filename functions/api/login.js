export async function onRequestPost(context) {
  const { request, env } = context;
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
}
