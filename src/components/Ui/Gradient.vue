<template>
  <div class="ambient-field" aria-hidden="true"><div class="ambient-orb orb-violet"></div><div class="ambient-orb orb-mint"></div><div class="ambient-orb orb-coral"></div><div class="ambient-grid"></div></div>
</template>
<style scoped>
.ambient-field { position:absolute; inset:0 0 auto; height:1000px; overflow:hidden; pointer-events:none; }
.ambient-orb { position:absolute; width:580px; height:580px; border-radius:50%; filter:blur(85px); opacity:.2; }
.orb-violet { background:#9465f4; top:-230px; left:-160px; }
.orb-mint { background:#b6ec69; top:40px; right:-250px; opacity:.15; }
.orb-coral { background:#ff947d; top:480px; left:40%; width:300px; height:300px; opacity:.09; }
.ambient-grid { position:absolute; inset:0; background-image:radial-gradient(var(--control-border) .7px,transparent .7px); background-size:28px 28px; opacity:.13; mask-image:linear-gradient(#000,transparent 85%); }
</style>
