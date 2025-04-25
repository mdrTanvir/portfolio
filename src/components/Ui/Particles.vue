<template>
  <NuxtParticles
      id="tsparticles"
      :options="particlesOptions"
      @load="onLoad"
      class="fixed inset-0 z-[2] pointer-events-none h-screen w-screen"
  ></NuxtParticles>
</template>

<script setup lang="ts">
import type {Container} from '@tsparticles/engine'

const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)

const particlesOptions = {
  fullScreen: {enable: false},
  background: {color: {value: 'transparent'}},
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        area: 800
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
      value: darkMode.value ? 0.5 : 0.8,
      random: false,
      animation: {
        enable: false,
        speed: 1,
        minimumValue: darkMode.value ? 0.1 : 0.2,
        sync: false
      }
    },
    size: {
      value: 1,
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
      random: false,
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
    detectsOn: 'canvas',
    events: {
      onHover: {
        enable: false,
        mode: 'bubble'
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
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
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

const onLoad = (container: Container) => {
  container.pause()
  setTimeout(() => container.play(), 2000)
}
</script>
