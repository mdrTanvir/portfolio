<template>
  <nav class="hidden md:block ">
    <ul class="hidden md:flex gap-x-8">
      <li v-for="item in navigation" :key="item.name" class="flex items-center">
        <a :href="item.href" data-hover
           class="text-base font-medium"
           :class="item.focus ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-white'"
        >
          <span class="hoverMove">{{ item.name }}</span>
        </a>
      </li>
      <li class="flex items-center">
        <button @click="themeStore.toggleTheme()" data-hover class="a text-gray-700 dark:text-white w-6 h-6">
          <Icon v-if="themeStore.darkMode" name="lucide:sun" class="w-6 h-6"/>
          <Icon v-else name="lucide:moon" class="w-6 h-6"/>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import navigation from "~/config/navigation";

const themeStore = useThemeStore()
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