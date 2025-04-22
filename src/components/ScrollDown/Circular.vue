<template>
  <div id="container">
    <div id="circle">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="300px" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve">
      <defs>
        <path id="circlePath" d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "/>
      </defs>
        <!-- Circle path -->
        <circle cx="150" cy="150" r="60" fill="none" stroke="black" stroke-width="2"/>

        <!-- Left "scroll" text along the circle -->
        <g>
        <text fill="#000" font-size="20" font-weight="bold">
          <textPath xlink:href="#circlePath" startOffset="20%" text-anchor="middle">
            scroll
          </textPath>
        </text>
      </g>

        <!-- Right "scroll" text along the circle -->
        <g>
        <text fill="#000" font-size="20" font-weight="bold">
          <textPath xlink:href="#circlePath" startOffset="80%" text-anchor="middle">
            scroll
          </textPath>
        </text>
      </g>

        <!-- Borders around the text -->
        <rect x="80" y="130" width="60" height="40" rx="10" ry="10" fill="none" stroke="black" stroke-width="2"/>
        <rect x="160" y="130" width="60" height="40" rx="10" ry="10" fill="none" stroke="black" stroke-width="2"/>
    </svg>
    </div>
  </div>

</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">

.scroll-text{

}

</style>