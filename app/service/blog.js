'use strict';

const Service = require('egg').Service;

class BlogService extends Service {

    /**
     * create
     */
    async insert(uid = 1, title, content, summary = '', tags, firstImg = '', weather = 'sunny', htmlContent) {
        summary = this.ctx.helper.summary(content);
        const blog = {
            title,
            content,
            tags: JSON.stringify(tags),
            createTime: new Date().getTime(),
            lastEditTime: new Date().getTime(),
            createUser: uid,
            summary,
            editCount: 0,
            firstImg,
            weather,
            htmlContent,
        };
        const { affectedRows: result } = await this.app.mysqlInstance.insert('blog', blog);
        return result;
    }

    async select(uid, pageIndex = 1, pageSize = 10) {
        const list = await this.app.mysqlInstance.select('blog', {
            where: { createUser: uid },
            orders: [[ 'createTime', 'desc' ]],
            limit: +pageSize,
            offset: (+pageIndex - 1) * pageSize,
        });
        list.forEach(i => {
            try {
                i.tags = JSON.parse(i.tags);
            } catch (err) {
                i.tags = [];
            }
        });
        return list;
    }

    async read(uid, id) {
        const blog = await this.app.mysqlInstance.get('blog', { createUser: uid, id });
        blog.tags = blog.tags ? JSON.parse(blog.tags) : [];
        return blog;
    }

    async delete(uid, id) {
        const { affectedRows: result } = await this.app.mysqlInstance.delete('blog', { createUser: uid, id });
        return result;
    }

    /**
     * 修改文章
     * @param {*} blog 完整对象
     */
    async update(blog) {
        Object.assign(blog, {
            tags: JSON.stringify(blog.tags),
            editCount: +blog.editCount + 1,
            lastEditTime: new Date().getTime(),
        });
        blog.summary = this.ctx.helper.summary(blog.content);
        const { affectedRows: result } = await this.app.mysqlInstance.update('blog', blog);
        return result;
    }

    /**
     * 计算总数
     * @param {Object} filter 筛选条件
     * @returns {number} count
     */
    async count(filter = {}) {
        const count = await this.app.mysqlInstance.count('blog', filter);
        return count;
    }
}

module.exports = BlogService;

