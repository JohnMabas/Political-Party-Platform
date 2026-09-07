import { Link, useParams } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { fmtDateShort } from '../../utils/format'

export default function NewsDetail() {
  const { id } = useParams()
  const { seed } = useStore()
  const article = seed.news.find((n) => String(n.id) === String(id))

  if (!article) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-primary">Article not found</h1>
        <Link to="/news" className="mt-4 inline-block text-accent font-semibold hover:underline">Back to the newsroom</Link>
      </div>
    )
  }

  return (
    <div>
      <section className="border-b border-border bg-surface">
        <div className="container-site py-10 max-w-3xl">
          <Link to="/news" className="text-sm text-ink-muted hover:text-primary">← Newsroom</Link>
          <p className="mt-4 text-xs text-ink-muted">{fmtDateShort(article.date)} · {article.category} · by {article.author}</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-primary leading-tight">{article.title}</h1>
        </div>
      </section>
      <section className="container-site py-10 max-w-3xl">
        <div className="space-y-5 font-serif text-lg leading-relaxed text-ink">
          <p className="text-ink-muted text-base">{article.excerpt}</p>
          <p>{article.body}</p>
        </div>
        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <p className="text-xs text-ink-muted">For media inquiries, contact the <Link to="/contact" className="text-primary hover:underline">press office</Link>.</p>
          <Link to="/volunteer" className="inline-flex items-center bg-accent px-5 py-2.5 text-sm font-semibold text-[#1C2430] hover:bg-accent/90 rounded-sm">Get involved</Link>
        </div>
      </section>
    </div>
  )
}
