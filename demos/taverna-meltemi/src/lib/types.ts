export type Status = 'confirmed' | 'seated' | 'cancelled'

export interface Selection {
  date: string
  party: number
  time: string
}

export interface Guest {
  name: string
  phone: string
  email: string
  notes: string
}

export interface Reservation extends Selection, Guest {
  ref: string
  status: Status
}
