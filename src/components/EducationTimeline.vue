<template>
  <div class="relative py-2 flex flex-wrap items-stretch gap-x-10 gap-y-4">
    <div
        v-for="(education, index) in educations"
        :key="index"
        class="flex"
    >
      <UiAnimate
          :distance="60"
          :delay="0.2 + index * 0.2"
          class="flex-1 flex"
      >
        <UiDotCard
            class="w-full h-full flex flex-col"
            :title="education.title"
            :subtitle="education.institution"
            :duration="education.duration"
            :description="education.description"
        />
      </UiAnimate>
    </div>
  </div>
</template>

<script setup>
import {educations} from "~/config/data/data";
</script>
