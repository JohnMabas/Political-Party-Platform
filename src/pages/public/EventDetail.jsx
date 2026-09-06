import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { Card, StatusBadge } from '../../components/ui'
import { fmtDateShort, fmtTime } from '../../utils/format'

export default function EventDetail() {
  const { id } = useParams()
  const { eventsData, rsvpEvent, currentUser } = useStore()
  const [rsvpData, setRsvpData] = useState({ name: '', email: '' })
  const [done, setDone] = useState(false)
  const event = eventsData.find((e) => String(e.id) === String(id))

  if (!event) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-primary">Event not found</h1>
        <Link to="/events" className="mt-4 inline-block text-accent font-semibold hover:underline">Back to events</Link>
      </div>
    )
  }

  const full = event.rsvps >= event.capacity

  const submit = (e) => {
    e.preventDefault()
    // For demo, treat every RSVP as volunteer user 1
    const pid = currentUser && (currentUser.role === 'volunteer') ? currentUser.id : 1
    rsvpEvent(Number(id), pid)
    setDone(true)
  }

  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-10">
          <Link to="/events" className="text-sm text-white/70 hover:text-white">← All events</Link>
          <div className="mt-4 flex items-center gap-3">
            <StatusBadge status={event.type} />
            <span className="text-sm text-white/70">{fmtDateShort(event.date)} · {fmtTime(event.date)}</span>
          </div>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl sm:text-4xl font-bold text-white">{event.title}</h1>
        </div>
      </section>

      <section className="container-site py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-xl font-bold text-primary">About this event</h2>
          <p className="mt-3 font-serif text-lg leading-relaxed text-ink">{event.description}</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded border border-border bg-surface p-4">
              <h3 className="text-sm font-semibold text-primary">Location</h3>
              <p className="mt-1 text-sm text-ink-muted">{event.location}<br />{event.address}</p>
              <div className="mt-3 rounded-sm border border-border bg-surface-2 p-3 flex items-center justify-center text-sm text-ink-faint" aria-hidden="true">Map placeholder</div>
            </div>
            <div className="rounded border border-border bg-surface p-4">
              <h3 className="text-sm font-semibold text-primary">Hosted by</h3>
              <p className="mt-1 text-sm text-ink">{event.host}</p>
              <h3 className="mt-4 text-sm font-semibold text-primary">Attendance</h3>
              <p className="mt-1 text-sm text-ink-muted">{event.rsvps} of {event.capacity} spots claimed</p>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-sm bg-surface-2 border border-border">
                <div className="h-full bg-community" style={{ width: `${Math.min(100, (event.rsvps / event.capacity) * 100)}%` }} />
              </div>
              <p className="mt-1 text-xs text-ink-muted">{Math.round((event.rsvps / event.capacity) * 100)}% full</p>
            </div>
          </div>
        </div>

        <div>
          <Card className="p-6 sticky top-24">
            {done ? (
              <div>
                <h2 className="font-serif text-lg font-bold text-primary">You\u2019re on the list</h2>
                <p className="mt-2 text-sm text-ink-muted">Thanks — we\u2019ve counted your RSVP and will send a reminder before the event. Find it any time on your My Events page.</p>
              </div>
            ) : full ? (
              <div>
                <h2 className="font-serif text-lg font-bold text-primary">This event is full</h2>
                <p className="mt-2 text-sm text-ink-muted">Add yourself to the waitlist and we\u2019ll let you know if a spot opens up, or join a nearby canvass instead.</p>
                <Link to="/events" className="mt-4 flex w-full items-center justify-center border border-primary px-5 py-2.5 text-sm font-semibold text-primary rounded-sm">See other events</Link>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h2 className="font-serif text-lg font-bold text-primary">RSVP to this event</h2>
                <div className="mt-3 flex items-center justify-between rounded-sm border border-border bg-surface-2 px-3 py-2 text-sm">
                  <span className="text-ink-muted">Spots left</span>
                  <span className="font-semibold text-community">{event.capacity - event.rsvps}</span>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <label htmlFor="rsvp-name" className="mb-1 block text-sm font-medium text-ink">Full name</label>
                    <input id="rsvp-name" required value={rsvpData.name} onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                      placeholder="Your name" className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label htmlFor="rsvp-email" className="mb-1 block text-sm font-medium text-ink">Email</label>
                    <input id="rsvp-email" type="email" required value={rsvpData.email} onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                      placeholder="you@example.com" className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
                <button type="submit" className="mt-4 flex w-full items-center justify-center bg-accent px-5 py-2.5 text-sm font-semibold text-[#1C2430] hover:bg-accent/90 rounded-sm">
                  Save my spot
                </button>
                <p className="mt-2 text-xs text-ink-muted">You\u2019ll see this on your My Events page after signing in.</p>
              </form>
            )}
          </Card>
        </div>
      </section>
    </div>
  )
}
