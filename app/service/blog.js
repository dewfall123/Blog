'use strict';

const Service = require('egg').Service;

class BlogService extends Service {

    /**
     * create
     */
    async insert(uid, title, content, tags) {
        const blog = {
            title,
            content,
            tags,
            createTime: new Date().getTime(),
            lastEditTime: new Date().getTime(),
            createUser: uid,
        };
        const { affectedRows: result } = await this.app.mysql.insert('blog', blog);
        return result;
    }

    async select(uid, pageIndex = 1, pageSize = 10) {
        const list = await this.app.mysql.select('blog', {
            where: { createUser: uid },
            orders: [[ 'createTime', 'desc' ]],
            limit: pageSize,
            offset: (+pageIndex - 1) * pageSize,
        });
        return list;
    }
}

module.exports = BlogService;

