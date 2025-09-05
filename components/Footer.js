export default function Footer(){
  return (
    <footer className="bg-ink text-white">
      <div className="section">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="font-heading font-semibold tracking-wide">MAYBACH REALTY</div>
          <div className="text-sm text-white/70">Â© {new Date().getFullYear()} Maybach Realty. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

