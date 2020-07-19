'use strict';

const Controller = require('egg').Controller;
class DetailController extends Controller {
    async index() {
        let { id } = this.ctx.query;
        if(!id) {
            this.ctx.body = {
                code:404,
                msg:'传入的参数有误',
                success:false
            }
            return
        }
        let result = await this.ctx.model.Goods.find({'_id':id});
        this.ctx.body = {
            code:200,
            msg:'请求成功',
            data:result
        }
       
    }
    async photo() {
        let { id } = this.ctx.query;
        if(!id) {
            this.ctx.body = {
                code:404,
                msg:'传入的参数有误',
                success:false
            }
            return
        }
        let result = await this.ctx.model.Photo.find({"goods_id":id});
        this.ctx.body = {
            code:200,
            msg:"请求成功",
            data:result[0].goods_image
        }
    } 
    async detail() {
        let { id } = this.ctx.query;
        if(!id) {
            this.ctx.body = {
                code:404,
                msg:'传入的参数有误',
                success:false
            }
            return
        }
        let result = await this.ctx.model.Detail.find({"goods_id":id});
        this.ctx.body = {
            code:200,
            msg:'请求成功',
            success:true,
            data:result[0].detail_img
        }
    }

}

module.exports = DetailController;