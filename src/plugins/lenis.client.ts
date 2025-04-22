// import Lenis from '@studio-freight/lenis'
//
// export default defineNuxtPlugin((nuxtApp) => {
//     const lenis = new Lenis({
//         duration: 1.2,
//         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         smooth: true,
//     })
//
//     function raf(time: number) {
//         lenis.raf(time)
//         requestAnimationFrame(raf)
//     }
//
//     requestAnimationFrame(raf)
//
//     // Provide to your app
//     nuxtApp.provide('lenis', lenis)
// })


// Firefox has a known issue with smooth scrolling But it can be fixed by triggering a resize event after the page load.
/*import Lenis from '@studio-freight/lenis'

export default defineNuxtPlugin((nuxtApp) => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    })

    function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    // Trigger the resize event for Firefox to fix smooth scroll issue
    function triggerResize() {
        window.dispatchEvent(new Event('resize')); // Manually trigger resize event
    }

    // Start the Lenis smooth scrolling
    requestAnimationFrame(raf)

    // Trigger the resize event for Firefox after page load
    window.addEventListener('load', () => {
        // if (navigator.userAgent.indexOf('Firefox') !== -1) {
            triggerResize(); // Trigger resize event only for Firefox
        // }
    })

    // Provide Lenis to your app
    nuxtApp.provide('lenis', lenis)
})*/


import Lenis from '@studio-freight/lenis'

export default defineNuxtPlugin((nuxtApp) => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        gestureOrientation: 'vertical',
        // smooth: true,
        // normalizeWheel: true,
        // smoothTouch: true,
    })
    // lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    // Ensure scroll starts correctly
    requestAnimationFrame(raf)

    // Provide to app
    nuxtApp.provide('lenis', lenis)

    // Triggers to fix scroll issues on some browsers
    const triggerResize = () => window.dispatchEvent(new Event('resize'))

    // ✅ DOMContentLoaded for earlier trigger
    document.addEventListener('DOMContentLoaded', () => {
        triggerResize()
    })

    // ✅ Orientation change or visibility (mobile / tab switch cases)
    window.addEventListener('orientationchange', triggerResize)
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            triggerResize()
        }
    })

    // ✅ Just in case, start Lenis manually (some versions required this)
    lenis.start()
})
