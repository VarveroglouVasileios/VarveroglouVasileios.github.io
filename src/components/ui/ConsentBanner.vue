<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '@/composables/useLocalePath'
import { gaEnabled, getStoredConsent, setConsent, type ConsentChoice } from '@/lib/analytics'

const { locale } = useI18n()
const { to } = useLocalePath()

const visible = ref(false)

const copy = {
  el: {
    title: 'Στατιστικά και διαφημίσεις',
    text: 'Με τη συγκατάθεσή σας χρησιμοποιώ το Google Analytics και τα εργαλεία μέτρησης της Google για να καταλαβαίνω πώς χρησιμοποιείται ο ιστότοπος. Χωρίς αυτή, δεν αποθηκεύονται cookies.',
    more: 'Πολιτική απορρήτου',
    accept: 'Αποδοχή',
    reject: 'Απόρριψη',
  },
  en: {
    title: 'Statistics and ads',
    text: 'With your consent I use Google Analytics and Google measurement tools to understand how the site is used. Without it, no cookies are stored.',
    more: 'Privacy policy',
    accept: 'Accept',
    reject: 'Reject',
  },
} as const

const decide = (choice: ConsentChoice): void => {
  setConsent(choice)
  visible.value = false
}

/** Lets the footer re-open the banner so a choice can be changed at any time. */
const reopen = (): void => {
  setConsent(null)
  visible.value = true
}

onMounted(() => {
  if (!gaEnabled) return
  visible.value = getStoredConsent() === null
  window.addEventListener('open-consent-settings', reopen)
})

onBeforeUnmount(() => window.removeEventListener('open-consent-settings', reopen))

const c = () => copy[locale.value === 'en' ? 'en' : 'el']
</script>

<template>
  <div
    v-if="visible"
    role="dialog"
    aria-live="polite"
    aria-labelledby="consent-title"
    class="fixed inset-x-3 bottom-3 z-[50000] mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900/95 p-5 shadow-2xl backdrop-blur sm:bottom-6"
    style="padding-bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px))"
  >
    <h2 id="consent-title" class="text-base font-semibold text-white">{{ c().title }}</h2>
    <p class="mt-2 text-sm leading-relaxed text-slate-300">
      {{ c().text }}
      <router-link :to="to('privacy')" class="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">
        {{ c().more }}
      </router-link>
    </p>
    <div class="mt-4 flex flex-wrap gap-3">
      <button
        type="button"
        class="rounded-lg bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        @click="decide('granted')"
      >
        {{ c().accept }}
      </button>
      <button
        type="button"
        class="rounded-lg border border-slate-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        @click="decide('denied')"
      >
        {{ c().reject }}
      </button>
    </div>
  </div>
</template>
