/**
 * @author:zhangdezhi
 * @date:2020-07-12
 * @desc:用户收藏
*/
'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        await this.ctx.render("/default/collect")
      
    }
    
   
}

module.exports = UserController