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
  checkIn: props.checkIn ?? addDays(today, 30),
  checkOut: props.checkOut ?? addDays(today, 33),
  guests: props.guests ?? 2,
})
const error = ref<StayError | null>(null)

const errorText = computed(() =>
  error.value ? t(`errors.${error.value}`, { n: minNights(form.checkIn, form.checkOut) }) : '',
)

const submit = (): void => {
  error.value = validateStay(form)
  if (error.value) return
  router.push({ name: 'rooms', query: { in: form.checkIn, out: form.checkOut, g: String(form.guests) } })
}
</script>

<template>
  <form class="grid gap-4 border border-rule bg-white p-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_8rem_auto] lg:items-end" novalidate @submit.prevent="submit">
    <div>
      <label for="in" class="field-label">{{ t('search.checkIn') }}</label>
      <input id="in" v-model="form.checkIn" type="date" :min="today" class="field" />
    </div>
    <div>
      <label for="out" class="field-label">{{ t('search.checkOut') }}</label>
      <input id="out" v-model="form.checkOut" type="date" :min="form.checkIn" class="field" />
    </div>
    <div>
      <label for="guests" class="field-label">{{ t('search.guests') }}</label>
      <input id="guests" v-model.number="form.guests" type="number" min="1" max="6" inputmode="numeric" class="field" />
    </div>
    <button type="submit" class="btn sm:col-span-2 lg:col-span-1">{{ t('search.submit') }}</button>
    <p v-if="errorText" class="field-error sm:col-span-2 lg:col-span-4" role="alert">{{ errorText }}</p>
  </form>
</template>
