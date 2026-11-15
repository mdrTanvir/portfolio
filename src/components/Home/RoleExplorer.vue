<template>
  <section id="ROLE-EXPLORER" tabindex="-1" class="contain content-section role-section">
    <div class="section-intro"><div><p class="eyebrow">Interactive tool / For your next hire</p><h2>Find the evidence for your role.</h2></div><p>Turn a list of requirements into a shortlist of relevant work from my portfolio.</p></div>
    <div class="role-tool">
      <div class="requirements-panel">
        <div class="tool-title"><span class="tool-icon" aria-hidden="true">⌘</span><div><h3>Role fit explorer</h3><p>Requirements in. Evidence out.</p></div></div>
        <p class="sample-label">Try a sample role</p><div class="role-presets" role="group" aria-label="Example role requirements"><button v-for="preset in presets" :key="preset.name" type="button" :aria-pressed="activePreset === preset.name" @click="usePreset(preset)">{{ preset.name }}</button></div>
        <form @submit.prevent="analyse">
          <label for="role-requirements">Paste a job description or required skills</label><textarea id="role-requirements" v-model="draft" rows="6" maxlength="6000" placeholder="For example: Python, SQL, data analysis and clear customer communication…" aria-describedby="requirements-help" @input="activePreset = ''"></textarea>
          <p id="requirements-help" class="tool-help">Matches terms to my published skills and linked work. Text stays in your browser.</p>
          <div class="tool-actions"><button type="submit" class="action action-primary">Find evidence <span aria-hidden="true">↗</span></button><button type="button" class="tool-reset" @click="reset">Clear</button></div>
        </form>
        <p class="draft-status" role="status">{{ !draft && !analysed ? 'Choose a sample role or paste requirements to begin.' : draft !== analysed ? 'Requirements changed. Select Find evidence to update the results.' : 'Showing evidence for the requirements above.' }}</p>
      </div>
      <div ref="resultsPanel" class="evidence-results" tabindex="-1" aria-label="Role evidence results">
        <div class="results-top"><div><p class="eyebrow">Your evidence shortlist</p><p class="results-summary" role="status" aria-live="polite">{{ result.matched.length }} {{ result.matched.length === 1 ? 'skill' : 'skills' }} found · {{ result.evidence.length }} evidence {{ result.evidence.length === 1 ? 'item' : 'items' }}</p></div><button type="button" class="copy-shortlist" :disabled="!result.matched.length" @click="copyShortlist">{{ copied ? 'Copied ✓' : 'Copy shortlist' }}</button></div>
        <div v-if="result.matched.length" class="match-skills" aria-label="Matching published skills"><span v-for="skill in result.matched" :key="skill">{{ skill }}</span></div>
        <Transition name="shortlist" mode="out-in"><div :key="analysed" class="shortlist-body">
          <template v-if="result.evidence.length"><article v-for="item in result.evidence.slice(0,2)" :key="item.id" class="shortlist-card"><div class="shortlist-meta"><span>{{ item.kind }}</span><span>{{ item.matched.length }} linked {{ item.matched.length === 1 ? 'skill' : 'skills' }}</span></div><h4><a :href="item.url" :target="item.external ? '_blank' : undefined" :rel="item.external ? 'noopener noreferrer' : undefined" @click="openEvidence($event,item)">{{ item.title }} <span aria-hidden="true">↗</span></a></h4><p class="shortlist-description">{{ item.description }}</p><p class="linked-skills">{{ item.matched.join(' · ') }}</p></article>
            <details v-if="result.evidence.length > 2" class="more-evidence"><summary>Show {{ result.evidence.length-2 }} more evidence {{ result.evidence.length-2 === 1 ? 'item' : 'items' }} <span aria-hidden="true">+</span></summary><ul><li v-for="item in result.evidence.slice(2)" :key="item.id"><a :href="item.url" :target="item.external ? '_blank' : undefined" :rel="item.external ? 'noopener noreferrer' : undefined" @click="openEvidence($event,item)">{{ item.title }} ↗</a><small>{{ item.matched.join(' · ') }}</small></li></ul></details>
          </template>
          <div v-else class="empty-evidence"><span aria-hidden="true">⌕</span><h4>{{ analysed.trim() ? 'No linked evidence found.' : 'Start with a role or a skill.' }}</h4><p>{{ analysed.trim() ? 'Try a specific term from my toolkit, such as Python, SQL or customer service.' : 'Choose a sample role, or paste requirements and select Find evidence.' }}</p><a href="/#SKILLS" class="text-link" @click.prevent="scrollTo('SKILLS')">Browse my full toolkit ↗</a></div>
          <p v-if="result.toolkitOnly.length" class="toolkit-note">Listed in my toolkit without a linked project or role: {{ result.toolkitOnly.join(', ') }}. <a href="/#SKILLS" @click.prevent="scrollTo('SKILLS')">View skills ↗</a></p>
        </div></Transition>
        <p class="copy-feedback" role="status" aria-live="polite">{{ copyStatus }}</p>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import {skills,works,experiences} from '~/config/data/data'
import {findRoleEvidence} from '~/utils/roleEvidence.mjs'
const {scrollTo} = useScrollTo()
const presets = [
  {name:'Software',text:'PHP, Laravel, JavaScript, Vue.js, SQL, REST APIs, Git and software testing.'},
  {name:'Data',text:'Python, Pandas, Scikit-learn, SQL, data analytics, statistical analysis and Jupyter.'},
  {name:'IT support',text:'Customer service, data validation, operational systems, SAP reporting, user training and documentation.'},
]
const catalog = Object.values(skills).flat().map(skill=>skill.name)
const records = [
  ...experiences.map((item,index)=>({id:`role-${index}`,kind:'Work experience',title:`${item.title} · ${item.company}`,description:item.description,skills:item.skills,url:'/#EXPERIENCE',external:false})),
  ...works.map(item=>({id:`project-${item.id}`,kind:'Project',title:item.name,description:item.description,skills:item.skills,url:item.url || item.repository,external:true})),
]
const draft=ref(presets[0].text), analysed=ref(presets[0].text), activePreset=ref('Software')
const result=computed(()=>findRoleEvidence(analysed.value,catalog,records))
const resultsPanel=ref<HTMLElement|null>(null), copied=ref(false), copyStatus=ref('')
let copyTimer:ReturnType<typeof setTimeout>|undefined
function clearCopy() { copied.value=false; copyStatus.value=''; clearTimeout(copyTimer) }
function usePreset(preset:typeof presets[number]) { draft.value=preset.text; analysed.value=preset.text; activePreset.value=preset.name; clearCopy() }
async function analyse() {
  analysed.value=draft.value.trim(); clearCopy(); await nextTick()
  if (window.matchMedia('(max-width:767px)').matches) resultsPanel.value?.scrollIntoView({behavior:'instant',block:'start'})
  resultsPanel.value?.focus({preventScroll:true})
}
function reset() {draft.value='';analysed.value='';activePreset.value='';clearCopy()}
function openEvidence(event:MouseEvent,item:{external:boolean}) { if(!item.external) {event.preventDefault();scrollTo('EXPERIENCE')} }
async function copyShortlist() {
  clearCopy()
  const value=['Tanvir Rahman — portfolio evidence',`Skills: ${result.value.matched.join(', ')}`,...result.value.evidence.map(item=>`${item.title}\nLinked skills: ${item.matched.join(', ')}\n${new URL(item.url,'https://www.tanvirrahman.dev').href}`)].join('\n\n')
  try {await navigator.clipboard.writeText(value);copied.value=true;copyStatus.value='Evidence shortlist copied.';copyTimer=setTimeout(()=>copied.value=false,3000)} catch {copyStatus.value='Copy is unavailable. Open the evidence links directly.'}
}
onBeforeUnmount(()=>clearTimeout(copyTimer))
</script>
<style scoped>
.role-section{overflow-anchor:none}.role-tool{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);border:1px solid var(--control-border);border-radius:20px;overflow:hidden;background:var(--surface);box-shadow:var(--shadow)}
.requirements-panel{padding:32px;background:var(--soft);border-right:1px solid var(--line)}.tool-title{display:flex;align-items:center;gap:14px}.tool-icon{display:flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:12px;background:var(--button);color:var(--button-ink);font-size:1.5rem}.tool-title h3{font-size:1.25rem;font-weight:600;letter-spacing:-.035em}.tool-title p{font-size:.76rem;color:var(--muted);margin-top:4px}.sample-label{font-size:.7rem;color:var(--muted);margin-top:28px}.role-presets{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0 24px}.role-presets button{min-height:44px;padding:10px 14px;border:1px solid var(--control-border);border-radius:999px;background:var(--surface);color:var(--muted);font-size:.75rem;font-weight:600;transition:background .2s,color .2s,transform .2s}.role-presets button[aria-pressed=true]{background:var(--button);color:var(--button-ink);border-color:var(--button)}.role-presets button:active{transform:scale(.96)}label{display:block;font-size:.8rem;font-weight:600;line-height:1.5;margin-bottom:10px}textarea{width:100%;min-height:170px;resize:vertical;background:var(--surface);border:1px solid var(--control-border);border-radius:12px;padding:16px;color:var(--ink);font-size:16px;line-height:1.65}textarea::placeholder{color:var(--muted);opacity:1}.tool-help{font-size:.7rem;line-height:1.7;color:var(--muted);margin-top:10px}.tool-actions{display:flex;align-items:center;gap:18px;margin-top:20px}.tool-actions .action{font-size:.8rem}.tool-reset{min-height:44px;padding:8px;color:var(--muted);font-size:.76rem}.tool-reset:hover{text-decoration:underline}.draft-status{font-size:.68rem;color:var(--muted);line-height:1.6;margin-top:20px;min-height:2.8em}
.evidence-results{padding:30px;min-width:0;scroll-margin-top:100px}.evidence-results:focus{outline:none}.results-top{display:flex;align-items:start;justify-content:space-between;gap:12px}.results-top .eyebrow{font-size:.62rem}.results-summary{font-size:.75rem;color:var(--muted);line-height:1.6;margin-top:7px}.copy-shortlist{min-height:44px;border:1px solid var(--control-border);border-radius:999px;padding:8px 13px;font-size:.68rem;font-weight:600;background:var(--surface);color:var(--ink);white-space:nowrap}.copy-shortlist:hover:not(:disabled){background:var(--soft)}.copy-shortlist:disabled{cursor:default}.match-skills{display:flex;gap:6px;flex-wrap:wrap;margin-top:20px}.match-skills>span{border:1px solid var(--line);border-radius:5px;padding:5px 7px;font-size:.65rem;color:var(--accent);line-height:1.5;background:var(--soft)}.shortlist-body{margin-top:22px;display:grid;gap:12px;min-height:350px}.shortlist-card{padding:18px;border:1px solid var(--line);border-radius:12px;background:var(--page);min-width:0}.shortlist-meta{display:flex;justify-content:space-between;gap:8px;font-size:.6rem;color:var(--muted)}h4{font-size:.94rem;line-height:1.4;font-weight:600;letter-spacing:-.02em;margin-top:9px}h4 a{color:var(--ink)}h4 a:hover{text-decoration:underline;text-underline-offset:3px}h4 a>span{color:var(--accent)}.shortlist-description{color:var(--muted);font-size:.76rem;line-height:1.7;margin-top:9px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.linked-skills{font-size:.64rem;color:var(--accent);line-height:1.65;margin-top:10px}.more-evidence summary{cursor:pointer;list-style:none;display:flex;align-items:center;justify-content:space-between;min-height:44px;font-size:.75rem;font-weight:600}.more-evidence summary::-webkit-details-marker{display:none}.more-evidence ul{padding:0;list-style:none}.more-evidence li{border-top:1px solid var(--line);padding-block:12px;font-size:.76rem;line-height:1.6}.more-evidence small{display:block;color:var(--muted);font-size:.66rem;margin-top:4px}.empty-evidence{align-self:center;padding:36px 8px;text-align:center}.empty-evidence>span{color:var(--accent);font-size:2.5rem}.empty-evidence p{font-size:.8rem;color:var(--muted);line-height:1.7;max-width:38ch;margin:12px auto}.toolkit-note{font-size:.7rem;color:var(--muted);line-height:1.7}.toolkit-note a{color:var(--accent);text-decoration:underline}.copy-feedback{min-height:1.5em;margin-top:10px;font-size:.7rem;color:var(--accent)}.shortlist-enter-active{transition:opacity .2s,transform .2s}.shortlist-leave-active{transition:opacity .1s}.shortlist-enter-from{opacity:0;transform:translateY(8px)}.shortlist-leave-to{opacity:0}
@media(max-width:900px){.requirements-panel,.evidence-results{padding:24px}.results-top{flex-wrap:wrap}}
@media(max-width:767px){.role-tool{grid-template-columns:1fr}.requirements-panel{border-right:0;border-bottom:1px solid var(--line)}.shortlist-body{min-height:0}.role-presets{gap:5px}.role-presets button{padding:10px 12px}.evidence-results{padding:22px}.requirements-panel{padding:24px 22px}}
</style>
