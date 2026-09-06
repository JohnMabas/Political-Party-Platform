import { useState } from 'react'
import { useStore } from '../../store/Store'
import { Card, StatusBadge, ProgressBar } from '../../components/ui'
import { fmtDateShort } from '../../utils/format'

const PHYSICAL_RESULTS = ['Not home', 'Supporter', 'Undecided', 'Opposed', 'Refused']

export default function MyTasks() {
  const { currentUser, assignments, logCanvassResult, logHours, peopleData, seed } = useStore()
  const [openShift, setOpenShift] = useState(null)
  const [selected, setSelected] = useState('')
  const [logged, setLogged] = useState(null)

  const myAssignments = assignments.filter((a) => a.personId === currentUser?.id)
  const me = peopleData.find((p) => p.id === currentUser?.id)
  const resultsList = PHYSICAL_RESULTS

  const record = (a) => {
    if (!selected) return
    logCanvassResult({ personId: currentUser.id, result: selected, type: a.type })
    if (a.type === 'canvass') logHours(currentUser.id, 2)
    else logHours(currentUser.id, 1)
    setLogged(a.id)
    setSelected('')
  }

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">My tasks</h1>
        <p className="mt-1 text-ink-muted">Your assigned shifts and open opportunities. Logging a result counts toward your hours.</p>
      </header>

      {/* Hours progress */}
      <Card className="mt-6 p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <p className="text-sm text-ink-muted">Hours logged this cycle</p>
          <p className="font-serif text-2xl font-bold text-primary">{me?.hours || 0} hours</p>
        </div>
        <div className="w-full sm:w-64">
          <ProgressBar current={me?.hours || 0} goal={30} label="Toward 30-hour volunteer milestone" tone="community" />
        </div>
      </Card>

      {/* My assigned shifts */}
      <h2 className="mt-8 font-serif text-lg font-bold text-primary">My assigned shifts</h2>
      <div className="mt-3 space-y-4">
        {myAssignments.length === 0 && (
          <Card className="p-5 text-sm text-ink-muted">No shifts assigned yet. Sign up on the events page or talk to your chapter organizer.</Card>
        )}
        {myAssignments.map((a) => (
          <Card key={a.id} className="p-5">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={a.type === 'phone' ? 'Phone Bank' : 'Canvass'} />
                  <span className="text-xs text-ink-muted">{fmtDateShort(a.date)}</span>
                </div>
                <h3 className="mt-1 font-serif text-lg font-bold text-primary">{a.title}</h3>
                <p className="text-sm text-ink-muted">Status: <StatusBadge status={a.status === 'assigned' ? 'Assigned' : a.status} /></p>
              </div>
              <button type="button" onClick={() => { setOpenShift(openShift === a.id ? null : a.id); setLogged(null) }}
                className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hov">
                {openShift === a.id ? 'Close' : 'Log results'}
              </button>
            </div>

            {openShift === a.id && logged === a.id ? (
              <div className="mt-4 rounded-sm border border-community bg-community-tint px-4 py-3 text-sm">
                <p className="font-semibold text-community">Result recorded.</p>
                <p className="mt-0.5 text-ink">Thanks — your door/call count and hours have been updated, and the supporter database has been refreshed.</p>
              </div>
            ) : openShift === a.id ? (
              <div className="mt-4 border-t border-border pt-4">
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-ink">What was the result?</legend>
                  <div className="flex flex-wrap gap-2" role="group">
                    {resultsList.map((r) => (
                      <button key={r} type="button" onClick={() => setSelected(r)}
                        className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                          selected === r ? 'bg-primary text-white' : 'bg-surface-2 text-ink-muted hover:text-primary'}`}
                        aria-pressed={selected === r}>
                        {r}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <button type="button" onClick={() => record(a)} disabled={!selected}
                  className="mt-4 rounded-sm bg-accent px-5 py-2 text-sm font-semibold text-[#1C2430] hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed">
                  Log result & count hours
                </button>
              </div>
            ) : null}
          </Card>
        ))}
      </div>

      {/* Open shifts */}
      <h2 className="mt-8 font-serif text-lg font-bold text-primary">Open shifts near you</h2>
      <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {seed.events.filter((e) => new Date(e.date) > new Date()).map((e) => (
          <Card key={e.id} className="p-4">
            <div className="flex items-center gap-2">
              <StatusBadge status={e.type} />
              <span className="text-xs text-ink-muted">{fmtDateShort(e.date)}</span>
            </div>
            <h3 className="mt-1 font-serif text-base font-bold text-primary">{e.title}</h3>
            <p className="text-sm text-ink-muted mt-0.5">{e.location}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-ink-muted">{e.rsvps}/{e.capacity} RSVP\u2019d</span>
              <button type="button" className="text-sm font-semibold text-accent hover:underline">Request a slot</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
