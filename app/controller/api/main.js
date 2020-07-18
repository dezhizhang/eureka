/**
 * @author:zhangdezhi
 * @date:2020-07-18
 * @desc:主要分类
*/
'use strict';

const Controller = require('egg').Controller;
class MainController extends Controller {
    async index() {
        let { cate_id } = this.ctx.query;
        if(cate_id){
            let result = await this.ctx.model.Goods.find({'cate_id':cate_id});
            this.ctx.body = {
                code:200,
                msg:'请求成功',
                data:result
            }
        } else {
            this.ctx.body = {
                code:404,
                msg:'传入的参数有误',
                success:false
            }
        }
       
       
    }

}

module.exports = MainController;