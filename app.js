'use strict';
// 初始化钩子
module.exports = app => {
    app.beforeStart(async () => {
        // 从配置中心获取 MySQL 的配置
        const mysqlConfig = {
            // host
            host: process.env.MYSQL_HOST,
            // 端口号
            port: '3306',
            // 用户名
            user: process.env.MYSQL_USER,
            // 密码
            password: process.env.MYSQL_PASSWORD,
            // 数据库名
            database: app.env === 'prod' ? 'blog_prod' : 'blog',
        };
        app.mysqlInstance = app.mysql.createInstance(mysqlConfig);
        app.logger.info(`Mysql 实例化完成 ${JSON.stringify(mysqlConfig)}`);
    });
};
