import type { L10n } from '@/lib/l10n'

export interface AuditCheck {
  title: L10n
  description: L10n
}

export const auditChecks: AuditCheck[] = [
  {
    title: { el: 'Έλεγχος ιστοσελίδας', en: 'Website review' },
    description: {
      el: 'Γνωστές ευπάθειες, ξεπερασμένα components και plugins, εκτεθειμένα αρχεία και σελίδες διαχείρισης, ρυθμίσεις διακομιστή.',
      en: 'Known vulnerabilities, outdated components and plugins, exposed files and admin pages, server configuration.',
    },
  },
  {
    title: { el: 'HTTPS και πιστοποιητικό', en: 'HTTPS and certificate' },
    description: {
      el: 'Σωστό πιστοποιητικό TLS, ανακατεύθυνση από HTTP, ρυθμίσεις HSTS και έλεγχος για mixed content.',
      en: 'Valid TLS certificate, HTTP redirects, HSTS settings and mixed-content checks.',
    },
  },
  {
    title: { el: 'Security headers', en: 'Security headers' },
    description: {
      el: 'Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy και Permissions-Policy.',
      en: 'Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy and Permissions-Policy.',
    },
  },
  {
    title: { el: 'Φόρμες και είσοδοι χρήστη', en: 'Forms and user input' },
    description: {
      el: 'Προστασία από XSS και injection, validation, προστασία από spam και bots, ασφαλής χειρισμός των δεδομένων που στέλνουν οι πελάτες.',
      en: 'XSS and injection protection, validation, spam and bot protection, safe handling of the data customers submit.',
    },
  },
  {
    title: { el: 'ΓΚΠΔ, τεχνικά βασικά', en: 'GDPR, the technical basics' },
    description: {
      el: 'Cookies και trackers πριν τη συναίνεση, πολιτική απορρήτου, πού καταλήγουν τα δεδομένα των φορμών, τρίτοι πάροχοι. Τεχνικός έλεγχος, όχι νομική συμβουλή.',
      en: 'Cookies and trackers before consent, privacy policy, where form data ends up, third-party providers. A technical check, not legal advice.',
    },
  },
]

export const auditSteps: AuditCheck[] = [
  {
    title: { el: '1. Συζήτηση', en: '1. Conversation' },
    description: {
      el: 'Μαθαίνω τι είναι το site σας, τι δεδομένα συλλέγει και ποια είναι τα σημαντικότερα ρίσκα για εσάς.',
      en: 'I learn what your site is, what data it collects and which risks matter most to you.',
    },
  },
  {
    title: { el: '2. Έλεγχος', en: '2. Audit' },
    description: {
      el: 'Εκτελώ τους ελέγχους μόνο στο site που μου έχετε εξουσιοδοτήσει, με ασφαλή τρόπο που δεν διαταράσσει τη λειτουργία του.',
      en: 'I run the checks only on the site you have authorised me to test, in a safe way that does not disrupt it.',
    },
  },
  {
    title: { el: '3. Αναφορά', en: '3. Report' },
    description: {
      el: 'Παίρνετε γραπτή αναφορά στα ελληνικά, με ευρήματα ανά σοβαρότητα, σε απλή γλώσσα, και συγκεκριμένα βήματα διόρθωσης.',
      en: 'You get a written report with findings by severity, in plain language, and concrete remediation steps.',
    },
  },
  {
    title: { el: '4. Διορθώσεις (προαιρετικά)', en: '4. Fixes (optional)' },
    description: {
      el: 'Αν θέλετε, υλοποιώ εγώ τις διορθώσεις και ξανατρέχω τους ελέγχους για επιβεβαίωση.',
      en: 'If you want, I implement the fixes and re-run the checks to confirm.',
    },
  },
]

export const serviceSteps: AuditCheck[] = [
  {
    title: { el: '1. Συζήτηση', en: '1. Conversation' },
    description: {
      el: 'Καταλαβαίνω τι χρειάζεται η επιχείρησή σας και ποιος είναι ο στόχος.',
      en: 'I understand what your business needs and what the goal is.',
    },
  },
  {
    title: { el: '2. Προσφορά', en: '2. Quote' },
    description: {
      el: 'Παίρνετε γραπτή προσφορά με το τι περιλαμβάνεται και πόσο κοστίζει.',
      en: 'You get a written quote covering what is included and the price.',
    },
  },
  {
    title: { el: '3. Υλοποίηση', en: '3. Build' },
    description: {
      el: 'Βλέπετε την πρόοδο σε ενδιάμεσα στάδια και δίνετε σχόλια πριν την παράδοση.',
      en: 'You see progress at intermediate stages and give feedback before delivery.',
    },
  },
  {
    title: { el: '4. Παράδοση και υποστήριξη', en: '4. Delivery and support' },
    description: {
      el: 'Παραδίδω με οδηγίες χρήσης και παραμένω διαθέσιμος για ερωτήσεις και αλλαγές.',
      en: 'I deliver with usage instructions and remain available for questions and changes.',
    },
  },
]
