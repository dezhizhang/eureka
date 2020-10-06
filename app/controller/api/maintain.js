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
        const appid = 'wx2198b51c8406aed0';
        const secret = '27d67b7aa84d8c3c768b4a53fcfb8732';
        const template_id = '';

        let result = await this.service.upload.uploadImg(); 
        
        let data = await this.ctx.curl(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`);
       
        const json =JSON.parse(data.data.toString());
        const params = {
            'access_token':json.access_token,
            'touser':result.openid,
            'weapp_template_msg':{
                'template_id':'sBWMBpor9c5weupAUBJUALvNeUNqk',
                'page':'pages/index/index',
                'form_id':result.formId,
                'data':{
                    "keyword1":{
                        "value":"339208499"
                    },
                },
                'emphasis_keyword':'keyword1.DATA'
            },
            'mp_template_msg':{
                'appid':appid,
                'url':'https://www.guicaioa.com',
                'template_id':'5A9eRJvFUnAuEqNGZ8i5aoezYOA-5JK0OVH6dfsDrzc',
                'data':{
                    "first":{
                        "value":"恭喜你购买成功！",
                        "color":"#173177"
                    },
                },
                "miniprogram":{
                    "appid":appid,
                    "pagepath":"index?foo=bar"
                },
            }
        }
        console.log(params);
        
        const sned = await this.ctx.curl(`https://api.weixin.qq.com/cgi-bin/message/wxopen/template/uniform_send?access_token=${json.access_token}`,{
            method:'POST',
            data:params
        });
        console.log(sned.data.toString())

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