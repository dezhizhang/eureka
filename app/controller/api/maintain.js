'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const Controller = require('egg').Controller;
class MaintainController extends Controller {
    async index() {
        let result = await this.ctx.model.Advert.find();
        this.ctx.body = {
            code:200,
            msg:'SUCCESS',
            data:result
        }
    }
    async upload() {
        let result = await this.service.upload.uploadImg(); 
        result.status = 2;
        let email = '1018158888@qq.com';
        let subject = 'eureka科技预约';
        let text = `您小程序客户,姓名:${result.userName},电话：${result.mobile},联系地址:${result.address},问题描述:${result.description}，请尽快处理！管理后台:https://www.eureka.net.cn/admin/login`;
        let html = '';
        let has_sned = await this.service.tools.sendEmail(email,subject,text,html);
        let maintain =new this.ctx.model.Maintain(result);
        await maintain.save();
        this.ctx.body = {
            code:200,
            msg:'上传成功',
            success:true,
            data:null
        }
    }
    //获取预约列表
    async list() {
        let { openid,status } = this.ctx.query;
        if(!openid && !status) {
            this.ctx.body = {
                code:404,
                msg:'传入的参数有误',
                data:null,
            }
            return;
        }
        let list = await this.ctx.model.Maintain.find({'openid':openid,'status':status});
        this.ctx.body = {
            code:200,
            msg:'获取预约成功',
            data:list
        }
    }
    //删除预约
    async delete() {
        let { openid,id } = this.ctx.query;
        if(!openid && !id) {
            this.ctx.body = {
                code:200,
                msg:'传入的参数有误',
                data:null
            }
            return;
        }
        await this.ctx.model.Maintain.deleteOne({'_id':id,'openid':openid});
        this.ctx.body = {
            code:200,
            msg:'删除成功',
            data:null
        }
    }

}

module.exports = MaintainController;