<template>
  <div class="relative sm:ml-4 px-5 md:px-8 py-3 flex flex-col bg-gray-100 dark:bg-gray-900
        border-2 border-indigo-400 rounded-xl md:rounded-2xl shadow-md max-w-[400px]">
    <!-- Dot -->
<!--    <div class="timeline-dot"></div>-->
    <div class="block absolute w-6 h-6 md:w-10 md:h-10 rounded-full left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-[1]
                bg-primary dark:bg-primary border-[7px] md:border-[10px] border-white dark:border-black"></div>
    <slot>
      <h3 v-if="title" class="text-lg font-semibold text-primary">
        {{ title }}
      </h3>
      <p v-if="subtitle" class="text-sm text-gray-500 dark:text-gray-300 mix-blend-difference">
        {{ subtitle }}
      </p>
      <p v-if="description" class="text-xs text-gray-400 mt-1 mix-blend-difference">
        {{ description }}
      </p>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {type: String, default: '',},
  subtitle: {type: String, default: '',},
  description: {type: String, default: '',},
});
</script>