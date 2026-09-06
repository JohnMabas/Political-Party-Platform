import { useState } from 'react'
import { useStore } from '../../store/Store'
import { Card, StatusBadge } from '../../components/ui'
import { fmtDateShort } from '../../utils/format'

export default function Outreach() {
  const { seed, peopleData } = useStore()
  const [compose, setCompose] = useState(false)
  const [form, setForm] = useState({ channel: 'Email', segment: 'Active volunteers', subject: '', body: '' })
  const [sent, setSent] = useState([])

  const segments = ['Active volunteers', 'All supporters', 'Canvassers', 'Donors', 'Pending volunteers', 'Events RSVP\u2019d']

  const send = (e) => {
    e.preventDefault()
    const recipients = form.segment === 'Active volunteers' ? peopleData.filter((p) => p.volunteerStatus === 'Active').length
      : form.segment === 'Donors' ? peopleData.filter((p) => p.donorStatus !== 'Non-donor').length
      : peopleData.length
    setSent((prev) => [{
      id: prev.length + 1, channel: form.channel, subject: form.subject || '(no subject)', segment: form.segment,
      sent: new Date().toISOString().slice(0, 10), recipients,
      opens: Math.round(recipients * 0.7), clicks: Math.round(recipients * 0.4), replies: 0,
    }, ...prev])
    setCompose(false)
    setForm({ channel: 'Email', segment: 'Active volunteers', subject: '', body: '' })
  }

  const all = [...sent, ...seed.outreachMessages]

  return (
    <div>
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Outreach — email & SMS</h1>
          <p className="mt-1 text-ink-muted">Blast a supporter segment and watch the response.</p>
        </div>
        <button type="button" onClick={() => setCompose(!compose)} className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hov">
          {compose ? 'Close' : '+ Compose blast'}
        </button>
      </header>

      {compose && (
        <Card className="mt-6 p-6">
          <h2 className="font-serif text-lg font-bold text-primary">Compose a message</h2>
          <form onSubmit={send} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="o-channel" className="mb-1 block text-sm font-medium text-ink">Channel</label>
                <select id="o-channel" value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>Email</option><option>SMS</option>
                </select>
              </div>
              <div>
                <label htmlFor="o-seg" className="mb-1 block text-sm font-medium text-ink">Segment</label>
                <select id="o-seg" value={form.segment} onChange={(e) => setForm({ ...form, segment: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                  {segments.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="o-subject" className="mb-1 block text-sm font-medium text-ink">Subject / first line</label>
              <input id="o-subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="o-body" className="mb-1 block text-sm font-medium text-ink">Body</label>
              <textarea id="o-body" rows="5" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <button type="submit" className="rounded-sm bg-accent px-5 py-2 text-sm font-semibold text-[#1C2430] hover:bg-accent/90">Send to segment</button>
          </form>
        </Card>
      )}

      <h2 className="mt-6 font-serif text-lg font-bold text-primary">Sent history</h2>
      <div className="mt-3 overflow-x-auto rounded border border-border bg-surface">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="bg-surface-2 text-left text-xs uppercase tracking-wide text-ink-muted sticky top-0">
              <th className="px-4 py-2.5 font-medium">Subject</th>
              <th className="px-4 py-2.5 font-medium">Channel</th>
              <th className="px-4 py-2.5 font-medium">Segment</th>
              <th className="px-4 py-2.5 font-medium">Sent</th>
              <th className="px-4 py-2.5 font-medium">Recipients</th>
              <th className="px-4 py-2.5 font-medium">Opens</th>
              <th className="px-4 py-2.5 font-medium">Clicks</th>
              <th className="px-4 py-2.5 font-medium">Replies</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {all.map((m) => (
              <tr key={m.id} className="odd:bg-surface even:bg-surface-2">
                <td className="px-4 py-2.5 font-medium text-ink">{m.subject}</td>
                <td className="px-4 py-2.5"><StatusBadge status={m.channel === 'SMS' ? 'SMS' : 'Email'} /></td>
                <td className="px-4 py-2.5 text-ink-muted">{m.segment}</td>
                <td className="px-4 py-2.5 text-ink-muted">{fmtDateShort(m.sent)}</td>
                <td className="px-4 py-2.5 tabular-nums">{m.recipients}</td>
                <td className="px-4 py-2.5 tabular-nums">{m.opens}</td>
                <td className="px-4 py-2.5 tabular-nums">{m.clicks}</td>
                <td className="px-4 py-2.5 tabular-nums">{m.replies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
