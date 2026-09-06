import { useStore } from '../../store/Store'
import { Card, StatusBadge, Thermometer, ProgressBar } from '../../components/ui'
import { fmtDateShort, fmtMoney } from '../../utils/format'

const FUND_GOALS = {
  'General Campaign Fund': 140000,
  'Volunteer Fund': 40000,
  'Events Fund': 30000,
  'Media Fund': 40000,
}

const PLEDGES = [
  { id: 1, name: 'Sam Kowalski', amount: 500, due: '2026-09-30', status: 'Pledged' },
  { id: 2, name: 'Hana Sato', amount: 150, due: '2026-10-05', status: 'Pledged' },
  { id: 3, name: 'Elena Petrova', amount: 240, due: '2026-09-18', status: 'Pledged' },
]

export default function Fundraising() {
  const { donationsData, fundraisingTotal, seed, peopleData } = useStore()

  const byFund = {}
  for (const d of donationsData) byFund[d.fund] = (byFund[d.fund] || 0) + d.amount

  const donorPerson = (d) => peopleData.find((p) => p.id === d.personId)

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Fundraising</h1>
        <p className="mt-1 text-ink-muted">Donor records, progress by fund, and pledge tracking.</p>
      </header>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-5">
            <h2 className="font-serif text-lg font-bold text-primary">Campaign progress</h2>
            <div className="mt-3">
              <Thermometer current={fundraisingTotal} goal={seed.CYCLE_GOAL} label="Total cycle fundraising" />
            </div>
          </Card>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(FUND_GOALS).map(([fund, goal]) => (
              <Card key={fund} className="p-4">
                <h3 className="text-sm font-semibold text-primary">{fund}</h3>
                <div className="mt-2">
                  <ProgressBar current={byFund[fund] || 0} goal={goal} label={`${fmtMoney(byFund[fund] || 0)} of ${fmtMoney(goal)}`} tone="accent" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Pledges */}
        <Card className="p-5">
          <h2 className="font-serif text-base font-bold text-primary">Open pledges</h2>
          <ul className="mt-3 divide-y divide-border">
            {PLEDGES.map((p) => (
              <li key={p.id} className="py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-ink">{p.name}</span>
                  <span className="font-semibold text-ink">{fmtMoney(p.amount)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-ink-muted mt-1">
                  <span>Due {fmtDateShort(p.due)}</span>
                  <StatusBadge status="Pledged" />
                </div>
              </li>
            ))}
          </ul>
          <button type="button" className="mt-3 w-full rounded-sm border border-border bg-surface px-4 py-2 text-sm font-medium text-primary hover:bg-surface-2">Log a new pledge</button>
        </Card>
      </div>

      {/* Donor log */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-primary">One-time & recurring donations</h2>
          <span className="text-sm text-ink-muted">{donationsData.length} records</span>
        </div>
        <div className="mt-3 overflow-x-auto rounded border border-border bg-surface">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="bg-surface-2 text-left text-xs uppercase tracking-wide text-ink-muted sticky top-0">
                <th className="px-4 py-2.5 font-medium">Date</th>
                <th className="px-4 py-2.5 font-medium">Donor</th>
                <th className="px-4 py-2.5 font-medium">Employer / occupation</th>
                <th className="px-4 py-2.5 font-medium">Fund</th>
                <th className="px-4 py-2.5 font-medium">Type</th>
                <th className="px-4 py-2.5 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...donationsData].sort((a, b) => new Date(b.date) - new Date(a.date)).map((d) => {
                const person = donorPerson(d)
                return (
                  <tr key={d.id} className="odd:bg-surface even:bg-surface-2">
                    <td className="px-4 py-2.5 text-ink-muted">{fmtDateShort(d.date)}</td>
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-ink">{person?.name || d.name || 'Walk-in donor'}</p>
                      <p className="text-xs text-ink-muted">{person?.email || d.email}</p>
                    </td>
                    <td className="px-4 py-2.5 text-ink-muted">{d.employer || '—'}{d.occupation ? ` / ${d.occupation}` : ''}</td>
                    <td className="px-4 py-2.5 text-ink-muted">{d.fund}</td>
                    <td className="px-4 py-2.5"><StatusBadge status={d.recurring ? 'Recurring' : 'Paid'} /></td>
                    <td className="px-4 py-2.5 font-semibold text-ink text-right">{fmtMoney(d.amount)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
