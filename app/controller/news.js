'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
      let userName = this.ctx.session.userName;
      this.ctx.body = userName;
  }

  
}

module.exports = NewsController;
