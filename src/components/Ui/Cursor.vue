<template>
  <div class="cursor">
    <div class="cursor-dot bg-white">
      <span class="cursor-text animate-pulse capitalize !mix-blend-normal"></span>
      <Icon name="lucide:arrow-up-right" class="cursor-icon text-black/20 dark:text-black/20"/>
    </div>
    <div class="cursor-follower"></div>
    <div class="cursor-trail">
      <span class="cursor-trail-dot"></span>
      <span class="cursor-trail-dot"></span>
      <span class="cursor-trail-dot"></span>
      <span class="cursor-trail-dot"></span>
      <span class="cursor-trail-dot"></span>
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
  if (!cursor || !follower || !cur || !cursorText || !cursorIcon || !trailDots.length) return

  let posX = 0, posY = 0, mouseX = 0, mouseY = 0
  let trailX = 0, trailY = 0
      const trailState = trailDots.map(() => ({ x: 0, y: 0 }))

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
      trailX += (mouseX - trailX) / 10
      trailY += (mouseY - trailY) / 10
      gsap.set(follower, { css: { left: posX - 18, top: posY - 18 } })
      gsap.set(cursor, { css: { left: mouseX - 4, top: mouseY - 4 } })

      trailState.forEach((state, index) => {
        const targetX = index === 0 ? trailX : trailState[index - 1].x
        const targetY = index === 0 ? trailY : trailState[index - 1].y
        state.x += (targetX - state.x) / (2.5 + index * 0.45)
        state.y += (targetY - state.y) / (2.5 + index * 0.45)
        gsap.set(trailDots[index], {
          css: {
            left: state.x - 24,
            top: state.y - 24,
            opacity: 0.52 - index * 0.07,
            scale: 1.22 - index * 0.09,
          }
        })
      })
    }
  })

  const handleMouseMove = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
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
.cursor-trail-dot {
  position: fixed;
  user-select: none;
  pointer-events: none;
  transform-origin: center center;
}

.cursor-dot {
  z-index: 999999999;
  width: 12px;
  height: 12px;
  transform: scale(1);
  border-radius: 100%;
  mix-blend-mode: difference;
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.22);
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
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.42) 34%, rgba(255, 255, 255, 0.16) 58%, rgba(255, 255, 255, 0) 80%);
  filter: blur(10px);
  opacity: 0.42;
  mix-blend-mode: difference;
  transition: opacity 0.14s ease;
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
  background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.52) 34%, rgba(255, 255, 255, 0.22) 58%, rgba(255, 255, 255, 0) 82%);
  opacity: 0.54;
  mix-blend-mode: difference;
}

.cursor.shrinkCursor .cursor-dot,
.cursor.shrinkCursor .cursor-follower,
.cursor.shrinkCursor .cursor-trail-dot {
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
