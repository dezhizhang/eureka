'use strict';

const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        
        await this.ctx.render('/admin/goods/index')
    }
    async add() {
        let goodsCate = await this.ctx.model.GoodsCate.find({});
        let goodsColor = await this.ctx.model.GoodsColor.find({});
        let goodsType = await this.ctx.model.GoodsType.find({});
        await this.ctx.render('/admin/goods/add',{
            goodsCate,
            goodsColor,
            goodsType
        });
    }
    //获取商品类型属性
    async goodsTypeAttr() {
        let cate_id = this.ctx.query.cate_id;
        if(cate_id&&cate_id!='0'){
            let result = await this.ctx.model.GoodsTypeAttr.find({'cate_id':cate_id});
            this.ctx.body = {
                code:200,
                msg:'查询成功',
                data:result,
                success:true
            }
        } else{
            this.ctx.body = {
                code:404,
                msg:'传入的参数有误',
                data:null,
                success:true
            }
        }
    }
    async doAdd() {

    }
    async edit() {

    }
    async doEdit() {

    }
}

module.exports = MainController