'use strict';

const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        //后台主页
        await this.ctx.render('/admin/main/index');
    }
    async welcome() {
        await this.ctx.render('/admin/main/welcome');
    }
}

module.exports = MainController