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
        let { goods_id,openid } = result;
        let data = await this.ctx.model.UserInfo.find({'goods_id':goods_id,'openid':openid});
        //当存在时不加入预支付订单
        if(data.length > 0) {
            await this.ctx.model.UserInfo.update(result);
            this.ctx.body = {
                code:200,
                msg:'商品以加入预支付订单了',
                data:null,
                success:true
            }
            return
        }
        let userInfo = new this.ctx.model.UserInfo(result);
        await userInfo.save();
        this.ctx.body = {
            code:200,
            msg:'添加预支付商品成功',
            data:null,
            success:true
        }
    }
    //获取支付列表
    async paylist() {
        let { openid,goods_id } = this.ctx.query;
        let list = [];
        if(goods_id == 'undefined') {
            list = await this.ctx.model.UserInfo.find({'openid':openid,"status":1}); 
        } else {
            list = await this.ctx.model.UserInfo.find({'openid':openid,"status":1,'goods_id':goods_id});
        }
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
        let list = [];
        if(status === '0') { //当状态为0时表示查询全部
            list = await this.ctx.model.UserInfo.find({'openid':openid});
        }else {
            list = await this.ctx.model.UserInfo.find({'status':status,'openid':openid});
        }
        this.ctx.body = {
            code:200,
            msg:'成功',
            data:list,
            success:true
        }
    }
    //统计数量
    async count() {
        let { openid } = this.ctx.query;
        let stayPayment = await this.ctx.model.UserInfo.find({'openid':openid,'status':'1'}).count();//待付款
        let stayDelivery = await this.ctx.model.UserInfo.find({'openid':openid,'status':'2'}).count();//待发货
        let stayDistribution = await this.ctx.model.UserInfo.find({'openid':openid,'status':'3'}).count();//待配送
        let stayEvaluation = await this.ctx.model.UserInfo.find({'openid':openid,'status':'4'}).count();//待评价
        this.ctx.body = {
            code:200,
            msg:'成功',
            success:true,
            data:{
                stayPayment,
                stayDelivery,
                stayEvaluation,
                stayDistribution,
            }
        }
    }
    //删除订单
    async delete() {
        let { openid,id } = this.ctx.query;
        let list = await this.ctx.model.UserInfo.deleteOne({'openid':openid,'_id':id});
        this.ctx.body = {
            code:200,
            msg:'删除成功',
            success:true,
            data:null
        }
    }
    //用户保存信息
    async save() {
        const result = this.ctx.request.body;
        const { openid, } = result;
        const data = await this.ctx.model.User.find({'openid':openid});
        if(data.length > 0) { //如果当前存在更新
            await this.ctx.model.User.update({'openid':openid},result);
            this.ctx.body = {
                code:200,
                msg:'更新数据成功',
                success:true,
                data:null
            }
            return
        }
        let user = new this.ctx.model.User(result);
        await user.save();
        this.ctx.body = {
            code:200,
            msg:'添加成功',
            data:null
        }
    }
    //获取用户信息
    async info() {
        const { openid } = this.ctx.query;
        const data = await this.ctx.model.User.find({'openid':openid});
        this.ctx.body = {
            code:200,
            msg:"获取用户成功",
            data:data[0],
            success:true
        }
    }
}

module.exports = PrepaidController;