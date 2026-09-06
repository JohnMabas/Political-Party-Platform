import { Link } from 'react-router-dom'
import { Card } from '../../components/ui'

const actions = [
  { icon: '👋', title: 'Volunteer sign-up', body: 'Join the volunteer corps and get matched with a shift near you — canvassing, phone banks, or events.', to: '/volunteer', tone: 'primary' },
  { icon: '🏠', title: 'Host an event', body: 'Open your living room, church basement, or union hall for a meet-a-candidate night or organizing meeting.', to: '/host-an-event' },
  { icon: '📞', title: 'Phone bank', body: 'Call supporters and undecided voters from HQ or home. Training and a script are always provided.', to: '/phone-bank' },
  { icon: '🚪', title: 'Canvassing', body: 'Knock doors, listen, and turn supports into votes. Pair up with a partner — no experience required.', to: '/canvassing' },
  { icon: '📌', title: 'Become a precinct captain', body: 'Own your precinct: recruit volunteers, track doors, and be the local anchor for the campaign.', to: '/precinct-captain' },
  { icon: '💸', title: 'Start a fundraiser', body: 'Set up a peer-to-peer page, rally your network, and help the campaign hit its vote-to-voter goal.', to: '/start-fundraiser' },
]

export default function TakeAction() {
  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/70 italic">Take action</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">There\u2019s a seat at this table for you</h1>
          <p className="mt-3 max-w-2xl text-white/75">
            Every campaign is a lot of small jobs done well by a lot of people. Pick the one that fits your schedule and your strengths.
          </p>
        </div>
      </section>

      <section className="container-site py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {actions.map((a) => (
            <Card key={a.title} className="flex flex-col p-6">
              <span aria-hidden="true" className="text-3xl">{a.icon}</span>
              <h2 className="mt-3 font-serif text-xl font-bold text-primary">{a.title}</h2>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed flex-1">{a.body}</p>
              <Link to={a.to} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline underline-offset-4">
                Get started
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded border border-border bg-surface-2 p-6 text-center">
          <h2 className="font-serif text-xl font-bold text-primary">Not sure where to start?</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-ink-muted">
            Sign up and tell us what you\u2019re good at and when you\u2019re free — an organizer will match you to a role within a couple of days.
          </p>
          <Link to="/volunteer" className="mt-4 inline-flex items-center bg-accent px-6 py-2.5 text-sm font-semibold text-[#1C2430] hover:bg-accent/90 rounded-sm">
            Tell us about yourself
          </Link>
        </div>
      </section>
    </div>
  )
}
