<template>
  <button ref="trigger" class="jump-trigger" type="button" aria-label="Open quick navigation" aria-haspopup="dialog" @click="open"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg><kbd>⌘ K</kbd></button>
  <dialog ref="dialog" class="jump-dialog" aria-labelledby="jump-title" @click="backdropClose" @close="query = ''" @keydown="moveFocus">
    <div class="jump-top"><div><p class="eyebrow">Find your way</p><h2 id="jump-title">Where to next?</h2></div><button class="close-jump" type="button" aria-label="Close quick navigation" @click="dialog?.close()">×</button></div>
    <label class="search-label" for="jump-search">Search sections and projects</label><input id="jump-search" v-model="query" type="search" autofocus placeholder="Try ‘data’, ‘experience’ or ‘weather’…" autocomplete="off"/>
    <p class="jump-status" role="status">{{ results.length }} {{ results.length === 1 ? 'destination' : 'destinations' }}</p>
    <div class="jump-results"><template v-for="item in results" :key="item.title"><a v-if="item.external" :href="item.href" target="_blank" rel="noopener noreferrer" @click="dialog?.close()"><span><strong>{{ item.title }}</strong><small>{{ item.detail }}</small></span><span aria-hidden="true">↗</span></a><button v-else type="button" @click="go(item.href)"><span><strong>{{ item.title }}</strong><small>{{ item.detail }}</small></span><span aria-hidden="true">↵</span></button></template><p v-if="!results.length" class="no-results">No match yet. Try a project name or section.</p></div>
    <p class="jump-footer">↑ ↓ to browse <span>Esc to close</span></p>
  </dialog>
</template>
<script setup lang="ts">
import navigation from '~/config/navigation'
import {works} from '~/config/data/data'
const {scrollTo} = useScrollTo()
const dialog = ref<HTMLDialogElement|null>(null), trigger = ref<HTMLButtonElement|null>(null), query = ref('')
const destinations = [
  ...navigation.map(item => ({title:item.name, href:item.href, detail:'Jump to section', external:false})),
  ...works.map(item => ({title:item.name, href:item.url || item.repository, detail:item.for + ' · Opens in new tab', external:true})),
]
const results = computed(() => destinations.filter(item => `${item.title} ${item.detail}`.toLowerCase().includes(query.value.trim().toLowerCase())))
function open() { if (!dialog.value?.open) dialog.value?.showModal() }
async function go(id:string) { dialog.value?.close(); await scrollTo(id) }
function shortcut(event:KeyboardEvent) { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); dialog.value?.open ? dialog.value.close() : open() } }
function backdropClose(event:MouseEvent) { if (event.target !== dialog.value) return; const rect=dialog.value.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.value.close() }
function moveFocus(event:KeyboardEvent) { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); dialog.value?.close(); return } if (!['ArrowDown','ArrowUp'].includes(event.key)) return; const targets = Array.from(dialog.value!.querySelectorAll<HTMLElement>('#jump-search,.jump-results a,.jump-results button')); const index=targets.indexOf(document.activeElement as HTMLElement); event.preventDefault(); targets[(index+(event.key==='ArrowDown'?1:-1)+targets.length)%targets.length]?.focus() }
onMounted(() => document.addEventListener('keydown',shortcut))
onBeforeUnmount(() => document.removeEventListener('keydown',shortcut))
</script>
<style scoped>
.jump-trigger { display:flex;align-items:center;justify-content:center;gap:7px;min-width:44px;height:44px;border-radius:999px;color:var(--muted);background:var(--soft);padding:10px;border:1px solid var(--line);transition:color .2s,border-color .2s }
.jump-trigger:hover {color:var(--accent);border-color:var(--control-border)} kbd {font-size:.6rem;font-family:inherit;white-space:nowrap}
.jump-dialog {position:fixed;inset:0;margin:auto;width:min(600px,calc(100vw - 32px));max-height:min(80dvh,750px);padding:28px;border:1px solid var(--control-border);border-radius:26px;background:var(--surface);color:var(--ink);box-shadow:0 40px 130px #10082266;overflow-y:auto}
.jump-dialog[open] {animation:jump-in .2s ease-out}.jump-dialog::backdrop {background:#140a2b88;backdrop-filter:blur(8px)}
.jump-top{display:flex;align-items:start;justify-content:space-between;gap:16px}h2{font-size:1.7rem;letter-spacing:-.04em;font-weight:600;margin-top:5px}.close-jump{width:44px;height:44px;border-radius:50%;background:var(--soft);color:var(--ink);font-size:1.5rem}
.search-label{display:block;font-size:.75rem;color:var(--muted);margin:24px 0 8px}input{width:100%;min-height:52px;padding:12px 16px;border:1px solid var(--control-border);border-radius:12px;background:var(--page);color:var(--ink);font-size:.85rem}input::placeholder{color:var(--muted);opacity:1}.jump-status{font-size:.68rem;color:var(--muted);margin:16px 0 8px}
.jump-results {display:grid;gap:4px}.jump-results a,.jump-results button{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:14px 16px;min-height:64px;width:100%;border-radius:12px;text-align:left;background:var(--soft);color:var(--ink)}.jump-results a:hover,.jump-results button:hover{background:var(--accent);color:var(--surface)}.jump-results strong{display:block;font-size:.86rem;font-weight:600}.jump-results small{display:block;font-size:.67rem;margin-top:5px;line-height:1.5}.jump-footer{display:flex;justify-content:space-between;gap:12px;margin-top:18px;font-size:.65rem;color:var(--muted)}.no-results{padding:24px 0;font-size:.85rem;color:var(--muted)}
@media(max-width:1100px){kbd{display:none}}@media(max-width:479px){.jump-dialog{padding:20px;border-radius:20px}.jump-results a,.jump-results button{padding:12px}}
@keyframes jump-in {from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}
</style>
