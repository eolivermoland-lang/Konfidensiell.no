export async function onRequestGet(context) {
  const { env } = context;
  
  const ACCOUNT_ID = env.CLOUDFLARE_ACCOUNT_ID || "961d9b8159d86770ecbfa38b78c6ea7c";
  const API_TOKEN = env.CLOUDFLARE_API_TOKEN || "VqbFcHPBkLelYskDf6tzknO7Ag0Jr6CTnQQ4T_Tv";

  const query = `
    query {
      viewer {
        accounts(filter: { accountTag: "${ACCOUNT_ID}" }) {
          pagesDev {
            analytics(filter: { date_geq: "2026-01-01" }, limit: 1) {
              sum { requests pageViews bytes }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.cloudflare.com/client/v4/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch analytics' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
