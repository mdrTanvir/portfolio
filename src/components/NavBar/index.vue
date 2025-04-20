<template>
  <header class="relative z-50">
    <div class="bg-gray-100/40 dark:bg-gray-950/60 backdrop-blur-xl py-4 fixed w-full">
      <div class="relative contain flex items-center justify-between" aria-label="Global">
        <NavBarLogo/>
        <div class="flex items-center">
          <div class="relative flex items-center md:hidden">
            <NavBarMobile/>
          </div>
          <NavBarLinks/>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>


<style scoped lang="scss">
</style>