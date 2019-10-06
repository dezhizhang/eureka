'use strict';
const Controller = require('egg').Controller;
class ContactController extends Controller {
    async index() {
       await this.ctx.render('/default/contact/index')
    }
    
   
}

module.exports = ContactController