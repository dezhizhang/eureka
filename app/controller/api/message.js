/**
 * @author:zhangdezhi
 * @date:2020-07-18
 * @desc:用户消息
*/
'use strict';

const Controller = require('egg').Controller;
class MessageController extends Controller {
    async index() {
        let { openid } = this.ctx.query;
        if(!openid) {
            this.ctx.body = {
                code:404,
                msg:'传入参数有误',
                success:true
            }
            return;
        }
        let list = await this.ctx.model.Message.find();
        this.ctx.body = {
            code:200,
            msg:'请求成功',
            data:list,
        }
    }

}

module.exports = MessageController;