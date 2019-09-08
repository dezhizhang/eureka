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
        await this.ctx.render('admin/manager/index',{
            list:result
        })
    }
    //管理员
    async add() {
        //获取用户角色
        let roleData = await this.ctx.model.Role.find();
        await this.ctx.render('/admin/manager/add',{
            list:roleData
        });
    }
    //增加管理员
    async doAdd() {
        let result = this.ctx.request.body;
        result.password = await this.service.tools.md5(result.password);
        let adminResult = await this.ctx.model.Admin.find({'username':result.username});
        if(adminResult.length > 0) {
            await this.error('/admin/manager','当前管理员以存在');
        } else {
            let manager = new this.ctx.model.Admin(result);
            await manager.save();
            await this.success('/admin/manager','增加管理员成功');
        }
    }
    //修改
    async edit() {
        let result = this.ctx.query;
        await this.ctx.render('/admin/manager/edit')
    }
    //修改管理员
    async doEdit() {
        
    }

    
}

module.exports = ManagerController;
