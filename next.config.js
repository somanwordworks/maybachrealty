/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // Airtable attachment CDNs
            { protocol: 'https', hostname: 'v5.airtableusercontent.com' },
            { protocol: 'https', hostname: 'dl.airtable.com' },

            // If you still use these fallbacks
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'source.unsplash.com' },
            { protocol: 'https', hostname: 'picsum.photos' }
        ]
    }
    // If images still won’t render during dev behind a proxy/VPN, try:
    // , experimental: { images: { unoptimized: true } }
};

module.exports = nextConfig;
