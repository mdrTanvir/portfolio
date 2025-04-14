<template>
  <div
      :class="[
      'text-center sm:text-left',
      'before:block before:w-16 before:h-1 before:mb-3 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-primary'
      ]"
  >
    <UiAnimate
        direction="up"
        :distance="10"
        :duration="0.6"
        :delay="0.2"
        scrollTriggerStart="center bottom"
    >
      <div class="overflow-hidden">
        <h3 class="h3 text-gray-600 dark:text-gray-400 capitalize">
          <slot></slot>
        </h3>
      </div>
      <!--      <span class="text-sm font-bold tracking-wider uppercase dark:text-gray-600"></span>-->
    </UiAnimate>
  </div>
</template>

<script setup lang="ts">

</script>