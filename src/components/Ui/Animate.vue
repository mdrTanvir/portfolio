<template>
  <div><slot/></div>
</template>
<script setup>
defineProps(['direction', 'duration', 'delay', 'distance', 'scrollTriggerStart', 'scrollTriggerEnd', 'ease', 'scrub'])
</script>
