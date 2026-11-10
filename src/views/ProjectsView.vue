<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageHeader from '@/components/ui/PageHeader.vue'
import QuoteCta from '@/components/ui/QuoteCta.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import { getPage } from '@/seo/head'

const { t, locale } = useI18n()
const h1 = () => getPage('projects')?.[locale.value === 'en' ? 'en' : 'el'].h1 ?? ''
</script>

<template>
  <div>
    <PageHeader :tag="t('projectsPage.tag')" :title="h1()" :lead="t('projectsPage.lead')" />
    <ProjectsSection hide-heading />
    <QuoteCta :title="t('caseStudy.ctaTitle')" :text="t('caseStudy.ctaText')" source="projects" />
  </div>
</template>
