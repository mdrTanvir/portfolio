<template>
  <header class="relative z-50">
    <div class="bg-gray-100/40 dark:bg-gray-950/20 backdrop-blur-xl py-4 fixed w-full">
      <nav class="relative contain flex items-center justify-between" aria-label="Global">
        <div class="">
          <NavBarLogo/>
        </div>
        <div class="flex items-center">
          <div class="flex items-center md:hidden">
          </div>
          <ul class="hidden space-x-8 md:flex">
            <li v-for="item in navigation" :key="item.name" class="flex items-center">
              <a :href="item.href" data-hover
                 class="text-base font-medium"
                 :class="item.focus ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-white'"
              >
                <span class="hoverMove">{{ item.name }}</span>
              </a>
            </li>
            <li class="flex items-center">
              <button @click="theme.toggleTheme()" data-hover class="a text-gray-700 dark:text-white w-6 h-6">
                <Icon v-if="theme.darkMode" name="lucide:sun" class="w-6 h-6"/>
                <Icon v-else name="lucide:moon" class="w-6 h-6"/>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>

<!--  <NavBarMobile/>-->
</template>

<script setup lang="ts">
const theme = useThemeStore()
const navigation = [
  {name: 'About', href: '#'},
  {name: 'Skills', href: '#'},
  {name: 'Experience', href: '#'},
  {name: 'Portfolio', href: '#'},
  {name: "Let's Talk", href: '#', focus: false},
]

import gsap from 'gsap'


</script>


<style scoped lang="scss">
nav {
  ul {
    flex-wrap: wrap;
    list-style: none;

    li {
      transform-origin: left;
      opacity: 0;
      transform: translateY(-20px) rotate(-4deg);
    }
  }
}

nav ul li {
  animation: fadeInNavItem 400ms linear;
  animation-fill-mode: forwards;
  animation-delay: 600ms;
  @for $i from 1 through 6 {
    &:nth-child(#{$i}) {
      animation-delay: $i * 200ms;
    }
  }
}

@keyframes fadeInNavItem {
  from {
    opacity: 0;
    transform: translateY(-20px) rotate(-4deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
  }
}
</style>