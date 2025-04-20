<template>
  <div>
    <div class="relative flex items-center md:hidden">
      <!-- Open Trigger -->
      <div class="menu-trigger cursor-pointer" data-hover @click="openMenu">
        <i class="menu-trigger-bar top" ref="openTop"></i>
        <i class="menu-trigger-bar middle" ref="openMiddle"></i>
        <i class="menu-trigger-bar bottom" ref="openBottom"></i>
      </div>
      <!-- Close Trigger -->
      <div class="close-trigger cursor-pointer" data-hover @click="closeMenu" ref="closeTrigger">
        <i class="close-trigger-bar left" ref="closeLeft"></i>
        <i class="close-trigger-bar right" ref="closeRight"></i>
      </div>
    </div>

    <div class="mobileNavContainer">
      <div class="relative">
        <!-- Background Layers -->
        <div class="inner-container">
          <i class="menu-bg top bg-black dark:bg-white" ref="menuTop"></i>
          <i class="menu-bg middle bg-black dark:bg-white" ref="menuMiddle"></i>
          <i class="menu-bg bottom bg-black dark:bg-white" ref="menuBottom"></i>

          <!-- Navigation -->
          <div class="menu-container" ref="menuContainer">
            <ul class="menu text-lg space-y-4 py-8" ref="menu">
              <li v-for="item in navigation" :key="item.name">
                <a :href="item.href" data-hover
                   class="text-base font-medium"
                   :class="item.focus ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-white'"
                >
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import gsap, {Power4} from 'gsap'
import navigation from "~/config/navigation";

// Refs for triggers
const openTop = ref()
const openMiddle = ref()
const openBottom = ref()

const closeTrigger = ref()
const closeLeft = ref()
const closeRight = ref()

// Menu parts
const menuTop = ref()
const menuMiddle = ref()
const menuBottom = ref()
const menu = ref()
const menuContainer = ref()

// GSAP timelines
let tlOpen, tlClose

onMounted(() => {
  tlOpen = gsap.timeline({paused: true})
  tlClose = gsap.timeline({paused: true})

  // OPEN
  tlOpen
      .add('preOpen')
      .to(openTop.value, {x: 80, y: -80, duration: 0.4, delay: 0.1, ease: Power4.easeIn})
      .to(openMiddle.value, {
        x: 80, y: -80, duration: 0.4, ease: Power4.easeIn,
        onComplete: () => closeTrigger.value.style.zIndex = 25
      }, 'preOpen')
      .to(openBottom.value, {x: 80, y: -80, duration: 0.4, delay: 0.2, ease: Power4.easeIn}, 'preOpen')
      // .add('open', '-=0.4')
      // .to(menuTop.value, {y: '13%', duration: 0.8, ease: Power4.easeInOut}, 'open')
      // .to(menuMiddle.value, {scaleY: 1, duration: 0.8, ease: Power4.easeInOut}, 'open')
      // .to(menuBottom.value, {y: '-114%', duration: 0.8, ease: Power4.easeInOut}, 'open')
      .fromTo(menu.value, {y: 30, opacity: 0, visibility: 'hidden'}, {y: 0, opacity: 1, visibility: 'hidden', duration: 0.6, ease: Power4.easeOut}, '-=0.2')
      .add('preClose', '-=0.8')
      .to(closeLeft.value, {x: -0, y: 0, duration: 0.8, ease: Power4.easeOut}, 'preClose')
      .to(closeRight.value, {x: 0, y: 0, duration: 0.8, delay: 0.2, ease: Power4.easeOut}, 'preClose')

  // CLOSE
  tlClose
      .add('close')
      .to([menuTop.value, menuMiddle.value, menuBottom.value], {
        backgroundColor: '#6295ca', duration: 0.2, ease: Power4.easeInOut
      }, 'close')
      .to(menu.value, {
        y: 20, opacity: 0, duration: 0.6, ease: Power4.easeOut,
        onComplete: () => menu.value.style.visibility = 'hidden'
      }, 'close')
      .to(menuTop.value, {y: '-113%', duration: 0.8, ease: Power4.easeInOut}, 'close+=0.2')
      .to(menuMiddle.value, {scaleY: 0, duration: 0.8, ease: Power4.easeInOut}, 'close+=0.2')
      .to(menuBottom.value, {
        y: '23%', duration: 0.8, ease: Power4.easeInOut,
        onComplete: () => {
          menuTop.value.style.backgroundColor = '#fff'
          menuMiddle.value.style.backgroundColor = '#fff'
          menuBottom.value.style.backgroundColor = '#fff'
        }
      }, 'close+=0.2')
      .to(closeLeft.value, {x: 100, y: -100, duration: 0.2, ease: Power4.easeIn}, 'close')
      .to(closeRight.value, {x: -100, y: -100, duration: 0.2, delay: 0.1, ease: Power4.easeIn}, 'close')
      .to(openTop.value, {x: -80, y: 80, duration: 1, delay: 0.2, ease: Power4.easeOut}, 'close')
      .to(openMiddle.value, {x: -80, y: 80, duration: 1, ease: Power4.easeOut}, 'close')
      .to(openBottom.value, {x: -80, y: 80, duration: 1, delay: 0.1, ease: Power4.easeOut}, 'close')
})

const openMenu = () => {
  tlOpen.progress() < 1 ? tlOpen.play() : tlOpen.restart()
}

const closeMenu = () => {
  tlClose.progress() < 1 ? tlClose.play() : tlClose.restart()
}
</script>


<style scoped lang="scss">
// Mobile navigation ....
.mobileNavContainer {
  @apply fixed top-0 left-0 right-0 bottom-0 z-50;
  margin: 0 auto;
  -webkit-transform: scale(1);
  background: rgba(255, 255, 255, 0.45);
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
  z-index: 333;
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
  display: block;
  width: 100%;
  height: 4px;
  background-color: white;
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
  display: block;
  width: 100%;
  height: 4px;
  background-color: #444444;
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

.inner-container, .menu-container {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

.inner-container {
  z-index: 20;
}

.menu-container {
  display: flex;
  align-items: center;
}

.menu {
  display: block;
  width: 100%;
  padding: 20%;
}

.menu li {
  text-align: left;
  display: block;
  padding: 15px 0;
}

.menu a {
  text-decoration: none;
  color: #222222;
  display: inline-block;
  padding: 10px 0;
  position: relative;
}

.menu a:hover:before {
  opacity: 1;
  transform: translateX(0px);
}

.menu a:before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 18px;
  height: 4px;
  opacity: 0;
  background-color: #222222;
  transform: translateX(100px);
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.menu-bg {
  position: absolute;
  display: block;
  width: 200%;
  left: -53%;
  top: -25%;
  height: 40%;
}

.menu-bg.middle {
  top: 29%;
  left: -53%;
  transform: rotate(-45deg) scaleY(0);
}

.menu-bg.top {
  left: -34%;
  top: 0;
  transform: rotate(-45deg) translateY(-152%);
}

.menu-bg.bottom {
  top: 105%;
  transform: rotate(-45deg) translateY(25%);
  left: -20%;
}
</style>