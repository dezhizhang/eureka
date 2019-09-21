'use strict';

const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        let cate_id =this.app.mongoose.Types.ObjectId(this.ctx.query.id);
        let result = await this.ctx.model.GoodsTypeAttr.aggregate([
            {
                $lookup:{
                    from:'goods_type',
                    localField:'cate_id',
                    foreignField:'_id',
                    as:'items'
                }
            },
            {
                $match:{
                    'cate_id':cate_id
                }
            }
        ])
        await this.ctx.render('/admin/goodsTypeAttr/index',{
            list:result,
            cate_id
        })

    }
    async add() {
        let cate_id = this.ctx.query.id;
        let result = await this.ctx.model.GoodsType.find();
        await this.ctx.render('/admin/goodsTypeAttr/add',{
            list:result,
            cate_id
        })
    }
   async doAdd() {
      let result = this.ctx.request.body;
      console.log(result);
      
      let cate_id = result.cate_id;
      let goodsTypeAttr = new this.ctx.model.GoodsTypeAttr(result);
      await goodsTypeAttr.save();
      await this.success(`/admin/goodsTypeAttr?id=${cate_id}`,'增加商品属性成功');
   }
   async edit() {
      console.log(this.ctx.query);

   }
   async doEdit() {

   }
}

module.exports = MainController