<template>
  <section v-if="siteData.experiences && siteData.experiences?.length" id="EXPERIENCE" class="contain content-section">
    <UiHeading>Experience</UiHeading>

    <div class="grid gap-4 md:mx-4 my-10 sm:grid-cols-12">
      <div class="col-span-12 md:col-span-3">
        <UiSubheading>Work Experience</UiSubheading>
      </div>
      <div
          ref="experienceContainer"
          class="relative col-span-12 px-0 sm:px-4 space-y-2 md:col-span-9"
      >
        <svg
            ref="svg"
            class="absolute top-3 sm:top-5 bottom-0 left-0 sm:left-1 z-1"
            width="2" height="100%" viewBox="0 0 2 1000" preserveAspectRatio="none"
        >
          <line ref="line" x1="1" y1="0" x2="1" y2="1000" stroke="#4F46E5" stroke-width="2"/>
        </svg>

        <div class="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8">
          <!-- Loop through the experiences, limited by totalExperience -->
          <div
              v-for="(experience, index) in siteData.experiences.slice(0, totalExperience)"
              :key="index"
              class="flex flex-col relative"
          >
            <UiAnimate direction="up" :distance="30">
              <div class="block absolute w-6 h-6 sm:w-10 sm:h-10 rounded-full top-[14px] sm:top-[12px] left-[-15px] sm:left-[-26px] z-[1] transform translate-x-[-50%] translate-y-[-50%]
                bg-primary dark:bg-primary border-[6px] sm:border-[10px] border-white dark:border-black"></div>
            </UiAnimate>
            <div class="overflow-hidden">
              <UiAnimate :distance="20">
                <h3 class="text-xl font-semibold tracking-wide">{{ experience.title }}</h3>
              </UiAnimate>
            </div>
            <UiAnimate :distance="20">
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ experience.company }}</span>
              <br>
              <time class="text-xs tracking-wide uppercase dark:text-gray-400">{{ experience.duration }}</time>
            </UiAnimate>
            <UiAnimate :distance="20">
              <p class="mt-3" v-html="experience.description"></p>
            </UiAnimate>

            <!-- Skills -->
            <div v-if="experience.skills?.length" class="flex flex-wrap gap-2 mt-3">
              <template v-for="(skill, skillIndex) in experience.skills" :key="skillIndex">
                <UiAnimate :distance="20" :delay="0.2 + skillIndex * 0.1">
                  <UiChip :image="skillMap[skill.toLowerCase()]">{{ skill }}</UiChip>
                </UiAnimate>
              </template>
            </div>

            <!-- Project Links -->
            <div v-if="experience.projectLinks?.length" class="mt-3">
              <UiAnimate :distance="20" :delay="0.4">
                <p class="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Projects:</p>
                <ul class="list-disc ml-4 space-y-1 text-sm text-blue-600 dark:text-blue-400">
                  <li v-for="(project, projectIndex) in experience.projectLinks" :key="projectIndex" class="mb-2">
                    <a :href="project.link" target="_blank" class="hover:!underline" data-hover>
                      {{ project.name }}
                    </a>
                  </li>
                </ul>
              </UiAnimate>
            </div>
          </div>

          <!-- View More or Less -->
          <div v-if="siteData.experiences.length > 3" class="flex flex-col relative">
            <UiAnimate direction="up" :distance="30">
              <div class="block absolute w-6 h-6 sm:w-10 sm:h-10 rounded-full top-[14px] sm:top-[12px] left-[-15px] sm:left-[-26px] z-[1] transform translate-x-[-50%] translate-y-[-50%]
                bg-primary dark:bg-primary border-[6px] sm:border-[10px] border-white dark:border-black"></div>
            </UiAnimate>
            <div class="overflow-hidden flex">
              <UiAnimate :distance="20">
                <h3
                    class="text-base font-semibold tracking-wide underline text-primary hover:text-black dark:hover:text-white"
                    data-hover
                    @click="toggleExperienceView()"
                >
                  {{ totalExperience === siteData.experiences.length ? 'Show Less' : 'Show All' }}
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
import siteData from "~/config/data"

gsap.registerPlugin(ScrollTrigger)

const limit = 3 // Initially show 2 items
const totalExperience = ref(limit)
const experienceContainer = ref(null)
const line = ref(null)

let scrollTriggerInstance = null // Store ScrollTrigger instance

const skillMap = computed(() => {
  const map = {}
  Object.values(siteData.skills).flat().forEach(skill => {
    map[skill.name.toLowerCase()] = skill.logo
  })
  return map
})

// Function to initialize GSAP scroll trigger
const handleScrollTrigger = () => {
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
      start: 'top 80%',
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

const toggleExperienceView = () => {
  if (totalExperience.value === limit) {
    totalExperience.value = siteData.experiences.length
  } else {
    totalExperience.value = limit // Show only 3 experiences
  }

  const {updateScroll} = useScrollUpdate()
  updateScroll()
}
</script>

