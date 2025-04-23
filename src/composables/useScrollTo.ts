// import {gsap} from "gsap";

export default function useScrollTo() {
    // const scrollTo = (id: string) => {
    //     const element = document.getElementById(id)
    //     if (element) {
    //         element.scrollIntoView({behavior: 'smooth', block: 'start'})
    //     }
    // }


    const scrollTo = (id: string) => {
        const target = document.getElementById(id)
        const {$lenis} = useNuxtApp()
        if (target && $lenis) {
            $lenis.scrollTo(target, {
                offset: -40, // scroll offset (matches ScrollToPlugin offsetY)
                duration: 2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            })
        } else {
            // gsap.to(window, {duration: 0, scrollTo: {y: target, offsetY: 100}});
        }
    }

    return {
        scrollTo,
    }
}