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
        let password = await this.service.tools.md5(data.password);

        let code = data.code;
        if(code == this.ctx.session.code) {

        } else {
            await this.error('/admin/login','验证码不正确');
        }

       

    }



}

module.exports = LoginController;
