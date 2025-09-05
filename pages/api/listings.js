// pages/api/listings.js
const API = 'https://api.airtable.com/v0';

function need(name) {
    const v = process.env[name];
    if (!v) throw new Error(`Missing env var: ${name}`);
    return v;
}

export default async function handler(req, res) {
    try {
        const AIRTABLE_TOKEN = need('AIRTABLE_TOKEN');
        const AIRTABLE_BASE_ID = need('AIRTABLE_BASE_ID');
        const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE || 'Listings';

        // 👉 Start simple: no filter, no sort. (Add back later.)
        const params = new URLSearchParams({ pageSize: '50' });

        // If you created a view (e.g., "Featured"), uncomment this line and
        // make sure the view name matches EXACTLY as seen in Airtable:
        // params.set('view', 'Featured');

        const url = `${API}/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}?${params}`;

        const r = await fetch(url, { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } });
        const raw = await r.text();

        // If Airtable complains, surface the exact message to debug quickly.
        if (!r.ok) return res.status(r.status).json({ error: raw });

        const json = JSON.parse(raw);

        const records = (json.records || []).map((rec) => {
            const f = rec.fields || {};
            const imgs = Array.isArray(f.Image) ? f.Image : [];
            const urls = imgs.map((a) => a.url).filter(Boolean);
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

        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
        res.status(200).json({ records });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message || 'Server error' });
    }
}
