<template>
  <section ref="container" id="PROJECTS" class="horizontal-wrapper relative h-screen">
    <div>
      <svg
          width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
          class="flex items-center justify-center absolute"
      >
        <text
            id="worksText"
            ref="worksText"
            x="50%"
            y="50%"
            text-anchor="middle"
            alignment-baseline="middle"
            font-family="Pacifico, Arial"
            font-size="20vw"
            fill="transparent"
            :stroke="darkMode ? 'white' : 'black'"
            font-weight="800"
            stroke-width="2"
            class="absolute left-0 top-1/2"
        >
          WORK
          <!--          Projects-->
        </text>
      </svg>
    </div>

    <div v-if="projects && projects.length" ref="scroller" class="h-full flex gap-x-6 sm:gap-x-10 md:gap-x-24 lg:gap-x-48">
      <div class="min-w-[100vw] h-full"></div>

      <div
          v-for="(project, index) in PROJECTS"
          :key="index"
          class="relative my-8 w-full min-w-[1300px] h-full grid grid-cols-5 gap-6 mx-auto px-4"
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
        <div class="image-wrapper col-span-5 md:col-span-3 flex items-center" :ref="el => imageRefs[index] = el">
          <img :src="project.image" :alt="project.title" loading="lazy" class="img rounded" width="100%"/>
        </div>
      </div>

      <div class="relative flex flex-col items-center justify-center min-w-[80vw] h-full">
        <div>
          <div v-if="projects.length > perPage" class=" mb-6">
            <NuxtLink to="/projects">
              <UiPrimaryButton>
              <span class="hoverMove flex items-center justify-center">
                View More Works <Icon name="lucide:arrow-up-right" class="w-6 h-6 ml-2 -mb-2"/>
              </span>
              </UiPrimaryButton>
            </NuxtLink>
          </div>
          <h3 class="h4">Do you have a innovative idea?</h3>
          <h1 class="h1">Let's work together</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import {ScrollToPlugin} from 'gsap/ScrollToPlugin'
import siteData from '~/config/data'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)

const projects = siteData?.works || []
const container = ref<HTMLElement | null>(null)
const scroller = ref<HTMLElement | null>(null)
const imageRefs = ref([])
const worksText = ref<HTMLElement | null>(null) // Reference for the "WORKS" text element

const perPage = 2

const PROJECTS = computed(() => projects.slice(0, perPage))

const projectHorizontal = (totalWidth: any) => {
  if (!container.value) return

  // Horizontal scroll animation
  gsap.to(scroller.value, {
    x: () => -(totalWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: container.value,
      start: 'top top',
      end: () => `+=${totalWidth - window.innerWidth}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      scroller: scroller.value,
      invalidateOnRefresh: true,
    },
  })
}

const imageSkew = (totalWidth: any) => {
  // Skew effect based on scroll velocity
  let proxy = {skew: 0}
  const skewSetter = gsap.quickSetter(imageRefs.value, 'skewX', 'deg')
  const clamp = gsap.utils.clamp(-20, 20)

  ScrollTrigger.create({
    trigger: container.value,
    start: 'top top',
    end: () => `+=${totalWidth - window.innerWidth}`,
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

// Scroll-triggered animations for "WORKS" text
const workTextAnimation = () => {
  const worksTextElement = worksText.value
  if (!container.value || !worksTextElement) return

  ScrollTrigger.create({
    trigger: container.value,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    // markers: true,
    onUpdate: (self) => {
      const progress = self.progress

      if (progress > 0) {
        // When scrolling past 30%, make the text fixed and apply styles
        gsap.to(worksTextElement, {
          fill: darkMode.value ? 'white' : 'black',
          stroke: darkMode.value ? 'white' : 'black',
          duration: 0.2,
          position: 'absolute',
          top: '10vh', // Pin the text 10vh from the top
          left: '0',
          // y: '-50%', // Center horizontally
          fontSize: '16vw',
          opacity: 0.1,
          // filter: 'blur(6px)'
        })
      } else {
        // Reset to original state before scrolling past 30%
        gsap.to(worksTextElement, {
          fill: 'transparent',
          stroke: darkMode.value ? 'white' : 'black',
          duration: 0.2,
          position: 'absolute',
          top: '50%', // Original center position
          // left: '50%',
          // y: '50%', // Center horizontally
          fontSize: '20vw',
          opacity: 1,
          // filter: 'blur(0)'
        })
      }
    }
  })
}

const bgColorChangeOnScroll = (totalWidth: any) => {
  if (!container.value) return
  ScrollTrigger.create({
    trigger: container.value,
    start: 'top top',
    end: () => `+=${totalWidth - window.innerWidth}`,
    scrub: false,
    onEnter: () => {
      container.value.style.backgroundColor = '#2d3aa8' // blue
    },
    onLeave: () => {
      container.value.style.backgroundColor = 'transparent' // default
    },
    onEnterBack: () => {
      container.value.style.backgroundColor = '#2d3aa8' // blue
    },
    onLeaveBack: () => {
      container.value.style.backgroundColor = 'transparent' // default
    },
  })
}

const GSAP = () => {
  if (scroller.value) {
    const totalWidth = scroller.value?.scrollWidth
    workTextAnimation()
    bgColorChangeOnScroll(totalWidth)
    projectHorizontal(totalWidth)
    imageSkew(totalWidth)
  }
}

onMounted(async () => {
  await nextTick()
  // GSAP()
  requestAnimationFrame(() => {
    const totalWidth = scroller.value?.scrollWidth || 0
    projectHorizontal(totalWidth)
    imageSkew(totalWidth)
    workTextAnimation()
    bgColorChangeOnScroll(totalWidth)

    // Force refresh after setup
    ScrollTrigger.refresh()
  })
})
</script>

<style scoped lang="scss">
.horizontal-wrapper {
  scroll-snap-type: x mandatory;
}

.horizontal-wrapper > div {
  scroll-snap-align: start;
}

.horizontal-wrapper {
  overflow: hidden;
  transition: background-color 0.5s ease;
}

//.image-wrapper {
//  width: 800px;
//  max-width: 80%;
//  overflow: hidden;
//  border-radius: 2px;
//  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
//  will-change: transform;
//  transform-origin: center;
//}

.image-wrapper .img {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  //display: block;
  //object-fit: cover;
  aspect-ratio: 16/9;
}

#worksText {
  //font-family: 'Montserrat', sans-serif;
  font-family: 'Pacifico', 'Arial', sans-serif;
  //transition: transform 0.3s ease, fill 0.3s ease, stroke 0.3s ease;
  transition: all 0.3s ease;
}
</style>
