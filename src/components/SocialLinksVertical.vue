<template>
  <div v-if="siteData.socials.length" class="flex flex-col items-center gap-3">
    <span class="h-12 w-px bg-sky-300/30"></span>
    <a
      v-for="social in siteData.socials"
      :key="social.name"
      :href="social.link"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sky-400/25 bg-slate-950/70 text-white transition hover:-translate-y-0.5 hover:border-sky-400/60 hover:text-sky-300"
      :aria-label="`Visit my ${social.name} profile`"
      :title="social.name"
    >
      <img :src="social.icon" alt="" class="h-5 w-5 brightness-0 invert" aria-hidden="true"/>
    </a>
  </div>
</template>

<script setup lang="ts">
import siteData from "~/config/data/data";
</script>
