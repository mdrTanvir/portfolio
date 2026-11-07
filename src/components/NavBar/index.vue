<template>
  <header ref="header" class="site-header" :class="{'is-scrolled': scrolled}">
    <div class="contain header-inner">
      <NavBarLogo/>
      <nav id="site-navigation" class="site-nav" :class="{'is-open': menuOpen}" aria-label="Main navigation">
        <a v-for="item in navigation" :key="item.href" :href="`/#${item.href}`"
           :aria-current="active === item.href ? 'location' : undefined"
           @click.prevent="navigate(item.href)">{{ item.name }}</a>
      </nav>
      <div class="header-actions">
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
let frame = 0
let sizeObserver: ResizeObserver | undefined
function update() {
  if (window.innerWidth >= 768) menuOpen.value = false
  scrolled.value = window.scrollY > 12
  const length = document.documentElement.scrollHeight - innerHeight
  progress.value = length > 0 ? Math.min(1, Math.max(0, scrollY / length)) : 0
  const sections = [...document.querySelectorAll<HTMLElement>('section[id]')]
  active.value = sections.filter(el => el.getBoundingClientRect().top <= 180).at(-1)?.id || 'HERO'
  frame = 0
}
function onScroll() { if (!frame) frame = requestAnimationFrame(update) }
async function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) { await nextTick(); header.value?.querySelector<HTMLAnchorElement>('.site-nav a')?.focus() }
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
.site-header { position: fixed; inset: 0 0 auto; z-index: 50; background: var(--nav); backdrop-filter: blur(18px); border-bottom: 1px solid transparent; transition: border-color .2s, box-shadow .2s; }
.site-header.is-scrolled { border-color: var(--line); box-shadow: 0 5px 20px -15px #182f44; }
.header-inner { height: 84px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.site-nav { display: flex; align-items: center; gap: 24px; margin-left: auto; }
.site-nav a { padding-block: 14px; position: relative; font-size: .82rem; font-weight: 550; color: var(--muted); transition: color .18s; }
.site-nav a::after { content: ''; position: absolute; bottom: 5px; left: 0; width: 100%; height: 2px; background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform .18s; }
.site-nav a[aria-current], .site-nav a:hover { color: var(--ink); }
.site-nav a[aria-current]::after { transform: scaleX(1); }
.header-actions { display:flex; align-items:center; gap:12px; }
.header-cv { display:flex; align-items:center; gap:12px; min-height:44px; padding:8px 14px; border:1px solid var(--line); border-radius:8px; font-size:.8rem; font-weight:600; color:var(--ink); }
.menu-toggle { display:none; align-items:center; justify-content:center; height:44px; width:44px; border:1px solid var(--line); border-radius:8px; background:var(--surface); color:var(--ink); }
.reading-progress { height:2px; background:var(--accent); transform-origin:left; }
@media(max-width:1023px) { .site-nav { gap:16px; } .header-inner { gap:16px; } }
@media(max-width:767px) {
 .header-inner { height:72px; } .header-actions { gap:6px; } .menu-toggle { display:flex; } .header-cv { padding:8px 10px; }
 .site-nav { display:none; position:absolute; top:80px; left:16px; right:16px; margin:0; padding:12px; border:1px solid var(--line); border-radius:16px; background:var(--surface); box-shadow:var(--shadow); }
 .site-nav.is-open { display:flex; flex-direction:column; align-items:stretch; gap:0; }
 .site-nav a { padding:14px 16px; border-radius:8px; font-size:1rem; }
 .site-nav a[aria-current] { background:var(--soft); } .site-nav a::after { display:none; }
}
</style>
