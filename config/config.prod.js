'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1519484445377_4774';

    // add your config here
    config.middleware = [];

    // 图片存储路径
    config.IMG_PATH = './app/public/imgs/';
    config.IMG_PREFIX = 'https://zfhzzl.com.cn';

    exports.logger = {
        dir: '/usr/websync/PhotoWall/logs',
    };

    exports.cluster = {
        listen: {
            port: 7001,
            hostname: '172.18.65.148',
        },
    };

    exports.alinode = {
        // 从 `Node.js 性能平台` 获取对应的接入参数
        appid: '77143',
        secret: 'e7f85995903c4557c5e27b930384e9118cec764e',
    };

    return config;
};
