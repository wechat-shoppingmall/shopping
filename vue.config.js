const webpack = require('webpack')
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    baseUrl:'/',
    outputDir:'itms-web',
    lintOnSave: false,
    assetsDir:'assets',
    devServer:{
        open:true,
        port:8081,
        proxy:{
            '/develop':{
                target: 'http://192.168.0.66:8080',
                // target: 'http://192.168.0.18:8080',
                // target: 'http://192.168.0.109:8080',
                changeOrigin:true,
                ws:true,
                pathRewrite:{
                    '^/develop':''
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery'
            })
        ],
        externals:{
            'AMap':'AMap',
            'Loca': 'Loca',
            'AMapUI': 'AMapUI'
        }
    },
    productionSourceMap: false,
    lintOnSave: false,
    chainWebpack: config => {
        config.entry.app = ["babel-polyfill", resolve('src/main.js')],
            config.resolve.alias
            .set('@', resolve('src'))
            .set('./@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@font', resolve('src/font'));
    },
    configureWebpack: config => {
        require('vux-loader').merge(config, {
            options: {},
            plugins: ['vux-ui']
        })
    }
}