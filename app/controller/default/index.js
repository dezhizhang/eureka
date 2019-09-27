'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
    async index() {
        //后台主页
        await this.ctx.render('/default/index/index');
    }
   
}

module.exports = IndexController