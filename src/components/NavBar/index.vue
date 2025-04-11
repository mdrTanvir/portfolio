<template>
  <Popover as="header" class="relative z-10">
    <div class="bg-gray-900/20 backdrop-blur-lg pt-6 absolute w-full text-white">
      <nav class="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6" aria-label="Global">
        <div class="flex items-center flex-1">
          <div class="flex items-center justify-between w-full md:w-auto">
            <a href="#">
              <span class="sr-only">Workflow</span>
              <!--              <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt=""/>-->
            </a>
            <div class="-mr-2 flex items-center md:hidden">
              <PopoverButton class="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                <span class="sr-only">Open main menu</span>
                <Icon name="lucide:menu" class="h-6 w-6 text-white hover:text-gray-300"/>
              </PopoverButton>
            </div>
          </div>
          <div class="hidden space-x-8 md:flex md:ml-10">
            <a v-for="item in navigation" :key="item.name" :href="item.href" data-hover
               class="text-base font-medium text-white hover:text-gray-300">
              <span class="hoverMove">{{ item.name }}</span>
            </a>
            <button @click="toggleTheme" data-hover>
              <Icon v-if="theme === 'light'" name="lucide:moon" class="w-6 h-6 text-white hover:text-gray-300"/>
              <Icon v-if="theme === 'dark'" name="lucide:sun" class="w-6 h-6 text-white hover:text-gray-300"/>
            </button>
          </div>
        </div>
        <div class="hidden md:flex md:items-center md:space-x-6">
          <NavBarLogo/>
        </div>
      </nav>
    </div>

    <transition enter-active-class="duration-150 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
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
            <div class="mt-6 px-5">
              <a href="#" class="block text-center w-full py-3 px-4 rounded-md shadow bg-indigo-600 text-white font-medium hover:bg-indigo-700">Start free trial</a>
            </div>
            <div class="mt-6 px-5">
              <p class="text-center text-base font-medium text-gray-500">Existing customer? <a href="#" class="text-gray-900 hover:underline">Login</a></p>
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
  {name: 'Experience', href: '#'},
  {name: 'Portfolio', href: '#'},
  {name: 'Services', href: '#'},
  {name: 'Contact', href: '#'},
]

const theme = ref("light");
const toggleTheme = () => {
  if (theme.value === "dark") {
    theme.value = "light";
  } else {
    theme.value = "dark";
  }
  localStorage.theme = theme.value;
  document.documentElement.classList.toggle("dark");
}

onMounted(() => {
  theme.value = localStorage.theme || "dark";
  document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
  );
})
</script>