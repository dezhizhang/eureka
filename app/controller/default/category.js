/**
 * @author:zhangdezhi
 * @date:2020-07-12
 * @desc:商品分尖
*/
'use strict';
const Controller = require('egg').Controller;

class CategoryController extends Controller {
    async index() {
        await this.ctx.render("/default/category")
      
    }
    
   
}

module.exports = CategoryController