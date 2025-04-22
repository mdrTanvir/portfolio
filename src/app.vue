<template>
  <main data-lenis :class="darkMode ? 'dark' : 'light'">
    <NuxtRouteAnnouncer/>
    <NuxtLayout>
      <NuxtLoadingIndicator/>
      <NuxtPage lazy/>
    </NuxtLayout>
    <template v-if="isDesktop && isProduction()">
      <LazyUiCursor/>
    </template>
  </main>
</template>

<script setup lang="ts">
import isProduction from "~/config/env";
// provideHeadlessUseId(() => useId())
const {isDesktop} = useIsDesktop()

const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)

themeStore.setTheme()
</script>