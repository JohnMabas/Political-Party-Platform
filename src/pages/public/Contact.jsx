import { useState } from 'react'
import { Card } from '../../components/ui'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'Volunteering', message: '' })
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/70 italic">Contact</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">How can we help?</h1>
        </div>
      </section>

      <section id="contact" className="container-site py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="font-serif text-lg font-bold text-primary">Send us a message</h2>
            {sent ? (
              <div className="mt-4 rounded-sm border border-community bg-community-tint px-4 py-3 text-sm">
                <p className="font-semibold text-community">Message sent.</p>
                <p className="mt-1 text-ink">Thanks for reaching out. We\u2019ll reply within two business days.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="c-name" className="mb-1 block text-sm font-medium text-ink">Name</label>
                    <input id="c-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="mb-1 block text-sm font-medium text-ink">Email</label>
                    <input id="c-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
                <div>
                  <label htmlFor="c-topic" className="mb-1 block text-sm font-medium text-ink">What is your question about?</label>
                  <select id="c-topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>Volunteering</option><option>Donating</option><option>Membership</option>
                    <option>Events</option><option>Media & press</option><option>Something else</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="c-message" className="mb-1 block text-sm font-medium text-ink">Message</label>
                  <textarea id="c-message" required rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <button type="submit" className="rounded-sm bg-accent px-6 py-2.5 text-sm font-semibold text-[#1C2430] hover:bg-accent/90">Send message</button>
              </form>
            )}
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">National Secretariat</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Plot 42, Central Area<br />Abuja, FCT<br />Open Mon–Fri, 9am–5pm
            </p>
          </Card>
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Direct lines</h2>
            <p className="mt-2 text-sm text-ink-muted">
              General: +234 800 000 1100<br />Volunteering: +234 800 000 1200<br />Press: +234 800 000 2300
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}
