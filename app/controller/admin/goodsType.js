'use strict';

const BaseController = require('./base');
class GoodsTypeController extends BaseController {
    async index() {
        //后台主页
        let result = await this.ctx.model.GoodsType.find();
        await this.ctx.render('/admin/goodsType/index',{
            list:result
        });
    }
    async add() {
        await this.ctx.render('/admin/goodsType/add');
    }
    async doAdd() {
       let result = this.ctx.request.body;
       let goodsType = new this.ctx.model.GoodsType(result);
       await goodsType.save();
       await this.success('/admin/goodsType','增加商品类型成功');

    }
    async edit() {

    }
    async doEdit() {


    }
}

module.exports = GoodsTypeController