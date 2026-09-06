// Small service functions wrapping the store. In production these would hit a
// real API; here they read from the shared in-memory store. Components should
// call these rather than touching the store data directly when possible.

import { useStore } from '../store/Store'

export function useFundraising() {
  const s = useStore()
  return {
    total: s.fundraisingTotal,
    goal: s.seed.CYCLE_GOAL,
    pct: s.progressPct,
    donations: s.donationsData,
    byFund: () => {
      const map = {}
      for (const d of s.donationsData) map[d.fund] = (map[d.fund] || 0) + d.amount
      return map
    },
  }
}

export function usePeople() {
  const s = useStore()
  return {
    all: s.peopleData,
    activeVolunteers: s.activeVolunteers,
    pendingVolunteers: s.pendingVolunteers,
    canvassers: s.peopleData.filter((p) => p.tags?.includes('canvasser')),
    donors: s.peopleData.filter((p) => p.donorStatus !== 'Non-donor'),
  }
}

export function useField() {
  const s = useStore()
  return {
    doorsKnocked: s.totalDoorsKnocked,
    callsMade: s.totalCallsMade,
    hours: s.totalHours,
    results: s.canvassData,
    assignments: s.assignments,
  }
}

export function useEvents() {
  const s = useStore()
  return {
    all: s.eventsData,
    upcoming: s.eventsData.filter((e) => new Date(e.date) > new Date()).sort((a, b) => new Date(a.date) - new Date(b.date)),
    rsvps: s.rsvps,
    checkins: s.checkins,
  }
}
