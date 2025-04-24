// import {gsap} from "gsap";

export default function useScrollTo() {
    // const scrollTo = (id: string) => {
    //     const element = document.getElementById(id)
    //     if (element) {
    //         element.scrollIntoView({behavior: 'smooth', block: 'start'})
    //     }
    // }


    const scrollTo = async (id: string) => {
        const route = useRoute()
        const router = useRouter()
        const {$lenis} = useNuxtApp()
        const {isDesktop} = useIsDesktop()

        if (route.path !== '/') {
            // Navigate to home with hash and let scroll trigger there
            await router.push({ path: '/', hash: `#${id}` })
        } else {
            // Already on home, scroll directly
            const target = document.getElementById(id)
            if (target && $lenis) {
                $lenis.scrollTo(target, {
                    offset: -40,
                    duration: isDesktop ? 2 : 1,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                })
            }
        }
    }

    return {
        scrollTo,
    }
}