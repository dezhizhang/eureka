'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
    async index() {
        let result = await this.ctx.model.Focus.find({'type':'1'});
        await this.ctx.render('/default/index/index',{
            list:result
        });
    }
   
}

module.exports = IndexController