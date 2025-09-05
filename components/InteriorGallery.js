import { useEffect, useState } from "react";

export default function InteriorGallery() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/interiors?ts=" + Date.now())
            .then((res) => res.json())
            .then((data) => setPhotos(data.photos || []))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="mt-6">
            
            <div className="h-[500px] overflow-y-auto pr-2">
                {loading ? (
                    <p className="text-gray-500 italic">Loading inspiration…</p>
                ) : photos.length === 0 ? (
                    <p className="text-gray-500 italic">No interiors available</p>
                ) : (
                    <div className="flex flex-col space-y-4">
                        {photos.map((photo) => (
                            <div
                                key={photo.id}
                                className="bg-white rounded-lg shadow-sm overflow-hidden"
                            >
                                <img
                                    src={photo.preview}
                                    alt="Interior"
                                    className="w-full h-[200px] object-cover"
                                />
                                <div className="p-2 flex justify-between items-center">
                                    <span className="text-xs text-gray-500 truncate">
                                        {photo.photographer || "Unknown"}
                                    </span>
                                    <a
                                        href={photo.url}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-red-600 font-semibold hover:underline"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
