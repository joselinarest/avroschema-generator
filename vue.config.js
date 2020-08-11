module.exports = {
    chainWebpack: config => {
       config.module.rules.delete('eslint');
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'MyApp title';
                args[0].meta = {viewport: 'width=device-width,initial-scale=1,user-scalable=no'};

                return args;
            })
    }
}

