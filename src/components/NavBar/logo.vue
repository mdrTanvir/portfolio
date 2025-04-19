<template>
  <div class="overflow-hidden">
    <UiAnimate
        :distance="40"
        :duration="0.6"
        :delay="0.4"
        :scrub="false"
    >
      <h3 class="text-2xl sm:text-3xl tracking-tight text-black dark:text-white cursive">
        {{ siteData.logoName }}
      </h3>
    </UiAnimate>
  </div>
</template>

<script setup lang="ts">
import siteData from "~/config/data";
</script>

<style scoped>
.cursive {
  font-family: 'Pacifico', cursive;
}
</style>