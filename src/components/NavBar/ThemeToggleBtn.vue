<template>
  <button class="theme-toggle" type="button" :aria-label="darkMode ? 'Switch to light theme' : 'Switch to dark theme'" :aria-pressed="darkMode" @click="themeStore.toggleTheme()">
    <IconSun v-if="darkMode"/><IconMoon v-else/>
  </button>
</template>
<script setup lang="ts">
const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)
</script>
<style scoped>
.theme-toggle { display:flex; align-items:center; justify-content:center; width:44px; height:44px; padding:11px; border:1px solid transparent; border-radius:50%; color:var(--ink); background:transparent; transition:background .18s,transform .25s; }
.theme-toggle:hover { background:var(--soft); transform:rotate(15deg); }
.theme-toggle :deep(svg) { width:20px; height:20px; }
</style>
