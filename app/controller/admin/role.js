'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
    //显示角色
    async index() {
        let data = await this.ctx.model.Role.find();
        await this.ctx.render('/admin/role/index',{
            list:data
        });
    }
    //增加
    async add() {
        await this.ctx.render('/admin/role/add');
    }
    //增加角色
    async doAdd() {
        let result = this.ctx.request.body;
        let title = result.title;
        let description = result.description;
        let role = new this.ctx.model.Role({title,description});
        await role.save();
        await this.success('/admin/role','增加角色成功');
    }
    //编辑角色
    async edit() {
        let _id = this.ctx.query.id;
        let data = await this.ctx.model.Role.find({'_id':_id});
        await this.ctx.render('/admin/role/edit',{
            list:data[0]
        })
    }
    //更新角色
    async doEdit() {
        let result = this.ctx.request.body;
        let _id = result._id;
        let title = result.title;
        let description = result.description;
        let role = await this.ctx.model.Role.updateOne({'_id':_id},{title,description});
        await this.success('/admin/role','编辑角色成功');
    }
    //授权
    async auth() {
        await this.ctx.render('/admin/role/auth');
    } 
    
}

module.exports = LoginController;
