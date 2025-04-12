<template>
  <div ref="container" class="black-hole bg-white dark:bg-gray-950">
    <canvas ref="canvas" class="js-canvas"></canvas>
    <div class="aura" :class="{ 'mix-blend-none': darkMode, 'mix-blend-plus-lighter': !darkMode }"></div>
    <div class="overlay"></div>
  </div>
</template>

<script setup>
// import easingUtils from 'https://esm.sh/easing-utils'
import * as easingUtils from 'easing-utils'

const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)

const canvas = ref(null)
const container = ref(null)

let ctx, linesCtx, linesCanvas
let render = {}, rect = {}
let discs = [], lines = [], particles = []
let startDisc, endDisc, clip = {}, particleArea = {}

function tweenValue(start, end, p, ease = false) {
  const delta = end - start
  const easeFn = easingUtils[ease ? "ease" + ease.charAt(0).toUpperCase() + ease.slice(1) : "linear"]
  return start + delta * easeFn(p)
}

function tweenDisc(disc) {
  disc.x = tweenValue(startDisc.x, endDisc.x, disc.p)
  disc.y = tweenValue(startDisc.y, endDisc.y, disc.p, "inExpo")
  disc.w = tweenValue(startDisc.w, endDisc.w, disc.p)
  disc.h = tweenValue(startDisc.h, endDisc.h, disc.p)
  return disc
}

function setSize() {
  rect = container.value.getBoundingClientRect()
  render = {
    width: rect.width,
    height: rect.height,
    dpi: window.devicePixelRatio
  }
  canvas.value.width = render.width * render.dpi
  canvas.value.height = render.height * render.dpi
}

function setDiscs() {
  const {width, height} = rect
  discs = []
  startDisc = {x: width * 0.5, y: height * 0.45, w: width * 0.75, h: height * 0.7}
  endDisc = {x: width * 0.5, y: height * 0.95, w: 0, h: 0}
  let prevBottom = height
  clip = {}
  for (let i = 0; i < 100; i++) {
    const p = i / 100
    const disc = tweenDisc({p})
    const bottom = disc.y + disc.h
    if (bottom <= prevBottom) {
      clip = {disc: {...disc}, i}
    }
    prevBottom = bottom
    discs.push(disc)
  }
  clip.path = new Path2D()
  clip.path.ellipse(clip.disc.x, clip.disc.y, clip.disc.w, clip.disc.h, 0, 0, Math.PI * 2)
  clip.path.rect(clip.disc.x - clip.disc.w, 0, clip.disc.w * 2, clip.disc.y)
}

function setLines() {
  const {width, height} = rect
  lines = Array.from({length: 100}, () => [])
  const angleStep = (Math.PI * 2) / 100
  discs.forEach(disc => {
    lines.forEach((line, i) => {
      const angle = i * angleStep
      line.push({
        x: disc.x + Math.cos(angle) * disc.w,
        y: disc.y + Math.sin(angle) * disc.h
      })
    })
  })
  linesCanvas = new OffscreenCanvas(width, height)
  linesCtx = linesCanvas.getContext("2d")
  lines.forEach(line => {
    linesCtx.save()
    let lineIsIn = false
    line.forEach((p1, j) => {
      if (j === 0) return
      const p0 = line[j - 1]
      if (!lineIsIn && (linesCtx.isPointInPath(clip.path, p1.x, p1.y) || linesCtx.isPointInStroke(clip.path, p1.x, p1.y))) {
        lineIsIn = true
      } else if (lineIsIn) {
        linesCtx.clip(clip.path)
      }
      linesCtx.beginPath()
      linesCtx.moveTo(p0.x, p0.y)
      linesCtx.lineTo(p1.x, p1.y)
      linesCtx.strokeStyle = darkMode.value ? "#444" : "#bfbfbf"
      linesCtx.lineWidth = 2
      linesCtx.stroke()
      linesCtx.closePath()
    })
    linesCtx.restore()
  })
}

function initParticle(start = false) {
  const sx = particleArea.sx + particleArea.sw * Math.random()
  const ex = particleArea.ex + particleArea.ew * Math.random()
  const dx = ex - sx
  const y = start ? particleArea.h * Math.random() : particleArea.h
  return {
    x: sx,
    sx,
    dx,
    y,
    vy: 0.5 + Math.random(),
    p: 0,
    r: 0.5 + Math.random() * 4,
    c: darkMode.value ? `rgba(255, 255, 255, ${Math.random()})` : `rgba(0, 0, 0, ${Math.random()})`
  }
}

function setParticles() {
  const {width, height} = rect
  particleArea = {
    sw: clip.disc.w * 0.5,
    ew: clip.disc.w * 2,
    h: height * 0.85
  }
  particleArea.sx = (width - particleArea.sw) / 2
  particleArea.ex = (width - particleArea.ew) / 2
  particles = Array.from({length: 100}, () => initParticle(true))
}

function moveDiscs() {
  discs.forEach(d => {
    d.p = (d.p + 0.0006) % 1
    tweenDisc(d)
  })
}

function moveParticles() {
  particles.forEach(p => {
    p.p = 1 - p.y / particleArea.h
    p.x = p.sx + p.dx * p.p
    p.y -= p.vy
    if (p.y < 0) Object.assign(p, initParticle())
  })
}

function drawDiscs() {
  ctx.strokeStyle = darkMode.value ? "#444" : "#bfbfbf"
  ctx.lineWidth = 2
  const outer = startDisc
  ctx.beginPath()
  ctx.ellipse(outer.x, outer.y, outer.w, outer.h, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.closePath()
  discs.forEach((d, i) => {
    if (i % 5 !== 0) return
    if (d.w < clip.disc.w - 5) ctx.save(), ctx.clip(clip.path)
    ctx.beginPath()
    ctx.ellipse(d.x, d.y, d.w, d.h, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.closePath()
    if (d.w < clip.disc.w - 5) ctx.restore()
  })
}

function drawLines() {
  ctx.drawImage(linesCanvas, 0, 0)
}

function drawParticles() {
  ctx.save()
  ctx.clip(clip.path)
  particles.forEach(p => {
    ctx.fillStyle = p.c
    ctx.beginPath()
    ctx.rect(p.x, p.y, p.r, p.r)
    ctx.closePath()
    ctx.fill()
  })
  ctx.restore()
}

function tick() {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.save()
  ctx.scale(render.dpi, render.dpi)
  moveDiscs()
  moveParticles()
  drawDiscs()
  drawLines()
  drawParticles()
  ctx.restore()
  requestAnimationFrame(tick)
}

function setup() {
  ctx = canvas.value.getContext('2d')
  setSize()
  setDiscs()
  setLines()
  setParticles()
  tick()
}

watch(() => darkMode.value, () => {
  setup()
})

onMounted(() => {
  setup()
  window.addEventListener("resize", setup)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", setup)
})
</script>

<style scoped lang="scss">
.black-hole {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    display: block;
    width: 150%;
    height: 140%;
    background: radial-gradient(ellipse at 50% 55%, transparent 10%, black 50%); // dark mode
    //background: radial-gradient(ellipse at 50% 55%, transparent 10%, white 50%);
    pointer-events: none;
    transform: translate3d(-50%, -50%, 0);
    content: "";
  }

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 5;
    display: block;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at 50% 75%, #a900ff 20%, transparent 75%); // dark mode
    //background: radial-gradient(ellipse at 50% 75%, #cc9ae4 20%, transparent 75%);
    mix-blend-mode: overlay;
    transform: translate3d(-50%, -50%, 0);
    content: "";
    pointer-events: none;
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .aura {
    position: absolute;
    top: -71.5%;
    left: 50%;
    z-index: 3;
    width: 25%;
    height: 140%;
    background: linear-gradient(20deg, #00f8f1, #ffbd1e20 16.5%, #fe848f 33%, #fe848f20 49.5%, #00f8f1 66%, #00f8f160 85.5%, #ffbd1e 100%) 0 100%/100% 200%;
    border-radius: 0 0 100% 100%;
    filter: blur(50px);
    //mix-blend-mode: plus-lighter; // turn off in dark mode
    opacity: 0.75;
    transform: translate3d(-50%, 0, 0);
    -webkit-animation: aura-glow 6s infinite linear;
    animation: aura-glow 6s infinite linear;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(transparent, transparent 1px, white 1px, white 2px);
    mix-blend-mode: overlay;
    opacity: 0.5;
  }
}

@-webkit-keyframes aura-glow {
  0% {
    background-position: 0 100%;
  }
  100% {
    background-position: 0 300%;
  }
}

@keyframes aura-glow {
  0% {
    background-position: 0 100%;
  }
  100% {
    background-position: 0 300%;
  }
}
</style>
