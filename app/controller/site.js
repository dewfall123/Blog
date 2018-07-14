'use strict';

const Controller = require('egg').Controller;

class SiteController extends Controller {
    async index() {
        await this.ctx.render('/blog/index');
    }
}

module.exports = SiteController;
