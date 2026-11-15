<template>
  <header ref="header" class="site-header" :class="{'is-scrolled': scrolled}">
    <div class="header-inner">
      <NavBarLogo/>
      <nav id="site-navigation" class="site-nav" :class="{'is-open': menuOpen}" aria-label="Main navigation">
        <a v-for="item in navigation" :key="item.href" :href="`/#${item.href}`"
           :aria-current="active === item.href ? 'location' : undefined"
           @click.prevent="navigate(item.href)"><span class="nav-dot" aria-hidden="true"></span>{{ item.name }}</a>
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
let frame = 0
let sizeObserver: ResizeObserver | undefined
function update() {
  if (window.innerWidth >= 960) menuOpen.value = false
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
.site-header { position:fixed; top:16px; left:24px; right:24px; max-width:1192px; margin-inline:auto; z-index:50; background:var(--nav); backdrop-filter:blur(20px); border:1px solid var(--line); border-radius:24px; box-shadow:var(--shadow); transition:box-shadow .25s,border-color .25s; }
.site-header.is-scrolled { border-color:var(--control-border); box-shadow:0 12px 40px -20px #4c267b55; }
.header-inner { height:72px; padding-inline:20px; display:flex; align-items:center; justify-content:space-between; gap:20px; }
.site-nav { display:flex; align-items:center; gap:3px; margin-left:auto; padding:4px; border:1px solid var(--line); border-radius:999px; background:var(--soft); }
.site-nav a { display:flex; align-items:center; gap:6px; min-height:44px; padding:10px 12px; border-radius:999px; font-size:.76rem; font-weight:600; color:var(--muted); transition:color .2s,background .2s,box-shadow .2s; white-space:nowrap; }
.site-nav a[aria-current] { background:var(--surface); color:var(--accent); box-shadow:0 2px 8px #45277014; }
.site-nav a:hover { color:var(--accent); background:var(--surface); }
.nav-dot { width:5px;height:5px;border-radius:50%;background:currentColor;display:none; }
.site-nav a[aria-current] .nav-dot { display:block; }
.header-actions { display:flex; align-items:center; gap:6px; }
.header-cv { display:flex; align-items:center; gap:10px; min-height:44px; padding:8px 15px; border:1px solid var(--pop-ink); border-radius:999px; font-size:.8rem; font-weight:650; color:var(--pop-ink); background:var(--pop); transition:transform .18s; }
.header-cv:hover { transform:translateY(-2px); }
.menu-toggle { display:none; align-items:center; justify-content:center; height:44px; width:44px; border:1px solid var(--control-border); border-radius:50%; background:var(--surface); color:var(--ink); }
.reading-progress { position:absolute; bottom:-1px; left:24px; right:24px; height:2px; background:linear-gradient(90deg,var(--violet),var(--coral),var(--pop)); transform-origin:left; border-radius:8px; }
@media(max-width:1100px) { .header-inner { gap:10px;padding-inline:14px; } .site-nav a {padding:10px 9px;font-size:.72rem} }
@media(max-width:959px) {
 .site-header {left:16px;right:16px;top:12px;border-radius:22px}
 .header-inner {height:66px;padding-inline:12px} .menu-toggle {display:flex} .header-actions {gap:3px}
 .site-nav {display:none;position:absolute;top:76px;left:0;right:0;margin:0;padding:12px;border:1px solid var(--control-border);border-radius:22px;background:var(--surface);box-shadow:var(--shadow)}
 .site-nav.is-open {display:flex;flex-direction:column;align-items:stretch;gap:4px;animation:menu-enter .2s ease-out}
 .site-nav a {padding:14px 18px;border-radius:12px;font-size:1rem;min-height:52px;justify-content:space-between}
 .site-nav a[aria-current] {background:var(--soft)} .nav-dot {order:2}
}
@media(max-width:479px) { .site-header{left:10px;right:10px} .header-cv{display:none} .header-inner{gap:6px} }
@keyframes menu-enter {from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
</style>
