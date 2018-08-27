'use strict';

const Controller = require('egg').Controller;

class BlogController extends Controller {

    async list() {
        await this.ctx.render('/blog/index');
    }

    async insert() {
        const { title, content } = this.ctx.request.body;
        const uid = this.ctx.session.uid || '1';
        const insertResult = await this.service.blog.insert(uid, title, content);
        this.ctx.body = {
            result: insertResult === 1 ? 0 : -1,
            msg: insertResult === 1 ? '创建成功' : '创建失败',
        };
    }
}

module.exports = BlogController;
