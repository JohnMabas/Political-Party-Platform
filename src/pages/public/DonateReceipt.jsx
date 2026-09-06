import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { fmtMoney } from '../../utils/format'

export default function DonateReceipt() {
  const location = useLocation()
  const { donationsData } = useStore()
  const { donationId, amount, recurring, name } = location.state || {}
  const donation = donationsData.find((d) => d.id === donationId)

  const receiptNo = `CGP-${String(donationId || 0).padStart(5, '0')}`

  return (
    <div>
      <section className="border-b border-border bg-community text-white">
        <div className="container-site py-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-3xl" aria-hidden="true">✓</div>
          <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-white">Thank you{name ? `, ${name.split(' ')[0]}` : ''}</h1>
          <p className="mx-auto mt-2 max-w-xl text-white/85">
            Your contribution of <strong>{fmtMoney(amount || 0)}{recurring ? ' every month' : ''}</strong> just went to work for the campaign. You are one of the people who make this possible.
          </p>
        </div>
      </section>

      <section className="container-site py-10 max-w-2xl">
        <div className="rounded border border-border bg-surface overflow-hidden">
          <div className="border-b border-border bg-surface-2 px-6 py-3 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-primary">Your receipt</h2>
            <span className="text-sm text-ink-muted">No. {receiptNo}</span>
          </div>
          <dl className="divide-y divide-border text-sm">
            <div className="flex justify-between px-6 py-3"><dt className="text-ink-muted">Status</dt><dd className="font-semibold text-community">Paid</dd></div>
            <div className="flex justify-between px-6 py-3"><dt className="text-ink-muted">Amount</dt><dd className="font-semibold text-ink">{fmtMoney(amount || 0)}{recurring ? ' (monthly)' : ''}</dd></div>
            <div className="flex justify-between px-6 py-3"><dt className="text-ink-muted">Fund</dt><dd className="text-ink">{donation?.fund || 'General Campaign Fund'}</dd></div>
            <div className="flex justify-between px-6 py-3"><dt className="text-ink-muted">Contributor</dt><dd className="text-ink">{name || donation?.name || 'You'}</dd></div>
            <div className="flex justify-between px-6 py-3"><dt className="text-ink-muted">Date</dt><dd className="text-ink">{donation?.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</dd></div>
            <div className="flex justify-between px-6 py-3"><dt className="text-ink-muted">Acknowledged by</dt><dd className="text-ink">Common Ground Party Accountability Committee</dd></div>
          </dl>
        </div>

        <div className="mt-4 rounded border border-border bg-surface-2 px-5 py-4 text-xs text-ink-muted">
          <p>This acknowledgment confirms your contribution. Contributions to the Common Ground Party Accountability Committee are not tax deductible as charitable contributions. Your contribution and required disclosure information are recorded in our public filings. If your total contributions exceed $200 in a calendar year, the Committee is required to collect and report your name, mailing address, occupation, and employer under applicable election law.</p>
        </div>

        <div className="mt-6">
          <h2 className="font-serif text-lg font-bold text-primary">Share why you give</h2>
          <p className="text-sm text-ink-muted mt-1">The most powerful thing you can do next is tell someone why this campaign matters to you.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="inline-flex items-center border border-border bg-surface px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-2 rounded-sm">Copy share link</button>
            <button type="button" className="inline-flex items-center border border-border bg-surface px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-2 rounded-sm">Share on social</button>
            <button type="button" className="inline-flex items-center border border-border bg-surface px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-2 rounded-sm">Email a friend</button>
          </div>
          <div className="mt-2 rounded-sm border border-border bg-surface px-3 py-2 text-sm text-ink-faint">commonground.demo/{name ? name.toLowerCase().replace(/\s+/g, '-') : 'you'}</div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link to="/take-action" className="inline-flex items-center justify-center border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 rounded-sm">Volunteer next</Link>
          <Link to="/" className="inline-flex items-center justify-center bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hov rounded-sm">Back to homepage</Link>
        </div>
      </section>
    </div>
  )
}
