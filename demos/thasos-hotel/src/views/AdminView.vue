<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { rooms, getRoom } from '@/data/rooms'
import { addDays, todayIso } from '@/lib/booking'
import { useBookings } from '@/lib/store'

const { t, locale } = useI18n()
const { bookings, cancel, reset } = useBookings()

const lang = computed(() => (locale.value === 'en' ? 'en' : 'el'))

/** Demo-only gate. A real build uses server-side authentication. */
const KEY = 'elia-bay-demo-admin'
const read = (): boolean => {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}
const signedIn = ref(read())
const password = ref('')
const wrong = ref(false)

const login = (): void => {
  if (password.value === 'demo') {
    signedIn.value = true
    wrong.value = false
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
  } else {
    wrong.value = true
  }
}
const logout = (): void => {
  signedIn.value = false
  password.value = ''
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}

const days = computed(() => Array.from({ length: 28 }, (_, i) => addDays(todayIso(), i)))
const usedOn = (roomId: string, day: string): number =>
  bookings.value.filter((b) => b.roomId === roomId && b.status === 'confirmed' && b.checkIn <= day && day < b.checkOut).length

const sorted = computed(() => [...bookings.value].sort((a, b) => a.checkIn.localeCompare(b.checkIn)))
const cellClass = (used: number, units: number): string =>
  used === 0 ? 'bg-sand-100 text-slate-400' : used >= units ? 'bg-clay-500 text-white' : 'bg-sea-500/70 text-white'
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <form v-if="!signedIn" class="mx-auto max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-sm" @submit.prevent="login">
      <h1 class="font-serif text-2xl font-bold text-olive-800">{{ t('admin.loginTitle') }}</h1>
      <p class="text-sm text-slate-500">{{ t('admin.loginHint') }}</p>
      <div>
        <label for="pw" class="mb-1 block text-sm font-semibold">{{ t('admin.password') }}</label>
        <input id="pw" v-model="password" type="password" class="field" autocomplete="off" />
        <p v-if="wrong" class="field-error" role="alert">{{ t('admin.wrong') }}</p>
      </div>
      <button type="submit" class="btn w-full">{{ t('admin.login') }}</button>
    </form>

    <template v-else>
      <div class="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 class="font-serif text-3xl font-bold text-olive-800">{{ t('admin.title') }}</h1>
        <div class="flex gap-2">
          <button type="button" class="btn-ghost" @click="reset">{{ t('admin.reset') }}</button>
          <button type="button" class="btn-ghost" @click="logout">{{ t('admin.logout') }}</button>
        </div>
      </div>

      <section class="mb-10">
        <h2 class="mb-3 text-lg font-semibold">{{ t('admin.occupancy') }}</h2>
        <div class="overflow-x-auto rounded-xl bg-white p-3 shadow-sm">
          <table class="w-full min-w-[640px] border-separate border-spacing-1 text-center text-xs">
            <thead>
              <tr>
                <th class="text-left font-semibold">{{ t('admin.room') }}</th>
                <th v-for="d in days" :key="d" class="font-normal text-slate-500">{{ d.slice(8) }}/{{ d.slice(5, 7) }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="room in rooms" :key="room.id">
                <th class="whitespace-nowrap pr-2 text-left font-medium">{{ room.name[lang] }}</th>
                <td v-for="d in days" :key="d" class="rounded py-1 font-semibold" :class="cellClass(usedOn(room.id, d), room.units)">
                  {{ usedOn(room.id, d) }}/{{ room.units }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="mb-3 text-lg font-semibold">{{ t('admin.bookings') }} · {{ t('admin.count', { n: sorted.length }) }}</h2>
        <p v-if="sorted.length === 0" class="rounded-xl bg-white p-6">{{ t('admin.empty') }}</p>
        <div v-else class="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table class="w-full min-w-[720px] text-left text-sm">
            <thead class="bg-sand-100 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th class="p-3">{{ t('admin.ref') }}</th>
                <th class="p-3">{{ t('admin.guest') }}</th>
                <th class="p-3">{{ t('admin.room') }}</th>
                <th class="p-3">{{ t('admin.stay') }}</th>
                <th class="p-3">{{ t('admin.total') }}</th>
                <th class="p-3">{{ t('admin.status') }}</th>
                <th class="p-3" />
              </tr>
            </thead>
            <tbody>
              <tr v-for="b in sorted" :key="b.ref" class="border-t border-sand-200">
                <td class="p-3 font-mono text-xs">{{ b.ref }}</td>
                <td class="p-3">{{ b.name }}</td>
                <td class="p-3">{{ getRoom(b.roomId)?.name[lang] }}</td>
                <td class="p-3">{{ b.checkIn }} → {{ b.checkOut }}</td>
                <td class="p-3">{{ b.total }}€</td>
                <td class="p-3" :class="b.status === 'cancelled' ? 'text-slate-400' : 'text-olive-700'">
                  {{ t(`admin.${b.status}`) }}
                </td>
                <td class="p-3 text-right">
                  <button v-if="b.status === 'confirmed'" type="button" class="text-xs font-semibold text-clay-600 underline" @click="cancel(b.ref)">
                    {{ t('admin.cancel') }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
  </div>
</template>
