<!-- components/EducationTimeline.vue -->
<template>
  <div class="relative flex flex-col items-start max-w-4xl mx-auto">
    <!-- Timeline items -->
    <div
        v-for="(education, index) in siteData.educations"
        :key="index"
        class="relative flex items-center w-full py-2"
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
      <div
          class="relative ml-4 flex flex-col bg-gray-100 dark:bg-gray-900 border-2 border-indigo-400 px-8 py-3 rounded-xl shadow-md w-full max-w-[420px]"
      >
        <!-- Dot -->
        <div class="z-10 w-10 h-10 rounded-full border-[10px] rotate-[45deg] bg-primary absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
             :class="[
          'border-l-white border-b-white border-r-white border-t-white',
          'dark:border-l-black dark:border-b-black dark:border-r-black dark:border-t-black',
      ]"
        ></div>
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
    </div>
  </div>
</template>

<script setup>
import siteData from "~/config/data";
</script>
