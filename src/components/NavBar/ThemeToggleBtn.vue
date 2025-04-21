<template>
  <button @click="themeStore.toggleTheme()" data-hover class="a text-gray-700 dark:text-white w-6 h-6">
    <Icon v-if="darkMode" name="lucide:sun" class="w-6 h-6"/>
    <Icon v-else name="lucide:moon" class="w-6 h-6"/>
  </button>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)
</script>