<template>
  <main>
    <HomeHeroAbout/>
    <HomeSkills/>
    <HomeExperience/>
    <HomeProjects/>
  </main>
</template>

<script setup lang="ts">
useSEO('Home')

onMounted(() => {
  const hash = window.location.hash?.substring(1)
  if (hash) {
    setTimeout(() => {
      const target = document.getElementById(hash)
      if (target) {
        const {$lenis} = useNuxtApp()
        const {isDesktop} = useIsDesktop()
        $lenis?.scrollTo(target, {
          offset: -40,
          duration: isDesktop ? 2 : 1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      }
    }, 200) // slight delay to ensure DOM is ready
  }
})
</script>