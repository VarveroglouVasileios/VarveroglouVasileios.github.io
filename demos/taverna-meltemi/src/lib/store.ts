import { computed, ref } from 'vue'
import { addDays, normalizeMobile, TABLES, todayIso, validateGuest, validateSelection } from './reservations'
import type { Guest, Reservation, Selection, Status } from './types'

const KEY = 'taverna-meltemi-reservations'

function seed(start = todayIso()): Reservation[] {
  const dinner = Object.entries(TABLES).flatMap(([size, count]) => Array<number>(count).fill(Number(size)))
  return Array.from({ length: 7 }, (_, offset) => {
    const date = addDays(start, offset)
    const parties = offset < 2 || offset === 4 ? dinner : dinner.slice(8)
    return [
      ...parties.map(party => ({ time: '20:30', party })),
      { time: '17:30', party: 4 },
    ].map(({ time, party }, index): Reservation => ({
      ref: `MT-D${date.replace(/-/g, '')}-${index + 1}`,
      date, time, party, name: `Demo Guest ${index + 1}`, phone: '', email: '', notes: '', status: 'confirmed',
    }))
  }).flat()
}

function read(): Reservation[] | undefined {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return
    const saved: unknown = JSON.parse(raw)
    if (Array.isArray(saved)) return saved as Reservation[]
  } catch {
    // Fall back to this tab's state when storage is unavailable.
  }
}

const saved = read()
const state = ref(saved ?? seed())
const day = ref(todayIso())

function save(value: Reservation[]) {
  state.value = value
  try {
    localStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    // The demo still works in this tab when storage is unavailable.
  }
}

if (!saved) save(state.value)

function sync() {
  day.value = todayIso()
  const latest = read()
  if (latest) state.value = latest
}

window.addEventListener('storage', event => {
  if (event.key === KEY || event.key === null) sync()
})

function withLatest<T>(operation: () => T): Promise<T> {
  const run = () => {
    sync()
    return operation()
  }
  // Serialize updates across tabs where Web Locks are supported.
  return navigator.locks ? navigator.locks.request(KEY, run) : Promise.resolve(run())
}

export function useReservations() {
  return {
    reservations: computed(() => state.value),
    today: day,
    sync,
    find: (ref: string) => state.value.find(item => item.ref === ref),
    book: (selection: Selection, guest: Guest) => withLatest(() => {
      const error = validateSelection(state.value, selection)
      if (error) return { error }
      const errors = validateGuest(guest)
      if (Object.keys(errors).length) return { errors }
      const reservation: Reservation = {
        ...selection,
        ref: `MT-${Array.from(crypto.getRandomValues(new Uint8Array(6)), n => n.toString(16).padStart(2, '0')).join('').toUpperCase()}`,
        status: 'confirmed',
        name: guest.name.trim(),
        phone: normalizeMobile(guest.phone),
        email: guest.email.trim(),
        notes: guest.notes.trim(),
      }
      save([...state.value, reservation])
      return { reservation }
    }),
    setStatus: (ref: string, status: Exclude<Status, 'confirmed'>) => withLatest(() => {
      save(state.value.map(item => item.ref === ref && item.status !== 'cancelled' ? { ...item, status } : item))
    }),
    reset: () => withLatest(() => save(seed())),
  }
}
