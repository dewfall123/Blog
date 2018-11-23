'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1519484445377_4774';

    // add your config here
    config.middleware = [];

    // 图片存储路径
    config.IMG_PATH = './app/public/imgs/';
    config.IMG_PREFIX = 'http://127.0.0.1:7001';

    config.md = {
        tags: [ '' ],
    };

    // 摘要配置
    config.summary = {
        length: 150,
    };

    config.security = {
        csrf: false,
    };
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    };

    config.view = {
        defaultViewEngine: 'ejs',
        mapping: {
            '.html': 'ejs',
        },
    };

    // 静态资源路径
    config.assets = {
        publicPath: '/public/',
    };


    config.onerror = {
        all(err, ctx) {
            // 在此处定义针对所有响应类型的错误处理方法
            // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
            ctx.body = 'error';
            ctx.body = {
                result: -1,
                msg: '未定义异常!',
                message: 'error',
            };
            ctx.status = 500;
        },
        html(err, ctx) {
            // html hander
            ctx.body = '<h3>error</h3>';
            ctx.status = 500;
        },
        json(err, ctx) {
            // json hander
            ctx.body = {
                result: -1,
                msg: 'json未定义异常!',
                message: 'error',
            };
            ctx.status = 500;
        },
    };

    return config;
};
