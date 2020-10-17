'use strict';

const BaseController = require('./base');

class ManagerController extends BaseController {
    async index() {
        //关联查询
        let result = await this.ctx.model.Admin.aggregate([
           {
                $lookup:{
                    from:'role',
                    localField:'role_id',
                    foreignField:'_id',
                    as:'item'
                }
           }
        ]);
        await this.ctx.render('back/manager/index',{
            list:result,
        })
    }
    //管理员
    async add() {
        //获取用户角色
        let roleData = await this.ctx.model.Role.find();
        await this.ctx.render('/back/manager/add',{
            list:roleData
        });
    }
    //增加管理员
    async doAdd() {
        let data = this.ctx.request.body;
        const { email,password } = data;
        data.password = await this.service.tools.md5(password);
        let result = await this.ctx.model.Admin.find({'email':email});
        if(result.length > 0) {
            await this.error('/admin/manager','当前管理员以存在');
        } else {
            let manager = new this.ctx.model.Admin(data);
            await manager.save();
            await this.success('/admin/manager','增加管理员成功');
        }
    }
    //修改
    async edit() {
        let id = this.ctx.query.id;
        let roleData = await this.ctx.model.Role.find();
        let result = await this.ctx.model.Admin.find({'_id':id});
        await this.ctx.render('/back/manager/edit',{
            list:result[0],
            roleList:roleData
        })
    }
    //修改管理员
    async doEdit() {
        let data = this.ctx.request.body;
        let id = data.id;
        let password = data.password;
        data.password = await this.service.tools.md5(password);
        if(password) { //修改密码
            await this.ctx.model.Admin.updateOne({'_id':id},data);
        } else {
            await this.ctx.model.Admin.updateOne({'_id':id},{
                email:data.email,
                role_id:data.role_id,
                mobile:data.mobile
            })
        }
        await this.success('/admin/manager','修改管理员成功');
    }

    
}

module.exports = ManagerController;
