'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class BlogController extends Controller {


    /**
     * 图片上传
     */
    async upload() {
        const stream = await this.ctx.getFileStream();
        const IMG_PATH = path.resolve(this.config.IMG_PATH + this.ctx.helper.filename(stream.filename));
        const url = this.config.IMG_PREFIX + IMG_PATH.replace(path.resolve(this.config.IMG_PATH, '../../'), '').replace(/\\/g, '/');
        await stream.pipe(fs.createWriteStream(IMG_PATH));
        this.ctx.body = {
            result: 0,
            url,
        };
    }

    /**
     * 创建blog接口
     */
    async create() {
        const { title, content, tags, firstImg, weather } = this.ctx.request.body;
        const uid = this.ctx.session.uid || '1';
        const summary = content; // TODO
        const insertResult = await this.service.blog.insert(uid, title, content, summary, tags, firstImg, weather);
        this.ctx.body = {
            result: insertResult === 1 ? 0 : -1,
            msg: insertResult === 1 ? '创建成功' : '创建失败',
        };
    }

    /**
     * 获取blog列表接口
     */
    async index() {
        const uid = this.ctx.session.uid || '1';
        const { pageIndex, pageSize } = this.ctx.query;

        const blogList = await this.service.blog.select(uid, pageIndex, pageSize);
        const count = await this.service.blog.count();
        this.ctx.body = {
            result: 0,
            blogList,
            count,
        };
    }


    /**
     * 查询单个blog
     */
    async show() {
        const uid = this.ctx.session.uid || '1';
        const { id } = this.ctx.params;

        const blog = await this.service.blog.read(uid, +id);

        this.ctx.body = {
            result: 0,
            blog,
        };
    }


    /**
     * 删除
     */
    async destroy() {
        const uid = this.ctx.session.uid || '1';
        const { id } = this.ctx.params;

        const del = await this.service.blog.delete(uid, +id);

        this.ctx.body = {
            result: del === 1 ? 0 : -1,
            msg: del === 1 ? '删除成功' : '删除失败',
        };
    }

    /**
     * 修改
     */
    async update() {
        const { blog } = this.ctx.request.body;

        const up = await this.service.blog.update(blog);

        this.ctx.body = {
            result: up === 1 ? 0 : -1,
            msg: up === 1 ? '修改成功' : '修改失败',
        };
    }
}

module.exports = BlogController;
