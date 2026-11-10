export interface L10n {
  el: string
  en: string
}

export type Hue = 'olive' | 'sea' | 'clay'

export interface Room {
  id: string
  name: L10n
  description: L10n
  capacity: number
  /** How many identical rooms of this type the hotel has. */
  units: number
  /** Base price per night in EUR (low season). */
  basePrice: number
  size: number
  features: L10n[]
  hue: Hue
}

export interface Stay {
  checkIn: string
  checkOut: string
  guests: number
}

export type BookingStatus = 'confirmed' | 'cancelled'

export interface Booking {
  ref: string
  roomId: string
  checkIn: string
  checkOut: string
  guests: number
  name: string
  email: string
  phone: string
  notes: string
  total: number
  status: BookingStatus
  createdAt: string
}

export type StayError = 'dates-missing' | 'past' | 'order' | 'min-nights' | 'guests'
