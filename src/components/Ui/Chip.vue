<template>
  <div class="text-sm px-2 py-1 md:px-3 md:py-2 rounded font-medium bg-gray-200 dark:bg-gray-800 dark:text-white text-gray-800"
       :class="['flex items-center justify-center gap-2']">
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