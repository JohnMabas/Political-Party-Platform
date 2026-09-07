import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { Avatar } from '../ui'

// Shared shell for the authenticated Volunteer Portal and Staff Dashboard:
// fixed collapsible left sidebar + top bar with search, notifications, account menu.
export function AuthShell({ nav, brand: _brand, userRole, children, topRight }) {
  const { currentUser, setCurrentUser, announcements } = useStore()
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch] = useState('')
  const [notifOpen, setNotifOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex bg-bg">
      {/* Sidebar */}
      <aside className={`flex-shrink-0 border-r border-border bg-surface-2 transition-all duration-200 ${collapsed ? 'w-16' : 'w-60'} hidden md:flex flex-col sticky top-0 h-screen`}>
        <div className="flex items-center gap-2 px-4 h-16 border-b border-border">
          <button type="button" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar"
            className="rounded-sm p-1.5 text-primary hover:bg-surace-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          {!collapsed && <Link to="/" className="font-serif font-bold text-primary text-lg truncate">Federal Unity</Link>}
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1" aria-label="Dashboard navigation">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary-tint text-primary' : 'text-ink-muted hover:bg-surface hover:text-primary'
                } ${collapsed ? 'justify-center' : ''}`}
              title={item.label}>
              <span aria-hidden="true" className="text-lg shrink-0">{item.icon}</span>
              {!collapsed && item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-border p-3">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2 text-xs text-ink-muted hover:text-primary px-2">
              <span aria-hidden="true">↵</span> Back to public site
            </Link>
          )}
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-border bg-surface h-16 flex items-center gap-3 px-4 sm:px-6">
          <button type="button" onClick={() => setCollapsed(!collapsed)} className="md:hidden rounded-sm p-1.5 text-primary" aria-label="Toggle menu">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <div className="relative flex-1 max-w-md">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="m20 20-3.5-3.5" /></svg>
            </span>
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder={userRole === 'volunteer' ? 'Search events, tasks, team\u2026' : 'Search supporters, donors, events\u2026'}
              className="w-full rounded-sm border border-border bg-bg pl-9 pr-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              aria-label="Search" />
          </div>

          <div className="flex-1" />
          {topRight && <div className="hidden sm:block">{topRight}</div>}

          {/* Notifications */}
          <div className="relative">
            <button type="button" onClick={() => setNotifOpen(!notifOpen)} aria-expanded={notifOpen} aria-label="Notifications"
              className="relative rounded-sm p-2 text-ink-muted hover:text-primary focus-visible:outline-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path strokeLinecap="round" d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>
              {announcements.length > 0 && <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-urgent text-[0.6rem] font-bold text-white">{announcements.length}</span>}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded border border-border bg-surface shadow-lg">
                <div className="border-b border-border px-4 py-2 text-sm font-semibold text-primary">Notifications</div>
                <ul className="max-h-80 overflow-y-auto">
                  {announcements.map((a) => (
                    <li key={a.id} className="border-b border-border px-4 py-3 last:border-0">
                      <p className="text-sm font-medium text-ink">{a.title}</p>
                      <p className="text-xs text-ink-muted mt-0.5 line-clamp-2">{a.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Account menu */}
          <div className="relative">
            <button type="button" onClick={() => setAccountOpen(!accountOpen)} aria-expanded={accountOpen} aria-label="Account menu"
              className="flex items-center gap-2 rounded-sm p-1 focus-visible:outline-2">
              <Avatar name={currentUser?.name || 'User'} size="w-8 h-8" />
            </button>
            {accountOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded border border-border bg-surface p-1 shadow-lg">
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-sm font-semibold text-ink">{currentUser?.name || 'Guest'}</p>
                  <p className="text-xs text-ink-muted">{currentUser?.role === 'volunteer' ? 'Supporter / Volunteer' : currentUser?.role === 'admin' ? 'Staff / Admin' : currentUser?.role || 'Visitor'}</p>
                </div>
                <div className="border-t border-border mt-1 pt-1">
                  <button type="button" onClick={() => { setCurrentUser({ role: 'visitor', name: 'Guest' }); navigate('/'); setAccountOpen(false) }}
                    className="w-full text-left rounded-sm px-3 py-2 text-sm text-ink-muted hover:bg-surface-2 hover:text-primary">Return to public site</button>
                  <button type="button" onClick={() => { setCurrentUser({ role: 'visitor', name: 'Guest' }); navigate('/login'); setAccountOpen(false) }}
                    className="w-full text-left rounded-sm px-3 py-2 text-sm text-urgent hover:bg-urgent-tint">Sign out</button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="md:hidden border-b border-border bg-surface overflow-x-auto whitespace-nowrap px-2 py-2" aria-label="Mobile navigation">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}
              className={({ isActive }) => `inline-block px-3 py-1.5 mx-0.5 rounded-sm text-sm font-medium ${isActive ? 'bg-primary-tint text-primary' : 'text-ink-muted'}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
