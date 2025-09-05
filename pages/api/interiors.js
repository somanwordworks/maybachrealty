// pages/api/interiors.js

export default async function handler(req, res) {
    const apiKey = process.env.PEXELS_API_KEY;
    const url =
        "https://api.pexels.com/v1/search?query=office%20interior&per_page=12";

    try {
        const response = await fetch(url, {
            headers: { Authorization: apiKey },
            cache: "no-store",
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Pexels API error: ${response.status} – ${errText}`);
        }

        const data = await response.json();

        const photos = data.photos.map((p) => ({
            id: p.id,
            url: p.src.original,
            preview: p.src.medium,
            photographer: p.photographer,
        }));

        res.setHeader("Cache-Control", "no-store");
        res.status(200).json({ photos });
    } catch (error) {
        console.error("Error fetching interiors:", error);
        res.status(500).json({ photos: [] });
    }
}
