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
  'hover:bg-indigo-500 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-white',
]

const invertedClasses = [
  'btn',
  'bg-indigo-500 dark:bg-indigo-500 text-white',
  'hover:bg-gray-800 dark:hover:bg-white hover:text-white dark:hover:text-black',
]
</script>