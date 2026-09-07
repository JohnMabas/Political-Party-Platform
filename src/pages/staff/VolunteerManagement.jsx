import { useStore } from '../../store/Store'
import { Card, StatusBadge, Avatar } from '../../components/ui'

export default function VolunteerManagement() {
  const { peopleData, approveVolunteer, assignShift, setVolunteerStatus } = useStore()

  const pending = peopleData.filter((p) => p.volunteerStatus === 'Pending')
  const active = peopleData.filter((p) => p.volunteerStatus === 'Active')
  const inactive = peopleData.filter((p) => p.volunteerStatus === 'Inactive')

  const activeSum = active.reduce((s, p) => s + p.hours, 0)

  const assign = (person) => {
    assignShift(person.id, { title: 'Lagos Island canvass — Marina & Broad', type: 'canvass', date: '2026-09-19' })
  }

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Volunteer management</h1>
        <p className="mt-1 text-ink-muted">Recruit pipeline, role assignment, hours, and approvals.</p>
      </header>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-ink-muted">Pending approval</p>
          <p className="mt-1 font-serif text-3xl font-bold text-primary">{pending.length}</p>
          <p className="text-xs text-ink-muted">{active.length} active · {inactive.length} inactive</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-ink-muted">Hours, active volunteers</p>
          <p className="mt-1 font-serif text-3xl font-bold text-primary">{activeSum}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-ink-muted">Recruit pipeline</p>
          <p className="mt-1 font-serif text-3xl font-bold text-primary">{pending.length + active.length + inactive.length}</p>
          <p className="text-xs text-accent">{pending.length} waiting on approval</p>
        </Card>
      </div>

      {/* Pending pipeline */}
      <h2 className="mt-8 font-serif text-lg font-bold text-primary">Approve new sign-ups</h2>
      <div className="mt-3 space-y-3">
        {pending.length === 0 && <Card className="p-5 text-sm text-ink-muted">No volunteers waiting for approval right now.</Card>}
        {pending.map((p) => (
          <Card key={p.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar name={p.name} />
              <div>
                <p className="font-medium text-ink">{p.name}</p>
                <p className="text-xs text-ink-muted">{p.email} · {p.district} · {(p.tags || []).join(', ')}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => approveVolunteer(p.id)} className="rounded-sm bg-community px-3 py-1.5 text-sm font-semibold text-white hover:opacity-90">Approve</button>
              <button type="button" onClick={() => assign(p)} className="rounded-sm bg-primary px-3 py-1.5 text-sm font-semibold text-white hover:bg-primary-hov">Approve & assign shift</button>
              <button type="button" onClick={() => setVolunteerStatus(p.id, 'Inactive')} className="rounded-sm border border-border bg-surface px-3 py-1.5 text-sm font-medium text-ink-muted hover:bg-surface-2">Decline</button>
            </div>
          </Card>
        ))}
      </div>

      {/* Active roster */}
      <h2 className="mt-8 font-serif text-lg font-bold text-primary">Active roster</h2>
      <div className="mt-3 overflow-x-auto rounded border border-border bg-surface">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="bg-surface-2 text-left text-xs uppercase tracking-wide text-ink-muted sticky top-0">
              <th className="px-4 py-2.5 font-medium">Volunteer</th>
              <th className="px-4 py-2.5 font-medium">District</th>
              <th className="px-4 py-2.5 font-medium">Role</th>
              <th className="px-4 py-2.5 font-medium">Hours</th>
              <th className="px-4 py-2.5 font-medium">Doors</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {active.map((p) => (
              <tr key={p.id} className="odd:bg-surface even:bg-surface-2">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Avatar name={p.name} size="w-7 h-7" />
                    <span className="font-medium text-ink">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-ink-muted">{p.district}</td>
                <td className="px-4 py-2.5 text-ink-muted">{(p.tags || []).join(', ')}</td>
                <td className="px-4 py-2.5 tabular-nums">{p.hours}</td>
                <td className="px-4 py-2.5 tabular-nums">{p.doorsKnocked}</td>
                <td className="px-4 py-2.5"><StatusBadge status="Active" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
