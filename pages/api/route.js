// app/api/listings/route.js
export const revalidate = 60;

const API = 'https://api.airtable.com/v0';

function need(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export async function GET() {
  try {
    const AIRTABLE_TOKEN   = need('AIRTABLE_TOKEN');
    const AIRTABLE_BASE_ID = need('AIRTABLE_BASE_ID');
    const AIRTABLE_TABLE   = process.env.AIRTABLE_TABLE || 'Listings';

    const params = new URLSearchParams({
      pageSize: '50',
      filterByFormula: 'IF({Featured}, TRUE(), FALSE())',
      sort: JSON.stringify([
        { field: 'Order', direction: 'asc' },
        { field: 'Title', direction: 'asc' }
      ])
    });

    const url = `${API}/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}?${params}`;

    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
      next: { revalidate: 60 }
    });

    if (!r.ok) {
      const err = await r.text();
      return new Response(JSON.stringify({ error: err }), { status: r.status });
    }

    const json = await r.json();

    const records = (json.records || []).map(rec => {
      const f = rec.fields || {};
      const imgs = Array.isArray(f.Image) ? f.Image : [];
      const urls = imgs.map(a => a.url).filter(Boolean);
      return {
        id: rec.id,
        title: f.Title || '',
        type: f.Type || '',
        status: f.Status || '',
        price: f.Price || '',
        beds: f.Beds ?? null,
        baths: f.Baths ?? null,
        area: f.Area || '',
        locality: f.Locality || '',
        image: urls[0] || null,
        images: urls
      };
    });

    return Response.json({ records }, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message || 'Server error' }), { status: 500 });
  }
}
