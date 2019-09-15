'use strict';
const path=require('path');
const fs=require('fs');
const pump = require('mz-modules/pump');

const BaseController = require('./base');

class FocusController extends BaseController {
    async index() {
        await this.ctx.render('/admin/focus/index')
        await this.service.tools.getUploadFile('/public')
    }
    async add() {
        await this.ctx.render('/admin/focus/add');
        
    }
    async doAdd() {
        let parts = this.ctx.multipart({ autoFields: true });
        let files = {};               
        let stream;
        while ((stream = await parts()) != null) {
            if (!stream.filename) {          
                break;
            }       
            let fieldname = stream.fieldname;  //file表单的名字
            //上传图片的目录
            let dir=await this.service.tools.getUploadFile(stream.filename);
            let target = dir.uploadDir;
            let writeStream = fs.createWriteStream(target);
            await pump(stream, writeStream);  
            files=Object.assign(files,{
                [fieldname]:dir.saveDir    
            })
            
        }      
        let focus =new this.ctx.model.Focus(Object.assign(files,parts.field));
        let result=await focus.save();
        await this.success('/admin/focus','增加轮播图成功');

    }
}

module.exports = FocusController;
