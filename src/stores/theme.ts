import {defineStore} from 'pinia'

export const useThemeStore = defineStore(
    'theme',
    () => {
        const darkMode = ref(true)

        function toggleTheme() {
            darkMode.value = !darkMode.value
            applyTheme()
        }

        function applyTheme() {
            const html = document.documentElement
            darkMode.value ? html.classList.add('dark') : html.classList.remove('dark')
        }

        return {
            darkMode,
            toggleTheme,
            applyTheme,
        }
    },
    {
        persist: true,
        // persist: {
        //     storage: persistedState.localStorage,
        // },
    }
)