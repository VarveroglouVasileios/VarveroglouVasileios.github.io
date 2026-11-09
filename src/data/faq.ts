import type { L10n } from '@/lib/l10n'

export interface Faq {
  q: L10n
  a: L10n
}

export const faqs: Faq[] = [
  {
    q: { el: 'Πόσο κοστίζει μια ιστοσελίδα;', en: 'How much does a website cost?' },
    a: {
      el: 'Η τιμή εξαρτάται από τις σελίδες και τις λειτουργίες που χρειάζεστε. Πριν ξεκινήσω σας δίνω γραπτή προσφορά με το τι περιλαμβάνεται.',
      en: 'The price depends on the pages and features you need. Before I start you get a written quote covering what is included.',
    },
  },
  {
    q: { el: 'Πόσο χρόνο παίρνει;', en: 'How long does it take?' },
    a: {
      el: 'Εξαρτάται από το εύρος του έργου και από το πόσο γρήγορα έχω κείμενα και φωτογραφίες από εσάς. Η προσφορά περιλαμβάνει εκτίμηση χρόνου.',
      en: 'It depends on the scope and on how quickly I receive texts and photos from you. The quote includes a time estimate.',
    },
  },
  {
    q: { el: 'Τι γίνεται μετά την παράδοση;', en: 'What happens after delivery?' },
    a: {
      el: 'Μπορώ να αναλάβω τη συντήρηση ή να σας παραδώσω τα πάντα με οδηγίες, ώστε να μη δεσμεύεστε.',
      en: 'I can take over maintenance, or hand everything over with instructions so you are not locked in.',
    },
  },
  {
    q: { el: 'Είναι ασφαλή τα δεδομένα μου;', en: 'Is my data safe?' },
    a: {
      el: 'Η ασφάλεια μπαίνει από την αρχή: HTTPS, ασφαλείς φόρμες, ενημερωμένα εξαρτήματα και αντίγραφα ασφαλείας. Κανείς δεν μπορεί να υποσχεθεί απόλυτη ασφάλεια. Σας λέω καθαρά τι καλύπτεται.',
      en: 'Security is built in from the start: HTTPS, secure forms, up-to-date components and backups. Nobody can promise absolute security, so I tell you clearly what is covered.',
    },
  },
]
