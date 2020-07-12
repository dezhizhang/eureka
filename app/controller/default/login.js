/**
 * @author:zhangdezhi
 * @date:2020-07-12
 * @desc:登录
*/
'use strict';
const Controller = require('egg').Controller;

class LoginController extends Controller {
    //登录
    async index() {
        await this.ctx.render("/default/login");
    }
}

module.exports = LoginController