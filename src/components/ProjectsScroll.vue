<template>
  <section ref="container" class="horizontal-wrapper relative h-screen">
    <div ref="scroller" class="h-full flex">
      <div class="flex gap-[60px] items-center justify-center min-w-[100vw] h-full">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="flex items-center justify-center">
          <text
              id="worksText"
              ref="worksText"
              x="50%"
              y="50%"
              text-anchor="middle"
              alignment-baseline="middle"
              font-family="Arial"
              font-size="80"
              fill="white"
              stroke="white"
              font-weight="800"
              stroke-width="2"
          >
            WORKS
          </text>
        </svg>
      </div>

      <div
          v-for="(project, index) in siteData.works"
          :key="index"
          class="relative flex gap-4 items-center justify-center min-w-[100vw] h-full"
      >
        <div class="">
          <h2 class="h1">{{ project.title }}</h2>
          <p class="text-sm text-gray-300 mt-2 mb-3">{{ project.tag }} — {{ project.date }}</p>
          <p class="text-sm max-w-[500px]">{{ project.description }}</p>

          <div class="flex flex-wrap gap-2 mt-3">
            <template v-for="(skill, i) in project.skills" :key="i">
              <UiChip>{{ skill }}</UiChip>
            </template>
          </div>

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
          <img :src="project.image" :alt="project.title" loading="lazy" class="img"/>
        </div>
      </div>

      <div class="relative flex flex-col items-center justify-center min-w-[80vw] h-full">
        <div>
          <div class=" mb-6">
            <UiPrimaryButton>
              <span class="hoverMove flex items-center justify-center">
                View More Works <Icon name="lucide:download" class="w-5 h-5 ml-2"/>
              </span>
            </UiPrimaryButton>
          </div>
          <h3 class="h4">Do you have an innovative idea?</h3>
          <h1 class="h1">Let's work together</h1>
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
const worksText = ref(null) // Reference for the "WORKS" text element

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

  // Scroll-triggered animations for "WORKS" text
  ScrollTrigger.create({
    trigger: container.value,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    markers: true,
    onUpdate: (self) => {
      const progress = self.progress
      const worksTextElement = worksText.value

      if (progress > 0.2) {
        // When scrolling past 30%, make the text fixed and apply styles
        gsap.to(worksTextElement, {
          fill: 'transparent',
          stroke: 'white',
          duration: 0.2,
          position: 'fixed',
          top: '10vh', // Pin the text 10vh from the top
          // left: '50%',
          // x: '-50%', // Center horizontally
          fontSize: 180,
        })
      } else {
        // Reset to original state before scrolling past 30%
        gsap.to(worksTextElement, {
          fill: 'white',
          stroke: 'white',
          duration: 0.2,
          position: 'absolute',
          top: '50%', // Original center position
          // left: '50%',
          // x: '-50%', // Center horizontally
          fontSize: 80,
        })
      }
    },
    onLeave: () => {
    }
  })

  // ScrollTrigger.create({
  //   trigger: container.value,
  //   start: 'top top', // Start when "WORKS" screen comes into view
  //   end: '+=100%', // End when the next section starts (projects section)
  //   scrub: true,
  //   pin: worksText.value, // Pin the text during this scroll section
  //   markers: true,
  //   onUpdate: (self) => {
  //     const progress = self.progress;
  //     const worksTextElement = worksText.value;
  //
  //     // Calculate font size dynamically based on scroll progress
  //     const fontSize = 80 + (progress * 100); // Increase font size as we scroll
  //
  //     if (progress > 0.3) {
  //       gsap.to(worksTextElement, {
  //         fill: 'transparent',
  //         stroke: 'white',
  //         position: 'fixed', // Pin it to the screen
  //         top: '10vh', // Keep it 10vh from the top
  //         left: '50%',
  //         x: '-50%',
  //         fontSize: fontSize + 'px', // Dynamically increase font size
  //         zIndex: 10, // Make sure the text stays on top of other elements
  //         duration: 0.2,
  //       });
  //     } else {
  //       gsap.to(worksTextElement, {
  //         fill: 'white',
  //         stroke: 'white',
  //         position: 'absolute',
  //         top: '50%',
  //         left: '50%',
  //         x: '-50%',
  //         fontSize: '80px', // Reset to initial font size
  //         zIndex: 1, // Reset z-index
  //         duration: 0.2,
  //       });
  //     }
  //   },
  // });

  // Background color change on scroll
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

onMounted(async () => {
  await nextTick()
  await GSAP()
})
</script>

<style scoped>
.horizontal-wrapper {
  overflow: hidden;
  transition: background-color 0.5s ease;
}

.image-wrapper {
  width: 800px;
  max-width: 80%;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  will-change: transform;
  transform-origin: center;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 20px;
}

#worksText {
  transition: transform 0.3s ease, fill 0.3s ease, stroke 0.3s ease;
}
</style>
