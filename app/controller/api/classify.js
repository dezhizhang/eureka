'use strict';

const Controller = require('egg').Controller;
class ClassifyController extends Controller {
    async index() {
        let result = await this.ctx.model.GoodsCate.aggregate([
            {
                $lookup:{
                    from:'goods_cate',
                    localField:'_id',
                    foreignField:'pid',
                    as:'items'
                }
            },
            {
                $match:{
                    'pid':'0'
                }
            }
        ]);
        this.ctx.body = {
            code:200,
            msg:"请求成功",
            success:true,
            data:result,
        }
    }

}
module.exports = ClassifyController;