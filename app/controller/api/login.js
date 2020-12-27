'use strict';
const xml2js = require('xml2js');
const Controller = require('egg').Controller;
class LoginController extends Controller {
    async index() {
        let { code,appid } = this.ctx.query;
        console.log("")
        let data = await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=23f72edf09d48ce7d3e1e5b3f619bb5a&js_code=${code}&grant_type=authorization_code`);
        let json =JSON.parse(data.data.toString()); 
        this.ctx.body = {
            code:200,
            msg:'success',
            data:json
        }
    }
    async pay() {
        const result = this.ctx.request.body;
        const { appid,code } = result;
        let { title,total,number,color,size,out_trade_no} = result;
        let detail = `你购买的商品总价量${total},数量${number}颜色${color}尺码${size}`
        //获取openid
        const data = await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=23f72edf09d48ce7d3e1e5b3f619bb5a&js_code=${code}&grant_type=authorization_code`);
        //将微信返回的参数转换成json
        const json =JSON.parse(data.data.toString());
        //获取opid
        const {session_key,openid } = json;
        //支付的金额转成分  
        const total_fee = parseFloat(total) * 100;
        //商户号
        const mch_id = '1558043371';
        //生成随机字符串
        const nonce_str = Math.random().toString(36).substr(2, 26);
        //生成时间戳
        const timestamp = parseInt(new Date().getTime() / 1000) + '';
        //用户订单号
        // const out_trade_no = '20150806125311';
        //微信预支付url
        const notify_url = 'https://www.guicaioa.com';
        const trade_type = 'JSAPI'
        //ip白名单
        const spbill_create_ip = '39.105.56.216';
        let params = {
            appid: appid,
            body: title,
            detail:detail,
			mch_id: mch_id,
            nonce_str: nonce_str,
            notify_url:notify_url,
            openid: openid,
            out_trade_no: out_trade_no,
            spbill_create_ip: spbill_create_ip,
            total_fee: total_fee,
            trade_type: trade_type,
        }
        //生成签名算法
        const sign = await this.service.tools.createSign(params);
        const url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
        const formData = `<xml>
            <appid>${appid}</appid>
            <body>${title}</body>
            <mch_id>${mch_id}</mch_id>
            <detail>${detail}</detail>
            <nonce_str>${nonce_str}</nonce_str>
            <notify_url>${notify_url}</notify_url>
            <openid>${openid}</openid>
            <out_trade_no>${out_trade_no}</out_trade_no>
            <spbill_create_ip>${spbill_create_ip}</spbill_create_ip>
            <total_fee>${total_fee}</total_fee>
            <trade_type>${trade_type}</trade_type>
            <sign>${sign}</sign>
            </xml>`;
        //预支付订单
        const payInfo = await this.ctx.curl(url,{
            method:'POST',
            data:formData
        });
        //xml字符串转json
        xml2js.parseString(payInfo.res.data.toString(),async(err,res) => {
            let singTwo = {
                appId: appid,
                nonceStr: res.xml.nonce_str[0],
                package: `prepay_id=${res.xml.prepay_id[0]}`,
                signType: 'MD5',
                timeStamp: timestamp,
            }
            //二次签名
            const paySign = await this.service.tools.paySignTwo(singTwo);
            //返回参数
            this.ctx.body = {
                code:200,
                msg:'success',
                data:{
                    timeStamp:timestamp,
                    nonceStr:res.xml.nonce_str[0],
                    package:`prepay_id=${res.xml.prepay_id[0]}`,
                    paySign:paySign
                }
            }
        });
    }
    //企业注册
    async register() {
        let result = await this.service.upload.uploadImg(); 
        let data = await this.ctx.model.User.find({"creditCode":result.creditCode,'openid':result.openid});
        if(data.length > 0) {
            this.ctx.body = {
                code:200,
                msg:'当前企业以认证',
                success:true,
                data:null,

            }
            return
        }
        await this.ctx.model.User.update({'openid':result.openid},result)
        this.ctx.body = {
            code:200,
            msg:'认证成功',
            success:true,
            data:null
        }
    }
    //企业登录
    async login() {
        let result = this.ctx.request.body;
        result.password = this.service.tools.md5(result.password)
        let { password,mobile } = result;
        let data = await this.ctx.model.User.find({"mobile":mobile,"password":password});
        if(data.length <=0) {
            this.ctx.body = {
                code:200,
                msg:'你还没有注册',
                success:false,
                data:null
            }
            return;
        }
        this.ctx.body = {
            code:200,
            msg:'登录成功',
            success:true,
            data:data[0]
        }
    }
    //企业信息
    async info() {
        let { email } = this.ctx.query;
        let data = await this.ctx.model.User.find({'email':email});
        this.ctx.body = {
            code:200,
            msg:'success',
            success:true,
            data:data[0]
        }
    }

}

module.exports = LoginController;