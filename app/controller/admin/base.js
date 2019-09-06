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
}

module.exports = BaseController;
