<template>
  <div class="sand-surface relative min-h-screen overflow-hidden text-black dark:text-white">
    <LazyUiGradient/>
    <UiParticles :key="count"/>
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

const count = ref(0)
const increment = () => count.value++

watch(() => darkMode.value, () => increment())
</script>

<style scoped>
.sand-surface {
  background-color: #f4ecdc;
  background-image:
    radial-gradient(rgba(120, 91, 48, 0.1) 0.7px, transparent 0.8px),
    radial-gradient(rgba(255, 255, 255, 0.75) 0.7px, transparent 0.8px),
    linear-gradient(135deg, #f7f0e4 0%, #efe2cd 52%, #f5ead8 100%);
  background-position: 0 0, 5px 5px, 0 0;
  background-size: 10px 10px, 10px 10px, 100% 100%;
}

:global(.dark) .sand-surface {
  background-color: #000;
  background-image: none;
}
</style>
