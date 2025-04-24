<template>
  <div class="relative overflow-hidden bg-white dark:bg-black text-black dark:text-white">
    <LazyUiGradient/>
    <UiParticles :key="count"/>
    <NavBar/>
    <NuxtPage/>
    <ContactDetails/>
    <TheFooder/>
  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)

const count = ref(0)
const increment = () => count.value++

watch(() => darkMode.value, () => increment())
</script>