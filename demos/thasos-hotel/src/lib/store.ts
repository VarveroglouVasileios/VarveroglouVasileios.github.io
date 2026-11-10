import { computed, reactive, watch } from 'vue'
import { addDays, makeRef, todayIso } from './booking'
import type { Booking } from './types'

const KEY = 'elia-bay-demo-bookings'

/** Seed data, relative to today, so the demo always shows a mix of free and sold-out dates. */
const seed = (): Booking[] => {
  const base = addDays(todayIso(), 14)
  const mk = (roomId: string, offset: number, nights: number, name: string, total: number): Booking => ({
    ref: makeRef(),
    roomId,
    checkIn: addDays(base, offset),
    checkOut: addDays(base, offset + nights),
    guests: 2,
    name,
    email: 'guest@example.com',
    phone: '',
    notes: '',
    total,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  })
  return [
    // Sea View Suite has 2 units: fully booked for the same week.
    mk('sea-suite', 0, 5, 'Demo Guest A', 700),
    mk('sea-suite', 1, 4, 'Demo Guest B', 560),
    mk('garden-double', 2, 3, 'Demo Guest C', 255),
    mk('pool-villa', 3, 6, 'Demo Guest D', 1920),
  ]
}

const load = (): Booking[] => {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as Booking[]
  } catch {
    /* storage unavailable: fall back to seed */
  }
  return seed()
}

const state = reactive<{ bookings: Booking[] }>({ bookings: load() })

watch(
  () => state.bookings,
  (value) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(value))
    } catch {
      /* ignore */
    }
  },
  { deep: true },
)

export const useBookings = () => ({
  bookings: computed(() => state.bookings),
  add: (booking: Booking): void => {
    state.bookings.push(booking)
  },
  find: (ref: string): Booking | undefined => state.bookings.find((b) => b.ref === ref),
  cancel: (ref: string): void => {
    const booking = state.bookings.find((b) => b.ref === ref)
    if (booking) booking.status = 'cancelled'
  },
  reset: (): void => {
    state.bookings = seed()
  },
})
