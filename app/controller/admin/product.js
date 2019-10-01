'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class ProductController extends BaseController {
    async index() {
        let result = await this.ctx.model.Product.find();
        await this.ctx.render('/admin/product/index',{
            list:result
        });
    }
    
    async add() {
        await this.ctx.render('/admin/product/add');
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
            await this.service.tools.jimpImg(target,200,200)
            
        }      
        let product =new this.ctx.model.Product(Object.assign(files,parts.field));
        let result=await product.save();
        await this.success('/admin/product','增加产品成功');
    }

    async edit() {

    }

    async doEdit() {

    }
   
}

module.exports = ProductController