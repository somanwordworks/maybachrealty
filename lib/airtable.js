// lib/airtable.js
const API = 'https://api.airtable.com/v0'

function requireEnv(name) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env var: ${name}`)
  return v
}

// Fetch "Featured" listings + normalize records
export async function fetchFeaturedListings() {
  const AIRTABLE_TOKEN   = requireEnv('AIRTABLE_TOKEN')
  const AIRTABLE_BASE_ID = requireEnv('AIRTABLE_BASE_ID')
  const AIRTABLE_TABLE   = process.env.AIRTABLE_TABLE || 'Listings'

  const params = new URLSearchParams({
    pageSize: '50',
    filterByFormula: 'IF({Featured}, TRUE(), FALSE())',
    sort: JSON.stringify([
      { field: 'Order', direction: 'asc' },
      { field: 'Title', direction: 'asc' }
    ])
    // If you made a View named "Featured", add:  view: 'Featured'
  })

  const url = `${API}/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}?${params}`

  const r = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` }
  })
  if (!r.ok) {
    const text = await r.text()
    throw new Error(`Airtable error ${r.status}: ${text}`)
  }
  const json = await r.json()

  // Normalize the shape for the UI
  return (json.records || []).map((rec) => {
    const f = rec.fields || {}
    const imgs = Array.isArray(f.Image) ? f.Image : []
    const urls = imgs.map((a) => a.url).filter(Boolean)
    return {
      id: rec.id,
      title:   f.Title || '',
      type:    f.Type || '',
      status:  f.Status || '',
      price:   f.Price || '',
      beds:    f.Beds ?? null,
      baths:   f.Baths ?? null,
      area:    f.Area || '',
      locality:f.Locality || '',
      image:   urls[0] || null,  // primary
      images:  urls              // all images (attachments)
    }
  })
}
