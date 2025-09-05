export default function Categories() {
    const items = [
        {
            title: "Co-Working Spaces",
            desc: "Modern shared workspaces in prime business hubs.",
            hover: "Flexible coworking rentals • Private cabins • Shared desks • Collaboration hubs",
            link: "#",
        },
        {
            title: "Commercial Spaces",
            desc: "Spaces for retail, showrooms, and business use.",
            hover: "Retail & showroom rentals • Commercial investments • Land acquisition for development",
            link: "#",
        },
        {
            title: "Offices",
            desc: "Grade-A corporate office spaces for growth.",
            hover: "Office space sales • Office rentals • Corporate leasing solutions",
            link: "#",
        },
    ];

    return (
        <section className="h-full flex flex-col justify-between">
            {/* Vertical stack of cards */}
            <div className="flex-1 grid grid-cols-1 gap-4">
                {items.map((item) => (
                    <a
                        key={item.title}
                        href={item.link}
                        className="relative border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-red-50 group overflow-hidden"
                    >
                        {/* Normal Content */}
                        <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.desc}</p>
                            <span className="text-red-600 text-sm font-medium">Explore →</span>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-70 text-white flex items-center justify-center text-center p-4 opacity-0 group-hover:opacity-100 transition">
                            <p className="text-sm">{item.hover}</p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
