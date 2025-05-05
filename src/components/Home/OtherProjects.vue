<template>
  <section v-if="PROJECTS.length" class="contain content-section">
    <UiHeading>Other Projects</UiHeading>

    <div class="flex flex-wrap gap-6 justify-center items-start md:justify-start">
      <div v-for="(project, op) in PROJECTS" :key="op">
        <UiAnimate :distance="40" :duration="0.5" :delay="op * 0.1">
          <UiProjectCard :project="project"/>
        </UiAnimate>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {otherProjects} from "~/config/data/data";

const props = defineProps({
  all: {type: Boolean, default: false},
})

const PROJECTS = computed(() => {
  if (props.all) return otherProjects
  return otherProjects.slice(0, 4)
})
</script>