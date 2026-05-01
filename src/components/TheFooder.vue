<template>
  <footer id="footer" class="h-[80px] bg-gray-100/60 dark:bg-gray-950/60 backdrop-blur-xl relative z-20">
    <div class=" h-full flex items-center justify-center">
      {{ siteData.name }} &copy; {{ new Date().getFullYear() }}
      <!--All rights reserved.-->
    </div>
  </footer>
</template>

<script setup lang="ts">
import siteData from "~/config/data/data";
</script>