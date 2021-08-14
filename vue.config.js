module.exports = {
    chainWebpack(config) {
        config.module.rule('images').use('url-loader')
            .tap(options => {
                options.limit = 0;
                return options;
            });
    },
    pwa: {
        name: 'Build UVS',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // configure the workbox plugin
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
        }
    }
}