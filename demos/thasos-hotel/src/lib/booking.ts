import type { Booking, Room, Stay, StayError } from './types'

const DAY = 86_400_000

/** ISO date (YYYY-MM-DD) -> UTC timestamp. */
const ts = (iso: string): number => Date.parse(`${iso}T00:00:00Z`)

export const toIso = (t: number): string => new Date(t).toISOString().slice(0, 10)

export const addDays = (iso: string, days: number): string => toIso(ts(iso) + days * DAY)

export const todayIso = (): string => {
  const d = new Date()
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 10)
}

export const nightsBetween = (checkIn: string, checkOut: string): number =>
  Math.round((ts(checkOut) - ts(checkIn)) / DAY)

/** Every night of a stay: the check-in date up to, not including, the check-out date. */
export const eachNight = (checkIn: string, checkOut: string): string[] => {
  const nights: string[] = []
  for (let t = ts(checkIn); t < ts(checkOut); t += DAY) nights.push(toIso(t))
  return nights
}

/** Demo pricing: peak 15 Jul – 31 Aug, shoulder June and September, base otherwise. */
export const seasonMultiplier = (iso: string): number => {
  const month = Number(iso.slice(5, 7))
  const day = Number(iso.slice(8, 10))
  if ((month === 7 && day >= 15) || month === 8) return 1.5
  if (month === 6 || month === 9 || month === 7) return 1.2
  return 1
}

export const isPeak = (iso: string): boolean => seasonMultiplier(iso) === 1.5

export const nightPrice = (room: Room, iso: string): number =>
  Math.round(room.basePrice * seasonMultiplier(iso))

export const totalPrice = (room: Room, checkIn: string, checkOut: string): number =>
  eachNight(checkIn, checkOut).reduce((sum, night) => sum + nightPrice(room, night), 0)

/** Peak season requires 3 nights, otherwise 2. */
export const minNights = (checkIn: string, checkOut: string): number =>
  eachNight(checkIn, checkOut).some(isPeak) ? 3 : 2

export const validateStay = (stay: Stay, today: string = todayIso()): StayError | null => {
  if (!stay.checkIn || !stay.checkOut) return 'dates-missing'
  if (stay.checkIn < today) return 'past'
  if (stay.checkOut <= stay.checkIn) return 'order'
  if (nightsBetween(stay.checkIn, stay.checkOut) < minNights(stay.checkIn, stay.checkOut)) return 'min-nights'
  if (!Number.isInteger(stay.guests) || stay.guests < 1) return 'guests'
  return null
}

/**
 * Units of a room still free for the whole stay: total units minus the busiest night
 * among confirmed bookings that overlap the stay.
 */
export const unitsLeft = (room: Room, bookings: Booking[], checkIn: string, checkOut: string): number => {
  const nights = eachNight(checkIn, checkOut)
  const relevant = bookings.filter((b) => b.roomId === room.id && b.status === 'confirmed')
  const busiest = nights.reduce((max, night) => {
    const used = relevant.filter((b) => b.checkIn <= night && night < b.checkOut).length
    return Math.max(max, used)
  }, 0)
  return Math.max(0, room.units - busiest)
}

export const availableRooms = (rooms: Room[], bookings: Booking[], stay: Stay): Room[] =>
  rooms.filter(
    (room) => room.capacity >= stay.guests && unitsLeft(room, bookings, stay.checkIn, stay.checkOut) > 0,
  )

export const makeRef = (): string => {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = 'EB-'
  for (let i = 0; i < 6; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)]
  return out
}

export const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
