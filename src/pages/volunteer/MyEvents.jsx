import { useState } from 'react'
import { useStore } from '../../store/Store'
import { Card, StatusBadge } from '../../components/ui'
import { fmtDateShort, fmtTime, daysUntil } from '../../utils/format'

export default function MyEvents() {
  const { currentUserRsvps, checkins } = useStore()
  const [activeEvent, setActiveEvent] = useState(null)

  const now = new Date()
  const upcoming = currentUserRsvps.filter((e) => new Date(e.date) > now)
  const past = currentUserRsvps.filter((e) => new Date(e.date) <= now)

  const checkedIn = (eventId) => checkins.some((c) => c.eventId === eventId)

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">My events</h1>
        <p className="mt-1 text-ink-muted">Events you\u2019ve RSVP\u2019d to, and your attendance history.</p>
      </header>

      <h2 className="mt-6 font-serif text-lg font-bold text-primary">Upcoming ({upcoming.length})</h2>
      <div className="mt-3 space-y-3">
        {upcoming.length === 0 && <Card className="p-5 text-sm text-ink-muted">Nothing booked yet — <a href="/events" className="text-primary font-semibold hover:underline">find an event</a>.</Card>}
        {upcoming.map((e) => (
          <Card key={e.id} className="p-4">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2">
                  <StatusBadge status="RSVP\u2019d" />
                  <span className="text-xs text-ink-muted">{fmtDateShort(e.date)} · {fmtTime(e.date)}</span>
                </div>
                <h3 className="mt-1 font-serif text-lg font-bold text-primary">{e.title}</h3>
                <p className="text-sm text-ink-muted">{e.location}</p>
              </div>
              <button type="button" onClick={() => setActiveEvent(activeEvent === e.id ? null : e.id)}
                className="rounded-sm border border-border bg-surface px-3 py-1.5 text-sm font-medium text-primary hover:bg-surface-2">
                {activeEvent === e.id ? 'Hide details' : 'Details'}
              </button>
            </div>
            {activeEvent === e.id && (
              <div className="mt-3 border-t border-border pt-3 text-sm">
                <p className="text-ink-muted">{e.description}</p>
                <p className="mt-2 text-xs text-ink-muted">
                  Day-of check-in: tell the volunteer desk your name. {daysUntil(e.date) >= 0 ? `${daysUntil(e.date)} days to go.` : ''}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      <h2 className="mt-8 font-serif text-lg font-bold text-primary">Attendance history ({past.length})</h2>
      <div className="mt-3 space-y-3">
        {past.length === 0 && <p className="text-sm text-ink-muted">No past events yet.</p>}
        {past.map((e) => (
          <Card key={e.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-primary">{e.title}</p>
                <p className="text-xs text-ink-muted">{fmtDateShort(e.date)} · {e.location}</p>
              </div>
              <StatusBadge status={checkedIn(e.id) ? 'Checked in' : 'Completed'} />
            </div>
            {activeEvent === e.id && <p className="mt-3 text-sm text-ink-muted border-t border-border pt-3">{e.description}</p>}
          </Card>
        ))}
      </div>
    </div>
  )
}
