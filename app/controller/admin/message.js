'use strict';

const BaseController = require('./base');

class ManagerController extends BaseController {
    async index() {
        let list = await this.ctx.model.Message.find();
        console.log(list);
        await this.ctx.render('/back/message/index',{
            list
        });
    }
    //增加消息
    async add() {
       await this.ctx.render('/back/message/add')
        
    }
    async doAdd() {
        let result = await this.service.upload.uploadImg(); 
        console.log("result",result);
        let message =new this.ctx.model.Message(result);
        await message.save();
        await this.success('/admin/message','增加消息成功'); 
    }
    //修改
    async edit() {
        let id = this.ctx.query.id;
        let list = await this.ctx.model.Message.find({"_id":id});
        await this.ctx.render('/back/message/edit',{
            list:list[0]
        })
        
    }
    //修改管理员
    async doEdit() {
        try {
            let parts = this.ctx.multipart({ autoFields: true });
            let fields = await parts();
            console.log("fields",fields);
            let { id,file_name } =  parts.field;
            if(fields && fields.filename) {//当前有图片上传先删除再上传
                let result = await this.service.upload.updateImg(fields);
                let params = {
                    ...parts.field,
                    ...result
                }
                await this.ctx.model.Message.updateOne({"_id":id},params);
                await this.success('/admin/message','修改消息成功');
                await this.service.upload.deleteImg(file_name); //删除线上图片
            } else { //没有图片上传 
                await this.ctx.model.Message.updateOne({"_id":id},parts.field);
                await this.success('/admin/message','修改消息成功'); 
            }
        } catch(err) {
            console.log(err);
        }
        
    }
    //删除消息
    async delete() {
        let { id } = this.ctx.query;
        await this.ctx.model.Message.deleteOne({"_id":id});
        await this.success('/admin/message','删除成功'); 
    }

    
}

module.exports = ManagerController;
