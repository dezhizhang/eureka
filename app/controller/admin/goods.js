'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        await this.ctx.render('/admin/goods/index')
    }
    async add() {
        let goodsCate = await this.ctx.model.GoodsCate.aggregate([
            {
                $lookup:{
                    from:'goods_cate',
                    localField:'_id',
                    foreignField:'pid',
                    as:'items'
                }
            },
            {
                $match:{
                    'pid':'0'
                }
            }
        ]);
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
    //上传商品详情图片
    async goodsUploadImage() {
        let result = await this.service.upload.uploadImg();
        this.ctx.body={
            link:result.url
        }
    }
    //上传相册图片
    async goodsUploadPhoto() {
        let result = await this.service.upload.uploadImg();
        this.ctx.body={
            link:result.url
        }
    }
    async doAdd() {
        let result = await this.service.upload.uploadImg();
        let goods =new this.ctx.model.Goods(result);
        await goods.save();
        await this.success('/admin/goods','增加商品成功'); 
    }
    async edit() {

    }
    async doEdit() {

    }
}

module.exports = MainController