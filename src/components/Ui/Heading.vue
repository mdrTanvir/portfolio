<template>
  <div class="overflow-hidden mb-8 md:mb-10">
    <UiAnimate
        :distance="60"
        :delay="0.2"
    >
<!--        ease="back.out(3)"-->
      <h1
          class="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.04em] !text-primary"
      >
        <slot></slot>
      </h1>
    </UiAnimate>
  </div>
</template>
