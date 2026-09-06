import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { Card, Thermometer } from '../../components/ui'
import { fmtMoney } from '../../utils/format'

const FUNDS = [
  'General Campaign Fund',
  'Volunteer Fund',
  'Events Fund',
  'Media Fund',
]

export default function Donate() {
  const { donate, fundraisingTotal, progressPct, seed } = useStore()
  const navigate = useNavigate()

  const [amount, setAmount] = useState(25)
  const [custom, setCustom] = useState('')
  const [recurring, setRecurring] = useState(false)
  const [fund, setFund] = useState(FUNDS[0])
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', state: '', zip: '', employer: '', occupation: '' })
  const [error, setError] = useState('')

  const presets = [25, 50, 100, 250, 500]
  const finalAmount = custom ? Number(custom) : amount

  const submit = (e) => {
    e.preventDefault()
    if (!finalAmount || finalAmount < 1) { setError('Please choose a donation amount.'); return }
    if (!form.name || !form.address || !form.employer || !form.occupation) {
      setError('We are required to collect your name, address, employer, and occupation. Please complete these fields.')
      return
    }
    const donation = donate({
      amount: finalAmount,
      fund,
      recurring,
      name: form.name,
      email: form.email,
      employer: form.employer,
      occupation: form.occupation,
      address: `${form.address}, ${form.city} ${form.state} ${form.zip}`,
    })
    navigate('/donate/receipt', { state: { donationId: donation.id, amount: finalAmount, recurring, name: form.name } })
  }

  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/70 italic">Contribute</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">Help us reach every voter before November</h1>
          <p className="mt-3 max-w-2xl text-white/75">
            Your contribution goes straight to field organizing, mail, phone banks, and the day-to-day work of a people-powered campaign. Small-dollar donations are the backbone — thank you for being part of it.
          </p>
          <div className="mt-6 max-w-lg">
            <Thermometer current={fundraisingTotal} goal={seed.CYCLE_GOAL} label="Cycle fundraising" />
          </div>
        </div>
      </section>

      <section className="container-site py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={submit} className="space-y-8">
            {/* Amount */}
            <Card className="p-6">
              <h2 className="font-serif text-lg font-bold text-primary">1. Choose your amount</h2>
              <fieldset className="mt-4">
                <legend className="sr-only">Donation amount presets</legend>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" role="radiogroup">
                  {presets.map((p) => (
                    <label key={p} className={`flex cursor-pointer items-center justify-center rounded-sm border px-3 py-3 text-center ${!custom && amount === p ? 'border-accent bg-accent-tint ring-1 ring-accent' : 'border-border bg-surface hover:border-accent/60'}`}>
                      <input type="radio" name="amount-preset" className="sr-only" checked={!custom && amount === p}
                        onChange={() => { setAmount(p); setCustom('') }} />
                      <span className={`font-semibold ${!custom && amount === p ? 'text-[#1C2430]' : 'text-ink-muted'}`}>${p}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-3">
                  <label htmlFor="custom-amount" className="mb-1 block text-sm font-medium text-ink">Or enter another amount</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint">$</span>
                    <input id="custom-amount" inputMode="decimal" value={custom} onChange={(e) => { setCustom(e.target.value.replace(/[^\d.]/g, '')); setAmount(0) }}
                      placeholder="25.00" className="w-40 rounded-sm border border-border bg-surface py-2 pl-7 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
              </fieldset>

              <div className="mt-5">
                <fieldset>
                  <legend className="mb-2 block text-sm font-medium text-ink">Frequency</legend>
                  <div className="flex gap-2">
                    <label className={`flex cursor-pointer items-center gap-2 rounded-sm border px-4 py-2 text-sm font-medium ${!recurring ? 'border-accent bg-accent-tint' : 'border-border bg-surface'}`}>
                      <input type="radio" name="frequency" className="sr-only" checked={!recurring} onChange={() => setRecurring(false)} />
                      One-time
                    </label>
                    <label className={`flex cursor-pointer items-center gap-2 rounded-sm border px-4 py-2 text-sm font-medium ${recurring ? 'border-accent bg-accent-tint' : 'border-border bg-surface'}`}>
                      <input type="radio" name="frequency" className="sr-only" checked={recurring} onChange={() => setRecurring(true)} />
                      Monthly
                    </label>
                  </div>
                </fieldset>
              </div>
            </Card>

            {/* Fund allocation */}
            <Card className="p-6">
              <h2 className="font-serif text-lg font-bold text-primary">2. Where should it go?</h2>
              <div className="mt-4">
                <label htmlFor="fund" className="mb-1 block text-sm font-medium text-ink">Designate your contribution (optional)</label>
                <select id="fund" value={fund} onChange={(e) => setFund(e.target.value)}
                  className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                  {FUNDS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </Card>

            {/* Disclosures */}
            <Card className="p-6">
              <h2 className="font-serif text-lg font-bold text-primary">3. Your details</h2>
              <p className="mt-1 text-sm text-ink-muted">Federal law requires us to collect and report the name, address, employer, and occupation of everyone who contributes more than $200 in an election cycle. We collect them on every contribution to protect you and to keep our records accurate.</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="d-name" className="mb-1 block text-sm font-medium text-ink">Full legal name <span className="text-urgent">*</span></label>
                  <input id="d-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label htmlFor="d-email" className="mb-1 block text-sm font-medium text-ink">Email</label>
                  <input id="d-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="d-address" className="mb-1 block text-sm font-medium text-ink">Street address <span className="text-urgent">*</span></label>
                  <input id="d-address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label htmlFor="d-city" className="mb-1 block text-sm font-medium text-ink">City</label>
                  <input id="d-city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="d-state" className="mb-1 block text-sm font-medium text-ink">State</label>
                    <input id="d-state" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label htmlFor="d-zip" className="mb-1 block text-sm font-medium text-ink">ZIP</label>
                    <input id="d-zip" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
                <div>
                  <label htmlFor="d-employer" className="mb-1 block text-sm font-medium text-ink">Employer <span className="text-urgent">*</span></label>
                  <input id="d-employer" required value={form.employer} onChange={(e) => setForm({ ...form, employer: e.target.value })} placeholder="Self-employed" className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label htmlFor="d-occupation" className="mb-1 block text-sm font-medium text-ink">Occupation <span className="text-urgent">*</span></label>
                  <input id="d-occupation" required value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} placeholder="Your job title" className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
            </Card>

            {error && (
              <div role="alert" className="rounded-sm border border-urgent bg-urgent-tint px-4 py-3 text-sm font-medium text-ink">{error}</div>
            )}

            <div className="rounded-sm border border-border bg-surface p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-ink-muted">Your total</p>
                  <p className="font-serif text-3xl font-bold text-primary">{fmtMoney(finalAmount || 0)}{recurring ? <span className="text-lg text-ink-muted align-middle ml-1">/mo</span> : ''}</p>
                </div>
                <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center bg-accent px-8 py-3 text-base font-semibold text-[#1C2430] hover:bg-accent/90 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                  {recurring ? 'Start monthly giving' : 'Contribute now'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Info column */}
        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Contribution limits</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li>• Maximum individual contribution: $6,600 per election.</li>
              <li>• Contributions are not tax deductible as charitable gifts.</li>
              <li>• Contributions from corporations, foreign nationals, and federal contractors are prohibited.</li>
            </ul>
          </Card>
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Transparency</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Every contribution is recorded and available in the campaign\u2019s public compliance reports. We publish donor aggregate data on our <a href="/compliance" className="text-primary hover:underline">disclosures page</a>.
            </p>
          </Card>
          <div className="rounded border border-border bg-surface-2 p-5 text-xs text-ink-muted">
            <p className="font-semibold text-ink">Paid for by the Common Ground Party Accountability Committee.</p>
            <p className="mt-1">Not authorized by any candidate or candidate\u2019s committee. This is a demonstration platform; the party, candidates, and organization are fictional.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
