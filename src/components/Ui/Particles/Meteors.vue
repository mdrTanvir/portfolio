<template>
  <div class="fixed top-0 w-full h-screen overflow-hidden">
    <canvas ref="canvas" class="absolute inset-0 z-0"></canvas>
  </div>
</template>

<script setup>
const canvas = ref(null)

onMounted(() => {
  const c = canvas.value
  const ctx = c.getContext('2d')
  let width = (c.width = window.innerWidth)
  let height = (c.height = window.innerHeight)

  const particles = Array.from({length: 120}, () => createParticle())

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }
  }

  function createMeteor() {
    return {
      x: Math.random() * width,
      y: -50,
      size: Math.random() * 2 + 1,
      length: Math.random() * 80 + 100,
      speedX: Math.random() * 2 + 2,
      speedY: Math.random() * 2 + 2,
      opacity: Math.random() * 0.5 + 0.3, // some dim, some bright
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height)

    // Draw floating particles
    particles.forEach(p => {
      // ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()

      p.x += p.vx
      p.y += p.vy

      // bounce back if out of bounds
      if (p.x < 0 || p.x > width) p.vx *= -1
      if (p.y < 0 || p.y > height) p.vy *= -1
    })

    requestAnimationFrame(draw)
  }

  draw()

  window.addEventListener('resize', () => {
    width = c.width = window.innerWidth
    height = c.height = window.innerHeight
  })
})
</script>

<style scoped>
canvas {
  pointer-events: none;
}
</style>
