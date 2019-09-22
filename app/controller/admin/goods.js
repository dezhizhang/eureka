'use strict';

const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        
        await this.ctx.render('/admin/goods/index')
    }
    async add() {
        await this.ctx.render('/admin/goods/add')
    }
    async doAdd() {

    }
    async edit() {

    }
    async doEdit() {

    }
}

module.exports = MainController