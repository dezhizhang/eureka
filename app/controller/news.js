'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
      // let userName = this.ctx.session.userName;
      // this.ctx.body = userName;
      this.ctx.body = {
        code:200,
        msg:'SUCCESS',
        data:null
      }
  }

  
}

module.exports = NewsController;
