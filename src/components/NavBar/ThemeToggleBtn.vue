<template>
  <button
      class="a text-gray-700 dark:text-white w-6 h-6"
      aria-label="Toggle Theme"
      data-hover
      @click="themeStore.toggleTheme()"
  >
    <IconSun v-if="darkMode"/>
    <IconMoon v-else/>
    <!--    <Icon v-if="darkMode" name="lucide:sun" class="w-6 h-6"/>-->
    <!--    <Icon v-else name="lucide:moon" class="w-6 h-6"/>-->
  </button>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)
</script>