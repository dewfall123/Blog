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
}

module.exports = BlogService;

