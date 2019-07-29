'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {


    let list = await this.service.news.getNewsList();

    await this.ctx.render('news',{
      msg:'111',
      list
    });
  }

  
}

module.exports = NewsController;
