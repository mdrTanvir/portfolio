<template>
  <div class="mouse-wave mx-auto mt-[125px] w-6 h-[100px] relative">
    <span class="scroll-arrow one"></span>
    <span class="scroll-arrow two"></span>
    <span class="scroll-arrow three"></span>
  </div>
</template>

<script setup>
// No script needed unless you want interactivity
</script>

<style scoped lang="scss">
.scroll-arrow {
  @apply block w-10 h-10 rotate-45 border-r-4 border-b-4 border-black dark:border-white opacity-0;
  margin: 0 0 3px 4px;
  animation-name: mouse-wave;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-direction: alternate;
}

@keyframes mouse-wave {
  0% {
    opacity: 0;
  }
  50% {
    opacity: .3;
  }
  100% {
    opacity: 0.6;
  }
}

//@keyframes mouse-wave {
//  0% {
//    opacity: 0;
//    transform: translateY(0);
//  }
//  50% {
//    opacity: 1;
//    transform: translateY(-10px);
//  }
//  100% {
//    opacity: 0;
//    transform: translateY(0);
//  }
//}

.scroll-arrow.one {
  margin-top: 1px;
  animation-delay: 0.1s;
}

.scroll-arrow.two {
  margin-top: -6px;
  animation-delay: 0.2s;
}

.scroll-arrow.three {
  margin-top: -6px;
  animation-delay: 0.3s;
}
</style>
