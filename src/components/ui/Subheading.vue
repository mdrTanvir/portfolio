<template>
  <UiAnimate
      direction="right"
      :distance="10"
      :duration="0.6"
      :delay="0.2"
      scrollTriggerStart="center bottom"
  >
    <div class="text-center sm:text-left before:block before:w-24 before:h-2 before:mb-3 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-primary">
      <h3 class="h3 text-gray-600 dark:text-gray-300 capitalize">
        <slot></slot>
      </h3>
      <!--      <span class="text-sm font-bold tracking-wider uppercase dark:text-gray-600"></span>-->
    </div>
  </UiAnimate>
</template>

<script setup lang="ts">

</script>