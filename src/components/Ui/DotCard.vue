<template>
  <div class="timeline-card">
    <!-- Dot -->
    <div class="timeline-dot"></div>
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