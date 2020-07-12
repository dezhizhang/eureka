/**
 * @author:zhangdezhi
 * @date:2020-07-12
 * @desc:购物车
*/
'use strict';
const Controller = require('egg').Controller;

class BuycarController extends Controller {
    async index() {
        await this.ctx.render("/default/buyCar")
      
    }
    //购物转第二步
    async buyCarTwo() {
        await this.ctx.render("/default/buyCarTwo")
    }
    
   
}

module.exports = BuycarController