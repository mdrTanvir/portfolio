<template>
  <section id="CONTACT" class="contain relative">
    <UiHeading>Contact</UiHeading>

    <div class="grid gap-4 mx-4 my-10 sm:grid-cols-12">
      <div class="col-span-12 sm:col-span-3">
        <UiSubheading>Let's Talk</UiSubheading>
      </div>
      <div class="relative col-span-12 px-4 space-y-6 sm:col-span-9">
        <div class="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8">
          <form action="/">
            <div class="form-group">
              <UiAnimate :distance="20">
                <label for="name" class="form-label">Your Name</label>
                <input type="text" id="name" class="form-control" placeholder="John Doe" required>
              </UiAnimate>
            </div>
            <div class="form-group">
              <UiAnimate :distance="20">
                <label for="email" class="form-label">Your Email</label>
                <input type="email" id="email" class="form-control" placeholder="johndoe@example.com" required>
              </UiAnimate>
            </div>
            <div class="form-group">
              <UiAnimate :distance="20">
                <label for="message" class="form-label">Your message</label>
                <textarea id="message" class="form-control" required></textarea>
              </UiAnimate>
            </div>
            <div class="form-group">
              <UiAnimate :distance="20">
                <UiPrimaryButton class="" inverted>Send Message</UiPrimaryButton>
              </UiAnimate>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!--    <div class="relative w-full">-->
    <svg
        class="will-change-transform animateRotate"
        viewBox="0 0 100 100"
        overflow="visible"
        fill="black"
    >
      <path
          id="curve-wnxkz4" d="M 0 50 L 0 50 A 1 1 0 0 1 100 50 L 100 50 L 100 50 A 1 1 0 0 1 0 50 L 0 50"
          stroke-width="none"
          fill="transparent"
      >
      </path>
      <text>
        <textPath
            href="#curve-wnxkz4"
            startOffset="0"
            dominant-baseline="Hanging"
            style="font-size:12px;font-weight:600;word-spacing:5px;letter-spacing:1.8px;"
            :fill="darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(20, 20, 20, 0.6)'"
        > OPEN TO WORK · OPEN TO WORK ·
        </textPath>
      </text>
    </svg>
    <!--    </div>-->
  </section>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)
</script>

<style scoped lang="scss">
.form-group {
  @apply mb-6;
}

.form-label {
  @apply block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300;
}

.form-control {
  @apply bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg
  focus:ring-blue-500 focus:border-blue-500 block w-full max-w-[500px] p-2.5
  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
}

.animateRotate {
  transform: scale(2);
  width: 200px;
  height: 200px;
  inset: 0;
  transform-origin: center center;
  position: absolute;
  bottom: 0;
  right: 0;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  0% {
    opacity: 0.4;
    transform: rotate(0deg) scale(1.5);
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0.4;
    transform: rotate(-360deg) scale(1.5);
  }
}
</style>