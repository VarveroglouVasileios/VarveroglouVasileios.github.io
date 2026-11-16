<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ContactLinks from '@/components/ui/ContactLinks.vue'
import { useLocalePath } from '@/composables/useLocalePath'
import { useMagneticHover } from '@/composables/useMagneticHover'
import { trackEvent } from '@/lib/analytics'

const props = defineProps<{
  title: string
  text: string
  /** Pre-selects the service in the contact form. */
  service?: string
  source: string
}>()

const { t } = useI18n()
const { to } = useLocalePath()
const { attach } = useMagneticHover()
const magnetRef = ref<HTMLElement | null>(null)

const quoteTo = () => to('contact', {}, undefined, props.service ? { service: props.service } : undefined)

onMounted(() => {
  if (magnetRef.value) attach(magnetRef.value)
})
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
    <div class="grid gap-10 border-t border-white/15 pt-12 lg:grid-cols-12 lg:items-end">
      <div class="lg:col-span-7">
        <h2 class="section-title text-balance">{{ title }}</h2>
        <p class="mt-5 max-w-xl text-lg text-slate-300">{{ text }}</p>
      </div>
      <div class="lg:col-span-5">
        <span ref="magnetRef" class="inline-block">
          <router-link
            :to="quoteTo()"
            class="btn-primary clickable px-8 py-4 text-lg"
            @click="trackEvent('Quote CTA', { source })"
          >
            {{ t('cta.quote') }}
          </router-link>
        </span>
        <div class="mt-6">
          <ContactLinks :source="source" />
        </div>
      </div>
    </div>
  </section>
</template>
