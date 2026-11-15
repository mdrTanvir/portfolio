<template>
  <button class="theme-toggle" type="button" :aria-label="darkMode ? 'Switch to light theme' : 'Switch to dark theme'" :aria-pressed="darkMode" @click="themeStore.toggleTheme()">
    <IconSun v-if="darkMode"/><IconMoon v-else/><span>{{ darkMode ? 'Graphite' : 'Silver' }}</span>
  </button>
</template>
<script setup lang="ts">
const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)
</script>
<style scoped>
.theme-toggle { display:flex; align-items:center; justify-content:center; min-width:44px; gap:7px; height:44px; padding:10px; border:1px solid transparent; border-radius:999px; color:var(--ink); background:transparent; transition:background .18s,transform .25s; }
.theme-toggle:hover { background:var(--soft);  }
.theme-toggle span{font-size:.68rem;font-weight:600}@media(max-width:479px){.theme-toggle span{display:none}}
.theme-toggle :deep(svg) { width:20px; height:20px; }
</style>
