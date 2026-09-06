import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useStore } from '../store/Store'
import { AuthShell } from '../components/layout/AuthShell'

const volunteerNav = [
  { to: '/portal', end: true, label: 'Dashboard', icon: '▦' },
  { to: '/portal/tasks', label: 'My Tasks', icon: '☑' },
  { to: '/portal/events', label: 'My Events', icon: '🗓' },
  { to: '/portal/donations', label: 'My Donations', icon: '◎' },
  { to: '/portal/referrals', label: 'Referrals', icon: '⇄' },
  { to: '/portal/team', label: 'My Team', icon: '👥' },
  { to: '/portal/messages', label: 'Messages', icon: '✉' },
  { to: '/portal/settings', label: 'Profile & Settings', icon: '⚙' },
]

const staffNav = [
  { to: '/staff', end: true, label: 'Overview', icon: '◫' },
  { to: '/staff/database', label: 'Supporter Database', icon: '☰' },
  { to: '/staff/field', label: 'Canvassing & Field', icon: '⛨' },
  { to: '/staff/phone-bank', label: 'Phone Bank', icon: '☎' },
  { to: '/staff/events', label: 'Events', icon: '🗓' },
  { to: '/staff/fundraising', label: 'Fundraising', icon: '◎' },
  { to: '/staff/outreach', label: 'Outreach / Email & SMS', icon: '➤' },
  { to: '/staff/volunteers', label: 'Volunteers', icon: '👥' },
  { to: '/staff/compliance', label: 'Compliance & Reporting', icon: '⚖' },
  { to: '/staff/content', label: 'Site Content', icon: '✎' },
  { to: '/staff/permissions', label: 'Staff & Permissions', icon: '🔐' },
]

export function AuthLayout() {
  const { currentUser } = useStore()
  const location = useLocation()
  const isStaffPath = location.pathname.startsWith('/staff')

  if (!currentUser || currentUser.role === 'visitor') {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  const isStaff = currentUser.role === 'admin' || currentUser.role === 'organizer'

  if (isStaffPath && !isStaff) {
    return <Navigate to="/portal" replace />
  }
  if (!isStaffPath && !isStaff && !currentUser.role === 'volunteer') {
    return <Navigate to="/staff" replace />
  }

  const nav = isStaff ? staffNav : volunteerNav
  const role = isStaff ? 'staff' : 'volunteer'

  return (
    <AuthShell nav={nav} userRole={role}>
      <Outlet />
    </AuthShell>
  )
}
