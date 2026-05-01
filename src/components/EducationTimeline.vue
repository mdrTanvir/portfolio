<template>
  <div ref="educationContainer" class="relative w-full">
    <svg
        class="absolute bottom-0 left-[10px] top-3 z-1"
        width="2" height="100%" viewBox="0 0 2 1000" preserveAspectRatio="none"
    >
      <line ref="linePath" x1="1" y1="0" x2="1" y2="1000" class="stroke-primary" stroke-width="2"/>
    </svg>

    <div class="relative max-w-4xl space-y-10 pl-8 md:pl-10">
    <div
        v-for="(education, index) in educations"
        :key="index"
        class="relative"
    >
      <UiAnimate direction="up" :distance="30">
        <div class="block absolute left-[-28px] top-7 z-[1] h-5 w-5 -translate-x-1/2 rounded-full border-[5px] border-white bg-primary dark:border-black md:h-6 md:w-6"></div>
      </UiAnimate>
      <UiAnimate
          direction="up"
          :distance="30"
          :delay="index * 0.08"
          class="flex-1 flex"
      >
        <UiDotCard
            class="w-full h-full flex flex-col"
            :title="education.title"
            :subtitle="education.institution"
            :duration="education.duration"
            :description="education.description"
        />
      </UiAnimate>
    </div>
    </div>
  </div>
</template>

<script setup>
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {educations} from "~/config/data/data";

gsap.registerPlugin(ScrollTrigger)

const educationContainer = ref(null)
const linePath = ref(null)
let scrollTriggerInstance = null

const handleScrollTrigger = () => {
  if (!linePath.value || !educationContainer.value) return

  const length = linePath.value.getTotalLength()

  gsap.set(linePath.value, {
    strokeDasharray: length,
    strokeDashoffset: length,
  })

  scrollTriggerInstance = gsap.to(linePath.value, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: educationContainer.value,
      start: 'top 70%',
      end: '80% 10%',
      scrub: true,
    },
  })
}

onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => {
    handleScrollTrigger()
  })
})

onBeforeUnmount(() => {
  if (scrollTriggerInstance) scrollTriggerInstance.kill()
})
</script>
