<template>
  <main data-lenis>
    <NuxtRouteAnnouncer/>
    <NuxtLayout>
      <NuxtLoadingIndicator/>
      <NuxtPage lazy/>
    </NuxtLayout>
    <template v-if="isDesktop">
      <LazyUiCursor/>
    </template>
  </main>
</template>

<script setup lang="ts">
// provideHeadlessUseId(() => useId())
const {isDesktop} = useIsDesktop()
</script>