'use strict';

const BaseController = require('./base');

class AccessController extends BaseController {
    async index() {
        this.ctx.body = '角色增加';
    }
    //权限
    async add() {
        await this.ctx.render('/admin/access/add');
    }
    //增加权限
    async doAdd() {
        let data = this.ctx.request.body;
        console.log(data);
        
        let access = new  this.ctx.model.Access(data);
        await access.save();
        await this.success('/admin/access','增加权限成功');


    }
}

module.exports = AccessController;
