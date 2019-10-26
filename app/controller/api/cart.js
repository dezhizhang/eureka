'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const Controller = require('egg').Controller;
class MaintainController extends Controller {
    async index() {
        let result = await this.ctx.model.Advert.find();
        this.ctx.body = {
            code:200,
            msg:'SUCCESS',
            data:result
        }
    }
    async save() {
        let result = this.ctx.request.body;
        if(result) {
            let cart = new this.ctx.model.Cart(result);
            await cart.save();
            this.ctx.body = {
                code:200,
                msg:'加入购物车成功',
                success:true
            }
        } else {
            this.ctx.body = {
                code:404,
                msg:'传入的参数有误',
                success:false
            }
        }
    }

}

module.exports = MaintainController;