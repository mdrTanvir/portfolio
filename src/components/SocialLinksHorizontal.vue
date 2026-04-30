<template>
  <div>
    <div class="overflow-hidden mb-2">
      <UiAnimate :distance="60" :delay="0.8" :duration="0.4" scrollTriggerStart="center bottom" :scrub="false">
        <p class="font-medium">FOLLOW ME</p>
      </UiAnimate>
    </div>
    <div v-if="siteData.socials.length" class="flex gap-5">
      <template
          v-for="(social, n) in siteData.socials"
          :key="social.name"
      >
        <UiAnimate
            :distance="20"
            :duration="0.4"
            :delay="0.8 + n * 0.1"
            scrollTriggerStart="center bottom"
            :scrub="false"
        >
          <a
              v-if="social.link"
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              class="social-link"
              :class="{'social-link--accent': ['LinkedIn', 'GitHub'].includes(social.name)}"
              :style="{'animation-delay': `${n * 0.18}s`}"
          >
            <span class="social-core"></span>
            <span v-if="['LinkedIn', 'GitHub'].includes(social.name)" class="bubble bubble-one"></span>
            <span v-if="['LinkedIn', 'GitHub'].includes(social.name)" class="bubble bubble-two"></span>
            <span v-if="['LinkedIn', 'GitHub'].includes(social.name)" class="bubble bubble-three"></span>
            <Icon
                v-if="social.icon"
                :name="social.icon"
                class="social-icon h-7 w-7 text-gray-800 dark:text-gray-200"
            />
          </a>
        </UiAnimate>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import siteData from "~/config/data/data";
</script>

<style scoped>
.social-link {
  position: relative;
  display: inline-flex;
  height: 4.15rem;
  width: 4.15rem;
  align-items: center;
  justify-content: center;
  transition: transform 0.22s ease;
}

.social-core {
  position: absolute;
  inset: 0.45rem;
  border-radius: 9999px;
  border: 1px solid rgba(229, 231, 235, 0.9);
  background: rgba(255, 255, 255, 0.74);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.07);
  backdrop-filter: blur(10px);
  transition: border-color 0.22s ease, background-color 0.22s ease, box-shadow 0.22s ease;
}

.dark .social-core {
  border-color: rgba(55, 65, 81, 0.95);
  background: rgba(3, 7, 18, 0.58);
  box-shadow: 0 12px 26px rgba(2, 6, 23, 0.32);
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
  z-index: 2;
  transition: transform 0.22s ease, color 0.22s ease, filter 0.22s ease;
}

.bubble {
  position: absolute;
  border-radius: 9999px;
  background: rgba(56, 189, 248, 0.22);
  opacity: 0.18;
  pointer-events: none;
  z-index: 1;
}

.bubble-one {
  top: -0.12rem;
  right: -0.1rem;
  height: 0.42rem;
  width: 0.42rem;
}

.bubble-two {
  bottom: 0.18rem;
  left: -0.22rem;
  height: 0.3rem;
  width: 0.3rem;
  background: rgba(56, 189, 248, 0.16);
}

.bubble-three {
  top: 0.3rem;
  right: -0.26rem;
  height: 0.22rem;
  width: 0.22rem;
  background: rgba(56, 189, 248, 0.12);
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

.social-link--accent .bubble-one {
  animation: bubbleIdleOne 3.8s ease-in-out infinite;
}

.social-link--accent .bubble-two {
  animation: bubbleIdleTwo 4.4s ease-in-out infinite;
  animation-delay: 0.55s;
}

.social-link--accent .bubble-three {
  animation: bubbleIdleThree 5s ease-in-out infinite;
  animation-delay: 1s;
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

@keyframes bubbleIdleOne {
  0%, 100% {
    opacity: 0.12;
    transform: translate(0, 0) scale(0.9);
  }
  40% {
    opacity: 0.34;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0.08;
    transform: translate(3px, -4px) scale(1.08);
  }
}

@keyframes bubbleIdleTwo {
  0%, 100% {
    opacity: 0.1;
    transform: translate(0, 0) scale(0.9);
  }
  42% {
    opacity: 0.28;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0.06;
    transform: translate(-4px, 4px) scale(1.04);
  }
}

@keyframes bubbleIdleThree {
  0%, 100% {
    opacity: 0.08;
    transform: translate(0, 0) scale(0.9);
  }
  44% {
    opacity: 0.22;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0.04;
    transform: translate(4px, -1px) scale(1.02);
  }
}

</style>
