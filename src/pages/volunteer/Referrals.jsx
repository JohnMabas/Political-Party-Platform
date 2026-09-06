import { useStore } from '../../store/Store'
import { Card, ProgressBar } from '../../components/ui'

export default function Referrals() {
  const { currentUser } = useStore()
  const myCode = `cgp-${currentUser?.id || 1}`

  // In the demo, count teammates as "referred" so the leaderboard reads real
  const referredCount = 3

  return (
    <div>
      <header>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Referrals</h1>
        <p className="mt-1 text-ink-muted">Every person you bring in becomes part of the effort — and a little stronger for your chapter.</p>
      </header>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h2 className="font-serif text-lg font-bold text-primary">Your personal link</h2>
          <p className="mt-1 text-sm text-ink-muted">Share this link. When someone signs up through it, they\u2019re credited to you.</p>
          <div className="mt-3 flex flex-col sm:flex-row items-stretch gap-2">
            <code className="flex-1 rounded-sm border border-border bg-surface-2 px-3 py-2.5 text-sm text-ink-muted break-all">https://commonground.demo/r/{myCode}</code>
            <button type="button" className="rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hov">Copy link</button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-ink-muted">People brought in</p>
              <p className="font-serif text-3xl font-bold text-primary">{referredCount}</p>
            </div>
            <div>
              <p className="text-sm text-ink-muted">New volunteer hours</p>
              <p className="font-serif text-3xl font-bold text-primary">12</p>
            </div>
            <div>
              <p className="text-sm text-ink-muted">Chapter bonus</p>
              <p className="font-serif text-3xl font-bold text-primary">+$75</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-ink">Chapter referral goal</h3>
            <div className="mt-2">
              <ProgressBar current={referredCount} goal={5} label={`${referredCount} of 5 new members this month`} tone="community" />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Why referrals matter</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Word of mouth is the most trusted way to grow a movement. Someone who joins because a friend asked is far more likely to stick around — and to volunteer.
            </p>
          </Card>
          <Card className="p-5">
            <h2 className="font-serif text-base font-bold text-primary">Who you\u2019ve brought in</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Priya Raman, Hana Sato, and Grace Osei signed up through your link and collectively logged 12 hours this month. Nice work.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
