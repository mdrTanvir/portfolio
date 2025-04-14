<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  direction: {
    type: String,
    default: null,
  },
  duration: {
    type: Number,
    default: 0.6,
  },
  delay: {
    type: Number,
    default: 0.2,
  },
  distance: {
    type: Number,
    default: 100,
  },
  scrollTriggerStart: {
    type: String,
    default: 'top bottom',
  },
})

const componentRef = ref(null)
let animationContext

onMounted(() => {
  const fadeDirection = getFadeDirection(props.direction, props.distance)

  animationContext = gsap.context(() => {
    gsap.from(componentRef.value, {
      scrollTrigger: {
        trigger: componentRef.value,
        start: props.scrollTriggerStart,
      },
      duration: props.duration,
      delay: props.delay,
      opacity: 0,
      ...fadeDirection,
    })
  })
})

onBeforeUnmount(() => {
  if (animationContext) animationContext.revert()
})

function getFadeDirection(direction, distance) {
  switch (direction) {
    case 'left':
      return { x: distance }
    case 'right':
      return { x: -distance }
    case 'up':
      return { y: distance }
    case 'down':
      return { y: -distance }
    default:
      return { x: 0, y: 0 }
  }
}
</script>

<template>
  <div ref="componentRef">
    <slot />
  </div>
</template>
