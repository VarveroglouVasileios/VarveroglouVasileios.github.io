<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import DeferredBackground3D from '@/components/DeferredBackground3D.vue'
import Footer from '@/components/layout/Footer.vue'
import TopNav from '@/components/layout/TopNav.vue'
import CustomCursor from '@/components/ui/global/CustomCursor.vue'
import SecurityTerminal from '@/components/ui/global/SecurityTerminal.vue'
import ConsentBanner from '@/components/ui/ConsentBanner.vue'

const { locale, t } = useI18n()

/** Moves focus to the main content so keyboard and screen reader users can bypass the navigation. */
const skipToMain = (): void => {
  const main = document.getElementById('main-content')
  main?.focus()
  main?.scrollIntoView({ block: 'start' })
}

const updateDocumentLang = (lang: string) => {
  document.documentElement.lang = lang
}

watch(locale, (newLocale) => {
  updateDocumentLang(newLocale)
})

onMounted(() => {
  updateDocumentLang(locale.value)
})
</script>

<template>
  <div class="relative min-h-screen text-slate-100 bg-slate-950">
    <a href="#main-content" class="skip-link" @click.prevent="skipToMain">{{ t('a11y.skip') }}</a>
    <DeferredBackground3D />
    <CustomCursor />
    <SecurityTerminal />
    <TopNav />
    <main
      id="main-content"
      tabindex="-1"
      class="relative z-[5] pt-[calc(7rem+env(safe-area-inset-top,0px))] outline-none"
    >
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
    <ConsentBanner />
  </div>
</template>

<style>
/* Global resets */
* {
  box-sizing: border-box;
}

html {
  background: #020617;
  scroll-behavior: smooth;
}

.skip-link {
  position: fixed;
  left: 1rem;
  top: 1rem;
  z-index: 40000;
  transform: translateY(-200%);
  border-radius: 0.5rem;
  background: #22d3ee;
  color: #020617;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  transition: transform 0.15s ease;
}

.skip-link:focus {
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  html:root {
    scroll-behavior: auto;
  }

  .page-enter-active,
  .page-leave-active,
  .skip-link {
    transition: none;
  }
}

.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(14px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
