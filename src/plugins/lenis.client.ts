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
import Lenis from '@studio-freight/lenis'

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
        if (navigator.userAgent.indexOf('Firefox') !== -1) {
            triggerResize(); // Trigger resize event only for Firefox
        }
    })

    // Provide Lenis to your app
    nuxtApp.provide('lenis', lenis)
})
