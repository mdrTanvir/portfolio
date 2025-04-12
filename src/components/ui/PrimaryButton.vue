<template>
  <NuxtLink
      v-if="to"
  >
    <button
        data-hover
        :class="classes"
    >
      <slot></slot>
    </button>
  </NuxtLink>
  <button
      v-else
      :class="classes"
      data-hover
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  to: {type: String, default: ''},
})

const classes = [
  'btn',
  'bg-gray-800 dark:bg-white text-white dark:text-black',
  'hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white dark:hover:text-white',
  'focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
]
</script>