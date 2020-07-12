/**
 * @author:zhangdezhi
 * @date:2020-07-12
 * @desc:用户注册
*/
'use strict';
const Controller = require('egg').Controller;

class RegistController extends Controller {
    async index() {
        await this.ctx.render("/default/regist")
    }
    //注册
    async doAdd() {
        let result = this.ctx.request.body;
        console.log(result);
        
    }
}
module.exports = RegistController