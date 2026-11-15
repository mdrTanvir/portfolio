<template><div class="appearance-picker" role="group" aria-label="Website colour theme"><button type="button" :aria-pressed="darkMode" @click="themeStore.setTheme(true)"><span class="swatch graphite" aria-hidden="true"></span>Graphite</button><button type="button" :aria-pressed="!darkMode" @click="themeStore.setTheme(false)"><span class="swatch silver" aria-hidden="true"></span>Silver</button></div></template>
<script setup lang="ts">
const themeStore=useThemeStore()
const {darkMode}=storeToRefs(themeStore)
</script>
<style scoped>
.appearance-picker{display:inline-flex;gap:3px;border:1px solid var(--control-border);border-radius:999px;padding:3px;background:var(--surface)}button{display:flex;align-items:center;gap:6px;min-height:44px;padding:8px 10px;border-radius:999px;font-size:.62rem;font-weight:600;color:var(--muted);transition:background .2s,color .2s}button[aria-pressed=true]{background:var(--soft);color:var(--accent);box-shadow:inset 0 0 0 1px var(--line)}.swatch{width:8px;height:8px;border-radius:50%;border:1px solid var(--control-border)}.graphite{background:#0c0e12}.silver{background:#dce2ec}@media(max-width:767px){button{min-height:44px}}
</style>
