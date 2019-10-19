'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        let { id,type } = this.ctx.query;
        let result = await this.ctx.model.Detail.find({'detail_id':id});
        await this.ctx.render('/admin/detail/index',{
            id,
            type,
            list:result
        })

    }
    async add() {
        let { id,type } = this.ctx.query;
        let title = '';
        if(type == 1) {
            let result = await this.ctx.model.Main.find({'_id':id});
            title = result[0].title
        } else {
            let result = await this.ctx.model.Product.find({'_id':id});
            title = result[0].title
        }
        await this.ctx.render('/admin/detail/add',{
            title,
            id
        });
    }
    async doAdd() {
        let result = this.ctx.request.body;
        let detail = new this.ctx.model.Detail(result);
        detail.save();
        await this.success('/admin/detail','增加商品详情成功');

    }
    async edit() {
        
        let { id,type,product_id } = this.ctx.query;
        let title = '';
        if(type == 1) {
            let result = await this.ctx.model.Main.find({'_id':product_id});
            title = result[0].title
        } else {
            let result = await this.ctx.model.Product.find({'_id':product_id});
            title = result[0].title
        }
        
        let result = await this.ctx.model.Detail.find({'_id':id});
        await this.ctx.render('/admin/detail/edit',{
            list:result[0],
            title,
            id
        })
    }
    async doEdit() {
       
    }
    async detailUploadImage() {
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
        this.ctx.body={
            link:files.file
        }
    }
   
}

module.exports = MainController