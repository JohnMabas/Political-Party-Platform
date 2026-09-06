import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, StatusBadge } from '../../components/ui'
import { useEvents } from '../../services/campaign'
import { fmtTime } from '../../utils/format'

export default function EventsIndex() {
  const { upcoming } = useEvents()
  const [filter, setFilter] = useState('All')

  const types = ['All', ...new Set(upcoming.map((e) => e.type))]
  const filtered = filter === 'All' ? upcoming : upcoming.filter((e) => e.type === filter)

  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/70 italic">Events</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">Rallies, town halls, and shifts you can join</h1>
          <p className="mt-3 max-w-2xl text-white/75">
            RSVP to an event to save your spot — most have open volunteer slots for the day of.
          </p>
        </div>
      </section>

      <section className="container-site py-10">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter events by type">
          {types.map((t) => (
            <button key={t} type="button" onClick={() => setFilter(t)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                filter === t ? 'bg-primary text-white' : 'bg-surface border border-border text-ink-muted hover:text-primary'}`}
              aria-pressed={filter === t}>
              {t}
            </button>
          ))}
        </div>

        <ul className="mt-6 space-y-4">
          {filtered.length === 0 && <p className="text-ink-muted">No {filter.toLowerCase()} events right now.</p>}
          {filtered.map((e) => (
            <li key={e.id}>
              <Link to={`/events/${e.id}`} className="block">
                <Card className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 hover:border-primary/40 transition-colors">
                  <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-sm border border-border bg-surface-2 text-center">
                    <span className="font-serif text-lg font-bold text-primary leading-none">{new Date(e.date).getDate()}</span>
                    <span className="text-[0.65rem] text-ink-muted">{new Date(e.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={e.type} />
                      <span className="text-xs text-ink-muted">{fmtTime(e.date)}</span>
                    </div>
                    <h2 className="mt-1 font-serif text-lg font-bold text-primary group-hover:text-primary-hov">{e.title}</h2>
                    <p className="mt-0.5 text-sm text-ink-muted truncate">{e.location}</p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <span className="text-sm font-semibold text-community">{e.rsvps} / {e.capacity} RSVP\u2019d</span>
                    <span className="text-sm font-medium text-accent">View & RSVP</span>
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
