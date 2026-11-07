<template>
  <div class="profile-explorer">
    <div class="explorer-heading"><div><p class="eyebrow">An interactive introduction</p><h3>Choose a focus. Follow the evidence.</h3></div><span class="explorer-hint">Three ways to explore my work</span></div>
    <div class="explorer-map">
      <svg class="map-connections" viewBox="0 0 1000 360" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path v-for="(lens,index) in lenses" :key="lens.id" :d="`M 240 ${78 + index * 102} C 365 ${78 + index * 102}, 330 180, 380 180`" :class="{'is-active':selected === lens.id}"/>
        <path class="is-active" d="M 430 180 C 500 180, 500 90, 604 90 M 430 180 C 500 180, 500 270, 604 270"/>
      </svg>
      <div class="focus-controls" role="group" aria-label="Choose which part of my profile to explore">
        <button v-for="(lens,index) in lenses" :key="lens.id" type="button" :aria-pressed="selected === lens.id" aria-controls="profile-evidence" @click="selected = lens.id">
          <span class="focus-number" aria-hidden="true">0{{ index+1 }}</span><span><strong>{{ lens.label }}</strong><span class="focus-purpose">{{ lens.purpose }}</span></span><span class="focus-check" aria-hidden="true">{{ selected === lens.id ? '↗' : '+' }}</span>
        </button>
      </div>
      <div class="profile-junction" aria-hidden="true"><div class="junction-ring"><span>TR</span></div><span>Your focus,<br/>my experience.</span></div>
      <div id="profile-evidence" class="evidence-panel" :aria-label="`${active.label} evidence`">
        <p class="evidence-status" role="status" aria-live="polite">Showing {{ active.label.toLowerCase() }} evidence</p>
        <div :key="selected" class="evidence-cards">
          <article v-for="item in active.evidence" :key="item.title" class="evidence-card">
            <div class="evidence-kicker"><span>{{ item.type }}</span><span>{{ item.date }}</span></div>
            <h4><a :href="item.url" :target="item.external ? '_blank' : undefined" :rel="item.external ? 'noopener noreferrer' : undefined" @click="navigateEvidence($event,item)">{{ item.title }} <span aria-hidden="true">↗</span></a></h4>
            <p v-if="item.company" class="evidence-company">{{ item.company }}</p>
            <p class="evidence-description">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </div>
    <div class="explorer-footer"><span>Start with a focus. Open the work behind it.</span><a href="/#EXPERIENCE" class="text-link" @click.prevent="scrollTo('EXPERIENCE')">Full experience <span aria-hidden="true">↗</span></a></div>
  </div>
</template>
<script setup lang="ts">
import {experiences,works} from '~/config/data/data'
const {scrollTo} = useScrollTo()
type Evidence = {title:string; type:string; date:string; company?:string; description:string; url:string; external:boolean}
const role = (company:string):Evidence => {
  const value = experiences.find(item => item.company.includes(company))
  if (!value) throw new Error(`Profile evidence is missing the role at ${company}`)
  return {title:value.title, type:'Work experience', date:`${value.startDate} – ${value.endDate}`, company:value.company, description:value.description, url:'/#EXPERIENCE', external:false}
}
const project = (id:number):Evidence => {
  const value = works.find(item => item.id === id)!
  return {title:value.name, type:value.for, date:value.date, description:value.description, url:value.url || value.repository, external:true}
}
const lenses = [
  {id:'software', label:'Software', purpose:'Build useful applications', evidence:[role('Business Automation'),project(4)]},
  {id:'data', label:'Data', purpose:'Turn analysis into understanding', evidence:[project(2),project(3)]},
  {id:'support', label:'Support', purpose:'Help people use technology', evidence:[role('Aurora Energy'),role('Coles')]},
]
const selected = ref('software')
const active = computed(() => lenses.find(lens => lens.id === selected.value)!)
function navigateEvidence(event:MouseEvent,item:Evidence) { if (!item.external) {event.preventDefault(); scrollTo('EXPERIENCE')} }
</script>
<style scoped>
.profile-explorer { border:1px solid var(--line); border-radius:20px; background:var(--surface); overflow:hidden; margin-bottom:44px; }
.explorer-heading { padding:28px 30px 0; display:flex; justify-content:space-between; gap:24px; align-items:end; }
h3 { font-size:clamp(1.2rem,2.2vw,1.6rem); font-weight:550; letter-spacing:-.035em; line-height:1.25; margin-top:8px; }
.explorer-hint { font-size:.7rem; line-height:1.5; color:var(--muted); max-width:17ch; }
.explorer-map { position:relative; display:grid; grid-template-columns:25% 18% minmax(0,1fr); align-items:center; gap:5%; margin:28px 30px; min-height:400px; }
.map-connections { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:0; }
.map-connections path { stroke:var(--line); stroke-width:1.5; vector-effect:non-scaling-stroke; transition:stroke .18s; }
.map-connections path.is-active {stroke:var(--accent);stroke-width:2;}
.focus-controls,.profile-junction,.evidence-panel {position:relative;z-index:1;min-width:0}
.focus-controls {display:grid;gap:14px}
.focus-controls button {display:flex;align-items:center;gap:12px;text-align:left;padding:18px 14px;min-height:88px;width:100%;border:1px solid var(--control-border);border-radius:12px;background:var(--surface);color:var(--ink);transition:background .18s,border-color .18s;}
.focus-controls button[aria-pressed=true] {border:2px solid var(--accent);padding:17px 13px;background:var(--soft);}
.focus-controls button:hover {background:var(--soft)}
.focus-number {font-size:.65rem;color:var(--muted);align-self:flex-start;padding-top:3px}
.focus-controls strong {display:block;font-size:.94rem;font-weight:600}
.focus-purpose {display:block;font-size:.7rem;line-height:1.5;color:var(--muted);margin-top:5px}
.focus-check {margin-left:auto;color:var(--accent);font-size:1.1rem}
.profile-junction {text-align:center;font-size:.7rem;line-height:1.6;color:var(--muted);}
.junction-ring {height:110px;width:110px;max-width:100%;margin:0 auto;padding:8px;border:1px solid var(--control-border);border-radius:50%;background:var(--surface);}
.profile-junction>span {position:absolute;top:calc(100% + 12px);left:0;right:0;padding:2px 4px}
.junction-ring>span {display:flex;align-items:center;justify-content:center;height:100%;border-radius:50%;background:var(--soft);border:1px solid var(--line);color:var(--ink);font-size:2.2rem;font-weight:500;letter-spacing:-.07em}
.evidence-status {font-size:.7rem;line-height:1.5;color:var(--muted);margin-bottom:12px;}
.evidence-cards {display:grid;gap:14px;min-height:400px;animation:evidence-enter .18s ease-out}
.evidence-card {background:var(--page);border:1px solid var(--line);border-radius:12px;padding:20px;}
.evidence-kicker {display:flex;justify-content:space-between;gap:12px;font-size:.62rem;line-height:1.6;color:var(--muted)}
.evidence-kicker span:last-child {white-space:nowrap}
h4 {font-size:1.05rem;line-height:1.35;letter-spacing:-.025em;font-weight:600;margin-top:9px}
h4 a {color:var(--ink)}h4 a>span{color:var(--accent);white-space:nowrap}
h4 a:hover {text-decoration:underline;text-underline-offset:4px}
.evidence-company {font-size:.75rem;color:var(--accent);line-height:1.6;margin-top:6px}
.evidence-description {font-size:.78rem;color:var(--muted);line-height:1.75;margin-top:12px}
.explorer-footer {display:flex;align-items:center;justify-content:space-between;gap:16px;border-top:1px solid var(--line);padding:12px 30px;font-size:.72rem;line-height:1.6;color:var(--muted)}
.explorer-footer .text-link {font-size:.75rem;white-space:nowrap}
@keyframes evidence-enter {from{opacity:.7;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:1023px) and (min-width:768px) {.explorer-map{grid-template-columns:28% 12% minmax(0,1fr);gap:4%}.focus-controls button{padding:16px 10px;gap:8px}.focus-controls button[aria-pressed=true]{padding:15px 9px}.junction-ring{height:80px;width:80px}.junction-ring>span{font-size:1.8rem}.evidence-kicker{flex-direction:column;gap:2px}.evidence-card{padding:16px}}
@media(max-width:767px) {
 .explorer-heading{padding:22px 20px 0}.explorer-hint,.profile-junction,.map-connections{display:none}
 .explorer-map{grid-template-columns:1fr;gap:20px;margin:22px 20px;min-height:0}
 .focus-controls{grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
 .focus-controls button{justify-content:center;text-align:center;padding:12px 4px;min-height:48px;gap:0}
 .focus-controls button[aria-pressed=true]{padding:11px 3px}.focus-controls strong{font-size:.78rem}
 .focus-purpose,.focus-number,.focus-check{display:none}.evidence-cards{min-height:0}
 .evidence-card{padding:18px}.evidence-kicker{font-size:.59rem}.evidence-description{font-size:.82rem}
 .explorer-footer{padding:14px 20px;align-items:start;flex-direction:column;gap:4px}
}
@media(prefers-reduced-motion:reduce){.evidence-cards{animation:none}}
</style>
