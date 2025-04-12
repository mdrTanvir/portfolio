<template>
  <NuxtRouteAnnouncer/>
  <NuxtLayout>
    <NuxtLoadingIndicator/>
    <NuxtPage lazy/>
  </NuxtLayout>
  <LazyUiCursor/>
</template>

<script setup lang="ts">
provideHeadlessUseId(() => useId())
</script>