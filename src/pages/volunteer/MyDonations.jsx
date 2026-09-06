import { useStore } from '../../store/Store'
import { Card, StatusBadge } from '../../components/ui'
import { fmtDateShort, fmtMoney } from '../../utils/format'

export default function MyDonations() {
  const { currentUserDonations } = useStore()
  const total = currentUserDonations.reduce((s, d) => s + d.amount, 0)
  const recurring = currentUserDonations.filter((d) => d.recurring)

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">My donations</h1>
        <p className="mt-1 text-ink-muted">Your giving history and receipts. Every contribution supports fieldwork and voter contact.</p>
      </header>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-sm text-ink-muted">Total given</p>
          <p className="mt-1 font-serif text-3xl font-bold text-primary">{fmtMoney(total)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-ink-muted">Contributions</p>
          <p className="mt-1 font-serif text-3xl font-bold text-primary">{currentUserDonations.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-ink-muted">Active recurring</p>
          <p className="mt-1 font-serif text-3xl font-bold text-primary">{recurring.filter((d) => d.recurring).length}</p>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-lg font-bold text-primary">Donation history</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-2 text-left text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-3 py-2 font-medium">Date</th>
                  <th className="px-3 py-2 font-medium">Fund</th>
                  <th className="px-3 py-2 font-medium">Amount</th>
                  <th className="px-3 py-2 font-medium">Type</th>
                  <th className="px-3 py-2 font-medium">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {currentUserDonations.length === 0 && (
                  <tr><td colSpan="5" className="px-3 py-6 text-center text-ink-muted">No donations yet. <a href="/donate" className="text-primary font-semibold hover:underline">Make your first contribution</a>.</td></tr>
                )}
                {currentUserDonations.map((d) => (
                  <tr key={d.id} className="odd:bg-surface even:bg-surface-2">
                    <td className="px-3 py-2.5">{fmtDateShort(d.date)}</td>
                    <td className="px-3 py-2.5 text-ink-muted">{d.fund}</td>
                    <td className="px-3 py-2.5 font-semibold">{fmtMoney(d.amount)}</td>
                    <td className="px-3 py-2.5"><StatusBadge status={d.recurring ? 'Recurring' : 'Paid'} /></td>
                    <td className="px-3 py-2.5"><a href="#receipt" className="text-accent font-semibold hover:underline">Download</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Manage recurring giving</h2>
            {recurring.length === 0 ? (
              <p className="mt-2 text-sm text-ink-muted">You don\u2019t have an active monthly gift. Monthly contributions provide steady funding for field organizing and voter contact.</p>
            ) : (
              <ul className="mt-2 space-y-3">
                {recurring.map((d) => (
                  <li key={d.id} className="rounded-sm border border-border bg-surface-2 p-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-ink">{fmtMoney(d.amount)}/mo</span>
                      <StatusBadge status="Recurring" />
                    </div>
                    <p className="mt-1 text-xs text-ink-muted">{d.fund}</p>
                  </li>
                ))}
              </ul>
            )}
            <button type="button" className="mt-4 w-full rounded-sm border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5">
              {recurring.length ? 'Update monthly gift' : 'Become a monthly donor'}
            </button>
          </Card>

          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Tax note</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Political contributions are not tax deductible as charitable gifts. Download your receipts to keep with your records. Contribution disclosure details are in our <a href="/compliance" className="text-primary hover:underline">compliance section</a>.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
