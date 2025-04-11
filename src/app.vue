<template>
  <div class="dark">
    <NuxtRouteAnnouncer/>
    <NuxtLayout>
      <NuxtLoadingIndicator/>
      <NuxtPage lazy/>
    </NuxtLayout>
    <LazyCursor/>
  </div>
</template>

<script setup lang="ts">
provideHeadlessUseId(() => useId())
</script>