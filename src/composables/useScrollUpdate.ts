import {ScrollTrigger} from 'gsap/ScrollTrigger'

export function useScrollUpdate() {
    const {$lenis} = useNuxtApp() as unknown as { $lenis: { resize: () => void } }
    let lazyImages: HTMLImageElement[] = []

    const updateScroll = async () => {
        await nextTick(() => {
            $lenis?.resize()
            ScrollTrigger?.refresh()
        })
    }

    onMounted(async () => {
        await nextTick()
        requestAnimationFrame(() => {
            lazyImages = Array.from(document.querySelectorAll<HTMLImageElement>('.lazyImage'))

            lazyImages.forEach((img) => {
                img.addEventListener('load', updateScroll)
            })
        })
    })

    onUnmounted(() => {
        lazyImages.forEach((img) => {
            img.removeEventListener('load', updateScroll)
        })
    })

    return {
        updateScroll,
    }
}
