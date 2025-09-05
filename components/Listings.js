import { useEffect, useRef, useState } from 'react'

function Badge({ children }) {
    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-white text-primary-700">
            {children}
        </span>
    )
}

function Chip({ children }) {
    return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs border text-mid">
            {children}
        </span>
    )
}

/** Single listing card with auto-slideshow that pauses on hover */
function ListingCard({ item, eager }) {
    const { id, title, locality, area, price, beds, baths, status, type } = item

    // Prefer all images from API (Airtable "Image" attachments); fall back gracefully
    const images = Array.isArray(item.images) && item.images.length
        ? item.images
        : (item.image ? [item.image] : [
            `https://source.unsplash.com/800x500/?${encodeURIComponent(
                `${locality} hyderabad ${type}`
            )}&sig=${encodeURIComponent(id)}`
        ])

    const [idx, setIdx] = useState(0)
    const [paused, setPaused] = useState(false)
    const timerRef = useRef(null)
    const cardRef = useRef(null)
    const inViewRef = useRef(true) // start true; IntersectionObserver will refine

    // Pause animation when card is off-screen (saves work)
    useEffect(() => {
        const el = cardRef.current
        if (!el) return
        const io = new IntersectionObserver(
            (entries) => { inViewRef.current = entries[0]?.isIntersecting ?? true },
            { root: null, threshold: 0.1 }
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    // Auto-advance every 3.5s; pauses on hover or when off-screen
    useEffect(() => {
        if (images.length <= 1) return
        timerRef.current = setInterval(() => {
            if (!paused && inViewRef.current) {
                setIdx((i) => (i + 1) % images.length)
            }
        }, 3500)
        return () => clearInterval(timerRef.current)
    }, [paused, images.length])

    return (
        <article
            ref={cardRef}
            className="snap-start shrink-0 w-[300px] sm:w-[340px] md:w-[360px] rounded-lg overflow-hidden border hover:shadow transition bg-white"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="relative h-48 w-full bg-gray-100">
                {/* Fade-in for current image */}
                <img
                    key={images[idx]}
                    src={images[idx]}
                    alt={title}
                    width={800}
                    height={500}
                    loading={eager ? 'eager' : 'lazy'}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500"
                    onLoad={(e) => { e.currentTarget.style.opacity = 1 }}
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 space-x-2">
                    {status ? <Badge>{status}</Badge> : null}
                    {type ? <Badge>{type}</Badge> : null}
                </div>

                {/* Pagination dots */}
                {images.length > 1 && (
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                        {images.map((_, i) => (
                            <span
                                key={i}
                                className={`h-1.5 w-1.5 rounded-full ${i === idx ? 'bg-white' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-mid mt-1">{locality} • {area}</p>

                {/* Labels row: BHK • Bath • Area */}
                <div className="mt-3 flex flex-wrap gap-2">
                    {typeof beds === 'number' && beds > 0 && <Chip>{beds} BHK</Chip>}
                    {typeof baths === 'number' && baths > 0 && <Chip>{baths} Bath</Chip>}
                    {area && <Chip>{area}</Chip>}
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div className="font-semibold text-primary-700">{price}</div>
                </div>
            </div>
        </article>
    )
}

export default function Listings() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let alive = true
            ; (async () => {
                try {
                    const r = await fetch('/api/listings')
                    const json = await r.json()
                    if (alive) setData(json.records || [])
                } catch (e) {
                    console.error(e)
                } finally {
                    if (alive) setLoading(false)
                }
            })()
        return () => { alive = false }
    }, [])

    return (
        <section id="listings" className="section">
            <div className="flex items-baseline justify-between">
                <div>
                    <h2 className="font-heading text-3xl font-semibold">Featured Listings</h2>
                    <p className="text-mid mt-1">Handpicked properties available this week.</p>
                </div>
            </div>

            {/* Horizontal scroll row */}
            <div
                className="mt-8 overflow-x-auto pb-4 -mx-4 sm:-mx-6 lg:-mx-8"
                style={{ scrollSnapType: 'x mandatory' }}
            >
                <div className="px-4 sm:px-6 lg:px-8 flex gap-6">
                    {(loading ? Array.from({ length: 6 }) : data).map((it, i) =>
                        loading ? (
                            <div
                                key={i}
                                className="snap-start shrink-0 w-[300px] sm:w-[340px] md:w-[360px] rounded-lg overflow-hidden border bg-white"
                            >
                                <div className="h-48 w-full animate-pulse bg-gray-100" />
                                <div className="p-4">
                                    <div className="h-5 w-40 bg-gray-100 rounded animate-pulse" />
                                    <div className="h-4 w-28 bg-gray-100 rounded mt-2 animate-pulse" />
                                    <div className="h-4 w-32 bg-gray-100 rounded mt-4 animate-pulse" />
                                </div>
                            </div>
                        ) : (
                            <ListingCard key={it.id} item={it} eager={i < 3} />
                        )
                    )}
                </div>
            </div>
        </section>
    )
}

