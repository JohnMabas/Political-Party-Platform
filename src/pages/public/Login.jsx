import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { Card } from '../../components/ui'

export default function Login() {
  const { setCurrentUser } = useStore()
  const navigate = useNavigate()
  const [tab, setTab] = useState('supporter')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const demoLogin = (role) => {
    const maps = {
      supporter: { id: 1, role: 'volunteer', name: 'Amina Yusuf', email: 'amina.yusuf@example.com' },
      organizer: { id: 3, role: 'organizer', name: 'Aisha Suleiman', email: 'aisha@fup.ng' },
      admin: { id: 1, role: 'admin', name: 'Adaeze Okonkwo', email: 'adaeze@fup.ng' },
    }
    const u = maps[role]
    setCurrentUser(u)
    navigate(u.role === 'volunteer' ? '/portal' : '/staff')
  }

  const submit = (e) => {
    e.preventDefault()
    demoLogin(tab === 'supporter' ? 'supporter' : 'organizer')
  }

  return (
    <div className="container-site py-12 max-w-md">
      <div className="text-center">
        <h1 className="font-serif text-3xl font-bold text-primary">Sign in</h1>
        <p className="mt-2 text-ink-muted">Supporter portal and staff dashboard — please choose the right door.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-1 rounded-sm border border-border bg-surface-2 p-1 text-sm font-semibold">
        <button type="button" onClick={() => setTab('supporter')}
          className={`rounded-sm px-3 py-2 ${tab === 'supporter' ? 'bg-surface text-primary shadow-sm' : 'text-ink-muted hover:text-primary'}`}>
          Supporter / Volunteer
        </button>
        <button type="button" onClick={() => setTab('staff')}
          className={`rounded-sm px-3 py-2 ${tab === 'staff' ? 'bg-surface text-primary shadow-sm' : 'text-ink-muted hover:text-primary'}`}>
          Staff / Organizer
        </button>
      </div>

      <Card className="mt-4 p-6">
        <h2 className="font-serif text-lg font-bold text-primary">
          {tab === 'supporter' ? 'Supporter sign-in' : 'Staff sign-in'}
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          {tab === 'supporter'
            ? 'Volunteers, donors, and members: your portal holds your shifts, events, donations, and team.'
            : 'Campaign staff and organizers: your dashboard holds the supporter database, field, fundraising, and compliance.'}
        </p>

        <form onSubmit={submit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-ink">Email</label>
            <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder={tab === 'supporter' ? 'you@example.com' : 'name@fup.ng'}
              className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-ink">Password</label>
            <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <button type="submit" className="w-full rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hov">
            Sign in
          </button>
        </form>

        <div className="mt-5 border-t border-border pt-4">
          <p className="text-xs font-semibold text-ink-faint uppercase tracking-wide">Demo access — no password needed</p>
          <div className="mt-2 grid gap-2">
            <button type="button" onClick={() => demoLogin('supporter')}
              className="text-left rounded-sm border border-border bg-surface-2 px-3 py-2 text-sm text-ink hover:border-primary/40">
              <span className="font-semibold text-ink">Supporter</span> <span className="text-ink-muted">— enter as volunteer Amina Yusuf</span>
            </button>
            <button type="button" onClick={() => demoLogin('organizer')}
              className="text-left rounded-sm border border-border bg-surface-2 px-3 py-2 text-sm text-ink hover:border-primary/40">
              <span className="font-semibold text-ink">Field Organizer</span> <span className="text-ink-muted">— enter as organizer Aisha Suleiman</span>
            </button>
            <button type="button" onClick={() => demoLogin('admin')}
              className="text-left rounded-sm border border-border bg-surface-2 px-3 py-2 text-sm text-ink hover:border-primary/40">
              <span className="font-semibold text-ink">Staff / Admin</span> <span className="text-ink-muted">— enter as campaign manager Adaeze Okonkwo</span>
            </button>
          </div>
        </div>
      </Card>

      <div className="mt-4 text-center text-sm">
        {tab === 'supporter' ? (
          <p className="text-ink-muted">New here? <Link to="/volunteer" className="text-primary font-semibold hover:underline">Sign up to volunteer</Link> or <Link to="/join" className="text-primary font-semibold hover:underline">become a member</Link>.</p>
        ) : (
          <p className="text-ink-muted">Staff access is provisioned by the system administrator.</p>
        )}
      </div>
    </div>
  )
}
