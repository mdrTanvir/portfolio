<template>
  <div>
    <div class="overflow-hidden mb-2">
      <p class="fadeIn delay-700 font-medium">FOLLOW ME</p>
    </div>
    <div v-if="siteData.socials.length" class="flex gap-6">
      <template
          v-for="(social, n) in siteData.socials"
          :key="social.name"
      >
        <UiAnimate
            direction="up"
            :distance="20"
            :duration="0.4"
            :delay="0.2 + n * 0.1"
            scrollTriggerStart="center bottom"
        >
          <a
              v-if="social.link"
              :href="social.link"
              target="_blank"
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
import siteData from "~/config/data";
</script>