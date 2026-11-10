<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { addDays, CAPACITY, formatDate, peakSeats } from '@/lib/reservations'
import { useReservations } from '@/lib/store'
import type { Status } from '@/lib/types'

const { t, locale } = useI18n()
const store = useReservations()
const { reservations, today } = store
const signedIn = ref(false)
const password = ref('')
const invalid = ref(false)
const notice = ref('')
const selectedDay = ref('')
const busy = ref(false)
const week = computed(() => Array.from({ length: 7 }, (_, offset) => {
  const date = addDays(today.value, offset)
  const peak = peakSeats(reservations.value, date)
  return { date, peak, percent: Math.round(peak * 100 / CAPACITY) }
}))
const day = computed(() => selectedDay.value && week.value.some(row => row.date === selectedDay.value) ? selectedDay.value : today.value)
const daily = computed(() => reservations.value.filter(item => item.date === day.value).sort((a, b) => a.time.localeCompare(b.time)))

onMounted(store.sync)

function login() {
  invalid.value = password.value !== 'demo'
  if (!invalid.value) {
    signedIn.value = true
    password.value = ''
  }
}

async function update(ref: string, status: Exclude<Status, 'confirmed'>) {
  busy.value = true
  try {
    await store.setStatus(ref, status)
    notice.value = 'updated'
  } finally {
    busy.value = false
  }
}

async function reset() {
  if (!window.confirm(t('admin.resetAsk'))) return
  busy.value = true
  try {
    await store.reset()
    selectedDay.value = ''
    notice.value = 'restored'
  } finally {
    busy.value = false
  }
}

const displayDate = (date: string) => formatDate(date, locale.value)
</script>

<template>
  <div class="shell page admin">
    <header class="page-intro"><h1>{{ t('admin.title') }}</h1></header>
    <form v-if="!signedIn" class="panel admin-login" @submit.prevent="login">
      <div class="field">
        <label for="admin-password">{{ t('admin.password') }}</label>
        <input id="admin-password" v-model="password" type="password" autocomplete="current-password" required
          :aria-invalid="invalid" :aria-describedby="invalid ? 'demo-password wrong-password' : 'demo-password'" @input="invalid = false" />
        <p id="demo-password" class="hint">{{ t('admin.hint') }}</p>
        <p v-if="invalid" id="wrong-password" class="field-error" role="alert">{{ t('admin.wrong') }}</p>
      </div>
      <button class="button button-primary" type="submit">{{ t('admin.enter') }}</button>
    </form>
    <template v-else>
      <div class="admin-actions">
        <button class="button button-outline" type="button" :disabled="busy" @click="reset">{{ t('admin.reset') }}</button>
        <button class="text-link" type="button" @click="signedIn = false">{{ t('admin.logout') }}</button>
        <p role="status" class="hint">{{ notice ? t(`admin.${notice}`) : '' }}</p>
      </div>
      <div class="admin-layout">
        <section class="panel">
          <h2 id="daily-heading">{{ t('admin.today') }}</h2>
          <div class="field admin-date">
            <label for="admin-date">{{ t('admin.date') }}</label>
            <select id="admin-date" v-model="selectedDay">
              <option v-for="row in week" :key="row.date" :value="row.date === today ? '' : row.date">{{ displayDate(row.date) }}</option>
            </select>
          </div>
          <p v-if="!daily.length" class="notice">{{ t('admin.empty') }}</p>
          <ul v-else class="daily-list">
            <li v-for="item in daily" :key="item.ref" class="daily-row">
              <div>
                <p class="daily-name">{{ item.time }} · {{ item.name }}</p>
                <p class="hint">{{ item.ref }} · {{ t('book.party') }} {{ item.party }}</p>
                <p v-if="item.phone" class="hint">{{ item.phone }} <span v-if="item.email">· {{ item.email }}</span></p>
                <p v-if="item.notes" class="daily-notes">{{ item.notes }}</p>
              </div>
              <div class="row-actions">
                <span class="status" :data-status="item.status">{{ t(`admin.status.${item.status}`) }}</span>
                <button v-if="item.status === 'confirmed'" class="text-link" type="button" :disabled="busy"
                  @click="update(item.ref, 'seated')">{{ t('admin.seated') }}</button>
                <button v-if="item.status !== 'cancelled'" class="text-link danger" type="button" :disabled="busy"
                  @click="update(item.ref, 'cancelled')">{{ t('admin.cancel') }}</button>
              </div>
            </li>
          </ul>
        </section>
        <section class="panel">
          <h2 id="week-heading">{{ t('admin.week') }}</h2>
          <p class="hint">{{ t('admin.peakHint') }}</p>
          <table class="occupancy" aria-labelledby="week-heading">
            <thead><tr>
              <th scope="col">{{ t('admin.date') }}</th><th scope="col">{{ t('admin.peak') }}</th><th scope="col">{{ t('admin.occupancy') }}</th>
            </tr></thead>
            <tbody>
              <tr v-for="row in week" :key="row.date">
                <th scope="row">{{ displayDate(row.date) }}</th>
                <td>{{ row.peak }} / {{ CAPACITY }}</td>
                <td><span class="meter" aria-hidden="true"><span :style="{ width: `${row.percent}%` }" /></span>{{ row.percent }}%</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </template>
  </div>
</template>
