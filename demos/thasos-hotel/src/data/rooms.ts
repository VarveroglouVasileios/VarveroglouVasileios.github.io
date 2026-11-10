import type { L10n } from '@/lib/types'
import type { Room } from '@/lib/types'

const l = (el: string, en: string): L10n => ({ el, en })

/** All names, prices and descriptions are fictional demo content. */
export const rooms: Room[] = [
  {
    id: 'garden-double',
    name: l('Δωμάτιο με κήπο', 'Garden Double'),
    description: l(
      'Ήσυχο δωμάτιο στο ισόγειο με ιδιωτική βεράντα προς τον κήπο με τις ελιές.',
      'A quiet ground-floor room with a private terrace facing the olive garden.',
    ),
    capacity: 2,
    units: 4,
    basePrice: 85,
    size: 26,
    features: [l('Κλιματισμός', 'Air conditioning'), l('Βεράντα', 'Terrace'), l('Πρωινό', 'Breakfast')],
    image: 'garden-double',
  },
  {
    id: 'sea-suite',
    name: l('Σουίτα με θέα θάλασσα', 'Sea View Suite'),
    description: l(
      'Ευρύχωρη σουίτα με μπαλκόνι και θέα στον κόλπο, ιδανική για ζευγάρια ή μικρή παρέα.',
      'A spacious suite with a balcony overlooking the bay, ideal for couples or a small group.',
    ),
    capacity: 3,
    units: 2,
    basePrice: 140,
    size: 38,
    features: [l('Θέα θάλασσα', 'Sea view'), l('Μπαλκόνι', 'Balcony'), l('Μίνι μπαρ', 'Minibar')],
    image: 'sea-suite',
  },
  {
    id: 'family-apartment',
    name: l('Οικογενειακό διαμέρισμα', 'Family Apartment'),
    description: l(
      'Δύο υπνοδωμάτια, μικρή κουζίνα και σαλόνι. Άνετο για οικογένειες με παιδιά.',
      'Two bedrooms, a kitchenette and a living area. Comfortable for families with children.',
    ),
    capacity: 4,
    units: 2,
    basePrice: 170,
    size: 55,
    features: [l('2 υπνοδωμάτια', '2 bedrooms'), l('Κουζίνα', 'Kitchenette'), l('Παιδικό κρεβάτι', 'Baby cot')],
    image: 'family-apartment',
  },
  {
    id: 'pool-villa',
    name: l('Βίλα με ιδιωτική πισίνα', 'Pool Villa'),
    description: l(
      'Ανεξάρτητη βίλα με ιδιωτική πισίνα, τρία υπνοδωμάτια και πλήρη ιδιωτικότητα.',
      'A detached villa with a private pool, three bedrooms and complete privacy.',
    ),
    capacity: 6,
    units: 1,
    basePrice: 320,
    size: 120,
    features: [l('Ιδιωτική πισίνα', 'Private pool'), l('3 υπνοδωμάτια', '3 bedrooms'), l('Πάρκινγκ', 'Parking')],
    image: 'pool-villa',
  },
]

export const getRoom = (id: string): Room | undefined => rooms.find((r) => r.id === id)
