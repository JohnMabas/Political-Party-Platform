import { Link } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { Card } from '../../components/ui'

export default function Platform() {
  const { seed } = useStore()
  return (
    <div>
      <section className="border-b border-border" style={{ background: 'linear-gradient(180deg, #1F3A5F 0%, #17293F 100%)' }}>
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/80 italic">Our platform</p>
          <h1 className="mt-2 max-w-3xl font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
            What we stand for, in plain language.
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">
            This is the platform we organize around and the standard we hold every Common Ground candidate to. Written to be read at a kitchen table, debated in a chapter meeting, and adapted for your community.
          </p>
        </div>
      </section>

      <section className="container-site py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {seed.platformIssues.map((issue) => (
            <Link key={issue.slug} to={`/platform/${issue.slug}`} className="group">
              <Card className="flex h-full flex-col p-6 transition-colors hover:border-primary/40">
                <span aria-hidden="true" className="font-serif text-4xl font-bold text-accent">{issue.title[0]}</span>
                <h2 className="mt-3 font-serif text-xl font-bold text-primary group-hover:text-primary-hov">{issue.title}</h2>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed flex-1">{issue.summary}</p>
                <span className="mt-4 text-sm font-semibold text-accent">Read our full position</span>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
