<template>
  <div class="overflow-hidden">
    <UiAnimate
        :distance="40"
        :duration="0.6"
        :delay="0.4"
        :scrub="false"
    >
      <h3 class="h3 text-black dark:text-white">{{ siteData.logoName }}</h3>
    </UiAnimate>
  </div>
</template>

<script setup lang="ts">
import siteData from "~/config/data";
</script>