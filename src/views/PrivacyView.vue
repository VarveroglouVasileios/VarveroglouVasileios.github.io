<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageHeader from '@/components/ui/PageHeader.vue'
import { contactInfo } from '@/data/site'
import { getPage } from '@/seo/head'

const { locale } = useI18n()
const lang = () => (locale.value === 'en' ? 'en' : 'el')
const h1 = () => getPage('privacy')?.[lang()].h1 ?? ''

const content = {
  el: [
    ['Υπεύθυνος επεξεργασίας', `Βασίλειος Βαρβέρογλου, Καβάλα. Επικοινωνία: ${contactInfo.email}.`],
    ['Ποια στοιχεία συλλέγονται', 'Όταν συμπληρώνετε τη φόρμα επικοινωνίας: όνομα, email, το είδος υπηρεσίας που σας ενδιαφέρει και το μήνυμά σας. Αν μου γράψετε με email, WhatsApp ή τηλέφωνο, έχω τα στοιχεία που μου στέλνετε.'],
    ['Σκοπός', 'Χρησιμοποιούνται μόνο για να σας απαντήσω και να σας δώσω προσφορά. Δεν τα πουλάω και δεν τα χρησιμοποιώ για διαφήμιση.'],
    ['Πάροχοι που εμπλέκονται', 'Η φόρμα στέλνεται μέσω της υπηρεσίας Formspree, που μεταφέρει το μήνυμα στο email μου. Ο ιστότοπος φιλοξενείται στο GitHub Pages.'],
    ['Στατιστικά επισκεψιμότητας', 'Αν είναι ενεργοποιημένα, χρησιμοποιείται το Plausible, χωρίς cookies και χωρίς προσωπικά αναγνωριστικά.'],
    ['Διατήρηση', 'Κρατώ την επικοινωνία για όσο χρειάζεται για την εξυπηρέτησή σας και για τις φορολογικές μου υποχρεώσεις, αν προκύψει συνεργασία.'],
    ['Τα δικαιώματά σας', `Μπορείτε να ζητήσετε πρόσβαση, διόρθωση ή διαγραφή των στοιχείων σας στο ${contactInfo.email}. Έχετε επίσης δικαίωμα καταγγελίας στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (dpa.gr).`],
  ],
  en: [
    ['Data controller', `Vasileios Varveroglou, Kavala, Greece. Contact: ${contactInfo.email}.`],
    ['What is collected', 'When you use the contact form: name, email, the type of service you are interested in and your message. If you write by email, WhatsApp or phone, I have the details you send.'],
    ['Purpose', 'Only to reply to you and give you a quote. I do not sell your data or use it for advertising.'],
    ['Providers involved', 'The form is sent through Formspree, which forwards the message to my email. The site is hosted on GitHub Pages.'],
    ['Traffic statistics', 'If enabled, Plausible is used, without cookies and without personal identifiers.'],
    ['Retention', 'I keep correspondence as long as needed to serve you and for my tax obligations if we work together.'],
    ['Your rights', `You can request access, correction or deletion of your data at ${contactInfo.email}. You also have the right to complain to the Hellenic Data Protection Authority (dpa.gr).`],
  ],
} as const
</script>

<template>
  <div>
    <PageHeader :tag="lang() === 'el' ? 'ΑΠΟΡΡΗΤΟ' : 'PRIVACY'" :title="h1()" />
    <section class="mx-auto max-w-3xl space-y-8 px-4 pb-16 sm:px-6">
      <div v-for="[title, text] in content[lang()]" :key="title">
        <h2 class="mb-2 text-lg font-bold text-white">{{ title }}</h2>
        <p class="text-slate-300">{{ text }}</p>
      </div>
    </section>
  </div>
</template>
