<template>
  <div class="max-w-4xl">
    <h1 class="max-w-[18ch] text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.05em] text-primary sm:text-[4.15rem] md:text-[3.55rem] lg:text-[3.7rem]">
      <div class="overflow-hidden">
        <UiAnimate :distance="30" :delay="0.05" :duration="0.35" scrollTriggerStart="center bottom" :scrub="false">
          <span :aria-label="siteData.hero.greeting" class="hero-line block text-gray-700 dark:text-white">
            <span
                v-for="(letter, index) in greetingLetters"
                :key="`greeting-${index}`"
                class="hero-letter-wrap"
                :style="{'--flip-delay': `${0.06 + index * 0.028}s`}"
            >
              <span class="hero-letter" :class="{'hero-letter--space': letter === ' '}">
                {{ letter === ' ' ? '\u00A0' : letter }}
              </span>
            </span>
          </span>
        </UiAnimate>
      </div>
      <div class="mt-1 overflow-hidden pb-[0.08em] sm:mt-2">
        <UiAnimate :distance="30" :delay="0.14" :duration="0.35" scrollTriggerStart="center bottom" :scrub="false">
          <span :aria-label="siteData.hero.headline" class="hero-line block text-[0.8em] leading-[1.08] tracking-[-0.02em] sm:text-[0.76em] md:text-[0.72em] lg:text-[0.7em]">
            <span
                v-for="(letter, index) in headlineLetters"
                :key="`headline-${index}`"
                class="hero-letter-wrap"
                :style="{'--flip-delay': `${0.34 + index * 0.03}s`}"
            >
              <span class="hero-letter !text-primary" :class="{'hero-letter--space': letter === ' '}">
                {{ letter === ' ' ? '\u00A0' : letter }}
              </span>
            </span>
          </span>
        </UiAnimate>
      </div>
      <div v-if="siteData.hero.headlineTags?.length" class="mt-4 overflow-hidden sm:mt-5">
        <UiAnimate :distance="10" :delay="0.9" :duration="0.3" scrollTriggerStart="center bottom" :scrub="false">
          <div class="flex flex-wrap items-center gap-y-2 sm:gap-y-0 sm:gap-x-3">
            <template v-for="(tag, index) in siteData.hero.headlineTags" :key="tag">
              <span
                  class="hero-tag inline-flex w-full items-center justify-center rounded-full bg-white/70 px-4 py-2 text-[0.42em] font-medium leading-none text-primary shadow-sm backdrop-blur-sm dark:bg-gray-900/50 sm:w-auto sm:text-[0.4em] md:text-[0.38em] lg:text-[0.37em]"
                  :style="{'--tag-delay': `${1.55 + index * 0.14}s`}"
              >
                {{ tag }}
              </span>
              <span
                  v-if="index < siteData.hero.headlineTags.length - 1"
                  class="hidden text-[0.38em] font-normal text-gray-500 dark:text-gray-400 sm:inline-flex"
              >
                |
              </span>
            </template>
          </div>
        </UiAnimate>
      </div>
    </h1>
    <div class="mb-8 mt-8 overflow-hidden sm:mt-10">
      <UiAnimate :distance="18" :delay="0.95" :duration="0.3" scrollTriggerStart="center bottom" :scrub="false">
        <p v-if="siteData.hero.subheadline"
           class="hero-copy max-w-3xl text-[1.05rem] leading-8 text-gray-600 dark:text-gray-300 sm:text-[1.18rem] sm:leading-9 lg:text-[1.28rem]"
        >
          <span>{{ displayedSubheadline }}</span>
          <span
              v-if="displayedSubheadline.length !== siteData.hero.subheadline.length"
              class="typing-caret"
              aria-hidden="true"
          ></span>
        </p>
      </UiAnimate>
    </div>

    <div class="mb-8 block md:hidden">
      <SocialLinksHorizontal/>
    </div>

    <div class="hero-actions flex flex-wrap gap-3 sm:gap-4">
      <UiAnimate v-if="siteData.cvLink" :distance="18" :delay="0.96" :duration="0.55" scrollTriggerStart="center bottom" :scrub="false">
        <a :href="siteData.cvLink" target="_blank" rel="noopener noreferrer">
          <UiPrimaryButton>
            <span class="hoverMove">
              <Icon name="lucide:download" class="w-4 h-4 mr-2"/> Download CV
            </span>
          </UiPrimaryButton>
        </a>
      </UiAnimate>
      <UiAnimate :distance="18" :delay="1.06" :duration="0.55" scrollTriggerStart="center bottom" :scrub="false">
        <UiPrimaryButton
            inverted
            @click="scrollTo('CONTACT')"
        >
            <span class="hoverMove">
              <Icon name="lucide:message-circle" class="w-4 h-4 mr-2"/> Let's Talk
            </span>
        </UiPrimaryButton>
      </UiAnimate>
    </div>
  </div>
</template>

<script setup lang="ts">
import siteData from "~/config/data/data";

const {scrollTo} = useScrollTo()

const greetingLetters = computed(() => [...siteData.hero.greeting])
const headlineLetters = computed(() => [...siteData.hero.headline])
const displayedSubheadline = ref('')
let subheadlineTimer: ReturnType<typeof setTimeout> | null = null

const clearSubheadlineTimer = () => {
  if (subheadlineTimer) {
    clearTimeout(subheadlineTimer)
    subheadlineTimer = null
  }
}

const typeSubheadline = (index = 0) => {
  const text = siteData.hero.subheadline || ''

  if (index > text.length) {
    subheadlineTimer = null
    return
  }

  displayedSubheadline.value = text.slice(0, index)

  const nextDelay = index > 0 && /[.,]/.test(text[index - 1] ?? '') ? 12 : 7
  subheadlineTimer = setTimeout(() => {
    typeSubheadline(index + 1)
  }, nextDelay)
}

onMounted(() => {
  clearSubheadlineTimer()
  displayedSubheadline.value = ''

  subheadlineTimer = setTimeout(() => {
    typeSubheadline(0)
  }, 1650)
})

onBeforeUnmount(() => {
  clearSubheadlineTimer()
})
</script>

<style scoped>
.hero-line {
  display: block;
}

.hero-letter-wrap {
  display: inline-block;
  perspective: 900px;
}

.hero-letter {
  display: inline-block;
  transform-origin: 50% 75%;
  backface-visibility: hidden;
  will-change: transform, opacity;
  animation: heroLetterFlip 1.02s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--flip-delay, 0s);
}

.hero-letter--space {
  width: 0.28em;
}

.hero-tag {
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0.18em;
  opacity: 0;
  transform: translateY(18px) scale(0.58);
  filter: blur(8px);
  animation: heroTagPop 0.62s cubic-bezier(0.18, 0.9, 0.24, 1.22) forwards;
  animation-delay: var(--tag-delay, 0s);
}

.hero-copy {
  animation: heroSoftSettle 0.72s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-actions :deep(.btn) {
  animation: heroButtonSettle 0.62s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.typing-caret {
  display: inline-block;
  width: 0.08em;
  height: 1.02em;
  margin-left: 0.08em;
  vertical-align: -0.12em;
  background: currentColor;
  opacity: 0.75;
  animation: blinkCaret 0.85s step-end infinite;
}

@keyframes heroLetterFlip {
  0% {
    opacity: 0;
    transform: rotateX(-92deg) translateY(0.38em) scale(0.96);
  }
  58% {
    opacity: 1;
  }
  72% {
    transform: rotateX(14deg) translateY(-0.04em) scale(1.01);
  }
  100% {
    opacity: 1;
    transform: rotateX(0deg) translateY(0) scale(1);
  }
}

@keyframes heroTagPop {
  0% {
    opacity: 0;
    transform: translateY(18px) scale(0.58);
    filter: blur(8px);
  }
  68% {
    opacity: 1;
    transform: translateY(-3px) scale(1.06);
    filter: blur(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes heroSoftSettle {
  0% {
    opacity: 0;
    transform: translateY(18px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroButtonSettle {
  0% {
    opacity: 0;
    transform: translateY(14px) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes blinkCaret {
  0%, 48% {
    opacity: 0.75;
  }
  49%, 100% {
    opacity: 0;
  }
}

@media (max-width: 639px) {
  .hero-tag {
    letter-spacing: 0.12em;
  }
}
</style>
