<template>
  <div class="cursor shrinkCursor">
    <div class="cursor-dot bg-black dark:bg-white"></div>
    <div class="cursor-follower bg-violet-800/50"></div>
  </div>
</template>

<script setup>
import {gsap} from 'gsap'

onMounted(() => {
  document.body.style.cursor = 'none'
  document.body.style.overflowX = 'hidden'

  const cursor = document.querySelector('.cursor-dot')
  const follower = document.querySelector('.cursor-follower')
  const cur = document.querySelector('.cursor')

  let posX = 0,
      posY = 0,
      mouseX = 0,
      mouseY = 0

  let winsize = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const calcWinsize = () => {
    winsize = {
      width: Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth),
      height: Math.max(window.innerHeight, document.documentElement.clientHeight, document.body.clientHeight)
    }
  }

  calcWinsize()
  window.addEventListener('resize', calcWinsize)

  const animationLoop = gsap.to({}, {
    repeat: -1,
    duration: 0.016,
    onRepeat: () => {
      posX += (mouseX - posX) / 5
      posY += (mouseY - posY) / 5

      gsap.set(follower, {
        css: {
          left: posX - 18,
          top: posY - 18
        }
      })

      gsap.set(cursor, {
        css: {
          left: mouseX - 4,
          top: mouseY - 4
        }
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

  const handleHover = (enter) => {
    cursor.classList.toggle('active', enter)
    follower.classList.toggle('active', enter)
  }

  const animateHoverMove = (e) => {
    const span = e.currentTarget.querySelector('.hoverMove')
    if (span) {
      const {offsetX: x, offsetY: y} = e
      const {offsetWidth: width, offsetHeight: height} = e.currentTarget
      const move = 12
      const xMove = (x / width) * (move * 2) - move
      const yMove = (y / height) * (move * 2) - move
      span.style.transform = `translate(${xMove}px, ${yMove}px)`

      if (e.type === 'mouseleave') span.style.transform = ''
    }
  }

  document.addEventListener('mousemove', handleMouseMove)

  const hoverElements = document.querySelectorAll('[data-hover]')
  hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => handleHover(true))
    el.addEventListener('mouseleave', () => handleHover(false))
    el.addEventListener('mousemove', animateHoverMove)
    el.addEventListener('mouseleave', animateHoverMove)
  })

  onBeforeUnmount(() => {
    animationLoop.kill()
    document.removeEventListener('mousemove', handleMouseMove)
    hoverElements.forEach((el) => {
      el.removeEventListener('mouseenter', handleHover)
      el.removeEventListener('mouseleave', handleHover)
      el.removeEventListener('mousemove', animateHoverMove)
      el.removeEventListener('mouseleave', animateHoverMove)
    })
  })
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
</style>
