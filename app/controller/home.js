'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
   await this.ctx.render('home');
  }

  async add() {
    let result = this.ctx.request.body;

  }

}

module.exports = HomeController;
