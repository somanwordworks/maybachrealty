/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#F9D6D8",
                    600: "#D61F26",
                    700: "#B8161C"
                },
                ink: "#101113",
                charcoal: "#1E2329",
                mid: "#6B7280",
                gold: "#F1D04B"
            },
            fontFamily: {
                heading: ["Poppins", "ui-sans-serif", "system-ui"],
                body: ["Inter", "ui-sans-serif", "system-ui"]
            }
        }
    },
    plugins: [
        require("tailwind-scrollbar-hide") // ⬅️ Added plugin
    ]
}
