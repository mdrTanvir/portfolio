<template>
  <section v-if="siteData.experiences && siteData.experiences.length" class="contain content-section">
    <ui-heading>Experience</ui-heading>

    <div class="container max-w-5xl px-4 py-12 mx-auto">
      <div class="grid gap-4 mx-4 sm:grid-cols-12">
        <div class="col-span-12 sm:col-span-3">
          <UiSubheading>Work Experience</UiSubheading>
        </div>
        <div class="relative col-span-12 px-4 space-y-6 sm:col-span-9">
          <div class="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-300">
            <div v-for="(experience, index) in siteData.experiences" :key="index" class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-primary">
              <h3 class="text-xl font-semibold tracking-wide">{{ experience.title }}</h3>
              <time class="text-xs tracking-wide uppercase dark:text-gray-400">{{ experience.duration }}</time>
              <p class="mt-3" v-html="experience.description"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import siteData from "~/config/data";
</script>