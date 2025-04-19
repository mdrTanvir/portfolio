<template>
  <section ref="container" class="horizontal-wrapper relative h-screen">
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
            font-family="Arial"
            font-size="20vw"
            fill="transparent"
            :stroke="darkMode ? 'white' : 'black'"
            font-weight="800"
            stroke-width="3"
            class="absolute left-0 top-1/2"
        >
          WORK
          <!--          Projects-->
        </text>
      </svg>
    </div>

    <div v-if="projects && projects.length" ref="scroller" class="h-full flex">
      <div class="flex gap-[60px] items-center justify-center min-w-[100vw] h-full"></div>
      <div
          v-for="(project, index) in projects.splice(0, 3)"
          :key="index"
          class="projectCard"
      >
        <div class="z-10 max-w-[500px]">
          <h2 class="h1 text-white mix-blend-difference">{{ project.title }}</h2>
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
        <div class="" :ref="el => imageRefs[index] = el">
          <LazyNuxtImg ref="imageRefs" :src="project.image" :alt="project.title" loading="lazy" class="projectImage" height="100%" width="100%"/>
        </div>
      </div>

      <div class="relative flex flex-col items-center justify-center min-w-[80vw] h-full">
        <div>
          <div v-if="projects.length > 3" class=" mb-6">
            <UiPrimaryButton>
              <span class="hoverMove flex items-center justify-center">
                View More Works <Icon name="lucide:download" class="w-5 h-5 ml-2"/>
              </span>
            </UiPrimaryButton>
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
const container = ref(null)
const scroller = ref(null)
const imageRefs = ref([])
const worksText = ref(null) // Reference for the "WORKS" text element


const projectHorizontal = (totalWidth) => {
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
      invalidateOnRefresh: true,
    },
  })
}

const imageSkew = (totalWidth) => {
  let proxy = { skew: 0 }
  const clamp = gsap.utils.clamp(-20, 20)
  const images = imageRefs.value
  const skewSetters = images.map((img) =>
      gsap.quickSetter(img?.$el || img, 'skewX', 'deg')
  )

  ScrollTrigger.create({
    trigger: container.value,
    start: 'top top',
    end: () => `+=${totalWidth - window.innerWidth}`,
    scrub: true,
    onUpdate: (self) => {
      const skew = clamp(self.getVelocity() / -300)
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew
        gsap.to(proxy, {
          skew: 0,
          duration: 0.8,
          ease: 'power3.out',
          overwrite: true,
          onUpdate: () => {
            skewSetters.forEach(set => set(proxy.skew))
          },
        })
      }
    },
  })
}


// Scroll-triggered animations for "WORKS" text
const workTextAnimation = (totalWidth) => {
  ScrollTrigger.create({
    trigger: container.value,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    // markers: true,
    onUpdate: (self) => {
      const progress = self.progress
      const worksTextElement = worksText.value

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

const bgColorChangeOnScroll = (totalWidth) => {
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

const GSAP = async () => {
  const totalWidth = scroller.value.scrollWidth
  await workTextAnimation(totalWidth)
  await bgColorChangeOnScroll(totalWidth)
  await projectHorizontal(totalWidth)
  await imageSkew(totalWidth)
}

onMounted(async () => {
  await nextTick()
  await GSAP()
})
</script>

<style scoped lang="scss">
.projectCard {
  //border: 2px solid red;
  @apply relative m-auto p-2 sm:p-8 md:p-40 flex gap-4 flex-col md:flex-row items-center w-full min-w-[100vw] max-w-[1300px] h-full;

  .projectImage {
    width: 100%;
    max-width: 55vw;
    height: auto;
    max-height: 100%;
    aspect-ratio: 16/9;
    //filter: grayscale(100%);
    will-change: transform;
    transform-style: preserve-3d;
    @apply md:absolute z-[2] md:top-1/2 right-[0.5rem] sm:right-[2rem] md:right-[10rem] block object-cover rounded shadow-lg will-change-transform transform -translate-y-1/2;
  }
}

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

#worksText {
  //font-family: 'Montserrat', sans-serif;
  font-family: 'Pacifico', cursive;
  transition: transform 0.3s ease, fill 0.3s ease, stroke 0.3s ease;
}
</style>
