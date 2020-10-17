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
        if(code.toUpperCase() == this.ctx.session.code.toUpperCase()) {
            let result = await this.ctx.model.Admin.find({'email':email,'password':password});
            if(result.length > 0) {
                //保存用户信息
                this.ctx.session.userInfo = result[0];
                //跳转到用户中心
                this.ctx.redirect('/admin/manager'); 
            } else {
                await this.error('/admin/login','用户名或密码不正确')
            }

        } else {
            await this.error('/admin/login','验证码不正确');
        }
    }
    //退出登录
    async loginOut() {
        this.ctx.session.userInfo = null;
        this.ctx.redirect('/admin/login');
    }



}

module.exports = LoginController;
