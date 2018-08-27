'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1519484445377_4774';

    // add your config here
    config.middleware = [];

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

    config.mysql = {
        // 单数据库信息配置
        client: {
            // host
            host: '47.106.130.217',
            // 端口号
            port: '3306',
            // 用户名
            user: 'zuofenghua',
            // 密码
            password: '614035',
            // 数据库名
            database: 'blog',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };

    return config;
};
