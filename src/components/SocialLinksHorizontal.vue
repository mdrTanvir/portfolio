<template>
  <div>
    <div class="overflow-hidden mb-2">
      <UiAnimate :distance="60" :delay="0.8" :duration="0.4" scrollTriggerStart="center bottom" :scrub="false">
        <p class="font-medium">FOLLOW ME</p>
      </UiAnimate>
    </div>
    <div v-if="siteData.socials.length" class="flex gap-6">
      <template
          v-for="(social, n) in siteData.socials"
          :key="social.name"
      >
        <UiAnimate
            :distance="20"
            :duration="0.4"
            :delay="0.8 + n * 0.1"
            scrollTriggerStart="center bottom"
            :scrub="false"
        >
          <a
              v-if="social.link"
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
          >
            <Icon
                v-if="social.icon"
                :name="social.icon"
                class="w-6 h-6 text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
            />
          </a>
        </UiAnimate>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import siteData from "~/config/data/data";
</script>