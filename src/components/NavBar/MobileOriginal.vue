<template>
  <div class="container">
    <span class="menu-trigger" @click="openMenu">
      <i class="menu-trigger-bar top"></i>
      <i class="menu-trigger-bar middle"></i>
      <i class="menu-trigger-bar bottom"></i>
    </span>
    <span class="close-trigger" @click="closeMenu">
      <i class="close-trigger-bar left"></i>
      <i class="close-trigger-bar right"></i>
    </span>
    <div class="inner-container">
      <i class="menu-bg top"></i>
      <i class="menu-bg middle"></i>
      <i class="menu-bg bottom"></i>
      <div class="menu-container">
        <ul class="menu">
          <li><a href="#">Login</a></li>
          <li><a href="#">Create account</a></li>
          <li><a href="#">Support</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

let tlOpen, tlClose

const openMenu = () => {
  tlOpen.play()
}

const closeMenu = () => {
  tlClose.reverse()
}

onMounted(() => {
  const openTriggerTop = document.querySelector('.menu-trigger-bar.top')
  const openTriggerMiddle = document.querySelector('.menu-trigger-bar.middle')
  const openTriggerBottom = document.querySelector('.menu-trigger-bar.bottom')
  const openTrigger = document.querySelector('.menu-trigger')
  const closeTriggerLeft = document.querySelector('.close-trigger-bar.left')
  const closeTriggerRight = document.querySelector('.close-trigger-bar.right')
  const closeTrigger = document.querySelector('.close-trigger')
  const menuTop = document.querySelector('.menu-bg.top')
  const menuMiddle = document.querySelector('.menu-bg.middle')
  const menuBottom = document.querySelector('.menu-bg.bottom')
  const menu = document.querySelector('.menu')

  tlOpen = gsap.timeline({ paused: true })
  tlClose = gsap.timeline({ paused: true })

  tlOpen.add("preOpen")
      .to(openTriggerTop, { x: 80, y: -80, delay: 0.1, ease: 'power4.in', onComplete: () => closeTrigger.style.zIndex = 25 }, "preOpen")
      .to(openTriggerMiddle, { x: 80, y: -80, ease: 'power4.in', onComplete: () => openTrigger.style.visibility = 'hidden' }, "preOpen")
      .to(openTriggerBottom, { x: 80, y: -80, delay: 0.2, ease: 'power4.in' }, "preOpen")
      .add("open", "-=0.4")
      .to(menuTop, { y: '13%', ease: 'power4.inOut' }, "open")
      .to(menuMiddle, { scaleY: 1, ease: 'power4.inOut' }, "open")
      .to(menuBottom, { y: '-114%', ease: 'power4.inOut' }, "open")
      .fromTo(menu, { y: 30, opacity: 0, visibility: 'hidden' }, { y: 0, opacity: 1, visibility: 'visible', ease: 'power4.out' }, "-=0.2")
      .add("preClose", "-=0.8")
      .to(closeTriggerLeft, { x: -100, y: 100, ease: 'power4.out' }, "preClose")
      .to(closeTriggerRight, { x: 100, y: 100, delay: 0.2, ease: 'power4.out' }, "preClose")

  tlClose.add("close")
      .to(menuTop, { backgroundColor: "#6295ca", ease: 'power4.inOut', onComplete: () => {
          closeTrigger.style.zIndex = 5
          openTrigger.style.visibility = 'visible'
        } }, "close")
      .to(menuMiddle, { scaleY: 0, ease: 'power4.inOut' }, "close")
      .to(menuBottom, { y: '25%', ease: 'power4.inOut' }, "close")
      .to(menu, { y: 30, opacity: 0, visibility: 'hidden', ease: 'power4.inOut' }, "close")
      .to(closeTriggerLeft, { x: 0, y: 0, ease: 'power4.inOut' }, "close")
      .to(closeTriggerRight, { x: 0, y: 0, ease: 'power4.inOut' }, "close")
})
</script>

<style scoped lang="scss">
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

#links {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  font-size: 13px;
  font-family: tahoma;
  color: #fff;
}

#links a {
  text-decoration: none;
  font-size: 2.3em;
  color: #fff;
}

#twitter {
  position: absolute;
  bottom: 15px;
  right: 20px;
}

#pens {
  position: absolute;
  bottom: 15px;
  left: 20px;
}
</style>
