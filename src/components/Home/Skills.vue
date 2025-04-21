<template>
  <section id="SKILLS" class="contain content-section">
    <UiHeading>Skills</UiHeading>

    <div class="mt-10">
      <template v-for="(skillCategory, index) in siteData.skills" :key="index">
        <div class="grid gap-4 mx-4 my-4 sm:grid-cols-12">
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
                    :distance="60"
                    :delay="0.2 + skillIndex * 0.1"
                >
                  <div class="relative flex flex-row items-center gap-4">
                <span>
                  <img :src="skill.logo" :alt="skill.name" loading="lazy" height="36px" width="36px"/>
                </span>
                    <span>{{ skill.name }}</span>
                  </div>
                </UiAnimate>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import siteData from "~/config/data";
</script>