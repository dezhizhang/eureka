'use strict';

const BaseController = require('./base');

class ManagerController extends BaseController {
    async index() {
        // await this.ctx.render('admin/manager/index')
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
        let manager = new this.ctx.model.Admin(result);
        await manager.save();
        this.success('/admin/manager','增加管理员成功');
    }

    
}

module.exports = ManagerController;
