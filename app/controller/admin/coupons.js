'use strict';

const BaseController = require('./base');
class CouponsController extends BaseController {
    async index() {
        let list = await this.ctx.model.Coupons.find();
        console.log(list);
        await this.ctx.render('/back/coupons/index',{
            list
        });
    }
    //修改
    async edit() {
        let id = this.ctx.query.id;
        let result = await this.ctx.model.Contact.find({'_id':id});
        await this.ctx.render('/admin/contact/edit',{
            list:result[0]
        })
    }
    async add() {
        await this.ctx.render('/back/coupons/add')
    }
    async doAdd() {
        let data = this.ctx.request.body;
        let coupons = new this.ctx.model.Coupons(data);
        await coupons.save();
        await this.success('/admin/coupons',"增加优惠券成功")
    }
    //提交数据
    async doEdit() {
        let result = this.ctx.request.body;
        let id = result.id;
        let concatResult = await this.ctx.model.Contact.updateOne({'_id':id},result);
        await this.success('/admin/contact','修改联系人成功');

    }
    async delete() {
        let { id } = this.ctx.query;
        await this.ctx.model.Coupons.deleteOne({"_id":id});
        await this.success('/admin/coupons','删除优惠券成功');

    }
    
}

module.exports = CouponsController