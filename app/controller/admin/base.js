'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    //成功
    async success(redirectURL) {
        await this.ctx.render('admin/public/success',{
            redirectURL:redirectURL
        })
    }
    //失败
    async error(redirectURL) {
        await this.ctx.render('admin/public/error',{
            redirectURL:redirectURL
        })
    }
    //验证
    async verify() {
        let captcha = await this.service.tools.captcha();
        this.ctx.response.type = 'image/svg+xml';
        this.ctx.body = captcha.data;
    
    }
}

module.exports = BaseController;
