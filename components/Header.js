import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
    const [logoOk, setLogoOk] = useState(true)

    return (
        <header className="z-50 bg-white border-b border-gray-100">
            <div className="section flex items-center justify-between py-6">
                {/* Logo block */}
                <div className="flex items-center gap-3" style={{ height: 88 }}>
                    {logoOk ? (
                        <div className="h-full flex items-center">
                            <Image
                                src="/maybach-logo.png"           // your file in /public
                                alt="Maybach Realty"
                                width={480}                        // intrinsic (not visible size)
                                height={180}
                                priority
                                // Fill the header height, then scale up to counter whitespace
                                className="h-full w-auto object-contain scale-[1.8] origin-left"
                                onError={() => setLogoOk(false)}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <span className="font-extrabold tracking-wide text-2xl">MAYBACH&nbsp;</span>
                            <span className="font-extrabold tracking-wide text-2xl text-primary-700">REALTY</span>
                        </div>
                    )}
                </div>

                {/* Nav */}
                <nav className="hidden md:flex items-center gap-8 text-base font-medium">
                    <a href="#listings" className="hover:text-primary-700">Listings</a>
                    <a href="#about" className="hover:text-primary-700">About</a>
                    <a href="#categories" className="hover:text-primary-700">Categories</a>
                    <a href="#team" className="hover:text-primary-700">Team</a>
                    <a href="#contact" className="hover:text-primary-700">Contact</a>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://wa.me/918886688888"
                        target="_blank"
                        className="hidden sm:inline-block px-5 py-2 rounded-md border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition"
                    >
                        WhatsApp
                    </a>
                    <a
                        href="#contact"
                        className="px-5 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition"
                    >
                        Schedule Visit
                    </a>
                </div>
            </div>
        </header>
    )
}
