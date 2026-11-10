<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useLocalePath } from "@/composables/useLocalePath";
import { trackEvent } from "@/lib/analytics";

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
/** Scroll read progress (0–100), όπως το παλιό “status” bar κάτω από το nav */
const scrollProgress = ref(0);

const { to } = useLocalePath();

const navLinks = [
  { name: "nav.services", route: "services" },
  { name: "nav.projects", route: "projects" },
  { name: "nav.security", route: "security-audit" },
  { name: "nav.about", route: "about" },
  { name: "nav.contact", route: "contact" },
];

const isActive = (name: string) =>
  route.name === name || (name === "projects" && route.name === "project");

const toggleLocale = () => {
  const next = locale.value === "en" ? "el" : "en";
  router.push({
    name: route.name as string,
    params: { ...route.params, locale: next === "en" ? "en" : undefined },
    query: route.query,
    hash: route.hash,
  });
};

const updateScrollState = () => {
  isScrolled.value = window.scrollY > 20;
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) {
    scrollProgress.value = 0;
    return;
  }
  scrollProgress.value = Math.min(
    100,
    Math.max(0, (scrollTop / docHeight) * 100)
  );
};

onMounted(() => {
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateScrollState);
  window.removeEventListener("resize", updateScrollState);
});

watch(
  () => route.fullPath,
  () => {
    isMobileMenuOpen.value = false;
    requestAnimationFrame(updateScrollState);
  }
);
</script>

<template>
  <nav
    class="fixed left-0 right-0 top-0 z-[100] border-b border-white/10 transition-all duration-300 pt-[env(safe-area-inset-top,0px)]"
    :class="[
      isScrolled
        ? 'bg-slate-950/80 py-4 backdrop-blur-lg'
        : 'bg-transparent py-6',
    ]"
  >
    <div
      class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
    >
      <router-link :to="to('home')" class="group flex items-center gap-2">
        <span
          class="text-xl font-bold tracking-tighter text-white sm:text-2xl uppercase"
        >
          VASILEIOS
          <span
            class="text-cyan-400 group-hover:text-cyan-300 transition-colors"
            >VARVEROGLOU</span
          >
        </span>
      </router-link>

      <!-- Desktop Nav -->
      <div class="hidden items-center gap-8 md:flex">
        <div class="flex items-center gap-6">
          <router-link
            v-for="link in navLinks"
            :key="link.name"
            :to="to(link.route)"
            class="text-xs font-medium tracking-[0.15em] text-slate-300 transition hover:text-cyan-300"
            :class="{ 'text-cyan-400': isActive(link.route) }"
          >
            {{ t(link.name) }}
          </router-link>
        </div>

        <div class="flex items-center gap-4 border-l border-white/10 pl-6">
          <button
            @click="toggleLocale"
            class="text-xs font-bold tracking-widest text-slate-400 transition hover:text-white"
          >
            {{ locale === "en" ? "ΕΛ" : "EN" }}
          </button>
          <router-link
            :to="to('contact')"
            class="rounded-full bg-cyan-400 px-5 py-2 text-xs font-bold tracking-wider text-slate-950 transition hover:bg-cyan-300"
            @click="trackEvent('Quote CTA', { source: 'nav' })"
          >
            {{ t("nav.quote") }}
          </router-link>
        </div>
      </div>

      <!-- Mobile Toggle -->
      <button
        class="flex h-12 w-12 flex-col items-center justify-center gap-1.5 md:hidden"
        :aria-label="t('nav.menu')"
        :aria-expanded="isMobileMenuOpen"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <div
          class="h-0.5 w-6 bg-slate-200 transition-transform"
          :class="{ 'translate-y-2 rotate-45': isMobileMenuOpen }"
        />
        <div
          class="h-0.5 w-6 bg-slate-200 transition-opacity"
          :class="{ 'opacity-0': isMobileMenuOpen }"
        />
        <div
          class="h-0.5 w-6 bg-slate-200 transition-transform"
          :class="{ '-translate-y-2 -rotate-45': isMobileMenuOpen }"
        />
      </button>
    </div>

    <div
      class="mx-auto mt-3 max-w-7xl px-4 sm:px-6"
      aria-hidden="true"
    >
      <div class="h-1.5 overflow-hidden rounded-full bg-slate-800/90">
        <div
          class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-[width] duration-150 ease-out"
          :style="{ width: `${scrollProgress}%` }"
        />
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="absolute left-0 right-0 top-full bg-slate-900/95 p-6 backdrop-blur-xl md:hidden"
      >
        <div class="flex flex-col gap-6">
          <router-link
            v-for="link in navLinks"
            :key="link.name"
            :to="to(link.route)"
            class="text-center text-sm font-semibold tracking-widest text-slate-200"
            @click="isMobileMenuOpen = false"
          >
            {{ t(link.name) }}
          </router-link>
          <div class="flex flex-col gap-4 border-t border-white/10 pt-6">
            <button
              @click="toggleLocale"
              class="text-center text-xs font-bold tracking-widest text-cyan-400"
            >
              {{ locale === "en" ? "ΕΛΛΗΝΙΚΑ" : "ENGLISH" }}
            </button>
            <router-link
              :to="to('contact')"
              class="rounded-xl bg-cyan-400 py-4 text-center text-xs font-bold tracking-widest text-slate-950"
              @click="isMobileMenuOpen = false; trackEvent('Quote CTA', { source: 'nav-mobile' })"
            >
              {{ t("nav.quote") }}
            </router-link>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>
