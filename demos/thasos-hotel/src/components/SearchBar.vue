<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { addDays, minNights, todayIso, validateStay } from '@/lib/booking'
import type { StayError } from '@/lib/types'

const props = defineProps<{ checkIn?: string; checkOut?: string; guests?: number }>()

const { t } = useI18n()
const router = useRouter()
const today = todayIso()

const form = reactive({
  checkIn: props.checkIn ?? addDays(today, 14),
  checkOut: props.checkOut ?? addDays(today, 17),
  guests: props.guests ?? 2,
})
const error = ref<StayError | null>(null)

const errorText = computed(() => {
  if (!error.value) return ''
  const n = minNights(form.checkIn, form.checkOut)
  return t(`errors.${error.value}`, { n })
})

const submit = (): void => {
  error.value = validateStay(form)
  if (error.value) return
  router.push({ name: 'rooms', query: { in: form.checkIn, out: form.checkOut, g: String(form.guests) } })
}
</script>

<template>
  <form class="grid gap-3 rounded-2xl bg-white p-4 shadow-lg sm:grid-cols-4" novalidate @submit.prevent="submit">
    <div>
      <label for="in" class="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">{{ t('search.checkIn') }}</label>
      <input id="in" v-model="form.checkIn" type="date" :min="today" class="field" />
    </div>
    <div>
      <label for="out" class="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">{{ t('search.checkOut') }}</label>
      <input id="out" v-model="form.checkOut" type="date" :min="form.checkIn" class="field" />
    </div>
    <div>
      <label for="guests" class="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">{{ t('search.guests') }}</label>
      <input id="guests" v-model.number="form.guests" type="number" min="1" max="6" class="field" />
    </div>
    <button type="submit" class="btn self-end">{{ t('search.submit') }}</button>
    <p v-if="errorText" class="field-error sm:col-span-4" role="alert">{{ errorText }}</p>
  </form>
</template>
