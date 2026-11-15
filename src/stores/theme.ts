import {defineStore} from 'pinia'

export const useThemeStore = defineStore(
    'theme',
    () => {
        const darkMode = ref(true)
        // Start the graphite redesign consistently; preserve subsequent visitor choices.
        const theme = useCookie<'light' | 'dark'>('portfolio-appearance-v2', {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            sameSite: 'lax',
            secure: false,
            default: () => {
                return darkMode.value ? 'dark' : 'light'
            }
        })

        // Render saved theme consistently on the server and during hydration.
        darkMode.value = theme.value === 'dark'

        function toggleTheme() {
            darkMode.value = !darkMode.value
            setTheme(darkMode.value)
        }

        function setTheme(dark_mode: null | boolean = null) {
            if (process.client) document.documentElement.classList.remove('light', 'dark');
            if (dark_mode === null) {
                darkMode.value = theme.value === 'dark'
            } else {
                darkMode.value = dark_mode
                theme.value = dark_mode ? 'dark' : 'light'
            }
            if (process.client) document.documentElement.classList.add(theme.value)
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
