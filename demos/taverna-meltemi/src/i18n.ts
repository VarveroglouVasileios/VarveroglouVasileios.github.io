import { createI18n } from 'vue-i18n'

export const messages = {
  el: {
    demo: 'Demo concept · Φανταστική επιχείρηση',
    nav: { label: 'Κύρια πλοήγηση', home: 'Αρχική', menu: 'Μενού', book: 'Κράτηση', admin: 'Διαχείριση', language: 'Switch to English', skip: 'Μετάβαση στο περιεχόμενο' },
    home: {
      location: 'Καβάλα, δίπλα στο κύμα', title: 'Τραπέζι με θέα στη θάλασσα.',
      intro: 'Σπιτικά μαγειρευτά, ψάρι στη σχάρα και κρασί από τον τόπο μας. Από την οικογένειά μας, στο τραπέζι σας.',
      find: 'Βρες τραπέζι', hoursLabel: 'Ώρες λειτουργίας', hours: 'Καθημερινά 13:00–23:30',
      addressLabel: 'Διεύθυνση', address: 'Ακτή Μελτεμιού 14, Καβάλα (ενδεικτική διεύθυνση)',
      signature: 'Από την κουζίνα μας', fullMenu: 'Δες όλο το μενού', info: 'Ώρες και διεύθυνση',
    },
    menu: {
      title: 'Το μενού μας', intro: 'Μικρά πιάτα για τη μέση, φαγητό στα κάρβουνα και μαγειρευτά όπως στο σπίτι.',
      filters: 'Διατροφικές επιλογές', categories: 'Κατηγορίες μενού', empty: 'Δεν βρέθηκαν πιάτα με αυτά τα φίλτρα.',
      clear: 'Καθαρισμός φίλτρων', allergens: 'Για αλλεργίες και δυσανεξίες, ενημερώστε το προσωπικό πριν παραγγείλετε. Η κουζίνα χειρίζεται αλλεργιογόνα και υπάρχει πιθανότητα διασταυρούμενης επαφής.',
      category: { starters: 'Ορεκτικά', salads: 'Σαλάτες', grill: 'Ψητά', fish: 'Ψάρια', cooked: 'Μαγειρευτά', desserts: 'Επιδόρπια', drinks: 'Ποτά' },
      diet: { vegetarian: 'Vegetarian', fasting: 'Νηστίσιμο', glutenFree: 'Χωρίς γλουτένη' },
    },
    book: {
      title: 'Κράτηση τραπεζιού', intro: 'Διάλεξε ημερομηνία και ώρα. Το τραπέζι κρατείται για 90 λεπτά.',
      date: 'Ημερομηνία', party: 'Άτομα', time: 'Διαθέσιμες ώρες', hours: 'Ώρα Καβάλας', more: 'Πάνω από 10 άτομα',
      noTimes: 'Δεν υπάρχουν διαθέσιμες ώρες. Δοκίμασε άλλη ημερομηνία ή μικρότερη παρέα.',
      details: 'Στοιχεία κράτησης', name: 'Ονοματεπώνυμο', phone: 'Κινητό τηλέφωνο', email: 'Email (προαιρετικό)', notes: 'Σχόλια (προαιρετικά)',
      phoneHint: 'Ελληνικό κινητό, π.χ. 6912345678 ή +30 6912345678.',
      submit: 'Επιβεβαίωση κράτησης', busy: 'Έλεγχος διαθεσιμότητας…',
    },
    error: {
      date: 'Επίλεξε έγκυρη ημερομηνία.', past: 'Επίλεξε ημερομηνία και ώρα που δεν έχουν περάσει.',
      largeParty: 'Για παρέες άνω των 10 ατόμων, καλέστε μας.', party: 'Επίλεξε από 1 έως 10 άτομα.',
      time: 'Επίλεξε μία από τις διαθέσιμες ώρες.', soldOut: 'Η ώρα μόλις γέμισε. Επίλεξε άλλη διαθέσιμη ώρα.',
      name: 'Συμπλήρωσε το ονοματεπώνυμό σου.', phone: 'Συμπλήρωσε έγκυρο ελληνικό κινητό με 10 ψηφία που αρχίζει από 69.',
      email: 'Συμπλήρωσε έγκυρο email ή άφησε το πεδίο κενό.',
    },
    confirmation: {
      title: 'Το τραπέζι σου κρατήθηκε', reference: 'Κωδικός κράτησης',
      preview: 'Προεπισκόπηση μηνύματος', previewHint: 'Ενδεικτικό μήνυμα του demo.',
      message: 'Γεια σου {name}, σε περιμένουμε στο Taverna Meltemi στις {date}, ώρα {time}, για {party} άτομα. Ο κωδικός κράτησής σου είναι {ref}.',
      missing: 'Η κράτηση δεν βρέθηκε σε αυτόν τον browser.', cancelled: 'Η κράτηση ακυρώθηκε', back: 'Πίσω στην αρχική',
    },
    admin: {
      title: 'Διαχείριση κρατήσεων', password: 'Κωδικός πρόσβασης', hint: 'Κωδικός demo: demo', enter: 'Είσοδος', logout: 'Έξοδος',
      wrong: 'Ο κωδικός δεν είναι σωστός.', today: 'Κρατήσεις ημέρας', empty: 'Δεν υπάρχουν κρατήσεις για αυτήν την ημέρα.',
      week: 'Πληρότητα επτά ημερών', peakHint: 'Μέγιστος αριθμός ταυτόχρονα κατειλημμένων θέσεων ανά ημέρα.',
      date: 'Ημερομηνία', peak: 'Θέσεις αιχμής', occupancy: 'Πληρότητα', statusLabel: 'Κατάσταση',
      status: { confirmed: 'Επιβεβαιωμένη', seated: 'Κάθισε', cancelled: 'Ακυρωμένη' },
      seated: 'Κάθισε', cancel: 'Ακύρωση', reset: 'Επαναφορά demo', resetAsk: 'Να επανέλθουν οι αρχικές δοκιμαστικές κρατήσεις;',
      updated: 'Η κατάσταση ενημερώθηκε.', restored: 'Τα δεδομένα του demo επανήλθαν.', actions: 'Ενέργειες',
    },
  },
  en: {
    demo: 'Demo concept · Fictional business',
    nav: { label: 'Main navigation', home: 'Home', menu: 'Menu', book: 'Book a table', admin: 'Admin', language: 'Αλλαγή σε Ελληνικά', skip: 'Skip to content' },
    home: {
      location: 'Kavala, by the water', title: 'A table by the sea.',
      intro: 'Home cooking, fish from the grill and local wine. From our family to your table.',
      find: 'Find a table', hoursLabel: 'Opening hours', hours: 'Daily 13:00–23:30',
      addressLabel: 'Address', address: '14 Meltemi Waterfront, Kavala (fictional address)',
      signature: 'From our kitchen', fullMenu: 'See the full menu', info: 'Hours and address',
    },
    menu: {
      title: 'Our menu', intro: 'Small plates to share, food from the charcoal grill and slow-cooked favourites.',
      filters: 'Dietary filters', categories: 'Menu categories', empty: 'No dishes match these filters.',
      clear: 'Clear filters', allergens: 'Tell our staff about any allergies or intolerances before ordering. Our kitchen handles allergens and cross-contact is possible.',
      category: { starters: 'Starters', salads: 'Salads', grill: 'Grill', fish: 'Fish', cooked: 'Slow-cooked dishes', desserts: 'Desserts', drinks: 'Drinks' },
      diet: { vegetarian: 'Vegetarian', fasting: 'Lenten', glutenFree: 'Gluten-free' },
    },
    book: {
      title: 'Book a table', intro: 'Choose your date and time. We hold the table for 90 minutes.',
      date: 'Date', party: 'Guests', time: 'Available times', hours: 'Kavala time', more: 'More than 10 guests',
      noTimes: 'No times available. Try another date or a smaller party.',
      details: 'Booking details', name: 'Full name', phone: 'Mobile phone', email: 'Email (optional)', notes: 'Notes (optional)',
      phoneHint: 'Greek mobile, e.g. 6912345678 or +30 6912345678.',
      submit: 'Confirm booking', busy: 'Checking availability…',
    },
    error: {
      date: 'Choose a valid date.', past: 'Choose a date and time in the future.',
      largeParty: 'For parties of more than 10, please call us.', party: 'Choose between 1 and 10 guests.',
      time: 'Choose one of the available times.', soldOut: 'This time has just filled up. Choose another available time.',
      name: 'Enter your full name.', phone: 'Enter a valid 10-digit Greek mobile number starting with 69.',
      email: 'Enter a valid email address or leave this field empty.',
    },
    confirmation: {
      title: 'Your table is booked', reference: 'Booking reference',
      preview: 'Message preview', previewHint: 'Example message for this demo.',
      message: 'Hi {name}, we’ll see you at Taverna Meltemi on {date} at {time} for {party} guests. Your booking reference is {ref}.',
      missing: 'We couldn’t find this booking in this browser.', cancelled: 'This booking was cancelled', back: 'Back to home',
    },
    admin: {
      title: 'Booking admin', password: 'Password', hint: 'Demo password: demo', enter: 'Sign in', logout: 'Sign out',
      wrong: 'That password is incorrect.', today: 'Daily reservations', empty: 'There are no reservations for this date.',
      week: 'Seven-day occupancy', peakHint: 'Highest number of seats occupied at the same time each day.',
      date: 'Date', peak: 'Peak seats', occupancy: 'Occupancy', statusLabel: 'Status',
      status: { confirmed: 'Confirmed', seated: 'Seated', cancelled: 'Cancelled' },
      seated: 'Mark seated', cancel: 'Cancel', reset: 'Reset demo data', resetAsk: 'Restore the original demo reservations?',
      updated: 'Booking status updated.', restored: 'Demo data restored.', actions: 'Actions',
    },
  },
}

function savedLocale() {
  try { return localStorage.getItem('taverna-meltemi-locale') === 'en' ? 'en' : 'el' }
  catch { return 'el' }
}

export const i18n = createI18n({ legacy: false, locale: savedLocale(), fallbackLocale: 'el', messages })

export function setLocale(locale: 'el' | 'en') {
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
  try { localStorage.setItem('taverna-meltemi-locale', locale) }
  catch { /* Language still changes for this page. */ }
}
