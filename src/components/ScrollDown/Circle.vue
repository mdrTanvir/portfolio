<template>
  <div class="relative w-full">
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
  </div>
</template>

<script setup lang="ts">
import {useThemeStore} from "@/stores/theme";

const themeStore = useThemeStore()
const {darkMode} = storeToRefs(themeStore)
</script>