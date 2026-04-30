<template>
  <div class="overflow-hidden">
    <UiAnimate
        :distance="40"
        :duration="0.6"
        :delay="0.2"
        :scrub="false"
    >
      <NuxtLink to="/" data-hover class="brand-mark" aria-label="tanvir home">
        <img
          :src="brandLogoSrc"
          alt="Tanvir logo"
          class="brand-image"
        >
      </NuxtLink>
    </UiAnimate>
  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)

const brandLogoSrc = computed(() =>
  darkMode.value ? '/brand/tanvir-logo-dark.png' : '/brand/tanvir-logo-light.png'
)
</script>

<style scoped>
.brand-mark {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0;
  background: transparent;
  box-shadow: none;
  transition: transform 0.22s ease;
}

.brand-image {
  display: block;
  height: 2.65rem;
  width: auto;
  max-width: min(42vw, 16rem);
}

.brand-mark:hover {
  transform: translateY(-1px) scale(1.015);
}

@media (min-width: 640px) {
  .brand-image {
    height: 3rem;
  }
}
</style>
