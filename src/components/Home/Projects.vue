<template>
  <section ref="container" id="PROJECTS" class="contain content-section relative">
    <UiHeading>Projects</UiHeading>

    <div v-if="projects && projects.length">
      <div
          v-for="(project, index) in PROJECTS"
          :key="index"
          class="relative w-full my-20 grid grid-cols-5 gap-6 mx-auto px-4"
      >
        <div class="col-span-5 md:col-span-2 flex items-center">
          <div>
            <div class="overflow-hidden py-2">
              <UiAnimate :distance="30">
                <h2 class="h2 text-white">{{ project.title }}</h2>
              </UiAnimate>
            </div>
            <div class="overflow-hidden">
              <UiAnimate>
                <p class="text-sm font-medium text-gray-200 mt-2 mb-3">{{ project.tag }} — {{ project.date }}</p>
              </UiAnimate>
            </div>
            <div class="overflow-hidden">
              <UiAnimate>
                <p class="text-lg max-w-[300px] md:max-w-[500px] text-white">{{ project.description }}</p>
              </UiAnimate>
            </div>

            <div class="flex flex-wrap gap-4 mt-3">
              <template v-for="(skill, i) in project.skills" :key="i">
                <UiAnimate :distance="40">
                  <UiChip class="bg-gray-800 text-white">{{ skill }}</UiChip>
                </UiAnimate>
              </template>
            </div>

            <div class="flex gap-4 mt-3">
              <div class="overflow-hidden">
                <UiAnimate>
                  <a v-if="project.projectLink" :href="project.projectLink" target="_blank" class="font-bold text-white hover:text-indigo-300" data-hover>Live</a>
                </UiAnimate>
              </div>
              <div class="overflow-hidden">
                <UiAnimate>
                  <a v-if="project.gitHub" :href="project.gitHub" target="_blank" class="font-bold text-white hover:text-indigo-300" data-hover>GitHub</a>
                </UiAnimate>
              </div>
            </div>
          </div>
        </div>
        <div class="image-wrapper col-span-5 md:col-span-3 flex items-start md:items-center" :ref="el => imageRefs[index] = el">
          <UiAnimate direction="left" :distance="60">
            <img :src="project.image" :alt="project.title" loading="lazy" class="img rounded" width="100%"/>
          </UiAnimate>
        </div>
      </div>


      <div class="relative flex flex-col items-center justify-center w-full max-h-screen" style="height: 70dvh">
        <div>
          <div v-if="projects.length > perPage" class=" mb-6">
            <UiAnimate :distance="40">
              <NuxtLink to="/projects">
                <UiPrimaryButton class="shadow-xl">
              <span class="hoverMove flex items-center justify-center">
                View More Works <Icon name="lucide:arrow-up-right" class="w-6 h-6 ml-2 -mb-2"/>
              </span>
                </UiPrimaryButton>
              </NuxtLink>
            </UiAnimate>
          </div>
          <UiAnimate :distance="40">
            <h3 class="h4">Do you have a innovative idea?</h3>
          </UiAnimate>
          <UiAnimate :distance="40">
            <h1 class="h1">Let's work together</h1>
          </UiAnimate>
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
                    class="fill-none stroke-gray-300 dark:stroke-gray-900"
                    stroke-width="2"
                />
              </svg>

              <!--              <svg-->
              <!--                  xmlns="http://www.w3.org/2000/svg"-->
              <!--                  viewBox="0 0 38 15"-->
              <!--                  class="w-56 h-auto bg-red-800"-->
              <!--              >-->
              <!--                <path-->
              <!--                    ref="pathRef"-->
              <!--                    d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"-->
              <!--                    class="fill-gray-300 dark:fill-gray-900"-->
              <!--                ></path>-->
              <!--              </svg>-->
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
import siteData from '~/config/data'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// const themeStore = useThemeStore()
// const {darkMode} = storeToRefs(themeStore)

const projects = siteData?.works || []
const container = ref<HTMLElement | null>(null)
const imageRefs = ref([])
const pathRef = ref<SVGPathElement | null>(null)

const perPage = 3

const PROJECTS = computed(() => projects.slice(0, perPage))

const imageSkew = () => {
  // Skew effect based on scroll velocity
  let proxy = {skew: 0}
  const skewSetter = gsap.quickSetter(imageRefs.value, 'skewX', 'deg')
  const clamp = gsap.utils.clamp(-20, 20)

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

const handleScrollTrigger = () => {
  if (!pathRef.value) return

  const length = pathRef.value.getTotalLength()

  gsap.set(pathRef.value, {
    strokeDasharray: length,
    strokeDashoffset: length,
  })

  gsap.to(pathRef.value, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: pathRef.value,
      start: 'center center',
      end: 'bottom 30%',
      scrub: true,
      // markers: true,
    },
  })
}

const GSAP = () => {
  imageSkew()
  handleScrollTrigger()
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
