<template>
  <section id="EXPERIENCE" tabindex="-1" class="contain content-section experience-section">
    <div class="section-intro"><div><p class="eyebrow">02 / Experience</p><h2>Where I’ve contributed.</h2></div><p>Software delivery, research and the everyday systems people depend on.</p></div>
    <div class="experience-list">
      <article v-for="(experience,index) in experiences" :key="experience.company" class="experience-row">
        <div class="experience-meta"><span class="eyebrow">{{ experience.type }}</span><p>{{ experience.startDate }} — {{ experience.endDate }}</p><span v-if="index === 0" class="current-role">Current role</span></div>
        <div class="experience-content"><h3>{{ experience.title }}</h3><a v-if="experience.link" :href="experience.link" target="_blank" rel="noopener noreferrer" class="experience-company">{{ experience.company }} <span aria-hidden="true">↗</span></a><p v-else class="experience-company">{{ experience.company }}</p><p class="experience-description">{{ experience.description }}</p>
          <details :open="index === 1 || index === 2"><summary>Responsibilities &amp; tools <span aria-hidden="true">+</span></summary><div class="experience-details"><ul><li v-for="highlight in experience.highlights" :key="highlight">{{ highlight }}</li></ul><div class="experience-skills"><span v-for="skill in experience.skills" :key="skill">{{ skill }}</span></div><div v-if="experience.projectLinks?.length" class="experience-projects"><a v-for="project in experience.projectLinks" :key="project.name" :href="project.url" class="text-link" target="_blank" rel="noopener noreferrer">{{ project.name }} <span aria-hidden="true">↗</span></a></div></div></details>
        </div>
      </article>
    </div>
  </section>
</template>
<script setup lang="ts">
import {experiences} from '~/config/data/data'
</script>
<style scoped>
.experience-list { border-top:1px solid var(--line); }
.experience-row { display:grid; grid-template-columns:240px 1fr; gap:48px; padding:36px 0; border-bottom:1px solid var(--line); }
.experience-meta p { margin-top:10px; color:var(--muted); font-size:.82rem; line-height:1.7; }
.current-role { display:inline-flex; align-items:center; gap:7px; color:var(--accent); background:var(--soft); margin-top:14px; border-radius:5px; padding:5px 9px; font-size:.68rem; font-weight:600; }
.current-role::before { content:''; width:5px; height:5px; border-radius:50%; background:currentColor; }
h3 { font-size:1.4rem; line-height:1.3; letter-spacing:-.035em; font-weight:600; }
.experience-company { display:block; margin-top:6px; font-size:.9rem; line-height:1.6; color:var(--accent); }
.experience-description { margin-top:16px; font-size:.94rem; line-height:1.8; color:var(--muted); max-width:72ch; }
details { margin-top:16px; }
summary { min-height:48px; display:flex; align-items:center; justify-content:space-between; gap:20px; list-style:none; padding:12px 0; border-top:1px solid var(--line); font-size:.78rem; font-weight:600; cursor:pointer; }
summary::-webkit-details-marker { display:none; } summary > span {font-size:1.3rem; font-weight:400;} details[open] summary>span { transform:rotate(45deg); }
.experience-details ul { list-style:disc; padding-left:18px; color:var(--muted); font-size:.86rem; line-height:1.85; }
.experience-details li+li { margin-top:6px; }
.experience-skills { display:flex; gap:7px; flex-wrap:wrap; margin-top:18px; }
.experience-skills span { font-size:.67rem; color:var(--muted); background:var(--soft); border-radius:4px; padding:5px 8px; }
.experience-projects { display:flex; gap:20px; margin-top:8px; }
@media(max-width:767px) { .experience-row { grid-template-columns:1fr; gap:16px; padding:28px 0; } .experience-meta { display:flex; flex-wrap:wrap; align-items:center; gap:10px 16px; } .experience-meta p,.current-role {margin:0} .experience-meta .eyebrow {font-size:.65rem} h3{font-size:1.3rem} }
</style>
