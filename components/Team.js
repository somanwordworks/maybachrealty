// components/Team.js
import team from '@/data/team.json'

function normalizePhone(p = '') {
    const digits = (p.match(/\d/g) || []).join('')
    if (!digits) return ''
    return digits.startsWith('91') ? digits : `91${digits}`
}

export default function Team() {
    return (
        <section id="team" className="section">
            <h2 className="font-heading text-3xl font-semibold">Your Advisors</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {team.map((m, idx) => {
                    const wa = normalizePhone(m.phone)
                    return (
                        <article
                            key={`${m.name}-${idx}`}
                            className="rounded-lg overflow-hidden border bg-white/70 backdrop-blur hover:shadow transition"
                        >
                            {/* Force consistent image size for all advisors */}
                            <div className="relative w-full h-72 bg-gray-100">
                                <img
                                    src={m.photo}
                                    alt={m.name}
                                    className="absolute inset-0 h-full w-full object-cover object-top"
                                    loading="lazy"
                                    onError={(e) => {
                                        const q = encodeURIComponent(`${m.name} professional portrait`)
                                        e.currentTarget.src = `https://source.unsplash.com/800x600/?portrait,indian&sig=${q}`
                                    }}
                                />
                            </div>

                            <div className="p-4">
                                <h3 className="font-medium">{m.name}</h3>
                                <p className="text-sm text-mid mt-1">{m.role}</p>

                                <div className="mt-3">
                                    {wa ? (
                                        <a
                                            href={`https://wa.me/${wa}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block px-3 py-1.5 rounded border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white text-sm transition"
                                        >
                                            WhatsApp
                                        </a>
                                    ) : (
                                        <span className="inline-block px-3 py-1.5 rounded border text-sm text-mid">
                                            No WhatsApp
                                        </span>
                                    )}
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
