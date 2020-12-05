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
        const result = await this.service.upload.uploadImg();
        result.orderId = await this.service.number();
        const data = await this.ctx.curl(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`);
        const json =JSON.parse(data.data.toString());
        let date = this.ctx.helper.formatTime(Date.now());
                
        const params = {
            'access_token':json.access_token,
            'touser':result.openid,
            'template_id':'0XK1EO7jvqJtHbt_wVfRF9f050sAe4LAo021WqG0_Ds',
            "lang":"zh_CN",
            data:{
                  date2: {
                    value: date,
                  },
                  thing1: {
                    value: result.address
                  },
                  thing3: {
                    value: '我们会尽快给您安排上门，请您耐心等待！'
                  },
                  thing4:{
                    value:result.description
                  }
            },
            
        } 
        const sned = await this.ctx.curl(`https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${json.access_token}`,{
            method:'POST',
            data:JSON.stringify(params)
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