<template>
  <div class="cursor">
    <div class="cursor-dot bg-white">
      <span class="cursor-text animate-pulse capitalize !mix-blend-normal"></span>
      <Icon name="lucide:arrow-up-right" class="cursor-icon text-black/20 dark:text-black/20"/>
    </div>
    <div class="cursor-follower"></div>
    <div class="cursor-trail" aria-hidden="true">
      <span v-for="index in 7" :key="index" class="cursor-trail-dot"></span>
    </div>
    <div class="cursor-sparkles" aria-hidden="true">
      <span v-for="index in 14" :key="index" class="cursor-sparkle"></span>
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
const route = useRoute()
const { isDesktop } = useIsDesktop()

let cleanupFns = []

const initCursor = () => {
  if (!isDesktop.value) return

  document.body.style.cursor = 'none'
  document.body.style.overflowX = 'hidden'

  const cursor = document.querySelector('.cursor-dot')
  const follower = document.querySelector('.cursor-follower')
  const cur = document.querySelector('.cursor')
  const cursorText = document.querySelector('.cursor-text')
  const cursorIcon = document.querySelector('.cursor-icon')
  const trailDots = Array.from(document.querySelectorAll('.cursor-trail-dot'))
  const sparkles = Array.from(document.querySelectorAll('.cursor-sparkle'))
  if (!cursor || !follower || !cur || !cursorText || !cursorIcon || !trailDots.length || !sparkles.length) return

  let posX = 0, posY = 0, mouseX = 0, mouseY = 0
  let trailX = 0, trailY = 0
  let velocityX = 0, velocityY = 0
  let trailPulse = 0
  let sparkleIndex = 0
  let lastSparkleAt = 0
  const trailState = trailDots.map((_, index) => ({
    x: 0,
    y: 0,
    angle: index * 0.9,
  }))

  const leaveSparkle = (x, y, speed) => {
    const now = performance.now()
    if (now - lastSparkleAt < 32 || speed < 3) return

    lastSparkleAt = now
    const sparkle = sparkles[sparkleIndex % sparkles.length]
    sparkleIndex += 1

    const size = gsap.utils.random(4, 9)
    const driftX = gsap.utils.random(-20, 20)
    const driftY = gsap.utils.random(-20, 20)
    const rotation = gsap.utils.random(-90, 90)

    gsap.killTweensOf(sparkle)
    gsap.set(sparkle, {
      css: {
        left: x,
        top: y,
        width: size,
        height: size,
        opacity: 0.95,
        scale: 0.25,
        rotate: rotation,
      }
    })
    gsap.to(sparkle, {
      x: driftX,
      y: driftY,
      opacity: 0,
      scale: 1.6,
      rotate: rotation + 90,
      duration: 0.62,
      ease: 'power2.out',
    })
  }

  let winsize = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const calcWinsize = () => {
    winsize = {
      width: Math.max(window.innerWidth, document.documentElement.clientWidth),
      height: Math.max(window.innerHeight, document.documentElement.clientHeight)
    }
  }

  calcWinsize()
  window.addEventListener('resize', calcWinsize)
  cleanupFns.push(() => window.removeEventListener('resize', calcWinsize))

  const animationLoop = gsap.to({}, {
    repeat: -1,
    duration: 0.016,
    onRepeat: () => {
      posX += (mouseX - posX) / 5
      posY += (mouseY - posY) / 5
      trailX += (mouseX - trailX) / 8
      trailY += (mouseY - trailY) / 8
      gsap.set(follower, { css: { left: posX - 18, top: posY - 18 } })
      gsap.set(cursor, { css: { left: mouseX - 4, top: mouseY - 4 } })

      const speed = Math.min(Math.hypot(velocityX, velocityY), 60)
      leaveSparkle(trailX, trailY, speed)
      const burstAngle = Math.atan2(velocityY || 0.0001, velocityX || 0.0001) + Math.PI / 2
      trailPulse += 0.12 + speed / 220

      trailState.forEach((state, index) => {
        const targetX = index === 0 ? trailX : trailState[index - 1].x
        const targetY = index === 0 ? trailY : trailState[index - 1].y
        const spread = (1 - index / trailDots.length) * speed * 0.6
        const wobble = Math.sin(trailPulse + state.angle) * spread * 0.34
        const burstX = Math.cos(burstAngle) * (spread + wobble)
        const burstY = Math.sin(burstAngle) * (spread + wobble)
        const driftX = Math.cos(burstAngle + Math.PI / 2) * Math.sin(trailPulse * 1.3 + state.angle) * spread * 0.18
        const driftY = Math.sin(burstAngle + Math.PI / 2) * Math.sin(trailPulse * 1.3 + state.angle) * spread * 0.18
        state.x += ((targetX + burstX + driftX) - state.x) / (2.3 + index * 0.5)
        state.y += ((targetY + burstY + driftY) - state.y) / (2.3 + index * 0.5)
        gsap.set(trailDots[index], {
          css: {
            left: state.x - 20,
            top: state.y - 20,
            opacity: Math.max(0.06, 0.72 - index * 0.09),
            scale: 1.55 - index * 0.12 + Math.min(speed / 240, 0.22),
          }
        })
      })
    }
  })

  const handleMouseMove = (e) => {
    const previousMouseX = mouseX
    const previousMouseY = mouseY
    mouseX = e.clientX
    mouseY = e.clientY
    velocityX = mouseX - previousMouseX
    velocityY = mouseY - previousMouseY
    if (mouseX <= 4 || mouseY <= 4 || mouseX >= winsize.width - 4 || mouseY >= winsize.height - 4) {
      cur.classList.add('shrinkCursor')
    } else {
      cur.classList.remove('shrinkCursor')
    }
  }

  document.addEventListener('mousemove', handleMouseMove)
  cleanupFns.push(() => {
    animationLoop.kill()
    document.removeEventListener('mousemove', handleMouseMove)
  })

  // Hover text
  const hoverTextEls = document.querySelectorAll('[data-hover-text]')
  hoverTextEls.forEach((el) => {
    const enter = () => {
      follower.classList.add('active-text')
      cur.classList.add('cursor-invert')
      const text = el.getAttribute('data-hover-text')
      if (cursorText && text) {
        cursorText.innerText = text
        cursorText.style.opacity = '1'
        cursorIcon.style.opacity = '1'
      }
    }
    const leave = () => {
      follower.classList.remove('active-text')
      cur.classList.remove('cursor-invert')
      cursorText.innerText = ''
      cursorText.style.opacity = '0'
      cursorIcon.style.opacity = '0'
    }
    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)
    cleanupFns.push(() => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    })
  })

  // Hover animations
  const hoverElements = document.querySelectorAll('[data-hover]')
  const handleHoverEnter = () => {
    cursor.classList.add('active')
    follower.classList.add('active')
    cur.classList.add('cursor-invert')
  }
  const handleHoverLeave = () => {
    cursor.classList.remove('active')
    follower.classList.remove('active')
    cur.classList.remove('cursor-invert')
  }
  const animateHoverMove = (e) => {
    const span = e.currentTarget.querySelector('.hoverMove')
    if (!span) return
    const { offsetX: x, offsetY: y } = e
    const { offsetWidth: width, offsetHeight: height } = e.currentTarget
    const move = 12
    const xMove = (x / width) * (move * 2) - move
    const yMove = (y / height) * (move * 2) - move
    span.style.transform = e.type === 'mouseleave' ? '' : `translate(${xMove}px, ${yMove}px)`
  }

  hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', handleHoverEnter)
    el.addEventListener('mouseleave', handleHoverLeave)
    el.addEventListener('mousemove', animateHoverMove)
    el.addEventListener('mouseleave', animateHoverMove)
    cleanupFns.push(() => {
      el.removeEventListener('mouseenter', handleHoverEnter)
      el.removeEventListener('mouseleave', handleHoverLeave)
      el.removeEventListener('mousemove', animateHoverMove)
      el.removeEventListener('mouseleave', animateHoverMove)
    })
  })
}

const destroyCursor = () => {
  cleanupFns.forEach(fn => fn())
  cleanupFns = []
  document.body.style.cursor = ''
  document.body.style.overflowX = ''
}

watch(() => route.path, async () => {
  await nextTick()
  destroyCursor()
  const cursor = document.querySelector('.cursor-dot')
  const follower = document.querySelector('.cursor-follower')
  if (cursor) cursor.classList.remove('active')
  if (follower) follower.classList.remove('active')
  initCursor()
})

onMounted(async () => {
  await nextTick()
  initCursor()
})

onBeforeUnmount(() => {
  destroyCursor()
})
</script>

<style scoped lang="scss">
//.cursor {
//  position: fixed;
//  user-select: none;
//  pointer-events: none;
//  transform-origin: center center;
//  z-index: 999999999;
//}

.cursor-dot,
.cursor-follower,
.cursor-trail,
.cursor-trail-dot,
.cursor-sparkles,
.cursor-sparkle {
  position: fixed;
  user-select: none;
  pointer-events: none;
  transform-origin: center center;
}

.cursor-trail,
.cursor-sparkles {
  inset: 0;
  z-index: 9999997;
}

.cursor-sparkles {
  z-index: 9999998;
}

.cursor-dot {
  z-index: 999999999;
  width: 12px;
  height: 12px;
  transform: scale(1);
  border-radius: 100%;
  mix-blend-mode: difference;
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.154);
  transition: 0.3s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform,
  0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity;

  &.active {
    opacity: 1;
    transform: scale(2.15);
  }

  &.hovered {
    opacity: 1;
  }
}

.cursor-follower {
  z-index: 9999999;
  width: 42px;
  height: 42px;
  transition: 0.3s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform,
  0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity;
  border-radius: 999px;
  background: white;
  border: 1px solid white;
  mix-blend-mode: difference;
  opacity: 0.94;

  &.active {
    opacity: 0.95;
    transform: scale(2.3);
    border-radius: 100%;
    background: white;
    border-color: white;
  }

  &.active-text {
    opacity: 1;
    mix-blend-mode: difference !important;
    background: white;
    border: 1px solid white;
    transform: scale(2.5);
    border-radius: 100%;
    overflow: hidden;
  }

  &.hovered {
    opacity: .4;
  }

  -webkit-animation: animateIn 2s ease-in-out;
  animation: animateIn 2s ease-in-out;
}

.cursor-trail-dot {
  z-index: 9999998;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.644) 0%, rgba(56, 189, 248, 0.434) 22%, rgba(125, 211, 252, 0.168) 48%, rgba(14, 165, 233, 0) 76%);
  filter: blur(12px);
  opacity: 0.238;
  mix-blend-mode: screen;
  transition: opacity 0.14s ease;
}

.cursor-sparkle {
  z-index: 9999998;
  border-radius: 1px;
  background: rgb(56, 189, 248);
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.56);
  opacity: 0;
  transform: translate(-50%, -50%) rotate(45deg) scale(0.3);
}

.cursor-sparkle::before,
.cursor-sparkle::after {
  content: '';
  position: absolute;
  inset: 45% -55%;
  border-radius: 999px;
  background: inherit;
}

.cursor-sparkle::after {
  inset: -55% 45%;
}

.dark .cursor-trail-dot {
  background: radial-gradient(circle, rgba(56, 189, 248, 0.686) 0%, rgba(14, 165, 233, 0.518) 22%, rgba(125, 211, 252, 0.238) 48%, rgba(14, 165, 233, 0) 76%);
  mix-blend-mode: screen;
}

.dark .cursor-sparkle {
  background: rgb(56, 189, 248);
  box-shadow: 0 0 14px rgba(56, 189, 248, 0.574);
}

.cursor.cursor-invert .cursor-follower {
  background: white;
  border-color: white;
  mix-blend-mode: difference;
}

.cursor.cursor-invert .cursor-dot {
  background: white;
  mix-blend-mode: difference;
}

.cursor.cursor-invert .cursor-trail-dot {
  background: radial-gradient(circle, rgba(14, 165, 233, 0.686) 0%, rgba(56, 189, 248, 0.476) 22%, rgba(125, 211, 252, 0.196) 48%, rgba(14, 165, 233, 0) 78%);
  opacity: 0.5;
  mix-blend-mode: screen;
}

.dark .cursor.cursor-invert .cursor-trail-dot {
  background: radial-gradient(circle, rgba(56, 189, 248, 1) 0%, rgba(14, 165, 233, 0.78) 22%, rgba(125, 211, 252, 0.36) 48%, rgba(14, 165, 233, 0) 78%);
  mix-blend-mode: screen;
}

.cursor.shrinkCursor .cursor-dot,
.cursor.shrinkCursor .cursor-follower,
.cursor.shrinkCursor .cursor-trail-dot,
.cursor.shrinkCursor .cursor-sparkle {
  width: 0;
  height: 0;
  border: none;
  transition: all 600ms ease-in-out;
}

@keyframes animateIn {
  0% {
    width: 0;
    height: 0;
  }
  100% {
    width: 30px;
    height: 30px;
  }
}

.cursor-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1) !important;
  font-size: 14px !important;
  font-weight: bold;
  color: black;
  pointer-events: none;
  transition: opacity 0.3s ease;
  opacity: 0;
  white-space: nowrap;
  padding-bottom: 20px;
}

.cursor-icon {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%, -50%) scale(1) !important;
  pointer-events: none;
  transition: opacity 0.3s ease;
  opacity: 0;
  white-space: nowrap;
  padding-top: 20px;
  filter: none;
  animation: moveCornerToCorner 1s infinite;
}

@keyframes moveCornerToCorner {
  0% {
    top: 400%;
    left: -400%;
  }
  100% {
    left: 400%;
    top: -400%;
  }
}
</style>
