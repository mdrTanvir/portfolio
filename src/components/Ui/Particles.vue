<template>
  <ClientOnly>
    <NuxtParticles
        id="tsparticles"
        :options="particlesOptions"
        class="particles-backdrop fixed inset-0 z-[1] pointer-events-none h-screen w-screen"
    ></NuxtParticles>
  </ClientOnly>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)

const particlesOptions = {
  fullScreen: {enable: false},
  background: {color: {value: 'transparent'}},
  particles: {
    number: {
      value: 340,
      density: {
        enable: true,
        area: 720
      }
    },
    color: {
      value: darkMode.value ?
          ['#EDE1D5', '#E6B033', '#D4932F', '#FFFEFC'] :
          ['#000000', '#14141d', '#091123', '#0e051a']
    },
    shape: {
      type: 'circle'
    },
    opacity: {
      value: darkMode.value ? 0.42 : 0.58,
      random: false,
      animation: {
        enable: false,
        speed: 1,
        minimumValue: darkMode.value ? 0.1 : 0.2,
        sync: false
      }
    },
    size: {
      value: 1.2,
      random: true,
      animation: {
        enable: false,
        speed: 40,
        minimumValue: 0.1,
        sync: false
      }
    },
    links: {
      enable: false
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'top-right',
      // random: false,
      random: true,
      straight: false,
      outModes: {
        default: 'out'
      },
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detectsOn: 'window',
    events: {
      onHover: {
        enable: true,
        mode: ['bubble', 'repulse']
      },
      onClick: {
        enable: false,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        links: {
          opacity: 1
        }
      },
      bubble: {
        distance: 120,
        size: 8,
        duration: 0.22,
        opacity: 0,
        speed: 6
      },
      repulse: {
        distance: 95,
        duration: 0.22
      },
      push: {
        quantity: 4
      },
      remove: {
        quantity: 2
      }
    }
  },
  detectRetina: true
}
</script>

<style scoped>
.particles-backdrop {
  filter: saturate(1.18);
  animation: particlesIntroSettle 0.72s cubic-bezier(0.18, 0.9, 0.24, 1.2) both;
  transform-origin: center;
  will-change: transform, filter;
}

@keyframes particlesIntroSettle {
  0% {
    transform: scale(0.965);
    filter: saturate(1.05) blur(2px);
  }
  70% {
    transform: scale(1.01);
    filter: saturate(1.24) blur(0);
  }
  100% {
    transform: scale(1);
    filter: saturate(1.18) blur(0);
  }
}
</style>
