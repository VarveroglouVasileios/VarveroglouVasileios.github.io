<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { availableSlots, MAX_PARTY, todayIso, validateGuest, validateSearch } from '@/lib/reservations'
import { useReservations } from '@/lib/store'
import type { Guest } from '@/lib/types'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const store = useReservations()
const now = ref(new Date())
const today = computed(() => todayIso(now.value))
const date = ref(typeof route.query.date === 'string' ? route.query.date : today.value)
const queryParty = typeof route.query.party === 'string' ? Number(route.query.party) : 2
const party = ref(queryParty > MAX_PARTY ? MAX_PARTY + 1 : queryParty)
const selected = ref('')
const guest = reactive<Guest>({ name: '', phone: '', email: '', notes: '' })
const touched = reactive({ name: false, phone: false, email: false })
const sent = ref(false)
const submitting = ref(false)
const selectionError = ref('')
const form = ref<HTMLFormElement>()
const errors = computed(() => validateGuest(guest))
const searchError = computed(() => validateSearch(date.value, party.value, now.value))
const slots = computed(() => availableSlots(store.reservations.value, date.value, party.value, now.value))

const fields = [
  { key: 'name', type: 'text', autocomplete: 'name' },
  { key: 'phone', type: 'tel', autocomplete: 'tel' },
  { key: 'email', type: 'email', autocomplete: 'email' },
] as const

function refresh() {
  now.value = new Date()
  store.sync()
}

let interval: number
onMounted(() => {
  refresh()
  interval = window.setInterval(() => { now.value = new Date() }, 15_000)
  window.addEventListener('focus', refresh)
})
onUnmounted(() => {
  window.clearInterval(interval)
  window.removeEventListener('focus', refresh)
})

watch([date, party], () => {
  selected.value = ''
  selectionError.value = ''
  now.value = new Date()
})

function fieldError(key: keyof typeof touched) {
  return (touched[key] || sent.value) && errors.value[key]
}

async function focusError() {
  await nextTick()
  form.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
}

async function submit() {
  if (submitting.value) return
  sent.value = true
  now.value = new Date()
  selectionError.value = selected.value ? '' : 'time'
  if (searchError.value || selectionError.value || Object.keys(errors.value).length) {
    await focusError()
    return
  }

  submitting.value = true
  try {
    const result = await store.book({ date: date.value, party: party.value, time: selected.value }, guest)
    if (result.reservation) {
      await router.push({ name: 'confirmation', params: { ref: result.reservation.ref } })
    } else {
      selectionError.value = result.error ?? ''
      await focusError()
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="shell page">
    <header class="page-intro">
      <h1>{{ t('book.title') }}</h1>
      <p>{{ t('book.intro') }}</p>
    </header>
    <form ref="form" class="booking-layout" novalidate @submit.prevent="submit">
      <div class="panel">
        <div class="booking-fields">
          <div class="field">
            <label for="book-date">{{ t('book.date') }}</label>
            <input id="book-date" v-model="date" type="date" :min="today" required
              :aria-invalid="searchError === 'date' || searchError === 'past'" :aria-describedby="searchError === 'date' || searchError === 'past' ? 'search-error' : undefined" />
          </div>
          <div class="field">
            <label for="book-party">{{ t('book.party') }}</label>
            <select id="book-party" v-model="party" :aria-invalid="searchError === 'largeParty' || searchError === 'party'"
              :aria-describedby="searchError === 'largeParty' || searchError === 'party' ? 'search-error' : undefined">
              <option v-if="!Number.isInteger(party) || party < 1" :value="party" disabled>—</option>
              <option v-for="size in MAX_PARTY" :key="size" :value="size">{{ size }}</option>
              <option :value="MAX_PARTY + 1">{{ t('book.more') }}</option>
            </select>
          </div>
        </div>
        <p v-if="searchError" id="search-error" class="field-error" role="alert">{{ t(`error.${searchError}`) }}</p>
        <fieldset v-else class="time-picker" tabindex="-1" :aria-invalid="!!selectionError" :aria-describedby="selectionError ? 'time-error' : 'time-zone'">
          <legend>{{ t('book.time') }}</legend>
          <p id="time-zone" class="hint">{{ t('book.hours') }}</p>
          <div v-if="slots.length" class="time-grid">
            <label v-for="time in slots" :key="time" class="slot">
              <input v-model="selected" type="radio" name="time" :value="time" @change="selectionError = ''" />
              <span>{{ time }}</span>
            </label>
          </div>
          <p v-else class="notice" role="status">{{ t('book.noTimes') }}</p>
          <p v-if="selectionError" id="time-error" class="field-error" role="alert">{{ t(`error.${selectionError}`) }}</p>
        </fieldset>
      </div>
      <section class="panel" aria-labelledby="guest-heading">
        <div class="flex flex-col gap-4">
          <h2 id="guest-heading" class="form-heading">{{ t('book.details') }}</h2>
          <div v-for="field in fields" :key="field.key" class="field">
            <label :for="`guest-${field.key}`">{{ t(`book.${field.key}`) }}</label>
            <input :id="`guest-${field.key}`" v-model="guest[field.key]" :type="field.type" :autocomplete="field.autocomplete"
              :required="field.key !== 'email'" :aria-invalid="!!fieldError(field.key)"
              :aria-describedby="[field.key === 'phone' ? 'phone-hint' : '', fieldError(field.key) ? `error-${field.key}` : ''].filter(Boolean).join(' ') || undefined"
              @blur="touched[field.key] = true" />
            <p v-if="field.key === 'phone'" id="phone-hint" class="hint">{{ t('book.phoneHint') }}</p>
            <p v-if="fieldError(field.key)" :id="`error-${field.key}`" class="field-error">{{ t(`error.${errors[field.key]}`) }}</p>
          </div>
          <div class="field">
            <label for="guest-notes">{{ t('book.notes') }}</label>
            <textarea id="guest-notes" v-model="guest.notes" rows="3" />
          </div>
          <button class="button button-primary" type="submit" :disabled="submitting">{{ t(submitting ? 'book.busy' : 'book.submit') }}</button>
        </div>
      </section>
    </form>
  </div>
</template>
