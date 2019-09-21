'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class GoodsCateController extends BaseController {
    async index() {
         let result = await this.ctx.model.GoodsCate.find();
         console.log(result);
         
     

      
    }
    async add() {
       await this.ctx.render('/admin/goodsCate/add');
    }
    async doAdd() {
        let files = {};       
        let parts = this.ctx.multipart({ autoFields: true });        
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
        let goodsCate =new this.ctx.model.GoodsCate(Object.assign(files,parts.field));
        await goodsCate.save();
        await this.success('/admin/goodsCate','增加分类成功');
    }
    async edit() {

    }
    async doEdit() {

    }

}

module.exports = GoodsCateController;