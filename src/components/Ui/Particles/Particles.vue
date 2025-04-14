<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

const canvasRef = ref(null)
const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)
let ctx, canvas
let animationFrameId
let particles = []
let lines = []
let discs = []

const NUM_PARTICLES = 100
const NUM_LINES = 20
const NUM_DISCS = 5

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    dx: Math.random() * 1.5 - 0.75,
    dy: Math.random() * 1.5 - 0.75,
  }
}

function createLine() {
  return {
    x1: Math.random() * canvas.width,
    y1: Math.random() * canvas.height,
    x2: Math.random() * canvas.width,
    y2: Math.random() * canvas.height,
    speed: Math.random() * 0.5 + 0.2,
  }
}

function createDisc() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 30 + 20,
    opacity: Math.random() * 0.2 + 0.05,
  }
}

function initParticles() {
  particles = Array.from({ length: NUM_PARTICLES }, createParticle)
  lines = Array.from({ length: NUM_LINES }, createLine)
  discs = Array.from({ length: NUM_DISCS }, createDisc)
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawParticles() {
  ctx.fillStyle = darkMode.value ? 'white' : 'black'
  particles.forEach(p => {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fill()
    p.x += p.dx
    p.y += p.dy

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1
  })
}

function drawLines() {
  ctx.strokeStyle = darkMode.value ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
  lines.forEach(l => {
    ctx.beginPath()
    ctx.moveTo(l.x1, l.y1)
    ctx.lineTo(l.x2, l.y2)
    ctx.stroke()
    l.x1 += l.speed
    l.x2 += l.speed

    if (l.x1 > canvas.width) {
      l.x1 = 0
      l.y1 = Math.random() * canvas.height
    }
    if (l.x2 > canvas.width) {
      l.x2 = 0
      l.y2 = Math.random() * canvas.height
    }
  })
}

function drawDiscs() {
  discs.forEach(d => {
    ctx.beginPath()
    ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2)
    ctx.fillStyle = darkMode.value
        ? `rgba(255,255,255,${d.opacity})`
        : `rgba(0,0,0,${d.opacity})`
    ctx.fill()
  })
}

function animate() {
  clearCanvas()
  drawDiscs()
  drawLines()
  drawParticles()
  animationFrameId = requestAnimationFrame(animate)
}

function startAnimation() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  canvas = canvasRef.value
  if (!canvas) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')

  initParticles()
  animate()
}

function handleResize() {
  startAnimation()
}

onMounted(() => {
  startAnimation()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', handleResize)
})

// Watch darkMode and restart animation cleanly
watch(darkMode, () => {
  startAnimation()
})
</script>

<template>
  <canvas ref="canvasRef" class="fixed inset-0 z-0 pointer-events-none" />
</template>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
