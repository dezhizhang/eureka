'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
    //显示用户登录
    async index() {
        await this.ctx.render('admin/login');
    }
    //热行用户登录
    async doLogin() {
        let data = this.ctx.request.body;
        console.log(data);
        
    }



}

module.exports = LoginController;
