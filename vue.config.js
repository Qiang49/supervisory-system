module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        },
        devServer: {
            open: true,
            proxy: {
                '/prod-api': {
                    target: 'http://192.168.7.48',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/prod-api': ''
                    }
                }
            }
        }
    }
}