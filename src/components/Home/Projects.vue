<template>
  <section ref="container" id="PROJECTS" class="contain content-section !pt-4 !pb-4 md:!pt-6 md:!pb-6 lg:!pt-8 lg:!pb-8 relative"
           :class="{'mt-28':all}"
  >
    <UiHeading>Projects</UiHeading>

    <div v-if="PROJECTS.length">
      <div
          v-for="(project, index) in PROJECTS"
          :key="index"
          class="mx-auto grid w-full items-start gap-10 border-b border-gray-200/80 py-14 last:border-b-0 lg:grid-cols-12 lg:gap-10"
          :class="{'sm:mb-20 md:mb-36':all}"
      >
        <div class="flex items-center lg:col-span-8">
          <div class="flex h-full flex-col">
            <div class="overflow-hidden">
              <UiAnimate :distance="30">
                <h2 class="text-[1.9rem] font-semibold tracking-[-0.04em] text-gray-900 dark:text-white md:text-[2.35rem]">{{ project.name }}</h2>
              </UiAnimate>
            </div>
            <div class="overflow-hidden">
              <UiAnimate :distance="40">
                <p class="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{{ project.for }} — {{ project.date }}</p>
              </UiAnimate>
            </div>
            <div class="overflow-hidden">
              <UiAnimate :distance="40">
                <p class="mt-5 max-w-4xl text-justify text-[15px] leading-8 text-gray-600 dark:text-gray-300 sm:text-[1.02rem]">{{ project.description }}</p>
              </UiAnimate>
            </div>
            <div v-if="project.links" class="mt-5 overflow-hidden">
              <UiAnimate class="flex flex-wrap gap-3">
                <template v-for="link in project.links">
                  <a :href="link.url"
                     target="_blank"
                     rel="noopener noreferrer"
                     class="flex items-center gap-2 text-sm font-semibold text-primary text-primary-hover" :data-hover-text="link.name">
                    <Icon name="lucide:external-link" class="w-4 h-4"/>
                    <span>{{ link.name }}</span>
                  </a>
                </template>
              </UiAnimate>
            </div>
            <div class="mt-6 flex flex-wrap gap-2.5">
              <template v-for="(skill, i) in project.skills || []" :key="i">
                <UiAnimate :distance="40">
                  <UiChip :image="skillMap[skill.toLowerCase()]">{{ skill }}</UiChip>
                </UiAnimate>
              </template>
            </div>

            <div class="mt-6 flex flex-wrap gap-6">
              <div v-if="project.url" class="overflow-hidden">
                <UiAnimate>
                  <a :href="project.url"
                     target="_blank"
                     rel="noopener noreferrer"
                     class="flex items-center gap-2 text-sm font-semibold text-primary text-primary-hover" data-hover-text="Live">
                    <Icon name="lucide:external-link" class="w-4 h-4"/>
                    <span>Live</span>
                  </a>
                </UiAnimate>
              </div>
              <div v-if="project.repository" class="overflow-hidden">
                <UiAnimate>
                  <a :href="project.repository"
                     target="_blank"
                     rel="noopener noreferrer"
                     class="flex items-center gap-2 text-sm font-semibold text-primary text-primary-hover" data-hover-text="Github">
                    <Icon name="lucide:github" class="w-4 h-4"/>
                    <span>GitHub</span>
                  </a>
                </UiAnimate>
              </div>
            </div>
          </div>
        </div>
        <div class="image-wrapper flex items-start md:items-center lg:col-span-4 lg:justify-end"
             :ref="el => imageRefs[index] = el"
        >
          <!--          <UiAnimate direction="left" :distance="60">-->
          <template v-if="projectImageLink(project)">
            <a :href="projectImageLink(project)" target="_blank" rel="noopener noreferrer" class="project-image-link">
              <img
                  :src="project.photo"
                  :alt="project.name"
                  loading="lazy"
                  class="lazyImage img rounded-[1.4rem] border border-gray-200 bg-white shadow-sm dark:border-gray-800"
                  width="100%"
                  :data-hover-text="project.url ? 'preview' : project.repository ? 'GitHub' : 'Open'"
              />
            </a>
          </template>
          <template v-else>
            <img :src="project.photo" :alt="project.name" loading="lazy" class="lazyImage img rounded-[1.4rem] border border-gray-200 bg-white shadow-sm dark:border-gray-800" width="100%"/>
          </template>
          <!--          </UiAnimate>-->
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// import {ScrollToPlugin} from 'gsap/ScrollToPlugin'
import {works, skills} from '~/config/data/data'

const props = defineProps({
  all: {type: Boolean, default: false},
})

gsap.registerPlugin(ScrollTrigger)
// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const projects = works || []
const container = ref<HTMLElement | null>(null)
const imageRefs = ref<HTMLElement[]>([])
let skewTrigger: ScrollTrigger | null = null
// const pathRef = ref<SVGPathElement | null>(null)

const perPage = 6

const PROJECTS = computed(() => {
  if (props.all) return projects
  return projects.slice(0, perPage)
})

const projectImageLink = (project) => {
  return project.url || project.repository || project.links?.[0]?.url || ''
}

const skillMap = computed(() => {
  const map = {}
  Object.values(skills).flat().forEach(skill => {
    map[skill.name.toLowerCase()] = skill.logo
  })
  return map
})

const imageSkew = () => {
  const validImages = imageRefs.value.filter(Boolean)
  if (!container.value || !validImages.length) return

  skewTrigger?.kill()

  // Skew effect based on scroll velocity
  let proxy = {skew: 0}
  const skewSetter = gsap.quickSetter(validImages, 'skewX', 'deg')
  const clamp = gsap.utils.clamp(-6, 6)

  skewTrigger = ScrollTrigger.create({
    trigger: container.value,
    start: 'top top',
    end: () => `+=${window.innerWidth}`,
    scrub: true,
    onUpdate: (self) => {
      let skew = clamp(self.getVelocity() / -300)
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew
        gsap.to(proxy, {
          skew: 0,
          duration: 0.8,
          ease: 'power3',
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew),
        })
      }
    },
  })
}

onMounted(async () => {
  imageRefs.value = []
  await nextTick()
  requestAnimationFrame(() => {
    if (container.value && imageRefs.value.length) imageSkew()
  })
})

onBeforeUnmount(() => {
  skewTrigger?.kill()
})
</script>

<style scoped lang="scss">
.image-wrapper .img {
  width: 100%;
  height: auto;
  max-width: 520px;
  max-height: 100%;
  //display: block;
  //object-fit: cover;
  aspect-ratio: 16/9;
}

.project-image-link {
  display: block;
  width: 100%;
  max-width: 520px;
}
</style>
