/**
 * @author:dezhi
 * @date:2020-12-30
 * @desc:用户优惠券
*/
'use strict';

const Controller = require('egg').Controller;
class CouponsController extends Controller {
    async list() {
        let { openid } = this.ctx.query;
        if(!openid) {
            this.ctx.body = {
                code:404,
                msg:'传入参数有误',
                success:true
            }
            return;
        }
        let list = await this.ctx.model.Coupons.find({'openid':openid});
        this.ctx.body = {
            code:200,
            msg:'请求成功',
            data:list,
        }
    }

}

module.exports = CouponsController;