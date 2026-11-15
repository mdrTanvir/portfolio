<template>
  <div>
    <div class="hero-grid">
      <div class="hero-copy">
        <div class="hero-identity"><p class="hero-name">Tanvir Rahman <span aria-hidden="true">/</span> Portfolio</p><UiAppearancePicker/></div>
        <p class="eyebrow hero-location"><span aria-hidden="true"></span> Launceston, Tasmania · IT graduate</p>
        <h1>Software, data<br/>and support.<br/><em>Built around people.</em></h1>
        <p class="hero-description">{{ siteData.hero.subheadline }}</p>
        <div class="hero-tags"><span v-for="tag in siteData.hero.headlineTags" :key="tag">{{ tag }}</span></div>
        <div class="hero-actions">
          <a href="/#ROLE-EXPLORER" class="action action-primary" @click.prevent="scrollTo('ROLE-EXPLORER')">Try the role explorer <span aria-hidden="true">↗</span></a>
          <a href="/#PROJECTS" @click.prevent="scrollTo('PROJECTS')" class="action">Explore my work <span aria-hidden="true">↗</span></a>
          <a :href="siteData.cvLink" download aria-label="Download CV (PDF)" class="action">Download CV <span aria-hidden="true">↓</span></a>
        </div>
        <div class="hero-socials"><a :href="`mailto:${siteData.email}`" class="text-link">Email me <span aria-hidden="true">↗</span></a><a :href="siteData.github" class="text-link" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a><a :href="siteData.socials[0].link" class="text-link" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></div>
      </div>
      <article class="featured-work">
        <div class="featured-header"><span class="eyebrow">Project spotlight <span class="spotlight-count">0{{ featuredIndex+1 }} / 0{{ spotlights.length }}</span></span><button type="button" class="next-project" aria-label="Show next featured project" @click="nextProject">Next <span aria-hidden="true">↻</span></button></div>
        <Transition name="spotlight" mode="out-in"><a :key="featured.id" class="featured-link" :href="featured.url" target="_blank" rel="noopener noreferrer" :aria-label="`Explore ${featured.name} (opens in a new tab)`">
        <div class="featured-image"><img :src="featured.photo" :alt="`${featured.name} dashboard preview`" width="800" height="500" fetchpriority="high"/></div>
        <div class="featured-caption"><span class="eyebrow">{{ featured.for }} · {{ featured.date }}</span><h2>{{ featured.name }}</h2><p>{{ spotlightCaption }}</p><span class="featured-stack">{{ featured.skills.slice(0,3).join(" / ") }}</span></div>
        <div class="featured-bottom"><span>Explore the live project</span><span aria-hidden="true">↗</span></div>
      </a></Transition>
        <p class="sr-only" role="status" aria-live="polite">Featured project: {{ featured.name }}</p>
      </article>
    </div>
    <dl class="hero-proof"><div v-for="(item,index) in siteData.hero.impacts" :key="item.label"><span class="proof-index" aria-hidden="true">0{{ index+1 }}</span><div><dt>{{ item.value }}</dt><dd>{{ item.label }}</dd></div></div></dl>
  </div>
</template>
<script setup lang="ts">
import siteData, {works} from '~/config/data/data'
const {scrollTo} = useScrollTo()
const spotlights = [works[1],works[2],works[0]]
const featuredIndex = ref(0)
const featured = computed(() => spotlights[featuredIndex.value])
const spotlightCaption = computed(() => ['207 countries. Reproducible analysis.','Statistical analysis across four airport terminals.','Weather information for five Tasmanian locations.'][featuredIndex.value])
function nextProject() { featuredIndex.value = (featuredIndex.value+1)%spotlights.length }
</script>
<style scoped>
.spotlight-enter-active{transition:opacity .24s,transform .24s}.spotlight-leave-active{transition:opacity .12s,transform .12s}.spotlight-enter-from{opacity:0;transform:translateX(12px)}.spotlight-leave-to{opacity:0;transform:translateX(-8px)}
.featured-bottom>span:last-child {display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:var(--button);color:var(--button-ink);transition:transform .25s}
.featured-link:hover .featured-bottom>span:last-child{transform:rotate(45deg)}

.hero-identity{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:18px}.hero-name {font-size:.82rem;font-weight:600;letter-spacing:.02em;color:var(--ink);margin-bottom:0}.hero-name>span{margin-inline:10px;color:var(--control-border)}
.featured-link {display:block;color:var(--ink);}
.spotlight-count {margin-left:8px;font-size:.6rem;letter-spacing:0;color:var(--muted)}
.next-project {display:flex;align-items:center;gap:10px;min-height:44px;border-radius:999px;border:1px solid var(--control-border);padding:8px 14px;background:var(--surface);color:var(--accent);font-size:.72rem;font-weight:600;flex-shrink:0;transition:background .2s,transform .2s}
.next-project:hover {background:var(--accent);color:var(--surface)}.next-project:active {transform:scale(.95)}.next-project span{font-size:1.2rem}
.hero-copy {animation:spotlight-enter .6s ease-out}.hero-proof {animation:spotlight-enter .7s ease-out}
@keyframes sticker-turn {from{transform:rotate(-90deg)}to{transform:rotate(0)}}
@keyframes spotlight-enter {from{opacity:.3;transform:translateY(10px)}to{opacity:1;transform:none}}


.hero-grid { display:grid; grid-template-columns:1.2fr 1fr; gap:clamp(40px,6vw,90px); align-items:center; }
.hero-copy { position:relative; }
.hero-location { display:flex; align-items:center; gap:8px; letter-spacing:.08em; font-size:.68rem; }
.hero-location > span { height:6px; width:6px; background:var(--accent); border-radius:50%; flex-shrink:0; }
h1 {margin-top:24px;font-size:clamp(2.8rem,4.8vw,4.3rem);line-height:1.06;font-weight:550;letter-spacing:-.06em}
h1 em {font-style:normal;display:inline-block;margin-top:10px;color:var(--accent);font-size:.66em;letter-spacing:-.045em;line-height:1.15}
.hero-description { margin-top:24px; max-width:52ch; color:var(--muted); font-size:.96rem; line-height:1.8; }
.hero-tags { margin-top:20px; display:flex; flex-wrap:wrap; gap:7px; }
.hero-tags span { color:var(--accent); border:1px solid var(--line); border-radius:5px; padding:5px 8px; font-size:.67rem; font-weight:550; background:var(--surface); }
.hero-actions .action{font-size:.78rem;padding-inline:16px}
.hero-actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:26px; }
.hero-socials { display:flex; gap:24px; margin-top:8px; }
.featured-work { position:relative; display:block; color:var(--ink); border:1px solid var(--line); border-radius:var(--radius); background:var(--surface); box-shadow:var(--shadow); overflow:hidden; border-color:var(--control-border); transition:transform .25s,box-shadow .25s; }
.featured-header { background:var(--soft); border-bottom:1px solid var(--line); padding:12px 20px; display:flex; align-items:center; justify-content:space-between; }
.featured-arrow { font-size:1.3rem; color:var(--accent); }
.featured-image { background:var(--soft); margin:0 16px; border:1px solid var(--line); border-radius:8px; overflow:hidden; aspect-ratio:1.77778; }
.featured-image img { display:block; width:100%; height:100%; object-fit:contain; object-position:top; transition:transform .35s; }
.featured-caption { padding:24px; }
.featured-caption {min-height:210px}
.featured-caption h2 { margin-top:8px; font-size:1.45rem; line-height:1.2; font-weight:600; letter-spacing:-.03em; }
.featured-caption p { margin-top:12px; color:var(--muted); font-size:.88rem; line-height:1.6; }
.featured-stack { display:block; margin-top:18px; font-size:.72rem; color:var(--muted); }
.featured-bottom { background:var(--soft); color:var(--ink); padding:15px 24px; display:flex; justify-content:space-between; border-top:1px solid var(--line); font-size:.78rem; font-weight:600; }
.hero-proof { border-radius:20px;background:var(--surface);display:grid; grid-template-columns:repeat(3,1fr); margin-top:48px; border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:24px 0; }
.hero-proof > div { display:flex; gap:16px; padding-inline:24px; border-right:1px solid var(--line); }
.hero-proof > div:first-child { padding-left:24px; } .hero-proof > div:last-child { border:0; }
.proof-index { color:var(--accent); font-size:.65rem; padding-top:5px; }
dt { font-size:1.2rem; font-weight:600; letter-spacing:-.03em; } dd { margin-top:5px; color:var(--muted); font-size:.75rem; line-height:1.6; max-width:29ch; }
@media(hover:hover) { .featured-work:hover { transform:translateY(-4px); box-shadow:0 24px 60px -30px #285df533; } .featured-work:hover img { transform:scale(1.025); } }
@media(max-width:900px) { .hero-grid { gap:32px; } .featured-caption { padding:20px; } }
@media(max-width:767px) {
 .hero-grid { grid-template-columns:1fr; gap:32px; } .hero-location { font-size:.65rem; } h1 { font-size:clamp(2.6rem,9vw,3.7rem); } .hero-description { margin-top:20px; font-size:.95rem; }
 .featured-work { max-width:520px; } .featured-image { aspect-ratio:1.8; } .hero-proof { margin-top:32px; gap:16px; grid-template-columns:1fr; padding-block:20px; } .hero-proof>div,.hero-proof>div:first-child { border:0; padding:0 20px; } dt {font-size:1.05rem} dd { max-width:none; } .hero-socials { gap:24px; }
}
@media(prefers-reduced-motion:reduce) { .featured-work:hover, .featured-work:hover img { transform:none; } }
</style>
