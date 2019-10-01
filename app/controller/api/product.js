'use strict';
const Controller = require('egg').Controller;
class ProductController extends Controller {
    async hot() {
        let result = await this.ctx.model.Product.find({'product_type':'1'});
        this.ctx.body = {
            code:200,
            msg:'SUCCESS',
            data:result
        }
    }

}

module.exports = ProductController;