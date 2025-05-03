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

        if (route.path !== '/') {
            // Navigate to home with hash and let scroll trigger there
            await router.push({path: '/', hash: `#${id}`})
        } else {
            // Already on home, scroll directly
            const target = document.getElementById(id)
            if (target && $lenis) {
                $lenis?.scrollTo(target, {
                    offset: -40,
                    duration: 1,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                })

                // add hash to the URL
                // if (history.state) {
                //     history.pushState({...history.state, scrollY: window.scrollY}, '', `#${id}`)
                // } else {
                //     history.pushState({scrollY: window.scrollY}, '', `#${id}`)
                // }

                // remove hash from url
                if (window.history && window.history.pushState) {
                    window.history.pushState({}, document.title, window.location.pathname)
                }
            }
        }
    }

    return {
        scrollTo,
    }
}