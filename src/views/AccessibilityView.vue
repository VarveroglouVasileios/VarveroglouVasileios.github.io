<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageHeader from '@/components/ui/PageHeader.vue'
import { contactInfo } from '@/data/site'
import { getPage } from '@/seo/head'

const { locale } = useI18n()
const lang = () => (locale.value === 'en' ? 'en' : 'el')
const h1 = () => getPage('accessibility')?.[lang()].h1 ?? ''

/** Update this date every time the checks below are repeated. */
const checkedOn = { el: '22 Νοεμβρίου 2026', en: '22 November 2026' }

type Block = { title: string; items: string[] }

const content: Record<'el' | 'en', { intro: string; blocks: Block[]; contactTitle: string; contact: string; updated: string; note: string }> = {
  el: {
    intro:
      'Θέλω το site να χρησιμοποιείται από όσο το δυνατόν περισσότερους ανθρώπους, με πληκτρολόγιο, αναγνώστη οθόνης ή μεγέθυνση. Ο στόχος είναι το πρότυπο WCAG 2.2, επίπεδο AA. Δεν έχει γίνει πλήρης ανεξάρτητος έλεγχος, γι’ αυτό δεν δηλώνω πλήρη συμμόρφωση. Παρακάτω γράφω ακριβώς τι έχω ελέγξει και τι όχι.',
    blocks: [
      {
        title: 'Τι έχει ελεγχθεί',
        items: [
          'Αυτόματος έλεγχος με το εργαλείο axe-core (κανόνες WCAG 2.0, 2.1 και 2.2, επίπεδα A και AA) στις κύριες σελίδες, στα ελληνικά και στα αγγλικά. Την ημερομηνία αυτής της δήλωσης δεν βρήκε παραβιάσεις. Ο αυτόματος έλεγχος πιάνει μόνο ένα μέρος των προβλημάτων.',
          'Πλοήγηση με πληκτρολόγιο: κάθε σύνδεσμος και κουμπί φτάνει με το Tab και έχει ορατό δείκτη εστίασης. Υπάρχει σύνδεσμος «Μετάβαση στο περιεχόμενο» στην αρχή κάθε σελίδας.',
          'Δηλώνεται η γλώσσα της σελίδας (ελληνικά ή αγγλικά) και υπάρχει ένας κύριος τίτλος ανά σελίδα.',
          'Αντίθεση χρωμάτων: διορθώθηκε το γκρι κείμενο που είχε αντίθεση 4,2:1 και τώρα πληροί το όριο 4,5:1 του AA.',
          'Μειωμένη κίνηση: όταν το σύστημά σας ζητά λιγότερη κίνηση, απενεργοποιούνται το τρισδιάστατο φόντο, η ομαλή κύλιση, οι μεταβάσεις σελίδας και ο προσαρμοσμένος κέρσορας. Ο προσαρμοσμένος κέρσορας δεν χρησιμοποιείται σε οθόνες αφής.',
        ],
      },
      {
        title: 'Τι δεν έχει ελεγχθεί ακόμα',
        items: [
          'Δεν έχω δοκιμάσει το site με αναγνώστη οθόνης (NVDA, JAWS ή VoiceOver). Αυτό είναι το σημαντικότερο κενό.',
          'Το διακοσμητικό τρισδιάστατο φόντο και ο κρυφός «terminal» (easter egg) δεν έχουν ελεγχθεί για χρήστες αναγνώστη οθόνης.',
          'Τα demos (κάθε ένα είναι ξεχωριστό site στο GitHub Pages) δεν καλύπτονται από αυτή τη δήλωση. Είναι φανταστικές επιχειρήσεις για επίδειξη και δεν τα έχω ελέγξει με την ίδια διαδικασία.',
          'Δεν υπάρχουν βίντεο ή ήχος στο portfolio.',
        ],
      },
    ],
    contactTitle: 'Αναφορά εμποδίου',
    contact: `Αν κάτι δεν δουλεύει για εσάς, γράψτε μου στο ${contactInfo.email} με τη σελίδα και το πρόβλημα. Θα το δω και θα προσπαθήσω να το διορθώσω.`,
    updated: 'Τελευταίος έλεγχος',
    note: 'Η δήλωση αυτή περιγράφει έναν τεχνικό έλεγχο και δεν αποτελεί νομική συμβουλή ή πιστοποίηση συμμόρφωσης.',
  },
  en: {
    intro:
      'I want this site to be usable by as many people as possible, with a keyboard, a screen reader or magnification. The target is WCAG 2.2, level AA. There has been no full independent audit, so I do not claim full conformance. Below I write exactly what I have checked and what I have not.',
    blocks: [
      {
        title: 'What has been checked',
        items: [
          'An automated check with the axe-core tool (WCAG 2.0, 2.1 and 2.2 rules, levels A and AA) on the main pages, in Greek and in English. On the date of this statement it found no violations. An automated check only catches part of the problems.',
          'Keyboard navigation: every link and button can be reached with Tab and has a visible focus indicator. A “Skip to main content” link comes first on every page.',
          'The page language is declared (Greek or English) and each page has one main heading.',
          'Colour contrast: grey text that had a 4.2:1 contrast was fixed and now meets the 4.5:1 AA threshold.',
          'Reduced motion: when your system asks for less motion, the 3D background, smooth scrolling, page transitions and the custom cursor are turned off. The custom cursor is not used on touch screens.',
        ],
      },
      {
        title: 'What has not been checked yet',
        items: [
          'I have not tested the site with a screen reader (NVDA, JAWS or VoiceOver). This is the most important gap.',
          'The decorative 3D background and the hidden “terminal” (an easter egg) have not been checked for screen reader users.',
          'The demos (each is a separate site on GitHub Pages) are not covered by this statement. They are fictional businesses for demonstration and have not been checked with the same process.',
          'There is no video or audio in the portfolio.',
        ],
      },
    ],
    contactTitle: 'Report a barrier',
    contact: `If something does not work for you, write to me at ${contactInfo.email} with the page and the problem. I will look at it and try to fix it.`,
    updated: 'Last checked',
    note: 'This statement describes a technical check. It is not legal advice or a compliance certificate.',
  },
}
</script>

<template>
  <div>
    <PageHeader :title="h1()" />
    <section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div class="max-w-3xl space-y-10">
        <p class="text-lg leading-relaxed text-slate-300">{{ content[lang()].intro }}</p>

        <div v-for="block in content[lang()].blocks" :key="block.title">
          <h2 class="mb-3 text-xl font-semibold text-white">{{ block.title }}</h2>
          <ul class="space-y-3 text-slate-300">
            <li v-for="item in block.items" :key="item" class="flex gap-2.5 leading-relaxed">
              <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="mb-2 text-xl font-semibold text-white">{{ content[lang()].contactTitle }}</h2>
          <p class="leading-relaxed text-slate-300">{{ content[lang()].contact }}</p>
        </div>

        <p class="text-sm text-slate-400">
          {{ content[lang()].updated }}: {{ checkedOn[lang()] }}. {{ content[lang()].note }}
        </p>
      </div>
    </section>
  </div>
</template>
