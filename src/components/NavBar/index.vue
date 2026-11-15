<template>
  <header ref="header" class="site-header" :class="{'is-scrolled': scrolled}">
    <div class="header-inner">
      <NavBarLogo/>
      <nav ref="nav" id="site-navigation" class="site-nav" :class="{'is-open': menuOpen}" aria-label="Main navigation" @pointerover="previewLink" @pointerleave="syncIndicator()" @focusin="previewLink" @focusout="syncIndicator()">
        <span class="nav-indicator" :style="indicatorStyle" aria-hidden="true"></span>
        <a v-for="item in navigation" :key="item.href" :href="`/#${item.href}`"
           :aria-current="active === item.href ? 'location' : undefined"
           @click.prevent="navigate(item.href)">{{ item.name }}</a>
      </nav>
      <div class="header-actions">
        <NavBarQuickJump/>
        <NavBarThemeToggleBtn/>
        <a :href="siteData.cvLink" download aria-label="Download CV (PDF)" class="header-cv">CV <span aria-hidden="true">↓</span></a>
        <button ref="menuButton" class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="site-navigation" :aria-label="menuOpen ? 'Close navigation menu' : 'Open navigation menu'" @click="toggleMenu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path v-if="menuOpen" d="m6 6 12 12M6 18 18 6"/><path v-else d="M4 8h16M4 16h16"/></svg>
        </button>
      </div>
    </div>
    <div class="reading-progress" :style="{transform: `scaleX(${progress})`}" aria-hidden="true"></div>
  </header>
</template>
<script setup lang="ts">
import navigation from '~/config/navigation'
import siteData from '~/config/data/data'
const {scrollTo} = useScrollTo()
const menuOpen = ref(false), scrolled = ref(false), progress = ref(0), active = ref('HERO')
const header = ref<HTMLElement | null>(null), menuButton = ref<HTMLButtonElement | null>(null)
const route = useRoute()
const nav = ref<HTMLElement|null>(null)
const indicator = ref({x:0,y:0,width:0,height:0,visible:false})
const indicatorStyle = computed(() => ({transform:`translate(${indicator.value.x}px,${indicator.value.y}px)`,width:`${indicator.value.width}px`,height:`${indicator.value.height}px`,opacity:indicator.value.visible ? 1 : 0}))
function syncIndicator(target?:HTMLElement|null) {
  const link = target || nav.value?.querySelector<HTMLElement>('a:focus') || nav.value?.querySelector<HTMLElement>('a[aria-current]')
  indicator.value = link ? {x:link.offsetLeft,y:link.offsetTop,width:link.offsetWidth,height:link.offsetHeight,visible:true} : {...indicator.value,visible:false}
}
function previewLink(event:Event) { const link=(event.target as Element).closest<HTMLElement>('a'); if(link) syncIndicator(link) }
let frame = 0
let sizeObserver: ResizeObserver | undefined
function update() {
  if (window.innerWidth >= 960) menuOpen.value = false
  scrolled.value = window.scrollY > 12
  const length = document.documentElement.scrollHeight - innerHeight
  progress.value = length > 0 ? Math.min(1, Math.max(0, scrollY / length)) : 0
  const sections = [...document.querySelectorAll<HTMLElement>('section[id]')]
  active.value = sections.filter(el => el.getBoundingClientRect().top <= 180).at(-1)?.id || 'HERO'
  syncIndicator()
  frame = 0
}
function onScroll() { if (!frame) frame = requestAnimationFrame(update) }
async function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) { await nextTick(); header.value?.querySelector<HTMLAnchorElement>('.site-nav a')?.focus(); syncIndicator() }
}
function close(restore = false) { menuOpen.value = false; if (restore) menuButton.value?.focus() }
function onKey(e: KeyboardEvent) { if (e.key === 'Escape' && menuOpen.value) close(true) }
function onOutside(e: PointerEvent) { if (menuOpen.value && !header.value?.contains(e.target as Node)) close() }
function onFocusOut(e: FocusEvent) { if (menuOpen.value && !header.value?.contains(e.relatedTarget as Node)) close() }
async function navigate(id: string) { close(); await scrollTo(id) }
watch(() => route.fullPath, () => { close(); nextTick(update) })
onMounted(() => { sizeObserver = new ResizeObserver(onScroll); sizeObserver.observe(document.body); update(); window.addEventListener('scroll',onScroll,{passive:true}); window.addEventListener('resize',onScroll); document.addEventListener('keydown',onKey); document.addEventListener('pointerdown',onOutside); header.value?.addEventListener('focusout',onFocusOut) })
onBeforeUnmount(() => { sizeObserver?.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll',onScroll); window.removeEventListener('resize',onScroll); document.removeEventListener('keydown',onKey); document.removeEventListener('pointerdown',onOutside); header.value?.removeEventListener('focusout',onFocusOut) })
</script>
<style scoped>
.site-header { position:fixed; top:16px; left:24px; right:24px; max-width:1192px; margin-inline:auto; z-index:50; background:var(--nav); backdrop-filter:blur(20px); border:1px solid var(--line); border-radius:16px; box-shadow:var(--shadow); transition:box-shadow .25s,border-color .25s; }
.site-header.is-scrolled { border-color:var(--control-border); box-shadow:0 12px 40px -20px #00000044; }
.header-inner { height:72px; padding-inline:20px; display:flex; align-items:center; justify-content:space-between; gap:20px; }
.site-nav { position:relative; display:flex; align-items:center; gap:3px; margin-left:auto; padding:4px; border:1px solid var(--line); border-radius:999px; background:transparent; }
.site-nav a {position:relative;z-index:1; display:flex; align-items:center; gap:6px; min-height:44px; padding:10px 12px; border-radius:999px; font-size:.76rem; font-weight:600; color:var(--muted); transition:color .2s,background .2s,box-shadow .2s; white-space:nowrap; }
.site-nav a[aria-current] {color:var(--accent)}
.site-nav a:hover {color:var(--ink)}
.nav-indicator {position:absolute;top:0;left:0;background:var(--soft);border:1px solid var(--line);border-radius:999px;pointer-events:none;transition:transform .32s cubic-bezier(.22,1,.36,1),width .32s cubic-bezier(.22,1,.36,1),height .2s,opacity .18s;}
.nav-dot { width:5px;height:5px;border-radius:50%;background:currentColor;display:none; }
.site-nav a[aria-current] .nav-dot { display:block; }
.header-actions { display:flex; align-items:center; gap:6px; }
.header-cv { display:flex; align-items:center; gap:10px; min-height:44px; padding:8px 15px; border:1px solid var(--silver-ink); border-radius:999px; font-size:.8rem; font-weight:650; color:var(--silver-ink); background:linear-gradient(135deg,#f5f7fb,#c1cad9); transition:transform .18s; }
.header-cv:hover { transform:translateY(-2px); }
.menu-toggle { display:none; align-items:center; justify-content:center; height:44px; width:44px; border:1px solid var(--control-border); border-radius:50%; background:var(--surface); color:var(--ink); }
.reading-progress { position:absolute; bottom:-1px; left:24px; right:24px; height:2px; background:var(--button); transform-origin:left; border-radius:8px; }
@media(max-width:1100px) { .header-inner { gap:10px;padding-inline:14px; } .site-nav a {padding:10px 9px;font-size:.72rem} }
@media(max-width:959px) {
 .site-header {left:16px;right:16px;top:12px;border-radius:16px}
 .header-inner {height:66px;padding-inline:12px} .menu-toggle {display:flex} .header-actions {gap:3px}
 .site-nav {display:none;position:absolute;top:76px;left:0;right:0;margin:0;padding:12px;border:1px solid var(--control-border);border-radius:16px;background:var(--surface);box-shadow:var(--shadow)}
 .site-nav.is-open {display:flex;flex-direction:column;align-items:stretch;gap:4px;animation:menu-enter .2s ease-out}
 .site-nav a {padding:14px 18px;border-radius:12px;font-size:1rem;min-height:52px;justify-content:space-between}
 .site-nav a[aria-current] {background:transparent} .nav-indicator {border-radius:12px}
}
@media(max-width:479px) { .site-header{left:10px;right:10px} .header-cv{display:none} .header-inner{gap:6px} }
@keyframes menu-enter {from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
</style>
