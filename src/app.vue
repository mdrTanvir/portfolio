<template>
  <NuxtRouteAnnouncer/>
  <NuxtLayout>
    <NuxtLoadingIndicator/>
    <NuxtPage lazy/>
  </NuxtLayout>
  <LazyCursor/>
</template>

<script setup lang="ts">
provideHeadlessUseId(() => useId())
</script>