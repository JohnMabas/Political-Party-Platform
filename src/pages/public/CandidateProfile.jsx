import { Link, useParams } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { Card } from '../../components/ui'
import { fmtDateShort, fmtTime } from '../../utils/format'

export default function CandidateProfile() {
  const { slug } = useParams()
  const { seed, eventsData } = useStore()
  const c = seed.candidates.find((x) => x.slug === slug)

  if (!c) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-primary">Candidate not found</h1>
        <Link to="/candidates" className="mt-4 inline-block text-accent font-semibold hover:underline">Back to candidates</Link>
      </div>
    )
  }

  const candidateEvents = eventsData.filter((e) => (c.events || []).includes(e.title))

  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <Link to="/candidates" className="text-sm text-white/70 hover:text-white">← All candidates</Link>
          <div className="mt-6 flex flex-col sm:flex-row items-start gap-6">
            <img
              src={c.photo}
              alt={`Portrait of ${c.name}`}
              className="h-40 w-32 flex-shrink-0 rounded-2xl shadow-md ring-1 ring-white/20 object-cover object-top"
            />
            <div>
              <p className="font-serif text-lg text-white/70 italic">{c.race}</p>
              <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-white">{c.name}</h1>
              <p className="mt-2 max-w-2xl text-white/75">{c.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/volunteer" className="inline-flex items-center bg-accent px-5 py-2.5 text-sm font-semibold text-[#1C2430] hover:bg-accent/90 rounded-sm">Volunteer with us</Link>
                <Link to={`/events`} className="inline-flex items-center border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 rounded-sm">Find an event</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-10 max-w-3xl">
        <h2 className="font-serif text-xl font-bold text-primary">About {c.name.split(' ')[0]}</h2>
        <div className="mt-3 space-y-4 font-serif text-lg leading-relaxed text-ink">
          {c.bio.split(/\n\n/).map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className="mt-8 rounded border border-border bg-surface-2 p-6">
          <h2 className="font-serif text-lg font-bold text-primary">Endorsed by</h2>
          <ul className="mt-3 space-y-2">
            {c.endorsements.map((e) => (
              <li key={e} className="flex items-center gap-3 text-sm text-ink-muted">
                <span aria-hidden="true" className="text-community">✓</span>{e}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="font-serif text-lg font-bold text-primary">Campaign events</h2>
          {candidateEvents.length === 0 ? (
            <p className="mt-2 text-sm text-ink-muted">Events for this candidate\u2019s race are being posted. Check back soon.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {candidateEvents.map((e) => (
                <li key={e.id}>
                  <Link to={`/events/${e.id}`} className="block">
                    <Card className="p-4 hover:border-primary/40 transition-colors">
                      <h3 className="font-serif text-base font-bold text-primary">{e.title}</h3>
                      <p className="mt-1 text-sm text-ink-muted">{fmtDateShort(e.date)} · {fmtTime(e.date)} · {e.location}</p>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
