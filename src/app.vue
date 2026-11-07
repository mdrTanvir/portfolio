<template>
  <div :class="darkMode ? 'dark' : 'light'">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <NuxtRouteAnnouncer/>
    <NuxtLayout><NuxtPage/></NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)
onMounted(() => themeStore.setTheme())
useHead(() => ({meta: [{name: 'theme-color', content: darkMode.value ? '#0b1218' : '#fcfcfd'}]}))
</script>
