<template>
  <div class="relative flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white/70 px-6 py-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40">
    <!-- Dot -->
    <!--    <div class="timeline-dot"></div>-->
    <slot>
      <h4
          v-if="title"
          class="font-semibold tracking-[-0.02em] text-gray-900 dark:text-white"
          :class="{'text-lg sm:text-xl': responsiveText, 'text-xl': !responsiveText}"
      >
        {{ title }}
      </h4>
      <p
          v-if="subtitle"
          class="mt-2 text-sm font-semibold uppercase leading-7 tracking-[0.14em] text-primary"
          :class="{'sm:text-base': responsiveText, 'text-base': !responsiveText}"
      >
        {{ subtitle }}
      </p>
      <p
          v-if="duration"
          class="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400"
      >
        {{ duration }}
      </p>
      <p
          v-if="description"
          class="mt-3 text-justify text-[15px] leading-7 text-gray-600 dark:text-gray-300 sm:text-base sm:leading-8"
      >
        {{ description }}
      </p>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {type: String, default: '',},
  subtitle: {type: String, default: '',},
  duration: {type: String, default: '',},
  description: {type: String, default: '',},
  responsiveText: {type: Boolean, default: false,},
});
</script>
