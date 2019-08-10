'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
      let cookies =  this.ctx.cookies.get('username');
      this.ctx.body = cookies;
  }

  
}

module.exports = NewsController;
