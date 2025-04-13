<template>
  <section v-if="siteData.experiences && siteData.experiences?.length" class="contain content-section">
    <ui-heading>Experience</ui-heading>

    <div class="container max-w-5xl px-4 py-12 mx-auto">
      <div class="grid gap-4 mx-4 sm:grid-cols-12">
        <div class="col-span-12 sm:col-span-3">
          <UiSubheading>Work Experience</UiSubheading>
        </div>
        <div class="relative col-span-12 px-4 space-y-6 sm:col-span-9">
          <div class="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-500 before:dark:bg-gray-300">
            <div
                v-for="(experience, index) in siteData.experiences"
                :key="index"
                class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-primary"
            >
              <h3 class="text-xl font-semibold tracking-wide">{{ experience.title }}</h3>
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ experience.company }}</span>
              <time class="text-xs tracking-wide uppercase dark:text-gray-400">{{ experience.duration }}</time>
              <p class="mt-3" v-html="experience.description"></p>

              <!-- Skills -->
              <div v-if="experience.skills?.length" class="flex flex-wrap gap-2 mt-3">
                <div
                    v-for="(skill, skillIndex) in experience.skills"
                    :key="skillIndex"
                    class="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-800 dark:text-white text-gray-800"
                >
                  {{ skill }}
                </div>
              </div>

              <!-- Project Links -->
              <div v-if="experience.projectLinks?.length" class="mt-3">
                <p class="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Projects:</p>
                <ul class="list-disc ml-4 space-y-1 text-sm text-blue-600 dark:text-blue-400">
                  <li v-for="(project, projectIndex) in experience.projectLinks" :key="projectIndex">
                    <a :href="project.link" target="_blank" class="hover:underline">
                      {{ project.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import siteData from "~/config/data";
</script>