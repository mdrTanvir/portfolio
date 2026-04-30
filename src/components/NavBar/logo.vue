<template>
  <div class="overflow-hidden">
    <UiAnimate
        :distance="40"
        :duration="0.6"
        :delay="0.2"
        :scrub="false"
    >
      <h3 class="pr-2 text-[2rem] tracking-[-0.03em] text-black dark:text-white sm:text-[2.4rem] lg:text-[2.7rem] cursive">
        <NuxtLink to="/" data-hover class="brand-mark">
          {{ siteData.logoName }}
        </NuxtLink>
      </h3>
    </UiAnimate>
  </div>
</template>

<script setup lang="ts">
import siteData from "~/config/data/data";
</script>

<style scoped>
.cursive {
  font-family: 'Pacifico', cursive;
}

.brand-mark {
  position: relative;
  display: inline-block;
  color: inherit;
  text-shadow: 0 10px 28px rgba(15, 23, 42, 0.12);
  transition: transform 0.22s ease, text-shadow 0.22s ease, color 0.22s ease;
}

.brand-mark::after {
  content: '';
  position: absolute;
  left: 0.18em;
  right: 0.08em;
  bottom: 0.12em;
  height: 0.16em;
  border-radius: 9999px;
  background: linear-gradient(90deg, rgba(56, 189, 248, 0.28), rgba(56, 189, 248, 0.05));
  z-index: -1;
  transition: transform 0.22s ease, opacity 0.22s ease;
}

.brand-mark:hover {
  transform: translateY(-1px) scale(1.015);
  color: rgb(14 165 233);
  text-shadow: 0 14px 32px rgba(56, 189, 248, 0.18);
}

.brand-mark:hover::after {
  transform: scaleX(1.04);
  opacity: 1;
}
</style>
