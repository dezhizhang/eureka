'use strict';

const BaseController = require('./base');

class AccessController extends BaseController {
    async index() {
        this.ctx.body = '角色增加';
    }
}

module.exports = AccessController;
