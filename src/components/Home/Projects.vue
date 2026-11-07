<template>
  <section id="PROJECTS" tabindex="-1" class="contain content-section projects-section" :class="{'projects-page': all}">
    <div class="section-intro"><div><p class="eyebrow">01 / Selected work</p><component :is="all ? 'h1' : 'h2'" class="projects-title">Ideas, put into practice.</component></div><p>Explore the applications, analysis and research behind my skills.</p></div>
    <div class="project-toolbar"><div class="project-filters" role="group" aria-label="Filter projects by discipline"><button v-for="filter in filters" :key="filter.name" type="button" :aria-pressed="selected === filter.name" @click="selected = filter.name">{{ filter.name }}</button></div><p class="project-count" role="status" aria-live="polite">{{ visibleProjects.length }} {{ visibleProjects.length === 1 ? 'project' : 'projects' }}</p></div>
    <div class="project-grid">
      <article v-for="project in visibleProjects" :key="project.id" class="project-card">
        <a :href="project.url || project.repository" class="project-visual" target="_blank" rel="noopener noreferrer" :aria-label="`Explore ${project.name} (opens in a new tab)`">
          <div class="browser-bar" aria-hidden="true"><span class="browser-dots"><i></i><i></i><i></i></span><span>{{ projectHost(project) }}</span><span>↗</span></div>
          <div class="project-image"><img :src="project.photo" :alt="`${project.name} preview`" loading="lazy" width="800" height="500"/></div>
        </a>
        <div class="project-body">
          <p class="eyebrow">{{ project.for }} <span class="project-year">{{ project.date }}</span></p>
          <h3>{{ project.name }}</h3>
          <p class="project-description">{{ project.description }}</p>
          <ul class="project-tools" aria-label="Technologies used"><li v-for="skill in project.skills" :key="skill"><img v-if="skillMap[skill.toLowerCase()]" :src="skillMap[skill.toLowerCase()]" alt="" width="16" height="16" loading="lazy"/>{{ skill }}</li></ul>
          <div class="project-links"><a v-if="project.url" :href="project.url" class="text-link" target="_blank" rel="noopener noreferrer">{{ project.id === 4 ? 'Platform website' : 'Live project' }} <span aria-hidden="true">↗</span></a><a v-if="project.repository" :href="project.repository" class="text-link" target="_blank" rel="noopener noreferrer">View source <span aria-hidden="true">↗</span></a></div>
        </div>
      </article>
    </div>
  </section>
</template>
<script setup lang="ts">
import {works, skills} from '~/config/data/data'
defineProps({all: {type: Boolean, default: false}})
const filters = [{name:'All work', ids:[1,2,3,4]}, {name:'Software',ids:[4]}, {name:'Data',ids:[2,3]}, {name:'IoT',ids:[1]}]
const projectHost = (project: {url: string}) => project.url ? new URL(project.url).hostname : 'github.com / analysis'
const selected = ref('All work')
const visibleProjects = computed(() => works.filter(project => filters.find(filter => filter.name === selected.value)!.ids.includes(project.id)))
const skillMap = Object.fromEntries(Object.values(skills).flat().map(skill => [skill.name.toLowerCase(),skill.logo]))
</script>
<style scoped>
.projects-section { overflow-anchor:none; }
.projects-page { padding-top:140px; }
.projects-title { margin-top:8px; font-size:clamp(2rem,4vw,3rem); line-height:1.1; letter-spacing:-.045em; font-weight:600; }
.project-toolbar { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:24px; }
.project-filters { display:flex; flex-wrap:wrap; gap:6px; padding:5px; border:1px solid var(--line); background:var(--surface); border-radius:12px; }
.project-filters button { border:0; border-radius:8px; background:transparent; color:var(--muted); font-size:.78rem; font-weight:600; min-height:44px; padding:8px 16px; transition:background .18s,color .18s; }
.project-filters button[aria-pressed=true] { background:var(--ink); color:var(--page); }
.project-filters button:hover:not([aria-pressed=true]) { background:var(--soft); color:var(--ink); }
.project-count { font-size:.75rem; color:var(--muted); }
.project-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:28px; align-items:stretch; }
.project-card { min-width:0; display:flex; flex-direction:column; border:1px solid var(--line); border-radius:var(--radius); background:var(--surface); overflow:hidden; transition:border-color .2s,box-shadow .2s; }
.project-visual { display:block; margin:14px 14px 0; border:1px solid var(--line); border-radius:10px; overflow:hidden; color:var(--muted); background:var(--soft); }
.browser-bar { display:flex; align-items:center; justify-content:space-between; gap:10px; height:34px; padding:0 12px; font-size:.62rem; border-bottom:1px solid var(--line); }
.browser-dots { display:flex; gap:4px; } .browser-dots i { width:5px; height:5px; border:1px solid #a2b0b8; border-radius:50%; }
.project-image { aspect-ratio:1.77778; overflow:hidden; }
.project-image img { width:100%; height:100%; object-fit:contain; object-position:top; transition:transform .35s; }
.project-body { padding:26px; display:flex; flex-direction:column; flex:1; }
.project-body > .eyebrow { display:flex; justify-content:space-between; gap:12px; font-size:.64rem; }
.project-year { letter-spacing:0; flex-shrink:0; }
h3 { margin-top:12px; font-size:1.45rem; letter-spacing:-.035em; line-height:1.25; font-weight:600; }
.project-description { margin-top:16px; font-size:.875rem; line-height:1.8; color:var(--muted); }
.project-tools { display:flex; flex-wrap:wrap; gap:6px; margin-top:20px; padding:0; list-style:none; }
.project-tools li { display:flex; align-items:center; gap:6px; font-size:.66rem; padding:5px 7px; border:1px solid var(--line); border-radius:5px; line-height:1.3; color:var(--muted); }
.project-tools img { width:14px; height:14px; object-fit:contain; }
.project-links { display:flex; gap:24px; border-top:1px solid var(--line); padding-top:12px; margin-top:auto; }
.project-tools { padding-bottom:20px; }
@media(hover:hover) { .project-card:hover { border-color:#91b2c1; box-shadow:var(--shadow); } .project-visual:hover img { transform:scale(1.025); } }
@media(max-width:767px) { .project-grid { grid-template-columns:1fr; gap:24px; } .project-body { padding:22px; } .project-toolbar { align-items:end; } .project-filters { gap:2px; } .project-filters button { padding:8px 11px; } .project-count { font-size:.66rem; white-space:nowrap; } h3 {font-size:1.35rem;} }
@media(max-width:479px) { .project-toolbar { flex-direction:column; align-items:stretch; gap:10px; } .project-filters { justify-content:space-between; flex-wrap:nowrap; } .project-count { align-self:flex-end; } }
@media(prefers-reduced-motion:reduce) { .project-visual:hover img { transform:none; } }
</style>
