// Shared UI primitives for the platform.

export function StatusBadge({ status, tone: _tone }) {
  const tones = {
    // volunteer / shift statuses
    'Active': { bg: 'bg-community-tint text-community', icon: '●' },
    'Pending': { bg: 'bg-accent-tint text-accent', icon: '●' },
    'Inactive': { bg: 'bg-surface-2 text-ink-muted', icon: '●' },
    'Assigned': { bg: 'bg-primary-tint text-primary', icon: '●' },
    'Confirmed': { bg: 'bg-community-tint text-community', icon: '●' },
    // donation statuses
    'Donor': { bg: 'bg-community-tint text-community', icon: '●' },
    'Recurring': { bg: 'bg-primary-tint text-primary', icon: '↻' },
    'Non-donor': { bg: 'bg-surface-2 text-ink-muted', icon: '●' },
    'Completed': { bg: 'bg-community-tint text-community', icon: '✓' },
    'Paid': { bg: 'bg-community-tint text-community', icon: '✓' },
    'Full': { bg: 'bg-urgent-tint text-urgent', icon: '!' },
    // canvass results
    'Supporter': { bg: 'bg-community-tint text-community', icon: '✓' },
    'Undecided': { bg: 'bg-accent-tint text-accent', icon: '?' },
    'Opposed': { bg: 'bg-urgent-tint text-urgent', icon: '✕' },
    'Not home': { bg: 'bg-surface-2 text-ink-muted', icon: '–' },
    'Refused': { bg: 'bg-surface-2 text-ink-muted', icon: '–' },
    'Not at door': { bg: 'bg-surface-2 text-ink-muted', icon: '–' },
    // RSVP statuses
    'RSVP\u2019d': { bg: 'bg-community-tint text-community', icon: '✓' },
    'Checked in': { bg: 'bg-primary-tint text-primary', icon: '✓' },
    // compliance
    'Due soon': { bg: 'bg-urgent-tint text-urgent', icon: '!' },
    'On track': { bg: 'bg-community-tint text-community', icon: '✓' },
    'Filed': { bg: 'bg-community-tint text-community', icon: '✓' },
    'Upcoming': { bg: 'bg-accent-tint text-accent', icon: '~' },
  }
  const t = tones[status] || { bg: 'bg-surface-2 text-ink-muted', icon: '●' }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${t.bg}`}>
      <span aria-hidden="true" className="text-[0.6em]">{t.icon}</span>
      {status}
    </span>
  )
}

// Labeled fundraising thermometer with a real goal/amount and fill animation.
export function Thermometer({ current, goal, label, className = '', accent = true }) {
  const pct = Math.max(0, Math.min(100, (current / goal) * 100))
  return (
    <div className={className}>
      {label && (
        <div className="mb-1.5 flex items-baseline justify-between gap-2 text-sm">
          <span className="font-medium text-ink">{label}</span>
          <span className="tabular-nums text-ink-muted">
            <span className={accent ? 'text-accent font-semibold' : 'text-primary font-semibold'}>{current.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</span>
            {' of '}{goal.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
          </span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(current)}
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-label={label || 'Fundraising progress'}
        className="h-4 w-full overflow-hidden rounded-sm bg-surface-2 border border-border"
      >
        <div
          className={`h-full rounded-sm ${accent ? 'bg-accent' : 'bg-community'} fill-anim`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1 text-xs text-ink-muted">{pct}% of goal raised</div>
    </div>
  )
}

export function ProgressBar({ current, goal, label, className = '', tone = 'accent' }) {
  const pct = Math.max(0, Math.min(100, (current / goal) * 100))
  const color = tone === 'accent' ? 'bg-accent' : tone === 'community' ? 'bg-community' : 'bg-primary'
  return (
    <div className={className}>
      {label && <div className="mb-1 text-xs font-medium text-ink-muted">{label}</div>}
      <div role="progressbar" aria-valuenow={Math.round(current)} aria-valuemin={0} aria-valuemax={goal}
        className="h-2.5 w-full overflow-hidden rounded-sm bg-surface-2 border border-border">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function Field({ label, children, hint, className = '' }) {
  return (
    <div className={className}>
      {label && <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>}
      {children}
      {hint && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
    </div>
  )
}

export const inputClass = 'w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
export const selectClass = inputClass + ' pr-8'
export const btnPrimaryClass = 'inline-flex items-center justify-center gap-2 bg-accent px-5 py-2.5 text-sm font-semibold text-[#1C2430] hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm transition-colors'
export const btnNavyClass = 'inline-flex items-center justify-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hov rounded-sm transition-colors'
export const btnGhostClass = 'inline-flex items-center justify-center gap-2 border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-primary hover:bg-surface-2 rounded-sm transition-colors'

export function Card({ children, className = '' }) {
  return <div className={`rounded border border-border bg-surface ${className}`}>{children}</div>
}

export function Avatar({ name, color = 'bg-primary', size = 'w-9 h-9' }) {
  const init = name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
  return (
    <span aria-hidden="true" className={`inline-flex ${size} items-center justify-center rounded-full ${color} text-xs font-semibold text-white`}>
      {init}
    </span>
  )
}
