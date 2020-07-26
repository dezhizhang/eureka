'use strict';
const Controller = require('egg').Controller;
class ProductController extends Controller {
    //热门产品
    async hot() {
        let result = await this.ctx.model.Goods.find({'is_hot':'2'});
        this.ctx.body = {
            code:200,
            msg:'SUCCESS',
            success:true,
            data:result
        }
    }
    //主打产品
    async list() {
        let page = this.ctx.query.page;
        let pageSize = 10;
        let totalNum=await this.ctx.model.Goods.find({}).count();
        let totalPage = Math.ceil(totalNum/pageSize)
        let productResult = await this.ctx.model.Goods.find().skip((page -1) * pageSize).limit(pageSize);
        this.ctx.body = {
            code:200,
            msg:'SUCCESS',
            success:true,
            data:productResult,
            page,
            totalPage
        }
    }
}

module.exports = ProductController;