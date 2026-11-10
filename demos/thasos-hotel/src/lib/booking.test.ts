import { describe, expect, it } from 'vitest'
import {
  addDays,
  availableRooms,
  eachNight,
  isValidEmail,
  minNights,
  nightsBetween,
  totalPrice,
  unitsLeft,
  validateStay,
} from './booking'
import type { Booking, Room } from './types'

const room: Room = {
  id: 'r1',
  name: { el: 'Δ', en: 'R' },
  description: { el: '', en: '' },
  capacity: 2,
  units: 2,
  basePrice: 100,
  size: 20,
  features: [],
  hue: 'sea',
}

const booking = (checkIn: string, checkOut: string, status: Booking['status'] = 'confirmed'): Booking => ({
  ref: 'X',
  roomId: 'r1',
  checkIn,
  checkOut,
  guests: 2,
  name: 'A',
  email: 'a@b.co',
  phone: '',
  notes: '',
  total: 0,
  status,
  createdAt: '',
})

describe('dates', () => {
  it('counts nights and excludes the check-out day', () => {
    expect(nightsBetween('2027-05-10', '2027-05-13')).toBe(3)
    expect(eachNight('2027-05-10', '2027-05-13')).toEqual(['2027-05-10', '2027-05-11', '2027-05-12'])
  })
  it('adds days across month ends', () => {
    expect(addDays('2027-01-30', 3)).toBe('2027-02-02')
  })
})

describe('pricing', () => {
  it('uses the base price outside the season', () => {
    expect(totalPrice(room, '2027-04-10', '2027-04-12')).toBe(200)
  })
  it('charges peak rates from mid July and in August', () => {
    expect(totalPrice(room, '2027-08-10', '2027-08-12')).toBe(300)
  })
  it('mixes rates when a stay crosses a season boundary', () => {
    // 14 Jul: shoulder 120, 15 Jul: peak 150
    expect(totalPrice(room, '2027-07-14', '2027-07-16')).toBe(120 + 150)
  })
  it('requires 3 nights in peak season and 2 otherwise', () => {
    expect(minNights('2027-08-10', '2027-08-12')).toBe(3)
    expect(minNights('2027-04-10', '2027-04-12')).toBe(2)
  })
})

describe('validation', () => {
  const today = '2027-03-01'
  it('rejects missing, past and reversed dates', () => {
    expect(validateStay({ checkIn: '', checkOut: '', guests: 2 }, today)).toBe('dates-missing')
    expect(validateStay({ checkIn: '2027-02-27', checkOut: '2027-03-05', guests: 2 }, today)).toBe('past')
    expect(validateStay({ checkIn: '2027-04-10', checkOut: '2027-04-10', guests: 2 }, today)).toBe('order')
  })
  it('enforces minimum nights and guests', () => {
    expect(validateStay({ checkIn: '2027-04-10', checkOut: '2027-04-11', guests: 2 }, today)).toBe('min-nights')
    expect(validateStay({ checkIn: '2027-04-10', checkOut: '2027-04-12', guests: 0 }, today)).toBe('guests')
    expect(validateStay({ checkIn: '2027-04-10', checkOut: '2027-04-12', guests: 2 }, today)).toBeNull()
  })
  it('checks emails', () => {
    expect(isValidEmail('maria@example.gr')).toBe(true)
    expect(isValidEmail('maria@')).toBe(false)
  })
})

describe('availability', () => {
  const bookings = [booking('2027-05-10', '2027-05-14'), booking('2027-05-12', '2027-05-16')]

  it('counts the busiest overlapping night', () => {
    expect(unitsLeft(room, bookings, '2027-05-11', '2027-05-13')).toBe(0)
    expect(unitsLeft(room, bookings, '2027-05-10', '2027-05-12')).toBe(1)
  })
  it('lets a new guest arrive on the day another leaves', () => {
    expect(unitsLeft(room, [booking('2027-05-10', '2027-05-12'), booking('2027-05-10', '2027-05-12')], '2027-05-12', '2027-05-14')).toBe(2)
  })
  it('ignores cancelled bookings', () => {
    const cancelled = [booking('2027-05-10', '2027-05-14', 'cancelled'), booking('2027-05-10', '2027-05-14', 'cancelled')]
    expect(unitsLeft(room, cancelled, '2027-05-10', '2027-05-14')).toBe(2)
  })
  it('filters rooms by capacity and availability', () => {
    const stay = { checkIn: '2027-05-11', checkOut: '2027-05-13', guests: 2 }
    expect(availableRooms([room], bookings, stay)).toEqual([])
    expect(availableRooms([room], [], { ...stay, guests: 3 })).toEqual([])
    expect(availableRooms([room], [], stay)).toEqual([room])
  })
})
