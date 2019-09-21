'use strict';

const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        let cate_id = this.ctx.query.id;
        let result = await this.ctx.model.GoodsTypeAttr.find({'cate_id':cate_id});
        await this.ctx.render('/admin/goodsTypeAttr/index',{
            list:result
        })

    }
    async add() {
        await this.ctx.render('/admin/goodsTypeAttr/add')
    }
   async doAdd() {

   }
   async edit() {

   }
   async doEdit() {

   }
}

module.exports = MainController