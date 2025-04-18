<template>
  <div class="relative flex flex-col items-start max-w-4xl mx-auto">
    <!-- Timeline items -->
    <div
        v-for="(education, index) in siteData.educations"
        :key="index"
        class="relative flex items-center w-full py-2"
    >
      <UiAnimate
          :distance="60"
          :delay="0.2 + index * 0.2"
      >
        <UiDotCard
            class="w-full"
            :title="education.title"
            :subtitle="education.institution"
            :description="education.duration"
        >
        </UiDotCard>
      </UiAnimate>
    </div>
  </div>
</template>

<script setup>
import siteData from "~/config/data";
</script>
