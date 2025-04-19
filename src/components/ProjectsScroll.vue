<template>
  <section ref="container" class="horizontal-wrapper">
    <div ref="scroller" class="h-full flex">
      <div
          v-for="(project, index) in siteData.works"
          :key="index"
          class="relative flex gap-[60px] items-center justify-center min-w-[100vw] h-full"
      >
        <div class="">
          <h2 class="h1">{{ project.title }}</h2>
          <p class="text-sm text-gray-300 mb-2">{{ project.tag }} — {{ project.date }}</p>
          <p class="text-sm max-w-[500px]">{{ project.description }}</p>

          <div class="flex flex-wrap gap-2 mt-3">
            <template v-for="(skill, i) in project.skills" :key="i">
              <UiChip>{{ skill }}</UiChip>
            </template>
          </div>
          <!--          https://vdownload-47.sb-cd.com/1/4/14858606-720p.mp4?secure=2RmdrMHWQ29iJau_1aaqyg,1745081890&m=47&d=1&_tid=14858606-->
          <div class="flex gap-4 mt-3">
            <a
                v-if="project.projectLink"
                :href="project.projectLink"
                target="_blank"
                class=""
                data-hover
            >Live</a>
            <a
                v-if="project.gitHub"
                :href="project.gitHub"
                target="_blank"
                class=""
                data-hover
            >GitHub</a>
          </div>
        </div>
        <div class="image-wrapper" :ref="el => imageRefs[index] = el">
          <img :src="project.image" :alt="project.title" loading="lazy"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import siteData from '~/config/data'

gsap.registerPlugin(ScrollTrigger)

const container = ref(null)
const scroller = ref(null)
const imageRefs = ref([])


const GSAP = () => {
  const totalWidth = scroller.value.scrollWidth

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

  // Image parallax effect
  imageRefs.value.forEach((imgEl) => {
    gsap.to(imgEl, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: container.value,
        start: 'top top',
        end: () => `+=${totalWidth - window.innerWidth}`,
        scrub: true,
      },
    })
  })

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

  ScrollTrigger.create({
    trigger: container.value,
    start: 'top top',
    end: () => `+=${totalWidth - window.innerWidth}`,
    scrub: false,
    // pin: true,
    onEnter: () => {
      container.value.style.backgroundColor = '#4a5bf1' // blue
    },
    onLeave: () => {
      container.value.style.backgroundColor = 'transparent' // default
    },
    onEnterBack: () => {
      // container.value.style.backgroundColor = '#818cf8' // blue
      container.value.style.backgroundColor = '#4a5bf1' // blue
    },
    onLeaveBack: () => {
      container.value.style.backgroundColor = 'transparent' // default
    },
  })
}

onMounted(async () => {
  await nextTick()
  await GSAP()
})
</script>

<style scoped>
.horizontal-wrapper {
  position: relative;
  height: 100vh;
  overflow: hidden;
  transition: background-color 0.5s ease;
}

.image-wrapper {
  width: 500px;
  max-width: 80%;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  will-change: transform;
  transform-origin: center;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 20px;
}
</style>
