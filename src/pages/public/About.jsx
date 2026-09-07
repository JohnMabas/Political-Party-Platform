import { Link } from 'react-router-dom'

const values = [
  { title: 'National unity and equity', body: 'We measure our success by whether every region and every citizen — from Lagos to Kano to Enugu — gets a fair share of opportunity, security, and good governance.' },
  { title: 'Local knowledge', body: 'Communities know their own needs better than anyone in Abuja. We put decision-making and organizing power in local branches and wards, not just a headquarters.' },
  { title: 'Honest money', body: 'We fund the work with contributions from ordinary Nigerians, not vested interests. Every naira raised is spent transparently and accounted for.' },
  { title: 'Relentless follow-through', body: 'Elections end on Election Day; governing begins. We hold ourselves to the same standard of follow-through we ask of every elected official we support.' },
]

const leadership = [
  { name: 'Adaeze Okonkwo', role: 'National Campaign Manager', initials: 'AO', blurb: 'A decade of civil-society and field organizing, now steering the nationwide operation.' },
  { name: 'Emeka Nwankwo', role: 'Finance Director', initials: 'EN', blurb: 'Keeps the books honest, the payroll funded, and every receipt public.' },
  { name: 'Hajiya Aisha Bello', role: 'Party National Chair', initials: 'AB', blurb: 'A longtime community organizer who co-founded the party on the principle of unity.' },
  { name: 'Tunde Adeleke', role: 'Communications Director', initials: 'TA', blurb: 'Tells the story of the work in plain words, from town halls to press releases.' },
]

const milestones = [
  { year: '2021', text: 'A small group of citizens from across Nigeria meet to build a party founded on unity and transparency.' },
  { year: '2022', text: 'Our first slate of local candidates; branches open in several states.' },
  { year: '2023', text: 'We publish a written national platform and open our secretariat in the FCT.' },
  { year: '2025', text: 'Membership passes 100,000. Branches open in all 36 states.' },
  { year: '2026', text: 'A full slate of candidates runs on the Federal Unity line for the first time.' },
]

export default function About() {
  return (
    <div>
      <section className="border-b border-border" style={{ background: 'linear-gradient(180deg, #1B5E3F 0%, #154A32 100%)' }}>
        <div className="container-site py-14 sm:py-16">
          <p className="font-serif text-lg text-white/80 italic">Our story</p>
          <h1 className="mt-2 max-w-3xl font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
            We started with a simple question, around a table, with citizens from every region.
          </h1>
        </div>
      </section>

      <section className="container-site py-12 max-w-3xl">
        <div className="space-y-5 font-serif text-lg leading-relaxed text-ink">
          <p>
            In 2021, a group of concerned citizens gathered to ask why politics so often divided Nigerians — and what a party built on unity, service, and transparency might look like.
          </p>
          <p>
            There was no patron in the room and no vested interest. A shared belief that a political organization could serve the people with honesty and follow-through drove us to build one.
          </p>
          <p>
            The Federal Unity Party grew one ward at a time. We held meetings in town halls, church and mosque grounds, market squares, and community centres. We wrote our platform first, then recruited candidates who would commit to it, then raised the money to run — from ordinary Nigerians who gave what they could.
          </p>
          <p>
            Five years later we count members in all 36 states and the FCT, a full slate of candidates, and a movement organized and funded by the people it serves. The original table is gone. The principle is not: this party answers to the Nigerian people.
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
