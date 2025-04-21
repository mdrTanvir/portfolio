<template>
  <!-- Hero Section -->
  <section class="heroSection pb-10 md:pb-14 lg:pb-20">
    <div class="contain relative h-[100lvh] min-h-[100lvh] z-10 max-h-[1300px] pt-10 sm:pt-16 md:pt-24 pb-6 md:pb-10">
      <div class="h-full flex flex-col justify-between relative z-[2]">
        <HomeHeroTitle/>
        <HomeHeroStats/>
      </div>

      <div>
        <!-- Social Links -->
        <div class="absolute bottom-[40px] right-2 hidden md:block">
          <SocialLinksVertical/>
        </div>
        <img
            v-if="siteData.profile"
            class="profileImage"
            :src="siteData.profile"
            alt=""
            ref="heroImageRef"
            id="heroImageRef"
            height="80vh"
            width="auto"
        />
      </div>
    </div>

    <div class="beam beam-top-1"></div>
    <div class="beam beam-top-2"></div>
  </section>

  <!-- About Section -->
  <section id="ABOUT" class="contain content-section about relative">
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
        <div ref="imagePlaceTarget" id="imagePlaceTarget" class="relative h-full md:min-h-[340px]"></div>
        <!-- Slide the image here -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {gsap} from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import siteData from "~/config/data";

gsap.registerPlugin(ScrollTrigger)
const {isDesktop, windowWidth} = useIsDesktop()
const transformOrigin = ref('top center')
const imagePlaceTarget = ref(null)
const heroImageRef = ref(null)

const imageAnimation = async () => {
  await nextTick(() => {
    setTimeout(() => {
      // const image = document.getElementById('heroImageRef')
      const image = heroImageRef.value
      // const targetSection = document.getElementById('imagePlaceTarget')
      const targetSection = imagePlaceTarget.value

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
            transformOrigin: transformOrigin.value,
          },
          {
            x: xOffset,
            y: yOffset,
            scale: 0.8,
            ease: 'power2.out',
            opacity: 1,
            filter: 'grayscale(0)',
            transformOrigin: transformOrigin.value,
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
          })
    }, 1000);
  })
}

onMounted(async () => {
  await nextTick() // wait until child is rendered
  if (windowWidth.value < 1000) {
    transformOrigin.value = 'top left'
  }
  if (isDesktop.value) {
    await imageAnimation()
  }
})
</script>


<style scoped lang="scss">
.heroSection {
  position: relative;
  z-index: 1;
  height: 100%;
  max-height: 1300px;
  width: 100%;
}

.profileImage {
  position: absolute;
  z-index: 0;
  bottom: 0;
  right: 46px;
  width: auto;
  height: 80vh;
  max-height: 80vh;
  max-width: 100%;
  filter: grayscale(1);
  mix-blend-mode: lighten !important;
  transition: transform 0.3s ease;
  will-change: transform;
}

@media screen and (max-width: 768px) {
  .profileImage {
    right: 0;
    width: 100%;
    height: auto;
    max-width: 100%;
  }
}

.beam {
  opacity: 1;
  --border-bottom-width: 0px;
  --border-color: rgba(238, 238, 238, .1);
  --border-left-width: 0px;
  --border-right-width: 0px;
  --border-style: solid;
  --border-top-width: 1px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .05) 0%, rgba(171, 171, 171, 0) 100%);
  border-bottom: var(--border-bottom-width) var(--border-style) var(--border-color);
  border-left: var(--border-left-width) var(--border-style) var(--border-color);
  border-right: var(--border-right-width) var(--border-style) var(--border-color);
  border-top: var(--border-top-width) var(--border-style) var(--border-color);
  flex: none;
  overflow: hidden;
  position: absolute;
  width: 1065px;
  z-index: 5;

  //transform: rotate(0deg);
  animation: 1s fadeInBig ease-in-out forwards;
  animation-delay: 400ms;
}

.beam-top-1 {
  right: -134px;
  top: 10%;
  z-index: 1;
  transform: perspective(1200px) rotate(22deg);
}

.beam-top-2 {
  right: -134px;
  top: -2%;
  z-index: 2;
  transform: perspective(1200px) rotate(28deg);
}

@keyframes fadeInBig {
  0% {
    opacity: 0;
    height: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    height: 145px;
  }
}
</style>
