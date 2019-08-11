'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
      let data = await this.app.mongo.find('admin',{query:{'name':'张三'}});
      this.ctx.body = {
        code:200,
        msg:'SUCCESS',
        data:data
      }
  }
  
  
}

module.exports = NewsController;
