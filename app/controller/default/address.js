/**
 * @author:zhangdezhi
 * @date:2020-07-12
 * @desc:用户地址
*/
'use strict';
const Controller = require('egg').Controller;

class AddressController extends Controller {
    async index() {
        await this.ctx.render("/default/address");
      
    }
}

module.exports = AddressController