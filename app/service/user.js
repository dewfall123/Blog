'use strict';

const Service = require('egg').Service;

class UserService extends Service {

    // 增加用户
    async insert(user) {
        const { affectedRows: result } = await this.app.blogInstance.insert('user', user);
        return result;
    }
    // 查询用户
    async select(user) {
        Object.keys(user).forEach(key => { !user[key] && delete user[key]; });
        const list = await this.app.blogInstance.select('user', {
            where: user,
        });
        return list;
    }
    // 修改用户
    async update(user) {
        const { affectedRows: result } = await this.app.blogInstance.update('user', user);
        return result;
    }
    // 删除用户
    async delete(id) {
        const { affectedRows: result } = await this.app.blogInstance.delete('user', { id });
        return result;
    }
}

module.exports = UserService;

