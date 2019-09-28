'use strict';

const BaseController = require('./base');
class MaintainController extends BaseController {

    async index() {
        let result = await this.ctx.model.Maintain.find();
        await this.ctx.render('/admin/maintain/index',{
            list:result
        });
    }
    async welcome() {
       
    }
}

module.exports = MaintainController