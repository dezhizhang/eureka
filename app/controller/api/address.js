'use strict';
const xml2js = require('xml2js');
const Controller = require('egg').Controller;
class AddressController extends Controller {
    //新增地址
    async add() {
        let result = this.ctx.request.body;
        let { openid } = result;
        let list = await this.ctx.model.Address.find({'openid':openid,"checked":true});
        for(let i=0;i < list.length;i++) {//如果有默认地址先更新false
            await this.ctx.model.Address.update({"openid":openid,"_id":list[i]._id},{checked:false});
        }
        let address = new this.ctx.model.Address(result);
        await address.save();
        this.ctx.body = {
            code:200,
            msg:'新增地址成功',
            data:null,
            success:true
        }
    }
    //保存地址
    async list() {
        let { openid } = this.ctx.query;
        let list = await this.ctx.model.Address.find({'openid':openid}).sort({'checked':-1});
        this.ctx.body = {
            code:200,
            msg:"获取地址成功",
            data:list,
            success:true
        }
    }
    //删除地址
    async delete() {
        let { openid,id } = this.ctx.query;
        let result = await this.ctx.model.Address.deleteOne({'openid':openid,"_id":id});
        this.ctx.body = {
            code:200,
            msg:'删除成功',
            data:null,
            success:true
        }
    }

}

module.exports = AddressController;