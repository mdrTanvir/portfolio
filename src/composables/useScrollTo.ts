export default function useScrollTo() {
    const router = useRouter()
    const scrollTo = async (id: string) => {
        await router.push({path: '/', hash: `#${id}`})
        await nextTick()
        const target = document.getElementById(id)
        if (!target) return
        target.scrollIntoView({behavior: 'instant', block: 'start'})
        target.focus({preventScroll: true})
    }
    return {scrollTo}
}
