import { Link } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { Card } from '../../components/ui'

export default function CandidatesIndex() {
  const { seed } = useStore()
  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/70 italic">Candidates</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">Our 2026–27 slate</h1>
          <p className="mt-3 max-w-2xl text-white/75">
            From the Senate to the Local Government Council, these candidates committed to our written platform — and to the accountable, people-powered way we run.
          </p>
        </div>
      </section>

      <section className="container-site py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {seed.candidates.map((c) => (
            <Link key={c.slug} to={`/candidates/${c.slug}`} className="group">
              <Card className="flex gap-5 p-5 transition-colors hover:border-primary/40">
                <img
                  src={c.photo}
                  alt={`Portrait of ${c.name}`}
                  className="hidden sm:block h-20 w-16 flex-shrink-0 rounded-xl shadow-sm ring-1 ring-border object-cover"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wide">{c.race}</p>
                  <h2 className="mt-1 font-serif text-xl font-bold text-primary group-hover:text-primary-hov">{c.name}</h2>
                  <p className="mt-1 text-sm text-ink-muted leading-relaxed">{c.tagline}</p>
                  <p className="mt-2 text-sm font-semibold text-accent">View profile</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
