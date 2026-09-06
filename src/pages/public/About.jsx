import { Link } from 'react-router-dom'

const values = [
  { title: 'Equity and opportunity', body: 'We measure our success by whether the people who have the least are getting more of what everyone needs — decent work, a safe home, and care when they\u2019re sick.' },
  { title: 'Local knowledge', body: 'Neighbors know their streets better than consultants do. We put decisions and organizing power in local chapters and precincts, not just a headquarters downtown.' },
  { title: 'Honest money', body: 'We fund the work with small-dollar donations from people, not big-money special interests. Your contribution is a statement about who you want this party to answer to.' },
  { title: 'Relentless follow-through', body: 'Campaigns end on Election Day; governing begins. We hold ourselves to the same standard of follow-through we ask of every elected official we support.' },
]

const leadership = [
  { name: 'Camille North', role: 'Campaign Manager', initials: 'CN', blurb: 'A decade of nonprofit and field organizing, now steering the statewide operation.' },
  { name: 'Derek Alvarez', role: 'Finance Director', initials: 'DA', blurb: 'Keeps the books honest and the payroll funded — and every receipt public.' },
  { name: 'Ruth Bello', role: 'Party Chair', initials: 'RB', blurb: 'A longtime community organizer who co-founded the party in a living room in 2021.' },
  { name: 'Omar Idris', role: 'Communications Director', initials: 'OI', blurb: 'Tells the story of the work in plain words, from town halls to press releases.' },
]

const milestones = [
  { year: '2021', text: 'Twelve neighbors meet in a living room to start a party built on local chapters.' },
  { year: '2022', text: 'Our first slate of local candidates; a hundred members grow into two thousand.' },
  { year: '2023', text: 'We publish a written platform and open our first headquarters in the Mill District.' },
  { year: '2025', text: 'Membership passes 40,000. Chapters open in all corners of the state.' },
  { year: '2026', text: 'A full slate of candidates runs on the Common Ground line for the first time.' },
]

export default function About() {
  return (
    <div>
      <section className="border-b border-border" style={{ background: 'linear-gradient(180deg, #1F3A5F 0%, #17293F 100%)' }}>
        <div className="container-site py-14 sm:py-16">
          <p className="font-serif text-lg text-white/80 italic">Our story</p>
          <h1 className="mt-2 max-w-3xl font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
            We started with a simple question, in a living room, with coffee and twelve neighbors.
          </h1>
        </div>
      </section>

      <section className="container-site py-12 max-w-3xl">
        <div className="space-y-5 font-serif text-lg leading-relaxed text-ink">
          <p>
            In the winter of 2021, twelve neighbors gathered in a rented living room to ask why the parties they\u2019d grown up with kept losing touch with the people they were supposed to serve — and what a party built differently might look like.
          </p>
          <p>
            There was no consultant in the room and no donor list. There was a pot of coffee, a flip chart, and a shared belief that a political organization could be held to the same standards of honesty and follow-through that communities already hold each other to. We decided to build one.
          </p>
          <p>
            The Common Ground Party grew one precinct at a time. We held meetings in church basements and union halls, on front porches and in rec-center gyms. We wrote our platform first, then recruited candidates who would commit to it, then raised the money to run — from members who gave an average of about $40.
          </p>
          <p>
            Five years later we count tens of thousands of members, a full slate of candidates, and a campaign that is organized and funded by the people it serves. The living room is gone. The principle is not: this party answers to its neighbors.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-site py-12">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">What we value</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v.title} className="rounded border border-border bg-surface p-5">
                <h3 className="font-serif text-lg font-bold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-12">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">How we got here</h2>
        <ol className="mt-6 space-y-0">
          {milestones.map((m, i) => (
            <li key={m.year} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{m.year.slice(2)}</span>
                {i < milestones.length - 1 && <span className="w-px flex-1 bg-border" aria-hidden="true" />}
              </div>
              <div className="pb-8">
                <p className="text-sm font-semibold text-primary">{m.year}</p>
                <p className="mt-1 text-ink-muted">{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-border bg-surface-2/50">
        <div className="container-site py-12">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Leadership</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {leadership.map((l) => (
              <div key={l.name} className="rounded border border-border bg-surface p-5">
                <div aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{l.initials}</div>
                <h3 className="mt-3 font-serif text-lg font-bold text-primary">{l.name}</h3>
                <p className="text-xs font-semibold text-accent uppercase tracking-wide">{l.role}</p>
                <p className="mt-2 text-sm text-ink-muted">{l.blurb}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded border border-border bg-surface p-6 text-center">
            <p className="font-serif text-lg text-primary">Ready to help write the next chapter?</p>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/volunteer" className="inline-flex items-center justify-center bg-accent px-5 py-2.5 text-sm font-semibold text-[#1C2430] hover:bg-accent/90 rounded-sm">Volunteer</Link>
              <Link to="/join" className="inline-flex items-center justify-center border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 rounded-sm">Become a member</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
