<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { services } from '@/data/services'
import { pick } from '@/lib/l10n'
import { useLocalePath } from '@/composables/useLocalePath'

const { t, locale } = useI18n()
const { to } = useLocalePath()

// One highlight bar that travels to whichever row the pointer or keyboard is on.
const listRef = ref<HTMLElement | null>(null)
const highlight = reactive({ top: 0, height: 0, visible: false })

const moveHighlight = (event: Event): void => {
  const row = (event.currentTarget as HTMLElement | null)?.closest('li')
  if (!row) return
  highlight.top = row.offsetTop
  highlight.height = row.offsetHeight
  highlight.visible = true
}

const hideHighlight = (): void => {
  highlight.visible = false
}
</script>

<template>
  <section id="services" class="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28">
    <div class="mb-10 flex flex-wrap items-end justify-between gap-4">
      <h2 class="section-title">{{ t('servicesPage.teaserTitle') }}</h2>
      <router-link :to="to('services')" class="text-link text-base font-medium text-slate-200">
        {{ t('cta.allServices') }}
      </router-link>
    </div>

    <ul ref="listRef" class="relative border-b border-white/10" @pointerleave="hideHighlight" @focusout="hideHighlight">
      <li
        class="service-highlight"
        :class="{ 'is-visible': highlight.visible }"
        :style="{ transform: `translateY(${highlight.top}px)`, height: `${highlight.height}px` }"
        aria-hidden="true"
      />
      <li v-for="service in services" :key="service.id" class="relative border-t border-white/10">
        <router-link
          :to="to('services', {}, `#${service.id}`)"
          class="clickable grid gap-x-8 gap-y-2 px-3 py-6 sm:px-5 md:grid-cols-12 md:items-baseline md:py-7"
          @pointerenter="moveHighlight"
          @focus="moveHighlight"
        >
          <h3 class="text-xl font-semibold tracking-tight text-white md:col-span-4 md:text-2xl">
            {{ pick(service.title, locale) }}
          </h3>
          <p class="text-[0.95rem] leading-relaxed text-slate-400 md:col-span-6">
            {{ pick(service.summary, locale) }}
          </p>
          <p class="text-sm font-medium text-slate-200 md:col-span-2 md:text-right md:text-base">
            <template v-if="service.priceFrom !== null">{{ t('servicesPage.from') }} {{ service.priceFrom }}€</template>
            <template v-else>{{ t('servicesPage.onRequest') }}</template>
          </p>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.service-highlight {
  position: absolute;
  inset-inline: 0;
  top: 0;
  border-left: 2px solid #22d3ee;
  background: rgba(34, 211, 238, 0.07);
  opacity: 0;
  pointer-events: none;
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.2s ease;
}

.service-highlight.is-visible {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .service-highlight {
    transition: opacity 0.2s ease;
  }
}
</style>
