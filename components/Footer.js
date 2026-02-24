export default function Footer(){
  return (
    <footer className="bg-ink text-white">
      <div className="section">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Left section */}
          <div className="flex flex-col">
            <div className="font-heading font-semibold tracking-wide">
              MAYBACH REALTY
            </div>

            {/* Your new line */}
            <div
              className="opacity-40 mt-1"
              style={{
                  fontFamily: 'BankGothicLtBTLight',
                letterSpacing: '0.16em',
                textTransform: 'uppercase'
              }}
            >
              A DNV ARC DIGITAL EXPERIENCE
            </div>
          </div>

          {/* Right copyright */}
          <div className="text-sm text-white/50">
            © {new Date().getFullYear()} Maybach Realty. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  )
}
