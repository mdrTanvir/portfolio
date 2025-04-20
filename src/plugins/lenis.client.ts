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

    // Start Lenis on page load to prevent scroll issues
    window.addEventListener('load', () => {
        lenis.start()
        requestAnimationFrame(raf)  // Re-start the RAF loop after the page load
    })

    // Provide Lenis to your app
    nuxtApp.provide('lenis', lenis)
})
