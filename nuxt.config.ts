// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "node:path"
import viteBuild from "./config/viteBuild";

const securityHeaders = {
    'Content-Security-Policy': [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "frame-ancestors 'none'",
        "form-action 'self' https://api.web3forms.com",
        "img-src 'self' data: blob: https:",
        "font-src 'self' data:",
        "style-src 'self' 'unsafe-inline'",
        // Nuxt emits a small inline bootstrap payload in the static build.
        // Keep that allowance, but block eval-based script execution.
        "script-src 'self' 'unsafe-inline'",
        "connect-src 'self' https://api.web3forms.com https://vitals.vercel-insights.com https://*.vercel-insights.com",
        "upgrade-insecure-requests",
    ].join('; '),
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-DNS-Prefetch-Control': 'off',
    'X-Frame-Options': 'DENY',
    'X-Permitted-Cross-Domain-Policies': 'none',
}

// @ts-ignore
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: false},
    ssr: false,
    srcDir: './src/',
    typescript: {
        strict: true,
        shim: false,
        // typeCheck: true,
    },
    routeRules: {
        '/**': {
            headers: securityHeaders,
        },
        '/': {
            prerender: true,
            headers: {
                ...securityHeaders,
                'Cache-Control': 'public, max-age=31536000, immutable'
            }
        },
        '/projects': {
            prerender: true,
            headers: {
                ...securityHeaders,
                'Cache-Control': 'public, max-age=31536000, immutable'
            }
        }
    },
    alias: {
        cookie: resolve(__dirname, "node_modules/cookie")
    },
    app: {
        head: {
            title: 'Tanvir Rahman | Software, Data & Cybersecurity',
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                {name: 'application-name', content: 'tanvir'},
                {name: 'apple-mobile-web-app-title', content: 'tanvir'},
                {name: 'theme-color', content: '#050505'},
                {name: 'description', content: 'Tanvir Rahman is a Launceston-based Customer Service Representative and IT graduate with experience in technical support, data, and operational systems.'},
                {name: 'keywords', content: 'Tanvir Rahman, Aurora Energy, Customer Service Representative, Technical Support, IT Graduate, Launceston'},
                {property: 'og:type', content: 'website'},
                {property: 'og:site_name', content: 'Tanvir Rahman'},
                {property: 'og:title', content: 'Tanvir Rahman | Software, Data & Cybersecurity'},
                {property: 'og:description', content: 'Launceston-based Customer Service Representative and IT graduate with experience in technical support, data, and operational systems.'},
                {property: 'og:url', content: 'https://mdr-tanvir.dev/'},
                {property: 'og:image', content: 'https://mdr-tanvir.dev/og.png'},
                {name: 'twitter:card', content: 'summary_large_image'},
                {name: 'twitter:title', content: 'Tanvir Rahman | Software, Data & Cybersecurity'},
                {name: 'twitter:description', content: 'Launceston-based Customer Service Representative and IT graduate with experience in technical support, data, and operational systems.'},
                {name: 'twitter:image', content: 'https://mdr-tanvir.dev/og.png'},
            ],
            link: [
                {rel: 'canonical', href: 'https://mdr-tanvir.dev/'},
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: '/brand/tanvir-logo-tab.png'
                },
                {
                    rel: 'apple-touch-icon',
                    href: '/brand/tanvir-logo-tab.png'
                },
                // {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
                // {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
                // {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap'}
            ]
        }
    },
    runtimeConfig: {
        public: {
            web3formsAccessKey: process.env.NUXT_PUBLIC_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY || '',
        }
    },
    css: [
        '@/assets/scss/main.scss',
    ],
    modules: [
        '@nuxt/icon',
        // '@nuxt/image',
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        // 'pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/device',
        'nuxt-particles',
        '@vercel/analytics',
        '@vercel/speed-insights',
    ],
    tailwindcss: {
        exposeConfig: true,
        viewer: true,
    },
    icon: {
        size: '24px',
    },
    ...viteBuild,
})
