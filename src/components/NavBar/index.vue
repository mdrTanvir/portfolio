<template>
  <Popover as="header" class="relative z-50">
    <div class="bg-gray-100/10 dark:bg-gray-950/10 backdrop-blur-xl py-4 fixed w-full">
      <nav class="relative contain flex items-center justify-between" aria-label="Global">
        <div class="">
          <NavBarLogo/>
        </div>
        <div class="flex items-center">
          <div class="-mr-2 flex items-center md:hidden">
            <PopoverButton class="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <Icon name="lucide:menu" class="h-6 w-6 text-white hover:text-gray-300"/>
            </PopoverButton>
          </div>
          <ul class="hidden space-x-8 md:flex">
            <li v-for="item in navigation" :key="item.name">
              <a :href="item.href" data-hover
                 class="text-base font-medium"
                 :class="item.focus ? 'text-primary dark:text-primary' : 'text-gray-600 dark:text-white'"
              >
                <span class="hoverMove">{{ item.name }}</span>
              </a>
            </li>
            <li>
              <button @click="theme.toggleTheme()" data-hover class="a text-gray-600 dark:text-white">
                <Icon v-if="theme.darkMode" name="lucide:sun" class="w-6 h-6"/>
                <Icon v-else name="lucide:moon" class="w-6 h-6"/>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <transition
        enter-active-class="duration-150 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
    >
      <PopoverPanel focus class="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top md:hidden">
        <div class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="px-5 pt-4 flex items-center justify-between">
            <div>
              <!--              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt=""/>-->
            </div>
            <div class="-mr-2">
              <PopoverButton class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                <span class="sr-only">Close menu</span>
                <Icon name="lucide:x" class="h-6 w-6 text-gray-900 hover:text-gray-500"/>
              </PopoverButton>
            </div>
          </div>
          <div class="pt-5 pb-6">
            <div class="px-2 space-y-1">
              <a v-for="item in navigation" :key="item.name" :href="item.href" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup lang="ts">
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/vue";

const navigation = [
  {name: 'About', href: '#'},
  {name: 'Skills', href: '#'},
  {name: 'Experience', href: '#'},
  {name: 'Portfolio', href: '#'},
  {name: "Let's Talk", href: '#', focus: true},
]

const theme = useThemeStore()
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