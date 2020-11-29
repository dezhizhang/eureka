'use strict';

const BaseController = require('./base');

class HomeController extends BaseController {
    //显示用户登录
    async index() {
        await this.ctx.render('back/home/index');
    }
   


}

module.exports = HomeController;
