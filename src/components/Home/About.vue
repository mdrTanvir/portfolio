<template>
  <section class="contain content-section about relative">
    <UiHeading class="z-10">About</UiHeading>

    <div class="grid gap-4 md:mx-4 my-10 sm:grid-cols-12">
      <div class="col-span-12 md:col-span-6 z-10">
        <div class="mb-10">
          <template v-for="(description, n) in siteData.descriptions" :key="n">
            <UiAnimate
                direction="up"
                :distance="10"
                :duration="0.6"
                :delay="0.2"
                scrollTriggerStart="top 86%"
                scrollTriggerEnd="top 70%"
            >
              <p v-html="description" class="text-base text-gray-600 dark:text-gray-300"></p>
            </UiAnimate>
          </template>
        </div>
        <div>
          <div class="my-4">
            <UiSubheading>Education</UiSubheading>
          </div>
          <EducationTimeline/>
        </div>
      </div>
      <div class="col-span-12 md:col-span-6 z-10">
        <div id="imagePlaceTarget" class="relative h-full min-h-[340px]"></div>
        <!-- Slide the image here -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {gsap} from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const {isDesktop} = useDevice()
import siteData from "~/config/data";

gsap.registerPlugin(ScrollTrigger)

const imageAnimation = () => {
  nextTick(() => {
    setTimeout(() => {
      const image = document.getElementById('heroImageRef')
      const targetSection = document.getElementById('imagePlaceTarget')

      if (!image || !targetSection) {
        console.log(image)
        console.log(targetSection)
        return
      }

      const targetBox = targetSection.getBoundingClientRect()
      const imageBox = image.getBoundingClientRect()

      const xOffset = targetBox.left - imageBox.left
      const yOffset = targetBox.top - imageBox.top
      const xScale = targetBox.width / imageBox.width
      const yScale = targetBox.height / imageBox.height

      gsap.to(image, {
        x: xOffset,
        y: yOffset,
        scaleX: xScale,
        scaleY: yScale,
        // scale: 0.9,
        ease: 'power2.out',
        opacity: 1,
        transformOrigin: 'top left',
        objectFit: 'cover',
        objectPosition: 'center',
        right: 20,
        scrollTrigger: {
          trigger: targetSection,
          start: 'top bottom',
          end: 'top 20%',
          endTrigger: targetSection,
          scrub: true,
          // markers: true,
          // pin: image,
          // pinSpacing: false
        },
      })
    }, 500);
  })
}

onMounted(() => {
  if (isDesktop) {
    imageAnimation()
  }
})
</script>


<!--<style scoped>-->
<!--.flierImage {-->
<!--  //position: absolute;-->
<!--  z-index: 2;-->
<!--  top: 50%;-->
<!--  left: 50%;-->
<!--  max-width: 300px;-->
<!--  width: 100%;-->
<!--  height: auto;-->
<!--  max-height: 500px;-->
<!--  aspect-ratio: 9/14;-->
<!--  object-fit: cover;-->
<!--  //transform: translate(-50%, -50%);-->
<!--  opacity: 0.7;-->
<!--}-->
<!--</style>-->