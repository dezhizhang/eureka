'use strict';
const xml2js = require('xml2js');
const Controller = require('egg').Controller;
class PrepaidController extends Controller {
    async index() {
        let { code,appid } = this.ctx.query;
        let data = await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=84e57fcbc1036f289c964444f58f16e7&js_code=${code}&grant_type=authorization_code`);
        let json =JSON.parse(data.data.toString()); 
        this.ctx.body = {
            code:200,
            msg:'success',
            data:json
        }
    }
    //预支付
    async prepaid() {
        let result = this.ctx.request.body;
        let { goods_id } = result;
        let data = await this.ctx.model.UserInfo.find({'goods_id':goods_id});
        //当存在时不加入预支付订单
        if(data.length > 0) {
            this.ctx.body = {
                code:200,
                msg:'成功',
                data:null,
                success:true
            }
            return
        }
        let userInfo = new this.ctx.model.UserInfo(result);
        await userInfo.save();
        this.ctx.body = {
            code:200,
            msg:'成功',
            data:null,
            success:true
        }
    }
    //获取支付列表
    async paylist() {
        let { openid } = this.ctx.query;
        let list = await this.ctx.model.UserInfo.find({'openid':openid,"status":1});
        this.ctx.body = {
            code:200,
            msg:'成功',
            data:list,
            success:true,
        }
    }
    //更新订单状态
    async order() {
        let { openid,status } = this.ctx.query;
        let list = await this.ctx.model.UserInfo.update({'openid':openid},{'status':status});
        this.ctx.body = {
            code:200,
            msg:'更新订单成功',
            data:null,
            success:true
        }
    }
    //获取订单列表
    async list() {
        let { status,openid } = this.ctx.query;
        let list = await this.ctx.model.UserInfo.find({'status':status,'openid':openid});
        this.ctx.body = {
            code:200,
            msg:'成功',
            data:list,
            success:true
        }
    }
 
}

module.exports = PrepaidController;