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
        try{
            let result = await this.service.upload.uploadImg(); 
            let message =new this.ctx.model.Message(result);
            await message.save();
            await this.success('/admin/message','增加消息成功'); 
        }catch(err){
            console.log(err);
        }
    }
    //修改
    async edit() {
        // let id = this.ctx.query.id;
        // let roleData = await this.ctx.model.Role.find();
        // let result = await this.ctx.model.Admin.find({'_id':id});
        // await this.ctx.render('/back/manager/edit',{
        //     list:result[0],
        //     roleList:roleData
        // })
    }
    //修改管理员
    async doEdit() {
        // let data = this.ctx.request.body;
        // let id = data.id;
        // let password = data.password;
        // data.password = await this.service.tools.md5(password);
        // if(password) { //修改密码
        //     await this.ctx.model.Admin.updateOne({'_id':id},data);
        // } else {
        //     await this.ctx.model.Admin.updateOne({'_id':id},{
        //         email:data.email,
        //         role_id:data.role_id,
        //         mobile:data.mobile
        //     })
        // }
        // await this.success('/admin/manager','修改管理员成功');
    }
    //删除消息
    async delete() {
        let { id } = this.ctx.query;
        await this.ctx.model.Message.deleteOne({"_id":id});
        await this.success('/admin/message','删除成功'); 


    }

    
}

module.exports = ManagerController;
