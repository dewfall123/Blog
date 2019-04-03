'use strict';

const Service = require('egg').Service;

class NoteService extends Service {

    async insert(note) {
        const { affectedRows: result } = await this.app.blogInstance.insert('note', note);
        return result;
    }

    async select(note, [ offset = 0, limit = 5 ], columns) {
        Object.keys(note).forEach(key => { !note[key] && delete note[key]; });
        const list = await this.app.blogInstance.select('note', {
            columns,
            where: note,
            orders: [[ 'editTime', 'desc' ]],
            limit: +limit,
            offset: +offset,
        });
        return list;
    }

    async delete(id) {
        const { affectedRows: result } = await this.app.blogInstance.delete('note', { id });
        return result;
    }

    async update(note) {
        const { affectedRows: result } = await this.app.blogInstance.update('note', note);
        return result;
    }

    async count(filter = {}) {
        const count = await this.app.blogInstance.count('note', this.ctx.helper.delUndefined(filter));
        return count;
    }
}

module.exports = NoteService;
