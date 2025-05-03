<template>
  <div class="contain mt-48">
    <div
        v-for="(project, index) in PROJECTS"
        :key="index"
        class="relative my-8 w-full h-full grid grid-cols-5 gap-6"
    >
      <div class="col-span-5 md:col-span-2 flex items-center">
       <div>
         <h2 class="h1">{{ project.title }}</h2>
         <p class="text-sm text-gray-300 mt-2 mb-3">{{ project.tag }} — {{ project.date }}</p>
         <p class="text-sm max-w-[500px]">{{ project.description }}</p>

         <div class="flex flex-wrap gap-2 mt-3">
           <template v-for="(skill, i) in project.skills" :key="i">
             <UiChip>{{ skill }}</UiChip>
           </template>
         </div>

         <div class="flex gap-4 mt-3">
           <a v-if="project.projectLink" :href="project.projectLink" target="_blank" class="font-bold" data-hover>Live</a>
           <a v-if="project.gitHub" :href="project.gitHub" target="_blank" class="font-bold" data-hover>GitHub</a>
         </div>
       </div>
      </div>
      <div class="col-span-5 md:col-span-3">
        <img :src="project.image" :alt="project.title" class="rounded" loading="lazy" width="100%"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {works} from '~/config/data/data'

const projects = works || []
const perPage = 3
const PROJECTS = computed(() => projects.slice(0, perPage))
</script>