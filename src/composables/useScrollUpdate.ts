import {ScrollTrigger} from 'gsap/ScrollTrigger'

export function useScrollUpdate() {
    const {$lenis} = useNuxtApp()

    const updateScroll = async () => {
        await nextTick(() => {
            $lenis.resize()
            ScrollTrigger.refresh()
        })
    }

    return {
        updateScroll,
    }
}
