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
  {
    slug: 'vivliario-service-book-demo',
    projectId: 11,
    kind: 'demo',
    title: 'Βιβλιάριο, demo ψηφιακού βιβλιαρίου service',
    tagline: {
      el: 'Demo concept: ψηφιακό βιβλιάριο service για συνεργείο, με υπενθυμίσεις και ραντεβού.',
      en: 'Demo concept: a digital service book for a car workshop, with reminders and appointments.',
    },
    context: {
      el: 'Φανταστικό συνεργείο στην Καβάλα, φτιαγμένο για να δείχνει σε ιδιοκτήτες συνεργείων πώς ο πελάτης κρατά όλο το ιστορικό του αυτοκινήτου σε ένα σημείο αντί για χάρτινο βιβλιάριο.',
      en: 'A fictional workshop in Kavala, built to show garage owners how a customer can keep the whole history of a car in one place instead of a paper booklet.',
    },
    problem: {
      el: 'Το ιστορικό χάνεται, οι ημερομηνίες ΚΤΕΟ ξεχνιούνται και οι πελάτες τηλεφωνούν για να ρωτήσουν πότε έγινε η τελευταία αλλαγή λαδιών.',
      en: 'Service history gets lost, MOT dates are forgotten, and customers call to ask when the last oil change was.',
    },
    solution: {
      el: [
        'Πινακίδα, χιλιόμετρα και πίνακας ιστορικού εργασιών με προσθήκη και διαγραφή.',
        'Υπενθυμίσεις ΚΤΕΟ και λαδιών που υπολογίζονται από ημερομηνίες και χιλιόμετρα, με μπάρα προόδου και κατάσταση εκπρόθεσμου.',
        'Κράτηση ραντεβού με ελεύθερες ώρες ανά ημέρα, χωρίς Κυριακές και χωρίς διπλοκράτηση ώρας.',
        'Χιλιομετρητής που γυρίζει στην πραγματική τιμή και σφάλματα φορμών δίπλα στο πεδίο.',
      ],
      en: [
        'Plate, mileage and a service history table that can be added to and removed from.',
        'MOT and oil reminders worked out from the dates and kilometres, with a progress bar and an overdue state.',
        'Appointment booking with free hours per day, no Sundays and no double booking of an hour.',
        'An odometer that rolls to the real value, and form errors that appear next to the field.',
      ],
    },
    result: {
      el: [
        'Λειτουργικό demo: προσθέστε μια εργασία, αλλάξτε τα χιλιόμετρα και δείτε τις υπενθυμίσεις να αλλάζουν.',
        'Η λογική ημερομηνιών, υπενθυμίσεων, πινακίδας, ελέγχων και ωρών καλύπτεται από 16 αυτόματα tests.',
        'Τα δεδομένα μένουν στην καρτέλα του browser (sessionStorage) και σβήνουν όταν κλείσει.',
      ],
      en: [
        'A working demo: add a job, change the mileage and watch the reminders change.',
        'The date, reminder, plate, validation and slot logic is covered by 16 automated tests.',
        'Data stays in your browser tab (sessionStorage) and is cleared when the tab closes.',
      ],
    },
    forYourBusiness: {
      el: 'Αν έχετε συνεργείο ή ελαστικά, αυτό γίνεται το βιβλιάριο των πελατών σας, με δικά σας διαστήματα και ωράριο.',
      en: 'If you run a workshop or tyre shop, this becomes your customers\' service book with your own intervals and opening hours.',
    },
    stack: ['Vue 3', 'TypeScript', 'Vitest'],
    imageUrl: '/vivliario-service-book-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/VivliarioProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'room-360-demo',
    projectId: 12,
    kind: 'demo',
    title: 'Δωμάτιο 360, demo διαδραστικής προβολής δωματίου',
    tagline: {
      el: 'Demo concept: δείτε το δωμάτιο, σημείο προς σημείο, πριν το κλείσετε.',
      en: 'Demo concept: look around a room, point by point, before you book it.',
    },
    context: {
      el: 'Για μικρά ξενοδοχεία που έχουν καλές φωτογραφίες αλλά δεν δείχνουν τι υπάρχει πού. Οι φωτογραφίες είναι στατικές, δημιουργημένες με AI, άρα είναι προβολή με σύρσιμο και σημεία, όχι πραγματική ξενάγηση 360°.',
      en: 'Built for small hotels that have good room photos but no way to show what is where. The photos are static AI images, so this is a pan-and-hotspot viewer, not a true 360° tour.',
    },
    problem: {
      el: 'Οι επισκέπτες ρωτούν τηλεφωνικά τα ίδια: πόσο μεγάλο είναι το κρεβάτι, υπάρχει βεράντα, έχει κλιματισμό.',
      en: 'Guests ask the same questions by phone: how big is the bed, is there a terrace, does it have air-conditioning.',
    },
    solution: {
      el: [
        'Μεγεθυμένη φωτογραφία που σέρνεται προς δύο κατευθύνσεις, με όρια ώστε να μη φαίνεται ποτέ κενή άκρη.',
        'Αριθμημένα σημεία καρφωμένα στη φωτογραφία, με κάρτα και κουμπιά προηγούμενο/επόμενο.',
        'Τρία δωμάτια με δικά τους σημεία, εμβαδόν, άτομα και ενδεικτική τιμή.',
        'Έλεγχος από το πληκτρολόγιο με τα βέλη και ορατό focus.',
      ],
      en: [
        'A zoomed photo you drag in two directions, with limits so no empty edge ever shows.',
        'Numbered hotspots pinned to the photo, with a card and previous/next buttons.',
        'Three rooms with their own hotspots, area, guests and an indicative price.',
        'Keyboard control with the arrow keys and a visible focus state.',
      ],
    },
    result: {
      el: [
        'Λειτουργικός viewer που δοκιμάζεται σε υπολογιστή και κινητό.',
        'Η γεωμετρία (μέγεθος, όρια κίνησης, θέσεις σημείων, κυκλική πλοήγηση) καλύπτεται από 11 αυτόματα tests.',
        'Παραπέμπει στο demo ξενοδοχείου για διαθεσιμότητα. Μια πραγματική ξενάγηση 360° θέλει λήψεις 360° από κάθε δωμάτιο.',
      ],
      en: [
        'A working viewer you can try on desktop and phone.',
        'The geometry (cover size, pan limits, hotspot positions, wrap-around navigation) is covered by 11 automated tests.',
        'It links to the hotel demo for availability. A real 360° tour needs 360° shots of each room.',
      ],
    },
    forYourBusiness: {
      el: 'Αν νοικιάζετε δωμάτια ή διαμερίσματα, απαντά σε όσα ρωτούν οι επισκέπτες πριν τηλεφωνήσουν, με δικές σας φωτογραφίες.',
      en: 'If you rent rooms or apartments, this answers the questions guests ask before they call, using your own photos.',
    },
    stack: ['Vue 3', 'TypeScript', 'Vitest'],
    imageUrl: '/room-360-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/DwmatioProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'metrisi-renovation-estimate-demo',
    projectId: 13,
    kind: 'demo',
    title: 'Μέτρημα, demo εκτίμησης κόστους ανακαίνισης',
    tagline: {
      el: 'Demo concept: άμεση εκτίμηση ανακαίνισης σε τέσσερις ερωτήσεις.',
      en: 'Demo concept: an instant renovation estimate in four questions.',
    },
    context: {
      el: 'Για κατασκευαστές και ανακαινιστές που χάνουν πελάτες επειδή η πρώτη ερώτηση, πόσο κοστίζει, δεν έχει απάντηση στο site.',
      en: 'For builders and renovators who lose leads because the first question, how much will it cost, has no answer on the website.',
    },
    problem: {
      el: 'Οι άνθρωποι δεν τηλεφωνούν χωρίς μια χονδρική τιμή, και ένας γενικός τιμοκατάλογος δεν βοηθά για τον δικό τους χώρο.',
      en: 'People will not call without a rough number, and a vague price list does not help with their own room.',
    },
    solution: {
      el: [
        'Χώρος, τετραγωνικά, επίπεδο υλικών και έξτρα με επιλογές και slider, με τα m² να μένουν εντός ορίων.',
        'Εύρος τιμής που ενημερώνεται ζωντανά, με μπάρα ανάλυσης και κόστος ανά τετραγωνικό.',
        'Έξτρα με τιμή ανά είδος χώρου, και εύρος πάντα σε σειρά χαμηλό, σύνολο, υψηλό.',
        'Φόρμα αιτήματος επίσκεψης με ελέγχους, που καταγράφει την εκτίμηση από την οποία προήλθε.',
      ],
      en: [
        'Room, area, material level and extras chosen with chips and a slider, with the area kept in range.',
        'A price range that updates live, with a split bar and the cost per square metre.',
        'Extras priced by room type, and the range always ordered low, total, high.',
        'A visit request form with validation that records the estimate it came from.',
      ],
    },
    result: {
      el: [
        'Λειτουργικός υπολογιστής με ενδεικτικές τιμές, που αναγράφεται στη σελίδα.',
        'Η τιμολόγηση, το εύρος, τα όρια και οι έλεγχοι φόρμας καλύπτονται από 9 αυτόματα tests.',
        'Η εκτίμηση δηλώνεται καθαρά ότι δεν είναι προσφορά. Σε πραγματικό έργο χρησιμοποιείται ο δικός σας τιμοκατάλογος.',
      ],
      en: [
        'A working estimator with illustrative prices, marked as such on the page.',
        'The pricing, range, clamping and form validation are covered by 9 automated tests.',
        'The estimate is clearly labelled as not an offer. A real build uses your own price list.',
      ],
    },
    forYourBusiness: {
      el: 'Αν κάνετε ανακαινίσεις, υδραυλικά ή βαφές, μετατρέπει ένα αόριστο πρώτο τηλεφώνημα σε επαφή που ξέρει ήδη το εύρος.',
      en: 'If you do renovations, plumbing or painting, this turns a vague first call into a lead that already knows the ballpark.',
    },
    stack: ['Vue 3', 'TypeScript', 'Vitest'],
    imageUrl: '/metrisi-renovation-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/MetrisiProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'rythmos-class-waitlist-demo',
    projectId: 14,
    kind: 'demo',
    title: 'Ρυθμός, demo κράτησης μαθημάτων με λίστα αναμονής',
    tagline: {
      el: 'Demo concept: κλείστε θέση ή μπείτε σε λίστα αναμονής που ανεβαίνει μόνη της.',
      en: 'Demo concept: book a place, or join a waitlist that moves up by itself.',
    },
    context: {
      el: 'Για γυμναστήρια, yoga και χορό όπου τα μαθήματα γεμίζουν και η ρεσεψιόν περνά τη μέρα της με ακυρώσεις στο τηλέφωνο.',
      en: 'For gyms, yoga and dance studios where classes fill up and the front desk spends the day juggling cancellations by phone.',
    },
    problem: {
      el: 'Όταν κάποιος ακυρώνει, η θέση χάνεται αν δεν το προσέξει κάποιος και δεν πάρει τον επόμενο εγκαίρως.',
      en: 'When someone cancels, a place is wasted unless somebody notices and calls the next person in time.',
    },
    solution: {
      el: [
        'Εβδομαδιαίο πρόγραμμα με κουκκίδες θέσεων, κατάσταση γεμάτο και μήκος λίστας αναμονής.',
        'Η κράτηση γεμάτου μαθήματος βάζει σε λίστα αναμονής και δείχνει τη θέση σας.',
        'Μια ακύρωση κρατά τη θέση για τον πρώτο στη λίστα 15 λεπτά και μετά την περνά στον επόμενο.',
        'Κανόνας αργής ακύρωσης κάτω από δύο ώρες, και κουμπιά demo για προσομοίωση ακύρωσης ή χρόνου.',
      ],
      en: [
        'A weekly timetable with seat dots, a sold-out state and the waitlist length.',
        'Booking a full class joins the waitlist and shows your position.',
        'A cancellation holds the seat for the first in line for 15 minutes, then passes it on.',
        'A late-cancellation rule under two hours, and demo buttons to simulate someone cancelling or time passing.',
      ],
    },
    result: {
      el: [
        'Λειτουργικό demo: μπείτε σε γεμάτο μάθημα, προκαλέστε μια ακύρωση και επιβεβαιώστε τη θέση όταν προσφερθεί.',
        'Η λογική κράτησης, λίστας αναμονής, λήξης προσφοράς και ημερολογίου καλύπτεται από 16 αυτόματα tests, μεταξύ άλλων ότι δεν ξεπερνιέται ποτέ η χωρητικότητα.',
        'Στο demo δεν στέλνονται ειδοποιήσεις. Σε πραγματικό έργο προστίθενται SMS ή email και server.',
      ],
      en: [
        'A working demo: join a full class, trigger a cancellation, and confirm the seat when it is offered.',
        'The booking, waitlist, offer expiry and calendar logic is covered by 16 automated tests, including never exceeding capacity.',
        'Notifications are not sent in the demo. A real build adds SMS or email and a server.',
      ],
    },
    forYourBusiness: {
      el: 'Αν κάνετε μαθήματα με περιορισμένες θέσεις, γεμίζει κάθε θέση που ακυρώνεται χωρίς τηλέφωνο.',
      en: 'If you run classes with limited places, this fills every cancelled seat without a phone call.',
    },
    stack: ['Vue 3', 'TypeScript', 'Vitest'],
    imageUrl: '/rythmos-classes-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/RythmosProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'noumero-queue-demo',
    projectId: 15,
    kind: 'demo',
    title: 'Νούμερο, demo ψηφιακής σειράς προτεραιότητας',
    tagline: {
      el: 'Demo concept: πάρτε νούμερο από το κινητό και περιμένετε όπου θέλετε.',
      en: 'Demo concept: take a number on your phone and wait wherever you like.',
    },
    context: {
      el: 'Για φαρμακεία, γραφεία και ταμεία όπου οι άνθρωποι στέκονται στην ουρά μόνο για να κρατήσουν σειρά.',
      en: 'For pharmacies, offices and service counters where people stand in a line only to hold their place.',
    },
    problem: {
      el: 'Οι πελάτες συγκεντρώνονται στο ταμείο επειδή δεν ξέρουν πόση ώρα θα περιμένουν.',
      en: 'Customers crowd the counter because they cannot tell how long the wait is.',
    },
    solution: {
      el: [
        'Σελίδα πελάτη με το νούμερο, πόσοι είναι μπροστά και εκτίμηση αναμονής που μαθαίνει από τους πραγματικούς χρόνους εξυπηρέτησης.',
        'Οθόνη καταστήματος με «Επόμενος», κουμπί «Δεν ήρθε», λίστα αναμονής και QR για εκτύπωση.',
        'Ειδοποίηση όταν μένουν δύο ή λιγότεροι μπροστά, και κουμπί αποχώρησης.',
        'Τα tabs μένουν συγχρονισμένα με BroadcastChannel, ώστε να δοκιμάσετε ταυτόχρονα πελάτη και κατάστημα.',
      ],
      en: [
        'A customer page with the number, how many are ahead and an estimated wait learned from real service times.',
        'A shop screen with Next, a no-show button, the waiting list and a QR code to print.',
        'A notice when two or fewer people are ahead, and a Leave button.',
        'Several tabs stay in sync through a BroadcastChannel, so you can try it as customer and shop at once.',
      ],
    },
    result: {
      el: [
        'Λειτουργικό demo: ανοίξτε το κατάστημα σε δεύτερο tab, πατήστε «Επόμενος» και δείτε το νούμερό σας να ενημερώνεται.',
        'Η αρίθμηση, η σειρά κλήσης, οι απουσίες, οι εκτιμήσεις και ο κανόνας ειδοποίησης καλύπτονται από 16 αυτόματα tests.',
        'Ο συγχρονισμός δουλεύει ανάμεσα σε tabs του ίδιου browser. Σε πραγματικό έργο χρειάζεται server ώστε τα κινητά και το ταμείο να μοιράζονται μία σειρά.',
      ],
      en: [
        'A working demo: open the shop in a second tab, press Next and watch your number update.',
        'The numbering, calling order, no-shows, estimates and notification rule are covered by 16 automated tests.',
        'Sync works between tabs of one browser. A real build needs a server so that phones and the counter share one queue.',
      ],
    },
    forYourBusiness: {
      el: 'Αν οι πελάτες σας περιμένουν στο ταμείο, μπορούν να περιμένουν έξω ή στο αυτοκίνητο και να γυρίσουν όταν έρθει η σειρά τους.',
      en: 'If customers queue at your counter, this lets them wait outside or in the car and come back when it is their turn.',
    },
    stack: ['Vue 3', 'TypeScript', 'QR code', 'Vitest'],
    imageUrl: '/noumero-queue-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/NoumeroProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'peripatos-walk-demo',
    projectId: 16,
    kind: 'demo',
    title: 'Περίπατος, demo αυτοξενάγησης',
    tagline: {
      el: 'Demo concept: περπατήστε την πόλη στάση προς στάση, ακόμα και χωρίς σήμα.',
      en: 'Demo concept: walk the town stop by stop, even without a signal.',
    },
    context: {
      el: 'Για δήμους, μουσεία και ξεναγούς που θέλουν ο επισκέπτης να ακολουθεί διαδρομή από το δικό του κινητό, χωρίς εφαρμογή ή δεδομένα περιαγωγής. Τα κείμενα και οι συντεταγμένες των στάσεων στο demo είναι ενδεικτικά.',
      en: 'For municipalities, museums and tour guides who want a visitor to follow a route on their own phone without an app or roaming data. Stop texts and coordinates in the demo are placeholders.',
    },
    problem: {
      el: 'Οι χάρτες χάνονται, οι εφαρμογές θέλουν εγκατάσταση και σύνδεση, και οι επισκέπτες δεν έχουν σήμα στα στενά.',
      en: 'Paper maps get lost, apps need an install and a connection, and visitors have no signal in narrow streets.',
    },
    solution: {
      el: [
        'Σχηματικός χάρτης με αριθμημένες στάσεις, χρόνους περπατήματος και συνολική διάρκεια.',
        'Προβολή βήμα-βήμα με την τρέχουσα και την επόμενη στάση και πρόοδο που θυμάται.',
        'Προαιρετική τοποθεσία, μόνο όταν τη ζητήσετε: απόσταση και κατεύθυνση προς τη στάση, και μήνυμα άφιξης.',
        'Ένα πάτημα για να αποθηκευτεί όλη η διαδρομή για χρήση χωρίς δίκτυο με service worker.',
      ],
      en: [
        'A schematic map with numbered stops, walking times and the total length of the route.',
        'A step-by-step view with the current stop, the next one and your progress remembered.',
        'Optional location, only on request: distance and compass direction to the stop, and an arrival message.',
        'One tap to save the whole walk for offline use with a service worker.',
      ],
    },
    result: {
      el: [
        'Λειτουργικό demo που ξανανοίγει με κλειστό δίκτυο αφού αποθηκευτεί.',
        'Η απόσταση, η κατεύθυνση, ο χρόνος περπατήματος, η ανίχνευση άφιξης και η προβολή του χάρτη καλύπτονται από 11 αυτόματα tests.',
        'Η τοποθεσία δεν αποθηκεύεται ούτε στέλνεται πουθενά. Τα κείμενα και οι συντεταγμένες πρέπει να αντικατασταθούν με ελεγμένο τοπικό περιεχόμενο πριν από πραγματική χρήση.',
      ],
      en: [
        'A working demo that reopens with the network switched off after saving it.',
        'Distance, bearing, walking time, arrival detection and the map projection are covered by 11 automated tests.',
        'Location is never stored or sent anywhere. Texts and coordinates must be replaced with checked local content before real use.',
      ],
    },
    forYourBusiness: {
      el: 'Αν έχετε μουσείο, διαδρομή ή μονοπάτι, βάζει τη διαδρομή στο κινητό του επισκέπτη χωρίς εφαρμογή και χωρίς δεδομένα.',
      en: 'If you run a museum, a guided route or a trail, this puts the route on the visitor\'s phone with no app and no data plan.',
    },
    stack: ['Vue 3', 'TypeScript', 'Service Worker', 'Vitest'],
    imageUrl: '/peripatos-walk-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/PeripatosProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'ktima-seating-planner-demo',
    projectId: 17,
    kind: 'demo',
    title: 'Κτήμα Δάφνη, demo σχεδιασμού διάταξης αίθουσας',
    tagline: {
      el: 'Demo concept: σχεδιάστε την αίθουσα τραπέζι το τραπέζι και στείλτε την τελική λίστα.',
      en: 'Demo concept: plan the room table by table and send the final list.',
    },
    context: {
      el: 'Για χώρους γάμων και εκδηλώσεων που ανταλλάσσουν διατάξεις με email και υπολογιστικά φύλλα μέχρι την τελευταία μέρα.',
      en: 'For wedding and event venues that exchange seating plans by email and spreadsheet until the last day.',
    },
    problem: {
      el: 'Το κτήμα χρειάζεται τελική, συνεπή λίστα, αλλά το σχέδιο αλλάζει συνέχεια και κανείς δεν προσέχει ένα τραπέζι με εννέα άτομα για οκτώ θέσεις.',
      en: 'The venue needs a final, consistent list, but the plan keeps changing and nobody notices a table with nine people for eight seats.',
    },
    solution: {
      el: [
        'Κάτοψη με οκτώ τραπέζια και κουκκίδες θέσεων που γεμίζουν καθώς τοποθετούνται οι καλεσμένοι.',
        'Μεταφορά με σύρσιμο, ή επιλογή καλεσμένου και κλικ σε τραπέζι, που δουλεύει και με πληκτρολόγιο.',
        'Προειδοποιήσεις για υπερπλήρη τραπέζια με κοντινά τραπέζια που έχουν χώρο, καλεσμένους χωρίς τραπέζι και χωρισμένες ομάδες.',
        'Αυτόματη τοποθέτηση που κρατά τις ομάδες μαζί, και εξαγωγή CSV ή κειμένου προστατευμένη από τύπους υπολογιστικών φύλλων.',
      ],
      en: [
        'A floor plan with eight tables and seat dots that fill as guests are placed.',
        'Drag and drop, or select a guest and click a table, which also works with the keyboard.',
        'Warnings for overfull tables with nearby tables that have room, unseated guests and split groups.',
        'Auto-seating that keeps groups together, and a CSV or text export protected against spreadsheet formulas.',
      ],
    },
    result: {
      el: [
        'Λειτουργικός σχεδιαστής: διορθώστε το υπερπλήρες τραπέζι, τοποθετήστε όλους και ξεκλειδώνει η λήψη.',
        'Οι έλεγχοι χωρητικότητας, οι εναλλακτικές, η αυτόματη τοποθέτηση, η λίστα καλεσμένων και οι εξαγωγές καλύπτονται από 14 αυτόματα tests.',
        'Τα ονόματα και οι αριθμοί είναι ενδεικτικά. Η αποστολή στο κτήμα είναι λήψη αρχείου στο demo, όχι email.',
      ],
      en: [
        'A working planner: fix the overfull table, seat everyone, and the download unlocks.',
        'The capacity checks, alternatives, auto-seating, guest list and exports are covered by 14 automated tests.',
        'Names and numbers are illustrative. Sending to the venue is a file download in the demo, not an email.',
      ],
    },
    forYourBusiness: {
      el: 'Αν φιλοξενείτε εκδηλώσεις, σας δίνει μία καθαρή, τελική λίστα αντί για δέκα εκδόσεις στο email.',
      en: 'If you host events, this gets you one clean, final seating list instead of ten versions in your inbox.',
    },
    stack: ['Vue 3', 'TypeScript', 'SVG', 'Vitest'],
    imageUrl: '/ktima-seating-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/KtimaProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'karpos-olive-oil-passport-demo',
    projectId: 18,
    kind: 'demo',
    title: 'Καρπός, demo ταυτότητας παρτίδας ελαιολάδου',
    tagline: {
      el: 'Demo concept: ξέρετε από πού έρχεται κάθε σταγόνα.',
      en: 'Demo concept: know where every drop comes from.',
    },
    context: {
      el: 'Για μικρούς παραγωγούς ελαιολάδου που θέλουν να δείξουν προέλευση και ποιότητα χωρίς να φτιάξουν site με βάση δεδομένων.',
      en: 'For small olive oil producers who want to show provenance and quality without building a website with a database.',
    },
    problem: {
      el: 'Το καλό λάδι πουλιέται με εμπιστοσύνη, αλλά η ετικέτα λέει λίγα και το έντυπο πιστοποιητικό δεν φτάνει ποτέ στον αγοραστή.',
      en: 'Good oil sells on trust, but the label says little and a printed certificate never reaches the shopper.',
    },
    solution: {
      el: [
        'Φόρμα παραγωγού με ημερομηνίες, κιλά ελιάς, θερμοκρασία πίεσης και τιμές εργαστηρίου.',
        'Η κατηγορία υπολογίζεται από τους αριθμούς (οξύτητα και υπεροξείδια) και την ένδειξη ψυχρής έκθλιψης.',
        'QR του οποίου ο σύνδεσμος κουβαλά όλη την παρτίδα με άθροισμα ελέγχου, άρα δεν υπάρχει server ή λογαριασμός.',
        'Σελίδα πελάτη με τη διαδρομή ως χρονολόγιο, και καθαρό μήνυμα αν ο σύνδεσμος είναι κατεστραμμένος.',
      ],
      en: [
        'A producer form with dates, olive weight, press temperature and lab values.',
        'The category computed from the numbers (acidity and peroxides) and the cold-extraction flag.',
        'A QR code whose link carries the whole batch with a checksum, so there is no server or account.',
        'A customer page with the journey as a timeline, and a clear message if the link is damaged.',
      ],
    },
    result: {
      el: [
        'Λειτουργική ροή από τον παραγωγό στον πελάτη: συμπληρώστε τη φόρμα, πάρτε το QR, ανοίξτε τη σελίδα παρτίδας.',
        'Τα όρια κατηγορίας, οι κανόνες ημερομηνιών, οι έλεγχοι και η κωδικοποίηση με ανίχνευση αλλοίωσης καλύπτονται από 13 αυτόματα tests.',
        'Οι τιμές εργαστηρίου στο demo είναι ενδεικτικές. Η αλλαγή παρτίδας σημαίνει νέο κωδικό, κάτι που ένα πραγματικό έργο θα απέφευγε με βάση δεδομένων.',
      ],
      en: [
        'A working producer-to-customer flow: fill the form, get the QR, open the batch page.',
        'The category thresholds, date rules, validation and the encode/decode with tamper detection are covered by 13 automated tests.',
        'Lab values in the demo are illustrative. Editing a batch means issuing a new code, which a real build would avoid with a database.',
      ],
    },
    forYourBusiness: {
      el: 'Αν παράγετε λάδι, κρασί, μέλι ή τυρί, αφήνει κάθε μπουκάλι να πει τη δική του ιστορία από ένα QR.',
      en: 'If you produce oil, wine, honey or cheese, this lets every bottle tell its own story from a single QR code.',
    },
    stack: ['Vue 3', 'TypeScript', 'QR code', 'Vitest'],
    imageUrl: '/karpos-olive-oil-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/KarposProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'ena-ical-calendar-demo',
    projectId: 19,
    kind: 'demo',
    title: 'ΕΝΑ, demo ενιαίου ημερολογίου κρατήσεων',
    tagline: {
      el: 'Demo concept: ένα ημερολόγιο, καμία διπλοκράτηση.',
      en: 'Demo concept: one calendar, no double bookings.',
    },
    context: {
      el: 'Για ιδιοκτήτες δωματίων και βιλών που αναρτούν σε πολλές πλατφόρμες και συγχρονίζουν ημερολόγια με το χέρι.',
      en: 'For owners of rooms and villas who list on several platforms and keep several calendars in sync by hand.',
    },
    problem: {
      el: 'Δύο πλατφόρμες μπορούν να πουλήσουν τις ίδιες διανυκτερεύσεις και ο ιδιοκτήτης το μαθαίνει όταν φτάνουν δύο επισκέπτες.',
      en: 'Two platforms can sell the same nights, and the owner finds out when two guests arrive.',
    },
    solution: {
      el: [
        'Αναγνώστης iCal που ενώνει διπλωμένες γραμμές, διαβάζει ημερομηνίες και ώρες και αγνοεί ακυρωμένα γεγονότα με προειδοποίηση για τα χαλασμένα.',
        'Μηνιαίο χρονολόγιο ανά κατάλυμα, με κάθε κανάλι σε δικό του χρώμα και τις επικαλύψεις σε κόκκινο.',
        'Επιτρέπεται αναχώρηση και άφιξη την ίδια μέρα, και οι τριπλές συγκρούσεις αναφέρονται ανά ζεύγος.',
        'Οι άμεσες κρατήσεις ελέγχονται με το ενιαίο ημερολόγιο και το εξαγόμενο .ics διαβάζεται πίσω ίδιο.',
      ],
      en: [
        'An iCal reader that unfolds lines, handles date and date-time values and skips cancelled events with a warning for broken ones.',
        'A month timeline per property, with each channel in its own colour and overlaps hatched in red.',
        'Same-day check-out and check-in allowed, three-way collisions reported pair by pair.',
        'Direct bookings checked against the merged calendar, and an exported .ics that parses back identically.',
      ],
    },
    result: {
      el: [
        'Λειτουργικό demo: αλλάξτε το κείμενο iCal ενός καναλιού, προσθέστε άμεση κράτηση και δείτε την προειδοποίηση να εμφανίζεται ή να φεύγει.',
        'Η ανάγνωση, ο εντοπισμός επικαλύψεων, η αφαίρεση διπλοτύπων, η εξαγωγή και οι έλεγχοι κρατήσεων καλύπτονται από 15 αυτόματα tests.',
        'Στο demo το κείμενο iCal επικολλάται. Σε πραγματικό έργο οι ροές διαβάζονται περιοδικά από server.',
      ],
      en: [
        'A working demo: edit a channel\'s iCal text, add a direct booking and watch the overlap warning appear or clear.',
        'The parsing, overlap detection, de-duplication, export round-trip and booking validation are covered by 15 automated tests.',
        'In the demo the iCal text is pasted in. A real build fetches the feeds on a schedule from a server.',
      ],
    },
    forYourBusiness: {
      el: 'Αν αναρτάτε το ίδιο δωμάτιο σε περισσότερα από ένα site, είναι η δικλίδα που εμποδίζει δύο επισκέπτες να κλείσουν τις ίδιες νύχτες.',
      en: 'If you list the same room on more than one site, this is the safety net that stops two guests booking the same nights.',
    },
    stack: ['Vue 3', 'TypeScript', 'iCalendar', 'Vitest'],
    imageUrl: '/ena-calendar-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/EnaProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'diafaneia-site-audit-demo',
    projectId: 20,
    kind: 'demo',
    title: 'Διαφάνεια, demo αναφοράς ελέγχου ιστοσελίδας',
    tagline: {
      el: 'Demo concept: τι κάνει πραγματικά η σελίδα σας;',
      en: 'Demo concept: what does your website really do?',
    },
    context: {
      el: 'Ένα εργαλείο που χρησιμοποιώ ως ελεύθερος επαγγελματίας για να ξεκινήσω συζήτηση με έναν ιδιοκτήτη επιχείρησης για απόρρητο και ασφάλεια, σε γλώσσα που καταλαβαίνει.',
      en: 'A tool I use as a freelancer to start a conversation with a business owner about privacy and security in language they understand.',
    },
    problem: {
      el: 'Οι περισσότερες μικρές σελίδες φορτώνουν γραμματοσειρές, στατιστικά και βίντεο από άλλες εταιρείες χωρίς να το ξέρει ο ιδιοκτήτης, και δεν έχουν βασικές προστασίες.',
      en: 'Most small sites load fonts, analytics and videos from other companies without the owner knowing, and miss basic protections.',
    },
    solution: {
      el: [
        'Σαρωτής που διαβάζει τον κώδικα ως κείμενο, βρίσκει hosts τρίτων, ακόμα και εργαλεία που ξεκινούν από inline κώδικα, και αγνοεί tags σε σχόλια.',
        'Ευρήματα σε κατηγορίες προσοχής, ανάγκης συναίνεσης ή βελτίωσης, καθένα με απλή λύση.',
        'Έλεγχος κεφαλίδων ασφαλείας, σημαιών cookies, μικτού περιεχομένου, περιγραφής, γλώσσας, alt εικόνων και τίτλων.',
        'Διαφανής βαθμολογία με όριο ανά βαρύτητα, και προβολή εκτύπωσης για αποθήκευση ως PDF.',
      ],
      en: [
        'A scanner that reads the markup as text, finds third-party hosts, even trackers started from inline code, and ignores commented-out tags.',
        'Findings ranked as attention, consent needed or improvement, each with a plain fix.',
        'Security headers, cookie flags, mixed content, missing description, language, alt text and headings checked.',
        'A transparent score with a cap per severity, and a print view for saving as PDF.',
      ],
    },
    result: {
      el: [
        'Λειτουργικό demo με δείγμα σελίδας: αλλάξτε τον κώδικα που επικολλάτε και δείτε την αναφορά να αλλάζει.',
        'Η σάρωση, η αναγνώριση hosts, οι κεφαλίδες, τα cookies και η βαθμολογία καλύπτονται από 19 αυτόματα tests.',
        'Τα cookies εκτιμώνται από τα εργαλεία που βρέθηκαν, δεν μετριούνται, και η αναφορά το λέει. Μια πραγματική υπηρεσία θα διάβαζε τη σελίδα από server, κάτι που ο browser δεν μπορεί για ξένα site.',
      ],
      en: [
        'A working demo with a sample site: change the pasted code and watch the report change.',
        'The scanning, host matching, headers, cookies and scoring are covered by 19 automated tests.',
        'Cookies are estimated from the tools found, not measured, and the report says so. A real service would fetch the page from a server, which a browser cannot do for other sites.',
      ],
    },
    forYourBusiness: {
      el: 'Αν θέλετε να μάθετε τι στέλνει η δική σας σελίδα σε τρίτους και τι της λείπει, αυτή είναι η απάντηση πρώτης σελίδας.',
      en: 'If you want to know what your own website sends to third parties and what it is missing, this is the first-page answer.',
    },
    stack: ['Vue 3', 'TypeScript', 'Vitest'],
    imageUrl: '/diafaneia-audit-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/DiafaneiaProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'deltio-greek-id-validation-demo',
    projectId: 21,
    kind: 'demo',
    title: 'Δελτίο, demo βιβλιοθήκης ελέγχου ελληνικών στοιχείων',
    tagline: {
      el: 'Demo concept: έλεγχος ελληνικών στοιχείων χωρίς να στέλνονται πουθενά.',
      en: 'Demo concept: check Greek identifiers without sending them anywhere.',
    },
    context: {
      el: 'Ένα επαναχρησιμοποιήσιμο κομμάτι που ήθελα για φόρμες: να πιάνεται ένα λάθος ΑΦΜ πριν την υποβολή, χωρίς κλήση σε server και χωρίς καταγραφή προσωπικών δεδομένων.',
      en: 'A reusable piece I wanted for forms: catching a mistyped tax number before submit, without calling a server or logging personal data.',
    },
    problem: {
      el: 'Τα λάθη σε ΑΦΜ ή ΙΒΑΝ προκαλούν απορριφθείσες φόρμες και αποτυχημένες πληρωμές, και η αποστολή τους σε τρίτο εργαλείο ελέγχου είναι κίνδυνος για το απόρρητο.',
      en: 'Typos in a tax number or IBAN cause rejected forms and failed payments, and sending them to a third-party checker is a privacy risk.',
    },
    solution: {
      el: [
        'Καθαρές συναρτήσεις για ΑΦΜ (mod 11), ΑΜΚΑ (ημερομηνία και Luhn), ΙΒΑΝ (mod 97), κινητό και ΤΚ.',
        'Κάθε έλεγχος εξηγεί γιατί απέτυχε και ποιο ψηφίο ελέγχου περίμενε.',
        'Playground με σωστούς και χαλασμένους αριθμούς και εξηγημένο αποτέλεσμα.',
        'Χωρίς εξαρτήσεις και χωρίς αποθήκευση, άρα τρέχει σε Node και στον browser.',
      ],
      en: [
        'Pure functions for the tax number (mod 11), social security number (date and Luhn), IBAN (mod 97), mobile and postcode.',
        'Each check explains why it failed and which check digit it expected.',
        'A playground with sample and broken numbers and an explained verdict.',
        'No dependencies and nothing stored, so it runs in Node and in the browser.',
      ],
    },
    result: {
      el: [
        'Λειτουργικό playground και βιβλιοθήκη έτοιμη να δημοσιευτεί ως πακέτο.',
        'Οι έλεγχοι, οι οριακές περιπτώσεις (μηδενικά, δίσεκτα έτη, κενά, άλλες χώρες) και οι λεπτομέρειες σφαλμάτων καλύπτονται από 16 αυτόματα tests.',
        'Ελέγχει μόνο τη μορφή και το ψηφίο ελέγχου. Δεν μπορεί να πει αν ένας αριθμός ανήκει σε πραγματικό πρόσωπο, και η σελίδα το λέει.',
      ],
      en: [
        'A working playground and a library that is ready to publish as a package.',
        'The checks, edge cases (zeros, leap years, spacing, other countries) and error details are covered by 16 automated tests.',
        'It validates the shape and check digit only. It cannot tell whether a number belongs to a real person, and the page says so.',
      ],
    },
    forYourBusiness: {
      el: 'Αν οι φόρμες σας ζητούν ΑΦΜ ή ΙΒΑΝ, πιάνει τα λάθη αμέσως και κρατά τα δεδομένα του πελάτη στη συσκευή του.',
      en: 'If your forms ask for tax numbers or IBANs, this catches typos instantly and keeps customer data on the customer\'s device.',
    },
    stack: ['TypeScript', 'Vue 3', 'Vitest'],
    imageUrl: '/deltio-validation-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/DeltioProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
  {
    slug: 'slotlock-booking-api-demo',
    projectId: 22,
    kind: 'demo',
    title: 'Slotlock, demo API κρατήσεων χωρίς διπλοκράτηση',
    tagline: {
      el: 'Demo concept: δύο άνθρωποι πατούν «Κράτηση» ταυτόχρονα και κερδίζει ακριβώς ένας.',
      en: 'Demo concept: two people press Book at once, and exactly one wins.',
    },
    context: {
      el: 'Το μοναδικό backend project αυτής της σειράς: δείχνει πώς χειρίζομαι το δυσκολότερο κομμάτι κάθε συστήματος κρατήσεων, τα ταυτόχρονα αιτήματα, με πραγματικό server και βάση.',
      en: 'The one backend project in this set: it shows how I handle the hardest part of any booking system, concurrent requests, with a real server and database.',
    },
    problem: {
      el: 'Ο έλεγχος διαθεσιμότητας και μετά η αποθήκευση δεν είναι ασφαλής: δύο αιτήματα μπορούν να περάσουν και τα δύο τον έλεγχο πριν αποθηκεύσει κανένα.',
      en: 'Checking availability and then saving is not safe: two requests can both pass the check before either one saves.',
    },
    solution: {
      el: [
        'Κάθε κράτηση γράφει μία γραμμή ανά 30λεπτο στην ίδια συναλλαγή, με δωμάτιο και ώρα ως πρωτεύον κλειδί, άρα η βάση αρνείται κάθε επικάλυψη.',
        'Απάντηση 409 με καθαρό μήνυμα και εναλλακτικές: επόμενες ώρες στο δωμάτιο και η ίδια ώρα σε ελεύθερα δωμάτια.',
        'Idempotency-Key ώστε ένα αίτημα που ξαναστέλνεται να επιστρέφει την ίδια κράτηση και όχι δεύτερη.',
        'CORS περιορισμένο στο site, όριο αιτημάτων, πλαφόν αποθηκευμένων κρατήσεων και αυτόματος καθαρισμός παλιών.',
      ],
      en: [
        'Each booking writes one row per 30-minute slot in the same transaction, with the room and slot as a primary key, so the database refuses an overlap.',
        'A 409 answer with a clear message and alternatives: later windows in the room and the same time in free rooms.',
        'An Idempotency-Key so a retried request returns the same booking instead of a second one.',
        'CORS limited to the site, a rate limit, a cap on stored bookings and automatic clean-up of past ones.',
      ],
    },
    result: {
      el: [
        'Live στο Render με PostgreSQL στη Neon. Έστειλα 25 ταυτόχρονα αιτήματα για την ίδια ώρα: ένα πήρε 201 και 24 πήραν 409, και η βάση έχει μία κράτηση.',
        'Ο server καλύπτεται από 19 αυτόματα tests, μεταξύ άλλων με ταυτόχρονα αιτήματα, και η σελίδα από 7 ακόμα. Η σελίδα τρέχει τους ίδιους κανόνες στον browser ή καλεί τον πραγματικό server.',
        'Το δωρεάν πακέτο κοιμάται όταν δεν χρησιμοποιείται, οπότε το πρώτο αίτημα μπορεί να πάρει έως ~50 δευτερόλεπτα. Οι κρατήσεις demo έχουν ονόματα-σύμβολα και καθαρίζονται.',
      ],
      en: [
        'Live on Render with PostgreSQL on Neon. I sent 25 simultaneous requests for the same slot: one got 201 and 24 got 409, and the database holds one booking.',
        'The server is covered by 19 automated tests, including concurrent requests, and the page by 7 more. The page can run the same rules in the browser or call the real server.',
        'The free tier sleeps when idle, so the first request can take up to about 50 seconds. Demo bookings use placeholder names and are cleaned up.',
      ],
    },
    forYourBusiness: {
      el: 'Αν η επιχείρησή σας δέχεται κρατήσεις online, αυτή είναι η εγγύηση ότι δύο πελάτες δεν παίρνουν ποτέ την ίδια ώρα.',
      en: 'If your business takes bookings online, this is the guarantee that two customers never get the same time slot.',
    },
    stack: ['Node.js', 'Express', 'TypeScript', 'Sequelize', 'PostgreSQL', 'Vue 3', 'Vitest'],
    imageUrl: '/slotlock-api-preview.webp',
    liveUrl: 'https://varveroglouvasileios.github.io/SlotlockProject/',
    liveLabel: { el: 'Δοκιμάστε το demo', en: 'Try the demo' },
  },
]

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug)
