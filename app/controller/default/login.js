/**
 * @author:zhangdezhi
 * @date:2020-07-12
 * @desc:登录
*/
'use strict';
const BaseController = require('./base');

class LoginController extends BaseController {
    //登录
    async index() {
        await this.ctx.render("/default/login");
    }
    //登录提交数据
    async doAdd() {
        const result = this.ctx.request.body;
        const { email,password } = result;
        const userResult = await this.ctx.model.User.find({"email":email});
        if(userResult.length <=0) { 
            await this.error("/regist","当前帐号没有注册");
            return;
        }
        //判断密码是否正确
        const md5Password = await this.service.tools.md5(password);
        let user = await this.ctx.model.User.find({"email":email,"password":md5Password});
        if(user.length <=0) {
            await this.error("/login","密码不正确");
            return;
        }
        //用户名或密码都正确设置token
        this.ctx.cookies.set('token', user[0].token);
        await this.success("/","登录成功");
    }
}

module.exports = LoginController