export default {
    postcss: {
        postcssOptions: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
            },
        },
    },
    experimental: {
        payloadExtraction: false,
        viteEnvironmentApi: true,
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
        resolve: {
            alias: process.env.NODE_ENV === 'development'
                ? {'#app-manifest': 'mocked-exports/empty'}
                : {},
        },
        build: {
            rollupOptions: {
                output: {
                    sanitizeFileName: true,
                },
            },
            cssCodeSplit: true,
            // Enable analyze in development only
            analyze: process.env.NUXT_ENV !== 'production',

            terserOptions: {
                compress: {
                    drop_console: true, // Remove console logs in production
                },
            },
            // extractCSS: true, // Extract CSS into a single file
            optimizeCSS: true, // Minify CSS
            postcss: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },

            chunkSizeWarningLimit: 400, // reduce the chunk size limit further
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                }
            }
        }
    }
}
