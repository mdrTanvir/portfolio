<template>
  <section class="contain content-section about relative" ref="item">
    <UiHeading ref="itemTitle" class="z-10">About</UiHeading>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      <div class="z-10">
        <div class="mb-10">
          <UiAnimate
              direction="up"
              :distance="10"
              :duration="0.6"
              :delay="0.2"
              scrollTriggerStart="top 86%"
              scrollTriggerEnd="top 70%"
          >
            <p v-html="siteData.description" class="text-base text-gray-600 dark:text-gray-300"></p>
          </UiAnimate>
        </div>
        <div>
          <div class="my-4">
            <UiSubheading>Education</UiSubheading>
          </div>
          <EducationTimeline/>
        </div>
      </div>
      <div>
        <!--      <img-->
        <!--          src="https://images.unsplash.com/photo-1681068634386-50f0e81f50cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"-->
        <!--          alt=""-->
        <!--          class="flierImage img-fluid"-->
        <!--      >-->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {gsap} from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import siteData from "~/config/data";

gsap.registerPlugin(ScrollTrigger)

const itemTitle = ref(null)
const item = ref(null)

// onMounted(() => {
//   const itemTL = gsap.timeline({
//     scrollTrigger: {
//       trigger: item.value, // <-- Fix: use .value
//       start: "0% 75%",
//       end: "25% 50%",
//       scrub: 3,
//     }
//   })
//
//   itemTL.fromTo(itemTitle.value, {scale: 2, y: "100%"}, {
//     scale: 1,
//     y: "0%",
//     ease: "power2.inOut"
//   }, 0)
//
//   const itemImg = item.value?.querySelector("img") // <-- safer and more specific
//   if (itemImg) {
//     gsap.fromTo(
//         itemImg,
//         {x: "60vw", y: "60vh", rotate: -30},
//         {
//           // x: "-60vw", y: "-60vh", rotate: 30, ease: "none",
//           x: "0vw", y: "0vh", rotate: 0, ease: "none",
//           scrollTrigger: {
//             trigger: item.value,
//             start: "80% 100%",
//             // end: "100% 60%",
//             end: "100% 80%",
//             scrub: 3,
//           }
//         }
//     )
//   }
// })
</script>


<style scoped>
.flierImage {
  //position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  max-width: 300px;
  width: 100%;
  height: auto;
  max-height: 500px;
  aspect-ratio: 9/14;
  object-fit: cover;
  //transform: translate(-50%, -50%);
  opacity: 0.7;
}
</style>