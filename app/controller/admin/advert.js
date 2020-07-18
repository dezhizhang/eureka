'use strict';
const path=require('path');
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');

class AdvertController extends BaseController {
    async index() {
        let result = await this.ctx.model.Advert.find();
        await this.ctx.render('/admin/advert/index',{
            list:result
        });
    }
    async add() {
        await this.ctx.render('/admin/advert/add');
        
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
        await this.ctx.render('/admin/advert/edit',{
            list:result[0]
        });
    }
    //修改提交数据
    async doEdit() {
        // let parts = this.ctx.multipart({ autoFields: true });
        // let files = {};               
        // let stream;
        // while ((stream = await parts()) != null) {
        //     if (!stream.filename) {          
        //       break;
        //     }       
        //     let fieldname = stream.fieldname;  //file表单的名字
        //     //上传图片的目录
        //     let dir=await this.service.tools.getUploadFile(stream.filename);
        //     let target = dir.uploadDir;
        //     let writeStream = fs.createWriteStream(target);
        //     await pump(stream, writeStream);  
        //     files=Object.assign(files,{
        //       [fieldname]:dir.saveDir    
        //     })
            
        // }      
        // //修改操作
        // let id=parts.field.id;
        // let updateResult=Object.assign(files,parts.field);
        // let result =await this.ctx.model.Advert.updateOne({"_id":id},updateResult);
        // await this.success('/admin/advert','修改广告成功');
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