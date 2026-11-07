<template>
  <div class="max-w-5xl">
    <p class="mb-4 text-sm font-semibold tracking-wide text-gray-600 dark:text-gray-300">Launceston, Tasmania · University of Tasmania graduate</p>
    <h1 class="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-6xl">Tanvir Rahman<span class="mt-3 block text-2xl text-primary sm:text-4xl">Software. Data. Practical IT support.</span></h1>
    <p class="mt-5 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">{{ siteData.hero.subheadline }}</p>
    <div class="mt-5 flex flex-wrap gap-2">
      <span v-for="tag in siteData.hero.headlineTags" :key="tag" class="rounded-full border border-sky-300 bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-900 dark:border-sky-700 dark:bg-sky-950 dark:text-sky-200">{{ tag }}</span>
    </div>
    <div class="mt-7 flex flex-wrap gap-3">
      <a href="#PROJECTS" @click.prevent="scrollTo('PROJECTS')" class="hero-action hero-action-primary">Explore my work <span aria-hidden="true">↗</span></a>
      <a :href="siteData.cvLink" class="hero-action" target="_blank" rel="noopener noreferrer">Download CV <span aria-hidden="true">↓</span></a>
      <a :href="`mailto:${siteData.email}`" class="hero-action">Email me</a>
      <a :href="siteData.github" class="hero-action" target="_blank" rel="noopener noreferrer">GitHub</a>
    </div>
    <dl class="mt-8 grid gap-5 border-t border-gray-300/70 pt-5 dark:border-gray-700 sm:grid-cols-3">
      <div v-for="item in siteData.hero.impacts" :key="item.label">
        <dt class="text-lg font-semibold text-gray-900 dark:text-white">{{ item.value }}</dt>
        <dd class="mt-1 max-w-[28ch] text-sm leading-6 text-gray-600 dark:text-gray-300">{{ item.label }}</dd>
      </div>
    </dl>
  </div>
</template>
<script setup lang="ts">
import siteData from '~/config/data/data'
const {scrollTo} = useScrollTo()
</script>
<style scoped>
.hero-action { display:inline-flex; align-items:center; gap:.7rem; border:1px solid #64748b; border-radius:999px; padding:.7rem 1.15rem; font-size:.9rem; font-weight:600; transition:transform .2s; }
.hero-action:hover { transform:translateY(-2px); }
.hero-action:focus-visible { outline:3px solid #0284c7; outline-offset:4px; }
.hero-action-primary { background:#0369a1; color:white; border-color:#0369a1; }
</style>
