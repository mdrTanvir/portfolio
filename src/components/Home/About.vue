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
        <div id="imagePlaceTarget" class="relative h-full md:min-h-[340px]"></div>
        <!-- Slide the image here -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {gsap} from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const {isDesktop} = useIsDesktop()
import siteData from "~/config/data";

gsap.registerPlugin(ScrollTrigger)

const imageAnimation = async () => {
  await nextTick(() => {
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

      gsap.fromTo(image, {
            x: 0,
            y: 0,
            scale: 1,
            filter: 'grayscale(1)',
            transformOrigin: 'top right',
          },
          {
            x: xOffset,
            y: yOffset,
            scale: 0.8,
            ease: 'power2.out',
            opacity: 1,
            filter: 'grayscale(0)',
            transformOrigin: 'top right',
            right: 20,
            zIndex: 1,
            rotation: '+=2',
            yoyo: true,
            scrollTrigger: {
              trigger: targetSection,
              start: 'top bottom',
              end: 'top 30%',
              scrub: true,
              // markers: true,
            },
            onComplete: () => {
              // Wave-like animation (X or Y axis or both)
              // gsap.to(image, {
              //   y: "+=10", // Move up and down
              //   duration: 2,
              //   ease: "sine.inOut",
              //   repeat: -1,
              //   yoyo: true,
              // rotation: '-=2',
              // transformOrigin: 'center center',
              // })
            }
          })
    }, 1000);
  })
}


onMounted(async () => {
  // await nextTick() // wait until child is rendered
  if (isDesktop) {
    await imageAnimation()
  }
})
</script>
