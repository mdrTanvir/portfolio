import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

declare global {
    interface Window {
        __portfolioLenis?: {
            lenis: Lenis
            rafId: number
            onLoad: () => void
            onOrientationChange: () => void
            onVisibilityChange: () => void
        }
    }
}

export default defineNuxtPlugin((nuxtApp) => {
    if (!import.meta.client) return

    const existing = window.__portfolioLenis
    if (existing?.lenis) {
        nuxtApp.provide('lenis', existing.lenis)
        return
    }

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        gestureOrientation: 'vertical',
        smooth: true,
        normalizeWheel: true,
        smoothTouch: true,
    })
    let rafId = 0

    function raf(time: number) {
        lenis.raf(time)
        ScrollTrigger.update() // Ensure ScrollTrigger syncs
        rafId = window.requestAnimationFrame(raf)
        if (window.__portfolioLenis) {
            window.__portfolioLenis.rafId = rafId
        }
    }

    rafId = window.requestAnimationFrame(raf)

    nuxtApp.provide('lenis', lenis)

    const triggerResize = () => window.dispatchEvent(new Event('resize'))

    // Wait for everything to mount
    const onLoad = () => {
        // Refresh ScrollTrigger after load
        setTimeout(() => {
            ScrollTrigger.refresh()
            triggerResize()
        }, 100) // Delay helps ensure layout is done
    }
    window.addEventListener('load', onLoad)

    // Orientation and visibility fixes
    window.addEventListener('orientationchange', triggerResize)
    const onVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
            ScrollTrigger.refresh()
            triggerResize()
        }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    window.__portfolioLenis = {
        lenis,
        rafId,
        onLoad,
        onOrientationChange: triggerResize,
        onVisibilityChange,
    }

    lenis.start()

    if (import.meta.hot) {
        import.meta.hot.dispose(() => {
            const state = window.__portfolioLenis
            if (!state) return

            window.cancelAnimationFrame(state.rafId)
            window.removeEventListener('load', state.onLoad)
            window.removeEventListener('orientationchange', state.onOrientationChange)
            document.removeEventListener('visibilitychange', state.onVisibilityChange)
            state.lenis.destroy()
            delete window.__portfolioLenis
        })
    }
})
