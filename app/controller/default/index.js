'use strict';
const Controller = require('egg').Controller;

class IndexController extends Controller {
    async index() {
        let focus = await this.ctx.model.Focus.find({'type':'1'});
        let advert = await this.ctx.model.Advert.find({'type':'1'});
        await this.ctx.render("/default/index",{
            focus,
            advert,
        })
    }
}

module.exports = IndexController