<!-- components/EducationTimeline.vue -->
<template>
  <div class="relative flex flex-col items-start max-w-4xl mx-auto">
    <!-- Timeline items -->
    <div
        v-for="(education, index) in siteData.educations"
        :key="index"
        class="relative flex items-center w-full py-2"
    >
      <UiAnimate
          direction="up"
          :distance="60"
          :duration="0.4"
          :delay="0.4 + index * 0.2"
      >
        <!--      &lt;!&ndash; vertical line &ndash;&gt;-->
        <!--      <div-->
        <!--          class="absolute w-[2px] h-full bg-primary left-0 rounded-full"-->
        <!--          :class="index === siteData.educations.length - 1 ? 'top-0' : 'top-1/2'"-->
        <!--          :style="{ height: index === siteData.educations.length - 1 ? '50%' : '100%' }"-->
        <!--      ></div>-->

        <!--      &lt;!&ndash; horizontal line &ndash;&gt;-->
        <!--      <div-->
        <!--          class="absolute w-8 h-[2px] bg-primary left-0 'top-1/2' rounded-full"-->
        <!--      ></div>-->

        <!-- Card -->
        <div class="timeline-card">
          <!-- Dot -->
          <div class="timeline-dot"></div>
          <h3 class="text-lg font-semibold text-primary">
            {{ education.title }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-300">
            {{ education.institution }}
          </p>
          <p class="text-xs text-gray-400 mt-1">
            {{ education.duration }}
          </p>
        </div>
      </UiAnimate>
    </div>
  </div>
</template>

<script setup>
import siteData from "~/config/data";
</script>
