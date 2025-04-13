<template>
  <div>
    <p class="mb-2 font-medium">FOLLOW ME</p>
    <div v-if="siteData.socials.length" class="flex gap-6">
      <template
          v-for="social in siteData.socials"
          :key="social.name"
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
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import siteData from "~/config/data";
</script>