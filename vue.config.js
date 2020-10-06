// un-commenting will stop webpack from optimizing bad Git LFS pointers into nonsense base64 strings
//module.exports = {
//    chainWebpack(config) {
//        config.module.rule('images').use('url-loader')
//            .tap(options => {
//                options.limit = 0;
//                return options;
//            });
//    }
//}