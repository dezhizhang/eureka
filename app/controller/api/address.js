'use strict';
const xml2js = require('xml2js');
const Controller = require('egg').Controller;
class AddressController extends Controller {
    //新增地址
    async add() {
        let result = this.ctx.request.body;
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
        let list = await this.ctx.model.Address.find({'openid':openid});
        this.ctx.body = {
            code:200,
            msg:"获取地址成功",
            data:list,
            success:true
        }
    }
    //用户保存信息
    async save() {
        const result = this.ctx.request.body;
        const { openid, } = result;
        const data = await this.ctx.model.User.find({'openid':openid});
        if(data.length > 0) { //如果当前存在更新
            await this.ctx.model.User.update({'openid':openid},result);
            this.ctx.body = {
                code:200,
                msg:'更新数据成功',
                success:true,
                data:null
            }
            return
        }
        let user = new this.ctx.model.User(result);
        await user.save();
        this.ctx.body = {
            code:200,
            msg:'添加成功',
            data:null
        }
    }
    //获取用户信息
    async info() {
        const { openid } = this.ctx.query;
        const data = await this.ctx.model.User.find({'openid':openid});
        this.ctx.body = {
            code:200,
            msg:"获取用户成功",
            data:data[0],
            success:true
        }
    }
}

module.exports = AddressController;