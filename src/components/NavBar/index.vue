<template>
  <header class="relative z-50">
    <div class="fixed inset-x-0 top-0 w-full bg-gray-100/60 py-4 backdrop-blur-xl dark:bg-gray-950/60">
      <div class="relative contain flex items-center justify-between" aria-label="Global">
        <NavBarLogo/>
        <div class="flex items-center">
          <div class="relative flex items-center md:hidden">
            <client-only>
              <NavBarMobile/>
            </client-only>
          </div>
          <NavBarLinks/>
        </div>
      </div>
    </div>
  </header>
</template>
