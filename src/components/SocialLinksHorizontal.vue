<template>
  <div v-if="siteData.socials.length">
    <p class="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Follow me</p>
    <div class="flex flex-wrap gap-3">
      <a
        v-for="social in siteData.socials"
        :key="social.name"
        :href="social.link"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-11 items-center gap-2 rounded-full border border-sky-400/25 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-sky-400/60 hover:text-sky-300"
        :aria-label="`Visit my ${social.name} profile`"
      >
        <img :src="social.icon" alt="" class="h-5 w-5 brightness-0 invert" aria-hidden="true"/>
        <span>{{ social.name }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import siteData from "~/config/data/data";
</script>
