<template>
  <div class="overflow-hidden mb-6">
    <UiAnimate
        :distance="60"
        :delay="0.2"
    >
<!--        ease="back.out(3)"-->
      <h1
          class="text-primary text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight uppercase"
      >
        <slot></slot>
        <span class="text-2xl text-gray-500 dark:text-gray-400">.</span>
      </h1>
    </UiAnimate>
  </div>
</template>