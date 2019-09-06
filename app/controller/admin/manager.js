'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
    async index() {
        this.ctx.body = '角色增加';
    }
}

module.exports = ManagerController;
