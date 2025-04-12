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
// props
const props = defineProps({
  to: {
    type: String,
    default: ''
  },
})

const classes = [
  'px-5 py-3 rounded-lg',
  'font-medium bg-gray-800 dark:bg-white text-white dark:text-black',
  'hover:bg-indigo-400 dark:hover:bg-indigo-400 hover:text-white dark:hover:text-white',
  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
  'transition duration-300 ease-in-out'
]
</script>