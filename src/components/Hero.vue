<template>
  <div class="heroSection bg-white dark:bg-gray-950">

    <div class="relative z-10 pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
      <div class="contain">
        <!--        <div class="lg:grid lg:grid-cols-2 lg:gap-8">-->
        <!--          <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">-->
        <div class="lg:py-24">
          <h1 class="mt-10 font-extrabold sm:mt-12 sm:text-6xl lg:mt-20">
            <span class="block text-gray-600 dark:text-white">I am Tanvir Rahman</span>
            <span class="block text-indigo-400">a Web Developer</span>
          </h1>
          <p class="mt-3 text-base text-gray-500 dark:text-gray-200 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
            A Full-Stack Developer turning ideas into seamless digital experiences.
          </p>
        </div>
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>

    <client-only>
      <UiBlackHole :key="count"/>
    </client-only>
  </div>
</template>

<script setup lang="ts">
const count = ref(0)

const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)

watch(() => darkMode.value, () => {
  count.value++
})

onMounted(() => {
  window.addEventListener("resize", () => count.value++)
})
</script>

<style scoped>
.heroSection {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  width: 100%;
}
</style>