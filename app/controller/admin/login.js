'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
    async index() {
        this.ctx.body = '角色增加';
    }
}

module.exports = LoginController;
