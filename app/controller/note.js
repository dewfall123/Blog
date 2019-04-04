'use strict';

const Controller = require('egg').Controller;

class NoteController extends Controller {

    /**
     * 保存note接口
     */
    async create() {
        const note = this.ctx.request.body;
        const uid = this.ctx.session.uid || '1';
        note.createUser = uid;
        note.createTime = Date.now();
        note.editTime = Date.now();
        note.summary = this.ctx.helper.noteSummary(note.content);
        note.firstImg = this.ctx.helper.firstImg(note.content);
        note.title = note.title || note.summary || `无标题笔记 ${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getDate()}`;
        // TODO 增加校验
        const insertResult = await this.service.note.insert(note);
        this.ctx.body = {
            result: insertResult === 1 ? 0 : -1,
            msg: insertResult === 1 ? '保存成功' : '保存失败',
        };
    }

    /**
     * 获取note列表接口
     */
    async index() {
        const uid = this.ctx.session.uid || '1';
        const { offset, limit } = this.ctx.query;
        const query = { createUser: uid };
        const columns = [ 'id', 'title', 'editTime', 'summary', 'markdown', 'firstImg' ];
        const noteList = await this.service.note.select(query, [ offset, limit ], columns);
        const count = await this.service.note.count(query);
        this.ctx.body = {
            result: 0,
            noteList,
            count,
        };
    }


    /**
     * 查询单个note
     */
    async show() {
        // const uid = this.ctx.session.uid || '1';
        const { id } = this.ctx.params;
        const note = await this.service.note.select({ id }, []);
        this.ctx.body = {
            result: 0,
            note,
        };
    }


    /**
     * 删除
     */
    async destroy() {
        // const uid = this.ctx.session.uid || '1';
        const { id } = this.ctx.params;
        const del = await this.service.note.delete(id);
        this.ctx.body = {
            result: del === 1 ? 0 : -1,
            msg: del === 1 ? '删除成功' : '删除失败',
        };
    }

    /**
     * 修改
     */
    async update() {
        const note = this.ctx.request.body;
        note.summary = this.ctx.helper.noteSummary(note.content);
        note.firstImg = this.ctx.helper.firstImg(note.content);
        note.editTime = Date.now();
        const up = await this.service.note.update(note);
        this.ctx.body = {
            result: up === 1 ? 0 : -1,
            msg: up === 1 ? '修改成功' : '修改失败',
        };
    }
}

module.exports = NoteController;
