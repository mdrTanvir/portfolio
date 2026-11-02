import {defineStore} from 'pinia'

export const useThemeStore = defineStore(
    'theme',
    () => {
        const darkMode = ref(false)
        // A new preference key resets the former dark-mode default for returning visitors.
        const theme = useCookie<'light' | 'dark'>('portfolio-theme', {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            sameSite: 'lax',
            secure: false,
            default: () => {
                return darkMode.value ? 'dark' : 'light'
            }
        })

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
            theme,
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
