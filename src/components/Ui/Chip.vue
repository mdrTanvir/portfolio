<template>
  <div
      class="w-full rounded bg-gray-200 px-2 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-white md:px-3 md:py-2 sm:w-auto"
      :class="['flex items-center justify-center gap-2']"
  >
    <img v-if="image" :src="image" :alt="image"
         height="20px" width="20px"
         class="h-4 w-4 sm:h-5 sm:w-5"
         loading="lazy"/>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  image: {type: String, default: ''}
});
</script>
