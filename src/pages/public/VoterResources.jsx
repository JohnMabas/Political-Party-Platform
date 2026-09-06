import { useState } from 'react'
import { Card } from '../../components/ui'

const dates = [
  { label: 'Voter registration deadline', date: 'October 12, 2026', tone: 'urgent' },
  { label: 'Early voting begins', date: 'September 20, 2026', tone: 'default' },
  { label: 'Early voting ends', date: 'November 1, 2026', tone: 'default' },
  { label: 'Election Day', date: 'November 3, 2026', tone: 'default' },
]

export default function VoterResources() {
  const [zip, setZip] = useState('')
  const [lookedUp, setLookedUp] = useState(false)

  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/70 italic">Voter resources</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">Make sure your vote counts</h1>
          <p className="mt-3 max-w-2xl text-white/75">Check your registration, find your polling place, and know the key dates for this election. Your voice belongs at the polls.</p>
        </div>
      </section>

      <section className="container-site py-10">
        {/* Check registration */}
        <Card className="p-6">
          <h2 className="font-serif text-lg font-bold text-primary">Check your voter registration</h2>
          <p className="mt-1 text-sm text-ink-muted">Enter your ZIP code to look up your status and polling place. This mirrors the state\u2019s public lookup — for the demo it returns a sample result.</p>
          <form className="mt-4 flex flex-col sm:flex-row gap-3" onSubmit={(e) => { e.preventDefault(); setLookedUp(true) }}>
            <div className="flex-1 max-w-xs">
              <label htmlFor="zip-lookup" className="sr-only">ZIP code</label>
              <input id="zip-lookup" inputMode="numeric" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="e.g. 90210" className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <button type="submit" className="rounded-sm bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-hov">Look up</button>
          </form>
          {lookedUp && (
            <div className="mt-4 rounded-sm border border-community bg-community-tint px-4 py-3 text-sm">
              <p className="font-semibold text-community">You are registered to vote{zip ? ` in ZIP ${zip}` : ''}.</p>
              <p className="mt-1 text-ink">Sample result — your polling place would list here, along with your district and precinct. Check with your state election office for your actual status.</p>
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

        {/* Absentee / mail */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card className="p-6">
            <h2 className="font-serif text-lg font-bold text-primary">Absentee & mail ballot</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Anyone can request a mail ballot — no excuse needed in most states. Ballots are sent about three weeks before Election Day and must be returned by the deadline on the envelope, or be postmarked by Election Day.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li>• Request early — processing can take two weeks.</li>
              <li>• Fill in the oval completely with blue or black ink.</li>
              <li>• Return it well before the deadline to avoid delays.</li>
            </ul>
          </Card>
          <Card className="p-6">
            <h2 className="font-serif text-lg font-bold text-primary">What you\u2019ll need to vote</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li>• A valid ID (driver\u2019s license, passport, or state ID).</li>
              <li>• Your polling place — confirm it before you go.</li>
              <li>• Polls are open 7 AM – 8 PM on Election Day.</li>
            </ul>
            <p className="mt-4 rounded-sm border border-border bg-surface-2 px-3 py-2 text-xs text-ink-muted">
              Rules vary by state. Visit your state\u2019s official election website for authoritative information.
            </p>
          </Card>
        </div>

        <div className="mt-8 rounded border border-border bg-surface-2 p-6 text-center">
          <h2 className="font-serif text-lg font-bold text-primary">Need a ride to the polls?</h2>
          <p className="mt-1 text-sm text-ink-muted">We coordinate rides for voters on Election Day. <a href="#contact" className="text-primary font-medium hover:underline">Request one</a> or volunteer to drive.</p>
        </div>
      </section>
    </div>
  )
}
