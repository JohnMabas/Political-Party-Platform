import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { daysUntil } from '../../utils/format'

function Seal({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <path d="M13 33 C19 30 28 19 33 12 L37 15 C32 22 24 31 16 35 Z" fill="currentColor" />
      <line x1="16" y1="35" x2="13" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function PublicHeader() {
  const { currentUser } = useStore()
  const [open, setOpen] = useState(false)
  const nav = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/platform', label: 'Our Platform' },
    { to: '/candidates', label: 'Candidates' },
    { to: '/events', label: 'Events' },
    { to: '/news', label: 'News' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <div className="container-site">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 text-primary" aria-label="Federal Unity Party home">
            <Seal className="w-9 h-9" />
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-lg font-bold text-primary">Federal Unity Party</span>
              <span className="text-[0.65rem] uppercase tracking-widest text-ink-muted">One Nigeria · Progress together</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-5" aria-label="Primary">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary-hov ${isActive ? 'text-primary underline decoration-accent decoration-2 underline-offset-4' : 'text-ink-muted'}`}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/volunteer" className="inline-flex items-center gap-1.5 bg-accent px-4 py-2 text-sm font-semibold text-[#1C2430] hover:bg-accent/90 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              Get involved
            </Link>
            {currentUser && currentUser.role !== 'visitor' && (
              <Link to={currentUser.role === 'staff' || currentUser.role === 'admin' ? '/staff' : '/portal'}
                className="text-sm text-ink-muted hover:text-primary underline underline-offset-4">
                My account
              </Link>
            )}
            {(!currentUser || currentUser.role === 'visitor') && (
              <Link to="/login" className="text-sm text-ink-muted hover:text-primary underline underline-offset-4">
                Login
              </Link>
            )}
          </div>

          <button type="button" onClick={() => setOpen(!open)} className="lg:hidden inline-flex items-center gap-2 rounded-sm p-2 text-primary focus-visible:outline-2" aria-expanded={open} aria-controls="mobile-nav" aria-label="Toggle menu">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} /></svg>
          </button>
        </div>

        {open && (
          <nav id="mobile-nav" className="lg:hidden border-t border-border py-3 pb-5" aria-label="Mobile">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)}
                className={({ isActive }) => `block px-2 py-2.5 text-sm font-medium ${isActive ? 'text-primary font-semibold' : 'text-ink-muted'}`}>
                {n.label}
              </NavLink>
            ))}
            <div className="mt-2 flex gap-3 border-t border-border pt-3 px-2">
              <Link to="/volunteer" onClick={() => setOpen(false)} className="flex-1 text-center border border-primary text-primary px-4 py-2 text-sm font-semibold rounded-sm">Volunteer</Link>
              <Link to="/join" onClick={() => setOpen(false)} className="flex-1 text-center bg-accent px-4 py-2 text-sm font-semibold text-[#1C2430] rounded-sm">Join us</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export function CountdownStrip({ kind = 'election' }) {
  const days = daysUntil('2027-02-20')
  return (
    <div className="border-b border-border bg-urgent-tint">
      <div className="container-site flex items-center justify-center gap-2 py-2 text-center text-sm">
        <span aria-hidden="true" className="text-urgent">◷</span>
        {kind === 'election' ? (
          <p className="text-ink">
            <strong className="text-urgent">{days} days until the general election.</strong>{' '}
            <Link to="/volunteer" className="underline underline-offset-2 text-primary font-medium">Find a way to help</Link>
          </p>
        ) : (
          <p className="text-ink"><strong className="text-urgent">Town hall this Thursday.</strong> <Link to="/events" className="underline underline-offset-2 text-primary font-medium">RSVP now</Link></p>
        )}
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-2">
      <div className="container-site py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2.5 text-primary">
              <Seal className="w-8 h-8" />
              <span className="font-serif font-bold text-lg">Federal Unity Party</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-ink-muted">
              A people-powered Nigerian party building a united, prosperous, and well-governed nation. Organized by citizens, branches, and chapters across all 36 states and the FCT.
            </p>
            <p className="mt-4 text-xs text-ink-muted">
              Paid for by the Federal Unity Party and not authorized by any candidate or candidate\u2019s committee. This platform is a demonstration template.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary">Get Involved</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li><Link to="/volunteer" className="hover:text-primary">Volunteer</Link></li>
              <li><Link to="/events" className="hover:text-primary">Events</Link></li>
              <li><Link to="/join" className="hover:text-primary">Become a member</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary">Party</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/platform" className="hover:text-primary">Platform</Link></li>
              <li><Link to="/candidates" className="hover:text-primary">Candidates</Link></li>
              <li><Link to="/endorsements" className="hover:text-primary">Endorsements</Link></li>
              <li><Link to="/press-kit" className="hover:text-primary">Press kit</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li><Link to="/voter-resources" className="hover:text-primary">Voter resources</Link></li>
              <li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
              <li><Link to="/store" className="hover:text-primary">Store</Link></li>
              <li><Link to="/compliance" className="hover:text-primary">Compliance &amp; disclosures</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-muted">
          <p>&copy; {new Date().getFullYear()} Federal Unity Party. All rights reserved. FUP is a fictional demonstration organization.</p>
          <div className="flex gap-4">
            <Link to="/compliance" className="hover:text-primary">Privacy policy</Link>
            <Link to="/compliance" className="hover:text-primary">Terms of use</Link>
            <Link to="/press-kit" className="hover:text-primary">Media</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
