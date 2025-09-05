import Head from 'next/head'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Listings from '@/components/Listings'
import AboutStrip from '@/components/AboutStrip'
import Categories from '@/components/Categories'
import Team from '@/components/Team'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import HorizontalIcons from '@/components/HorizontalIcons'
import RealtyNewsBlock from '@/components/RealtyNewsBlock'
import InteriorGallery from "../components/InteriorGallery"
import PageBlock from "@/components/PageBlock"   // ✅ wrapper for consistency

export default function Home() {
    return (
        <>
            <Head>
                <title>Maybach Realty — Luxury Real Estate</title>
                <meta
                    name="description"
                    content="Premium villas, townhomes, and apartments — curated by Maybach Realty."
                />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <Header />

            <main>
                {/* Hero */}
                <Hero />

                {/* Horizontal scrolling icons */}
                <section className="bg-white py-6">
                    <HorizontalIcons speed={25} />
                </section>

                {/* About Strip */}
                <AboutStrip />

                {/* Featured Listings */}
                <section className="max-w-7xl mx-auto px-4 py-8">
                    <PageBlock>
                        <Listings />
                    </PageBlock>
                </section>

                {/* Categories + Interior Gallery + Real Estate News */}
                <section className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Left: What are you looking for */}
                        <div className="bg-white/70 rounded-xl shadow-sm p-6 flex flex-col">
                            <h2 className="text-2xl font-bold mb-4">What are you looking for?</h2>
                            <Categories />
                        </div>

                        {/* Middle: Interior Gallery */}
                        <div className="bg-white/70 rounded-xl shadow-sm p-6 flex flex-col">
                            <h2 className="text-2xl font-bold mb-4">Interior Gallery</h2>
                            <InteriorGallery />
                        </div>

                        {/* Right: Real Estate News */}
                        <div className="bg-white/70 rounded-xl shadow-sm p-6 flex flex-col">
                            <h2 className="text-2xl font-bold mb-4">Real Estate News</h2>
                            <RealtyNewsBlock />
                        </div>

                    </div>
                </section>


                {/* Team */}
                <section className="max-w-7xl mx-auto px-4 py-8">
                    <PageBlock>
                        <Team />
                    </PageBlock>
                </section>

                {/* Testimonials */}
                <section className="max-w-7xl mx-auto px-4 py-8">
                    <PageBlock>
                        <Testimonials />
                    </PageBlock>
                </section>

                {/* Contact */}
                <section className="max-w-7xl mx-auto px-4 py-8">
                    <PageBlock>
                        <Contact />
                    </PageBlock>
                </section>
            </main>

            <Footer />
        </>
    )
}
