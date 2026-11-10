<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { MAX_PARTY, todayIso, validateSearch } from '@/lib/reservations'

const { t } = useI18n()
const router = useRouter()
const minDate = ref(todayIso())
const date = ref(minDate.value)
const party = ref(2)
const checked = ref(false)
const error = computed(() => (checked.value || party.value > MAX_PARTY) ? validateSearch(date.value, party.value) : undefined)

function search() {
  checked.value = true
  minDate.value = todayIso()
  if (!error.value) void router.push({ name: 'book', query: { date: date.value, party: party.value } })
}
</script>

<template>
  <form class="quick-book" novalidate @submit.prevent="search">
    <div class="quick-fields">
      <div class="field">
        <label for="quick-date">{{ t('book.date') }}</label>
        <input id="quick-date" v-model="date" type="date" :min="minDate" required
          :aria-invalid="error === 'date' || error === 'past'" :aria-describedby="error === 'date' || error === 'past' ? 'quick-error' : undefined" />
      </div>
      <div class="field">
        <label for="quick-party">{{ t('book.party') }}</label>
        <select id="quick-party" v-model="party" :aria-invalid="error === 'largeParty'" :aria-describedby="error === 'largeParty' ? 'quick-error' : undefined">
          <option v-for="size in MAX_PARTY" :key="size" :value="size">{{ size }}</option>
          <option :value="MAX_PARTY + 1">{{ t('book.more') }}</option>
        </select>
      </div>
      <button class="button button-primary" type="submit">{{ t('home.find') }}</button>
    </div>
    <p v-if="error" id="quick-error" class="field-error" role="alert">{{ t(`error.${error}`) }}</p>
  </form>
</template>
