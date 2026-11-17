import type { L10n, L10nList } from '@/lib/l10n'

export interface CaseStudy {
  slug: string
  /** Matches `Project.id` in portfolio.ts */
  projectId: number
  /** Be upfront: these are the author's own products, not client work. */
  kind: 'own-product' | 'demo' | 'client'
  title: string
  tagline: L10n
  context: L10n
  problem: L10n
  solution: L10nList
  result: L10nList
  /** What a client of mine takes from this kind of work. */
  forYourBusiness: L10n
  stack: string[]
  imageUrl: string
  liveUrl: string
  liveLabel: L10n
}

/**
 * Results below are limited to what can be verified today (shipped, public, how it behaves).
 * TODO(owner): add real numbers (installs, users, rating, load time) when you have them —
 * do not invent figures.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'elia-bay-hotel-demo',
    projectId: 5,
    kind: 'demo',
    title: 'Elia Bay, hotel με σύστημα κρατήσεων',
    tagline: {
      el: 'Demo concept: ιστοσελίδα boutique ξενοδοχείου στη Θάσο με διαθεσιμότητα και κρατήσεις σε πραγματικό χρόνο.',
      en: 'Demo concept: a boutique hotel website in Thasos with live availability and booking.',
    },
    context: {
      el: 'Φανταστικό ξενοδοχείο, φτιαγμένο για να δείχνει σε ιδιοκτήτες καταλυμάτων της Θάσου και της Ανατολικής Μακεδονίας πώς δουλεύει ένα σύστημα κρατήσεων.',
      en: 'A fictional hotel built to show owners of accommodation in Thasos and Eastern Macedonia how a booking system works.',
    },
    problem: {
      el: 'Πολλά μικρά καταλύματα δέχονται κρατήσεις με τηλέφωνο και μηνύματα. Χάνουν ώρα, γράφουν λάθος ημερομηνίες και χάνουν πελάτες που θέλουν να κλείσουν αμέσως, ακόμα και βράδυ.',
      en: 'Many small hotels take bookings by phone and messages. They lose time, mix up dates and lose guests who want to book right away, even at night.',
    },
    solution: {
      el: [
        'Αναζήτηση με ημερομηνίες και επισκέπτες, με ελέγχους (παρελθόν, ελάχιστη διαμονή, χωρητικότητα).',
        'Διαθεσιμότητα ανά τύπο δωματίου με πολλά τεμάχια. Το δωμάτιο που έχει εξαντληθεί δεν εμφανίζεται.',
        'Τιμές ανά περίοδο (χαμηλή, ενδιάμεση, υψηλή) και ελάχιστη διαμονή το καλοκαίρι.',
        'Φόρμα κράτησης με επιβεβαίωση, κωδικό και προεπισκόπηση του email που θα έπαιρνε ο πελάτης.',
        'Σελίδα ανά δωμάτιο με γκαλερί και άμεσο έλεγχο τιμής, γκαλερί με lightbox, τοποθεσία και FAQ.',
        'Πίνακας διαχείρισης με πληρότητα 28 ημερών και ακύρωση κρατήσεων. Ελληνικά και αγγλικά, σχεδιασμένο πρώτα για κινητό.',
      ],
      en: [
        'Search by dates and guests, with checks (past dates, minimum stay, capacity).',
        'Availability per room type with several units. A sold-out room is not shown.',
        'Season-based prices (low, shoulder, peak) and a summer minimum stay.',
        'Booking form with confirmation, a reference code and a preview of the email the guest would get.',
        'A page for every room with a gallery and instant price check, a gallery with lightbox, location and FAQ.',
        'Admin dashboard with a 28-day occupancy grid and booking cancellation. Greek and English, designed mobile-first.',
      ],
    },
    result: {
      el: [
        'Λειτουργικό demo που μπορείτε να δοκιμάσετε: κάντε μια κράτηση και δείτε την στον πίνακα διαχείρισης (κωδικός «demo»).',
        'Η λογική κρατήσεων καλύπτεται από αυτόματα tests (επικαλυπτόμενες ημερομηνίες, ακυρώσεις, εποχές).',
        'Τα δεδομένα είναι προσομοιωμένα και μένουν στον browser σας. Σε πραγματικό έργο μπαίνουν βάση δεδομένων και αληθινά email.',
        'Οι φωτογραφίες είναι δημιουργημένες με AI και είναι ενδεικτικές.',
      ],
      en: [
        'A working demo you can try: make a booking and see it in the admin dashboard (password “demo”).',
        'The booking logic is covered by automated tests (overlapping dates, cancellations, seasons).',
        'Data is simulated and stays in your browser. A real project adds a database and real emails.',
        'Photos are AI-generated and illustrative.',
      ],
    },
    forYourBusiness: {
      el: 'Αν έχετε ξενοδοχείο, ενοικιαζόμενα δωμάτια ή βίλες, αυτό είναι το σύστημα που θα προσαρμόσω στα δικά σας δωμάτια, τις τιμές και το ωράριό σας.',
      en: 'If you run a hotel, rooms or villas, this is the system I would adapt to your own rooms, prices and hours.',
    },
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'vue-i18n', 'Vitest'],
    imageUrl: '/elia-bay-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/HotelProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'taverna-meltemi-demo',
    projectId: 6,
    kind: 'demo',
    title: 'Taverna Meltemi, μενού και κρατήσεις τραπεζιών',
    tagline: {
      el: 'Demo concept: ιστοσελίδα ταβέρνας με δίγλωσσο μενού και online κράτηση τραπεζιού με έλεγχο θέσεων.',
      en: 'Demo concept: a taverna website with a bilingual menu and online table booking that checks seat capacity.',
    },
    context: {
      el: 'Φανταστική παραθαλάσσια ταβέρνα στην Καβάλα, φτιαγμένη για να δείχνει σε εστιάτορες πώς μπορεί να δουλέψει ένα μενού και ένα σύστημα κρατήσεων.',
      en: 'A fictional seaside taverna in Kavala, built to show restaurant owners how a menu and a reservation system can work.',
    },
    problem: {
      el: 'Οι κρατήσεις με τηλέφωνο και μηνύματα τα βράδια της σεζόν χάνονται, μπερδεύονται και αφήνουν τραπέζια άδεια ή υπερκλεισμένα. Το μενού σε χαρτί ή PDF δεν δείχνει φωτογραφίες, αλλεργιογόνα ή επιλογές για vegetarian.',
      en: 'Phone and message bookings get lost on busy summer evenings and leave tables empty or overbooked. A paper or PDF menu shows no photos, allergens or vegetarian options.',
    },
    solution: {
      el: [
        'Κράτηση ανά 30 λεπτά, με έλεγχο θέσεων: κάθε τραπέζι δεσμεύεται για 90 λεπτά και η ώρα γεμίζει όταν ξεπεραστούν οι 56 θέσεις.',
        'Η ώρα υπολογίζεται στη ζώνη της Αθήνας, και δεν επιτρέπονται παρελθοντικές ώρες ούτε παρέες πάνω από 10 άτομα.',
        'Δίγλωσσο μενού 24 πιάτων με φωτογραφίες και συνδυαστικά φίλτρα (vegetarian, νηστίσιμο, χωρίς γλουτένη) και σημείωση αλλεργιογόνων.',
        'Πίνακας διαχείρισης με κρατήσεις της ημέρας, πληρότητα 7 ημερών, ένδειξη «κάθισε» και ακύρωση.',
        'Γκαλερί με lightbox, FAQ και σχεδιασμός πρώτα για κινητό.',
      ],
      en: [
        'Booking in 30-minute steps with seat checks: each table is held for 90 minutes and a time fills up once 56 seats are used.',
        'Times are calculated in Athens time, and past times and parties over 10 are rejected.',
        'A bilingual 24-dish menu with photos, combinable filters (vegetarian, lenten, gluten-free) and an allergen note.',
        'An admin dashboard with the day’s bookings, 7-day occupancy, “seated” status and cancellation.',
        'A gallery with lightbox, an FAQ and a mobile-first design.',
      ],
    },
    result: {
      el: [
        'Λειτουργικό demo που δοκιμάζετε αμέσως: κλείστε τραπέζι και δείτε το στον πίνακα διαχείρισης (κωδικός «demo»).',
        'Η λογική κρατήσεων καλύπτεται από 17 αυτόματα tests (επικαλυπτόμενα παράθυρα, όρια ωρών, χωρητικότητα, ακυρώσεις).',
        'Προσβάσιμη φόρμα με ορατά labels, μηνύματα σφάλματος και εστίαση στο πρώτο λάθος.',
        'Τα δεδομένα είναι προσομοιωμένα και μένουν στον browser σας. Οι φωτογραφίες είναι δημιουργημένες με AI και ενδεικτικές.',
      ],
      en: [
        'A working demo you can try right away: book a table and see it in the admin dashboard (password “demo”).',
        'The booking logic is covered by 17 automated tests (overlapping windows, time boundaries, capacity, cancellations).',
        'An accessible form with visible labels, error messages and focus on the first error.',
        'Data is simulated and stays in your browser. Photos are AI-generated and illustrative.',
      ],
    },
    forYourBusiness: {
      el: 'Αν έχετε εστιατόριο, ταβέρνα ή καφέ, αυτό προσαρμόζεται στο δικό σας μενού, στους χώρους σας και στους κανόνες κρατήσεών σας.',
      en: 'If you run a restaurant, taverna or café, this adapts to your own menu, your space and your booking rules.',
    },
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'vue-i18n', 'Vitest'],
    imageUrl: '/taverna-meltemi-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/TavernaProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'almyra-cafe-demo',
    projectId: 7,
    kind: 'demo',
    title: 'Almyra Café, demo παραγγελίας και παραλαβής',
    tagline: {
      el: 'Demo concept: café με παραγγελία και παραλαβή σε ώρες ανά 15 λεπτά, με όριο ανά ώρα και οθόνη κουζίνας.',
      en: 'Demo concept: a café with order-ahead pickup in 15-minute slots, a per-slot limit and a kitchen board.',
    },
    context: {
      el: 'Φανταστικό café δίπλα στη θάλασσα, φτιαγμένο για να δείχνει σε ιδιοκτήτες καφέ πώς η προπαραγγελία αφαιρεί την ουρά στο ταμείο.',
      en: 'A fictional beachfront café, built to show café owners how ordering ahead can remove the queue at the counter.',
    },
    problem: {
      el: 'Τα πρωινά δημιουργούν ουρά, βιαστικές παραγγελίες και πελάτες που φεύγουν, ενώ η κουζίνα δεν ξέρει πόσα έρχονται στα επόμενα δέκα λεπτά.',
      en: 'Morning rushes create queues, rushed orders and walk-aways, while the kitchen cannot tell how much is coming in the next quarter hour.',
    },
    solution: {
      el: [
        'Μενού με καλάθι και σύνολο που υπολογίζεται σε λεπτά.',
        'Ώρες παραλαβής ανά 15 λεπτά με όριο ανά ώρα· οι μεγάλες παραγγελίες μετρούν διπλά και οι γεμάτες ή περασμένες ώρες κλείνουν.',
        'Ο έλεγχος επαναλαμβάνεται κατά την αποστολή, ώστε δύο πελάτες να μην πάρουν την τελευταία θέση.',
        'Εισιτήριο παραγγελίας με κωδικό και οθόνη κουζίνας: νέες, ετοιμάζονται, έτοιμες, παραδόθηκαν, με φορτίο ανά ώρα.',
        'Σχεδιασμός τύπου πόστερ, πρώτα για κινητό, με κίνηση που σέβεται τη ρύθμιση μειωμένης κίνησης.',
      ],
      en: [
        'Menu with a cart and a total that is summed in cents.',
        'Pickup times every 15 minutes with a capacity per slot; big orders count double, and full or past times close.',
        'The check is repeated on submit, so two customers cannot take the last place.',
        'An order ticket with a code, and a kitchen board: new, preparing, ready, collected, with the load per hour.',
        'Poster-style design, mobile first, with motion that respects reduced-motion settings.',
      ],
    },
    result: {
      el: [
        'Λειτουργικό demo: παραγγείλτε, διαλέξτε ώρα και δείτε την παραγγελία στην οθόνη κουζίνας (κωδικός «demo»).',
        'Η λογική ωρών καλύπτεται από 12 αυτόματα tests (περασμένες ώρες, χωρητικότητα, ακυρώσεις, διπλό βάρος).',
        'Τα δεδομένα είναι προσομοιωμένα και μένουν στον browser σας. Οι φωτογραφίες είναι δημιουργημένες με AI και ενδεικτικές.',
      ],
      en: [
        'A working demo: order, pick a time and watch the order appear on the kitchen board (password “demo”).',
        'The slot logic is covered by 12 automated tests (past times, capacity, cancellations, double-weight orders).',
        'Data is simulated and stays in your browser. Photos are AI-generated and illustrative.',
      ],
    },
    forYourBusiness: {
      el: 'Αν έχετε καφέ ή φούρνο, αυτό προσαρμόζεται στο δικό σας μενού, στο ωράριο και στο πόσα προλαβαίνει η κουζίνα σας ανά τέταρτο.',
      en: 'If you run a café or bakery, this adapts to your own menu, opening hours and how much your kitchen can make per quarter hour.',
    },
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vitest'],
    imageUrl: '/almyra-cafe-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/CafeProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'eleon-pantry-demo',
    projectId: 8,
    kind: 'demo',
    title: 'Eleon Pantry, demo e-shop τοπικών προϊόντων',
    tagline: {
      el: 'Demo concept: e-shop με πραγματικό απόθεμα, καλάθι με κανόνες αποστολής και έκπτωσης και διαχείριση παραγγελιών.',
      en: 'Demo concept: an online shop with live stock, a cart with shipping and discount rules, and an orders admin.',
    },
    context: {
      el: 'Φανταστικός παραγωγός ελαιολάδου, μελιού και βοτάνων από τη Θάσο, φτιαγμένος για να δείχνει σε μικρούς παραγωγούς τι μπορεί να κάνει ένα απλό e-shop.',
      en: 'A fictional producer of olive oil, honey and herbs from Thasos, built to show small producers what a simple online shop can do.',
    },
    problem: {
      el: 'Οι πωλήσεις με μηνύματα και έμβασμα είναι αργές, το απόθεμα κρατιέται από μνήμης και ο πελάτης δεν ξέρει τα μεταφορικά μέχρι το τέλος.',
      en: 'Selling by messages and bank transfers is slow, stock is tracked by memory, and customers never know the shipping cost until the end.',
    },
    solution: {
      el: [
        'Κατάλογος με μεγέθη και πραγματικό απόθεμα: ενδείξεις εξαντλήθηκε και τελευταία τεμάχια, και καλάθι που δεν ξεπερνά ποτέ το απόθεμα.',
        'Καλάθι και ταμείο με επικύρωση πεδίων, τρεις περιοχές αποστολής, δωρεάν αποστολή από 40 € και μπάρα προόδου προς αυτή.',
        'Κωδικός έκπτωσης με ελάχιστο ποσό και συσκευασία δώρου, με όλα τα ποσά υπολογισμένα σε λεπτά.',
        'Επιβεβαίωση παραγγελίας και διαχείριση με καταστάσεις νέα, συσκευάστηκε, στάλθηκε· η ακύρωση επιστρέφει τα τεμάχια στο απόθεμα.',
        'Σχεδιασμός τύπου έντυπου καταλόγου, με κίνηση που σέβεται τη ρύθμιση μειωμένης κίνησης.',
      ],
      en: [
        'Catalogue with sizes and live stock: sold out and last-pieces badges, and a cart that can never exceed the stock.',
        'Cart and checkout with field validation, three shipping regions, free shipping from 40 € and a progress bar toward it.',
        'A discount code with a minimum, and gift wrap, with all money calculated in cents.',
        'Order confirmation and an admin with new, packed and shipped statuses; cancelling returns the units to the shelf.',
        'Editorial design with motion that respects reduced-motion settings.',
      ],
    },
    result: {
      el: [
        'Λειτουργικό demo: αγοράστε κάτι, δείτε το απόθεμα να μειώνεται και βρείτε την παραγγελία στη διαχείριση (κωδικός «demo», δοκιμάστε τον κωδικό THASOS10).',
        'Η λογική καλαθιού, αποθέματος, έκπτωσης και αποστολής καλύπτεται από 12 αυτόματα tests.',
        'Τα δεδομένα είναι προσομοιωμένα και μένουν στον browser σας. Οι φωτογραφίες είναι δημιουργημένες με AI και ενδεικτικές.',
      ],
      en: [
        'A working demo: buy something, see the stock drop and find the order in the admin (password “demo”, try the code THASOS10).',
        'The cart, stock, discount and shipping logic is covered by 12 automated tests.',
        'Data is simulated and stays in your browser. Photos are AI-generated and illustrative.',
      ],
    },
    forYourBusiness: {
      el: 'Αν παράγετε ή πουλάτε τοπικά προϊόντα, αυτό προσαρμόζεται στα δικά σας προϊόντα, τιμές και κανόνες αποστολής. Για πραγματικές πληρωμές χρειάζεται πάροχος πληρωμών.',
      en: 'If you produce or sell local goods, this adapts to your own products, prices and delivery rules. Real payments need a payment provider.',
    },
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vitest'],
    imageUrl: '/eleon-pantry-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/ShopProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'kalypso-studio-demo',
    projectId: 9,
    kind: 'demo',
    title: 'Kalypso Studio, demo online ραντεβού',
    tagline: {
      el: 'Demo concept: studio περιποίησης με online ραντεβού ανά υπηρεσία και ειδικό, και ημερολόγιο προσωπικού.',
      en: 'Demo concept: a beauty studio with online appointments by service and specialist, and a staff calendar.',
    },
    context: {
      el: 'Φανταστικό studio περιποίησης στην Καβάλα, φτιαγμένο για να δείχνει σε κομμωτήρια και κλινικές πώς δουλεύει η κράτηση χωρίς τηλέφωνα.',
      en: 'A fictional beauty studio in Kavala, built to show salons and clinics how self-service booking can work without phone calls.',
    },
    problem: {
      el: 'Τα ραντεβού με τηλέφωνο διακόπτουν τη δουλειά και οι σταθερές ώρες αγνοούν ότι ένα μασάζ κρατά μία ώρα και ένα μανικιούρ 45 λεπτά, με αποτέλεσμα κενά και επικαλύψεις.',
      en: 'Appointments by phone interrupt the work, and fixed slots ignore that a massage takes an hour and a manicure 45 minutes, so gaps and overlaps appear.',
    },
    solution: {
      el: [
        'Υπηρεσίες με διάρκεια και τιμή, και ειδικοί που κάνουν ο καθένας μόνο ορισμένες υπηρεσίες.',
        'Κάθε ειδικός έχει ημέρες εργασίας, ωράριο Σαββάτου και διαλείμματα· οι ελεύθερες ώρες ακολουθούν τη διάρκεια και αφήνουν 10 λεπτά καθαρισμού μετά από κάθε ραντεβού.',
        'Το «όποιος είναι διαθέσιμος» ενώνει τις ελεύθερες ώρες όλων και αναθέτει στη λιγότερο φορτωμένη ημέρα.',
        'Ο έλεγχος επαναλαμβάνεται κατά την επιβεβαίωση και το ημερολόγιο προσωπικού δείχνει την ημέρα κάθε ειδικού με ολοκλήρωση και ακύρωση.',
        'Ήρεμος, μινιμαλ σχεδιασμός με κίνηση που σέβεται τη ρύθμιση μειωμένης κίνησης.',
      ],
      en: [
        'Services with durations and prices, and specialists who each perform only some services.',
        'Each specialist has working days, Saturday hours and breaks; free times follow the service duration and keep a 10-minute buffer after every appointment.',
        '“Any available specialist” merges everyone’s free times and assigns the lighter day.',
        'The check is repeated on confirmation, and a staff calendar shows each specialist’s day with complete and cancel actions.',
        'A calm, minimal design with motion that respects reduced-motion settings.',
      ],
    },
    result: {
      el: [
        'Λειτουργικό demo: κλείστε ραντεβού και δείτε το στο ημερολόγιο προσωπικού (κωδικός «demo»).',
        'Η λογική προγραμματισμού καλύπτεται από 11 αυτόματα tests (διαλείμματα, χρόνος καθαρισμού, επικαλύψεις, προειδοποίηση ίδιας ημέρας, ανάθεση).',
        'Τα δεδομένα είναι προσομοιωμένα και μένουν στον browser σας. Οι φωτογραφίες είναι δημιουργημένες με AI και ενδεικτικές.',
      ],
      en: [
        'A working demo: book an appointment and see it in the staff calendar (password “demo”).',
        'The scheduling logic is covered by 11 automated tests (breaks, buffers, overlaps, same-day notice, assignment).',
        'Data is simulated and stays in your browser. Photos are AI-generated and illustrative.',
      ],
    },
    forYourBusiness: {
      el: 'Αν έχετε κομμωτήριο, κλινική ή studio, αυτό προσαρμόζεται στις δικές σας υπηρεσίες, στα ωράρια του προσωπικού και στους κανόνες σας.',
      en: 'If you run a salon, clinic or studio, this adapts to your own services, staff hours and rules.',
    },
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vitest'],
    imageUrl: '/kalypso-studio-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/SalonProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'bluewake-rentals-demo',
    projectId: 10,
    kind: 'demo',
    title: 'Bluewake Rentals, demo κρατήσεων σκαφών και scooter',
    tagline: {
      el: 'Demo concept: ενοικίαση σκαφών και scooter με διαθεσιμότητα ανά όχημα, τιμολόγηση ανά διάρκεια και διαχείριση στόλου.',
      en: 'Demo concept: boat and scooter rentals with per-vehicle availability, duration pricing and a fleet admin.',
    },
    context: {
      el: 'Φανταστική επιχείρηση ενοικίασης στο λιμάνι της Θάσου, φτιαγμένη για να δείχνει σε ιδιοκτήτες πώς διαχειρίζονται online η διαθεσιμότητα και οι τιμές.',
      en: 'A fictional rental business at the port of Thasos, built to show rental owners how availability and pricing can be handled online.',
    },
    problem: {
      el: 'Οι κρατήσεις με τηλέφωνο διπλοκλείνουν σκάφη, οι τιμές αλλάζουν με τη διάρκεια και την εποχή και κανείς δεν βλέπει με μια ματιά τι είναι ελεύθερο τώρα.',
      en: 'Phone bookings double-book boats, prices change with the duration and the season, and nobody knows at a glance what is free right now.',
    },
    solution: {
      el: [
        'Σκάφη με τιμή ανά μπλοκ (2 ώρες, 4 ώρες, ημέρα) και scooter ανά ημέρα, με έκπτωση 10% από 3 ημέρες και 20% από 7 ημέρες.',
        'Διαθεσιμότητα ανά όχημα: κάθε ώρα έναρξης δείχνει πόσα είναι ελεύθερα, τα σκάφη επιστρέφουν έως τις 20:00 και χρειάζονται 30 λεπτά καθαρισμού.',
        'Προκαταβολή 30%, επιστρεφόμενη εγγύηση και υποχρεωτική δήλωση διπλώματος για scooter.',
        'Ο έλεγχος επαναλαμβάνεται κατά την επιβεβαίωση και ανατίθεται ελεύθερο όχημα· η διαχείριση στόλου δείχνει κάθε όχημα με ενέργειες παράδοσης και επιστροφής.',
        'Σκούρος σχεδιασμός τύπου πίνακα λιμανιού, με κίνηση που σέβεται τη ρύθμιση μειωμένης κίνησης.',
      ],
      en: [
        'Boats priced per block (2 hours, 4 hours, day) and scooters per day, with a 10% discount from 3 days and 20% from 7 days.',
        'Availability is per vehicle: every start time shows how many are free, boats return by 20:00 and need a 30-minute turnaround.',
        'A 30% advance, a refundable deposit and a required licence declaration for scooters.',
        'The check is repeated on confirmation and a free vehicle is assigned; a fleet admin shows each vehicle and the hand-over and return actions.',
        'A dark, harbour-board design with motion that respects reduced-motion settings.',
      ],
    },
    result: {
      el: [
        'Λειτουργικό demo: κλείστε σκάφος ή scooter και βρείτε το στη διαχείριση στόλου (κωδικός «demo»).',
        'Η λογική τιμολόγησης και διαθεσιμότητας καλύπτεται από 12 αυτόματα tests (ωράριο, χρόνος καθαρισμού, εκπτώσεις, κανόνας διπλώματος).',
        'Τα δεδομένα είναι προσομοιωμένα και μένουν στον browser σας. Οι φωτογραφίες είναι δημιουργημένες με AI και ενδεικτικές.',
      ],
      en: [
        'A working demo: book a boat or scooter and find it in the fleet admin (password “demo”).',
        'The pricing and availability logic is covered by 12 automated tests (opening hours, turnaround, discounts, licence rule).',
        'Data is simulated and stays in your browser. Photos are AI-generated and illustrative.',
      ],
    },
    forYourBusiness: {
      el: 'Αν ενοικιάζετε σκάφη, scooter, ποδήλατα ή εξοπλισμό, αυτό προσαρμόζεται στον δικό σας στόλο, στις τιμές και στους κανόνες σας.',
      en: 'If you rent boats, scooters, bikes or equipment, this adapts to your own fleet, prices and rules.',
    },
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vitest'],
    imageUrl: '/bluewake-rentals-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/RentalProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'shadow-ai-firewall',
    projectId: 4,
    kind: 'own-product',
    title: 'Shadow AI Firewall',
    tagline: {
      el: 'Επέκταση Chrome που κρύβει προσωπικά και εμπιστευτικά δεδομένα πριν φύγουν προς AI chat.',
      en: 'A Chrome extension that masks personal and confidential data before it leaves for an AI chat.',
    },
    context: {
      el: 'Ομάδες και επαγγελματίες που χρησιμοποιούν εργαλεία AI chat στην καθημερινή δουλειά τους.',
      en: 'Teams and professionals who use AI chat tools in their daily work.',
    },
    problem: {
      el: 'Όταν κάποιος επικολλά κείμενο σε AI chat, μαζί φεύγουν συχνά email, IBAN, κάρτες, ΑΦΜ/ΑΜΚΑ, κωδικοί και tokens. Η επιχείρηση χάνει τον έλεγχο των δεδομένων της χωρίς να το καταλάβει.',
      en: 'Pasting text into an AI chat often sends emails, IBANs, cards, Greek tax/social IDs, passwords and tokens along with it. The business loses control of its data without noticing.',
    },
    solution: {
      el: [
        'Επέκταση Chrome (Manifest V3) που παρεμβαίνει στο εξερχόμενο αίτημα, όχι στο DOM, ώστε να μην χαλάει με τις αλλαγές των sites.',
        'Ανιχνευτές για email, IBAN, κάρτες, ελληνικά φορολογικά/ασφαλιστικά στοιχεία, τηλέφωνα, JWT tokens και ποσά.',
        'Αντικατάσταση με σταθερά placeholders πριν φύγει το αίτημα και τοπική επαναφορά του κειμένου στην οθόνη.',
        'Επεξεργασία μόνο στον browser και μόνο στα sites που έχουν δηλωθεί στα δικαιώματα της επέκτασης.',
      ],
      en: [
        'Chrome extension (Manifest V3) that works on the outgoing request instead of the DOM, so it does not break when sites change.',
        'Detectors for emails, IBANs, cards, Greek tax/social IDs, phone numbers, JWT tokens and amounts.',
        'Replacement with stable placeholders before the request leaves, and local restoration of the text on screen.',
        'Processing happens only in the browser and only on the sites declared in the extension permissions.',
      ],
    },
    result: {
      el: [
        'Δημοσιευμένη στο Chrome Web Store και διαθέσιμη σε οποιονδήποτε.',
        'Τα ευαίσθητα δεδομένα αντικαθίστανται πριν φύγουν από τον browser. Δεν στέλνονται στον διακομιστή μου.',
        'Σταθερή λειτουργία σε πραγματικά AI chat interfaces, με κανόνες που περιορίζουν τα ψευδώς θετικά.',
      ],
      en: [
        'Published on the Chrome Web Store and available to anyone.',
        'Sensitive data is replaced before it leaves the browser. Nothing is sent to my server.',
        'Stable behaviour on real AI chat interfaces, with rules tuned to limit false positives.',
      ],
    },
    forYourBusiness: {
      el: 'Αν θέλετε εργαλείο ή επέκταση που προστατεύει δεδομένα πελατών ή υπαλλήλων, ή έλεγχο του πώς διαχειρίζεται η ομάδα σας ευαίσθητα στοιχεία, αυτή είναι η δουλειά που κάνω.',
      en: 'If you need a tool or extension that protects customer or staff data, or a review of how your team handles sensitive information, this is the kind of work I do.',
    },
    stack: ['TypeScript', 'WebExtensions', 'Chrome MV3'],
    imageUrl: '/shadow-ai-preview.png',
    liveUrl: 'https://chromewebstore.google.com/detail/dobaajjnlgpbfkhlfldikmlfihnilajp',
    liveLabel: { el: 'Chrome Web Store', en: 'Chrome Web Store' },
  },
  {
    slug: 'vibebites',
    projectId: 3,
    kind: 'own-product',
    title: 'VibeBites',
    tagline: {
      el: 'Ελληνική πλατφόρμα μαγειρικής με AI βοηθό, λίστες αγορών και meal planning.',
      en: 'A Greek-first cooking platform with an AI assistant, shopping lists and meal planning.',
    },
    context: {
      el: 'Καθημερινοί χρήστες που θέλουν ιδέες για φαγητό και οργάνωση του εβδομαδιαίου μενού, στα ελληνικά.',
      en: 'Everyday users who want meal ideas and weekly planning, in Greek.',
    },
    problem: {
      el: 'Οι περισσότερες εφαρμογές συνταγών είναι αγγλόφωνες και δεν καταλαβαίνουν ελληνικούς όρους και υλικά. Ο χρήστης δεν ξέρει τι να μαγειρέψει με ό,τι έχει στο ψυγείο και χάνει χρόνο σε λίστες και σχεδιασμό.',
      en: 'Most recipe apps are English-only and do not understand Greek terms and ingredients. Users do not know what to cook with what is in the fridge and lose time on lists and planning.',
    },
    solution: {
      el: [
        'Web εφαρμογή Vue 3 με Pinia και Tailwind, σχεδιασμένη πρώτα για κινητό.',
        'AI βοηθός που μετατρέπει τα υλικά του ψυγείου σε συνταγές με μακροθρεπτικά.',
        'Ανακάλυψη συνταγών, λίστες αγορών, εβδομαδιαίο πλάνο και λειτουργία μαγειρέματος βήμα-βήμα.',
        'Εγκατάσταση ως PWA και εμπειρία που αντέχει χωρίς σταθερή σύνδεση.',
        'Ασφάλεια στο AI endpoint με πιστοποίηση και περιορισμό αιτημάτων (rate limiting).',
      ],
      en: [
        'Vue 3 web app with Pinia and Tailwind, designed mobile-first.',
        'AI assistant that turns fridge ingredients into recipes with macros.',
        'Recipe discovery, shopping lists, weekly planner and step-by-step cooking mode.',
        'Installable as a PWA with an experience that holds up without a stable connection.',
        'AI endpoint protected with authentication and rate limiting.',
      ],
    },
    result: {
      el: [
        'Ζωντανό προϊόν που μπορεί να δοκιμάσει οποιοσδήποτε και να εγκαταστήσει στο κινητό του.',
        'Ο AI βοηθός κατανοεί ελληνικούς μαγειρικούς όρους.',
        'Το κόστος και η κατάχρηση του AI endpoint ελέγχονται με rate limiting.',
      ],
      en: [
        'A live product anyone can try and install on their phone.',
        'The AI assistant understands Greek culinary terms.',
        'AI endpoint cost and abuse are controlled with rate limiting.',
      ],
    },
    forYourBusiness: {
      el: 'Για μια επιχείρηση αυτό σημαίνει: web εφαρμογή που στήνεται σαν εφαρμογή κινητού (PWA), με ελληνικό περιεχόμενο, ενσωμάτωση AI με έλεγχο κόστους και σχεδιασμό για χρήση από το κινητό.',
      en: 'For a business this means: a web app that behaves like a mobile app (PWA), with Greek content, AI integration with cost control and a mobile-first design.',
    },
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'GROQ', 'Vercel'],
    imageUrl: '/VibeBites.png',
    liveUrl: 'https://vibe-bites.vercel.app/',
    liveLabel: { el: 'Δείτε το live', en: 'View live' },
  },
  {
    slug: 'shadow-ai-dashboard',
    projectId: 2,
    kind: 'own-product',
    title: 'Shadow AI — Admin Dashboard',
    tagline: {
      el: 'Πίνακας ελέγχου για ομάδες ασφάλειας, με ορατότητα στη χρήση AI χωρίς αποθήκευση των prompts.',
      en: 'An admin dashboard for security teams with visibility into AI usage without storing prompts.',
    },
    context: {
      el: 'Επιχειρήσεις που θέλουν να ξέρουν πώς χρησιμοποιείται το AI στην ομάδα τους χωρίς να παρακολουθούν το περιεχόμενο.',
      en: 'Businesses that want to know how AI is used in their team without monitoring the content itself.',
    },
    problem: {
      el: 'Η ομάδα ασφάλειας θέλει ορατότητα στην πρόσβαση σε εργαλεία AI, αλλά η αποθήκευση των prompts δημιουργεί νέο ρίσκο και θέμα ιδιωτικότητας.',
      en: 'Security teams want visibility into AI tool usage, but storing prompts creates a new risk and a privacy problem.',
    },
    solution: {
      el: [
        'Αρχιτεκτονική zero-knowledge: ο πίνακας δείχνει συμβάντα redaction χωρίς ποτέ να δει το αρχικό ευαίσθητο περιεχόμενο.',
        'Πολιτικές τύπου DLP και ορατότητα συνεδριών σε πραγματικό χρόνο.',
        'Σχεδιασμός που δείχνει συμβάντα υψηλής συχνότητας χωρίς να κουράζει τον χρήστη ή να πέφτει η απόδοση.',
      ],
      en: [
        'Zero-knowledge architecture: the dashboard shows redaction events without ever seeing the original sensitive content.',
        'DLP-style policies and real-time session visibility.',
        'A UI that presents high-frequency events without overwhelming the user or hurting performance.',
      ],
    },
    result: {
      el: [
        'Ζωντανό demo που δείχνει πώς η ορατότητα και η ιδιωτικότητα μπορούν να συνυπάρξουν.',
        'Καμία αποθήκευση prompts. Μόνο μεταδεδομένα συμβάντων.',
        'Διεπαφή που διαβάζεται εύκολα ακόμα και με πολλά συμβάντα.',
      ],
      en: [
        'A live demo showing that visibility and privacy can coexist.',
        'No prompt storage. Event metadata only.',
        'An interface that stays readable even with many events.',
      ],
    },
    forYourBusiness: {
      el: 'Αν χρειάζεστε εσωτερικό dashboard, πίνακα διαχείρισης ή αναφορές με σωστή διαχείριση δεδομένων και δικαιωμάτων, ο τρόπος σκέψης είναι ο ίδιος.',
      en: 'If you need an internal dashboard, admin panel or reporting with sound data and permission handling, the approach is the same.',
    },
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    imageUrl: '/shadow-ai-preview.png',
    liveUrl: 'https://shadow-ai-dashboard-topaz.vercel.app/',
    liveLabel: { el: 'Δείτε το live', en: 'View live' },
  },
]

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug)
