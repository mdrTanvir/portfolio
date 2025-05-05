<template>
  <div class="relative flex flex-wrap items-start gap-x-10">
    <!-- Timeline items -->
    <div
        v-for="(education, index) in educations"
        :key="index"
        class="relative py-2"
    >
      <!--        class="relative flex items-center w-full py-2"-->
      <UiAnimate
          :distance="60"
          :delay="0.2 + index * 0.2"
      >
        <UiDotCard
            class="w-full"
            :title="education.title"
            :subtitle="education.institution"
            :duration="education.duration"
            :description="education.description"
        >
        </UiDotCard>
      </UiAnimate>
    </div>
  </div>
</template>

<script setup>
import {educations} from "~/config/data/data";
</script>
