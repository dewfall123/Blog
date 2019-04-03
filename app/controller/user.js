'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    /**
     * 登录
     */
    async testLogin() {
        this.ctx.body = { result: 0, login: !!this.ctx.session.user };
    }
    /**
    * 登录
    */
    async login() {
        const { password } = this.ctx.query;
        if (password === process.env.MYSQL_PASSWORD) {
            this.ctx.session.user = 1;
            this.ctx.body = { result: 0, msg: '认证成功' };
        } else {
            this.ctx.body = { result: -1, msg: '认证失败' };
        }
    }

    // 用户登录
    // async userLogin() {
    //     const {} = this.ctx.
    // }
}

module.exports = UserController;
