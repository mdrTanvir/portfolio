/** Animate visible section introductions once, without hiding or delaying content. */
export function useEntranceMotion() {
  let observer: IntersectionObserver | undefined
  const route = useRoute()
  function observe() {
    observer?.disconnect()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in')
        observer?.unobserve(entry.target)
      }
    }, {threshold:.12})
    document.querySelectorAll('.section-intro,.skills-grid article,.profile-grid').forEach(el => {
      if (!el.classList.contains('reveal-in')) observer!.observe(el)
    })
  }
  onMounted(observe)
  watch(() => route.path, async () => { await nextTick(); observe() })
  onBeforeUnmount(() => observer?.disconnect())
}
