import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import * as seed from './seed'
import { fmtMoney } from '../utils/format'

const StoreContext = createContext(null)

// Dev-mode demo identities
export const DEMO_USERS = {
  visitor: { role: 'visitor', name: 'Guest' },
  volunteer: { id: 1, role: 'volunteer', name: 'Amina Yusuf', email: 'amina.yusuf@example.com' },
  organizer: { id: 3, role: 'organizer', name: 'Alicia Tran', email: 'alicia@commonground.party' },
  admin: { id: 1, role: 'admin', name: 'Camille North', email: 'camille@commonground.party' },
}

export function StoreProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(DEMO_USERS.visitor)

  // Data collections (mutable via actions below)
  const [peopleData, setPeopleData] = useState(seed.people)
  const [donationsData, setDonationsData] = useState(seed.donations)
  const [eventsData, setEventsData] = useState(seed.events)
  const [rsvps, setRsvps] = useState([
    { eventId: 1, personId: 1 }, // Amina rsvp'd
    { eventId: 2, personId: 1 },
    { eventId: 1, personId: 2 },
    { eventId: 3, personId: 2 },
    { eventId: 5, personId: 3 },
  ])
  const [canvassData, setCanvassData] = useState(seed.canvassResults)
  const [assignments, setAssignments] = useState([
    { id: 1, personId: 1, title: 'Riverside Turf 4 — Elm St & 2nd Ave', type: 'canvass', date: '2026-09-19', status: 'assigned' },
    { id: 2, personId: 7, title: 'Evening phone bank — early voters', type: 'phone', date: '2026-09-28', status: 'assigned' },
  ])
  const [announcements, setAnnouncements] = useState([
    { id: 1, from: 'Alicia Tran', title: 'Thanks for a great Saturday', body: 'We knocked 1,900 doors yesterday. The Riverside team broke a chapter record — great work.', date: '2026-09-07' },
    { id: 2, from: 'Campaign HQ', title: 'Early voting doors open in two weeks', body: 'Ballots go out September 20. Pick up a phone-bank or canvass shift this week to help.', date: '2026-09-06' },
  ])
  const [checkins, setCheckins] = useState([]) // {eventId, personId, time}

  // --- Actions ---

  const donate = useCallback(({ amount, fund, recurring, name, email, employer, occupation, address }) => {
    const newDonation = {
      id: Math.max(0, ...donationsData.map((d) => d.id)) + 1,
      personId: null,
      amount,
      fund,
      recurring,
      date: new Date().toISOString().slice(0, 10),
      employer,
      occupation,
      name,
      email,
      address,
    }
    setDonationsData((prev) => [newDonation, ...prev])
    // If the donor is already a known contact, bump their total given
    if (name) {
      setPeopleData((prev) => prev.map((p) =>
        p.name.toLowerCase() === name.toLowerCase() || p.email?.toLowerCase() === email?.toLowerCase()
          ? { ...p, totalGiven: (p.totalGiven || 0) + amount, donorStatus: p.donorStatus === 'Non-donor' ? 'Donor' : p.donorStatus, roles: p.roles.includes('Donor') ? p.roles : [...p.roles, 'Donor'] }
          : p
      ))
    }
    return newDonation
  }, [donationsData])

  const volunteerSignup = useCallback(({ name, email, district, interest, shiftId, eventTitle }) => {
    const newPerson = {
      id: Math.max(0, ...peopleData.map((p) => p.id)) + 1,
      name, email, district: district || 'Unassigned',
      roles: ['Volunteer'], tags: [interest === 'canvass' ? 'canvasser' : interest === 'phone' ? 'phone-banker' : 'new'],
      donorStatus: 'Non-donor', volunteerStatus: 'Pending', lastContact: new Date().toISOString().slice(0, 10),
      totalGiven: 0, doorsKnocked: 0, callsMade: 0, hours: 0, team: null,
    }
    setPeopleData((prev) => [...prev, newPerson])

    // If they asked for a specific shift, auto-assign it
    let newAssignment = null
    if (shiftId || (eventTitle && interest === 'canvass')) {
      newAssignment = {
        id: Math.max(0, ...assignments.map((a) => a.id)) + 1,
        personId: newPerson.id,
        title: eventTitle || `Assigned shift — ${interest}`,
        type: interest === 'phone' ? 'phone' : 'canvass',
        date: '2026-09-19',
        status: 'assigned',
      }
      setAssignments((prev) => [...prev, newAssignment])
    }
    return { person: newPerson, assignment: newAssignment }
  }, [peopleData, assignments])

  const rsvpEvent = useCallback((eventId, personId) => {
    setRsvps((prev) => {
      if (prev.some((r) => r.eventId === eventId && r.personId === personId)) return prev
      return [...prev, { eventId, personId }]
    })
    setEventsData((prev) => prev.map((e) => e.id === eventId ? { ...e, rsvps: e.rsvps + 1 } : e))
  }, [])

  const checkIn = useCallback((eventId, personId) => {
    setCheckins((prev) => {
      if (prev.some((c) => c.eventId === eventId && c.personId === personId)) return prev
      return [...prev, { eventId, personId, time: new Date().toISOString() }]
    })
  }, [])

  const logCanvassResult = useCallback(({ personId, result, type }) => {
    const newResult = {
      id: Math.max(0, ...canvassData.map((c) => c.id)) + 1,
      personId, result, type: type || 'door',
      date: new Date().toISOString().slice(0, 10),
    }
    setCanvassData((prev) => [newResult, ...prev])
    setPeopleData((prev) => prev.map((p) => {
      if (p.id !== personId) return p
      const updated = { ...p, lastContact: new Date().toISOString().slice(0, 10) }
      if (type === 'phone') updated.callsMade = (updated.callsMade || 0) + 1
      else updated.doorsKnocked = (updated.doorsKnocked || 0) + 1
      if (result === 'Supporter' && updated.roles && !updated.roles.includes('Supporter')) updated.roles = [...updated.roles, 'Supporter']
      return updated
    }))
    return newResult
  }, [canvassData])

  const logHours = useCallback((personId, hours) => {
    setPeopleData((prev) => prev.map((p) => p.id === personId ? { ...p, hours: (p.hours || 0) + hours } : p))
  }, [])

  const addEvent = useCallback((event) => {
    setEventsData((prev) => [{ id: Math.max(0, ...prev.map((e) => e.id)) + 1, ...event, rsvps: 0, attendees: [] }, ...prev])
  }, [])

  const assignShift = useCallback((personId, assignment) => {
    setAssignments((prev) => [...prev, {
      id: Math.max(0, ...prev.map((a) => a.id)) + 1,
      personId, title: assignment.title, type: assignment.type, date: assignment.date, status: 'assigned',
    }])
    setPeopleData((prev) => prev.map((p) => p.id === personId ? { ...p, volunteerStatus: 'Active' } : p))
  }, [])

  const approveVolunteer = useCallback((personId) => {
    setPeopleData((prev) => prev.map((p) => p.id === personId ? { ...p, volunteerStatus: 'Active' } : p))
  }, [])

  const addAnnouncement = useCallback((announcement) => {
    setAnnouncements((prev) => [{ id: Math.max(0, ...prev.map((a) => a.id)) + 1, from: 'Campaign HQ', ...announcement, date: new Date().toISOString().slice(0, 10) }, ...prev])
  }, [])

  const setVolunteerStatus = useCallback((personId, status) => {
    setPeopleData((prev) => prev.map((p) => p.id === personId ? { ...p, volunteerStatus: status } : p))
  }, [])

  const addDonation = useCallback((d) => {
    setDonationsData((prev) => [d, ...prev])
  }, [])

  // --- Derived data (memoized) ---

  const fundraisingTotal = useMemo(() => donationsData.reduce((s, d) => s + d.amount, 0), [donationsData])
  const progressPct = useMemo(() => Math.min(100, Math.round((fundraisingTotal / seed.CYCLE_GOAL) * 100)), [fundraisingTotal])

  const activeVolunteers = useMemo(() => peopleData.filter((p) => p.volunteerStatus === 'Active').length, [peopleData])
  const pendingVolunteers = useMemo(() => peopleData.filter((p) => p.volunteerStatus === 'Pending').length, [peopleData])
  const totalDoorsKnocked = useMemo(() => peopleData.reduce((s, p) => s + (p.doorsKnocked || 0), 0), [peopleData])
  const totalCallsMade = useMemo(() => peopleData.reduce((s, p) => s + (p.callsMade || 0), 0), [peopleData])
  const totalHours = useMemo(() => peopleData.reduce((s, p) => s + (p.hours || 0), 0), [peopleData])

  const currentPerson = useMemo(() => {
    if (!currentUser || currentUser.role === 'visitor' || currentUser.role === 'admin') return null
    return peopleData.find((p) => p.id === currentUser.id) || null
  }, [currentUser, peopleData])

  const currentUserRsvps = useMemo(() => {
    if (!currentUser) return []
    return rsvps.filter((r) => r.personId === currentUser.id).map((r) => eventsData.find((e) => e.id === r.eventId)).filter(Boolean)
  }, [rsvps, eventsData, currentUser])

  const currentUserAssignments = useMemo(() => {
    if (!currentUser) return []
    return assignments.filter((a) => a.personId === currentUser.id)
  }, [assignments, currentUser])

  const currentUserDonations = useMemo(() => {
    if (!currentUser) return []
    const person = peopleData.find((p) => p.id === currentUser.id)
    const email = person?.email || currentUser.email
    return donationsData.filter((d) => d.personId && d.personId === currentUser.id)
      .concat(donationsData.filter((d) => d.email && d.email === email))
  }, [donationsData, currentUser, peopleData])

  const team = useMemo(() => {
    const person = peopleData.find((p) => p.id === currentUser?.id)
    return seed.teams.find((t) => t.id === person?.team) || null
  }, [peopleData, currentUser])

  const teamMembers = useMemo(() => {
    if (!team) return []
    return peopleData.filter((p) => p.team === team.id)
  }, [team, peopleData])

  const value = {
    currentUser, setCurrentUser,
    seed, peopleData, donationsData, eventsData, rsvps, canvassData, assignments, announcements, checkins,
    fundraisingTotal, progressPct, activeVolunteers, pendingVolunteers, totalDoorsKnocked, totalCallsMade, totalHours,
    currentPerson, currentUserRsvps, currentUserAssignments, currentUserDonations, team, teamMembers,
    donate, volunteerSignup, rsvpEvent, checkIn, logCanvassResult, logHours, addEvent, assignShift, approveVolunteer,
    addAnnouncement, setVolunteerStatus, addDonation,
    fmtMoney,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
