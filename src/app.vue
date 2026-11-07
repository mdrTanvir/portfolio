<template>
  <div data-lenis :class="darkMode ? 'dark' : 'light'">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <NuxtRouteAnnouncer/>
    <NuxtLayout>
      <NuxtLoadingIndicator/>
      <NuxtPage/>
    </NuxtLayout>
    <template v-if="isDesktop">
      <LazyUiCursor/>
    </template>
  </div>
</template>

<script setup lang="ts">
const {isDesktop} = useIsDesktop()

const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)

themeStore.setTheme()
</script>
