// lib/fetchRealtyNews.js
import { parseStringPromise } from "xml2js";

const feeds = [
    { url: "https://www.worldpropertyjournal.com/rss/rss.xml", source: "World Property Journal" },
    { url: "https://housing.com/news/feed/", source: "Housing.com" },
    { url: "https://propertywire.com/feed/", source: "PropertyWire" }
];

// Regex to extract first <img src="..."> from description or content
function extractImage(html) {
    const match = html?.match(/<img[^>]+src="([^">]+)"/i);
    return match ? match[1] : null;
}

export async function getRealtyNews() {
    let allNews = [];

    for (const feed of feeds) {
        try {
            const res = await fetch(feed.url);
            const text = await res.text();
            const data = await parseStringPromise(text, { explicitArray: false });

            const items = data?.rss?.channel?.item || [];

            const mapped = items.map(item => {
                const image =
                    item?.enclosure?.$?.url ||
                    item?.["media:content"]?.$?.url ||
                    item?.["media:thumbnail"]?.$?.url ||
                    extractImage(item?.description || item?.["content:encoded"]) ||
                    "/news-placeholder.jpg";

                return {
                    title: item.title,
                    link: item.link,
                    date: item.pubDate,
                    image,
                    source: feed.source,
                    description: item.description || ""
                };
            });

            allNews = [...allNews, ...mapped];
        } catch (err) {
            console.error("Feed error:", feed.url, err.message);
        }
    }

    // 🔹 Debug: print all titles to server logs
    console.log("DEBUG - RAW NEWS TITLES:");
    allNews.forEach(n => {
        console.log(`[${n.source}] ${n.title}`);
    });

    // Temporarily: return everything (no filter)
    return allNews
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 12);
}
