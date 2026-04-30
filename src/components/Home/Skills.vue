<template>
  <section id="SKILLS" class="contain content-section !pt-4 !pb-4 md:!pt-6 md:!pb-6 lg:!pt-8 lg:!pb-8">
    <UiHeading>Skills</UiHeading>

    <div class="mt-12 space-y-12">
      <template v-for="(skillCategory, index) in visibleSkills" :key="index">
        <div class="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div class="lg:col-span-3 lg:pt-2">
            <UiSubheading>{{ index }}</UiSubheading>
          </div>
          <div class="lg:col-span-9">
            <div class="grid max-w-4xl gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <template
                  v-for="(skill, skillIndex) in skillCategory"
                  :key="skillIndex">
                <div v-if="skill.featured" class="h-full">
                  <UiAnimate
                      :distance="60"
                      :delay="0.2 + skillIndex * 0.1"
                      class="h-full"
                  >
                    <div class="flex h-full min-h-[78px] items-center gap-4 rounded-2xl border border-gray-200 bg-white/70 px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-950/50">
                      <span v-if="skill.logo" class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900">
                        <img :src="skill.logo" :alt="skill.name" loading="lazy" height="26" width="26" class="h-[26px] w-[26px]"/>
                      </span>
                      <span v-else class="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sm font-semibold text-primary dark:bg-sky-950/50">
                        {{ skill.name.charAt(0) }}
                      </span>
                      <span class="text-base font-medium leading-6 text-gray-800 dark:text-gray-100">{{ skill.name }}</span>
                    </div>
                  </UiAnimate>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import {skills} from "~/config/data/data";

const visibleSkills = computed(() =>
  Object.fromEntries(
    Object.entries(skills).filter(([, skillCategory]) =>
      skillCategory.some((skill) => skill.featured)
    )
  )
);
</script>
