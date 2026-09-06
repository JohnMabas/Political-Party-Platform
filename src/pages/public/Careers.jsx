import { useState } from 'react'
import { Card } from '../../components/ui'

const openings = [
  { title: 'Regional Field Organizer', type: 'Full-time', location: 'Mill District HQ', status: 'Open', pays: '$48,000–56,000', blurb: 'Own a region of precincts: recruit, train, and support canvass teams and precinct captains through the cycle.' },
  { title: 'Digital Organizer', type: 'Full-time', location: 'Remote (in-state)', status: 'Open', pays: '$45,000–52,000', blurb: 'Run the supporter email/SMS, volunteer tools, and online fundraising program with the digital team.' },
  { title: 'Finance & Compliance Fellow', type: 'Fellowship', location: 'Mill District HQ', status: 'Open', pays: 'Stipend', blurb: 'Learn the craft of campaign finance — recording contributions, preparing disclosures, and meeting filing deadlines.' },
  { title: 'Phone Bank Captain', type: 'Part-time', location: 'Various', status: 'Open', pays: '$18/hr', blurb: 'Lead phone-bank sessions, coach callers, and keep the dialer and lists moving.' },
  { title: 'Communications Fellow', type: 'Fellowship', location: 'Remote (in-state)', status: 'Open', pays: 'Stipend', blurb: 'Draft press releases, pitch reporters, and help tell the story of the campaign in plain words.' },
  { title: 'Data Associate', type: 'Full-time', location: 'Mill District HQ', status: 'Open', pays: '$52,000–60,000', blurb: 'Own the supporter database — lists, targeting, walk lists, and reporting for the whole team.' },
]

export default function Careers() {
  const [applied, setApplied] = useState(null)
  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/70 italic">Careers</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">Work at the heart of the movement</h1>
          <p className="mt-3 max-w-2xl text-white/75">
            Campaign staff, fellows, and organizers — paid work at the center of a people-powered operation. If you\u2019re early in your career, our fellowships are a real training ground.
          </p>
        </div>
      </section>

      <section className="container-site py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {openings.map((o) => (
            <Card key={o.title} className="flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-accent uppercase tracking-wide">{o.type} · {o.location}</p>
                  <h2 className="mt-1 font-serif text-lg font-bold text-primary">{o.title}</h2>
                </div>
                <span className="rounded-full bg-community-tint px-2.5 py-0.5 text-xs font-medium text-community">● {o.status}</span>
              </div>
              <p className="mt-2 text-sm text-ink-muted flex-1">{o.blurb}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">{o.pays}</span>
                <button type="button" onClick={() => setApplied(o.title)}
                  className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hov">
                  {applied === o.title ? 'Application received' : 'Apply'}
                </button>
              </div>
              {applied === o.title && <p className="mt-2 text-xs text-community">Thanks — we\u2019ve noted your interest and will be in touch soon.</p>}
            </Card>
          ))}
        </div>

        <div className="mt-8 rounded border border-border bg-surface-2 p-6 text-center">
          <h2 className="font-serif text-lg font-bold text-primary">Don\u2019t see your role?</h2>
          <p className="mt-1 text-sm text-ink-muted">We\u2019re often hiring. Send us a note and tell us what you\u2019re good at.</p>
          <a href="#contact" className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">Get in touch</a>
        </div>
      </section>
    </div>
  )
}
