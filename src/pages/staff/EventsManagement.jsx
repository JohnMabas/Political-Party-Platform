import { useState } from 'react'
import { useStore } from '../../store/Store'
import { Card, StatusBadge } from '../../components/ui'
import { fmtDateShort, fmtTime } from '../../utils/format'

export default function EventsManagement() {
  const { eventsData, addEvent, checkIn, checkins, rsvps, peopleData } = useStore()
  const [view, setView] = useState(null) // event id
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', type: 'Canvass', date: '2026-10-15T18:00', location: '', description: '', capacity: 50 })
  const [reminderSent, setReminderSent] = useState({})

  const createEvent = (e) => {
    e.preventDefault()
    addEvent({ ...form, host: 'Campaign HQ', rsvps: 0, attendees: [] })
    setShowForm(false)
    setForm({ title: '', type: 'Canvass', date: '2026-10-15T18:00', location: '', description: '', capacity: 50 })
  }

  const attendeesFor = (id) => {
    const ids = rsvps.filter((r) => r.eventId === id).map((r) => r.personId)
    return ids.map((pid) => peopleData.find((p) => p.id === pid)).filter(Boolean)
  }

  return (
    <div>
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Events management</h1>
          <p className="mt-1 text-ink-muted">Create events, track RSVPs and check-ins, and remind attendees.</p>
        </div>
        <button type="button" onClick={() => setShowForm(!showForm)} className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hov">
          {showForm ? 'Close form' : '+ New event'}
        </button>
      </header>

      {showForm && (
        <Card className="mt-6 p-6">
          <h2 className="font-serif text-lg font-bold text-primary">Create an event</h2>
          <form onSubmit={createEvent} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="ev-title" className="mb-1 block text-sm font-medium text-ink">Title</label>
              <input id="ev-title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="ev-type" className="mb-1 block text-sm font-medium text-ink">Type</label>
              <select id="ev-type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                {['Canvass', 'Phone Bank', 'Town Hall', 'Rally', 'Forum'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="ev-cap" className="mb-1 block text-sm font-medium text-ink">Capacity</label>
              <input id="ev-cap" type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="ev-date" className="mb-1 block text-sm font-medium text-ink">Date & time</label>
              <input id="ev-date" type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="ev-loc" className="mb-1 block text-sm font-medium text-ink">Location</label>
              <input id="ev-loc" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="ev-desc" className="mb-1 block text-sm font-medium text-ink">Description</label>
              <textarea id="ev-desc" rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="rounded-sm bg-accent px-5 py-2 text-sm font-semibold text-[#1C2430] hover:bg-accent/90">Create event</button>
            </div>
          </form>
        </Card>
      )}

      <div className="mt-6 space-y-4">
        {eventsData.map((e) => {
          const attendees = attendeesFor(e.id)
          const checked = checkins.filter((c) => c.eventId === e.id).length
          return (
            <Card key={e.id} className="p-5">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={e.type} />
                    <span className="text-xs text-ink-muted">{fmtDateShort(e.date)} · {fmtTime(e.date)}</span>
                  </div>
                  <h2 className="mt-1 font-serif text-lg font-bold text-primary">{e.title}</h2>
                  <p className="text-sm text-ink-muted">{e.location}</p>
                </div>
                <button type="button" onClick={() => setView(view === e.id ? null : e.id)}
                  className="rounded-sm border border-border bg-surface px-4 py-2 text-sm font-medium text-primary hover:bg-surface-2">
                  {view === e.id ? 'Hide' : 'RSVPs & check-in'}
                </button>
              </div>

              {view === e.id && (
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="rounded-sm border border-border bg-surface-2 px-3 py-1"><strong className="text-ink">{e.rsvps}</strong> <span className="text-ink-muted">RSVP\u2019d</span></span>
                    <span className="rounded-sm border border-border bg-surface-2 px-3 py-1"><strong className="text-ink">{checked}</strong> <span className="text-ink-muted">checked in</span></span>
                  </div>

                  {attendees.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-ink mb-2">Attendee list</p>
                      <ul className="divide-y divide-border border-y border-border">
                        {attendees.map((a) => {
                          const isChecked = checkins.some((c) => c.eventId === e.id && c.personId === a.id)
                          return (
                            <li key={a.id} className="py-2 flex items-center justify-between gap-2">
                              <div>
                                <p className="text-sm font-medium text-ink">{a.name}</p>
                                <p className="text-xs text-ink-muted">{a.district}</p>
                              </div>
                              {isChecked ? (
                                <StatusBadge status="Checked in" />
                              ) : (
                                <button type="button" onClick={() => checkIn(e.id, a.id)}
                                  className="rounded-sm border border-community px-3 py-1 text-xs font-semibold text-community hover:bg-community-tint">
                                  Check in
                                </button>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button"
                      onClick={() => setReminderSent((prev) => ({ ...prev, [e.id]: true }))}
                      className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hov">
                      {reminderSent[e.id] ? 'Reminder sent' : 'Send reminder email'}
                    </button>
                    <a href={`/staff/outreach`} className="rounded-sm border border-border bg-surface px-4 py-2 text-sm font-medium text-primary hover:bg-surface-2">Message attendees</a>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
