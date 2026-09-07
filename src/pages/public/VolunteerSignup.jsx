import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { Card } from '../../components/ui'
import { daysUntil } from '../../utils/format'

const OPTIONS = [
  { id: 'canvass', icon: '🚪', title: 'Canvassing', body: 'Visit homes with a partner and talk to citizens. We assign zones and provide a script.' },
  { id: 'phone', icon: '📞', title: 'Phone banking', body: 'Call supporters and undecided voters from the office or home.' },
  { id: 'events', icon: '🗓', title: 'Events & hosting', body: 'Staff an event or host a get-together in your neighbourhood.' },
  { id: 'captain', icon: '📌', title: 'Ward captain', body: 'Own your ward and lead your area\u2019s organizing effort.' },
]

const SHIFTS = [
  'Lagos rally support — Sat, Sep 19 morning',
  'Surulere phone bank — Mon, Sep 28 evening',
  'Enugu forum volunteers — Fri, Oct 2 morning',
  'Volunteer at the GOTV rally — Feb 18, 2027',
  'I\u2019ll take whatever needs doing',
]

export default function VolunteerSignup() {
  const { volunteerSignup, setCurrentUser } = useStore()
  const [form, setForm] = useState({ name: '', email: '', district: '', zip: '' })
  const [interest, setInterest] = useState('canvass')
  const [shift, setShift] = useState('')
  const [done, setDone] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    const { person, assignment } = volunteerSignup({ ...form, interest, shiftId: shift ? 1 : null, eventTitle: shift || null })
    // Log the user in as this volunteer for the demo; sync portal
    setCurrentUser({ id: person.id, role: 'volunteer', name: person.name, email: person.email })
    setDone({ person, assignment })
  }

  if (done) {
    return (
      <div className="container-site py-16 max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-community-tint text-3xl text-community" aria-hidden="true">✓</div>
        <h1 className="mt-4 font-serif text-3xl font-bold text-primary">Welcome, {done.person.name.split(' ')[0]}!</h1>
        <p className="mt-3 text-ink-muted">
          You\u2019re volunteer #{1480 + done.person.id} this month. An organizer will be in touch within a day or two to confirm your details{shift === '' ? '' : ' and lock in your shift'}.
        </p>
        {done.assignment && (
          <div className="mt-6 rounded border border-border bg-surface p-5 text-left">
            <p className="text-xs font-semibold text-accent uppercase tracking-wide">Your first shift</p>
            <p className="mt-1 font-serif text-lg font-bold text-primary">{done.assignment.title}</p>
            <p className="mt-1 text-sm text-ink-muted">Status: <span className="text-community font-medium">Assigned</span></p>
          </div>
        )}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/portal" className="inline-flex items-center justify-center bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hov rounded-sm">Open my portal</Link>
          <Link to="/" className="inline-flex items-center justify-center border border-primary px-6 py-3 text-sm font-semibold text-primary rounded-sm">Back to homepage</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/70 italic">Volunteer</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">Put your name on the list</h1>
          <p className="mt-3 max-w-2xl text-white/75">
            {daysUntil('2027-02-20')} days to go — and there\u2019s a role for your schedule. Tell us who you are and how you want to help.
          </p>
        </div>
      </section>

      <section className="container-site py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={submit} className="space-y-6">
            <Card className="p-6">
              <h2 className="font-serif text-lg font-bold text-primary">Your details</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="v-name" className="mb-1 block text-sm font-medium text-ink">Full name <span className="text-urgent">*</span></label>
                  <input id="v-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label htmlFor="v-email" className="mb-1 block text-sm font-medium text-ink">Email <span className="text-urgent">*</span></label>
                  <input id="v-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label htmlFor="v-district" className="mb-1 block text-sm font-medium text-ink">Nearest LGA / branch (optional)</label>
                  <select id="v-district" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                    <option value="">Select an LGA</option>
                    <option>Lagos Island</option><option>Surulere</option><option>Enugu North</option><option>Kano South</option><option>Port Harcourt</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="v-zip" className="mb-1 block text-sm font-medium text-ink">State</label>
                  <input id="v-zip" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-serif text-lg font-bold text-primary">How would you like to help?</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OPTIONS.map((o) => (
                  <label key={o.id} className={`flex cursor-pointer gap-3 rounded-sm border p-4 ${interest === o.id ? 'border-accent bg-accent-tint ring-1 ring-accent' : 'border-border bg-surface hover:border-accent/60'}`}>
                    <input type="radio" name="interest" value={o.id} className="sr-only" checked={interest === o.id} onChange={() => setInterest(o.id)} />
                    <span aria-hidden="true" className="text-2xl">{o.icon}</span>
                    <span>
                      <span className="block font-semibold text-ink">{o.title}</span>
                      <span className="block text-sm text-ink-muted mt-0.5">{o.body}</span>
                    </span>
                  </label>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-serif text-lg font-bold text-primary">Grab a first shift (optional)</h2>
              <div className="mt-4">
                <label htmlFor="v-shift" className="mb-1 block text-sm font-medium text-ink">Open shifts near you</label>
                <select id="v-shift" value={shift} onChange={(e) => setShift(e.target.value)} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                  <option value="">I\u2019ll decide later</option>
                  {SHIFTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </Card>

            <button type="submit" className="w-full inline-flex items-center justify-center bg-accent px-6 py-3 text-base font-semibold text-[#1C2430] hover:bg-accent/90 rounded-sm">
              Sign me up
            </button>
            <p className="text-xs text-ink-muted">By signing up you agree to receive text messages from the party. Reply STOP anytime. You\u2019ll be asked to confirm your contact details shortly.</p>
          </form>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">You\u2019ll become volunteer #1483</h2>
            <p className="mt-2 text-sm text-ink-muted">We\u2019ve onboarded {1482} volunteers this cycle. Each one helps us reach more citizens.</p>
          </Card>
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">No experience needed</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li>• Every shift has training and a partner.</li>
              <li>• We provide scripts, turf, and supplies.</li>
              <li>• You log hours and track your own impact.</li>
            </ul>
          </Card>
          <Link to="/events" className="block rounded-sm border border-border bg-surface p-5 text-sm font-medium text-primary hover:bg-surface-2">Browse events instead →</Link>
        </div>
      </section>
    </div>
  )
}
