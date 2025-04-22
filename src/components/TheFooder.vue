<template>
  <footer id="footer" class="h-[60px] bg-gray-100 dark:bg-zinc-950">
    <div class=" h-full flex items-center justify-center">
      {{ siteData.name }} &copy; {{ new Date().getFullYear() }}.
      <!--All rights reserved.-->
    </div>
  </footer>
</template>

<script setup lang="ts">
import siteData from "~/config/data";
</script>