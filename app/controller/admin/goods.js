/**
 * @author:zhangdezhi
 * @date:2020-07-18
 * @desc:商品类别
*/
'use strict';
const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        let page = this.ctx.query.page || 1;
        let pageSize = 10;
        let list = await this.ctx.model.Goods.find().limit(pageSize).skip((page - 1) * pageSize);
        let count = await this.ctx.model.Goods.find().count();
        await this.ctx.render('/back/goods/index',{
            list,
            count
        })
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
        await this.ctx.render('/back/goods/add',{
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
    //增加商品
    async doAdd() {
        try{
            let result = await this.service.upload.uploadImg(); 
            let goods_id = await this.service.tools.number();
            result.goods_id = goods_id;
            let goods =new this.ctx.model.Goods(result);
            await goods.save();
            await this.success('/admin/goods','增加商品成功'); 
        }catch(err){
            console.log(err);
        }
       
    }
    async edit() {
        let { id } = this.ctx.query;
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
        let result = await this.ctx.model.Goods.find({"_id":id});
        await this.ctx.render("/back/goods/edit",{
            id,
            list:result[0],
            goodsColor,
            goodsCate,
            goodsType,
        });
    }
    async doEdit() {
        let parts = this.ctx.multipart({ autoFields: true });
        let fields = await parts();
        let { id,file_name } =  parts.field;
        if(fields.filename) {//当前有图片上传先删除再上传
            let result = await this.service.upload.updateImg(fields);
            let params = {
                ...parts.field,
                ...result
            }
            await this.ctx.model.Goods.updateOne({"_id":id},params);
            await this.success('/admin/goods','修改商品成功');
            await this.service.upload.deleteImg(file_name); //删除线上图片
        } else { //没有图片上传 
            await this.ctx.model.Goods.updateOne({"_id":id},parts.field);
            await this.success('/admin/goods','修改商品成功'); 
        }
    }
    //相册
    async photo() {
        let { id } = this.ctx.query;
        await this.ctx.render("/back/goods/photo",{
            goods_id:id
        });
    }
    //删除
    async delete() {
        let { id } = this.ctx.query;
        await this.ctx.model.Goods.deleteOne({"_id":id});
        await this.ctx.model.Detail.deleteOne({"goods_id":id});
        await this.ctx.model.Photo.deleteOne({"goods_id":id});
        await this.success("/admin/goods","删除商品城功");
    }
}

module.exports = MainController