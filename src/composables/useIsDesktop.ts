export default function useIsDesktop() {
    const isDesktop = ref(true)
    const windowWidth = ref()

    const updateScreenSize = () => {
        isDesktop.value = window.innerWidth > 720
        windowWidth.value = window.innerWidth
    }

    onMounted(() => {
        // Optional: useDevice fallback or initial state
        const {isDesktop: defaultIsDesktop} = useDevice()
        isDesktop.value = defaultIsDesktop // initial value
        updateScreenSize() // ensure sync with actual size

        window.addEventListener('resize', updateScreenSize)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', updateScreenSize)
    })

    return {
        isDesktop,
        windowWidth,
    }
}