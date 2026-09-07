import { Link } from 'react-router-dom'
import { Card } from '../../components/ui'

export default function PressKit() {
  const assets = [
    { name: 'Party seal (SVG)', size: '120 KB', tone: 'Logo' },
    { name: 'Horizontal lockup (PNG)', size: '840 KB', tone: 'Logo' },
    { name: 'Vertical lockup (PNG)', size: '760 KB', tone: 'Logo' },
    { name: 'Campaign color palette', size: 'PDF · 2.1 MB', tone: 'Brand' },
    { name: 'Headshots — candidates', size: 'ZIP · 18 MB', tone: 'Photos' },
    { name: 'HQ & event photos', size: 'ZIP · 34 MB', tone: 'Photos' },
  ]

  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/70 italic">Press kit</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">Media resources</h1>
          <p className="mt-3 max-w-2xl text-white/75">Logos, photos, and style guidance for journalists and members covering the campaign.</p>
        </div>
      </section>

      <section className="container-site py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-lg font-bold text-primary">Download assets</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {assets.map((a) => (
              <li key={a.name} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{a.name}</p>
                  <p className="text-xs text-ink-muted">{a.size}</p>
                </div>
                <span className="rounded-sm border border-border bg-surface px-3 py-1 text-xs font-semibold text-accent">{a.tone}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-muted">Logos are available under a permissive media license. Please use in line with the style guide and don\u2019t alter or claim endorsement with them.</p>
        </div>
        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Media contact</h2>
            <p className="mt-2 text-sm text-ink-muted">Tunde Adeleke, Communications Director</p>
            <p className="text-sm text-ink-muted">press@fup.ng</p>
            <p className="text-sm text-ink-muted">+234 800 000 2300</p>
            <Link to="/contact" className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">Send a request</Link>
          </Card>
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Speaking as the party</h2>
            <p className="mt-2 text-sm text-ink-muted">All media statements are issued by the Communications Office. Candidates and staff are happy to speak on their own areas — reach out to coordinate.</p>
          </Card>
        </div>
      </section>
    </div>
  )
}
