import { useStore } from '../../store/Store'
import { Card } from '../../components/ui'

export default function Endorsements() {
  const { seed } = useStore()
  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/70 italic">Endorsements</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">Who stands with us</h1>
          <p className="mt-3 max-w-2xl text-white/75">
            Organizations and individuals across labor, education, health, business, and community have endorsed our candidates and platform.
          </p>
        </div>
      </section>

      <section className="container-site py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {seed.endorsements.map((e) => (
            <Card key={e.name} className="p-6">
              <div className="flex items-center gap-3">
                <div aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-tint font-serif font-bold text-primary">{e.name[0]}</div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-primary leading-tight">{e.name}</h2>
                  <p className="text-xs text-ink-muted">{e.type}</p>
                </div>
              </div>
              <blockquote className="mt-4 font-serif text-base italic leading-relaxed text-ink">“{e.quote}”</blockquote>
              <p className="mt-3 text-xs text-ink-muted">— {e.name}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded border border-border bg-surface-2 p-6 text-center">
          <p className="text-sm text-ink-muted">
            Represent an organization that\u2019s interested in endorsing? <a href="#contact" className="text-primary font-medium hover:underline">Reach out to our partnerships team</a>.
          </p>
        </div>
      </section>
    </div>
  )
}
