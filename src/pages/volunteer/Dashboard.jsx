import { Link } from 'react-router-dom'
import { useStore } from '../../store/Store'
import { Card, StatusBadge, Thermometer } from '../../components/ui'
import { fmtDateShort, fmtTime } from '../../utils/format'

export default function Dashboard() {
  const { currentUser, currentPerson, currentUserRsvps, currentUserAssignments, seed, fundraisingTotal, announcements, team, currentUserDonations } = useStore()

  const firstName = (currentUser?.name || 'there').split(' ')[0]
  const myDonationsTotal = currentUserDonations.reduce((s, d) => s + d.amount, 0)

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Welcome back, {firstName}</h1>
        <p className="mt-1 text-ink-muted">
          {currentPerson ? `Volunteer #${1480 + currentPerson.id} this month` : 'Supporter'} · {team ? `Part of the ${team.name}` : 'Your chapter is being set up'}
        </p>
      </header>

      {/* Stat row */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-ink-muted">Hours logged this cycle</p>
          <p className="mt-1 font-serif text-3xl font-bold text-primary">{currentPerson?.hours || 0}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-ink-muted">Upcoming shifts</p>
          <p className="mt-1 font-serif text-3xl font-bold text-primary">{currentUserAssignments.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-ink-muted">Events I\u2019ve RSVP\u2019d to</p>
          <p className="mt-1 font-serif text-3xl font-bold text-primary">{currentUserRsvps.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-ink-muted">My total giving</p>
          <p className="mt-1 font-serif text-3xl font-bold text-primary">₦{myDonationsTotal.toLocaleString('en-NG')}</p>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming shifts */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-primary">My next shifts</h2>
            <Link to="/portal/tasks" className="text-sm font-semibold text-accent hover:underline">View all tasks</Link>
          </div>
          <div className="mt-3 space-y-3">
            {currentUserAssignments.length === 0 ? (
              <Card className="p-5 text-sm text-ink-muted">
                You don\u2019t have a shift yet. <Link to="/portal/tasks" className="text-primary font-semibold hover:underline">Pick one up</Link> or sign up on the <Link to="/events" className="text-primary font-semibold hover:underline">events page</Link>.
              </Card>
            ) : (
              currentUserAssignments.map((a) => (
                <Card key={a.id} className="flex items-start justify-between gap-3 p-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={a.type === 'phone' ? 'Phone' : 'Canvass'} />
                      <span className="text-xs text-ink-muted">{fmtDateShort(a.date)}</span>
                    </div>
                    <p className="mt-1 font-serif text-base font-bold text-primary">{a.title}</p>
                    <p className="text-xs text-ink-muted">Status: <StatusBadge status={a.status === 'assigned' ? 'Assigned' : a.status} /></p>
                  </div>
                  <Link to="/portal/tasks" className="text-sm font-semibold text-accent hover:underline">Start</Link>
                </Card>
              ))
            )}
          </div>

          {/* Upcoming events */}
          <h2 className="mt-8 font-serif text-lg font-bold text-primary">My events</h2>
          <div className="mt-3 space-y-3">
            {currentUserRsvps.length === 0 ? (
              <p className="text-sm text-ink-muted"><Link to="/events" className="text-primary font-semibold hover:underline">RSVP to an event</Link> to see it here.</p>
            ) : (
              currentUserRsvps.map((e) => (
                <Card key={e.id} className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-primary">{e.title}</p>
                      <p className="text-xs text-ink-muted">{fmtDateShort(e.date)} · {fmtTime(e.date)} · {e.location}</p>
                    </div>
                    <StatusBadge status="RSVP\u2019d" />
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Side column */}
        <div className="space-y-5">
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Campaign thermometer</h2>
            <div className="mt-3">
              <Thermometer current={fundraisingTotal} goal={seed.CYCLE_GOAL} />
            </div>
            <Link to="/donate" className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">Make a contribution</Link>
          </Card>

          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Share with friends</h2>
            <p className="mt-1 text-sm text-ink-muted">Your personal referral link: bring a friend, and when they volunteer you both get a nod from your chapter.</p>
            <div className="mt-2 flex items-center gap-2">
              <code className="flex-1 truncate rounded-sm border border-border bg-surface-2 px-2 py-1.5 text-xs text-ink-muted">fup.ng/r/{currentUser?.id || 1}</code>
              <button type="button" className="rounded-sm bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-hov">Copy</button>
            </div>
            <Link to="/portal/referrals" className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">Track referrals →</Link>
          </Card>

          {/* Announcements */}
          <div>
            <h2 className="font-serif text-lg font-bold text-primary">Announcements</h2>
            <div className="mt-3 space-y-3">
              {announcements.slice(0, 2).map((a) => (
                <Card key={a.id} className="p-4">
                  <p className="text-xs text-ink-muted">{fmtDateShort(a.date)} · from {a.from}</p>
                  <p className="mt-1 text-sm font-semibold text-primary">{a.title}</p>
                  <p className="mt-1 text-sm text-ink-muted">{a.body}</p>
                </Card>
              ))}
            </div>
            <Link to="/portal/messages" className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">All messages →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
