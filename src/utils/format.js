export function fmtMoney(n) {
  return '₦' + new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(n)
}

export function fmtMoneyCents(n) {
  return '₦' + new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}

export function daysUntil(dateStr) {
  const target = typeof dateStr === 'string' ? new Date(dateStr) : dateStr
  const diff = Math.ceil((target - new Date()) / (1000 * 60 * 60 * 24))
  return diff
}

export function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function fmtDateShort(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function fmtTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export function initials(name) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
}
