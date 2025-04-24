import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

export default defineNuxtPlugin((nuxtApp) => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        gestureOrientation: 'vertical',
        smooth: true,
        normalizeWheel: true,
        smoothTouch: true,
    })

    function raf(time: number) {
        lenis.raf(time)
        ScrollTrigger.update() // Ensure ScrollTrigger syncs
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    nuxtApp.provide('lenis', lenis)

    const triggerResize = () => window.dispatchEvent(new Event('resize'))

    // Wait for everything to mount
    window.addEventListener('load', () => {
        // Refresh ScrollTrigger after load
        setTimeout(() => {
            ScrollTrigger.refresh()
            triggerResize()
        }, 100) // Delay helps ensure layout is done
    })

    // Orientation and visibility fixes
    window.addEventListener('orientationchange', triggerResize)
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            ScrollTrigger.refresh()
            triggerResize()
        }
    })

    lenis.start()
})
