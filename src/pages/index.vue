<template>
  <main>
    <!--    <NavBarMobile/>-->
    <HomeHeroAbout/>
    <UiHeroParticles :key="count"/>
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