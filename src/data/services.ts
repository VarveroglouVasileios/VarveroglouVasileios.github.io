import type { L10n, L10nList } from '@/lib/l10n'

export type ServiceId = 'website' | 'eshop' | 'booking' | 'internal' | 'maintenance' | 'security'

export interface ServicePackage {
  id: ServiceId
  title: L10n
  summary: L10n
  idealFor: L10n
  includes: L10nList
  /**
   * Indicative starting price in EUR. `null` renders "Κατόπιν προσφοράς".
   * TODO(owner): fill in real "from" prices before launch.
   */
  priceFrom: number | null
  /** Optional dedicated page (route name). */
  page?: 'security-audit'
}

export const services: ServicePackage[] = [
  {
    id: 'website',
    title: { el: 'Εταιρική ιστοσελίδα', en: 'Business website' },
    summary: {
      el: 'Γρήγορη, ασφαλής και φιλική στο κινητό ιστοσελίδα που παρουσιάζει την επιχείρησή σας και φέρνει επικοινωνία.',
      en: 'A fast, secure, mobile-friendly website that presents your business and brings in enquiries.',
    },
    idealFor: {
      el: 'Επαγγελματίες, καταστήματα, ξενοδοχεία και εταιρείες που χρειάζονται παρουσία στο διαδίκτυο.',
      en: 'Professionals, shops, hotels and companies that need an online presence.',
    },
    includes: {
      el: [
        'Σχεδιασμός προσαρμοσμένος στην εικόνα της επιχείρησής σας',
        'Responsive σε κινητό, tablet και υπολογιστή',
        'Βασικό SEO (τίτλοι, περιγραφές, δομή, ταχύτητα)',
        'Φόρμα επικοινωνίας, WhatsApp και χάρτης',
        'HTTPS, βασικά security headers και στοιχεία ΓΚΠΔ (cookies, πολιτική απορρήτου)',
        'Παράδοση με οδηγίες διαχείρισης περιεχομένου',
      ],
      en: [
        'Design tailored to your brand',
        'Responsive on phone, tablet and desktop',
        'Basic SEO (titles, descriptions, structure, speed)',
        'Contact form, WhatsApp and map',
        'HTTPS, baseline security headers and GDPR basics (cookies, privacy policy)',
        'Handover with content-management instructions',
      ],
    },
    priceFrom: null,
  },
  {
    id: 'eshop',
    title: { el: 'E-shop', en: 'E-shop' },
    summary: {
      el: 'Ηλεκτρονικό κατάστημα με κατάλογο προϊόντων, καλάθι και ασφαλείς πληρωμές, έτοιμο για πωλήσεις.',
      en: 'An online store with a product catalogue, cart and secure payments, ready to sell.',
    },
    idealFor: {
      el: 'Τοπικά προϊόντα, καταστήματα λιανικής και παραγωγοί που θέλουν να πουλήσουν πέρα από τον φυσικό χώρο.',
      en: 'Local products, retailers and producers who want to sell beyond their physical store.',
    },
    includes: {
      el: [
        'Κατάλογος προϊόντων, κατηγορίες και αναζήτηση',
        'Καλάθι, checkout και διαχείριση παραγγελιών',
        'Ενσωμάτωση παρόχου πληρωμών και μεθόδων αποστολής',
        'Email ειδοποιήσεις παραγγελιών',
        'Ασφάλεια πληρωμών και προστασία φορμών',
        'Εκπαίδευση στη διαχείριση καταστήματος',
      ],
      en: [
        'Product catalogue, categories and search',
        'Cart, checkout and order management',
        'Payment provider and shipping method integration',
        'Order email notifications',
        'Payment security and form protection',
        'Training on managing the store',
      ],
    },
    priceFrom: null,
  },
  {
    id: 'booking',
    title: { el: 'Σύστημα κρατήσεων', en: 'Booking system' },
    summary: {
      el: 'Online κρατήσεις και ραντεβού, ώστε οι πελάτες σας να κλείνουν μόνοι τους, όλες τις ώρες.',
      en: 'Online reservations and appointments so customers can book on their own, any time.',
    },
    idealFor: {
      el: 'Καταλύματα, εστιατόρια, κέντρα αισθητικής, ιατρεία, ενοικιάσεις και δραστηριότητες.',
      en: 'Accommodation, restaurants, wellness studios, clinics, rentals and activities.',
    },
    includes: {
      el: [
        'Ημερολόγιο διαθεσιμότητας και κρατήσεις σε πραγματικό χρόνο',
        'Email επιβεβαίωσης σε πελάτη και σε εσάς',
        'Πίνακας διαχείρισης για κρατήσεις και ακυρώσεις',
        'Προστασία από spam και κατάχρηση της φόρμας',
        'Διαθέσιμο σε ελληνικά και αγγλικά',
        'Προσαρμογή στους κανόνες της επιχείρησής σας',
      ],
      en: [
        'Availability calendar and real-time bookings',
        'Confirmation emails to the customer and to you',
        'Admin panel for bookings and cancellations',
        'Spam and abuse protection on the booking form',
        'Available in Greek and English',
        'Adapted to your business rules',
      ],
    },
    priceFrom: null,
  },
  {
    id: 'internal',
    title: { el: 'Εσωτερικά εργαλεία', en: 'Internal tools' },
    summary: {
      el: 'Εφαρμογές που αντικαθιστούν Excel και χειρωνακτική δουλειά: διαχείριση πελατών, αποθήκη, αναφορές, ενοποιήσεις.',
      en: 'Apps that replace spreadsheets and manual work: customer management, stock, reports, integrations.',
    },
    idealFor: {
      el: 'Μικρές και μεσαίες επιχειρήσεις με επαναλαμβανόμενες διαδικασίες που χάνουν χρόνο.',
      en: 'Small and mid-size businesses with repetitive processes that waste time.',
    },
    includes: {
      el: [
        'Ανάλυση της διαδικασίας που θέλετε να βελτιώσετε',
        'Web εφαρμογή με ρόλους χρηστών και σύνδεση',
        'Πίνακες, φίλτρα, εξαγωγές σε Excel/PDF',
        'Σύνδεση με υπάρχοντα συστήματα και APIs',
        'Ασφαλής αποθήκευση δεδομένων και αντίγραφα ασφαλείας',
        'Τεκμηρίωση και υποστήριξη μετά την παράδοση',
      ],
      en: [
        'Analysis of the process you want to improve',
        'Web app with user roles and login',
        'Tables, filters, Excel/PDF exports',
        'Integration with existing systems and APIs',
        'Secure data storage and backups',
        'Documentation and post-delivery support',
      ],
    },
    priceFrom: null,
  },
  {
    id: 'maintenance',
    title: { el: 'Συντήρηση και υποστήριξη', en: 'Maintenance and support' },
    summary: {
      el: 'Το site ή η εφαρμογή σας παραμένει ενημερωμένη, ασφαλής και λειτουργική μετά την παράδοση.',
      en: 'Your site or app stays up to date, secure and working after delivery.',
    },
    idealFor: {
      el: 'Πελάτες που θέλουν κάποιον να φροντίζει το site τους χωρίς να ασχολούνται οι ίδιοι.',
      en: 'Clients who want someone to look after their site without doing it themselves.',
    },
    includes: {
      el: [
        'Ενημερώσεις λογισμικού και ασφάλειας',
        'Αντίγραφα ασφαλείας',
        'Παρακολούθηση λειτουργίας του site',
        'Μικροαλλαγές σε κείμενα και εικόνες',
        'Άμεση επικοινωνία όταν κάτι χρειάζεται προσοχή',
      ],
      en: [
        'Software and security updates',
        'Backups',
        'Uptime monitoring',
        'Small content and image changes',
        'Direct contact when something needs attention',
      ],
    },
    priceFrom: null,
  },
  {
    id: 'security',
    title: { el: 'Έλεγχος ασφάλειας', en: 'Security audit' },
    summary: {
      el: 'Τεχνικός έλεγχος της ιστοσελίδας ή του e-shop σας: ευπάθειες, HTTPS, headers, φόρμες και βασικά ΓΚΠΔ.',
      en: 'A technical review of your website or shop: vulnerabilities, HTTPS, headers, forms and GDPR basics.',
    },
    idealFor: {
      el: 'Επιχειρήσεις με υπάρχον site ή e-shop που θέλουν να ξέρουν πού είναι εκτεθειμένες.',
      en: 'Businesses with an existing site or shop that want to know where they are exposed.',
    },
    includes: {
      el: [
        'Έλεγχος HTTPS/TLS και security headers',
        'Έλεγχος φορμών και εισόδων (XSS, injection, spam)',
        'Έλεγχος cookies και βασικών απαιτήσεων ΓΚΠΔ',
        'Γραπτή αναφορά με σοβαρότητα και προτεινόμενες διορθώσεις',
        'Προαιρετικά: υλοποίηση των διορθώσεων',
      ],
      en: [
        'HTTPS/TLS and security headers check',
        'Forms and inputs review (XSS, injection, spam)',
        'Cookies and basic GDPR requirements check',
        'Written report with severity and recommended fixes',
        'Optional: implementation of the fixes',
      ],
    },
    priceFrom: null,
    page: 'security-audit',
  },
]
