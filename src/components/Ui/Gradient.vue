<template>
  <div class="ambient-field" aria-hidden="true"><div class="blue-horizon"></div><div class="technical-grid"></div></div>
</template>
<style scoped>
.ambient-field {position:absolute;inset:0 0 auto;height:900px;overflow:hidden;pointer-events:none}
.blue-horizon {position:absolute;top:-340px;left:20%;right:-10%;height:680px;background:radial-gradient(ellipse,rgba(49,105,255,.14),transparent 65%)}
.technical-grid {position:absolute;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:80px 80px;opacity:.16;mask-image:linear-gradient(#000,transparent 80%)}
</style>
