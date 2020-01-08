'use strict';
const Controller = require('egg').Controller;

class LoginController extends Controller {
    //登录
    async index() {
        await this.ctx.render("/default/pass/login",{
            result:[],
        })
    }
    //注册第一步
    async registerStep1() {
        await this.ctx.render("/default/pass/register_step1",{
            
        })
    }
    
   
}

module.exports = LoginController