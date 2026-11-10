import type { Guest, Reservation, Selection } from './types'

export const TABLES = { 2: 4, 4: 6, 6: 4 } as const
export const CAPACITY = 56
export const MAX_PARTY = 10
export const DURATION = 90
const STEP = 30
const FIRST = 13 * 60
const LAST = 22 * 60 + 30

const athens = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Athens', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
})

function localClock(now: Date) {
  const parts = Object.fromEntries(athens.formatToParts(now).map(({ type, value }) => [type, value]))
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute) + Number(parts.second) / 60 + now.getUTCMilliseconds() / 60000,
  }
}

export const todayIso = (now = new Date()) => localClock(now).date

export function addDays(date: string, days: number): string {
  const day = new Date(`${date}T00:00:00Z`)
  day.setUTCDate(day.getUTCDate() + days)
  return day.toISOString().slice(0, 10)
}

export function validDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return Number.isFinite(date.valueOf()) && date.toISOString().slice(0, 10) === value
}

export function formatDate(date: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}

const toTime = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`

const toMinutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3))

export const SLOTS = Array.from({ length: (LAST - FIRST) / STEP + 1 }, (_, i) =>
  toTime(FIRST + i * STEP),
)

export function validateSearch(date: string, party: number, now = new Date()) {
  if (!validDate(date)) return 'date'
  if (date < todayIso(now)) return 'past'
  if (party > MAX_PARTY) return 'largeParty'
  if (!Number.isInteger(party) || party < 1) return 'party'
}

function seatsDuring(reservations: readonly Reservation[], date: string, minute: number): number {
  return reservations.reduce((count, reservation) => {
    if (reservation.date !== date || reservation.status === 'cancelled') return count
    const start = toMinutes(reservation.time)
    return start <= minute && minute < start + DURATION ? count + reservation.party : count
  }, 0)
}

export function peakSeats(reservations: readonly Reservation[], date: string, time?: string): number {
  if (!time) return Math.max(...SLOTS.map(slot => seatsDuring(reservations, date, toMinutes(slot))))
  const start = toMinutes(time)
  // Every booking starts and ends on a half-hour boundary. The end is exclusive.
  return Math.max(...Array.from({ length: DURATION / STEP }, (_, i) =>
    seatsDuring(reservations, date, start + i * STEP),
  ))
}

export function validateSelection(reservations: readonly Reservation[], selection: Selection, now = new Date()) {
  const { date, party, time } = selection
  const searchError = validateSearch(date, party, now)
  if (searchError) return searchError
  if (!SLOTS.includes(time)) return 'time'
  const clock = localClock(now)
  if (date === clock.date && toMinutes(time) < clock.minutes) return 'past'
  if (peakSeats(reservations, date, time) + party > CAPACITY) return 'soldOut'
}

export function availableSlots(reservations: readonly Reservation[], date: string, party: number, now = new Date()) {
  return SLOTS.filter(time => !validateSelection(reservations, { date, time, party }, now))
}

export function normalizeMobile(phone: string): string {
  return phone.trim().replace(/[\s-]/g, '').replace(/^\+30/, '')
}

export function validateGuest(guest: Guest): Partial<Record<keyof Guest, string>> {
  const errors: Partial<Record<keyof Guest, string>> = {}
  if (!guest.name.trim()) errors.name = 'name'
  if (!/^69\d{8}$/.test(normalizeMobile(guest.phone))) errors.phone = 'phone'
  if (guest.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email.trim())) errors.email = 'email'
  return errors
}
