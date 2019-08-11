'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
  //  this.ctx.cookies.set('username','123456',{
  //    maxAge:24*3600*1000,
  //    httpOnly:true,
  //    encrypt:true
  //  })
  this.ctx.session.userName = '张三';
  
   await this.ctx.render('home');
  }

  async add() {
    let result = this.ctx.request.body;
    this.ctx.body = {
      code:200,
      msg:'success',
      data:null
    }
  }

}

module.exports = HomeController;
