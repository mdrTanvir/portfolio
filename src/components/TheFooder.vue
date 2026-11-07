<template><footer class="site-footer"><div class="contain footer-inner"><span>{{ siteData.name }} &copy; {{ new Date().getFullYear() }}<span class="footer-location"> · Launceston, Tasmania</span></span><div><a :href="siteData.github" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="/#HERO" @click.prevent="scrollTo('HERO')">Back to top ↑</a></div></div></footer></template>
<script setup lang="ts">
import siteData from '~/config/data/data'
const {scrollTo}=useScrollTo()
</script>
<style scoped>
.site-footer {border-top:1px solid var(--line);margin-top:48px}
.footer-inner {min-height:90px;display:flex;align-items:center;justify-content:space-between;gap:20px;font-size:.72rem;color:var(--muted)}
.footer-inner>div{display:flex;gap:24px}.footer-inner a{display:flex;align-items:center;min-height:44px;color:var(--ink)}
@media(max-width:639px){.footer-inner{align-items:start;flex-direction:column;padding-block:24px;gap:8px}.footer-location{display:none}}
</style>
