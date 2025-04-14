<template>
  <div class="heroSection">

    <div class="relative z-10 pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
      <div class="contain">
        <div class="py-24 md:py-32">
          <h1 class="mt-10 font-extrabold sm:mt-12 sm:text-6xl lg:mt-20">
            <div class="overflow-hidden">
              <span class="fadeIn delay-150 block text-gray-600 dark:text-white">I am {{ siteData.name }}</span>
            </div>
            <div class="overflow-hidden">
              <span class="fadeIn delay-300 block text-primary">a Web Developer</span>
            </div>
          </h1>
          <div class="overflow-hidden mb-6">
            <p v-if="siteData.slogan"
               class="fadeIn delay-300  text-base text-gray-500 dark:text-gray-200 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
               v-html="siteData.slogan"
            ></p>
          </div>

          <!-- Social Links -->
          <SocialLinks class="mb-6"/>

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
    </div>

    <template v-if="isDesktop">
<!--      <UiBlackHole/>-->
    </template>
  </div>
  <div class="pb-10 md:pb-14 lg:pb-20"></div>
</template>

<script setup lang="ts">
const {isDesktop} = useDevice()
import siteData from "~/config/data";
</script>

<style scoped>
.heroSection {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  width: 100%;
}
</style>