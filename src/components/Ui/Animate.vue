<script setup>
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  direction: {type: String, default: 'up',},
  duration: {type: Number, default: 0.4,},
  delay: {type: Number, default: 0.2,},
  distance: {type: Number, default: 100,},
  scrollTriggerStart: {type: String, default: 'top 95%',},
  scrollTriggerEnd: {type: String, default: 'top 80%',},
  ease: {type: String, default: 'cubic-bezier(0.25, 0.1, 0.25, 1)',},
  scrub: {type: Boolean, default: true,},
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
        end: props.scrollTriggerEnd,
        // toggleActions: 'play none none reverse',
        toggleActions: 'restart none none reverse',
        scrub: props.scrub,
      },
      duration: props.duration,
      delay: props.delay,
      opacity: 0,
      ease: props.ease,
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
      return {x: distance}
    case 'right':
      return {x: -distance}
    case 'up':
      return {y: distance}
    case 'down':
      return {y: -distance}
    default:
      return {x: 0, y: 0}
  }
}
</script>

<template>
  <div ref="componentRef">
    <slot/>
  </div>
</template>
