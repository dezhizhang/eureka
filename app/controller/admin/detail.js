/**
 * @author:zhangdezhi
 * @date:2020-07-20
 * @desc:添加商品详情
*/
'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        let { id } = this.ctx.query;
        let list = await this.ctx.model.Detail.find({"goods_id":id});
        console.log("list",list);
        await this.ctx.render('/back/detail/index',{
            list,
            goods_id:id
        });
    }
    async add() {
        let { goods_id } = this.ctx.query;
        await this.ctx.render("/back/detail/add",{
            goods_id,
        });
    }
    //详情提交数据
    async doAdd() {
        let result = this.ctx.request.body;
        let detail = new this.ctx.model.Detail(result);
        await detail.save();
        await this.success(`/admin/goods/detail?id=${result.goods_id}`,'增加商品详情成功');
    }
    async edit() {
        
        let { id,type,detail_id } = this.ctx.query;
        let title = '';
        if(type == 1) {
            let result = await this.ctx.model.Main.find({'_id':detail_id});
            title = result[0].title
        } else {
            let result = await this.ctx.model.Product.find({'_id':detail_id});
            title = result[0].title
        }
        
        let result = await this.ctx.model.Detail.find({'_id':id});
        await this.ctx.render('/admin/detail/edit',{
            list:result[0],
            title,
            detail_id,
            id,
            type
        })
    }
    async doEdit() {
       let result = this.ctx.request.body;
       let {id,type,detail_id } = result;
       let updateDetail = await this.ctx.model.Detail.updateOne({'_id':id},result);
       await this.success(`/admin/detail?detail_id=${detail_id}&type=${type}`,'修改商品详情成功');
    }
    //删除
    async delete() {
        let { id, goods_id } = this.ctx.query;
        await this.ctx.model.Detail.deleteOne({"_id":id});
        await this.success(`/admin/goods/detail?id=${goods_id}`,'删除详情成功');
    }
}

module.exports = MainController