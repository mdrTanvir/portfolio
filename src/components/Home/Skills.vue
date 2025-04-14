<template>
  <section class="contain content-section">
    <UiHeading>Skills</UiHeading>

    <template v-for="(skillCategory, index) in siteData.skills" :key="index">
      <div class="grid gap-4 mx-4 my-10 sm:grid-cols-12">
        <div class="col-span-12 sm:col-span-3">
          <UiSubheading>{{ index }}</UiSubheading>
        </div>
        <div class="relative col-span-12 px-4 space-y-6 sm:col-span-9">
          <div class="flex flex-wrap gap-10 md:gap-x-16 mb-10 max-w-3xl">
            <div
                v-for="(skill, skillIndex) in skillCategory"
                :key="skillIndex"
            >
              <UiAnimate
                  direction="up"
                  :distance="60"
                  :duration="0.4"
                  :delay="0.4 + skillIndex * 0.1"
              >
                <div class="relative flex flex-row items-center gap-4">
                <span>
                  <NuxtImg :src="skill.logo" :alt="skill.name" class="h-9" loading="lazy"/>
                </span>
                  <span>{{ skill.name }}</span>
                </div>
              </UiAnimate>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import siteData from "~/config/data";
</script>