'use strict';

const BaseController = require('./base');

class ManagerController extends BaseController {
    async index() {
        await this.ctx.render('admin/manager/index')
    }
    
}

module.exports = ManagerController;
