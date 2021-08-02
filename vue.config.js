module.exports = {
    configureWebpack: {
        resolve: {
            extensions: [], // 可以省略文件后缀名
            alias: {
                // '@':'src',
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'bus': '@/bus',
            }
        }
    },
    lintOnSave: false,
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
    , chainWebpack: config => {
        config.plugin('html')
            .tap(args => {
                args[0].title = "维美惠";
                return args;
            })
    },
}