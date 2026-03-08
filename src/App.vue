<script setup lang="ts">
/**
 * App.vue — Cinematic scroll portfolio
 * Fixed TresCanvas background + scrollable HTML overlay.
 * GSAP ScrollTrigger drives 3D device rotation/scale per scroll.
 */
import { TresCanvas } from '@tresjs/core'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Scene from '@/components/Scene.vue'
import { projects } from '@/data/projects'
import { useScrollTrigger } from '@/composables/useScrollTrigger'

const canvasReady = ref(false)
onMounted(() => {
  canvasReady.value = true
})

const { cleanup } = useScrollTrigger(projects.length)
onBeforeUnmount(() => cleanup())
</script>

<template>
  <div class="relative min-h-screen w-full isolate">
    <!-- Canvas in background layer -->
    <div v-if="canvasReady" class="fixed inset-0 -z-10 h-full w-full">
      <TresCanvas
        class="h-full w-full"
        clear-color="#0f172a"
      :alpha="false"
      power-preference="high-performance"
      :antialias="true"
      >
        <Scene :projects="projects" />
      </TresCanvas>
    </div>

    <!-- Content overlay on top -->
    <main class="relative z-10 min-h-screen w-full">
      <!-- Hero -->
      <section
        class="flex min-h-screen flex-col justify-center px-8 pb-24 pt-32 md:px-16 lg:px-24"
        data-scroll-section
      >
        <div
          class="max-w-2xl rounded-2xl border border-white/30 bg-slate-900/95 px-8 py-10 shadow-xl backdrop-blur-md"
        >
          <p class="mb-2 font-mono text-sm text-cyan-400">Developer & Creator</p>
          <h1 class="mb-4 text-5xl font-light tracking-tight text-white md:text-6xl lg:text-7xl" style="color: #ffffff;">
            Your Name
          </h1>
          <p class="text-lg leading-relaxed text-slate-400">
            I build web experiences that are fast, elegant, and user-focused.
          </p>
        </div>
      </section>

      <!-- Projects -->
      <section
        v-for="(project, i) in projects"
        :key="project.id"
        class="flex min-h-screen items-center px-8 py-24 md:px-16 lg:px-24"
        data-scroll-section
        data-project
      >
        <div
          class="max-w-2xl rounded-2xl border border-white/30 bg-slate-900/95 px-8 py-10 shadow-xl backdrop-blur-md"
        >
          <span class="font-mono text-xs text-slate-500">{{ String(i + 1).padStart(2, '0') }}</span>
          <h2 class="mt-2 text-4xl font-light tracking-tight text-white md:text-5xl">
            {{ project.title }}
          </h2>
          <p class="mt-4 text-slate-400">{{ project.description }}</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="tech in project.techStack"
              :key="tech"
              class="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300"
            >
              {{ tech }}
            </span>
          </div>
          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-flex items-center gap-2 text-cyan-400 transition hover:text-cyan-300"
          >
            View project
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </section>

      <!-- Contact -->
      <section
        class="flex min-h-screen items-center px-8 py-24 md:px-16 lg:px-24"
        data-scroll-section
      >
        <div
          class="max-w-2xl rounded-2xl border border-white/30 bg-slate-900/95 px-8 py-10 shadow-xl backdrop-blur-md"
        >
          <h2 class="mb-4 text-4xl font-light tracking-tight text-white md:text-5xl">
            Let's connect
          </h2>
          <p class="mb-8 text-slate-400">Open to collaborations and new opportunities.</p>
          <div class="flex gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-slate-400 transition hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-slate-400 transition hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hello@example.com"
              class="text-slate-400 transition hover:text-white"
            >
              Email
            </a>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
