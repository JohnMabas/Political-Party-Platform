import { useState } from 'react'
import { Card } from '../../components/ui'

const dates = [
  { label: 'Voter registration (PVC) deadline', date: 'Varies by INEC schedule', tone: 'urgent' },
  { label: 'Continuous Voter Registration', date: 'Ongoing at INEC offices', tone: 'default' },
  { label: 'PVC collection period', date: 'As announced by INEC', tone: 'default' },
  { label: 'General Election Day', date: 'February 20, 2027', tone: 'default' },
]

export default function VoterResources() {
  const [polling, setPolling] = useState('')
  const [lookedUp, setLookedUp] = useState(false)

  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/70 italic">Voter resources</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">Make sure your vote counts</h1>
          <p className="mt-3 max-w-2xl text-white/75">Register for your Permanent Voter\u2019s Card (PVC), confirm your polling unit with INEC, and know the key dates for the election. Your voice belongs at the polls.</p>
        </div>
      </section>

      <section className="container-site py-10">
        {/* Check registration */}
        <Card className="p-6">
          <h2 className="font-serif text-lg font-bold text-primary">Check your voter registration</h2>
          <p className="mt-1 text-sm text-ink-muted">Confirm your status and polling unit with the Independent National Electoral Commission (INEC). For the demo, enter a sample query to see a result.</p>
          <form className="mt-4 flex flex-col sm:flex-row gap-3" onSubmit={(e) => { e.preventDefault(); setLookedUp(true) }}>
            <div className="flex-1 max-w-xs">
              <label htmlFor="pv-lookup" className="sr-only">Polling unit / INEC number</label>
              <input id="pv-lookup" inputMode="numeric" value={polling} onChange={(e) => setPolling(e.target.value)} placeholder="e.g. 044/01/02/002" className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <button type="submit" className="rounded-sm bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-hov">Look up</button>
          </form>
          {lookedUp && (
            <div className="mt-4 rounded-sm border border-community bg-community-tint px-4 py-3 text-sm">
              <p className="font-semibold text-community">Your PVC is active — you are registered to vote.</p>
              <p className="mt-1 text-ink">Sample result — your polling unit and ward would list here. Confirm your actual status with your INEC office before Election Day.</p>
            </div>
          )}
        </Card>

        {/* Key dates */}
        <div className="mt-8">
          <h2 className="font-serif text-2xl font-bold text-primary">Key dates</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dates.map((d) => (
              <Card key={d.label} className="p-5">
                <div className={`inline-flex items-center gap-2 text-xs font-semibold ${d.tone === 'urgent' ? 'text-urgent' : 'text-ink-muted'}`}>
                  <span aria-hidden="true">●</span>{d.tone === 'urgent' ? 'Register now' : 'Save the date'}
                </div>
                <p className="mt-2 font-serif text-lg font-bold text-primary leading-tight">{d.label}</p>
                <p className="mt-1 text-sm text-ink-muted">{d.date}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* PVC / what you need */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card className="p-6">
            <h2 className="font-serif text-lg font-bold text-primary">Get your Permanent Voter\u2019s Card (PVC)</h2>
            <p className="mt-2 text-sm text-ink-muted">
              To vote you need a PVC issued by INEC. Register at an INEC office or designated centre, then return to collect your card when INEC announces collection.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li>• Carry your national ID, passport, or other approved documents.</li>
              <li>• Check the INEC schedule for registration in your state.</li>
              <li>• Collect your PVC in person — no proxies allowed.</li>
            </ul>
          </Card>
          <Card className="p-6">
            <h2 className="font-serif text-lg font-bold text-primary">What you\u2019ll need to vote</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li>• Your Permanent Voter\u2019s Card (PVC).</li>
              <li>• Your polling unit — confirm it on your PVC before the day.</li>
              <li>• Accreditation is done with the BVAS machine at your polling unit.</li>
            </ul>
            <p className="mt-4 rounded-sm border border-border bg-surface-2 px-3 py-2 text-xs text-ink-muted">
              Rules are set by INEC. Visit the official INEC website for authoritative information in your state.
            </p>
          </Card>
        </div>

        <div className="mt-8 rounded border border-border bg-surface-2 p-6 text-center">
          <h2 className="font-serif text-lg font-bold text-primary">Need help getting to your polling unit?</h2>
          <p className="mt-1 text-sm text-ink-muted">We coordinate transport for voters on Election Day. <a href="#contact" className="text-primary font-medium hover:underline">Request a ride</a> or volunteer to drive.</p>
        </div>
      </section>
    </div>
  )
}
