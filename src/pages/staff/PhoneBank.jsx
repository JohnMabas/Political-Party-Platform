import { useState } from 'react'
import { useStore } from '../../store/Store'
import { Card, StatusBadge } from '../../components/ui'

const CALL_SCRIPT = [
  { step: '1', line: '"Hi, this is {your first name} — I\u2019m a volunteer with the Common Ground Party. Am I catching you at a good time?"' },
  { step: '2', line: '"Do you know whether your voter registration is current, and have you made a plan to vote?"' },
  { step: '3', line: '"If you\u2019re already with us, great — can we count on you this election? Is there any way we can help you get to the polls?"' },
  { step: '4', line: '"Thanks so much for your time. Have a great day!" Then log the result below.' },
]

const RESULTS = ['Supporter', 'Undecided', 'Opposed', 'Not at door', 'Refused']

export default function PhoneBank() {
  const { peopleData, logCanvassResult, totalCallsMade } = useStore()
  const [results, setResults] = useState({})

  const callList = peopleData.filter((p) => p.volunteerStatus !== 'Inactive' || p.donorStatus !== 'Non-donor').slice(0, 8)

  const logCall = (pid, result) => {
    logCanvassResult({ personId: pid, result, type: 'phone' })
    setResults((prev) => ({ ...prev, [pid]: result }))
  }

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Phone bank</h1>
        <p className="mt-1 text-ink-muted">{totalCallsMade.toLocaleString()} calls logged this cycle</p>
      </header>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Script */}
        <Card className="p-5">
          <h2 className="font-serif text-base font-bold text-primary">Call script</h2>
          <ol className="mt-3 space-y-3">
            {CALL_SCRIPT.map((s) => (
              <li key={s.step} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-tint text-xs font-bold text-primary">{s.step}</span>
                <span className="text-ink-muted leading-relaxed">{s.line}</span>
              </li>
            ))}
          </ol>
        </Card>

        {/* Call list */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-primary">Assigned call list</h2>
            <span className="text-sm text-ink-muted">{callList.length} numbers</span>
          </div>
          <div className="mt-3 overflow-x-auto rounded border border-border bg-surface">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-2 text-left text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-4 py-2.5 font-medium">Contact</th>
                  <th className="px-4 py-2.5 font-medium">District</th>
                  <th className="px-4 py-2.5 font-medium">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {callList.map((p) => (
                  <tr key={p.id} className="odd:bg-surface even:bg-surface-2">
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-ink">{p.name}</p>
                      <p className="text-xs text-ink-muted">{p.email} · {p.district}</p>
                    </td>
                    <td className="px-4 py-2.5"><StatusBadge status={p.donorStatus === 'Non-donor' ? 'Supporter' : p.donorStatus} /></td>
                    <td className="px-4 py-2.5">
                      {results[p.id] ? (
                        <StatusBadge status={results[p.id]} />
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {RESULTS.map((r) => (
                            <button key={r} type="button" onClick={() => logCall(p.id, r)}
                              className="rounded-full px-2 py-0.5 text-[0.7rem] font-medium bg-surface-2 text-ink-muted hover:bg-primary-tint hover:text-primary">
                              {r}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
