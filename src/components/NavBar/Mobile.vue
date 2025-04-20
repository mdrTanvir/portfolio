<template>
  <div class="container relative max-w-[320px] min-h-[568px] bg-[#222] rounded-lg overflow-hidden shadow-lg mx-auto mt-10 text-white">
    <!-- Open Trigger -->
    <span class="menu-trigger absolute top-8 right-5 z-30 cursor-pointer" @click="openMenu">
      <i class="menu-trigger-bar top" ref="openTop"></i>
      <i class="menu-trigger-bar middle" ref="openMiddle"></i>
      <i class="menu-trigger-bar bottom" ref="openBottom"></i>
    </span>

    <!-- Close Trigger -->
    <span class="close-trigger absolute top-10 right-5 z-10 cursor-pointer" @click="closeMenu" ref="closeTrigger">
      <i class="close-trigger-bar left" ref="closeLeft"></i>
      <i class="close-trigger-bar right" ref="closeRight"></i>
    </span>

    <!-- Background Layers -->
    <div class="inner-container">
      <i class="menu-bg top" ref="menuTop"></i>
      <i class="menu-bg middle" ref="menuMiddle"></i>
      <i class="menu-bg bottom" ref="menuBottom"></i>

      <!-- Navigation -->
      <div class="menu-container" ref="menuContainer">
        <ul class="menu text-lg space-y-4 py-8" ref="menu">
          <li><a href="#">Login</a></li>
          <li><a href="#">Create Account</a></li>
          <li><a href="#">Support</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {gsap, Power4} from 'gsap'

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
      .add('open', '-=0.4')
      .to(menuTop.value, {y: '13%', duration: 0.8, ease: Power4.easeInOut}, 'open')
      .to(menuMiddle.value, {scaleY: 1, duration: 0.8, ease: Power4.easeInOut}, 'open')
      .to(menuBottom.value, {y: '-114%', duration: 0.8, ease: Power4.easeInOut}, 'open')
      .fromTo(menu.value, {y: 30, opacity: 0}, {y: 0, opacity: 1, duration: 0.6, ease: Power4.easeOut}, '-=0.2')
      .add('preClose', '-=0.8')
      .to(closeLeft.value, {x: -100, y: 100, duration: 0.8, ease: Power4.easeOut}, 'preClose')
      .to(closeRight.value, {x: 100, y: 100, duration: 0.8, delay: 0.2, ease: Power4.easeOut}, 'preClose')

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
//@import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);
body {
  //font-family: "Noto Sans", sans-serif;
}

.container {
  background-color: #222222;
  margin: 0 auto;
  width: 100%;
  max-width: 320px;
  min-height: 568px;
  margin: 0 auto;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  -webkit-box-shadow: 0px 9px 13px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 9px 13px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 9px 13px 0px rgba(0, 0, 0, 0.3);
  -webkit-transform: scale(1);


  margin-top: 200px;
}

.menu-trigger, .close-trigger {
  position: absolute;
  top: 32px;
  right: 20px;
  display: block;
  width: 42px;
  height: 42px;
  cursor: pointer;
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
  top: 42px;
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
  background-color: #222222;
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
  background-color: white;
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
