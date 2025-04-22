<template>
  <div class="circle">
    <div class="logo"></div>
    <div class="text">
      <p>Scroll Scroll Scroll</p>
    </div>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  const text = document.querySelector(".text p");
  text.innerHTML = text.innerText
      .split("")
      .map(
          (char, i) => `<span style="transform:rotate(${i * 5.8}deg)">${char}</span>`
      )
      .join("");
})
</script>

<style scoped lang="scss">
p {
  font-size: 20px;
}

.circle {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  position: absolute;
  width: 200px;
  height: 200px;
  background: url(https://avatars.githubusercontent.com/u/58844494?v=4);
  background-size: cover;
  border-radius: 50%;
  filter: contrast(1.5);
}

.text {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: rotateText 10s linear infinite;
}

@keyframes rotateText {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.text p span {
  position: absolute;
  left: 50%;
  font-size: 3em !important;
  transform-origin: 0 50%;
}

</style>