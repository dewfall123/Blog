'use strict';

const Controller = require('egg').Controller;

class SiteController extends Controller {
    /**
     * 进入首页
     */
    async index() {
        await this.ctx.render('/blog/index');
    }
}

module.exports = SiteController;
