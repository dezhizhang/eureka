'use strict';
const Controller = require('egg').Controller;
class ContactController extends Controller {
    async index() {
       await this.ctx.render('/default/contact/index')
    }
    //提交数据
    async doInfo() {
        let result = this.ctx.request.body;
        let username = result.username;
        let mobile = result.mobile;
        let code = result.code;
        if(username && mobile && code) {
            this.ctx.body = {
                code:200,
                msg:'提交数据成功',
                success:true,
                data:null
            }
        } else if(!username){
            this.ctx.body = {
                code:404,
                msg:'用户名不能为空',
                success:false,
                data:null
            }
        } else if(!mobile) {
            this.ctx.body = {
                code:404,
                msg:'手机号不能为空',
                success:false,
                data:null
            }
        } else if(!code) {
            this.ctx.body = {
                code:404,
                msg:'验证码不能为空',
                success:false,
                data:null
            }
        }


    }
    
   
}

module.exports = ContactController