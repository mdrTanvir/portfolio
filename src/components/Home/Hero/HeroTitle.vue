<template>
  <div>
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow hero-location"><span aria-hidden="true"></span> Launceston, Tasmania · IT graduate</p>
        <h1>Tanvir Rahman<span>Software, data<br/>and support.<br/><em>Built around people.</em></span></h1>
        <p class="hero-description">{{ siteData.hero.subheadline }}</p>
        <div class="hero-tags"><span v-for="tag in siteData.hero.headlineTags" :key="tag">{{ tag }}</span></div>
        <div class="hero-actions">
          <a href="/#PROJECTS" @click.prevent="scrollTo('PROJECTS')" class="action action-primary">Explore my work <span aria-hidden="true">↗</span></a>
          <a :href="siteData.cvLink" download aria-label="Download CV (PDF)" class="action">Download CV <span aria-hidden="true">↓</span></a>
        </div>
        <div class="hero-socials"><a :href="`mailto:${siteData.email}`" class="text-link">Email me <span aria-hidden="true">↗</span></a><a :href="siteData.github" class="text-link" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a><a :href="siteData.socials[0].link" class="text-link" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></div>
      </div>
      <a class="featured-work" :href="featured.url" target="_blank" rel="noopener noreferrer" :aria-label="`Explore ${featured.name} live dashboard (opens in a new tab)`">
        <div class="featured-header"><span class="eyebrow">A closer look at my work</span><span class="featured-arrow" aria-hidden="true">↗</span></div>
        <div class="featured-image"><img :src="featured.photo" :alt="`${featured.name} dashboard preview`" width="800" height="500" fetchpriority="high"/></div>
        <div class="featured-caption"><span class="eyebrow">Data analytics · {{ featured.date }}</span><h2>{{ featured.name }}</h2><p>207 countries. Reproducible analysis.</p><span class="featured-stack">Python / Pandas / Scikit-learn</span></div>
        <div class="featured-bottom"><span>Explore the live project</span><span aria-hidden="true">↗</span></div>
      </a>
    </div>
    <dl class="hero-proof"><div v-for="(item,index) in siteData.hero.impacts" :key="item.label"><span class="proof-index" aria-hidden="true">0{{ index+1 }}</span><div><dt>{{ item.value }}</dt><dd>{{ item.label }}</dd></div></div></dl>
  </div>
</template>
<script setup lang="ts">
import siteData, {works} from '~/config/data/data'
const {scrollTo} = useScrollTo()
const featured = works[1]
</script>
<style scoped>
.hero-grid { display:grid; grid-template-columns:1.2fr 1fr; gap:clamp(40px,6vw,90px); align-items:center; }
.hero-location { display:flex; align-items:center; gap:8px; letter-spacing:.08em; font-size:.68rem; }
.hero-location > span { height:6px; width:6px; background:var(--accent); border-radius:50%; flex-shrink:0; }
h1 { margin-top:20px; font-size:clamp(2.2rem,3.8vw,3.3rem); line-height:1.03; font-weight:650; letter-spacing:-.055em; }
h1 > span { display:block; margin-top:20px; font-size:clamp(2rem,3.7vw,3.15rem); line-height:1.1; font-weight:450; letter-spacing:-.05em; }
h1 em { font-style:normal; color:var(--accent); }
.hero-description { margin-top:24px; max-width:52ch; color:var(--muted); font-size:.96rem; line-height:1.8; }
.hero-tags { margin-top:20px; display:flex; flex-wrap:wrap; gap:7px; }
.hero-tags span { color:var(--muted); border:1px solid var(--line); border-radius:5px; padding:5px 8px; font-size:.67rem; font-weight:550; background:var(--surface); }
.hero-actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:26px; }
.hero-socials { display:flex; gap:24px; margin-top:8px; }
.featured-work { display:block; color:var(--ink); border:1px solid var(--line); border-radius:var(--radius); background:var(--surface); box-shadow:var(--shadow); overflow:hidden; transition:transform .25s,box-shadow .25s; }
.featured-header { padding:18px 22px; display:flex; align-items:center; justify-content:space-between; }
.featured-arrow { font-size:1.3rem; color:var(--accent); }
.featured-image { background:var(--soft); margin:0 16px; border:1px solid var(--line); border-radius:8px; overflow:hidden; aspect-ratio:1.77778; }
.featured-image img { display:block; width:100%; height:100%; object-fit:contain; object-position:top; transition:transform .35s; }
.featured-caption { padding:24px; }
.featured-caption h2 { margin-top:8px; font-size:1.45rem; line-height:1.2; font-weight:600; letter-spacing:-.03em; }
.featured-caption p { margin-top:12px; color:var(--muted); font-size:.88rem; line-height:1.6; }
.featured-stack { display:block; margin-top:18px; font-size:.72rem; color:var(--muted); }
.featured-bottom { padding:15px 24px; display:flex; justify-content:space-between; border-top:1px solid var(--line); font-size:.78rem; font-weight:600; }
.hero-proof { display:grid; grid-template-columns:repeat(3,1fr); margin-top:48px; border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:24px 0; }
.hero-proof > div { display:flex; gap:16px; padding-inline:24px; border-right:1px solid var(--line); }
.hero-proof > div:first-child { padding-left:0; } .hero-proof > div:last-child { border:0; }
.proof-index { color:var(--muted); font-size:.65rem; padding-top:5px; }
dt { font-size:1.2rem; font-weight:600; letter-spacing:-.03em; } dd { margin-top:5px; color:var(--muted); font-size:.75rem; line-height:1.6; max-width:29ch; }
@media(hover:hover) { .featured-work:hover { transform:translateY(-4px); box-shadow:0 24px 60px -30px #164f6b55; } .featured-work:hover img { transform:scale(1.025); } }
@media(max-width:900px) { .hero-grid { gap:32px; } .featured-caption { padding:20px; } }
@media(max-width:767px) {
 .hero-grid { grid-template-columns:1fr; gap:32px; } .hero-location { font-size:.65rem; } h1 { font-size:2.6rem; } h1>span { font-size:2.3rem; margin-top:14px; } .hero-description { margin-top:20px; font-size:.95rem; }
 .featured-work { max-width:520px; } .featured-image { aspect-ratio:1.8; } .hero-proof { margin-top:32px; gap:16px; grid-template-columns:1fr; padding-block:20px; } .hero-proof>div { border:0; padding:0; } dt {font-size:1.05rem} dd { max-width:none; } .hero-socials { gap:24px; }
}
@media(prefers-reduced-motion:reduce) { .featured-work:hover, .featured-work:hover img { transform:none; } }
</style>
