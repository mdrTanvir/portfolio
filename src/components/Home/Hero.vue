<template>
  <div class="heroSection">
    <div class="contain relative h-screen z-10 max-h-[1300px] pt-10 sm:pt-16 lg:pb-14">
      <div class="py-24 md:py-32">
        <!--        <div class="sm:mt-12 sm:text-6xl lg:mt-20 ">-->
        <!--          <HeroText/>-->
        <!--        </div>-->
        <h1 class="mt-10 font-extrabold sm:mt-12 text-3xl sm:text-4xl md:text-6xl lg:mt-20">
          <div class="overflow-hidden">
            <UiAnimate
                :distance="60"
                :delay="0.6"
                :duration="0.8"
                scrollTriggerStart="center bottom"
                :scrub="false"
            >
              <span class="fluid block text-gray-600 dark:text-white">I am {{ siteData.name }},</span>
            </UiAnimate>
          </div>
          <div class="overflow-hidden">
            <UiAnimate
                :distance="60"
                :delay="0.8"
                :duration="0.8"
                scrollTriggerStart="center bottom"
                :scrub="false"
            >
              <span class="fluid block text-gray-600 dark:text-white">a <span class="!text-primary">Web Developer</span></span>
            </UiAnimate>
          </div>
        </h1>
        <div class="overflow-hidden mb-6">
          <UiAnimate
              :distance="60"
              :delay="1"
              :duration="0.8"
              scrollTriggerStart="center bottom"
              :scrub="false"
          >
            <p v-if="siteData.slogan"
               class="text-base text-gray-500 dark:text-gray-200 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
               v-html="siteData.slogan"
            ></p>
          </UiAnimate>
        </div>

        <!-- Social Links -->
        <div class="absolute bottom-[40px] right-0 hidden md:block">
          <SocialLinksVertical/>
        </div>
        <div class="mb-6 block md:hidden">
          <SocialLinksHorizontal/>
        </div>

        <div class="mb-6 flex flex-wrap gap-4">
          <UiAnimate
              :distance="10"
              :delay="1.2"
              :duration="0.6"
              scrollTriggerStart="center bottom"
              :scrub="false"
          >
            <UiPrimaryButton to="/">
              <span class="hoverMove">
                <Icon name="lucide:download" class="w-4 h-4 mr-2"/>
                Download CV
              </span>
            </UiPrimaryButton>
          </UiAnimate>
          <UiAnimate
              :distance="10"
              :delay="1.4"
              :duration="0.6"
              scrollTriggerStart="center bottom"
              :scrub="false"
          >
            <UiPrimaryButton to="/" inverted>
              <span class="hoverMove">
                <Icon name="lucide:message-circle" class="w-4 h-4 mr-2"/>
                Let's Talk
              </span>
            </UiPrimaryButton>
          </UiAnimate>
        </div>
      </div>

      <div>
        <!--        <UiAnimate-->
        <!--            direction="left"-->
        <!--            :distance="10"-->
        <!--            :duration="0.4"-->
        <!--            :delay="0.2"-->
        <!--            scrollTriggerStart="center bottom"-->
        <!--        >-->
        <!--        </UiAnimate>-->
        <!--        <img class="img" src="/images/profile2.jpg" alt="">-->
      </div>
    </div>

    <div class="beam beam-top-1"></div>
    <div class="beam beam-top-2"></div>

    <template v-if="isDesktop">
      <!--      <UiBlackHole/>-->
    </template>
  </div>
  <!--  <div class="pb-10 md:pb-14 lg:pb-20"></div>-->
</template>

<script setup lang="ts">
const {isDesktop} = useDevice()
import siteData from "~/config/data";
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
  z-index: 1;
  bottom: 0;
  right: 40px;
  width: auto;
  height: 80vh;
  max-width: 100%;
  filter: blinds(10px, 0deg);
  mix-blend-mode: lighten !important;
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
  z-index: 1;

  //transform: rotate(0deg);
  animation: 1s fadeInBig ease-in-out forwards;
  animation-delay: 400ms;
}

.beam-top-1 {
  right: -134px;
  top: 104px;
  z-index: 1;
  transform: perspective(1200px) rotate(22deg);
}

.beam-top-2 {
  right: -134px;
  top: -20px;
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
