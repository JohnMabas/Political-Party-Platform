import { useState } from 'react'
import { useStore } from '../../store/Store'
import { Card, Avatar } from '../../components/ui'

export default function Settings() {
  const { currentUser, setCurrentUser, peopleData } = useStore()
  const me = peopleData.find((p) => p.id === currentUser?.id)
  const [form, setForm] = useState({ name: me?.name || currentUser?.name, email: me?.email || currentUser?.email, phone: '+234 800 000 7788', district: me?.district || 'Ward 5' })
  const [prefs, setPrefs] = useState({ email: true, sms: true, digest: 'weekly' })
  const [saved, setSaved] = useState(false)

  const save = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Profile & settings</h1>
        <p className="mt-1 text-ink-muted">Manage your account details and how we reach you.</p>
      </header>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center gap-4">
            <Avatar name={form.name} size="w-16 h-16" />
            <div>
              <p className="font-serif text-lg font-bold text-primary">{form.name}</p>
              <p className="text-sm text-ink-muted">Volunteer · {me ? `#${1480 + me.id}` : 'Member'}</p>
            </div>
          </div>

          <form onSubmit={save} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="s-name" className="mb-1 block text-sm font-medium text-ink">Full name</label>
                <input id="s-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="s-phone" className="mb-1 block text-sm font-medium text-ink">Phone</label>
                <input id="s-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="s-email" className="mb-1 block text-sm font-medium text-ink">Email</label>
                <input id="s-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="s-district" className="mb-1 block text-sm font-medium text-ink">Nearest ward</label>
                <select id="s-district" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>Ward 1</option><option>Ward 2</option><option>Ward 3</option><option>Ward 4</option><option>Ward 5</option>
                </select>
              </div>
            </div>

            <fieldset className="border-t border-border pt-4">
              <legend className="text-sm font-medium text-ink">How should we reach you?</legend>
              <div className="mt-3 space-y-2">
                <label className="flex items-center gap-2 text-sm text-ink"><input type="checkbox" checked={prefs.email} onChange={(e) => setPrefs({ ...prefs, email: e.target.checked })} className="h-4 w-4 accent-[#1F3A5F]" /> Email updates</label>
                <label className="flex items-center gap-2 text-sm text-ink"><input type="checkbox" checked={prefs.sms} onChange={(e) => setPrefs({ ...prefs, sms: e.target.checked })} className="h-4 w-4 accent-[#1F3A5F]" /> Text (SMS) reminders for shifts</label>
              </div>
              <div className="mt-3">
                <label htmlFor="s-digest" className="mb-1 block text-sm font-medium text-ink">Email frequency</label>
                <select id="s-digest" value={prefs.digest} onChange={(e) => setPrefs({ ...prefs, digest: e.target.value })} className="w-full sm:w-64 rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                  <option value="asap">As things happen</option>
                  <option value="daily">Daily digest</option>
                  <option value="weekly">Weekly digest</option>
                </select>
              </div>
            </fieldset>

            <div className="flex items-center gap-3">
              <button type="submit" className="rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hov">Save changes</button>
              {saved && <span className="text-sm text-community font-medium">Saved.</span>}
            </div>
          </form>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Account</h2>
            <p className="mt-2 text-sm text-ink-muted">You\u2019re signed in as a {currentUser?.role}. Use the demo switcher (bottom-right) to move between visitor, supporter, and staff views.</p>
            <button type="button" onClick={() => { setCurrentUser({ role: 'visitor', name: 'Guest' }); }} className="mt-3 rounded-sm border border-urgent px-4 py-2 text-sm font-semibold text-urgent hover:bg-urgent-tint w-full">Sign out</button>
          </Card>
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Privacy</h2>
            <p className="mt-2 text-sm text-ink-muted">
              We use your details to coordinate volunteering and voter contact. We don\u2019t sell your data. See our <a href="/compliance" className="text-primary hover:underline">privacy policy</a>.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
