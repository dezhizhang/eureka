/**
 * @author:zhangdezhi
 * @date:2020-07-12
 * @desc:用户中心
*/
'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        await this.ctx.render("/default/user")
      
    }
    
   
}

module.exports = UserController