import { Link, useParams } from 'react-router-dom'
import { useStore } from '../../store/Store'

export default function IssueDetail() {
  const { slug } = useParams()
  const { seed } = useStore()
  const issue = seed.platformIssues.find((i) => i.slug === slug)

  if (!issue) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-primary">Issue not found</h1>
        <Link to="/platform" className="mt-4 inline-block text-accent font-semibold hover:underline">Back to the platform</Link>
      </div>
    )
  }

  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-10">
          <Link to="/platform" className="text-sm text-white/70 hover:text-white">← Back to the platform</Link>
          <p className="mt-4 font-serif text-lg text-white/70 italic">{issue.title}</p>
          <h1 className="mt-1 max-w-3xl font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">{issue.headline}</h1>
        </div>
      </section>

      <section className="container-site py-10 max-w-3xl">
        <h2 className="font-serif text-xl font-bold text-primary">Our position</h2>
        <div className="mt-3 space-y-4 font-serif text-lg leading-relaxed text-ink">
          {issue.position.split(/\n\n/).map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className="mt-8 rounded border border-border bg-surface-2 p-6">
          <h2 className="font-serif text-lg font-bold text-primary">Supporting facts</h2>
          <ul className="mt-3 space-y-3">
            {issue.facts.map((f, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink-muted">
                <span aria-hidden="true" className="text-accent">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="font-serif text-lg font-bold text-primary">Related news</h2>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {(issue.relatedNews || []).map((n) => (
              <li key={n} className="py-3 text-sm font-medium text-primary hover:underline underline-offset-4">{n}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 rounded border border-border bg-surface p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-primary">Ready to act on this issue?</h2>
            <p className="text-sm text-ink-muted mt-1">Volunteer on a canvass near you or make a contribution that keeps the work going.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/volunteer" className="inline-flex items-center border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-sm">Volunteer</Link>
            <Link to="/donate" className="inline-flex items-center bg-accent px-4 py-2 text-sm font-semibold text-[#1C2430] hover:bg-accent/90 rounded-sm">Donate</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
