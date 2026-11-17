<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import TechIcon from '@/components/ui/TechIcon.vue'
import { techSkills } from '@/data/portfolio'

defineProps<{ hideHeading?: boolean }>()

const { t } = useI18n()
</script>

<template>
  <section id="about" class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
    <div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
      <div class="min-w-0 lg:col-span-7">
        <h2 v-if="!hideHeading" class="section-title mb-8 text-balance" data-reveal>{{ t('about.title') }}</h2>
        <div class="max-w-2xl space-y-5 text-base leading-relaxed text-slate-300 sm:text-lg" data-reveal>
          <p>{{ t('about.p1') }}</p>
          <p>{{ t('about.p2') }}</p>
        </div>
      </div>

      <div class="min-w-0 lg:col-span-5">
        <h3 class="mb-6 border-t border-white/10 pt-5 text-base font-semibold text-white">{{ t('about.techStack') }}</h3>
        <ul class="grid grid-cols-1 gap-x-6 gap-y-4 min-[380px]:grid-cols-2">
          <li v-for="skill in techSkills" :key="skill.name" class="min-w-0">
            <TechIcon :skill="skill" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
