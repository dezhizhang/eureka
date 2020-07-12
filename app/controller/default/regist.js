/**
 * @author:zhangdezhi
 * @date:2020-07-12
 * @desc:用户注册
*/
'use strict';
const BaseController = require('./base');

class RegistController extends BaseController {
    async index() {
        await this.ctx.render("/default/regist")
    }
    //注册
    async doAdd() {
        const result = this.ctx.request.body;
        const { email,mobile,code } = result;
        //验证码是否正确
        if(code.toUpperCase() !== this.ctx.session.code.toUpperCase()) {
            await this.error("/regist",'验证码不正确');
            return;
        }
        //是否存在
        let userResult = await this.ctx.model.User.find({"email":email,"mobile":mobile});
        if(userResult.length > 0) {
            await this.error("/regist","当前用户以存在，请换个邮箱或手机号注册");
            return
        }
        //对密码进行加密码
        result.password = await this.service.tools.md5(result.password);
        let user = new this.ctx.model.User(result);
        await user.save();
        //注册成功跳到登录
        await this.success("/login","注册成功");
    }
}
module.exports = RegistController