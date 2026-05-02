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
            stroke-width="1px"
            class="absolute left-0 top-1/2"
        >
          WORK
          <!--          Projects-->
        </text>
      </svg>
    </div>

    <div v-show="horizontalScroll" class="absolute z-[1] bottom-4 md:bottom-10 -left-4 md:left-14">
      <ScrollDownLine/>
    </div>

    <div v-if="projects && projects.length" ref="scroller" class="h-full flex gap-x-6 sm:gap-x-10 md:gap-x-24 lg:gap-x-48">
      <div class="min-w-[100vw] h-full relative"></div>

      <div
          v-for="(project, index) in PROJECTS"
          :key="index"
          class="relative my-8 w-full min-w-[100vw] h-full grid grid-cols-5 gap-6 mx-auto px-4"
      >
        <div class="col-span-5 md:col-span-2 flex items-center">
          <div>
            <h2 class="h1 text-white">{{ project.title }}</h2>
            <p class="text-sm font-medium text-gray-200 mt-2 mb-3">{{ project.tag }} — {{ project.date }}</p>
            <p class="text-lg max-w-[300px] md:max-w-[500px] text-white">{{ project.description }}</p>

            <div class="flex flex-wrap gap-4 mt-3">
              <template v-for="(skill, i) in project.skills" :key="i">
                <UiChip class="bg-gray-800 text-white">{{ skill }}</UiChip>
              </template>
            </div>

            <div class="flex gap-4 mt-3">
              <a v-if="project.projectLink" :href="project.projectLink" target="_blank" rel="noopener noreferrer" class="font-bold text-white text-primary-hover" data-hover>Live</a>
              <a v-if="project.gitHub" :href="project.gitHub" target="_blank" rel="noopener noreferrer" class="font-bold text-white text-primary-hover" data-hover>GitHub</a>
            </div>
          </div>
        </div>
        <div class="image-wrapper col-span-5 md:col-span-3 flex items-start md:items-center" :ref="el => imageRefs[index] = el">
          <img :src="project.image" :alt="project.title" loading="lazy" class="img rounded" width="100%"/>
        </div>
      </div>

      <div class="relative flex flex-col items-center justify-center min-w-[100vw] h-full">
        <div>
          <div v-if="projects.length > perPage" class=" mb-6">
            <NuxtLink to="/projects">
              <UiPrimaryButton :inverted="!horizontalScroll" class="shadow-xl">
              <span class="hoverMove flex items-center justify-center">
                View More Works <Icon name="lucide:arrow-up-right" class="w-6 h-6 ml-2 -mb-2"/>
              </span>
              </UiPrimaryButton>
            </NuxtLink>
          </div>
          <h3 class="h4" :class="{'text-white':horizontalScroll}">Do you have a innovative idea?</h3>
          <h1 class="h1" :class="{'text-white':horizontalScroll}">Let's work together</h1>

          <div class="flex items-center justify-center h-full max-h-96 relative">
            <div class="rotate-90">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 38 15"
                  class="w-56 h-auto"
              >
                <path
                    ref="pathRef"
                    d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"
                    :class="[
    horizontalScroll ? 'fill-white' : 'fill-gray-300 dark:fill-gray-900',
    'transition-colors duration-300'
  ]"
                ></path>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import {ScrollToPlugin} from 'gsap/ScrollToPlugin'
import {works} from '~/config/data'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)


const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)

const projects = works || []
const container = ref<HTMLElement | null>(null)
const scroller = ref<HTMLElement | null>(null)
const horizontalScroll = ref(true)
const imageRefs = ref([])
const worksText = ref<HTMLElement | null>(null) // Reference for the "WORKS" text element
const pathRef = ref(null)

const perPage = 3

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
      horizontalScroll.value = true
      container.value.style.backgroundColor = '#2d3aa8' // blue
    },
    onLeave: () => {
      horizontalScroll.value = false
      container.value.style.backgroundColor = 'transparent' // default
    },
    onEnterBack: () => {
      horizontalScroll.value = true
      container.value.style.backgroundColor = '#2d3aa8' // blue
    },
    onLeaveBack: () => {
      horizontalScroll.value = true
      container.value.style.backgroundColor = 'transparent' // default
    },
  })
}

// const animatePath = () => {
//   const path = pathRef.value
//
//   const length = path.getTotalLength()
//
//   // Prepare the path
//   path.style.strokeDasharray = length
//   path.style.strokeDashoffset = length
//   path.style.fill = '#ffffff'
//   path.style.strokeWidth = '1'
//
//   gsap.to(path, {
//     strokeDashoffset: 0,
//     scrollTrigger: {
//       trigger: path,
//       start: 'top 80%', // when 80% of viewport reaches top of path
//       end: 'bottom 30%',
//       scrub: true,
//       markers: true,
//     },
//     ease: 'power1.out',
//   })
// }

const GSAP = () => {
  if (scroller.value) {
    const totalWidth = scroller.value?.scrollWidth || 0
    workTextAnimation()
    bgColorChangeOnScroll(totalWidth)
    projectHorizontal(totalWidth)
    imageSkew(totalWidth)
    // animatePath()
  }
}

onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => {
    GSAP()
    // Force refresh after setup
    //   ScrollTrigger.refresh()
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
  max-width: 100vw;
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
