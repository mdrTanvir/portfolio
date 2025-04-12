<template>
  <div class="relative overflow-hidden bg-white dark:bg-[#09090BFF] text-black dark:text-white">
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