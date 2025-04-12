<template>
  <div class="relative overflow-hidden bg-white dark:bg-gray-950 text-black dark:text-white">
    <NavBar/>
    <NuxtPage/>
  </div>
</template>

<script setup lang="ts">
const theme = useThemeStore()

onMounted(() => {
  theme.applyTheme()
})
</script>