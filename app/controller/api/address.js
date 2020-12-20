/*
 * @Author: dezhizhang
 * @Date: 2020-12-12 17:59:46
 * @LastEditTime: 2020-12-13 16:07:26
 * @LastEditors: Please set LastEditors
 * @Description: 地址列表
 * @FilePath: /eureka/app/controller/api/address.js
 */
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
    //更新地址
    async update() {
        let result = this.ctx.request.body;
        let { openid,id  } = result;
        //修复编
        let list = await this.ctx.model.Address.find({"openid":openid,"checked":true});
        for(let i=0;i < list.length;i++) {
            await this.ctx.model.Address.update({"openid":openid,"_id":list[i]._id},{checked:false});
        }
        await this.ctx.model.Address.updateOne({"openid":openid,"_id":id},result);
        this.ctx.body = {
            code:200,
            msg:"更新地址成功",
            data:null,
            success:true
        }
    }
    //获取单条地址
    async info() {
        let { openid,id } = this.ctx.query;
        let data = await this.ctx.model.Address.find({"openid":openid,"_id":id});
        this.ctx.body = {
            code:200,
            msg:'获取成功',
            data:data[0],
            success:true
        }
    }
    //获取用户地址
    async default() {
        let { openid,} = this.ctx.query;
        let data = await this.ctx.model.Address.find({'openid':openid,checked:true});
        if(data.length > 0) {
            this.ctx.body = {
                code:200,
                msg:"获取成功",
                data:data[0],
                success:true,
            }
        } else {
            let result = await this.ctx.model.Address.find({'openid':openid});
            this.ctx.body = {
                code:200,
                msg:"获取成功",
                data:result[0],
                success:true,
            }
        }
    }
}

module.exports = AddressController;