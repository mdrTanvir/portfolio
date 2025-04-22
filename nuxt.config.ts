// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "node:path"
import viteBuild from "./config/viteBuild";

// @ts-ignore
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    ssr: true,
    srcDir: './src/',
    typescript: {
        strict: true,
        shim: false,
        // typeCheck: true,
    },
    routeRules: {
        // '/': {
        //     prerender: true,
        //     headers: {
        //         // 'Cache-Control': 'public, max-age=31536000, immutable'
        //     }
        // },
        // '/projects': {
        //     prerender: true,
        //     headers: {
        //         // 'Cache-Control': 'public, max-age=31536000, immutable'
        //     }
        // }
    },
    alias: {
        cookie: resolve(__dirname, "node_modules/cookie")
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            link: [
                // {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
                // {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
                // {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap'}
            ]
        }
    },
    css: [
        '@/assets/scss/main.scss',
    ],
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
    icon: {
        size: '24px',
    },
    vite: {
        build: {
            rollupOptions: {
                output: {
                    sanitizeFileName: true,
                },
            },
        },
    },
    // ...viteBuild,
})