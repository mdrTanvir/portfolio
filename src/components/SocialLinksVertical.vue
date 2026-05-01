<template>
  <div>
    <div v-if="siteData.socials.length" class="w-[56px] flex flex-col items-center gap-5">
      <div class="fadeIn w-[2px] h-20 bg-gray-400"></div>
      <template
          v-for="(social, n) in siteData.socials"
          :key="social.name"
      >
        <UiAnimate
            direction="up"
            :distance="30"
            :duration="0.6"
            :delay="0.6 + n * 0.1"
            scrollTriggerStart="center bottom"
            :scrub="false"
        >
          <a
              v-if="social.link"
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              :aria-label="`Visit my ${social.name} profile`"
              class="social-link"
              :class="{
                'social-link--animated': true,
                'social-link--accent': true
              }"
              :style="socialLinkStyle(n)"
          >
            <span class="social-core"></span>
            <span class="bubble-emitter bubble-emitter--one"></span>
            <span class="bubble-emitter bubble-emitter--two"></span>
            <span class="bubble-emitter bubble-emitter--three"></span>
            <span class="bubble-emitter bubble-emitter--four"></span>
            <span class="bubble-emitter bubble-emitter--five"></span>
            <span class="bubble-emitter bubble-emitter--six"></span>
            <Icon
                v-if="social.icon"
                :name="social.icon"
                class="social-icon h-7 w-7 text-gray-900 dark:text-white"
            />
          </a>
        </UiAnimate>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import siteData from "~/config/data/data";

const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)

const socialLinkStyle = (index: number) => ({
  'animation-delay': `${index * 0.18}s`,
  '--bubble-fill': darkMode.value ? 'rgba(56, 189, 248, 1)' : 'rgba(14, 165, 233, 0.98)',
  '--bubble-ring': darkMode.value ? 'rgba(125, 211, 252, 0.78)' : 'rgba(14, 165, 233, 0.7)',
  '--bubble-glow': darkMode.value ? 'rgba(56, 189, 248, 0.62)' : 'rgba(14, 165, 233, 0.28)',
})
</script>

<style scoped>
.social-link {
  position: relative;
  display: inline-flex;
  height: 4.15rem;
  width: 4.15rem;
  align-items: center;
  justify-content: center;
  overflow: visible;
  transition: transform 0.22s ease;
}

.social-core {
  position: absolute;
  inset: 0.45rem;
  z-index: 1;
  border-radius: 9999px;
  border: 1px solid rgba(14, 165, 233, 0.28);
  background: rgba(240, 249, 255, 0.78);
  box-shadow: 0 10px 24px rgba(14, 165, 233, 0.11);
  backdrop-filter: blur(10px);
  transition: border-color 0.22s ease, background-color 0.22s ease, box-shadow 0.22s ease;
}

.dark .social-core {
  border-color: rgba(56, 189, 248, 0.35);
  background: rgba(8, 47, 73, 0.42);
  box-shadow: 0 12px 26px rgba(56, 189, 248, 0.14);
}

.social-core::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0));
  pointer-events: none;
}

.social-icon {
  position: relative;
  z-index: 3;
  transition: transform 0.22s ease, color 0.22s ease, filter 0.22s ease;
}

.bubble-emitter {
  position: absolute;
  z-index: 2;
  width: 0;
  height: 0;
  pointer-events: none;
}

.bubble-emitter::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 9999px;
  pointer-events: none;
  width: var(--bubble-size);
  height: var(--bubble-size);
  margin-left: calc(var(--bubble-size) / -2);
  margin-top: calc(var(--bubble-size) / -2);
  background: var(--bubble-fill);
  box-shadow:
      0 0 0 1px var(--bubble-ring) inset,
      0 0 16px var(--bubble-glow);
  opacity: 0;
  transform: translate(0, 0) scale(0.3);
  will-change: transform, opacity;
}

.bubble-emitter--one {
  top: 0.58rem;
  right: 0.82rem;
  --bubble-size: 0.42rem;
  --mid-x: 5px;
  --mid-y: -9px;
  --end-x: 14px;
  --end-y: -22px;
  --bubble-delay: 0s;
  --bubble-duration: 1.28s;
}

.bubble-emitter--two {
  top: 1.1rem;
  right: 0.34rem;
  --bubble-size: 0.34rem;
  --mid-x: 8px;
  --mid-y: -1px;
  --end-x: 22px;
  --end-y: -6px;
  --bubble-delay: 0.09s;
  --bubble-duration: 1.12s;
}

.bubble-emitter--three {
  bottom: 0.78rem;
  right: 0.68rem;
  --bubble-size: 0.3rem;
  --mid-x: 7px;
  --mid-y: 6px;
  --end-x: 15px;
  --end-y: 18px;
  --bubble-delay: 0.2s;
  --bubble-duration: 1.36s;
}

.bubble-emitter--four {
  bottom: 0.58rem;
  left: 0.8rem;
  --bubble-size: 0.38rem;
  --mid-x: -5px;
  --mid-y: 7px;
  --end-x: -16px;
  --end-y: 20px;
  --bubble-delay: 0.31s;
  --bubble-duration: 1.18s;
}

.bubble-emitter--five {
  top: 1.16rem;
  left: 0.34rem;
  --bubble-size: 0.33rem;
  --mid-x: -9px;
  --mid-y: 2px;
  --end-x: -24px;
  --end-y: 4px;
  --bubble-delay: 0.43s;
  --bubble-duration: 1.31s;
}

.bubble-emitter--six {
  top: 0.72rem;
  left: 0.88rem;
  --bubble-size: 0.28rem;
  --mid-x: -4px;
  --mid-y: -8px;
  --end-x: -12px;
  --end-y: -20px;
  --bubble-delay: 0.54s;
  --bubble-duration: 1.07s;
}

.social-link:hover {
  transform: translateY(-4px) scale(1.04);
}

.social-link:hover .social-core {
  border-color: rgba(56, 189, 248, 0.32);
  box-shadow: 0 14px 28px rgba(56, 189, 248, 0.12);
}

.social-link:hover .social-icon {
  color: var(--color-primary);
  transform: scale(1.06);
}

.social-link--accent {
  animation: socialFloat 1.8s ease-in-out infinite;
}

.social-link--animated .bubble-emitter::before {
  animation: champagneBubble var(--bubble-duration) cubic-bezier(0.22, 0.68, 0.2, 1) infinite;
  animation-delay: var(--bubble-delay);
}

.social-link--accent:hover .social-icon {
  filter: drop-shadow(0 8px 14px rgba(56, 189, 248, 0.18));
}

@keyframes socialFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes champagneBubble {
  0%, 100% {
    opacity: 0;
    transform: translate(0, 0) scale(0.3);
  }
  10% {
    opacity: 0.98;
    transform: translate(0, 0) scale(0.98);
  }
  34% {
    opacity: 0.9;
    transform: translate(var(--mid-x), var(--mid-y)) scale(1.08);
  }
  68% {
    opacity: 0.42;
    transform: translate(var(--mid-x), var(--mid-y)) scale(0.86);
  }
  100% {
    opacity: 0;
    transform: translate(var(--end-x), var(--end-y)) scale(0.34);
  }
}

</style>
