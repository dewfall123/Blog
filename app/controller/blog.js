'use strict';

const Controller = require('egg').Controller;

class BlogController extends Controller {


    /**
     * 创建blog接口
     */
    async insert() {
        const { title, content } = this.ctx.request.body;
        const uid = this.ctx.session.uid || '1';
        const insertResult = await this.service.blog.insert(uid, title, content);
        this.ctx.body = {
            result: insertResult === 1 ? 0 : -1,
            msg: insertResult === 1 ? '创建成功' : '创建失败',
        };
    }

    /**
     * 获取blog列表接口
     */
    async list() {
        const uid = this.ctx.session.uid || '1';
        const { pageIndex, pageSize } = this.ctx.request.body;

        const blogList = await this.service.blog.select(uid, pageIndex, pageSize);
        this.ctx.body = {
            result: 0,
            blogList,
        };
    }


    /**
     * 获取单个blog
     */
    async detail() {
        const uid = this.ctx.session.uid || '1';
        const { id } = this.ctx.request.query;

        const blog = await this.service.blog.read(uid, id);

        this.ctx.body = {
            result: 0,
            blog,
        };
    }
}

module.exports = BlogController;
