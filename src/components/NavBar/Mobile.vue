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

    <div v-show="showMenu" class="mobileNavContainer relative">
      <!-- Background Layers -->
      <div class="inner-container h-screen">
        <i class="menu-bg first" ref="menuTop"></i>
        <i class="menu-bg middle" ref="menuMiddle"></i>
        <i class="menu-bg last" ref="menuBottom"></i>

        <!-- Navigation -->
        <div class="h-full flex items-center justify-center relative z-50" ref="menuContainer">
          <ul class="menu text-lg space-y-6 py-8 w-[280px]" ref="menu">
            <li v-for="item in navigation" :key="item.name">
              <a
                  class="text-3xl font-medium cursor-pointer"
                  :class="item.focus ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-white'"
                  :data-text="item.name"
                  @click.stop.prevent="closeMenu(); scrollTo(item.href);"
              >
                {{ item.name }}
              </a>
            </li>
            <li>
              <NavBarThemeToggleBtn/>
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

const {scrollTo} = useScrollTo()

// Refs for triggers
const menuOpen = ref(false)
const showMenu = ref(false)
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
  tlOpen.add('start')
      .set([menuTop.value, menuMiddle.value, menuBottom.value], {scaleY: 0.5, opacity: 0, top: '-35%',})
      // .to(menuTop.value, {top: '0%', scaleY: 1, opacity: 1, duration: 0.5, ease: Power4.easeOut}, 'start')
      // .to(menuMiddle.value, {top: '34%', scaleY: 1, opacity: 1, duration: 0.6, ease: Power4.easeOut}, 'start+=0.1')
      // .to(menuBottom.value, {top: '68%', scaleY: 1, opacity: 1, duration: 0.7, ease: Power4.easeOut}, 'start+=0.2')

      .to(menuTop.value, {top: '-38%', scaleY: 1, opacity: 1, duration: 0.5, ease: Power4.easeOut}, 'start')
      .to(menuMiddle.value, {top: '8%', scaleY: 1, opacity: 1, duration: 0.6, ease: Power4.easeOut}, 'start+=0.1')
      .to(menuBottom.value, {top: '54%', scaleY: 1, opacity: 1, duration: 0.7, ease: Power4.easeOut}, 'start+=0.2')

      // Animate menu items
      .fromTo(menu.value.children,
          {y: 50, opacity: 0, stagger: 0.1},
          {y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: Power4.easeOut},
          'start+=0.4'
      )

      // Animate close icon lines
      .to(closeLeft.value, {x: 0, y: 0, rotate: -45, duration: 0.5, ease: Power4.easeOut}, 'start+=0.6')
      .to(closeRight.value, {x: 0, y: 0, rotate: 45, duration: 0.5, ease: Power4.easeOut}, 'start+=0.65')

      // Animate trigger bars out
      .to([openTop.value, openMiddle.value, openBottom.value], {x: 80, y: -80, duration: 1, ease: Power4.easeOut}, 'start+=0.2')


  // CLOSE
  tlClose.add('close')
      .to(menu.value.children, {y: 30, opacity: 0, duration: 0.4, stagger: 0.05, ease: Power4.easeIn}, 'close')

      .to([menuBottom.value, menuMiddle.value, menuTop.value], {scaleY: 0.7, opacity: 0, top: '-35%', duration: 0.5, ease: Power4.easeInOut, stagger: 0.1}, 'close+=0.3')

      .to(closeLeft.value, {x: 100, y: -100, rotate: 0, duration: 0.3, ease: Power4.easeIn}, 'close')
      .to(closeRight.value, {x: -100, y: -100, rotate: 0, duration: 0.3, delay: 0.1, ease: Power4.easeIn}, 'close')

      .to([openTop.value, openMiddle.value, openBottom.value], {x: 0, y: 0, duration: 1, delay: 0.2, ease: Power4.easeOut}, 'close')
})


const openMenu = () => {
  menuOpen.value = true
  showMenu.value = true
  tlOpen.progress() < 1 ? tlOpen.play() : tlOpen.restart()
}

const closeMenu = () => {
  menuOpen.value = false
  tlClose.progress() < 1 ? tlClose.play() : tlClose.restart()

  setTimeout(() => {
    showMenu.value = false
  }, 800)
}

watchEffect(() => {
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
})
</script>

<style scoped lang="scss">
//.menu {
//  a {
//    display: block;
//    position: relative;
//
//    &::before {
//      content: attr(data-text);
//      @apply bg-gradient-to-r from-gray-300/60 to-slate-400/30 dark:from-gray-800/60 dark:to-gray-600/50;
//      -webkit-background-clip: text;
//      -webkit-text-fill-color: transparent;
//
//      font-size: 3rem;
//      position: absolute;
//      top: -1rem;
//      z-index: -1;
//      transform: translateY(10px);
//      transition: all 0.3s ease;
//    }
//  }
//}
.menu {
  a {
    display: block;
    position: relative;
    overflow: hidden;

    &::before {
      content: attr(data-text);
      font-size: 3rem;
      //font-weight: bold;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;

      transform: translate(4px, 0px) scale(1.05);
      opacity: 0.08;
      letter-spacing: 1px;

      @apply bg-gradient-to-br from-teal-400/70 to-teal-800/70 dark:from-white/30 dark:to-white/20;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      filter: blur(2px);
      transition: all 0.5s ease;
    }

    &:hover::before {
      transform: translate(0px, 0px) scale(1.1);
      opacity: 0.2;
      filter: blur(1px);
    }
  }
}

.mobileNavContainer {
  @apply fixed top-0 left-0 right-0 bottom-0 z-10;
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
  display: block;
  width: 400%;
  height: 34%;
  transform-origin: 0 0;
  transform: rotate(45deg) !important;

  z-index: 10;

  @apply backdrop-blur-xl absolute top-0 left-0;

  &.first {
    top: -35%;
    @apply bg-gray-100 dark:bg-gray-800;
  }

  &.middle {
    top: -35%;
    @apply bg-gray-200 dark:bg-gray-900;
  }

  &.last {
    top: -35%;
    @apply bg-gray-300 dark:bg-gray-950;
  }
}
</style>