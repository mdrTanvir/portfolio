/** A single delegated listener lights the surface beneath a fine pointer. */
export function usePointerLight() {
  let current: HTMLElement | null = null
  let frame = 0
  let x = 0, y = 0
  let media: MediaQueryList
  function clear() { current?.removeAttribute('data-pointer-lit'); current = null }
  function move(event: PointerEvent) {
    if (!media.matches || event.pointerType !== 'mouse') { clear(); return }
    const card = (event.target as Element).closest<HTMLElement>('.project-card,.featured-work,.skills-grid article')
    if (card !== current) { clear(); current = card }
    if (!current) return
    x = event.clientX; y = event.clientY
    if (!frame) frame = requestAnimationFrame(() => {
      if (current) {
        const rect = current.getBoundingClientRect()
        current.style.setProperty('--light-x',`${x-rect.left}px`)
        current.style.setProperty('--light-y',`${y-rect.top}px`)
        current.setAttribute('data-pointer-lit','')
      }
      frame = 0
    })
  }
  function leave(event: PointerEvent) { if (!event.relatedTarget) clear() }
  onMounted(() => {
    media = window.matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)')
    document.addEventListener('pointermove',move,{passive:true})
    document.addEventListener('pointerout',leave,{passive:true})
    window.addEventListener('blur',clear)
  })
  onBeforeUnmount(() => {
    cancelAnimationFrame(frame); clear()
    document.removeEventListener('pointermove',move)
    document.removeEventListener('pointerout',leave)
    window.removeEventListener('blur',clear)
  })
}
