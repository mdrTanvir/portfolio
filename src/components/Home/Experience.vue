<template>
  <section v-if="experiences && experiences?.length" id="EXPERIENCE" class="contain content-section !pt-4 !pb-4 md:!pt-6 md:!pb-6 lg:!pt-8 lg:!pb-8">
    <UiHeading>Experience</UiHeading>

    <div class="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div class="lg:col-span-3 lg:pt-2">
        <UiSubheading>Work Experience</UiSubheading>
      </div>
      <div
          ref="experienceContainer"
          class="relative lg:col-span-9"
      >
        <svg
            ref="svg"
            class="absolute bottom-0 left-[10px] top-3 z-1"
            width="2" height="100%" viewBox="0 0 2 1000" preserveAspectRatio="none"
        >
          <line ref="line" x1="1" y1="0" x2="1" y2="1000" class="stroke-primary" stroke-width="2"/>
        </svg>

        <div class="relative max-w-4xl space-y-10 pl-8 md:pl-10">
          <div
              v-for="(experience, index) in experiences.slice(0, totalExperience)"
              :key="index"
              class="relative"
          >
            <UiAnimate direction="up" :distance="30">
              <div class="block absolute left-[-28px] top-7 z-[1] h-5 w-5 -translate-x-1/2 rounded-full border-[5px] border-white bg-primary dark:border-black md:h-6 md:w-6"></div>
            </UiAnimate>
            <div class="flex h-full flex-col rounded-2xl border border-gray-200 bg-white/70 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 md:p-6">
              <div class="overflow-hidden">
                <UiAnimate :distance="20">
                  <h3 class="text-xl font-semibold tracking-[-0.02em] text-gray-900 dark:text-white md:text-[1.35rem]">{{ experience.title }}</h3>
                </UiAnimate>
              </div>
              <UiAnimate :distance="20">
                <div class="mt-2">
                  <a v-if="experience.link" :href="experience.link" target="_blank" rel="noopener noreferrer" :data-hover-text="experience.company">
                    <span class="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{{ experience.company }}</span>
                  </a>
                  <span v-else class="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{{ experience.company }}</span>
                </div>
                <time class="mt-2 block text-sm text-gray-500 dark:text-gray-400">{{ experience.startDate }} - {{ experience.endDate }} ({{ experience.xp }})</time>
              </UiAnimate>
              <UiAnimate :distance="20">
                <p class="mt-4 max-w-3xl text-justify text-[15px] leading-7 text-gray-600 dark:text-gray-300 sm:leading-8">{{ experience.description }}</p>
              </UiAnimate>

              <UiAnimate v-if="experience.highlights?.length" :distance="20">
                <ul class="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-gray-600 dark:text-gray-300 sm:leading-8">
                  <li v-for="(highlight, highlightIndex) in experience.highlights" :key="highlightIndex">
                    {{ highlight }}
                  </li>
                </ul>
              </UiAnimate>

              <div v-if="experience.skills?.length" class="mt-5 flex flex-wrap gap-2">
                <template v-for="(skill, skillIndex) in experience.skills" :key="skillIndex">
                  <UiAnimate :distance="20" :delay="0.2 + skillIndex * 0.1">
                    <UiChip :image="skillMap[skill.toLowerCase()]">{{ skill }}</UiChip>
                  </UiAnimate>
                </template>
              </div>

              <div v-if="experience.projectLinks?.length" class="mt-5">
                <UiAnimate :distance="20" :delay="0.4">
                  <p class="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Projects</p>
                  <div class="flex flex-wrap items-center gap-2 text-sm">
                    <span v-for="(project, projectIndex) in experience.projectLinks" :key="projectIndex">
                      <template v-if="project.url && project.name">
                        <a
                            :href="project.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-primary font-medium hover:!underline"
                            data-hover-text="Go Live"
                        >
                          {{ project.name }}
                        </a>
                      </template>
                      <template v-else-if="project.name">
                        <span class="font-medium">{{ project.name }}</span>
                      </template>
                      <span v-if="projectIndex < experience.projectLinks.length - 1">, </span>
                    </span>
                  </div>
                </UiAnimate>
              </div>
            </div>
          </div>

          <div v-if="experiences.length > 3" class="relative">
            <UiAnimate direction="up" :distance="30">
              <div class="block absolute left-[-28px] top-3 z-[1] h-5 w-5 -translate-x-1/2 rounded-full border-[5px] border-white bg-primary dark:border-black md:h-6 md:w-6"></div>
            </UiAnimate>
            <div class="overflow-hidden flex">
              <UiAnimate :distance="20">
                <h3
                    class="text-sm font-semibold uppercase tracking-[0.16em] text-primary underline underline-offset-4 hover:text-black dark:hover:text-white"
                    data-hover
                    @click="toggleExperienceView()"
                >
                  {{ totalExperience === experiences.length ? 'Show Less' : 'Show All' }}
                </h3>
              </UiAnimate>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {experiences, skills} from "~/config/data/data"

gsap.registerPlugin(ScrollTrigger)

const limit = 3 // Initially show 2 items
const totalExperience = ref(limit)
const experienceContainer = ref(null)
const line = ref(null)

let scrollTriggerInstance = null // Store ScrollTrigger instance

const skillMap = computed(() => {
  const map = {}
  Object.values(skills).flat().forEach(skill => {
    map[skill.name.toLowerCase()] = skill.logo
  })
  return map
})

const handleScrollTrigger = () => {
  if (!line.value || !experienceContainer.value) return

  const length = line.value.getTotalLength()

  gsap.set(line.value, {
    strokeDasharray: length,
    strokeDashoffset: length,
  })

  // Initialize GSAP ScrollTrigger animation for the line element
  scrollTriggerInstance = gsap.to(line.value, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: experienceContainer.value,
      start: 'top 70%',
      end: '80% 10%',
      scrub: true,
      // markers: true,
    },
  })
}

watch(() => totalExperience.value, async () => {
  await nextTick() // Wait for DOM changes
  if (scrollTriggerInstance) scrollTriggerInstance.kill()
  handleScrollTrigger()
})

onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => {
    handleScrollTrigger() // Initial scroll trigger setup
  })
})

onBeforeUnmount(() => {
  if (scrollTriggerInstance) scrollTriggerInstance.kill()
})

const toggleExperienceView = () => {
  if (totalExperience.value === limit) {
    totalExperience.value = experiences.length
  } else {
    totalExperience.value = limit
  }

  const {updateScroll} = useScrollUpdate()
  updateScroll()
}
</script>
