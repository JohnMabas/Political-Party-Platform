import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { Card } from '../../components/ui'

export default function Join() {
  const { volunteerSignup, setCurrentUser } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', district: '' })
  const [dues, setDues] = useState(20)
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const { person } = volunteerSignup({ ...form, interest: 'member', eventTitle: null })
    setCurrentUser({ id: person.id, role: 'volunteer', name: person.name, email: person.email })
    setDone(true)
  }

  if (done) {
    return (
      <div className="container-site py-16 max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-community-tint text-3xl text-community" aria-hidden="true">✓</div>
        <h1 className="mt-4 font-serif text-3xl font-bold text-primary">Welcome to the party</h1>
        <p className="mt-3 text-ink-muted">
          You\u2019re now a member. You\u2019ll get a welcome note from your local chapter and a chance to vote in party business.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button type="button" onClick={() => navigate('/portal')} className="inline-flex items-center justify-center bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hov rounded-sm">Open my portal</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/70 italic">Membership</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">Become a member</h1>
          <p className="mt-3 max-w-2xl text-white/75">
            Membership is different from volunteering — it gives you a vote in party business and a stake in how we\u2019re run. It\u2019s $20 a year, or whatever you can afford.
          </p>
        </div>
      </section>

      <section className="container-site py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="font-serif text-lg font-bold text-primary">Member sign-up</h2>
            <form onSubmit={submit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="m-name" className="mb-1 block text-sm font-medium text-ink">Full name <span className="text-urgent">*</span></label>
                <input id="m-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="m-email" className="mb-1 block text-sm font-medium text-ink">Email <span className="text-urgent">*</span></label>
                <input id="m-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="m-district" className="mb-1 block text-sm font-medium text-ink">Nearest district / chapter</label>
                <select id="m-district" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                  <option value="">Select</option>
                  <option>D1</option><option>D2</option><option>D3</option><option>D4</option><option>D5</option>
                </select>
              </div>
              <div>
                <label htmlFor="m-dues" className="mb-1 block text-sm font-medium text-ink">Annual dues</label>
                <select id="m-dues" value={dues} onChange={(e) => setDues(Number(e.target.value))} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                  <option value={20}>$20 — standard</option>
                  <option value={5}>$5 — reduced</option>
                  <option value={60}>$60 — sustaining</option>
                  <option value={0}>$0 — no one turned away</option>
                </select>
              </div>
              <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center bg-accent px-6 py-3 text-sm font-semibold text-[#1C2430] hover:bg-accent/90 rounded-sm">
                Become a member{dues > 0 ? ` — $${dues}/yr` : ''}
              </button>
            </form>
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Member benefits</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li>• A vote in party business and candidate nominations.</li>
              <li>• A voice in your local chapter\u2019s priorities.</li>
              <li>• Access to the supporter portal and volunteer tools.</li>
              <li>• A member card and welcome packet.</li>
            </ul>
          </Card>
          <div className="rounded border border-border bg-surface-2 p-5 text-xs text-ink-muted">
            <p className="font-semibold text-ink">Membership dues are not contributions to any candidate.</p>
            <p className="mt-1">They support the party organization itself. This is a demonstration platform with a fictional party.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
