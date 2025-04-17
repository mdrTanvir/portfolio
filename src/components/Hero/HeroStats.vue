<template>
  <div class="flex flex-wrap gap-3 sm:gap-4 mt-10">
    <template v-for="(stat, n) in siteData.stats">
      <UiAnimate :distance="10" :delay="1.2 + n * 0.2" :duration="0.6" scrollTriggerStart="center bottom" :scrub="false">
        <UiDotCard class="w-auto md:w-[170px] py-3 md:py-5" :title="stat.title" :subtitle="stat.subtitle"/>
      </UiAnimate>
    </template>
  </div>
</template>

<script setup lang="ts">
import siteData from "~/config/data";
</script>