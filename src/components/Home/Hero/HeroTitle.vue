<template>
  <div class="max-w-4xl">
    <div>
      <h1 class="max-w-[18ch] text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.05em] text-primary sm:text-[4.15rem] md:text-[3.55rem] lg:text-[3.7rem]">
        <span class="block text-gray-700 dark:text-white">{{ siteData.hero.greeting }}</span>
        <span class="mt-2 block text-[0.8em] leading-[1.08] tracking-[-0.02em] text-primary sm:text-[0.76em] md:text-[0.72em] lg:text-[0.7em]">{{ siteData.hero.headline }}</span>
      </h1>

      <div v-if="siteData.hero.headlineTags?.length" class="mt-5 flex flex-wrap gap-2">
        <span v-for="tag in siteData.hero.headlineTags" :key="tag" class="rounded-full border border-sky-300 bg-sky-100 px-3 py-1.5 text-sm font-semibold tracking-[0.08em] text-sky-900 dark:border-sky-400/20 dark:bg-sky-950/40 dark:text-sky-300">
          {{ tag }}
        </span>
      </div>

      <p v-if="siteData.hero.subheadline" class="mt-8 max-w-3xl text-[1.05rem] leading-8 text-gray-600 dark:text-gray-300 sm:text-[1.18rem] sm:leading-9 lg:text-[1.28rem]">
        {{ siteData.hero.subheadline }}
      </p>

      <div class="mt-8 block md:hidden"><SocialLinksHorizontal/></div>

      <div class="mt-8 flex flex-wrap gap-3 sm:gap-4">
        <a v-if="siteData.cvLink" :href="siteData.cvLink" target="_blank" rel="noopener noreferrer">
          <UiPrimaryButton><Icon name="lucide:download" class="mr-2 h-4 w-4"/>Download CV</UiPrimaryButton>
        </a>
        <UiPrimaryButton inverted @click="scrollTo('CONTACT')"><Icon name="lucide:message-circle" class="mr-2 h-4 w-4"/>Let's Talk</UiPrimaryButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import siteData from "~/config/data/data";

const {scrollTo} = useScrollTo()
</script>
