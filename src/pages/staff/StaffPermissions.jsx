import { useState } from 'react'
import { useStore } from '../../store/Store'
import { Card, StatusBadge, Avatar } from '../../components/ui'

export default function StaffPermissions() {
  const { seed } = useStore()
  const [people, setPeople] = useState(seed.staff)
  const [invite, setInvite] = useState(false)

  const toggleRole = (id) => {
    setPeople((prev) => prev.map((p) => {
      if (p.id !== id) return p
      const role = p.role === 'admin' ? 'organizer' : 'admin'
      return { ...p, role }
    }))
  }

  return (
    <div>
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Staff & permissions</h1>
          <p className="mt-1 text-ink-muted">Manage who has organizer vs. full admin access.</p>
        </div>
        <button type="button" onClick={() => setInvite(!invite)} className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hov">+ Invite staff</button>
      </header>

      {invite && (
        <Card className="mt-6 p-6">
          <h2 className="font-serif text-lg font-bold text-primary">Invite a team member</h2>
          <form className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="in-name" className="mb-1 block text-sm font-medium text-ink">Name</label>
              <input id="in-name" className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="in-email" className="mb-1 block text-sm font-medium text-ink">Email</label>
              <input id="in-email" type="email" className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="in-role" className="mb-1 block text-sm font-medium text-ink">Role</label>
              <select id="in-role" className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                <option>Field Organizer</option><option>Staff / Admin</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <button type="submit" className="rounded-sm bg-accent px-5 py-2 text-sm font-semibold text-[#1C2430] hover:bg-accent/90">Send invite</button>
            </div>
          </form>
        </Card>
      )}

      <Card className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-surface-2 text-left text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-4 py-2.5 font-medium">Team member</th>
                <th className="px-4 py-2.5 font-medium">Title</th>
                <th className="px-4 py-2.5 font-medium">Access</th>
                <th className="px-4 py-2.5 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {people.map((p) => (
                <tr key={p.id} className="odd:bg-surface even:bg-surface-2">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={p.name} size="w-7 h-7" />
                      <div>
                        <p className="font-medium text-ink">{p.name}</p>
                        <p className="text-xs text-ink-muted">{p.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-ink-muted">{p.title}</td>
                  <td className="px-4 py-2.5">
                    <StatusBadge status={p.role === 'admin' ? 'Recurring' : 'Active'} />
                    <span className="ml-2 text-xs text-ink-muted">{p.role === 'admin' ? 'Admin' : 'Organizer'}</span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button type="button" onClick={() => toggleRole(p.id)}
                      className="rounded-sm border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-primary hover:bg-surface-2">
                      {p.role === 'admin' ? 'Demote to organizer' : 'Promote to admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-5 rounded border border-border bg-surface-2 p-5 text-sm text-ink-muted">
        <p className="font-semibold text-ink">How access works</p>
        <p className="mt-1">
          Organizers work the field: supporter records, canvassing, phone banks, events, volunteer management, and their own segment sends. Admins additionally control fundraising records, compliance filing, site content publishing, and staff permissions.
        </p>
      </div>
    </div>
  )
}