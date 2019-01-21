// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // baseUrl: '',

    //项目中的图片路径
    assetsDir: process.env.NODE_ENV === 'production' ?
        // 'http://kz.com' : 'assets',
        'pp.kuaizhuan123.com' : 'assets',
    productionSourceMap: false,
    css: {
        sourceMap: process.env.NODE_ENV === 'production' ? false : true
    },
    // configureWebpack: {
    //     optimization: {
    //         minimizer: [
    //             new UglifyJsPlugin({
    //                 uglifyOptions: {
    //                     compress: {
    //                         warnings: false,
    //                         drop_console: true,//console
    //                         drop_debugger: false,
    //                         pure_funcs: ['console.log']//移除console
    //                     }
    //                 }
    //             })
    //         ]
    //     }
    // }
}
