'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {


    let list = await this.service.news.getNewsList();
 
    let data = JSON.parse(list);
    console.log(data);


    await this.ctx.render('news',{
      msg:'111',
      data:data.result,
    });
  }

  
}

module.exports = NewsController;
