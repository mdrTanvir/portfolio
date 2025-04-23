<template>
  <NuxtLink
      v-if="to"
  >
    <button
        data-hover
        :class="inverted ? invertedClasses : classes"
    >
      <slot></slot>
    </button>
  </NuxtLink>
  <button
      v-else
      :class="inverted ? invertedClasses : classes"
      data-hover
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  to: {type: String, default: ''},
  inverted: {type: Boolean, default: false},
})

const classes = [
  'btn',
  'bg-gray-200 dark:bg-white text-black dark:text-black',
  'hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white',
]

const invertedClasses = [
  'btn',
  'bg-primary dark:bg-primary text-white',
  'hover:bg-gray-800 dark:hover:bg-white hover:text-white dark:hover:text-black',
]
</script>

<style lang="scss" scoped>
.btn:active {
  transition: all 0.1s ease-in-out;
  transform: scale(0.96);
}
</style>