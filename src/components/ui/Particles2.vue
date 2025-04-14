<template>
  <section class="relative h-screen bg-black overflow-hidden text-white">
    <!-- Particle Canvas -->
    <canvas ref="canvas" class="absolute inset-0 z-0"></canvas>

    <!-- Your hero content -->
    <div class="relative z-10 flex items-center justify-center h-full text-center px-4">
      <div>
        <h1 class="text-5xl md:text-7xl font-bold mb-4">Hi, I'm [Your Name]</h1>
        <p class="text-xl opacity-75">Creative Developer • Designer • Explorer</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const canvas = ref(null)

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  let width = (canvas.value.width = window.innerWidth)
  let height = (canvas.value.height = window.innerHeight)

  const particles = Array.from({ length: 100 }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2,
    speedX: Math.random() * 0.5 - 0.25,
    speedY: Math.random() * 0.5 + 0.1,
  }))

  function animate() {
    ctx.clearRect(0, 0, width, height)

    particles.forEach((p) => {
      p.x += p.speedX
      p.y += p.speedY
      if (p.y > height) p.y = 0
      if (p.x < 0 || p.x > width) p.x = Math.random() * width

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff20'
      ctx.fill()
    })

    requestAnimationFrame(animate)
  }

  animate()
  window.addEventListener('resize', () => {
    width = canvas.value.width = window.innerWidth
    height = canvas.value.height = window.innerHeight
  })
})
</script>

<style scoped>
canvas {
  pointer-events: none;
}
</style>
