<template>
  <div class="relative overflow-hidden bg-white dark:bg-black text-black dark:text-white">
    <LazyUiGradient/>
    <ClientOnly><UiParticles v-if="showParticles" :key="count"/></ClientOnly>
    <div class="relative z-10">
      <NavBar/>
      <NuxtPage/>
      <ContactDetails/>
      <TheFooder/>
    </div>
  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)

const showParticles = ref(false)
onMounted(() => { showParticles.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches })
const count = ref(0)
const increment = () => count.value++

watch(() => darkMode.value, () => increment())
</script>
