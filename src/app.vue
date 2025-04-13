<template>
  <NuxtRouteAnnouncer/>
  <NuxtLayout>
    <NuxtLoadingIndicator/>
    <NuxtPage lazy/>
  </NuxtLayout>
  <template v-if="isDesktop">
    <LazyUiCursor/>
  </template>
</template>

<script setup lang="ts">
provideHeadlessUseId(() => useId())
const {isDesktop} = useDevice()
</script>