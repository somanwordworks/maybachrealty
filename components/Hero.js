export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-primary-600">
            {/* Background pattern overlay */}
            <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "var(--bg-pattern)" }}
            />

            <div className="relative text-white py-12 lg:py-16 grid lg:grid-cols-2 gap-8 items-center section">
                {/* Left Content */}
                <div className="max-w-2xl">
                    <h1 className="font-heading text-4xl sm:text-5xl font-semibold leading-tight">
                        Your Link to Luxury Living
                    </h1>
                    <p className="mt-5 text-lg/8 text-white/90">
                        Premium villas, townhomes, and apartments — curated by Maybach
                        Realty. Developer-direct pricing. Zero guesswork.
                    </p>
                    <div className="mt-8 flex items-center gap-3">
                        <a
                            href="#listings"
                            className="px-6 py-3 rounded-md bg-white text-primary-700 font-medium hover:opacity-90"
                        >
                            View Listings
                        </a>
                        <a
                            href="#contact"
                            className="px-6 py-3 rounded-md border border-white/80 hover:bg-white/10"
                        >
                            Talk to an Advisor
                        </a>
                    </div>
                    <div className="mt-6 text-sm text-white/80">
                        Over <strong>20,000+</strong> guided decisions
                    </div>
                </div>

                {/* Right Video */}
                <div className="relative w-full h-[280px] lg:h-[360px]">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover rounded-lg"
                    >
                        <source src="/office-walkthrough.webm" type="video/webm" />
                        <source src="/office-walkthrough.mp4" type="video/mp4" />
                        Sorry, your browser doesn’t support embedded videos.
                    </video>
                </div>
            </div>
        </section>
    );
}
