<template>
  <div class="heroSection">

    <div class="contain relative h-screen z-10 pt-10 sm:pt-16 lg:pb-14">
      <div class="py-24 md:py-32">
        <h1 class="mt-10 font-extrabold sm:mt-12 sm:text-6xl lg:mt-20">
          <div class="overflow-hidden">
            <UiAnimate
                direction="up"
                :distance="60"
                :duration="0.4"
                :delay="0.4"
                scrollTriggerStart="center bottom"
            >
              <span class="block text-gray-600 dark:text-white">I am {{ siteData.name }}</span>
            </UiAnimate>
          </div>
          <div class="overflow-hidden">
            <UiAnimate
                direction="up"
                :distance="60"
                :duration="0.4"
                :delay="0.4"
                scrollTriggerStart="center bottom"
            >
              <span class="block text-primary">a Web Developer</span>
            </UiAnimate>
          </div>
        </h1>
        <div class="overflow-hidden mb-6">
          <UiAnimate
              direction="up"
              :distance="60"
              :duration="0.4"
              :delay="0.4"
              scrollTriggerStart="center bottom"
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

        <div class="mb-6 flex gap-4">
          <UiAnimate
              direction="up"
              :distance="10"
              :duration="0.4"
              :delay="0.2"
              scrollTriggerStart="center bottom"
          >
            <UiPrimaryButton to="/">
              <span class="hoverMove">
                <Icon name="lucide:download" class="w-4 h-4 mr-2"/>
                Download CV
              </span>
            </UiPrimaryButton>
          </UiAnimate>
          <UiAnimate
              direction="up"
              :distance="10"
              :duration="0.4"
              :delay="0.4"
              scrollTriggerStart="center bottom"
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
    </div>

    <div>
      <img class="img" src="/images/profile2.jpg" alt="">
    </div>

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
  min-height: 100vh;
  width: 100%;
}

.img {
  position: absolute;
  bottom: 0;
  right: 0;
  width: auto;
  height: 80vh;
  max-width: 100%;
  z-index: 1;
  filter: blinds(10px, 0deg);
  mix-blend-mode: lighten !important;
}
</style>