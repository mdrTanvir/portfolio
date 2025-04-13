<template>
  <NuxtRouteAnnouncer/>
  <NuxtLayout>
    <NuxtLoadingIndicator/>
    <NuxtPage lazy/>
  </NuxtLayout>
  <client-only>
    <template v-if="isDesktop">
<!--      <LazyUiCursor/>-->
    </template>
  </client-only>
</template>

<script setup lang="ts">
provideHeadlessUseId(() => useId())
const {isDesktop} = useDevice()
</script>