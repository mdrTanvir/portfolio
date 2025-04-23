<template>
  <div class="pt-28 sm:pt-32 md:pt-38 xl:pt-44">
    <h1 class="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
      <div class="overflow-hidden">
        <UiAnimate :distance="60" :delay="0.4" :duration="0.4" scrollTriggerStart="center bottom" :scrub="false">
          <span class="fluid block text-gray-600 dark:text-white">I am {{ siteData.name }},</span>
        </UiAnimate>
      </div>
      <div class="overflow-hidden">
        <UiAnimate :distance="60" :delay="0.6" :duration="0.4" scrollTriggerStart="center bottom" :scrub="false">
          <span class="fluid block text-gray-600 dark:text-white">a <span class="!text-primary">Web Developer</span></span>
        </UiAnimate>
      </div>
    </h1>
    <div class="overflow-hidden mb-6">
      <UiAnimate :distance="60" :delay="0.8" :duration="0.4" scrollTriggerStart="center bottom" :scrub="false">
        <p v-if="siteData.slogan"
           class="text-base text-gray-500 dark:text-gray-200 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
           v-html="siteData.slogan"
        ></p>
      </UiAnimate>
    </div>

    <div class="mb-6 block md:hidden">
      <SocialLinksHorizontal/>
    </div>

    <div class="mb-6 flex flex-wrap gap-4">
      <UiAnimate v-if="siteData.cvLink" :distance="10" :delay="1.2" :duration="0.6" scrollTriggerStart="center bottom" :scrub="false">
        <a :href="siteData.cvLink" target='_blank' rel="noreferrer">
          <UiPrimaryButton>
            <span class="hoverMove">
              <Icon name="lucide:download" class="w-4 h-4 mr-2"/> Download CV
            </span>
          </UiPrimaryButton>
        </a>
      </UiAnimate>
      <UiAnimate :distance="10" :delay="1.4" :duration="0.6" scrollTriggerStart="center bottom" :scrub="false">
        <UiPrimaryButton
            inverted
            @click="scrollTo('CONTACT')"
        >
            <span class="hoverMove">
              <Icon name="lucide:message-circle" class="w-4 h-4 mr-2"/> Let's Talk
            </span>
        </UiPrimaryButton>
      </UiAnimate>
    </div>
  </div>
</template>

<script setup lang="ts">
import siteData from "~/config/data";

const {scrollTo} = useScrollTo()
</script>