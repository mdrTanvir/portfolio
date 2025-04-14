<template>
  <div>
    <div v-if="siteData.socials.length" class="w-[30px] flex flex-col items-center gap-4">
      <div class="fadeIn w-[2px] h-20 bg-gray-400"></div>
      <template
          v-for="(social, n) in siteData.socials"
          :key="social.name"
      >
        <UiAnimate
            direction="up"
            :distance="30"
            :duration="0.6"
            :delay="0.6 + n * 0.1"
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
                class="w-6 h-6 text-gray-600 dark:text-white hover:text-primary dark:hover:text-primary"
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
