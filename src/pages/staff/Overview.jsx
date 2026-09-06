import { Link } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { Card, StatusBadge, Thermometer } from '../../components/ui'
import { fmtMoney } from '../../utils/format'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, Legend } from 'recharts'

const weeklyFundraising = [
  { week: 'Aug 3', raised: 11200 },
  { week: 'Aug 10', raised: 14800 },
  { week: 'Aug 17', raised: 13900 },
  { week: 'Aug 24', raised: 17600 },
  { week: 'Aug 31', raised: 15900 },
  { week: 'Sep 7', raised: 18400 },
]

const doorsSeries = [
  { week: 'Aug 3', doors: 1120, calls: 680 },
  { week: 'Aug 10', doors: 1540, calls: 910 },
  { week: 'Aug 17', doors: 1380, calls: 1020 },
  { week: 'Aug 24', doors: 1920, calls: 1140 },
  { week: 'Aug 31', doors: 2140, calls: 1380 },
  { week: 'Sep 7', doors: 2410, calls: 1490 },
]

export default function Overview() {
  const { fundraisingTotal, progressPct, activeVolunteers, pendingVolunteers, totalDoorsKnocked, totalCallsMade, totalHours, seed, eventsData, peopleData } = useStore()

  const upcomingEvents = eventsData
    .filter((e) => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4)

  const recentDonations = useRecent()
  const donorsCount = peopleData.filter((p) => p.donorStatus !== 'Non-donor').length

  // Silver element styling for the thermometer is reused via accent; donate volume
  const volunteerGoal = 5000

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Campaign overview</h1>
        <p className="mt-1 text-ink-muted">A snapshot of the whole operation, updated live.</p>
      </header>

      {/* KPI row */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-ink-muted">Fundraising</p>
          <p className="mt-1 font-serif text-2xl font-bold text-primary">{fmtMoney(fundraisingTotal)}</p>
          <p className="text-xs text-community">{Math.round(progressPct)}% of ${seed.CYCLE_GOAL.toLocaleString()}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-ink-muted">Active volunteers</p>
          <p className="mt-1 font-serif text-2xl font-bold text-primary">{activeVolunteers}</p>
          <p className="text-xs text-accent">{pendingVolunteers} pending approval</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-ink-muted">Doors this cycle</p>
          <p className="mt-1 font-serif text-2xl font-bold text-primary">{totalDoorsKnocked.toLocaleString()}</p>
          <p className="text-xs text-ink-muted">{totalCallsMade.toLocaleString()} calls made</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-ink-muted">Volunteer hours</p>
          <p className="mt-1 font-serif text-2xl font-bold text-primary">{totalHours}</p>
          <p className="text-xs text-ink-muted">this cycle</p>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fundraising chart */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-primary">Weekly fundraising</h2>
            <Link to="/staff/fundraising" className="text-sm font-semibold text-accent hover:underline">Details</Link>
          </div>
          <div className="mt-3">
            <Thermometer current={fundraisingTotal} goal={seed.CYCLE_GOAL} label="Cycle progress" />
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyFundraising} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#E0DCCF" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#5A6270' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#5A6270' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Raised']} />
                <Bar dataKey="raised" fill="#C9932F" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Field chart */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-primary">Field contact</h2>
            <Link to="/staff/field" className="text-sm font-semibold text-accent hover:underline">Field tools</Link>
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={doorsSeries} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="doors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4B7A57" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#4B7A57" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E0DCCF" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#5A6270' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#5A6270' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="doors" name="Doors knocked" stroke="#4B7A57" fill="url(#doors)" strokeWidth={2} />
                <Area type="monotone" dataKey="calls" name="Calls made" stroke="#1F3A5F" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming events */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-base font-bold text-primary">Upcoming events</h2>
            <Link to="/staff/events" className="text-sm font-semibold text-accent hover:underline">Manage</Link>
          </div>
          <ul className="mt-3 divide-y divide-border">
            {upcomingEvents.map((e) => (
              <li key={e.id} className="py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-primary">{e.title}</p>
                  <StatusBadge status={e.type} />
                </div>
                <p className="text-xs text-ink-muted mt-0.5">{e.rsvps} RSVP\u2019d · {e.attendees?.length || 0} checked in</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recent donations */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-base font-bold text-primary">Latest contributions</h2>
            <Link to="/staff/fundraising" className="text-sm font-semibold text-accent hover:underline">Log</Link>
          </div>
          <ul className="mt-3 divide-y divide-border">
            {recentDonations.slice(0, 5).map((d) => (
              <li key={d.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ink">{d.name || 'Anonymous supporter'}</p>
                  <p className="text-xs text-ink-muted">{d.fund}</p>
                </div>
                <span className="text-sm font-semibold text-ink">{fmtMoney(d.amount)}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Volunteer pipeline */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-base font-bold text-primary">Volunteer pipeline</h2>
            <Link to="/staff/volunteers" className="text-sm font-semibold text-accent hover:underline">Review</Link>
          </div>
          <div className="mt-3 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-ink-muted">Active volunteers</span><span className="font-semibold text-ink">{activeVolunteers}</span></div>
              <div className="h-2.5 w-full rounded-sm bg-surface-2 border border-border"><div className="h-full bg-community" style={{ width: `${Math.min(100, (activeVolunteers / volunteerGoal) * 100)}%` }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-ink-muted">Pending approval</span><span className="font-semibold text-ink">{pendingVolunteers}</span></div>
              <div className="h-2.5 w-full rounded-sm bg-surface-2 border border-border"><div className="h-full bg-accent" style={{ width: `${Math.min(100, (pendingVolunteers / Math.max(1, pendingVolunteers * 5)) * 100)}%` }} /></div>
            </div>
            <p className="text-xs text-ink-muted">{activeVolunteers} active · {donorsCount} donors on file</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

function useRecent() {
  const { donationsData } = useStore()
  return [...donationsData].sort((a, b) => new Date(b.date) - new Date(a.date))
}
