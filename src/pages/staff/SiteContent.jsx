import { useState } from 'react'
import { useStore } from '../../store/Store'
import { Card, StatusBadge } from '../../components/ui'

export default function SiteContent() {
  const { seed } = useStore()
  const [tab, setTab] = useState('issues')
  const [editIssue, setEditIssue] = useState(null)
  const [draft, setDraft] = useState({ title: '', date: new Date().toISOString().slice(0, 10), category: 'Press Release', excerpt: '', body: '' })
  const [added, setAdded] = useState([])

  const publishNews = (e) => {
    e.preventDefault()
    setAdded((prev) => [{ id: prev.length + 100, ...draft }, ...prev])
    setDraft({ title: '', date: new Date().toISOString().slice(0, 10), category: 'Press Release', excerpt: '', body: '' })
  }

  const issue = editIssue ? seed.platformIssues.find((i) => i.slug === editIssue) : null

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Site content</h1>
        <p className="mt-1 text-ink-muted">Edit what the public sees — issue pages, news, and events.</p>
      </header>

      <div className="mt-6 flex gap-1 rounded-sm border border-border bg-surface-2 p-1 text-sm font-semibold w-full sm:w-auto">
        {[
          ['issues', 'Issue pages'],
          ['news', 'News & press'],
          ['events', 'Events calendar'],
        ].map(([k, label]) => (
          <button key={k} type="button" onClick={() => setTab(k)}
            className={`flex-1 sm:flex-none rounded-sm px-4 py-2 ${tab === k ? 'bg-surface text-primary shadow-sm' : 'text-ink-muted hover:text-primary'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'issues' && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            <h2 className="font-serif text-lg font-bold text-primary">Issue pages</h2>
            {seed.platformIssues.map((i) => (
              <button key={i.slug} type="button" onClick={() => setEditIssue(i.slug)}
                className={`block w-full text-left rounded-sm border p-3 ${editIssue === i.slug ? 'border-accent bg-accent-tint' : 'border-border bg-surface hover:border-primary/40'}`}>
                <p className="font-medium text-ink">{i.title}</p>
                <p className="text-xs text-ink-muted">{i.summary.slice(0, 60)}…</p>
              </button>
            ))}
          </div>
          <Card className="lg:col-span-2 p-6">
            {issue ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-lg font-bold text-primary">Editing: {issue.title}</h2>
                  <StatusBadge status="On track" />
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-ink">Headline</label>
                    <input defaultValue={issue.headline} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-ink">Summary</label>
                    <input defaultValue={issue.summary} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-ink">Position</label>
                    <textarea defaultValue={issue.position} rows="8" className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setEditIssue(null)} className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hov">Save changes</button>
                    <button type="button" onClick={() => setEditIssue(null)} className="rounded-sm border border-border bg-surface px-4 py-2 text-sm font-medium text-ink-muted hover:bg-surface-2">Cancel</button>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-ink-muted">Select an issue page to edit its position, summary, and headline.</p>
            )}
          </Card>
        </div>
      )}

      {tab === 'news' && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6">
            <h2 className="font-serif text-lg font-bold text-primary">Publish a press release / update</h2>
            <form onSubmit={publishNews} className="mt-4 space-y-4">
              <div>
                <label htmlFor="n-title" className="mb-1 block text-sm font-medium text-ink">Headline</label>
                <input id="n-title" required value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="n-cat" className="mb-1 block text-sm font-medium text-ink">Category</label>
                  <select id="n-cat" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>Press Release</option><option>Blog</option><option>Media Coverage</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="n-date" className="mb-1 block text-sm font-medium text-ink">Date</label>
                  <input id="n-date" type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label htmlFor="n-excerpt" className="mb-1 block text-sm font-medium text-ink">Excerpt</label>
                <input id="n-excerpt" required value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="n-body" className="mb-1 block text-sm font-medium text-ink">Body</label>
                <textarea id="n-body" rows="6" value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <button type="submit" className="rounded-sm bg-accent px-5 py-2 text-sm font-semibold text-[#1C2430] hover:bg-accent/90">Publish to newsroom</button>
            </form>
          </Card>
          <div>
            <h2 className="font-serif text-lg font-bold text-primary">Current stories</h2>
            <div className="mt-3 space-y-3">
              {[...added, ...seed.news].map((n) => (
                <Card key={n.id} className="p-4">
                  <p className="text-xs text-ink-muted">{n.date} · {n.category}</p>
                  <p className="mt-1 text-sm font-semibold text-primary">{n.title}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'events' && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-primary">Public events calendar</h2>
            <a href="/staff/events" className="text-sm font-semibold text-accent hover:underline">Create / manage events →</a>
          </div>
          <div className="mt-3 space-y-3">
            {seed.events.map((e) => (
              <Card key={e.id} className="p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{e.title}</p>
                  <p className="text-xs text-ink-muted">{e.date} · {e.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={e.type} />
                  <StatusBadge status={e.rsvps >= e.capacity ? 'Full' : 'On track'} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
