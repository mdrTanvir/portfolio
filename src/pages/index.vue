<template>
  <main>
    <HomeHero/>
    <UiParticlesHeroParticles :key="count"/>
<!--    <SvgLine/>-->
    <HomeAbout/>
    <HomeSkills/>
    <HomeExperience/>
    <HomeProjects/>
    <HomeContact/>
    <TheFooder/>
  </main>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)

const count = ref(0)

const increment = () => {
  count.value++
}

watch(() => darkMode.value, () => {
  increment()
})
</script>