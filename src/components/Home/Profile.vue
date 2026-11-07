<template>
  <section id="ABOUT" tabindex="-1" class="contain content-section">
    <div class="section-intro"><div><p class="eyebrow">03 / About</p><h2>The person behind the work.</h2></div></div>
    <HomeProfileExplorer/>
    <div class="profile-grid"><div class="profile-note"><span class="profile-monogram" aria-hidden="true">TR<span>↗</span></span><p>Based in Tasmania.<br/>Building with purpose.</p><a :href="siteData.socials[0].link" class="text-link" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <span aria-hidden="true">↗</span></a></div><div class="profile-body"><p v-for="(description,index) in siteData.about" :key="index">{{ description }}</p></div></div>
    <div class="education-block"><p class="eyebrow">Education &amp; academic recognition</p><EducationTimeline/></div>
  </section>
</template>
<script setup lang="ts">
import siteData from '~/config/data/data'
</script>
<style scoped>
.profile-grid { display:grid; grid-template-columns:240px 1fr; gap:48px; }
.profile-note p { margin-top:20px; font-size:1rem; line-height:1.7; color:var(--muted); letter-spacing:-.02em; }
.profile-monogram { position:relative; display:inline-flex; align-items:center; justify-content:center; height:90px; width:90px; border:1px solid var(--line); border-radius:18px; background:linear-gradient(140deg,var(--soft),var(--surface)); font-size:2rem; font-weight:500; letter-spacing:-.07em; }
.profile-monogram span { position:absolute; top:8px; right:10px; font-size:1rem; color:var(--accent); }
.profile-body p { font-size:.98rem; line-height:1.85; color:var(--muted); max-width:72ch; }
.profile-body p:first-child { font-size:1.15rem; line-height:1.75; color:var(--ink); letter-spacing:-.015em; }
.profile-body p+p {margin-top:18px}
.education-block { margin-top:48px; padding-top:32px; border-top:1px solid var(--line); }
@media(max-width:767px) { .profile-grid {grid-template-columns:1fr;gap:24px} .profile-note {display:none} .profile-body p {font-size:.92rem} .profile-body p:first-child {font-size:1.08rem} }
</style>
