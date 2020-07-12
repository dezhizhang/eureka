/**
 * @author:zhangdezhi
 * @date:2020-07-12
 * @desc:商品列表
*/
'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        await this.ctx.render("/default/product")
      
    }
    
   
}

module.exports = UserController