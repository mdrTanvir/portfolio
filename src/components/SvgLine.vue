<template>
  <div ref="container" class="relative">
    <svg
        ref="svg"
        class="fixed top-0 left-1/2 transform -translate-x-1/2 z-10"
        width="2"
        height="100%"
        viewBox="0 0 2 1000"
        preserveAspectRatio="none"
    >
      <line
          ref="line"
          x1="1"
          y1="0"
          x2="1"
          y2="1000"
          stroke="#4F46E5"
          stroke-width="2"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const container = ref(null)
const line = ref(null)

onMounted(async () => {
  await nextTick() // wait until child is rendered

  const endDiv = document.getElementById('footer')
  if (!endDiv) return

  const length = line.value.getTotalLength()

  gsap.set(line.value, {
    strokeDasharray: length,
    strokeDashoffset: length,
  })

  gsap.to(line.value, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: container.value,
      start: 'top 90%',
      endTrigger: endDiv,
      end: 'top top',
      scrub: true,
    },
  })
})
</script>
