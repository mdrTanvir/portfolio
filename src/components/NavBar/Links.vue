<template>
  <nav class="hidden md:block ">
    <ul class="hidden md:flex gap-x-8">
      <li v-for="item in navigation" :key="item.name" class="flex items-center">
        <a
            data-hover
            class="text-base font-medium"
            :class="item.focus ? 'text-primary dark:text-primary' : 'text-gray-700 dark:text-white'"
            @click.stop.prevent="scrollTo(item.href)"
        >
          <span class="hoverMove">{{ item.name }}</span>
        </a>
      </li>
      <li class="flex items-center">
       <NavBarThemeToggleBtn/>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import navigation from "~/config/navigation";
const {scrollTo} = useScrollTo()
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
  animation-delay: 200ms;
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