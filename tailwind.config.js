/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Enable dark mode
    mode: 'jit', // optimize for just-in-time compilation
    content: [
        "./nuxt.config.{js,ts}",
        "./src/app.vue",
        "./src/error.vue",
        "./src/components/**/*.{js,vue,ts}",
        "./src/composables/**/*.{js,vue,ts}",
        "./src/layouts/**/*.vue",
        "./src/pages/**/*.vue",
        "./src/plugins/**/*.{js,ts}",
        "./src/assets/scss/**/*.scss",
    ],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        extend: {},
    },
    plugins: [
    ],
    future: {
        hoverOnlyWhenSupported: true
    }
}

