import { Link } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { Card, StatusBadge, Thermometer } from '../../components/ui'
import { fmtDateShort, fmtTime, daysUntil } from '../../utils/format'

export default function Home() {
  const { fundraisingTotal, activeVolunteers, seed, eventsData } = useStore()
  const days = daysUntil('2026-11-03')
  const nextEvents = eventsData
    .filter((e) => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border" style={{ background: 'linear-gradient(180deg, #1F3A5F 0%, #1F3A5F 60%, #17293F 100%)' }}>
        <div className="container-site py-14 sm:py-20 text-center">
          <p className="mx-auto max-w-2xl font-serif text-xl sm:text-2xl text-white/90 leading-relaxed">
            A party built the old way — one neighbor, one precinct, one honest conversation at a time.
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            Common Ground Party
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-white/75">
            We are organizing for fully funded schools, affordable housing and health care, safe neighborhoods, and good jobs — in our own district and across the state.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/take-action" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-[#1C2430] hover:bg-accent/90 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              Get involved
            </Link>
            <Link to="/volunteer" className="w-full sm:w-auto inline-flex items-center justify-center border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 rounded-sm">
              Volunteer
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-white/80">
            <span className="inline-flex items-center gap-2"><span className="hidden sm:inline" aria-hidden="true">●</span> You\u2019re volunteer #{4500 + activeVolunteers} this month</span>
            <span className="inline-flex items-center gap-2"><span className="hidden sm:inline" aria-hidden="true">●</span> {days} days to Election Day</span>
            <span className="inline-flex items-center gap-2"><span className="hidden sm:inline" aria-hidden="true">●</span> 130 chapters statewide</span>
          </div>
        </div>
      </section>

      {/* Fundraising thermometer */}
      <section className="border-b border-border bg-surface">
        <div className="container-site py-8 flex flex-col lg:flex-row items-stretch justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-serif text-2xl font-bold text-primary">Help us reach every voter before November</h2>
            <p className="mt-2 text-ink-muted">
              Every dollar goes to field organizing, mail, and the people-and-paperwork of running a real campaign. Small-dollar donations are the backbone of this operation.
            </p>
            <Link to="/donate" className="mt-4 inline-flex items-center gap-2 bg-accent px-5 py-2.5 text-sm font-semibold text-[#1C2430] hover:bg-accent/90 rounded-sm">
              Donate now
            </Link>
          </div>
          <div className="lg:w-96 flex items-center">
            <Thermometer current={fundraisingTotal} goal={seed.CYCLE_GOAL} label="Cycle fundraising" className="w-full" />
          </div>
        </div>
      </section>

      {/* Platform teaser */}
      <section className="container-site py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Our platform</h2>
            <p className="mt-1 text-ink-muted">The issues we\u2019re organizing around, in plain language.</p>
          </div>
          <Link to="/platform" className="hidden sm:inline text-sm font-semibold text-primary hover:underline underline-offset-4">See all issues</Link>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {seed.platformIssues.slice(0, 6).map((issue) => (
            <Link key={issue.slug} to={`/platform/${issue.slug}`} className="group">
              <Card className="h-full p-5 transition-colors hover:border-primary/40">
                <h3 className="font-serif text-lg font-bold text-primary group-hover:text-primary-hov">{issue.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{issue.summary}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-accent">Read our position</span>
              </Card>
            </Link>
          ))}
        </div>
        <div className="sm:hidden mt-4">
          <Link to="/platform" className="text-sm font-semibold text-primary underline underline-offset-4">See all issues</Link>
        </div>
      </section>

      {/* News + Events */}
      <section className="border-t border-border bg-surface-2/50">
        <div className="container-site py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="flex items-end justify-between">
              <h2 className="font-serif text-2xl font-bold text-primary">Latest news</h2>
              <Link to="/news" className="text-sm font-semibold text-primary hover:underline underline-offset-4">All news</Link>
            </div>
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {seed.news.slice(0, 3).map((n) => (
                <li key={n.id}>
                  <Link to={`/news/${n.id}`} className="block py-4 group">
                    <p className="text-xs text-ink-muted">{fmtDateShort(n.date)} · {n.category}</p>
                    <h3 className="mt-1 font-serif text-lg font-bold text-primary group-hover:text-primary-hov">{n.title}</h3>
                    <p className="mt-1 text-sm text-ink-muted line-clamp-2">{n.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-end justify-between">
              <h2 className="font-serif text-2xl font-bold text-primary">Upcoming events</h2>
              <Link to="/events" className="text-sm font-semibold text-primary hover:underline underline-offset-4">All events</Link>
            </div>
            <ul className="mt-5 space-y-3">
              {nextEvents.map((e) => (
                <li key={e.id}>
                  <Link to={`/events/${e.id}`} className="block">
                    <Card className="p-4 hover:border-primary/40 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-serif text-base font-bold text-primary">{e.title}</h3>
                          <p className="mt-1 text-sm text-ink-muted">{fmtDateShort(e.date)} · {fmtTime(e.date)} · {e.location}</p>
                        </div>
                        <StatusBadge status="RSVP\u2019d" />
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-xs text-ink-muted">
                        <span>{e.rsvps} RSVP\u2019d</span>
                        <span className="text-community font-medium">Join us</span>
                      </div>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Endorsements */}
      <section className="container-site py-12">
        <h2 className="font-serif text-2xl font-bold text-primary text-center">Endorsed by neighbors and organizations</h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {seed.endorsements.slice(0, 6).map((en) => (
            <div key={en.name} className="rounded border border-border bg-surface p-4 text-center">
              <div aria-hidden="true" className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-tint text-primary font-serif font-bold">{en.name[0]}</div>
              <p className="mt-2 text-sm font-semibold text-ink leading-tight">{en.name}</p>
              <p className="text-xs text-ink-muted mt-0.5">{en.type}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center">
          <Link to="/endorsements" className="text-sm font-semibold text-primary hover:underline underline-offset-4">Read full endorsements</Link>
        </p>
      </section>

      {/* Take action band */}
      <section className="border-t border-border" style={{ background: 'linear-gradient(180deg, #F3E5C4 0%, #FAF8F3 100%)' }}>
        <div className="container-site py-14 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">The work happens on your street</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-muted">
            Canvassing, phone banks, events, and precinct captains — there\u2019s a shift for every schedule and a role for every strength.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/volunteer" className="w-full sm:w-auto inline-flex items-center justify-center bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hov rounded-sm">Volunteer with us</Link>
            <Link to="/take-action" className="w-full sm:w-auto inline-flex items-center justify-center border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/5 rounded-sm">See all ways to help</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
