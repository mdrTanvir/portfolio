export default function useIsDesktop() {
    const isDesktop = ref(true)
    const windowWidth = ref()

    const updateScreenSize = () => {
        isDesktop.value = window.innerWidth > 768
        windowWidth.value = window.innerWidth
    }

    onMounted(() => {
        // Optional: useDevice fallback or initial state
        const {isDesktop: defaultIsDesktop} = useDevice()
        isDesktop.value = defaultIsDesktop // initial value
        updateScreenSize() // ensure sync with actual size

        window.addEventListener('resize', updateScreenSize)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateScreenSize)
    })

    return {
        isDesktop,
        windowWidth,
    }
}

// export default function useIsDesktop() {
//     const isDesktop = ref(true)
//     const windowWidth = ref(window.innerWidth)
//
//     const updateScreenSize = () => {
//         isDesktop.value = window.innerWidth > 768
//         windowWidth.value = window.innerWidth
//     }
//
//     onMounted(() => {
//         // Set initial value based on the device
//         const { isDesktop: defaultIsDesktop } = useDevice()
//         isDesktop.value = defaultIsDesktop
//         updateScreenSize() // Ensure sync with actual size
//
//         window.addEventListener('resize', updateScreenSize)
//     })
//
//     onBeforeUnmount(() => {
//         window.removeEventListener('resize', updateScreenSize)
//     })
//
//     return {
//         isDesktop,
//         windowWidth,
//     }
// }