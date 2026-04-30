<template>
  <main data-lenis :class="darkMode ? 'dark' : 'light'">
    <NuxtRouteAnnouncer/>
    <NuxtLayout>
      <NuxtLoadingIndicator/>
      <NuxtPage/>
    </NuxtLayout>
    <template v-if="isDesktop">
      <LazyUiCursor/>
    </template>
  </main>
</template>

<script setup lang="ts">
const {isDesktop} = useIsDesktop()

const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)

themeStore.setTheme()
</script>
