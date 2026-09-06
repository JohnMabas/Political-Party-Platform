import { useState } from 'react'
import { useStore } from '../../store/Store'
import { Card, StatusBadge, Avatar } from '../../components/ui'

const TURFS = [
  { id: 1, name: 'Riverside — Elm St & 2nd Ave', address: '400–700 block of Elm St', assignedTo: 1, size: 42 },
  { id: 2, name: 'Riverside — Maple & 5th', address: '100–300 block of Maple Ave', assignedTo: 7, size: 38 },
  { id: 3, name: 'Downtown — Union corridor', address: 'Union Ave, 200–500 block', assignedTo: null, size: 51 },
  { id: 4, name: 'Central — Depot & Mill', address: 'Depot St & Mill St', assignedTo: null, size: 33 },
]

const RESULTS = ['Supporter', 'Undecided', 'Opposed', 'Not home', 'Refused']

export default function Canvassing() {
  const { peopleData, logCanvassResult, totalDoorsKnocked } = useStore()
  const [activeTurf, setActiveTurf] = useState(null)
  const [resultMap, setResultMap] = useState({})

  const canvassers = peopleData.filter((p) => p.tags?.includes('canvasser') || p.volunteerStatus === 'Active')

  const recordResult = (turfId, result, personId) => {
    logCanvassResult({ personId: personId || 1, result, type: 'door' })
    setResultMap((prev) => ({ ...prev, [turfId]: result }))
  }

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Canvassing & field</h1>
        <p className="mt-1 text-ink-muted">{totalDoorsKnocked.toLocaleString()} doors knocked this cycle</p>
      </header>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Turf list */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-primary">Walk lists by turf</h2>
            <button type="button" className="rounded-sm bg-primary px-3 py-1.5 text-sm font-semibold text-white hover:bg-primary-hov">+ New turf</button>
          </div>
          <div className="mt-3 space-y-3">
            {TURFS.map((t) => {
              const assignee = t.assignedTo ? peopleData.find((p) => p.id === t.assignedTo) : null
              const status = resultMap[t.id] ? 'Completed' : assignee ? 'Assigned' : t.assignedTo === null ? 'Awaiting' : 'Open'
              return (
                <Card key={t.id} className="p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={status} />
                        <span className="text-xs text-ink-muted">~{t.size} doors</span>
                      </div>
                      <h3 className="mt-1 font-serif text-base font-bold text-primary">{t.name}</h3>
                      <p className="text-sm text-ink-muted">{t.address}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {assignee && <span className="flex items-center gap-1.5 text-sm text-ink-muted"><Avatar name={assignee.name} size="w-6 h-6" />{assignee.name.split(' ')[0]}</span>}
                      <button type="button" onClick={() => setActiveTurf(activeTurf === t.id ? null : t.id)}
                        className="rounded-sm border border-border bg-surface px-3 py-1.5 text-sm font-medium text-primary hover:bg-surface-2">
                        {activeTurf === t.id ? 'Close' : 'Log results'}
                      </button>
                    </div>
                  </div>
                  {activeTurf === t.id && (
                    <div className="mt-3 border-t border-border pt-3">
                      <p className="text-sm font-medium text-ink mb-2">Record a result for this turf:</p>
                      <div className="flex flex-wrap gap-2">
                        {RESULTS.map((r) => (
                          <button key={r} type="button" onClick={() => recordResult(t.id, r, t.assignedTo)}
                            className={`rounded-full px-3 py-1.5 text-sm font-medium ${resultMap[t.id] === r ? 'bg-primary text-white' : 'bg-surface-2 text-ink-muted hover:text-primary'}`}>
                            {r}
                          </button>
                        ))}
                      </div>
                      {resultMap[t.id] && <p className="mt-2 text-xs text-community">Result recorded — supporter database updated.</p>}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </div>

        {/* Assign / map */}
        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Assign a walk list</h2>
            <div className="mt-3 space-y-2">
              <label htmlFor="as-turf" className="block text-sm font-medium text-ink">Turf</label>
              <select id="as-turf" className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                {TURFS.filter((t) => !t.assignedTo).map((t) => <option key={t.id}>{t.name}</option>)}
                {TURFS.filter((t) => !t.assignedTo).length === 0 && <option>All turfs assigned</option>}
              </select>
              <label htmlFor="as-vol" className="mt-2 block text-sm font-medium text-ink">Volunteer</label>
              <select id="as-vol" className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                {canvassers.map((c) => <option key={c.id}>{c.name}</option>)}
              </select>
              <button type="button" className="mt-3 w-full rounded-sm bg-accent px-4 py-2 text-sm font-semibold text-[#1C2430] hover:bg-accent/90">Assign</button>
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Turf boundaries</h2>
            <div className="mt-3 h-48 rounded-sm border border-border bg-surface-2 flex items-center justify-center text-sm text-ink-faint" aria-hidden="true">Interactive map placeholder</div>
            <p className="mt-2 text-xs text-ink-muted">Walk-list boundaries sync to the map layer in the full field tool.</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
