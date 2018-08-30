'use strict';

const Controller = require('egg').Controller;

class BlogController extends Controller {

    async insert() {
        const { title, content } = this.ctx.request.body;
        const uid = this.ctx.session.uid || '1';
        const insertResult = await this.service.blog.insert(uid, title, content);
        this.ctx.body = {
            result: insertResult === 1 ? 0 : -1,
            msg: insertResult === 1 ? '创建成功' : '创建失败',
        };
    }

    async list() {
        const uid = this.ctx.session.uid || '1';
        const { pageIndex, pageSize } = this.ctx.request.body;

        const blogList = await this.service.blog.select(uid, pageIndex, pageSize);
        this.ctx.body = {
            result: 0,
            blogList,
        };
    }
}

module.exports = BlogController;
