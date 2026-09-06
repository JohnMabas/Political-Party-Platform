import { Link } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { fmtDateShort } from '../../utils/format'

export default function NewsIndex() {
  const { seed } = useStore()
  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/70 italic">News & press</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">Newsroom</h1>
          <p className="mt-3 max-w-2xl text-white/75">Press releases, media coverage, and updates from the campaign and the party.</p>
        </div>
      </section>

      <section className="container-site py-10">
        {seed.news.map((n, idx) => (
          <article key={n.id} className={`mb-0 ${idx > 0 ? 'border-t border-border' : ''}`}>
            <Link to={`/news/${n.id}`} className="block py-6 group">
              <p className="text-xs text-ink-muted">{fmtDateShort(n.date)} · {n.category}</p>
              <h2 className="mt-2 max-w-3xl font-serif text-2xl font-bold text-primary group-hover:text-primary-hov">{n.title}</h2>
              <p className="mt-2 max-w-3xl text-ink-muted">{n.excerpt}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-accent">Read article</span>
            </Link>
          </article>
        ))}
      </section>
    </div>
  )
}
