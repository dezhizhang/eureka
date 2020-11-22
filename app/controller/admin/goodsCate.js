'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class GoodsCateController extends BaseController {
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
        await this.ctx.render('/back/goodsCate/index',{
            list:result
        })
    }
    async add() {
        let result = await this.ctx.model.GoodsCate.find({'pid':'0'});
        await this.ctx.render('/back/goodsCate/add',{
            cateList:result
        });
    }
    //增加分类
    async doAdd() {
        let result = await this.service.upload.uploadImg();
        if(result.pid != '0') {
            result.pid = await this.app.mongoose.Types.ObjectId(result.pid);
        }
        let goodsCate =new this.ctx.model.GoodsCate(result);
        await goodsCate.save();
        await this.success('/admin/goodsCate','增加分类成功');
    }
    async edit() {
        let id = this.ctx.query.id;
        let cateList = await this.ctx.model.GoodsCate.find({'pid':'0'});
        let result = await this.ctx.model.GoodsCate.find({'_id':id});
        await this.ctx.render('/back/goodsCate/edit',{
            list:result[0],
            cateList
        });
    }
    //分类提交数据
    async doEdit() {
        let parts = this.ctx.multipart({ autoFields: true });
        let fields = await parts();
        let { id,file_name } =  parts.field;
        if(fields.filename) {//当前有图片上传先删除再上传
            let result = await this.service.upload.updateImg(fields);
            if(result.pid != '0') {
                result.pid = await this.app.mongoose.Types.ObjectId(result.pid);
            }
            let params = {
                ...parts.field,
                ...result
            }
            await this.ctx.model.GoodsCate.updateOne({"_id":id},params);
            await this.success('/admin/goodsCate','修改分类成功');
            await this.service.upload.deleteImg(file_name); //删除线上图片
        } else { //没有图片上传 
            await this.ctx.model.GoodsCate.updateOne({"_id":id},parts.field);
            await this.success('/admin/goodsCate','修改分类成功'); 
        }
    }
    //删除
    async delete() {
        let { id } = this.ctx.query;
        let goodsCate = await this.ctx.model.GoodsCate.find({"_id":id});
        let file_name = goodsCate[0].file_name;
        await this.service.upload.deleteImg(file_name); //删除线上图片
        await this.ctx.model.GoodsCate.deleteOne({"_id":id});
        await this.success("/admin/goodsCate","删除成功"); 
    }

}

module.exports = GoodsCateController;