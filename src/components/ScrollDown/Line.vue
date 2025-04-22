<template>
  <div class="flex flex-col items-center justify-center h-full">
    <!-- Rotated Scroll Text -->
    <div
        class="text-gray-800/70 dark:text-gray-400/70 text-center font-bold text-[14px] uppercase tracking-[0.4em] rotate-90 mb-[45px]"
    >
      Scroll
    </div>

    <!-- Animated Line (replacing #scroll-down::before) -->
    <svg width="2" height="90" viewBox="0 0 2 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line
          x1="1"
          y1="0"
          x2="1"
          y2="90"
          class="stroke-gray-800/60 dark:stroke-gray-400/60"
          stroke-width="2"
      >
        <animate
            attributeName="stroke-dasharray"
            values="0,90;90,0;0,90"
            dur="2.9s"
            repeatCount="indefinite"
            keyTimes="0;0.5;1"
            calcMode="spline"
            keySplines="1 0 0 1;1 0 0 1"
        />
        <animate
            attributeName="stroke-dashoffset"
            values="0;0;90"
            dur="2.9s"
            repeatCount="indefinite"
            keyTimes="0;0.5;1"
            calcMode="spline"
            keySplines="1 0 0 1;1 0 0 1"
        />
      </line>
    </svg>
  </div>
</template>
