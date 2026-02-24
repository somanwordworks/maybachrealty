import { useState } from 'react'
export default function Contact(){
  const [sent,setSent]=useState(false)
  function onSubmit(e){e.preventDefault();setSent(true)}
  return (
    <section id="contact" className="section">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-heading text-3xl font-semibold">Let's Talk</h2>
          <p className="text-mid mt-2">Tell us what you're looking for and we'll share a curated list.</p>
          <div className="mt-6 space-y-2 text-sm">
                      <div><strong>Call:</strong> +91 7799277777 </div>
            <div><strong>Email:</strong> hello@maybachrealty.com</div>
            <div><strong>Address:</strong> Financial District, Hyderabad</div>
          </div>
          <a href="https://wa.me/917799277777" target="_blank" className="inline-block mt-4 px-4 py-2 rounded-md border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition">Chat on WhatsApp</a>
        </div>
        <form onSubmit={onSubmit} className="rounded-lg border p-6 bg-white">
          {sent ? <div className="text-green-700">Thanks! We'll get back to you shortly.</div> : <>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Full Name" className="border rounded-md px-3 py-2"/>
              <input required type="tel" placeholder="Phone (with country code)" className="border rounded-md px-3 py-2"/>
            </div>
            <input type="email" placeholder="Email (optional)" className="border rounded-md px-3 py-2 mt-4 w-full"/>
            <textarea placeholder="Message" className="border rounded-md px-3 py-2 mt-4 w-full h-28"/>
            <button className="mt-4 px-5 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700">Send</button>
          </>}
        </form>
      </div>
    </section>
  )
}

