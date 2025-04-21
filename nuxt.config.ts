// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    ssr: false,
    srcDir: './src/',
    typescript: {
        strict: true,
        shim: false,
        // typeCheck: true,
    },
    routeRules: {
        //     '/': {
        //         prerender: true,
        //         headers: {
        //             'Cache-Control': 'public, max-age=31536000, immutable'
        //         }
        //     },
        //     '/projects': {
        //         prerender: true,
        //         headers: {
        //             'Cache-Control': 'public, max-age=31536000, immutable'
        //         }
        //     }
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            link: [
                {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
                {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
                {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap'}
            ]
        }
    },
    modules: [
        '@nuxt/fonts',
        '@nuxt/icon',
        // '@nuxt/image',
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        // 'pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/device',
        'nuxt-particles',
    ],
    tailwindcss: {
        exposeConfig: true,
        viewer: true,
    },
    css: [
        '@/assets/scss/main.scss',
    ],
    // image: {
    //     quality: 80,
    //     format: ['avif', 'webp'],
    //     screens: {
    //         'xs': 320,
    //         'sm': 640,
    //         'md': 768,
    //         'lg': 1024,
    //         'xl': 1280,
    //         'xxl': 1536,
    //         '2xl': 1536
    //     },
    // },
})