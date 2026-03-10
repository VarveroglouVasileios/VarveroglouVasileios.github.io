<script setup lang="ts">
import { ref } from "vue";
import gsap from "gsap";
import type { Project } from "@/types/portfolio";

const props = defineProps<{
  project: Project;
}>();

const cardRef = ref<HTMLElement | null>(null);
const imageError = ref(false);
const supportsHover = window.matchMedia(
  "(hover: hover) and (pointer: fine)",
).matches;

const onImageError = (): void => {
  imageError.value = true;
};

const handleMove = (event: PointerEvent): void => {
  if (!supportsHover) {
    return;
  }
  const card = cardRef.value;
  if (!card) {
    return;
  }
  const bounds = card.getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;
  const rotateY = (x / bounds.width - 0.5) * 10;
  const rotateX = (0.5 - y / bounds.height) * 10;

  gsap.to(card, {
    rotateX,
    rotateY,
    transformPerspective: 900,
    duration: 0.22,
    ease: "power2.out",
  });
};

const resetTilt = (): void => {
  if (!supportsHover) {
    return;
  }
  if (!cardRef.value) {
    return;
  }
  gsap.to(cardRef.value, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.35,
    ease: "power3.out",
  });
};
</script>

<template>
  <article
    ref="cardRef"
    class="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/55 p-5 backdrop-blur-xl transition will-change-transform hover:border-cyan-300/45"
    @pointermove="handleMove"
    @pointerleave="resetTilt"
  >
    <div
      class="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-800/80"
    >
      <div class="relative aspect-[16/10] w-full min-h-[180px]">
        <img
          v-if="props.project.imageUrl && !imageError"
          :src="props.project.imageUrl"
          :alt="props.project.imageLabel"
          class="h-full w-full object-cover object-top"
          loading="lazy"
          @error="onImageError"
        />
        <div
          v-else
          class="flex h-full min-h-[180px] items-center justify-center rounded-xl border border-dashed border-cyan-300/30 p-8"
        >
          <span class="text-center text-sm text-slate-400">{{
            props.project.imageLabel
          }}</span>
        </div>
      </div>
    </div>

    <h3 class="mb-2 text-xl font-semibold text-white">
      {{ props.project.title }}
    </h3>
    <p class="mb-4 text-sm leading-relaxed text-slate-300">
      {{ props.project.description }}
    </p>

    <div class="mb-5 flex flex-wrap gap-2">
      <span
        v-for="tag in props.project.stack"
        :key="tag"
        class="rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200"
      >
        {{ tag }}
      </span>
    </div>

    <div class="mt-auto flex flex-wrap items-center gap-3 text-sm">
      <a
        :href="props.project.githubUrl"
        target="_blank"
        rel="noreferrer"
        class="rounded-full border border-white/20 px-4 py-2 text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200"
      >
        GitHub
      </a>
      <a
        :href="props.project.liveUrl"
        target="_blank"
        rel="noreferrer"
        class="rounded-full border border-cyan-300/40 bg-cyan-500/15 px-4 py-2 text-cyan-200 transition hover:bg-cyan-400/25"
      >
        Live Demo
      </a>
    </div>
  </article>
</template>
