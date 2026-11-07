<template>
  <div class="education-grid"><article v-for="education in educations" :key="education.title"><p class="education-date">{{ education.duration }}</p><h3>{{ education.title }}</h3><p class="education-institution">{{ education.institution }}</p><p class="education-description">{{ education.description }}</p></article></div>
</template>
<script setup lang="ts">
import {educations} from '~/config/data/data'
</script>
<style scoped>
.education-grid {display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:20px}
article {border:1px solid var(--line);border-radius:16px;padding:28px;background:var(--surface)}
.education-date {font-size:.72rem;color:var(--muted)}
h3 {margin-top:14px;font-size:1.2rem;font-weight:600;line-height:1.4;letter-spacing:-.025em}
.education-institution {font-size:.85rem;color:var(--accent);margin-top:8px}
.education-description {font-size:.85rem;line-height:1.8;color:var(--muted);margin-top:16px}
@media(max-width:767px){.education-grid{grid-template-columns:1fr}article{padding:22px}}
</style>
