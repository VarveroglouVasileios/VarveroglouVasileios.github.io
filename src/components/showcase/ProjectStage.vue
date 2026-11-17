<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BrowserFrame, { type FrameDevice, type FrameMode } from '@/components/showcase/BrowserFrame.vue'
import type { Project } from '@/types/portfolio'
import { trackEvent } from '@/lib/analytics'

const props = defineProps<{
  project: Project
  /** Narrow containers start the live view at phone width. */
  compact?: boolean
}>()

const emit = defineEmits<{ (event: 'mode', mode: FrameMode): void }>()

const { t } = useI18n()

const mode = ref<FrameMode>('preview')
const device = ref<FrameDevice>(props.compact ? 'mobile' : 'desktop')

const canEmbed = computed(() => props.project.embeddable !== false)

const tabs = computed(() => {
  const list: Array<{ id: FrameMode; label: string }> = [{ id: 'preview', label: t('showcase.preview') }]
  if (canEmbed.value) list.push({ id: 'live', label: props.compact ? t('showcase.liveShort') : t('showcase.live') })
  if (props.project.breakdown) list.push({ id: 'how', label: t('showcase.how') })
  return list
})

const setMode = (next: FrameMode): void => {
  mode.value = next
  if (next === 'live') trackEvent('Project live preview', { project: props.project.slug ?? String(props.project.id) })
}

watch(mode, (value) => emit('mode', value))

// A different project always starts from its preview.
watch(
  () => props.project.id,
  () => {
    mode.value = 'preview'
  },
)
</script>

<template>
  <div>
    <BrowserFrame
      :title="project.title"
      :image-url="project.imageUrl"
      :live-url="project.liveUrl"
      :mode="mode"
      :device="device"
      :loading-label="t('showcase.loading')"
      :open-label="t('showcase.openNew')"
    >
      <template #how>
        <dl v-if="project.breakdown" class="grid gap-5 text-sm leading-relaxed text-slate-300 sm:grid-cols-3">
          <div>
            <dt class="mb-1.5 font-semibold text-cyan-300">{{ t('projects.breakdown.architecture') }}</dt>
            <dd>{{ project.breakdown.architecture }}</dd>
          </div>
          <div>
            <dt class="mb-1.5 font-semibold text-amber-300">{{ t('projects.breakdown.security') }}</dt>
            <dd>{{ project.breakdown.security }}</dd>
          </div>
          <div>
            <dt class="mb-1.5 font-semibold text-violet-300">{{ t('projects.breakdown.challenges') }}</dt>
            <dd>{{ project.breakdown.challenges }}</dd>
          </div>
        </dl>
      </template>
    </BrowserFrame>

    <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap gap-1 rounded-full border border-white/10 bg-slate-900/70 p-1" role="group">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="clickable rounded-full px-3 py-2 text-sm font-medium transition sm:px-4"
          :class="
            mode === tab.id
              ? 'bg-cyan-400 text-slate-950'
              : 'text-slate-300 hover:bg-white/5 hover:text-white'
          "
          :aria-pressed="mode === tab.id"
          @click="setMode(tab.id)"
        >
          {{ tab.label }}
        </button>
      </div>

      <div
        v-if="mode === 'live'"
        class="flex gap-1 rounded-full border border-white/10 bg-slate-900/70 p-1"
        role="group"
        :aria-label="t('showcase.device')"
      >
        <button
          v-for="option in (['desktop', 'mobile'] as const)"
          :key="option"
          type="button"
          class="clickable rounded-full px-3 py-2 text-sm font-medium transition"
          :class="device === option ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'"
          :aria-pressed="device === option"
          @click="device = option"
        >
          {{ t(`showcase.${option}`) }}
        </button>
      </div>
    </div>

    <p v-if="mode === 'live'" class="mt-3 text-sm text-slate-400">{{ t('showcase.liveHint') }}</p>
  </div>
</template>
