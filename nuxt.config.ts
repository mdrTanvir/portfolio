// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    srcDir: './src/',
    target: 'static',
    ssr: false,
    typescript: {
        strict: true,
        shim: false,
        // typeCheck: true,
    },
    routeRules: {
        '/': {prerender: true},
    },
    modules: [
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxt/image',
        '@nuxtjs/tailwindcss',
        'nuxt-headlessui',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/device',
    ],
    tailwindcss: {
        exposeConfig: true,
        viewer: true,
    },
    css: [
        '@/assets/scss/main.scss',
    ],
    image: {
        quality: 80,
        format: ['avif', 'webp'],
        screens: {
            'xs': 320,
            'sm': 640,
            'md': 768,
            'lg': 1024,
            'xl': 1280,
            'xxl': 1536,
            '2xl': 1536
        },
    },
})