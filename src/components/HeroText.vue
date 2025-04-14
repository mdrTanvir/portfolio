<template>
  <main>
    <h1 ref="line1" data-splitting class="fluid h1">I am Tanvir Rahman.</h1>
    <h1 ref="line2" data-splitting class="fluid h1">a <span class="text-primary">Web Developer</span></h1>
  </main>
</template>

<script setup>
import {onMounted, ref, reactive} from 'vue'
import gsap from 'gsap'

// Import from CDN (or locally if you prefer)
const Splitting = (await import('https://cdn.skypack.dev/splitting')).default
const {Pane} = await import('https://cdn.skypack.dev/tweakpane@4.0.4')

const line1 = ref(null)
const line2 = ref(null)

const config = reactive({
  theme: 'system',
  debug: false,
  scrub: false,
  progress: 0,
})

let scrubber, progress

const update = () => {
  document.documentElement.dataset.debug = config.debug
  document.documentElement.dataset.theme = config.theme
  document.documentElement.dataset.scrub = config.scrub
  document.documentElement.style.setProperty('--progress', config.progress)
  if (scrubber) scrubber.hidden = !config.debug
  if (progress) {
    progress.hidden = !config.debug
    progress.disabled = !config.scrub
  }
}

onMounted(() => {
  Splitting()

  // Animate each character using GSAP
  const chars = document.querySelectorAll('.char')
  gsap.fromTo(chars, {
    opacity: 0,
    y: 50,
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power4.out',
    stagger: 0.05,
  })

  // Tweakpane controls
  const ctrl = new Pane({title: 'Config', expanded: true})

  ctrl.addBinding(config, 'debug', {label: 'Debug'})
  scrubber = ctrl.addBinding(config, 'scrub', {label: 'Scrub', hidden: true})
  progress = ctrl.addBinding(config, 'progress', {
    min: 0,
    max: 100,
    step: 1,
    label: 'Progress',
    disabled: true,
  })
  ctrl.addBinding(config, 'theme', {
    label: 'Theme',
    options: {System: 'system', Light: 'light', Dark: 'dark'},
  })

  ctrl.on('change', (event) => {
    if (
        !document.startViewTransition ||
        event.target.controller.view.labelElement.innerText !== 'Theme'
    ) return update()

    document.startViewTransition(() => update())
  })

  update()
})
</script>

<style scoped>
main {
  padding: 3rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
}
</style>
