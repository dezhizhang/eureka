'use strict';

const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        
        await this.ctx.render('/admin/goods/index')
    }
    async add() {
        let goodsCate = await this.ctx.model.GoodsCate.find();
        let goodsColor = await this.ctx.model.GoodsColor.find();
        await this.ctx.render('/admin/goods/add',{
            goodsCate,
            goodsColor
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