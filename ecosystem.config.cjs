module.exports = {
    apps: [
        {
            name: process.env.NUXT_APP_NAME,
            port: process.env.NUXT_APP_PORT || '3000',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}