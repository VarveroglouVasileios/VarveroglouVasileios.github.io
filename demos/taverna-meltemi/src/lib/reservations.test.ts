import { describe, expect, it } from 'vitest'
import { addDays, availableSlots, CAPACITY, peakSeats, SLOTS, TABLES, todayIso, validateGuest, validateSelection } from './reservations'
import type { Guest, Reservation } from './types'

const now = new Date('2026-07-14T10:00:00.000Z') // 13:00 in Athens
const date = '2026-07-14'
const make = (time: string, party: number, status: Reservation['status'] = 'confirmed', day = date): Reservation => ({
  date: day, time, party, status, ref: 'MT-test', name: 'Demo guest', phone: '6912345678', email: '', notes: '',
})
const full = (time: string) => [
  ...Array.from({ length: 5 }, () => make(time, 10)),
  make(time, 6),
]

describe('reservation hours', () => {
  it('offers half-hour starts from 13:00 to 22:30 inclusive', () => {
    expect(SLOTS).toHaveLength(20)
    expect(SLOTS[0]).toBe('13:00')
    expect(SLOTS[19]).toBe('22:30')
    expect(availableSlots([], date, 2, now)).toEqual(SLOTS)
    for (const time of ['12:30', '13:15', '23:00', '23:30', '7:00']) {
      expect(validateSelection([], { date, time, party: 2 }, now)).toBe('time')
    }
  })

  it('uses the restaurant’s local time, including after UTC date rollover and in winter', () => {
    expect(todayIso(new Date('2026-07-13T21:30:00Z'))).toBe(date)
    expect(validateSelection([], { date, time: '13:00', party: 2 }, new Date(now.valueOf() + 1))).toBe('past')
    expect(validateSelection([], { date: '2026-01-14', time: '13:00', party: 2 }, new Date('2026-01-14T11:30:00Z'))).toBe('past')
    expect(availableSlots([], addDays(date, -1), 2, now)).toEqual([])
  })

  it('rejects invalid dates and party sizes and distinguishes groups over ten', () => {
    expect(validateSelection([], { date: '2026-02-30', time: '20:00', party: 2 }, now)).toBe('date')
    for (const party of [0, 1.5, NaN]) {
      expect(validateSelection([], { date, time: '20:00', party }, now)).toBe('party')
    }
    expect(validateSelection([], { date, time: '20:00', party: 11 }, now)).toBe('largeParty')
    expect(validateSelection([], { date, time: '20:00', party: 10 }, now)).toBeUndefined()
  })
})

describe('seat capacity', () => {
  it('has 14 tables and 56 seats', () => {
    const inventory = Object.entries(TABLES)
    expect(inventory.reduce((total, [, count]) => total + count, 0)).toBe(14)
    expect(inventory.reduce((total, [size, count]) => total + Number(size) * count, 0)).toBe(CAPACITY)
  })

  it('blocks starts that overlap the full service window and allows adjoining intervals', () => {
    const times = availableSlots(full('20:00'), date, 2, now)
    expect(times).not.toContain('19:00')
    expect(times).not.toContain('20:00')
    expect(times).not.toContain('21:00')
    expect(times).toContain('18:30')
    expect(times).toContain('21:30')
  })

  it('checks the peak throughout the new booking, without adding non-simultaneous guests together', () => {
    const arrivals = [
      ...Array.from({ length: 4 }, () => make('18:30', 10)),
      ...Array.from({ length: 4 }, () => make('20:00', 10)),
    ]
    expect(peakSeats(arrivals, date, '19:30')).toBe(40)
    expect(validateSelection(arrivals, { date, time: '19:30', party: 10 }, now)).toBeUndefined()
    const later = full('20:30')
    expect(validateSelection(later, { date, time: '19:30', party: 1 }, now)).toBe('soldOut')
  })

  it('allows exactly 56 seats, ignores cancelled and other-day bookings, and counts seated guests', () => {
    const arrivals = full('19:00')
    arrivals[5] = make('19:00', 5, 'seated')
    arrivals.push(make('19:00', 10, 'cancelled'), make('19:00', 10, 'confirmed', addDays(date, 1)))
    expect(peakSeats(arrivals, date)).toBe(55)
    expect(validateSelection(arrivals, { date, time: '19:00', party: 1 }, now)).toBeUndefined()
    expect(validateSelection(arrivals, { date, time: '19:00', party: 2 }, now)).toBe('soldOut')
    arrivals[5].status = 'cancelled'
    expect(validateSelection(arrivals, { date, time: '19:00', party: 2 }, now)).toBeUndefined()
  })
})

describe('guest details', () => {
  const guest: Guest = { name: 'Demo guest', phone: '6912345678', email: '', notes: '' }

  it.each(['6912345678', '+306912345678', '+30 691 234 5678'])('accepts %s with optional email', phone => {
    expect(validateGuest({ ...guest, phone })).toEqual({})
  })

  it.each(['', '2101234567', '691234567', '69123456789', '+44 6912345678', '306912345678'])('rejects %s', phone => {
    expect(validateGuest({ ...guest, phone })).toEqual({ phone: 'phone' })
  })

  it('requires a name and validates an email when entered', () => {
    expect(validateGuest({ ...guest, name: ' ', email: 'guest@' })).toEqual({ name: 'name', email: 'email' })
    expect(validateGuest({ ...guest, email: 'guest@example.com' })).toEqual({})
  })
})
