/**
 * @author:zhangdezhi
 * @date:2020-07-18
 * @desc:商品相册
*/
'use strict';
const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        let { id } = this.ctx.query;
        let list = await this.ctx.model.Photo.find({"goods_id":id});
        await this.ctx.render('/back/photo/index',{
            list,
            goods_id:id
        });
    }
    async add() {
       let { goods_id } = this.ctx.query;
       await this.ctx.render('/back/photo/add',{
        goods_id
       })
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
    //添加提交数据
    async doAdd() {
        let result = this.ctx.request.body;
        let goods =new this.ctx.model.Photo(result);
        await goods.save();
        await this.success(`/admin/goods/photo?id=${result.goods_id}`,'商品相册成功'); 
    }
    async edit() {

    }
    async doEdit() {

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
        let { id,goods_id } = this.ctx.query;
        await this.ctx.model.Photo.deleteOne({"_id":id});
        await this.success(`/admin/goods/photo/delete?id=${goods_id}`,'删除相册成功');
    }
}

module.exports = MainController