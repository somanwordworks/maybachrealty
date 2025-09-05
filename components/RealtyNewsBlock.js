import { useEffect, useState } from "react";

export default function RealtyNewsBlock() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/realty-news?ts=" + Date.now())
            .then((res) => res.json())
            .then((data) => setNews(data || []))
            .catch((err) => console.error("News fetch error:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm h-full flex flex-col">
     


            {loading ? (
                <p className="text-gray-500 italic">Loading news…</p>
            ) : news.length === 0 ? (
                <p className="text-gray-500 italic">No news available</p>
            ) : (
                <div
                    className="space-y-4 overflow-y-auto pr-2"
                    style={{ maxHeight: "600px" }}
                >
                    {news.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                        >
                            {/* Thumbnail */}
                            <img
                                src={item.image || "/news-placeholder.png"}
                                alt={item.title}
                                className="w-20 h-16 object-cover rounded-md flex-shrink-0"
                            />

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-base font-medium text-gray-800 line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">{item.source}</p>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </section>
    );
}
