module.exports = { 
    chainWebpack(config) {
        config.module.rule('images').use('url-loader')
            .tap(options => {
                options.limit = 0;
                return options;
            });
    }
}