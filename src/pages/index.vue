<template>
  <main id="main-content" tabindex="-1">
    <HomeHeroAbout/>
    <HomeProjects/>
    <HomeExperience/>
    <HomeProfile/>
    <HomeSkills/>


  </main>
</template>

<script setup lang="ts">
useSEO('Tanvir Rahman | Software Development, Data & IT Support')

onMounted(async () => {
  await nextTick()
  const hash = window.location.hash.substring(1)
  if (hash) document.getElementById(hash)?.scrollIntoView({behavior: 'instant'})
})
</script>
