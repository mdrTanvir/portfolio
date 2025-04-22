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
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
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