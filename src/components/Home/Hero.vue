<template>
  <div class="heroSection pb-10 md:pb-14 lg:pb-20">
    <div class="contain relative h-screen min-h-screen z-10 max-h-[1300px] pt-10 sm:pt-16 md:pt-24 pb-6 md:pb-10">
      <div class="h-full flex flex-col justify-between relative z-[2]">
        <HeroTitle/>
        <HeroStats/>
      </div>

      <div>
        <!-- Social Links -->
        <div class="absolute bottom-[40px] right-0 hidden md:block">
          <SocialLinksVertical/>
        </div>
        <img class="img" src="/images/profile2.jpg" alt=""
             ref="heroImageRef"
             id="heroImageRef"
             loading="lazy"
        >
      </div>
    </div>

    <div class="beam beam-top-1"></div>
    <div class="beam beam-top-2"></div>

    <!--    <template v-if="isDesktop">-->
    <!--      <UiBlackHole/>-->
    <!--    </template>-->
  </div>
</template>

<script setup lang="ts">
// const heroImageRef = ref<HTMLImageElement | null>(null);
// defineExpose({ heroImageRef });
</script>

<style scoped lang="scss">
.heroSection {
  position: relative;
  z-index: 1;
  height: 100%;
  max-height: 1300px;
  width: 100%;
}

.img {
  position: absolute;
  z-index: 0;
  bottom: 0;
  right: 40px;
  width: auto;
  height: 80vh;
  max-width: 100%;
  //filter: blinds(10px, 0deg);
  mix-blend-mode: lighten !important;
  transition: transform 0.3s ease;
  will-change: transform;
}

@media screen and (max-width: 768px) {
  .img {
    right: 0;
    width: 100%;
    height: auto;
    max-width: 100%;
  }
}

.beam {
  opacity: 1;
  --border-bottom-width: 0px;
  --border-color: rgba(238, 238, 238, .1);
  --border-left-width: 0px;
  --border-right-width: 0px;
  --border-style: solid;
  --border-top-width: 1px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .05) 0%, rgba(171, 171, 171, 0) 100%);
  border-bottom: var(--border-bottom-width) var(--border-style) var(--border-color);
  border-left: var(--border-left-width) var(--border-style) var(--border-color);
  border-right: var(--border-right-width) var(--border-style) var(--border-color);
  border-top: var(--border-top-width) var(--border-style) var(--border-color);
  flex: none;
  overflow: hidden;
  position: absolute;
  width: 1065px;
  z-index: 5;

  //transform: rotate(0deg);
  animation: 1s fadeInBig ease-in-out forwards;
  animation-delay: 400ms;
}

.beam-top-1 {
  right: -134px;
  top: 10%;
  z-index: 1;
  transform: perspective(1200px) rotate(22deg);
}

.beam-top-2 {
  right: -134px;
  top: -2%;
  z-index: 2;
  transform: perspective(1200px) rotate(28deg);
}

@keyframes fadeInBig {
  0% {
    opacity: 0;
    height: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    height: 145px;
  }
}
</style>
