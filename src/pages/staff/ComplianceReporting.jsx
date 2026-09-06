import { useStore } from '../../store/Store'
import { Card, StatusBadge, Thermometer } from '../../components/ui'
import { fmtDateShort, fmtMoney, daysUntil } from '../../utils/format'

export default function ComplianceReporting() {
  const { donationsData, fundraisingTotal, seed, peopleData } = useStore()
  const { filingDeadlines } = useStore()

  const totalContributions = donationsData.reduce((s, d) => s + d.amount, 0)

  const deadlines = [...filingDeadlines].map((fd) => ({
    ...fd,
    days: daysUntil(fd.date),
    status: daysUntil(fd.date) <= 3 ? 'Due soon' : daysUntil(fd.date) <= 14 ? 'Upcoming' : 'On track',
  }))

  const byFund = {}
  for (const d of donationsData) byFund[d.fund] = (byFund[d.fund] || 0) + d.amount

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Compliance & reporting</h1>
        <p className="mt-1 text-ink-muted">Itemized contribution log, expenditures, and filing deadlines.</p>
      </header>

      {/* Deadlines */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {deadlines.map((fd) => (
          <Card key={fd.id} className="p-4">
            <div className="flex items-center justify-between">
              <StatusBadge status={fd.status} />
              <span className={`text-xs font-semibold ${fd.days <= 3 ? 'text-urgent' : 'text-ink-muted'}`}>{fd.days} days out</span>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-primary leading-tight">{fd.title}</h3>
            <p className="text-xs text-ink-muted mt-1">{fd.type} · due {fmtDateShort(fd.date)}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contribution summary */}
        <Card className="lg:col-span-2 p-5">
          <h2 className="font-serif text-lg font-bold text-primary">Itemized contribution log</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Every contribution appears here automatically and is formatted for our filings. {donationsData.length} records · {fmtMoney(totalContributions)} total.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="bg-surface-2 text-left text-xs uppercase tracking-wide text-ink-muted sticky top-0">
                  <th className="px-3 py-2 font-medium">Date</th>
                  <th className="px-3 py-2 font-medium">Name</th>
                  <th className="px-3 py-2 font-medium">Address</th>
                  <th className="px-3 py-2 font-medium">Employer/Occupation</th>
                  <th className="px-3 py-2 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[...donationsData].sort((a, b) => new Date(b.date) - new Date(a.date)).map((d) => {
                  const person = peopleData.find((p) => p.id === d.personId)
                  return (
                    <tr key={d.id} className="odd:bg-surface even:bg-surface-2">
                      <td className="px-3 py-2 tabular-nums">{fmtDateShort(d.date)}</td>
                      <td className="px-3 py-2 font-medium text-ink">{person?.name || d.name || 'Walk-in'}</td>
                      <td className="px-3 py-2 text-ink-muted">{d.address || '—'}</td>
                      <td className="px-3 py-2 text-ink-muted">{(d.employer || '—')}{d.occupation ? ` / ${d.occupation}` : ''}</td>
                      <td className="px-3 py-2 text-right font-semibold">{fmtMoney(d.amount)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hov">Export for filing (CSV)</button>
            <button type="button" className="rounded-sm border border-border bg-surface px-4 py-2 text-sm font-medium text-primary hover:bg-surface-2">Generate report</button>
          </div>
        </Card>

        {/* Expenditure + by-fund */}
        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Expenditures</h2>
            <ul className="mt-3 divide-y divide-border text-sm">
              <li className="py-2 flex justify-between"><span className="text-ink-muted">Field materials & signage</span><span className="font-medium">$12,400</span></li>
              <li className="py-2 flex justify-between"><span className="text-ink-muted">Phone & dialer</span><span className="font-medium">$6,800</span></li>
              <li className="py-2 flex justify-between"><span className="text-ink-muted">Events & venues</span><span className="font-medium">$9,100</span></li>
              <li className="py-2 flex justify-between"><span className="text-ink-muted">Mail & digital</span><span className="font-medium">$18,700</span></li>
              <li className="py-2 flex justify-between border-t-2 border-border"><span className="font-medium text-ink">Total to date</span><span className="font-semibold">$47,000</span></li>
            </ul>
          </Card>
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Raised to spend</h2>
            <div className="mt-3">
              <Thermometer current={fundraisingTotal} goal={seed.CYCLE_GOAL} label="Cycle raised" />
            </div>
            <div className="mt-4 space-y-3">
              {Object.entries(byFund).map(([fund, amt]) => (
                <div key={fund} className="flex justify-between text-sm">
                  <span className="text-ink-muted">{fund}</span>
                  <span className="font-medium">{fmtMoney(amt)}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
