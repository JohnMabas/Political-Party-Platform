import { Link } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { Card } from '../../components/ui'
import HeroSlideshow from '../../components/hero/HeroSlideshow'

export default function Home() {
  const { seed } = useStore()

  return (
    <div>
      {/* Hero — full-height background slideshow with green tint */}
      <section className="relative flex min-h-screen items-center overflow-hidden border-b border-border">
        <HeroSlideshow />
        <div className="relative container-site py-16 sm:py-20 text-center">
          <h1 className="mt-5 font-serif text-4xl sm:text-6xl font-extrabold text-white drop-shadow-md">Federal Unity Party</h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl sm:text-2xl font-bold text-white drop-shadow-md">
            One Nigeria, one people — progress built together.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/join" className="w-full sm:w-auto inline-flex items-center justify-center bg-accent px-6 py-3 text-sm font-semibold text-[#1C2430] hover:bg-accent/90 rounded-sm">
              Join our movement
            </Link>
            <Link to="/volunteer" className="w-full sm:w-auto inline-flex items-center justify-center border border-white/60 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 rounded-sm">
              Volunteer
            </Link>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {seed.platformIssues.slice(0, 3).map((p) => (
              <div key={p.slug} className="rounded-lg bg-white/10 p-4 text-left ring-1 ring-white/20 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">{p.title}</p>
                <p className="mt-1 text-sm text-white/90 leading-snug">{p.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The President of Nigeria */}
      <section className="container-site py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center max-w-5xl mx-auto">
          <div className="lg:col-span-2 flex justify-center">
            <img
              src="/presidents/tinubu.jpg"
              alt="Portrait of President Bola Ahmed Adekunle Tinubu"
              className="h-64 w-52 rounded-2xl object-cover object-top shadow-md ring-1 ring-border"
            />
          </div>
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">The President of Nigeria</p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-primary">Bola Ahmed Adekunle Tinubu</h2>
            <p className="mt-1 text-sm text-ink-muted">16th President of the Federal Republic of Nigeria · 2023 – Present</p>
            <p className="mt-4 font-serif text-base sm:text-lg leading-relaxed text-ink">
              Bola Ahmed Adekunle Tinubu was sworn in as President on 29 May 2023. As Governor of Lagos State (1999–2007), he built a record of tax reform, urban renewal, and infrastructure investment that transformed Lagos into one of Africa’s fastest-growing megacities.
            </p>
            <p className="mt-3 font-serif text-base sm:text-lg leading-relaxed text-ink">
              He is the architect of the Renewed Hope Agenda — a national programme to stabilise the economy, secure the nation, invest in infrastructure, and create opportunity for every Nigerian. Before politics he worked as an accountant and auditor with multinational firms, and he remains a champion of grassroots democracy, progressive governance, and the unity of the Nigerian people.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Born 29 March 1952', 'Governor of Lagos 1999–2007', 'Renewed Hope Agenda', 'President since 2023'].map((f) => (
                <span key={f} className="rounded-full bg-primary-tint px-3 py-1 text-xs font-medium text-primary">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform teaser (compact) */}
      <section className="border-y border-border bg-surface">
        <div className="container-site py-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary">Our platform</h2>
              <p className="mt-1 text-sm text-ink-muted">Simple positions in plain language.</p>
            </div>
            <Link to="/platform" className="text-sm font-semibold text-primary hover:underline underline-offset-4">See all issues</Link>
          </div>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {seed.platformIssues.slice(0, 6).map((issue) => (
              <Link key={issue.slug} to={`/platform/${issue.slug}`} className="group">
                <Card className="p-4 transition-colors hover:border-primary/40">
                  <h3 className="font-serif text-base font-bold text-primary group-hover:text-primary-hov">{issue.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted leading-relaxed line-clamp-2">{issue.summary}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Candidates */}
      <section className="container-site py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary">Our candidates</h2>
            <p className="mt-1 text-sm text-ink-muted">The 2026–27 slate on the Federal Unity line.</p>
          </div>
          <Link to="/candidates" className="text-sm font-semibold text-primary hover:underline underline-offset-4">All candidates</Link>
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seed.candidates.map((c) => (
            <Link key={c.slug} to={`/candidates/${c.slug}`} className="group">
              <Card className="p-4 text-center transition-colors hover:border-primary/40">
                <img
                  src={c.photo}
                  alt={`Portrait of ${c.name}`}
                  className="mx-auto h-28 w-24 rounded-xl shadow-sm ring-1 ring-border object-cover object-top"
                />
                <h3 className="mt-3 font-serif text-base font-bold text-primary group-hover:text-primary-hov">{c.name}</h3>
                <p className="mt-1 text-xs text-ink-muted leading-snug">{c.race}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Take action band (compact) */}
      <section className="border-t border-border" style={{ background: 'linear-gradient(180deg, #F3E5C4 0%, #FAF8F3 100%)' }}>
        <div className="container-site py-12 text-center">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary">There’s a role for you</h2>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/volunteer" className="w-full sm:w-auto inline-flex items-center justify-center bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hov rounded-sm">Volunteer with us</Link>
            <Link to="/join" className="w-full sm:w-auto inline-flex items-center justify-center border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/5 rounded-sm">Join our movement</Link>
          </div>
        </div>
      </section>
    </div>
  )
}