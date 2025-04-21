import {defineStore} from 'pinia'

export const useThemeStore = defineStore(
    'theme',
    () => {
        const darkMode = ref(true)

        function toggleTheme() {
            darkMode.value = !darkMode.value
            setTheme(darkMode.value)
        }

        function setTheme(mode: null | boolean = null) {
            if (mode === null) {
                const theme = useCookie('theme')
                if (theme) {
                    darkMode.value = theme.value === 'dark'
                } else {
                    darkMode.value = false
                }
            } else {
                const theme = useCookie('theme')
                theme.value = mode ? 'dark' : 'light'
            }
        }

        return {
            darkMode,
            toggleTheme,
            setTheme,
        }
    },
    {
        // persist: true,
        // persist: {
        //     storage: persistedState.localStorage,
        // },
    }
)