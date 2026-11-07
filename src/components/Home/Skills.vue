<template>
  <section id="SKILLS" tabindex="-1" class="contain content-section">
    <div class="section-intro"><div><p class="eyebrow">04 / Skills</p><h2>My working toolkit.</h2></div><p>Tools and practices used across my experience and projects.</p></div>
    <div class="skills-grid"><article v-for="(category,name,index) in skills" :key="name"><div class="skill-heading"><span class="eyebrow">0{{ index+1 }}</span><h3>{{ name }}</h3></div><ul><li v-for="skill in category.filter(item => item.featured)" :key="skill.name"><img v-if="skill.logo" :src="skill.logo" alt="" width="20" height="20" loading="lazy" :class="{'github-logo':skill.logo.includes('github')}"/><span>{{ skill.name }}</span></li></ul></article></div>
  </section>
</template>
<script setup lang="ts">
import {skills} from '~/config/data/data'
</script>
<style scoped>
.skills-grid {display:grid;grid-template-columns:1fr 1fr;gap:24px}
article {padding:28px;border:1px solid var(--line);border-radius:16px;background:var(--surface)}
.skill-heading {display:flex;gap:14px;align-items:baseline;padding-bottom:20px;border-bottom:1px solid var(--line)}
h3 {font-size:1.05rem;font-weight:600;line-height:1.4;letter-spacing:-.025em}
ul {display:flex;flex-wrap:wrap;gap:8px;list-style:none;padding:20px 0 0}
li {display:flex;align-items:center;gap:8px;background:var(--soft);padding:8px 10px;border-radius:6px;font-size:.75rem;color:var(--muted);line-height:1.4}
li img {width:18px;height:18px;object-fit:contain}
:global(.dark .github-logo) {filter:invert(1)}
@media(max-width:767px){.skills-grid{grid-template-columns:1fr}article{padding:22px}}
</style>
