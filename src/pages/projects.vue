<template>
  <HomeProjects :all="true"/>
  <HomeOtherProjects :all="true"/>
  <WorkTogather :all="true"/>
</template>

<script setup lang="ts">
useSEO('Projects | Tanvir Rahman')

useScrollUpdate()
</script>
