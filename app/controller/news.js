'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
      // let cookies =  this.ctx.cookies.get('username');
      let userName = this.ctx.session.userName;
      this.ctx.body = userName;
  }

  
}

module.exports = NewsController;
