<template>
  <main>
    <HomeHeroAbout/>
    <HomeSkills/>
    <HomeExperience/>
    <!--<HomeProjectsOld/>-->
    <HomeProjects/>
    <HomeOtherProjects/>
    <WorkTogather/>
  </main>
</template>

<script setup lang="ts">
useSEO('Home')

useScrollUpdate()

onMounted(async () => {
  await nextTick()
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
