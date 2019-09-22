'use strict';

const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        
        await this.ctx.render('/admin/goods/index')
    }
    async add() {
        let result = await this.ctx.model.GoodsCate.find();
        await this.ctx.render('/admin/goods/add',{
            list:result
        });
    }
    async doAdd() {

    }
    async edit() {

    }
    async doEdit() {

    }
}

module.exports = MainController