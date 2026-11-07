<template>
  <main id="main-content" tabindex="-1">
  <HomeProjects :all="true"/>
  <HomeOtherProjects :all="true"/>
  <WorkTogather :all="true"/>
  </main>
</template>

<script setup lang="ts">
useSEO('Projects | Tanvir Rahman')

useScrollUpdate()
</script>
