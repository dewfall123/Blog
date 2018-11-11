'use strict';

exports.mysql = {
    // 单数据库信息配置
    client: {
        // host
        host: '47.106.130.217',
        // 端口号
        port: '3306',
        // 用户名
        user: 'zuofenghua',
        // 密码
        password: 'xxx',
        // 数据库名
        database: 'blog',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
};

// create table blog(
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `title` varchar(500) DEFAULT NULL,
//     `tags` varchar(5000) DEFAULT NULL,
//     `content` text DEFAULT NULL,
//     `createTime` varchar(20) DEFAULT NULL,
//     `lastEditTime` varchar(20) DEFAULT NULL,
//     `createUser` varchar(100) DEFAULT NULL,
//     PRIMARY KEY (`id`)
// ) ENGINE=InnoDB;
