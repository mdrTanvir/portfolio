<template>
  <div class="portfolio-shell">
    <div class="brand-atmosphere" aria-hidden="true"><LazyUiGradient/></div>
    <div class="page-content">
      <NavBar/>
      <slot/>
      <ContactDetails/>
      <TheFooder/>
    </div>
  </div>
</template>
<style scoped>
.portfolio-shell { position: relative; background: var(--page); color: var(--ink); min-height: 100vh; overflow: clip; }
.brand-atmosphere { opacity: .52; pointer-events: none; }
.page-content { position: relative; z-index: 1; }
</style>
