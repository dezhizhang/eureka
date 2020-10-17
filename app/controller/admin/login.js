'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
    //显示用户登录
    async index() {
        await this.ctx.render('back/login');
    }
    //用户登录
    async doLogin() {
        const admin = this.ctx.request.body;
        const {email,password,code} = admin;
        admin.password = await this.service.tools.md5(password);
        if(code.toUpperCase() !== this.ctx.session.code.toUpperCase()) {
            await this.error('/admin/login','验证码不正确');
            return;
        }
        let result = await this.ctx.model.Admin.find({'email':email,'password':admin.password});
        if(result.length <= 0) {
            await this.error('/admin/login','邮箱或密码不正确');
            return;
        }
        this.ctx.session.userInfo = result[0]
        this.ctx.redirect('/admin/manager');   
    }
    //退出登录
    async loginOut() {
        this.ctx.session.userInfo = null;
        this.ctx.redirect('/admin/login');
    }



}

module.exports = LoginController;
