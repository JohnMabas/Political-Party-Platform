import { useStore } from '../../store/Store'
import { Card } from '../../components/ui'
import { fmtDateShort } from '../../utils/format'

export default function Messages() {
  const { announcements } = useStore()

  const byDate = [...announcements].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Messages & announcements</h1>
        <p className="mt-1 text-ink-muted">Updates from organizers and campaign leadership.</p>
      </header>

      <div className="mt-6 space-y-4">
        {byDate.map((a) => (
          <Card key={a.id} className="p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-ink-muted">{fmtDateShort(a.date)} · from {a.from}</p>
            </div>
            <h2 className="mt-2 font-serif text-lg font-bold text-primary">{a.title}</h2>
            <p className="mt-2 text-ink-muted leading-relaxed">{a.body}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
