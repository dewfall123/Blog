'use strict';

const Service = require('egg').Service;

class BlogService extends Service {

    /**
     * create
     */
    async insert(uid = 1, title, content, summary = '', tags, firstImg = '', weather = 'sunny', htmlContent, category = 'tec') {
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
            see: 0,
            category,
        };
        const { affectedRows: result } = await this.app.blogInstance.insert('blog', blog);
        return result;
    }

    async select(uid, pageIndex = 1, pageSize = 10, category) {
        const list = await this.app.blogInstance.select('blog', {
            where: this.ctx.helper.delUndefined({ createUser: uid, category }),
            orders: [[ 'createTime', 'desc' ]],
            limit: +pageSize,
            offset: (+pageIndex - 1) * pageSize,
        });
        list.forEach(i => {
            i.category = i.category || 'tec';
            try {
                i.tags = JSON.parse(i.tags);
            } catch (err) {
                i.tags = [];
            }
        });
        return list;
    }

    async read(uid, id) {
        const blog = await this.app.blogInstance.get('blog', { createUser: uid, id });
        this.app.blogInstance.update('blog', { id: blog.id, see: (blog.see || 0) + 1 }); // 查看数+1
        blog.tags = blog.tags ? JSON.parse(blog.tags) : [];
        blog.category = blog.category || 'tec';
        return blog;
    }

    async delete(uid, id) {
        const { affectedRows: result } = await this.app.blogInstance.delete('blog', { createUser: uid, id });
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
        const { affectedRows: result } = await this.app.blogInstance.update('blog', blog);
        return result;
    }

    /**
     * 计算总数
     * @param {Object} filter 筛选条件
     * @returns {number} count
     */
    async count(filter = {}) {
        const count = await this.app.blogInstance.count('blog', this.ctx.helper.delUndefined(filter));
        return count;
    }

}

module.exports = BlogService;

