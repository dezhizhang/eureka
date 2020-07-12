/**
 * @author:zhangdezhi
 * @date:2020-07-12
 * @desc:我的留言
*/
'use strict';
const Controller = require('egg').Controller;

class MssageController extends Controller {
    async index() {
        await this.ctx.render("/default/message")
      
    }
    
   
}

module.exports = MssageController