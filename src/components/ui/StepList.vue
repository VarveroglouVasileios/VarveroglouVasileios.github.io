<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { AuditCheck } from '@/data/securityAudit'
import { pick } from '@/lib/l10n'

defineProps<{ steps: AuditCheck[] }>()

const { locale } = useI18n()
</script>

<template>
  <!-- A real sequence: the step titles carry their own numbers. -->
  <ol class="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
    <li v-for="step in steps" :key="step.title.en" class="border-t-2 border-cyan-400/70 pt-5">
      <h3 class="mb-2 text-lg font-semibold text-white">{{ pick(step.title, locale) }}</h3>
      <p class="leading-relaxed text-slate-400">{{ pick(step.description, locale) }}</p>
    </li>
  </ol>
</template>
