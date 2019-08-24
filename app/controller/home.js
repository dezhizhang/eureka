'use strict';

const BaseController = require('../base/base');
class HomeController extends BaseController {
  async index() {
  this.ctx.session.userName = '张三';

   await this.ctx.render('home');
  }

  async add() {
    let result = this.ctx.request.body;
    this.ctx.status = 301;
    this.ctx.redirect('/news');

    this.ctx.body = {
      code:200,
      msg:'success',
      data:null
    }
  }
  async login() {
    await this.ctx.render('login');

  }
  async register() {
    await this.ctx.render('register');
  }
  async doLogin() {
    let result = this.ctx.request.body;
    let data = await this.app.mongo.insertOne('admin',{doc:result});
    await this.success('/login')

  }
  async doRegister() {
   await this.success('/');
  }

  async test() {
    let result = this.ctx.request.body;
    this.ctx.body = {
      code:200,
      message:'SUCCESS',
      data:null
    }
  }

}

module.exports = HomeController;
