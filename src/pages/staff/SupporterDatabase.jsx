import { useState } from 'react'
import { useStore } from '../../store/Store'
import { Card, StatusBadge, Avatar } from '../../components/ui'
import { fmtDateShort } from '../../utils/format'

export default function SupporterDatabase() {
  const { peopleData } = useStore()
  const [query, setQuery] = useState('')
  const [districts, setDistricts] = useState(new Set())
  const [donorFilter, setDonorFilter] = useState('All')
  const [volFilter, setVolFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const districtOptions = ['D1', 'D2', 'D3', 'D4', 'D5']

  const filtered = peopleData.filter((p) => {
    const q = query.toLowerCase()
    const matchesQ = !q || p.name.toLowerCase().includes(q) || (p.email || '').toLowerCase().includes(q) || (p.tags || []).some((t) => t.includes(q))
    const matchesDistrict = districts.size === 0 || districts.has(p.district)
    const matchesDonor = donorFilter === 'All' || (donorFilter === 'Donors' ? p.donorStatus !== 'Non-donor' : p.donorStatus === 'Non-donor')
    const matchesVol = volFilter === 'All' || p.volunteerStatus === volFilter
    return matchesQ && matchesDistrict && matchesDonor && matchesVol
  })

  const toggleDistrict = (d) => {
    setDistricts((prev) => {
      const next = new Set(prev)
      if (next.has(d)) next.delete(d); else next.add(d)
      return next
    })
  }

  const rowClass = 'odd:bg-surface even:bg-surface-2'

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Supporter database</h1>
        <p className="mt-1 text-ink-muted">{peopleData.length} contacts · the core of the operation</p>
      </header>

      {/* Search + filters */}
      <div className="mt-5 flex flex-col lg:flex-row gap-3 items-start lg:items-center">
        <div className="relative flex-1 max-w-sm">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint">⌕</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email, or tag\u2026"
            aria-label="Search supporters" className="w-full rounded-sm border border-border bg-surface pl-9 pr-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by donor status">
        {['All', 'Donors', 'Non-donors'].map((f) => (
          <button key={f} type="button" onClick={() => setDonorFilter(f)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${donorFilter === f ? 'bg-primary text-white' : 'bg-surface border border-border text-ink-muted'}`}>
            {f}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by volunteer status">
        {['All', 'Active', 'Pending', 'Inactive'].map((f) => (
          <button key={f} type="button" onClick={() => setVolFilter(f)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${volFilter === f ? 'bg-primary text-white' : 'bg-surface border border-border text-ink-muted'}`}>
            {f}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by district">
        {districtOptions.map((d) => (
          <button key={d} type="button" onClick={() => toggleDistrict(d)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${districts.has(d) ? 'bg-accent text-[#1C2430]' : 'bg-surface border border-border text-ink-muted'}`}
            aria-pressed={districts.has(d)}>
            {d}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded border border-border bg-surface">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="bg-surface-2 text-left text-xs uppercase tracking-wide text-ink-muted sticky top-0">
              <th className="px-4 py-2.5 font-medium">Contact</th>
              <th className="px-4 py-2.5 font-medium">District</th>
              <th className="px-4 py-2.5 font-medium">Donor</th>
              <th className="px-4 py-2.5 font-medium">Volunteer</th>
              <th className="px-4 py-2.5 font-medium">Tags</th>
              <th className="px-4 py-2.5 font-medium">Last contact</th>
              <th className="px-4 py-2.5 font-medium">Total given</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 && <tr><td colSpan="7" className="px-4 py-8 text-center text-ink-muted">No contacts match your filters.</td></tr>}
            {filtered.map((p) => (
              <tr key={p.id} className={`${rowClass} ${p.id === selected ? 'bg-primary-tint' : ''} cursor-pointer`} onClick={() => setSelected(selected === p.id ? null : p.id)}>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={p.name} size="w-7 h-7" />
                    <div>
                      <p className="font-medium text-ink">{p.name}</p>
                      <p className="text-xs text-ink-muted">{p.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-ink-muted">{p.district}</td>
                <td className="px-4 py-2.5"><StatusBadge status={p.donorStatus} /></td>
                <td className="px-4 py-2.5"><StatusBadge status={p.volunteerStatus} /></td>
                <td className="px-4 py-2.5">
                  <div className="flex flex-wrap gap-1">
                    {(p.tags || []).map((t) => <span key={t} className="rounded-full bg-primary-tint px-2 py-0.5 text-[0.65rem] text-primary">{t}</span>)}
                  </div>
                </td>
                <td className="px-4 py-2.5 text-ink-muted">{fmtDateShort(p.lastContact)}</td>
                <td className="px-4 py-2.5 font-semibold text-ink">₦{((p.totalGiven || 0)).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail drawer */}
      {selected && (() => {
        const p = peopleData.find((x) => x.id === selected)
        if (!p) return null
        return (
          <Card className="mt-5 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar name={p.name} size="w-12 h-12" />
                <div>
                  <h2 className="font-serif text-lg font-bold text-primary">{p.name}</h2>
                  <p className="text-sm text-ink-muted">{p.email} · {p.district}</p>
                </div>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="text-sm text-ink-muted hover:text-primary">Close</button>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-sm border border-border bg-surface-2 p-3"><p className="text-xs text-ink-muted">Total given</p><p className="font-semibold text-ink">₦{(p.totalGiven || 0).toLocaleString()}</p></div>
              <div className="rounded-sm border border-border bg-surface-2 p-3"><p className="text-xs text-ink-muted">Doors</p><p className="font-semibold text-ink">{p.doorsKnocked}</p></div>
              <div className="rounded-sm border border-border bg-surface-2 p-3"><p className="text-xs text-ink-muted">Calls</p><p className="font-semibold text-ink">{p.callsMade}</p></div>
              <div className="rounded-sm border border-border bg-surface-2 p-3"><p className="text-xs text-ink-muted">Hours</p><p className="font-semibold text-ink">{p.hours}</p></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hov">Log contact</button>
              <button type="button" className="rounded-sm border border-border bg-surface px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-2">Assign shift</button>
              <button type="button" className="rounded-sm border border-border bg-surface px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-2">Add tag</button>
              <a href="/staff/outreach" className="rounded-sm border border-border bg-surface px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-2">Send message</a>
            </div>
          </Card>
        )
      })()}
    </div>
  )
}
