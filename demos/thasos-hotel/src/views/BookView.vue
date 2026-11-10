<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { getRoom } from '@/data/rooms'
import { isValidEmail, makeRef, minNights, nightsBetween, totalPrice, unitsLeft, validateStay } from '@/lib/booking'
import { useBookings } from '@/lib/store'
import type { Stay } from '@/lib/types'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const { bookings, add } = useBookings()

const lang = computed(() => (locale.value === 'en' ? 'en' : 'el'))
const room = computed(() => getRoom(String(route.params.roomId)))
const stay = computed<Stay>(() => ({
  checkIn: String(route.query.in ?? ''),
  checkOut: String(route.query.out ?? ''),
  guests: Number(route.query.g ?? 0),
}))
const stayError = computed(() => validateStay(stay.value))
const nights = computed(() => (stayError.value ? 0 : nightsBetween(stay.value.checkIn, stay.value.checkOut)))
const total = computed(() => (room.value && !stayError.value ? totalPrice(room.value, stay.value.checkIn, stay.value.checkOut) : 0))

const form = reactive({ name: '', email: '', phone: '', notes: '', terms: false })
const touched = reactive({ name: false, email: false, terms: false })
const unavailable = ref(false)

const errors = computed(() => ({
  name: form.name.trim() ? '' : 'required',
  email: isValidEmail(form.email.trim()) ? '' : 'email',
  terms: form.terms ? '' : 'terms',
}))
const isValid = computed(() => !errors.value.name && !errors.value.email && !errors.value.terms)

const msg = (key: string): string => t(`errors.${key}`, { n: minNights(stay.value.checkIn, stay.value.checkOut) })

const submit = (): void => {
  touched.name = touched.email = touched.terms = true
  if (!room.value || stayError.value || !isValid.value) return

  // Re-check at the last moment: another booking may have taken the last unit.
  const { checkIn, checkOut, guests } = stay.value
  if (room.value.capacity < guests || unitsLeft(room.value, bookings.value, checkIn, checkOut) < 1) {
    unavailable.value = true
    return
  }

  const ref = makeRef()
  add({
    ref,
    roomId: room.value.id,
    checkIn,
    checkOut,
    guests,
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    notes: form.notes.trim(),
    total: total.value,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  })
  router.push({ name: 'confirmation', params: { ref } })
}
</script>

<template>
  <div class="wrap max-w-4xl pt-10">
    <h1 class="mb-6 text-4xl">{{ t('book.title') }}</h1>

    <p v-if="!room || stayError" class="border border-rule bg-white p-6">
      {{ t('book.noStay') }}
      <router-link to="/rooms" class="link">{{ t('nav.rooms') }}</router-link>
    </p>

    <div v-else class="grid gap-8 md:grid-cols-5">
      <aside class="border border-rule bg-white p-6 md:col-span-2">
        <h2 class="mb-3 font-semibold text-ink">{{ t('book.summary') }}</h2>
        <p class="font-serif text-xl">{{ room.name[lang] }}</p>
        <p class="mt-2 text-sm text-ink-soft">{{ stay.checkIn }} → {{ stay.checkOut }}</p>
        <p class="text-sm text-ink-soft">{{ t('book.nights', { n: nights }) }} · {{ stay.guests }} {{ t('search.guests').toLowerCase() }}</p>
        <p class="mt-4 text-2xl font-bold text-ink">{{ total }}€</p>
        <p class="mt-3 text-xs text-ink-soft">{{ t('book.payNote') }}</p>
        <router-link :to="{ name: 'rooms', query: route.query }" class="mt-4 inline-block text-sm link">
          {{ t('book.back') }}
        </router-link>
      </aside>

      <form class="space-y-4 md:col-span-3" novalidate @submit.prevent="submit">
        <p v-if="unavailable" class="border border-clay-500/40 bg-clay-500/10 p-4 text-sm font-medium text-clay-600" role="alert">
          {{ msg('unavailable') }}
        </p>

        <div>
          <label for="name" class="field-label">{{ t('book.name') }}</label>
          <input id="name" v-model="form.name" class="field" autocomplete="name" @blur="touched.name = true" />
          <p v-if="touched.name && errors.name" class="field-error">{{ msg(errors.name) }}</p>
        </div>
        <div>
          <label for="email" class="field-label">{{ t('book.email') }}</label>
          <input id="email" v-model="form.email" type="email" class="field" autocomplete="email" @blur="touched.email = true" />
          <p v-if="touched.email && errors.email" class="field-error">{{ msg(errors.email) }}</p>
        </div>
        <div>
          <label for="phone" class="field-label">{{ t('book.phone') }}</label>
          <input id="phone" v-model="form.phone" type="tel" class="field" autocomplete="tel" />
        </div>
        <div>
          <label for="notes" class="field-label">{{ t('book.notes') }}</label>
          <textarea id="notes" v-model="form.notes" rows="3" class="field" />
        </div>
        <div>
          <label class="flex items-start gap-2 text-sm">
            <input v-model="form.terms" type="checkbox" class="mt-1" @change="touched.terms = true" />
            <span>{{ t('book.terms') }}</span>
          </label>
          <p v-if="touched.terms && errors.terms" class="field-error">{{ msg(errors.terms) }}</p>
        </div>
        <button type="submit" class="btn w-full">{{ t('book.confirm') }}</button>
      </form>
    </div>
  </div>
</template>
