'use strict';
const path=require('path');
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');

class AdvertController extends BaseController {
    async index() {
        let result = await this.ctx.model.Advert.find();
        await this.ctx.render('/back/advert/index',{
            list:result
        });
    }
    async add() {
        await this.ctx.render('/back/advert/add');
        
    }
    //轮播图交数据
    async doAdd() {
        let result = await this.service.upload.uploadImg();
        let advert =new this.ctx.model.Advert(result);
        await advert.save();
        await this.success('/admin/advert','增加广告图成功');
    }
    //修改
    async edit() {
        let id = this.ctx.query.id;
        let result = await this.ctx.model.Advert.find({'_id':id});
        await this.ctx.render('/back/advert/edit',{
            list:result[0]
        });
    }
    //修改提交数据
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
            await this.ctx.model.Advert.updateOne({"_id":id},params);
            await this.success('/admin/advert','修改广告成功');
            await this.service.upload.deleteImg(file_name); //删除线上图片
        } else { //没有图片上传 
            await this.ctx.model.Advert.updateOne({"_id":id},parts.field);
            await this.success('/admin/advert','修改广告成功'); 
        }
    }
    //删除
    async delete() {
        let { id } = this.ctx.query;
        let advert = await this.ctx.model.Advert.find({"_id":id});
        let file_name = advert[0].file_name;
        await this.service.upload.deleteImg(file_name); //删除线上图片
        await this.ctx.model.Advert.deleteOne({"_id":id});
        await this.success("/admin/advert","删除成功");   
    }
}

module.exports = AdvertController;