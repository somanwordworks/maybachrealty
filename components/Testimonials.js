import t from '@/data/testimonials.json'
export default function Testimonials(){
  return (
    <section className="section">
      <h2 className="font-heading text-3xl font-semibold">What Clients Say</h2>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {t.map((it,i)=>(
          <figure key={i} className="rounded-lg border p-6 bg-white">
            <blockquote className="text-lg">"{it.text}"</blockquote>
            <figcaption className="mt-4 text-sm text-mid">- {it.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

