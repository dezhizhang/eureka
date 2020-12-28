'use strict';
const BaseController = require('./base');
class UserController extends BaseController {
    async index() {
        let list = await this.ctx.model.User.find();
        console.log('list',list)
        await this.ctx.render('/back/user/index',{
            list
        });
    }
    async add() {
        await this.ctx.render('/back/user/add');
        
    }
    //轮播图交数据
    async doAdd() {
        let result = await this.service.upload.uploadImg(); 
        let focus =new this.ctx.model.Focus(result);
        await focus.save();
        await this.success('/admin/focus','增加轮播图成功');
    }
    //修改
    async edit() {
        let id = this.ctx.query.id;
        let result = await this.ctx.model.User.find({'_id':id});
        await this.ctx.render('/back/user/edit',{
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
            await this.ctx.model.Focus.updateOne({"_id":id},params);
            await this.success('/admin/focus','修改轮播图成功');
            await this.service.upload.deleteImg(file_name); //删除线上图片
        } else { //没有图片上传 
            await this.ctx.model.Focus.updateOne({"_id":id},parts.field);
            await this.success('/admin/focus','修改轮播图成功'); 
        }
    }
    async delete() {
        let id = this.ctx.query.id;
        let user = await this.ctx.model.User.deleteOne({"_id":id});
        await this.success("/admin/user","删除用户成功")
        // let { id } = this.ctx.query;
        // let focus = await this.ctx.model.Focus.find({"_id":id});
        // let file_name = focus[0].file_name;
        // await this.service.upload.deleteImg(file_name); //删除线上图片
        // await this.ctx.model.Focus.deleteOne({"_id":id});
        // await this.success("/admin/focus","删除成功");   
    }
}

module.exports = UserController;
