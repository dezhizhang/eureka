'use strict';

const BaseController = require('./base');
class GoodsColorController extends BaseController {
    async index() {
        let page = this.ctx.query.page || 1;
        let pageSize = 10;
        let count = await this.ctx.model.GoodsColor.find().count();
        let result = await this.ctx.model.GoodsColor.find().limit(pageSize).skip((page - 1) * pageSize);
        await this.ctx.render('/back/goodsColor/index',{
            list:result,
            count:count,
        });
    }
    async add() {
        await this.ctx.render('/back/goodsColor/add');
    }
    async doAdd() {
        let result = this.ctx.request.body;
        let goodsColor = new this.ctx.model.GoodsColor(result);
        await goodsColor.save();
        await this.success('/admin/goodsColor','增加商品颜色成功');
    }
    async edit() {
        let id = this.ctx.query.id
        let result = await this.ctx.model.GoodsColor.find({'_id':id});
        await this.ctx.render('/back/goodsColor/edit',{
            list:result[0]
        })
    }
    async doEdit() {
        let result = this.ctx.request.body;
        let id = result.id;
        let goodsColor = await this.ctx.model.GoodsColor.updateOne({'_id':id},result);
        await this.success('/admin/goodsColor','修改商品颜色成功');
    }
}

module.exports = GoodsColorController