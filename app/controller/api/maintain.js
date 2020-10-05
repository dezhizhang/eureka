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
        const template_id = 'sBWMBpor9c5weupAUBJUALvNeUNqk';

        let result = await this.service.upload.uploadImg(); 
        const user = await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${result.code}&grant_type=authorization_code`);
        const userJson =JSON.parse(user.data.toString());
       
        let data = await this.ctx.curl(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`);
        console.log("userJson",userJson.openid)
        const json =JSON.parse(data.data.toString());
        const params = {
            'access_token':json.access_token,
            'touser':userJson.openid,
            'mp_template_msg':{
                appid:appid,
                url:'https://www.guicaioa.com/index',
                template_id:template_id,
                data:{
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
        const sned = await this.ctx.curl(`https://api.weixin.qq.com/cgi-bin/message/wxopen/template/uniform_send`,{
            method:'POST',
            data:params
        });
        console.log("sned",JSON.parse(sned.data.toString()));

        // console.log("result",result);

        // result.status = 2;
        // let email = '1018158888@qq.com';
        // let subject = 'eureka科技预约';
        // let text = `您小程序客户,姓名:${result.userName},电话：${result.mobile},联系地址:${result.address},问题描述:${result.description}，请尽快处理！管理后台:https://www.eureka.net.cn/admin/login`;
        // let html = '';
        // let has_sned = await this.service.tools.sendEmail(email,subject,text,html);
        // let maintain =new this.ctx.model.Maintain(result);
        // await maintain.save();
        // this.ctx.body = {
        //     code:200,
        //     msg:'上传成功',
        //     success:true,
        //     data:null
        // }
        // {"session_key":"Lv7rtdw6mzMrpjek5uXCEQ==","openid":"ootrY5cDYIqWVO2fU-S9AGxh0yVk"}
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