'use strict';

const Service = require('egg').Service;

class BlogService extends Service {

    /**
     * create
     */
    async insert(uid = 1, title, content, summary = '', tags, firstImg = '', weather = 'sunny') {
        const blog = {
            title,
            content,
            tags,
            createTime: new Date().getTime(),
            lastEditTime: new Date().getTime(),
            createUser: uid,
            summary,
            editCount: 0,
            firstImg,
            weather,
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

    async read(uid, id) {
        const blog = await this.app.mysql.get('blog', { createUser: uid, id });
        return blog;
    }

    async delete(uid, id) {
        const { affectedRows: result } = await this.app.mysql.delete('blog', { createUser: uid, id });
        return result;
    }

    /**
     * 修改文章
     * @param {*} blog 完整对象
     */
    async update(blog) {
        Object.assign(blog, {
            editCount: +blog.editCount + 1,
            lastEditTime: new Date().getTime(),
        });
        const { affectedRows: result } = await this.app.mysql.update('blog', blog);
        return result;
    }
}

module.exports = BlogService;

