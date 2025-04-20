<template>
  <div>
    <div class="relative flex items-center md:hidden">

      <!-- Open Trigger -->
      <div v-show="!menuOpen" class="menu-trigger block cursor-pointer" @click="openMenu">
        <i class="menu-trigger-bar top" ref="openTop"></i>
        <i class="menu-trigger-bar middle" ref="openMiddle"></i>
        <i class="menu-trigger-bar bottom" ref="openBottom"></i>
      </div>
      <!-- Close Trigger -->
      <div v-show="menuOpen" class="close-trigger block cursor-pointer" ref="closeTrigger" @click="closeMenu">
        <i class="close-trigger-bar left" ref="closeLeft"></i>
        <i class="close-trigger-bar right" ref="closeRight"></i>
      </div>
    </div>

    <div v-show="menuOpen" class="mobileNavContainer relative">
      <!-- Background Layers -->
      <div class="inner-container h-screen">
        <i class="menu-bg top bg-black dark:bg-white" ref="menuTop"></i>
        <i class="menu-bg middle bg-black dark:bg-white" ref="menuMiddle"></i>
        <i class="menu-bg bottom bg-black dark:bg-white" ref="menuBottom"></i>

        <!-- Navigation -->
        <!--        <div class="h-full flex items-center justify-center absolute left-1/2 z-50" ref="menuContainer">-->
        <div class="h-full flex items-center justify-center relative z-50" ref="menuContainer">
          <ul class="menu text-lg space-y-4 py-8" ref="menu">
            <li v-for="item in navigation" :key="item.name">
              <a :href="item.href"
                 class="text-base font-medium"
                 :class="item.focus ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-white'"
              >
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import gsap, {Power4} from 'gsap'
import navigation from "~/config/navigation";

// Refs for triggers
const menuOpen = ref(false)
const openTop = ref()
const openMiddle = ref()
const openBottom = ref()

const closeTrigger = ref()
const closeLeft = ref()
const closeRight = ref()

// Menu parts
const menu = ref()
const menuTop = ref()
const menuMiddle = ref()
const menuBottom = ref()
const menuContainer = ref()

// GSAP timelines
let tlOpen, tlClose

onMounted(() => {
  tlOpen = gsap.timeline({paused: true})
  tlClose = gsap.timeline({paused: true})

  // OPEN
  tlOpen
      .add('preOpen')
      .to(openTop.value, {x: 0, y: -0, duration: 0.4, delay: 0.1, ease: Power4.easeIn})
      .to(openMiddle.value, {
        x: 0, y: -0, duration: 0.4, ease: Power4.easeIn,
        onComplete: () => closeTrigger.value.style.zIndex = 25
      }, 'preOpen')
      .to(openBottom.value, {x: 0, y: -0, duration: 0.4, delay: 0.2, ease: Power4.easeIn}, 'preOpen')
      .add("open", "-=0.4")
      .to(menuTop, {y: '13%', ease: 'power4.inOut'}, "open")
      .to(menuMiddle, {scaleY: 1, ease: 'power4.inOut'}, "open")
      .to(menuBottom, {y: '-114%', ease: 'power4.inOut'}, "open")
      .fromTo(menu.value, {y: 30, opacity: 0, visibility: 'hidden'}, {y: 0, opacity: 1, visibility: 'visible', duration: 0.6, ease: Power4.easeOut}, '-=0.2')
      .add('preClose', '-=0.8')
      .to(closeLeft.value, {x: -0, y: 0, duration: 0.8, ease: Power4.easeOut}, 'preClose')
      .to(closeRight.value, {x: 0, y: 0, duration: 0.8, delay: 0.2, ease: Power4.easeOut}, 'preClose')

      .to(openTop.value, {x: 80, y: -80, duration: 1, delay: 0.2, ease: Power4.easeOut}, 'close')
      .to(openMiddle.value, {x: 80, y: -80, duration: 1, ease: Power4.easeOut}, 'close')
      .to(openBottom.value, {x: 80, y: -80, duration: 1, delay: 0.1, ease: Power4.easeOut}, 'close')

//   // CLOSE
  tlClose
      .add('close')
      .to([menuTop.value, menuMiddle.value, menuBottom.value], {
        // backgroundColor: '#6295ca', duration: 0.2, ease: Power4.easeInOut
      }, 'close')
      .to(menu.value, {
        y: 20, opacity: 0, duration: 0.6, ease: Power4.easeOut,
        onComplete: () => menu.value.style.visibility = 'hidden'
      }, 'close')
      .to(closeLeft.value, {x: 100, y: -100, duration: 0.2, ease: Power4.easeIn}, 'close')
      .to(closeRight.value, {x: -100, y: -100, duration: 0.2, delay: 0.1, ease: Power4.easeIn}, 'close')

      .to(openTop.value, {x: 0, y: 0, duration: 1, delay: 0.2, ease: Power4.easeOut}, 'close')
      .to(openMiddle.value, {x: 0, y: 0, duration: 1, ease: Power4.easeOut}, 'close')
      .to(openBottom.value, {x: 0, y: 0, duration: 1, delay: 0.1, ease: Power4.easeOut}, 'close')

})

const openMenu = () => {
  menuOpen.value = true
  console.log('tlOpen', tlOpen.progress())
  tlOpen.progress() < 1 ? tlOpen.play() : tlOpen.restart()
}

const closeMenu = () => {
  console.log('tlClose', tlClose.progress())
  tlClose.progress() < 1 ? tlClose.play() : tlClose.restart()

  setTimeout(() => {
    menuOpen.value = false
  }, 500)
}
</script>

<style scoped lang="scss">
// Mobile navigation ....
.mobileNavContainer {
  @apply bg-white/80 dark:bg-black/80 backdrop-blur-xl fixed top-0 left-0 right-0 bottom-0 z-10;
  margin: 0 auto;
  -webkit-transform: scale(1);
  height: 100vh;
  width: 100vw;
}

.menu-trigger, .close-trigger {
  position: absolute;
  top: -12px;
  right: 0;
  display: block;
  width: 40px;
  height: 40px;
  z-index: 333 !important;
}

.menu-trigger:hover .menu-trigger-bar:before, .close-trigger:hover .menu-trigger-bar:before {
  width: 100%;
}

.menu-trigger:hover .close-trigger-bar:before, .close-trigger:hover .close-trigger-bar:before {
  width: 100%;
}

.close-trigger {
  z-index: 5;
  //top: 42px;
}

.menu-trigger-bar {
  @apply bg-black dark:bg-white rounded;
  display: block;
  width: 100%;
  height: 4px;
  margin-bottom: 6px;
  transform: rotate(-45deg);
  position: relative;
}

.menu-trigger-bar:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 0%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.menu-trigger-bar.top {
  width: 50%;
}

.menu-trigger-bar.middle:before {
  left: auto;
  right: 0;
}

.menu-trigger-bar.bottom {
  width: 50%;
  margin-left: 50%;
}

.close-trigger-bar {
  @apply bg-black dark:bg-white rounded;
  display: block;
  width: 100%;
  height: 4px;
  position: relative;
}

.close-trigger-bar:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 0%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.close-trigger-bar.left {
  transform: translateX(100px) translateY(-100px) rotate(-45deg);
}

.close-trigger-bar.right {
  transform: translateX(-100px) translateY(-100px) rotate(45deg);
  top: -3px;
}

.inner-container {
  position: absolute;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  z-index: 20;
}

.menu-bg {
  position: absolute;
  display: block;
  width: 400%;
  left: -53%;
  top: -25%;
  height: 40%;

  z-index: 10;
  transform-origin: 0 0;

  &.top {
    top: 10%;
    left: -100%;
    transform: rotate(-45deg) translateY(75%);
    background-color: rgba(104, 103, 103, 1);
  }

  &.middle {
    height: 50% !important;
    top: 72%;
    left: -60%;
    transform: rotate(-45deg) scaleY(1.3);
    background-color: rgba(64, 63, 63, 1);
    z-index: 9 !important;
  }

  &.bottom {
    top: 105%;
    left: 0;
    transform: rotate(-45deg) translateY(10%);
    background-color: rgba(33, 32, 32, 1);
  }
}
</style>