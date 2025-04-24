<template>
  <div class="cursor">
    <div class="cursor-dot bg-gray-500 dark:bg-white">
      <span class="cursor-text animate-pulse capitalize !mix-blend-normal"></span>
      <Icon name="lucide:arrow-up-right" class="cursor-icon text-black/20 dark:text-black/20"/>
    </div>
    <div class="cursor-follower bg-violet-800/50"></div>
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

  let posX = 0, posY = 0, mouseX = 0, mouseY = 0

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
      gsap.set(follower, { css: { left: posX - 18, top: posY - 18 } })
      gsap.set(cursor, { css: { left: mouseX - 4, top: mouseY - 4 } })
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
      const text = el.getAttribute('data-hover-text')
      if (cursorText && text) {
        cursorText.innerText = text
        cursorText.style.opacity = '1'
        cursorIcon.style.opacity = '1'
      }
    }
    const leave = () => {
      follower.classList.remove('active-text')
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
  }
  const handleHoverLeave = () => {
    cursor.classList.remove('active')
    follower.classList.remove('active')
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
}

watch(() => route.path, async () => {
  await nextTick()
  destroyCursor()
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
.cursor-follower {
  position: fixed;
  user-select: none;
  pointer-events: none;
  transform-origin: center center;
}

.cursor-dot {
  z-index: 999999999;
  width: 8px;
  height: 8px;
  transform: scale(1);
  border-radius: 100%;
  mix-blend-mode: difference;
  transition: 0.3s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform,
  0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity;

  &.active {
    opacity: 1;
    transform: scale(3.6);
  }

  &.hovered {
    opacity: 1;
  }
}

.cursor-follower {
  z-index: 9999999;
  //border: 1px solid black;
  width: 36px;
  height: 36px;
  transition: 0.3s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform,
  0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity;
  //transform: translate(-3px, -3px);
  border-radius: 10px;

  mix-blend-mode: difference;

  &.active {
    opacity: 0.6;
    transform: scale(2.2);
    border-radius: 100%;
  }

  &.active-text {
    opacity: 1;
    mix-blend-mode: normal !important;
    @apply bg-white/10 dark:bg-white/10 shadow-lg backdrop-blur-sm;
    //@apply  border-[1px] border-black dark:border-white;
    border: 0.04rem solid black;
    transform: scale(2.4);
    border-radius: 100%;
    overflow: hidden;
  }

  &.hovered {
    opacity: .4;
  }

  -webkit-animation: animateIn 2s ease-in-out;
  animation: animateIn 2s ease-in-out;
}

.cursor.shrinkCursor .cursor-dot,
.cursor.shrinkCursor .cursor-follower {
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
  color: white;
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
  filter: invert(1);
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
