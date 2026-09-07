import { useStore } from '../../store/Store'
import { Card, StatusBadge, ProgressBar } from '../../components/ui'

export default function MyTeam() {
  const { team, teamMembers, currentUser } = useStore()

  if (!team) {
    return (
      <div>
        <header>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">My team</h1>
        </header>
        <Card className="mt-6 p-6 text-sm text-ink-muted">
          You\u2019re not assigned to a chapter team yet. Reach out to your organizer or sign up to volunteer to get placed with a local group.
        </Card>
      </div>
    )
  }

  const sorted = [...teamMembers].sort((a, b) => (b.doorsKnocked + b.callsMade) - (a.doorsKnocked + a.callsMade))

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">{team.name}</h1>
        <p className="mt-1 text-ink-muted">Led by {team.organizer} · {teamMembers.length} members on the roster</p>
      </header>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-lg font-bold text-primary">Group leaderboard</h2>
          <p className="text-sm text-ink-muted mt-1">Friendly competition on doors knocked and calls made this cycle.</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-2 text-left text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-3 py-2 font-medium">Member</th>
                  <th className="px-3 py-2 font-medium">Doors</th>
                  <th className="px-3 py-2 font-medium">Calls</th>
                  <th className="px-3 py-2 font-medium">Hours</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sorted.map((m) => (
                  <tr key={m.id} className={`odd:bg-surface even:bg-surface-2 ${m.id === currentUser?.id ? 'ring-1 ring-inset ring-accent' : ''}`}>
                    <td className="px-3 py-2.5">
                      <span className="font-semibold text-ink">{m.name}</span>
                      {m.id === currentUser?.id && <span className="ml-2 rounded-full bg-accent-tint px-2 py-0.5 text-xs text-accent">You</span>}
                    </td>
                    <td className="px-3 py-2.5 tabular-nums">{m.doorsKnocked}</td>
                    <td className="px-3 py-2.5 tabular-nums">{m.callsMade}</td>
                    <td className="px-3 py-2.5 tabular-nums">{m.hours}</td>
                    <td className="px-3 py-2.5"><StatusBadge status={m.volunteerStatus === 'Active' ? 'Active' : 'Inactive'} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Team progress</h2>
            <div className="mt-3">
              <ProgressBar current={sorted.reduce((s, m) => s + m.doorsKnocked, 0)} goal={500} label="Doors knocked this cycle" tone="community" />
            </div>
            <div className="mt-4">
              <ProgressBar current={sorted.reduce((s, m) => s + m.callsMade, 0)} goal={800} label="Calls made this cycle" tone="accent" />
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Chapter news</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Our chapter meets every other Thursday at the ward secretariat. Add our next canvass on <a href="/events" className="text-primary hover:underline">the events page</a>.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
