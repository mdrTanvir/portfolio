<template>
  <section ref="container" id="PROJECTS" class="contain pt-10 md:pt-14 lg:pt-20 relative"
           :class="{'mt-28':all}"
  >
    <UiHeading>Projects</UiHeading>

    <div v-if="PROJECTS.length">
      <div
          v-for="(project, index) in PROJECTS"
          :key="index"
          class="w-full my-10 md:my-20 grid grid-cols-5 gap-6 mx-auto px-4"
          :class="{'sm:mb-20 md:mb-36':all}"
      >
        <div class="col-span-5 md:col-span-2 flex items-center">
          <div>
            <div class="overflow-hidden py-2">
              <UiAnimate :distance="30">
                <h2 class="h2">{{ project.name }}</h2>
              </UiAnimate>
            </div>
            <div class="overflow-hidden">
              <UiAnimate :distance="40">
                <p class="text-sm font-medium mt-2 mb-3">{{ project.for }} — {{ project.date }}</p>
              </UiAnimate>
            </div>
            <div class="overflow-hidden">
              <UiAnimate :distance="40">
                <p class="text-base sm:text-lg max-w-[300px] md:max-w-[500px]">{{ project.description }}</p>
              </UiAnimate>
            </div>
            <div v-if="project.links" class="overflow-hidden">
              <UiAnimate class="flex flex-wrap gap-2">
                <template v-for="link in project.links">
                  <a :href="link.url"
                     target="_blank"
                     class="font-bold text-primary text-primary-hover flex items-center" :data-hover-text="link.name">
                    <Icon name="lucide:external-link" class="w-4 h-4 mr-2"/>
                    <span class="mt-1">{{ link.name }}</span>
                  </a>
                </template>
              </UiAnimate>
            </div>
            <div class="flex flex-wrap gap-4 mt-3">
              <template v-for="(skill, i) in project.skills || []" :key="i">
                <UiAnimate :distance="40">
                  <UiChip :image="skillMap[skill.toLowerCase()]">{{ skill }}</UiChip>
                </UiAnimate>
              </template>
            </div>

            <div class="flex gap-5 mt-3">
              <div v-if="project.url" class="overflow-hidden">
                <UiAnimate>
                  <a :href="project.url"
                     target="_blank"
                     class="font-bold text-primary text-primary-hover flex items-center" data-hover-text="Live">
                    <Icon name="lucide:external-link" class="w-4 h-4 mr-2"/>
                    <span class="mt-1">Live</span>
                  </a>
                </UiAnimate>
              </div>
              <div v-if="project.repository" class="overflow-hidden">
                <UiAnimate>
                  <a :href="project.repository"
                     target="_blank"
                     class="font-bold text-primary text-primary-hover flex items-center" data-hover-text="Github">
                    <Icon name="lucide:github" class="w-4 h-4 mr-2"/>
                    <span class="mt-1">GitHub</span>
                  </a>
                </UiAnimate>
              </div>
            </div>
          </div>
        </div>
        <div class="image-wrapper col-span-5 md:col-span-3 flex items-start md:items-center"
             :ref="el => imageRefs[index] = el"
        >
          <!--          <UiAnimate direction="left" :distance="60">-->
          <template v-if="project.url || project.repository">
            <a :href="project.url || project.repository" target="_blank" rel="noreferrer">
              <img
                  :src="project.photo"
                  :alt="project.name"
                  loading="lazy"
                  class="lazyImage img rounded"
                  width="100%"
                  :data-hover-text="project.url ? 'preview' : 'GitHub'"
              />
            </a>
          </template>
          <template v-else>
            <img :src="project.photo" :alt="project.name" loading="lazy" class="lazyImage img rounded" width="100%"/>
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
// const pathRef = ref<SVGPathElement | null>(null)

const perPage = 3

const PROJECTS = computed(() => {
  if (props.all) return projects
  return projects.slice(0, perPage)
})

const skillMap = computed(() => {
  const map = {}
  Object.values(skills).flat().forEach(skill => {
    map[skill.name.toLowerCase()] = skill.logo
  })
  return map
})

const imageSkew = () => {
  // Skew effect based on scroll velocity
  let proxy = {skew: 0}
  const skewSetter = gsap.quickSetter(imageRefs.value, 'skewX', 'deg')
  const clamp = gsap.utils.clamp(-6, 6)

  ScrollTrigger.create({
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
    if (imageRefs.value.length) imageSkew()
  })
})
</script>

<style scoped lang="scss">
.image-wrapper .img {
  width: 100%;
  height: auto;
  max-width: 100vw;
  max-height: 100%;
  //display: block;
  //object-fit: cover;
  aspect-ratio: 16/9;
}
</style>
