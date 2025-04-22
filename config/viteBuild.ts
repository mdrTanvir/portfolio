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
            cssCodeSplit: true,

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

            chunkSizeWarningLimit: 400, // reduce chunk size limit further
            // rollupOptions: {
            //     output: {
            //         manualChunks(id) {
            //             if (id.includes('node_modules')) {
            //                 return id.toString().split('node_modules/')[1].split('/')[0]; // Break up large dependencies into smaller chunks
            //             }
            //         },
            //     },
            // },
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