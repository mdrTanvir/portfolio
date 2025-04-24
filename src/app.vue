<template>
  <main data-lenis :class="darkMode ? 'dark' : 'light'">
    <NuxtRouteAnnouncer/>
    <NuxtLayout>
      <NuxtLoadingIndicator/>
      <NuxtPage lazy/>
    </NuxtLayout>
    <template v-if="isDesktop">
      <LazyUiCursor/>
    </template>
  </main>
</template>

<script setup lang="ts">
const {isDesktop} = useIsDesktop()

const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)

themeStore.setTheme()

onMounted(() => {
  const hash = window.location.hash?.substring(1)
  if (hash) {
    setTimeout(() => {
      const target = document.getElementById(hash)
      if (target) {
        const {$lenis} = useNuxtApp()
        // const {isDesktop} = useIsDesktop()
        $lenis?.scrollTo(target, {
          offset: -40,
          duration: 1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      }
    }, 200) // slight delay to ensure DOM is ready
  }
})
</script>